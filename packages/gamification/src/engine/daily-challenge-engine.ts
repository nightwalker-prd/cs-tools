import type { DailyChallengeQuestion, DailyChallengeState } from '../types/daily-challenge';

/**
 * Simple seeded PRNG from a string (date).
 * Returns a function that produces pseudo-random numbers [0, 1).
 */
function createSeededRng(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }

  return () => {
    hash = (hash * 1664525 + 1013904223) | 0;
    return ((hash >>> 0) / 4294967296);
  };
}

// ─── Question Pool ─────────────────────────────────────────────

const QUESTION_POOL: DailyChallengeQuestion[] = [
  // Nahw (Grammar)
  {
    questionAr: 'ما إعراب الكلمة "الكتابَ" في: قرأتُ الكتابَ؟',
    questionEn: 'What is the i\'rab of "al-kitaaba" in: I read the book?',
    options: ['مرفوع', 'منصوب', 'مجرور', 'مبني'],
    correctIndex: 1,
    category: 'nahw',
  },
  {
    questionAr: 'ما نوع "هذا" في: هذا كتابٌ؟',
    questionEn: 'What type of word is "hadha" in: This is a book?',
    options: ['اسم إشارة', 'اسم موصول', 'ضمير', 'اسم استفهام'],
    correctIndex: 0,
    category: 'nahw',
  },
  {
    questionAr: 'ما علامة رفع جمع المذكر السالم؟',
    questionEn: 'What is the sign of raf\' for sound masculine plural?',
    options: ['الضمة', 'الألف', 'الواو', 'النون'],
    correctIndex: 2,
    category: 'nahw',
  },
  {
    questionAr: 'ما علامة نصب جمع المؤنث السالم؟',
    questionEn: 'What is the sign of nasb for sound feminine plural?',
    options: ['الفتحة', 'الكسرة', 'الألف', 'الياء'],
    correctIndex: 1,
    category: 'nahw',
  },
  {
    questionAr: 'أيّ الجمل الآتية جملة اسمية؟',
    questionEn: 'Which of the following is a nominal sentence?',
    options: ['ذهبَ الولدُ', 'الولدُ ذهبَ', 'في البيتِ', 'اجلسْ'],
    correctIndex: 1,
    category: 'nahw',
  },
  {
    questionAr: 'ما إعراب خبر "إنَّ"؟',
    questionEn: 'What is the i\'rab of the khabar of "inna"?',
    options: ['منصوب', 'مرفوع', 'مجرور', 'مجزوم'],
    correctIndex: 1,
    category: 'nahw',
  },
  {
    questionAr: 'ما إعراب اسم "كان"؟',
    questionEn: 'What is the i\'rab of the ism of "kaana"?',
    options: ['منصوب', 'مرفوع', 'مجرور', 'ساكن'],
    correctIndex: 1,
    category: 'nahw',
  },
  {
    questionAr: 'ما نوع الإضافة في "كتابُ الطالبِ"؟',
    questionEn: 'What type of idaafa is "kitaabu-t-taalibi"?',
    options: ['لامية', 'بيانية', 'ظرفية', 'تشبيهية'],
    correctIndex: 0,
    category: 'nahw',
  },
  // Sarf (Morphology)
  {
    questionAr: 'ما وزن كلمة "كاتِب"؟',
    questionEn: 'What is the wazn (pattern) of "kaatib"?',
    options: ['فَاعِل', 'مَفْعُول', 'فَعِيل', 'فَعَّال'],
    correctIndex: 0,
    category: 'sarf',
  },
  {
    questionAr: 'ما الجذر الثلاثي لكلمة "استغفار"؟',
    questionEn: 'What is the trilateral root of "istighfaar"?',
    options: ['س غ ف', 'غ ف ر', 'س ت غ', 'ف ر غ'],
    correctIndex: 1,
    category: 'sarf',
  },
  {
    questionAr: 'ما المضارع من "كَتَبَ"؟',
    questionEn: 'What is the present tense of "kataba"?',
    options: ['يَكتُبُ', 'يَكتِبُ', 'يُكتَبُ', 'يَكتَبُ'],
    correctIndex: 0,
    category: 'sarf',
  },
  {
    questionAr: 'ما اسم المفعول من "عَلِمَ"؟',
    questionEn: 'What is the ism maf\'ul of "\'alima"?',
    options: ['عَالِم', 'مَعْلُوم', 'عَلِيم', 'مُعَلِّم'],
    correctIndex: 1,
    category: 'sarf',
  },
  {
    questionAr: 'ما باب "فَتَحَ يَفتَحُ"؟',
    questionEn: 'What baab is "fataha yaftahu"?',
    options: ['نَصَرَ', 'ضَرَبَ', 'فَتَحَ', 'سَمِعَ'],
    correctIndex: 0,
    category: 'sarf',
  },
  {
    questionAr: 'ما وزن "مَكتَبة"؟',
    questionEn: 'What is the wazn of "maktaba"?',
    options: ['مَفعَلة', 'فَعَّالة', 'مُفاعَلة', 'فاعِلة'],
    correctIndex: 0,
    category: 'sarf',
  },
  // Vocabulary
  {
    questionAr: 'ما معنى "جَسِيم"؟',
    questionEn: 'What does "jasiim" mean?',
    options: ['Small', 'Great/Large', 'Beautiful', 'Fast'],
    correctIndex: 1,
    category: 'vocab',
  },
  {
    questionAr: 'ما مرادف "سَعِيد"؟',
    questionEn: 'What is a synonym of "sa\'iid" (happy)?',
    options: ['حزين', 'فرحان', 'غاضب', 'خائف'],
    correctIndex: 1,
    category: 'vocab',
  },
  {
    questionAr: 'ما ضد "كبير"؟',
    questionEn: 'What is the opposite of "kabiir" (big)?',
    options: ['طويل', 'قصير', 'صغير', 'عريض'],
    correctIndex: 2,
    category: 'vocab',
  },
  {
    questionAr: 'ما معنى "اِسْتَقَرَّ"؟',
    questionEn: 'What does "istaqarra" mean?',
    options: ['To leave', 'To settle/stabilize', 'To break', 'To ask'],
    correctIndex: 1,
    category: 'vocab',
  },
  {
    questionAr: 'ما جمع "كتاب"؟',
    questionEn: 'What is the plural of "kitaab"?',
    options: ['كتابات', 'كُتّاب', 'كُتُب', 'مكتبات'],
    correctIndex: 2,
    category: 'vocab',
  },
  // Balagah (Rhetoric)
  {
    questionAr: 'ما نوع البلاغة في "الأسد دخل الفصل" (عن طالب شجاع)؟',
    questionEn: 'What figure of speech is "The lion entered the class" (about a brave student)?',
    options: ['تشبيه', 'استعارة', 'كناية', 'مجاز مرسل'],
    correctIndex: 1,
    category: 'balagah',
  },
  {
    questionAr: 'ما نوع التشبيه في "العلم كالنور"؟',
    questionEn: 'What type of simile is "Knowledge is like light"?',
    options: ['تشبيه مرسل', 'تشبيه بليغ', 'تشبيه مؤكد', 'تشبيه ضمني'],
    correctIndex: 0,
    category: 'balagah',
  },
  {
    questionAr: 'ما الفرق بين الخبر والإنشاء؟',
    questionEn: 'What distinguishes khabar (declarative) from inshaa\' (performative)?',
    options: [
      'الخبر يحتمل الصدق والكذب',
      'الإنشاء يحتمل الصدق والكذب',
      'لا فرق بينهما',
      'الخبر للأمر فقط',
    ],
    correctIndex: 0,
    category: 'balagah',
  },
  {
    questionAr: 'ما نوع الأسلوب في "يا طالبُ"؟',
    questionEn: 'What type of style is "yaa taalibu" (O student)?',
    options: ['خبري', 'إنشائي طلبي', 'إنشائي غير طلبي', 'بلاغي'],
    correctIndex: 1,
    category: 'balagah',
  },
];

