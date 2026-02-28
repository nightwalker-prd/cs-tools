import { shuffle } from '@arabtools/core';
import { verbs } from '../data';
import type { DrillConfig, DrillQuestion, VerbDerivativeEntry, DerivativeType } from '../types';

/**
 * Generate a randomized drill based on the user's configuration.
 */
export function generateDrill(config: DrillConfig): DrillQuestion[] {
  // Filter verbs by selected forms, root types, and difficulty
  let pool = verbs.filter(v => {
    if (!config.selectedForms.includes(v.verbForm)) return false;
    if (!config.selectedRootTypes.includes(v.rootType)) return false;
    if (config.difficulty === 'beginner' && v.difficulty === 'advanced') return false;
    return true;
  });

  // Build question candidates: one per verb per derivative type
  const candidates: DrillQuestion[] = [];

  for (const verb of pool) {
    for (const dt of config.derivativeTypes) {
      // Skip ism maf'ul for forms with no passive
      if (dt === 'ism-maful' && !verb.hasPassive) continue;
      candidates.push({ verb, questionType: dt });
    }
  }

  // Shuffle and take drillSize questions
  const shuffled = shuffle(candidates);
  return shuffled.slice(0, config.drillSize);
}

/**
 * Get the correct answer for a drill question.
 */
export function getCorrectAnswer(verb: VerbDerivativeEntry, questionType: DerivativeType): string {
  switch (questionType) {
    case 'masdar':
      return verb.masdar;
    case 'ism-fail':
      return verb.ismFail;
    case 'ism-maful':
      return verb.ismMaful;
  }
}

/**
 * Get the pattern for a drill question answer.
 */
export function getAnswerPattern(verb: VerbDerivativeEntry, questionType: DerivativeType): string {
  switch (questionType) {
    case 'masdar':
      return verb.masdarPattern;
    case 'ism-fail':
      return verb.ismFailPattern;
    case 'ism-maful':
      return verb.ismMafulPattern;
  }
}
