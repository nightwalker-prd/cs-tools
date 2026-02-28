import { describe, it, expect } from 'vitest';
import { runTests } from './test-runner';
import type { ChallengeTest } from '../types';

const sampleTests: ChallengeTest[] = [
  {
    id: 't1',
    name: 'Contains الكتاب',
    validator: 'containsWord',
    params: { word: 'الكتاب', ignoreHarakat: true },
  },
  {
    id: 't2',
    name: 'Word count 2',
    validator: 'wordCount',
    params: { min: 2, max: 3 },
  },
];

describe('test-runner', () => {
  it('returns idle status for empty input', () => {
    const result = runTests(sampleTests, '');
    expect(result.status).toBe('idle');
    expect(result.passCount).toBe(0);
    expect(result.failCount).toBe(2);
    expect(result.totalCount).toBe(2);
  });

  it('returns idle for whitespace-only input', () => {
    const result = runTests(sampleTests, '   ');
    expect(result.status).toBe('idle');
  });

  it('returns passed when all tests pass', () => {
    const result = runTests(sampleTests, 'الكتابُ جديدٌ');
    expect(result.status).toBe('passed');
    expect(result.passCount).toBe(2);
    expect(result.failCount).toBe(0);
  });

  it('returns failed when some tests fail', () => {
    const result = runTests(sampleTests, 'القلم');
    expect(result.status).toBe('failed');
    expect(result.passCount).toBe(0); // no الكتاب, and word count is 1 (fails min:2)
    expect(result.failCount).toBe(2);
  });

  it('returns partial results correctly', () => {
    // Has الكتاب but only 1 word — first test passes, second fails
    const result = runTests(sampleTests, 'الكتاب');
    expect(result.status).toBe('failed');
    expect(result.passCount).toBe(1);
    expect(result.failCount).toBe(1);
  });

  it('preserves test IDs and names in results', () => {
    const result = runTests(sampleTests, 'الكتابُ جديدٌ');
    expect(result.results[0].testId).toBe('t1');
    expect(result.results[0].name).toBe('Contains الكتاب');
    expect(result.results[1].testId).toBe('t2');
  });

  it('handles empty test array', () => {
    const result = runTests([], 'some input');
    expect(result.status).toBe('passed');
    expect(result.totalCount).toBe(0);
  });
});
