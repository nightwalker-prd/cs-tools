import type { IlaalStep } from '../types';

type AnnotationKey = string;

/** Annotations for waawi assimilated verbs (like وَعَدَ/يَعِدُ) */
export const mithaalWaawiAnnotations: Record<AnnotationKey, IlaalStep[]> = {
  'present-active:هُوَ': [
    {
      before: 'يَوْعِدُ',
      after: 'يَعِدُ',
      ruleType: 'hadhf',
      ruleNameAr: 'حذف',
      explanation: "The waaw (faa') is deleted in the present tense when the 'ayn has kasrah.",
      affectedPosition: 'faa',
    },
  ],
  'present-active:هُمْ': [
    {
      before: 'يَوْعِدُونَ',
      after: 'يَعِدُونَ',
      ruleType: 'hadhf',
      ruleNameAr: 'حذف',
      explanation: "Same deletion of waaw applies in all present tense forms with kasrah on 'ayn.",
      affectedPosition: 'faa',
    },
  ],
  'present-active:أَنَا': [
    {
      before: 'أَوْعِدُ',
      after: 'أَعِدُ',
      ruleType: 'hadhf',
      ruleNameAr: 'حذف',
      explanation: "Waaw deleted in first person present as well.",
      affectedPosition: 'faa',
    },
  ],
  'imperative:أَنْتَ': [
    {
      before: 'اِوْعِدْ',
      after: 'عِدْ',
      ruleType: 'hadhf',
      ruleNameAr: 'حذف',
      explanation: "Waaw deleted in the imperative (derived from jussive). Hamzat al-wasl also drops.",
      affectedPosition: 'faa',
    },
  ],
  'masdar:': [
    {
      before: 'وَعْدٌ',
      after: 'عِدَةٌ',
      ruleType: "ta'weed",
      ruleNameAr: 'تعويض',
      explanation: "Waaw is deleted and compensated with taa' marbuuta: وَعْدٌ → عِدَةٌ",
      affectedPosition: 'faa',
    },
  ],
};

/** Annotations for yaa'i assimilated verbs (like يَسَرَ/يَيْسِرُ) */
export const mithaalYaaiAnnotations: Record<AnnotationKey, IlaalStep[]> = {
  'present-active:هُوَ': [
    {
      before: 'يَيْسِرُ',
      after: 'يَيْسِرُ',
      ruleType: 'naql',
      ruleNameAr: 'لا تغيير',
      explanation: "Yaa'i assimilated verbs generally do NOT delete the yaa' in the present — it stays.",
      affectedPosition: 'faa',
    },
  ],
};
