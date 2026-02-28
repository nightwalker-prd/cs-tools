/**
 * Insha — Guided Sentence & Paragraph Builder types.
 *
 * Five exercise modes progressing from constrained sentences to
 * paragraph assembly, bridging tarkib-builder and insha-guide.
 */

export type ExerciseMode =
  | 'sentence-completion'
  | 'sentence-transformation'
  | 'sentence-translation'
  | 'paragraph-assembly'
  | 'paragraph-translation';

export type TransformType =
  | 'kana'
  | 'inna'
  | 'passive'
  | 'negative'
  | 'question'
  | 'join';

export interface RubricCriterion {
  id: string;
  nameEn: string;
  nameAr: string;
  description: string;
  levels: { score: 1 | 2 | 3 | 4; label: string; description: string }[];
}

export interface ScrambledSentence {
  arabic: string;
  translation: string;
  position: number;
}

export interface Connector {
  arabic: string;
  translation: string;
  expectedPosition: number;
}

export interface InshaExercise {
  /** Unique exercise identifier */
  id: string;
  /** Which of the 5 modes this exercise belongs to */
  mode: ExerciseMode;
  /** Difficulty tier */
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  /** Nahw topic IDs from the 43-topic prerequisite graph */
  nahwTopics: string[];

  // ── Common fields ──
  /** Model answer with diacritics */
  modelAnswer: string;
  /** Model answer without diacritics */
  modelAnswerClean: string;
  /** Grammar explanation in English */
  grammarNotes: string;
  /** Grammar explanation in Arabic */
  grammarNotesAr: string;

  // ── Mode-specific fields ──

  /** English prompt (translation modes) */
  prompt?: string;

  /** Arabic sentence with ___ blank (completion mode) */
  sentenceTemplate?: string;
  /** Constrained answer choices (completion mode) */
  options?: string[];

  /** Original Arabic sentence to transform (transformation mode) */
  sourceArabic?: string;
  /** Type of transformation required */
  transformType?: TransformType;

  /** Scrambled sentences for assembly (paragraph-assembly mode) */
  sentences?: ScrambledSentence[];
  /** Connectors to insert between sentences */
  connectors?: Connector[];

  /** Scoring rubric (paragraph modes) */
  rubric?: RubricCriterion[];
}

/** Filters for browsing exercises */
export interface ExerciseFilters {
  mode: ExerciseMode | 'all';
  difficulty: 'all' | 'beginner' | 'intermediate' | 'advanced';
  nahwTopic: string | 'all';
}

/** App-level view state */
export type AppView = 'dashboard' | 'exercise' | 'browse';

/** Persisted app settings */
export interface InshaSettings {
  showGrammarNotes: boolean;
  autoPlayTts: boolean;
  filters: ExerciseFilters;
}

export const DEFAULT_SETTINGS: InshaSettings = {
  showGrammarNotes: true,
  autoPlayTts: false,
  filters: {
    mode: 'all',
    difficulty: 'all',
    nahwTopic: 'all',
  },
};
