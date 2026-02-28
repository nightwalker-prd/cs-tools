import { describe, it, expect } from 'vitest';
import {
  calculateRetrievability,
  calculateDifficulty,
  stabilityAfterSuccess,
  stabilityAfterFailure,
  stabilityToInterval,
  scheduleItem,
  getInitialStability,
} from '../engine/scheduler';
import { DEFAULT_FSRS_WEIGHTS } from '../types/scheduling';
import type { SrsItem } from '../types/items';
import type { ResponseQuality } from '../types/reviews';

// ─── Helper ─────────────────────────────────────────────────────

function makeItem(overrides: Partial<SrsItem> = {}): SrsItem {
  return {
    id: 'test-1',
    pillar: 'dsa',
    difficulty: 'beginner',
    phase: 'new',
    stability: 0,
    difficulty_score: 5,
    elapsed_days: 0,
    scheduled_days: 0,
    reps: 0,
    lapses: 0,
    last_review: null,
    due: Date.now(),
    contentId: 'topic-1',
    contentType: 'algorithm',
    ...overrides,
  };
}

const NOW = 1700000000000; // fixed timestamp for deterministic tests
const ONE_DAY = 24 * 60 * 60 * 1000;

// ─── calculateRetrievability ────────────────────────────────────

describe('calculateRetrievability', () => {
  it('returns 1 when elapsed days is 0', () => {
    expect(calculateRetrievability(0, 10)).toBe(1);
  });

  it('returns 0 when stability is 0', () => {
    expect(calculateRetrievability(5, 0)).toBe(0);
  });

  it('returns ~0.9 when elapsed equals the optimal interval for 90% retention', () => {
    const stability = 10;
    const interval = 9 * stability * (1 / 0.9 - 1); // = 10
    const r = calculateRetrievability(interval, stability);
    expect(r).toBeCloseTo(0.9, 1);
  });

  it('decreases as elapsed days increase', () => {
    const stability = 5;
    const r1 = calculateRetrievability(1, stability);
    const r2 = calculateRetrievability(5, stability);
    const r3 = calculateRetrievability(30, stability);
    expect(r1).toBeGreaterThan(r2);
    expect(r2).toBeGreaterThan(r3);
  });

  it('increases as stability increases', () => {
    const elapsed = 10;
    const r1 = calculateRetrievability(elapsed, 1);
    const r2 = calculateRetrievability(elapsed, 10);
    const r3 = calculateRetrievability(elapsed, 100);
    expect(r3).toBeGreaterThan(r2);
    expect(r2).toBeGreaterThan(r1);
  });

  it('always returns between 0 and 1', () => {
    for (let s = 0.1; s <= 100; s += 10) {
      for (let t = 0; t <= 365; t += 30) {
        const r = calculateRetrievability(t, s);
        expect(r).toBeGreaterThanOrEqual(0);
        expect(r).toBeLessThanOrEqual(1);
      }
    }
  });
});

// ─── calculateDifficulty ────────────────────────────────────────

describe('calculateDifficulty', () => {
  it('decreases difficulty for Easy (3) response', () => {
    const d = calculateDifficulty(5, 3);
    expect(d).toBeLessThan(5);
  });

  it('increases difficulty for Again (0) response', () => {
    const d = calculateDifficulty(5, 0);
    expect(d).toBeGreaterThan(5);
  });

  it('keeps difficulty relatively stable for Good (2) response', () => {
    const d = calculateDifficulty(5, 2);
    // Should be close to 5, but mean reversion may shift slightly
    expect(d).toBeCloseTo(5, 0);
  });

  it('clamps to [1, 10] range', () => {
    // Very easy item rated Easy → should not go below 1
    const dLow = calculateDifficulty(1, 3);
    expect(dLow).toBeGreaterThanOrEqual(1);

    // Very hard item rated Again → should not go above 10
    const dHigh = calculateDifficulty(10, 0);
    expect(dHigh).toBeLessThanOrEqual(10);
  });
});

