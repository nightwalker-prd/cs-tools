export type ProverbCategory = 'wisdom' | 'social' | 'humor' | 'perseverance' | 'knowledge' | 'faith';

export interface Proverb {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  meaning: string;
  literalTranslation?: string;
  category: ProverbCategory;
  origin?: string;
  usage?: string;
  tags: string[];
}

export interface CategoryInfo {
  id: ProverbCategory;
  nameEn: string;
  nameAr: string;
  icon: string;
  color: string;
  description: string;
}

export type QuizMode = 'match-halves' | 'guess-meaning' | 'fill-blank';

export interface QuizQuestion {
  id: string;
  mode: QuizMode;
  prompt: string;
  promptArabic?: string;
  options: string[];
  correctIndex: number;
  proverbId: string;
}

export interface QuizResult {
  mode: QuizMode;
  score: number;
  total: number;
  timeMs: number;
  date: string;
  answers: { questionId: string; correct: boolean; selectedIndex: number }[];
}

export interface AmthalProgress {
  quizResults: QuizResult[];
  bestScores: Record<QuizMode, number>;
  currentStreak: number;
  lastPracticedDate: string;
  viewedProverbs: string[];
}

export type RouteType = 'home' | 'browse' | 'browse-category' | 'proverb' | 'quiz' | 'quiz-session' | 'favorites';

export interface Route {
  type: RouteType;
  id?: string;
}
