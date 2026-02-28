import { useCallback, useMemo } from 'react';
import { usePersistedState } from '@arabtools/core';
import type { HafizState, HafizRub, HafizStats, RubStage } from '../types';

const STORAGE_KEY = 'arabtools-hafiz-state';
const SRS_STORAGE_KEY = 'arabtools-hafiz-srs';

interface SrsRubItem {
  rubId: number;
  stability: number;
  difficulty: number;
  due: number; // timestamp
  lastReview: number | null;
  reps: number;
  lapses: number;
}

const DEFAULT_STATE: HafizState = {
  learningRubs: [],
  settings: {
    dailyNewTarget: 10,
    revisionSessionSize: 10,
    reciterId: 'mishary',
    maxSrsInterval: 30,
  },
};

function deriveStage(rubId: number, learningRubs: number[], srsItems: Record<number, SrsRubItem>): RubStage {
  if (learningRubs.includes(rubId)) return 'learning';
  const srsItem = srsItems[rubId];
  if (!srsItem) return 'not_started';
  if (srsItem.stability >= 30) return 'solid';
  return 'memorized';
}

function isDue(item: SrsRubItem): boolean {
  return item.due <= Date.now();
}

function isOverdue(item: SrsRubItem): boolean {
  const oneDayMs = 24 * 60 * 60 * 1000;
  return item.due + oneDayMs < Date.now();
}

// Simple FSRS-inspired scheduling
function scheduleNext(item: SrsRubItem, quality: number, maxInterval: number): SrsRubItem {
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  if (quality <= 1) {
    // Again — reset to short interval, increment lapses
    return {
      ...item,
      stability: Math.max(0.5, item.stability * 0.5),
      difficulty: Math.min(10, item.difficulty + 1),
      due: now + 10 * 60 * 1000, // 10 minutes
      lastReview: now,
      reps: item.reps + 1,
      lapses: item.lapses + 1,
    };
  }

  // Success — calculate new stability
  let stabilityMultiplier: number;
  if (quality === 2) stabilityMultiplier = 1.2;      // Hard
  else if (quality === 3) stabilityMultiplier = 2.5;  // Good
  else stabilityMultiplier = 3.5;                     // Easy

  const newStability = Math.min(
    maxInterval,
    item.stability === 0 ? 1 : item.stability * stabilityMultiplier,
  );

  const newDifficulty = quality === 2
    ? Math.min(10, item.difficulty + 0.5)
    : Math.max(1, item.difficulty - (quality - 3) * 0.5);

  const intervalDays = Math.min(maxInterval, Math.max(1, Math.round(newStability)));

  return {
    ...item,
    stability: newStability,
    difficulty: newDifficulty,
    due: now + intervalDays * dayMs,
    lastReview: now,
    reps: item.reps + 1,
    lapses: item.lapses,
  };
}

export function useHafizTracker() {
  const [state, setState] = usePersistedState<HafizState>(STORAGE_KEY, DEFAULT_STATE);
  const [srsItems, setSrsItems] = usePersistedState<Record<number, SrsRubItem>>(SRS_STORAGE_KEY, {});

  // Derive all 240 rubs with stages
  const rubs: HafizRub[] = useMemo(() => {
    return Array.from({ length: 240 }, (_, i) => {
      const rubId = i + 1;
      return {
        id: rubId,
        stage: deriveStage(rubId, state.learningRubs, srsItems),
        srsItemId: srsItems[rubId] ? `quran-rub-${rubId}` : undefined,
      };
    });
  }, [state.learningRubs, srsItems]);

  // Compute stats
  const stats: HafizStats = useMemo(() => {
    let notStarted = 0, learning = 0, memorized = 0, solid = 0;
    let dueCount = 0, overdueCount = 0;

    for (const rub of rubs) {
      switch (rub.stage) {
        case 'not_started': notStarted++; break;
        case 'learning': learning++; break;
        case 'memorized': memorized++; break;
        case 'solid': solid++; break;
      }
    }

    for (const item of Object.values(srsItems)) {
      if (isDue(item)) dueCount++;
      if (isOverdue(item)) overdueCount++;
    }

    return {
      total: 240,
      notStarted,
      learning,
      memorized: memorized + solid,
      solid,
      dueCount,
      overdueCount,
      percentComplete: Math.round(((memorized + solid) / 240) * 100),
    };
  }, [rubs, srsItems]);

  // Get due rubs for revision
  const dueRubs = useMemo(() => {
    return Object.values(srsItems)
      .filter(isDue)
      .sort((a, b) => a.due - b.due)
      .map(item => item.rubId);
  }, [srsItems]);

  // Actions
  const startLearning = useCallback((rubId: number) => {
    setState(prev => ({
      ...prev,
      learningRubs: prev.learningRubs.includes(rubId)
        ? prev.learningRubs
        : [...prev.learningRubs, rubId],
    }));
  }, [setState]);

  const markMemorized = useCallback((rubId: number) => {
    // Remove from learning, create SRS item
    setState(prev => ({
      ...prev,
      learningRubs: prev.learningRubs.filter(id => id !== rubId),
    }));
    setSrsItems(prev => ({
      ...prev,
      [rubId]: {
        rubId,
        stability: 1,
        difficulty: 5,
        due: Date.now() + 24 * 60 * 60 * 1000, // Due tomorrow
        lastReview: Date.now(),
        reps: 0,
        lapses: 0,
      },
    }));
  }, [setState, setSrsItems]);

  const gradeRevision = useCallback((rubId: number, quality: number) => {
    setSrsItems(prev => {
      const item = prev[rubId];
      if (!item) return prev;
      return {
        ...prev,
        [rubId]: scheduleNext(item, quality, state.settings.maxSrsInterval),
      };
    });
  }, [setSrsItems, state.settings.maxSrsInterval]);

  const resetRub = useCallback((rubId: number) => {
    setState(prev => ({
      ...prev,
      learningRubs: prev.learningRubs.filter(id => id !== rubId),
    }));
    setSrsItems(prev => {
      const next = { ...prev };
      delete next[rubId];
      return next;
    });
  }, [setState, setSrsItems]);

  const updateSettings = useCallback((updates: Partial<HafizState['settings']>) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...updates },
    }));
  }, [setState]);

  return {
    rubs,
    stats,
    dueRubs,
    settings: state.settings,
    startLearning,
    markMemorized,
    gradeRevision,
    resetRub,
    updateSettings,
  };
}
