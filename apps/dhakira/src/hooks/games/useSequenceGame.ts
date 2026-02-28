import { useReducer, useEffect, useCallback, useRef } from 'react';
import type { SequenceGameData } from '../../types/games';

const TILE_COUNT = 9;

const INITIAL_STATE: SequenceGameData = {
  state: 'IDLE',
  sequence: [],
  playerIndex: 0,
  level: 0,
  activeTile: null,
  lastClickResult: null,
  startTime: null,
};

type Action =
  | { type: 'START_GAME' }
  | { type: 'FINISH_SHOWING' }
  | { type: 'PLAYER_CLICK'; tile: number }
  | { type: 'CLEAR_FEEDBACK' }
  | { type: 'RESET' };

function getRandomTile(exclude?: number): number {
  if (exclude === undefined) {
    return Math.floor(Math.random() * TILE_COUNT);
  }
  const validTiles: number[] = [];
  for (let i = 0; i < TILE_COUNT; i++) {
    if (i !== exclude) validTiles.push(i);
  }
  return validTiles[Math.floor(Math.random() * validTiles.length)];
}

function reducer(state: SequenceGameData, action: Action): SequenceGameData {
  switch (action.type) {
    case 'START_GAME': {
      const firstTile = getRandomTile();
      return {
        ...INITIAL_STATE,
        state: 'SHOWING',
        sequence: [firstTile],
        level: 1,
        startTime: Date.now(),
      };
    }

    case 'FINISH_SHOWING':
      return { ...state, state: 'PLAYER_TURN', activeTile: null };

    case 'PLAYER_CLICK': {
      if (state.state !== 'PLAYER_TURN') return state;

      const expectedTile = state.sequence[state.playerIndex];
      const isCorrect = action.tile === expectedTile;

      if (!isCorrect) {
        return { ...state, state: 'GAME_OVER', lastClickResult: 'wrong' };
      }

      const isSequenceComplete = state.playerIndex === state.sequence.length - 1;

      if (isSequenceComplete) {
        const lastTile = state.sequence[state.sequence.length - 1];
        const newTile = getRandomTile(lastTile);
        return {
          ...state,
          state: 'SHOWING',
          sequence: [...state.sequence, newTile],
          playerIndex: 0,
          level: state.level + 1,
          lastClickResult: 'correct',
        };
      } else {
        return {
          ...state,
          playerIndex: state.playerIndex + 1,
          lastClickResult: 'correct',
        };
      }
    }

    case 'CLEAR_FEEDBACK':
      return { ...state, lastClickResult: null };

    case 'RESET':
      return INITIAL_STATE;

    default:
      return state;
  }
}

export function useSequenceGame() {
  const [gameData, dispatch] = useReducer(reducer, INITIAL_STATE);
  const lastClickedTileRef = useRef<number | null>(null);

  useEffect(() => {
    if (gameData.state !== 'SHOWING') return;
    const delay = gameData.sequence.length * 800 + 400;
    const timer = setTimeout(() => dispatch({ type: 'FINISH_SHOWING' }), delay);
    return () => clearTimeout(timer);
  }, [gameData.state, gameData.sequence.length]);

  useEffect(() => {
    if (gameData.lastClickResult === null) return;
    const timer = setTimeout(() => dispatch({ type: 'CLEAR_FEEDBACK' }), 300);
    return () => clearTimeout(timer);
  }, [gameData.lastClickResult]);

  const startGame = useCallback(() => {
    lastClickedTileRef.current = null;
    dispatch({ type: 'START_GAME' });
  }, []);

  const handleTileClick = useCallback((tile: number) => {
    lastClickedTileRef.current = tile;
    dispatch({ type: 'PLAYER_CLICK', tile });
  }, []);

  const resetGame = useCallback(() => {
    lastClickedTileRef.current = null;
    dispatch({ type: 'RESET' });
  }, []);

  const playAgain = useCallback(() => {
    lastClickedTileRef.current = null;
    dispatch({ type: 'START_GAME' });
  }, []);

  const getDuration = useCallback(() => {
    if (gameData.startTime === null) return 0;
    return Math.floor((Date.now() - gameData.startTime) / 1000);
  }, [gameData.startTime]);

  return {
    gameData,
    lastClickedTile: lastClickedTileRef.current,
    startGame,
    handleTileClick,
    resetGame,
    playAgain,
    getDuration,
  };
}
