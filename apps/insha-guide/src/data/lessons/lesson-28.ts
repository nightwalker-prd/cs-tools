import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson28: Lesson = {
  id: 'lesson-28',
  number: 28,
  titleAr: 'الوصف',
  titleEn: 'Description (Al-Wasf)',
  unitId: 'writing',
  content: [
    {
      type: 'text',
      data: {
        content: 'Description (الوصف) is the first of the composition topics due to the ease of handling it. It involves mentioning the states/conditions of things and their characteristics (ذكر أحوال الأشياء وأوصافها). There are two main types: description of places (وصف الأماكن) and description of persons (وصف الأشخاص).',
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Essay Writing Steps',
        titleAr: 'خطوات كتابة الموضوع',
        rule: 'Before writing, follow these steps: (1) Read the topic carefully (قراءة الموضوع قراءةً واعيةً), (2) Identify the key elements (تحديد العناصر), (3) Write a suitable introduction (كتابة مقدّمة مناسبة), (4) Enter the core with a smooth style (الدخول في جوهر الموضوع), (5) Write an appropriate conclusion (كتابة خاتمة مناسبة). After finishing on the draft (المسوّدة), rewrite on the clean copy (المبيّضة).',
        examples: [
          { arabic: 'المسوّدة', explanation: 'The draft — first copy for writing and correcting' },
          { arabic: 'المبيّضة', explanation: 'The clean copy — final version after corrections' },
        ],
      },
    },
    {
      type: 'model-essay',
      data: {
        title: 'My School (مدرستي)',
        titleAr: 'مدرستي',
        paragraphs: [
          {
            arabic: 'هي: منزلي الثاني وأحبّ مكان إلى نفسي؛ فالمعلّم فيها مثل أبي، والتلاميذ مثل إخواني وأهلي، في مدرستي أتعلّم العلوم النافعة وأتلقّى الدروس المختلفة فينمو عقلي ويتفتّح ذهني وتتّسع خبرتي بكل ما حولي.',
            translation: 'It is my second home and the dearest place to my soul. The teacher in it is like my father, and the students are like my brothers and family. In my school, I learn beneficial knowledge and receive various lessons, so my mind grows, my intellect opens up, and my experience expands.',
          },
          {
            arabic: 'وفي مدرستي ألتقي بزملائي وأتعرّف عليهم وأتّخذ من أحسنهم خلقا أصدقاء لي، ونشترك معاً في استذكار الدروس وفهم ما يصعب علينا فهمه.',
            translation: 'In my school, I meet my classmates and get to know them, taking the best of them in character as friends. We share in reviewing lessons and understanding what is difficult for us.',
          },
          {
            arabic: 'لهذا كان من واجبي نحو مدرستي أن أحبّها، وأزداد كلّ يوم تعلّقا بها، فأذهب إليها راضيا مشتاقا، وأحرص على نظافتها وصيانة مرافقها وحسن سمعتها.',
            translation: 'For this reason, it is my duty toward my school to love it and grow more attached to it each day. I go to it willingly and eagerly, take care of its cleanliness and maintenance of its facilities and its good reputation.',
          },
          {
            arabic: 'حتّى يأتي آخر العام وقد هيّأت نفسي للامتحان وأتممت الاستعداد له، بهذا أكون من المتفوّقين؛ فيرضى عنّي والدي، ويُسَرُّ مني مدرّسي.',
            translation: 'Until the end of the year comes and I have prepared myself for the exam. In this way, I become one of the top students; my parents are pleased with me, and my teacher is delighted.',
          },
        ],
        vocabulary: [
          { arabic: 'منزلي الثاني', english: 'my second home' },
          { arabic: 'العلوم النافعة', english: 'beneficial knowledge' },
          { arabic: 'يتفتّح ذهني', english: 'my intellect opens up' },
          { arabic: 'تتّسع خبرتي', english: 'my experience expands' },
          { arabic: 'تُهذّب خلقي', english: 'refines my character' },
          { arabic: 'الصفات الكريمة', english: 'noble qualities' },
          { arabic: 'استذكار الدروس', english: 'reviewing lessons' },
          { arabic: 'صيانة مرافقها', english: 'maintenance of its facilities' },
          { arabic: 'المتفوّقين', english: 'top students' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-28-1',
      title: 'Comprehension Quiz',
      titleAr: 'اختبار الفهم',
      instruction: 'Answer questions about the "My School" essay.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-28-1-1',
            question: 'The author compares his school to:',
            options: ['A garden', 'A second home', 'A library', 'A playground'],
            correctIndex: 1,
            explanation: 'منزلي الثاني — my second home.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-28-1-2',
            question: 'What are the two main types of description?',
            options: [
              'Places and persons',
              'Objects and actions',
              'Animals and plants',
              'Past and present',
            ],
            correctIndex: 0,
            explanation: 'وصف الأماكن و وصف الأشخاص',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-28-1-3',
            question: 'What should you do after finishing writing on the draft?',
            options: [
              'Submit it immediately',
              'Rewrite it on the clean copy (المبيّضة)',
              'Read it aloud',
              'Show it to a friend',
            ],
            correctIndex: 1,
          },
        },
      ],
    },
    {
      id: 'ex-28-2',
      title: 'Match Vocabulary',
      titleAr: 'طابق المفردات',
      instruction: 'Match each Arabic phrase with its English meaning.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-28-2-1',
            pairs: [
              { left: 'العلوم النافعة', right: 'beneficial knowledge' },
              { left: 'استذكار الدروس', right: 'reviewing lessons' },
              { left: 'الصفات الكريمة', right: 'noble qualities' },
              { left: 'صيانة مرافقها', right: 'maintenance of its facilities' },
              { left: 'المتفوّقين', right: 'top students' },
            ],
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-28',
    titleEn: 'Describe Your School',
    titleAr: 'صِف مدرستك',
    prompt: {
      promptEn: 'Write a descriptive paragraph about your school or a place you love, following the essay writing steps from the lesson. Include an introduction, body, and conclusion.',
      promptAr: 'اكتب فقرة وصفية عن مدرستك أو مكان تحبّه، مُتّبعًا خطوات كتابة الموضوع.',
      targetLength: { min: 40, max: 80 },
      hints: [
        'Start with what the place means to you personally',
        'Describe what you see, hear, and feel there',
        'Mention the people and activities',
        'End with why this place is important to you',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Descriptive Phrases',
        categoryAr: 'عبارات وصفية',
        words: [
          { arabic: 'منزلي الثاني', english: 'my second home' },
          { arabic: 'أحبّ مكان', english: 'dearest place' },
          { arabic: 'العلوم النافعة', english: 'beneficial knowledge' },
          { arabic: 'الصفات الكريمة', english: 'noble qualities' },
        ],
      },
      {
        categoryEn: 'Actions & Growth',
        categoryAr: 'أفعال ونموّ',
        words: [
          { arabic: 'يتفتّح ذهني', english: 'my intellect opens up' },
          { arabic: 'تتّسع خبرتي', english: 'my experience expands' },
          { arabic: 'استذكار الدروس', english: 'reviewing lessons' },
          { arabic: 'صيانة مرافقها', english: 'maintaining its facilities' },
        ],
      },
      {
        categoryEn: 'Essay Structure',
        categoryAr: 'بنية الموضوع',
        words: [
          { arabic: 'مقدّمة', english: 'introduction' },
          { arabic: 'جوهر الموضوع', english: 'core of the topic' },
          { arabic: 'خاتمة', english: 'conclusion' },
          { arabic: 'المتفوّقين', english: 'top students' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-28-1', labelEn: 'Wrote a clear introduction', labelAr: 'كتابة مقدّمة واضحة', examples: ['هي منزلي الثاني'], required: true },
      { id: 'gc-28-2', labelEn: 'Included descriptive details', labelAr: 'تضمين تفاصيل وصفية', examples: ['أحبّ مكان إلى نفسي'], required: true },
      { id: 'gc-28-3', labelEn: 'Wrote a conclusion', labelAr: 'كتابة خاتمة', examples: ['لهذا كان من واجبي'], required: true },
      { id: 'gc-28-4', labelEn: 'Used linking words', labelAr: 'استخدام أدوات ربط', examples: ['لهذا', 'حتّى', 'فـ'], required: false },
      { id: 'gc-28-5', labelEn: 'Used idafa (possessive) constructions', labelAr: 'استخدام الإضافة', examples: ['صيانة مرافقها', 'استذكار الدروس'], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
