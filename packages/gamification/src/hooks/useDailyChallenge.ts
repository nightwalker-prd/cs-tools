import { useCallback, useState } from 'react';

import type { DailyChallengeState } from '../types/daily-challenge';
import { generateDailyChallenge, submitAnswer as engineSubmitAnswer } from '../engine/daily-challenge-engine';
import { loadDailyChallengeState, saveDailyChallengeState } from '../storage/gamification-storage';

export interface UseDailyChallengeReturn {
  state: DailyChallengeState;
  isCompleted: boolean;
  score: { correct: number; total: number };
  submitAnswer: (questionIndex: number, answerIndex: number) => void;
}

function getOrCreateChallenge(): DailyChallengeState {
  const today = new Date().toISOString().slice(0, 10);
  const saved = loadDailyChallengeState();

  // If saved state is for today, use it
  if (saved && saved.date === today) {
    return saved;
  }

  // Generate a new challenge for today
  const fresh = generateDailyChallenge(today);
  saveDailyChallengeState(fresh);
  return fresh;
}

export function useDailyChallenge(): UseDailyChallengeReturn {
  const [state, setState] = useState<DailyChallengeState>(() => getOrCreateChallenge());

  const submitAnswer = useCallback(
    (questionIndex: number, answerIndex: number) => {
      setState((prev) => {
        const next = engineSubmitAnswer(prev, questionIndex, answerIndex);
        saveDailyChallengeState(next);
        return next;
      });
    },
    [],
  );

  return {
    state,
    isCompleted: state.completed,
    score: { correct: state.correctCount, total: state.questions.length },
    submitAnswer,
  };
}
