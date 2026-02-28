import { useState, useMemo, useCallback } from 'react';
import type { ReadingText } from '../data/reading';
import { removeDiacritics } from '@arabtools/core';

export interface SearchResult {
  text: ReadingText;
  matchField: 'title' | 'titleAr' | 'category';
}

export function useSearch(allTexts: ReadingText[]) {
  const [query, setQuery] = useState('');

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];

    const qNoDiacritics = removeDiacritics(q);
    const matches: SearchResult[] = [];

    for (const text of allTexts) {
      if (text.title.toLowerCase().includes(q)) {
        matches.push({ text, matchField: 'title' });
      } else if (removeDiacritics(text.titleAr).includes(qNoDiacritics) || text.titleAr.includes(q)) {
        matches.push({ text, matchField: 'titleAr' });
      } else if (text.category.toLowerCase().includes(q)) {
        matches.push({ text, matchField: 'category' });
      }

      if (matches.length >= 20) break;
    }

    return matches;
  }, [query, allTexts]);

  const clearSearch = useCallback(() => setQuery(''), []);

  return { query, setQuery, results, clearSearch };
}
