import { useState, useMemo, useCallback } from 'react';
import { removeDiacritics, normalizeArabic } from '@arabtools/core';
import type { BalagahTopic, BalagahUnit } from '../data/types';

export interface SearchResult {
  topic: BalagahTopic;
  unitName: string;
}

function normalize(text: string): string {
  return removeDiacritics(normalizeArabic(text)).toLowerCase();
}

export function useSearch(topics: BalagahTopic[], units: BalagahUnit[]) {
  const [query, setQuery] = useState('');

  const searchIndex = useMemo(() =>
    topics.map(topic => {
      const unit = units.find(u => u.id === topic.unitId);
      const searchable = normalize(
        [topic.titleAr, topic.titleEn, topic.transliteration, ...topic.tags].join(' ')
      );
      return { topic, unitName: unit?.titleEn ?? '', searchable };
    }),
    [topics, units]
  );

  const results = useMemo((): SearchResult[] => {
    const q = query.trim();
    if (q.length < 2) return [];

    const normalizedQuery = normalize(q);

    return searchIndex
      .filter(entry => entry.searchable.includes(normalizedQuery))
      .slice(0, 10)
      .map(entry => ({
        topic: entry.topic,
        unitName: entry.unitName,
      }));
  }, [query, searchIndex]);

  const clearSearch = useCallback(() => setQuery(''), []);

  return { query, setQuery, results, clearSearch };
}
