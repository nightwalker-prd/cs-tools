import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson34: Lesson = {
  id: 'lesson-34',
  number: 34,
  titleAr: 'وصف الرسول ﷺ',
  titleEn: 'Description of the Prophet',
  unitId: 'writing',
  content: [
    {
      type: 'text',
      data: {
        content: 'This lesson presents a model essay describing a person — specifically the Prophet Muhammad (peace be upon him). It demonstrates how to describe character, personality, and qualities using rich Arabic vocabulary.',
      },
    },
    {
      type: 'model-essay',
      data: {
        title: 'Description of the Messenger',
        titleAr: 'وصف الرسول صلى الله عليه وسلم',
        paragraphs: [
          {
            arabic: 'هو خير خلق الله، وسيّد الأوّلين والآخرين، نبيّ الرحمة، أحمد في الأرض محمود في السماء، وكان رسول الله صلى الله عليه وسلم قويّ الشخصيّة ذكياً فطناً، شديد الحياء، جميل الخلق والخُلق، كريم الصفات.',
            translation: 'He is the best of Allah\'s creation, the master of the first and the last, the Prophet of Mercy. The Messenger of Allah (peace be upon him) was strong in personality, intelligent, perceptive, intensely modest, beautiful in appearance and character, noble in qualities.',
          },
          {
            arabic: 'شجاعا مقداما، سخيّا جوادا، عفوا مسامحا، ليّنا سمحا، صبورا حليما، عابدا ناسكا، لا يغدر أحدا، عرف بالصدق والأمانة والتبليغ والفطانة، وكان يلقّب بالصادق الأمين قبل البعثة.',
            translation: 'He was brave and courageous, generous and giving, forgiving and tolerant, gentle and lenient, patient and forbearing, a devoted worshipper, never betraying anyone, known for truthfulness and trustworthiness. He was nicknamed "The Truthful and Trustworthy" before the prophethood.',
          },
          {
            arabic: 'بُعث رحمة للعالمين، كان أميّا لا يعرف القراءة ولا الكتابة، ولكن علّمه ربه وأدّبه فأحسن تأديبه. فأصبح أكبر وأفضل معلّم ومربّ للبشر.',
            translation: 'He was sent as a mercy to the worlds. He was unlettered, knowing neither reading nor writing, but his Lord taught him and disciplined him in the best manner. So he became the greatest and best teacher and educator of mankind.',
          },
        ],
        vocabulary: [
          { arabic: 'خير خلق الله', english: 'the best of Allah\'s creation' },
          { arabic: 'نبيّ الرحمة', english: 'Prophet of Mercy' },
          { arabic: 'شديد الحياء', english: 'intensely modest' },
          { arabic: 'شجاعا مقداما', english: 'brave and courageous' },
          { arabic: 'سخيّا جوادا', english: 'generous and giving' },
          { arabic: 'صبورا حليما', english: 'patient and forbearing' },
          { arabic: 'الصادق الأمين', english: 'the Truthful and Trustworthy' },
          { arabic: 'رحمة للعالمين', english: 'mercy to the worlds' },
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Quranic Reference',
        titleAr: 'شاهد قرآني',
        rule: 'Allah praised the Prophet\'s character in the Quran: "And indeed, you are of a great moral character" (Surah al-Qalam, 68:4).',
        examples: [
          { arabic: 'وَإِنَّكَ لَعَلَى خُلُقٍ عَظِيمٍ', explanation: 'And indeed, you are of a great moral character — Quran 68:4' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-34-1',
      title: 'Prophet Description Quiz',
      titleAr: 'اختبار وصف الرسول ﷺ',
      instruction: 'Answer questions about the essay.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-34-1-1',
            question: 'What was the Prophet\'s nickname before prophethood?',
            options: ['The Brave', 'The Truthful and Trustworthy', 'The Generous', 'The Patient'],
            correctIndex: 1,
            explanation: 'الصادق الأمين — the Truthful and Trustworthy.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-34-1-2',
            question: 'What does سخيّا جوادا mean?',
            options: ['Patient and forbearing', 'Brave and courageous', 'Generous and giving', 'Forgiving and tolerant'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-34-1-3',
            question: 'Which Surah contains the verse praising the Prophet\'s character?',
            options: ['Al-Baqarah', 'Al-Qalam', 'Al-Fatiha', 'Yasin'],
            correctIndex: 1,
          },
        },
      ],
    },
    {
      id: 'ex-34-2',
      title: 'Match Descriptions',
      titleAr: 'طابق الأوصاف',
      instruction: 'Match each Arabic description with its English meaning.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-34-2-1',
            pairs: [
              { left: 'شديد الحياء', right: 'intensely modest' },
              { left: 'صبورا حليما', right: 'patient and forbearing' },
              { left: 'عفوا مسامحا', right: 'forgiving and tolerant' },
              { left: 'نبيّ الرحمة', right: 'Prophet of Mercy' },
              { left: 'خير خلق الله', right: 'the best of Allah\'s creation' },
            ],
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-34',
    titleEn: 'Describe a Person You Admire',
    titleAr: 'صف شخصًا تحترمه',
    prompt: {
      promptEn: 'Write a descriptive paragraph about a real or historical person you admire. Include their character traits using paired adjectives like the model essay (شجاع مقدام، سخي جواد).',
      promptAr: 'اكتب فقرة وصفية عن شخص تحترمه مستخدمًا صفات مزدوجة.',
      targetLength: { min: 35, max: 70 },
      hints: [
        'Use paired adjectives for emphasis: شجاع مقدام',
        'Mention moral qualities: الصادق الأمين',
        'Include how they treat others',
        'Reference their impact or achievements',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Paired Character Traits',
        categoryAr: 'صفات مزدوجة',
        words: [
          { arabic: 'شجاع مقدام', english: 'brave and courageous' },
          { arabic: 'سخي جواد', english: 'generous and giving' },
          { arabic: 'عفو مسامح', english: 'forgiving and tolerant' },
          { arabic: 'صبور حليم', english: 'patient and forbearing' },
        ],
      },
      {
        categoryEn: 'Moral Qualities',
        categoryAr: 'صفات أخلاقية',
        words: [
          { arabic: 'الصادق', english: 'the truthful' },
          { arabic: 'الأمين', english: 'the trustworthy' },
          { arabic: 'رحمة', english: 'mercy' },
          { arabic: 'خُلق عظيم', english: 'great character' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-34-1', labelEn: 'Used at least 3 paired adjective phrases', labelAr: 'استخدام ٣ عبارات صفات مزدوجة', examples: ['شجاع مقدام'], required: true },
      { id: 'gc-34-2', labelEn: 'Described moral and character qualities', labelAr: 'وصف صفات أخلاقية', examples: [], required: true },
      { id: 'gc-34-3', labelEn: 'Mentioned their impact on others', labelAr: 'ذكر تأثيرهم على الآخرين', examples: [], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
