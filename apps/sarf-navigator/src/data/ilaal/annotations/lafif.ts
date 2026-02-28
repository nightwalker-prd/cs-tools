import type { IlaalStep } from '../types';

type AnnotationKey = string;

/** Annotations for lafif maqroon (joined: 'ayn + laam weak, like طَوَى) */
export const lafifMaqroonAnnotations: Record<AnnotationKey, IlaalStep[]> = {
  'past-active:هُوَ': [
    {
      before: 'طَوَيَ',
      after: 'طَوَى',
      ruleType: 'qalb',
      ruleNameAr: 'قلب',
      explanation: "The laam (yaa') flips to alif maqsoorah (following defective verb rules). The 'ayn (waaw) is NOT changed.",
      affectedPosition: 'lam',
    },
  ],
  'present-active:هُوَ': [
    {
      before: 'يَطْوِيُ',
      after: 'يَطْوِي',
      ruleType: 'taskeen',
      ruleNameAr: 'تسكين',
      explanation: "The laam (yaa') has its vowel dropped (taskeen). The 'ayn (waaw) stays unchanged.",
      affectedPosition: 'lam',
    },
  ],
  'ism-faail:': [
    {
      before: 'طَاوِيٌ',
      after: 'طَاوٍ',
      ruleType: 'hadhf',
      ruleNameAr: 'حذف',
      explanation: "The laam (yaa') is deleted with tanween (following defective verb rules).",
      affectedPosition: 'lam',
    },
  ],
};

/** Annotations for lafif mafrooq (separated: faa' + laam weak, like وَقَى) */
export const lafifMafrooqAnnotations: Record<AnnotationKey, IlaalStep[]> = {
  'past-active:هُوَ': [
    {
      before: 'وَقَيَ',
      after: 'وَقَى',
      ruleType: 'qalb',
      ruleNameAr: 'قلب',
      explanation: "The laam (yaa') flips to alif (defective verb rule). The faa' (waaw) stays in the past tense (assimilated verb rule).",
      affectedPosition: 'lam',
    },
  ],
  'present-active:هُوَ': [
    {
      before: 'يَوْقِيُ',
      after: 'يَقِي',
      ruleType: 'hadhf',
      ruleNameAr: 'حذف + تسكين',
      explanation: "The faa' (waaw) is deleted (assimilated verb rule), and the laam (yaa') has its vowel dropped (defective verb rule).",
      affectedPosition: 'general',
    },
  ],
  'imperative:أَنْتَ': [
    {
      before: 'اِوْقِ',
      after: 'قِ',
      ruleType: 'hadhf',
      ruleNameAr: 'حذف',
      explanation: "Both the waaw (faa') and hamzat al-wasl are deleted, leaving just the strong middle letter.",
      affectedPosition: 'faa',
    },
  ],
};
