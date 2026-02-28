import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson06: Lesson = {
  id: 'lesson-6',
  number: 6,
  titleAr: 'الجملة',
  titleEn: 'The Sentence',
  unitId: 'sentences',
  content: [
    {
      type: 'text',
      data: {
        content: 'The sentence (الجملة) has many types (أنواع كثيرة). In this lesson we study five fundamental types: the Idaafa (possessive) construction, the descriptive construction, the verbal sentence with subject, the verbal sentence with subject and object, and the passive voice.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Type 1: Idaafa Construction',
        titleAr: 'ما يتكوّن من اسم أضيف إلى غيره',
        headers: ['Arabic', 'Translation'],
        rows: [
          ['باب البيت', 'The door of the house'],
          ['كتاب المعلّم', 'The teacher\'s book'],
          ['ماء المطر', 'Rainwater'],
          ['يوم الجمعة', 'Friday'],
          ['درس الصباح', 'The morning lesson'],
          ['سوق القرية', 'The village market'],
          ['سائق السيارة', 'The car driver'],
        ],
        note: 'The Idaafa (إضافة) is a possessive/genitive construction where a noun is annexed to another.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Type 2: Descriptive Construction',
        titleAr: 'ما يتكوّن من اسم وصف بغيره',
        headers: ['Arabic', 'Translation'],
        rows: [
          ['درس نافع', 'A useful lesson'],
          ['تلميذ مجتهد', 'A diligent student'],
          ['كتاب صغير', 'A small book'],
          ['طبيب حاذق', 'A skilled doctor'],
          ['طالب ذكيّ', 'An intelligent student'],
          ['حاكم عادل', 'A just ruler'],
        ],
        note: 'The Na\'t/Sifa (نعت/صفة) is an adjectival description where a noun is described by another.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Type 3: Verbal Sentence (Verb + Subject)',
        titleAr: 'ما يتكوّن من فعل واسم (فاعل)',
        headers: ['Arabic', 'Translation', 'Verb', 'Subject'],
        rows: [
          ['حضر التلميذ', 'The student attended', 'حضر', 'التلميذ'],
          ['قرأ المدرّس', 'The teacher read', 'قرأ', 'المدرّس'],
          ['لعب الولد', 'The boy played', 'لعب', 'الولد'],
          ['جاء الربيع', 'Spring came', 'جاء', 'الربيع'],
          ['خرج الحارس', 'The guard went out', 'خرج', 'الحارس'],
          ['جلس المدير', 'The director sat', 'جلس', 'المدير'],
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Type 4: Verbal Sentence (Verb + Subject + Object)',
        titleAr: 'ما يتكوّن من فعل وفاعل ومفعول به',
        headers: ['Arabic', 'Translation', 'Verb', 'Subject', 'Object'],
        rows: [
          ['نصح المعلّم التلميذ', 'The teacher advised the student', 'نصح', 'المعلّم', 'التلميذ'],
          ['اشترى الأستاذ قلماً', 'The professor bought a pen', 'اشترى', 'الأستاذ', 'قلماً'],
          ['نسخ الكاتب النصّ', 'The scribe copied the text', 'نسخ', 'الكاتب', 'النصّ'],
          ['شرب الولدُ ماءً', 'The boy drank water', 'شرب', 'الولدُ', 'ماءً'],
          ['فتح التاجر الدكّان', 'The merchant opened the shop', 'فتح', 'التاجر', 'الدكّان'],
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Type 5: Passive Voice',
        titleAr: 'المبني للمجهول — نائب فاعل',
        headers: ['Arabic', 'Translation', 'Passive Verb', 'Deputy Subject'],
        rows: [
          ['كُسِرَ الكأسُ', 'The glass was broken', 'كُسِرَ', 'الكأسُ'],
          ['كُتِبَ الدرسُ', 'The lesson was written', 'كُتِبَ', 'الدرسُ'],
          ['قُرِئَ الكتابُ', 'The book was read', 'قُرِئَ', 'الكتابُ'],
          ['شُفِيَ المريضُ', 'The patient was healed', 'شُفِيَ', 'المريضُ'],
          ['ضُرِبَ الظالمُ', 'The oppressor was struck', 'ضُرِبَ', 'الظالمُ'],
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Passive Voice Formation',
        titleAr: 'تكوين المبني للمجهول',
        rule: 'In Arabic passive voice, the subject (فاعل) is removed, the object becomes the نائب فاعل (deputy subject) taking the nominative case (مرفوع), and the verb\'s vowel pattern changes.',
        examples: [
          { arabic: 'كَسَرَ → كُسِرَ', explanation: 'Active fa\'ala becomes passive fu\'ila: the first letter gets damma (ضمّة) and the second gets kasra (كسرة)' },
          { arabic: 'كَسَرَ الولدُ الكأسَ → كُسِرَ الكأسُ', explanation: 'Subject الولدُ removed; object الكأسَ becomes deputy subject الكأسُ (nominative)' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-6-1',
      title: 'Identify Sentence Types',
      titleAr: 'حدّد نوع الجملة',
      instruction: 'Choose the correct sentence type for each example.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-6-1-1',
            question: 'What type is: كتاب المعلّم (the teacher\'s book)?',
            options: ['Idaafa (إضافة)', 'Descriptive (نعت)', 'Verbal + Subject', 'Passive Voice'],
            correctIndex: 0,
            explanation: 'This is an Idaafa (possessive) construction — a noun annexed to another noun.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-6-1-2',
            question: 'What type is: تلميذ مجتهد (a diligent student)?',
            options: ['Idaafa (إضافة)', 'Descriptive (نعت)', 'Verbal + Subject', 'Passive Voice'],
            correctIndex: 1,
            explanation: 'This is a descriptive (Na\'t) construction — a noun described by an adjective.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-6-1-3',
            question: 'What type is: حضر التلميذ (the student attended)?',
            options: ['Idaafa (إضافة)', 'Descriptive (نعت)', 'Verbal + Subject (فعل + فاعل)', 'Passive Voice'],
            correctIndex: 2,
            explanation: 'This is a verbal sentence with a verb (حضر) and subject/doer (التلميذ).',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-6-1-4',
            question: 'What type is: كُتِبَ الدرسُ (the lesson was written)?',
            options: ['Idaafa (إضافة)', 'Verb + Subject + Object', 'Verbal + Subject', 'Passive Voice (مبني للمجهول)'],
            correctIndex: 3,
            explanation: 'This is passive voice — the subject is removed and the deputy subject (نائب فاعل) takes its place.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-6-1-5',
            question: 'What type is: نصح المعلّم التلميذ (the teacher advised the student)?',
            options: ['Idaafa (إضافة)', 'Descriptive (نعت)', 'Verb + Subject (فعل + فاعل)', 'Verb + Subject + Object (فعل + فاعل + مفعول)'],
            correctIndex: 3,
            explanation: 'This has a verb (نصح), subject (المعلّم), and object (التلميذ).',
          },
        },
      ],
    },
    {
      id: 'ex-6-2',
      title: 'Match Sentence Components',
      titleAr: 'طابق أجزاء الجملة',
      instruction: 'Match each sentence with its type.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-6-2-1',
            pairs: [
              { left: 'باب البيت', right: 'Idaafa (إضافة)' },
              { left: 'كتاب صغير', right: 'Descriptive (نعت)' },
              { left: 'جاء الربيع', right: 'Verb + Subject' },
              { left: 'شرب الولدُ ماءً', right: 'Verb + Subject + Object' },
              { left: 'قُرِئَ الكتابُ', right: 'Passive Voice' },
            ],
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-6',
    titleEn: 'Construct Different Sentence Types',
    titleAr: 'بناء أنواع الجمل المختلفة',
    prompt: {
      promptEn: 'Write 5 sentences, one for each sentence type: (1) Idafa/possessive, (2) Descriptive, (3) Verb+Subject, (4) Verb+Subject+Object, (5) Passive voice. Label each type.',
      promptAr: 'اكتب خمس جمل، واحدة لكلّ نوع: إضافة، نعت، فعل+فاعل، فعل+فاعل+مفعول، مبني للمجهول.',
      targetLength: { min: 15, max: 40 },
      hints: [
        'Idafa: noun + noun (باب البيت)',
        'Descriptive: noun + adjective (تلميذ مجتهد)',
        'Passive: change the vowels (كُسِرَ الكأسُ)',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Sentence Components',
        categoryAr: 'مكوّنات الجملة',
        words: [
          { arabic: 'باب البيت', english: 'door of the house (idafa)' },
          { arabic: 'درس نافع', english: 'useful lesson (descriptive)' },
          { arabic: 'حضر التلميذ', english: 'the student came (V+S)' },
          { arabic: 'نصح المعلّم التلميذَ', english: 'the teacher advised the student (V+S+O)' },
          { arabic: 'كُسِرَ الكأسُ', english: 'the glass was broken (passive)' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-6-1', labelEn: 'Wrote an Idafa (possessive) sentence', labelAr: 'كتابة جملة إضافة', examples: ['باب البيت', 'كتاب المعلّم'], required: true },
      { id: 'gc-6-2', labelEn: 'Wrote a descriptive (نعت) sentence', labelAr: 'كتابة جملة وصفية', examples: ['تلميذ مجتهد'], required: true },
      { id: 'gc-6-3', labelEn: 'Wrote a passive voice sentence', labelAr: 'كتابة جملة مبنية للمجهول', examples: ['كُسِرَ الكأسُ'], required: true },
      { id: 'gc-6-4', labelEn: 'Labeled each sentence type', labelAr: 'تسمية كلّ نوع جملة', examples: [], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
