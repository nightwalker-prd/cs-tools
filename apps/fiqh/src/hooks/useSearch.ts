import { useState, useMemo, useCallback } from 'react';
import { removeDiacritics, normalizeArabic } from '@arabtools/core';
import type { KitabMeta, FiqhTerm, FiqhTopic, ViewMode } from '../types';
import { CATEGORIES } from '../data/categories';

export interface SearchResult {
  type: 'kitab' | 'term' | 'topic';
  id: string;
  titleAr: string;
  titleEn: string;
  subtitle?: string;
}

function normalize(text: string): string {
  return removeDiacritics(normalizeArabic(text)).toLowerCase();
}

export function useSearch(index: KitabMeta[], terms: FiqhTerm[], topics: FiqhTopic[], viewMode: ViewMode) {
  const [query, setQuery] = useState('');

  const searchIndex = useMemo(() => {
    const entries: Array<{ result: SearchResult; searchable: string }> = [];

    for (const k of index) {
      const cat = CATEGORIES.find(c => c.kitabIds.includes(k.id));
      entries.push({
        result: { type: 'kitab', id: k.id, titleAr: k.titleAr, titleEn: k.titleEn, subtitle: cat?.titleEn },
        searchable: normalize([k.titleAr, k.titleEn].join(' ')),
      });
    }

    for (const t of terms) {
      entries.push({
        result: { type: 'term', id: t.id, titleAr: t.termAr, titleEn: t.termEn, subtitle: t.transliteration },
        searchable: normalize([t.termAr, t.termEn, t.transliteration].join(' ')),
      });
    }

    for (const t of topics) {
      entries.push({
        result: { type: 'topic', id: t.id, titleAr: t.titleAr, titleEn: t.titleEn, subtitle: t.categoryId },
        searchable: normalize([t.titleAr, t.titleEn, ...t.tags].join(' ')),
      });
    }

    return entries;
  }, [index, terms, topics]);

  const results = useMemo((): SearchResult[] => {
    const q = query.trim();
    if (q.length < 2) return [];

    const normalizedQuery = normalize(q);

    return searchIndex
      .filter(entry => {
        if (!entry.searchable.includes(normalizedQuery)) return false;
        if (viewMode === 'reader' && entry.result.type === 'topic') return false;
        if (viewMode === 'topic' && entry.result.type === 'kitab') return false;
        return true;
      })
      .slice(0, 10)
      .map(entry => entry.result);
  }, [query, searchIndex, viewMode]);

  const clearSearch = useCallback(() => setQuery(''), []);

  return { query, setQuery, results, clearSearch };
}
