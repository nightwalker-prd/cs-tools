/**
 * useSession hook.
 *
 * Manages the lifecycle of a study session:
 * start → present card → grade → feedback → next card → complete
 */

import { useState, useCallback, useRef } from 'react';
import type { SrsItem } from '../types/items';
import type { ResponseQuality } from '../types/reviews';
import type { SessionConfig, SessionState, SessionItem } from '../types/sessions';
import { DEFAULT_SESSION_CONFIG, createIdleSessionState } from '../types/sessions';
import { buildSession } from '../session/session-builder';
import { scheduleItem } from '../engine/scheduler';
import {
  startLoading,
  loadItems,
  submitAnswer,
  recordReview,
  advanceOrComplete,
  resetSession,
  getCurrentItem,
  getProgress,
} from '../session/state-machine';

export interface UseSessionReturn {
  /** Current session state */
  state: SessionState;
  /** Currently presented item, or null */
  currentItem: SessionItem | null;
  /** Session progress (0-1) */
  progress: number;
  /** Start a new session */
  start: (items: SrsItem[], config?: SessionConfig) => void;
  /** Submit grade for current card */
  grade: (quality: ResponseQuality) => SrsItem | null;
  /** Advance to next card after feedback */
  next: () => void;
  /** Reset session to idle */
  reset: () => void;
}

/**
 * React hook for managing a study session lifecycle.
 *
 * @param onItemUpdated - Callback when an item is rescheduled after review
 * @returns Session state and control functions
 */
export function useSession(
  onItemUpdated?: (item: SrsItem) => void,
): UseSessionReturn {
  const [state, setState] = useState<SessionState>(createIdleSessionState);
  const cardStartTime = useRef<number>(0);

  const start = useCallback((items: SrsItem[], config: SessionConfig = DEFAULT_SESSION_CONFIG) => {
    setState(prev => {
      const loading = startLoading(
        prev.phase === 'idle' ? prev : createIdleSessionState(),
      );
      const queue = buildSession(items, config);
      return loadItems(loading, queue);
    });
  }, []);

  const grade = useCallback((quality: ResponseQuality): SrsItem | null => {
    let updatedItem: SrsItem | null = null;

    setState(prev => {
      // Submit answer
      const grading = submitAnswer(prev);
      const current = getCurrentItem(grading);
      if (!current) return prev;

      // Schedule the item
      const stabilityBefore = current.srsItem.stability;
      updatedItem = scheduleItem(current.srsItem, quality);
      const stabilityAfter = updatedItem.stability;

      const elapsedMs = Date.now() - (cardStartTime.current || Date.now());

      // Record the review
      return recordReview(
        grading,
        quality,
        elapsedMs,
        stabilityBefore,
        stabilityAfter,
      );
    });

    if (updatedItem && onItemUpdated) {
      onItemUpdated(updatedItem);
    }

    return updatedItem;
  }, [onItemUpdated]);

  const next = useCallback(() => {
    setState(prev => {
      const result = advanceOrComplete(prev);
      if (result.phase === 'presenting') {
        // Start timing the next card
        cardStartTime.current = Date.now();
      }
      return result;
    });
  }, []);

  const reset = useCallback(() => {
    setState(prev => {
      if (prev.phase === 'complete') {
        return resetSession(prev);
      }
      return createIdleSessionState();
    });
  }, []);

  return {
    state,
    currentItem: getCurrentItem(state),
    progress: getProgress(state),
    start,
    grade,
    next,
    reset,
  };
}
