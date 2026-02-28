import { usePersistedState } from '@arabtools/core';
import type { TarkibProgress, ExerciseResult, PhraseType } from '../data/types';
import { exercisesByType } from '../data/exercises';

const DEFAULT_PROGRESS: TarkibProgress = {
  completed: {},
  totalScore: 0,
  lastPracticed: new Date().toISOString(),
};

export function useProgress() {
  const [progress, setProgress] = usePersistedState<TarkibProgress>(
    'arabtools-tarkib-builder-progress',
    DEFAULT_PROGRESS,
  );

  function recordResult(result: ExerciseResult) {
    setProgress(prev => {
      const existing = prev.completed[result.exerciseId];
      const isBetter = !existing || result.score > existing.score;

      const newCompleted = {
        ...prev.completed,
        [result.exerciseId]: {
          score: isBetter ? result.score : existing!.score,
          attempts: (existing?.attempts ?? 0) + result.attempts,
          bestTime: existing?.bestTime
            ? Math.min(existing.bestTime, result.timeSpent)
            : result.timeSpent,
        },
      };

      const newTotalScore = Object.values(newCompleted).reduce(
        (sum, e) => sum + e.score,
        0,
      );

      return {
        completed: newCompleted,
        totalScore: newTotalScore,
        lastPracticed: new Date().toISOString(),
      };
    });
  }

  function isCompleted(exerciseId: string): boolean {
    return exerciseId in progress.completed;
  }

  function getScore(exerciseId: string): number {
    return progress.completed[exerciseId]?.score ?? 0;
  }

  /** Get mastery level (0-4 stars) for a phrase type */
  function getMastery(phraseType: PhraseType): number {
    const exercises = exercisesByType[phraseType] ?? [];
    if (exercises.length === 0) return 0;

    const completedExercises = exercises.filter(e => e.id in progress.completed);
    if (completedExercises.length === 0) return 0;

    const completionRatio = completedExercises.length / exercises.length;
    const avgScore = completedExercises.reduce(
      (sum, e) => sum + (progress.completed[e.id]?.score ?? 0),
      0,
    ) / completedExercises.length;

    // Stars based on completion + score
    if (completionRatio >= 0.9 && avgScore >= 90) return 4;
    if (completionRatio >= 0.7 && avgScore >= 75) return 3;
    if (completionRatio >= 0.5 && avgScore >= 50) return 2;
    if (completedExercises.length >= 1) return 1;
    return 0;
  }

  /** Check if a phrase type is unlocked */
  function isUnlocked(_phraseType: PhraseType): boolean {
    return true;
  }

  function resetProgress() {
    setProgress(DEFAULT_PROGRESS);
  }

  return {
    progress,
    recordResult,
    isCompleted,
    getScore,
    getMastery,
    isUnlocked,
    resetProgress,
  };
}
