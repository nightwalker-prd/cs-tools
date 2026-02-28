import { usePersistedState } from '@arabtools/core';
import type { BinaProgress } from '../types';

const DEFAULT_PROGRESS: BinaProgress = {
  challenges: {},
  totalCompleted: 0,
  currentStreak: 0,
  lastPracticedDate: '',
};

export function useProgress() {
  const [progress, setProgress] = usePersistedState<BinaProgress>(
    'bina-progress',
    DEFAULT_PROGRESS
  );

  const markAttempt = (challengeId: string, submission: string) => {
    setProgress(prev => {
      const existing = prev.challenges[challengeId] || {
        completed: false,
        attempts: 0,
        hintsUsed: 0,
      };
      return {
        ...prev,
        challenges: {
          ...prev.challenges,
          [challengeId]: {
            ...existing,
            attempts: existing.attempts + 1,
            lastSubmission: submission,
          },
        },
      };
    });
  };

  const markCompleted = (challengeId: string) => {
    setProgress(prev => {
      const existing = prev.challenges[challengeId] || {
        completed: false,
        attempts: 0,
        hintsUsed: 0,
      };
      if (existing.completed) return prev;

      const today = new Date().toISOString().slice(0, 10);
      const isConsecutive = prev.lastPracticedDate === today ||
        isYesterday(prev.lastPracticedDate);

      return {
        ...prev,
        challenges: {
          ...prev.challenges,
          [challengeId]: { ...existing, completed: true },
        },
        totalCompleted: prev.totalCompleted + 1,
        currentStreak: isConsecutive ? prev.currentStreak + 1 : 1,
        lastPracticedDate: today,
      };
    });
  };

  const markRefactorCompleted = (challengeId: string) => {
    setProgress(prev => {
      const existing = prev.challenges[challengeId];
      if (!existing) return prev;
      return {
        ...prev,
        challenges: {
          ...prev.challenges,
          [challengeId]: { ...existing, refactorCompleted: true },
        },
      };
    });
  };

  const recordHintUsed = (challengeId: string) => {
    setProgress(prev => {
      const existing = prev.challenges[challengeId] || {
        completed: false,
        attempts: 0,
        hintsUsed: 0,
      };
      return {
        ...prev,
        challenges: {
          ...prev.challenges,
          [challengeId]: { ...existing, hintsUsed: existing.hintsUsed + 1 },
        },
      };
    });
  };

  return {
    progress,
    markAttempt,
    markCompleted,
    markRefactorCompleted,
    recordHintUsed,
  };
}

function isYesterday(dateStr: string): boolean {
  if (!dateStr) return false;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateStr === yesterday.toISOString().slice(0, 10);
}
