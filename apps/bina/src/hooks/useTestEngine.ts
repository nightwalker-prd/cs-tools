import { useState, useCallback } from 'react';
import type { ChallengeTest, TestRunResult } from '../types';
import { runTests } from '../engine/test-runner';

const IDLE_RESULT: TestRunResult = {
  status: 'idle',
  results: [],
  passCount: 0,
  failCount: 0,
  totalCount: 0,
};

export function useTestEngine(tests: ChallengeTest[]) {
  const [result, setResult] = useState<TestRunResult>(IDLE_RESULT);

  const run = useCallback((input: string) => {
    setResult({ ...IDLE_RESULT, status: 'running' });

    // Small delay for visual feedback
    setTimeout(() => {
      const res = runTests(tests, input);
      setResult(res);
    }, 150);
  }, [tests]);

  const reset = useCallback(() => {
    setResult(IDLE_RESULT);
  }, []);

  return { result, run, reset };
}
