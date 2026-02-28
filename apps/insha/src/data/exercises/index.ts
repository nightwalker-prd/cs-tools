import type { InshaExercise, ExerciseFilters, ExerciseMode } from '../types';
import { SENTENCE_COMPLETION_EXERCISES } from './sentence-completion';
import { SENTENCE_TRANSFORMATION_EXERCISES } from './sentence-transformation';
import { SENTENCE_TRANSLATION_EXERCISES } from './sentence-translation';
import { PARAGRAPH_ASSEMBLY_EXERCISES, PARAGRAPH_TRANSLATION_EXERCISES } from './paragraph-exercises';

/** All exercises in the app, 366 total */
export const ALL_EXERCISES: InshaExercise[] = [
  ...SENTENCE_COMPLETION_EXERCISES,
  ...SENTENCE_TRANSFORMATION_EXERCISES,
  ...SENTENCE_TRANSLATION_EXERCISES,
  ...PARAGRAPH_ASSEMBLY_EXERCISES,
  ...PARAGRAPH_TRANSLATION_EXERCISES,
];

/** Filter exercises by mode, difficulty, and nahw topic */
export function getFilteredExercises(filters: Partial<ExerciseFilters>): InshaExercise[] {
  let result = ALL_EXERCISES;

  if (filters.mode && filters.mode !== 'all') {
    result = result.filter(e => e.mode === filters.mode);
  }

  if (filters.difficulty && filters.difficulty !== 'all') {
    result = result.filter(e => e.difficulty === filters.difficulty);
  }

  if (filters.nahwTopic && filters.nahwTopic !== 'all') {
    result = result.filter(e => e.nahwTopics.includes(filters.nahwTopic!));
  }

  return result;
}

/** Get a single exercise by ID */
export function getExerciseById(id: string): InshaExercise | undefined {
  return ALL_EXERCISES.find(e => e.id === id);
}

/** Get exercise count by mode */
export function getExerciseCountByMode(): Record<ExerciseMode, number> {
  return {
    'sentence-completion': SENTENCE_COMPLETION_EXERCISES.length,
    'sentence-transformation': SENTENCE_TRANSFORMATION_EXERCISES.length,
    'sentence-translation': SENTENCE_TRANSLATION_EXERCISES.length,
    'paragraph-assembly': PARAGRAPH_ASSEMBLY_EXERCISES.length,
    'paragraph-translation': PARAGRAPH_TRANSLATION_EXERCISES.length,
  };
}
