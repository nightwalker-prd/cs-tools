import type { Lesson } from '../types';

export const lesson20: Lesson = {
  id: 'lesson-20',
  number: 20,
  titleAr: 'الهمزة وسط الكلمة',
  titleEn: 'Hamza in the Middle of a Word',
  unitId: 'spelling',
  content: [
    {
      type: 'text',
      data: {
        content: 'When hamza appears in the middle of a word, its seat (كرسي) — the letter it is written on — depends on the vowel strength hierarchy. Compare the vowel on the hamza with the vowel before it, and write on the letter matching the stronger vowel.',
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Vowel Strength Hierarchy',
        titleAr: 'ترتيب قوّة الحركات',
        rule: 'The vowels from strongest to weakest: (1) Kasra = strongest = written on yaa (ئ), (2) Damma = written on waw (ؤ), (3) Fatha = written on alif (أ), (4) Sukoon = weakest = on the line (ء).',
        examples: [
          { arabic: 'كسرة → ياء (ئ)', explanation: 'Kasra is the strongest — hamza sits on yaa' },
          { arabic: 'ضمّة → واو (ؤ)', explanation: 'Damma — hamza sits on waw' },
          { arabic: 'فتحة → ألف (أ)', explanation: 'Fatha — hamza sits on alif' },
          { arabic: 'سكون → السطر (ء)', explanation: 'Sukoon is weakest — hamza sits on the line' },
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Hamza on Alif (both fatha)',
        titleAr: 'الهمزة على ألف',
        headers: ['Arabic', 'Transliteration', 'Meaning'],
        rows: [
          ['كأس', 'ka\'s', 'cup'],
          ['جأش', 'ja\'sh', 'courage'],
          ['المرأة', 'al-mar\'ah', 'woman'],
          ['سأل', 'sa\'ala', 'asked'],
          ['رَأَس', 'ra\'asa', 'led'],
        ],
        note: 'When both the hamza and the preceding letter have fatha, hamza is written on alif.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Hamza on Waw (damma involved)',
        titleAr: 'الهمزة على واو',
        headers: ['Arabic', 'Transliteration', 'Meaning'],
        rows: [
          ['لؤم', 'lu\'m', 'meanness'],
          ['شؤم', 'shu\'m', 'bad omen'],
          ['لؤلؤ', 'lu\'lu\'', 'pearls'],
          ['يؤذي', 'yu\'dhee', 'harms'],
          ['يؤدّي', 'yu\'addee', 'performs'],
          ['يؤمّ', 'yu\'imm', 'leads (prayer)'],
        ],
        note: 'When damma is the strongest vowel present, hamza is written on waw.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Hamza on Yaa (kasra involved)',
        titleAr: 'الهمزة على ياء',
        headers: ['Arabic', 'Transliteration', 'Meaning'],
        rows: [
          ['الأفئدة', 'al-af\'idah', 'hearts'],
          ['ذئاب', 'dhi\'aab', 'wolves'],
          ['بئر', 'bi\'r', 'well'],
          ['تطمئنّ', 'tatma\'inn', 'be reassured'],
          ['شئت', 'shi\'t', 'wished'],
        ],
        note: 'When kasra is the strongest vowel present, hamza is written on yaa (نبرة).',
      },
    },
  ],
  exercises: [
    {
      id: 'ex-20-1',
      title: 'Where Does the Hamza Sit?',
      titleAr: 'أين تجلس الهمزة؟',
      instruction: 'Determine the seat of the middle hamza based on the vowel hierarchy.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-20-1-1',
            question: 'سَأَلَ — The hamza has fatha, preceded by fatha. Where does it sit?',
            options: ['On alif (أ)', 'On waw (ؤ)', 'On yaa (ئ)', 'On the line (ء)'],
            correctIndex: 0,
            explanation: 'Both vowels are fatha — hamza sits on alif.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-20-1-2',
            question: 'يُؤَدّي — The hamza has fatha, preceded by damma. Where does it sit?',
            options: ['On alif (أ)', 'On waw (ؤ)', 'On yaa (ئ)', 'On the line (ء)'],
            correctIndex: 1,
            explanation: 'Damma is stronger than fatha — hamza sits on waw.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-20-1-3',
            question: 'بِئْر — The hamza has sukoon, preceded by kasra. Where does it sit?',
            options: ['On alif (أ)', 'On waw (ؤ)', 'On yaa (ئ)', 'On the line (ء)'],
            correctIndex: 2,
            explanation: 'Kasra is the strongest vowel — hamza sits on yaa.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-20-1-4',
            question: 'لُؤْلُؤ — The hamza has sukoon, preceded by damma. Where does it sit?',
            options: ['On alif (أ)', 'On waw (ؤ)', 'On yaa (ئ)', 'On the line (ء)'],
            correctIndex: 1,
            explanation: 'Damma is stronger than sukoon — hamza sits on waw.',
          },
        },
      ],
    },
    {
      id: 'ex-20-2',
      title: 'Match Hamza Seats',
      titleAr: 'طابق كراسي الهمزة',
      instruction: 'Match each word with the letter that the hamza sits on.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-20-2-1',
            pairs: [
              { left: 'كأس', right: 'Alif (ألف)' },
              { left: 'لؤم', right: 'Waw (واو)' },
              { left: 'ذئاب', right: 'Yaa (ياء)' },
              { left: 'سأل', right: 'Alif (ألف)' },
            ],
          },
        },
      ],
    },
  ],
};
