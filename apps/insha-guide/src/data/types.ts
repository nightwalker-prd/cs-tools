// ─── Content Block Types ───

export interface GrammarTableData {
  title: string;
  titleAr?: string;
  headers: string[];
  rows: string[][];
  note?: string;
}

export interface VocabularyItem {
  arabic: string;
  transliteration?: string;
  english: string;
}

export interface VocabularyGridData {
  title: string;
  titleAr?: string;
  items: VocabularyItem[];
}

export interface ModelEssayData {
  title: string;
  titleAr?: string;
  paragraphs: { arabic: string; translation: string }[];
  vocabulary?: VocabularyItem[];
  questions?: string[];
}

export interface RuleCardData {
  title: string;
  titleAr?: string;
  rule: string;
  examples: { arabic: string; explanation: string }[];
  note?: string;
}

export interface SynonymGroupData {
  title: string;
  titleAr?: string;
  groups: {
    concept: string;
    conceptAr: string;
    words: { arabic: string; english: string }[];
    example?: string;
  }[];
}

export interface LinkingToolData {
  title: string;
  titleAr?: string;
  categories: {
    name: string;
    nameAr: string;
    tools: { arabic: string; english: string; example?: string; exampleTranslation?: string }[];
  }[];
}

export interface TextBlockData {
  content: string;
  arabic?: boolean;
}

export type LessonContentBlock =
  | { type: 'grammar-table'; data: GrammarTableData }
  | { type: 'vocabulary-grid'; data: VocabularyGridData }
  | { type: 'model-essay'; data: ModelEssayData }
  | { type: 'rule-card'; data: RuleCardData }
  | { type: 'synonym-group'; data: SynonymGroupData }
  | { type: 'linking-tools'; data: LinkingToolData }
  | { type: 'text'; data: TextBlockData };

// ─── Exercise Types ───

export interface FillBlankQuestion {
  id: string;
  sentence: string;      // Use ___ for blank
  answer: string;
  options?: string[];     // If multiple choice
  hint?: string;
}

export interface WordOrderQuestion {
  id: string;
  words: string[];        // Scrambled
  answer: string[];       // Correct order
  translation?: string;
}

export interface MatchPairQuestion {
  id: string;
  pairs: { left: string; right: string }[];
}

export interface MultipleChoiceQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface SentenceBuildQuestion {
  id: string;
  prompt: string;
  components: { type: string; options: string[] }[];
  answer: string;
}

export type ExerciseQuestion =
  | { type: 'fill-blank'; data: FillBlankQuestion }
  | { type: 'word-order'; data: WordOrderQuestion }
  | { type: 'match-pairs'; data: MatchPairQuestion }
  | { type: 'multiple-choice'; data: MultipleChoiceQuestion }
  | { type: 'sentence-build'; data: SentenceBuildQuestion };

export interface Exercise {
  id: string;
  title: string;
  titleAr?: string;
  instruction: string;
  instructionAr?: string;
  questions: ExerciseQuestion[];
}

// ─── Lesson & Unit ───

export interface Lesson {
  id: string;
  number: number;
  titleAr: string;
  titleEn: string;
  unitId: string;
  content: LessonContentBlock[];
  exercises: Exercise[];
  compose?: ComposeActivity;
}

export interface Unit {
  id: string;
  number: number;
  titleAr: string;
  titleEn: string;
  description: string;
  lessonIds: string[];
}

// ─── Compose Types ───

export interface ComposePrompt {
  promptEn: string;
  promptAr: string;
  targetLength: { min: number; max: number };
  hints: string[];
}

export interface WordBankCategory {
  categoryEn: string;
  categoryAr: string;
  words: VocabularyItem[];
}

export interface GrammarChecklistItem {
  id: string;
  labelEn: string;
  labelAr: string;
  examples: string[];
  required: boolean;
}

export interface RubricCriterion {
  id: string;
  nameEn: string;
  nameAr: string;
  description: string;
  levels: { score: 1 | 2 | 3 | 4; label: string; description: string }[];
}

export interface ComposeActivity {
  id: string;
  titleEn: string;
  titleAr: string;
  prompt: ComposePrompt;
  wordBank: WordBankCategory[];
  grammarChecklist: GrammarChecklistItem[];
  rubric: RubricCriterion[];
}

// ─── Fluency Types ───

export interface FluencyRound {
  durationSec: number;
  text: string;
  wordCount: number;
  wpm: number;
  elapsedSec: number;
}

export interface FluencySession {
  id: string;
  type: 'sprint' | 'speed-writing' | 'rewrite';
  lessonId: string;
  prompt: string;
  startedAt: number;
  completedAt: number;
  rounds: FluencyRound[];
  originalText?: string;
  overlapPercent?: number;
}

// ─── Progress ───

export interface ComposeDraft {
  text: string;
  grammarChecked: string[];
  selfAssessment: Record<string, number>;
  updatedAt: number;
}

export interface ProgressData {
  lessonsVisited: Record<string, number>;  // lessonId → timestamp
  exerciseScores: Record<string, { score: number; bestScore: number; completedAt: number }>;
  questionsMastered: Record<string, boolean>;
  lastViewed: { lessonId: string; timestamp: number } | null;
  streak: { count: number; lastDate: string | null };
  composeDrafts: Record<string, ComposeDraft>;
  composeCompleted: Record<string, number>;  // composeId → timestamp
  fluencySessions: FluencySession[];
}
