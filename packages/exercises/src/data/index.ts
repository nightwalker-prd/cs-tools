import type { ExerciseUnit } from '../types';

export { UNIT_INDEX } from './unit-index';
export { UNIT_MAPPING, getUnitForPages } from './unit-mapping';

const unitLoaders: Record<number, () => Promise<{ default: ExerciseUnit }>> = {
  1: () => import('./unit-1'),
  2: () => import('./unit-2'),
  3: () => import('./unit-3'),
  4: () => import('./unit-4'),
  5: () => import('./unit-5'),
};

export async function loadUnit(unit: number): Promise<ExerciseUnit> {
  const loader = unitLoaders[unit];
  if (!loader) throw new Error(`Unknown unit: ${unit}`);
  const mod = await loader();
  return mod.default;
}

/**
 * Load all units at once.
 * Useful for apps that need to search/filter across the full exercise set.
 */
export async function loadAllUnits(): Promise<ExerciseUnit[]> {
  const units = await Promise.all([
    loadUnit(1),
    loadUnit(2),
    loadUnit(3),
    loadUnit(4),
    loadUnit(5),
  ]);
  return units;
}

/**
 * Load all exercises matching the given tags.
 * Returns a flat array of exercises with their unit/section context.
 */
export async function loadExercisesByTag(
  tags: string[],
): Promise<
  Array<{
    unitNumber: number;
    unitTitle: string;
    sectionId: string;
    sectionTitle: string;
    exercise: import('../types').Exercise;
  }>
> {
  const units = await loadAllUnits();
  const results: Array<{
    unitNumber: number;
    unitTitle: string;
    sectionId: string;
    sectionTitle: string;
    exercise: import('../types').Exercise;
  }> = [];

  for (const unit of units) {
    for (const section of unit.sections) {
      for (const exercise of section.exercises) {
        if (exercise.tags.some((t) => tags.includes(t))) {
          results.push({
            unitNumber: unit.unit,
            unitTitle: unit.title,
            sectionId: section.id,
            sectionTitle: section.title,
            exercise,
          });
        }
      }
    }
  }

  return results;
}
