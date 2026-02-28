import { useReducer, useCallback, useEffect, useRef } from 'react';
import type { DualNBackGameData, DualNBackTrial } from '../../types/games';
import {
  DUAL_NBACK_LETTERS,
  GRID_SIZE,
  BLOCKS_PER_SESSION,
  BASE_TRIALS_PER_BLOCK,
  STIMULUS_DURATION,
  RESPONSE_WINDOW,
  INTER_TRIAL_INTERVAL,
  BLOCK_PAUSE,
  MATCH_PROBABILITY,
  ADVANCE_THRESHOLD,
  DROP_THRESHOLD,
  MIN_N,
  MAX_N,
  STARTING_N,
} from '../../data/dual-n-back-config';

type Action =
  | { type: 'START_SESSION' }
  | { type: 'START_TRIAL'; trial: DualNBackTrial }
  | { type: 'END_STIMULUS' }
  | { type: 'PRESS_POSITION' }
  | { type: 'PRESS_LETTER' }
  | { type: 'END_RESPONSE_WINDOW' }
  | { type: 'START_NEXT_TRIAL' }
  | { type: 'END_BLOCK' }
  | { type: 'START_NEXT_BLOCK' }
  | { type: 'RESET' };

function getInitialState(): DualNBackGameData {
  return {
    state: 'IDLE',
    nBack: STARTING_N,
    currentBlock: 0,
    currentTrial: 0,
    trialsInBlock: BASE_TRIALS_PER_BLOCK + STARTING_N,
    history: [],
    currentPosition: null,
    currentLetter: null,
    playerPressedPosition: false,
    playerPressedLetter: false,
    positionFeedback: null,
    letterFeedback: null,
    positionHits: 0,
    positionMisses: 0,
    positionFalseAlarms: 0,
    letterHits: 0,
    letterMisses: 0,
    letterFalseAlarms: 0,
    highestN: STARTING_N,
    blocksCompleted: 0,
    startTime: null,
  };
}

function getRandomPosition(exclude?: number): number {
  let pos: number;
  do {
    pos = Math.floor(Math.random() * GRID_SIZE);
  } while (pos === exclude);
  return pos;
}

function getRandomLetter(exclude?: string): string {
  let letter: string;
  do {
    letter = DUAL_NBACK_LETTERS[Math.floor(Math.random() * DUAL_NBACK_LETTERS.length)];
  } while (letter === exclude);
  return letter;
}

function generateTrial(history: DualNBackTrial[], nBack: number, trialIndex: number): DualNBackTrial {
  const canHaveMatch = trialIndex >= nBack;
  const shouldPositionMatch = canHaveMatch && Math.random() < MATCH_PROBABILITY;
  const shouldLetterMatch = canHaveMatch && Math.random() < MATCH_PROBABILITY;

  let position: number;
  let letter: string;

  if (shouldPositionMatch) {
    position = history[trialIndex - nBack].position;
  } else if (canHaveMatch) {
    position = getRandomPosition(history[trialIndex - nBack].position);
  } else {
    position = getRandomPosition();
  }

  if (shouldLetterMatch) {
    letter = history[trialIndex - nBack].letter;
  } else if (canHaveMatch) {
    letter = getRandomLetter(history[trialIndex - nBack].letter);
  } else {
    letter = getRandomLetter();
  }

  const positionMatch = canHaveMatch && position === history[trialIndex - nBack].position;
  const letterMatch = canHaveMatch && letter === history[trialIndex - nBack].letter;

  return { position, letter, positionMatch, letterMatch };
}

function calculateAccuracy(hits: number, misses: number, falseAlarms: number): number {
  const total = hits + misses + falseAlarms;
  if (total === 0) return 1;
  return hits / total;
}

