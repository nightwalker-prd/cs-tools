import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson31: Lesson = {
  id: 'lesson-31',
  number: 31,
  titleAr: 'يوم في الطبيعة',
  titleEn: 'A Day in Nature',
  unitId: 'writing',
  content: [
    {
      type: 'text',
      data: {
        content: 'This lesson presents a literary descriptive essay about spending a day in nature. Notice the rich vocabulary and figurative language used to paint vivid images of the natural scenery.',
      },
    },
    {
      type: 'model-essay',
      data: {
        title: 'A Day in Nature',
        titleAr: 'يوم في الطبيعة',
        paragraphs: [
          {
            arabic: 'كان الصباح مُشرقا ساحرا، يُغْري بالتنزّه في أحْضان الطّبيعة الفتّانة بجمالها، الأخّاذة بِرَوعتها، فخرجْتُ إلى مُتنزّه، وأمضيت النهار متجوّلا في أرجائه.',
            translation: 'The morning was radiant and enchanting, tempting one to stroll in the embrace of nature, captivating in its beauty, breathtaking in its magnificence. So I went out to a park and spent the day wandering through its surroundings.',
          },
          {
            arabic: 'كان المتنزّه يضمّ بحيرة حولها روضة غنّاء. تبدو البحيرة للنّاظر لوحةً رائعةً، وصفحة الماء تتراءى مثل المرآة المصقولة أو الفضّة البرّاقة.',
            translation: 'The park contained a lake surrounded by a lush garden. The lake appeared to the viewer as a magnificent painting, and the surface of the water looked like a polished mirror or gleaming silver.',
          },
          {
            arabic: 'وقد عَلِق نظري بتلك المروج الخضراء الممتدّة بأعشابها الناضرة ووروداها اليانعة، وتلك السّهول المنبسطة انبساطاً يبعث في النفس السّرور.',
            translation: 'My gaze was captivated by those extended green meadows with their fresh grasses and ripe flowers, and those plains spread out in a way that brings joy to the soul.',
          },
          {
            arabic: 'ظللت أتنقّل من مكان إلى مكان، حتّى إذا نال منّي التعب أويت إلى سنديانة ظليلة لأرتاح. كانت أغصانها متشابكة، يمرّ بها نسيم عليل ينعش القلوب.',
            translation: 'I kept moving from place to place, until when fatigue overcame me, I retreated to a shady oak tree to rest. Its branches were intertwined, and a gentle breeze passed through them, refreshing the hearts.',
          },
          {
            arabic: 'نسائم الغروب تسري لطيفة مُضمّخة بعبير الأعشاب والرّياحين العطرة، تنعش القلب وتبعث فيّ السّعادة.',
            translation: 'The sunset breezes drifted gently, perfumed with the fragrance of herbs and aromatic plants, refreshing the heart and bringing me happiness.',
          },
        ],
        vocabulary: [
          { arabic: 'مُشرقا ساحرا', english: 'radiant and enchanting' },
          { arabic: 'أحضان الطبيعة', english: 'the embrace of nature' },
          { arabic: 'الفتّانة', english: 'captivating' },
          { arabic: 'الأخّاذة', english: 'breathtaking' },
          { arabic: 'المرآة المصقولة', english: 'polished mirror' },
          { arabic: 'المروج الخضراء', english: 'green meadows' },
          { arabic: 'سنديانة ظليلة', english: 'shady oak tree' },
          { arabic: 'نسيم عليل', english: 'gentle breeze' },
          { arabic: 'سبيكة من الذهب', english: 'ingot of gold' },
          { arabic: 'مُضمّخة بعبير', english: 'perfumed with fragrance' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-31-1',
      title: 'Nature Description Quiz',
      titleAr: 'اختبار وصف الطبيعة',
      instruction: 'Answer questions about the "A Day in Nature" essay.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-31-1-1',
            question: 'The water surface is compared to:',
            options: ['A painting', 'A polished mirror', 'A river', 'A waterfall'],
            correctIndex: 1,
            explanation: 'صفحة الماء تتراءى مثل المرآة المصقولة — the water surface looked like a polished mirror.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-31-1-2',
            question: 'Where did the narrator rest when tired?',
            options: ['By the lake', 'Under a shady oak tree', 'In a cave', 'On a bench'],
            correctIndex: 1,
            explanation: 'أويت إلى سنديانة ظليلة — I retreated to a shady oak tree.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-31-1-3',
            question: 'What does الفتّانة mean?',
            options: ['Dangerous', 'Captivating', 'Tall', 'Ancient'],
            correctIndex: 1,
          },
        },
      ],
    },
    {
      id: 'ex-31-2',
      title: 'Match Nature Vocabulary',
      titleAr: 'طابق مفردات الطبيعة',
      instruction: 'Match each descriptive phrase with its meaning.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-31-2-1',
            pairs: [
              { left: 'نسيم عليل', right: 'gentle breeze' },
              { left: 'المروج الخضراء', right: 'green meadows' },
              { left: 'مُضمّخة بعبير', right: 'perfumed with fragrance' },
              { left: 'الأخّاذة', right: 'breathtaking' },
              { left: 'سبيكة من الذهب', right: 'ingot of gold' },
            ],
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-31',
    titleEn: 'Describe a Day in Nature',
    titleAr: 'صف يومًا في الطبيعة',
    prompt: {
      promptEn: 'Write a literary descriptive paragraph about a day spent in nature (park, lake, mountains). Use figurative language and rich vocabulary.',
      promptAr: 'اكتب فقرة وصفية أدبية عن يوم قضيته في الطبيعة.',
      targetLength: { min: 35, max: 70 },
      hints: [
        'Describe what you see, hear, smell, and feel',
        'Use metaphors: البحيرة مرآة، الشمس تبتسم',
        'Include poetic vocabulary from the lesson',
        'Show the progression from morning to evening',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Nature Words',
        categoryAr: 'كلمات الطبيعة',
        words: [
          { arabic: 'نسيم عليل', english: 'gentle breeze' },
          { arabic: 'المروج الخضراء', english: 'green meadows' },
          { arabic: 'البحيرة', english: 'lake' },
          { arabic: 'الغروب', english: 'sunset' },
        ],
      },
      {
        categoryEn: 'Figurative Language',
        categoryAr: 'لغة مجازية',
        words: [
          { arabic: 'مرآة فضّية', english: 'silver mirror' },
          { arabic: 'مُضمّخة بعبير', english: 'perfumed with fragrance' },
          { arabic: 'تبتسم', english: 'smiles (personification)' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-31-1', labelEn: 'Used sensory descriptions (sight, sound, smell)', labelAr: 'وصف حسّي', examples: [], required: true },
      { id: 'gc-31-2', labelEn: 'Used figurative language (metaphor/simile)', labelAr: 'استخدام لغة مجازية', examples: ['البحيرة كالمرآة'], required: true },
      { id: 'gc-31-3', labelEn: 'Used rich/literary vocabulary', labelAr: 'استخدام مفردات أدبية غنية', examples: ['نسيم عليل'], required: true },
      { id: 'gc-31-4', labelEn: 'Showed time progression', labelAr: 'إظهار تسلسل زمني', examples: [], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
