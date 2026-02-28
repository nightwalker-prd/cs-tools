import type { Lesson } from '../types';

export const lesson23: Lesson = {
  id: 'lesson-23',
  number: 23,
  titleAr: 'التاء المربوطة والمبسوطة',
  titleEn: 'Taa Marbouta and Taa Mabsouta',
  unitId: 'spelling',
  content: [
    {
      type: 'text',
      data: {
        content: 'Arabic has two forms of taa at the end of words: Taa Marbouta (ة) pronounced as "haa" when pausing, and Taa Mabsouta (ت) always pronounced as "taa". Knowing when to use each is a fundamental spelling skill.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Taa Marbouta (ة)',
        titleAr: 'التاء المربوطة',
        headers: ['Where It Appears', 'Examples'],
        rows: [
          ['Feminine singular nouns', 'فاطمة ، سنة ، سيارة ، مدرسة'],
          ['Masculine names with feminine ending', 'حمزة ، طلحة ، معاوية'],
          ['Broken plurals of certain patterns', 'قضاة ، كتبة ، سعاة'],
          ['Exaggeration forms (صيغ المبالغة)', 'علّامة ، راوية ، فهّامة'],
          ['The adverb ثمّة', 'ثمّة (meaning "there")'],
        ],
        note: 'Test: pause on the word. If you hear "haa" (ه), it is taa marbouta (ة).',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Taa Mabsouta (ت)',
        titleAr: 'التاء المبسوطة',
        headers: ['Where It Appears', 'Examples'],
        rows: [
          ['Sound feminine plurals', 'معلّمات ، مسلمات ، مؤمنات'],
          ['Past verbs with subject taa', 'درسْتُ ، درسْتَ ، درسْتِ'],
          ['Verbs with original taa + masdar', 'ثبت ، ثبات ، مات ، موت'],
          ['Words with quiescent middle + plurals', 'بيت ، بيوت ، قوت ، أقوات'],
          ['Foreign proper nouns', 'حيات ، عظمت الله ، كرامت'],
          ['Nouns ending before silent waw/yaa', 'عنكبوت ، ملكوت ، كبريت'],
          ['Verbal nouns', 'هات ، هيهات'],
          ['Particles', 'لات ، ليت ، رُبّت'],
        ],
        note: 'Test: pause on the word. If you still hear "taa" (ت), it is taa mabsouta.',
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Quick Test: Pause and Listen',
        titleAr: 'اختبار سريع: قف واسمع',
        rule: 'The simplest way to distinguish: stop on the word (waqf). If the final sound becomes "haa" → write ة. If it stays "taa" → write ت.',
        examples: [
          { arabic: 'مدرسة → مدرسهْ (when pausing)', explanation: 'Sounds like "haa" → taa marbouta (ة)' },
          { arabic: 'درسْتُ → درسْتْ (when pausing)', explanation: 'Still sounds like "taa" → taa mabsouta (ت)' },
          { arabic: 'معلّمات → معلّماتْ (when pausing)', explanation: 'Still "taa" → taa mabsouta (ت)' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-23-1',
      title: 'ة or ت?',
      titleAr: 'ة أم ت؟',
      instruction: 'Choose the correct ending for each word.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-23-1-1',
            question: 'مدرس___ (school) — Which ending?',
            options: ['ة (taa marbouta)', 'ت (taa mabsouta)'],
            correctIndex: 0,
            explanation: 'Feminine singular noun → taa marbouta (مدرسة).',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-23-1-2',
            question: 'درسْ___ (I studied) — Which ending?',
            options: ['ة (taa marbouta)', 'ت (taa mabsouta)'],
            correctIndex: 1,
            explanation: 'Past verb with subject taa → taa mabsouta (درستُ).',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-23-1-3',
            question: 'معلّما___ (female teachers) — Which ending?',
            options: ['ة (taa marbouta)', 'ت (taa mabsouta)'],
            correctIndex: 1,
            explanation: 'Sound feminine plural → taa mabsouta (معلّمات).',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-23-1-4',
            question: 'حمز___ (Hamzah, a name) — Which ending?',
            options: ['ة (taa marbouta)', 'ت (taa mabsouta)'],
            correctIndex: 0,
            explanation: 'Masculine name with feminine ending → taa marbouta (حمزة).',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-23-1-5',
            question: 'بي___ (house) — Which ending?',
            options: ['ة (taa marbouta)', 'ت (taa mabsouta)'],
            correctIndex: 1,
            explanation: 'Quiescent middle word → taa mabsouta (بيت).',
          },
        },
      ],
    },
    {
      id: 'ex-23-2',
      title: 'Match Taa Types',
      titleAr: 'طابق أنواع التاء',
      instruction: 'Match each word with the correct taa type.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-23-2-1',
            pairs: [
              { left: 'سيارة', right: 'تاء مربوطة (ة)' },
              { left: 'مسلمات', right: 'تاء مبسوطة (ت)' },
              { left: 'علّامة', right: 'تاء مربوطة (ة)' },
              { left: 'عنكبوت', right: 'تاء مبسوطة (ت)' },
              { left: 'فاطمة', right: 'تاء مربوطة (ة)' },
            ],
          },
        },
      ],
    },
  ],
};
