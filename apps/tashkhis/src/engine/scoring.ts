import type {
  EngineState,
  PlacementResult,
  UnitScorecard,
  CategoryScore,
  Difficulty,
} from '../types';
import { CATEGORIES, UNIT_TITLES } from '../data/category-map';

/**
 * Compute the final placement result from the engine state.
 */
export function computeResult(state: EngineState): PlacementResult {
  const duration = Date.now() - state.startedAt;
  const totalCorrect = state.categories.reduce((sum, c) => sum + c.questionsCorrect, 0);
  const totalQuestions = state.questionsAnswered;
  const overallPercentage = totalQuestions > 0
    ? Math.round((totalCorrect / totalQuestions) * 100)
    : 0;

  // Group categories by unit
  const unitGroups = new Map<number, CategoryScore[]>();

  for (const cat of state.categories) {
    const def = CATEGORIES.find(c => c.id === cat.categoryId);
    if (!def) continue;

    const percentage = cat.questionsAsked > 0
      ? Math.round((cat.questionsCorrect / cat.questionsAsked) * 100)
      : 0;

    const score: CategoryScore = {
      categoryId: cat.categoryId,
      label: def.label,
      labelAr: def.labelAr,
      theta: cat.theta,
      questionsAsked: cat.questionsAsked,
      questionsCorrect: cat.questionsCorrect,
      percentage,
      proficiencyLevel: thetaToLevel(cat.theta),
    };

    const unit = def.unit;
    const group = unitGroups.get(unit) ?? [];
    group.push(score);
    unitGroups.set(unit, group);
  }

  // Build scorecards (units 1-8)
  const scorecards: UnitScorecard[] = [];
  for (let unit = 1; unit <= 8; unit++) {
    const categories = unitGroups.get(unit);
    if (!categories || categories.length === 0) continue;

    const totalAsked = categories.reduce((s, c) => s + c.questionsAsked, 0);
    const totalCor = categories.reduce((s, c) => s + c.questionsCorrect, 0);
    const unitPct = totalAsked > 0 ? Math.round((totalCor / totalAsked) * 100) : 0;
    const avgTheta = categories.reduce((s, c) => s + c.theta, 0) / categories.length;

    const titles = UNIT_TITLES[unit] ?? { en: `Unit ${unit}`, ar: `الوحدة ${unit}` };

    scorecards.push({
      unitNumber: unit,
      unitTitle: titles.en,
      unitTitleAr: titles.ar,
      overallPercentage: unitPct,
      proficiencyLevel: thetaToLevel(avgTheta),
      categories,
    });
  }

  return {
    id: `result-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    completedAt: Date.now(),
    duration,
    totalQuestions,
    totalCorrect,
    overallPercentage,
    scorecards,
  };
}

function thetaToLevel(theta: number): Difficulty {
  if (theta < 0.33) return 'beginner';
  if (theta < 0.66) return 'intermediate';
  return 'advanced';
}
