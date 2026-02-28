import { shuffleWithSeed } from '@arabtools/core';
import type { Proverb } from '../types';

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getDailyProverb(proverbs: Proverb[]): Proverb {
  if (proverbs.length === 0) {
    throw new Error('No proverbs available');
  }

  const year = new Date().getFullYear();
  const seed = year * 1000 + 42; // Year-based seed for consistent yearly shuffle
  const shuffled = shuffleWithSeed(proverbs, seed);
  const dayIndex = getDayOfYear() % shuffled.length;
  return shuffled[dayIndex];
}
