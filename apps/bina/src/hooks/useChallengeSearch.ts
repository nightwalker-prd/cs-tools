import { useMemo } from 'react';
import { normalizeArabic } from '@arabtools/core';
import type { SearchResult } from '../types';
import { allChallenges } from '../data/challenges';

export function useChallengeSearch(query: string): SearchResult[] {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const normalizedQ = normalizeArabic(q);
    const results: SearchResult[] = [];

    for (const challenge of allChallenges) {
      if (challenge.title.toLowerCase().includes(q)) {
        results.push({ challenge, matchField: 'title' });
        continue;
      }
      if (normalizeArabic(challenge.titleAr).includes(normalizedQ)) {
        results.push({ challenge, matchField: 'titleAr' });
        continue;
      }
      if (challenge.topic.toLowerCase().includes(q)) {
        results.push({ challenge, matchField: 'topic' });
        continue;
      }
      if (challenge.tags.some(t => t.includes(q))) {
        results.push({ challenge, matchField: 'tag' });
        continue;
      }
    }

    return results.slice(0, 10);
  }, [query]);
}
