import type { Lesson } from '../types';
import { STANDARD_RUBRIC } from '../compose-rubric';

export const lesson02: Lesson = {
  id: 'lesson-2',
  number: 2,
  titleAr: 'الحرف وأنواعه',
  titleEn: 'The Particle and Its Types',
  unitId: 'foundations',
  content: [
    {
      type: 'text',
      data: {
        content: 'The particle (الحرف) occurs between other words in speech. It has no sign of its own — its marker is that it does not accept the signs of nouns or verbs. There are many types of particles, the most important being prepositions and conjunctions.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'The Prepositions',
        titleAr: 'حروف الجرّ',
        headers: ['Preposition', 'Arabic', 'Core Meaning'],
        rows: [
          ['إلى', 'ila', 'to / until — end of time or place'],
          ['الباء', 'ba', 'with / by — attachment, seeking help'],
          ['على', '\'ala', 'on / upon — physical or figurative highness'],
          ['عن', '\'an', 'from / about — passing beyond, distance'],
          ['في', 'fi', 'in — place or time container'],
          ['اللام', 'lam', 'for / to — possession, reasoning'],
          ['من', 'min', 'from — beginning of place or time'],
          ['الكاف', 'kaf', 'like — simile / comparison'],
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Meanings of إلى (to/until)',
        titleAr: 'معاني إلى',
        headers: ['Meaning', 'Arabic', 'Example'],
        rows: [
          ['End of time', 'انتهاء الغاية الزمانية', 'عمل باسل إلى الساعة العاشرة — Basil worked until 10 o\'clock'],
          ['Place', 'المكانية', 'سافرت إلى دمشق — I traveled to Damascus'],
          ['Meaning of اللام', 'بمعنى اللام', 'العلم أحبّ إليّ من مال الدنيا — Knowledge is dearer to me than worldly wealth'],
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Meanings of الباء (with/by)',
        titleAr: 'معاني الباء',
        headers: ['Meaning', 'Arabic', 'Example'],
        rows: [
          ['Attachment', 'الإلصاق', 'أمسكت بيدك — I held your hand'],
          ['Seeking help', 'الاستعانة', 'كتبت بالقلم — I wrote with the pen'],
          ['Transitivity', 'التعدية', 'ذهب الله بنورهم — Allah took away their light'],
          ['Circumstantial', 'الظرفية', 'أقام عمرو بمكة — Amr resided in Makkah'],
          ['Oath', 'القَسَم', 'بالله العظيم لأسافرنّ — By Allah the Great, I will travel'],
          ['Extra/emphasis', 'زائدة', 'ليس الجهل بنافع — Ignorance is not beneficial'],
        ],
        note: 'Whatever other meanings الباء has, الإلصاق (attachment) is always present.',
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Meanings of على (on/upon)',
        titleAr: 'معاني على',
        headers: ['Meaning', 'Arabic', 'Example'],
        rows: [
          ['Physical highness', 'الاستعلاء', 'الحاسوب على المكتب — The computer is on the desk'],
          ['Figurative highness', 'الاستعلاء المجازي', 'فضّلنا بعضهم على بعض — We favored some over others'],
          ['Reasoning/cause', 'التعليل', 'أشكرك على ما كان من معروفك — I thank you for your kindness'],
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Meanings of عن (from/about)',
        titleAr: 'معاني عن',
        headers: ['Meaning', 'Arabic', 'Example'],
        rows: [
          ['Passing beyond', 'المجاوزة', 'سِرتُ عن المدينة — I departed from the city'],
          ['Distance', 'البُعد', 'ابتعد عن الدنايا — Stay away from lowly things'],
          ['Disinclination', 'الرغبة عن', 'رغبت عن الشيء — I turned away from the thing'],
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Meanings of في (in)',
        titleAr: 'معاني في',
        headers: ['Meaning', 'Arabic', 'Example'],
        rows: [
          ['Place container', 'الظرفية المكانية', 'الماء في الإبريق — The water is in the pitcher'],
          ['Time container', 'الظرفية الزمانية', 'سأحضر في الساعة التاسعة — I will attend at 9 PM'],
          ['Reasoning/cause', 'التعليل', 'سجن اللص في سرقة ارتكبها — The thief was imprisoned for a theft he committed'],
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Meanings of اللام (for/to) & من (from) & الكاف (like)',
        titleAr: 'معاني اللام ومن والكاف',
        headers: ['Preposition', 'Meaning', 'Example'],
        rows: [
          ['اللام', 'Possession (المِلك)', 'الكتاب لزيد — The book belongs to Zayd'],
          ['اللام', 'Reasoning (التعليل)', 'جاء يوسف إلى المدرسة للتعلّم — Yusuf came to school to learn'],
          ['من', 'Beginning of place', 'خرج يوسف من المدرسة إلى البيت — Yusuf left from school to home'],
          ['من', 'Beginning of time', 'صام حسن من أوّل الشهر — Hasan fasted from the beginning of the month'],
          ['الكاف', 'Simile (التشبيه)', 'الشجاع كالأسد — The brave one is like a lion'],
        ],
      },
    },
    {
      type: 'grammar-table',
      data: {
        title: 'Conjunctions',
        titleAr: 'حروف العطف',
        headers: ['Conjunction', 'Function', 'Example'],
        rows: [
          ['الواو (wa)', 'Combines without chronological order', 'دخلت البيت وراجعت الدروس — I entered the house and reviewed the lessons'],
          ['الفاء (fa)', 'Combines WITH order and sequence', 'دخلت البيت، فراجعت الدروس — I entered the house, then reviewed the lessons'],
          ['ثمّ (thumma)', 'Combines with order but with a time gap', 'دخلت البيت، ثمّ راجعت الدروس — I entered the house, then [later] reviewed the lessons'],
        ],
      },
    },
    {
      type: 'rule-card',
      data: {
        title: 'Signs of the Particle',
        titleAr: 'علامات الحرف',
        rule: 'The particle has NO sign of its own. Its marker is that it does not accept the signs of the noun (تنوين, ال, الجرّ, النداء, الإسناد) or the signs of the verb (قد, السين, سوف, تاء التأنيث, تاء الفاعل). Any word that does not accept these signs is a particle.',
        examples: [
          { arabic: 'حتّى', explanation: 'Preposition / conjunction particle (حرف جرّ)' },
          { arabic: 'لا', explanation: 'Negation particle (حرف نفي)' },
          { arabic: 'بل', explanation: 'Correction/retraction particle (حرف إضراب)' },
          { arabic: 'لم / لمّا', explanation: 'Negation and jussive particles (حرفا نفي وجزم)' },
          { arabic: 'هل', explanation: 'Interrogative particle (حرف استفهام)' },
        ],
      },
    },
  ],
  exercises: [
    {
      id: 'ex-2-1',
      title: 'Identify Prepositions',
      titleAr: 'حدّد حروف الجرّ',
      instruction: 'Fill in the blank with the correct preposition.',
      questions: [
        {
          type: 'fill-blank',
          data: {
            id: 'q-2-1-1',
            sentence: 'سافرت ___ دمشق',
            answer: 'إلى',
            options: ['إلى', 'في', 'من', 'على'],
            hint: 'Meaning: I traveled ___ Damascus',
          },
        },
        {
          type: 'fill-blank',
          data: {
            id: 'q-2-1-2',
            sentence: 'كتبت ___ القلم',
            answer: 'بـ',
            options: ['بـ', 'في', 'عن', 'إلى'],
            hint: 'Meaning: I wrote ___ the pen',
          },
        },
        {
          type: 'fill-blank',
          data: {
            id: 'q-2-1-3',
            sentence: 'الحاسوب ___ المكتب',
            answer: 'على',
            options: ['على', 'في', 'من', 'إلى'],
            hint: 'Meaning: The computer is ___ the desk',
          },
        },
        {
          type: 'fill-blank',
          data: {
            id: 'q-2-1-4',
            sentence: 'الماء ___ الإبريق',
            answer: 'في',
            options: ['في', 'على', 'من', 'بـ'],
            hint: 'Meaning: The water is ___ the pitcher',
          },
        },
        {
          type: 'fill-blank',
          data: {
            id: 'q-2-1-5',
            sentence: 'خرج يوسف ___ المدرسة',
            answer: 'من',
            options: ['من', 'في', 'إلى', 'على'],
            hint: 'Meaning: Yusuf left ___ school',
          },
        },
      ],
    },
    {
      id: 'ex-2-2',
      title: 'Match Preposition Meanings',
      titleAr: 'طابق معاني حروف الجرّ',
      instruction: 'Match each preposition with its core meaning.',
      questions: [
        {
          type: 'match-pairs',
          data: {
            id: 'q-2-2-1',
            pairs: [
              { left: 'إلى', right: 'to / until' },
              { left: 'في', right: 'in' },
              { left: 'على', right: 'on / upon' },
              { left: 'من', right: 'from' },
              { left: 'الكاف', right: 'like (simile)' },
            ],
          },
        },
      ],
    },
    {
      id: 'ex-2-3',
      title: 'Conjunctions',
      titleAr: 'حروف العطف',
      instruction: 'Choose the correct conjunction for each sentence.',
      questions: [
        {
          type: 'multiple-choice',
          data: {
            id: 'q-2-3-1',
            question: 'Which conjunction combines WITHOUT chronological order?',
            options: ['الواو (wa)', 'الفاء (fa)', 'ثمّ (thumma)'],
            correctIndex: 0,
            explanation: 'الواو combines items without implying any specific order in time.',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-2-3-2',
            question: 'Which conjunction implies immediate sequence?',
            options: ['الواو (wa)', 'الفاء (fa)', 'ثمّ (thumma)'],
            correctIndex: 1,
            explanation: 'الفاء combines with order AND immediate sequence (تعقيب).',
          },
        },
        {
          type: 'multiple-choice',
          data: {
            id: 'q-2-3-3',
            question: 'Which conjunction implies a time gap between events?',
            options: ['الواو (wa)', 'الفاء (fa)', 'ثمّ (thumma)'],
            correctIndex: 2,
            explanation: 'ثمّ combines with order but with a time gap (التراخي الزمني).',
          },
        },
      ],
    },
  ],
  compose: {
    id: 'compose-2',
    titleEn: 'Use Particles in Sentences',
    titleAr: 'استخدم الحروف في جمل',
    prompt: {
      promptEn: 'Write 5 sentences using different prepositions and conjunctions. Each sentence should use at least one preposition (حرف جر) and demonstrate its meaning clearly.',
      promptAr: 'اكتب خمس جمل مستخدمًا حروف جر وحروف عطف مختلفة.',
      targetLength: { min: 15, max: 40 },
      hints: [
        'Use prepositions like في، إلى، من، على، عن',
        'Try conjunctions: الواو (and), الفاء (then), ثمّ (then later)',
        'Show different meanings of the same preposition in different sentences',
      ],
    },
    wordBank: [
      {
        categoryEn: 'Prepositions',
        categoryAr: 'حروف الجر',
        words: [
          { arabic: 'في', english: 'in' },
          { arabic: 'إلى', english: 'to' },
          { arabic: 'من', english: 'from' },
          { arabic: 'على', english: 'on' },
          { arabic: 'عن', english: 'about/from' },
          { arabic: 'بِ', english: 'with/by' },
          { arabic: 'لِ', english: 'for/to' },
          { arabic: 'كَ', english: 'like/as' },
        ],
      },
      {
        categoryEn: 'Conjunctions',
        categoryAr: 'حروف العطف',
        words: [
          { arabic: 'و', english: 'and' },
          { arabic: 'فَ', english: 'and then' },
          { arabic: 'ثمّ', english: 'then (later)' },
        ],
      },
    ],
    grammarChecklist: [
      { id: 'gc-2-1', labelEn: 'Used at least 3 different prepositions', labelAr: 'استخدام ٣ حروف جر مختلفة', examples: ['في', 'إلى', 'من'], required: true },
      { id: 'gc-2-2', labelEn: 'Used a conjunction (عطف)', labelAr: 'استخدام حرف عطف', examples: ['و', 'ف', 'ثمّ'], required: true },
      { id: 'gc-2-3', labelEn: 'Each sentence is a complete thought', labelAr: 'كلّ جملة فكرة كاملة', examples: [], required: true },
      { id: 'gc-2-4', labelEn: 'Showed sequence with الفاء or ثمّ', labelAr: 'إظهار الترتيب بالفاء أو ثمّ', examples: ['دخلت فسلّمت', 'درست ثمّ استرحت'], required: false },
    ],
    rubric: STANDARD_RUBRIC,
  },
};
