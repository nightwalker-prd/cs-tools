import { loadAllUnits } from '@arabtools/exercises/data';
import type { PlacementQuestion, Difficulty, QuestionPool } from '../types';
import { CATEGORIES } from './category-map';
import { convertFstuExercises } from './converters/fstu-converter';
import { convertTarkibExercises } from './converters/tarkib-converter';
import { convertVocabulary } from './converters/vocab-converter';
import { convertConjugation } from './converters/conjugation-converter';
import { convertTarjama } from './converters/tarjama-converter';

/**
 * Build the complete question pool from all 5 data sources.
 * This is async because FSTU exercises use dynamic imports.
 */
export async function buildQuestionPool(): Promise<QuestionPool> {
  // Load all data sources in parallel
  const [
    fstuUnits,
    { exercisesByType },
    vocabData,
    { arabicWords },
    { ALL_CARDS },
  ] = await Promise.all([
    loadAllUnits(),
    import('../../../tarkib-builder/src/data/exercises/index'),
    import('../../../nation-test/src/data/vocabulary'),
    import('../../../conjugation/src/data/arabicRoots'),
    import('../../../tarjama/src/data/cards/index'),
  ]);

  // Convert all sources
  const allQuestions: PlacementQuestion[] = [
    ...convertFstuExercises(fstuUnits),
    ...convertTarkibExercises(exercisesByType),
    ...convertVocabulary([
      ...vocabData.level1k,
      ...vocabData.level2k,
      ...vocabData.level3k,
      ...vocabData.level5k,
      ...vocabData.level10k,
    ]),
    ...convertConjugation(arabicWords),
    ...convertTarjama(ALL_CARDS),
  ];

  // Index by category + difficulty
  const byCategoryAndDifficulty = new Map<string, Map<Difficulty, PlacementQuestion[]>>();

  for (const q of allQuestions) {
    let catMap = byCategoryAndDifficulty.get(q.categoryId);
    if (!catMap) {
      catMap = new Map<Difficulty, PlacementQuestion[]>();
      byCategoryAndDifficulty.set(q.categoryId, catMap);
    }
    let diffList = catMap.get(q.difficulty);
    if (!diffList) {
      diffList = [];
      catMap.set(q.difficulty, diffList);
    }
    diffList.push(q);
  }

  // Only include categories that have questions
  const allCategories = CATEGORIES
    .map(c => c.id)
    .filter(id => byCategoryAndDifficulty.has(id));

  return { byCategoryAndDifficulty, allCategories };
}
