import { useMemo } from 'react';
import { loadReviewHistory } from '@arabtools/srs/storage';

/**
 * Hook that extracts unique review dates from SRS history
 * and returns a 90-day activity map (date -> review count).
 */
export function useStreakCalendar(): Record<string, number> {
  return useMemo(() => {
    const history = loadReviewHistory();
    const activityMap: Record<string, number> = {};

    // Only look at last 90 days
    const now = Date.now();
    const ninetyDaysAgo = now - 90 * 24 * 60 * 60 * 1000;

    for (const log of history) {
      if (log.timestamp < ninetyDaysAgo) continue;
      const dateStr = new Date(log.timestamp).toISOString().slice(0, 10);
      activityMap[dateStr] = (activityMap[dateStr] ?? 0) + 1;
    }

    return activityMap;
  }, []);
}
