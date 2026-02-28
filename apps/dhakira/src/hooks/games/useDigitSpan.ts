import { useReducer, useCallback, useEffect, useRef } from 'react';
import type { DigitSpanGameData, DigitSpanMode } from '../../types/games';

const DIGIT_DISPLAY_DURATION = 1000;
const DIGIT_GAP_DURATION = 300;
const FEEDBACK_DURATION = 1500;
const MIN_SPAN = 3;
const MAX_SPAN = 9;
const MAX_ATTEMPTS = 2;

type Action =
  | { type: 'SELECT_MODE'; mode: DigitSpanMode }
  | { type: 'ADVANCE_SHOWING' }
  | { type: 'START_RECALL' }
  | { type: 'INPUT_DIGIT'; digit: number }
  | { type: 'CLEAR_INPUT' }
  | { type: 'SUBMIT_RECALL' }
  | { type: 'NEXT_ROUND' }
  | { type: 'CHANGE_MODE' }
  | { type: 'RESET' };

function getInitialState(): DigitSpanGameData {
  return {
    state: 'MODE_SELECT',
    mode: null,
    currentSpan: MIN_SPAN,
    attempt: 1,
    sequence: [],
    playerInput: [],
    showingIndex: -1,
    lastResult: null,
    highestSpan: 0,
    startTime: null,
  };
}

function generateSequence(length: number): number[] {
  const sequence: number[] = [];
  let lastDigit = -1;
  for (let i = 0; i < length; i++) {
    let digit: number;
    do {
      digit = Math.floor(Math.random() * 10);
    } while (digit === lastDigit);
    sequence.push(digit);
    lastDigit = digit;
  }
  return sequence;
}

function arraysEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, i) => val === b[i]);
}

function reducer(state: DigitSpanGameData, action: Action): DigitSpanGameData {
  switch (action.type) {
    case 'SELECT_MODE': {
      const sequence = generateSequence(MIN_SPAN);
      return { ...getInitialState(), state: 'SHOWING', mode: action.mode, sequence, showingIndex: 0, startTime: Date.now() };
    }

    case 'ADVANCE_SHOWING': {
      const nextIndex = state.showingIndex + 1;
      if (nextIndex >= state.sequence.length) {
        return { ...state, state: 'RECALL', showingIndex: -1, playerInput: [] };
      }
      return { ...state, showingIndex: nextIndex };
    }

    case 'START_RECALL':
      return { ...state, state: 'RECALL', showingIndex: -1, playerInput: [] };

    case 'INPUT_DIGIT': {
      if (state.playerInput.length >= state.currentSpan) return state;
      return { ...state, playerInput: [...state.playerInput, action.digit] };
    }

    case 'CLEAR_INPUT':
      return { ...state, playerInput: [] };

    case 'SUBMIT_RECALL': {
      const expected = state.mode === 'backward' ? [...state.sequence].reverse() : state.sequence;
      const isCorrect = arraysEqual(state.playerInput, expected);
      return {
        ...state,
        state: 'FEEDBACK',
        lastResult: isCorrect ? 'correct' : 'wrong',
        highestSpan: isCorrect ? Math.max(state.highestSpan, state.currentSpan) : state.highestSpan,
      };
    }

    case 'NEXT_ROUND': {
      if (state.lastResult === 'correct') {
        const nextSpan = state.currentSpan + 1;
        if (nextSpan > MAX_SPAN) return { ...state, state: 'GAME_OVER', highestSpan: MAX_SPAN };
        const sequence = generateSequence(nextSpan);
        return { ...state, state: 'SHOWING', currentSpan: nextSpan, attempt: 1, sequence, playerInput: [], showingIndex: 0, lastResult: null };
      } else {
        if (state.attempt >= MAX_ATTEMPTS) return { ...state, state: 'GAME_OVER' };
        const sequence = generateSequence(state.currentSpan);
        return { ...state, state: 'SHOWING', attempt: state.attempt + 1, sequence, playerInput: [], showingIndex: 0, lastResult: null };
      }
    }

    case 'CHANGE_MODE':
      return getInitialState();

    case 'RESET':
      return getInitialState();

    default:
      return state;
  }
}

export function useDigitSpan() {
  const [gameData, dispatch] = useReducer(reducer, getInitialState());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (gameData.state === 'SHOWING' && gameData.showingIndex >= 0) {
      timerRef.current = setTimeout(() => dispatch({ type: 'ADVANCE_SHOWING' }), DIGIT_DISPLAY_DURATION + DIGIT_GAP_DURATION);
    }

    if (gameData.state === 'FEEDBACK') {
      timerRef.current = setTimeout(() => dispatch({ type: 'NEXT_ROUND' }), FEEDBACK_DURATION);
    }
  }, [gameData.state, gameData.showingIndex]);

  const selectMode = useCallback((mode: DigitSpanMode) => dispatch({ type: 'SELECT_MODE', mode }), []);

  const inputDigit = useCallback(
    (digit: number) => {
      if (gameData.state === 'RECALL') dispatch({ type: 'INPUT_DIGIT', digit });
    },
    [gameData.state]
  );

  const clearInput = useCallback(() => {
    if (gameData.state === 'RECALL') dispatch({ type: 'CLEAR_INPUT' });
  }, [gameData.state]);

  const submitRecall = useCallback(() => {
    if (gameData.state === 'RECALL' && gameData.playerInput.length > 0) dispatch({ type: 'SUBMIT_RECALL' });
  }, [gameData.state, gameData.playerInput.length]);

  const changeMode = useCallback(() => dispatch({ type: 'CHANGE_MODE' }), []);

  const playAgain = useCallback(() => {
    if (gameData.mode) dispatch({ type: 'SELECT_MODE', mode: gameData.mode });
  }, [gameData.mode]);

  const resetGame = useCallback(() => dispatch({ type: 'RESET' }), []);

  const getDuration = useCallback(() => {
    if (!gameData.startTime) return 0;
    return Date.now() - gameData.startTime;
  }, [gameData.startTime]);

  const getCurrentDigit = useCallback(() => {
    if (gameData.state === 'SHOWING' && gameData.showingIndex >= 0) {
      return gameData.sequence[gameData.showingIndex];
    }
    return null;
  }, [gameData.state, gameData.showingIndex, gameData.sequence]);

  const getExpectedAnswer = useCallback(() => {
    if (!gameData.mode) return [];
    return gameData.mode === 'backward' ? [...gameData.sequence].reverse() : gameData.sequence;
  }, [gameData.mode, gameData.sequence]);

  return {
    gameData,
    selectMode,
    inputDigit,
    clearInput,
    submitRecall,
    changeMode,
    playAgain,
    resetGame,
    getDuration,
    getCurrentDigit,
    getExpectedAnswer,
  };
}
