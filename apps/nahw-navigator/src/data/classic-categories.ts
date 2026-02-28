import type { NahwCategory } from './types';

export const classicCategories: NahwCategory[] = [
  {
    id: 'introduction',
    titleAr: 'المقدمة',
    titleEn: 'Introduction',
    icon: 'BookOpen',
    description: 'Foundational concepts: word types, sentence structures, and grammatical overview.',
    subcategories: [
      {
        id: 'word-types',
        titleAr: 'أقسام الكلمة',
        titleEn: 'Word Types',
        topicIds: ['word-types'],
      },
      {
        id: 'sentence-types',
        titleAr: 'أنواع الجملة',
        titleEn: 'Sentence Types',
        topicIds: ['nominal-sentence', 'verbal-sentence'],
      },
    ],
  },
  {
    id: 'operator',
    titleAr: 'العامل',
    titleEn: 'The Operator',
    icon: 'Zap',
    description: 'Grammatical agents that govern case endings: verbs, particles, and nouns.',
    subcategories: [
      {
        id: 'operator-verbs',
        titleAr: 'الفعل العامل',
        titleEn: 'Verb Operators',
        topicIds: ['transitive-intransitive', 'kana-and-sisters', 'inna-and-sisters'],
      },
      {
        id: 'operator-particles',
        titleAr: 'الحرف العامل',
        titleEn: 'Particle Operators',
        topicIds: ['prepositions', 'nasb-particles', 'jazm-particles'],
      },
      {
        id: 'operator-nouns',
        titleAr: 'الاسم العامل والمعنوي',
        titleEn: 'Noun & Semantic Operators',
        topicIds: ['noun-as-operator', 'semantic-operator'],
      },
    ],
  },
  {
    id: 'governed',
    titleAr: 'المعمول',
    titleEn: 'The Governed Element',
    icon: 'Target',
    description: 'Words that receive grammatical case: subjects, objects, and followers.',
    subcategories: [
      {
        id: 'nominative',
        titleAr: 'المرفوعات',
        titleEn: 'Nominative',
        topicIds: ['fail', 'mubtada-khabar', 'naib-al-fail'],
      },
      {
        id: 'accusative',
        titleAr: 'المنصوبات',
        titleEn: 'Accusative',
        topicIds: ['maf-ul-bih', 'hal', 'tamyiz', 'maf-ul-mutlaq', 'maf-ul-fihi', 'maf-ul-lahu', 'maf-ul-ma-ahu', 'mustathna'],
      },
      {
        id: 'genitive',
        titleAr: 'المجرورات',
        titleEn: 'Genitive',
        topicIds: ['mudaf-ilayhi'],
      },
      {
        id: 'following',
        titleAr: 'التوابع',
        titleEn: 'Followers',
        topicIds: ['na-t', 'tawkid', 'atf', 'badal'],
      },
    ],
  },
  {
    id: 'irab',
    titleAr: 'الإعراب',
    titleEn: 'Case Endings',
    icon: 'PenTool',
    description: 'Signs of grammatical inflection: vowels, letters, and special categories.',
    subcategories: [
      {
        id: 'irab-signs',
        titleAr: 'علامات الإعراب',
        titleEn: "I'rab Signs",
        topicIds: ['irab-signs'],
      },
      {
        id: 'special-irab',
        titleAr: 'إعراب خاص',
        titleEn: 'Special Cases',
        topicIds: ['five-nouns', 'sound-plurals-dual'],
      },
    ],
  },
];
