/**
 * FSTU Exercise Type Definitions
 *
 * Shared types for the FSTU Arabic curriculum exercises.
 * These exercises cover 5 units with 838 exercises and 11,789 questions.
 */

export interface ExerciseQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  questions: ExerciseQuestion[];
  tags: ExerciseTag[];
}

export type ExerciseTag =
  | 'translation'
  | 'fill-blank'
  | 'grammar-analysis'
  | 'descriptive-phrase'
  | 'demonstrative-phrase'
  | 'possessive-phrase'
  | 'conjunctive-phrase'
  | 'verb-conjugation'
  | 'pronouns'
  | 'emphasis'
  | 'relative-clause'
  | 'conditional'
  | 'irab'
  | 'morphology'
  | 'vocabulary';

export const TAG_LABELS: Record<ExerciseTag, string> = {
  'translation': 'Translation',
  'fill-blank': 'Fill in Blank',
  'grammar-analysis': 'Grammar',
  'verb-conjugation': 'Conjugation',
  'pronouns': 'Pronouns',
  'emphasis': 'Emphasis',
  'descriptive-phrase': 'Descriptive',
  'demonstrative-phrase': 'Demonstrative',
  'possessive-phrase': 'Possessive',
  'conjunctive-phrase': 'Conjunctive',
  'relative-clause': 'Relative Clause',
  'conditional': 'Conditional',
  'irab': "I'rab",
  'morphology': 'Morphology',
  'vocabulary': 'Vocabulary',
};

export interface ExerciseSection {
  id: string;
  title: string;
  bookPages: { start: number; end: number };
  exercises: Exercise[];
}

export interface ExerciseUnit {
  unit: number;
  title: string;
  sections: ExerciseSection[];
}

export interface UnitMeta {
  unit: number;
  title: string;
  sectionCount: number;
  exerciseCount: number;
  questionCount: number;
}
