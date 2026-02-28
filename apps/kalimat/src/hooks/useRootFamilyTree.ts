import { useState, useRef, useCallback } from 'react';
import type { RootFamilyData } from '@/types';

type LetterData = Record<string, RootFamilyData>;

export function useRootFamilyTree() {
  const cache = useRef<Map<string, LetterData>>(new Map());
  const [loading, setLoading] = useState(false);

  const loadFamilyTree = useCallback(async (root: string): Promise<RootFamilyData | null> => {
    if (!root || root.length === 0) return null;

    const firstLetter = root.charAt(0);

    if (cache.current.has(firstLetter)) {
      return cache.current.get(firstLetter)![root] ?? null;
    }

    setLoading(true);
    try {
      const response = await fetch(`/data/roots/${encodeURIComponent(firstLetter)}.json`);
      if (!response.ok) return null;
      const data: LetterData = await response.json();
      cache.current.set(firstLetter, data);
      return data[root] ?? null;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loadFamilyTree, loading };
}
