import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson12: Lesson = {
  id: 'lesson-12',
  number: 12,
  titleAr: 'أدوات الربط',
  titleEn: 'Linking Tools',
  unitId: 'paragraphs',
  content: [
    {
      type: 'text',
      data: {
        content: 'Linking tools (أدوات الربط) are words and phrases that connect sentences and ideas in Arabic writing. Mastering them is essential for building coherent paragraphs and essays. There are seven main categories of connectors.',
      },
    },
    {
      type: 'linking-tools',
      data: {
        title: 'Category 1: Joining (الجمع)',
        titleAr: 'الجمع',
        categories: [
          {
            name: 'Joining (الجمع)',
            nameAr: 'الجمع',
            tools: [
              { arabic: 'الواو', english: 'and — joins without implying order', example: 'قرأتُ الكتابَ وكتبتُ الواجبَ', exampleTranslation: 'I read the book and wrote the homework' },
              { arabic: 'الفاء', english: 'and then / so — immediate sequence', example: 'دخلتُ فسلّمتُ', exampleTranslation: 'I entered then greeted' },
              { arabic: 'ثمّ', english: 'then — delayed sequence', example: 'درستُ ثمّ استرحتُ', exampleTranslation: 'I studied then rested' },
            ],
          },
        ],
      },
    },
    {
      type: 'linking-tools',
      data: {
        title: 'Category 2: Explanation & Reasoning (التفسير والتعليل)',
        titleAr: 'التفسير والتعليل',
        categories: [
          {
            name: 'Explanation & Reasoning',
            nameAr: 'التفسير والتعليل',
            tools: [
              { arabic: 'الفاء', english: 'for / because — explains the reason', example: 'أحبُّ اللغة العربيّة، فهي لغة القرآن', exampleTranslation: 'I love Arabic, for it is the language of the Quran' },
              { arabic: 'أي', english: 'meaning / i.e. — clarifies', example: 'لوّحتُ له بيدي، أي سلّمتُ عليه', exampleTranslation: 'I waved to him, meaning I greeted him' },
              { arabic: 'اللام', english: 'because of — introduces a cause', example: 'لانشغالي بالاختبارات', exampleTranslation: 'Because of my busy exams' },
              { arabic: 'بسبب', english: 'due to — states the cause', example: 'بسبب انشغالي بالاختبارات', exampleTranslation: 'Due to my busy exams' },
              { arabic: 'فقد', english: 'for indeed — emphasizes reason', example: 'فقد ساعدتَني كثيرًا', exampleTranslation: 'For indeed you helped me greatly' },
            ],
          },
        ],
      },
    },
    {
      type: 'linking-tools',
      data: {
        title: 'Category 3: Result (النتيجة)',
        titleAr: 'النتيجة',
        categories: [
          {
            name: 'Result',
            nameAr: 'النتيجة',
            tools: [
              { arabic: 'الفاء', english: 'so — introduces a consequence', example: 'سقط، فانكسَرَتْ رجلُه', exampleTranslation: 'He fell, so his leg broke' },
              { arabic: 'لذلك', english: 'therefore — states the result', example: 'أنامُ مُبكِّرًا، لذلك أستيقظ نشيطًا', exampleTranslation: 'I sleep early, therefore I wake up energized' },
              { arabic: 'لهذا', english: 'for this reason', example: 'لهذا يَحترمه زملاؤه', exampleTranslation: 'For this reason his colleagues respect him' },
            ],
          },
        ],
      },
    },
    {
      type: 'linking-tools',
      data: {
        title: 'Category 4: Contrast (المقابلة والمخالفة)',
        titleAr: 'المقابلة والمخالفة',
        categories: [
          {
            name: 'Contrast',
            nameAr: 'المقابلة والمخالفة',
            tools: [
              { arabic: 'إلّا أنّ', english: 'however — introduces contrast', example: 'ماجد ذكيٌّ، إلّا أنّه لا يبذلُ جُهدًا', exampleTranslation: 'Majid is smart, however he does not exert effort' },
              { arabic: 'على الرغم من', english: 'despite — concedes a point', example: 'على الرغم من أنّه ذكيّ', exampleTranslation: 'Despite being smart' },
              { arabic: 'بيد أنّ', english: 'yet — formal contrast', example: 'بيدَ أنّه لا يبذلُ جُهدًا', exampleTranslation: 'Yet he does not exert effort' },
            ],
          },
        ],
      },
    },
    {
      type: 'linking-tools',
      data: {
        title: 'Categories 5-7: Time & Addition',
        titleAr: 'التزامن والاقتران والإضافة',
        categories: [
          {
            name: 'Simultaneity (التزامن)',
            nameAr: 'التزامن',
            tools: [
              { arabic: 'بينما', english: 'while — two actions at once', example: 'بينما كنتُ أشربُ العصيرَ، كنتُ أقرأ القصّة', exampleTranslation: 'While I was drinking juice, I was reading the story' },
            ],
          },
          {
            name: 'Correlation (الاقتران)',
            nameAr: 'الاقتران',
            tools: [
              { arabic: 'لمّا', english: 'when — condition is met', example: 'لمّا يحين الوقتُ، اتصلْ بي', exampleTranslation: 'When the time comes, call me' },
              { arabic: 'عندما', english: 'when — at the time of', example: 'اتّصلْ بي عندما تنزل الطائرة', exampleTranslation: 'Call me when the plane lands' },
              { arabic: 'حينما', english: 'when — at the moment', example: 'حينما تبلغ الساعةُ السابعة، يُقرَعُ الجرسُ', exampleTranslation: 'When it reaches seven o\'clock, the bell rings' },
            ],
          },
          {
            name: 'Addition (الإضافة)',
            nameAr: 'الإضافة',
            tools: [
              { arabic: 'إلى جانب', english: 'besides — supplementary point', example: 'إلى جانب أنّها فرصة للمتعة', exampleTranslation: 'Besides it being an opportunity for enjoyment' },
              { arabic: 'بالإضافة إلى', english: 'in addition to', example: 'بالإضافة إلى أنّها وسيلة ترفيه', exampleTranslation: 'In addition to it being entertainment' },
              { arabic: 'علاوة على', english: 'moreover — emphasizes addition', example: 'علاوة على أنها مظهرٌ حضاريّ', exampleTranslation: 'Moreover, it is a mark of civilization' },
            ],
          },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-12-1',
      title: 'Classify the Linking Tool',
      titleAr: 'صنّف أداة الربط',
      instruction: 'Identify which category each linking tool belongs to.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-12-1-1',
            question: 'لذلك (therefore) belongs to which category?',
            options: ['Joining (الجمع)', 'Explanation (التفسير)', 'Result (النتيجة)', 'Contrast (المقابلة)'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-12-1-2',
            question: 'إلّا أنّ (however) belongs to which category?',
            options: ['Joining (الجمع)', 'Result (النتيجة)', 'Contrast (المقابلة)', 'Addition (الإضافة)'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-12-1-3',
            question: 'بسبب (due to) belongs to which category?',
            options: ['Joining (الجمع)', 'Explanation (التفسير)', 'Result (النتيجة)', 'Simultaneity (التزامن)'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-12-1-4',
            question: 'بالإضافة إلى (in addition to) belongs to which category?',
            options: ['Contrast (المقابلة)', 'Correlation (الاقتران)', 'Explanation (التفسير)', 'Addition (الإضافة)'],
            correctIndex: 3,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-12-1-5',
            question: 'بينما (while) belongs to which category?',
            options: ['Simultaneity (التزامن)', 'Correlation (الاقتران)', 'Joining (الجمع)', 'Result (النتيجة)'],
            correctIndex: 0,
          },
        },
      ],
    },
    {
      id: 'ex-12-2',
      title: 'Match Linking Tools to Meanings',
      titleAr: 'طابق أدوات الربط بمعانيها',
      instruction: 'Match each linking tool with its English meaning.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-12-2-1',
            pairs: [
              { left: 'ثمّ', right: 'then (delayed)' },
              { left: 'لذلك', right: 'therefore' },
              { left: 'بيد أنّ', right: 'yet' },
              { left: 'بينما', right: 'while' },
              { left: 'علاوة على', right: 'moreover' },
            ],
          },
        },
      ],
    },
    {
      id: 'ex-12-3',
      title: 'Fill in the Linking Tool',
      titleAr: 'أكمل بأداة الربط المناسبة',
      instruction: 'Choose the correct linking tool to complete each sentence.',
      questions: [
        {
          type: 'fill-blank',
          data: {
            id: 'q-12-3-1',
            sentence: 'أحبُّ اللغة العربيّة، ___ هي لغة القرآن',
            answer: 'فَ',
            hint: 'A linking tool that explains the reason (because)',
          },
        },
        {
          type: 'fill-blank',
          data: {
            id: 'q-12-3-2',
            sentence: 'أنامُ مُبكِّرًا، ___ أستيقظ نشيطًا',
            answer: 'لذلك',
            hint: 'A result word meaning "therefore"',
          },
        },
        {
          type: 'fill-blank',
          data: {
            id: 'q-12-3-3',
            sentence: 'ماجد ذكيٌّ، ___ لا يبذلُ جُهدًا',
            answer: 'إلّا أنّه',
            hint: 'A contrast word meaning "however"',
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-12',
    titleEn: 'Write Using Linking Tools',
    titleAr: 'اكتب باستخدام أدوات الربط',
    prompt: {
      promptEn: 'Write a paragraph about a topic you care about, using at least one linking tool from each of the 4 main categories: Joining, Explanation, Result, and Contrast.',
      promptAr: 'اكتب فقرة عن موضوع تهتمّ به مستخدمًا أداة ربط واحدة على الأقلّ من كلّ فئة.',
      targetLength: { min: 30, max: 65 },
      hints: [
        'Joining: و، ف، ثمّ',
        'Explanation: بسبب، لأنّ، فقد',
        'Result: لذلك، لهذا',
        'Contrast: إلّا أنّ، على الرغم من',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Joining',
        categoryAr: 'الجمع',
        words: [
          { arabic: 'الواو', english: 'and' },
          { arabic: 'الفاء', english: 'and then' },
          { arabic: 'ثمّ', english: 'then later' },
        ],
      },
      {
        categoryEn: 'Explanation',
        categoryAr: 'التفسير والتعليل',
        words: [
          { arabic: 'بسبب', english: 'due to' },
          { arabic: 'فقد', english: 'for indeed' },
        ],
      },
      {
        categoryEn: 'Result',
        categoryAr: 'النتيجة',
        words: [
          { arabic: 'لذلك', english: 'therefore' },
          { arabic: 'لهذا', english: 'for this reason' },
        ],
      },
      {
        categoryEn: 'Contrast',
        categoryAr: 'المقابلة',
        words: [
          { arabic: 'إلّا أنّ', english: 'however' },
          { arabic: 'على الرغم من', english: 'despite' },
          { arabic: 'بيد أنّ', english: 'yet' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-12-1', labelEn: 'Used a joining connector (و/ف/ثمّ)', labelAr: 'استخدام أداة جمع', examples: ['و', 'ف', 'ثمّ'], required: true },
      { id: 'gc-12-2', labelEn: 'Used an explanation connector', labelAr: 'استخدام أداة تفسير', examples: ['بسبب', 'فقد'], required: true },
      { id: 'gc-12-3', labelEn: 'Used a result connector', labelAr: 'استخدام أداة نتيجة', examples: ['لذلك', 'لهذا'], required: true },
      { id: 'gc-12-4', labelEn: 'Used a contrast connector', labelAr: 'استخدام أداة مقابلة', examples: ['إلّا أنّ', 'على الرغم من'], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
