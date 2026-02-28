/**
 * localStorage adapter for SRS state persistence.
 *
 * All keys use the `cstools-srs-` prefix.
 * Handles serialization, deserialization, and storage limits.
 */

import type { SrsItem } from '../types/items';
import type { ReviewLog } from '../types/reviews';
import type { SessionState } from '../types/sessions';
import type { CalibrationState } from '../engine/calibration';

// ─── Storage Keys ───────────────────────────────────────────────

const PREFIX = 'cstools-srs-';

const KEYS = {
  /** SrsItem[] — the full deck state */
  state: `${PREFIX}state`,
  /** ReviewLog[] — review history (capped) */
  history: `${PREFIX}history`,
  /** SessionState — active session backup for crash recovery */
  session: `${PREFIX}session`,
  /** CalibrationState — learner calibration data */
  calibration: `${PREFIX}calibration`,
} as const;

/** Maximum number of review logs to retain */
const MAX_HISTORY_SIZE = 5000;

// ─── Deck State ─────────────────────────────────────────────────

/**
 * Load the SRS deck state from localStorage.
 *
 * @returns Array of SRS items, or empty array if nothing stored
 */
export function loadDeckState(): SrsItem[] {
  return loadFromStorage<SrsItem[]>(KEYS.state, []);
}

/**
 * Save the SRS deck state to localStorage.
 *
 * @param items - The full deck state to persist
 */
export function saveDeckState(items: SrsItem[]): void {
  saveToStorage(KEYS.state, items);
}

/**
 * Update a single item in the deck state.
 *
 * @param updatedItem - The item with updated fields
 * @returns The updated deck state
 */
export function updateDeckItem(updatedItem: SrsItem): SrsItem[] {
  const items = loadDeckState();
  const index = items.findIndex(i => i.id === updatedItem.id);

  if (index === -1) {
    items.push(updatedItem);
  } else {
    items[index] = updatedItem;
  }

  saveDeckState(items);
  return items;
}

// ─── Review History ─────────────────────────────────────────────

/**
 * Load review history from localStorage.
 *
 * @returns Array of review logs, or empty array if nothing stored
 */
export function loadReviewHistory(): ReviewLog[] {
  return loadFromStorage<ReviewLog[]>(KEYS.history, []);
}

/**
 * Append review logs to history, trimming to MAX_HISTORY_SIZE.
 *
 * @param newLogs - New review logs to append
 * @returns The full (possibly trimmed) history
 */
export function appendReviewHistory(newLogs: ReviewLog[]): ReviewLog[] {
  const existing = loadReviewHistory();
  const combined = [...existing, ...newLogs];

  // Trim to max size, keeping most recent
  const trimmed = combined.length > MAX_HISTORY_SIZE
    ? combined.slice(-MAX_HISTORY_SIZE)
    : combined;

  saveToStorage(KEYS.history, trimmed);
  return trimmed;
}

/**
 * Get the most recent N review logs.
 */
export function getRecentReviews(count: number): ReviewLog[] {
  const history = loadReviewHistory();
  return history.slice(-count);
}

// ─── Session Backup ─────────────────────────────────────────────

/**
 * Save the active session state for crash recovery.
 */
export function saveSessionBackup(session: SessionState): void {
  saveToStorage(KEYS.session, session);
}

/**
 * Load a saved session backup.
 *
 * @returns The saved session state, or null if none exists
 */
export function loadSessionBackup(): SessionState | null {
  return loadFromStorage<SessionState | null>(KEYS.session, null);
}

/**
 * Clear the session backup (call after session completes).
 */
export function clearSessionBackup(): void {
  removeFromStorage(KEYS.session);
}

// ─── Calibration ────────────────────────────────────────────────

/**
 * Save calibration state.
 */
export function saveCalibrationState(state: CalibrationState): void {
  saveToStorage(KEYS.calibration, state);
}

/**
 * Load calibration state.
 *
 * @returns Saved calibration state, or null if none exists
 */
export function loadCalibrationState(): CalibrationState | null {
  return loadFromStorage<CalibrationState | null>(KEYS.calibration, null);
}

// ─── Bulk Operations ────────────────────────────────────────────

/**
 * Clear all SRS data from localStorage.
 * Use with caution — this is irreversible.
 */
export function clearAllSrsData(): void {
  for (const key of Object.values(KEYS)) {
    removeFromStorage(key);
  }
}

/**
 * Export all SRS data as a single JSON-serializable object.
 * Useful for backup/export functionality.
 */
export function exportAllData(): SrsExport {
  return {
    version: 1,
    exportedAt: Date.now(),
    deck: loadDeckState(),
    history: loadReviewHistory(),
    calibration: loadCalibrationState(),
  };
}

/**
 * Import SRS data from an export object.
 * Replaces all existing data.
 */
export function importAllData(data: SrsExport): void {
  if (data.version !== 1) {
    throw new Error(`Unsupported export version: ${data.version}`);
  }

  saveDeckState(data.deck);
  saveToStorage(KEYS.history, data.history);
  if (data.calibration) {
    saveCalibrationState(data.calibration);
  }
  clearSessionBackup();
}

// ─── Export Type ─────────────────────────────────────────────────

export interface SrsExport {
  version: number;
  exportedAt: number;
  deck: SrsItem[];
  history: ReviewLog[];
  calibration: CalibrationState | null;
}

// ─── Internal Helpers ───────────────────────────────────────────

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[SRS Storage] Failed to load ${key}:`, error);
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn(`[SRS Storage] Quota exceeded for ${key}. Consider clearing old data.`);
    } else {
      console.warn(`[SRS Storage] Failed to save ${key}:`, error);
    }
  }
}

function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[SRS Storage] Failed to remove ${key}:`, error);
  }
}
