import { normalizeArabic, removeDiacritics } from '@arabtools/core';

/**
 * Check if the user's answer matches the correct answer.
 *
 * Two modes:
 * - **lenient** (default): Normalizes both sides (removes diacritics, normalizes
 *   alef/taa marbuta/yaa variants) so students aren't penalized for missing tashkeel.
 * - **strict**: Only strips diacritics (preserves letter identity). Used when the
 *   derivative type distinction depends on a single diacritical mark -- e.g.
 *   ism fa'il مُفَعِّل vs ism maf'ul مُفَعَّل both become مفعل under full
 *   normalization, so we need the skeletal letters to differ. In practice, strict
 *   mode is needed for Forms II-X ism fa'il / ism maf'ul pairs.
 *
 * @param userInput - What the student typed
 * @param correctAnswer - The expected answer (with diacritics)
 * @param strict - When true, compare base letters without full normalization
 */
export function checkAnswer(userInput: string, correctAnswer: string, strict = false): boolean {
  const trimmedUser = userInput.trim();
  const trimmedCorrect = correctAnswer.trim();

  // Lenient: full normalization (strips diacritics + normalizes letter variants)
  if (!strict) {
    return normalizeArabic(trimmedUser) === normalizeArabic(trimmedCorrect);
  }

  // Strict: strip diacritics only (preserve letter identity like shadda position,
  // taa marbuta vs haa, alef variants, etc.)
  return removeDiacritics(trimmedUser) === removeDiacritics(trimmedCorrect);
}

/**
 * Determine whether a derivative type question requires strict comparison.
 * Ism fa'il and ism maf'ul for Forms II-X differ only by a single haraka
 * on the penultimate letter (kasra vs fatha). Without strict mode, they
 * become identical after diacritics are stripped.
 *
 * Form I is excluded because its ism fa'il (فَاعِل) and ism maf'ul (مَفْعُول)
 * have different skeletal letters.
 */
export function needsStrictComparison(
  questionType: 'masdar' | 'ism-fail' | 'ism-maful',
  verbForm: string,
): boolean {
  if (questionType === 'masdar') return false;
  if (verbForm === 'I') return false;
  return true;
}
