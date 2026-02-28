import type { SarfCategory } from './types';

export const classicCategories: SarfCategory[] = [
  {
    id: 'cl-introduction',
    titleAr: 'المقدمة',
    titleEn: 'Introduction',
    icon: 'BookOpen',
    description: 'Foundational concepts: word types, verb categories, morphological scale, and core principles.',
    subcategories: [
      {
        id: 'cl-word-fundamentals',
        titleAr: 'أساسيات الكلمة',
        titleEn: 'Word Fundamentals',
        topicIds: ['cl-word-types', 'cl-verb-categories'],
      },
      {
        id: 'cl-morphology-basics',
        titleAr: 'أساسيات الصرف',
        titleEn: 'Morphology Basics',
        topicIds: ['cl-morphological-scale', 'cl-foundational-principles'],
      },
    ],
  },
  {
    id: 'cl-verb-paradigms',
    titleAr: 'أبواب الفعل',
    titleEn: 'Verb Paradigms',
    icon: 'Layers',
    description: 'The six trilateral doors and augmented verb patterns for trilateral and quadrilateral roots.',
    subcategories: [
      {
        id: 'cl-bare-trilateral',
        titleAr: 'الثلاثي المجرد',
        titleEn: 'Bare Trilateral',
        topicIds: ['cl-six-trilateral-doors'],
      },
      {
        id: 'cl-augmented-trilateral',
        titleAr: 'الثلاثي المزيد',
        titleEn: 'Augmented Trilateral',
        topicIds: ['cl-augmented-one', 'cl-augmented-two', 'cl-augmented-three'],
      },
      {
        id: 'cl-quadrilateral',
        titleAr: 'الرباعي',
        titleEn: 'Quadrilateral',
        topicIds: ['cl-quadrilateral-verbs'],
      },
    ],
  },
  {
    id: 'cl-derivatives',
    titleAr: 'المشتقات',
    titleEn: 'Derivatives',
    icon: 'PenTool',
    description: 'Verbal nouns, tense conjugations, imperative/prohibition, and the ten derived noun types.',
    subcategories: [
      {
        id: 'cl-verbal-nouns',
        titleAr: 'المصادر',
        titleEn: 'Verbal Nouns',
        topicIds: ['cl-masdar'],
      },
      {
        id: 'cl-tenses',
        titleAr: 'الأزمنة',
        titleEn: 'Tenses',
        topicIds: ['cl-past-tense', 'cl-present-tense', 'cl-imperative-prohibition'],
      },
      {
        id: 'cl-derived-nouns',
        titleAr: 'الأسماء المشتقة',
        titleEn: 'Derived Nouns',
        topicIds: ['cl-derived-nouns'],
      },
    ],
  },
  {
    id: 'cl-seven-categories',
    titleAr: 'الأقسام السبعة',
    titleEn: 'Seven Categories',
    icon: 'Zap',
    description: 'Sound, doubled, weak (assimilated, hollow, defective, doubly-weak), and hamzated verbs.',
    subcategories: [
      {
        id: 'cl-sound-doubled',
        titleAr: 'الصحيح والمضاعف',
        titleEn: 'Sound & Doubled',
        topicIds: ['cl-sound-verb', 'cl-doubled-verb'],
      },
      {
        id: 'cl-weak-verbs',
        titleAr: 'المعتل',
        titleEn: 'Weak Verbs',
        topicIds: ['cl-assimilated-verb', 'cl-hollow-verb', 'cl-defective-verb', 'cl-doubly-weak-verb'],
      },
      {
        id: 'cl-hamzated',
        titleAr: 'المهموز',
        titleEn: 'Hamzated',
        topicIds: ['cl-hamzated-verb'],
      },
      {
        id: 'cl-ilaal-reference',
        titleAr: 'الإعلال',
        titleEn: "I'laal Reference",
        topicIds: ['cl-ilaal-overview', 'cl-ilaal-augmented-forms'],
      },
    ],
  },
];
