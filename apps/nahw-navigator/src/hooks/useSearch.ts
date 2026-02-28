import { useState, useMemo, useCallback } from 'react';
import { removeDiacritics, normalizeArabic } from '@arabtools/core';
import type { NahwTopic, NahwCategory } from '../data/types';

export interface SearchResult {
  topic: NahwTopic;
  categoryName: string;
}

function normalize(text: string): string {
  return removeDiacritics(normalizeArabic(text)).toLowerCase();
}

export function useSearch(topics: NahwTopic[], categories: NahwCategory[]) {
  const [query, setQuery] = useState('');

  const searchIndex = useMemo(() =>
    topics.map(topic => {
      const category = categories.find(c => c.id === topic.categoryId);
      const searchable = normalize(
        [topic.titleAr, topic.titleEn, topic.transliteration, ...topic.tags].join(' ')
      );
      return { topic, categoryName: category?.titleEn ?? '', searchable };
    }),
    [topics, categories]
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
        categoryName: entry.categoryName,
      }));
  }, [query, searchIndex]);

  const clearSearch = useCallback(() => setQuery(''), []);

  return { query, setQuery, results, clearSearch };
}
