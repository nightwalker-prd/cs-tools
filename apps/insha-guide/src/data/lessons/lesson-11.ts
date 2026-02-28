import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson11: Lesson = {
  id: 'lesson-11',
  number: 11,
  titleAr: 'مصطلحات الحجّ',
  titleEn: 'Hajj Vocabulary',
  unitId: 'paragraphs',
  content: [
    {
      type: 'text',
      data: {
        content: 'Hajj (الحجّ) is the annual pilgrimage to Makkah. This lesson teaches the key vocabulary associated with the Hajj rituals, which are essential for writing about Islamic practices and culture.',
      },
    },
    {
      type: 'vocabulary-grid',
      data: {
        title: 'Hajj Terminology',
        titleAr: 'مصطلحات الحجّ',
        items: [
          { arabic: 'شهر ذي الحجّة', transliteration: 'shahr dhil-hijjah', english: 'Month of Dhul-Hijjah' },
          { arabic: 'الحجّ', transliteration: 'al-hajj', english: 'Hajj pilgrimage' },
          { arabic: 'الإحرام', transliteration: 'al-ihraam', english: 'State of ihram' },
          { arabic: 'الطواف', transliteration: 'at-tawaaf', english: 'Circumambulation' },
          { arabic: 'السعي', transliteration: 'as-sa\'y', english: 'Walking between Safa and Marwah' },
          { arabic: 'منى', transliteration: 'minaa', english: 'Mina' },
          { arabic: 'مقام ابراهيم', transliteration: 'maqaam ibraaheem', english: 'Station of Ibrahim' },
          { arabic: 'يوم التروية', transliteration: 'yawm at-tarwiyah', english: 'Day of Tarwiyah (8th)' },
          { arabic: 'عرفات', transliteration: '\'arafaat', english: 'Arafat' },
          { arabic: 'مزدلفة', transliteration: 'muzdalifah', english: 'Muzdalifah' },
          { arabic: 'جمرة العقبة', transliteration: 'jamrat al-\'aqabah', english: 'Jamrat al-Aqabah' },
          { arabic: 'الحلق', transliteration: 'al-halq', english: 'Head shaving' },
          { arabic: 'يوم النحر', transliteration: 'yawm an-nahr', english: 'Day of Sacrifice (10th)' },
          { arabic: 'طواف الإفاضة', transliteration: 'tawaaf al-ifaadah', english: 'Tawaaf al-Ifadah' },
          { arabic: 'طواف الوداع', transliteration: 'tawaaf al-wadaa\'', english: 'Farewell Tawaaf' },
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Hajj Ritual Order',
        titleAr: 'ترتيب مناسك الحجّ',
        rule: 'The main Hajj rituals follow this order: Ihram → Tawaf al-Qudum → Sa\'y → Day of Tarwiyah at Mina → Standing at Arafat → Muzdalifah → Stoning at Jamrat al-Aqabah → Sacrifice → Head shaving → Tawaf al-Ifadah → Farewell Tawaf.',
        examples: [
          { arabic: 'الإحرام → الطواف → السعي', explanation: 'First three rituals upon arrival' },
          { arabic: 'عرفات → مزدلفة → جمرة العقبة', explanation: '9th-10th of Dhul-Hijjah: the core days' },
          { arabic: 'يوم النحر → الحلق → طواف الإفاضة', explanation: '10th of Dhul-Hijjah: Day of Sacrifice rituals' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-11-1',
      title: 'Match Hajj Terms',
      titleAr: 'طابق مصطلحات الحجّ',
      instruction: 'Match each Arabic Hajj term with its English meaning.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-11-1-1',
            pairs: [
              { left: 'الإحرام', right: 'State of ihram' },
              { left: 'الطواف', right: 'Circumambulation' },
              { left: 'السعي', right: 'Walking between Safa & Marwah' },
              { left: 'الحلق', right: 'Head shaving' },
              { left: 'يوم النحر', right: 'Day of Sacrifice' },
            ],
          },
        },
      ],
    },
    {
      id: 'ex-11-2',
      title: 'Order of Hajj Rituals',
      titleAr: 'رتّب مناسك الحجّ',
      instruction: 'Put the Hajj rituals in the correct order.',
      questions: [
        {
          type: 'word-order',
          data: {
            id: 'q-11-2-1',
            words: ['السعي', 'الطواف', 'الإحرام'],
            answer: ['الإحرام', 'الطواف', 'السعي'],
            translation: 'Ihram → Circumambulation → Sa\'y',
          },
        },
        {
          type: 'word-order',
          data: {
            id: 'q-11-2-2',
            words: ['جمرة العقبة', 'عرفات', 'مزدلفة', 'منى'],
            answer: ['منى', 'عرفات', 'مزدلفة', 'جمرة العقبة'],
            translation: 'Mina → Arafat → Muzdalifah → Stoning at Jamrah',
          },
        },
        {
          type: 'word-order',
          data: {
            id: 'q-11-2-3',
            words: ['طواف الإفاضة', 'الحلق', 'يوم النحر', 'طواف الوداع'],
            answer: ['يوم النحر', 'الحلق', 'طواف الإفاضة', 'طواف الوداع'],
            translation: 'Day of Sacrifice → Head shaving → Tawaf al-Ifadah → Farewell Tawaf',
          },
        },
      ],
    },
    {
      id: 'ex-11-3',
      title: 'Hajj Knowledge Quiz',
      titleAr: 'اختبار معرفة الحجّ',
      instruction: 'Answer these questions about Hajj terminology.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-11-3-1',
            question: 'What is يوم التروية (Day of Tarwiyah)?',
            options: ['The 8th of Dhul-Hijjah', 'The 9th of Dhul-Hijjah', 'The 10th of Dhul-Hijjah', 'The 1st of Dhul-Hijjah'],
            correctIndex: 0,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-11-3-2',
            question: 'Where do pilgrims stand on the 9th of Dhul-Hijjah?',
            options: ['منى (Mina)', 'مزدلفة (Muzdalifah)', 'عرفات (Arafat)', 'مكّة (Makkah)'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-11-3-3',
            question: 'What does طواف الوداع mean?',
            options: ['Arrival Tawaf', 'Farewell Tawaf', 'Tawaf al-Ifadah', 'Sa\'y'],
            correctIndex: 1,
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-11',
    titleEn: 'Describe the Hajj Journey',
    titleAr: 'صف رحلة الحجّ',
    prompt: {
      promptEn: 'Write a paragraph describing the Hajj pilgrimage using the key terms from the lesson. Describe the rituals in chronological order.',
      promptAr: 'اكتب فقرة تصف رحلة الحجّ باستخدام المصطلحات الأساسية مرتّبة زمنيًّا.',
      targetLength: { min: 30, max: 60 },
      hints: [
        'Follow the order: Ihram → Tawaf → Sa\'i → Arafat → Muzdalifah → Jamarat',
        'Use chronological connectors: ثمّ، بعد ذلك، في اليوم التالي',
        'Include the spiritual significance of each ritual',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Hajj Rituals',
        categoryAr: 'مناسك الحجّ',
        words: [
          { arabic: 'الإحرام', english: 'ihram (sacral state)' },
          { arabic: 'الطواف', english: 'circumambulation' },
          { arabic: 'السعي', english: 'walking between Safa/Marwah' },
          { arabic: 'الوقوف بعرفة', english: 'standing at Arafat' },
          { arabic: 'رمي الجمرات', english: 'stoning the pillars' },
        ],
      },
      {
        categoryEn: 'Hajj Places',
        categoryAr: 'أماكن الحجّ',
        words: [
          { arabic: 'منى', english: 'Mina' },
          { arabic: 'عرفات', english: 'Arafat' },
          { arabic: 'مزدلفة', english: 'Muzdalifah' },
          { arabic: 'الكعبة', english: 'the Kaaba' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-11-1', labelEn: 'Used at least 5 Hajj terms', labelAr: 'استخدام ٥ مصطلحات حجّ', examples: ['الإحرام', 'الطواف', 'السعي'], required: true },
      { id: 'gc-11-2', labelEn: 'Rituals in chronological order', labelAr: 'المناسك مرتّبة زمنيًّا', examples: [], required: true },
      { id: 'gc-11-3', labelEn: 'Used sequence connectors', labelAr: 'استخدام أدوات ترتيب', examples: ['ثمّ', 'بعد ذلك'], required: true },
      { id: 'gc-11-4', labelEn: 'Mentioned spiritual significance', labelAr: 'ذكر الأهمية الروحية', examples: [], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
