import type { ErrorCategory, ErrorEntry, ErrorStore, WordErrorRecord } from '../types/errors';

const MAX_ENTRIES = 2000;

function generateId(now: number): string {
  return Math.random().toString(36).slice(2) + now.toString(36);
}

/**
 * Record a new error entry into the store.
 * Generates an ID, updates word aggregates, and trims to max entries.
 */
export function recordError(
  store: ErrorStore,
  entry: Omit<ErrorEntry, 'id' | 'timestamp'>,
  now: number,
): ErrorStore {
  const newEntry: ErrorEntry = {
    ...entry,
    id: generateId(now),
    timestamp: now,
  };

  // Append and trim to max size (keep most recent)
  const entries = [...store.entries, newEntry];
  const trimmedEntries = entries.length > MAX_ENTRIES
    ? entries.slice(-MAX_ENTRIES)
    : entries;

  // Update word aggregate
  const existing = store.wordAggregates[entry.wordId];
  const categoryCount = existing?.categories[entry.category] ?? 0;

  const updatedAggregate: WordErrorRecord = {
    wordId: entry.wordId,
    totalErrors: (existing?.totalErrors ?? 0) + 1,
    categories: {
      ...existing?.categories,
      [entry.category]: categoryCount + 1,
    },
    lastErrorAt: now,
    firstErrorAt: existing?.firstErrorAt ?? now,
  };

  return {
    entries: trimmedEntries,
    wordAggregates: {
      ...store.wordAggregates,
      [entry.wordId]: updatedAggregate,
    },
  };
}

/**
 * Get the error record for a specific word.
 */
export function getWordErrors(store: ErrorStore, wordId: string): WordErrorRecord | null {
  return store.wordAggregates[wordId] ?? null;
}

/**
 * Get all error entries within a time range.
 */
export function getErrorsInRange(store: ErrorStore, startMs: number, endMs: number): ErrorEntry[] {
  return store.entries.filter(e => e.timestamp >= startMs && e.timestamp <= endMs);
}

/**
 * Get total error counts grouped by category.
 */
export function getErrorsByCategory(store: ErrorStore): Record<ErrorCategory, number> {
  const counts: Record<ErrorCategory, number> = {
    'off-by-one': 0,
    'wrong-complexity': 0,
    'incorrect-base-case': 0,
    'missing-edge-case': 0,
    'wrong-data-structure': 0,
    'logic-error': 0,
    'syntax-error': 0,
    'wrong-algorithm': 0,
  };

  for (const entry of store.entries) {
    counts[entry.category]++;
  }

  return counts;
}
