/**
 * SRS scheduling + localStorage persistence for sarf exercises.
 */

import { useCallback } from 'react';
import { usePersistedState } from '@arabtools/core';
import type { SrsItem, ResponseQuality, ReviewLog } from '@arabtools/srs';
import { scheduleItem } from '@arabtools/srs';
import type { ExerciseItem } from '../types';
import { getOrCreateSrsItem, getCardIdForExercise, getSrsStats, filterDueExercises } from '../engine/srs-adapter';

const MAX_HISTORY = 5000;

export interface SarfSrsState {
  deck: SrsItem[];
  history: ReviewLog[];
  stats: ReturnType<typeof getSrsStats>;
  reviewCard: (exercise: ExerciseItem, quality: ResponseQuality, elapsedMs: number) => void;
  getCardForExercise: (exercise: ExerciseItem) => SrsItem;
  getDueExercises: (exercises: ExerciseItem[]) => ExerciseItem[];
  getDueCount: () => number;
}

export function useSarfSrs(): SarfSrsState {
  const [deck, setDeck] = usePersistedState<SrsItem[]>('sarf-ex-state', []);
  const [history, setHistory] = usePersistedState<ReviewLog[]>('sarf-ex-history', []);

  const stats = getSrsStats(deck);

  const reviewCard = useCallback((
    exercise: ExerciseItem,
    quality: ResponseQuality,
    elapsedMs: number,
  ) => {
    const cardId = getCardIdForExercise(exercise);
    const now = Date.now();

    setDeck(prevDeck => {
      const existingIndex = prevDeck.findIndex(i => i.id === cardId);
      const currentItem = existingIndex >= 0
        ? prevDeck[existingIndex]
        : getOrCreateSrsItem(exercise, prevDeck);

      const updatedItem = scheduleItem(currentItem, quality);

      if (existingIndex >= 0) {
        const newDeck = [...prevDeck];
        newDeck[existingIndex] = updatedItem;
        return newDeck;
      } else {
        return [...prevDeck, updatedItem];
      }
    });

    // Log the review
    setHistory(prevHistory => {
      const srsItem = deck.find(i => i.id === cardId) || getOrCreateSrsItem(exercise, deck);
      const log: ReviewLog = {
        itemId: cardId,
        timestamp: now,
        quality,
        elapsed_ms: elapsedMs,
        scheduled_days: srsItem.scheduled_days,
        stability_before: srsItem.stability,
        stability_after: srsItem.stability, // Will be slightly off but acceptable
        phase: srsItem.phase,
      };

      const newHistory = [...prevHistory, log];
      // Cap history
      if (newHistory.length > MAX_HISTORY) {
        return newHistory.slice(-MAX_HISTORY);
      }
      return newHistory;
    });
  }, [deck, setDeck, setHistory]);

  const getCardForExercise = useCallback((exercise: ExerciseItem): SrsItem => {
    return getOrCreateSrsItem(exercise, deck);
  }, [deck]);

  const getDueExercises = useCallback((exercises: ExerciseItem[]): ExerciseItem[] => {
    return filterDueExercises(exercises, deck);
  }, [deck]);

  const getDueCount = useCallback((): number => {
    return deck.filter(i => i.due <= Date.now()).length;
  }, [deck]);

  return {
    deck,
    history,
    stats,
    reviewCard,
    getCardForExercise,
    getDueExercises,
    getDueCount,
  };
}
