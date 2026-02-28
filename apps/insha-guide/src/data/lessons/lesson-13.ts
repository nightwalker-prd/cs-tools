import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson13: Lesson = {
  id: 'lesson-13',
  number: 13,
  titleAr: 'الربط بين الجمل',
  titleEn: 'Linking Between Sentences',
  unitId: 'paragraphs',
  content: [
    {
      type: 'text',
      data: {
        content: 'This lesson puts everything together. You will practice composing a coherent paragraph from individual sentences about a school, applying all the linking tools from Lesson 12. The goal is to transform a list of disconnected sentences into a flowing paragraph.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Source Sentences: Describing a School',
        titleAr: 'جمل لوصف المدرسة',
        headers: ['#', 'Arabic', 'Translation'],
        rows: [
          ['1', 'المدرسة مبنى كبير', 'The school is a large building'],
          ['2', 'تتكوّن المدرسة من ثلاثة طوابق', 'The school consists of three floors'],
          ['3', 'في كلّ طابق قاعات للدراسة', 'On each floor there are classrooms'],
          ['4', 'في كلّ قاعة سبّورة ومقاعد', 'In each classroom there is a blackboard and seats'],
          ['5', 'يربط بين القاعات ممرّ واسع', 'A wide corridor connects the classrooms'],
          ['6', 'في المدرسة مقصف لبيع الأطعمة', 'In the school there is a cafeteria selling food'],
          ['7', 'في المدرسة مسجد للصلاة', 'In the school there is a mosque for prayer'],
          ['8', 'في المدرسة مكتبة للمطالعة', 'In the school there is a library for reading'],
          ['9', 'في المدرسة مطبخ لإعداد الطعام', 'In the school there is a kitchen for preparing food'],
          ['10', 'أحبُّ مدرستي كثيراً', 'I love my school very much'],
          ['11', 'مدرستي هي بيتي الثاني', 'My school is my second home'],
        ],
        note: 'Use linking tools (و، ف، ثمّ، بالإضافة إلى، إلى جانب، علاوة على) to connect these into a flowing paragraph.',
      },
    },
    {
      type: 'model-essay',
      data: {
        title: 'Model Paragraph: My School',
        titleAr: 'نموذج فقرة: مدرستي',
        paragraphs: [
          {
            arabic: 'المدرسة مبنى كبير، وتتكوّن من ثلاثة طوابق. في كلّ طابق قاعات للدراسة، وفي كلّ قاعة سبّورة ومقاعد، ويربط بين القاعات ممرّ واسع.',
            translation: 'The school is a large building, consisting of three floors. On each floor there are classrooms, in each classroom there is a blackboard and seats, and a wide corridor connects the classrooms.',
          },
          {
            arabic: 'وفي المدرسة مقصف لبيع الأطعمة، بالإضافة إلى مسجد للصلاة. وإلى جانب ذلك، فيها مكتبة للمطالعة، علاوة على مطبخ لإعداد الطعام.',
            translation: 'In the school there is a cafeteria selling food, in addition to a mosque for prayer. Besides that, it has a library for reading, as well as a kitchen for preparing food.',
          },
          {
            arabic: 'أحبُّ مدرستي كثيراً، فمدرستي هي بيتي الثاني.',
            translation: 'I love my school very much, for it is my second home.',
          },
        ],
        questions: [
          'What linking tools were used in the first paragraph?',
          'How does the second paragraph use addition connectors?',
          'What linking tool connects the conclusion to the rest?',
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Tips for Linking Sentences',
        titleAr: 'نصائح للربط بين الجمل',
        rule: 'When building a paragraph: (1) Start with the main idea, (2) Group related details together, (3) Use varied linking tools — don\'t repeat الواو for everything, (4) End with a personal reflection or summary.',
        examples: [
          { arabic: 'و — للجمع العام', explanation: 'Use waw for general joining of related ideas' },
          { arabic: 'بالإضافة إلى / إلى جانب / علاوة على', explanation: 'Use these for adding supplementary information (vary them!)' },
          { arabic: 'ف — للسبب والنتيجة', explanation: 'Use fa to connect a reason or result at the end' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-13-1',
      title: 'Identify Linking Tools in the Model',
      titleAr: 'حدّد أدوات الربط في النموذج',
      instruction: 'Identify the linking tools used in the model paragraph.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-13-1-1',
            question: 'المدرسة مبنى كبير، وتتكوّن من ثلاثة طوابق — What linking tool is used?',
            options: ['الفاء (fa)', 'الواو (waw)', 'ثمّ (thumma)', 'بالإضافة إلى'],
            correctIndex: 1,
            explanation: 'الواو joins the two facts about the school without implying sequence.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-13-1-2',
            question: 'بالإضافة إلى مسجد للصلاة — What category is this linking tool?',
            options: ['Joining (الجمع)', 'Result (النتيجة)', 'Contrast (المقابلة)', 'Addition (الإضافة)'],
            correctIndex: 3,
            explanation: 'بالإضافة إلى is an addition connector, adding supplementary information.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-13-1-3',
            question: 'أحبُّ مدرستي كثيراً، فمدرستي هي بيتي الثاني — What does الفاء express here?',
            options: ['Sequence (ترتيب)', 'Explanation (تفسير)', 'Contrast (مقابلة)', 'Addition (إضافة)'],
            correctIndex: 1,
            explanation: 'الفاء here explains WHY — "I love my school, because it is my second home."',
          },
        },
      ],
    },
    {
      id: 'ex-13-2',
      title: 'Choose the Best Connector',
      titleAr: 'اختر أداة الربط الأفضل',
      instruction: 'Choose the most appropriate linking tool for each blank.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-13-2-1',
            question: 'في المدرسة مقصف، ___ مسجد للصلاة.',
            options: ['لذلك (therefore)', 'بالإضافة إلى (in addition to)', 'لكنّ (but)', 'بينما (while)'],
            correctIndex: 1,
            explanation: 'We are adding another facility — بالإضافة إلى is the best addition connector here.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-13-2-2',
            question: 'فيها مكتبة للمطالعة، ___ مطبخ لإعداد الطعام.',
            options: ['إلّا أنّ (however)', 'لذلك (therefore)', 'علاوة على (moreover)', 'بينما (while)'],
            correctIndex: 2,
            explanation: 'علاوة على adds another point — the kitchen is mentioned in addition to the library.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-13-2-3',
            question: 'أحبّ مدرستي، ___ هي بيتي الثاني.',
            options: ['و (and)', 'ف (because)', 'ثمّ (then)', 'لكنّ (but)'],
            correctIndex: 1,
            explanation: 'الفاء here explains the reason: "I love my school, because it is my second home."',
          },
        },
      ],
    },
    {
      id: 'ex-13-3',
      title: 'Match Addition Connectors',
      titleAr: 'طابق أدوات الإضافة',
      instruction: 'Match each addition connector with its English meaning.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-13-3-1',
            pairs: [
              { left: 'بالإضافة إلى', right: 'in addition to' },
              { left: 'إلى جانب', right: 'besides' },
              { left: 'علاوة على', right: 'moreover' },
              { left: 'الواو', right: 'and' },
            ],
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-13',
    titleEn: 'Compose a Connected Paragraph',
    titleAr: 'أنشئ فقرة مترابطة',
    prompt: {
      promptEn: 'Write a paragraph describing your home or neighborhood. Use varied linking tools (not just الواو). Group related details together and end with a personal reflection.',
      promptAr: 'اكتب فقرة تصف بيتك أو حيّك مستخدمًا أدوات ربط متنوّعة.',
      targetLength: { min: 35, max: 70 },
      hints: [
        'Start with the main idea (introduction)',
        'Group related details (rooms, facilities, people)',
        'Use بالإضافة إلى، إلى جانب، علاوة على for additions',
        'End with why you love it (فأنا أحبّ بيتي لأنّ...)',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Addition Connectors',
        categoryAr: 'أدوات الإضافة',
        words: [
          { arabic: 'بالإضافة إلى', english: 'in addition to' },
          { arabic: 'إلى جانب', english: 'besides' },
          { arabic: 'علاوة على', english: 'moreover' },
        ],
      },
      {
        categoryEn: 'Home Words',
        categoryAr: 'كلمات البيت',
        words: [
          { arabic: 'غرفة', english: 'room' },
          { arabic: 'مطبخ', english: 'kitchen' },
          { arabic: 'حديقة', english: 'garden' },
          { arabic: 'جيران', english: 'neighbors' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-13-1', labelEn: 'Varied linking tools (not just الواو)', labelAr: 'تنويع أدوات الربط', examples: ['بالإضافة إلى', 'إلى جانب'], required: true },
      { id: 'gc-13-2', labelEn: 'Grouped related details together', labelAr: 'تجميع التفاصيل المتعلّقة', examples: [], required: true },
      { id: 'gc-13-3', labelEn: 'Has introduction and conclusion', labelAr: 'مقدّمة وخاتمة', examples: [], required: true },
      { id: 'gc-13-4', labelEn: 'Used at least 3 different addition connectors', labelAr: 'استخدام ٣ أدوات إضافة مختلفة', examples: [], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
