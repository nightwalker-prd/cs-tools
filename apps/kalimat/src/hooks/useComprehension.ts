import { useMemo } from 'react';
import { surahWordStats } from '@/data/surah-word-stats';
import { rootToLemma } from '@/data/root-to-lemma';
import type { LemmaProgress } from '@/types';

type ProgressMap = Record<number, LemmaProgress>;

function isMastered(p: LemmaProgress): boolean {
  return p.phase === 'mastered' || p.phase === 'review';
}

function isKnown(p: LemmaProgress): boolean {
  return p.phase !== 'new';
}

export function useComprehension(progress: ProgressMap) {
  return useMemo(() => {
    // Build set of known/mastered lemma IDs
    const knownLemmaIds = new Set<number>();
    const masteredLemmaIds = new Set<number>();
    for (const [idStr, p] of Object.entries(progress)) {
      const id = Number(idStr);
      if (isKnown(p)) knownLemmaIds.add(id);
      if (isMastered(p)) masteredLemmaIds.add(id);
    }

    // Build set of roots where at least one linked lemma is mastered
    const masteredRoots = new Set<string>();
    for (const [root, lemmaIds] of Object.entries(rootToLemma)) {
      if (lemmaIds.some(id => knownLemmaIds.has(id))) {
        masteredRoots.add(root);
      }
    }

    // Calculate per-surah comprehension
    const surahComprehension: { surahNum: number; known: number; total: number; pct: number }[] = [];
    let totalKnown = 0;
    let totalAll = 0;

    for (const stat of surahWordStats) {
      let knownCount = stat.particleCount; // particles are always known

      // Check words by lemmaId
      for (const [lemmaIdStr, count] of Object.entries(stat.wordsByLemma)) {
        if (knownLemmaIds.has(Number(lemmaIdStr))) {
          knownCount += count;
        }
      }

      // Check words by root (only if not already counted via lemma)
      for (const [root, count] of Object.entries(stat.wordsByRoot)) {
        if (masteredRoots.has(root)) {
          // Only count root-based words that weren't already counted via lemma
          const lemmaIds = rootToLemma[root] || [];
          const alreadyCounted = lemmaIds.some(id => knownLemmaIds.has(id) && stat.wordsByLemma[id]);
          if (!alreadyCounted) {
            knownCount += count;
          }
        }
      }

      // Cap at total
      knownCount = Math.min(knownCount, stat.totalWords);

      totalKnown += knownCount;
      totalAll += stat.totalWords;

      surahComprehension.push({
        surahNum: stat.surahNum,
        known: knownCount,
        total: stat.totalWords,
        pct: stat.totalWords > 0 ? Math.round((knownCount / stat.totalWords) * 100) : 0,
      });
    }

    const overall = totalAll > 0 ? Math.round((totalKnown / totalAll) * 100) : 0;

    // Tier stats from rootFrequency
    const tierStats = {
      totalLemmasKnown: knownLemmaIds.size,
      totalRootsMastered: masteredRoots.size,
      surahsAbove50: surahComprehension.filter(s => s.pct >= 50).length,
    };

    return {
      overall,
      surahComprehension,
      tierStats,
    };
  }, [progress]);
}
