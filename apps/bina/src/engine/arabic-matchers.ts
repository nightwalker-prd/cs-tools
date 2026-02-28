import { removeDiacritics, splitArabicWords, countArabicWords } from '@arabtools/core';
import type { DiacriticType } from '../types';

const DIACRITIC_MAP: Record<DiacriticType, string> = {
  'fatha': '\u064E',
  'kasra': '\u0650',
  'damma': '\u064F',
  'tanwin-fatha': '\u064B',
  'tanwin-kasra': '\u064D',
  'tanwin-damma': '\u064C',
  'shadda': '\u0651',
  'sukun': '\u0652',
};

export function containsText(input: string, target: string, ignoreHarakat = false): boolean {
  const a = ignoreHarakat ? removeDiacritics(input) : input;
  const b = ignoreHarakat ? removeDiacritics(target) : target;
  return a.includes(b);
}

export function notContainsText(input: string, target: string, ignoreHarakat = false): boolean {
  return !containsText(input, target, ignoreHarakat);
}

export function textStartsWith(input: string, target: string, ignoreHarakat = false): boolean {
  const a = ignoreHarakat ? removeDiacritics(input.trim()) : input.trim();
  const b = ignoreHarakat ? removeDiacritics(target) : target;
  return a.startsWith(b);
}

export function textEndsWith(input: string, target: string, ignoreHarakat = false): boolean {
  const a = ignoreHarakat ? removeDiacritics(input.trim()) : input.trim();
  const b = ignoreHarakat ? removeDiacritics(target) : target;
  return a.endsWith(b);
}

export function checkWordCount(input: string, min?: number, max?: number): boolean {
  const count = countArabicWords(input);
  if (min !== undefined && count < min) return false;
  if (max !== undefined && count > max) return false;
  return true;
}

export function containsWord(input: string, word: string, ignoreHarakat = false): boolean {
  const words = splitArabicWords(input);
  const target = ignoreHarakat ? removeDiacritics(word) : word;
  return words.some(w => {
    const check = ignoreHarakat ? removeDiacritics(w) : w;
    return check === target;
  });
}

export function wordAtPosition(input: string, position: number, word: string, ignoreHarakat = false): boolean {
  const words = splitArabicWords(input);
  if (position < 0 || position >= words.length) return false;
  const actual = ignoreHarakat ? removeDiacritics(words[position]) : words[position];
  const expected = ignoreHarakat ? removeDiacritics(word) : word;
  return actual === expected;
}

export function hasDiacriticOnWord(input: string, word: string, diacritic: DiacriticType): boolean {
  const diacriticChar = DIACRITIC_MAP[diacritic];
  if (!diacriticChar) return false;

  const bareWord = removeDiacritics(word);
  const words = splitArabicWords(input);

  for (const w of words) {
    if (removeDiacritics(w) === bareWord) {
      return w.includes(diacriticChar);
    }
  }
  return false;
}

export function matchesPattern(input: string, pattern: string): boolean {
  try {
    const regex = new RegExp(pattern, 'u');
    return regex.test(input);
  } catch {
    return false;
  }
}

export function exactMatch(input: string, validStrings: string[], ignoreHarakat = false): boolean {
  const trimmed = input.trim();
  return validStrings.some(s => {
    if (ignoreHarakat) {
      return removeDiacritics(trimmed) === removeDiacritics(s.trim());
    }
    return trimmed === s.trim();
  });
}

export { splitArabicWords, countArabicWords, removeDiacritics };
