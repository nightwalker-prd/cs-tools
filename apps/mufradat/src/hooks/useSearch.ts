import { useState, useMemo, useCallback } from 'react';
import { removeDiacritics, normalizeArabic } from '@arabtools/core';
import type { WordFamily } from '@arabtools/data';
import type { VocabBand } from '../types';

export interface SearchResult {
  word: WordFamily;
  bandName: string;
}

function normalize(text: string): string {
  return removeDiacritics(normalizeArabic(text)).toLowerCase();
}

export function useSearch(words: WordFamily[], bands: VocabBand[]) {
  const [query, setQuery] = useState('');

  const bandNameMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const band of bands) {
      map.set(band.id, band.titleEn);
    }
    return map;
  }, [bands]);

  const searchIndex = useMemo(() =>
    words.map(word => {
      const searchable = normalize(
        [word.headwordVocalized, word.headword, word.root, ...word.meanings].join(' ')
      );
      return { word, bandName: bandNameMap.get(word.level) ?? '', searchable };
    }),
    [words, bandNameMap]
  );

  const results = useMemo((): SearchResult[] => {
    const q = query.trim();
    if (q.length < 2) return [];

    const normalizedQuery = normalize(q);

    return searchIndex
      .filter(entry => entry.searchable.includes(normalizedQuery))
      .slice(0, 10)
      .map(entry => ({
        word: entry.word,
        bandName: entry.bandName,
      }));
  }, [query, searchIndex]);

  const clearSearch = useCallback(() => setQuery(''), []);

  return { query, setQuery, results, clearSearch };
}
