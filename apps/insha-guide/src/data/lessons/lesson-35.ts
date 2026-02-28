import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson35: Lesson = {
  id: 'lesson-35',
  number: 35,
  titleAr: 'وصف أمّ',
  titleEn: 'Describing a Mother',
  unitId: 'writing',
  content: [
    {
      type: 'text',
      data: {
        content: 'This lesson presents a beautiful essay about the mother, followed by famous poetry by Hafiz Ibrahim. The essay demonstrates emotional and literary descriptive writing about a person.',
      },
    },
    {
      type: 'model-essay',
      data: {
        title: 'Description of a Mother',
        titleAr: 'وصف أمّ',
        paragraphs: [
          {
            arabic: 'إنّ من أعظم ما تكلّمت به الشّفاه كلمة "يا أمّي"، فهي تحمل معاني الحبّ والحنان والعطف، لا يعرف لها حدود، لا نملّ جميعا من تكرارها، بل تزداد كلّ يوم ارتقاء وسموا ورفعة.',
            translation: 'Among the greatest things that lips have spoken is the word "O my mother." It carries the meanings of love, compassion, and tenderness. It knows no limits. We never tire of repeating it; rather, it increases every day in elevation, sublimity, and loftiness.',
          },
          {
            arabic: 'تؤثّر غيرها على كل ما تحتاجه وتتمناه كي تسعد أطفالها وأسرتها. ويظلّ الكلام ناقصاً مهما اكتمل عن الأمّ.',
            translation: 'She puts others before herself in everything she needs and desires so that her children and family are happy. Words remain incomplete no matter how they are perfected when describing a mother.',
          },
          {
            arabic: 'لكنّنا نُجيد لغة الانحناء لتقبيل الّتي كانت بالنسبة لكلّ الأبناء "الأرض المعطاء".',
            translation: 'But we master the language of bowing to kiss the one who, for all children, was "the giving earth."',
          },
        ],
        vocabulary: [
          { arabic: 'الشّفاه', english: 'lips' },
          { arabic: 'الحبّ والحنان', english: 'love and compassion' },
          { arabic: 'العطف', english: 'tenderness/sympathy' },
          { arabic: 'ارتقاء وسموا ورفعة', english: 'elevation, sublimity, loftiness' },
          { arabic: 'تؤثّر غيرها', english: 'puts others before herself' },
          { arabic: 'الأرض المعطاء', english: 'the giving earth' },
          { arabic: 'لغة الانحناء', english: 'the language of bowing' },
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Poetry by Hafiz Ibrahim',
        titleAr: 'شعر حافظ إبراهيم',
        rule: 'The famous Egyptian poet Hafiz Ibrahim wrote these lines about the mother, using three powerful metaphors: school, garden, and teacher of teachers.',
        examples: [
          { arabic: 'الأُمُّ مَدْرَسَةٌ إِذَا أَعْدَدْتَهَا أَعْدَدْتَ شَعْباً طَيِّبَ الأَعْرَاقِ', explanation: 'The mother is a school — if you prepare her, you prepare a people of good roots.' },
          { arabic: 'الأُمُّ رَوْضٌ إِنْ تَعَهَّدَهُ الحَيَا بِالرِّيِّ أَوْرَقَ أَيْمَمَا إِيْرَاقِ', explanation: 'The mother is a garden — if tended with rain, it blooms in the most beautiful blossoming.' },
          { arabic: 'الأُمُّ أُسْتَاذُ الأَسَاتِذَةِ الأُلَى شَغَلَتْ مَآثِرُهُمْ مَدَى الآفَاقِ', explanation: 'The mother is the teacher of teachers whose achievements span the horizons.' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-35-1',
      title: 'Mother Description Quiz',
      titleAr: 'اختبار وصف الأمّ',
      instruction: 'Answer questions about the essay and poetry.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-35-1-1',
            question: 'The mother is metaphorically called:',
            options: ['The bright star', 'The giving earth', 'The tall mountain', 'The deep sea'],
            correctIndex: 1,
            explanation: 'الأرض المعطاء — the giving earth.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-35-1-2',
            question: 'In Hafiz Ibrahim\'s poetry, the mother is compared to:',
            options: [
              'A school, a garden, and a teacher',
              'A river, a mountain, and a tree',
              'A book, a pen, and a lamp',
              'A sun, a moon, and a star',
            ],
            correctIndex: 0,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-35-1-3',
            question: 'What does تؤثّر غيرها mean?',
            options: [
              'She influences others',
              'She puts others before herself',
              'She speaks to others',
              'She teaches others',
            ],
            correctIndex: 1,
          },
        },
      ],
    },
    {
      id: 'ex-35-2',
      title: 'Match Poetry Metaphors',
      titleAr: 'طابق استعارات الشعر',
      instruction: 'Match each metaphor from the poetry with its meaning.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-35-2-1',
            pairs: [
              { left: 'الأمّ مدرسة', right: 'Prepare her → prepare a nation' },
              { left: 'الأمّ روض', right: 'Tend her → beautiful blossoming' },
              { left: 'الأمّ أستاذ الأساتذة', right: 'Teacher of all teachers' },
              { left: 'الأرض المعطاء', right: 'The giving earth' },
            ],
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-35',
    titleEn: 'Describe Your Mother',
    titleAr: 'صف أمّك',
    prompt: {
      promptEn: 'Write an emotional descriptive paragraph about your mother or a maternal figure. Use poetic language and metaphors as demonstrated in the lesson.',
      promptAr: 'اكتب فقرة وصفية عاطفية عن أمّك مستخدمًا لغة شعرية واستعارات.',
      targetLength: { min: 35, max: 70 },
      hints: [
        'Use metaphors: الأم مدرسة، الأم حديقة',
        'Describe her sacrifices and love',
        'Include how she makes you feel',
        'You may quote or adapt poetry from the lesson',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Maternal Metaphors',
        categoryAr: 'استعارات أمومية',
        words: [
          { arabic: 'الأرض المعطاء', english: 'the giving earth' },
          { arabic: 'الأم مدرسة', english: 'a mother is a school' },
          { arabic: 'روض', english: 'garden' },
        ],
      },
      {
        categoryEn: 'Emotional Words',
        categoryAr: 'كلمات عاطفية',
        words: [
          { arabic: 'يا أمّي', english: 'O my mother' },
          { arabic: 'تضحية', english: 'sacrifice' },
          { arabic: 'حنان', english: 'tenderness' },
          { arabic: 'عطاء', english: 'giving/generosity' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-35-1', labelEn: 'Used at least one metaphor', labelAr: 'استخدام استعارة واحدة', examples: ['الأم مدرسة'], required: true },
      { id: 'gc-35-2', labelEn: 'Expressed emotions about your mother', labelAr: 'التعبير عن مشاعر تجاه أمّك', examples: [], required: true },
      { id: 'gc-35-3', labelEn: 'Described her qualities or sacrifices', labelAr: 'وصف صفاتها أو تضحياتها', examples: [], required: true },
      { id: 'gc-35-4', labelEn: 'Used poetic/literary vocabulary', labelAr: 'استخدام مفردات أدبية', examples: ['الأرض المعطاء'], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
