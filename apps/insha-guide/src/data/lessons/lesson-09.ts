import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson09: Lesson = {
  id: 'lesson-9',
  number: 9,
  titleAr: 'تركيب الجمل',
  titleEn: 'Sentence Construction',
  unitId: 'paragraphs',
  content: [
    {
      type: 'text',
      data: {
        content: 'Sentence construction (تركيب الجمل) teaches you to express one idea in different sentence structures. By rearranging word order, you can emphasize different elements while keeping the same meaning.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Model: One Idea, Three Structures',
        titleAr: 'نموذج: فكرة واحدة بثلاثة تراكيب',
        headers: ['Structure', 'Arabic', 'Translation'],
        rows: [
          ['Verb-first (فعلية)', 'سافر أبي إلى مكّة من أجل أداء العمرة', 'My father traveled to Makkah to perform Umrah'],
          ['Purpose fronted', 'من أجل أداء العمرة سافر أبي إلى مكّة', 'To perform Umrah, my father traveled to Makkah'],
          ['Subject fronted (اسمية)', 'أبي سافر إلى مكّة من أجل أداء العمرة', 'My father — he traveled to Makkah to perform Umrah'],
        ],
        note: 'Fronting different parts of the sentence (تقديم وتأخير) changes the emphasis without changing the core meaning.',
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Sentence Transformation Strategies',
        titleAr: 'استراتيجيات تحويل الجمل',
        rule: 'Arabic allows flexible word order. You can front the verb (الفعلية), the subject (الاسمية), the purpose clause (من أجل), or a time/place adverb to shift emphasis.',
        examples: [
          { arabic: 'ذهبتُ إلى المسجد لأداء الصلاة', explanation: 'Verb-first: emphasis on the action of going' },
          { arabic: 'لأداء الصلاة ذهبتُ إلى المسجد', explanation: 'Purpose fronted: emphasis on WHY (to pray)' },
          { arabic: 'إلى المسجد ذهبتُ لأداء الصلاة', explanation: 'Destination fronted: emphasis on WHERE' },
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Practice Sentences for Transformation',
        titleAr: 'جمل للتحويل',
        headers: ['Arabic', 'Translation'],
        rows: [
          ['يذهبُ التلميذُ إلى المدرسة للدراسة', 'The student goes to school to study'],
          ['يتصدّقُ المؤمنُ على الفقراء ابتغاءَ مرضاة الله', 'The believer gives charity to the poor seeking God\'s pleasure'],
          ['يُطيعُ الولدُ والديه طلباً للبرّ', 'The child obeys his parents seeking righteousness'],
          ['يلتزمُ السائقُ بقواعد المرور حفاظاً على السلامة', 'The driver follows traffic rules to maintain safety'],
          ['يذهبُ المسلمُ إلى المسجد لأداء الصلاة', 'The Muslim goes to the mosque to perform prayer'],
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-9-1',
      title: 'Identify the Fronted Element',
      titleAr: 'حدّد العنصر المقدّم',
      instruction: 'Identify which element has been fronted in each sentence.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-9-1-1',
            question: 'من أجل أداء العمرة سافر أبي إلى مكّة — What is fronted?',
            options: ['The verb (الفعل)', 'The subject (الفاعل)', 'The purpose clause (الغرض)', 'The destination (المكان)'],
            correctIndex: 2,
            explanation: 'The purpose clause (من أجل أداء العمرة) has been moved to the beginning for emphasis.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-9-1-2',
            question: 'التلميذُ يذهبُ إلى المدرسة للدراسة — What is fronted?',
            options: ['The verb (الفعل)', 'The subject (المبتدأ)', 'The purpose clause (الغرض)', 'The destination (المكان)'],
            correctIndex: 1,
            explanation: 'The subject (التلميذ) has been fronted, making this a nominal sentence.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-9-1-3',
            question: 'إلى المسجد يذهبُ المسلمُ لأداء الصلاة — What is fronted?',
            options: ['The verb (الفعل)', 'The subject (الفاعل)', 'The purpose clause (الغرض)', 'The destination (المكان)'],
            correctIndex: 3,
            explanation: 'The destination (إلى المسجد) has been fronted to emphasize where.',
          },
        },
      ],
    },
    {
      id: 'ex-9-2',
      title: 'Reorder to Form Verb-First Sentence',
      titleAr: 'رتّب لتكوّن جملة فعلية',
      instruction: 'Arrange the words to form a verb-first (فعلية) sentence.',
      questions: [
        {
          type: 'word-order',
          data: {
            id: 'q-9-2-1',
            words: ['إلى المدرسة', 'للدراسة', 'التلميذُ', 'يذهبُ'],
            answer: ['يذهبُ', 'التلميذُ', 'إلى المدرسة', 'للدراسة'],
            translation: 'The student goes to school to study',
          },
        },
        {
          type: 'word-order',
          data: {
            id: 'q-9-2-2',
            words: ['على الفقراء', 'المؤمنُ', 'يتصدّقُ', 'ابتغاءَ مرضاة الله'],
            answer: ['يتصدّقُ', 'المؤمنُ', 'على الفقراء', 'ابتغاءَ مرضاة الله'],
            translation: 'The believer gives charity to the poor seeking God\'s pleasure',
          },
        },
        {
          type: 'word-order',
          data: {
            id: 'q-9-2-3',
            words: ['لأداء الصلاة', 'المسلمُ', 'إلى المسجد', 'يذهبُ'],
            answer: ['يذهبُ', 'المسلمُ', 'إلى المسجد', 'لأداء الصلاة'],
            translation: 'The Muslim goes to the mosque to perform prayer',
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-9',
    titleEn: 'Rewrite Sentences in Different Word Orders',
    titleAr: 'أعد كتابة الجمل بترتيب مختلف',
    prompt: {
      promptEn: 'Take 3 ideas and write each one in 3 different word orders: verb-first (فعلية), subject-first (اسمية), and purpose-fronted. Label each structure.',
      promptAr: 'خذ ثلاث أفكار واكتب كلّ واحدة بثلاثة ترتيبات مختلفة.',
      targetLength: { min: 25, max: 55 },
      hints: [
        'Verb-first: سافر أبي إلى مكّة',
        'Subject-first: أبي سافر إلى مكّة',
        'Purpose-fronted: إلى مكّة سافر أبي',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Example Patterns',
        categoryAr: 'أنماط',
        words: [
          { arabic: 'سافر', english: 'traveled' },
          { arabic: 'ذهب', english: 'went' },
          { arabic: 'درس', english: 'studied' },
          { arabic: 'لأداء العمرة', english: 'to perform Umrah' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-9-1', labelEn: 'Wrote verb-first (فعلية) sentences', labelAr: 'كتابة جمل فعلية', examples: ['سافر أبي إلى مكّة'], required: true },
      { id: 'gc-9-2', labelEn: 'Wrote subject-first (اسمية) sentences', labelAr: 'كتابة جمل اسمية', examples: ['أبي سافر إلى مكّة'], required: true },
      { id: 'gc-9-3', labelEn: 'Wrote purpose/destination-fronted sentences', labelAr: 'تقديم الغرض أو الوجهة', examples: ['إلى مكّة سافر أبي'], required: true },
      { id: 'gc-9-4', labelEn: 'Labeled each word order', labelAr: 'تسمية ترتيب كلّ جملة', examples: [], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
