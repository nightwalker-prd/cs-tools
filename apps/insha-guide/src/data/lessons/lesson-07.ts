import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson07: Lesson = {
  id: 'lesson-7',
  number: 7,
  titleAr: 'تدريبات على الجملة',
  titleEn: 'Sentence Construction Exercises',
  unitId: 'sentences',
  content: [
    {
      type: 'text',
      data: {
        content: 'This lesson provides extensive practice with sentence construction, vocabulary building, and word ordering. You will work with agricultural vocabulary, colors, directions, numbers, and adverbs of time and place.',
      },
    },
    {
      type: 'vocabulary-grid',
      data: {
        title: 'Agricultural Vocabulary',
        titleAr: 'مصطلحات زراعية',
        items: [
          { arabic: 'الفلّاح', transliteration: 'al-fallaah', english: 'the farmer' },
          { arabic: 'المحراث', transliteration: 'al-mihraath', english: 'the plow' },
          { arabic: 'البذرة', transliteration: 'al-badhrah', english: 'the seed' },
          { arabic: 'المطر', transliteration: 'al-matar', english: 'the rain' },
          { arabic: 'النبات', transliteration: 'an-nabaat', english: 'the plant' },
          { arabic: 'الأغصان', transliteration: 'al-aghsaan', english: 'the branches' },
          { arabic: 'الحصاد', transliteration: 'al-hasaad', english: 'the harvest' },
          { arabic: 'السنابل', transliteration: 'as-sanaabil', english: 'the ears of grain' },
          { arabic: 'القمح', transliteration: 'al-qamh', english: 'the wheat' },
          { arabic: 'الذرة', transliteration: 'adh-dhura', english: 'the corn/maize' },
        ],
      },
    },
    {
      type: 'vocabulary-grid',
      data: {
        title: 'Colors',
        titleAr: 'الألوان',
        items: [
          { arabic: 'الأبيض', transliteration: 'al-abyad', english: 'white' },
          { arabic: 'الأسود', transliteration: 'al-aswad', english: 'black' },
          { arabic: 'الأحمر', transliteration: 'al-ahmar', english: 'red' },
          { arabic: 'الأصفر', transliteration: 'al-asfar', english: 'yellow' },
          { arabic: 'الأخضر', transliteration: 'al-akhdar', english: 'green' },
          { arabic: 'الأزرق', transliteration: 'al-azraq', english: 'blue' },
          { arabic: 'الوردي', transliteration: 'al-wardiy', english: 'pink' },
          { arabic: 'البنّي', transliteration: 'al-bunniy', english: 'brown' },
          { arabic: 'البنفسجي', transliteration: 'al-banafsajiy', english: 'violet/purple' },
          { arabic: 'البرتقالي', transliteration: 'al-burtuqaaliy', english: 'orange' },
        ],
      },
    },
    {
      type: 'vocabulary-grid',
      data: {
        title: 'Directions',
        titleAr: 'الاتجاهات',
        items: [
          { arabic: 'الشمال', transliteration: 'ash-shamaal', english: 'north' },
          { arabic: 'الجنوب', transliteration: 'al-janoob', english: 'south' },
          { arabic: 'الشرق', transliteration: 'ash-sharq', english: 'east' },
          { arabic: 'الغرب', transliteration: 'al-gharb', english: 'west' },
          { arabic: 'أمام', transliteration: 'amaam', english: 'in front of' },
          { arabic: 'وراء', transliteration: 'waraa\'', english: 'behind' },
          { arabic: 'تحت', transliteration: 'tahta', english: 'under/below' },
          { arabic: 'فوق', transliteration: 'fawqa', english: 'above/over' },
          { arabic: 'يمين', transliteration: 'yameen', english: 'right' },
          { arabic: 'يسار', transliteration: 'yasaar', english: 'left' },
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Adverbs of Time',
        titleAr: 'ظروف الزمان',
        headers: ['Arabic', 'Transliteration', 'Meaning'],
        rows: [
          ['صباح', 'sabaah', 'morning'],
          ['مساء', 'masaa\'', 'evening'],
          ['ليل', 'layl', 'night'],
          ['قبل', 'qabla', 'before'],
          ['بعد', 'ba\'da', 'after'],
          ['خلال', 'khilaal', 'during'],
          ['أثناء', 'athnaa\'', 'during/while'],
          ['لحظة', 'lahdhah', 'moment'],
          ['ساعة', 'saa\'ah', 'hour'],
          ['أسبوع', 'usboo\'', 'week'],
          ['شهر', 'shahr', 'month'],
          ['سنة', 'sanah', 'year'],
        ],
        note: 'Adverbs of time (ظروف الزمان) are always in the accusative case (منصوب) when functioning as adverbs.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Adverbs of Place',
        titleAr: 'ظروف المكان',
        headers: ['Arabic', 'Transliteration', 'Meaning'],
        rows: [
          ['بين', 'bayna', 'between'],
          ['وسط', 'wasat', 'middle/center'],
          ['عند', '\'inda', 'at/near'],
          ['خلف', 'khalfa', 'behind'],
          ['نحو', 'nahwa', 'toward'],
          ['قرب', 'qurba', 'near'],
          ['جانب', 'jaanib', 'beside'],
          ['حول', 'hawla', 'around'],
          ['تجاه', 'tijaah', 'toward/facing'],
          ['لدى', 'ladaa', 'at/with (possession)'],
        ],
        note: 'Adverbs of place (ظروف المكان) are always in the accusative case (منصوب) when functioning as adverbs.',
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Numbers 1-10: Inverse Gender Agreement',
        titleAr: 'الأعداد ١-١٠: مخالفة',
        rule: 'Numbers 3-10 follow inverse gender agreement (مخالفة). If the counted noun is masculine, the number takes the feminine form, and vice versa.',
        examples: [
          { arabic: 'ثلاثة رجال', explanation: 'رجال is masculine → number takes feminine form ثلاثة (with taa marbuta)' },
          { arabic: 'ثلاث نساء', explanation: 'نساء is feminine → number takes masculine form ثلاث (without taa marbuta)' },
          { arabic: 'خمسة كتب', explanation: 'كتب is masculine → number takes feminine form خمسة' },
          { arabic: 'خمس سيارات', explanation: 'سيارات is feminine → number takes masculine form خمس' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-7-1',
      title: 'Word Order: Sentences',
      titleAr: 'رتّب الكلمات في جمل مفيدة',
      instruction: 'Arrange the words to form meaningful sentences.',
      questions: [
        {
          type: 'word-order',
          data: {
            id: 'q-7-1-1',
            words: ['لعملِ', 'الخيرِ', 'يسعى', 'الصالحُ', 'الرجلُ'],
            answer: ['يسعى', 'الرجلُ', 'الصالحُ', 'لعملِ', 'الخيرِ'],
            translation: 'The righteous man strives to do good',
          },
        },
        {
          type: 'word-order',
          data: {
            id: 'q-7-1-2',
            words: ['عمادُ', 'الدينِ', 'الصلاةُ'],
            answer: ['الصلاةُ', 'عمادُ', 'الدينِ'],
            translation: 'Prayer is the pillar of the religion',
          },
        },
        {
          type: 'word-order',
          data: {
            id: 'q-7-1-3',
            words: ['الأمّهاتِ', 'أقدامِ', 'تحتَ', 'الجنّةُ'],
            answer: ['الجنّةُ', 'تحتَ', 'أقدامِ', 'الأمّهاتِ'],
            translation: 'Paradise is beneath the feet of mothers',
          },
        },
      ],
    },
    {
      id: 'ex-7-2',
      title: 'Match Colors',
      titleAr: 'طابق الألوان',
      instruction: 'Match each Arabic color with its English meaning.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-7-2-1',
            pairs: [
              { left: 'الأبيض', right: 'white' },
              { left: 'الأسود', right: 'black' },
              { left: 'الأحمر', right: 'red' },
              { left: 'الأخضر', right: 'green' },
              { left: 'الأزرق', right: 'blue' },
            ],
          },
        },
      ],
    },
    {
      id: 'ex-7-3',
      title: 'Seasonal Sentences',
      titleAr: 'جمل الفصول',
      instruction: 'Choose the correct season for each description.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-7-3-1',
            question: 'تتفتّح الأزهار في ___ (Flowers bloom in ___)',
            options: ['الربيع (spring)', 'الصيف (summer)', 'الخريف (autumn)', 'الشتاء (winter)'],
            correctIndex: 0,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-7-3-2',
            question: 'تتساقط أوراق الأشجار في ___ (Tree leaves fall in ___)',
            options: ['الربيع (spring)', 'الصيف (summer)', 'الخريف (autumn)', 'الشتاء (winter)'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-7-3-3',
            question: 'نكثر شرب الماء في ___ (We drink more water in ___)',
            options: ['الربيع (spring)', 'الصيف (summer)', 'الخريف (autumn)', 'الشتاء (winter)'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-7-3-4',
            question: 'تكثر الأمطار في ___ (Rains increase in ___)',
            options: ['الربيع (spring)', 'الصيف (summer)', 'الخريف (autumn)', 'الشتاء (winter)'],
            correctIndex: 3,
          },
        },
      ],
    },
    {
      id: 'ex-7-4',
      title: 'Match Directions',
      titleAr: 'طابق الاتجاهات',
      instruction: 'Match each Arabic direction with its English meaning.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-7-4-1',
            pairs: [
              { left: 'الشمال', right: 'north' },
              { left: 'الجنوب', right: 'south' },
              { left: 'الشرق', right: 'east' },
              { left: 'الغرب', right: 'west' },
              { left: 'يمين', right: 'right' },
            ],
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-7',
    titleEn: 'Build Sentences with Vocabulary',
    titleAr: 'بناء جمل بالمفردات',
    prompt: {
      promptEn: 'Write 6 sentences using vocabulary from the lesson: 2 about colors, 2 about directions, and 2 using numbers with the inverse gender agreement rule.',
      promptAr: 'اكتب ست جمل: جملتان عن الألوان، وجملتان عن الاتجاهات، وجملتان بالأعداد مع قاعدة المخالفة.',
      targetLength: { min: 18, max: 45 },
      hints: [
        'Colors: أبيض/بيضاء، أحمر/حمراء — match gender',
        'Directions: الشمال، الجنوب، يمين، يسار',
        'Numbers 3-10: masculine noun → feminine number and vice versa',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Colors',
        categoryAr: 'الألوان',
        words: [
          { arabic: 'أبيض', english: 'white (m)' },
          { arabic: 'أحمر', english: 'red (m)' },
          { arabic: 'أخضر', english: 'green (m)' },
          { arabic: 'أزرق', english: 'blue (m)' },
        ],
      },
      {
        categoryEn: 'Directions',
        categoryAr: 'الاتجاهات',
        words: [
          { arabic: 'الشمال', english: 'north' },
          { arabic: 'الجنوب', english: 'south' },
          { arabic: 'الشرق', english: 'east' },
          { arabic: 'الغرب', english: 'west' },
        ],
      },
      {
        categoryEn: 'Numbers',
        categoryAr: 'الأعداد',
        words: [
          { arabic: 'ثلاثة / ثلاث', english: 'three' },
          { arabic: 'خمسة / خمس', english: 'five' },
          { arabic: 'سبعة / سبع', english: 'seven' },
          { arabic: 'عشرة / عشر', english: 'ten' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-7-1', labelEn: 'Used at least 2 colors correctly', labelAr: 'استخدام لونين بشكل صحيح', examples: ['السيارة الحمراء', 'الكتاب الأبيض'], required: true },
      { id: 'gc-7-2', labelEn: 'Used directions in sentences', labelAr: 'استخدام الاتجاهات في جمل', examples: ['المسجد في الشمال'], required: true },
      { id: 'gc-7-3', labelEn: 'Applied inverse gender rule with numbers', labelAr: 'تطبيق قاعدة مخالفة العدد للمعدود', examples: ['ثلاثة كتب', 'ثلاث بنات'], required: true },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