function reducer(state: DualNBackGameData, action: Action): DualNBackGameData {
  switch (action.type) {
    case 'START_SESSION': {
      const trialsInBlock = BASE_TRIALS_PER_BLOCK + STARTING_N;
      return { ...getInitialState(), state: 'PLAYING', currentBlock: 1, currentTrial: 1, trialsInBlock, startTime: Date.now() };
    }

    case 'START_TRIAL': {
      const newHistory = [...state.history, action.trial];
      return {
        ...state,
        state: 'PLAYING',
        currentPosition: action.trial.position,
        currentLetter: action.trial.letter,
        playerPressedPosition: false,
        playerPressedLetter: false,
        positionFeedback: null,
        letterFeedback: null,
        history: newHistory,
      };
    }

    case 'END_STIMULUS':
      return { ...state, state: 'RESPONDING' };

    case 'PRESS_POSITION': {
      if (state.state !== 'RESPONDING' && state.state !== 'PLAYING') return state;
      return { ...state, playerPressedPosition: true };
    }

    case 'PRESS_LETTER': {
      if (state.state !== 'RESPONDING' && state.state !== 'PLAYING') return state;
      return { ...state, playerPressedLetter: true };
    }

    case 'END_RESPONSE_WINDOW': {
      const currentTrialData = state.history[state.history.length - 1];
      if (!currentTrialData) return state;

      let positionFeedback: 'hit' | 'miss' | 'false-alarm' | null = null;
      let positionHits = state.positionHits;
      let positionMisses = state.positionMisses;
      let positionFalseAlarms = state.positionFalseAlarms;

      if (currentTrialData.positionMatch) {
        if (state.playerPressedPosition) { positionFeedback = 'hit'; positionHits++; }
        else { positionFeedback = 'miss'; positionMisses++; }
      } else {
        if (state.playerPressedPosition) { positionFeedback = 'false-alarm'; positionFalseAlarms++; }
      }

      let letterFeedback: 'hit' | 'miss' | 'false-alarm' | null = null;
      let letterHits = state.letterHits;
      let letterMisses = state.letterMisses;
      let letterFalseAlarms = state.letterFalseAlarms;

      if (currentTrialData.letterMatch) {
        if (state.playerPressedLetter) { letterFeedback = 'hit'; letterHits++; }
        else { letterFeedback = 'miss'; letterMisses++; }
      } else {
        if (state.playerPressedLetter) { letterFeedback = 'false-alarm'; letterFalseAlarms++; }
      }

      return {
        ...state,
        positionFeedback,
        letterFeedback,
        positionHits,
        positionMisses,
        positionFalseAlarms,
        letterHits,
        letterMisses,
        letterFalseAlarms,
        currentPosition: null,
        currentLetter: null,
      };
    }

    case 'START_NEXT_TRIAL': {
      const nextTrial = state.currentTrial + 1;
      if (nextTrial > state.trialsInBlock) {
        return { ...state, state: 'BLOCK_COMPLETE' };
      }
      return { ...state, currentTrial: nextTrial, positionFeedback: null, letterFeedback: null };
    }

    case 'END_BLOCK': {
      const positionAccuracy = calculateAccuracy(state.positionHits, state.positionMisses, state.positionFalseAlarms);
      const letterAccuracy = calculateAccuracy(state.letterHits, state.letterMisses, state.letterFalseAlarms);

      let nextN = state.nBack;
      if (positionAccuracy >= ADVANCE_THRESHOLD && letterAccuracy >= ADVANCE_THRESHOLD) {
        nextN = Math.min(state.nBack + 1, MAX_N);
      } else if (positionAccuracy < DROP_THRESHOLD || letterAccuracy < DROP_THRESHOLD) {
        nextN = Math.max(state.nBack - 1, MIN_N);
      }

      return {
        ...state,
        nBack: nextN,
        highestN: Math.max(state.highestN, state.nBack),
        blocksCompleted: state.blocksCompleted + 1,
      };
    }

    case 'START_NEXT_BLOCK': {
      if (state.blocksCompleted >= BLOCKS_PER_SESSION) {
        return { ...state, state: 'SESSION_COMPLETE' };
      }
      const trialsInBlock = BASE_TRIALS_PER_BLOCK + state.nBack;
      return {
        ...state,
        state: 'PLAYING',
        currentBlock: state.currentBlock + 1,
        currentTrial: 1,
        trialsInBlock,
        history: [],
        positionHits: 0,
        positionMisses: 0,
        positionFalseAlarms: 0,
        letterHits: 0,
        letterMisses: 0,
        letterFalseAlarms: 0,
        positionFeedback: null,
        letterFeedback: null,
      };
    }

    case 'RESET':
      return getInitialState();

    default:
      return state;
  }
}

