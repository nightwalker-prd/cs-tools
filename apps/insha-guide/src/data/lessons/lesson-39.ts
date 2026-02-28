import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson39: Lesson = {
  id: 'lesson-39',
  number: 39,
  titleAr: 'المراسلة',
  titleEn: 'Correspondence (Al-Murasalah)',
  unitId: 'correspondence',
  content: [
    {
      type: 'text',
      data: {
        content: 'Correspondence (المراسلة) is a means of communication and connection between people, both in ancient and modern times. It comes in various forms: telegram (البرقية), social letter (الرسالة الاجتماعية), email (الرسالة الالكترونية), and fax (الفاكس). All share a common element: the sender (المرسل) and the recipient (المرسل إليه).',
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'The Telegram (البرقية)',
        titleAr: 'البرقية',
        rule: 'A telegram is a concise written message sent from one place to another. Types include congratulatory telegrams (برقيّات التهاني), condolence telegrams (برقيّة تعزية), and gratitude telegrams (برقية الشكر). Today, telegrams can also be sent via mobile phone or email.',
        examples: [
          { arabic: 'برقيّات التهاني', explanation: 'Congratulatory telegrams — for success, marriage, etc.' },
          { arabic: 'برقيّة تعزية', explanation: 'Condolence telegrams — for bereavement' },
          { arabic: 'برقية الشكر', explanation: 'Gratitude telegrams — for expressing thanks' },
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Characteristics of a Telegram',
        titleAr: 'خصائص البرقية',
        rule: 'A good telegram has three characteristics: (1) It should be concise and brief (أن تكون موجزة مختصرة), (2) It should be to the point (أن تكون في صلب الموضوع), (3) It should contain the name of the sender and the recipient (أن تشتمل على اسم المرسل والمرسل إليه).',
        examples: [
          { arabic: 'موجزة مختصرة', explanation: 'Concise and brief — no unnecessary words' },
          { arabic: 'في صلب الموضوع', explanation: 'To the point — directly about the topic' },
          { arabic: 'المرسل والمرسل إليه', explanation: 'Sender and recipient names — always included' },
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Telegram Structure',
        titleAr: 'بنية البرقية',
        headers: ['Part', 'Arabic', 'Description'],
        rows: [
          ['Recipient', 'المرسل إليه', 'Address with appropriate title (صديقي / أخي / بني)'],
          ['Body', 'نصّ البرقية', 'Concise message with congratulation, acknowledgment, and wish'],
          ['Sender', 'المرسل', 'Sign off with affectionate description'],
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-39-1',
      title: 'Correspondence Quiz',
      titleAr: 'اختبار المراسلة',
      instruction: 'Answer questions about correspondence and telegrams.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-39-1-1',
            question: 'What are the two essential elements of any correspondence?',
            options: [
              'The sender and the recipient',
              'The title and the body',
              'The date and the place',
              'The greeting and the closing',
            ],
            correctIndex: 0,
            explanation: 'المرسل والمرسل إليه — the sender and the recipient.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-39-1-2',
            question: 'Which is NOT a characteristic of a good telegram?',
            options: ['Concise and brief', 'To the point', 'Long and detailed', 'Contains sender and recipient names'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-39-1-3',
            question: 'برقيّة تعزية is a telegram for:',
            options: ['Congratulations', 'Condolences', 'Gratitude', 'Apology'],
            correctIndex: 1,
          },
        },
      ],
    },
    {
      id: 'ex-39-2',
      title: 'Match Telegram Types',
      titleAr: 'طابق أنواع البرقيات',
      instruction: 'Match each telegram type with its purpose.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-39-2-1',
            pairs: [
              { left: 'برقيّات التهاني', right: 'Congratulations (success, marriage)' },
              { left: 'برقيّة تعزية', right: 'Condolences (bereavement)' },
              { left: 'برقية الشكر', right: 'Gratitude (expressing thanks)' },
              { left: 'المرسل إليه', right: 'The recipient' },
            ],
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-39',
    titleEn: 'Write a Congratulatory Telegram',
    titleAr: 'اكتب برقية تهنئة',
    prompt: {
      promptEn: 'Write a congratulatory telegram to a friend who has passed their exams. Follow the telegram structure: recipient, body, and sender. Keep it concise and to the point.',
      promptAr: 'اكتب برقية تهنئة لصديقك الذي نجح في الامتحانات.',
      targetLength: { min: 15, max: 35 },
      hints: [
        'Address the recipient with an appropriate title (صديقي / أخي)',
        'Express your congratulations clearly',
        'Include a wish or prayer for their future',
        'Keep the language concise — telegrams are brief',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Greetings & Titles',
        categoryAr: 'تحيّات وألقاب',
        words: [
          { arabic: 'صديقي العزيز', english: 'my dear friend' },
          { arabic: 'أخي الكريم', english: 'my generous brother' },
          { arabic: 'بُنيّ', english: 'my son' },
        ],
      },
      {
        categoryEn: 'Congratulatory Phrases',
        categoryAr: 'عبارات التهنئة',
        words: [
          { arabic: 'مبروك النجاح', english: 'congratulations on success' },
          { arabic: 'أبارك لك', english: 'I congratulate you' },
          { arabic: 'أتمنّى لك التوفيق', english: 'I wish you success' },
          { arabic: 'بارك الله فيك', english: 'may God bless you' },
        ],
      },
      {
        categoryEn: 'Telegram Structure',
        categoryAr: 'بنية البرقية',
        words: [
          { arabic: 'المرسل إليه', english: 'recipient' },
          { arabic: 'نصّ البرقية', english: 'telegram body' },
          { arabic: 'المرسل', english: 'sender' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-39-1', labelEn: 'Included recipient name/title', labelAr: 'ذكر اسم المرسل إليه', examples: ['صديقي العزيز أحمد'], required: true },
      { id: 'gc-39-2', labelEn: 'Message is concise and brief', labelAr: 'الرسالة موجزة ومختصرة', examples: [], required: true },
      { id: 'gc-39-3', labelEn: 'Included a congratulation', labelAr: 'تضمين تهنئة', examples: ['مبروك', 'أبارك لك'], required: true },
      { id: 'gc-39-4', labelEn: 'Signed off with sender name', labelAr: 'التوقيع باسم المرسل', examples: ['أخوك المحبّ'], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
