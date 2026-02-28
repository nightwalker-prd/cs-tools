/**
 * Tarkeeb Exercises - Combined Export
 * Imports from split files and exports combined array
 */

export type { TarkeebExercise } from './types';

import { exercises as basicExercises } from './basic';
import { exercises as intermediateExercises } from './intermediate';
import { exercises as advanced1Exercises } from './advanced-1';
import { exercises as advanced2Exercises } from './advanced-2';
import { exercises as advanced3Exercises } from './advanced-3';
import { exercises as advanced4Exercises } from './advanced-4';

export const tarkeebExercises = [
  ...basicExercises,
  ...intermediateExercises,
  ...advanced1Exercises,
  ...advanced2Exercises,
  ...advanced3Exercises,
  ...advanced4Exercises,
];
