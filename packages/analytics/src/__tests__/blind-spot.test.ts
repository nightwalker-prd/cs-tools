import { describe, it, expect } from 'vitest';
import { analyzeBlindSpots } from '../services/blind-spot';
import { recordError } from '../services/error-recorder';
import type { ErrorStore } from '../types/errors';

function emptyStore(): ErrorStore {
  return { entries: [], wordAggregates: {} };
}

describe('analyzeBlindSpots', () => {
  it('returns empty spots for empty store', () => {
    const result = analyzeBlindSpots(emptyStore(), 5, Date.now());
    expect(result.spots).toHaveLength(0);
    expect(result.totalErrorsAnalyzed).toBe(0);
  });

  it('ranks by score (frequency * severity multiplier)', () => {
    let store = emptyStore();
    const now = Date.now();

    // 10 errors for word1/case-ending => severe (10 * 3 = 30)
    for (let i = 0; i < 10; i++) {
      store = recordError(store, {
        wordId: 'word1',
        category: 'case-ending',
        expected: 'a',
        actual: 'b',
        sourceApp: 'app1',
      }, now);
    }

    // 5 errors for word2/grammar-error => moderate (5 * 2 = 10)
    for (let i = 0; i < 5; i++) {
      store = recordError(store, {
        wordId: 'word2',
        category: 'grammar-error',
        expected: 'c',
        actual: 'd',
        sourceApp: 'app1',
      }, now);
    }

    // 3 errors for word3/verb-conjugation => mild (3 * 1 = 3)
    for (let i = 0; i < 3; i++) {
      store = recordError(store, {
        wordId: 'word3',
        category: 'verb-conjugation',
        expected: 'e',
        actual: 'f',
        sourceApp: 'app1',
      }, now);
    }

    const result = analyzeBlindSpots(store, 5, now);
    expect(result.spots).toHaveLength(3);
    expect(result.spots[0].score).toBe(30); // severe
    expect(result.spots[1].score).toBe(10); // moderate
    expect(result.spots[2].score).toBe(3);  // mild
  });

  it('limits results to topN', () => {
    let store = emptyStore();
    const now = Date.now();

    // Create 5 different word/category combos
    const categories = ['case-ending', 'grammar-error', 'verb-conjugation', 'gender-agreement', 'word-order'] as const;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < (5 - i); j++) {
        store = recordError(store, {
          wordId: `word${i}`,
          category: categories[i],
          expected: 'a',
          actual: 'b',
          sourceApp: 'app1',
        }, now);
      }
    }

    const result = analyzeBlindSpots(store, 3, now);
    expect(result.spots).toHaveLength(3);
  });

  it('includes advice for each category', () => {
    let store = emptyStore();
    const now = Date.now();

    store = recordError(store, {
      wordId: 'w1',
      category: 'case-ending',
      expected: 'a',
      actual: 'b',
      sourceApp: 'app1',
    }, now);

    store = recordError(store, {
      wordId: 'w2',
      category: 'vocabulary-confusion',
      expected: 'c',
      actual: 'd',
      sourceApp: 'app1',
    }, now);

    const result = analyzeBlindSpots(store, 5, now);
    const caseEndingSpot = result.spots.find(s => s.category === 'case-ending');
    const vocabSpot = result.spots.find(s => s.category === 'vocabulary-confusion');

    expect(caseEndingSpot?.advice).toContain('i\'raab');
    expect(vocabSpot?.advice).toContain('word pairs');
  });

  it('includes recent examples', () => {
    let store = emptyStore();
    const now = Date.now();

    for (let i = 0; i < 5; i++) {
      store = recordError(store, {
        wordId: 'w1',
        category: 'case-ending',
        expected: `expected${i}`,
        actual: `actual${i}`,
        sourceApp: 'app1',
      }, now + i);
    }

    const result = analyzeBlindSpots(store, 5, now + 10);
    // Should have at most 3 recent examples
    expect(result.spots[0].recentExamples.length).toBeLessThanOrEqual(3);
  });

  it('sets analyzedAt and totalErrorsAnalyzed', () => {
    let store = emptyStore();
    const now = 1234567890;

    store = recordError(store, {
      wordId: 'w1',
      category: 'case-ending',
      expected: 'a',
      actual: 'b',
      sourceApp: 'app1',
    }, now);

    const result = analyzeBlindSpots(store, 5, now);
    expect(result.analyzedAt).toBe(now);
    expect(result.totalErrorsAnalyzed).toBe(1);
  });
});
