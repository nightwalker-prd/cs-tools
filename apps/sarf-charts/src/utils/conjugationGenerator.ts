import { sarf, sarfHelpers } from '@arabiyya/sarf';
import { VerbType } from './verbTypeDetection';

export interface FormInfo {
  number: string;
  roman: string;
  arabic: string;
}

export interface ConjugationData {
  activePast: Record<string, string>;
  activePresent: {
    marfoo: Record<string, string>;
    mansoob: Record<string, string>;
    majzoom: Record<string, string>;
  };
  passivePast: Record<string, string>;
  passivePresent: {
    marfoo: Record<string, string>;
    mansoob: Record<string, string>;
    majzoom: Record<string, string>;
  };
  imperative: Record<string, string>;
  prohibition: string;
  activeParticiple: string;
  passiveParticiple: string;
}

export const allForms: FormInfo[] = [
  { number: '1', roman: 'I', arabic: 'فَعَلَ' },
  { number: '2', roman: 'II', arabic: 'فَعَّلَ' },
  { number: '3', roman: 'III', arabic: 'فَاعَلَ' },
  { number: '4', roman: 'IV', arabic: 'أَفْعَلَ' },
  { number: '5', roman: 'V', arabic: 'تَفَعَّلَ' },
  { number: '6', roman: 'VI', arabic: 'تَفَاعَلَ' },
  { number: '7', roman: 'VII', arabic: 'اِنْفَعَلَ' },
  { number: '8', roman: 'VIII', arabic: 'اِفْتَعَلَ' },
  { number: '9', roman: 'IX', arabic: 'اِفْعَلَّ' },
  { number: '10', roman: 'X', arabic: 'اِسْتَفْعَلَ' },
];

function getChapterKey(formNumber: string): string {
  return formNumber === '1' ? 'nasara' : formNumber;
}

/**
 * Gets available forms for a given verb type
 */
export function getAvailableForms(verbType: VerbType): FormInfo[] {
  const verbTypeData = (sarf as Map<string, unknown>).get(verbType);

  if (!verbTypeData) {
    console.error(`Verb type "${verbType}" not found in sarf data`);
    return [];
  }

  return allForms.filter(form => {
    try {
      const chapterKey = getChapterKey(form.number);
      const chapter = (verbTypeData as Map<string, { exists?: boolean }>).get(chapterKey);
      return chapter && chapter.exists === true;
    } catch {
      return false;
    }
  });
}

/**
 * Generates conjugation data for a specific verb root, type, and form
 */
export function generateConjugation(
  root: string,
  verbType: VerbType,
  formNumber: string
): ConjugationData {
  const verbTypeData = (sarf as Map<string, unknown>).get(verbType);

  if (!verbTypeData) {
    throw new Error(`Verb type "${verbType}" not found in sarf data`);
  }

  const chapterKey = getChapterKey(formNumber);
  const chapter = (verbTypeData as Map<string, { exists?: boolean }>).get(chapterKey);

  if (!chapter || !(chapter as { exists?: boolean }).exists) {
    throw new Error(`Form ${formNumber} not available for ${verbType} verbs`);
  }

  // Extract root letters
  const rootLetters = root.split('').filter(c => c.trim().length > 0);
  if (rootLetters.length < 3) {
    throw new Error(`Invalid root: ${root} (must have at least 3 letters)`);
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

  // Some forms (like IX) don't have passive voice
  const hasMajhool = sarfKabeer.مجهول !== null && sarfKabeer.مجهول !== undefined;
  const maaroof = sarfKabeer.معروف as Record<string, unknown>;
  const majhool = sarfKabeer.مجهول as Record<string, unknown> | null;

  return {
    activePast: (maaroof.ماضي as Record<string, string>) || {},
    activePresent: {
      marfoo: ((maaroof.مضارع as Record<string, unknown>)?.مرفوع as Record<string, string>) || {},
      mansoob: ((maaroof.مضارع as Record<string, unknown>)?.منصوب as Record<string, string>) || {},
      majzoom: ((maaroof.مضارع as Record<string, unknown>)?.مجزوم as Record<string, string>) || {},
    },
    passivePast: hasMajhool && majhool ? (majhool.ماضي as Record<string, string>) || {} : {},
    passivePresent: hasMajhool && majhool ? {
      marfoo: ((majhool.مضارع as Record<string, unknown>)?.مرفوع as Record<string, string>) || {},
      mansoob: ((majhool.مضارع as Record<string, unknown>)?.منصوب as Record<string, string>) || {},
      majzoom: ((majhool.مضارع as Record<string, unknown>)?.مجزوم as Record<string, string>) || {},
    } : { marfoo: {}, mansoob: {}, majzoom: {} },
    imperative: (maaroof.أمر as Record<string, string>) || {},
    prohibition: (sarfSagheer.نهي as string) || '',
    activeParticiple: ((sarfSagheer.معروف as Record<string, string>)?.فاعل) || '',
    passiveParticiple: hasMajhool ? ((sarfSagheer.مجهول as Record<string, string>)?.مفعول || '') : '',
  };
}
