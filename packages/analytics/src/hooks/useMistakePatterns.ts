import { useMemo } from 'react';
import { loadErrorStore } from '../storage/analytics-storage';
import { analyzeMistakes } from '../services/mistake-analyzer';
import type { MistakePattern } from '../services/mistake-analyzer';

/**
 * Hook that loads error store and returns analyzed mistake patterns.
 */
export function useMistakePatterns(): MistakePattern[] {
  return useMemo(() => {
    const store = loadErrorStore();
    return analyzeMistakes(store, Date.now());
  }, []);
}
