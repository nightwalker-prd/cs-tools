import { useState, useEffect } from 'react';
import type { WordBatchItem } from '@/types';

const cache = new Map<number, WordBatchItem[]>();

export function useWordBatch(batchNum: number) {
  const [data, setData] = useState<WordBatchItem[] | null>(
    cache.get(batchNum) ?? null,
  );
  const [loading, setLoading] = useState(!cache.has(batchNum));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache.has(batchNum)) {
      setData(cache.get(batchNum)!);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`/data/words/batch-${batchNum}.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<WordBatchItem[]>;
      })
      .then((d) => {
        cache.set(batchNum, d);
        setData(d);
        setLoading(false);
      })
      .catch((e: Error) => {
        setError(e.message);
        setLoading(false);
      });
  }, [batchNum]);

  return { data, loading, error };
}
