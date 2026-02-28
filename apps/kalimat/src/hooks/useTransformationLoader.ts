import { useState, useRef, useCallback } from 'react';
import type { SurahTransformations, WordTransformations } from '@/types';

export function useTransformationLoader() {
  const cache = useRef<Map<number, SurahTransformations>>(new Map());
  const [loading, setLoading] = useState(false);

  const loadTransformations = useCallback(async (surahNum: number): Promise<SurahTransformations> => {
    if (cache.current.has(surahNum)) {
      return cache.current.get(surahNum)!;
    }

    setLoading(true);
    try {
      const response = await fetch(`/data/transformations/surah-${surahNum}.json`);
      const data: SurahTransformations = await response.json();
      cache.current.set(surahNum, data);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const getWordTransformations = useCallback(async (
    surahNum: number, ayahNum: number, wordNum: number
  ): Promise<WordTransformations | null> => {
    const data = await loadTransformations(surahNum);
    const key = `${surahNum}:${ayahNum}:${wordNum}`;
    return data[key] ?? null;
  }, [loadTransformations]);

  return { loadTransformations, getWordTransformations, loading };
}
