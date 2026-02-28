import { useState, useRef, useCallback } from 'react';
import type { AyahPhraseMapping, PhraseGroup } from '@/types';

export function usePhraseLoader() {
  const cache = useRef<Map<number, AyahPhraseMapping[]>>(new Map());
  const [loading, setLoading] = useState(false);

  const loadPhrases = useCallback(async (surahNum: number): Promise<AyahPhraseMapping[]> => {
    if (cache.current.has(surahNum)) {
      return cache.current.get(surahNum)!;
    }

    setLoading(true);
    try {
      const response = await fetch(`/data/phrases/surah-${surahNum}.json`);
      if (!response.ok) return [];
      const data: AyahPhraseMapping[] = await response.json();
      cache.current.set(surahNum, data);
      return data;
    } catch {
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getAyahPhrases = useCallback(async (
    surahNum: number, ayahNum: number
  ): Promise<PhraseGroup[]> => {
    const data = await loadPhrases(surahNum);
    const ayah = data.find(a => a.ayahNum === ayahNum);
    return ayah?.phrases ?? [];
  }, [loadPhrases]);

  return { loadPhrases, getAyahPhrases, loading };
}
