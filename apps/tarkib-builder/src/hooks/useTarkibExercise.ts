import { useState, useCallback, useEffect, useRef } from 'react';
import type { TarkibExercise, SlotResult, ExerciseResult } from '../data/types';
import { type Placement, validatePlacement, allSlotsFilled, calculateScore } from '../utils/validation';

export function useTarkibExercise(exercise: TarkibExercise) {
  const [placement, setPlacement] = useState<Placement>(() => {
    const initial: Placement = {};
    for (const slot of exercise.slots) {
      initial[slot.id] = null;
    }
    return initial;
  });

  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [slotResults, setSlotResults] = useState<SlotResult[] | null>(null);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(Date.now());

  // Running timer
  useEffect(() => {
    if (isComplete) return;
    const interval = setInterval(() => {
      setElapsedTime(Math.round((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isComplete]);

  /** Words that are already placed in a slot */
  const usedWordIds = new Set(Object.values(placement).filter(Boolean) as string[]);

  /** Select a word from the word bank */
  const selectWord = useCallback((wordId: string) => {
    if (selectedWordId === wordId) {
      setSelectedWordId(null);
      return;
    }
    setSelectedWordId(wordId);
  }, [selectedWordId]);

  /** Place the selected word into a slot */
  const placeInSlot = useCallback((slotId: string) => {
    if (isComplete) return;

    const currentWord = placement[slotId];

    if (selectedWordId) {
      setPlacement(prev => {
        const next = { ...prev };
        for (const key of Object.keys(next)) {
          if (next[key] === selectedWordId) {
            next[key] = null;
          }
        }
        next[slotId] = selectedWordId;
        return next;
      });
      setSelectedWordId(null);
      setSlotResults(null);
    } else if (currentWord) {
      setPlacement(prev => ({ ...prev, [slotId]: null }));
      setSlotResults(null);
    }
  }, [selectedWordId, placement, isComplete]);

  /** Direct drop (for drag-and-drop) */
  const dropInSlot = useCallback((slotId: string, wordId: string) => {
    if (isComplete) return;
    setPlacement(prev => {
      const next = { ...prev };
      for (const key of Object.keys(next)) {
        if (next[key] === wordId) {
          next[key] = null;
        }
      }
      next[slotId] = wordId;
      return next;
    });
    setSelectedWordId(null);
    setSlotResults(null);
  }, [isComplete]);

  /** Remove a word from a slot */
  const removeFromSlot = useCallback((slotId: string) => {
    if (isComplete) return;
    setPlacement(prev => ({ ...prev, [slotId]: null }));
    setSlotResults(null);
  }, [isComplete]);

  /** Check the current placement — only increment mistakeCount when there are errors */
  const checkAnswer = useCallback((): SlotResult[] => {
    const results = validatePlacement(
      exercise.slots,
      placement,
      exercise.wordBank,
      exercise.validationRules,
    );
    setSlotResults(results);

    const allCorrect = results.every(r => r.isCorrect);
    if (allCorrect) {
      setIsComplete(true);
    } else {
      setMistakeCount(prev => prev + 1);
    }

    return results;
  }, [exercise, placement]);

  /** Use a hint */
  const useHint = useCallback(() => {
    setHintsUsed(true);
  }, []);

  /** Reveal correct answer */
  const revealAnswer = useCallback(() => {
    setShowAnswer(true);
    // Place correct words in all slots
    setPlacement(() => {
      const correct: Placement = {};
      for (const slot of exercise.slots) {
        correct[slot.id] = slot.expectedWordId;
      }
      return correct;
    });
    setSlotResults(exercise.slots.map(slot => ({ slotId: slot.id, isCorrect: true })));
    setIsComplete(true);
  }, [exercise]);

  /** Reset the exercise */
  const reset = useCallback(() => {
    const initial: Placement = {};
    for (const slot of exercise.slots) {
      initial[slot.id] = null;
    }
    setPlacement(initial);
    setSelectedWordId(null);
    setSlotResults(null);
    setMistakeCount(0);
    setHintsUsed(false);
    setIsComplete(false);
    setShowAnswer(false);
    setElapsedTime(0);
    startTimeRef.current = Date.now();
  }, [exercise]);

  /** Whether all slots are filled (can check) */
  const canCheck = allSlotsFilled(exercise.slots, placement) && !isComplete;

  /** Get the final result */
  const getResult = useCallback((): ExerciseResult | null => {
    if (!isComplete || !slotResults) return null;
    // If answer was revealed, score is 0
    const score = showAnswer
      ? 0
      : calculateScore(slotResults, mistakeCount, hintsUsed, elapsedTime);
    return {
      exerciseId: exercise.id,
      slotResults,
      allCorrect: true,
      score,
      attempts: mistakeCount + 1,
      timeSpent: elapsedTime,
      hintsUsed,
    };
  }, [exercise.id, isComplete, slotResults, mistakeCount, hintsUsed, elapsedTime, showAnswer]);

  return {
    placement,
    selectedWordId,
    slotResults,
    mistakeCount,
    hintsUsed,
    isComplete,
    showAnswer,
    elapsedTime,
    usedWordIds,
    canCheck,
    selectWord,
    placeInSlot,
    dropInSlot,
    removeFromSlot,
    checkAnswer,
    useHint,
    revealAnswer,
    reset,
    getResult,
  };
}
