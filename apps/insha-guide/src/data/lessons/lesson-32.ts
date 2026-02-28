import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson32: Lesson = {
  id: 'lesson-32',
  number: 32,
  titleAr: 'تدريب: وصف مكان',
  titleEn: 'Exercise: Describing a Place',
  unitId: 'writing',
  content: [
    {
      type: 'text',
      data: {
        content: 'Now it is your turn to write! Using what you learned from the model essays (My School, My House, A Day in Nature), write a descriptive essay about a place you know well.',
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Essay Structure',
        titleAr: 'بنية الموضوع',
        rule: 'Every descriptive essay should have three parts: (1) المقدّمة (Introduction) — introduce the place and your relationship to it, (2) الغرض (Body) — describe its most important characteristics, and (3) الخاتمة (Conclusion) — share your opinion or feeling about it.',
        examples: [
          { arabic: 'ما هو هذا المكان؟', explanation: 'What is this place? — Open your introduction' },
          { arabic: 'أهمّ الصفات التي يتميز بها', explanation: 'The most important characteristics — Build your body paragraphs' },
          { arabic: 'ما رأيك فيه؟', explanation: 'What is your opinion? — Close with your conclusion' },
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Useful Descriptive Phrases for Places',
        titleAr: 'عبارات وصفية مفيدة للأماكن',
        headers: ['Arabic', 'English', 'Use'],
        rows: [
          ['واسع / فسيح', 'spacious', 'Describing rooms or areas'],
          ['جميل / بديع', 'beautiful / wonderful', 'General positive description'],
          ['غنّاء / خضراء', 'lush / green', 'Gardens and nature'],
          ['نظيف / مرتّب', 'clean / tidy', 'Interior spaces'],
          ['هادئ / مريح', 'quiet / comfortable', 'Atmosphere'],
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-32-1',
      title: 'Essay Structure Quiz',
      titleAr: 'اختبار بنية الموضوع',
      instruction: 'Test your knowledge of descriptive essay structure.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-32-1-1',
            question: 'What are the three parts of a descriptive essay?',
            options: [
              'Introduction, Body, Conclusion',
              'Title, Body, Summary',
              'Opening, Middle, End',
              'Question, Answer, Opinion',
            ],
            correctIndex: 0,
            explanation: 'المقدّمة، الغرض، الخاتمة — Introduction, Body, Conclusion.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-32-1-2',
            question: 'In the body (الغرض), you should:',
            options: [
              'Share your opinion only',
              'Describe the most important characteristics',
              'Ask the reader a question',
              'Copy from another essay',
            ],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-32-1-3',
            question: 'Which word means "spacious"?',
            options: ['غنّاء', 'واسع', 'هادئ', 'نظيف'],
            correctIndex: 1,
          },
        },
      ],
    },
    {
      id: 'ex-32-2',
      title: 'Order the Essay Parts',
      titleAr: 'رتّب أجزاء الموضوع',
      instruction: 'Put the essay elements in the correct order.',
      questions: [
        {
          type: 'word-order',
          data: {
            id: 'q-32-2-1',
            words: ['الخاتمة (ما رأيك فيه؟)', 'المقدّمة (ما هو المكان؟)', 'الغرض (أهمّ الصفات)'],
            answer: ['المقدّمة (ما هو المكان؟)', 'الغرض (أهمّ الصفات)', 'الخاتمة (ما رأيك فيه؟)'],
            translation: 'Introduction → Body → Conclusion',
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-32',
    titleEn: 'Describe a Place You Know',
    titleAr: 'صف مكانًا تعرفه',
    prompt: {
      promptEn: 'Write a complete descriptive essay about a place (mosque, park, market). Follow the 3-part structure: المقدّمة (Introduction), الغرض (Body), الخاتمة (Conclusion).',
      promptAr: 'اكتب موضوعًا وصفيًّا كاملًا عن مكان تعرفه: مقدّمة وغرض وخاتمة.',
      targetLength: { min: 40, max: 80 },
      hints: [
        'Introduction: What is this place and why is it special?',
        'Body: Describe its appearance, size, colors, sounds, people',
        'Conclusion: Your personal opinion or feeling about it',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Descriptive Adjectives',
        categoryAr: 'صفات وصفية',
        words: [
          { arabic: 'واسع', english: 'spacious' },
          { arabic: 'جميل', english: 'beautiful' },
          { arabic: 'نظيف', english: 'clean' },
          { arabic: 'هادئ', english: 'quiet' },
          { arabic: 'غنّاء', english: 'lush/rich' },
        ],
      },
      {
        categoryEn: 'Essay Structure',
        categoryAr: 'بنية الموضوع',
        words: [
          { arabic: 'المقدّمة', english: 'introduction' },
          { arabic: 'الغرض', english: 'body/purpose' },
          { arabic: 'الخاتمة', english: 'conclusion' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-32-1', labelEn: 'Has a clear introduction (المقدّمة)', labelAr: 'مقدّمة واضحة', examples: [], required: true },
      { id: 'gc-32-2', labelEn: 'Body describes the place in detail', labelAr: 'الغرض يصف المكان بالتفصيل', examples: [], required: true },
      { id: 'gc-32-3', labelEn: 'Has a conclusion with personal opinion', labelAr: 'خاتمة برأي شخصي', examples: [], required: true },
      { id: 'gc-32-4', labelEn: 'Used descriptive adjectives', labelAr: 'استخدام صفات وصفية', examples: ['واسع', 'جميل'], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
