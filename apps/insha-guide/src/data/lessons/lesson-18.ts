import type { Lesson } from '../types';

export const lesson18: Lesson = {
  id: 'lesson-18',
  number: 18,
  titleAr: 'قواعد الإملاء',
  titleEn: 'Spelling Rules Introduction',
  unitId: 'spelling',
  content: [
    {
      type: 'text',
      data: {
        content: 'Spelling rules (قواعد الإملاء), also called writing rules (قواعد الكتابة) or the science of script (علم الرسم), are essential for correct Arabic writing. Arabic scholars have given great attention to these rules, which are derived from Arabic speech patterns.',
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Goals of Studying Spelling Rules',
        titleAr: 'أهداف دراسة قواعد الإملاء',
        rule: 'There are three main goals: (1) Training students in correct, organized, rapid writing, (2) Clarifying the connection between grammar (نحو) and spelling as tools for language mastery, and (3) Benefiting from dictation texts to improve expression.',
        examples: [
          { arabic: 'الكتابة الصحيحة المنظّمة', explanation: 'Correct, organized writing — the primary goal' },
          { arabic: 'الربط بين النحو والإملاء', explanation: 'Connection between grammar and spelling — they reinforce each other' },
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Causes of Weak Writing',
        titleAr: 'أسباب ضعف الكتابة',
        rule: 'Three main causes of spelling weakness: (1) Lack of attention and unfamiliarity with rules, (2) Not correcting errors in every subject, and (3) Weak teaching of spelling rules. Correcting spelling should begin from the very start, alongside reading and writing.',
        examples: [
          { arabic: 'عدم الاهتمام بقواعد الإملاء', explanation: 'Not paying attention to spelling rules' },
          { arabic: 'عدم تصحيح الأخطاء', explanation: 'Not correcting errors across all subjects' },
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Key Spelling Topics',
        titleAr: 'موضوعات الإملاء الرئيسية',
        headers: ['Topic', 'Arabic', 'What You\'ll Learn'],
        rows: [
          ['Hamza', 'الهمزة', 'Wasl vs. Qat\', middle, and final hamza rules'],
          ['Taa', 'التاء المربوطة والمبسوطة', 'When to write ة vs. ت'],
          ['Soft Alif', 'الألف اللّيّنة', 'When to write ا vs. ى at the end'],
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-18-1',
      title: 'Spelling Goals Quiz',
      titleAr: 'اختبار أهداف الإملاء',
      instruction: 'Answer questions about the importance of spelling rules.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-18-1-1',
            question: 'What is the primary goal of studying spelling rules?',
            options: ['Memorizing vocabulary', 'Correct, organized, rapid writing', 'Understanding poetry', 'Speaking fluently'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-18-1-2',
            question: 'Which is NOT a cause of weak writing?',
            options: ['Lack of attention to rules', 'Not correcting errors', 'Reading too many books', 'Weak teaching of spelling'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-18-1-3',
            question: 'Spelling rules are connected to which other subject?',
            options: ['History (تاريخ)', 'Grammar (نحو)', 'Geography (جغرافيا)', 'Mathematics (رياضيات)'],
            correctIndex: 1,
          },
        },
      ],
    },
  ],
};
