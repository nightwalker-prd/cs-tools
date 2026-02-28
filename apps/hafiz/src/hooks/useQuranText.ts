import { useState, useCallback, useRef } from 'react';
import type { SurahData } from '../types';

const cache = new Map<number, SurahData>();

export function useQuranText() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const loadSurah = useCallback(async (surahNum: number): Promise<SurahData | null> => {
    // Check cache first
    const cached = cache.get(surahNum);
    if (cached) return cached;

    // Cancel any pending request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/data/quran/${surahNum}.json`, {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`Failed to load surah ${surahNum}`);
      }
      const data: SurahData = await response.json();
      cache.set(surahNum, data);
      setLoading(false);
      return data;
    } catch (err) {
      if ((err as Error).name === 'AbortError') return null;
      setError((err as Error).message);
      setLoading(false);
      return null;
    }
  }, []);

  return { loadSurah, loading, error };
}
