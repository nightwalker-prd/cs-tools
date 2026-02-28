import { useCallback, useMemo } from 'react';
import { usePersistedState } from '@arabtools/core';
import { calculateDailyTargets, getRubsForJuz } from '@arabtools/data';
import type {
  HifdhChallenge,
  DailyChallengeLog,
  ChallengeChecklist,
} from '../types';

const STORAGE_KEY = 'arabtools-hafiz-challenge';

interface ChallengeState {
  challenge: HifdhChallenge | null;
}

const DEFAULT_STATE: ChallengeState = {
  challenge: null,
};

function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

function daysBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end.getTime() - start.getTime();
  return Math.floor(diffMs / (24 * 60 * 60 * 1000));
}

function createEmptyLog(date: string): DailyChallengeLog {
  return {
    date,
    rubsTargeted: [],
    rubsCompleted: [],
    sessionsCompleted: 0,
    checklist: {
      madeIntention: false,
      recitedToSomeone: false,
      loggedProgress: false,
      notedDifficultAyahs: false,
    },
    notes: '',
  };
}

function generateId(): string {
  return `challenge-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useHifdhChallenge() {
  const [state, setState] = usePersistedState<ChallengeState>(
    STORAGE_KEY,
    DEFAULT_STATE,
  );

  const { challenge } = state;

  const isActive = challenge?.status === 'active';
  const isPaused = challenge?.status === 'paused';

  // Current day (1-30), derived from startDate
  const currentDay = useMemo(() => {
    if (!challenge || !isActive) return 0;
    const elapsed = daysBetween(challenge.startDate, toDateString(new Date()));
    return Math.min(30, Math.max(1, elapsed + 1));
  }, [challenge, isActive]);

  // Find or create today's log
  const todayLog = useMemo((): DailyChallengeLog | null => {
    if (!challenge || !isActive) return null;
    const today = toDateString(new Date());
    const existing = challenge.dailyLogs.find((log) => log.date === today);
    if (existing) return existing;

    // Derive today's targeted rubs from the daily targets
    const dailyTargets = calculateDailyTargets(challenge.targetJuz, 30);
    const todayTarget = dailyTargets.find((t) => t.day === currentDay);
    const log = createEmptyLog(today);
    log.rubsTargeted = todayTarget?.rubs ?? [];
    return log;
  }, [challenge, isActive, currentDay]);

  // Compute streak (consecutive days with at least one completed rub)
  const streak = useMemo(() => {
    if (!challenge || challenge.dailyLogs.length === 0) return 0;

    const sortedLogs = [...challenge.dailyLogs].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    let count = 0;
    const today = toDateString(new Date());
    let checkDate = new Date(today);

    for (const log of sortedLogs) {
      const logDate = toDateString(new Date(log.date));
      const expected = toDateString(checkDate);

      if (logDate !== expected) break;
      if (log.rubsCompleted.length === 0) break;

      count++;
      checkDate = new Date(checkDate.getTime() - 24 * 60 * 60 * 1000);
    }

    return count;
  }, [challenge]);

  // Progress object
  const progress = useMemo(() => {
    if (!challenge) {
      return {
        totalRubs: 0,
        completedRubs: 0,
        percentComplete: 0,
        onTrack: false,
        streak: 0,
        daysRemaining: 0,
      };
    }

    const allRubs = challenge.targetJuz.flatMap(getRubsForJuz);
    const totalRubs = allRubs.length;
    const completedRubSet = new Set<number>();

    for (const log of challenge.dailyLogs) {
      for (const rubId of log.rubsCompleted) {
        completedRubSet.add(rubId);
      }
    }

    const completedRubs = completedRubSet.size;
    const percentComplete =
      totalRubs > 0 ? Math.round((completedRubs / totalRubs) * 100) : 0;
    const daysRemaining = Math.max(0, 30 - currentDay + 1);

    // On track: completed at least (currentDay / 30) * totalRubs
    const expectedByNow = Math.floor((currentDay / 30) * totalRubs);
    const onTrack = completedRubs >= expectedByNow;

    return {
      totalRubs,
      completedRubs,
      percentComplete,
      onTrack,
      streak,
      daysRemaining,
    };
  }, [challenge, currentDay, streak]);

  // Per-juz progress
  const juzProgress = useMemo(() => {
    if (!challenge) return [];

    const completedRubSet = new Set<number>();
    for (const log of challenge.dailyLogs) {
      for (const rubId of log.rubsCompleted) {
        completedRubSet.add(rubId);
      }
    }

    return challenge.targetJuz.map((juz) => {
      const rubsInJuz = getRubsForJuz(juz);
      const completed = rubsInJuz.filter((r) => completedRubSet.has(r)).length;
      return {
        juz,
        total: rubsInJuz.length,
        completed,
        percentComplete:
          rubsInJuz.length > 0
            ? Math.round((completed / rubsInJuz.length) * 100)
            : 0,
      };
    });
  }, [challenge]);

  // --- Actions ---

  const startChallenge = useCallback(
    (targetJuz: number[]) => {
      const today = toDateString(new Date());
      const dailyTargets = calculateDailyTargets(targetJuz, 30);
      const firstDayTarget = dailyTargets.find((t) => t.day === 1);

      const initialLog = createEmptyLog(today);
      initialLog.rubsTargeted = firstDayTarget?.rubs ?? [];

      const newChallenge: HifdhChallenge = {
        id: generateId(),
        startDate: today,
        targetJuz: [...targetJuz].sort((a, b) => a - b),
        status: 'active',
        dailyLogs: [initialLog],
      };

      setState({ challenge: newChallenge });
    },
    [setState],
  );

  const updateTodayLog = useCallback(
    (updater: (log: DailyChallengeLog) => DailyChallengeLog) => {
      setState((prev) => {
        if (!prev.challenge || prev.challenge.status !== 'active')
          return prev;

        const today = toDateString(new Date());
        const logs = [...prev.challenge.dailyLogs];
        const existingIndex = logs.findIndex((l) => l.date === today);

        if (existingIndex >= 0) {
          logs[existingIndex] = updater(logs[existingIndex]);
        } else {
          const dailyTargets = calculateDailyTargets(
            prev.challenge.targetJuz,
            30,
          );
          const elapsed = daysBetween(prev.challenge.startDate, today);
          const day = Math.min(30, Math.max(1, elapsed + 1));
          const todayTarget = dailyTargets.find((t) => t.day === day);
          const newLog = createEmptyLog(today);
          newLog.rubsTargeted = todayTarget?.rubs ?? [];
          logs.push(updater(newLog));
        }

        return {
          challenge: {
            ...prev.challenge,
            dailyLogs: logs,
          },
        };
      });
    },
    [setState],
  );

  const markRubComplete = useCallback(
    (rubId: number) => {
      updateTodayLog((log) => {
        if (log.rubsCompleted.includes(rubId)) return log;
        return {
          ...log,
          rubsCompleted: [...log.rubsCompleted, rubId],
        };
      });
    },
    [updateTodayLog],
  );

  const toggleChecklist = useCallback(
    (item: keyof ChallengeChecklist) => {
      updateTodayLog((log) => ({
        ...log,
        checklist: {
          ...log.checklist,
          [item]: !log.checklist[item],
        },
      }));
    },
    [updateTodayLog],
  );

  const setNotes = useCallback(
    (notes: string) => {
      updateTodayLog((log) => ({
        ...log,
        notes,
      }));
    },
    [updateTodayLog],
  );

  const pauseChallenge = useCallback(() => {
    setState((prev) => {
      if (!prev.challenge || prev.challenge.status !== 'active') return prev;
      return {
        challenge: { ...prev.challenge, status: 'paused' },
      };
    });
  }, [setState]);

  const resumeChallenge = useCallback(() => {
    setState((prev) => {
      if (!prev.challenge || prev.challenge.status !== 'paused') return prev;
      return {
        challenge: { ...prev.challenge, status: 'active' },
      };
    });
  }, [setState]);

  const completeChallenge = useCallback(() => {
    setState((prev) => {
      if (!prev.challenge) return prev;
      return {
        challenge: { ...prev.challenge, status: 'completed' },
      };
    });
  }, [setState]);

  const abandonChallenge = useCallback(() => {
    setState((prev) => {
      if (!prev.challenge) return prev;
      return {
        challenge: { ...prev.challenge, status: 'abandoned' },
      };
    });
  }, [setState]);

  const resetChallenge = useCallback(() => {
    setState({ challenge: null });
  }, [setState]);

  return {
    challenge,
    isActive,
    isPaused,
    currentDay,
    todayLog,
    progress,
    juzProgress,
    startChallenge,
    markRubComplete,
    toggleChecklist,
    setNotes,
    pauseChallenge,
    resumeChallenge,
    completeChallenge,
    abandonChallenge,
    resetChallenge,
  };
}
