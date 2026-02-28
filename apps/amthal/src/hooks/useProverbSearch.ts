import { useMemo, useState } from 'react';
import { normalizeArabic } from '@arabtools/core';
import type { Proverb, ProverbCategory } from '../types';
import { ALL_PROVERBS, getProverbsByCategory } from '../data/proverbs';

export function useProverbSearch(categoryFilter?: ProverbCategory) {
  const [query, setQuery] = useState('');

  const baseProverbs = useMemo(() => {
    return categoryFilter ? getProverbsByCategory(categoryFilter) : ALL_PROVERBS;
  }, [categoryFilter]);

  const results = useMemo(() => {
    if (!query.trim()) return baseProverbs;

    const normalizedQuery = normalizeArabic(query.toLowerCase().trim());

    return baseProverbs.filter(proverb => {
      const normalizedArabic = normalizeArabic(proverb.arabic);
      if (normalizedArabic.includes(normalizedQuery)) return true;

      const lowerTranslation = proverb.translation.toLowerCase();
      if (lowerTranslation.includes(normalizedQuery)) return true;

      const lowerMeaning = proverb.meaning.toLowerCase();
      if (lowerMeaning.includes(normalizedQuery)) return true;

      if (proverb.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))) return true;

      return false;
    });
  }, [query, baseProverbs]);

  return { query, setQuery, results };
}

export function searchProverbs(query: string, proverbs: Proverb[]): Proverb[] {
  if (!query.trim()) return proverbs;

  const normalizedQuery = normalizeArabic(query.toLowerCase().trim());

  return proverbs.filter(proverb => {
    const normalizedArabic = normalizeArabic(proverb.arabic);
    if (normalizedArabic.includes(normalizedQuery)) return true;
    if (proverb.translation.toLowerCase().includes(normalizedQuery)) return true;
    if (proverb.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))) return true;
    return false;
  });
}
