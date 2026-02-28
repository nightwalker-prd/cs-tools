import { useState, useEffect } from 'react';
import type { QuestionPool } from '../types';
import { buildQuestionPool } from '../data/question-pool';

interface UseQuestionPoolResult {
  pool: QuestionPool | null;
  loading: boolean;
  error: string | null;
}

export function useQuestionPool(): UseQuestionPoolResult {
  const [pool, setPool] = useState<QuestionPool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    buildQuestionPool()
      .then(result => {
        if (!cancelled) {
          setPool(result);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load question pool');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  return { pool, loading, error };
}
