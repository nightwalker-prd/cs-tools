import { describe, it, expect } from 'vitest';
import {
  recordPracticeDay,
  getStreakMultiplier,
  checkStreakBreak,
  refillFreezeTokens,
  earnShieldToken,
} from '../engine/streak-engine';
import type { StreakData, StreakFreezeData } from '../types/streak';

const emptyStreak: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastPracticeDate: '',
  practiceDates: [],
};

const defaultFreeze: StreakFreezeData = {
  freezeTokens: 2,
  shieldTokens: 0,
  lastRefillDate: '2026-01-01',
};

describe('recordPracticeDay', () => {
  it('starts streak at 1 on first practice', () => {
    const result = recordPracticeDay(emptyStreak, '2026-01-15');
    expect(result.currentStreak).toBe(1);
    expect(result.longestStreak).toBe(1);
    expect(result.lastPracticeDate).toBe('2026-01-15');
    expect(result.practiceDates).toEqual(['2026-01-15']);
  });

  it('increments streak on consecutive day', () => {
    const streak: StreakData = {
      currentStreak: 3,
      longestStreak: 5,
      lastPracticeDate: '2026-01-14',
      practiceDates: ['2026-01-12', '2026-01-13', '2026-01-14'],
    };
    const result = recordPracticeDay(streak, '2026-01-15');
    expect(result.currentStreak).toBe(4);
    expect(result.longestStreak).toBe(5);
  });

  it('resets streak on gap > 1 day', () => {
    const streak: StreakData = {
      currentStreak: 5,
      longestStreak: 5,
      lastPracticeDate: '2026-01-12',
      practiceDates: [],
    };
    const result = recordPracticeDay(streak, '2026-01-15');
    expect(result.currentStreak).toBe(1);
    expect(result.longestStreak).toBe(5);
  });

  it('returns same state if same day', () => {
    const streak: StreakData = {
      currentStreak: 3,
      longestStreak: 5,
      lastPracticeDate: '2026-01-15',
      practiceDates: ['2026-01-15'],
    };
    const result = recordPracticeDay(streak, '2026-01-15');
    expect(result).toBe(streak);
  });

  it('updates longestStreak when current exceeds it', () => {
    const streak: StreakData = {
      currentStreak: 5,
      longestStreak: 5,
      lastPracticeDate: '2026-01-14',
      practiceDates: [],
    };
    const result = recordPracticeDay(streak, '2026-01-15');
    expect(result.currentStreak).toBe(6);
    expect(result.longestStreak).toBe(6);
  });

  it('caps practice dates at 90', () => {
    const dates = Array.from({ length: 90 }, (_, i) => {
      const d = new Date(2026, 0, i + 1);
      return d.toISOString().slice(0, 10);
    });
    const streak: StreakData = {
      currentStreak: 90,
      longestStreak: 90,
      lastPracticeDate: '2026-03-31',
      practiceDates: dates,
    };
    const result = recordPracticeDay(streak, '2026-04-01');
    expect(result.practiceDates).toHaveLength(90);
  });
});

describe('getStreakMultiplier', () => {
  it('returns 1x for streak < 7', () => {
    const info = getStreakMultiplier(5);
    expect(info.multiplier).toBe(1);
    expect(info.nextTier).toEqual({ days: 7, multiplier: 1.5 });
    expect(info.daysUntilNext).toBe(2);
  });

  it('returns 1.5x for streak >= 7', () => {
    const info = getStreakMultiplier(7);
    expect(info.multiplier).toBe(1.5);
    expect(info.nextTier).toEqual({ days: 14, multiplier: 2 });
  });

  it('returns 2x for streak >= 14', () => {
    const info = getStreakMultiplier(14);
    expect(info.multiplier).toBe(2);
    expect(info.nextTier).toEqual({ days: 30, multiplier: 3 });
  });

  it('returns 3x for streak >= 30', () => {
    const info = getStreakMultiplier(30);
    expect(info.multiplier).toBe(3);
    expect(info.nextTier).toBeNull();
    expect(info.daysUntilNext).toBe(0);
  });

  it('returns 3x for streak >> 30', () => {
    const info = getStreakMultiplier(100);
    expect(info.multiplier).toBe(3);
  });
});

