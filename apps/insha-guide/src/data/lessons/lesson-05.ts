import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson05: Lesson = {
  id: 'lesson-5',
  number: 5,
  titleAr: 'تدريبات على الاستفهام',
  titleEn: 'Exercises on Interrogatives',
  unitId: 'sentences',
  content: [
    {
      type: 'text',
      data: {
        content: 'This lesson provides extensive practice with interrogative tools. You will formulate questions, match questions to answers, and work with antonyms and synonyms to build your vocabulary.',
      },
    },
    {
      type: 'synonym-group',
      data: {
        title: 'Antonym Pairs',
        titleAr: 'الأضداد',
        groups: [
          {
            concept: 'Winners & Losers',
            conceptAr: 'الفوز والخسارة',
            words: [
              { arabic: 'الفائز', english: 'the winner' },
              { arabic: 'الخاسر', english: 'the loser' },
            ],
          },
          {
            concept: 'First & Last',
            conceptAr: 'الأول والآخر',
            words: [
              { arabic: 'الأول', english: 'the first' },
              { arabic: 'الآخر', english: 'the last' },
            ],
          },
          {
            concept: 'Diligent & Lazy',
            conceptAr: 'الاجتهاد والكسل',
            words: [
              { arabic: 'المجتهد', english: 'the diligent one' },
              { arabic: 'الكسلان', english: 'the lazy one' },
            ],
          },
          {
            concept: 'Wide & Narrow',
            conceptAr: 'السعة والضيق',
            words: [
              { arabic: 'الواسع', english: 'the wide' },
              { arabic: 'الضيّق', english: 'the narrow' },
            ],
          },
          {
            concept: 'Friend & Enemy',
            conceptAr: 'الصداقة والعداوة',
            words: [
              { arabic: 'الصديق', english: 'the friend' },
              { arabic: 'العدو', english: 'the enemy' },
            ],
          },
          {
            concept: 'Angry & Pleased',
            conceptAr: 'الغضب والرضا',
            words: [
              { arabic: 'الغاضب', english: 'the angry one' },
              { arabic: 'الراضي', english: 'the pleased one' },
            ],
          },
        ],
      },
    },
    {
      type: 'synonym-group',
      data: {
        title: 'Synonyms',
        titleAr: 'المترادفات',
        groups: [
          {
            concept: 'Courage',
            conceptAr: 'الشجاعة',
            words: [
              { arabic: 'الإقدام', english: 'boldness' },
              { arabic: 'الشجاعة', english: 'courage' },
            ],
          },
          {
            concept: 'Steadfastness',
            conceptAr: 'الثبات',
            words: [
              { arabic: 'الثبات', english: 'steadfastness' },
              { arabic: 'عدم الفرار', english: 'not fleeing' },
            ],
          },
          {
            concept: 'Certainty',
            conceptAr: 'اليقين',
            words: [
              { arabic: 'عدم الشك', english: 'absence of doubt' },
              { arabic: 'اليقين', english: 'certainty' },
            ],
          },
          {
            concept: 'Doubt',
            conceptAr: 'الشك',
            words: [
              { arabic: 'الشك', english: 'doubt' },
              { arabic: 'الريب', english: 'suspicion' },
            ],
          },
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Formulating Questions for Given Answers',
        titleAr: 'ضع سؤالاً مناسباً للإجابات',
        headers: ['Answer', 'Question', 'Translation'],
        rows: [
          ['كتبتُ درس النحو', 'ماذا كتبت؟', 'What did you write?'],
          ['لعبتُ مع أصدقائي', 'مع مَن لعبت؟', 'With whom did you play?'],
          ['أحبُّ الكتابة والقراءة', 'ماذا تحبّ؟', 'What do you like?'],
          ['الحمد لله على كلّ حال', 'كيف حالك؟', 'How are you?'],
          ['غداً أزورك إن شاء الله', 'متى تزورني؟', 'When will you visit me?'],
          ['لا، لم أكمل الواجب', 'هل أكملت الواجب؟', 'Did you complete the homework?'],
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-5-1',
      title: 'Antonyms Quiz',
      titleAr: 'اختبار الأضداد',
      instruction: 'Choose the correct opposite for each word.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-5-1-1',
            question: 'What is the opposite of الفائز (the winner)?',
            options: ['الخاسر (the loser)', 'المجتهد (the diligent)', 'الراضي (the pleased)', 'المقيم (the resident)'],
            correctIndex: 0,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-5-1-2',
            question: 'What is the opposite of الواسع (the wide)?',
            options: ['العميق (the deep)', 'الضيّق (the narrow)', 'المرتفع (the high)', 'المنخفض (the low)'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-5-1-3',
            question: 'What is the opposite of العدو (the enemy)?',
            options: ['المسافر (the traveler)', 'الصديق (the friend)', 'المسامح (the forgiving)', 'الغاضب (the angry)'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-5-1-4',
            question: 'What is the opposite of كثير (many)?',
            options: ['قليل (few)', 'واسع (wide)', 'صغير (small)', 'قريب (near)'],
            correctIndex: 0,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-5-1-5',
            question: 'What is the opposite of المسافر (the traveler)?',
            options: ['الخاسر (the loser)', 'المنتقم (the vengeful)', 'المقيم (the resident)', 'الغاضب (the angry)'],
            correctIndex: 2,
          },
        },
      ],
    },
    {
      id: 'ex-5-2',
      title: 'Synonym Matching',
      titleAr: 'طابق المترادفات',
      instruction: 'Match each word with its synonym.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-5-2-1',
            pairs: [
              { left: 'الإقدام', right: 'الشجاعة' },
              { left: 'الثبات', right: 'عدم الفرار' },
              { left: 'عدم الشك', right: 'اليقين' },
              { left: 'الشك', right: 'الريب' },
            ],
          },
        },
      ],
    },
    {
      id: 'ex-5-3',
      title: 'Order Events Chronologically',
      titleAr: 'رتّب الأحداث ترتيباً زمنياً',
      instruction: 'Put the words in correct chronological order.',
      questions: [
        {
          type: 'word-order',
          data: {
            id: 'q-5-3-1',
            words: ['شيخوخة', 'طفولة', 'ولادة', 'كهولة', 'شباب'],
            answer: ['ولادة', 'طفولة', 'شباب', 'كهولة', 'شيخوخة'],
            translation: 'Stages of life: birth → childhood → youth → middle age → old age',
          },
        },
        {
          type: 'word-order',
          data: {
            id: 'q-5-3-2',
            words: ['حصاد', 'نمو', 'سقي', 'بذر', 'نبت'],
            answer: ['بذر', 'سقي', 'نبت', 'نمو', 'حصاد'],
            translation: 'Farming: sowing → watering → sprouting → growth → harvest',
          },
        },
        {
          type: 'word-order',
          data: {
            id: 'q-5-3-3',
            words: ['نشر', 'مراجعة', 'تفكير', 'كتابة'],
            answer: ['تفكير', 'كتابة', 'مراجعة', 'نشر'],
            translation: 'Writing a book: thinking → writing → reviewing → publishing',
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-5',
    titleEn: 'Practice with Antonyms and Synonyms',
    titleAr: 'تدريب على الأضداد والمترادفات',
    prompt: {
      promptEn: 'Write 5 pairs of sentences. In each pair, the first sentence uses a word and the second uses its antonym or synonym. For example: الطالب المجتهد نجح / الطالب الكسلان رسب.',
      promptAr: 'اكتب خمسة أزواج من الجمل. في كلّ زوج، الجملة الأولى تستخدم كلمة والثانية ضدّها أو مرادفها.',
      targetLength: { min: 25, max: 55 },
      hints: [
        'Use antonym pairs like: المجتهد/الكسلان، الفائز/الخاسر',
        'Try synonym groups: الشجاعة، الجرأة، البسالة',
        'Make your sentences about familiar topics',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Antonym Pairs',
        categoryAr: 'أضداد',
        words: [
          { arabic: 'الفائز / الخاسر', english: 'winner / loser' },
          { arabic: 'المجتهد / الكسلان', english: 'diligent / lazy' },
          { arabic: 'الصديق / العدو', english: 'friend / enemy' },
          { arabic: 'الفرح / الحزن', english: 'joy / sadness' },
        ],
      },
      {
        categoryEn: 'Synonym Groups',
        categoryAr: 'مترادفات',
        words: [
          { arabic: 'الشجاعة', english: 'courage' },
          { arabic: 'الجرأة', english: 'boldness' },
          { arabic: 'البسالة', english: 'bravery' },
          { arabic: 'الثبات', english: 'steadfastness' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-5-1', labelEn: 'Used at least 3 antonym pairs', labelAr: 'استخدام ٣ أزواج من الأضداد', examples: ['الفائز / الخاسر'], required: true },
      { id: 'gc-5-2', labelEn: 'Each pair has contrasting sentences', labelAr: 'كلّ زوج له جملتان متقابلتان', examples: [], required: true },
      { id: 'gc-5-3', labelEn: 'Used at least one synonym group', labelAr: 'استخدام مجموعة مترادفات', examples: ['الشجاعة، الجرأة'], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
