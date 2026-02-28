import { sarf, sarfHelpers } from '@arabiyya/sarf';
import { VERB_TYPE_MAP } from './generateConjugation';

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

export interface FormInfo {
  number: string;
  roman: string;
  arabic: string;
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

const FORM_ONE_BABS = ['nasara', 'daraba', 'fataha', "sami'a", 'hasiba', 'karuma'] as const;

function getChapterKey(formNumber: string): string {
  return formNumber === '1' ? 'nasara' : formNumber;
}

/**
 * Detects the correct Form I bab (chapter) by matching the stored past tense
 * against each of the 6 Form I patterns.
 */
function detectFormOneBab(
  root: string,
  sarfVerbType: string,
  pastTense: string,
  presentTense: string
): string {
  const verbTypeData = (sarf as Map<string, unknown>).get(sarfVerbType);
  if (!verbTypeData) return 'nasara';

  const rootLetters = root.split('').filter(c => c.trim().length > 0);
  if (rootLetters.length < 3) return 'nasara';

  const [fa, ain, lam] = rootLetters;

  for (const bab of FORM_ONE_BABS) {
    try {
      const chapter = (verbTypeData as Map<string, { exists?: boolean }>).get(bab);
      if (!chapter || !chapter.exists) continue;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const conjugated = sarfHelpers.replaceRoots(chapter as any, {
        ف: fa,
        ع: ain,
        ل: lam,
      });

      const sarfKabeer = (conjugated as Record<string, unknown>)['صرف كبير'] as Record<string, unknown>;
      const maaroof = sarfKabeer?.معروف as Record<string, unknown> | undefined;
      const pastForms = maaroof?.ماضي as Record<string, string> | undefined;
      if (!pastForms) continue;

      const presentMarfoo = (maaroof?.مضارع as Record<string, unknown>)?.مرفوع as Record<string, string> | undefined;
      if (!presentMarfoo) continue;

      const huwa = pastForms['هُوَ'] || pastForms['هو'];
      const huwaPresent = presentMarfoo['هُوَ'] || presentMarfoo['هو'];

      // Match BOTH past and present to uniquely identify the bab
      if (huwa && huwa === pastTense && huwaPresent && huwaPresent === presentTense) return bab;
    } catch {
      continue;
    }
  }

  return 'nasara';
}

/**
 * Gets available forms for a given UI verb type name
 */
export function getAvailableForms(verbType: string): FormInfo[] {
  const sarfVerbType = VERB_TYPE_MAP[verbType] || 'sahih';
  const verbTypeData = (sarf as Map<string, unknown>).get(sarfVerbType);

  if (!verbTypeData) {
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
 * Generates full conjugation data for a specific verb root, UI verb type, and form number
 */
export function generateFullConjugation(
  root: string,
  verbType: string,
  formNumber: string,
  pastTense?: string,
  presentTense?: string
): ConjugationData {
  const sarfVerbType = VERB_TYPE_MAP[verbType] || 'sahih';
  const verbTypeData = (sarf as Map<string, unknown>).get(sarfVerbType);

  if (!verbTypeData) {
    throw new Error(`Verb type "${verbType}" not found in sarf data`);
  }

  const chapterKey = formNumber === '1' && pastTense && presentTense
    ? detectFormOneBab(root, sarfVerbType, pastTense, presentTense)
    : getChapterKey(formNumber);
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
