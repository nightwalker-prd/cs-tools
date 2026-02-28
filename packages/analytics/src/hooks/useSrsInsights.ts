import { useMemo } from 'react';
import { loadDeckState } from '@cstools/srs/storage';
import { computeSrsInsights } from '../services/srs-insights';
import type { SrsInsightsData } from '../types/srs-insights';

/**
 * Hook that loads SRS deck state and computes all SRS insights.
 */
export function useSrsInsights(): SrsInsightsData {
  return useMemo(() => {
    const items = loadDeckState();
    return computeSrsInsights(items, Date.now());
  }, []);
}
