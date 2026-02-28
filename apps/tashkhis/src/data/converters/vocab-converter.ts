import type { PlacementQuestion, Difficulty } from '../../types';
import { pickDistractors, buildOptions } from '../distractor-gen';

/** Minimal type mirroring nation-test WordFamily */
interface WordFamily {
  id: string;
  headwordVocalized: string;
  meanings: string[];
  level: string;
}

function levelToDifficulty(level: string): Difficulty {
  if (level === '1k' || level === '2k') return 'beginner';
  if (level === '3k' || level === '5k') return 'intermediate';
  return 'advanced';
}

/**
 * Convert vocabulary word families into placement questions.
 * Format: "What does [headwordVocalized] mean?" with MC options.
 */
export function convertVocabulary(words: WordFamily[]): PlacementQuestion[] {
  const questions: PlacementQuestion[] = [];

  // Group by level for same-level distractors
  const byLevel = new Map<string, WordFamily[]>();
  for (const w of words) {
    const group = byLevel.get(w.level) ?? [];
    group.push(w);
    byLevel.set(w.level, group);
  }

  const allMeanings = words.map(w => w.meanings[0]).filter(Boolean);

  for (const w of words) {
    if (!w.meanings[0]) continue;

    // Prefer same-level distractors, fall back to all
    const levelGroup = byLevel.get(w.level) ?? [];
    const levelMeanings = levelGroup.map(x => x.meanings[0]).filter(Boolean);
    const pool = levelMeanings.length >= 4 ? levelMeanings : allMeanings;

    const distractors = pickDistractors(pool, w.meanings[0], 3);
    if (distractors.length < 3) continue;

    const { options, correctIndex } = buildOptions(w.meanings[0], distractors);

    questions.push({
      id: `vocab-${w.id}`,
      categoryId: 'vocabulary',
      categoryType: 'vocabulary',
      difficulty: levelToDifficulty(w.level),
      prompt: 'What does this word mean?',
      arabicText: w.headwordVocalized,
      options,
      correctIndex,
      source: 'vocabulary',
      sourceId: w.id,
    });
  }

  return questions;
}
