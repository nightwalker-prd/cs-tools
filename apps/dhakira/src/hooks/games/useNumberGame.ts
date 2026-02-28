import { useReducer, useCallback, useEffect } from 'react';
import type { NumberGameData } from '../../types/games';

const MS_PER_DIGIT = 1000;

type Action =
  | { type: 'START_GAME' }
  | { type: 'TICK' }
  | { type: 'SUBMIT_ANSWER'; answer: string }
  | { type: 'RESET' };

const initialState: NumberGameData = {
  state: 'IDLE',
  currentNumber: '',
  level: 0,
  startTime: null,
  displayTimeRemaining: 0,
};

function generateNumber(digits: number): string {
  if (digits === 1) return Math.floor(Math.random() * 10).toString();
  const firstDigit = Math.floor(Math.random() * 9) + 1;
  let result = firstDigit.toString();
  for (let i = 1; i < digits; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}

function reducer(state: NumberGameData, action: Action): NumberGameData {
  switch (action.type) {
    case 'START_GAME': {
      const number = generateNumber(1);
      return {
        state: 'SHOWING',
        currentNumber: number,
        level: 1,
        startTime: Date.now(),
        displayTimeRemaining: MS_PER_DIGIT,
      };
    }

    case 'TICK': {
      if (state.state !== 'SHOWING') return state;
      const newTimeRemaining = state.displayTimeRemaining - 100;
      if (newTimeRemaining <= 0) {
        return { ...state, state: 'INPUT', displayTimeRemaining: 0 };
      }
      return { ...state, displayTimeRemaining: newTimeRemaining };
    }

    case 'SUBMIT_ANSWER': {
      if (state.state !== 'INPUT') return state;
      const isCorrect = action.answer === state.currentNumber;
      if (!isCorrect) return { ...state, state: 'GAME_OVER' };

      const newLevel = state.level + 1;
      const newNumber = generateNumber(newLevel);
      return {
        ...state,
        state: 'SHOWING',
        currentNumber: newNumber,
        level: newLevel,
        displayTimeRemaining: newLevel * MS_PER_DIGIT,
      };
    }

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export function useNumberGame() {
  const [gameData, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (gameData.state !== 'SHOWING') return;
    const intervalId = setInterval(() => dispatch({ type: 'TICK' }), 100);
    return () => clearInterval(intervalId);
  }, [gameData.state]);

  const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), []);
  const submitAnswer = useCallback((answer: string) => dispatch({ type: 'SUBMIT_ANSWER', answer }), []);
  const resetGame = useCallback(() => dispatch({ type: 'RESET' }), []);
  const playAgain = useCallback(() => dispatch({ type: 'START_GAME' }), []);

  const getDuration = useCallback(() => {
    if (!gameData.startTime) return 0;
    return Date.now() - gameData.startTime;
  }, [gameData.startTime]);

  const getProgress = useCallback(() => {
    if (gameData.state !== 'SHOWING' || gameData.level === 0) return 0;
    const totalTime = gameData.level * MS_PER_DIGIT;
    const elapsed = totalTime - gameData.displayTimeRemaining;
    return Math.min(100, (elapsed / totalTime) * 100);
  }, [gameData.state, gameData.level, gameData.displayTimeRemaining]);

  return { gameData, startGame, submitAnswer, resetGame, playAgain, getDuration, getProgress };
}
