import type { Lesson } from '../types';

export const lesson16: Lesson = {
  id: 'lesson-16',
  number: 16,
  titleAr: 'علامات الترقيم',
  titleEn: 'Punctuation Marks',
  unitId: 'spelling',
  content: [
    {
      type: 'text',
      data: {
        content: 'Punctuation marks (علامات الترقيم) are essential for clear Arabic writing. They guide the reader through your text, indicating pauses, questions, emphasis, and the relationship between ideas.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Arabic Punctuation Marks',
        titleAr: 'علامات الترقيم العربية',
        headers: ['Mark', 'Arabic Name', 'Usage'],
        rows: [
          ['.', 'النقطة', 'End of complete sentences and after abbreviations'],
          [':', 'النقطتان', 'Before direct speech, examples, or definitions'],
          ['،', 'الفاصلة', 'Between clauses, after response particles (نعم، لا)'],
          ['؛', 'الفاصلة المنقوطة', 'Between causally connected clauses'],
          ['؟', 'علامة الاستفهام', 'End of questions'],
          ['!', 'علامة التعجب', 'After exclamations and strong emotions'],
          ['-', 'الشرطة', 'Between separated sentence parts, numerical divisions'],
          ['/', 'الشرطة المائلة', 'In dates, measurements, dialogue speaker changes'],
          ['--', 'الشرطتان', 'Enclosing parenthetical expressions'],
          ['" "', 'علامة التنصيص', 'Direct quotations and specific terms'],
          ['﴿ ﴾', 'القوسان المزخرفان', 'Enclosing Quranic verses'],
          ['( )', 'القوسان الهلاليان', 'Explanations, technical terms, emphasis'],
          ['[ ]', 'القوسان المربعان', 'Omissions [...] or errors [هكذا]'],
          ['...', 'النقاط', 'Et cetera, trailing off'],
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'The Period (النقطة)',
        titleAr: 'النقطة',
        rule: 'The period is used at the end of complete sentences, after abbreviations (أ. عثمان، د. حسين), and after enumeration words (أوّلاً، ثانياً).',
        examples: [
          { arabic: 'غادرت مكة يوم الجمعة.', explanation: 'End of a complete sentence' },
          { arabic: 'الكلمة: اسم، وفعل، وحرف.', explanation: 'After listing types of a thing' },
          { arabic: 'الهضبة: الأرض المرتفعة.', explanation: 'After a definition' },
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'The Comma and Semicolon',
        titleAr: 'الفاصلة والفاصلة المنقوطة',
        rule: 'The comma (،) separates clauses and items in a list. The semicolon (؛) connects two clauses where the second explains or is caused by the first.',
        examples: [
          { arabic: 'نعم، هذا صحيح.', explanation: 'Comma after response particle' },
          { arabic: 'جاء محمد، ثم علي.', explanation: 'Comma between conjoined items' },
          { arabic: 'لم ينجح علي؛ لأنه لم يذاكر.', explanation: 'Semicolon — the second clause explains the first' },
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Question Mark and Exclamation',
        titleAr: 'علامة الاستفهام والتعجب',
        rule: 'The question mark (؟) ends interrogative sentences. The exclamation mark (!) follows exclamatory speech, strong emotions, or rhetorical questions.',
        examples: [
          { arabic: 'هل اشتريت سيارة؟', explanation: 'Direct question' },
          { arabic: 'ما أشنع الخادع!', explanation: 'Exclamation of disgust' },
          { arabic: 'قال ﷺ: "إنما الأعمال بالنيات"', explanation: 'Quotation marks around hadith' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-16-1',
      title: 'Identify the Punctuation Mark',
      titleAr: 'حدّد علامة الترقيم',
      instruction: 'Choose the correct punctuation mark for each situation.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-16-1-1',
            question: 'End of a complete declarative sentence:',
            options: ['. (النقطة)', '؟ (علامة الاستفهام)', '! (علامة التعجب)', '، (الفاصلة)'],
            correctIndex: 0,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-16-1-2',
            question: 'Between two clauses where the second explains the first:',
            options: ['. (النقطة)', '، (الفاصلة)', '؛ (الفاصلة المنقوطة)', ': (النقطتان)'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-16-1-3',
            question: 'Before a direct quotation or definition:',
            options: ['. (النقطة)', '، (الفاصلة)', '؛ (الفاصلة المنقوطة)', ': (النقطتان)'],
            correctIndex: 3,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-16-1-4',
            question: 'After an exclamatory expression like ما أجمل!:',
            options: ['. (النقطة)', '؟ (الاستفهام)', '! (التعجب)', '؛ (الفاصلة المنقوطة)'],
            correctIndex: 2,
          },
        },
      ],
    },
    {
      id: 'ex-16-2',
      title: 'Match Marks to Names',
      titleAr: 'طابق العلامات بأسمائها',
      instruction: 'Match each punctuation mark with its Arabic name.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-16-2-1',
            pairs: [
              { left: '.', right: 'النقطة' },
              { left: '،', right: 'الفاصلة' },
              { left: '؟', right: 'علامة الاستفهام' },
              { left: '!', right: 'علامة التعجب' },
              { left: '؛', right: 'الفاصلة المنقوطة' },
            ],
          },
        },
      ],
    },
  ],
};
