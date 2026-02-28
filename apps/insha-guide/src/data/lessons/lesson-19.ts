import type { Lesson } from '../types';

export const lesson19: Lesson = {
  id: 'lesson-19',
  number: 19,
  titleAr: 'كتابة الهمزة',
  titleEn: 'Writing the Hamza',
  unitId: 'spelling',
  content: [
    {
      type: 'text',
      data: {
        content: 'The hamza (الهمزة) is one of the most challenging aspects of Arabic spelling. There are two main types: Hamzat al-Wasl (همزة الوصل) which is a connecting hamza, and Hamzat al-Qat\' (همزة القطع) which is a cutting hamza.',
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Hamzat al-Wasl (Connecting Hamza)',
        titleAr: 'همزة الوصل',
        rule: 'An extra hamza used to begin a word smoothly. It is pronounced only at the start of speech and drops when connected to a preceding word. Written as bare alif (ا) without a hamza mark.',
        examples: [
          { arabic: 'اسم ، ابن ، ابنة ، امرؤ ، اثنان', explanation: 'Specific nouns that take hamzat al-wasl' },
          { arabic: 'الـ (the definite article)', explanation: 'The ال prefix always has hamzat al-wasl' },
          { arabic: 'اشرب! ، انتصَرَ ، استكمَلَ', explanation: 'Imperative of triliteral verbs, and Forms V-X verbs' },
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Hamzat al-Qat\' (Cutting Hamza)',
        titleAr: 'همزة القطع',
        rule: 'A fixed hamza that is always pronounced, whether at the beginning, middle, or end of speech. Written with a hamza mark (أ or إ).',
        examples: [
          { arabic: 'أكل ، أنشأ ، أكتب', explanation: 'Triliteral verbs, quadriliteral verbs, first-person present' },
          { arabic: 'إذ ، إلى ، إلّا', explanation: 'Particles always have hamzat al-qat\'' },
          { arabic: 'إبراهيم ، أحمد ، أب ، أمّ', explanation: 'Proper nouns (except specific wasl nouns)' },
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Wasl vs. Qat\': Comparison',
        titleAr: 'المقارنة بين همزة الوصل والقطع',
        headers: ['Feature', 'Wasl (وصل)', 'Qat\' (قطع)'],
        rows: [
          ['Pronunciation', 'Only at start; drops in connected speech', 'Always pronounced'],
          ['Position', 'Beginning of word only', 'Beginning, middle, or end'],
          ['Writing', 'Bare alif: ا', 'With hamza mark: أ or إ'],
          ['Nouns', 'اسم، ابن، ابنة، امرؤ، اثنان', 'أب، أمّ، أخ، إبراهيم, أحمد'],
          ['Verbs', 'Imperative of triliteral, Forms V-X', 'Past of triliteral (أكل), Form IV (أنشأ)'],
          ['Particles', 'ال only', 'إذ، إلى، إلّا, إنّ, أنّ'],
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Hamzat al-Qat\' Writing Rules',
        titleAr: 'قواعد كتابة همزة القطع',
        rule: 'Hamzat al-qat\' is written above alif with fatha or damma (أَ، أُ), and below alif with kasra (إِ). It does not change with prefixes.',
        examples: [
          { arabic: 'أَخ ، أُمّ', explanation: 'Above alif: fatha (أَ) or damma (أُ)' },
          { arabic: 'إعراب ، إسلام', explanation: 'Below alif: kasra (إِ)' },
          { arabic: 'لأسمع ، سأسافر', explanation: 'Prefixes don\'t change the hamza placement' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-19-1',
      title: 'Wasl or Qat\'?',
      titleAr: 'وصل أم قطع؟',
      instruction: 'Determine whether the hamza in each word is wasl or qat\'.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-19-1-1',
            question: 'اسم (name) — wasl or qat\'?',
            options: ['همزة وصل (wasl)', 'همزة قطع (qat\')'],
            correctIndex: 0,
            explanation: 'اسم is one of the specific nouns that take hamzat al-wasl.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-19-1-2',
            question: 'أكل (ate) — wasl or qat\'?',
            options: ['همزة وصل (wasl)', 'همزة قطع (qat\')'],
            correctIndex: 1,
            explanation: 'Past tense of triliteral verbs takes hamzat al-qat\' (أكل).',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-19-1-3',
            question: 'انتصر (triumphed) — wasl or qat\'?',
            options: ['همزة وصل (wasl)', 'همزة قطع (qat\')'],
            correctIndex: 0,
            explanation: 'Form VIII verb (افتعل pattern) takes hamzat al-wasl.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-19-1-4',
            question: 'إبراهيم — wasl or qat\'?',
            options: ['همزة وصل (wasl)', 'همزة قطع (qat\')'],
            correctIndex: 1,
            explanation: 'Proper nouns take hamzat al-qat\' (except specific wasl nouns).',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-19-1-5',
            question: 'اشرب! (drink!) — wasl or qat\'?',
            options: ['همزة وصل (wasl)', 'همزة قطع (qat\')'],
            correctIndex: 0,
            explanation: 'Imperative of triliteral verbs takes hamzat al-wasl.',
          },
        },
      ],
    },
    {
      id: 'ex-19-2',
      title: 'Match Hamza Types',
      titleAr: 'طابق أنواع الهمزة',
      instruction: 'Match each word with the correct hamza type.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-19-2-1',
            pairs: [
              { left: 'ابن', right: 'همزة وصل' },
              { left: 'أحمد', right: 'همزة قطع' },
              { left: 'استكمل', right: 'همزة وصل' },
              { left: 'إلى', right: 'همزة قطع' },
              { left: 'الكتاب', right: 'همزة وصل' },
            ],
          },
        },
      ],
    },
  ],
};
