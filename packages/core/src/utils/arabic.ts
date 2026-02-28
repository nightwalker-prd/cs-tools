/**
 * Arabic Text Utilities
 *
 * Common operations for handling Arabic text including diacritics,
 * normalization, and text processing.
 */

/**
 * Arabic diacritical marks (tashkeel/harakat) Unicode ranges.
 * Includes: fatha, kasra, damma, sukun, shadda, tanween,
 * Quranic annotation marks, superscript alef, and tatweel.
 */
const DIACRITICS_REGEX = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED]/g;

/**
 * Removes diacritical marks (tashkeel) from Arabic text.
 *
 * @param text - Arabic text with diacritics
 * @returns Text without diacritics
 *
 * @example
 * removeDiacritics('الْكِتَابُ'); // 'الكتاب'
 */
export function removeDiacritics(text: string): string {
  return text.replace(DIACRITICS_REGEX, '');
}

/**
 * Checks if a string contains Arabic characters.
 *
 * @param text - Text to check
 * @returns True if text contains Arabic characters
 */
export function containsArabic(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

/**
 * Checks if a string is primarily Arabic (>50% Arabic characters).
 *
 * @param text - Text to check
 * @returns True if text is primarily Arabic
 */
export function isPrimarilyArabic(text: string): boolean {
  const arabicChars = (text.match(/[\u0600-\u06FF]/g) || []).length;
  const totalChars = text.replace(/\s/g, '').length;
  return totalChars > 0 && arabicChars / totalChars > 0.5;
}

/**
 * Normalizes Arabic text by:
 * - Removing diacritics
 * - Normalizing alef variants to bare alef
 * - Normalizing taa marbuta to haa
 * - Normalizing yaa variants
 *
 * Useful for search and comparison.
 *
 * @param text - Arabic text to normalize
 * @returns Normalized text
 *
 * @example
 * normalizeArabic('إِبْرَاهِيمَ'); // 'ابراهيم'
 */
export function normalizeArabic(text: string): string {
  return text
    .replace(DIACRITICS_REGEX, '') // Remove diacritics
    .replace(/[إأآٱ]/g, 'ا') // Normalize alef variants
    .replace(/ة/g, 'ه') // Taa marbuta to haa
    .replace(/ى/g, 'ي') // Alef maqsura to yaa
    .replace(/ؤ/g, 'و') // Waw with hamza to waw
    .replace(/ئ/g, 'ي'); // Yaa with hamza to yaa
}

/**
 * Extracts the root letters from an Arabic word.
 * This is a simplified extraction - for accurate roots, use a proper morphological analyzer.
 *
 * @param word - Arabic word
 * @returns Likely root letters
 */
export function extractRootLetters(word: string): string {
  // Remove common prefixes and suffixes
  let root = removeDiacritics(word);

  // Remove definite article
  root = root.replace(/^ال/, '');

  // Remove common prefixes
  root = root.replace(/^[وفبكل]/, '');

  // Remove common suffixes
  root = root.replace(/[ةون]$/, '');
  root = root.replace(/ات$/, '');
  root = root.replace(/ين$/, '');

  return root;
}

/**
 * Counts words in Arabic text.
 * Handles Arabic text properly by splitting on whitespace.
 *
 * @param text - Arabic text
 * @returns Word count
 */
export function countArabicWords(text: string): number {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

/**
 * Splits Arabic text into individual words.
 *
 * @param text - Arabic text
 * @returns Array of words
 */
export function splitArabicWords(text: string): string[] {
  if (!text.trim()) return [];
  return text.trim().split(/\s+/);
}

/**
 * Gets the direction for text based on content.
 * Returns 'rtl' for Arabic, 'ltr' for other text.
 *
 * @param text - Text to analyze
 * @returns 'rtl' or 'ltr'
 */
export function getTextDirection(text: string): 'rtl' | 'ltr' {
  return isPrimarilyArabic(text) ? 'rtl' : 'ltr';
}

/**
 * Arabic letter categories for sun/moon letter classification.
 */
export const ARABIC_LETTERS = {
  sun: ['ت', 'ث', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ل', 'ن'],
  moon: ['ا', 'ب', 'ج', 'ح', 'خ', 'ع', 'غ', 'ف', 'ق', 'ك', 'م', 'ه', 'و', 'ي'],
} as const;

/**
 * Checks if an Arabic letter is a sun letter (الحروف الشمسية).
 *
 * @param letter - Single Arabic letter
 * @returns True if sun letter
 */
export function isSunLetter(letter: string): boolean {
  return ARABIC_LETTERS.sun.includes(letter as typeof ARABIC_LETTERS.sun[number]);
}

/**
 * Checks if an Arabic letter is a moon letter (الحروف القمرية).
 *
 * @param letter - Single Arabic letter
 * @returns True if moon letter
 */
export function isMoonLetter(letter: string): boolean {
  return ARABIC_LETTERS.moon.includes(letter as typeof ARABIC_LETTERS.moon[number]);
}
