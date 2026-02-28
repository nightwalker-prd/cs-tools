import type { ChallengeTest, TestRunResult, TestResult } from '../types';
import { runValidator } from './validators';

export function runTests(tests: ChallengeTest[], input: string): TestRunResult {
  if (!input.trim()) {
    return {
      status: 'idle',
      results: tests.map(t => ({
        testId: t.id,
        name: t.name,
        passed: false,
        message: 'No input provided',
      })),
      passCount: 0,
      failCount: tests.length,
      totalCount: tests.length,
    };
  }

  const results: TestResult[] = tests.map(test => runValidator(test, input));

  const passCount = results.filter(r => r.passed).length;
  const failCount = results.length - passCount;
  const status = failCount === 0 ? 'passed' : 'failed';

  return {
    status,
    results,
    passCount,
    failCount,
    totalCount: results.length,
  };
}
