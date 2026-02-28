import type { IlaalStep } from '../types';

type AnnotationKey = string;

/** Annotations for waawi defective verbs (like دَعَا/يَدْعُو) */
export const naaqisWaawiAnnotations: Record<AnnotationKey, IlaalStep[]> = {
  'past-active:هُوَ': [
    {
      before: 'دَعَوَ',
      after: 'دَعَا',
      ruleType: 'qalb',
      ruleNameAr: 'قلب',
      explanation: "The waaw (laam) preceded by fathah flips to alif: دَعَوَ → دَعَا",
      affectedPosition: 'lam',
    },
  ],
  'past-active:هُمْ': [
    {
      before: 'دَعَوُوا',
      after: 'دَعَوْا',
      ruleType: 'hadhf',
      ruleNameAr: 'حذف',
      explanation: "The laam's vowel drops (taskeen), then deletion occurs to avoid two sakins before plural waaw.",
      affectedPosition: 'lam',
    },
  ],
  'present-active:هُوَ': [
    {
      before: 'يَدْعُوُ',
      after: 'يَدْعُو',
      ruleType: 'taskeen',
      ruleNameAr: 'تسكين',
      explanation: "The heavy dammah on the waaw is dropped (quiesced): يَدْعُوُ → يَدْعُو",
      affectedPosition: 'lam',
    },
  ],
  'present-active:هُمْ': [
    {
      before: 'يَدْعُوُونَ',
      after: 'يَدْعُونَ',
      ruleType: 'hadhf',
      ruleNameAr: 'حذف',
      explanation: "The laam (waaw) is deleted before the plural waaw suffix: يَدْعُوُونَ → يَدْعُونَ",
      affectedPosition: 'lam',
    },
  ],
  'ism-faail:': [
    {
      before: 'دَاعِوٌ',
      after: 'دَاعٍ',
      ruleType: 'hadhf',
      ruleNameAr: 'حذف',
      explanation: "Waaw flips to yaa', then yaa' is deleted with tanween: دَاعِوٌ → دَاعِيٌ → دَاعٍ",
      affectedPosition: 'lam',
    },
  ],
  'ism-mafool:': [
    {
      before: 'مَدْعُوْوٌ',
      after: 'مَدْعُوٌّ',
      ruleType: 'idghaam',
      ruleNameAr: 'إدغام',
      explanation: "Two waaws merge into one with shaddah: مَدْعُوْوٌ → مَدْعُوٌّ",
      affectedPosition: 'lam',
    },
  ],
};

/** Annotations for yaa'i defective verbs (like رَمَى/يَرْمِي) */
export const naaqisYaaiAnnotations: Record<AnnotationKey, IlaalStep[]> = {
  'past-active:هُوَ': [
    {
      before: 'رَمَيَ',
      after: 'رَمَى',
      ruleType: 'qalb',
      ruleNameAr: 'قلب',
      explanation: "The yaa' (laam) preceded by fathah flips to alif maqsoorah: رَمَيَ → رَمَى",
      affectedPosition: 'lam',
    },
  ],
  'past-active:هُمْ': [
    {
      before: 'رَمَيُوا',
      after: 'رَمَوْا',
      ruleType: 'hadhf',
      ruleNameAr: 'حذف',
      explanation: "The yaa' changes to waaw before the plural suffix, with deletion for ease.",
      affectedPosition: 'lam',
    },
  ],
  'present-active:هُوَ': [
    {
      before: 'يَرْمِيُ',
      after: 'يَرْمِي',
      ruleType: 'taskeen',
      ruleNameAr: 'تسكين',
      explanation: "The dammah on the yaa' is dropped (quiesced): يَرْمِيُ → يَرْمِي",
      affectedPosition: 'lam',
    },
  ],
  'present-active:هُمْ': [
    {
      before: 'يَرْمِيُونَ',
      after: 'يَرْمُونَ',
      ruleType: 'hadhf',
      ruleNameAr: 'حذف',
      explanation: "The yaa' is deleted and the kasrah changes to dammah before plural waaw.",
      affectedPosition: 'lam',
    },
  ],
  'ism-faail:': [
    {
      before: 'رَامِيٌ',
      after: 'رَامٍ',
      ruleType: 'hadhf',
      ruleNameAr: 'حذف',
      explanation: "The yaa' is deleted with tanween: رَامِيٌ → رَامٍ",
      affectedPosition: 'lam',
    },
  ],
  'ism-mafool:': [
    {
      before: 'مَرْمُوْيٌ',
      after: 'مَرْمِيٌّ',
      ruleType: 'qalb',
      ruleNameAr: 'قلب + إدغام',
      explanation: "Waaw flips to yaa' (due to kasrah environment), then two yaa's merge: مَرْمُوْيٌ → مَرْمِيٌّ",
      affectedPosition: 'lam',
    },
  ],
};
