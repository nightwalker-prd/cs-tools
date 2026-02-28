import { useState, useEffect } from 'react';
import type { SurahData } from '@/types';

const cache = new Map<number, SurahData>();

export function useQuranData(surahNum: number) {
  const [data, setData] = useState<SurahData | null>(
    cache.get(surahNum) ?? null,
  );
  const [loading, setLoading] = useState(!cache.has(surahNum));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache.has(surahNum)) {
      setData(cache.get(surahNum)!);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`/data/quran/${surahNum}.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<SurahData>;
      })
      .then((d) => {
        cache.set(surahNum, d);
        setData(d);
        setLoading(false);
      })
      .catch((e: Error) => {
        setError(e.message);
        setLoading(false);
      });
  }, [surahNum]);

  return { data, loading, error };
}
