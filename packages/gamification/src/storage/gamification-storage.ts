/**
 * localStorage adapter for gamification state persistence.
 *
 * All keys use the `arabtools-` prefix.
 * Handles serialization, deserialization, and storage limits.
 */

import type { XpState } from '../types/xp';
import type { StreakData, StreakFreezeData } from '../types/streak';
import type { DailyChallengeState } from '../types/daily-challenge';
import type { UserStats } from '../types/achievements';

// ─── Storage Keys ───────────────────────────────────────────────

const KEYS = {
  xp: 'arabtools-xp',
  streak: 'arabtools-streak',
  streakFreeze: 'arabtools-streak-freeze',
  achievements: 'arabtools-achievements',
  dailyChallenge: 'arabtools-daily-challenge',
} as const;

// ─── XP State ───────────────────────────────────────────────────

export function loadXpState(): XpState {
  return loadFromStorage<XpState>(KEYS.xp, {
    totalXp: 0,
    level: 1,
    history: [],
  });
}

export function saveXpState(state: XpState): void {
  saveToStorage(KEYS.xp, state);
}

// ─── Streak Data ────────────────────────────────────────────────

export function loadStreakData(): StreakData {
  return loadFromStorage<StreakData>(KEYS.streak, {
    currentStreak: 0,
    longestStreak: 0,
    lastPracticeDate: '',
    practiceDates: [],
  });
}

export function saveStreakData(data: StreakData): void {
  saveToStorage(KEYS.streak, data);
}

// ─── Streak Freeze ──────────────────────────────────────────────

export function loadStreakFreezeData(): StreakFreezeData {
  return loadFromStorage<StreakFreezeData>(KEYS.streakFreeze, {
    freezeTokens: 2,
    shieldTokens: 0,
    lastRefillDate: '',
  });
}

export function saveStreakFreezeData(data: StreakFreezeData): void {
  saveToStorage(KEYS.streakFreeze, data);
}

// ─── Achievements ───────────────────────────────────────────────

/** Stored as Record<achievementId, ISO date unlocked> */
export function loadAchievements(): Record<string, string> {
  return loadFromStorage<Record<string, string>>(KEYS.achievements, {});
}

export function saveAchievements(achievements: Record<string, string>): void {
  saveToStorage(KEYS.achievements, achievements);
}

// ─── Daily Challenge ────────────────────────────────────────────

export function loadDailyChallengeState(): DailyChallengeState | null {
  return loadFromStorage<DailyChallengeState | null>(KEYS.dailyChallenge, null);
}

export function saveDailyChallengeState(state: DailyChallengeState): void {
  saveToStorage(KEYS.dailyChallenge, state);
}

// ─── Cross-App Stats Collection ─────────────────────────────────

/**
 * Collect user stats from various app localStorage keys.
 * Reads cross-app data to build a unified UserStats object.
 */
export function collectUserStats(): UserStats {
  const xpState = loadXpState();
  const streakData = loadStreakData();
  const achievements = loadAchievements();

  // Detect which apps have been used by checking for their localStorage keys
  const appKeys: Array<{ app: string; key: string }> = [
    { app: 'sarf-exercises', key: 'arabtools-sarf-ex-state' },
    { app: 'bina', key: 'arabtools-bina-progress' },
    { app: 'tashkhis', key: 'arabtools-tashkhis-history' },
    { app: 'conjugation', key: 'arabtools-conjugation-progress' },
    { app: 'hafiz', key: 'arabtools-hafiz-state' },
    { app: 'mufradat', key: 'arabtools-srs-state' },
    { app: 'kalimat', key: 'arabtools-kalimat-progress' },
    { app: 'reading', key: 'arabtools-reading-visited' },
    { app: 'insha', key: 'arabtools-insha-progress' },
    { app: 'durus', key: 'arabtools-durus-progress' },
    { app: 'dhakira', key: 'dhakira-stats' },
  ];

  const appsUsed: string[] = [];
  if (typeof window !== 'undefined') {
    for (const { app, key } of appKeys) {
      try {
        if (localStorage.getItem(key) !== null) {
          appsUsed.push(app);
        }
      } catch {
        // skip
      }
    }
  }

  // Count exercises from XP history
  let totalExercisesCompleted = 0;
  let totalExercisesCorrect = 0;
  let totalPerfectSessions = 0;

  for (const entry of xpState.history) {
    if (entry.source === 'exerciseCorrect') {
      totalExercisesCorrect++;
      totalExercisesCompleted++;
    } else if (entry.source === 'exerciseAttempt') {
      totalExercisesCompleted++;
    } else if (entry.source === 'perfectSession') {
      totalPerfectSessions++;
    }
  }

  return {
    totalXp: xpState.totalXp,
    currentStreak: streakData.currentStreak,
    longestStreak: streakData.longestStreak,
    totalExercisesCompleted,
    totalExercisesCorrect,
    totalPerfectSessions,
    totalDaysActive: streakData.practiceDates.length,
    appsUsed,
    totalAchievements: Object.keys(achievements).length,
  };
}

// ─── Bulk Operations ────────────────────────────────────────────

export function clearAllGamificationData(): void {
  for (const key of Object.values(KEYS)) {
    removeFromStorage(key);
  }
}

// ─── Internal Helpers ───────────────────────────────────────────

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[Gamification Storage] Failed to load ${key}:`, error);
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn(`[Gamification Storage] Quota exceeded for ${key}. Consider clearing old data.`);
    } else {
      console.warn(`[Gamification Storage] Failed to save ${key}:`, error);
    }
  }
}

function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[Gamification Storage] Failed to remove ${key}:`, error);
  }
}