export function useDualNBack() {
  const [gameData, dispatch] = useReducer(reducer, getInitialState());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseRef = useRef<'stimulus' | 'response' | 'inter-trial' | 'block-pause'>('stimulus');

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

    if (gameData.state === 'PLAYING' && gameData.currentPosition === null && gameData.currentTrial <= gameData.trialsInBlock) {
      const trialIndex = gameData.history.length;
      const trial = generateTrial(gameData.history, gameData.nBack, trialIndex);
      dispatch({ type: 'START_TRIAL', trial });
      phaseRef.current = 'stimulus';
      return;
    }

    if (gameData.state === 'PLAYING' && gameData.currentPosition !== null) {
      timerRef.current = setTimeout(() => {
        dispatch({ type: 'END_STIMULUS' });
        phaseRef.current = 'response';
      }, STIMULUS_DURATION);
      return;
    }

    if (gameData.state === 'RESPONDING') {
      timerRef.current = setTimeout(() => {
        dispatch({ type: 'END_RESPONSE_WINDOW' });
        phaseRef.current = 'inter-trial';
        setTimeout(() => dispatch({ type: 'START_NEXT_TRIAL' }), INTER_TRIAL_INTERVAL);
      }, RESPONSE_WINDOW);
      return;
    }

    if (gameData.state === 'BLOCK_COMPLETE') {
      dispatch({ type: 'END_BLOCK' });
      timerRef.current = setTimeout(() => {
        dispatch({ type: 'START_NEXT_BLOCK' });
        phaseRef.current = 'stimulus';
      }, BLOCK_PAUSE);
      return;
    }
  }, [gameData.state, gameData.currentPosition, gameData.currentTrial, gameData.trialsInBlock, gameData.history, gameData.nBack]);

  const startSession = useCallback(() => dispatch({ type: 'START_SESSION' }), []);
  const pressPosition = useCallback(() => dispatch({ type: 'PRESS_POSITION' }), []);
  const pressLetter = useCallback(() => dispatch({ type: 'PRESS_LETTER' }), []);
  const resetGame = useCallback(() => dispatch({ type: 'RESET' }), []);
  const playAgain = useCallback(() => dispatch({ type: 'START_SESSION' }), []);

  const getDuration = useCallback(() => {
    if (!gameData.startTime) return 0;
    return Date.now() - gameData.startTime;
  }, [gameData.startTime]);

  const getPositionAccuracy = useCallback(
    () => calculateAccuracy(gameData.positionHits, gameData.positionMisses, gameData.positionFalseAlarms),
    [gameData.positionHits, gameData.positionMisses, gameData.positionFalseAlarms]
  );

  const getLetterAccuracy = useCallback(
    () => calculateAccuracy(gameData.letterHits, gameData.letterMisses, gameData.letterFalseAlarms),
    [gameData.letterHits, gameData.letterMisses, gameData.letterFalseAlarms]
  );

  const canRespond = gameData.state === 'PLAYING' || gameData.state === 'RESPONDING';

  return {
    gameData,
    startSession,
    pressPosition,
    pressLetter,
    resetGame,
    playAgain,
    getDuration,
    getPositionAccuracy,
    getLetterAccuracy,
    canRespond,
    BLOCKS_PER_SESSION,
  };
}
