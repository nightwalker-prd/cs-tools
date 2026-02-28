import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson37: Lesson = {
  id: 'lesson-37',
  number: 37,
  titleAr: 'تدريب: وصف شخص',
  titleEn: 'Exercise: Describing a Person',
  unitId: 'writing',
  content: [
    {
      type: 'text',
      data: {
        content: 'Now it is your turn to write a descriptive essay about a person! Using the model essays about the Prophet, a Mother, and a Scholar, compose your own essay describing someone you admire.',
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Person Description Structure',
        titleAr: 'بنية وصف الشخص',
        rule: 'When describing a person, follow this structure: (1) المقدّمة — Who is this person and your relationship to them, (2) الغرض — Their most important qualities (physical appearance, character, achievements), (3) الخاتمة — Your opinion and what you admire about them.',
        examples: [
          { arabic: 'من هذه الشخصيّة؟', explanation: 'Who is this personality? — Open your introduction' },
          { arabic: 'أهمّ الصفات الّتي يتحلّى بها', explanation: 'The most important qualities — Build your body paragraphs' },
          { arabic: 'ما رأيك فيه؟', explanation: 'What is your opinion? — Close with your conclusion' },
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Useful Descriptive Phrases for Persons',
        titleAr: 'عبارات وصفية مفيدة للأشخاص',
        headers: ['Arabic', 'English', 'Category'],
        rows: [
          ['قويّ الشخصيّة', 'strong in personality', 'Character'],
          ['كريم الصفات', 'noble in qualities', 'Character'],
          ['دائم التبسّم', 'always smiling', 'Appearance'],
          ['واسع الحلم', 'broad in forbearance', 'Character'],
          ['سريع الخاطر', 'quick in thought', 'Intellect'],
          ['وفيّ للإخوان', 'loyal to his brothers', 'Social'],
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-37-1',
      title: 'Description Categories',
      titleAr: 'فئات الوصف',
      instruction: 'Classify each descriptive phrase into the correct category.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-37-1-1',
            question: 'نحيف الجسم (slender of body) is a description of:',
            options: ['Character', 'Physical appearance', 'Intellect', 'Social behavior'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-37-1-2',
            question: 'صبورا حليما (patient and forbearing) is a description of:',
            options: ['Physical appearance', 'Intellect', 'Character', 'Social behavior'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-37-1-3',
            question: 'وافر العقل (abundant in intellect) is a description of:',
            options: ['Character', 'Physical appearance', 'Intellect', 'Social behavior'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-37-1-4',
            question: 'Which section should include your opinion about the person?',
            options: ['المقدّمة (Introduction)', 'الغرض (Body)', 'الخاتمة (Conclusion)', 'العنوان (Title)'],
            correctIndex: 2,
          },
        },
      ],
    },
    {
      id: 'ex-37-2',
      title: 'Match Descriptive Pairs',
      titleAr: 'طابق الأوصاف المزدوجة',
      instruction: 'The source essays often pair descriptions. Match each pair.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-37-2-1',
            pairs: [
              { left: 'شجاعا ___', right: 'مقداما (courageous)' },
              { left: 'سخيّا ___', right: 'جوادا (giving)' },
              { left: 'عفوا ___', right: 'مسامحا (tolerant)' },
              { left: 'صبورا ___', right: 'حليما (forbearing)' },
            ],
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-37',
    titleEn: 'Write a Person Description Essay',
    titleAr: 'اكتب موضوعًا وصفيًّا عن شخص',
    prompt: {
      promptEn: 'Write a complete descriptive essay about someone you know (teacher, friend, relative). Follow the 3-part structure: Introduction (who?), Body (qualities), Conclusion (your opinion).',
      promptAr: 'اكتب موضوعًا وصفيًّا كاملًا عن شخص تعرفه: مقدّمة وغرض وخاتمة.',
      targetLength: { min: 40, max: 80 },
      hints: [
        'Introduction: Who is this person and your relationship',
        'Body: Physical appearance, then character, then social behavior',
        'Conclusion: Your overall opinion and what you learned from them',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Descriptive Phrases',
        categoryAr: 'عبارات وصفية',
        words: [
          { arabic: 'قويّ الشخصيّة', english: 'strong personality' },
          { arabic: 'كريم الصفات', english: 'noble qualities' },
          { arabic: 'دائم التبسّم', english: 'always smiling' },
          { arabic: 'سريع الخاطر', english: 'quick in thought' },
        ],
      },
      {
        categoryEn: 'Essay Structure',
        categoryAr: 'بنية الموضوع',
        words: [
          { arabic: 'المقدّمة', english: 'introduction' },
          { arabic: 'الغرض', english: 'body' },
          { arabic: 'الخاتمة', english: 'conclusion' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-37-1', labelEn: 'Introduction names the person and relationship', labelAr: 'المقدّمة تذكر الشخص والعلاقة', examples: [], required: true },
      { id: 'gc-37-2', labelEn: 'Body covers multiple description categories', labelAr: 'الغرض يغطّي فئات وصف متعدّدة', examples: [], required: true },
      { id: 'gc-37-3', labelEn: 'Conclusion gives personal opinion', labelAr: 'الخاتمة تعطي رأيًا شخصيًّا', examples: [], required: true },
      { id: 'gc-37-4', labelEn: 'Used idafa constructions for descriptions', labelAr: 'استخدام الإضافة في الوصف', examples: ['قويّ الشخصيّة'], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
