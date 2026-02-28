/**
 * Conjugation Generator Utility
 *
 * Auto-generates verb conjugations using @arabiyya/sarf library.
 * Maps UI-friendly verb type names to sarf internal names.
 */

import { sarf, sarfHelpers } from '@arabiyya/sarf';

export interface GeneratedConjugation {
  pastTense: string;
  presentTense: string;
  gerund: string;
}

// Map UI verb type names to sarf internal names
export const VERB_TYPE_MAP: Record<string, string> = {
  'Regular': 'sahih',
  'Mithal': 'mithaal',
  'Ajwaf': 'ajwaf',
  'Naqis': 'naaqis',
  "Mudaa'af": "mudaa'af",
  // Hamza types - map to sahih as base (sarf handles hamza separately)
  "Mahmooz al-Fa'": 'sahih',
  "Mahmooz al-'Ayn": 'sahih',
  'Mahmooz al-Lam': 'sahih',
  // Lafif types - these are combinations, map to closest
  'Lafif Maqroon': 'naaqis', // Adjacent weak letters at end
  'Lafif Mafrooq': 'mithaal', // Weak letters separated
};

// Map roman numeral forms to sarf chapter keys
function getChapterKey(verbForm: string): string {
  const formNumber = romanToNumber(verbForm);
  return formNumber === 1 ? 'nasara' : String(formNumber);
}

function romanToNumber(roman: string): number {
  const map: Record<string, number> = {
    'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
    'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10
  };
  return map[roman] || 1;
}

/**
 * Generates conjugation data for a custom word
 *
 * @param root - Root letters separated by spaces (e.g., "ك ت ب")
 * @param verbType - UI verb type name (e.g., "Regular", "Mithal")
 * @param verbForm - Roman numeral form (e.g., "I", "II")
 * @returns Generated conjugations or null if generation fails
 */
export function generateConjugation(
  root: string,
  verbType: string,
  verbForm: string
): GeneratedConjugation | null {
  try {
    // Map UI verb type to sarf internal name
    const sarfVerbType = VERB_TYPE_MAP[verbType];
    if (!sarfVerbType) {
      console.warn(`Unknown verb type: ${verbType}, defaulting to sahih`);
    }

    const actualVerbType = sarfVerbType || 'sahih';

    // Get verb type data from sarf
    const verbTypeData = (sarf as Map<string, unknown>).get(actualVerbType);
    if (!verbTypeData) {
      console.error(`Verb type "${actualVerbType}" not found in sarf data`);
      return null;
    }

    // Get chapter for the requested form
    const chapterKey = getChapterKey(verbForm);
    const chapter = (verbTypeData as Map<string, { exists?: boolean }>).get(chapterKey);

    if (!chapter || !(chapter as { exists?: boolean }).exists) {
      console.warn(`Form ${verbForm} not available for ${verbType} verbs`);
      return null;
    }

    // Extract root letters
    const rootLetters = root.split('').filter(c => c.trim().length > 0);
    if (rootLetters.length < 3) {
      console.error(`Invalid root: ${root} (must have at least 3 letters)`);
      return null;
    }

    const [fa, ain, lam] = rootLetters;

    // Replace pattern roots with actual root
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conjugated = sarfHelpers.replaceRoots(chapter as any, {
      ف: fa,
      ع: ain,
      ل: lam
    });

    // Extract conjugation data
    const sarfKabeer = (conjugated as Record<string, unknown>)['صرف كبير'] as Record<string, unknown>;
    const sarfSagheer = (conjugated as Record<string, unknown>)['صرف صغير'] as Record<string, unknown>;

    if (!sarfKabeer) {
      console.error('صرف كبير not found in conjugated data');
      return null;
    }

    const maaroof = sarfKabeer.معروف as Record<string, unknown>;
    if (!maaroof) {
      console.error('معروف (active voice) not found');
      return null;
    }

    // Get past tense (3rd person masculine singular)
    const pastTenseData = maaroof.ماضي as Record<string, string>;
    const pastTense = pastTenseData?.['هُوَ'] || pastTenseData?.['هو'] || '';

    // Get present tense marfoo (3rd person masculine singular)
    const presentData = maaroof.مضارع as Record<string, unknown>;
    const marfooData = presentData?.مرفوع as Record<string, string>;
    const presentTense = marfooData?.['هُوَ'] || marfooData?.['هو'] || '';

    // Get gerund (masdar)
    const masdar = (sarfSagheer?.مصدر as string) || '';

    if (!pastTense || !presentTense) {
      console.warn('Could not extract past or present tense');
      return null;
    }

    return {
      pastTense,
      presentTense,
      gerund: masdar
    };
  } catch (error) {
    console.error('Error generating conjugation:', error);
    return null;
  }
}

/**
 * Checks if conjugation generation is available for a verb type/form combination
 */
export function isGenerationAvailable(verbType: string, verbForm: string): boolean {
  try {
    const sarfVerbType = VERB_TYPE_MAP[verbType] || 'sahih';
    const verbTypeData = (sarf as Map<string, unknown>).get(sarfVerbType);

    if (!verbTypeData) return false;

    const chapterKey = getChapterKey(verbForm);
    const chapter = (verbTypeData as Map<string, { exists?: boolean }>).get(chapterKey);

    return !!(chapter && (chapter as { exists?: boolean }).exists);
  } catch {
    return false;
  }
}
