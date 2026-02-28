import { useCallback, useEffect, useMemo } from 'react';
import { usePersistedState } from '@arabtools/core';
import type { ProgressData, ComposeDraft, FluencySession } from '../data/types';
import { ALL_LESSONS } from '../data/lessons';

const DEFAULT_PROGRESS: ProgressData = {
  lessonsVisited: {},
  exerciseScores: {},
  questionsMastered: {},
  lastViewed: null,
  streak: { count: 0, lastDate: null },
  composeDrafts: {},
  composeCompleted: {},
  fluencySessions: [],
};

function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

const LESSON_ID_SET = new Set(ALL_LESSONS.map(lesson => lesson.id));

function normalizeProgress(raw: ProgressData): ProgressData {
  const lessonsVisited = Object.fromEntries(
    Object.entries(raw.lessonsVisited ?? {}).filter(([lessonId]) => LESSON_ID_SET.has(lessonId))
  );

  const questionsMastered = Object.fromEntries(
    Object.entries(raw.questionsMastered ?? {})
  );

  const exerciseScores = Object.fromEntries(
    Object.entries(raw.exerciseScores ?? {})
  );

  const composeDrafts = Object.fromEntries(
    Object.entries(raw.composeDrafts ?? {})
  );

  const composeCompleted = Object.fromEntries(
    Object.entries(raw.composeCompleted ?? {})
  );

  const fluencySessions = Array.isArray(raw.fluencySessions)
    ? raw.fluencySessions.slice(-200)
    : [];

  const lastViewed =
    raw.lastViewed && LESSON_ID_SET.has(raw.lastViewed.lessonId)
      ? raw.lastViewed
      : null;

  return {
    ...DEFAULT_PROGRESS,
    ...raw,
    lessonsVisited,
    questionsMastered,
    exerciseScores,
    composeDrafts,
    composeCompleted,
    fluencySessions,
    lastViewed,
    streak: raw.streak ?? DEFAULT_PROGRESS.streak,
  };
}

