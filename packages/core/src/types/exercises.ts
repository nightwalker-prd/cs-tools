/**
 * Exercise Type Definitions
 *
 * Shared types for Tarkeeb (syntax) and Sarf (morphology) exercises.
 */

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type VerbForm = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'X';

export type SarfCategory =
  | 'verb'
  | 'noun'
  | 'active-participle'
  | 'passive-participle'
  | 'masdar'
  | 'adjective';

/**
 * Tarkeeb (Syntax) Exercise
 */
export interface TarkeebExercise {
  id: number;
  unit: string;
  section: string;
  arabic: string;
  translation: string;
  vocabulary?: string;
  difficulty: Difficulty;
}

/**
 * Tarkeeb Analysis - teacher's solution for an exercise
 */
export interface TarkeebAnalysis {
  id: number;
  exerciseId: number;
  unit: string;
  section: string;
  arabic: string;
  translation: string;
  analysis: string;
  difficulty: string;
}

/**
 * Sarf (Morphology) Exercise
 */
export interface SarfExercise {
  id: number;
  word: string;
  transliteration: string;
  category: SarfCategory;
  root: string;
  pattern: string;
  patternTranslit?: string;
  verbForm?: VerbForm;
  meaning: string;
  usage: string;
  prepositions?: string[];
  exampleSentence: string;
  exampleTranslation: string;
  difficulty: Difficulty;
  unit?: string;
  rootType?: string;
  notes?: string;
}

/**
 * Sarf Analysis - teacher's solution for an exercise
 */
export interface SarfAnalysis {
  id: number;
  word: string;
  transliteration: string;
  root: string;
  pattern: string;
  patternTranslit?: string;
  verbForm?: string;
  category: string;
  meaning: string;
  usage: string;
  exampleSentence: string;
  exampleTranslation: string;
  difficulty: string;
  notes?: string;
}

/**
 * Filter options for Tarkeeb exercises
 */
export interface TarkeebFilters {
  difficulty?: Difficulty;
  unit?: string;
  section?: string;
}

/**
 * Filter options for Sarf exercises
 */
export interface SarfFilters {
  difficulty?: Difficulty;
  category?: SarfCategory;
  unit?: string;
  verbForm?: VerbForm;
  rootType?: string;
}
