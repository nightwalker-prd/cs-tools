import { useReducer, useCallback, useEffect, useRef } from 'react';
import type { WorkingMemoryGameData } from '../../types/games';

const GRID_SIZE = 9;
const INITIAL_N_BACK = 2;
const INITIAL_LIVES = 3;
const STREAK_TO_LEVEL_UP = 10;
const SHOW_DURATION = 800;
const PAUSE_DURATION = 500;

type Action =
  | { type: 'START_GAME' }
  | { type: 'SHOW_POSITION'; position: number }
  | { type: 'READY_FOR_RESPONSE' }
  | { type: 'RESPOND'; isMatch: boolean }
  | { type: 'RESET' };

function getInitialState(): WorkingMemoryGameData {
  return {
    state: 'IDLE',
    history: [],
    currentPosition: null,
    nBack: INITIAL_N_BACK,
    score: 0,
    lives: INITIAL_LIVES,
    streak: 0,
    round: 0,
    lastAnswerCorrect: null,
    startTime: null,
  };
}

function getRandomPosition(): number {
  return Math.floor(Math.random() * GRID_SIZE);
}

function reducer(state: WorkingMemoryGameData, action: Action): WorkingMemoryGameData {
  switch (action.type) {
    case 'START_GAME':
      return { ...getInitialState(), state: 'SHOWING', startTime: Date.now() };

    case 'SHOW_POSITION':
      return {
        ...state,
        state: 'SHOWING',
        history: [...state.history, action.position],
        currentPosition: action.position,
        round: state.round + 1,
        lastAnswerCorrect: null,
      };

    case 'READY_FOR_RESPONSE':
      return { ...state, state: 'RESPONDING', currentPosition: null };

    case 'RESPOND': {
      const { isMatch } = action;
      const { history, nBack, round, score, lives, streak } = state;
      const canHaveMatch = round > nBack;
      const actualMatch = canHaveMatch && history[history.length - 1] === history[history.length - 1 - nBack];
      const isCorrect = isMatch === actualMatch;

      if (!isCorrect) {
        const newLives = lives - 1;
        if (newLives <= 0) {
          return { ...state, state: 'GAME_OVER', lives: 0, streak: 0, lastAnswerCorrect: false };
        }
        return { ...state, state: 'SHOWING', lives: newLives, streak: 0, lastAnswerCorrect: false };
      }

      const newStreak = streak + 1;
      const newScore = score + 1;

      if (newStreak >= STREAK_TO_LEVEL_UP) {
        return { ...state, state: 'SHOWING', score: newScore, streak: 0, nBack: nBack + 1, lastAnswerCorrect: true };
      }
      return { ...state, state: 'SHOWING', score: newScore, streak: newStreak, lastAnswerCorrect: true };
    }

    case 'RESET':
      return getInitialState();

    default:
      return state;
  }
}

export function useWorkingMemoryGame() {
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

    if (gameData.state === 'SHOWING' && gameData.currentPosition === null) {
      timerRef.current = setTimeout(() => {
        dispatch({ type: 'SHOW_POSITION', position: getRandomPosition() });
      }, PAUSE_DURATION);
    }

    if (gameData.state === 'SHOWING' && gameData.currentPosition !== null) {
      timerRef.current = setTimeout(() => {
        dispatch({ type: 'READY_FOR_RESPONSE' });
      }, SHOW_DURATION);
    }

    if (gameData.state === 'RESPONDING' && gameData.lastAnswerCorrect !== null) {
      timerRef.current = setTimeout(() => {
        dispatch({ type: 'SHOW_POSITION', position: getRandomPosition() });
      }, PAUSE_DURATION);
    }
  }, [gameData.state, gameData.currentPosition, gameData.lastAnswerCorrect]);

  const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), []);
  const respond = useCallback(
    (isMatch: boolean) => {
      if (gameData.state === 'RESPONDING') dispatch({ type: 'RESPOND', isMatch });
    },
    [gameData.state]
  );
  const resetGame = useCallback(() => dispatch({ type: 'RESET' }), []);
  const playAgain = useCallback(() => dispatch({ type: 'START_GAME' }), []);

  const getDuration = useCallback(() => {
    if (!gameData.startTime) return 0;
    return Date.now() - gameData.startTime;
  }, [gameData.startTime]);

  return { gameData, startGame, respond, resetGame, playAgain, getDuration };
}
