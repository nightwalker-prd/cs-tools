import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson29: Lesson = {
  id: 'lesson-29',
  number: 29,
  titleAr: 'فوائد لغوية (١)',
  titleEn: 'Linguistic Benefits (1)',
  unitId: 'writing',
  content: [
    {
      type: 'text',
      data: {
        content: 'This lesson presents Arabic synonyms (مترادفات) grouped by concept. Enriching your vocabulary with synonyms is essential for descriptive writing. Read, understand, and memorize (اقرأ وافهم واحفظ).',
      },
    },
    {
      type: 'synonym-group',
      data: {
        title: 'Linguistic Benefits — Set 1',
        titleAr: 'فوائد لغوية (١)',
        groups: [
          {
            concept: 'Creation',
            conceptAr: 'الخلق / التكوين',
            words: [
              { arabic: 'خلق', english: 'created' },
              { arabic: 'فطرهم', english: 'originated them' },
              { arabic: 'ذرأهم', english: 'scattered/created them' },
              { arabic: 'برأهم', english: 'formed/shaped them' },
              { arabic: 'أنشأهم', english: 'brought them into being' },
              { arabic: 'جبلهم', english: 'molded them' },
            ],
            example: 'خلق اللّه الخلق وفطرهم، وذرأهم، وبرأهم، وأنشأهم',
          },
          {
            concept: 'Sunrise',
            conceptAr: 'طلوع الشمس',
            words: [
              { arabic: 'طلعت', english: 'rose' },
              { arabic: 'بزغت', english: 'emerged' },
              { arabic: 'أشرقت', english: 'shone' },
              { arabic: 'أضاءت', english: 'illuminated' },
            ],
          },
          {
            concept: 'Sunset',
            conceptAr: 'غروب الشمس',
            words: [
              { arabic: 'غابت', english: 'set' },
              { arabic: 'غربت', english: 'went west' },
              { arabic: 'أفلت', english: 'disappeared' },
            ],
          },
          {
            concept: 'Heat and Cold',
            conceptAr: 'الحرّ والبرد',
            words: [
              { arabic: 'يوم صائف', english: 'a hot summer day' },
              { arabic: 'قائظ', english: 'scorching' },
              { arabic: 'يوم قرّ', english: 'a cold day' },
            ],
          },
          {
            concept: 'Lightning',
            conceptAr: 'البرق',
            words: [
              { arabic: 'أومض', english: 'flashed' },
              { arabic: 'لمع', english: 'gleamed' },
              { arabic: 'سطع', english: 'shone brightly' },
              { arabic: 'تلألأ', english: 'sparkled' },
              { arabic: 'توهّج', english: 'glowed' },
            ],
          },
          {
            concept: 'Dwelling',
            conceptAr: 'السكن',
            words: [
              { arabic: 'استوطنت', english: 'settled in' },
              { arabic: 'سكنته', english: 'resided in it' },
              { arabic: 'قطنته', english: 'inhabited it' },
              { arabic: 'مسقط رأسي', english: 'my birthplace' },
            ],
          },
          {
            concept: 'Sleep',
            conceptAr: 'النوم',
            words: [
              { arabic: 'رقد', english: 'lay down / slept' },
              { arabic: 'سبات عميق', english: 'deep sleep' },
              { arabic: 'سنة', english: 'light slumber' },
              { arabic: 'القائلة', english: 'midday nap' },
            ],
          },
          {
            concept: 'Sleeplessness',
            conceptAr: 'السهر',
            words: [
              { arabic: 'سهرت', english: 'stayed up' },
              { arabic: 'أرقت', english: 'suffered insomnia' },
            ],
            example: 'ما اكتحلتْ عيني بنوم — my eyes did not taste sleep',
          },
          {
            concept: 'Famine',
            conceptAr: 'المجاعة',
            words: [
              { arabic: 'مخمصة', english: 'hunger/famine' },
              { arabic: 'سنة', english: 'drought/year of hardship' },
              { arabic: 'جدب', english: 'barrenness' },
              { arabic: 'قحط', english: 'drought' },
            ],
          },
          {
            concept: 'Subsistence vs. Affluence',
            conceptAr: 'كفاف العيش وسعته',
            words: [
              { arabic: 'كفاف العيش', english: 'barely enough to live on' },
              { arabic: 'رفاهة', english: 'luxury/affluence' },
              { arabic: 'رغد', english: 'comfortable living' },
              { arabic: 'رخاء', english: 'prosperity' },
            ],
          },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-29-1',
      title: 'Synonym Quiz',
      titleAr: 'اختبار المترادفات',
      instruction: 'Choose the correct meaning for each Arabic word.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-29-1-1',
            question: 'What does بزغت الشمس mean?',
            options: ['The sun set', 'The sun emerged', 'The sun burned', 'The sun hid'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-29-1-2',
            question: 'Which word means "deep sleep"?',
            options: ['سنة', 'سبات عميق', 'القائلة', 'أرقت'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-29-1-3',
            question: 'مسقط رأسي means:',
            options: ['My new home', 'My birthplace', 'My workplace', 'My favorite place'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-29-1-4',
            question: 'Which is a synonym for "drought/famine"?',
            options: ['رخاء', 'قحط', 'رغد', 'رفاهة'],
            correctIndex: 1,
          },
        },
      ],
    },
    {
      id: 'ex-29-2',
      title: 'Match Synonyms',
      titleAr: 'طابق المترادفات',
      instruction: 'Match each Arabic word with its English meaning.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-29-2-1',
            pairs: [
              { left: 'فطرهم', right: 'originated them' },
              { left: 'تلألأ', right: 'sparkled' },
              { left: 'قائظ', right: 'scorching' },
              { left: 'رقد', right: 'lay down / slept' },
              { left: 'جدب', right: 'barrenness' },
            ],
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-29',
    titleEn: 'Use Synonyms in Description',
    titleAr: 'استخدم المترادفات في الوصف',
    prompt: {
      promptEn: 'Write a descriptive paragraph about a natural scene (sunrise, storm, garden) using at least 6 synonym words from the lesson to enrich your vocabulary.',
      promptAr: 'اكتب فقرة وصفية عن مشهد طبيعي مستخدمًا ستّ كلمات مترادفة من الدرس.',
      targetLength: { min: 30, max: 60 },
      hints: [
        'Describe light: أومض، لمع، سطع، تلألأ',
        'Describe weather: حرّ، قيظ، برد، صقيع',
        'Describe settlement: أقام، استوطن، استقرّ',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Light & Radiance',
        categoryAr: 'النور والإشراق',
        words: [
          { arabic: 'أومض', english: 'flashed' },
          { arabic: 'لمع', english: 'gleamed' },
          { arabic: 'سطع', english: 'shone' },
          { arabic: 'تلألأ', english: 'sparkled' },
          { arabic: 'توهّج', english: 'glowed' },
        ],
      },
      {
        categoryEn: 'Weather',
        categoryAr: 'الطقس',
        words: [
          { arabic: 'حرّ', english: 'heat' },
          { arabic: 'قيظ', english: 'scorching heat' },
          { arabic: 'برد', english: 'cold' },
          { arabic: 'صقيع', english: 'frost' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-29-1', labelEn: 'Used at least 6 synonym words from the lesson', labelAr: 'استخدام ٦ مترادفات من الدرس', examples: [], required: true },
      { id: 'gc-29-2', labelEn: 'Wrote a coherent descriptive paragraph', labelAr: 'كتابة فقرة وصفية متماسكة', examples: [], required: true },
      { id: 'gc-29-3', labelEn: 'Avoided repeating the same word', labelAr: 'تجنّب تكرار نفس الكلمة', examples: [], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
