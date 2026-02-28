import { describe, it, expect } from 'vitest';
import { shuffle, shuffleInPlace, pickRandom, pickRandomN, shuffleWithSeed } from './shuffle';

describe('shuffle', () => {
  it('returns array of same length', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(shuffle(arr)).toHaveLength(5);
  });

  it('contains same elements', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(shuffle(arr).sort()).toEqual([1, 2, 3, 4, 5]);
  });

  it('does not mutate original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const original = [...arr];
    shuffle(arr);
    expect(arr).toEqual(original);
  });

  it('handles empty array', () => {
    expect(shuffle([])).toEqual([]);
  });

  it('handles single element', () => {
    expect(shuffle([1])).toEqual([1]);
  });

  it('produces different orderings over many runs (not always same)', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results = new Set<string>();
    for (let i = 0; i < 50; i++) {
      results.add(JSON.stringify(shuffle(arr)));
    }
    // With 10 elements, getting the same order 50 times is astronomically unlikely
    expect(results.size).toBeGreaterThan(1);
  });

  it('accepts readonly arrays', () => {
    const arr = [1, 2, 3] as const;
    expect(shuffle(arr)).toHaveLength(3);
  });
});

describe('shuffleInPlace', () => {
  it('mutates the original array', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const ref = arr;
    shuffleInPlace(arr);
    expect(ref).toBe(arr); // same reference
  });

  it('returns the same array reference', () => {
    const arr = [1, 2, 3];
    expect(shuffleInPlace(arr)).toBe(arr);
  });

  it('contains same elements', () => {
    const arr = [1, 2, 3, 4, 5];
    shuffleInPlace(arr);
    expect(arr.sort()).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('pickRandom', () => {
  it('returns an element from the array', () => {
    const arr = [1, 2, 3];
    const result = pickRandom(arr);
    expect(arr).toContain(result);
  });

  it('returns undefined for empty array', () => {
    expect(pickRandom([])).toBeUndefined();
  });

  it('returns the only element for single-element array', () => {
    expect(pickRandom([42])).toBe(42);
  });
});

describe('pickRandomN', () => {
  it('returns n elements', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(pickRandomN(arr, 3)).toHaveLength(3);
  });

  it('returns all elements when n >= length', () => {
    const arr = [1, 2, 3];
    const result = pickRandomN(arr, 5);
    expect(result.sort()).toEqual([1, 2, 3]);
  });

  it('returns empty array when n <= 0', () => {
    expect(pickRandomN([1, 2, 3], 0)).toEqual([]);
    expect(pickRandomN([1, 2, 3], -1)).toEqual([]);
  });

  it('returns unique elements (no duplicates)', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (let i = 0; i < 20; i++) {
      const result = pickRandomN(arr, 5);
      const unique = new Set(result);
      expect(unique.size).toBe(result.length);
    }
  });

  it('all returned elements come from original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = pickRandomN(arr, 3);
    for (const item of result) {
      expect(arr).toContain(item);
    }
  });
});

describe('shuffleWithSeed', () => {
  it('produces same output for same seed', () => {
    const arr = [1, 2, 3, 4, 5];
    const result1 = shuffleWithSeed(arr, 12345);
    const result2 = shuffleWithSeed(arr, 12345);
    expect(result1).toEqual(result2);
  });

  it('produces different output for different seeds', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result1 = shuffleWithSeed(arr, 1);
    const result2 = shuffleWithSeed(arr, 2);
    expect(result1).not.toEqual(result2);
  });

  it('does not mutate original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const original = [...arr];
    shuffleWithSeed(arr, 42);
    expect(arr).toEqual(original);
  });

  it('contains same elements', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(shuffleWithSeed(arr, 42).sort()).toEqual([1, 2, 3, 4, 5]);
  });

  it('handles empty array', () => {
    expect(shuffleWithSeed([], 42)).toEqual([]);
  });
});
