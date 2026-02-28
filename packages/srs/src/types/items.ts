/**
 * Core SRS item types for spaced repetition scheduling.
 */

export type Pillar = 'dsa' | 'systems' | 'engineering' | 'theory';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type LearningPhase = 'new' | 'learning' | 'review' | 'relearning';

export type QuestionType =
  | 'multiple-choice'
  | 'type-answer'
  | 'fill-blank'
  | 'yes-no'
  | 'drag-construction'
  | 'match-pairs';

/**
 * A single item in the SRS deck, tracked across reviews.
 *
 * Uses FSRS-inspired parameters for scheduling:
 * - stability: how well the memory is retained (higher = longer intervals)
 * - difficulty_score: intrinsic difficulty of the item [1-10]
 * - phase: current learning phase (new → learning → review, or relearning)
 */
export interface SrsItem {
  /** Unique identifier for this SRS item */
  id: string;
  /** Which learning pillar this item belongs to */
  pillar: Pillar;
  /** Difficulty tier of the content */
  difficulty: Difficulty;
  /** Current learning phase */
  phase: LearningPhase;
  /** FSRS stability parameter — memory strength in days */
  stability: number;
  /** FSRS difficulty score [1-10] */
  difficulty_score: number;
  /** Days elapsed since last review */
  elapsed_days: number;
  /** Days until next scheduled review */
  scheduled_days: number;
  /** Total number of successful reviews */
  reps: number;
  /** Number of times the item has lapsed (forgotten) */
  lapses: number;
  /** Timestamp of last review, or null if never reviewed */
  last_review: number | null;
  /** Timestamp when this item is next due */
  due: number;
  /** References the content item in the data package */
  contentId: string;
  /** Type of content: 'algorithm' | 'data-structure' | 'system-concept' | 'theory-topic' */
  contentType: string;
}

/**
 * Creates a new SRS item with default FSRS parameters.
 */
export function createSrsItem(
  id: string,
  pillar: Pillar,
  difficulty: Difficulty,
  contentId: string,
  contentType: string,
): SrsItem {
  return {
    id,
    pillar,
    difficulty,
    phase: 'new',
    stability: 0,
    difficulty_score: 5, // midpoint
    elapsed_days: 0,
    scheduled_days: 0,
    reps: 0,
    lapses: 0,
    last_review: null,
    due: Date.now(),
    contentId,
    contentType,
  };
}