export function useProgress() {
  const [rawData, setData] = usePersistedState<ProgressData>('insha-progress', DEFAULT_PROGRESS);

  // Migrate old schema: reset stale data saved before compose fields existed
  const isStale = !Object.hasOwn(rawData, 'composeCompleted');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canonicalKey = 'arabtools-insha-progress';
    const legacyKeys = ['arabtools-arabtools-insha-progress'];
    const currentRaw = localStorage.getItem(canonicalKey);

    if (currentRaw) return;

    for (const legacyKey of legacyKeys) {
      const legacyRaw = localStorage.getItem(legacyKey);
      if (!legacyRaw) continue;

      try {
        const parsed = JSON.parse(legacyRaw) as ProgressData;
        setData(normalizeProgress(parsed));
        localStorage.removeItem(legacyKey);
      } catch {
        localStorage.removeItem(legacyKey);
      }
      break;
    }
  }, [setData]);

  useEffect(() => {
    if (isStale) setData(DEFAULT_PROGRESS);
  }, [isStale, setData]);

  // Use defaults during migration, merged data otherwise
  const data: ProgressData = useMemo(() =>
    isStale ? DEFAULT_PROGRESS : normalizeProgress(rawData),
  [rawData, isStale]);

  const markLessonVisited = useCallback((lessonId: string) => {
    setData(prev => ({
      ...prev,
      lessonsVisited: { ...prev.lessonsVisited, [lessonId]: Date.now() },
      lastViewed: { lessonId, timestamp: Date.now() },
    }));
  }, [setData]);

  const isLessonVisited = useCallback((lessonId: string): boolean => {
    return !!data.lessonsVisited[lessonId];
  }, [data.lessonsVisited]);

  const markQuestionMastered = useCallback((questionId: string) => {
    setData(prev => ({
      ...prev,
      questionsMastered: { ...prev.questionsMastered, [questionId]: true },
    }));
  }, [setData]);

  const isQuestionMastered = useCallback((questionId: string): boolean => {
    return !!data.questionsMastered[questionId];
  }, [data.questionsMastered]);

  const markExerciseCompleted = useCallback((exerciseId: string, score: number) => {
    setData(prev => {
      const existing = prev.exerciseScores[exerciseId];
      return {
        ...prev,
        exerciseScores: {
          ...prev.exerciseScores,
          [exerciseId]: {
            completedAt: Date.now(),
            score,
            bestScore: existing ? Math.max(existing.bestScore, score) : score,
          },
        },
      };
    });
  }, [setData]);

  const isExerciseCompleted = useCallback((exerciseId: string): boolean => {
    return !!data.exerciseScores[exerciseId];
  }, [data.exerciseScores]);

  const setLastViewed = useCallback((lessonId: string) => {
    setData(prev => ({
      ...prev,
      lastViewed: { lessonId, timestamp: Date.now() },
    }));
  }, [setData]);

  const updateStreak = useCallback(() => {
    setData(prev => {
      const today = getTodayStr();
      if (prev.streak.lastDate === today) return prev;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().slice(0, 10);

      const newCount = prev.streak.lastDate === yesterdayStr
        ? prev.streak.count + 1
        : 1;

      return {
        ...prev,
        streak: { count: newCount, lastDate: today },
      };
    });
  }, [setData]);

  const saveComposeDraft = useCallback((composeId: string, draft: ComposeDraft) => {
    setData(prev => ({
      ...prev,
      composeDrafts: { ...prev.composeDrafts, [composeId]: draft },
    }));
  }, [setData]);

  const markComposeCompleted = useCallback((composeId: string) => {
    setData(prev => ({
      ...prev,
      composeCompleted: { ...prev.composeCompleted, [composeId]: Date.now() },
    }));
  }, [setData]);

  const getComposeDraft = useCallback((composeId: string): ComposeDraft | null => {
    return data.composeDrafts[composeId] ?? null;
  }, [data.composeDrafts]);

  const isComposeCompleted = useCallback((composeId: string): boolean => {
    return !!data.composeCompleted[composeId];
  }, [data.composeCompleted]);

  const saveFluencySession = useCallback((session: FluencySession) => {
    setData(prev => {
      const sessions = [...(prev.fluencySessions ?? []), session].slice(-200);
      return { ...prev, fluencySessions: sessions };
    });
  }, [setData]);

  const getFluencySessions = useCallback((lessonId?: string): FluencySession[] => {
    const sessions = data.fluencySessions ?? [];
    return lessonId ? sessions.filter(s => s.lessonId === lessonId) : sessions;
  }, [data.fluencySessions]);

  const getFluencyStats = useCallback((lessonId?: string) => {
    const sessions = getFluencySessions(lessonId);
    if (sessions.length === 0) {
      return { totalSessions: 0, avgWpm: 0, bestWpm: 0, totalWords: 0, recentWpms: [] as number[] };
    }
    const wpms = sessions.flatMap(s => s.rounds.map(r => r.wpm));
    const totalWords = sessions.reduce((sum, s) => sum + s.rounds.reduce((rs, r) => rs + r.wordCount, 0), 0);
    const avgWpm = wpms.length > 0 ? Math.round(wpms.reduce((a, b) => a + b, 0) / wpms.length) : 0;
    const bestWpm = wpms.length > 0 ? Math.round(Math.max(...wpms)) : 0;
    // Last 10 session averages for chart
    const recentWpms = sessions.slice(-10).map(s => {
      const rWpms = s.rounds.map(r => r.wpm);
      return rWpms.length > 0 ? Math.round(rWpms.reduce((a, b) => a + b, 0) / rWpms.length) : 0;
    });
    return { totalSessions: sessions.length, avgWpm, bestWpm, totalWords, recentWpms };
  }, [getFluencySessions]);

  const stats = useMemo(() => ({
    lessonsVisited: Object.keys(data.lessonsVisited).length,
    exercisesCompleted: Object.keys(data.exerciseScores).length,
    mastered: Object.keys(data.questionsMastered).length,
    streak: data.streak.count,
    composeCompleted: Object.keys(data.composeCompleted).length,
    fluencySessions: (data.fluencySessions ?? []).length,
  }), [data.lessonsVisited, data.exerciseScores, data.questionsMastered, data.streak.count, data.composeCompleted, data.fluencySessions]);

  const resetProgress = useCallback(() => {
    setData(DEFAULT_PROGRESS);
  }, [setData]);

  return {
    data,
    stats,
    markLessonVisited,
    isLessonVisited,
    markQuestionMastered,
    isQuestionMastered,
    markExerciseCompleted,
    isExerciseCompleted,
    setLastViewed,
    updateStreak,
    resetProgress,
    saveComposeDraft,
    markComposeCompleted,
    getComposeDraft,
    isComposeCompleted,
    saveFluencySession,
    getFluencySessions,
    getFluencyStats,
  };
}
