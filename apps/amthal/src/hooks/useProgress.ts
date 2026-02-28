import { useCallback } from 'react';
import { usePersistedState } from '@arabtools/core';
import type { AmthalProgress, QuizMode, QuizResult } from '../types';

const DEFAULT_PROGRESS: AmthalProgress = {
  quizResults: [],
  bestScores: {
    'match-halves': 0,
    'guess-meaning': 0,
    'fill-blank': 0,
  },
  currentStreak: 0,
  lastPracticedDate: '',
  viewedProverbs: [],
};

function isYesterday(dateStr: string): boolean {
  if (!dateStr) return false;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateStr === yesterday.toISOString().slice(0, 10);
}

export function useProgress() {
  const [progress, setProgress] = usePersistedState<AmthalProgress>('amthal-progress', DEFAULT_PROGRESS);

  const recordQuizResult = useCallback((result: QuizResult) => {
    setProgress(prev => {
      const today = new Date().toISOString().slice(0, 10);
      const isConsecutive = prev.lastPracticedDate === today || isYesterday(prev.lastPracticedDate);
      const newStreak = prev.lastPracticedDate === today
        ? prev.currentStreak
        : isConsecutive
          ? prev.currentStreak + 1
          : 1;

      const scorePercent = Math.round((result.score / result.total) * 100);
      const prevBest = prev.bestScores[result.mode] || 0;

      return {
        ...prev,
        quizResults: [...prev.quizResults.slice(-49), result],
        bestScores: {
          ...prev.bestScores,
          [result.mode]: Math.max(prevBest, scorePercent),
        },
        currentStreak: newStreak,
        lastPracticedDate: today,
      };
    });
  }, [setProgress]);

  const markViewed = useCallback((proverbId: string) => {
    setProgress(prev => {
      if (prev.viewedProverbs.includes(proverbId)) return prev;
      return {
        ...prev,
        viewedProverbs: [...prev.viewedProverbs, proverbId],
      };
    });
  }, [setProgress]);

  const getBestScore = useCallback((mode: QuizMode): number => {
    return progress.bestScores[mode] || 0;
  }, [progress.bestScores]);

  return { progress, recordQuizResult, markViewed, getBestScore };
}
