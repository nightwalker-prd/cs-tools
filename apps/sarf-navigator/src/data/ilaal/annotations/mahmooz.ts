import type { IlaalStep } from '../types';

type AnnotationKey = string;

/** Annotations for hamzated-faa' verbs (like أَخَذَ) */
export const mahmoozFaaAnnotations: Record<AnnotationKey, IlaalStep[]> = {
  'present-active:أَنَا': [
    {
      before: 'أَأْخُذُ',
      after: 'آخُذُ',
      ruleType: 'takhfeef',
      ruleNameAr: 'تخفيف',
      explanation: "Two hamzas meet (pattern hamza + root hamza) → madd alif: أَأْ → آ",
      affectedPosition: 'faa',
    },
  ],
  'imperative:أَنْتَ': [
    {
      before: 'اُؤْخُذْ',
      after: 'خُذْ',
      ruleType: 'takhfeef',
      ruleNameAr: 'حذف شاذ',
      explanation: "Irregular deletion of the hamza in the imperative of أَخَذَ (common verb exception).",
      affectedPosition: 'faa',
    },
  ],
};

/** Annotations for hamzated-'ayn verbs (like سَأَلَ) */
export const mahmoozAynAnnotations: Record<AnnotationKey, IlaalStep[]> = {
  'past-active:هُوَ': [
    {
      before: 'سَأَلَ',
      after: 'سَأَلَ',
      ruleType: 'takhfeef',
      ruleNameAr: 'لا تغيير',
      explanation: "No i'laal in the past tense — hamza stays in its standard position.",
      affectedPosition: 'ayn',
    },
  ],
};

/** Annotations for hamzated-laam verbs (like قَرَأَ) */
export const mahmoozLamAnnotations: Record<AnnotationKey, IlaalStep[]> = {
  'past-active:هُوَ': [
    {
      before: 'قَرَأَ',
      after: 'قَرَأَ',
      ruleType: 'takhfeef',
      ruleNameAr: 'لا تغيير',
      explanation: "No i'laal in the past — hamza stays as laam of the root.",
      affectedPosition: 'lam',
    },
  ],
};
