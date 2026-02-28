import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson36: Lesson = {
  id: 'lesson-36',
  number: 36,
  titleAr: 'وصف أديب عالم',
  titleEn: 'Describing a Scholar',
  unitId: 'writing',
  content: [
    {
      type: 'text',
      data: {
        content: 'This lesson presents a model essay describing a learned scholar. It demonstrates describing physical appearance, character traits, intellectual qualities, and habits — all key elements of person description.',
      },
    },
    {
      type: 'model-essay',
      data: {
        title: 'Description of a Learned Scholar',
        titleAr: 'وصف أديب عالم',
        paragraphs: [
          {
            arabic: 'كان من أكمل من رأيت في أخلاقه وآدابه وشمائله، كان أبيض اللون نحيف الجسم، ربعة القدّ أقرب إلى القصر منه إلى الطول، غضيض الطرف، كثير الإطراق، خافض الصوت، خفيف الروح، دائم التبسّم.',
            translation: 'He was among the most complete people I have seen in his morals, manners, and character traits. He was white-skinned, slender of body, of medium build closer to short than tall, with lowered gaze, often looking down, soft-voiced, light of spirit, always smiling.',
          },
          {
            arabic: 'وكان تقيّاً ناسكا، واسع الحلم، سليم القلب، نزيه النفس واللسان والقلم، برّاً بالأهل، وفيّاً للإخوان، يأخذ مما صفي ويدع ما كدر، عائلا عفيفا قانعا.',
            translation: 'He was pious and devout, broad in forbearance, sound of heart, upright in soul, tongue, and pen, dutiful to his family, loyal to his brothers, taking what was pure and leaving what was turbid.',
          },
          {
            arabic: 'فقد كان طلق المحيّا، وافر المادّة وافر العقل سريع الخاطر، سريع الكتابة، جميل العهد، جميل الودّ، وما اجتمع به أحد إلّا وتمنّى لو طال بحديثه استمتاعه.',
            translation: 'He was cheerful of face, abundant in resources and intellect, quick in thought, swift in writing, beautiful in his covenants and friendships. No one sat with him except wishing his conversation would last longer.',
          },
          {
            arabic: 'وأما همّته العالية واستغلاله لأوقاته فقد كان مضرب المثل في ذلك، وكم كان يعجب من الناس الذين يمرّ بهم جالسين في اللهو واللعب ويقول: ما أرخص وقت هؤلاء عليهم.',
            translation: 'As for his lofty ambition and his utilization of time, he was the exemplar in that. He used to wonder at people sitting in amusement and say: "How cheap is the time of these people to them!"',
          },
        ],
        vocabulary: [
          { arabic: 'نحيف الجسم', english: 'slender of body' },
          { arabic: 'غضيض الطرف', english: 'with lowered gaze' },
          { arabic: 'خافض الصوت', english: 'soft-voiced' },
          { arabic: 'دائم التبسّم', english: 'always smiling' },
          { arabic: 'واسع الحلم', english: 'broad in forbearance' },
          { arabic: 'سليم القلب', english: 'sound of heart' },
          { arabic: 'طلق المحيّا', english: 'cheerful of face' },
          { arabic: 'سريع الخاطر', english: 'quick in thought' },
          { arabic: 'مضرب المثل', english: 'the exemplar' },
          { arabic: 'همّته العالية', english: 'lofty ambition' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-36-1',
      title: 'Scholar Description Quiz',
      titleAr: 'اختبار وصف العالم',
      instruction: 'Answer questions about the essay.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-36-1-1',
            question: 'The scholar\'s build was described as:',
            options: ['Tall and large', 'Medium, closer to short', 'Very short', 'Athletic'],
            correctIndex: 1,
            explanation: 'ربعة القدّ أقرب إلى القصر — of medium build closer to short.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-36-1-2',
            question: 'What did the scholar say about people wasting time?',
            options: [
              '"Time is money"',
              '"How cheap is their time to them!"',
              '"They should study more"',
              '"Idle hands are the devil\'s workshop"',
            ],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-36-1-3',
            question: 'What does طلق المحيّا mean?',
            options: ['Quick in thought', 'Cheerful of face', 'Soft-voiced', 'Always smiling'],
            correctIndex: 1,
          },
        },
      ],
    },
    {
      id: 'ex-36-2',
      title: 'Match Character Traits',
      titleAr: 'طابق صفات الشخصية',
      instruction: 'Match each Arabic trait with its English meaning.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-36-2-1',
            pairs: [
              { left: 'غضيض الطرف', right: 'with lowered gaze' },
              { left: 'واسع الحلم', right: 'broad in forbearance' },
              { left: 'سريع الخاطر', right: 'quick in thought' },
              { left: 'همّته العالية', right: 'lofty ambition' },
              { left: 'مضرب المثل', right: 'the exemplar' },
            ],
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-36',
    titleEn: 'Describe a Learned Person',
    titleAr: 'صف عالمًا أو أديبًا',
    prompt: {
      promptEn: 'Write a multi-dimensional description of a scholar or learned person. Cover their physical appearance, character, intellect, and values.',
      promptAr: 'اكتب وصفًا متعدّد الأبعاد لعالم أو أديب: مظهره وشخصيته وعقله وقيمه.',
      targetLength: { min: 35, max: 70 },
      hints: [
        'Physical: نحيف الجسم، ربعة القدّ',
        'Character: تقي، واسع الحلم',
        'Intellect: وافر العقل، سريع الخاطر',
        'Organize by category, not randomly',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Physical Description',
        categoryAr: 'وصف جسدي',
        words: [
          { arabic: 'نحيف الجسم', english: 'slender of body' },
          { arabic: 'ربعة القدّ', english: 'medium height' },
          { arabic: 'غضيض الطرف', english: 'lowered gaze' },
          { arabic: 'دائم التبسّم', english: 'always smiling' },
        ],
      },
      {
        categoryEn: 'Character & Intellect',
        categoryAr: 'شخصية وعقل',
        words: [
          { arabic: 'واسع الحلم', english: 'broad in forbearance' },
          { arabic: 'وافر العقل', english: 'abundant in intellect' },
          { arabic: 'سريع الخاطر', english: 'quick in thought' },
          { arabic: 'وفيّ للإخوان', english: 'loyal to friends' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-36-1', labelEn: 'Described physical appearance', labelAr: 'وصف المظهر الجسدي', examples: ['نحيف الجسم'], required: true },
      { id: 'gc-36-2', labelEn: 'Described character traits', labelAr: 'وصف صفات الشخصية', examples: ['واسع الحلم'], required: true },
      { id: 'gc-36-3', labelEn: 'Described intellectual qualities', labelAr: 'وصف صفات عقلية', examples: ['وافر العقل'], required: true },
      { id: 'gc-36-4', labelEn: 'Organized by category', labelAr: 'ترتيب حسب الفئة', examples: [], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
