import { useState, useCallback, useRef } from 'react';
import type {
  EngineState,
  PlacementQuestion,
  PlacementResult,
  QuestionPool,
} from '../types';
import {
  initEngine,
  selectNextCategory,
  selectQuestion,
  processAnswer,
  isTestComplete,
} from '../engine/adaptive-engine';
import { computeResult } from '../engine/scoring';
import { CATEGORY_MAP } from '../data/category-map';

interface UsePlacementTestResult {
  engineState: EngineState | null;
  currentQuestion: PlacementQuestion | null;
  currentCategoryLabel: string;
  feedbackState: 'none' | 'correct' | 'incorrect';
  selectedIndex: number | null;
  start: () => void;
  answer: (optionIndex: number) => void;
  endEarly: () => PlacementResult | null;
}

export function usePlacementTest(
  pool: QuestionPool | null,
  maxQuestions: number,
  onComplete: (result: PlacementResult) => void,
): UsePlacementTestResult {
  const [engineState, setEngineState] = useState<EngineState | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<PlacementQuestion | null>(null);
  const [currentCategoryLabel, setCurrentCategoryLabel] = useState('');
  const [feedbackState, setFeedbackState] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const usedIds = useRef(new Set<string>());

  const advanceToNext = useCallback((state: EngineState, qPool: QuestionPool) => {
    if (isTestComplete(state)) {
      const result = computeResult(state);
      onComplete(result);
      return;
    }

    const nextCat = selectNextCategory(state);
    if (!nextCat) {
      const result = computeResult(state);
      onComplete(result);
      return;
    }

    const question = selectQuestion(qPool, nextCat, usedIds.current);
    if (!question) {
      // Mark category done if no questions available
      const updatedState: EngineState = {
        ...state,
        categories: state.categories.map(c =>
          c.categoryId === nextCat.categoryId ? { ...c, isDone: true } : c
        ),
      };
      setEngineState(updatedState);
      // Recurse to find next category
      advanceToNext(updatedState, qPool);
      return;
    }

    usedIds.current.add(question.id);
    const def = CATEGORY_MAP.get(nextCat.categoryId);
    setCurrentCategoryLabel(def?.label ?? nextCat.categoryId);
    setCurrentQuestion(question);
    setFeedbackState('none');
    setSelectedIndex(null);
  }, [onComplete]);

  const start = useCallback(() => {
    if (!pool) return;
    usedIds.current = new Set();
    const state = initEngine(pool, maxQuestions);
    setEngineState(state);
    advanceToNext(state, pool);
  }, [pool, maxQuestions, advanceToNext]);

  const answer = useCallback((optionIndex: number) => {
    if (!engineState || !currentQuestion || !pool || feedbackState !== 'none') return;

    const correct = optionIndex === currentQuestion.correctIndex;
    setSelectedIndex(optionIndex);
    setFeedbackState(correct ? 'correct' : 'incorrect');

    const newState = processAnswer(engineState, currentQuestion.categoryId, correct);
    setEngineState(newState);

    // Brief feedback delay then advance
    setTimeout(() => {
      advanceToNext(newState, pool);
    }, 800);
  }, [engineState, currentQuestion, pool, feedbackState, advanceToNext]);

  const endEarly = useCallback((): PlacementResult | null => {
    if (!engineState) return null;
    const result = computeResult(engineState);
    onComplete(result);
    return result;
  }, [engineState, onComplete]);

  return {
    engineState,
    currentQuestion,
    currentCategoryLabel,
    feedbackState,
    selectedIndex,
    start,
    answer,
    endEarly,
  };
}
