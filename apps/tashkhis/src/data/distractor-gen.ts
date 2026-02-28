import { shuffle } from '@arabtools/core';

/**
 * Pick N random distractors from a pool, excluding the correct answer.
 * Returns exactly `count` items (or fewer if pool is too small).
 */
export function pickDistractors(
  pool: string[],
  correct: string,
  count: number = 3,
): string[] {
  const candidates = pool.filter(item => item !== correct);
  const shuffled = shuffle([...candidates]);
  return shuffled.slice(0, count);
}

/**
 * Build a 4-option MC question: correct answer + 3 distractors, shuffled.
 * Returns { options, correctIndex }.
 */
export function buildOptions(
  correct: string,
  distractors: string[],
): { options: string[]; correctIndex: number } {
  const allOptions = [correct, ...distractors.slice(0, 3)];
  const shuffled = shuffle([...allOptions]);
  const correctIndex = shuffled.indexOf(correct);
  return { options: shuffled, correctIndex };
}
