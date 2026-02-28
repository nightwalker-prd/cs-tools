import { useState, useRef, useCallback } from 'react';
import type { WeakVerbEntry } from '@/types';

export function useWeakVerbLoader() {
  const cache = useRef<WeakVerbEntry[] | null>(null);
  const [loading, setLoading] = useState(false);

  const loadWeakVerbs = useCallback(async (): Promise<WeakVerbEntry[]> => {
    if (cache.current) return cache.current;

    setLoading(true);
    try {
      const response = await fetch('/data/weak-verbs.json');
      if (!response.ok) return [];
      const data: WeakVerbEntry[] = await response.json();
      cache.current = data;
      return data;
    } catch {
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { loadWeakVerbs, loading };
}
