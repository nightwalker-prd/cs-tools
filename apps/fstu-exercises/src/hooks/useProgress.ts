import { useCallback, useMemo } from 'react';
import { usePersistedState } from '@arabtools/core';
import type { ProgressData } from '../types';

const DEFAULT_PROGRESS: ProgressData = {
  exercisesCompleted: {},
  questionsMastered: {},
  lastViewed: null,
  streak: { count: 0, lastDate: null },
};

function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function useProgress() {
  const [data, setData] = usePersistedState<ProgressData>('fstu-progress', DEFAULT_PROGRESS);

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
      const existing = prev.exercisesCompleted[exerciseId];
      return {
        ...prev,
        exercisesCompleted: {
          ...prev.exercisesCompleted,
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
    return !!data.exercisesCompleted[exerciseId];
  }, [data.exercisesCompleted]);

  const setLastViewed = useCallback((exerciseId: string) => {
    setData(prev => ({
      ...prev,
      lastViewed: { exerciseId, timestamp: Date.now() },
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

  const stats = useMemo(() => ({
    completed: Object.keys(data.exercisesCompleted).length,
    mastered: Object.keys(data.questionsMastered).length,
    streak: data.streak.count,
  }), [data.exercisesCompleted, data.questionsMastered, data.streak.count]);

  const exportProgress = useCallback(() => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fstu-progress-${getTodayStr()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  const importProgress = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string) as ProgressData;
        setData(prev => ({
          exercisesCompleted: { ...prev.exercisesCompleted, ...imported.exercisesCompleted },
          questionsMastered: { ...prev.questionsMastered, ...imported.questionsMastered },
          lastViewed: imported.lastViewed ?? prev.lastViewed,
          streak: imported.streak.count > prev.streak.count ? imported.streak : prev.streak,
        }));
      } catch {
        // invalid JSON, ignore
      }
    };
    reader.readAsText(file);
  }, [setData]);

  const resetProgress = useCallback(() => {
    setData(DEFAULT_PROGRESS);
  }, [setData]);

  const getExerciseProgress = useCallback((_exerciseId: string, questionIds: string[]): { completed: number; total: number } => {
    const total = questionIds.length;
    const completed = questionIds.filter(id => data.questionsMastered[id]).length;
    return { completed, total };
  }, [data.questionsMastered]);

  return {
    data,
    stats,
    markQuestionMastered,
    isQuestionMastered,
    markExerciseCompleted,
    isExerciseCompleted,
    setLastViewed,
    updateStreak,
    exportProgress,
    importProgress,
    resetProgress,
    getExerciseProgress,
  };
}
