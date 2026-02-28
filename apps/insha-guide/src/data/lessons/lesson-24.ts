import type { Lesson } from '../types';

export const lesson24: Lesson = {
  id: 'lesson-24',
  number: 24,
  titleAr: 'تدريبات على التاء',
  titleEn: 'Taa Exercises',
  unitId: 'spelling',
  content: [
    {
      type: 'text',
      data: {
        content: 'This lesson provides additional practice distinguishing between taa marbouta (ة) and taa mabsouta (ت). Remember the pause test: if the sound becomes "haa" when you stop, write ة; if it stays "taa", write ت.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Review: When to Use Each',
        titleAr: 'مراجعة: متى نستعمل كلّاً منهما',
        headers: ['تاء مربوطة (ة)', 'تاء مبسوطة (ت)'],
        rows: [
          ['Feminine singular nouns: مدينة', 'Sound feminine plurals: مدن، مسلمات'],
          ['Masculine names: حمزة، طلحة', 'Past verb + subject taa: كتبتُ'],
          ['Broken plurals: قضاة، كتبة', 'Original taa in root: موت، بيت'],
          ['Exaggeration: علّامة، فهّامة', 'Particles: ليت، لات، رُبّت'],
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-24-1',
      title: 'Extended Taa Practice',
      titleAr: 'تدريبات موسّعة على التاء',
      instruction: 'Choose the correct ending (ة or ت) for each word.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-24-1-1',
            question: 'جامع___ (university) — Which ending?',
            options: ['ة (taa marbouta)', 'ت (taa mabsouta)'],
            correctIndex: 0,
            explanation: 'Feminine singular noun → taa marbouta (جامعة).',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-24-1-2',
            question: 'كتب___ الدرس (I wrote the lesson) — Which ending?',
            options: ['ة (taa marbouta)', 'ت (taa mabsouta)'],
            correctIndex: 1,
            explanation: 'Subject taa on past verb → taa mabsouta (كتبتُ).',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-24-1-3',
            question: 'مؤمنا___ (believing women) — Which ending?',
            options: ['ة (taa marbouta)', 'ت (taa mabsouta)'],
            correctIndex: 1,
            explanation: 'Sound feminine plural → taa mabsouta (مؤمنات).',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-24-1-4',
            question: 'راوي___ (great narrator) — Which ending?',
            options: ['ة (taa marbouta)', 'ت (taa mabsouta)'],
            correctIndex: 0,
            explanation: 'Exaggeration form (صيغة مبالغة) → taa marbouta (راوية).',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-24-1-5',
            question: 'لي___ (if only) — Which ending?',
            options: ['ة (taa marbouta)', 'ت (taa mabsouta)'],
            correctIndex: 1,
            explanation: 'Particle → taa mabsouta (ليت).',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-24-1-6',
            question: 'قضا___ (judges) — Which ending?',
            options: ['ة (taa marbouta)', 'ت (taa mabsouta)'],
            correctIndex: 0,
            explanation: 'Broken plural pattern → taa marbouta (قضاة).',
          },
        },
      ],
    },
  ],
};
