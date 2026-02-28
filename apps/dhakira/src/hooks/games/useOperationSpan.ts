import { useReducer, useCallback, useEffect, useRef } from 'react';
import type { OperationSpanGameData, MathProblem } from '../../types/games';
import { OPERATION_SPAN_LETTERS } from '../../data/operation-span-letters';

const LETTER_DISPLAY_DURATION = 1000;
const FEEDBACK_DURATION = 2000;
const MIN_SPAN = 3;
const MAX_SPAN = 7;
const TRIALS_PER_SPAN = 3;

type Action =
  | { type: 'START_GAME' }
  | { type: 'ANSWER_MATH'; isCorrect: boolean }
  | { type: 'SHOW_LETTER' }
  | { type: 'LETTER_SHOWN' }
  | { type: 'START_RECALL' }
  | { type: 'SELECT_LETTER'; letter: string }
  | { type: 'CLEAR_RECALL' }
  | { type: 'SUBMIT_RECALL' }
  | { type: 'NEXT_TRIAL' }
  | { type: 'RESET' };

function getInitialState(): OperationSpanGameData {
  return {
    state: 'IDLE',
    currentSpan: MIN_SPAN,
    currentTrial: 1,
    currentItem: 0,
    mathProblem: null,
    currentLetter: null,
    lettersToRemember: [],
    playerRecall: [],
    score: 0,
    spanScores: [],
    mathCorrect: 0,
    mathTotal: 0,
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

function generateMathProblem(): MathProblem {
  let op1 = Math.floor(Math.random() * 9) + 1;
  let op2 = Math.floor(Math.random() * 9) + 1;
  const operation: '+' | '-' = Math.random() < 0.5 ? '+' : '-';

  if (operation === '-' && op1 < op2) [op1, op2] = [op2, op1];

  const correctAnswer = operation === '+' ? op1 + op2 : op1 - op2;
  const isCorrect = Math.random() < 0.5;

  let shownAnswer = correctAnswer;
  if (!isCorrect) {
    const offset = Math.random() < 0.5 ? 1 : 2;
    const direction = Math.random() < 0.5 ? 1 : -1;
    shownAnswer = correctAnswer + offset * direction;
    if (shownAnswer < 0) shownAnswer = correctAnswer + offset;
  }

  return { operand1: op1, operand2: op2, operation, shownAnswer, isCorrect };
}

function selectLettersForTrial(count: number): string[] {
  const shuffled = fisherYatesShuffle([...OPERATION_SPAN_LETTERS]);
  return shuffled.slice(0, count);
}

function calculateTrialScore(target: string[], recall: string[]): number {
  let score = 0;
  for (let i = 0; i < target.length; i++) {
    if (recall[i] === target[i]) score++;
  }
  return score;
}

function reducer(state: OperationSpanGameData, action: Action): OperationSpanGameData {
  switch (action.type) {
    case 'START_GAME': {
      const letters = selectLettersForTrial(MIN_SPAN);
      return {
        ...getInitialState(),
        state: 'MATH',
        mathProblem: generateMathProblem(),
        lettersToRemember: letters,
        startTime: Date.now(),
      };
    }

    case 'ANSWER_MATH': {
      const mathCorrect =
        action.isCorrect === state.mathProblem?.isCorrect ? state.mathCorrect + 1 : state.mathCorrect;
      return {
        ...state,
        state: 'LETTER',
        currentLetter: state.lettersToRemember[state.currentItem],
        mathCorrect,
        mathTotal: state.mathTotal + 1,
      };
    }

    case 'LETTER_SHOWN': {
      const nextItem = state.currentItem + 1;
      if (nextItem >= state.currentSpan) {
        return { ...state, state: 'RECALL', currentLetter: null, currentItem: nextItem };
      }
      return {
        ...state,
        state: 'MATH',
        currentLetter: null,
        currentItem: nextItem,
        mathProblem: generateMathProblem(),
      };
    }

    case 'SELECT_LETTER': {
      if (state.playerRecall.length >= state.currentSpan) return state;
      return { ...state, playerRecall: [...state.playerRecall, action.letter] };
    }

    case 'CLEAR_RECALL':
      return { ...state, playerRecall: [] };

    case 'SUBMIT_RECALL': {
      const trialScore = calculateTrialScore(state.lettersToRemember, state.playerRecall);
      const spanIndex = state.currentSpan - MIN_SPAN;
      const newSpanScores = [...state.spanScores];
      newSpanScores[spanIndex] = (newSpanScores[spanIndex] || 0) + trialScore;
      return { ...state, state: 'FEEDBACK', score: state.score + trialScore, spanScores: newSpanScores };
    }

    case 'NEXT_TRIAL': {
      const nextTrial = state.currentTrial + 1;
      if (nextTrial > TRIALS_PER_SPAN) {
        const nextSpan = state.currentSpan + 1;
        if (nextSpan > MAX_SPAN) return { ...state, state: 'RESULTS' };

        const letters = selectLettersForTrial(nextSpan);
        return {
          ...state,
          state: 'MATH',
          currentSpan: nextSpan,
          currentTrial: 1,
          currentItem: 0,
          mathProblem: generateMathProblem(),
          currentLetter: null,
          lettersToRemember: letters,
          playerRecall: [],
        };
      }

      const letters = selectLettersForTrial(state.currentSpan);
      return {
        ...state,
        state: 'MATH',
        currentTrial: nextTrial,
        currentItem: 0,
        mathProblem: generateMathProblem(),
        currentLetter: null,
        lettersToRemember: letters,
        playerRecall: [],
      };
    }

    case 'RESET':
      return getInitialState();

    default:
      return state;
  }
}

export function useOperationSpan() {
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

    if (gameData.state === 'LETTER' && gameData.currentLetter !== null) {
      timerRef.current = setTimeout(() => dispatch({ type: 'LETTER_SHOWN' }), LETTER_DISPLAY_DURATION);
    }

    if (gameData.state === 'FEEDBACK') {
      timerRef.current = setTimeout(() => dispatch({ type: 'NEXT_TRIAL' }), FEEDBACK_DURATION);
    }
  }, [gameData.state, gameData.currentLetter]);

  const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), []);

  const answerMath = useCallback(
    (isCorrect: boolean) => {
      if (gameData.state === 'MATH') dispatch({ type: 'ANSWER_MATH', isCorrect });
    },
    [gameData.state]
  );

  const selectLetter = useCallback(
    (letter: string) => {
      if (gameData.state === 'RECALL') dispatch({ type: 'SELECT_LETTER', letter });
    },
    [gameData.state]
  );

  const clearRecall = useCallback(() => {
    if (gameData.state === 'RECALL') dispatch({ type: 'CLEAR_RECALL' });
  }, [gameData.state]);

  const submitRecall = useCallback(() => {
    if (gameData.state === 'RECALL') dispatch({ type: 'SUBMIT_RECALL' });
  }, [gameData.state]);

  const resetGame = useCallback(() => dispatch({ type: 'RESET' }), []);
  const playAgain = useCallback(() => dispatch({ type: 'START_GAME' }), []);

  const getDuration = useCallback(() => {
    if (!gameData.startTime) return 0;
    return Date.now() - gameData.startTime;
  }, [gameData.startTime]);

  const getMaxScore = useCallback(() => TRIALS_PER_SPAN * (3 + 4 + 5 + 6 + 7), []);

  const getMathAccuracy = useCallback(() => {
    if (gameData.mathTotal === 0) return 0;
    return Math.round((gameData.mathCorrect / gameData.mathTotal) * 100);
  }, [gameData.mathCorrect, gameData.mathTotal]);

  const getOverallTrial = useCallback(() => {
    const completedSpans = gameData.currentSpan - MIN_SPAN;
    return completedSpans * TRIALS_PER_SPAN + gameData.currentTrial;
  }, [gameData.currentSpan, gameData.currentTrial]);

  return {
    gameData,
    startGame,
    answerMath,
    selectLetter,
    clearRecall,
    submitRecall,
    resetGame,
    playAgain,
    getDuration,
    getMaxScore,
    getMathAccuracy,
    getOverallTrial,
    LETTERS: OPERATION_SPAN_LETTERS,
  };
}
