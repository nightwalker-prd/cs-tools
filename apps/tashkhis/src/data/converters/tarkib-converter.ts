import type { PlacementQuestion, Difficulty } from '../../types';
import { pickDistractors, buildOptions } from '../distractor-gen';

/** Minimal types mirroring tarkib-builder to avoid cross-app imports */
interface TarkibExercise {
  id: string;
  phraseType: string;
  difficulty: Difficulty;
  targetPhrase: string;
  targetTranslation: string;
  wordBank: Array<{
    id: string;
    word: string;
    translation: string;
    isDistractor?: boolean;
  }>;
  slots: Array<{
    id: string;
    labelEn: string;
    expectedWordId: string;
  }>;
}

/**
 * Map tarkib phraseType -> nahw category ID.
 */
const PHRASE_TO_CATEGORY: Record<string, string> = {
  possessive: 'mudaf-ilayhi',
  descriptive: 'na-t',
  prepositional: 'prepositions',
  demonstrative: 'demonstrative-phrases',
  conjunctive: 'atf',
  appositive: 'badal',
  number: 'number-phrases',
  'nominal-sentence': 'nominal-sentence',
  'verbal-sentence': 'verbal-sentence',
  'kana-sentence': 'kana-and-sisters',
  'inna-sentence': 'inna-and-sisters',
  nested: 'jumla-sughra',
  hal: 'hal',
  tamyiz: 'tamyiz',
  'maful-bihi': 'maf-ul-bih',
  'naib-fail': 'naib-al-fail',
  'maful-mutlaq': 'maf-ul-mutlaq',
  'maful-li-ajlihi': 'maf-ul-lahu',
  zarf: 'maf-ul-fihi',
  istithna: 'mustathna',
  nida: 'nida',
  shart: 'shart',
  mawsul: 'ism-mawsul',
};

const ALL_PHRASE_LABELS: Record<string, string> = {
  possessive: 'Possessive (Idafa)',
  descriptive: "Descriptive (Na't)",
  prepositional: 'Prepositional',
  demonstrative: 'Demonstrative',
  conjunctive: 'Conjunctive',
  appositive: 'Appositive',
  number: 'Number',
  'nominal-sentence': 'Nominal Sentence',
  'verbal-sentence': 'Verbal Sentence',
  'kana-sentence': 'Kana & Sisters',
  'inna-sentence': 'Inna & Sisters',
  nested: 'Nested Phrases',
  hal: 'Hal (Adverbial State)',
  tamyiz: 'Tamyiz (Specification)',
  'maful-bihi': "Maf'ul bihi (Direct Object)",
  'naib-fail': "Na'ib al-Fa'il (Passive Subject)",
  'maful-mutlaq': "Maf'ul Mutlaq (Absolute Object)",
  'maful-li-ajlihi': "Maf'ul li-Ajlihi (Object of Purpose)",
  zarf: 'Zarf (Adverb of Time/Place)',
  istithna: 'Istithna (Exception)',
  nida: 'Nida (Vocative)',
  shart: 'Shart (Conditional)',
  mawsul: 'Mawsul (Relative)',
};

/**
 * Convert tarkib-builder exercises into placement questions.
 * Two question formats:
 * 1. "What grammatical construction is: [targetPhrase]?"
 * 2. "What is the [slot.labelEn] in: [targetPhrase]?"
 */
export function convertTarkibExercises(
  exercisesByType: Record<string, TarkibExercise[]>,
): PlacementQuestion[] {
  const questions: PlacementQuestion[] = [];
  const allPhraseLabels = Object.values(ALL_PHRASE_LABELS);

  for (const [phraseType, exercises] of Object.entries(exercisesByType)) {
    const categoryId = PHRASE_TO_CATEGORY[phraseType];
    if (!categoryId) continue;

    const correctLabel = ALL_PHRASE_LABELS[phraseType];
    if (!correctLabel) continue;

    for (const ex of exercises) {
      // Format 1: Identify the construction type
      const distractors1 = pickDistractors(allPhraseLabels, correctLabel, 3);
      if (distractors1.length >= 3) {
        const { options, correctIndex } = buildOptions(correctLabel, distractors1);
        questions.push({
          id: `tarkib-type-${ex.id}`,
          categoryId,
          categoryType: 'nahw',
          difficulty: ex.difficulty,
          prompt: 'What grammatical construction is this?',
          arabicText: ex.targetPhrase,
          options,
          correctIndex,
          source: 'tarkib-builder',
          sourceId: ex.id,
        });
      }

      // Format 2: Identify a slot's word
      const nonDistractorWords = ex.wordBank.filter(w => !w.isDistractor);
      const allWords = ex.wordBank.map(w => w.word);

      for (const slot of ex.slots.slice(0, 1)) { // Limit to first slot per exercise
        const expectedWord = nonDistractorWords.find(w => w.id === slot.expectedWordId);
        if (!expectedWord) continue;

        const distractors2 = pickDistractors(allWords, expectedWord.word, 3);
        if (distractors2.length < 3) continue;

        const { options, correctIndex } = buildOptions(expectedWord.word, distractors2);
        questions.push({
          id: `tarkib-slot-${ex.id}-${slot.id}`,
          categoryId,
          categoryType: 'nahw',
          difficulty: ex.difficulty,
          prompt: `What is the ${slot.labelEn} in this phrase?`,
          arabicText: ex.targetPhrase,
          options,
          correctIndex,
          source: 'tarkib-builder',
          sourceId: ex.id,
        });
      }
    }
  }

  return questions;
}
