import { useMemo } from 'react';
import { loadWeeklyStats } from '../storage/analytics-storage';
import { getWeeklyComparison } from '../services/weekly-report';
import type { WeeklyComparison } from '../types/weekly';

/**
 * Hook that loads weekly stats and returns this week vs last week comparison.
 */
export function useWeeklyReport(): WeeklyComparison {
  return useMemo(() => {
    const stats = loadWeeklyStats();
    const today = new Date().toISOString().slice(0, 10);
    return getWeeklyComparison(stats, today);
  }, []);
}
