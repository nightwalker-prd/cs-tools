import type { IlaalRuleType } from './types';

export interface RuleDefinition {
  id: string;
  type: IlaalRuleType;
  nameAr: string;
  nameEn: string;
  description: string;
}

/**
 * Registry of named i'laal rules.
 * Each rule has a unique ID, type, and bilingual name/description.
 */
export const rulesRegistry: Record<string, RuleDefinition> = {
  // Qalb rules
  'qalb-ayn-to-alif': {
    id: 'qalb-ayn-to-alif',
    type: 'qalb',
    nameAr: 'قلب العين ألفًا',
    nameEn: "Flip 'ayn to alif",
    description: "The weak 'ayn (waaw/yaa') is flipped to alif when preceded by fathah.",
  },
  'qalb-lam-to-alif': {
    id: 'qalb-lam-to-alif',
    type: 'qalb',
    nameAr: 'قلب اللام ألفًا',
    nameEn: 'Flip laam to alif',
    description: "The weak laam (waaw/yaa') is flipped to alif when preceded by fathah.",
  },
  'qalb-ayn-to-hamza': {
    id: 'qalb-ayn-to-hamza',
    type: 'qalb',
    nameAr: 'قلب العين همزةً',
    nameEn: "Flip 'ayn to hamza",
    description: "In the active participle, the weak 'ayn becomes hamza after alif.",
  },
  'qalb-waaw-to-yaa': {
    id: 'qalb-waaw-to-yaa',
    type: 'qalb',
    nameAr: 'قلب الواو ياءً',
    nameEn: 'Flip waaw to yaa',
    description: 'Waaw is flipped to yaa when preceded by kasrah.',
  },

  // Naql rules
  'naql-vowel-transfer': {
    id: 'naql-vowel-transfer',
    type: 'naql',
    nameAr: 'نقل الحركة',
    nameEn: 'Transfer vowel',
    description: "The vowel on the weak letter transfers to the preceding sakin consonant.",
  },
  'naql-dammah-transfer': {
    id: 'naql-dammah-transfer',
    type: 'naql',
    nameAr: 'نقل الضمة',
    nameEn: 'Transfer dammah',
    description: 'Dammah on the weak letter transfers to the preceding consonant.',
  },
  'naql-kasrah-transfer': {
    id: 'naql-kasrah-transfer',
    type: 'naql',
    nameAr: 'نقل الكسرة',
    nameEn: 'Transfer kasrah',
    description: 'Kasrah on the weak letter transfers to the preceding consonant.',
  },

  // Hadhf rules
  'hadhf-with-pronoun': {
    id: 'hadhf-with-pronoun',
    type: 'hadhf',
    nameAr: 'حذف مع الضمير',
    nameEn: 'Delete with pronoun',
    description: 'The weak letter is deleted when a voweled pronoun suffix is attached.',
  },
  'hadhf-two-sakins': {
    id: 'hadhf-two-sakins',
    type: 'hadhf',
    nameAr: 'حذف لالتقاء الساكنين',
    nameEn: 'Delete for two sakins',
    description: 'The weak letter is deleted to avoid two consecutive sakin letters.',
  },
  'hadhf-with-jazm': {
    id: 'hadhf-with-jazm',
    type: 'hadhf',
    nameAr: 'حذف مع الجزم',
    nameEn: 'Delete with jazm',
    description: "The weak 'ayn/laam is deleted when jazm is applied to the present tense.",
  },
  'hadhf-faa-mithaal': {
    id: 'hadhf-faa-mithaal',
    type: 'hadhf',
    nameAr: 'حذف فاء المثال',
    nameEn: 'Delete assimilated faa',
    description: "The waaw (faa') is deleted in the present tense when the 'ayn has kasrah.",
  },
  'hadhf-lam-with-tanween': {
    id: 'hadhf-lam-with-tanween',
    type: 'hadhf',
    nameAr: 'حذف اللام مع التنوين',
    nameEn: 'Delete laam with tanween',
    description: 'The weak laam is deleted when followed by tanween in active participle.',
  },
  'hadhf-lam-with-plural': {
    id: 'hadhf-lam-with-plural',
    type: 'hadhf',
    nameAr: 'حذف اللام مع الجمع',
    nameEn: 'Delete laam with plural',
    description: 'The weak laam is deleted before the plural waaw/yaa suffix.',
  },

  // Taskeen rules
  'taskeen-lam': {
    id: 'taskeen-lam',
    type: 'taskeen',
    nameAr: 'تسكين اللام',
    nameEn: 'Quiesce laam',
    description: 'The vowel on the weak laam is dropped, making it sakin.',
  },

  // Idghaam rules
  'idghaam-obligatory': {
    id: 'idghaam-obligatory',
    type: 'idghaam',
    nameAr: 'إدغام واجب',
    nameEn: 'Obligatory assimilation',
    description: 'Two identical letters merge obligatorily into one with shaddah.',
  },
  'idghaam-passive-participle': {
    id: 'idghaam-passive-participle',
    type: 'idghaam',
    nameAr: 'إدغام في المفعول',
    nameEn: 'Assimilation in passive participle',
    description: 'Two identical weak letters merge in the passive participle pattern.',
  },
  'idghaam-iftiaal-taa': {
    id: 'idghaam-iftiaal-taa',
    type: 'idghaam',
    nameAr: 'إدغام تاء الافتعال',
    nameEn: "Form VIII taa' assimilation",
    description: "The waaw of assimilated verbs becomes taa' and merges with Form VIII's taa'.",
  },

  // Takhfeef rules
  'takhfeef-hamza': {
    id: 'takhfeef-hamza',
    type: 'takhfeef',
    nameAr: 'تخفيف الهمزة',
    nameEn: 'Lighten hamza',
    description: 'The hamza is lightened (eased) when two hamzas would meet.',
  },
  'takhfeef-hamza-deletion': {
    id: 'takhfeef-hamza-deletion',
    type: 'takhfeef',
    nameAr: 'حذف الهمزة تخفيفًا',
    nameEn: 'Delete hamza (lightening)',
    description: 'The hamza is entirely deleted for ease of pronunciation (irregular).',
  },

  // Ibdaal rules
  'ibdaal-waaw-to-taa': {
    id: 'ibdaal-waaw-to-taa',
    type: 'ibdaal',
    nameAr: 'إبدال الواو تاءً',
    nameEn: "Replace waaw with taa'",
    description: "Waaw is replaced by taa' in Form VIII of assimilated verbs.",
  },

  // Ta'weed rules
  "ta'weed-taa-marbuuta": {
    id: "ta'weed-taa-marbuuta",
    type: "ta'weed",
    nameAr: 'تعويض بتاء التأنيث',
    nameEn: "Compensate with taa' marbuuta",
    description: "A taa' marbuuta is added to compensate for the deleted weak letter.",
  },
};
