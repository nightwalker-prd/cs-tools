import { useState, useRef, useCallback } from 'react';

type SimilarWordsData = Record<number, number[]>;

export function useSimilarWords() {
  const cache = useRef<SimilarWordsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SimilarWordsData | null>(null);

  const loadData = useCallback(async (): Promise<SimilarWordsData> => {
    if (cache.current) return cache.current;

    setLoading(true);
    try {
      const response = await fetch('/data/similar-words.json');
      if (!response.ok) return {};
      const result: SimilarWordsData = await response.json();
      cache.current = result;
      setData(result);
      return result;
    } catch {
      return {};
    } finally {
      setLoading(false);
    }
  }, []);

  const getDistractors = useCallback((lemmaId: number): number[] => {
    if (!cache.current) return [];
    return cache.current[lemmaId] ?? [];
  }, []);

  return { loadData, getDistractors, loading, data };
}
