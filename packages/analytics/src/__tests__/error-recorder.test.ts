import { describe, it, expect } from 'vitest';
import { recordError, getWordErrors, getErrorsInRange, getErrorsByCategory } from '../services/error-recorder';
import type { ErrorStore } from '../types/errors';

function emptyStore(): ErrorStore {
  return { entries: [], wordAggregates: {} };
}

describe('recordError', () => {
  it('adds an entry with generated id and timestamp', () => {
    const store = emptyStore();
    const result = recordError(store, {
      wordId: 'w1',
      category: 'off-by-one',
      expected: 'i < n',
      actual: 'i <= n',
      sourceApp: 'dsa-drills',
    }, 1000);

    expect(result.entries).toHaveLength(1);
    expect(result.entries[0].id).toBeTruthy();
    expect(result.entries[0].timestamp).toBe(1000);
    expect(result.entries[0].wordId).toBe('w1');
    expect(result.entries[0].category).toBe('off-by-one');
  });

  it('updates word aggregate on first error', () => {
    const store = emptyStore();
    const result = recordError(store, {
      wordId: 'w1',
      category: 'off-by-one',
      expected: 'i < n',
      actual: 'i <= n',
      sourceApp: 'dsa-drills',
    }, 1000);

    const agg = result.wordAggregates['w1'];
    expect(agg).toBeDefined();
    expect(agg.totalErrors).toBe(1);
    expect(agg.categories['off-by-one']).toBe(1);
    expect(agg.firstErrorAt).toBe(1000);
    expect(agg.lastErrorAt).toBe(1000);
  });

  it('accumulates word aggregate across multiple errors', () => {
    let store = emptyStore();
    store = recordError(store, {
      wordId: 'w1',
      category: 'off-by-one',
      expected: 'a',
      actual: 'b',
      sourceApp: 'app1',
    }, 1000);
    store = recordError(store, {
      wordId: 'w1',
      category: 'missing-edge-case',
      expected: 'c',
      actual: 'd',
      sourceApp: 'app1',
    }, 2000);
    store = recordError(store, {
      wordId: 'w1',
      category: 'off-by-one',
      expected: 'e',
      actual: 'f',
      sourceApp: 'app1',
    }, 3000);

    const agg = store.wordAggregates['w1'];
    expect(agg.totalErrors).toBe(3);
    expect(agg.categories['off-by-one']).toBe(2);
    expect(agg.categories['missing-edge-case']).toBe(1);
    expect(agg.firstErrorAt).toBe(1000);
    expect(agg.lastErrorAt).toBe(3000);
  });

  it('trims entries to 2000 max', () => {
    let store = emptyStore();
    // Add 2001 entries
    for (let i = 0; i < 2001; i++) {
      store = recordError(store, {
        wordId: `w${i}`,
        category: 'logic-error',
        expected: 'a',
        actual: 'b',
        sourceApp: 'app1',
      }, i);
    }

    expect(store.entries).toHaveLength(2000);
    // First entry should have been trimmed (timestamp 0)
    expect(store.entries[0].timestamp).toBe(1);
  });
});

describe('getWordErrors', () => {
  it('returns null for unknown word', () => {
    expect(getWordErrors(emptyStore(), 'unknown')).toBeNull();
  });

  it('returns the aggregate for a known word', () => {
    let store = emptyStore();
    store = recordError(store, {
      wordId: 'w1',
      category: 'off-by-one',
      expected: 'a',
      actual: 'b',
      sourceApp: 'app1',
    }, 1000);

    const result = getWordErrors(store, 'w1');
    expect(result).not.toBeNull();
    expect(result!.totalErrors).toBe(1);
  });
});

describe('getErrorsInRange', () => {
  it('filters entries by time range', () => {
    let store = emptyStore();
    store = recordError(store, { wordId: 'w1', category: 'logic-error', expected: 'a', actual: 'b', sourceApp: 'app1' }, 100);
    store = recordError(store, { wordId: 'w2', category: 'logic-error', expected: 'a', actual: 'b', sourceApp: 'app1' }, 200);
    store = recordError(store, { wordId: 'w3', category: 'logic-error', expected: 'a', actual: 'b', sourceApp: 'app1' }, 300);

    const result = getErrorsInRange(store, 150, 250);
    expect(result).toHaveLength(1);
    expect(result[0].wordId).toBe('w2');
  });

  it('returns empty for range with no entries', () => {
    const store = emptyStore();
    expect(getErrorsInRange(store, 0, 1000)).toHaveLength(0);
  });
});

describe('getErrorsByCategory', () => {
  it('returns counts for all categories', () => {
    let store = emptyStore();
    store = recordError(store, { wordId: 'w1', category: 'off-by-one', expected: 'a', actual: 'b', sourceApp: 'app1' }, 100);
    store = recordError(store, { wordId: 'w2', category: 'off-by-one', expected: 'a', actual: 'b', sourceApp: 'app1' }, 200);
    store = recordError(store, { wordId: 'w3', category: 'wrong-algorithm', expected: 'a', actual: 'b', sourceApp: 'app1' }, 300);

    const result = getErrorsByCategory(store);
    expect(result['off-by-one']).toBe(2);
    expect(result['wrong-algorithm']).toBe(1);
    expect(result['wrong-complexity']).toBe(0);
    expect(result['logic-error']).toBe(0);
    expect(result['missing-edge-case']).toBe(0);
    expect(result['syntax-error']).toBe(0);
    expect(result['incorrect-base-case']).toBe(0);
    expect(result['wrong-data-structure']).toBe(0);
  });
});
