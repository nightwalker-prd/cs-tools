export { sortingExercises } from './sorting-exercises';
export { complexityExercises } from './complexity-exercises';
export { dsExercises } from './ds-exercises';

import { sortingExercises } from './sorting-exercises';
import { complexityExercises } from './complexity-exercises';
import { dsExercises } from './ds-exercises';
import type { ExerciseSet } from '../types';

export const allExerciseSets: ExerciseSet[] = [
  sortingExercises,
  complexityExercises,
  dsExercises,
];
