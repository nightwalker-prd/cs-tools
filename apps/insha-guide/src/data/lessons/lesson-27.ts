import type { Lesson } from '../types';

export const lesson27: Lesson = {
  id: 'lesson-27',
  number: 27,
  titleAr: 'الموضوعات الإنشائية',
  titleEn: 'Composition Methodology',
  unitId: 'spelling',
  content: [
    {
      type: 'text',
      data: {
        content: 'This lesson introduces the three-phase methodology for Arabic composition (الإنشاء). These phases — Reading, Discussion, and Writing — form the foundation for producing quality Arabic essays.',
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Phase 1: Reading (القراءة)',
        titleAr: 'المرحلة الأولى: القراءة',
        rule: 'Before writing, you must read extensively. This phase is done outside class and involves four steps: (1) Exploratory reading (قراءة استكشافية), (2) Reading with underlining new/difficult words, (3) Reading with dictionary lookup, and (4) Re-reading multiple times after lookups.',
        examples: [
          { arabic: 'قراءة استكشافية', explanation: 'First pass: get the general idea of the text' },
          { arabic: 'تحديد الكلمات الصعبة', explanation: 'Second pass: mark words you don\'t know' },
          { arabic: 'البحث في المعجم', explanation: 'Third pass: look up difficult words in the dictionary' },
          { arabic: 'إعادة القراءة', explanation: 'Fourth pass: re-read with full understanding' },
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Phase 2: Discussion (المناقشة)',
        titleAr: 'المرحلة الثانية: المناقشة',
        rule: 'The discussion phase involves three activities: (1) Explain difficult words and phrases, (2) Pose questions about the text, and (3) Learn others\' opinions. The teacher\'s role is described as: "A little from much, an arrow from a quiver, a drop from an ocean."',
        examples: [
          { arabic: 'شرح الكلمات الصعبة', explanation: 'Clarify vocabulary and expressions' },
          { arabic: 'طرح أسئلة عن النصّ', explanation: 'Ask and answer questions about the content' },
          { arabic: 'قليل من كثير وسهم من كنانة', explanation: 'A little from much — the teacher guides, not dictates' },
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Phase 3: Writing (الكتابة)',
        titleAr: 'المرحلة الثالثة: الكتابة',
        rule: 'Writing is done in the classroom. The student has nothing but a pen (القلم) and must compose from internalized knowledge gained through the reading and discussion phases.',
        examples: [
          { arabic: 'الكتابة داخل الفصل', explanation: 'Writing happens in class — no books, just a pen' },
          { arabic: 'الاعتماد على المعرفة المكتسبة', explanation: 'Rely on knowledge absorbed through reading and discussion' },
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'The Three Phases Summary',
        titleAr: 'ملخّص المراحل الثلاث',
        headers: ['Phase', 'Arabic', 'Where', 'Key Action'],
        rows: [
          ['1. Reading', 'القراءة', 'Outside class', 'Read, underline, look up, re-read'],
          ['2. Discussion', 'المناقشة', 'In class', 'Explain, question, share opinions'],
          ['3. Writing', 'الكتابة', 'In class', 'Compose from memory with pen only'],
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-27-1',
      title: 'Composition Methodology Quiz',
      titleAr: 'اختبار منهجية الإنشاء',
      instruction: 'Answer questions about the three-phase methodology.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-27-1-1',
            question: 'What is the first phase of composition?',
            options: ['Writing (الكتابة)', 'Discussion (المناقشة)', 'Reading (القراءة)', 'Editing (التحرير)'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-27-1-2',
            question: 'Where does the reading phase take place?',
            options: ['In class', 'Outside class', 'At the library only', 'During exams'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-27-1-3',
            question: 'During the writing phase, the student should have:',
            options: ['Books and references', 'Only a pen', 'A dictionary', 'Notes from reading'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-27-1-4',
            question: 'What is the correct order of reading steps?',
            options: [
              'Exploratory → Underline → Dictionary → Re-read',
              'Dictionary → Underline → Exploratory → Re-read',
              'Underline → Exploratory → Re-read → Dictionary',
              'Re-read → Exploratory → Dictionary → Underline',
            ],
            correctIndex: 0,
          },
        },
      ],
    },
    {
      id: 'ex-27-2',
      title: 'Match Phases to Activities',
      titleAr: 'طابق المراحل بالأنشطة',
      instruction: 'Match each activity with its correct phase.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-27-2-1',
            pairs: [
              { left: 'البحث في المعجم', right: 'Reading (القراءة)' },
              { left: 'شرح الكلمات الصعبة', right: 'Discussion (المناقشة)' },
              { left: 'الكتابة بالقلم فقط', right: 'Writing (الكتابة)' },
              { left: 'طرح أسئلة عن النصّ', right: 'Discussion (المناقشة)' },
            ],
          },
        },
      ],
    },
  ],
};
