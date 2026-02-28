import { useMemo } from 'react';
import type { SrsItem } from '@arabtools/srs';
import type { LemmaIndexEntry } from '@/types';

/**
 * Computes Quran understanding percentage from SRS state.
 *
 * Understanding % = SUM(count of learned lemmas) / SUM(count of all lemmas).
 * This matches the Kalaam iOS app calculation — total is the sum of all
 * morphological segment occurrences (105,424), not word positions (77,429).
 *
 * A lemma is considered "learned" if the SRS item has been reviewed
 * at least once (reps > 0) or graduated to review phase.
 */
export function useUnderstanding(
  items: SrsItem[],
  lemmas: LemmaIndexEntry[] | null,
  newPerDay: number,
) {
  return useMemo(() => {
    if (!lemmas || lemmas.length === 0) {
      return { percentage: 0, projectionMonths: 0 };
    }

    // Build a set of learned lemma IDs from SRS items
    const learnedLemmaIds = new Set<number>();
    for (const item of items) {
      if (item.reps > 0 || item.phase === 'review') {
        // Extract lemma ID from contentId format "lemma-{id}"
        const match = item.contentId.match(/^lemma-(\d+)$/);
        if (match) {
          learnedLemmaIds.add(parseInt(match[1], 10));
        }
      }
    }

    // Sum frequency counts — total is computed from actual data, not hardcoded
    let learnedWordCount = 0;
    let totalWordCount = 0;
    let remainingLemmaCount = 0;

    for (const lemma of lemmas) {
      totalWordCount += lemma.count;
      if (learnedLemmaIds.has(lemma.id)) {
        learnedWordCount += lemma.count;
      } else {
        remainingLemmaCount++;
      }
    }

    const percentage = totalWordCount > 0
      ? Math.round((learnedWordCount / totalWordCount) * 1000) / 10
      : 0;

    // Projection: days to learn remaining lemmas at newPerDay rate
    const daysRemaining = newPerDay > 0
      ? Math.ceil(remainingLemmaCount / newPerDay)
      : Infinity;
    const projectionMonths = isFinite(daysRemaining)
      ? Math.round(daysRemaining / 30)
      : 0;

    return {
      percentage: Math.min(percentage, 100),
      projectionMonths,
      learnedCount: learnedLemmaIds.size,
      totalLemmas: lemmas.length,
    };
  }, [items, lemmas, newPerDay]);
}
