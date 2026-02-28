/**
 * Wraps the conjugation app's fullConjugationGenerator for per-seegah lookups.
 * Caches ConjugationData to avoid regenerating for repeated verb queries.
 */

import { generateFullConjugation } from '@arabtools/conjugation/src/utils/fullConjugationGenerator';
import type { ConjugationData } from '@arabtools/conjugation/src/utils/fullConjugationGenerator';
import type { ArabicWord } from '../types';
import { getFormBySeegah, requiresPassive } from '../data/pronoun-map';

/** Convert Roman numeral verb form to numeric string expected by fullConjugationGenerator */
const ROMAN_TO_NUMBER: Record<string, string> = {
  'I': '1', 'II': '2', 'III': '3', 'IV': '4', 'V': '5',
  'VI': '6', 'VII': '7', 'VIII': '8', 'IX': '9', 'X': '10',
};

function toFormNumber(verbForm: string): string {
  return ROMAN_TO_NUMBER[verbForm] || verbForm;
}

/** Cache key: `root:type:form` */
const conjugationCache = new Map<string, ConjugationData>();

function getCacheKey(verb: ArabicWord): string {
  return `${verb.root}:${verb.type}:${verb.verbForm || 'I'}`;
}

/**
 * Get the ConjugationData for a verb, using cache when possible.
 */
export function getConjugationData(verb: ArabicWord): ConjugationData | null {
  const key = getCacheKey(verb);
  const cached = conjugationCache.get(key);
  if (cached) return cached;

  try {
    const data = generateFullConjugation(
      verb.root,
      verb.type,
      toFormNumber(verb.verbForm || 'I'),
      verb.pastTense,
      verb.presentTense
    );
    conjugationCache.set(key, data);
    return data;
  } catch {
    return null;
  }
}

/**
 * Get the conjugated form for a specific verb + seegah number.
 * Returns null if the form isn't available (e.g., no passive for this verb).
 */
export function getConjugatedForm(verb: ArabicWord, seegahNumber: number): string | null {
  const data = getConjugationData(verb);
  if (!data) return null;

  // Check if this seegah requires passive and if passive is available
  if (requiresPassive(seegahNumber)) {
    const hasPassive = Object.keys(data.passivePast).length > 0;
    if (!hasPassive) return null;
  }

  const form = getFormBySeegah(seegahNumber, data);
  return form || null;
}

/**
 * Check if a seegah is available for a given verb.
 */
export function isSeegahAvailable(verb: ArabicWord, seegahNumber: number): boolean {
  return getConjugatedForm(verb, seegahNumber) !== null;
}

/**
 * Clear the conjugation cache (e.g., when switching units).
 */
export function clearConjugationCache(): void {
  conjugationCache.clear();
}
