import type { Unit } from './types';

export const UNITS: Unit[] = [
  {
    id: 'foundations',
    number: 1,
    titleAr: 'أسس الكلام',
    titleEn: 'Foundations of Speech',
    description: 'Parts of speech, noun/verb/particle signs, triliteral verb patterns',
    lessonIds: ['lesson-1', 'lesson-2', 'lesson-3'],
  },
  {
    id: 'sentences',
    number: 2,
    titleAr: 'الجملة والاستفهام',
    titleEn: 'Sentences & Questions',
    description: 'Interrogative tools, 5 sentence types, construction drills',
    lessonIds: ['lesson-4', 'lesson-5', 'lesson-6', 'lesson-7'],
  },
  {
    id: 'paragraphs',
    number: 3,
    titleAr: 'الفقرة والربط',
    titleEn: 'Paragraphs & Linking',
    description: 'Free writing, sentence transformation, paragraphs, linking tools',
    lessonIds: ['lesson-8', 'lesson-9', 'lesson-10', 'lesson-11', 'lesson-12', 'lesson-13'],
  },
  {
    id: 'spelling',
    number: 4,
    titleAr: 'الإملاء',
    titleEn: 'Spelling Rules',
    description: 'Punctuation, hamza rules, taa marbouta/mabsouta, soft alif',
    lessonIds: [
      'lesson-14', 'lesson-15', 'lesson-16', 'lesson-17', 'lesson-18',
      'lesson-19', 'lesson-20', 'lesson-21', 'lesson-22', 'lesson-23',
      'lesson-24', 'lesson-25', 'lesson-26', 'lesson-27',
    ],
  },
  {
    id: 'writing',
    number: 5,
    titleAr: 'الوصف والكتابة',
    titleEn: 'Description & Writing',
    description: 'Model essays, descriptive vocabulary, linguistic benefits',
    lessonIds: [
      'lesson-28', 'lesson-29', 'lesson-30', 'lesson-31', 'lesson-32',
      'lesson-33', 'lesson-34', 'lesson-35', 'lesson-36', 'lesson-37', 'lesson-38',
    ],
  },
  {
    id: 'correspondence',
    number: 6,
    titleAr: 'المراسلة',
    titleEn: 'Correspondence',
    description: 'Letters, telegram types, congratulatory telegram models',
    lessonIds: ['lesson-39', 'lesson-40'],
  },
];
