/**
 * Session state machine.
 *
 * Manages the lifecycle of a study session through well-defined phases:
 *   idle → loading → presenting → grading → feedback → presenting (loop)
 *                                                    → complete (when queue exhausted)
 *
 * All transitions are pure functions returning new state objects.
 */

import type { SessionState, SessionItem, SessionPhase } from '../types/sessions';
import type { ReviewLog } from '../types/reviews';
import type { ResponseQuality } from '../types/reviews';
import { createIdleSessionState } from '../types/sessions';

/**
 * Valid state transitions.
 */
const VALID_TRANSITIONS: Record<SessionPhase, SessionPhase[]> = {
  idle: ['loading'],
  loading: ['presenting', 'idle'], // idle if no items
  presenting: ['grading'],
  grading: ['feedback'],
  feedback: ['presenting', 'complete'],
  complete: ['idle'],
};

/**
 * Check if a phase transition is valid.
 */
export function isValidTransition(from: SessionPhase, to: SessionPhase): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}

/**
 * Start loading a new session.
 *
 * @param state - Current state (must be 'idle')
 * @returns New state in 'loading' phase
 */
export function startLoading(state: SessionState): SessionState {
  assertTransition(state.phase, 'loading');
  return {
    ...state,
    phase: 'loading',
    startedAt: Date.now(),
  };
}

/**
 * Load items into the session and start presenting.
 *
 * @param state - Current state (must be 'loading')
 * @param queue - The session items to present
 * @returns New state in 'presenting' phase, or 'idle' if queue is empty
 */
export function loadItems(
  state: SessionState,
  queue: SessionItem[],
): SessionState {
  if (queue.length === 0) {
    assertTransition(state.phase, 'idle');
    return createIdleSessionState();
  }

  assertTransition(state.phase, 'presenting');
  return {
    ...state,
    phase: 'presenting',
    queue,
    currentIndex: 0,
    reviews: [],
  };
}

/**
 * Submit an answer and begin grading.
 *
 * @param state - Current state (must be 'presenting')
 * @returns New state in 'grading' phase
 */
export function submitAnswer(state: SessionState): SessionState {
  assertTransition(state.phase, 'grading');
  return {
    ...state,
    phase: 'grading',
  };
}

/**
 * Record the review result and show feedback.
 *
 * @param state - Current state (must be 'grading')
 * @param quality - The response quality grade
 * @param elapsedMs - Time spent on the card in milliseconds
 * @param stabilityBefore - Stability before scheduling
 * @param stabilityAfter - Stability after scheduling
 * @param now - Current timestamp
 * @returns New state in 'feedback' phase
 */
export function recordReview(
  state: SessionState,
  quality: ResponseQuality,
  elapsedMs: number,
  stabilityBefore: number,
  stabilityAfter: number,
  now: number = Date.now(),
): SessionState {
  assertTransition(state.phase, 'feedback');

  const currentItem = state.queue[state.currentIndex];
  if (!currentItem) {
    throw new Error(`No item at index ${state.currentIndex}`);
  }

  const reviewLog: ReviewLog = {
    itemId: currentItem.srsItem.id,
    timestamp: now,
    quality,
    elapsed_ms: elapsedMs,
    scheduled_days: currentItem.srsItem.scheduled_days,
    stability_before: stabilityBefore,
    stability_after: stabilityAfter,
    phase: currentItem.srsItem.phase,
  };

  return {
    ...state,
    phase: 'feedback',
    reviews: [...state.reviews, reviewLog],
  };
}

/**
 * Advance to the next card or complete the session.
 *
 * @param state - Current state (must be 'feedback')
 * @param now - Current timestamp
 * @returns New state: 'presenting' if more cards, 'complete' if done
 */
export function advanceOrComplete(
  state: SessionState,
  now: number = Date.now(),
): SessionState {
  const nextIndex = state.currentIndex + 1;

  if (nextIndex >= state.queue.length) {
    assertTransition(state.phase, 'complete');
    return {
      ...state,
      phase: 'complete',
      currentIndex: state.currentIndex,
      completedAt: now,
    };
  }

  assertTransition(state.phase, 'presenting');
  return {
    ...state,
    phase: 'presenting',
    currentIndex: nextIndex,
  };
}

/**
 * Reset the session back to idle.
 *
 * @param state - Current state (must be 'complete')
 * @returns Fresh idle state
 */
export function resetSession(state: SessionState): SessionState {
  assertTransition(state.phase, 'idle');
  return createIdleSessionState();
}

/**
 * Get the current item being presented.
 */
export function getCurrentItem(state: SessionState): SessionItem | null {
  if (state.phase !== 'presenting' && state.phase !== 'grading' && state.phase !== 'feedback') {
    return null;
  }
  return state.queue[state.currentIndex] ?? null;
}

/**
 * Get session progress as a fraction [0-1].
 */
export function getProgress(state: SessionState): number {
  if (state.queue.length === 0) return 0;
  if (state.phase === 'complete') return 1;
  return state.currentIndex / state.queue.length;
}

/**
 * Assert that a transition is valid, throwing if not.
 */
function assertTransition(from: SessionPhase, to: SessionPhase): void {
  if (!isValidTransition(from, to)) {
    throw new Error(`Invalid session transition: ${from} → ${to}`);
  }
}
