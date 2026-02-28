/**
 * Maps seegah numbers (1-80) to paths within ConjugationData.
 *
 * The conjugation library uses Arabic pronoun keys (هُوَ, هِيَ, etc.)
 * to store conjugated forms. This map connects each seegah number
 * to the correct tense/voice/pronoun path.
 */

import type { ConjugationData } from '@arabtools/conjugation/src/utils/fullConjugationGenerator';

/** Pronoun keys used in the sarf library's conjugation output */
const PRONOUNS_14 = [
  'هُوَ', 'هِيَ', 'هُمَا', 'هُمَا', 'هُمْ', 'هُنَّ',
  'أَنْتَ', 'أَنْتِ', 'أَنْتُمَا', 'أَنْتُمْ', 'أَنْتُنَّ',
  'أَنَا', 'نَحْنُ', 'نَحْنُ',
] as const;

/** Imperative/prohibition only has 2nd person + 1st person forms (6 pronouns) */
const PRONOUNS_CMD = [
  'أَنْتَ', 'أَنْتِ', 'أَنْتُمَا', 'أَنْتُمْ', 'أَنْتُنَّ', 'أَنَا',
] as const;

export interface PronounMapping {
  /** The path to reach the conjugated form within ConjugationData */
  getForm: (data: ConjugationData) => string;
  /** Arabic pronoun key for display */
  pronoun: string;
}

/**
 * Look up the conjugated form for a given seegah number from ConjugationData.
 * Returns empty string if the form is not available.
 */
export function getFormBySeegah(seegah: number, data: ConjugationData): string {
  if (seegah < 1 || seegah > 80) return '';

  // Seegah 1-14: Active Past (الماضي المعلوم)
  if (seegah >= 1 && seegah <= 14) {
    const pronoun = PRONOUNS_14[seegah - 1];
    return data.activePast[pronoun] || findByPronounFallback(data.activePast, pronoun) || '';
  }

  // Seegah 15-28: Passive Past (الماضي المجهول)
  if (seegah >= 15 && seegah <= 28) {
    const pronoun = PRONOUNS_14[seegah - 15];
    return data.passivePast[pronoun] || findByPronounFallback(data.passivePast, pronoun) || '';
  }

  // Seegah 29-42: Active Present Marfoo (المضارع المعلوم)
  if (seegah >= 29 && seegah <= 42) {
    const pronoun = PRONOUNS_14[seegah - 29];
    return data.activePresent.marfoo[pronoun] || findByPronounFallback(data.activePresent.marfoo, pronoun) || '';
  }

  // Seegah 43-56: Passive Present Marfoo (المضارع المجهول)
  if (seegah >= 43 && seegah <= 56) {
    const pronoun = PRONOUNS_14[seegah - 43];
    return data.passivePresent.marfoo[pronoun] || findByPronounFallback(data.passivePresent.marfoo, pronoun) || '';
  }

  // Seegah 57-62: Imperative (الأمر)
  if (seegah >= 57 && seegah <= 62) {
    const pronoun = PRONOUNS_CMD[seegah - 57];
    return data.imperative[pronoun] || findByPronounFallback(data.imperative, pronoun) || '';
  }

  // Seegah 63-68: Prohibition (النهي) — لا + مجزوم
  if (seegah >= 63 && seegah <= 68) {
    const pronoun = PRONOUNS_CMD[seegah - 63];
    // Prohibition uses active present majzoom with لَا prefix
    const majzoom = data.activePresent.majzoom[pronoun] || findByPronounFallback(data.activePresent.majzoom, pronoun);
    if (majzoom) return 'لَا ' + majzoom;
    // Fallback: if prohibition string exists as a single value
    if (seegah === 63 && data.prohibition) return 'لَا ' + data.prohibition;
    return '';
  }

  // Seegah 69-74: Active Participle (اسم الفاعل) — base form for v1
  if (seegah >= 69 && seegah <= 74) {
    return data.activeParticiple || '';
  }

  // Seegah 75-80: Passive Participle (اسم المفعول) — base form for v1
  if (seegah >= 75 && seegah <= 80) {
    return data.passiveParticiple || '';
  }

  return '';
}

/**
 * Fallback: try to find the pronoun without diacritics in the data keys.
 * The sarf library sometimes uses slightly different diacritization.
 */
function findByPronounFallback(record: Record<string, string>, pronoun: string): string | undefined {
  // Try without diacritics (strip harakat)
  const stripped = stripDiacritics(pronoun);
  for (const [key, value] of Object.entries(record)) {
    if (stripDiacritics(key) === stripped) return value;
  }
  return undefined;
}

function stripDiacritics(text: string): string {
  return text.replace(/[\u064B-\u065F\u0670]/g, '');
}

/**
 * Check if a given seegah number requires passive voice data.
 * Used to filter out seegahs when a verb form has no passive.
 */
export function requiresPassive(seegah: number): boolean {
  return (seegah >= 15 && seegah <= 28) || (seegah >= 43 && seegah <= 56) || (seegah >= 75 && seegah <= 80);
}

/**
 * Get the category name for a seegah range (matches siyagh.ts categories).
 */
export function getSeegahCategory(seegah: number): string {
  if (seegah >= 1 && seegah <= 14) return 'الْمَاضِي الْمَعْلُوْمِ';
  if (seegah >= 15 && seegah <= 28) return 'الْمَاضِي الْمَجْهُوْلِ';
  if (seegah >= 29 && seegah <= 42) return 'الْمُضَارِعِ الْمَعْلُوْمِ';
  if (seegah >= 43 && seegah <= 56) return 'الْمُضَارِعِ الْمَجْهُوْلِ';
  if (seegah >= 57 && seegah <= 62) return 'الْأَمْرِ';
  if (seegah >= 63 && seegah <= 68) return 'النَّهْيِ';
  if (seegah >= 69 && seegah <= 74) return 'اسْمُ الْفَاعِلِ';
  if (seegah >= 75 && seegah <= 80) return 'اسْمُ الْمَفْعُولِ';
  return '';
}