describe('checkStreakBreak', () => {
  it('does not break if practiced today', () => {
    const streak: StreakData = {
      currentStreak: 5,
      longestStreak: 5,
      lastPracticeDate: '2026-01-15',
      practiceDates: [],
    };
    const result = checkStreakBreak(streak, defaultFreeze, '2026-01-15');
    expect(result.froze).toBe(false);
    expect(result.streak.currentStreak).toBe(5);
  });

  it('does not break if practiced yesterday', () => {
    const streak: StreakData = {
      currentStreak: 5,
      longestStreak: 5,
      lastPracticeDate: '2026-01-14',
      practiceDates: [],
    };
    const result = checkStreakBreak(streak, defaultFreeze, '2026-01-15');
    expect(result.froze).toBe(false);
    expect(result.streak.currentStreak).toBe(5);
  });

  it('uses freeze token on one missed day', () => {
    const streak: StreakData = {
      currentStreak: 5,
      longestStreak: 5,
      lastPracticeDate: '2026-01-13',
      practiceDates: [],
    };
    const result = checkStreakBreak(streak, defaultFreeze, '2026-01-15');
    expect(result.froze).toBe(true);
    expect(result.freeze.freezeTokens).toBe(1);
    expect(result.streak.currentStreak).toBe(5); // preserved
  });

  it('prefers shield tokens over freeze tokens', () => {
    const freeze: StreakFreezeData = {
      freezeTokens: 2,
      shieldTokens: 1,
      lastRefillDate: '2026-01-01',
    };
    const streak: StreakData = {
      currentStreak: 5,
      longestStreak: 5,
      lastPracticeDate: '2026-01-13',
      practiceDates: [],
    };
    const result = checkStreakBreak(streak, freeze, '2026-01-15');
    expect(result.froze).toBe(true);
    expect(result.freeze.shieldTokens).toBe(0);
    expect(result.freeze.freezeTokens).toBe(2); // unchanged
  });

  it('resets streak when no tokens and gap > 1', () => {
    const freeze: StreakFreezeData = {
      freezeTokens: 0,
      shieldTokens: 0,
      lastRefillDate: '2026-01-01',
    };
    const streak: StreakData = {
      currentStreak: 5,
      longestStreak: 5,
      lastPracticeDate: '2026-01-13',
      practiceDates: [],
    };
    const result = checkStreakBreak(streak, freeze, '2026-01-15');
    expect(result.froze).toBe(false);
    expect(result.streak.currentStreak).toBe(0);
    expect(result.streak.longestStreak).toBe(5);
  });

  it('resets streak on gap > 2 even with tokens', () => {
    const streak: StreakData = {
      currentStreak: 5,
      longestStreak: 5,
      lastPracticeDate: '2026-01-10',
      practiceDates: [],
    };
    const result = checkStreakBreak(streak, defaultFreeze, '2026-01-15');
    expect(result.froze).toBe(false);
    expect(result.streak.currentStreak).toBe(0);
  });
});

describe('refillFreezeTokens', () => {
  it('refills to 2 tokens on new month', () => {
    const freeze: StreakFreezeData = {
      freezeTokens: 0,
      shieldTokens: 1,
      lastRefillDate: '2025-12-15',
    };
    const result = refillFreezeTokens(freeze, '2026-01-01');
    expect(result.freezeTokens).toBe(2);
    expect(result.lastRefillDate).toBe('2026-01-01');
    expect(result.shieldTokens).toBe(1); // unchanged
  });

  it('does not refill in same month', () => {
    const freeze: StreakFreezeData = {
      freezeTokens: 0,
      shieldTokens: 0,
      lastRefillDate: '2026-01-05',
    };
    const result = refillFreezeTokens(freeze, '2026-01-20');
    expect(result.freezeTokens).toBe(0);
  });
});

describe('earnShieldToken', () => {
  it('increments shield tokens', () => {
    const freeze: StreakFreezeData = {
      freezeTokens: 2,
      shieldTokens: 1,
      lastRefillDate: '2026-01-01',
    };
    const result = earnShieldToken(freeze);
    expect(result.shieldTokens).toBe(2);
  });

  it('caps at 3 shield tokens', () => {
    const freeze: StreakFreezeData = {
      freezeTokens: 2,
      shieldTokens: 3,
      lastRefillDate: '2026-01-01',
    };
    const result = earnShieldToken(freeze);
    expect(result.shieldTokens).toBe(3);
    expect(result).toBe(freeze); // same reference when at max
  });
});
