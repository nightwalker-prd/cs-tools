import { describe, it, expect } from 'vitest';
import {
  computeRetentionBuckets,
  getForgettingSoon,
  computeReviewForecast,
  computeDecayCurve,
} from '../services/srs-insights';
import type { SrsItem } from '@cstools/srs/types';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function makeSrsItem(overrides: Partial<SrsItem>): SrsItem {
  return {
    id: 'test-1',
    pillar: 'dsa',
    difficulty: 'beginner',
    phase: 'review',
    stability: 10,
    difficulty_score: 5,
    elapsed_days: 1,
    scheduled_days: 10,
    reps: 3,
    lapses: 0,
    last_review: Date.now() - MS_PER_DAY,
    due: Date.now() + 9 * MS_PER_DAY,
    contentId: 'algo-1',
    contentType: 'algorithm',
    ...overrides,
  };
}

describe('computeRetentionBuckets', () => {
  it('returns 5 buckets', () => {
    const result = computeRetentionBuckets([], Date.now());
    expect(result).toHaveLength(5);
  });

  it('places items into correct buckets', () => {
    const now = Date.now();
    const items: SrsItem[] = [
      // High retention: reviewed 1 day ago, stability 100 => R ≈ 0.99
      makeSrsItem({ id: 'high', stability: 100, last_review: now - MS_PER_DAY }),
      // Low retention: reviewed 20 days ago, stability 5 => R ≈ 0.018
      makeSrsItem({ id: 'low', stability: 5, last_review: now - 20 * MS_PER_DAY }),
    ];

    const result = computeRetentionBuckets(items, now);
    // High retention should be in 80-100% bucket
    const highBucket = result.find(b => b.label === '80-100%');
    expect(highBucket!.count).toBeGreaterThanOrEqual(1);
    // Low retention should be in 0-20% bucket
    const lowBucket = result.find(b => b.label === '0-20%');
    expect(lowBucket!.count).toBeGreaterThanOrEqual(1);
  });

  it('handles items with no reviews', () => {
    const items: SrsItem[] = [
      makeSrsItem({ id: 'new', last_review: null, stability: 0, phase: 'new' }),
    ];

    const result = computeRetentionBuckets(items, Date.now());
    // Should be in 0-20% bucket (retrievability = 0)
    const lowBucket = result.find(b => b.label === '0-20%');
    expect(lowBucket!.count).toBe(1);
  });
});

describe('getForgettingSoon', () => {
  it('returns items sorted by lowest retrievability', () => {
    const now = Date.now();
    const items: SrsItem[] = [
      makeSrsItem({ id: 'a', stability: 100, last_review: now - MS_PER_DAY, contentId: 'algo-a' }),
      makeSrsItem({ id: 'b', stability: 2, last_review: now - 5 * MS_PER_DAY, contentId: 'algo-b' }),
      makeSrsItem({ id: 'c', stability: 5, last_review: now - 3 * MS_PER_DAY, contentId: 'algo-c' }),
    ];

    const result = getForgettingSoon(items, now, 10);
    expect(result).toHaveLength(3);
    // Item b should be first (lowest retrievability)
    expect(result[0].itemId).toBe('b');
    expect(result[0].retrievability).toBeLessThan(result[1].retrievability);
  });

  it('limits to topN', () => {
    const now = Date.now();
    const items: SrsItem[] = Array.from({ length: 20 }, (_, i) =>
      makeSrsItem({ id: `item-${i}`, stability: i + 1, last_review: now - MS_PER_DAY, contentId: `algo-${i}` })
    );

    const result = getForgettingSoon(items, now, 5);
    expect(result).toHaveLength(5);
  });

  it('skips items that have never been reviewed', () => {
    const items: SrsItem[] = [
      makeSrsItem({ id: 'new', last_review: null, stability: 0, phase: 'new' }),
      makeSrsItem({ id: 'reviewed', stability: 5, last_review: Date.now() - MS_PER_DAY }),
    ];

    const result = getForgettingSoon(items, Date.now(), 10);
    expect(result).toHaveLength(1);
    expect(result[0].itemId).toBe('reviewed');
  });
});

describe('computeReviewForecast', () => {
  it('returns correct number of days', () => {
    const result = computeReviewForecast([], Date.now(), 14);
    expect(result).toHaveLength(14);
  });

  it('counts items due on each day', () => {
    const now = Date.now();
    const items: SrsItem[] = [
      makeSrsItem({ id: 'a', due: now + 0.5 * MS_PER_DAY }), // due today
      makeSrsItem({ id: 'b', due: now + 0.7 * MS_PER_DAY }), // due today
      makeSrsItem({ id: 'c', due: now + 1.5 * MS_PER_DAY }), // due tomorrow
    ];

    const result = computeReviewForecast(items, now, 3);
    expect(result[0].reviewCount).toBe(2); // today
    expect(result[1].reviewCount).toBe(1); // tomorrow
    expect(result[2].reviewCount).toBe(0); // day after
  });
});

describe('computeDecayCurve', () => {
  it('returns 30 data points', () => {
    const result = computeDecayCurve([], Date.now());
    expect(result).toHaveLength(30);
  });

  it('shows decreasing retention over time', () => {
    const now = Date.now();
    const items: SrsItem[] = [
      makeSrsItem({ id: 'a', stability: 10, last_review: now }),
    ];

    const result = computeDecayCurve(items, now);
    expect(result[0].averageRetention).toBeGreaterThan(result[29].averageRetention);
  });

  it('returns 0 retention for all offsets when no reviewed items', () => {
    const items: SrsItem[] = [
      makeSrsItem({ id: 'new', last_review: null, stability: 0, phase: 'new' }),
    ];

    const result = computeDecayCurve(items, Date.now());
    for (const point of result) {
      expect(point.averageRetention).toBe(0);
    }
  });
});
