import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson03: Lesson = {
  id: 'lesson-3',
  number: 3,
  titleAr: 'تدريبات',
  titleEn: 'Exercises',
  unitId: 'foundations',
  content: [
    {
      type: 'text',
      data: {
        content: 'This lesson consolidates what you learned in Lessons 1 and 2 through practical exercises. You will practice identifying parts of speech, using prepositions correctly, reading comprehension, and testing your vocabulary with antonyms.',
      },
    },
    {
      type: 'model-essay',
      data: {
        title: 'The Story of Marwan',
        titleAr: 'قصة مروان',
        paragraphs: [
          {
            arabic: 'كان لمروان أبٌّ كريم يعطف عليه ويرعاه، ولما مات أصبح مروان يعاني من اليتم والفقر والحرمان. ولكنه لم ييأس، بل قرّر أن يعمل ليكسب قوت يومه.',
            translation: 'Marwan had a generous father who was kind to him. When his father died, Marwan suffered from being an orphan, poverty, and deprivation. But he did not despair; instead, he decided to work to earn his daily bread.',
          },
          {
            arabic: 'في طريقه لقي حماراً حزيناً قال إن صاحبه لم يعد يطعمه لأنه كبر ولم يعد يستطيع العمل. فقال مروان: لا تبتئس أيها الحمار الحزين! ثمّ وجدا كلباً كبيراً لم يعد يقدر على حراسة البيت والقطيع، وقطّاً كان يعيش في بيت يصيد الفئران ويقتل الحشرات لكنّهم طردوه لكبره.',
            translation: 'On his way he met a sad donkey whose owner no longer fed him because he was old and unable to work. Marwan said: "Do not despair, O sad donkey!" Then they found an old dog who could no longer guard the house and flock, and a cat who used to hunt mice and kill insects but was kicked out for being old.',
          },
          {
            arabic: 'سافروا إلى الغابة معاً. تسلّق الكلب شجرة عالية فرأى بيتاً فيه ضوء. تبيّن أنّ لصوصاً كانوا يقسمون ذهباً سرقوه من رجل مريض. فنهق الحمار ونبح الكلب وصاح مروان، ففرّ اللصوص خائفين تاركين الذهب. أعادوا الذهب إلى صاحبه فكافأهم، وعاشوا جميعاً سعداء.',
            translation: 'They traveled to the forest together. The dog climbed a tall tree and saw a house with light. It turned out that thieves were dividing gold they had stolen from a sick man. The donkey brayed, the dog barked, and Marwan shouted — the thieves fled in terror leaving behind the gold. They returned the gold to its owner, who rewarded them, and they all lived happily.',
          },
        ],
        questions: [
          'ماذا حدث لأب مروان؟ — What happened to Marwan\'s father?',
          'من لقي مروان في طريقه؟ — Who did Marwan meet on his way?',
          'كيف هربوا اللصوص؟ — How did they scare away the thieves?',
        ],
      },
    },
    {
      type: 'vocabulary-grid',
      data: {
        title: 'Key Grammar Vocabulary',
        titleAr: 'المصطلحات النحوية الأساسية',
        items: [
          { arabic: 'الكلمة', english: 'word' },
          { arabic: 'الاسم', english: 'noun' },
          { arabic: 'الفعل', english: 'verb' },
          { arabic: 'الحرف', english: 'particle / letter' },
          { arabic: 'المذكر', english: 'masculine' },
          { arabic: 'المؤنث', english: 'feminine' },
          { arabic: 'المفرد', english: 'singular' },
          { arabic: 'الجمع', english: 'plural' },
          { arabic: 'المصدر', english: 'verbal noun (masdar)' },
          { arabic: 'الماضي', english: 'past tense' },
          { arabic: 'المضارع', english: 'present tense' },
          { arabic: 'الأمر', english: 'imperative' },
          { arabic: 'حروف الجرّ', english: 'prepositions' },
          { arabic: 'حروف العطف', english: 'conjunctions' },
          { arabic: 'التنوين', english: 'nunation (tanwin)' },
          { arabic: 'الإنشاء', english: 'composition' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-3-1',
      title: 'Antonyms Quiz',
      titleAr: 'اختبر نفسك — الأضداد',
      instruction: 'Choose the correct opposite (antonym) for each word.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-3-1-1',
            question: 'What is the opposite of السواد (blackness)?',
            options: ['الشروق (sunrise)', 'النهار (daytime)', 'الضياء (light)', 'البياض (whiteness)'],
            correctIndex: 3,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-3-1-2',
            question: 'What is the opposite of فوق (above)?',
            options: ['أدنى (lower)', 'منخفض (low)', 'تحت (below)', 'وراء (behind)'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-3-1-3',
            question: 'What is the opposite of العقاب (punishment)?',
            options: ['المصافحة (handshake)', 'الموافقة (agreement)', 'العفو (forgiveness)', 'الرضا (satisfaction)'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-3-1-4',
            question: 'What is the opposite of المتكبر (the arrogant)?',
            options: ['المجامل (the polite)', 'المازح (the joker)', 'المتواضع (the humble)', 'المسامح (the forgiving)'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-3-1-5',
            question: 'What is the opposite of يتحدث (speaks)?',
            options: ['يصمت (is silent)', 'يخجل (is shy)', 'يمتنع (abstains)', 'يبكي (cries)'],
            correctIndex: 0,
          },
        },
      ],
    },
    {
      id: 'ex-3-2',
      title: 'Classify Words from the Story',
      titleAr: 'صنّف الكلمات من القصة',
      instruction: 'Identify the part of speech for words from the Marwan story.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-3-2-1',
            question: 'What part of speech is مروان in the story?',
            options: ['Noun (اسم)', 'Verb (فعل)', 'Particle (حرف)'],
            correctIndex: 0,
            explanation: 'مروان is a proper noun (اسم علم) — it refers to a person.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-3-2-2',
            question: 'What part of speech is قرّر (he decided) in the story?',
            options: ['Noun (اسم)', 'Verb (فعل)', 'Particle (حرف)'],
            correctIndex: 1,
            explanation: 'قرّر is a past tense verb — it accepts تاء الفاعل: قرّرتُ.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-3-2-3',
            question: 'What part of speech is ولكنّ (but) in the story?',
            options: ['Noun (اسم)', 'Verb (فعل)', 'Particle (حرف)'],
            correctIndex: 2,
            explanation: 'ولكنّ is a conjunction/particle — it does not accept signs of nouns or verbs.',
          },
        },
      ],
    },
    {
      id: 'ex-3-3',
      title: 'Match Grammar Terms',
      titleAr: 'طابق المصطلحات النحوية',
      instruction: 'Match each Arabic grammar term with its English meaning.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-3-3-1',
            pairs: [
              { left: 'المذكر', right: 'masculine' },
              { left: 'المؤنث', right: 'feminine' },
              { left: 'الماضي', right: 'past tense' },
              { left: 'المضارع', right: 'present tense' },
              { left: 'التنوين', right: 'nunation (tanwin)' },
            ],
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-3',
    titleEn: 'Write a Short Story',
    titleAr: 'اكتب قصة قصيرة',
    prompt: {
      promptEn: 'Write a short narrative (like the story of Marwan) about a boy or girl and their adventure. Use nouns, verbs, particles, and at least 2 pairs of antonyms.',
      promptAr: 'اكتب قصة قصيرة عن ولد أو بنت ومغامرتهم.',
      targetLength: { min: 20, max: 50 },
      hints: [
        'Give your character a name and describe them briefly',
        'Include a problem or challenge they face',
        'Use antonym pairs to create contrast (e.g., big/small, happy/sad)',
        'End with a resolution or moral lesson',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Antonym Pairs',
        categoryAr: 'أضداد',
        words: [
          { arabic: 'السواد / البياض', english: 'black / white' },
          { arabic: 'فوق / تحت', english: 'above / below' },
          { arabic: 'العقاب / العفو', english: 'punishment / forgiveness' },
          { arabic: 'الفرح / الحزن', english: 'joy / sadness' },
        ],
      },
      {
        categoryEn: 'Story Words',
        categoryAr: 'كلمات القصة',
        words: [
          { arabic: 'ذات يوم', english: 'one day' },
          { arabic: 'يتيم', english: 'orphan' },
          { arabic: 'رفيق', english: 'companion' },
          { arabic: 'أصدقاء', english: 'friends' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-3-1', labelEn: 'Used at least 2 antonym pairs', labelAr: 'استخدام زوجين من الأضداد', examples: ['فوق / تحت'], required: true },
      { id: 'gc-3-2', labelEn: 'Included nouns, verbs, and particles', labelAr: 'تضمين أسماء وأفعال وحروف', examples: [], required: true },
      { id: 'gc-3-3', labelEn: 'Story has a beginning, middle, and end', labelAr: 'القصة لها بداية ووسط ونهاية', examples: [], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
