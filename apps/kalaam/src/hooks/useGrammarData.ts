import { useState, useEffect } from 'react';
import type { GrammarData } from '@/types';

const cache = new Map<number, GrammarData>();

export function useGrammarData(lemmaId: number | null) {
  const [data, setData] = useState<GrammarData | null>(
    lemmaId !== null ? (cache.get(lemmaId) ?? null) : null,
  );
  const [loading, setLoading] = useState(
    lemmaId !== null && !cache.has(lemmaId),
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lemmaId === null) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    if (cache.has(lemmaId)) {
      setData(cache.get(lemmaId)!);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`/data/grammar/${lemmaId}.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<GrammarData>;
      })
      .then((d) => {
        cache.set(lemmaId, d);
        setData(d);
        setLoading(false);
      })
      .catch((e: Error) => {
        setError(e.message);
        setLoading(false);
      });
  }, [lemmaId]);

  return { data, loading, error };
}
