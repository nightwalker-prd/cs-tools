import { useMemo } from 'react';
import { getDailyProverb } from '../engine/daily-rotation';
import { ALL_PROVERBS } from '../data/proverbs';

export function useDailyProverb() {
  const proverb = useMemo(() => getDailyProverb(ALL_PROVERBS), []);
  return proverb;
}
