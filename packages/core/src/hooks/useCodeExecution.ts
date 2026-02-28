import { useState, useCallback } from 'react';

export interface ExecutionResult {
  output: string[];
  error?: string;
  duration: number;
}

export function useCodeExecution() {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);

  const execute = useCallback(async (code: string) => {
    setIsRunning(true);
    setResult(null);

    const start = performance.now();
    const output: string[] = [];
    let error: string | undefined;

    try {
      // Capture console.log output
      const originalLog = console.log;
      console.log = (...args: unknown[]) => {
        output.push(args.map(a => String(a)).join(' '));
      };

      // Create a sandboxed function
      const fn = new Function(code);
      fn();

      console.log = originalLog;
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    }

    const duration = performance.now() - start;
    const executionResult: ExecutionResult = { output, error, duration };
    setResult(executionResult);
    setIsRunning(false);

    return executionResult;
  }, []);

  const clear = useCallback(() => {
    setResult(null);
  }, []);

  return { execute, isRunning, result, clear };
}