// ─── stabilityAfterSuccess ──────────────────────────────────────

describe('stabilityAfterSuccess', () => {
  it('increases stability after success', () => {
    const newS = stabilityAfterSuccess(5, 5, 0.9);
    expect(newS).toBeGreaterThan(5);
  });

  it('grows more for easy items (low difficulty)', () => {
    const sEasy = stabilityAfterSuccess(5, 2, 0.9);
    const sHard = stabilityAfterSuccess(5, 8, 0.9);
    expect(sEasy).toBeGreaterThan(sHard);
  });

  it('grows more when retrievability is low (spaced further)', () => {
    const sLowR = stabilityAfterSuccess(5, 5, 0.5);
    const sHighR = stabilityAfterSuccess(5, 5, 0.95);
    expect(sLowR).toBeGreaterThan(sHighR);
  });

  it('returns initial stability for zero stability input', () => {
    const s = stabilityAfterSuccess(0, 5, 0.9);
    expect(s).toBe(DEFAULT_FSRS_WEIGHTS.w2);
  });
});

// ─── stabilityAfterFailure ──────────────────────────────────────

describe('stabilityAfterFailure', () => {
  it('decreases stability after failure', () => {
    const newS = stabilityAfterFailure(10, 5, 0.5);
    expect(newS).toBeLessThan(10);
  });

  it('never returns less than 0.1', () => {
    const s = stabilityAfterFailure(0.2, 5, 0.1);
    expect(s).toBeGreaterThanOrEqual(0.1);
  });

  it('returns initial stability for zero stability input', () => {
    const s = stabilityAfterFailure(0, 5, 0.5);
    expect(s).toBe(DEFAULT_FSRS_WEIGHTS.w0);
  });
});

// ─── stabilityToInterval ────────────────────────────────────────

describe('stabilityToInterval', () => {
  it('returns 0 for zero stability', () => {
    expect(stabilityToInterval(0)).toBe(0);
  });

  it('returns positive interval for positive stability', () => {
    expect(stabilityToInterval(5, 0.9)).toBeGreaterThan(0);
  });

  it('increases interval with higher stability', () => {
    const i1 = stabilityToInterval(5, 0.9);
    const i2 = stabilityToInterval(50, 0.9);
    expect(i2).toBeGreaterThan(i1);
  });

  it('returns shorter interval for higher target retention', () => {
    const i90 = stabilityToInterval(10, 0.9);
    const i95 = stabilityToInterval(10, 0.95);
    expect(i95).toBeLessThan(i90);
  });

  it('returns 0 for invalid target retention', () => {
    expect(stabilityToInterval(10, 0)).toBe(0);
    expect(stabilityToInterval(10, 1)).toBe(0);
  });

  it('produces correct value for known input', () => {
    // I = 9 * S * (1/R - 1)
    // For S=10, R=0.9: I = 9 * 10 * (1/0.9 - 1) = 90 * 0.111... = 10
    const i = stabilityToInterval(10, 0.9);
    expect(i).toBeCloseTo(10, 1);
  });
});

// ─── getInitialStability ────────────────────────────────────────

describe('getInitialStability', () => {
  it('returns correct values for each quality', () => {
    expect(getInitialStability(0)).toBe(DEFAULT_FSRS_WEIGHTS.w0);
    expect(getInitialStability(1)).toBe(DEFAULT_FSRS_WEIGHTS.w1);
    expect(getInitialStability(2)).toBe(DEFAULT_FSRS_WEIGHTS.w2);
    expect(getInitialStability(3)).toBe(DEFAULT_FSRS_WEIGHTS.w3);
  });
});

// ─── scheduleItem: Phase Transitions ────────────────────────────

