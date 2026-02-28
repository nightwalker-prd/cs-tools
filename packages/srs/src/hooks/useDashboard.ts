/**
 * useDashboard hook.
 *
 * Computes dashboard statistics from the SRS deck state and review history.
 * All computations are derived — no additional state is stored.
 */

import { useMemo } from 'react';
import type { SrsItem, Pillar, DashboardData, PillarStats } from '../types';
import type { ReviewLog } from '../types/reviews';

/** Number of recent reviews to use for retention calculation */
const RETENTION_WINDOW = 50;

/**
 * Compute dashboard data from deck state and review history.
 *
 * @param items - All SRS items in the deck
 * @param history - Review history logs
 * @param now - Current timestamp (for testing)
 * @returns Computed dashboard data
 */
export function computeDashboardData(
  items: SrsItem[],
  history: ReviewLog[],
  now: number = Date.now(),
): DashboardData {
  const pillars: Pillar[] = ['dsa', 'systems', 'engineering', 'theory'];

  // Per-pillar stats
  const pillarStats = {} as Record<Pillar, PillarStats>;
  for (const pillar of pillars) {
    const pillarItems = items.filter(i => i.pillar === pillar);
    const pillarHistory = history.filter(h => {
      const item = items.find(i => i.id === h.itemId);
      return item?.pillar === pillar;
    });

    pillarStats[pillar] = computePillarStats(pillarItems, pillarHistory, now);
  }

  // Global counts
  let dueNow = 0;
  let newItems = 0;
  let learningItems = 0;
  let reviewItems = 0;

  for (const item of items) {
    switch (item.phase) {
      case 'new':
        newItems++;
        break;
      case 'learning':
      case 'relearning':
        learningItems++;
        if (item.due <= now) dueNow++;
        break;
      case 'review':
        reviewItems++;
        if (item.due <= now) dueNow++;
        break;
    }
  }

  // Overall retention from recent reviews
  const recentReviews = history.slice(-RETENTION_WINDOW);
  const retentionRate = computeRetentionRate(recentReviews);

  // Streak calculation
  const streak = computeStreak(history, now);

  // Reviews today
  const todayStart = startOfDay(now);
  const reviewsToday = history.filter(h => h.timestamp >= todayStart).length;

  return {
    totalItems: items.length,
    dueNow,
    newItems,
    learningItems,
    reviewItems,
    retentionRate,
    streak,
    pillarStats,
    reviewsToday,
  };
}

/**
 * React hook for dashboard data, memoized for performance.
 */
export function useDashboard(
  items: SrsItem[],
  history: ReviewLog[],
): DashboardData {
  return useMemo(
    () => computeDashboardData(items, history),
    [items, history],
  );
}

// ─── Internal Helpers ───────────────────────────────────────────

function computePillarStats(
  items: SrsItem[],
  history: ReviewLog[],
  now: number,
): PillarStats {
  let due = 0;
  let newCount = 0;
  let learning = 0;
  let review = 0;

  for (const item of items) {
    switch (item.phase) {
      case 'new':
        newCount++;
        break;
      case 'learning':
      case 'relearning':
        learning++;
        if (item.due <= now) due++;
        break;
      case 'review':
        review++;
        if (item.due <= now) due++;
        break;
    }
  }

  const recentReviews = history.slice(-RETENTION_WINDOW);
  const retention = computeRetentionRate(recentReviews);

  return {
    total: items.length,
    due,
    newCount,
    learning,
    review,
    retention,
  };
}

function computeRetentionRate(reviews: ReviewLog[]): number {
  if (reviews.length === 0) return 0;
  const successful = reviews.filter(r => r.quality > 0).length;
  return successful / reviews.length;
}

function computeStreak(history: ReviewLog[], now: number): number {
  if (history.length === 0) return 0;

  let streak = 0;
  let checkDate = startOfDay(now);

  // Check if there are reviews today
  const hasReviewsToday = history.some(h => h.timestamp >= checkDate);
  if (hasReviewsToday) {
    streak = 1;
  } else {
    // If no reviews today, start checking from yesterday
    // (streak might still be active if they haven't studied yet today)
    return 0;
  }

  // Check previous days
  const oneDay = 24 * 60 * 60 * 1000;
  checkDate -= oneDay;

  while (true) {
    const dayEnd = checkDate + oneDay;
    const hasReviews = history.some(
      h => h.timestamp >= checkDate && h.timestamp < dayEnd,
    );

    if (!hasReviews) break;
    streak++;
    checkDate -= oneDay;
  }

  return streak;
}

function startOfDay(timestamp: number): number {
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}
