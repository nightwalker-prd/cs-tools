import type { IlaalStep } from '../types';

type AnnotationKey = string;

/** Annotations for doubled (mudaa'af) verbs (like رَدَّ/يَرُدُّ) */
export const mudaafAnnotations: Record<AnnotationKey, IlaalStep[]> = {
  'past-active:هُوَ': [
    {
      before: 'رَدَدَ',
      after: 'رَدَّ',
      ruleType: 'idghaam',
      ruleNameAr: 'إدغام',
      explanation: "Two identical dals merge into one with shaddah: رَدَدَ → رَدَّ (obligatory idghaam).",
      affectedPosition: 'lam',
    },
  ],
  'past-active:أَنَا': [
    {
      before: 'رَدَدْتُ',
      after: 'رَدَدْتُ',
      ruleType: 'idghaam',
      ruleNameAr: 'ممتنع',
      explanation: "Idghaam is PROHIBITED when a voweled pronoun suffix attaches: رَدَدْتُ stays as-is.",
      affectedPosition: 'lam',
    },
  ],
  'past-active:هُمْ': [
    {
      before: 'رَدَدُوا',
      after: 'رَدُّوا',
      ruleType: 'idghaam',
      ruleNameAr: 'إدغام',
      explanation: "Idghaam occurs before the plural suffix: رَدَدُوا → رَدُّوا.",
      affectedPosition: 'lam',
    },
  ],
  'present-active:هُوَ': [
    {
      before: 'يَرْدُدُ',
      after: 'يَرُدُّ',
      ruleType: 'naql',
      ruleNameAr: 'نقل + إدغام',
      explanation: "Vowel transfers (naql) from second dal to raa', then idghaam: يَرْدُدُ → يَرُدُّ.",
      affectedPosition: 'lam',
    },
  ],
  'present-active:هُنَّ': [
    {
      before: 'يَرْدُدْنَ',
      after: 'يَرْدُدْنَ',
      ruleType: 'idghaam',
      ruleNameAr: 'ممتنع',
      explanation: "Idghaam is prohibited in the feminine plural: يَرْدُدْنَ stays unmerged.",
      affectedPosition: 'lam',
    },
  ],
  'imperative:أَنْتَ': [
    {
      before: 'اُرْدُدْ',
      after: 'رُدَّ',
      ruleType: 'idghaam',
      ruleNameAr: 'إدغام',
      explanation: "Idghaam with hamzat al-wasl dropped. Both رُدَّ and رُدْ are permissible.",
      affectedPosition: 'lam',
    },
  ],
  'ism-faail:': [
    {
      before: 'رَادِدٌ',
      after: 'رَادٌّ',
      ruleType: 'idghaam',
      ruleNameAr: 'إدغام',
      explanation: "Active participle: obligatory idghaam → رَادِدٌ → رَادٌّ.",
      affectedPosition: 'lam',
    },
  ],
  'ism-mafool:': [
    {
      before: 'مَرْدُودٌ',
      after: 'مَرْدُودٌ',
      ruleType: 'idghaam',
      ruleNameAr: 'ممتنع',
      explanation: "Passive participle: idghaam PROHIBITED. مَرْدُودٌ keeps both dals separated by waaw.",
      affectedPosition: 'lam',
    },
  ],
};
