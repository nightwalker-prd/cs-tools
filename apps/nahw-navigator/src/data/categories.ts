import type { NahwCategory } from './types';

export const categories: NahwCategory[] = [
  {
    id: 'words',
    titleAr: 'الكلمات',
    titleEn: 'Words',
    icon: 'BookOpen',
    description: 'Word types, noun characteristics, verb properties, and particles.',
    subcategories: [
      {
        id: 'word-types',
        titleAr: 'أقسام الكلمة',
        titleEn: 'Word Types',
        topicIds: ['word-types'],
      },
      {
        id: 'noun-characteristics',
        titleAr: 'خصائص الاسم',
        titleEn: 'Noun Characteristics',
        topicIds: ['definite-indefinite', 'gender', 'number', 'noun-irab', 'diptotes'],
      },
      {
        id: 'verb-characteristics',
        titleAr: 'خصائص الفعل',
        titleEn: 'Verb Characteristics',
        topicIds: ['verb-tense', 'verb-irab', 'verb-negation', 'verb-gender-voice'],
      },
      {
        id: 'particles-and-derived',
        titleAr: 'الحروف والمشتقات',
        titleEn: 'Particles & Derived Forms',
        topicIds: ['particles', 'masdar-derived'],
      },
    ],
  },
  {
    id: 'sentences',
    titleAr: 'الجمل',
    titleEn: 'Sentences',
    icon: 'AlignLeft',
    description: 'Nominal and verbal sentences, objects, adverbs, and state.',
    subcategories: [
      {
        id: 'nominal-sentence',
        titleAr: 'الجملة الاسمية',
        titleEn: 'Nominal Sentence',
        topicIds: ['nominal-sentence', 'kana-and-sisters', 'inna-and-sisters'],
      },
      {
        id: 'verbal-sentence',
        titleAr: 'الجملة الفعلية',
        titleEn: 'Verbal Sentence',
        topicIds: ['verbal-sentence', 'maf-ul-bih', 'naib-al-fail'],
      },
      {
        id: 'adverbs-state',
        titleAr: 'الظروف والحال',
        titleEn: 'Adverbs & State',
        topicIds: ['maf-ul-fihi', 'maf-ul-mutlaq', 'maf-ul-lahu', 'hal', 'tamyiz', 'mustathna', 'maf-ul-ma-ahu'],
      },
    ],
  },
  {
    id: 'phrases',
    titleAr: 'التراكيب',
    titleEn: 'Phrases',
    icon: 'Link',
    description: 'Descriptive, possessive, conjunctive phrases, and number constructions.',
    subcategories: [
      {
        id: 'descriptive-demonstrative',
        titleAr: 'النعت والإشارة',
        titleEn: 'Descriptive & Demonstrative',
        topicIds: ['na-t', 'demonstrative-phrases'],
      },
      {
        id: 'conjunctive-appositive',
        titleAr: 'العطف والبدل',
        titleEn: 'Conjunctive & Appositive',
        topicIds: ['atf', 'badal'],
      },
      {
        id: 'possessive-prepositional',
        titleAr: 'الإضافة والجر',
        titleEn: 'Possessive & Prepositional',
        topicIds: ['mudaf-ilayhi', 'prepositions', 'shibh-al-jumla'],
      },
      {
        id: 'number-phrases',
        titleAr: 'تراكيب العدد',
        titleEn: 'Number Phrases',
        topicIds: ['number-phrases'],
      },
    ],
  },
  {
    id: 'pronouns',
    titleAr: 'الضمائر',
    titleEn: 'Pronouns',
    icon: 'User',
    description: 'Personal pronouns, interrogative pronouns, and emphasis.',
    subcategories: [
      {
        id: 'personal-pronouns',
        titleAr: 'الضمائر الشخصية',
        titleEn: 'Personal Pronouns',
        topicIds: ['damir-marfu', 'damir-mansub', 'damir-majrur'],
      },
      {
        id: 'interrogative-pronouns',
        titleAr: 'أسماء الاستفهام',
        titleEn: 'Interrogative Pronouns',
        topicIds: ['harf-istifham', 'ism-istifham'],
      },
      {
        id: 'emphasis',
        titleAr: 'التوكيد',
        titleEn: 'Emphasis',
        topicIds: ['tawkid'],
      },
    ],
  },
  {
    id: 'nested-sentences',
    titleAr: 'الجمل المتداخلة',
    titleEn: 'Nested Sentences',
    icon: 'Layers',
    description: 'Small sentences, relative pronouns, and conjunction particles.',
    subcategories: [
      {
        id: 'direct-nesting',
        titleAr: 'الجملة الصغرى',
        titleEn: 'Direct Nesting',
        topicIds: ['jumla-sughra'],
      },
      {
        id: 'relative-pronouns',
        titleAr: 'الأسماء الموصولة',
        titleEn: 'Relative Pronouns',
        topicIds: ['ism-mawsul'],
      },
      {
        id: 'conjunction-particles',
        titleAr: 'الحروف الموصولة',
        titleEn: 'Conjunction Particles',
        topicIds: ['harf-mawsul', 'verbal-phrases'],
      },
    ],
  },
  {
    id: 'joining-sentences',
    titleAr: 'ربط الجمل',
    titleEn: 'Joining Sentences',
    icon: 'GitMerge',
    description: 'Vocative, oath, conditional, and command constructions.',
    subcategories: [
      {
        id: 'vocative-oath',
        titleAr: 'النداء والقسم',
        titleEn: 'Vocative & Oath',
        topicIds: ['nida', 'qasam'],
      },
      {
        id: 'conditional',
        titleAr: 'الشرط',
        titleEn: 'Conditional',
        topicIds: ['shart'],
      },
      {
        id: 'command-reason-clarification',
        titleAr: 'الأمر والتعليل',
        titleEn: 'Command & Clarification',
        topicIds: ['amr-nahy', 'jumla-ta-liliyya', 'jumla-istidrakiyya'],
      },
    ],
  },
];
