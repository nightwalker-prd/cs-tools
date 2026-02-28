import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson33: Lesson = {
  id: 'lesson-33',
  number: 33,
  titleAr: 'فوائد لغوية (٢)',
  titleEn: 'Linguistic Benefits (2)',
  unitId: 'writing',
  content: [
    {
      type: 'text',
      data: {
        content: 'The second set of linguistic benefits covers synonyms related to distance, quantity, social behavior, character traits, and emotions. Read, understand, and memorize (اقرأ وافهم واحفظ).',
      },
    },
    {
      type: 'synonym-group',
      data: {
        title: 'Linguistic Benefits — Set 2',
        titleAr: 'فوائد لغوية (٢)',
        groups: [
          {
            concept: 'Proximity',
            conceptAr: 'قرب المسافة',
            words: [
              { arabic: 'قربت الدار', english: 'the house was nearby' },
              { arabic: 'دانت', english: 'it was close' },
              { arabic: 'بمرأى منّي', english: 'within my sight' },
            ],
          },
          {
            concept: 'Distance',
            conceptAr: 'بعد المسافة',
            words: [
              { arabic: 'بعدت الدار', english: 'the house was far' },
              { arabic: 'نأت', english: 'it was remote' },
              { arabic: 'النائي', english: 'the remote one' },
              { arabic: 'القاصي', english: 'the distant one' },
            ],
          },
          {
            concept: 'Little / Few',
            conceptAr: 'القلّة',
            words: [
              { arabic: 'القليل', english: 'little' },
              { arabic: 'اليسير', english: 'slight' },
              { arabic: 'التافه', english: 'trivial' },
              { arabic: 'الزهيد', english: 'meager' },
              { arabic: 'الطفيف', english: 'negligible' },
            ],
          },
          {
            concept: 'Much / Many',
            conceptAr: 'الكثرة',
            words: [
              { arabic: 'الكثير', english: 'much/many' },
              { arabic: 'الجمّ', english: 'abundant' },
              { arabic: 'الكثيف', english: 'dense' },
              { arabic: 'الغمر', english: 'copious' },
            ],
          },
          {
            concept: 'Cooperation',
            conceptAr: 'التعاون',
            words: [
              { arabic: 'عاونت', english: 'I helped/cooperated' },
              { arabic: 'آزرته', english: 'I supported him' },
              { arabic: 'عاضدته', english: 'I assisted him' },
              { arabic: 'نصرته', english: 'I aided him' },
            ],
          },
          {
            concept: 'Discord',
            conceptAr: 'التخاذل',
            words: [
              { arabic: 'تخاذل القوم', english: 'the people let each other down' },
              { arabic: 'تدابروا', english: 'they turned their backs' },
              { arabic: 'تفرّقت كلمتهم', english: 'their unity was divided' },
              { arabic: 'تشتّت شملهم', english: 'their unity was scattered' },
            ],
          },
          {
            concept: 'Obedience',
            conceptAr: 'الإطاعة',
            words: [
              { arabic: 'سلس القياد', english: 'easy to lead' },
              { arabic: 'ليّن العريكة', english: 'gentle-natured' },
              { arabic: 'مطيع', english: 'obedient' },
            ],
          },
          {
            concept: 'Fierceness',
            conceptAr: 'الشراسة',
            words: [
              { arabic: 'شرس الطباع', english: 'fierce-natured' },
              { arabic: 'متوحش', english: 'savage' },
              { arabic: 'سيّئ الخلق', english: 'bad-tempered' },
              { arabic: 'صعب المزاج', english: 'difficult temperament' },
            ],
          },
          {
            concept: 'Contentment',
            conceptAr: 'القناعة والرضاء',
            words: [
              { arabic: 'قانع', english: 'content' },
              { arabic: 'قنوع', english: 'satisfied' },
              { arabic: 'عفيف', english: 'modest/chaste' },
            ],
            example: 'ارض بما قسم الله لك — be content with what Allah has allotted for you',
          },
          {
            concept: 'Greed',
            conceptAr: 'الطمع',
            words: [
              { arabic: 'اشرأبّ إلى الشيء', english: 'craned his neck (coveted)' },
              { arabic: 'حرص عليه', english: 'was eager for it' },
              { arabic: 'شره فيه', english: 'was greedy for it' },
            ],
          },
          {
            concept: 'Compassion',
            conceptAr: 'الشفقة',
            words: [
              { arabic: 'يشفق عليه', english: 'has compassion' },
              { arabic: 'يحنو', english: 'shows tenderness' },
              { arabic: 'يرؤف به', english: 'is gentle with him' },
              { arabic: 'يرقّ له', english: 'is soft toward him' },
            ],
          },
          {
            concept: 'Oppression',
            conceptAr: 'الظلم',
            words: [
              { arabic: 'الجور', english: 'injustice' },
              { arabic: 'الظلم', english: 'oppression' },
              { arabic: 'الحيف', english: 'unfairness' },
              { arabic: 'التعسّف', english: 'tyranny' },
            ],
          },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-33-1',
      title: 'Synonym Quiz — Set 2',
      titleAr: 'اختبار المترادفات — المجموعة ٢',
      instruction: 'Choose the correct meaning.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-33-1-1',
            question: 'What does نأت mean?',
            options: ['It was close', 'It was remote', 'It was beautiful', 'It was old'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-33-1-2',
            question: 'Which word means "abundant"?',
            options: ['القليل', 'الزهيد', 'الجمّ', 'الطفيف'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-33-1-3',
            question: 'سلس القياد describes someone who is:',
            options: ['Fierce', 'Easy to lead', 'Greedy', 'Savage'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-33-1-4',
            question: 'Which group does يشفق عليه belong to?',
            options: ['Oppression', 'Compassion', 'Discord', 'Greed'],
            correctIndex: 1,
          },
        },
      ],
    },
    {
      id: 'ex-33-2',
      title: 'Match Opposites',
      titleAr: 'طابق الأضداد',
      instruction: 'Match each concept with its opposite.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-33-2-1',
            pairs: [
              { left: 'قرب المسافة (proximity)', right: 'بعد المسافة (distance)' },
              { left: 'التعاون (cooperation)', right: 'التخاذل (discord)' },
              { left: 'الإطاعة (obedience)', right: 'الشراسة (fierceness)' },
              { left: 'القناعة (contentment)', right: 'الطمع (greed)' },
              { left: 'الشفقة (compassion)', right: 'الظلم (oppression)' },
            ],
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-33',
    titleEn: 'Use Character Trait Synonyms',
    titleAr: 'استخدم مترادفات صفات الشخصية',
    prompt: {
      promptEn: 'Write a paragraph describing someone you admire, using at least 5 synonym words from the lesson (cooperation, contentment, compassion, etc.).',
      promptAr: 'اكتب فقرة تصف شخصًا تعجب به مستخدمًا ٥ مترادفات من الدرس.',
      targetLength: { min: 30, max: 60 },
      hints: [
        'Describe their cooperation: عاون، آزر، ناصر',
        'Mention contentment: قانع، عفيف',
        'Include compassion: يشفق، يحنو، يرؤف',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Cooperation',
        categoryAr: 'التعاون',
        words: [
          { arabic: 'عاون', english: 'assisted' },
          { arabic: 'آزر', english: 'supported' },
          { arabic: 'ناصر', english: 'championed' },
        ],
      },
      {
        categoryEn: 'Contentment',
        categoryAr: 'القناعة',
        words: [
          { arabic: 'قانع', english: 'content' },
          { arabic: 'عفيف', english: 'chaste/modest' },
        ],
      },
      {
        categoryEn: 'Compassion',
        categoryAr: 'الشفقة',
        words: [
          { arabic: 'يشفق', english: 'has compassion' },
          { arabic: 'يحنو', english: 'shows tenderness' },
          { arabic: 'يرؤف', english: 'is merciful' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-33-1', labelEn: 'Used at least 5 synonyms from the lesson', labelAr: 'استخدام ٥ مترادفات من الدرس', examples: [], required: true },
      { id: 'gc-33-2', labelEn: 'Wrote a coherent descriptive paragraph', labelAr: 'فقرة وصفية متماسكة', examples: [], required: true },
      { id: 'gc-33-3', labelEn: 'Described multiple character traits', labelAr: 'وصف صفات شخصية متعدّدة', examples: [], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
