/**
 * Session lifecycle hook: config → exercise → results
 */

import { useState, useCallback } from 'react';
import { usePersistedState } from '@arabtools/core';
import type { SessionConfig, SessionState, SessionResults, AnswerResult, ExerciseItem, ExerciseType } from '../types';
import type { SarfSrsState } from './useSarfSrs';
import type { Route } from './useHashRouter';
import { generateExercises } from '../engine/exercise-generator';

export interface ExerciseSession {
  state: SessionState | null;
  results: SessionResults | null;
  start: (config: SessionConfig) => void;
  submitAnswer: (result: AnswerResult) => void;
  currentExercise: ExerciseItem | null;
  progress: { current: number; total: number; percentage: number };
  quit: () => void;
}

export function useExerciseSession(
  srs: SarfSrsState,
  navigate: (route: Route) => void,
): ExerciseSession {
  const [state, setState] = useState<SessionState | null>(null);
  const [results, setResults] = useState<SessionResults | null>(null);
  const [, setSavedConfig] = usePersistedState<SessionConfig>('sarf-ex-config', {
    unitIds: ['sarf-unit-1'],
    exerciseTypes: ['conjugation'],
    categories: [],
    answerMode: 'mc',
    translationDirection: 'ar-to-en',
    sessionSize: 20,
    srsEnabled: true,
  });

  const start = useCallback((config: SessionConfig) => {
    // Save config for next time
    setSavedConfig(config);

    // Generate exercises
    let exercises = generateExercises(config);

    // If SRS is enabled, prioritize due cards
    if (config.srsEnabled && exercises.length > 0) {
      const dueExercises = srs.getDueExercises(exercises);
      if (dueExercises.length > 0) {
        exercises = dueExercises.length >= config.sessionSize
          ? dueExercises.slice(0, config.sessionSize)
          : [...dueExercises, ...exercises.filter(e => !dueExercises.includes(e))].slice(0, config.sessionSize);
      }
    }

    if (exercises.length === 0) {
      console.warn('[sarf-exercises] No exercises generated. Check verb data and conjugation compatibility.');
      return;
    }

    setState({
      config,
      exercises,
      currentIndex: 0,
      answers: [],
      startTime: Date.now(),
    });
    setResults(null);
    navigate('exercise');
  }, [srs, navigate, setSavedConfig]);

  const submitAnswer = useCallback((result: AnswerResult) => {
    setState(prev => {
      if (!prev) return prev;

      const newAnswers = [...prev.answers, result];
      const nextIndex = prev.currentIndex + 1;

      // Check if session is complete
      if (nextIndex >= prev.exercises.length) {
        // Build results
        const sessionResults = buildResults(prev.config, newAnswers, prev.exercises, prev.startTime);
        setResults(sessionResults);

        // Navigate to results after a short delay
        setTimeout(() => navigate('results'), 100);

        return { ...prev, answers: newAnswers, currentIndex: nextIndex };
      }

      return { ...prev, answers: newAnswers, currentIndex: nextIndex };
    });
  }, [navigate]);

  const quit = useCallback(() => {
    if (state && state.answers.length > 0) {
      const sessionResults = buildResults(state.config, state.answers, state.exercises.slice(0, state.answers.length), state.startTime);
      setResults(sessionResults);
      navigate('results');
    } else {
      setState(null);
      navigate('');
    }
  }, [state, navigate]);

  const currentExercise = state && state.currentIndex < state.exercises.length
    ? state.exercises[state.currentIndex]
    : null;

  const progress = state
    ? {
        current: state.currentIndex + 1,
        total: state.exercises.length,
        percentage: Math.round(((state.currentIndex) / state.exercises.length) * 100),
      }
    : { current: 0, total: 0, percentage: 0 };

  return {
    state,
    results,
    start,
    submitAnswer,
    currentExercise,
    progress,
    quit,
  };
}

function buildResults(
  config: SessionConfig,
  answers: AnswerResult[],
  exercises: ExerciseItem[],
  startTime: number,
): SessionResults {
  const correctCount = answers.filter(a => a.isCorrect).length;

  const byType: Record<ExerciseType, { correct: number; total: number }> = {
    conjugation: { correct: 0, total: 0 },
    translation: { correct: 0, total: 0 },
    labeling: { correct: 0, total: 0 },
  };

  const byCategory: Record<string, { correct: number; total: number }> = {};

  exercises.forEach((ex, i) => {
    if (i >= answers.length) return;
    const answer = answers[i];

    // By type
    byType[ex.type].total++;
    if (answer.isCorrect) byType[ex.type].correct++;

    // By category
    const cat = ex.seegah.category;
    if (!byCategory[cat]) byCategory[cat] = { correct: 0, total: 0 };
    byCategory[cat].total++;
    if (answer.isCorrect) byCategory[cat].correct++;
  });

  return {
    config,
    answers,
    exercises,
    totalTime: Date.now() - startTime,
    score: correctCount,
    totalQuestions: answers.length,
    byType,
    byCategory,
  };
}
