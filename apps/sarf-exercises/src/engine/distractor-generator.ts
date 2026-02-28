/**
 * Generates plausible wrong answers (distractors) for multiple-choice mode.
 */

import { shuffle } from '@arabtools/core';
import type { ArabicWord, Seegah } from '../types';
import { getConjugatedForm } from './conjugation-bridge';

type DistractorType =
  | 'conjugation'
  | 'translation-ar-en'
  | 'translation-en-ar'
  | 'labeling';

const DISTRACTOR_COUNT = 3;

/**
 * Generate distractors for a given exercise.
 * Returns an array of wrong answers (not including the correct one).
 */
export function generateDistractors(
  type: DistractorType,
  verb: ArabicWord,
  seegah: Seegah,
  _correctAnswer: string,
  allVerbs: ArabicWord[],
  allSiyagh: Seegah[],
): string[] {
  let candidates: string[];

  switch (type) {
    case 'conjugation':
      candidates = getConjugationDistractors(verb, seegah, allVerbs, allSiyagh);
      break;
    case 'translation-ar-en':
      candidates = getTranslationArEnDistractors(verb, allVerbs);
      break;
    case 'translation-en-ar':
      candidates = getTranslationEnArDistractors(verb, seegah, allVerbs);
      break;
    case 'labeling':
      candidates = getLabelingDistractors(seegah, allSiyagh);
      break;
  }

  // Remove the correct answer and deduplicate
  const filtered = [...new Set(candidates)].filter(c => c !== _correctAnswer && c.trim() !== '');
  const shuffled = shuffle(filtered);
  return shuffled.slice(0, DISTRACTOR_COUNT);
}

/**
 * Conjugation distractors:
 * 1. Same verb, different seegah (tests person/tense distinction)
 * 2. Same seegah, different verb
 */
function getConjugationDistractors(
  verb: ArabicWord,
  seegah: Seegah,
  allVerbs: ArabicWord[],
  allSiyagh: Seegah[],
): string[] {
  const candidates: string[] = [];

  // Strategy 1: Same verb, different seegah (nearby forms)
  const nearbyNumbers = getNearbySeegahNumbers(seegah.number, allSiyagh);
  for (const num of nearbyNumbers) {
    const form = getConjugatedForm(verb, num);
    if (form) candidates.push(form);
    if (candidates.length >= 4) break;
  }

  // Strategy 2: Same seegah, different verb
  const otherVerbs = allVerbs.filter(v => v.root !== verb.root);
  const shuffledVerbs = shuffle(otherVerbs);
  for (const otherVerb of shuffledVerbs.slice(0, 5)) {
    const form = getConjugatedForm(otherVerb, seegah.number);
    if (form) candidates.push(form);
    if (candidates.length >= 6) break;
  }

  return candidates;
}

/**
 * Translation AR→EN distractors: meanings from other verbs in the same unit.
 */
function getTranslationArEnDistractors(
  verb: ArabicWord,
  allVerbs: ArabicWord[],
): string[] {
  return shuffle(
    allVerbs
      .filter(v => v.root !== verb.root && v.meaning)
      .map(v => v.meaning!)
  ).slice(0, DISTRACTOR_COUNT + 2);
}

/**
 * Translation EN→AR distractors: conjugated forms of other verbs in same seegah.
 */
function getTranslationEnArDistractors(
  verb: ArabicWord,
  seegah: Seegah,
  allVerbs: ArabicWord[],
): string[] {
  const candidates: string[] = [];
  const otherVerbs = shuffle(allVerbs.filter(v => v.root !== verb.root));

  for (const otherVerb of otherVerbs.slice(0, 8)) {
    const form = getConjugatedForm(otherVerb, seegah.number);
    if (form) candidates.push(form);
    if (candidates.length >= DISTRACTOR_COUNT + 2) break;
  }

  return candidates;
}

/**
 * Labeling distractors:
 * 1. Same person, different tense
 * 2. Same tense, different person
 * 3. Different category entirely
 */
function getLabelingDistractors(
  seegah: Seegah,
  allSiyagh: Seegah[],
): string[] {
  const candidates: string[] = [];

  // Same category, different person
  const sameCategory = allSiyagh.filter(
    s => s.category === seegah.category && s.number !== seegah.number
  );
  for (const s of shuffle(sameCategory).slice(0, 2)) {
    candidates.push(s.label);
  }

  // Different category (same person position mod 14 if applicable)
  const differentCategory = allSiyagh.filter(
    s => s.category !== seegah.category
  );
  for (const s of shuffle(differentCategory).slice(0, 3)) {
    candidates.push(s.label);
  }

  return candidates;
}

/**
 * Get seegah numbers "nearby" to the current one for plausible distractors.
 * Picks from the same tense category but different person.
 */
function getNearbySeegahNumbers(current: number, allSiyagh: Seegah[]): number[] {
  const currentSeegah = allSiyagh.find(s => s.number === current);
  if (!currentSeegah) return [];

  // Same category, different number
  const sameCategory = allSiyagh
    .filter(s => s.category === currentSeegah.category && s.number !== current)
    .map(s => s.number);

  return shuffle(sameCategory);
}
