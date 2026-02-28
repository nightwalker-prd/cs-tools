/**
 * Session configuration and state types.
 */

import type { Pillar, QuestionType, SrsItem } from './items';
import type { ReviewLog } from './reviews';

/**
 * Configuration for building a study session.
 */
export interface SessionConfig {
  /** Maximum number of items in a session */
  maxItems: number;
  /** Maximum number of new items to introduce per session */
  maxNewItems: number;
  /** Ratio of new items in the session (0-1). Default 0.2 */
  newItemRatio: number;
  /** Which pillars to include (empty = all) */
  pillars: Pillar[];
  /** Whether to apply interleaving across pillars */
  interleave: boolean;
}

/**
 * Default session configuration.
 */
export const DEFAULT_SESSION_CONFIG: SessionConfig = {
  maxItems: 30,
  maxNewItems: 10,
  newItemRatio: 0.2,
  pillars: [],
  interleave: true,
};

/**
 * An item within an active session, with presentation metadata.
 */
export interface SessionItem {
  /** The underlying SRS item */
  srsItem: SrsItem;
  /** Suggested question type based on review count / difficulty */
  questionType: QuestionType;
  /** Position in the session queue (0-indexed) */
  position: number;
}

/**
 * Session lifecycle states.
 */
export type SessionPhase =
  | 'idle'
  | 'loading'
  | 'presenting'
  | 'grading'
  | 'feedback'
  | 'complete';

/**
 * Active session state.
 */
export interface SessionState {
  /** Current session lifecycle phase */
  phase: SessionPhase;
  /** Ordered queue of items for this session */
  queue: SessionItem[];
  /** Index of the current item being presented */
  currentIndex: number;
  /** Review logs collected during this session */
  reviews: ReviewLog[];
  /** Session start timestamp */
  startedAt: number;
  /** Session completion timestamp, or null if ongoing */
  completedAt: number | null;
}

/**
 * Creates an initial idle session state.
 */
export function createIdleSessionState(): SessionState {
  return {
    phase: 'idle',
    queue: [],
    currentIndex: 0,
    reviews: [],
    startedAt: 0,
    completedAt: null,
  };
}

/**
 * Dashboard summary data computed from the SRS deck.
 */
export interface DashboardData {
  /** Total items in the deck */
  totalItems: number;
  /** Items due for review now */
  dueNow: number;
  /** Items in "new" phase (never reviewed) */
  newItems: number;
  /** Items currently in learning/relearning */
  learningItems: number;
  /** Items in review phase (graduated) */
  reviewItems: number;
  /** Overall retention rate (last 50 reviews) */
  retentionRate: number;
  /** Current daily streak (consecutive days with reviews) */
  streak: number;
  /** Per-pillar breakdown */
  pillarStats: Record<Pillar, PillarStats>;
  /** Reviews completed today */
  reviewsToday: number;
}

/**
 * Per-pillar statistics.
 */
export interface PillarStats {
  total: number;
  due: number;
  newCount: number;
  learning: number;
  review: number;
  retention: number;
}
