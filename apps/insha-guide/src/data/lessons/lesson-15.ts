import type { Lesson } from '../types';

export const lesson15: Lesson = {
  id: 'lesson-15',
  number: 15,
  titleAr: 'تدريبات على الروابط',
  titleEn: 'Connector Exercises',
  unitId: 'spelling',
  content: [
    {
      type: 'text',
      data: {
        content: 'This lesson provides practice forming sentences using the connectors from previous lessons. Each sentence should use exactly one connector (رابط واحد) to link two ideas.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Review: Main Connector Categories',
        titleAr: 'مراجعة: أنواع الروابط',
        headers: ['Category', 'Key Connectors', 'Function'],
        rows: [
          ['الجمع (Joining)', 'الواو، الفاء، ثمّ', 'Connect ideas in sequence'],
          ['التفسير (Explanation)', 'الفاء، أي، بسبب', 'Explain reasons'],
          ['النتيجة (Result)', 'لذلك، لهذا', 'State consequences'],
          ['المقابلة (Contrast)', 'إلّا أنّ، على الرغم من', 'Show opposition'],
          ['التزامن (Simultaneity)', 'بينما', 'Simultaneous actions'],
          ['الاقتران (Correlation)', 'لمّا، عندما، حينما', 'Temporal connection'],
          ['الإضافة (Addition)', 'بالإضافة إلى، علاوة على', 'Add information'],
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-15-1',
      title: 'Choose the Correct Connector',
      titleAr: 'اختر الرابط الصحيح',
      instruction: 'Choose the most appropriate connector for each sentence pair.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-15-1-1',
            question: 'درستُ بجدّ ___ نجحتُ في الامتحان. (I studied hard ___ I passed the exam.)',
            options: ['لذلك (therefore)', 'بينما (while)', 'إلّا أنّ (however)', 'بالإضافة إلى (in addition to)'],
            correctIndex: 0,
            explanation: 'لذلك shows the result — studying hard led to passing.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-15-1-2',
            question: '___ كنتُ أقرأ، سمعتُ صوتاً. (___ I was reading, I heard a sound.)',
            options: ['لذلك (therefore)', 'بينما (while)', 'ثمّ (then)', 'فقد (for indeed)'],
            correctIndex: 1,
            explanation: 'بينما indicates two simultaneous actions — reading and hearing a sound.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-15-1-3',
            question: 'أحمد ذكيّ ___ لا يدرس كثيراً. (Ahmad is smart ___ he doesn\'t study much.)',
            options: ['و (and)', 'لذلك (therefore)', 'إلّا أنّه (however he)', 'ف (so)'],
            correctIndex: 2,
            explanation: 'إلّا أنّه introduces contrast — being smart vs. not studying.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-15-1-4',
            question: 'القراءة مفيدة، ___ أنّها ممتعة أيضاً. (Reading is useful, ___ it is also enjoyable.)',
            options: ['لكنّ (but)', 'بالإضافة إلى (in addition to)', 'لذلك (therefore)', 'بينما (while)'],
            correctIndex: 1,
            explanation: 'بالإضافة إلى adds a supplementary point — enjoyment in addition to usefulness.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-15-1-5',
            question: '___ وصلتُ إلى البيت، بدأتُ بالمذاكرة. (___ I arrived home, I started studying.)',
            options: ['بينما (while)', 'لمّا (when)', 'إلّا أنّ (however)', 'علاوة على (moreover)'],
            correctIndex: 1,
            explanation: 'لمّا indicates a temporal correlation — upon arriving, studying began.',
          },
        },
      ],
    },
    {
      id: 'ex-15-2',
      title: 'Match Connector to Category',
      titleAr: 'طابق الرابط بنوعه',
      instruction: 'Match each connector with its category.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-15-2-1',
            pairs: [
              { left: 'لذلك', right: 'Result (النتيجة)' },
              { left: 'بينما', right: 'Simultaneity (التزامن)' },
              { left: 'إلّا أنّ', right: 'Contrast (المقابلة)' },
              { left: 'بسبب', right: 'Explanation (التفسير)' },
              { left: 'بالإضافة إلى', right: 'Addition (الإضافة)' },
            ],
          },
        },
      ],
    },
  ],
};
