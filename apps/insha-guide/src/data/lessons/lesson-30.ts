import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson30: Lesson = {
  id: 'lesson-30',
  number: 30,
  titleAr: 'بيتي',
  titleEn: 'My House',
  unitId: 'writing',
  content: [
    {
      type: 'text',
      data: {
        content: 'This lesson presents a model descriptive essay about a house. Notice how the author describes the house systematically — first the exterior, then each room on the first floor, then the second floor.',
      },
    },
    {
      type: 'model-essay',
      data: {
        title: 'My House',
        titleAr: 'بيتي',
        paragraphs: [
          {
            arabic: 'بيتي صِحّيٌّ جميل، غرفه واسعة، ونظامه بديع، يدخله الهواء النقيّ من كلّ جانب، أمامه حديقة غنّاء كثيرة الأشجار والأزهار، والفواكه والثمار.',
            translation: 'My house is healthy and beautiful. Its rooms are spacious, and its design is wonderful. Fresh air enters it from every side. In front of it is a lush garden full of trees, flowers, fruits, and produce.',
          },
          {
            arabic: 'يتألّف بيتي من دورين، ويوجد في الدور الأوّل غرفة الاستقبال ذات المقاعد الوثيرة، وقد زُيّنت بأجمل الستائر. ثمّ تليها غرفة الجلوس، وبها بعض المقاعد والبسط، ومنضدة. ثمّ المطبخ يحتوي على فرن وثلّاجة ورفوف.',
            translation: 'My house consists of two floors. On the first floor, there is a reception room with comfortable seats, decorated with the most beautiful curtains. Then comes the sitting room, with some seats, rugs, and a desk. Then the kitchen, containing an oven, a refrigerator, and shelves.',
          },
          {
            arabic: 'ويتألّف الدور الثاني من ثلاث غرف واسعة؛ واحدة لي ولأخي، والثانية مخصّصة للأخوات الثلاث، والثالثة للضيوف. نعتني دائماً بنظافته، وترتيب أثاثه.',
            translation: 'The second floor consists of three spacious rooms: one for me and my brother, the second for the three sisters, and the third for guests. We always take care of its cleanliness and the arrangement of its furniture.',
          },
        ],
        vocabulary: [
          { arabic: 'صحّيّ', english: 'healthy/hygienic' },
          { arabic: 'غنّاء', english: 'lush (garden)' },
          { arabic: 'الوثيرة', english: 'comfortable/soft' },
          { arabic: 'الستائر', english: 'curtains' },
          { arabic: 'منضدة', english: 'desk/table' },
          { arabic: 'ثلّاجة', english: 'refrigerator' },
          { arabic: 'الأواني والقدور', english: 'vessels and pots' },
          { arabic: 'أثاثه', english: 'its furniture' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-30-1',
      title: 'House Description Quiz',
      titleAr: 'اختبار وصف البيت',
      instruction: 'Answer questions about the "My House" essay.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-30-1-1',
            question: 'How many floors does the house have?',
            options: ['One', 'Two', 'Three', 'Four'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-30-1-2',
            question: 'What is in front of the house?',
            options: ['A parking lot', 'A lush garden', 'A swimming pool', 'A playground'],
            correctIndex: 1,
            explanation: 'أمامه حديقة غنّاء — in front of it is a lush garden.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-30-1-3',
            question: 'What does غنّاء describe?',
            options: ['A room', 'A garden', 'A kitchen', 'A curtain'],
            correctIndex: 1,
            explanation: 'حديقة غنّاء — lush garden.',
          },
        },
      ],
    },
    {
      id: 'ex-30-2',
      title: 'Match House Vocabulary',
      titleAr: 'طابق مفردات البيت',
      instruction: 'Match each Arabic word with its English meaning.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-30-2-1',
            pairs: [
              { left: 'الستائر', right: 'curtains' },
              { left: 'منضدة', right: 'desk/table' },
              { left: 'ثلّاجة', right: 'refrigerator' },
              { left: 'أثاثه', right: 'its furniture' },
              { left: 'الوثيرة', right: 'comfortable/soft' },
            ],
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-30',
    titleEn: 'Describe Your House',
    titleAr: 'صف بيتك',
    prompt: {
      promptEn: 'Write a descriptive essay about your house or dream house. Describe the exterior, then room by room, following the model essay structure.',
      promptAr: 'اكتب موضوعًا وصفيًّا عن بيتك أو بيت أحلامك.',
      targetLength: { min: 40, max: 80 },
      hints: [
        'Start with the exterior and garden',
        'Move inside room by room (reception, kitchen, bedrooms)',
        'Describe furniture and decorations in each room',
        'End with how you feel about your home',
      ],
    },
    wordBank: [
      {
        categoryEn: 'House Parts',
        categoryAr: 'أجزاء البيت',
        words: [
          { arabic: 'حديقة', english: 'garden' },
          { arabic: 'غرفة الاستقبال', english: 'reception room' },
          { arabic: 'المطبخ', english: 'kitchen' },
          { arabic: 'غرفة النوم', english: 'bedroom' },
        ],
      },
      {
        categoryEn: 'Furniture',
        categoryAr: 'الأثاث',
        words: [
          { arabic: 'ثلّاجة', english: 'refrigerator' },
          { arabic: 'منضدة', english: 'table' },
          { arabic: 'الستائر', english: 'curtains' },
          { arabic: 'أثاث', english: 'furniture' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-30-1', labelEn: 'Described exterior before interior', labelAr: 'وصف الخارج قبل الداخل', examples: [], required: true },
      { id: 'gc-30-2', labelEn: 'Described at least 3 rooms', labelAr: 'وصف ٣ غرف على الأقل', examples: [], required: true },
      { id: 'gc-30-3', labelEn: 'Used descriptive adjectives', labelAr: 'استخدام صفات وصفية', examples: ['واسع', 'جميل', 'نظيف'], required: true },
      { id: 'gc-30-4', labelEn: 'Ended with personal reflection', labelAr: 'خاتمة شخصية', examples: [], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
