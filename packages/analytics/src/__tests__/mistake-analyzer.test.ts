import { describe, it, expect } from 'vitest';
import { analyzeMistakes } from '../services/mistake-analyzer';
import { recordError } from '../services/error-recorder';
import type { ErrorStore } from '../types/errors';

function emptyStore(): ErrorStore {
  return { entries: [], wordAggregates: {} };
}

const DAY_MS = 24 * 60 * 60 * 1000;

describe('analyzeMistakes', () => {
  it('returns empty array for empty store', () => {
    const result = analyzeMistakes(emptyStore(), Date.now());
    expect(result).toHaveLength(0);
  });

  it('classifies severity as mild for 3-4 errors', () => {
    let store = emptyStore();
    const now = Date.now();
    for (let i = 0; i < 3; i++) {
      store = recordError(store, {
        wordId: `w${i}`,
        category: 'case-ending',
        expected: 'a',
        actual: 'b',
        sourceApp: 'app1',
      }, now - i * 1000);
    }

    const result = analyzeMistakes(store, now);
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe('case-ending');
    expect(result[0].severity).toBe('mild');
    expect(result[0].frequency).toBe(3);
  });

  it('classifies severity as moderate for 5-9 errors', () => {
    let store = emptyStore();
    const now = Date.now();
    for (let i = 0; i < 7; i++) {
      store = recordError(store, {
        wordId: `w${i}`,
        category: 'verb-conjugation',
        expected: 'a',
        actual: 'b',
        sourceApp: 'app1',
      }, now - i * 1000);
    }

    const result = analyzeMistakes(store, now);
    expect(result[0].severity).toBe('moderate');
  });

  it('classifies severity as severe for 10+ errors', () => {
    let store = emptyStore();
    const now = Date.now();
    for (let i = 0; i < 12; i++) {
      store = recordError(store, {
        wordId: `w${i}`,
        category: 'grammar-error',
        expected: 'a',
        actual: 'b',
        sourceApp: 'app1',
      }, now - i * 1000);
    }

    const result = analyzeMistakes(store, now);
    expect(result[0].severity).toBe('severe');
  });

  it('detects worsening trend when >60% errors are in last 14 days', () => {
    let store = emptyStore();
    const now = Date.now();
    // 8 recent errors (within 14 days)
    for (let i = 0; i < 8; i++) {
      store = recordError(store, {
        wordId: `w${i}`,
        category: 'case-ending',
        expected: 'a',
        actual: 'b',
        sourceApp: 'app1',
      }, now - i * DAY_MS);
    }
    // 2 old errors (older than 14 days)
    for (let i = 0; i < 2; i++) {
      store = recordError(store, {
        wordId: `w${i + 8}`,
        category: 'case-ending',
        expected: 'a',
        actual: 'b',
        sourceApp: 'app1',
      }, now - (20 + i) * DAY_MS);
    }

    const result = analyzeMistakes(store, now);
    expect(result[0].trend).toBe('worsening');
  });

  it('detects improving trend when <30% errors are in last 14 days', () => {
    let store = emptyStore();
    const now = Date.now();
    // 2 recent errors
    for (let i = 0; i < 2; i++) {
      store = recordError(store, {
        wordId: `w${i}`,
        category: 'case-ending',
        expected: 'a',
        actual: 'b',
        sourceApp: 'app1',
      }, now - i * DAY_MS);
    }
    // 8 old errors
    for (let i = 0; i < 8; i++) {
      store = recordError(store, {
        wordId: `w${i + 2}`,
        category: 'case-ending',
        expected: 'a',
        actual: 'b',
        sourceApp: 'app1',
      }, now - (20 + i) * DAY_MS);
    }

    const result = analyzeMistakes(store, now);
    expect(result[0].trend).toBe('improving');
  });

  it('sorts patterns by frequency descending', () => {
    let store = emptyStore();
    const now = Date.now();
    // 3 case-ending errors
    for (let i = 0; i < 3; i++) {
      store = recordError(store, {
        wordId: `w${i}`,
        category: 'case-ending',
        expected: 'a',
        actual: 'b',
        sourceApp: 'app1',
      }, now);
    }
    // 5 grammar errors
    for (let i = 0; i < 5; i++) {
      store = recordError(store, {
        wordId: `w${i}`,
        category: 'grammar-error',
        expected: 'a',
        actual: 'b',
        sourceApp: 'app1',
      }, now);
    }

    const result = analyzeMistakes(store, now);
    expect(result[0].category).toBe('grammar-error');
    expect(result[0].frequency).toBe(5);
    expect(result[1].category).toBe('case-ending');
    expect(result[1].frequency).toBe(3);
  });
});
