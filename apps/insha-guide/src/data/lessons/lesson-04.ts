import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson04: Lesson = {
  id: 'lesson-4',
  number: 4,
  titleAr: 'أدوات الاستفهام ومعانيها',
  titleEn: 'Interrogative Tools and Their Meanings',
  unitId: 'sentences',
  content: [
    {
      type: 'text',
      data: {
        content: 'Arabic has 11 interrogative particles (أدوات الاستفهام): من، ما، ماذا، متى، لماذا، كيف، أي، أ، أين، هل، كم. Each serves a specific purpose for asking about people, things, time, place, reason, condition, choice, quantity, or confirmation.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Interrogative Tools',
        titleAr: 'أدوات الاستفهام',
        headers: ['Tool', 'Arabic', 'Usage', 'English'],
        rows: [
          ['مَنْ', 'man', 'For rational beings (people)', 'Who?'],
          ['ما', 'maa', 'For non-rational beings (things)', 'What?'],
          ['ماذا', 'maadhaa', 'For non-rational beings (things)', 'What?'],
          ['متى', 'mataa', 'Asking about time', 'When?'],
          ['لماذا', 'limaadhaa', 'About the reason', 'Why?'],
          ['كيف', 'kayfa', 'Asking about condition/state', 'How?'],
          ['أيّ', 'ayy', 'For choosing (rational & non-rational)', 'Which?'],
          ['أ', 'hamza', 'For confirming a matter (yes/no)', 'Did/Is...?'],
          ['أين', 'ayna', 'Asking about place', 'Where?'],
          ['هل', 'hal', 'For confirming a matter (yes/no)', 'Did/Is...?'],
          ['كم', 'kam', 'Asking about number/quantity', 'How many?'],
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Examples',
        titleAr: 'الأمثلة',
        headers: ['Arabic Question', 'Translation', 'Tool Used'],
        rows: [
          ['مَن بالباب؟', 'Who is at the door?', 'مَنْ (who)'],
          ['ما المادّة الّتي تحبّها؟', 'What subject do you like?', 'ما (what)'],
          ['ماذا تلعب؟', 'What are you playing?', 'ماذا (what)'],
          ['متى حصّة اللّغة؟', 'When is the language class?', 'متى (when)'],
          ['لماذا غبتَ؟', 'Why were you absent?', 'لماذا (why)'],
          ['كيف حالك؟', 'How are you?', 'كيف (how)'],
          ['أيّ كتاب أحبّ إليك؟', 'Which book is dearest to you?', 'أيّ (which)'],
          ['أكتبتَ الدرس؟', 'Did you write the lesson?', 'أ (yes/no)'],
          ['أين تسكن يا أحمد؟', 'Where do you live, Ahmad?', 'أين (where)'],
          ['هل أكملت المقرّر؟', 'Have you finished the curriculum?', 'هل (yes/no)'],
          ['كم طالباً في الصفّ؟', 'How many students in the class?', 'كم (how many)'],
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Key Grammar Notes',
        titleAr: 'ملاحظات نحوية',
        rule: 'Important distinctions between interrogative tools:',
        examples: [
          { arabic: 'مَنْ vs. ما/ماذا', explanation: 'مَنْ is exclusively for people (العاقل), while ما and ماذا are for things (غير العاقل)' },
          { arabic: 'هل vs. أ', explanation: 'Both are for yes/no questions, but أ (hamza) can also be used in alternative questions' },
          { arabic: 'أيّ', explanation: 'Unique — works for both people and things, used for selection/choice (لتخيير)' },
          { arabic: 'كيف', explanation: 'Asks about state/condition (الحال), not about manner or method' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-4-1',
      title: 'Choose the Correct Interrogative',
      titleAr: 'اختر أداة الاستفهام المناسبة',
      instruction: 'Fill in the blank with the correct interrogative tool.',
      questions: [
        {
          type: 'fill-blank',
          data: {
            id: 'q-4-1-1',
            sentence: '___ أبو البشر؟',
            answer: 'مَن',
            options: ['مَن', 'ما', 'كيف', 'أين'],
            hint: 'Who is the father of mankind?',
          },
        },
        {
          type: 'fill-blank',
          data: {
            id: 'q-4-1-2',
            sentence: '___ معنى الصلاة؟',
            answer: 'ما',
            options: ['ما', 'مَن', 'هل', 'كم'],
            hint: 'What is the meaning of prayer?',
          },
        },
        {
          type: 'fill-blank',
          data: {
            id: 'q-4-1-3',
            sentence: '___ يحج المسلمون؟',
            answer: 'متى',
            options: ['متى', 'أين', 'كيف', 'لماذا'],
            hint: 'When do Muslims perform Hajj?',
          },
        },
        {
          type: 'fill-blank',
          data: {
            id: 'q-4-1-4',
            sentence: '___ خلقنا الله؟',
            answer: 'لماذا',
            options: ['لماذا', 'متى', 'كيف', 'هل'],
            hint: 'Why did Allah create us?',
          },
        },
        {
          type: 'fill-blank',
          data: {
            id: 'q-4-1-5',
            sentence: '___ شهراً في السنة؟',
            answer: 'كم',
            options: ['كم', 'ما', 'أيّ', 'هل'],
            hint: 'How many months in the year?',
          },
        },
        {
          type: 'fill-blank',
          data: {
            id: 'q-4-1-6',
            sentence: '___ المواد تفضّل؟',
            answer: 'أيّ',
            options: ['أيّ', 'ما', 'هل', 'كم'],
            hint: 'Which subjects do you prefer?',
          },
        },
      ],
    },
    {
      id: 'ex-4-2',
      title: 'Match Questions to Answers',
      titleAr: 'طابق السؤال بالجواب',
      instruction: 'Match each question with its appropriate answer.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-4-2-1',
            pairs: [
              { left: 'كيف حالك؟', right: 'الحمد لله على كلّ حال' },
              { left: 'ماذا أكلت؟', right: 'أكلتُ طعام الغداء' },
              { left: 'متى تزورني؟', right: 'غداً إن شاء الله' },
              { left: 'هل اشتريت الكتاب؟', right: 'نعم، اشتريته' },
              { left: 'مَن خاتم الرسل؟', right: 'محمد ﷺ' },
            ],
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-4',
    titleEn: 'Write Questions Using Interrogatives',
    titleAr: 'اكتب أسئلة باستخدام أدوات الاستفهام',
    prompt: {
      promptEn: 'Write 8 questions in Arabic, each using a different interrogative tool. Then write the answer to each question.',
      promptAr: 'اكتب ثماني أسئلة بالعربية، كلّ سؤال يستخدم أداة استفهام مختلفة، ثمّ اكتب الإجابة.',
      targetLength: { min: 25, max: 60 },
      hints: [
        'Use: من، ما، متى، أين، كيف، لماذا، كم، هل',
        'Write the answer after each question',
        'Make your questions about everyday topics (school, family, hobbies)',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Interrogatives',
        categoryAr: 'أدوات الاستفهام',
        words: [
          { arabic: 'مَن', english: 'who' },
          { arabic: 'ما / ماذا', english: 'what' },
          { arabic: 'متى', english: 'when' },
          { arabic: 'أين', english: 'where' },
          { arabic: 'كيف', english: 'how' },
          { arabic: 'لماذا', english: 'why' },
          { arabic: 'كم', english: 'how many' },
          { arabic: 'هل', english: 'yes/no question' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-4-1', labelEn: 'Used at least 6 different interrogatives', labelAr: 'استخدام ٦ أدوات استفهام مختلفة', examples: ['من', 'ما', 'متى', 'أين', 'كيف', 'لماذا'], required: true },
      { id: 'gc-4-2', labelEn: 'Each question has an answer', labelAr: 'كلّ سؤال له إجابة', examples: [], required: true },
      { id: 'gc-4-3', labelEn: 'Used مَن for people only', labelAr: 'استخدام مَن للأشخاص فقط', examples: ['من المعلّم؟'], required: true },
      { id: 'gc-4-4', labelEn: 'Used هل for a yes/no question', labelAr: 'استخدام هل لسؤال نعم/لا', examples: ['هل أنت طالب؟'], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
