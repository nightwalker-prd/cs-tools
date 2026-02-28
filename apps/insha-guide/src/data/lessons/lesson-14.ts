import type { Lesson } from '../types';

export const lesson14: Lesson = {
  id: 'lesson-14',
  number: 14,
  titleAr: 'الربط بين الجمل (٢)',
  titleEn: 'Linking Sentences (2)',
  unitId: 'spelling',
  content: [
    {
      type: 'text',
      data: {
        content: 'This lesson continues the practice of linking sentences into coherent paragraphs. You will work with statements about "the mother" (الأمّ) and compose them into a flowing paragraph using connectors.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Statements About the Mother',
        titleAr: 'عبارات عن الأمّ',
        headers: ['Arabic', 'Translation'],
        rows: [
          ['الأمُّ مدرسة نتعلّم منها أسس الأخلاق', 'The mother is a school from which we learn the foundations of morality'],
          ['الأمُّ هي القلب الّذي يحمل هموم الأسرة', 'The mother is the heart that carries the family\'s burdens'],
          ['هي مصدر الرعاية والحنان الّذي يسع الجميع', 'She is the source of care and compassion that encompasses everyone'],
          ['هي تسعى لتربية الأبناء', 'She strives to raise the children'],
          ['تبذل كل ما في وسعها للحِفَاظ على بيتها', 'She exerts everything in her power to preserve her home'],
          ['هي شمس الحياة الّتي تضيء ظلام أيّامنا', 'She is the sun of life that illuminates the darkness of our days'],
        ],
        note: 'Use linking tools to weave these statements into a single flowing paragraph.',
      },
    },
    {
      type: 'model-essay',
      data: {
        title: 'Model Paragraph: The Mother',
        titleAr: 'نموذج فقرة: الأمّ',
        paragraphs: [
          {
            arabic: 'الأمُّ مدرسة نتعلّم منها أسس الأخلاق، وهي القلب الّذي يحمل هموم الأسرة. فهي مصدر الرعاية والحنان الّذي يسع الجميع، إذ تسعى لتربية الأبناء وتبذل كل ما في وسعها للحِفَاظ على بيتها.',
            translation: 'The mother is a school from which we learn the foundations of morality, and she is the heart that carries the family\'s burdens. For she is the source of care and compassion that encompasses everyone, as she strives to raise the children and exerts everything in her power to preserve her home.',
          },
          {
            arabic: 'إنّها شمس الحياة الّتي تضيء ظلام أيّامنا، ولن تكفيني سطور وصفحات لأحصي وصفها وما تستحقه من برّ.',
            translation: 'Indeed she is the sun of life that illuminates the darkness of our days, and lines and pages will not suffice me to enumerate her description and what she deserves of goodness.',
          },
        ],
        questions: [
          'What connectors were used to link the statements?',
          'How does the paragraph flow from one idea to the next?',
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Quranic and Prophetic References',
        titleAr: 'من القرآن والسنّة',
        rule: 'Arabic composition often draws on Quranic verses and Prophetic hadith to support arguments and add eloquence.',
        examples: [
          { arabic: '﴿وَبِالْوَالِدَيْنِ إِحْسَانًا﴾', explanation: 'Quran: "And to parents, good treatment"' },
          { arabic: 'أُمَّك ، ثمّ أمّك ، ثمّ أمّك ، ثمّ أبوك', explanation: 'Hadith: "Your mother, then your mother, then your mother, then your father"' },
        ],
      },
    },
    {
      type: 'vocabulary-grid',
      data: {
        title: 'Key Vocabulary',
        titleAr: 'مفردات مهمّة',
        items: [
          { arabic: 'الأمّ', transliteration: 'al-umm', english: 'mother' },
          { arabic: 'أسس الأخلاق', transliteration: 'usus al-akhlaaq', english: 'foundations of morality' },
          { arabic: 'هموم الأسرة', transliteration: 'humoom al-usrah', english: 'family\'s burdens' },
          { arabic: 'الرعاية', transliteration: 'ar-ri\'aayah', english: 'care' },
          { arabic: 'الحنان', transliteration: 'al-hanaan', english: 'compassion' },
          { arabic: 'تربية الأبناء', transliteration: 'tarbiyat al-abnaa\'', english: 'raising children' },
          { arabic: 'شمس الحياة', transliteration: 'shams al-hayaah', english: 'sun of life' },
          { arabic: 'برّ', transliteration: 'birr', english: 'righteousness (to parents)' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-14-1',
      title: 'Complete with Connectors',
      titleAr: 'أكمل بأدوات الربط',
      instruction: 'Choose the best connector to link the sentences about the mother.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-14-1-1',
            question: 'الأمُّ مدرسة نتعلّم منها أسس الأخلاق، ___ هي القلب الّذي يحمل هموم الأسرة.',
            options: ['و (and)', 'لكن (but)', 'ثمّ (then)', 'أو (or)'],
            correctIndex: 0,
            explanation: 'الواو joins two complementary descriptions of the mother.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-14-1-2',
            question: '___ مصدر الرعاية والحنان الّذي يسع الجميع.',
            options: ['لكنّها (but she)', 'فهي (for she is)', 'بينما (while)', 'إلّا أنّها (however she)'],
            correctIndex: 1,
            explanation: 'الفاء explains why — she is the source of care and compassion.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-14-1-3',
            question: 'إنّها شمس الحياة، ___ تكفيني سطور وصفحات لأحصي وصفها.',
            options: ['و (and)', 'ف (so)', 'ولن (and will not)', 'ثمّ (then)'],
            correctIndex: 2,
            explanation: 'ولن connects with a negation — lines and pages will not suffice.',
          },
        },
      ],
    },
    {
      id: 'ex-14-2',
      title: 'Match Vocabulary',
      titleAr: 'طابق المفردات',
      instruction: 'Match each Arabic phrase with its English meaning.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-14-2-1',
            pairs: [
              { left: 'أسس الأخلاق', right: 'foundations of morality' },
              { left: 'هموم الأسرة', right: 'family\'s burdens' },
              { left: 'الرعاية والحنان', right: 'care and compassion' },
              { left: 'تربية الأبناء', right: 'raising children' },
              { left: 'شمس الحياة', right: 'sun of life' },
            ],
          },
        },
      ],
    },
  ],
};
