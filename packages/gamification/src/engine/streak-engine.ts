import type { StreakData, StreakFreezeData, StreakMultiplierInfo } from '../types/streak';

const MAX_PRACTICE_DATES = 90;

const MULTIPLIER_TIERS = [
  { days: 7, multiplier: 1.5 },
  { days: 14, multiplier: 2 },
  { days: 30, multiplier: 3 },
] as const;

/**
 * Calculate the number of days between two ISO date strings.
 * Returns a positive integer if date2 > date1.
 */
function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1 + 'T00:00:00Z');
  const d2 = new Date(date2 + 'T00:00:00Z');
  return Math.round((d2.getTime() - d1.getTime()) / 86400000);
}

/**
 * Record a practice day. Updates streak and practice dates.
 * Pure function — pass today as ISO date string.
 */
export function recordPracticeDay(streak: StreakData, today: string): StreakData {
  // Already recorded today
  if (streak.lastPracticeDate === today) {
    return streak;
  }

  const gap = streak.lastPracticeDate
    ? daysBetween(streak.lastPracticeDate, today)
    : 1;

  let newCurrentStreak: number;
  if (gap === 1) {
    // Consecutive day
    newCurrentStreak = streak.currentStreak + 1;
  } else if (gap === 0) {
    // Same day (shouldn't reach here due to early return, but safety)
    return streak;
  } else {
    // Streak broken — start fresh
    newCurrentStreak = 1;
  }

  const newLongestStreak = Math.max(streak.longestStreak, newCurrentStreak);

  // Add today to practice dates, trim to 90 days
  const newDates = [...streak.practiceDates, today];
  const trimmedDates =
    newDates.length > MAX_PRACTICE_DATES
      ? newDates.slice(-MAX_PRACTICE_DATES)
      : newDates;

  return {
    currentStreak: newCurrentStreak,
    longestStreak: newLongestStreak,
    lastPracticeDate: today,
    practiceDates: trimmedDates,
  };
}

/**
 * Get the current streak multiplier and info about the next tier.
 */
export function getStreakMultiplier(currentStreak: number): StreakMultiplierInfo {
  let currentMultiplier = 1;
  let nextTierData: { days: number; multiplier: number } | null = null;

  for (const tier of MULTIPLIER_TIERS) {
    if (currentStreak >= tier.days) {
      currentMultiplier = tier.multiplier;
    } else {
      nextTierData = { days: tier.days, multiplier: tier.multiplier };
      break;
    }
  }

  const daysUntilNext = nextTierData
    ? nextTierData.days - currentStreak
    : 0;

  return {
    multiplier: currentMultiplier,
    nextTier: nextTierData,
    daysUntilNext,
  };
}

/**
 * Check if the streak is broken (missed a day) and auto-consume freeze/shield.
 * Pure function — pass today as ISO date string.
 */
export function checkStreakBreak(
  streak: StreakData,
  freeze: StreakFreezeData,
  today: string,
): { streak: StreakData; freeze: StreakFreezeData; froze: boolean } {
  if (!streak.lastPracticeDate) {
    return { streak, freeze, froze: false };
  }

  const gap = daysBetween(streak.lastPracticeDate, today);

  // No break if practiced today or yesterday
  if (gap <= 1) {
    return { streak, freeze, froze: false };
  }

  // Missed one day (gap === 2) — try to use a freeze/shield
  if (gap === 2) {
    // Try shield first (earned, more valuable to keep freeze tokens)
    if (freeze.shieldTokens > 0) {
      return {
        streak,
        freeze: { ...freeze, shieldTokens: freeze.shieldTokens - 1 },
        froze: true,
      };
    }
    // Try freeze token
    if (freeze.freezeTokens > 0) {
      return {
        streak,
        freeze: { ...freeze, freezeTokens: freeze.freezeTokens - 1 },
        froze: true,
      };
    }
  }

  // Streak is broken — reset current streak
  return {
    streak: {
      ...streak,
      currentStreak: 0,
    },
    freeze,
    froze: false,
  };
}

/**
 * Refill freeze tokens monthly (max 2 per month).
 * Pure function — pass today as ISO date string.
 */
export function refillFreezeTokens(
  freeze: StreakFreezeData,
  today: string,
): StreakFreezeData {
  const currentMonth = today.slice(0, 7); // YYYY-MM
  const lastRefillMonth = freeze.lastRefillDate.slice(0, 7);

  if (currentMonth === lastRefillMonth) {
    return freeze;
  }

  return {
    ...freeze,
    freezeTokens: 2,
    lastRefillDate: today,
  };
}

/**
 * Award a shield token for a perfect session (max 3).
 */
export function earnShieldToken(freeze: StreakFreezeData): StreakFreezeData {
  if (freeze.shieldTokens >= 3) {
    return freeze;
  }
  return { ...freeze, shieldTokens: freeze.shieldTokens + 1 };
}
