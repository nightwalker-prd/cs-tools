/**
 * Fisher-Yates Shuffle Implementation
 *
 * IMPORTANT: This is the ONLY correct way to shuffle arrays in this codebase.
 * DO NOT use .sort(() => Math.random() - 0.5) - it produces biased results.
 *
 * @see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * Returns a new array - does not mutate the original.
 *
 * @param array - The array to shuffle
 * @returns A new shuffled array
 *
 * @example
 * const cards = ['A', 'B', 'C', 'D'];
 * const shuffled = shuffle(cards);
 * // cards is unchanged, shuffled is a new randomized array
 */
export function shuffle<T>(array: readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * Mutates the original array.
 *
 * @param array - The array to shuffle in place
 * @returns The same array, now shuffled
 *
 * @example
 * const cards = ['A', 'B', 'C', 'D'];
 * shuffleInPlace(cards);
 * // cards is now shuffled
 */
export function shuffleInPlace<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Returns a random element from an array.
 *
 * @param array - The array to pick from
 * @returns A random element, or undefined if array is empty
 *
 * @example
 * const colors = ['red', 'green', 'blue'];
 * const randomColor = pickRandom(colors); // e.g., 'green'
 */
export function pickRandom<T>(array: readonly T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Returns n random elements from an array without replacement.
 * Uses partial Fisher-Yates for efficiency when n << array.length.
 *
 * @param array - The array to pick from
 * @param n - Number of elements to pick
 * @returns Array of n random elements
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const picked = pickRandomN(numbers, 3); // e.g., [4, 7, 2]
 */
export function pickRandomN<T>(array: readonly T[], n: number): T[] {
  if (n >= array.length) return shuffle(array);
  if (n <= 0) return [];

  const result: T[] = [];
  const copy = [...array];

  for (let i = 0; i < n; i++) {
    const j = Math.floor(Math.random() * (copy.length - i)) + i;
    [copy[i], copy[j]] = [copy[j], copy[i]];
    result.push(copy[i]);
  }

  return result;
}

/**
 * Shuffles an array with a seed for reproducible results.
 * Useful for testing or when you need consistent "random" order.
 *
 * @param array - The array to shuffle
 * @param seed - A seed number for the random generator
 * @returns A new shuffled array
 *
 * @example
 * const items = ['a', 'b', 'c', 'd'];
 * const result1 = shuffleWithSeed(items, 12345);
 * const result2 = shuffleWithSeed(items, 12345);
 * // result1 and result2 are identical
 */
export function shuffleWithSeed<T>(array: readonly T[], seed: number): T[] {
  const result = [...array];

  // Simple seeded random number generator (Mulberry32)
  let state = seed;
  const random = () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
