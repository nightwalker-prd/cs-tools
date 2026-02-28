import { sarf, sarfHelpers } from '@arabiyya/sarf';
import type { ExtendedVerbType, ComparisonSlot, ComparisonSection, ComparisonResult } from './types';
import { extendedToSarfType } from './verb-type-detection';

/** Form info matching sarf-charts pattern */
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

function getChapterKey(formNumber: string): string {
  return formNumber === '1' ? 'nasara' : formNumber;
}

/** Gets available forms for a given sarf verb type */
export function getAvailableForms(extendedType: ExtendedVerbType): FormInfo[] {
  const sarfType = extendedToSarfType(extendedType);
  const verbTypeData = (sarf as Map<string, unknown>).get(sarfType);

  if (!verbTypeData) return [];

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
 * Generates a conjugation table for a root with a specific verb type and form.
 * Returns Record<pronoun, conjugatedForm> for each section.
 */
function getConjugationData(
  root: string,
  sarfType: string,
  formNumber: string
): {
  activePast: Record<string, string>;
  activePresentMarfoo: Record<string, string>;
  imperative: Record<string, string>;
  masdar: string;
  ismFaail: string;
  ismMafool: string;
} | null {
  const verbTypeData = (sarf as Map<string, unknown>).get(sarfType);
  if (!verbTypeData) return null;

  const chapterKey = getChapterKey(formNumber);
  const chapter = (verbTypeData as Map<string, { exists?: boolean }>).get(chapterKey);
  if (!chapter || !chapter.exists) return null;

  const rootLetters = root.split('').filter(c => c.trim().length > 0);
  if (rootLetters.length < 3) return null;

  const [fa, ain, lam] = rootLetters;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conjugated = sarfHelpers.replaceRoots(chapter as any, {
      ف: fa,
      ع: ain,
      ل: lam,
    });

    const sarfKabeer = (conjugated as Record<string, unknown>)['صرف كبير'] as Record<string, unknown>;
    const sarfSagheer = (conjugated as Record<string, unknown>)['صرف صغير'] as Record<string, unknown>;
    const maaroof = sarfKabeer.معروف as Record<string, unknown>;

    const masdarVal = (sarfSagheer.مصدر as string | string[]);
    const masdar = Array.isArray(masdarVal) ? masdarVal[0] || '' : masdarVal || '';

    const hasMajhool = sarfKabeer.مجهول !== null && sarfKabeer.مجهول !== undefined;

    return {
      activePast: (maaroof.ماضي as Record<string, string>) || {},
      activePresentMarfoo: ((maaroof.مضارع as Record<string, unknown>)?.مرفوع as Record<string, string>) || {},
      imperative: (maaroof.أمر as Record<string, string>) || {},
      masdar,
      ismFaail: ((sarfSagheer.معروف as Record<string, string>)?.فاعل) || '',
      ismMafool: hasMajhool ? ((sarfSagheer.مجهول as Record<string, string>)?.مفعول || '') : '',
    };
  } catch {
    return null;
  }
}

/** Key pronouns for the comparison table */
const KEY_PRONOUNS = [
  'هُوَ',
  'هُمَا_م',
  'هُمْ',
  'هِيَ',
  'هُمَا_ف',
  'هُنَّ',
  'أَنْتَ',
  'أَنْتُمَا',
  'أَنْتُمْ',
  'أَنْتِ',
  'أَنْتُمَا_ف',
  'أَنْتُنَّ',
  'أَنَا',
  'نَحْنُ',
];

/** Imperative pronouns (subset) */
const IMPERATIVE_PRONOUNS = [
  'أَنْتَ',
  'أَنْتُمَا',
  'أَنْتُمْ',
  'أَنْتِ',
  'أَنْتُمَا_ف',
  'أَنْتُنَّ',
];

/**
 * Builds comparison slots between two pronoun-keyed conjugation records.
 * Tries multiple pronoun key formats for matching (handles Unicode normalization).
 */
function buildSlots(
  soundData: Record<string, string>,
  actualData: Record<string, string>,
  pronouns: string[]
): ComparisonSlot[] {
  const slots: ComparisonSlot[] = [];

  for (const pronoun of pronouns) {
    // Try direct match first, then normalized match
    const soundForm = findPronounValue(soundData, pronoun);
    const actualForm = findPronounValue(actualData, pronoun);

    if (soundForm || actualForm) {
      slots.push({
        pronoun,
        soundForm: soundForm || '',
        actualForm: actualForm || '',
        isDifferent: soundForm !== actualForm && !!soundForm && !!actualForm,
      });
    }
  }

  return slots;
}

