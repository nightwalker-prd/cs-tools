import { useReducer, useCallback } from 'react';
import type { ChimpGameData } from '../../types/games';

const GRID_SIZE = 25; // 5x5 grid
const START_LEVEL = 4;

type Action =
  | { type: 'START_GAME' }
  | { type: 'CLICK_TILE'; tileIndex: number }
  | { type: 'RESET' };

function fisherYatesShuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function generatePositions(count: number): Map<number, number> {
  const allPositions = Array.from({ length: GRID_SIZE }, (_, i) => i);
  const shuffledPositions = fisherYatesShuffle(allPositions);
  const selectedPositions = shuffledPositions.slice(0, count);
  const positions = new Map<number, number>();
  for (let num = 1; num <= count; num++) {
    positions.set(num, selectedPositions[num - 1]);
  }
  return positions;
}

const initialState: ChimpGameData = {
  state: 'IDLE',
  numberPositions: new Map(),
  level: START_LEVEL,
  nextExpected: 1,
  startTime: null,
};

function chimpGameReducer(state: ChimpGameData, action: Action): ChimpGameData {
  switch (action.type) {
    case 'START_GAME': {
      const positions = generatePositions(START_LEVEL);
      return {
        ...state,
        state: 'MEMORIZE',
        numberPositions: positions,
        level: START_LEVEL,
        nextExpected: 1,
        startTime: Date.now(),
      };
    }

    case 'CLICK_TILE': {
      const { tileIndex } = action;
      let clickedNumber: number | null = null;
      for (const [num, pos] of state.numberPositions) {
        if (pos === tileIndex) {
          clickedNumber = num;
          break;
        }
      }

      if (state.state === 'MEMORIZE') {
        if (clickedNumber === 1) {
          const newPositions = new Map(state.numberPositions);
          newPositions.delete(1);
          return { ...state, state: 'RECALL', numberPositions: newPositions, nextExpected: 2 };
        }
        if (clickedNumber !== null && clickedNumber !== 1) {
          return { ...state, state: 'GAME_OVER' };
        }
        return state;
      }

      if (state.state === 'RECALL') {
        if (clickedNumber === null || clickedNumber !== state.nextExpected) {
          return { ...state, state: 'GAME_OVER' };
        }
        const newPositions = new Map(state.numberPositions);
        newPositions.delete(clickedNumber);

        if (newPositions.size === 0) {
          const nextLevel = state.level + 1;
          const newLevelPositions = generatePositions(nextLevel);
          return {
            ...state,
            state: 'MEMORIZE',
            numberPositions: newLevelPositions,
            level: nextLevel,
            nextExpected: 1,
          };
        }
        return { ...state, numberPositions: newPositions, nextExpected: state.nextExpected + 1 };
      }

      return state;
    }

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export function useChimpGame() {
  const [gameData, dispatch] = useReducer(chimpGameReducer, initialState);

  const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), []);
  const handleTileClick = useCallback((tileIndex: number) => dispatch({ type: 'CLICK_TILE', tileIndex }), []);
  const resetGame = useCallback(() => dispatch({ type: 'RESET' }), []);
  const playAgain = useCallback(() => dispatch({ type: 'START_GAME' }), []);

  const getDuration = useCallback(() => {
    if (!gameData.startTime) return 0;
    return Date.now() - gameData.startTime;
  }, [gameData.startTime]);

  const getNumberAt = useCallback(
    (tileIndex: number): number | null => {
      for (const [num, pos] of gameData.numberPositions) {
        if (pos === tileIndex) return num;
      }
      return null;
    },
    [gameData.numberPositions]
  );

  return { gameData, startGame, handleTileClick, resetGame, playAgain, getDuration, getNumberAt };
}
