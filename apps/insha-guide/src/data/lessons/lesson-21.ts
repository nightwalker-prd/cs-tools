import type { Lesson } from '../types';

export const lesson21: Lesson = {
  id: 'lesson-21',
  number: 21,
  titleAr: 'الهمزة آخر الكلمة',
  titleEn: 'Hamza at the End of a Word',
  unitId: 'spelling',
  content: [
    {
      type: 'text',
      data: {
        content: 'When hamza appears at the end of a word, its seat is determined by the vowel of the letter before it (not the hamza\'s own vowel). This is simpler than middle hamza since you only need to check one vowel.',
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Final Hamza Rules',
        titleAr: 'قواعد الهمزة المتطرّفة',
        rule: 'Look at the vowel on the letter BEFORE the hamza: kasra → write on yaa (ئ), damma → write on waw (ؤ), fatha → write on alif (أ), sukoon → write on the line (ء).',
        examples: [
          { arabic: 'قارِئ — preceded by kasra → on yaa (ئ)', explanation: 'Reader: ر has kasra, so hamza sits on yaa' },
          { arabic: 'يجرُؤ — preceded by damma → on waw (ؤ)', explanation: 'He dares: ر has damma, so hamza sits on waw' },
          { arabic: 'قرَأ — preceded by fatha → on alif (أ)', explanation: 'He read: ر has fatha, so hamza sits on alif' },
          { arabic: 'شيْء — preceded by sukoon → on line (ء)', explanation: 'Thing: ي has sukoon, so hamza sits on the line' },
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Examples by Preceding Vowel',
        titleAr: 'أمثلة حسب حركة ما قبلها',
        headers: ['Preceding Vowel', 'Seat', 'Examples'],
        rows: [
          ['Kasra (كسرة)', 'Yaa (ئ)', 'قارئ، شاطئ، مبادئ'],
          ['Damma (ضمّة)', 'Waw (ؤ)', 'يجرؤ، تكافؤ، تواطؤ'],
          ['Fatha (فتحة)', 'Alif (أ)', 'قرأ، بدأ، ملجأ'],
          ['Sukoon (سكون)', 'Line (ء)', 'شيء، جزء، بطء، دفء'],
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Final Hamza with Pronoun Suffixes',
        titleAr: 'الهمزة المتطرّفة مع الضمائر',
        rule: 'When pronoun suffixes are added to words ending in hamza, both forms are permissible in some cases.',
        examples: [
          { arabic: 'يبدأون / يبدؤون', explanation: 'They begin — both forms are acceptable' },
          { arabic: 'يقرأون / يقرؤون', explanation: 'They read — both forms are acceptable' },
          { arabic: 'شيئه / جزئه', explanation: 'His thing / his part — hamza form may change with suffixes' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-21-1',
      title: 'Final Hamza Seat',
      titleAr: 'كرسي الهمزة المتطرّفة',
      instruction: 'Determine where the final hamza sits based on the preceding vowel.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-21-1-1',
            question: 'قرَأ (he read) — ر has fatha. Where does the hamza sit?',
            options: ['On alif (أ)', 'On waw (ؤ)', 'On yaa (ئ)', 'On the line (ء)'],
            correctIndex: 0,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-21-1-2',
            question: 'قارِئ (reader) — ر has kasra. Where does the hamza sit?',
            options: ['On alif (أ)', 'On waw (ؤ)', 'On yaa (ئ)', 'On the line (ء)'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-21-1-3',
            question: 'شيْء (thing) — ي has sukoon. Where does the hamza sit?',
            options: ['On alif (أ)', 'On waw (ؤ)', 'On yaa (ئ)', 'On the line (ء)'],
            correctIndex: 3,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-21-1-4',
            question: 'يجرُؤ (he dares) — ر has damma. Where does the hamza sit?',
            options: ['On alif (أ)', 'On waw (ؤ)', 'On yaa (ئ)', 'On the line (ء)'],
            correctIndex: 1,
          },
        },
      ],
    },
    {
      id: 'ex-21-2',
      title: 'Match Final Hamza Words',
      titleAr: 'طابق كلمات الهمزة المتطرّفة',
      instruction: 'Match each word with the hamza seat.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-21-2-1',
            pairs: [
              { left: 'بدأ', right: 'On alif (fatha before)' },
              { left: 'شاطئ', right: 'On yaa (kasra before)' },
              { left: 'جزء', right: 'On line (sukoon before)' },
              { left: 'تكافؤ', right: 'On waw (damma before)' },
            ],
          },
        },
      ],
    },
  ],
};
