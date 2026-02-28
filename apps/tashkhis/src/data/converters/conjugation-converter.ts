import type { PlacementQuestion, Difficulty } from '../../types';
import { pickDistractors, buildOptions } from '../distractor-gen';

/** Minimal type mirroring conjugation ArabicWord */
interface ArabicWord {
  root: string;
  pastTense: string;
  presentTense: string;
  verbForm?: string;
  meaning?: string;
  difficulty?: Difficulty;
}

/**
 * Convert conjugation data into placement questions.
 * Three formats:
 * 1. "What is the verb form of [pastTense]?" (if verbForm exists)
 * 2. "What is the present tense of [pastTense]?"
 * 3. "What does [pastTense] mean?" (if meaning exists)
 */
export function convertConjugation(words: ArabicWord[]): PlacementQuestion[] {
  const questions: PlacementQuestion[] = [];

  const allPresentTenses = words.map(w => w.presentTense);
  const allForms = words.map(w => w.verbForm).filter((f): f is string => !!f);
  const allMeanings = words.map(w => w.meaning).filter((m): m is string => !!m);

  for (const w of words) {
    const difficulty = w.difficulty ?? 'intermediate';

    // Format 1: Identify verb form
    if (w.verbForm && allForms.length >= 4) {
      const distractors = pickDistractors(allForms, w.verbForm, 3);
      if (distractors.length >= 3) {
        const { options, correctIndex } = buildOptions(w.verbForm, distractors);
        questions.push({
          id: `conj-form-${w.root.replace(/\s/g, '')}`,
          categoryId: 'sarf',
          categoryType: 'sarf',
          difficulty,
          prompt: 'What is the verb form?',
          arabicText: w.pastTense,
          options,
          correctIndex,
          source: 'conjugation',
          sourceId: w.root,
        });
      }
    }

    // Format 2: Present tense
    if (allPresentTenses.length >= 4) {
      const distractors = pickDistractors(allPresentTenses, w.presentTense, 3);
      if (distractors.length >= 3) {
        const { options, correctIndex } = buildOptions(w.presentTense, distractors);
        questions.push({
          id: `conj-present-${w.root.replace(/\s/g, '')}`,
          categoryId: 'sarf',
          categoryType: 'sarf',
          difficulty,
          prompt: 'What is the present tense?',
          arabicText: w.pastTense,
          options,
          correctIndex,
          source: 'conjugation',
          sourceId: w.root,
        });
      }
    }

    // Format 3: Meaning
    if (w.meaning && allMeanings.length >= 4) {
      const distractors = pickDistractors(allMeanings, w.meaning, 3);
      if (distractors.length >= 3) {
        const { options, correctIndex } = buildOptions(w.meaning, distractors);
        questions.push({
          id: `conj-meaning-${w.root.replace(/\s/g, '')}`,
          categoryId: 'sarf',
          categoryType: 'sarf',
          difficulty,
          prompt: 'What does this verb mean?',
          arabicText: w.pastTense,
          options,
          correctIndex,
          source: 'conjugation',
          sourceId: w.root,
        });
      }
    }
  }

  return questions;
}
