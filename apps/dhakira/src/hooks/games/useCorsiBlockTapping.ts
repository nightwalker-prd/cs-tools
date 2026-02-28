import { useReducer, useCallback, useEffect, useRef } from 'react';
import type { CorsiBlockTappingGameData } from '../../types/games';
import { CORSI_BLOCK_POSITIONS, MIN_SPAN, MAX_SPAN, BLOCK_COUNT } from '../../data/corsi-block-positions';

const BLOCK_HIGHLIGHT_DURATION = 500;
const BLOCK_GAP_DURATION = 500;
const FEEDBACK_DURATION = 1500;
const MAX_ATTEMPTS = 2;

type Action =
  | { type: 'START_GAME' }
  | { type: 'ADVANCE_SHOWING' }
  | { type: 'START_PLAYER_TURN' }
  | { type: 'TAP_BLOCK'; blockId: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

function getInitialState(): CorsiBlockTappingGameData {
  return {
    state: 'IDLE',
    currentSpan: MIN_SPAN,
    attempt: 1,
    sequence: [],
    playerSequence: [],
    showingIndex: -1,
    lastResult: null,
    highestSpan: 0,
    totalCorrect: 0,
    startTime: null,
  };
}

function fisherYatesShuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function generateSequence(length: number): number[] {
  const allIndices = Array.from({ length: BLOCK_COUNT }, (_, i) => i);
  const shuffled = fisherYatesShuffle(allIndices);
  return shuffled.slice(0, length);
}

function reducer(state: CorsiBlockTappingGameData, action: Action): CorsiBlockTappingGameData {
  switch (action.type) {
    case 'START_GAME': {
      const sequence = generateSequence(MIN_SPAN);
      return { ...getInitialState(), state: 'SHOWING', sequence, showingIndex: 0, startTime: Date.now() };
    }

    case 'ADVANCE_SHOWING': {
      const nextIndex = state.showingIndex + 1;
      if (nextIndex >= state.sequence.length) {
        return { ...state, state: 'PLAYER_TURN', showingIndex: -1, playerSequence: [] };
      }
      return { ...state, showingIndex: nextIndex };
    }

    case 'START_PLAYER_TURN':
      return { ...state, state: 'PLAYER_TURN', showingIndex: -1, playerSequence: [] };

    case 'TAP_BLOCK': {
      const { blockId } = action;
      const expectedIndex = state.playerSequence.length;
      const expectedBlock = state.sequence[expectedIndex];

      if (blockId !== expectedBlock) {
        return {
          ...state,
          state: 'FEEDBACK',
          playerSequence: [...state.playerSequence, blockId],
          lastResult: 'wrong',
        };
      }

      const newPlayerSequence = [...state.playerSequence, blockId];
      const newTotalCorrect = state.totalCorrect + 1;

      if (newPlayerSequence.length === state.sequence.length) {
        return {
          ...state,
          state: 'FEEDBACK',
          playerSequence: newPlayerSequence,
          totalCorrect: newTotalCorrect,
          lastResult: 'correct',
          highestSpan: Math.max(state.highestSpan, state.currentSpan),
        };
      }

      return { ...state, playerSequence: newPlayerSequence, totalCorrect: newTotalCorrect };
    }

    case 'NEXT_ROUND': {
      if (state.lastResult === 'correct') {
        const nextSpan = state.currentSpan + 1;
        if (nextSpan > MAX_SPAN) {
          return { ...state, state: 'GAME_OVER', highestSpan: MAX_SPAN };
        }
        const sequence = generateSequence(nextSpan);
        return {
          ...state,
          state: 'SHOWING',
          currentSpan: nextSpan,
          attempt: 1,
          sequence,
          playerSequence: [],
          showingIndex: 0,
          lastResult: null,
        };
      } else {
        if (state.attempt >= MAX_ATTEMPTS) {
          return { ...state, state: 'GAME_OVER' };
        }
        const sequence = generateSequence(state.currentSpan);
        return {
          ...state,
          state: 'SHOWING',
          attempt: state.attempt + 1,
          sequence,
          playerSequence: [],
          showingIndex: 0,
          lastResult: null,
        };
      }
    }

    case 'RESET':
      return getInitialState();

    default:
      return state;
  }
}

export function useCorsiBlockTapping() {
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
      timerRef.current = setTimeout(() => {
        dispatch({ type: 'ADVANCE_SHOWING' });
      }, BLOCK_HIGHLIGHT_DURATION + BLOCK_GAP_DURATION);
    }

    if (gameData.state === 'FEEDBACK') {
      timerRef.current = setTimeout(() => dispatch({ type: 'NEXT_ROUND' }), FEEDBACK_DURATION);
    }
  }, [gameData.state, gameData.showingIndex]);

  const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), []);

  const tapBlock = useCallback(
    (blockId: number) => {
      if (gameData.state === 'PLAYER_TURN') dispatch({ type: 'TAP_BLOCK', blockId });
    },
    [gameData.state]
  );

  const resetGame = useCallback(() => dispatch({ type: 'RESET' }), []);
  const playAgain = useCallback(() => dispatch({ type: 'START_GAME' }), []);

  const getDuration = useCallback(() => {
    if (!gameData.startTime) return 0;
    return Date.now() - gameData.startTime;
  }, [gameData.startTime]);

  const getActiveBlockId = useCallback(() => {
    if (gameData.state === 'SHOWING' && gameData.showingIndex >= 0) {
      return gameData.sequence[gameData.showingIndex];
    }
    return -1;
  }, [gameData.state, gameData.showingIndex, gameData.sequence]);

  return {
    gameData,
    startGame,
    tapBlock,
    resetGame,
    playAgain,
    getDuration,
    getActiveBlockId,
    BLOCK_POSITIONS: CORSI_BLOCK_POSITIONS,
  };
}
