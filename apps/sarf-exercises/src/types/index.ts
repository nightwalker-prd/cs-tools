import type { ArabicWord } from '@arabtools/conjugation/src/data/arabicRoots';
import type { Seegah } from '@arabtools/conjugation/src/data/siyagh';

export type ExerciseType = 'conjugation' | 'translation' | 'labeling';
export type AnswerMode = 'mc' | 'text';
export type TranslationDirection = 'ar-to-en' | 'en-to-ar';

export interface SessionConfig {
  unitIds: string[];
  exerciseTypes: ExerciseType[];
  categories: string[];
  answerMode: AnswerMode;
  translationDirection: TranslationDirection;
  sessionSize: number;
  srsEnabled: boolean;
}

export interface ExerciseItem {
  id: string;
  type: ExerciseType;
  verb: ArabicWord;
  seegah: Seegah;
  correctAnswer: string;
  prompt: ExercisePrompt;
  distractors?: string[];
}

export interface ExercisePrompt {
  /** Main display text (Arabic verb form, conjugated form, or English meaning) */
  primary: string;
  /** Root letters */
  root: string;
  /** Verb meaning */
  meaning: string;
  /** Seegah label in Arabic */
  seegahLabel: string;
  /** Seegah English description */
  seegahEn: string;
  /** Direction hint for translation exercises */
  direction?: TranslationDirection;
}

export interface AnswerResult {
  isCorrect: boolean;
  /** 'exact' = perfect match, 'normalized' = matched after diacritics removal, 'partial' = close */
  matchLevel: 'exact' | 'normalized' | 'partial' | 'wrong';
  userAnswer: string;
  correctAnswer: string;
  timeMs: number;
}

export interface SessionState {
  config: SessionConfig;
  exercises: ExerciseItem[];
  currentIndex: number;
  answers: AnswerResult[];
  startTime: number;
}

export interface SessionResults {
  config: SessionConfig;
  answers: AnswerResult[];
  exercises: ExerciseItem[];
  totalTime: number;
  score: number;
  totalQuestions: number;
  byType: Record<ExerciseType, { correct: number; total: number }>;
  byCategory: Record<string, { correct: number; total: number }>;
}

export type { ArabicWord, Seegah };
