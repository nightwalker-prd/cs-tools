import type { WordFamily } from '@arabtools/data';
import { shuffle, pickRandomN } from '@arabtools/core';
import { removeDiacritics } from '@arabtools/core';

/**
 * Generate distractor meanings for multiple choice questions.
 * Avoids same-root words to prevent confusion.
 */
export function generateDistractors(
  word: WordFamily,
  allWords: WordFamily[],
  count = 3,
): string[] {
  // Filter out same-root words and the word itself
  const candidates = allWords.filter(
    w => w.id !== word.id && w.root !== word.root,
  );

  const picked = pickRandomN(candidates, count);
  return picked.map(w => w.meanings[0]);
}

/**
 * Shuffle correct answer with distractors for MC options.
 */
export function shuffleOptions(
  correct: string,
  distractors: string[],
): { text: string; isCorrect: boolean }[] {
  const options = [
    { text: correct, isCorrect: true },
    ...distractors.map(d => ({ text: d, isCorrect: false })),
  ];
  return shuffle(options);
}

/**
 * Fuzzy match user input against expected meanings.
 * Returns: 'exact' | 'close' | 'none'
 */
export function fuzzyMatch(
  input: string,
  expectedMeanings: string[],
): 'exact' | 'close' | 'none' {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return 'none';

  for (const meaning of expectedMeanings) {
    const expected = meaning.trim().toLowerCase();

    // Exact match
    if (normalized === expected) return 'exact';

    // Check if input matches start of meaning (e.g., "to write" matches "to write, to compose")
    if (expected.startsWith(normalized) && normalized.length >= expected.length * 0.6) {
      return 'exact';
    }

    // Check if meaning contains the input as a whole word
    if (expected.includes(normalized) && normalized.length >= 3) {
      return 'close';
    }
  }

  // Levenshtein distance check for close matches
  for (const meaning of expectedMeanings) {
    const expected = meaning.trim().toLowerCase();
    const distance = levenshteinDistance(normalized, expected);
    const maxLen = Math.max(normalized.length, expected.length);

    if (maxLen > 0 && distance / maxLen <= 0.3) {
      return 'close';
    }
  }

  return 'none';
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1,
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Determine question type based on item reps.
 */
export function getQuestionType(reps: number): 'flashcard' | 'multiple-choice' | 'type-answer' {
  if (reps <= 2) return 'flashcard';
  if (reps <= 5) return 'multiple-choice';
  return 'type-answer';
}

/**
 * Strip "to " prefix from verb meanings for cleaner display.
 */
export function formatMeaning(meaning: string): string {
  return meaning;
}

/**
 * Format root letters with spaces for display: "ك ت ب"
 * The data already has this format, but ensure consistency.
 */
export function formatRoot(root: string): string {
  // If already spaced, return as-is
  if (root.includes(' ')) return root;
  // Otherwise add spaces between characters
  return removeDiacritics(root).split('').filter(c => c.trim()).join(' ');
}
