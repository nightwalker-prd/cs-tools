import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson10: Lesson = {
  id: 'lesson-10',
  number: 10,
  titleAr: 'الفقرة',
  titleEn: 'The Paragraph',
  unitId: 'paragraphs',
  content: [
    {
      type: 'text',
      data: {
        content: 'The paragraph (الفقرة) consists of many sentences linked by conjunctions (حروف العطف: الواو، الفاء، ثمّ) and linking phrases. A well-structured paragraph presents one main idea with supporting sentences in logical order.',
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'What Makes a Good Paragraph?',
        titleAr: 'ما الفقرة الجيّدة؟',
        rule: 'A good Arabic paragraph has: (1) a clear topic sentence, (2) supporting details in logical order, (3) linking words connecting sentences, and (4) a concluding sentence.',
        examples: [
          { arabic: 'الواو — للجمع بدون ترتيب', explanation: 'Waw (and): joins without implying order' },
          { arabic: 'الفاء — للترتيب والتعقيب', explanation: 'Fa (then/so): joins with immediate sequence' },
          { arabic: 'ثمّ — للترتيب مع التراخي', explanation: 'Thumma (then): joins with delayed sequence' },
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Exercise: Reorder Sentences About Going to the Mosque',
        titleAr: 'رتّب الجمل — الذهاب إلى المسجد',
        headers: ['#', 'Arabic', 'Translation'],
        rows: [
          ['1', 'سمعتُ الأذان', 'I heard the call to prayer'],
          ['2', 'توضّأتُ', 'I performed ablution'],
          ['3', 'لبستُ ثيابي', 'I put on my clothes'],
          ['4', 'خرجتُ من البيت', 'I left the house'],
          ['5', 'مشيتُ إلى المسجد', 'I walked to the mosque'],
          ['6', 'دخلتُ المسجد', 'I entered the mosque'],
          ['7', 'صلّيتُ تحيّة المسجد', 'I prayed the mosque greeting prayer'],
          ['8', 'أُقيمت الصلاة', 'The prayer was called'],
          ['9', 'صلّيتُ مع الجماعة', 'I prayed with the congregation'],
        ],
        note: 'These sentences are in chronological order. In the exercise below, you will practice reordering scrambled versions.',
      },
    },
  ],
  exercises: [
    {
      id: 'ex-10-1',
      title: 'Order the Mosque Visit',
      titleAr: 'رتّب خطوات الذهاب إلى المسجد',
      instruction: 'Put the steps of going to the mosque in the correct chronological order.',
      questions: [
        {
          type: 'word-order',
          data: {
            id: 'q-10-1-1',
            words: ['دخلتُ المسجد', 'سمعتُ الأذان', 'خرجتُ من البيت', 'توضّأتُ'],
            answer: ['سمعتُ الأذان', 'توضّأتُ', 'خرجتُ من البيت', 'دخلتُ المسجد'],
            translation: 'I heard the adhan → I performed wudu → I left the house → I entered the mosque',
          },
        },
        {
          type: 'word-order',
          data: {
            id: 'q-10-1-2',
            words: ['صلّيتُ مع الجماعة', 'مشيتُ إلى المسجد', 'صلّيتُ تحيّة المسجد', 'لبستُ ثيابي'],
            answer: ['لبستُ ثيابي', 'مشيتُ إلى المسجد', 'صلّيتُ تحيّة المسجد', 'صلّيتُ مع الجماعة'],
            translation: 'I dressed → I walked to the mosque → I prayed tahiyyat al-masjid → I prayed with the congregation',
          },
        },
      ],
    },
    {
      id: 'ex-10-2',
      title: 'Choose the Right Connector',
      titleAr: 'اختر أداة الربط المناسبة',
      instruction: 'Choose the correct conjunction to connect each pair of sentences.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-10-2-1',
            question: 'سمعتُ الأذان ___ توضّأتُ (I heard the adhan ___ I performed wudu)',
            options: ['و (and)', 'ف (then immediately)', 'ثمّ (then later)', 'لكن (but)'],
            correctIndex: 1,
            explanation: 'الفاء indicates immediate sequence — hearing the adhan leads directly to performing wudu.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-10-2-2',
            question: 'صلّيتُ تحيّة المسجد ___ أُقيمت الصلاة (I prayed tahiyyah ___ the prayer was called)',
            options: ['و (and)', 'ف (then immediately)', 'ثمّ (then later)', 'لكن (but)'],
            correctIndex: 2,
            explanation: 'ثمّ indicates a delayed sequence — there is a time gap between the greeting prayer and the iqamah.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-10-2-3',
            question: 'لبستُ ثيابي ___ خرجتُ من البيت (I dressed ___ I left the house)',
            options: ['و (and)', 'ف (then immediately)', 'ثمّ (then later)', 'أو (or)'],
            correctIndex: 1,
            explanation: 'الفاء — dressing and leaving happen in immediate sequence.',
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-10',
    titleEn: 'Build a Paragraph from Sentences',
    titleAr: 'بناء فقرة من جمل',
    prompt: {
      promptEn: 'Write a paragraph about a daily routine (e.g., going to school or the mosque). Start with a topic sentence, add 4-5 supporting details in chronological order, and end with a conclusion.',
      promptAr: 'اكتب فقرة عن روتينك اليومي مع جملة رئيسية وتفاصيل مرتّبة زمنيًّا وخاتمة.',
      targetLength: { min: 30, max: 60 },
      hints: [
        'Use chronological linking words: و (and), ف (then), ثمّ (then later)',
        'Start with the main idea as the topic sentence',
        'End with a personal feeling or reflection',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Sequence Words',
        categoryAr: 'كلمات الترتيب',
        words: [
          { arabic: 'أوّلًا', english: 'first' },
          { arabic: 'ثمّ', english: 'then' },
          { arabic: 'بعد ذلك', english: 'after that' },
          { arabic: 'أخيرًا', english: 'finally' },
        ],
      },
      {
        categoryEn: 'Daily Activities',
        categoryAr: 'أنشطة يومية',
        words: [
          { arabic: 'استيقظت', english: 'I woke up' },
          { arabic: 'توضّأت', english: 'I made wudu' },
          { arabic: 'صلّيت', english: 'I prayed' },
          { arabic: 'تناولت الإفطار', english: 'I had breakfast' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-10-1', labelEn: 'Has a clear topic sentence', labelAr: 'جملة رئيسية واضحة', examples: [], required: true },
      { id: 'gc-10-2', labelEn: 'Details in chronological order', labelAr: 'التفاصيل مرتّبة زمنيًّا', examples: [], required: true },
      { id: 'gc-10-3', labelEn: 'Used linking words (و، ف، ثمّ)', labelAr: 'استخدام أدوات ربط', examples: ['و', 'ف', 'ثمّ'], required: true },
      { id: 'gc-10-4', labelEn: 'Ends with a conclusion or reflection', labelAr: 'خاتمة أو تأمّل', examples: [], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