describe('scheduleItem', () => {
  describe('new items', () => {
    it('transitions to learning on Good response', () => {
      const item = makeItem({ phase: 'new' });
      const result = scheduleItem(item, 2, DEFAULT_FSRS_WEIGHTS, undefined, 0.9, 365, NOW);
      expect(result.phase).toBe('learning');
      expect(result.stability).toBeGreaterThan(0);
    });

    it('transitions to learning on Again response', () => {
      const item = makeItem({ phase: 'new' });
      const result = scheduleItem(item, 0, DEFAULT_FSRS_WEIGHTS, undefined, 0.9, 365, NOW);
      expect(result.phase).toBe('learning');
    });

    it('transitions directly to review on Easy response', () => {
      const item = makeItem({ phase: 'new' });
      const result = scheduleItem(item, 3, DEFAULT_FSRS_WEIGHTS, undefined, 0.9, 365, NOW);
      expect(result.phase).toBe('review');
      expect(result.reps).toBe(1);
    });

    it('sets last_review timestamp', () => {
      const item = makeItem({ phase: 'new' });
      const result = scheduleItem(item, 2, DEFAULT_FSRS_WEIGHTS, undefined, 0.9, 365, NOW);
      expect(result.last_review).toBe(NOW);
    });
  });

  describe('learning items', () => {
    it('resets to first step on Again', () => {
      const item = makeItem({
        phase: 'learning',
        stability: 2.4,
        last_review: NOW - 10 * 60 * 1000,
        scheduled_days: 10 / (24 * 60), // 10 minutes in days
        reps: 1,
      });
      const result = scheduleItem(item, 0, DEFAULT_FSRS_WEIGHTS, undefined, 0.9, 365, NOW);
      expect(result.phase).toBe('learning');
      expect(result.reps).toBe(0);
    });

    it('graduates to review after completing all steps', () => {
      const item = makeItem({
        phase: 'learning',
        stability: 2.4,
        difficulty_score: 5,
        last_review: NOW - 10 * 60 * 1000,
        scheduled_days: 10 / (24 * 60), // at the 10-minute step (last step)
        reps: 1,
      });
      const result = scheduleItem(item, 2, DEFAULT_FSRS_WEIGHTS, undefined, 0.9, 365, NOW);
      expect(result.phase).toBe('review');
      expect(result.scheduled_days).toBeGreaterThanOrEqual(1);
    });

    it('graduates immediately on Easy', () => {
      const item = makeItem({
        phase: 'learning',
        stability: 0.6,
        last_review: NOW - 60 * 1000,
        scheduled_days: 1 / (24 * 60), // 1-minute step
        reps: 0,
      });
      const result = scheduleItem(item, 3, DEFAULT_FSRS_WEIGHTS, undefined, 0.9, 365, NOW);
      expect(result.phase).toBe('review');
    });
  });

  describe('review items', () => {
    it('stays in review on Good response', () => {
      const item = makeItem({
        phase: 'review',
        stability: 10,
        difficulty_score: 5,
        reps: 5,
        last_review: NOW - 10 * ONE_DAY,
        scheduled_days: 10,
        elapsed_days: 10,
      });
      const result = scheduleItem(item, 2, DEFAULT_FSRS_WEIGHTS, undefined, 0.9, 365, NOW);
      expect(result.phase).toBe('review');
      expect(result.stability).toBeGreaterThan(item.stability);
      expect(result.scheduled_days).toBeGreaterThan(0);
    });

    it('moves to relearning on Again', () => {
      const item = makeItem({
        phase: 'review',
        stability: 10,
        difficulty_score: 5,
        reps: 5,
        last_review: NOW - 10 * ONE_DAY,
        scheduled_days: 10,
        elapsed_days: 10,
      });
      const result = scheduleItem(item, 0, DEFAULT_FSRS_WEIGHTS, undefined, 0.9, 365, NOW);
      expect(result.phase).toBe('relearning');
      expect(result.lapses).toBe(1);
      expect(result.stability).toBeLessThan(item.stability);
    });

    it('gives shorter interval for Hard than Good', () => {
      const item = makeItem({
        phase: 'review',
        stability: 10,
        difficulty_score: 5,
        reps: 5,
        last_review: NOW - 10 * ONE_DAY,
        scheduled_days: 10,
      });
      const hard = scheduleItem(item, 1, DEFAULT_FSRS_WEIGHTS, undefined, 0.9, 365, NOW);
      const good = scheduleItem(item, 2, DEFAULT_FSRS_WEIGHTS, undefined, 0.9, 365, NOW);
      expect(hard.scheduled_days).toBeLessThanOrEqual(good.scheduled_days);
    });

    it('gives longer interval for Easy than Good', () => {
      const item = makeItem({
        phase: 'review',
        stability: 10,
        difficulty_score: 5,
        reps: 5,
        last_review: NOW - 10 * ONE_DAY,
        scheduled_days: 10,
      });
      const good = scheduleItem(item, 2, DEFAULT_FSRS_WEIGHTS, undefined, 0.9, 365, NOW);
      const easy = scheduleItem(item, 3, DEFAULT_FSRS_WEIGHTS, undefined, 0.9, 365, NOW);
      expect(easy.scheduled_days).toBeGreaterThanOrEqual(good.scheduled_days);
    });

    it('respects max interval', () => {
      const item = makeItem({
        phase: 'review',
        stability: 1000,
        difficulty_score: 1,
        reps: 50,
        last_review: NOW - 365 * ONE_DAY,
        scheduled_days: 365,
      });
      const result = scheduleItem(item, 3, DEFAULT_FSRS_WEIGHTS, undefined, 0.9, 365, NOW);
      expect(result.scheduled_days).toBeLessThanOrEqual(365);
    });
  });

  describe('relearning items', () => {
    it('graduates back to review on Good', () => {
      const item = makeItem({
        phase: 'relearning',
        stability: 2,
        difficulty_score: 6,
        reps: 5,
        lapses: 1,
        last_review: NOW - 10 * 60 * 1000,
        scheduled_days: 10 / (24 * 60),
      });
      const result = scheduleItem(item, 2, DEFAULT_FSRS_WEIGHTS, undefined, 0.9, 365, NOW);
      expect(result.phase).toBe('review');
      expect(result.scheduled_days).toBeGreaterThanOrEqual(1);
    });

    it('stays in relearning on Again', () => {
      const item = makeItem({
        phase: 'relearning',
        stability: 2,
        difficulty_score: 6,
        reps: 5,
        lapses: 1,
        last_review: NOW - 10 * 60 * 1000,
        scheduled_days: 10 / (24 * 60),
      });
      const result = scheduleItem(item, 0, DEFAULT_FSRS_WEIGHTS, undefined, 0.9, 365, NOW);
      expect(result.phase).toBe('relearning');
      expect(result.lapses).toBe(2);
    });
  });

  describe('interval sanity', () => {
    it('never schedules negative intervals', () => {
      const qualities: ResponseQuality[] = [0, 1, 2, 3];
      for (const q of qualities) {
        const item = makeItem({
          phase: 'review',
          stability: 5,
          difficulty_score: 5,
          reps: 3,
          last_review: NOW - 5 * ONE_DAY,
          scheduled_days: 5,
        });
        const result = scheduleItem(item, q, DEFAULT_FSRS_WEIGHTS, undefined, 0.9, 365, NOW);
        expect(result.scheduled_days).toBeGreaterThanOrEqual(0);
        expect(result.due).toBeGreaterThanOrEqual(NOW);
      }
    });

    it('always sets last_review to now', () => {
      const item = makeItem({ phase: 'new' });
      for (const q of [0, 1, 2, 3] as ResponseQuality[]) {
        const result = scheduleItem(item, q, DEFAULT_FSRS_WEIGHTS, undefined, 0.9, 365, NOW);
        expect(result.last_review).toBe(NOW);
      }
    });
  });
});
