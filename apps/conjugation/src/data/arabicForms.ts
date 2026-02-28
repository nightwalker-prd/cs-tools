/**
 * Arabic Verb Forms (أوزان الفعل)
 * Data structure for the 10 forms of Arabic verbs with pronouns and conjugation types
 */

import { getRandomSeegah, type Seegah } from './siyagh';

export interface FormCombination {
  form: string;
  formNumber: number;
  pattern: string;
  pronoun: string;
  conjugationType: string;
  seegah?: Seegah;
}

/**
 * The 10 forms of Arabic verbs (اَلأَوْزَان)
 * Each form represents a different verbal pattern
 */
export const forms = [
  { form: 'Form I (الأول)', formNumber: 1, pattern: 'فَعَلَ' },
  { form: 'Form II (الثاني)', formNumber: 2, pattern: 'فَعَّلَ' },
  { form: 'Form III (الثالث)', formNumber: 3, pattern: 'فَاعَلَ' },
  { form: 'Form IV (الرابع)', formNumber: 4, pattern: 'أَفْعَلَ' },
  { form: 'Form V (الخامس)', formNumber: 5, pattern: 'تَفَعَّلَ' },
  { form: 'Form VI (السادس)', formNumber: 6, pattern: 'تَفَاعَلَ' },
  { form: 'Form VII (السابع)', formNumber: 7, pattern: 'اِنْفَعَلَ' },
  { form: 'Form VIII (الثامن)', formNumber: 8, pattern: 'اِفْتَعَلَ' },
  { form: 'Form IX (التاسع)', formNumber: 9, pattern: 'اِفْعَلَّ' },
  { form: 'Form X (العاشر)', formNumber: 10, pattern: 'اِسْتَفْعَلَ' },
];

/**
 * Grammatical pronouns (ضمائر)
 * 12 pronouns covering all persons, numbers, and genders
 * Note: Participles are NOT included here - they don't conjugate by pronoun
 */
export const pronouns = [
  'الغائب المفرد المذكر',
  'الغائب المفرد المؤنث',
  'الغائب المثنى',
  'الغائب الجمع المذكر',
  'الغائب الجمع المؤنث',
  'المخاطب المفرد المذكر',
  'المخاطب المفرد المؤنث',
  'المخاطب المثنى',
  'المخاطب الجمع المذكر',
  'المخاطب الجمع المؤنث',
  'المتكلم المفرد',
  'المتكلم الجمع',
];

/**
 * Conjugation types (أنواع التصريف)
 * 9 conjugation types in Arabic
 */
export const conjugationTypes = [
  'تصريف صغير (Small Conjugation)',
  'الماضي المبني للمعلوم (Past Active)',
  'الماضي المبني للمجهول (Past Passive)',
  'المضارع المبني للمعلوم (Present Active)',
  'المضارع المبني للمجهول (Present Passive)',
  'الأمر (Command/Imperative)',
  'النهي (Prohibition)',
  'اسم الفاعل (Active Participle)',
  'اسم المفعول (Passive Participle)',
];

/**
 * Generate random form combinations without validation
 * @param count - Number of combinations to generate
 * @param selectedForms - Optional array of form numbers to filter by (1-10)
 * @param selectedConjugationTypes - Optional array of conjugation types to filter by
 * @param options - Unused, kept for API compatibility
 * @returns Array of random FormCombination objects (always returns exactly count items)
 */
export function getRandomFormCombinations(
  count: number,
  selectedForms?: number[],
  selectedConjugationTypes?: string[],
  _options = { strictMode: false, allowDisputed: true }
): FormCombination[] {
  const combinations: FormCombination[] = [];

  // Determine which forms to use
  const formsToUse = selectedForms && selectedForms.length > 0
    ? forms.filter(f => selectedForms.includes(f.formNumber))
    : forms;

  // Determine which conjugation types to use
  const conjugationTypesToUse = selectedConjugationTypes && selectedConjugationTypes.length > 0
    ? selectedConjugationTypes
    : conjugationTypes;

  // Generate exactly count combinations without validation
  for (let i = 0; i < count; i++) {
    // Random selection from available forms
    const randomForm = formsToUse[Math.floor(Math.random() * formsToUse.length)];

    // Random selection from filtered conjugation types
    const randomConjugationType = conjugationTypesToUse[Math.floor(Math.random() * conjugationTypesToUse.length)];

    // Check if this is a participle conjugation type
    const isParticiple = randomConjugationType.includes('اسم الفاعل') ||
                         randomConjugationType.includes('اسم المفعول');

    // Random selection from pronouns (only for non-participles)
    const randomPronoun = isParticiple ? '' : pronouns[Math.floor(Math.random() * pronouns.length)];

    // Pick a matching seegah from the same category
    const seegah = getRandomSeegah(conjugationTypesToUse);

    combinations.push({
      form: randomForm.form,
      formNumber: randomForm.formNumber,
      pattern: randomForm.pattern,
      pronoun: randomPronoun, // Will be empty string for participles
      conjugationType: randomConjugationType,
      seegah,
    });
  }

  return combinations;
}
