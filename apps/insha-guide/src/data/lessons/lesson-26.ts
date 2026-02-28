import type { Lesson } from '../types';

export const lesson26: Lesson = {
  id: 'lesson-26',
  number: 26,
  titleAr: 'تدريبات على الألف اللّيّنة',
  titleEn: 'Soft Alif Exercises',
  unitId: 'spelling',
  content: [
    {
      type: 'text',
      data: {
        content: 'This lesson provides extended practice on the soft alif rules. You will work with verbs, nouns, and apply the methods of determining the origin (present tense, dual form, verbal noun).',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Practice Words',
        titleAr: 'كلمات للتدريب',
        headers: ['Word', 'Present/Origin', 'Ending', 'Reason'],
        rows: [
          ['بنى', 'يبني', 'ى', 'From yaa'],
          ['عفا', 'يعفو', 'ا', 'From waw'],
          ['نجا', 'ينجو', 'ا', 'From waw'],
          ['قضى', 'يقضي', 'ى', 'From yaa'],
          ['سعى', 'يسعى', 'ى', 'From yaa'],
          ['غزا', 'يغزو', 'ا', 'From waw'],
          ['رأى', 'يرى', 'ى', 'Begins with hamza'],
          ['وفى', 'يفي', 'ى', 'Begins with waw'],
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-26-1',
      title: 'Soft Alif Extended Quiz',
      titleAr: 'اختبار موسّع للألف اللّيّنة',
      instruction: 'Choose the correct soft alif ending.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-26-1-1',
            question: 'بن___ (built) — يبني shows yaa. Which ending?',
            options: ['ا (straight alif)', 'ى (alif maqsoora)'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-26-1-2',
            question: 'عف___ (pardoned) — يعفو shows waw. Which ending?',
            options: ['ا (straight alif)', 'ى (alif maqsoora)'],
            correctIndex: 0,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-26-1-3',
            question: 'قض___ (judged) — يقضي shows yaa. Which ending?',
            options: ['ا (straight alif)', 'ى (alif maqsoora)'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-26-1-4',
            question: 'غز___ (raided) — يغزو shows waw. Which ending?',
            options: ['ا (straight alif)', 'ى (alif maqsoora)'],
            correctIndex: 0,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-26-1-5',
            question: 'فت___ (young man) — فتيان (dual) shows yaa. Which ending?',
            options: ['ا (straight alif)', 'ى (alif maqsoora)'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-26-1-6',
            question: 'دني___ (world) — above triliteral noun preceded by yaa. Which ending?',
            options: ['ا (straight alif)', 'ى (alif maqsoora)'],
            correctIndex: 0,
            explanation: 'Exception: preceded by yaa → straight alif: دنيا.',
          },
        },
      ],
    },
    {
      id: 'ex-26-2',
      title: 'Match Verbs to Their Past Form',
      titleAr: 'طابق الأفعال بصيغة الماضي',
      instruction: 'Match each present-tense verb with its correct past tense form.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-26-2-1',
            pairs: [
              { left: 'يدعو', right: 'دعا' },
              { left: 'يرمي', right: 'رمى' },
              { left: 'يسعى', right: 'سعى' },
              { left: 'ينجو', right: 'نجا' },
            ],
          },
        },
      ],
    },
  ],
};
