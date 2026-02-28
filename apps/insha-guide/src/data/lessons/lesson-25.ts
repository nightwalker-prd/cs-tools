import type { Lesson } from '../types';

export const lesson25: Lesson = {
  id: 'lesson-25',
  number: 25,
  titleAr: 'الألف اللّيّنة',
  titleEn: 'The Soft Alif',
  unitId: 'spelling',
  content: [
    {
      type: 'text',
      data: {
        content: 'The soft alif (الألف اللّيّنة) is a silent alif with fatha before it, found at the end of verbs, nouns, and particles. The key question is: should it be written as straight alif (ا — mamdooda) or as alif maqsoora (ى)?',
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'The Core Rule',
        titleAr: 'القاعدة الأساسية',
        rule: 'If the alif originates from waw (و), write it as straight alif (ا). If it originates from yaa (ي), write it as alif maqsoora (ى). For words above three letters, the default is ى unless preceded by yaa.',
        examples: [
          { arabic: 'دعا (called) — يدعو → from waw → ا', explanation: 'Present tense shows waw → straight alif' },
          { arabic: 'رمى (threw) — يرمي → from yaa → ى', explanation: 'Present tense shows yaa → alif maqsoora' },
          { arabic: 'اكتفى (was satisfied) — above triliteral → ى', explanation: 'Default for 4+ letters is alif maqsoora' },
          { arabic: 'استحيا (was shy) — preceded by yaa → ا', explanation: 'Exception: yaa before the alif → straight alif' },
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'How to Determine the Origin',
        titleAr: 'كيف نعرف الأصل',
        headers: ['Method', 'From Waw (→ ا)', 'From Yaa (→ ى)'],
        rows: [
          ['Present tense', 'سما → يسمو', 'رمى → يرمي'],
          ['Verbal noun (مصدر)', 'سما → سموّ', 'رمى → رمي'],
          ['Dual form', 'عصا → عصوان', 'رحى → رحيان'],
          ['Feminine plural', 'عصا → عصوات', 'رحى → رحيات'],
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Rules Summary Table',
        titleAr: 'جدول ملخّص القواعد',
        headers: ['Type', 'From Waw (→ ا)', 'From Yaa (→ ى)'],
        rows: [
          ['Triliteral verb', 'دعا، سما، كسا', 'رمى، كوى، هدى'],
          ['Above-triliteral verb', '(preceded by yaa): استحيا', '(default): اكتفى، اهتدى'],
          ['Triliteral noun', 'عصا، رِبا', 'هوى، فتى، رحى'],
          ['Above-triliteral noun', '(preceded by yaa): دنيا', '(default): مستشفى، مصطفى'],
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Special Cases',
        titleAr: 'حالات خاصّة',
        rule: 'Additional rules: (1) If first or middle letter is hamza, write ى (أذى، رأى). (2) If the word begins with waw, write ى (وعى، وفى). (3) Triliteral nouns with damma/kasra on first letter accept both forms (ذُرى/ذُرا).',
        examples: [
          { arabic: 'أذى — begins with hamza → ى', explanation: 'Hamza at beginning defaults to alif maqsoora' },
          { arabic: 'وعى — begins with waw → ى', explanation: 'Waw at beginning also defaults to alif maqsoora' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-25-1',
      title: 'ا or ى?',
      titleAr: 'ا أم ى؟',
      instruction: 'Choose the correct ending for each word.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-25-1-1',
            question: 'دع___ (called) — يدعو shows waw. Which ending?',
            options: ['ا (alif mamdooda)', 'ى (alif maqsoora)'],
            correctIndex: 0,
            explanation: 'From waw (يدعو) → straight alif: دعا.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-25-1-2',
            question: 'رم___ (threw) — يرمي shows yaa. Which ending?',
            options: ['ا (alif mamdooda)', 'ى (alif maqsoora)'],
            correctIndex: 1,
            explanation: 'From yaa (يرمي) → alif maqsoora: رمى.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-25-1-3',
            question: 'اكتف___ (was satisfied) — above triliteral. Which ending?',
            options: ['ا (alif mamdooda)', 'ى (alif maqsoora)'],
            correctIndex: 1,
            explanation: 'Default for above-triliteral → alif maqsoora: اكتفى.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-25-1-4',
            question: 'استحي___ (was shy) — above triliteral, preceded by yaa. Which ending?',
            options: ['ا (alif mamdooda)', 'ى (alif maqsoora)'],
            correctIndex: 0,
            explanation: 'Exception: preceded by yaa → straight alif: استحيا.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-25-1-5',
            question: 'مستشف___ (hospital) — above triliteral noun. Which ending?',
            options: ['ا (alif mamdooda)', 'ى (alif maqsoora)'],
            correctIndex: 1,
            explanation: 'Default for above-triliteral noun → alif maqsoora: مستشفى.',
          },
        },
      ],
    },
    {
      id: 'ex-25-2',
      title: 'Match Origin to Ending',
      titleAr: 'طابق الأصل بالنهاية',
      instruction: 'Match each verb with its correct final alif form.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-25-2-1',
            pairs: [
              { left: 'سما (يسمو)', right: 'سما — straight alif (ا)' },
              { left: 'هدى (يهدي)', right: 'هدى — alif maqsoora (ى)' },
              { left: 'كسا (يكسو)', right: 'كسا — straight alif (ا)' },
              { left: 'كوى (يكوي)', right: 'كوى — alif maqsoora (ى)' },
            ],
          },
        },
      ],
    },
  ],
};
