import { useState, useRef, useCallback } from 'react';
import type { QuranWord } from '@/types';

export function useSurahLoader() {
  const cache = useRef<Map<number, QuranWord[]>>(new Map());
  const [loading, setLoading] = useState(false);

  const loadSurah = useCallback(async (surahNum: number): Promise<QuranWord[]> => {
    if (cache.current.has(surahNum)) {
      return cache.current.get(surahNum)!;
    }

    setLoading(true);
    try {
      const response = await fetch(`/data/quran/surah-${surahNum}.json`);
      const words: QuranWord[] = await response.json();
      cache.current.set(surahNum, words);
      return words;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loadSurah, loading };
}
