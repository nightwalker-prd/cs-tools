import { useState, useEffect, useCallback, useMemo } from 'react';
import type { LemmaIndexEntry } from '@/types';

let cache: LemmaIndexEntry[] | null = null;
let fetchPromise: Promise<LemmaIndexEntry[]> | null = null;

export function useLemmaIndex() {
  const [data, setData] = useState<LemmaIndexEntry[] | null>(cache);
  const [loading, setLoading] = useState(cache === null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache) {
      setData(cache);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Deduplicate concurrent fetches
    if (!fetchPromise) {
      fetchPromise = fetch('/data/meta/lemma-index.json')
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json() as Promise<LemmaIndexEntry[]>;
        })
        .then((d) => {
          cache = d;
          return d;
        });
    }

    fetchPromise
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((e: Error) => {
        fetchPromise = null;
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const getById = useCallback(
    (lemmaId: number): LemmaIndexEntry | undefined => {
      return data?.find((entry) => entry.id === lemmaId);
    },
    [data],
  );

  const search = useCallback(
    (query: string): LemmaIndexEntry[] => {
      if (!data || !query.trim()) return [];
      const q = query.trim().toLowerCase();
      return data.filter(
        (entry) =>
          entry.lemma.includes(q) ||
          entry.meaning.toLowerCase().includes(q) ||
          entry.transliteration.toLowerCase().includes(q),
      );
    },
    [data],
  );

  return useMemo(
    () => ({ data, loading, error, getById, search }),
    [data, loading, error, getById, search],
  );
}
