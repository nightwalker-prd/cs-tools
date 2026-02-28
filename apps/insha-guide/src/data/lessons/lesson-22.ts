import type { Lesson } from '../types';

export const lesson22: Lesson = {
  id: 'lesson-22',
  number: 22,
  titleAr: 'تدريبات على الهمزة',
  titleEn: 'Hamza Exercises',
  unitId: 'spelling',
  content: [
    {
      type: 'text',
      data: {
        content: 'This lesson provides comprehensive practice on all hamza types: wasl vs. qat\' at the beginning, middle hamza (vowel hierarchy), and final hamza (preceding vowel). Review the rules from Lessons 19-21 before attempting these exercises.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Quick Reference: Hamza Rules Summary',
        titleAr: 'ملخّص قواعد الهمزة',
        headers: ['Position', 'Rule', 'Example'],
        rows: [
          ['Beginning (وصل)', 'Drops in connected speech; bare alif', 'اسم، ابن، الـ، اشرب'],
          ['Beginning (قطع)', 'Always pronounced; أ or إ', 'أكل، إبراهيم، إلى'],
          ['Middle', 'Vowel hierarchy: kasra > damma > fatha > sukoon', 'سئل (ئ), لؤم (ؤ), سأل (أ)'],
          ['End', 'Based on preceding letter\'s vowel', 'قرأ (أ), قارئ (ئ), شيء (ء)'],
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-22-1',
      title: 'Mixed Hamza Quiz',
      titleAr: 'اختبار شامل للهمزة',
      instruction: 'Answer questions covering all hamza types.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-22-1-1',
            question: 'Which word has hamzat al-wasl? (drops in connected speech)',
            options: ['أكل (ate)', 'ابن (son)', 'إلى (to)', 'أنشأ (established)'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-22-1-2',
            question: 'In سُئِل (was asked), why is the hamza on yaa?',
            options: ['Preceded by damma', 'Hamza has kasra (strongest vowel)', 'Preceded by sukoon', 'Hamza has fatha'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-22-1-3',
            question: 'In ملجَأ (refuge), the final hamza sits on alif because:',
            options: ['Preceded by kasra', 'Preceded by damma', 'Preceded by fatha', 'Preceded by sukoon'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-22-1-4',
            question: 'Which is the correct spelling?',
            options: ['مسأله (with alif)', 'مسئلة (with yaa)', 'مسؤلة (with waw)', 'مسءلة (on line)'],
            correctIndex: 1,
            explanation: 'مسئلة — the hamza has fatha but is preceded by sukoon+kasra environment, so it sits on yaa.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-22-1-5',
            question: 'The word دفْء (warmth) has final hamza on the line because:',
            options: ['Preceded by kasra', 'Preceded by fatha', 'Preceded by damma', 'Preceded by sukoon'],
            correctIndex: 3,
          },
        },
      ],
    },
    {
      id: 'ex-22-2',
      title: 'Classify Hamza Type',
      titleAr: 'صنّف نوع الهمزة',
      instruction: 'Match each word to its hamza classification.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-22-2-1',
            pairs: [
              { left: 'اسم', right: 'Wasl (beginning)' },
              { left: 'أحمد', right: 'Qat\' (beginning)' },
              { left: 'سأل', right: 'Middle hamza' },
              { left: 'قرأ', right: 'Final hamza' },
            ],
          },
        },
      ],
    },
  ],
};
