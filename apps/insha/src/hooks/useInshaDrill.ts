/**
 * Core drill hook — manages the insha exercise flow across 5 modes.
 *
 * 1. Show exercise prompt (varies by mode)
 * 2. Student interacts (selects option, types answer, arranges sentences)
 * 3. Submit → model answer revealed
 * 4. Self-rate: Again(0) / Hard(1) / Good(2) / Easy(3)
 * 5. Next exercise
 */

import { useState, useCallback, useMemo } from 'react';
import { useSrsEngine } from '@arabtools/srs/hooks';
import type { ResponseQuality } from '@arabtools/srs/types';
import type { InshaExercise, ExerciseFilters } from '../data/types';
import { ALL_EXERCISES, getFilteredExercises } from '../data/exercises';

export type DrillPhase = 'prompt' | 'answer' | 'complete';

export interface DrillState {
  phase: DrillPhase;
  currentExercise: InshaExercise | null;
  studentAnswer: string;
  selectedOption: string | null;
  arrangedSentences: number[];
  placedConnectors: Record<number, string>;
  exercisesReviewed: number;
  totalExercises: number;
  queue: InshaExercise[];
}

export function useInshaDrill(filters: ExerciseFilters) {
  const srs = useSrsEngine();

  const [drillState, setDrillState] = useState<DrillState>({
    phase: 'prompt',
    currentExercise: null,
    studentAnswer: '',
    selectedOption: null,
    arrangedSentences: [],
    placedConnectors: {},
    exercisesReviewed: 0,
    totalExercises: 0,
    queue: [],
  });

  // Ensure all exercises exist in SRS deck
  const ensureExercisesInDeck = useCallback(() => {
    const exercises = getFilteredExercises({
      mode: filters.mode,
      difficulty: filters.difficulty,
      nahwTopic: filters.nahwTopic,
    });

    for (const ex of exercises) {
      srs.addItem(
        ex.id,
        'grammar',
        ex.difficulty,
        ex.id,
        'insha-exercise',
      );
    }

    return exercises;
  }, [filters, srs]);

  // Build a drill queue from due exercises
  const startDrill = useCallback((maxExercises = 15) => {
    const exercises = ensureExercisesInDeck();

    // Get due SRS items
    const now = Date.now();
    const dueItemIds = new Set(
      srs.items
        .filter(item => item.contentType === 'insha-exercise' && item.due <= now)
        .sort((a, b) => a.due - b.due)
        .slice(0, maxExercises)
        .map(item => item.contentId),
    );

    // If not enough due items, add new ones
    let queue = exercises.filter(e => dueItemIds.has(e.id));

    if (queue.length < maxExercises) {
      const newItems = srs.items
        .filter(item =>
          item.contentType === 'insha-exercise' &&
          item.phase === 'new' &&
          !dueItemIds.has(item.contentId),
        )
        .slice(0, maxExercises - queue.length);

      const newExercises = newItems
        .map(item => exercises.find(e => e.id === item.contentId))
        .filter((e): e is InshaExercise => e !== undefined);

      queue = [...queue, ...newExercises];
    }

    if (queue.length === 0) {
      setDrillState(prev => ({ ...prev, phase: 'complete', totalExercises: 0 }));
      return;
    }

    const first = queue[0];
    setDrillState({
      phase: 'prompt',
      currentExercise: first,
      studentAnswer: '',
      selectedOption: null,
      arrangedSentences: first.sentences
        ? first.sentences.map((_, i) => i)
        : [],
      placedConnectors: {},
      exercisesReviewed: 0,
      totalExercises: queue.length,
      queue: queue.slice(1),
    });
  }, [ensureExercisesInDeck, srs.items]);

  const setStudentAnswer = useCallback((answer: string) => {
    setDrillState(prev => ({ ...prev, studentAnswer: answer }));
  }, []);

  const setSelectedOption = useCallback((option: string) => {
    setDrillState(prev => ({ ...prev, selectedOption: option }));
  }, []);

  const setArrangedSentences = useCallback((order: number[]) => {
    setDrillState(prev => ({ ...prev, arrangedSentences: order }));
  }, []);

  const setPlacedConnectors = useCallback((connectors: Record<number, string>) => {
    setDrillState(prev => ({ ...prev, placedConnectors: connectors }));
  }, []);

  const submitAnswer = useCallback(() => {
    setDrillState(prev => ({ ...prev, phase: 'answer' }));
  }, []);

  const rateExercise = useCallback((quality: ResponseQuality) => {
    if (!drillState.currentExercise) return;

    // Grade through SRS
    const exerciseItem = srs.items.find(
      i => i.contentId === drillState.currentExercise!.id && i.contentType === 'insha-exercise',
    );

    if (exerciseItem) {
      srs.startSession({
        maxItems: 1,
        maxNewItems: 1,
        newItemRatio: 1,
        pillars: [],
        interleave: false,
      });
      srs.gradeCard(quality);
      srs.nextCard();
    }

    // Move to next exercise
    const nextQueue = drillState.queue;
    if (nextQueue.length === 0) {
      setDrillState(prev => ({
        ...prev,
        phase: 'complete',
        exercisesReviewed: prev.exercisesReviewed + 1,
        currentExercise: null,
      }));
    } else {
      const next = nextQueue[0];
      setDrillState(prev => ({
        ...prev,
        phase: 'prompt',
        currentExercise: next,
        studentAnswer: '',
        selectedOption: null,
        arrangedSentences: next.sentences
          ? next.sentences.map((_, i) => i)
          : [],
        placedConnectors: {},
        exercisesReviewed: prev.exercisesReviewed + 1,
        queue: nextQueue.slice(1),
      }));
    }
  }, [drillState, srs]);

  // Dashboard stats
  const stats = useMemo(() => {
    const inshaItems = srs.items.filter(i => i.contentType === 'insha-exercise');
    const now = Date.now();
    return {
      totalExercises: ALL_EXERCISES.length,
      exercisesInDeck: inshaItems.length,
      dueNow: inshaItems.filter(i => i.due <= now).length,
      newExercises: inshaItems.filter(i => i.phase === 'new').length,
      learningExercises: inshaItems.filter(i => i.phase === 'learning' || i.phase === 'relearning').length,
      reviewExercises: inshaItems.filter(i => i.phase === 'review').length,
    };
  }, [srs.items]);

  return {
    drillState,
    stats,
    srsEngine: srs,
    startDrill,
    setStudentAnswer,
    setSelectedOption,
    setArrangedSentences,
    setPlacedConnectors,
    submitAnswer,
    rateExercise,
  };
}
