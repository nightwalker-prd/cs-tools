export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type CategoryType = 'nahw' | 'sarf' | 'vocabulary';
export type QuestionSource = 'fstu-exercises' | 'tarkib-builder' | 'tarjama' | 'vocabulary' | 'conjugation';

export interface PlacementQuestion {
  id: string;
  categoryId: string;
  categoryType: CategoryType;
  difficulty: Difficulty;
  prompt: string;
  arabicText?: string;
  options: string[];
  correctIndex: number;
  source: QuestionSource;
  sourceId: string;
}

export interface CategoryState {
  categoryId: string;
  categoryType: CategoryType;
  theta: number;
  questionsAsked: number;
  questionsCorrect: number;
  isDone: boolean;
  answers: boolean[];
}

export interface EngineState {
  categories: CategoryState[];
  questionsAnswered: number;
  maxQuestions: number;
  startedAt: number;
}

export interface CategoryScore {
  categoryId: string;
  label: string;
  labelAr: string;
  theta: number;
  questionsAsked: number;
  questionsCorrect: number;
  percentage: number;
  proficiencyLevel: Difficulty;
}

export interface UnitScorecard {
  unitNumber: number;
  unitTitle: string;
  unitTitleAr: string;
  overallPercentage: number;
  proficiencyLevel: Difficulty;
  categories: CategoryScore[];
}

export interface PlacementResult {
  id: string;
  completedAt: number;
  duration: number;
  totalQuestions: number;
  totalCorrect: number;
  overallPercentage: number;
  scorecards: UnitScorecard[];
}

export type AppPhase = 'start' | 'testing' | 'results' | 'history';

export interface CategoryDefinition {
  id: string;
  type: CategoryType;
  unit: number;
  label: string;
  labelAr: string;
  toolLink?: string;
}

export interface QuestionPool {
  byCategoryAndDifficulty: Map<string, Map<Difficulty, PlacementQuestion[]>>;
  allCategories: string[];
}
