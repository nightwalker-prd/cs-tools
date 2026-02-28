import { useState, useRef, useCallback } from 'react';
import type { MorphemeData } from '@/types';

type SurahMorphemes = Record<string, MorphemeData>;

export function useMorphemeLoader() {
  const cache = useRef<Map<number, SurahMorphemes>>(new Map());
  const [loading, setLoading] = useState(false);

  const loadMorphemes = useCallback(async (surahNum: number): Promise<SurahMorphemes> => {
    if (cache.current.has(surahNum)) {
      return cache.current.get(surahNum)!;
    }

    setLoading(true);
    try {
      const response = await fetch(`/data/morphemes/surah-${surahNum}.json`);
      const data: SurahMorphemes = await response.json();
      cache.current.set(surahNum, data);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const getMorpheme = useCallback(async (surahNum: number, wordLoc: string): Promise<MorphemeData | null> => {
    const data = await loadMorphemes(surahNum);
    return data[wordLoc] ?? null;
  }, [loadMorphemes]);

  return { loadMorphemes, getMorpheme, loading };
}
