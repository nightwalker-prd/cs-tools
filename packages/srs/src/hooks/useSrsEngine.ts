/**
 * useSrsEngine hook.
 *
 * Main entry point combining deck management, dashboard stats, session
 * lifecycle, and review processing into a single coordinated hook.
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import type { SrsItem, Pillar, Difficulty } from '../types/items';
import { createSrsItem } from '../types/items';
import type { ResponseQuality } from '../types/reviews';
import type { ReviewLog } from '../types/reviews';
import type { SessionConfig, DashboardData } from '../types/sessions';
import { DEFAULT_SESSION_CONFIG } from '../types/sessions';
import type { CalibrationState } from '../engine/calibration';
import { createCalibrationState, addCalibrationSample } from '../engine/calibration';
import { computeDashboardData } from './useDashboard';
import { useSession } from './useSession';
import {
  loadDeckState,
  saveDeckState,
  loadReviewHistory,
  appendReviewHistory,
  saveCalibrationState,
  loadCalibrationState,
  saveSessionBackup,
  clearSessionBackup,
} from '../storage/srs-storage';

export interface UseSrsEngineReturn {
  /** All items in the deck */
  items: SrsItem[];
  /** Review history */
  history: ReviewLog[];
  /** Computed dashboard data */
  dashboard: DashboardData;
  /** Calibration state */
  calibration: CalibrationState;
  /** Session controls */
  session: ReturnType<typeof useSession>;
  /** Add a new item to the deck */
  addItem: (
    id: string,
    pillar: Pillar,
    difficulty: Difficulty,
    contentId: string,
    contentType: string,
  ) => void;
  /** Start a study session */
  startSession: (config?: SessionConfig) => void;
  /** Grade the current card */
  gradeCard: (quality: ResponseQuality) => void;
  /** Advance to next card */
  nextCard: () => void;
  /** Reset deck to empty */
  resetDeck: () => void;
  /** Whether the engine has loaded from storage */
  isLoaded: boolean;
}

/**
 * Main SRS engine hook.
 *
 * Provides a unified API for:
 * - Deck management (add items, load/save)
 * - Dashboard statistics
 * - Session lifecycle (start, grade, next, complete)
 * - Calibration tracking
 * - Persistent storage
 */
export function useSrsEngine(): UseSrsEngineReturn {
  const [items, setItems] = useState<SrsItem[]>([]);
  const [history, setHistory] = useState<ReviewLog[]>([]);
  const [calibration, setCalibration] = useState<CalibrationState>(createCalibrationState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from storage on mount
  useEffect(() => {
    const savedItems = loadDeckState();
    const savedHistory = loadReviewHistory();
    const savedCalibration = loadCalibrationState();

    setItems(savedItems);
    setHistory(savedHistory);
    if (savedCalibration) {
      setCalibration(savedCalibration);
    }
    setIsLoaded(true);
  }, []);

  // Handle item updates from session reviews
  const handleItemUpdated = useCallback((updatedItem: SrsItem) => {
    setItems(prev => {
      const newItems = prev.map(item =>
        item.id === updatedItem.id ? updatedItem : item,
      );
      saveDeckState(newItems);
      return newItems;
    });
  }, []);

  const session = useSession(handleItemUpdated);

  // Save session backup when state changes
  useEffect(() => {
    if (session.state.phase !== 'idle' && session.state.phase !== 'complete') {
      saveSessionBackup(session.state);
    } else if (session.state.phase === 'complete') {
      clearSessionBackup();
    }
  }, [session.state]);

  // Dashboard data
  const dashboard = useMemo(
    () => computeDashboardData(items, history),
    [items, history],
  );

  // ─── Actions ────────────────────────────────────────────────

  const addItem = useCallback((
    id: string,
    pillar: Pillar,
    difficulty: Difficulty,
    contentId: string,
    contentType: string,
  ) => {
    setItems(prev => {
      // Don't add duplicates
      if (prev.some(item => item.id === id)) return prev;

      const newItem = createSrsItem(id, pillar, difficulty, contentId, contentType);
      const newItems = [...prev, newItem];
      saveDeckState(newItems);
      return newItems;
    });
  }, []);

  const startSession = useCallback((config: SessionConfig = DEFAULT_SESSION_CONFIG) => {
    session.start(items, config);
  }, [items, session]);

  const gradeCard = useCallback((quality: ResponseQuality) => {
    const updatedItem = session.grade(quality);

    if (updatedItem) {
      // Update calibration
      const sample = {
        timestamp: Date.now(),
        quality,
        pillar: updatedItem.pillar,
        elapsed_ms: 0, // TODO: track from session
      };

      setCalibration(prev => {
        const newCal = addCalibrationSample(prev, sample);
        saveCalibrationState(newCal);
        return newCal;
      });
    }
  }, [session]);

  const nextCard = useCallback(() => {
    session.next();
  }, [session]);

  // Save review history when session completes.
  // This must be in a useEffect because session.state is stale within
  // the same render cycle — reading it synchronously after session.next()
  // would see the old phase, not the updated one.
  useEffect(() => {
    if (session.state.phase === 'complete') {
      const newReviews = session.state.reviews;
      if (newReviews.length > 0) {
        const updatedHistory = appendReviewHistory(newReviews);
        setHistory(updatedHistory);
      }
    }
  }, [session.state.phase, session.state.reviews]);

  const resetDeck = useCallback(() => {
    setItems([]);
    saveDeckState([]);
    session.reset();
  }, [session]);

  return {
    items,
    history,
    dashboard,
    calibration,
    session,
    addItem,
    startSession,
    gradeCard,
    nextCard,
    resetDeck,
    isLoaded,
  };
}
