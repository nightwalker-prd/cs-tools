import { useCallback, useMemo } from 'react';
import { usePersistedState } from '@arabtools/core';
import type { LemmaProgress, SessionConfig, SessionStats } from '@/types';

type ProgressMap = Record<number, LemmaProgress>;

const DEFAULT_STATS: SessionStats = {
  totalReviewed: 0,
  totalCorrect: 0,
  totalMastered: 0,
  lastSessionDate: 0,
  currentStreak: 0,
  bestStreak: 0,
  streakLastDate: '',
};

function getDayKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function useLearningEngine() {
  const [progress, setProgress] = usePersistedState<ProgressMap>('arabtools-kalimat-progress', {});
  const [stats, setStats] = usePersistedState<SessionStats>('arabtools-kalimat-stats', DEFAULT_STATS);
  const [sessionConfig, setSessionConfig] = usePersistedState<SessionConfig | null>('arabtools-kalimat-session', null);

  const getProgress = useCallback((lemmaId: number): LemmaProgress => {
    return progress[lemmaId] ?? { phase: 'new', correctStreak: 0, totalReviews: 0, lastReviewed: 0 };
  }, [progress]);

  const recordReview = useCallback((lemmaId: number, grade: 'again' | 'hard' | 'good' | 'easy') => {
    setProgress(prev => {
      const current = prev[lemmaId] ?? { phase: 'new' as const, correctStreak: 0, totalReviews: 0, lastReviewed: 0 };
      const isCorrect = grade === 'good' || grade === 'easy';

      const newStreak = isCorrect ? current.correctStreak + 1 : 0;
      const newTotalReviews = current.totalReviews + 1;

      let newPhase: LemmaProgress['phase'] = 'learning';
      if (newStreak >= 4 && newTotalReviews >= 5) {
        newPhase = 'mastered';
      } else if (newStreak >= 2) {
        newPhase = 'review';
      }

      return {
        ...prev,
        [lemmaId]: {
          phase: newPhase,
          correctStreak: newStreak,
          totalReviews: newTotalReviews,
          lastReviewed: Date.now(),
        },
      };
    });

    setStats(prev => {
      const now = Date.now();
      const today = new Date();
      const todayKey = getDayKey(today);

      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayKey = getDayKey(yesterday);

      let currentStreak = prev.currentStreak ?? 0;
      let bestStreak = prev.bestStreak ?? 0;
      const streakLastDate = prev.streakLastDate ?? '';

      if (streakLastDate !== todayKey) {
        if (!streakLastDate) {
          currentStreak = 1;
        } else if (streakLastDate === yesterdayKey) {
          currentStreak += 1;
        } else {
          currentStreak = 1;
        }
        bestStreak = Math.max(bestStreak, currentStreak);
      }

      return {
        ...prev,
        totalReviewed: prev.totalReviewed + 1,
        totalCorrect: prev.totalCorrect + (grade === 'good' || grade === 'easy' ? 1 : 0),
        lastSessionDate: now,
        currentStreak,
        bestStreak,
        streakLastDate: todayKey,
      };
    });
  }, [setProgress, setStats]);

  const summary = useMemo(() => {
    const values = Object.values(progress);
    return {
      total: values.length,
      new: values.filter(p => p.phase === 'new').length,
      learning: values.filter(p => p.phase === 'learning').length,
      review: values.filter(p => p.phase === 'review').length,
      mastered: values.filter(p => p.phase === 'mastered').length,
    };
  }, [progress]);

  return {
    progress,
    stats,
    sessionConfig,
    setSessionConfig,
    getProgress,
    recordReview,
    summary,
  };
}
