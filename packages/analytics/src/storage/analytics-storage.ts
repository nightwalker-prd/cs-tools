import type { ErrorStore } from '../types/errors';
import type { WeeklyStats } from '../types/weekly';

// ─── Storage Keys ───────────────────────────────────────────────

const KEYS = {
  errors: 'arabtools-errors',
  weeklyStats: 'arabtools-weekly-stats',
} as const;

// ─── Error Store ────────────────────────────────────────────────

const EMPTY_ERROR_STORE: ErrorStore = {
  entries: [],
  wordAggregates: {},
};

/**
 * Load the error store from localStorage.
 */
export function loadErrorStore(): ErrorStore {
  return loadFromStorage<ErrorStore>(KEYS.errors, EMPTY_ERROR_STORE);
}

/**
 * Save the error store to localStorage.
 */
export function saveErrorStore(store: ErrorStore): void {
  saveToStorage(KEYS.errors, store);
}

// ─── Weekly Stats ───────────────────────────────────────────────

const EMPTY_WEEKLY_STATS: WeeklyStats = {
  dailyEntries: [],
};

/**
 * Load weekly stats from localStorage.
 */
export function loadWeeklyStats(): WeeklyStats {
  return loadFromStorage<WeeklyStats>(KEYS.weeklyStats, EMPTY_WEEKLY_STATS);
}

/**
 * Save weekly stats to localStorage.
 */
export function saveWeeklyStats(stats: WeeklyStats): void {
  saveToStorage(KEYS.weeklyStats, stats);
}

// ─── Bulk Operations ────────────────────────────────────────────

/**
 * Clear all analytics data from localStorage.
 * Use with caution — this is irreversible.
 */
export function clearAllAnalyticsData(): void {
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
    console.warn(`[Analytics Storage] Failed to load ${key}:`, error);
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn(`[Analytics Storage] Quota exceeded for ${key}. Consider clearing old data.`);
    } else {
      console.warn(`[Analytics Storage] Failed to save ${key}:`, error);
    }
  }
}

function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[Analytics Storage] Failed to remove ${key}:`, error);
  }
}
