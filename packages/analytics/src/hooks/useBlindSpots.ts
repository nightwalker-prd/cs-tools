import { useMemo } from 'react';
import { loadErrorStore } from '../storage/analytics-storage';
import { analyzeBlindSpots } from '../services/blind-spot';
import type { BlindSpotAnalysis } from '../types/blind-spots';

/**
 * Hook that loads error store and returns top 5 blind spots.
 */
export function useBlindSpots(): BlindSpotAnalysis {
  return useMemo(() => {
    const store = loadErrorStore();
    return analyzeBlindSpots(store, 5, Date.now());
  }, []);
}
