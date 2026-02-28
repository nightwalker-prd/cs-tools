import type { RubricCriterion } from './types';

export const STANDARD_RUBRIC: RubricCriterion[] = [
  {
    id: 'content',
    nameEn: 'Content',
    nameAr: 'الموضوع',
    description: 'How well does the writing address the prompt with relevant ideas?',
    levels: [
      { score: 1, label: 'Incomplete', description: 'Misses the topic or barely addresses it' },
      { score: 2, label: 'Basic', description: 'Addresses the topic but lacks detail' },
      { score: 3, label: 'Good', description: 'Covers the topic with relevant details' },
      { score: 4, label: 'Excellent', description: 'Vivid, personal, and thoroughly developed' },
    ],
  },
  {
    id: 'language',
    nameEn: 'Language',
    nameAr: 'اللغة',
    description: 'Variety and accuracy of vocabulary and grammar used.',
    levels: [
      { score: 1, label: 'Repetitive', description: 'Very limited vocabulary, many errors' },
      { score: 2, label: 'Simple', description: 'Basic vocabulary with some errors' },
      { score: 3, label: 'Varied', description: 'Good range of vocabulary, few errors' },
      { score: 4, label: 'Rich', description: 'Rich and precise vocabulary, minimal errors' },
    ],
  },
  {
    id: 'organization',
    nameEn: 'Organization',
    nameAr: 'الترتيب',
    description: 'Logical structure, paragraph flow, and use of linking words.',
    levels: [
      { score: 1, label: 'No structure', description: 'Ideas are scattered with no order' },
      { score: 2, label: 'Some order', description: 'Has beginning and end but weak flow' },
      { score: 3, label: 'Clear', description: 'Well-organized with good transitions' },
      { score: 4, label: 'Smooth flow', description: 'Seamless structure with excellent transitions' },
    ],
  },
  {
    id: 'mechanics',
    nameEn: 'Mechanics',
    nameAr: 'الإملاء',
    description: 'Spelling, punctuation, and handwriting/typing accuracy.',
    levels: [
      { score: 1, label: 'Many errors', description: 'Frequent spelling and punctuation mistakes' },
      { score: 2, label: 'Some errors', description: 'Several noticeable mistakes' },
      { score: 3, label: 'Few errors', description: 'Mostly correct with minor mistakes' },
      { score: 4, label: 'Almost none', description: 'Nearly perfect spelling and punctuation' },
    ],
  },
];
