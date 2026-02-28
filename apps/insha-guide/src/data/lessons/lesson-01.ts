import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson01: Lesson = {
  id: 'lesson-1',
  number: 1,
  titleAr: 'الكلمة',
  titleEn: 'The Word',
  unitId: 'foundations',
  content: [
    {
      type: 'text',
      data: {
        content: 'A word (الكلمة) is composed of Arabic letters (أحرف الهجاء). For example: أ - ح - م - د = أحمد (Ahmad), ذ - هـ - ب = ذهب (he went), أ - ي - ن = أين (where). Speech is composed of three parts: noun (اسم), verb (فعل), and particle (حرف).',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Parts of Speech',
        titleAr: 'أقسام الكلام',
        headers: ['Part', 'Arabic', 'Examples'],
        rows: [
          ['Noun (اسم)', 'الاسم', 'مدرسة (school), كتاب (book), طالب (student)'],
          ['Verb (فعل)', 'الفعل', 'نصر (he helped), يجلس (he sits), ادرس (study!)'],
          ['Particle (حرف)', 'الحرف', 'في (in), إلى (to), هل (is/does?)'],
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Types of Nouns',
        titleAr: 'أنواع الاسم',
        headers: ['#', 'Type', 'Arabic', 'Examples'],
        rows: [
          ['1', 'Masculine', 'المذكر', 'كتاب (book), محمود (Mahmoud), أب (father)'],
          ['2', 'Feminine', 'المؤنث', 'سيارة (car), سلمى (Salma), أم (mother)'],
          ['3', 'Singular', 'المفرد', 'مكتبة (library), قلم (pen), مسلم (Muslim)'],
          ['4', 'Plural', 'الجمع', 'مكتبات (libraries), أقلام (pens), مسلمون (Muslims)'],
          ['5', 'Verbal noun', 'المصدر', 'قراءة (reading), أكل (eating), سمع (hearing)'],
          ['6', 'Demonstrative', 'الإشارة', 'هذا (this), ذلك (that), هؤلاء (these)'],
          ['7', 'Relative pronoun', 'الموصول', 'الّذي (who-m), الّتي (who-f), ما (what)'],
          ['8', 'Personal pronoun', 'الضمائر', 'أنا (I), أنت (you), هو (he)'],
          ['9', 'Interrogative', 'أدوات الاستفهام', 'كيف (how), أين (where), من (who)'],
        ],
        note: 'هل and الهمزة are particles, not nouns — they are interrogative particles.',
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Signs of the Noun',
        titleAr: 'علامات الاسم',
        rule: 'The noun has five distinguishing signs that separate it from the verb and particle.',
        examples: [
          { arabic: 'يا زيد', explanation: 'Vocative particle يا — O Zayd' },
          { arabic: 'بيتٌ', explanation: 'Tanwin (nunation) — a house' },
          { arabic: 'مررت بجارٍ', explanation: 'Jarr (preposition takes it) — I passed by a neighbor' },
          { arabic: 'المسجد', explanation: 'Al (definite article) — the mosque' },
          { arabic: 'الطالب مجتهد', explanation: 'Isnad (predication) — the student is diligent' },
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Verb Tenses',
        titleAr: 'أزمنة الفعل',
        headers: ['Tense', 'Arabic', 'Examples'],
        rows: [
          ['Past (الماضي)', 'وقع الفعل في الماضي', 'نصر (he helped), جلس (he sat), درس (he studied)'],
          ['Present (المضارع)', 'أو في المضارع', 'ينصر (he helps), يجلس (he sits), يدرس (he studies)'],
          ['Imperative (الأمر)', 'أو في الأمر', 'انصر (help!), اجلس (sit!), ادرس (study!)'],
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'The Six Patterns of the Triliteral Verb',
        titleAr: 'الفعل الثلاثي المجرّد وأوزانه',
        headers: ['#', 'Pattern', 'Arabic Pattern', 'Examples'],
        rows: [
          ['I', 'fa\'ala yaf\'ulu', 'نَصَرَ يَنْصُرُ', 'أكل (ate), رسم (drew), سكن (resided), شكر (thanked)'],
          ['II', 'fa\'ala yaf\'ilu', 'ضَرَبَ يَضْرِبُ', 'حبس (imprisoned), سرق (stole), كشف (uncovered), ملك (owned)'],
          ['III', 'fa\'ala yaf\'ahu', 'فَتَحَ يَفْتَحُ', 'بدأ (began), ذهب (went), ركع (bowed), نفع (benefited)'],
          ['IV', 'fa\'ila yaf\'alu', 'فَرِحَ يَفْرَحُ', 'أسف (regretted), حذر (was cautious), كره (disliked), ندم (regretted)'],
          ['V', 'fa\'ula yaf\'ulu', 'شَرُفَ يَشْرُفُ', 'عظم (was great), حسن (was good), كرم (was generous), شجع (was brave)'],
          ['VI', 'fa\'ila yaf\'ilu', 'حَسِبَ يَحْسِبُ', 'بئس (was wretched), حسب (reckoned), يئس (despaired), ورث (inherited)'],
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Signs of the Verb',
        titleAr: 'علامات الفعل',
        rule: 'The verb has five distinguishing signs that separate it from the noun and particle.',
        examples: [
          { arabic: 'قد قام / قد يقوم', explanation: 'قد — enters on past (certainly) and present (perhaps)' },
          { arabic: 'سيقوم / سوف يقوم', explanation: 'السين و سوف — exclusive to the present tense (future)' },
          { arabic: 'قامتْ / قرأتْ', explanation: 'تاء التأنيث الساكنة — feminine marker, exclusive to past tense' },
          { arabic: 'قمتُ / قرأتُ', explanation: 'تاء الفاعل — subject pronoun, exclusive to past tense' },
          { arabic: 'كُلْ / اقرأْ', explanation: 'Indicates a command if derived from a verb root' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-1-1',
      title: 'Identify Parts of Speech',
      titleAr: 'حدّد أقسام الكلام',
      instruction: 'Choose the correct part of speech for each word.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-1-1-1',
            question: 'What part of speech is مدرسة (school)?',
            options: ['Noun (اسم)', 'Verb (فعل)', 'Particle (حرف)'],
            correctIndex: 0,
            explanation: 'مدرسة is a noun — it accepts the definite article: المدرسة',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-1-1-2',
            question: 'What part of speech is ذهب (he went)?',
            options: ['Noun (اسم)', 'Verb (فعل)', 'Particle (حرف)'],
            correctIndex: 1,
            explanation: 'ذهب is a past tense verb — it accepts تاء التأنيث: ذهبتْ',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-1-1-3',
            question: 'What part of speech is في (in)?',
            options: ['Noun (اسم)', 'Verb (فعل)', 'Particle (حرف)'],
            correctIndex: 2,
            explanation: 'في is a particle (preposition) — it does not accept signs of nouns or verbs',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-1-1-4',
            question: 'What part of speech is يدرس (he studies)?',
            options: ['Noun (اسم)', 'Verb (فعل)', 'Particle (حرف)'],
            correctIndex: 1,
            explanation: 'يدرس is a present tense verb — it accepts سوف: سوف يدرس',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-1-1-5',
            question: 'What part of speech is هذا (this)?',
            options: ['Noun (اسم)', 'Verb (فعل)', 'Particle (حرف)'],
            correctIndex: 0,
            explanation: 'هذا is a demonstrative noun (اسم الإشارة)',
          },
        },
      ],
    },
    {
      id: 'ex-1-2',
      title: 'Match Noun Types',
      titleAr: 'طابق أنواع الاسم',
      instruction: 'Match each noun type with its correct example.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-1-2-1',
            pairs: [
              { left: 'المذكر', right: 'كتاب' },
              { left: 'المؤنث', right: 'سيارة' },
              { left: 'المصدر', right: 'قراءة' },
              { left: 'الإشارة', right: 'هذا' },
              { left: 'الضمائر', right: 'أنا' },
            ],
          },
        },
      ],
    },
    {
      id: 'ex-1-3',
      title: 'Verb Tenses',
      titleAr: 'أزمنة الفعل',
      instruction: 'Identify the tense of each verb.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-1-3-1',
            question: 'What tense is جلس (he sat)?',
            options: ['Past (ماضي)', 'Present (مضارع)', 'Imperative (أمر)'],
            correctIndex: 0,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-1-3-2',
            question: 'What tense is ينصر (he helps)?',
            options: ['Past (ماضي)', 'Present (مضارع)', 'Imperative (أمر)'],
            correctIndex: 1,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-1-3-3',
            question: 'What tense is اجلس (sit!)?',
            options: ['Past (ماضي)', 'Present (مضارع)', 'Imperative (أمر)'],
            correctIndex: 2,
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-1-3-4',
            question: 'What tense is يكتب (he writes)?',
            options: ['Past (ماضي)', 'Present (مضارع)', 'Imperative (أمر)'],
            correctIndex: 1,
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-1',
    titleEn: 'Identify and Use Parts of Speech',
    titleAr: 'تحديد واستخدام أقسام الكلام',
    prompt: {
      promptEn: 'Write 5 sentences in Arabic. Each sentence must contain at least one noun, one verb, and one particle. Label each word with its part of speech.',
      promptAr: 'اكتب خمس جمل بالعربية. يجب أن تحتوي كلّ جملة على اسم وفعل وحرف على الأقلّ.',
      targetLength: { min: 15, max: 40 },
      hints: [
        'Use different verb tenses (past, present, imperative)',
        'Include different types of nouns (masculine, feminine, pronouns)',
        'Try using prepositions like في، إلى، من',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Nouns',
        categoryAr: 'أسماء',
        words: [
          { arabic: 'مدرسة', english: 'school' },
          { arabic: 'كتاب', english: 'book' },
          { arabic: 'طالب', english: 'student' },
          { arabic: 'قلم', english: 'pen' },
          { arabic: 'سيارة', english: 'car' },
        ],
      },
      {
        categoryEn: 'Verbs',
        categoryAr: 'أفعال',
        words: [
          { arabic: 'ذهب', english: 'went' },
          { arabic: 'يجلس', english: 'sits' },
          { arabic: 'يدرس', english: 'studies' },
          { arabic: 'نصر', english: 'helped' },
          { arabic: 'كتب', english: 'wrote' },
        ],
      },
      {
        categoryEn: 'Particles',
        categoryAr: 'حروف',
        words: [
          { arabic: 'في', english: 'in' },
          { arabic: 'إلى', english: 'to' },
          { arabic: 'من', english: 'from' },
          { arabic: 'على', english: 'on' },
          { arabic: 'هل', english: 'is/does?' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-1-1', labelEn: 'Used at least one past tense verb', labelAr: 'استخدام فعل ماضٍ', examples: ['ذهب', 'جلس', 'درس'], required: true },
      { id: 'gc-1-2', labelEn: 'Used at least one present tense verb', labelAr: 'استخدام فعل مضارع', examples: ['يذهب', 'يجلس', 'يدرس'], required: true },
      { id: 'gc-1-3', labelEn: 'Used a preposition (حرف جر)', labelAr: 'استخدام حرف جر', examples: ['في', 'إلى', 'من', 'على'], required: true },
      { id: 'gc-1-4', labelEn: 'Included a definite noun (with ال)', labelAr: 'استخدام اسم معرّف بأل', examples: ['المدرسة', 'الكتاب'], required: false },
      { id: 'gc-1-5', labelEn: 'Used a pronoun', labelAr: 'استخدام ضمير', examples: ['أنا', 'هو', 'هي'], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
