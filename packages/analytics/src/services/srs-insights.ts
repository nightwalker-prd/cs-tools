import type { SrsItem } from '@arabtools/srs/types';
import type {
  DecayCurve,
  ForgettingWord,
  RetentionBucket,
  ReviewForecast,
  SrsInsightsData,
} from '../types/srs-insights';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Compute estimated retrievability using exponential decay.
 * R = e^(-daysSinceReview / stability)
 */
function computeRetrievability(item: SrsItem, now: number): number {
  if (item.last_review === null || item.stability <= 0) return 0;
  const daysSince = (now - item.last_review) / MS_PER_DAY;
  return Math.exp(-daysSince / item.stability);
}

/**
 * Compute retention distribution across 5 buckets.
 */
export function computeRetentionBuckets(items: SrsItem[], now: number): RetentionBucket[] {
  const buckets: RetentionBucket[] = [
    { label: '0-20%', range: [0, 0.2], count: 0, color: '#ef4444' },      // red
    { label: '20-40%', range: [0.2, 0.4], count: 0, color: '#f97316' },   // orange
    { label: '40-60%', range: [0.4, 0.6], count: 0, color: '#eab308' },   // yellow
    { label: '60-80%', range: [0.6, 0.8], count: 0, color: '#84cc16' },   // light-green
    { label: '80-100%', range: [0.8, 1.0], count: 0, color: '#22c55e' },  // green
  ];

  for (const item of items) {
    const r = computeRetrievability(item, now);
    for (const bucket of buckets) {
      if (r >= bucket.range[0] && (r < bucket.range[1] || (r === 1.0 && bucket.range[1] === 1.0))) {
        bucket.count++;
        break;
      }
    }
  }

  return buckets;
}

/**
 * Get items with the lowest estimated retrievability (forgetting soonest).
 */
export function getForgettingSoon(items: SrsItem[], now: number, topN: number): ForgettingWord[] {
  // Only consider items that have been reviewed at least once
  const reviewed = items.filter(item => item.last_review !== null);

  const withRetrievability = reviewed.map(item => {
    const daysSinceReview = (now - item.last_review!) / MS_PER_DAY;
    const retrievability = computeRetrievability(item, now);
    const nextReviewDate = new Date(item.due).toISOString().slice(0, 10);

    return {
      itemId: item.id,
      word: item.contentId,
      retrievability,
      daysSinceReview: Math.round(daysSinceReview * 10) / 10,
      nextReviewDate,
    };
  });

  // Sort by retrievability ascending (lowest first)
  withRetrievability.sort((a, b) => a.retrievability - b.retrievability);

  return withRetrievability.slice(0, topN);
}

/**
 * Predict reviews per day for the next N days based on due dates.
 */
export function computeReviewForecast(items: SrsItem[], now: number, days: number): ReviewForecast[] {
  const forecast: ReviewForecast[] = [];

  for (let i = 0; i < days; i++) {
    const dayStart = now + i * MS_PER_DAY;
    const dayEnd = dayStart + MS_PER_DAY;
    const dateStr = new Date(dayStart).toISOString().slice(0, 10);

    const reviewCount = items.filter(item => item.due >= dayStart && item.due < dayEnd).length;

    forecast.push({ date: dateStr, reviewCount });
  }

  return forecast;
}

/**
 * Compute average retention across items at each day offset from today.
 * Returns 30 data points showing how average retention decays over time.
 */
export function computeDecayCurve(items: SrsItem[], now: number): DecayCurve[] {
  const reviewed = items.filter(item => item.last_review !== null && item.stability > 0);

  if (reviewed.length === 0) {
    return Array.from({ length: 30 }, (_, i) => ({
      dayOffset: i,
      averageRetention: 0,
    }));
  }

  const curve: DecayCurve[] = [];

  for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
    const futureTime = now + dayOffset * MS_PER_DAY;
    let totalRetention = 0;

    for (const item of reviewed) {
      const daysSince = (futureTime - item.last_review!) / MS_PER_DAY;
      totalRetention += Math.exp(-daysSince / item.stability);
    }

    curve.push({
      dayOffset,
      averageRetention: Math.round((totalRetention / reviewed.length) * 1000) / 1000,
    });
  }

  return curve;
}

/**
 * Compute all SRS insights in one call.
 */
export function computeSrsInsights(items: SrsItem[], now: number): SrsInsightsData {
  const retentionBuckets = computeRetentionBuckets(items, now);
  const forgettingSoon = getForgettingSoon(items, now, 10);
  const forecast = computeReviewForecast(items, now, 14);
  const decayCurve = computeDecayCurve(items, now);

  const reviewed = items.filter(item => item.last_review !== null);
  let averageRetention = 0;
  if (reviewed.length > 0) {
    const totalR = reviewed.reduce((sum, item) => sum + computeRetrievability(item, now), 0);
    averageRetention = Math.round((totalR / reviewed.length) * 1000) / 1000;
  }

  return {
    retentionBuckets,
    forgettingSoon,
    forecast,
    decayCurve,
    totalItems: items.length,
    averageRetention,
  };
}
