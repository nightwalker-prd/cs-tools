import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson08: Lesson = {
  id: 'lesson-8',
  number: 8,
  titleAr: 'الكتابة الحرّة',
  titleEn: 'Free Writing',
  unitId: 'paragraphs',
  content: [
    {
      type: 'text',
      data: {
        content: 'Free writing (الكتابة الحرّة) is guided composition where you answer prompts to build a short essay. This lesson practices writing about visiting a library, using the sentence types and linking tools you have learned.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Writing Prompts: Visiting a Library',
        titleAr: 'زيارة المكتبة',
        headers: ['#', 'Arabic Prompt', 'English Translation'],
        rows: [
          ['1', 'متى زرت المكتبة آخر مرّة؟', 'When did you last visit the library?'],
          ['2', 'ما أفضل قصّة قرأتها؟', 'What is the best story you read?'],
          ['3', 'اذكر بعض أحداث هذه القصّة', 'Mention some events of this story'],
          ['4', 'كم وقتاً خصّصته للمكتبة؟', 'How much time did you allocate for the library?'],
          ['5', 'اكتب بعض الفوائد اللّغوية', 'Write some linguistic benefits you noted'],
          ['6', 'حرّر بعض فوائد القراءة والمطالعة', 'Write about benefits of reading'],
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Kaana and Its Sisters',
        titleAr: 'كان وأخواتها',
        headers: ['Arabic', 'Transliteration', 'Meaning'],
        rows: [
          ['كان', 'kaana', 'was / had been'],
          ['أصبح', 'asbaha', 'became (morning)'],
          ['صار', 'saara', 'became / turned into'],
          ['ليس', 'laysa', 'is not'],
          ['ظلّ', 'zalla', 'remained'],
          ['مازال', 'maa zaala', 'still is'],
          ['مادام', 'maa daama', 'as long as'],
        ],
        note: 'These incomplete verbs enter on a nominal sentence: subject stays مرفوع, predicate becomes منصوب.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Inna and Its Sisters',
        titleAr: 'إنّ وأخواتها',
        headers: ['Arabic', 'Transliteration', 'Function'],
        rows: [
          ['إنّ', 'inna', 'emphasis (indeed)'],
          ['أنّ', 'anna', 'that (subordinate)'],
          ['لكنّ', 'laakinna', 'but / however'],
          ['كأنّ', 'ka\'anna', 'as if'],
          ['ليت', 'layta', 'if only (wishing)'],
          ['لعلّ', 'la\'alla', 'perhaps (hope)'],
        ],
        note: 'Opposite of kaana: subject becomes منصوب, predicate stays مرفوع.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex-8-1',
      title: 'Kaana vs. Inna',
      titleAr: 'كان وأخواتها أم إنّ وأخواتها',
      instruction: 'Identify whether the underlined word is from kaana\'s group or inna\'s group.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-8-1-1',
            question: 'كان الطالبُ مجتهداً — Which group does كان belong to?',
            options: ['كان وأخواتها', 'إنّ وأخواتها'],
            correctIndex: 0,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-8-1-2',
            question: 'إنّ العلمَ نورٌ — Which group does إنّ belong to?',
            options: ['كان وأخواتها', 'إنّ وأخواتها'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-8-1-3',
            question: 'ليس الكسلُ نافعاً — Which group does ليس belong to?',
            options: ['كان وأخواتها', 'إنّ وأخواتها'],
            correctIndex: 0,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-8-1-4',
            question: 'لعلّ الامتحانَ سهلٌ — Which group does لعلّ belong to?',
            options: ['كان وأخواتها', 'إنّ وأخواتها'],
            correctIndex: 1,
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-8',
    titleEn: 'Write About a Library Visit',
    titleAr: 'اكتب عن زيارة المكتبة',
    prompt: {
      promptEn: 'Write a short paragraph about visiting a library. Use at least 2 sentences with كان وأخواتها and 2 with إنّ وأخواتها.',
      promptAr: 'اكتب فقرة قصيرة عن زيارة المكتبة مستخدمًا كان وأخواتها وإنّ وأخواتها.',
      targetLength: { min: 25, max: 55 },
      hints: [
        'Use كان for past description: كان الجوّ هادئًا',
        'Use إنّ for emphasis: إنّ المكتبة مكان رائع',
        'Try ليس for negation and لعلّ for hope',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Kaan & Sisters',
        categoryAr: 'كان وأخواتها',
        words: [
          { arabic: 'كان', english: 'was' },
          { arabic: 'أصبح', english: 'became (morning)' },
          { arabic: 'ليس', english: 'is not' },
          { arabic: 'مازال', english: 'still is' },
        ],
      },
      {
        categoryEn: 'Inna & Sisters',
        categoryAr: 'إنّ وأخواتها',
        words: [
          { arabic: 'إنّ', english: 'indeed' },
          { arabic: 'أنّ', english: 'that (emphatic)' },
          { arabic: 'لكنّ', english: 'but' },
          { arabic: 'لعلّ', english: 'perhaps/hopefully' },
        ],
      },
      {
        categoryEn: 'Library Words',
        categoryAr: 'كلمات المكتبة',
        words: [
          { arabic: 'مكتبة', english: 'library' },
          { arabic: 'كتب', english: 'books' },
          { arabic: 'قراءة', english: 'reading' },
          { arabic: 'هادئ', english: 'quiet' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-8-1', labelEn: 'Used كان or a sister verb', labelAr: 'استخدام كان أو إحدى أخواتها', examples: ['كان الجوّ هادئًا'], required: true },
      { id: 'gc-8-2', labelEn: 'Used إنّ or a sister particle', labelAr: 'استخدام إنّ أو إحدى أخواتها', examples: ['إنّ المكتبة جميلة'], required: true },
      { id: 'gc-8-3', labelEn: 'Correct case endings (accusative predicate with كان)', labelAr: 'إعراب صحيح لخبر كان', examples: ['كان الجوّ هادئًا'], required: false },
      { id: 'gc-8-4', labelEn: 'Used ليس for negation', labelAr: 'استخدام ليس للنفي', examples: ['ليس الكتاب صعبًا'], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
