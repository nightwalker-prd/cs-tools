/**
 * Review response and logging types.
 */

import type { LearningPhase } from './items';

/**
 * Quality of the learner's response:
 * - 0 = Again (complete failure, needs relearning)
 * - 1 = Hard (recalled with significant difficulty)
 * - 2 = Good (recalled with moderate effort)
 * - 3 = Easy (recalled effortlessly)
 */
export type ResponseQuality = 0 | 1 | 2 | 3;

/**
 * A single review log entry, capturing the state transition.
 */
export interface ReviewLog {
  /** ID of the reviewed SRS item */
  itemId: string;
  /** When the review occurred (ms since epoch) */
  timestamp: number;
  /** Quality of the response */
  quality: ResponseQuality;
  /** Time spent on the review in milliseconds */
  elapsed_ms: number;
  /** Scheduled interval before this review (days) */
  scheduled_days: number;
  /** Stability before the review */
  stability_before: number;
  /** Stability after the review */
  stability_after: number;
  /** Phase the item was in at time of review */
  phase: LearningPhase;
}
