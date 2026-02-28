import type { ExerciseUnit, ExerciseTag } from '@arabtools/exercises/types';
import type { PlacementQuestion, Difficulty } from '../../types';
import { pickDistractors, buildOptions } from '../distractor-gen';

/**
 * Map exercise tags to nahw category IDs.
 */
const TAG_TO_CATEGORY: Partial<Record<ExerciseTag, string>> = {
  'descriptive-phrase': 'na-t',
  'demonstrative-phrase': 'demonstrative-phrases',
  'possessive-phrase': 'mudaf-ilayhi',
  'conjunctive-phrase': 'atf',
  'verb-conjugation': 'sarf',
  'morphology': 'sarf',
  'pronouns': 'damir-marfu',
  'emphasis': 'tawkid',
  'relative-clause': 'ism-mawsul',
  'conditional': 'shart',
  'irab': 'noun-irab',
  'translation': 'vocabulary',
  'vocabulary': 'vocabulary',
};

/**
 * Default category by unit for tags that need unit-based fallback.
 */
const UNIT_FALLBACK_CATEGORY: Record<number, string> = {
  1: 'word-types',
  2: 'nominal-sentence',
  3: 'na-t',
  4: 'damir-marfu',
  5: 'jumla-sughra',
};

function unitToDifficulty(unit: number): Difficulty {
  if (unit <= 2) return 'beginner';
  if (unit <= 3) return 'intermediate';
  return 'advanced';
}

function getCategoryForTag(tag: ExerciseTag, unitNumber: number): string {
  const mapped = TAG_TO_CATEGORY[tag];
  if (mapped) return mapped;
  return UNIT_FALLBACK_CATEGORY[unitNumber] ?? 'word-types';
}

function getCategoryType(categoryId: string): 'nahw' | 'sarf' | 'vocabulary' {
  if (categoryId === 'sarf') return 'sarf';
  if (categoryId === 'vocabulary') return 'vocabulary';
  return 'nahw';
}

/**
 * Convert FSTU exercise units into placement questions.
 * Creates MC questions from the exercise Q&A pairs by using
 * other answers from the same exercise as distractors.
 */
export function convertFstuExercises(units: ExerciseUnit[]): PlacementQuestion[] {
  const questions: PlacementQuestion[] = [];

  for (const unit of units) {
    const difficulty = unitToDifficulty(unit.unit);

    for (const section of unit.sections) {
      for (const exercise of section.exercises) {
        if (exercise.questions.length < 4) continue;

        const answerPool = exercise.questions.map(q => q.answer);
        const primaryTag = exercise.tags[0];
        if (!primaryTag) continue;

        const categoryId = getCategoryForTag(primaryTag, unit.unit);

        for (const q of exercise.questions) {
          const distractors = pickDistractors(answerPool, q.answer, 3);
          if (distractors.length < 3) continue;

          const { options, correctIndex } = buildOptions(q.answer, distractors);

          questions.push({
            id: `fstu-${q.id}`,
            categoryId,
            categoryType: getCategoryType(categoryId),
            difficulty,
            prompt: q.question,
            options,
            correctIndex,
            source: 'fstu-exercises',
            sourceId: q.id,
          });
        }
      }
    }
  }

  return questions;
}
