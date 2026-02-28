export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string; // ISO date YYYY-MM-DD
  practiceDates: string[]; // last 90 days, ISO dates
}

export interface StreakFreezeData {
  freezeTokens: number; // max 2, refill monthly
  shieldTokens: number; // max 3, earned from perfect sessions
  lastRefillDate: string; // ISO date
}

export interface StreakMultiplierInfo {
  multiplier: number;
  nextTier: { days: number; multiplier: number } | null;
  daysUntilNext: number;
}
