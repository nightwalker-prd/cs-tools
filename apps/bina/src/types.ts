export type Difficulty = 'easy' | 'medium' | 'hard';

export type TopicCategory =
  | 'nominal'
  | 'verbal'
  | 'possessive'
  | 'definiteness'
  | 'particles'
  | 'complex';

export type DiacriticType =
  | 'fatha'
  | 'kasra'
  | 'damma'
  | 'tanwin-fatha'
  | 'tanwin-kasra'
  | 'tanwin-damma'
  | 'shadda'
  | 'sukun';

export type ValidatorType =
  | 'contains'
  | 'notContains'
  | 'startsWith'
  | 'endsWith'
  | 'wordCount'
  | 'hasDiacritic'
  | 'exactMatch'
  | 'pattern'
  | 'containsWord'
  | 'wordAtPosition'
  | 'custom';

export interface ChallengeTest {
  id: string;
  name: string;
  validator: ValidatorType;
  params: ValidatorParams;
  message?: string;
  failMessage?: string;
}

export interface ValidatorParams {
  text?: string;
  texts?: string[];
  word?: string;
  words?: string[];
  position?: number;
  min?: number;
  max?: number;
  diacritic?: DiacriticType;
  pattern?: string;
  ignoreHarakat?: boolean;
  customFn?: string;
}

export interface Hint {
  level: 1 | 2 | 3;
  text: string;
  textAr?: string;
}

export interface RefactorChallenge {
  description: string;
  descriptionAr?: string;
  constraints: string[];
  tests: ChallengeTest[];
}

export interface Challenge {
  id: string;
  number: number;
  title: string;
  titleAr: string;
  topic: string;
  category: TopicCategory;
  difficulty: Difficulty;
  description: string;
  descriptionAr: string;
  translation?: string;
  tests: ChallengeTest[];
  hints: Hint[];
  solutions: string[];
  refactorChallenge?: RefactorChallenge;
  relatedTopics: string[];
  tags: string[];
}

export interface TestResult {
  testId: string;
  name: string;
  passed: boolean;
  message: string;
}

export type TestRunStatus = 'idle' | 'running' | 'passed' | 'failed';

export interface TestRunResult {
  status: TestRunStatus;
  results: TestResult[];
  passCount: number;
  failCount: number;
  totalCount: number;
}

export type ChallengePhase = 'editing' | 'running' | 'passed' | 'refactoring';

export interface ChallengeProgress {
  completed: boolean;
  attempts: number;
  bestTime?: number;
  hintsUsed: number;
  refactorCompleted?: boolean;
  lastSubmission?: string;
}

export interface BinaProgress {
  challenges: Record<string, ChallengeProgress>;
  totalCompleted: number;
  currentStreak: number;
  lastPracticedDate: string;
}

export interface CategoryInfo {
  id: TopicCategory;
  name: string;
  nameAr: string;
  description: string;
  icon: string;
}

export interface SearchResult {
  challenge: Challenge;
  matchField: 'title' | 'titleAr' | 'topic' | 'tag';
}
