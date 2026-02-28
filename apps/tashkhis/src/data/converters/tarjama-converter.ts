import type { PlacementQuestion } from '../../types';
import { CATEGORY_MAP } from '../category-map';
import { pickDistractors, buildOptions } from '../distractor-gen';

/** Minimal type mirroring tarjama TranslationCard */
interface TranslationCard {
  id: string;
  english: string;
  modelArabic: string;
  nahwTopics: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

/**
 * Convert translation cards into placement questions.
 * Format: "Which nahw concept is demonstrated in: [modelArabic]?"
 */
export function convertTarjama(cards: TranslationCard[]): PlacementQuestion[] {
  const questions: PlacementQuestion[] = [];

  // Build label pool from all known categories
  const allLabels = Array.from(CATEGORY_MAP.values())
    .filter(c => c.type === 'nahw')
    .map(c => c.label);

  for (const card of cards) {
    if (card.nahwTopics.length === 0) continue;

    const primaryTopicId = card.nahwTopics[0];
    const categoryDef = CATEGORY_MAP.get(primaryTopicId);
    if (!categoryDef) continue;

    const correctLabel = categoryDef.label;
    const distractors = pickDistractors(allLabels, correctLabel, 3);
    if (distractors.length < 3) continue;

    const { options, correctIndex } = buildOptions(correctLabel, distractors);

    questions.push({
      id: `tarjama-${card.id}`,
      categoryId: primaryTopicId,
      categoryType: 'nahw',
      difficulty: card.difficulty,
      prompt: 'Which nahw concept is demonstrated here?',
      arabicText: card.modelArabic,
      options,
      correctIndex,
      source: 'tarjama',
      sourceId: card.id,
    });
  }

  return questions;
}
