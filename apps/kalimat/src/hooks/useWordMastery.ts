import { useMemo } from 'react';
import { rootToLemma } from '@/data/root-to-lemma';
import type { QuranWord, LemmaProgress } from '@/types';

type ProgressMap = Record<number, LemmaProgress>;

export type MasteryLevel = 'unknown' | 'learning' | 'review' | 'mastered';

export function useWordMastery(progress: ProgressMap) {
  // Build lookup sets
  const { knownLemmaIds, masteredRoots } = useMemo(() => {
    const known = new Set<number>();
    const mastered = new Set<number>();
    for (const [idStr, p] of Object.entries(progress)) {
      const id = Number(idStr);
      if (p.phase !== 'new') known.add(id);
      if (p.phase === 'mastered' || p.phase === 'review') mastered.add(id);
    }

    const roots = new Set<string>();
    for (const [root, lemmaIds] of Object.entries(rootToLemma)) {
      if (lemmaIds.some(id => mastered.has(id))) {
        roots.add(root);
      }
    }

    return { knownLemmaIds: known, masteredRoots: roots };
  }, [progress]);

  const getWordMastery = useMemo(() => {
    return (word: QuranWord): MasteryLevel => {
      // 1. Check lemmaId directly in progress
      if (word.lemmaId && progress[word.lemmaId]) {
        const phase = progress[word.lemmaId].phase;
        if (phase === 'mastered') return 'mastered';
        if (phase === 'review') return 'review';
        if (phase === 'learning') return 'learning';
      }

      // 2. Check if any lemma linked to the word's root is mastered
      if (word.root && masteredRoots.has(word.root)) {
        return 'mastered';
      }

      // 3. Particles (no root) are treated as known
      if (!word.root || word.root.length === 0) {
        return 'mastered';
      }

      return 'unknown';
    };
  }, [progress, masteredRoots]);

  return { getWordMastery, knownLemmaIds, masteredRoots };
}