const QUESTIONS_PER_CHALLENGE = 5;

/**
 * Generate a daily challenge deterministically from a date string.
 * Uses a simple hash-based PRNG seeded by the date.
 */
export function generateDailyChallenge(dateStr: string): DailyChallengeState {
  const rng = createSeededRng(dateStr);
  const pool = [...QUESTION_POOL];

  // Fisher-Yates shuffle using seeded RNG
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const questions = pool.slice(0, QUESTIONS_PER_CHALLENGE);

  return {
    date: dateStr,
    questions,
    answeredIndices: [],
    correctCount: 0,
    completed: false,
    xpEarned: 0,
  };
}

/**
 * Submit an answer to a daily challenge question.
 * Returns a new state object (immutable).
 */
export function submitAnswer(
  state: DailyChallengeState,
  questionIndex: number,
  answerIndex: number,
): DailyChallengeState {
  // Already answered this question
  if (state.answeredIndices.includes(questionIndex)) {
    return state;
  }

  // Already completed
  if (state.completed) {
    return state;
  }

  const question = state.questions[questionIndex];
  if (!question) return state;

  const isCorrect = answerIndex === question.correctIndex;
  const newAnsweredIndices = [...state.answeredIndices, questionIndex];
  const newCorrectCount = state.correctCount + (isCorrect ? 1 : 0);
  const completed = newAnsweredIndices.length === state.questions.length;

  return {
    ...state,
    answeredIndices: newAnsweredIndices,
    correctCount: newCorrectCount,
    completed,
    xpEarned: state.xpEarned, // XP is computed by the consuming hook, not here
  };
}
