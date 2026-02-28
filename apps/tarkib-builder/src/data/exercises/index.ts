import { possessiveExercises } from './possessive';
import { descriptiveExercises } from './descriptive';
import { prepositionalExercises } from './prepositional';
import { nominalSentenceExercises } from './nominal-sentences';
import { verbalSentenceExercises } from './verbal-sentences';
import { demonstrativeExercises } from './demonstrative';
import { conjunctiveExercises } from './conjunctive';
import { appositiveExercises } from './appositive';
import { numberExercises } from './number';
import { kanaSentenceExercises } from './kana-sentences';
import { innaSentenceExercises } from './inna-sentences';
import { nestedExercises } from './nested';
import { halExercises } from './hal';
import { tamyizExercises } from './tamyiz';
import { mafulBihiExercises } from './maful-bihi';
import { naibFailExercises } from './naib-fail';
import { mafulMutlaqExercises } from './maful-mutlaq';
import { mafulLiAjlihiExercises } from './maful-li-ajlihi';
import { zarfExercises } from './zarf';
import { istithnaExercises } from './istithna';
import { nidaExercises } from './nida';
import { shartExercises } from './shart';
import { mawsulExercises } from './mawsul';
import type { TarkibExercise, PhraseType } from '../types';

/** All exercises indexed by phrase type */
export const exercisesByType: Record<PhraseType, TarkibExercise[]> = {
  possessive: possessiveExercises,
  descriptive: descriptiveExercises,
  prepositional: prepositionalExercises,
  demonstrative: demonstrativeExercises,
  conjunctive: conjunctiveExercises,
  appositive: appositiveExercises,
  number: numberExercises,
  'nominal-sentence': nominalSentenceExercises,
  'verbal-sentence': verbalSentenceExercises,
  'kana-sentence': kanaSentenceExercises,
  'inna-sentence': innaSentenceExercises,
  nested: nestedExercises,
  hal: halExercises,
  tamyiz: tamyizExercises,
  'maful-bihi': mafulBihiExercises,
  'naib-fail': naibFailExercises,
  'maful-mutlaq': mafulMutlaqExercises,
  'maful-li-ajlihi': mafulLiAjlihiExercises,
  zarf: zarfExercises,
  istithna: istithnaExercises,
  nida: nidaExercises,
  shart: shartExercises,
  mawsul: mawsulExercises,
};

/** All exercises as a flat array */
export const allExercises: TarkibExercise[] = Object.values(exercisesByType).flat();

/** Get exercises for a phrase type, optionally filtered by difficulty */
export function getExercises(
  phraseType: PhraseType,
  difficulty?: 'beginner' | 'intermediate' | 'advanced',
): TarkibExercise[] {
  const exercises = exercisesByType[phraseType] ?? [];
  if (!difficulty) return exercises;
  return exercises.filter(e => e.difficulty === difficulty);
}

/** Phrase types that have exercises available */
export function getAvailablePhraseTypes(): PhraseType[] {
  return (Object.entries(exercisesByType) as [PhraseType, TarkibExercise[]][])
    .filter(([, exercises]) => exercises.length > 0)
    .map(([type]) => type);
}
