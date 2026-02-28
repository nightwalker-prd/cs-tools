import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSrsEngine, createSrsItem, saveDeckState } from '@arabtools/srs';
import type { SessionConfig } from '@arabtools/srs';
import { useLemmaIndex } from './useLemmaIndex';
import type { KalaamSettings } from '@/lib/settings';

const SEEDED_KEY = 'kalaam-srs-seeded';

/**
 * Kalaam-specific SRS hook.
 *
 * Wraps @arabtools/srs's useSrsEngine with:
 * - Auto-seeding from lemma-index.json on first load
 * - Kalaam-specific session config based on user settings
 * - Convenience stats (dueCount, newCount, reviewCount, totalLearned)
 */
export function useKalaamSrs(settings: KalaamSettings) {
  const engine = useSrsEngine();
  const { data: lemmas } = useLemmaIndex();
  const [isSeeding, setIsSeeding] = useState(false);
  const [isSeeded, setIsSeeded] = useState(() => {
    return localStorage.getItem(SEEDED_KEY) === 'true';
  });
  const seedingRef = useRef(false);

  // Seed deck from lemma-index on first load
  useEffect(() => {
    if (!engine.isLoaded || !lemmas || isSeeded || seedingRef.current) return;

    // If already has items, mark as seeded
    if (engine.items.length > 0) {
      localStorage.setItem(SEEDED_KEY, 'true');
      setIsSeeded(true);
      return;
    }

    seedingRef.current = true;
    setIsSeeding(true);

    // Batch-create all items in memory, then write to storage once.
    // Using engine.addItem() would trigger a localStorage write per item (4,784 times),
    // causing the page to hang. Instead, create items directly and save in one shot.
    const allItems = lemmas.map((lemma) =>
      createSrsItem(
        `lemma-${lemma.id}`,
        'vocabulary',
        'beginner',
        `lemma-${lemma.id}`,
        'quran-vocab',
      ),
    );
    saveDeckState(allItems);

    localStorage.setItem(SEEDED_KEY, 'true');
    // Reload so the engine picks up the seeded deck from storage
    window.location.reload();
  }, [engine.isLoaded, lemmas, isSeeded, engine.items.length]);

  // Compute stats from engine dashboard
  const stats = useMemo(() => {
    const { dashboard, items } = engine;
    const now = Date.now();

    // Count items due for review (in review/learning phase, past due date)
    const dueForReview = items.filter(
      (item) =>
        (item.phase === 'review' || item.phase === 'relearning') &&
        item.due <= now,
    ).length;

    // Count new items to show (limited by settings.newPerDay)
    const newAvailable = dashboard.newItems;
    const newCount = Math.min(newAvailable, settings.newPerDay);

    // Review count limited by settings.maxReviews
    const reviewCount = Math.min(dueForReview, settings.maxReviews);

    // Total cards due today
    const dueCount = newCount + reviewCount;

    // Total learned = items that have graduated to review phase
    const totalLearned = items.filter(
      (item) => item.phase === 'review' || item.reps > 0,
    ).length;

    return { dueCount, newCount, reviewCount, totalLearned };
  }, [engine.dashboard, engine.items, settings.newPerDay, settings.maxReviews]);

  const startLesson = useCallback(
    (mode?: string) => {
      const config: SessionConfig = {
        maxItems: stats.newCount + stats.reviewCount,
        maxNewItems: stats.newCount,
        newItemRatio: stats.dueCount > 0 ? stats.newCount / stats.dueCount : 0.2,
        pillars: [],
        interleave: true,
      };

      if (mode === 'quiz') {
        // Quiz mode: only review items, no new cards
        config.maxNewItems = 0;
        config.newItemRatio = 0;
        config.maxItems = Math.min(stats.reviewCount, 10);
      }

      engine.startSession(config);
    },
    [engine, stats],
  );

  return useMemo(
    () => ({
      ...stats,
      startLesson,
      isSeeded,
      isSeeding,
      engine,
    }),
    [stats, startLesson, isSeeded, isSeeding, engine],
  );
}
