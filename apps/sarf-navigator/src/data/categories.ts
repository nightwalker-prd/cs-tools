import type { SarfCategory } from './types';

export const categories: SarfCategory[] = [
  {
    id: 'fundamentals',
    titleAr: 'أساسيات الصرف',
    titleEn: 'Fundamentals',
    icon: 'BookOpen',
    description: 'Core morphology: verb forms, tenses, categories, conjugation patterns.',
    subcategories: [
      {
        id: 'verb-structure',
        titleAr: 'بنية الفعل',
        titleEn: 'Verb Structure',
        topicIds: ['verb-forms', 'past-tense', 'present-tense'],
      },
      {
        id: 'verb-categories',
        titleAr: 'الأبواب',
        titleEn: 'Verb Categories',
        topicIds: ['abwab-overview', 'baab-fataha'],
      },
      {
        id: 'verb-operations',
        titleAr: 'أحكام الفعل',
        titleEn: 'Verb Operations',
        topicIds: ['passive-voice', 'negation-commands', 'participles', 'conjugation-patterns', 'irab-mudari'],
      },
    ],
  },
  {
    id: 'hamzah',
    titleAr: 'المهموز',
    titleEn: 'Hamzah Verbs',
    icon: 'Sparkles',
    description: 'Verbs with hamzah in their root: writing rules and conjugation patterns.',
    subcategories: [
      {
        id: 'hamzah-rules',
        titleAr: 'أحكام الهمزة',
        titleEn: 'Hamzah Rules',
        topicIds: ['hamzatul-wasl', 'hamzah-writing'],
      },
      {
        id: 'hamzah-conjugation',
        titleAr: 'تصريف المهموز',
        titleEn: 'Hamzah Conjugation',
        topicIds: ['hamzah-conjugation'],
      },
    ],
  },
  {
    id: 'weak-verbs',
    titleAr: 'المعتل',
    titleEn: 'Weak Verbs',
    icon: 'Waves',
    description: 'Verbs with weak root letters (و or ي), by position: initial, middle, final, double.',
    subcategories: [
      {
        id: 'mithaal',
        titleAr: 'المثال',
        titleEn: 'Mithaal — Initial Weak',
        topicIds: ['mithaal-waawi', 'mithaal-yaai'],
      },
      {
        id: 'ajwaf',
        titleAr: 'الأجوف',
        titleEn: 'Ajwaf — Hollow',
        topicIds: ['ajwaf-waawi', 'ajwaf-yaai'],
      },
      {
        id: 'naqis',
        titleAr: 'الناقص',
        titleEn: 'Naqis — Final Weak',
        topicIds: ['naqis-waawi', 'naqis-yaai'],
      },
      {
        id: 'lafif',
        titleAr: 'اللفيف',
        titleEn: 'Lafif — Double Weak',
        topicIds: ['lafif-maqrun', 'lafif-mafruq'],
      },
    ],
  },
  {
    id: 'doubled-complex',
    titleAr: 'المضاعف والمركب',
    titleEn: 'Doubled & Complex',
    icon: 'Layers',
    description: 'Doubled root verbs and complex combinations of weak and hamzah features.',
    subcategories: [
      {
        id: 'mudaaf',
        titleAr: 'المضاعف',
        titleEn: 'Doubled Verbs',
        topicIds: ['mudaaf-overview', 'mudaaf-idgham'],
      },
      {
        id: 'murakkab',
        titleAr: 'المركب',
        titleEn: 'Complex Verbs',
        topicIds: ['murakkab-overview', 'murakkab-mithaal', 'murakkab-ajwaf', 'murakkab-naqis'],
      },
    ],
  },
  {
    id: 'derived',
    titleAr: 'المزيد والمشتقات',
    titleEn: 'Derived Forms & Nouns',
    icon: 'PenTool',
    description: 'Enhanced verb forms (II-X), quadriliteral verbs, derived nouns, inflection patterns.',
    subcategories: [
      {
        id: 'verb-forms-enhanced',
        titleAr: 'أبواب المزيد',
        titleEn: 'Verb Forms',
        topicIds: ['thulathi-mujarrad', 'thulathi-mazid', 'rubaai-verbs', 'verb-classification'],
      },
      {
        id: 'derived-nouns',
        titleAr: 'المشتقات',
        titleEn: 'Derived Nouns',
        topicIds: ['sifah-mushabbahah', 'ism-tafdil', 'ism-dharf-aalah'],
      },
      {
        id: 'verb-inflection',
        titleAr: 'إعراب المضارع',
        titleEn: 'Verb Inflection',
        topicIds: ['mudari-mansoob', 'mudari-majzoom', 'noon-tawkeed'],
      },
    ],
  },
];