/** Find a value in a pronoun-keyed record, trying Unicode normalization fallback */
function findPronounValue(data: Record<string, string>, pronoun: string): string {
  if (data[pronoun]) return data[pronoun];

  // Try without diacritics suffix markers
  const normalized = pronoun.replace(/_[مف]$/, '');
  if (data[normalized]) return data[normalized];

  // Try all keys for a close match
  for (const key of Object.keys(data)) {
    if (key.normalize('NFC') === pronoun.normalize('NFC')) {
      return data[key];
    }
  }

  return '';
}

/**
 * Compares conjugations between the sound pattern and the actual
 * (i'laal-applied) form for a given root and verb form.
 */
export function compareForms(
  root: string,
  extendedType: ExtendedVerbType,
  formNumber: string
): ComparisonResult | null {
  const sarfType = extendedToSarfType(extendedType);

  // Get the actual conjugation (with i'laal applied)
  const actualData = getConjugationData(root, sarfType, formNumber);
  if (!actualData) return null;

  // Get the sound baseline (using 'sahih' type with same root for comparison)
  // For sahih/hamzated verbs, there's no meaningful comparison
  const soundData = sarfType === 'sahih'
    ? actualData // No i'laal difference for sound verbs
    : getConjugationData(root, 'sahih', formNumber) || actualData;

  const sections: ComparisonSection[] = [];

  // Past Active
  const pastSlots = buildSlots(soundData.activePast, actualData.activePast, KEY_PRONOUNS);
  if (pastSlots.length > 0) {
    sections.push({
      id: 'past-active',
      titleAr: 'الماضي المعروف',
      titleEn: 'Past (Active)',
      slots: pastSlots,
    });
  }

  // Present Active (Marfoo')
  const presentSlots = buildSlots(soundData.activePresentMarfoo, actualData.activePresentMarfoo, KEY_PRONOUNS);
  if (presentSlots.length > 0) {
    sections.push({
      id: 'present-active',
      titleAr: 'المضارع المرفوع',
      titleEn: 'Present (Marfoo\')',
      slots: presentSlots,
    });
  }

  // Imperative
  const imperativeSlots = buildSlots(soundData.imperative, actualData.imperative, IMPERATIVE_PRONOUNS);
  if (imperativeSlots.length > 0) {
    sections.push({
      id: 'imperative',
      titleAr: 'الأمر',
      titleEn: 'Imperative',
      slots: imperativeSlots,
    });
  }

  // Masdar, Ism Faa'il, Ism Maf'ool (single-slot sections)
  if (soundData.masdar || actualData.masdar) {
    sections.push({
      id: 'masdar',
      titleAr: 'المصدر',
      titleEn: 'Masdar',
      slots: [{
        pronoun: '',
        soundForm: soundData.masdar,
        actualForm: actualData.masdar,
        isDifferent: soundData.masdar !== actualData.masdar,
      }],
    });
  }

  if (soundData.ismFaail || actualData.ismFaail) {
    sections.push({
      id: 'ism-faail',
      titleAr: 'اسم الفاعل',
      titleEn: 'Active Participle',
      slots: [{
        pronoun: '',
        soundForm: soundData.ismFaail,
        actualForm: actualData.ismFaail,
        isDifferent: soundData.ismFaail !== actualData.ismFaail,
      }],
    });
  }

  if (soundData.ismMafool || actualData.ismMafool) {
    sections.push({
      id: 'ism-mafool',
      titleAr: 'اسم المفعول',
      titleEn: 'Passive Participle',
      slots: [{
        pronoun: '',
        soundForm: soundData.ismMafool,
        actualForm: actualData.ismMafool,
        isDifferent: soundData.ismMafool !== actualData.ismMafool,
      }],
    });
  }

  let totalSlots = 0;
  let slotsWithIlaal = 0;
  for (const section of sections) {
    for (const slot of section.slots) {
      totalSlots++;
      if (slot.isDifferent) slotsWithIlaal++;
    }
  }

  return {
    root,
    extendedType,
    formNumber,
    sections,
    totalSlots,
    slotsWithIlaal,
  };
}
