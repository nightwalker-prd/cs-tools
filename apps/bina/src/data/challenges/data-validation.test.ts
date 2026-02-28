import { describe, it, expect } from 'vitest';
import { allChallenges, getChallengeById, getChallengesByCategory, getChallengesByDifficulty } from './index';
import { runTests } from '../../engine/test-runner';

describe('challenge data integrity', () => {
  it('has 50 total challenges', () => {
    expect(allChallenges.length).toBe(50);
  });

  it('all challenge IDs are unique', () => {
    const ids = allChallenges.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all challenge numbers are unique and sequential', () => {
    const numbers = allChallenges.map(c => c.number);
    expect(new Set(numbers).size).toBe(numbers.length);
    for (let i = 0; i < numbers.length; i++) {
      expect(numbers[i]).toBe(i + 1);
    }
  });

  it('every challenge has at least 1 test', () => {
    for (const c of allChallenges) {
      expect(c.tests.length, `${c.id} has no tests`).toBeGreaterThan(0);
    }
  });

  it('every challenge has at least 1 solution', () => {
    for (const c of allChallenges) {
      expect(c.solutions.length, `${c.id} has no solutions`).toBeGreaterThan(0);
    }
  });

  it('every challenge has at least 1 hint', () => {
    for (const c of allChallenges) {
      expect(c.hints.length, `${c.id} has no hints`).toBeGreaterThan(0);
    }
  });

  it('all test IDs within a challenge are unique', () => {
    for (const c of allChallenges) {
      const testIds = c.tests.map(t => t.id);
      expect(new Set(testIds).size, `${c.id} has duplicate test IDs`).toBe(testIds.length);
    }
  });

  it('difficulty distribution is correct', () => {
    const easy = getChallengesByDifficulty('easy');
    const medium = getChallengesByDifficulty('medium');
    const hard = getChallengesByDifficulty('hard');
    expect(easy.length).toBe(16);
    expect(medium.length).toBe(22);
    expect(hard.length).toBe(12);
  });

  it('getChallengeById returns correct challenge', () => {
    const c = getChallengeById('nom-001');
    expect(c).toBeDefined();
    expect(c!.title).toBe('Basic Nominal Sentence');
  });

  it('getChallengeById returns undefined for unknown id', () => {
    expect(getChallengeById('xyz-999')).toBeUndefined();
  });

  it('getChallengesByCategory returns challenges', () => {
    const nominal = getChallengesByCategory('nominal');
    expect(nominal.length).toBeGreaterThan(0);
    for (const c of nominal) {
      expect(c.category).toBe('nominal');
    }
  });
});

describe('solution validation — all solutions pass their own tests', () => {
  for (const challenge of allChallenges) {
    describe(`${challenge.id}: ${challenge.title}`, () => {
      for (const solution of challenge.solutions) {
        it(`solution "${solution}" passes all tests`, () => {
          const result = runTests(challenge.tests, solution);
          const failedTests = result.results.filter(r => !r.passed);
          if (failedTests.length > 0) {
            const failures = failedTests.map(f => `  - ${f.name}: ${f.message}`).join('\n');
            expect.fail(
              `Solution "${solution}" fails ${failedTests.length} test(s):\n${failures}`
            );
          }
          expect(result.status).toBe('passed');
        });
      }
    });
  }
});
