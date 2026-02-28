import { useRef, useCallback } from 'react';
import type { SurahCorpus } from '@/types';

export function useCorpusLoader() {
  const cache = useRef<Map<number, SurahCorpus>>(new Map());

  const loadCorpus = useCallback(async (surahNum: number): Promise<SurahCorpus> => {
    if (cache.current.has(surahNum)) {
      return cache.current.get(surahNum)!;
    }

    const response = await fetch(`/data/corpus/surah-${surahNum}.json`);
    const data: SurahCorpus = await response.json();
    cache.current.set(surahNum, data);
    return data;
  }, []);

  return { loadCorpus };
}
