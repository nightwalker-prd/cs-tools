import type { IlaalStep } from '../types';

type AnnotationKey = string; // "sectionId:pronoun"

/**
 * Hand-authored annotations for hollow (ajwaf) verbs in Form I.
 * Key format: "sectionId:pronoun" (pronoun can be empty for single-slot sections)
 */
export const ajwafAnnotations: Record<AnnotationKey, IlaalStep[]> = {
  // Past tense - 3rd masc singular
  'past-active:هُوَ': [
    {
      before: 'قَوَلَ',
      after: 'قَالَ',
      ruleType: 'qalb',
      ruleNameAr: 'قلب',
      explanation: "The waaw (middle radical) preceded by fathah flips to alif: وَ → ا",
      affectedPosition: 'ayn',
    },
  ],
  // Past tense - 1st singular (with voweled pronoun)
  'past-active:أَنَا': [
    {
      before: 'قَوَلْتُ',
      after: 'قُلْتُ',
      ruleType: 'hadhf',
      ruleNameAr: 'حذف',
      explanation: "The waaw is deleted when a voweled pronoun attaches. Dammah on faa' indicates original waaw.",
      affectedPosition: 'ayn',
    },
  ],
  // Past tense - 3rd masc plural
  'past-active:هُمْ': [
    {
      before: 'قَوَلُوا',
      after: 'قَالُوا',
      ruleType: 'qalb',
      ruleNameAr: 'قلب',
      explanation: "Waaw flips to alif (same qalb as 3ms), then plural waaw suffix attaches normally.",
      affectedPosition: 'ayn',
    },
  ],
  // Present active - 3rd masc singular
  'present-active:هُوَ': [
    {
      before: 'يَقْوُلُ',
      after: 'يَقُوْلُ',
      ruleType: 'naql',
      ruleNameAr: 'نقل',
      explanation: "Dammah transfers from waaw to the preceding sakin qaf: يَقْوُلُ → يَقُوْلُ",
      affectedPosition: 'ayn',
    },
  ],
  // Masdar
  'masdar:': [
    {
      before: 'قَوْلٌ',
      after: 'قَوْلٌ',
      ruleType: 'naql',
      ruleNameAr: 'لا تغيير',
      explanation: "The masdar qawl keeps its waaw — no i'laal in this pattern.",
      affectedPosition: 'ayn',
    },
  ],
  // Active participle
  'ism-faail:': [
    {
      before: 'قَاوِلٌ',
      after: 'قَائِلٌ',
      ruleType: 'qalb',
      ruleNameAr: 'قلب',
      explanation: "The waaw after alif of the participle pattern flips to hamza: قَاوِلٌ → قَائِلٌ",
      affectedPosition: 'ayn',
    },
  ],
  // Passive participle
  'ism-mafool:': [
    {
      before: 'مَقْوُولٌ',
      after: 'مَقُولٌ',
      ruleType: 'naql',
      ruleNameAr: 'نقل + حذف',
      explanation: "Naql transfers dammah to qaf, then one of the two waaws is deleted: مَقْوُولٌ → مَقُولٌ",
      affectedPosition: 'ayn',
    },
  ],
};

/** Annotations for yaa'i hollow verbs (like بَاعَ/يَبِيعُ) */
export const ajwafYaaiAnnotations: Record<AnnotationKey, IlaalStep[]> = {
  'past-active:هُوَ': [
    {
      before: 'بَيَعَ',
      after: 'بَاعَ',
      ruleType: 'qalb',
      ruleNameAr: 'قلب',
      explanation: "The yaa' (middle radical) preceded by fathah flips to alif: يَ → ا",
      affectedPosition: 'ayn',
    },
  ],
  'past-active:أَنَا': [
    {
      before: 'بَيَعْتُ',
      after: 'بِعْتُ',
      ruleType: 'hadhf',
      ruleNameAr: 'حذف',
      explanation: "The yaa' is deleted with voweled pronoun. Kasrah on faa' indicates original yaa'.",
      affectedPosition: 'ayn',
    },
  ],
  'present-active:هُوَ': [
    {
      before: 'يَبْيِعُ',
      after: 'يَبِيْعُ',
      ruleType: 'naql',
      ruleNameAr: 'نقل',
      explanation: "Kasrah transfers from yaa' to the preceding sakin baa': يَبْيِعُ → يَبِيعُ",
      affectedPosition: 'ayn',
    },
  ],
  'ism-faail:': [
    {
      before: 'بَايِعٌ',
      after: 'بَائِعٌ',
      ruleType: 'qalb',
      ruleNameAr: 'قلب',
      explanation: "The yaa' after alif of the participle flips to hamza: بَايِعٌ → بَائِعٌ",
      affectedPosition: 'ayn',
    },
  ],
  'ism-mafool:': [
    {
      before: 'مَبْيُوعٌ',
      after: 'مَبِيعٌ',
      ruleType: 'naql',
      ruleNameAr: 'نقل + قلب',
      explanation: "Naql transfers dammah, then yaa' + waaw resolve: مَبْيُوعٌ → مَبِيعٌ",
      affectedPosition: 'ayn',
    },
  ],
};
