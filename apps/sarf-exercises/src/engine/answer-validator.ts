/**
 * Validates user answers with diacritics-tolerant comparison.
 */

import { removeDiacritics, normalizeArabic } from '@arabtools/core';
import type { AnswerResult, ExerciseType } from '../types';

/**
 * Validate a user's answer against the correct answer.
 */
export function validateAnswer(
  userAnswer: string,
  correctAnswer: string,
  exerciseType: ExerciseType,
  timeMs: number,
  isEnglish: boolean = false,
): AnswerResult {
  const trimmedUser = userAnswer.trim();
  const trimmedCorrect = correctAnswer.trim();

  if (!trimmedUser) {
    return { isCorrect: false, matchLevel: 'wrong', userAnswer: trimmedUser, correctAnswer: trimmedCorrect, timeMs };
  }

  if (isEnglish || exerciseType === 'translation') {
    return validateEnglishAnswer(trimmedUser, trimmedCorrect, timeMs, exerciseType);
  }

  return validateArabicAnswer(trimmedUser, trimmedCorrect, timeMs);
}

/**
 * Arabic answer validation:
 * - Exact match = perfect
 * - Match without diacritics = acceptable (normalized level)
 * - Full normalization (alef variants, taa marbuta) = acceptable
 */
function validateArabicAnswer(
  userAnswer: string,
  correctAnswer: string,
  timeMs: number,
): AnswerResult {
  // Exact match
  if (userAnswer === correctAnswer) {
    return { isCorrect: true, matchLevel: 'exact', userAnswer, correctAnswer, timeMs };
  }

  // Match without diacritics
  const userNoDiacritics = removeDiacritics(userAnswer);
  const correctNoDiacritics = removeDiacritics(correctAnswer);
  if (userNoDiacritics === correctNoDiacritics) {
    return { isCorrect: true, matchLevel: 'normalized', userAnswer, correctAnswer, timeMs };
  }

  // Full normalization
  const userNormalized = normalizeArabic(userAnswer);
  const correctNormalized = normalizeArabic(correctAnswer);
  if (userNormalized === correctNormalized) {
    return { isCorrect: true, matchLevel: 'normalized', userAnswer, correctAnswer, timeMs };
  }

  return { isCorrect: false, matchLevel: 'wrong', userAnswer, correctAnswer, timeMs };
}

/**
 * English answer validation:
 * - Case-insensitive
 * - "to X" prefix optional
 * - Comma-separated meanings accepted (any match counts)
 */
function validateEnglishAnswer(
  userAnswer: string,
  correctAnswer: string,
  timeMs: number,
  exerciseType: ExerciseType,
): AnswerResult {
  // If this is a translation exercise with AR→EN, the answer is English
  // If it's EN→AR, the correct answer is Arabic, so use Arabic validation
  if (exerciseType === 'translation') {
    // Check if correct answer looks Arabic
    if (/[\u0600-\u06FF]/.test(correctAnswer)) {
      return validateArabicAnswer(userAnswer, correctAnswer, timeMs);
    }
  }

  const normalizeEn = (s: string) => s.toLowerCase().replace(/^to\s+/, '').trim();

  const userNorm = normalizeEn(userAnswer);
  const correctNorm = normalizeEn(correctAnswer);

  // Direct match
  if (userNorm === correctNorm) {
    return { isCorrect: true, matchLevel: 'exact', userAnswer, correctAnswer, timeMs };
  }

  // Check if correct answer has comma-separated meanings
  const correctMeanings = correctAnswer.split(/[,;]/).map(s => normalizeEn(s));
  if (correctMeanings.some(m => m === userNorm)) {
    return { isCorrect: true, matchLevel: 'exact', userAnswer, correctAnswer, timeMs };
  }

  // Check if user provided any of the comma-separated meanings
  const userMeanings = userAnswer.split(/[,;]/).map(s => normalizeEn(s));
  if (userMeanings.some(um => correctMeanings.some(cm => cm === um))) {
    return { isCorrect: true, matchLevel: 'normalized', userAnswer, correctAnswer, timeMs };
  }

  return { isCorrect: false, matchLevel: 'wrong', userAnswer, correctAnswer, timeMs };
}
