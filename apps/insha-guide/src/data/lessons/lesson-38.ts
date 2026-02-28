import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson38: Lesson = {
  id: 'lesson-38',
  number: 38,
  titleAr: 'فوائد لغوية (٣)',
  titleEn: 'Linguistic Benefits (3)',
  unitId: 'writing',
  content: [
    {
      type: 'text',
      data: {
        content: 'The third and final set of linguistic benefits covers synonyms related to virtues, vices, emotions, and social behaviors. These are especially useful for describing persons. Read, understand, and memorize (اقرأ وافهم واحفظ).',
      },
    },
    {
      type: 'synonym-group',
      data: {
        title: 'Linguistic Benefits — Set 3',
        titleAr: 'فوائد لغوية (٣)',
        groups: [
          {
            concept: 'Generosity',
            conceptAr: 'السخاء',
            words: [
              { arabic: 'سخيّ', english: 'generous' },
              { arabic: 'سمح', english: 'liberal' },
              { arabic: 'جوّاد', english: 'munificent' },
              { arabic: 'فيّاض', english: 'overflowing (in generosity)' },
              { arabic: 'طلق اليد', english: 'open-handed' },
              { arabic: 'واسع الباع', english: 'broad-armed (very generous)' },
            ],
          },
          {
            concept: 'Miserliness',
            conceptAr: 'البخل',
            words: [
              { arabic: 'بخيل', english: 'miserly' },
              { arabic: 'شحيح', english: 'stingy' },
              { arabic: 'ضنين', english: 'tight-fisted' },
              { arabic: 'مسيك', english: 'withholding' },
              { arabic: 'مغلول اليد', english: 'chained-handed' },
            ],
          },
          {
            concept: 'Gratitude',
            conceptAr: 'الشكر',
            words: [
              { arabic: 'قضى حقّ النعمة', english: 'fulfilled the right of the blessing' },
              { arabic: 'قام بشكر النعمة', english: 'gave thanks for the blessing' },
            ],
          },
          {
            concept: 'Ingratitude',
            conceptAr: 'الجحود',
            words: [
              { arabic: 'كفر النعمة', english: 'denied the blessing' },
              { arabic: 'جحدها', english: 'rejected it' },
              { arabic: 'كندها', english: 'was ungrateful for it' },
              { arabic: 'سترها', english: 'concealed it' },
            ],
          },
          {
            concept: 'Humility',
            conceptAr: 'التواضع',
            words: [
              { arabic: 'الانكسار', english: 'self-effacement' },
              { arabic: 'خفض الجناح', english: 'lowering the wing (Quranic humility)' },
              { arabic: 'الحمول', english: 'forbearance' },
            ],
          },
          {
            concept: 'Arrogance',
            conceptAr: 'التكبر',
            words: [
              { arabic: 'تجبّر', english: 'tyranny/arrogance' },
              { arabic: 'التعاظم', english: 'self-aggrandizement' },
              { arabic: 'تطاول', english: 'overreaching' },
              { arabic: 'احتقار الغير', english: 'contempt for others' },
            ],
          },
          {
            concept: 'Diligence',
            conceptAr: 'الجدّ',
            words: [
              { arabic: 'جدّ في الأمر', english: 'was diligent' },
              { arabic: 'دأب', english: 'persisted' },
              { arabic: 'بذل وسعه', english: 'exerted his utmost' },
              { arabic: 'لم يقصر', english: 'did not fall short' },
            ],
          },
          {
            concept: 'Negligence',
            conceptAr: 'التقصير',
            words: [
              { arabic: 'قصر في الأمر', english: 'fell short' },
              { arabic: 'تهاون فيه', english: 'was lax' },
              { arabic: 'فرّط', english: 'was negligent' },
              { arabic: 'توانى', english: 'was sluggish' },
            ],
          },
          {
            concept: 'Anger',
            conceptAr: 'الغيظ',
            words: [
              { arabic: 'غضب', english: 'became angry' },
              { arabic: 'اغتاظ', english: 'became enraged' },
              { arabic: 'استشاط', english: 'became furious' },
              { arabic: 'انفعل', english: 'became agitated' },
            ],
          },
          {
            concept: 'Forbearance',
            conceptAr: 'الحلم',
            words: [
              { arabic: 'هيّن ليّن', english: 'gentle and soft' },
              { arabic: 'ذو وقار', english: 'dignified' },
              { arabic: 'سكينة', english: 'tranquil' },
              { arabic: 'حليم محتمل', english: 'forbearing and tolerant' },
            ],
          },
          {
            concept: 'Concealing a Secret',
            conceptAr: 'كتمان السرّ',
            words: [
              { arabic: 'كتم سرّه', english: 'concealed his secret' },
              { arabic: 'ستره', english: 'covered it' },
              { arabic: 'أخفاه', english: 'hid it' },
              { arabic: 'طواه', english: 'folded it away' },
            ],
          },
          {
            concept: 'Revealing a Secret',
            conceptAr: 'إذاعة السرّ',
            words: [
              { arabic: 'أفشى سرّه', english: 'disclosed his secret' },
              { arabic: 'أبداه', english: 'showed it' },
              { arabic: 'أظهره', english: 'revealed it' },
              { arabic: 'أشاعه', english: 'spread it' },
            ],
          },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-38-1',
      title: 'Synonym Quiz — Set 3',
      titleAr: 'اختبار المترادفات — المجموعة ٣',
      instruction: 'Choose the correct meaning.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-38-1-1',
            question: 'What does مغلول اليد mean?',
            options: ['Open-handed', 'Chained-handed (extremely stingy)', 'Generous', 'Helpful'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-38-1-2',
            question: 'خفض الجناح is a Quranic expression for:',
            options: ['Arrogance', 'Humility', 'Anger', 'Diligence'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-38-1-3',
            question: 'Which word means "became furious"?',
            options: ['غضب', 'انفعل', 'استشاط', 'اغتاظ'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-38-1-4',
            question: 'أفشى سرّه means:',
            options: ['Concealed his secret', 'Disclosed his secret', 'Forgot his secret', 'Found his secret'],
            correctIndex: 1,
          },
        },
      ],
    },
    {
      id: 'ex-38-2',
      title: 'Match Opposites — Set 3',
      titleAr: 'طابق الأضداد — المجموعة ٣',
      instruction: 'Match each virtue with its corresponding vice.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-38-2-1',
            pairs: [
              { left: 'السخاء (generosity)', right: 'البخل (miserliness)' },
              { left: 'الشكر (gratitude)', right: 'الجحود (ingratitude)' },
              { left: 'التواضع (humility)', right: 'التكبر (arrogance)' },
              { left: 'الجدّ (diligence)', right: 'التقصير (negligence)' },
              { left: 'الحلم (forbearance)', right: 'الغيظ (anger)' },
            ],
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-38',
    titleEn: 'Use Virtue and Vice Synonyms',
    titleAr: 'استخدم مترادفات الفضائل والرذائل',
    prompt: {
      promptEn: 'Write a paragraph comparing two contrasting characters (one virtuous, one flawed). Use synonym words from the lesson for generosity/miserliness, humility/arrogance, diligence/negligence.',
      promptAr: 'اكتب فقرة تقارن شخصيتين متناقضتين مستخدمًا مترادفات الفضائل والرذائل.',
      targetLength: { min: 30, max: 65 },
      hints: [
        'Use contrast connectors: بينما، إلّا أنّ، على الرغم من',
        'Pair virtues and vices: سخي vs بخيل، متواضع vs متكبّر',
        'Use 3+ synonym groups from the lesson',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Generosity / Miserliness',
        categoryAr: 'السخاء / البخل',
        words: [
          { arabic: 'سخيّ', english: 'generous' },
          { arabic: 'جوّاد', english: 'munificent' },
          { arabic: 'بخيل', english: 'miserly' },
          { arabic: 'شحيح', english: 'stingy' },
        ],
      },
      {
        categoryEn: 'Humility / Arrogance',
        categoryAr: 'التواضع / التكبر',
        words: [
          { arabic: 'خفض الجناح', english: 'humility' },
          { arabic: 'تجبّر', english: 'arrogance' },
          { arabic: 'التعاظم', english: 'self-aggrandizement' },
        ],
      },
      {
        categoryEn: 'Diligence / Negligence',
        categoryAr: 'الجدّ / التقصير',
        words: [
          { arabic: 'بذل وسعه', english: 'exerted his utmost' },
          { arabic: 'دأب', english: 'persisted' },
          { arabic: 'تهاون', english: 'was lax' },
          { arabic: 'فرّط', english: 'was negligent' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-38-1', labelEn: 'Used at least 3 virtue/vice synonym pairs', labelAr: 'استخدام ٣ أزواج فضيلة/رذيلة', examples: ['سخي / بخيل'], required: true },
      { id: 'gc-38-2', labelEn: 'Used contrast connectors', labelAr: 'استخدام أدوات مقابلة', examples: ['بينما', 'إلّا أنّ'], required: true },
      { id: 'gc-38-3', labelEn: 'Described two contrasting characters', labelAr: 'وصف شخصيتين متناقضتين', examples: [], required: true },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
