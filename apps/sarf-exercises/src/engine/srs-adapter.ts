/**
 * Maps sarf exercise cards to @arabtools/srs SrsItem interface.
 *
 * Card ID format: sarf-ex:{root}:{verbForm}:{seegahNumber}:{exerciseType}
 */

import type { SrsItem } from '@arabtools/srs';
import { createSrsItem } from '@arabtools/srs';
import type { ExerciseItem, ExerciseType } from '../types';

/**
 * Build a card ID from exercise parameters.
 */
export function buildCardId(
  root: string,
  verbForm: string,
  seegahNumber: number,
  exerciseType: ExerciseType,
): string {
  return `sarf-ex:${root}:${verbForm}:${seegahNumber}:${exerciseType}`;
}

/**
 * Parse a card ID back to its components.
 */
export function parseCardId(cardId: string): {
  root: string;
  verbForm: string;
  seegahNumber: number;
  exerciseType: ExerciseType;
} | null {
  const parts = cardId.split(':');
  if (parts.length !== 5 || parts[0] !== 'sarf-ex') return null;
  return {
    root: parts[1],
    verbForm: parts[2],
    seegahNumber: parseInt(parts[3], 10),
    exerciseType: parts[4] as ExerciseType,
  };
}

/**
 * Get or create an SrsItem for an exercise.
 */
export function getOrCreateSrsItem(
  exercise: ExerciseItem,
  deck: SrsItem[],
): SrsItem {
  const cardId = buildCardId(
    exercise.verb.root,
    exercise.verb.verbForm || 'I',
    exercise.seegah.number,
    exercise.type,
  );

  const existing = deck.find(item => item.id === cardId);
  if (existing) return existing;

  return createSrsItem(
    cardId,
    'grammar',
    exercise.verb.difficulty || 'beginner',
    `${exercise.verb.root}:${exercise.seegah.number}`,
    `sarf-${exercise.type}`,
  );
}

/**
 * Get the card ID for an exercise.
 */
export function getCardIdForExercise(exercise: ExerciseItem): string {
  return buildCardId(
    exercise.verb.root,
    exercise.verb.verbForm || 'I',
    exercise.seegah.number,
    exercise.type,
  );
}

/**
 * Filter exercises to only those that are due for review.
 */
export function filterDueExercises(
  exercises: ExerciseItem[],
  deck: SrsItem[],
  now: number = Date.now(),
): ExerciseItem[] {
  return exercises.filter(ex => {
    const cardId = getCardIdForExercise(ex);
    const item = deck.find(i => i.id === cardId);
    // New cards are always due, reviewed cards are due if past their due date
    return !item || item.phase === 'new' || item.due <= now;
  });
}

/**
 * Count SRS statistics from the deck.
 */
export function getSrsStats(deck: SrsItem[]): {
  total: number;
  newCount: number;
  learning: number;
  review: number;
  due: number;
} {
  const now = Date.now();
  return {
    total: deck.length,
    newCount: deck.filter(i => i.phase === 'new').length,
    learning: deck.filter(i => i.phase === 'learning' || i.phase === 'relearning').length,
    review: deck.filter(i => i.phase === 'review').length,
    due: deck.filter(i => i.due <= now).length,
  };
}
