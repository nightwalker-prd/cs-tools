/**
 * Test Item Generation Utilities
 *
 * Generates test items following Paul Nation's testing principles:
 * - Items should be sampled from different frequency levels
 * - Distractors should be plausible but clearly wrong
 * - Each item should test knowledge of a single word family
 *
 * All data modules are dynamically imported for code-splitting.
 * Vite splits each into a separate chunk loaded on demand.
 */

import type {
  FrequencyLevel,
  MultipleChoiceItem,
  YesNoItem,
  ProductiveItem,
  TestConfig,
  WordFamily,
} from '../types';
import type { SentenceTestItem, SentenceType } from './sentences';
import type {
  SentenceProductionItem,
  SentenceDifficulty,
} from './sentenceProduction';
import type { CollocationItem, CollocationType } from './collocations';
import type { RootPatternItem } from './rootPatterns';
import type {
  TranslationItem,
  TranslationDirection,
} from './translations';
import type {
  ReadingComprehensionItem,
  PassageTopic,
} from './readingComprehension';
import type {
  VerbConjugationItem,
  VerbTense,
  VerbForm,
} from './verbConjugation';
import type { ClozeItem, ClozeType } from './clozeTest';
import type { DiacriticsItem } from './diacriticsTest';
import type { IrabItem, GrammaticalRole } from './irabTest';
import type {
  WordDerivationItem,
  DerivationType,
} from './wordDerivation';
import type {
  MorphologicalAnalysisItem,
  MorphComponent,
} from './morphologicalAnalysis';
import type { VerbFormIdItem, ArabicVerbForm } from './verbFormId';
import type { VerbType } from './verbTypes';
import type {
  IdiomaticExpressionItem,
  IdiomCategory,
} from './idiomaticExpressions';
import type { WordFamilyItem } from './wordFamily';
import type {
  QuranicVocabularyItem,
  QuranicCategory,
} from './quranicVocabulary';
import type {
  SynonymsAntonymsItem,
  RelationType,
} from './synonymsAntonyms';
import type { NegationItem, NegationParticle } from './negationPatterns';
import type { PrepositionItem, ArabicPreposition } from './prepositionUsage';
import type { QuestionWordItem, QuestionWord } from './questionWords';
import type { RelativeClauseItem, RelativePronoun } from './relativeClauses';
import type { SpellingItem, SpellingRule } from './spellingOrthography';
import type { DemonstrativeItem, Demonstrative } from './demonstratives';
import type { PossessiveItem, PossessivePronoun } from './possessivePronouns';
import type { QuranicFrequencyTier } from '../types';
import type { QuranicVstItem } from './quranicVst';
import type { AyahContextItem } from './ayahContext';
import type { MorphChainItem } from './morphChain';
import type { GrammarTagItem } from './grammarTag';
import type { GrammarDifficulty, ChainLength } from '../components/test-config/constants';
import { shuffle } from '@arabtools/core';

/**
 * Get random items from array
 */
function pickRandom<T>(array: T[], count: number): T[] {
  if (count > array.length) {
    console.warn(
      `[nation-test] pickRandom: requested ${count} items but only ${array.length} available. Returning all.`
    );
  }
  return shuffle(array).slice(0, count);
}

/**
 * Generate distractors for a multiple choice item
 * Distractors are wrong answers that are plausible
 */
function generateDistractors(
  correctWord: WordFamily,
  allWords: WordFamily[],
  count: number = 3
): string[] {
  // Get words that are NOT the correct answer and have different meanings
  const potentialDistractors = allWords.filter(
    (w) =>
      w.id !== correctWord.id &&
      !correctWord.meanings.some((m) =>
        w.meanings.some((wm) => wm.toLowerCase().includes(m.toLowerCase()))
      )
  );

  // Prefer distractors from the same part of speech for better quality
  const samePOS = potentialDistractors.filter(
    (w) => w.partOfSpeech === correctWord.partOfSpeech
  );

  const pool = samePOS.length >= count ? samePOS : potentialDistractors;
  const selected = pickRandom(pool, count);

  return selected.map((w) => w.meanings[0]);
}

/**
 * Generate Multiple Choice Items for VST/VLT
 */
export async function generateMultipleChoiceItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number
): Promise<MultipleChoiceItem[]> {
  const { vocabularyByLevel, getVocabularyByLevels } = await import('./vocabulary');
  const allVocab = getVocabularyByLevels(levels);
  const items: MultipleChoiceItem[] = [];

  for (const level of levels) {
    const levelVocab = vocabularyByLevel[level];
    const selectedWords = pickRandom(levelVocab, itemsPerLevel);

    for (const word of selectedWords) {
      const distractors = generateDistractors(word, allVocab, 3);

      items.push({
        id: `mc-${word.id}`,
        targetWord: word.headword,
        targetWordVocalized: word.headwordVocalized,
        correctMeaning: word.meanings[0],
        distractors,
        level: word.level,
        context: word.example?.arabic,
      });
    }
  }

  return shuffle(items);
}

/**
 * Generate Yes/No Test Items
 * Includes both real words and pseudowords
 */
export async function generateYesNoItems(
  levels: FrequencyLevel[],
  realWordsCount: number,
  pseudowordsCount: number
): Promise<YesNoItem[]> {
  const { getVocabularyByLevels } = await import('./vocabulary');
  const { allPseudowords } = await import('./pseudowords');
  const allVocab = getVocabularyByLevels(levels);
  const items: YesNoItem[] = [];

  // Select real words
  const selectedReal = pickRandom(allVocab, realWordsCount);
  for (const word of selectedReal) {
    items.push({
      id: `yn-real-${word.id}`,
      word: word.headwordVocalized,
      isReal: true,
      meaning: word.meanings[0],
      level: word.level,
    });
  }

  // Select pseudowords
  const selectedPseudo = pickRandom(allPseudowords, pseudowordsCount);
  for (const pseudo of selectedPseudo) {
    items.push({
      id: `yn-pseudo-${pseudo.id}`,
      word: pseudo.word,
      isReal: false,
    });
  }

  return shuffle(items);
}

/**
 * Generate Productive Vocabulary Test Items
 * Tests ability to produce the word given a definition
 */
export async function generateProductiveItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number
): Promise<ProductiveItem[]> {
  const { vocabularyByLevel } = await import('./vocabulary');
  const items: ProductiveItem[] = [];

  for (const level of levels) {
    const levelVocab = vocabularyByLevel[level];
    const selectedWords = pickRandom(levelVocab, itemsPerLevel);

    for (const word of selectedWords) {
      // Get first letter(s) as hint
      const headword = word.headword;
      const hint = headword.slice(0, 1); // First Arabic letter

      items.push({
        id: `prod-${word.id}`,
        definition: word.meanings[0],
        hint: hint + '...',
        correctAnswer: word.headword,
        alternatives: word.familyMembers?.slice(0, 2),
        level: word.level,
        contextSentence: word.example
          ? word.example.arabic.replace(word.headword, '_____')
          : undefined,
      });
    }
  }

  return shuffle(items);
}

/**
 * Generate Sentence Comprehension Test Items
 * Tests vocabulary and grammar in context
 */
export async function generateSentenceItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  sentenceTypes?: SentenceType[]
): Promise<SentenceTestItem[]> {
  const { getAllSentenceItems } = await import('./sentences');
  let allItems = getAllSentenceItems();

  // Filter by levels
  allItems = allItems.filter((item) => levels.includes(item.level));

  // Filter by sentence types if specified
  if (sentenceTypes && sentenceTypes.length > 0) {
    allItems = allItems.filter((item) => sentenceTypes.includes(item.sentenceType));
  }

  // Pick random items per level
  const items: SentenceTestItem[] = [];
  for (const level of levels) {
    const levelItems = allItems.filter((item) => item.level === level);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Sentence Production Test Items
 * Tests ability to produce sentences with specific grammatical structures
 */
export async function generateSentenceProductionItems(
  difficulties: SentenceDifficulty[],
  itemsPerDifficulty: number
): Promise<SentenceProductionItem[]> {
  const { getProductionSentencesByDifficulty } = await import('./sentenceProduction');
  const items: SentenceProductionItem[] = [];

  for (const difficulty of difficulties) {
    const difficultyItems = getProductionSentencesByDifficulty([difficulty]);
    const selected = pickRandom(difficultyItems, itemsPerDifficulty);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Collocation Test Items
 */
export async function generateCollocationItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  collocationTypes?: CollocationType[]
): Promise<CollocationItem[]> {
  const { getCollocationsByLevel } = await import('./collocations');
  let allItems = getCollocationsByLevel(levels);

  // Filter by collocation types if specified
  if (collocationTypes && collocationTypes.length > 0) {
    allItems = allItems.filter((item) => collocationTypes.includes(item.collocationType));
  }

  // Pick random items per level
  const items: CollocationItem[] = [];
  for (const level of levels) {
    const levelItems = allItems.filter((item) => item.level === level);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Root Pattern Test Items
 */
export async function generateRootPatternItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number
): Promise<RootPatternItem[]> {
  const { getRootPatternsByLevel } = await import('./rootPatterns');
  const items: RootPatternItem[] = [];

  for (const level of levels) {
    const levelItems = getRootPatternsByLevel([level]);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Translation item with direction and distractors for test generation
 */
export interface TranslationTestItem extends TranslationItem {
  direction: TranslationDirection;
  englishDistractors?: string[];
}

/**
 * Generate Translation Test Items
 */
export async function generateTranslationItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  direction: TranslationDirection | 'mixed' = 'mixed'
): Promise<TranslationTestItem[]> {
  const { getAllTranslations, getTranslationsByLevel, generateTranslationDistractors } = await import('./translations');
  const allItems = getAllTranslations();
  const items: TranslationTestItem[] = [];

  for (const level of levels) {
    const levelItems = getTranslationsByLevel([level]);
    const selected = pickRandom(levelItems, itemsPerLevel);

    for (const item of selected) {
      // Determine direction for this item
      let itemDirection: TranslationDirection;
      if (direction === 'mixed') {
        itemDirection = Math.random() > 0.5 ? 'ar_to_en' : 'en_to_ar';
      } else {
        itemDirection = direction;
      }

      // Generate distractors for ar_to_en
      const englishDistractors = itemDirection === 'ar_to_en'
        ? generateTranslationDistractors(item, allItems, 3)
        : undefined;

      items.push({
        ...item,
        direction: itemDirection,
        englishDistractors,
      });
    }
  }

  return shuffle(items);
}

/**
 * Generate Reading Comprehension Test Items
 */
export async function generateReadingComprehensionItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  topics?: PassageTopic[]
): Promise<ReadingComprehensionItem[]> {
  const { getReadingComprehensionByLevelAndTopic } = await import('./readingComprehension');
  const items: ReadingComprehensionItem[] = [];

  for (const level of levels) {
    const levelItems = getReadingComprehensionByLevelAndTopic([level], topics);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Verb Conjugation Test Items
 */
export async function generateVerbConjugationItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  tenses?: VerbTense[],
  forms?: VerbForm[],
  verbTypes?: VerbType[]
): Promise<VerbConjugationItem[]> {
  const { getVerbConjugationByLevel } = await import('./verbConjugation');
  let allItems = getVerbConjugationByLevel(levels);

  // Filter by tenses if specified
  if (tenses && tenses.length > 0) {
    allItems = allItems.filter((item) => tenses.includes(item.tense));
  }

  // Filter by forms if specified
  if (forms && forms.length > 0) {
    allItems = allItems.filter((item) => forms.includes(item.form));
  }

  // Filter by verb types if specified
  if (verbTypes && verbTypes.length > 0) {
    allItems = allItems.filter((item) => item.verbType && verbTypes.includes(item.verbType));
  }

  // Pick random items per level
  const items: VerbConjugationItem[] = [];
  for (const level of levels) {
    const levelItems = allItems.filter((item) => item.level === level);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Cloze Test Items
 */
export async function generateClozeItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  clozeTypes?: ClozeType[]
): Promise<ClozeItem[]> {
  const { getClozeItemsByLevel } = await import('./clozeTest');
  let allItems = getClozeItemsByLevel(levels);

  // Filter by cloze types if specified
  if (clozeTypes && clozeTypes.length > 0) {
    allItems = allItems.filter((item) => clozeTypes.includes(item.clozeType));
  }

  // Pick random items per level
  const items: ClozeItem[] = [];
  for (const level of levels) {
    const levelItems = allItems.filter((item) => item.level === level);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Diacritics Test Items
 */
export async function generateDiacriticsItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number
): Promise<DiacriticsItem[]> {
  const { getDiacriticsItemsByLevel } = await import('./diacriticsTest');
  const items: DiacriticsItem[] = [];

  for (const level of levels) {
    const levelItems = getDiacriticsItemsByLevel([level]);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate I'rab (Case Endings) Test Items
 */
export async function generateIrabItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  roles?: GrammaticalRole[]
): Promise<IrabItem[]> {
  const { getIrabItemsByLevel } = await import('./irabTest');
  let allItems = getIrabItemsByLevel(levels);

  // Filter by grammatical roles if specified
  if (roles && roles.length > 0) {
    allItems = allItems.filter((item) => roles.includes(item.grammaticalRole));
  }

  // Pick random items per level
  const items: IrabItem[] = [];
  for (const level of levels) {
    const levelItems = allItems.filter((item) => item.level === level);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Word Derivation Test Items
 */
export async function generateWordDerivationItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  derivationTypes?: DerivationType[],
  verbTypes?: VerbType[]
): Promise<WordDerivationItem[]> {
  const { getWordDerivationByLevel } = await import('./wordDerivation');
  let allItems = getWordDerivationByLevel(levels);

  // Filter by derivation types if specified
  if (derivationTypes && derivationTypes.length > 0) {
    allItems = allItems.filter((item) => derivationTypes.includes(item.derivationType));
  }

  // Filter by verb types if specified
  if (verbTypes && verbTypes.length > 0) {
    allItems = allItems.filter((item) => item.verbType && verbTypes.includes(item.verbType));
  }

  // Pick random items per level
  const items: WordDerivationItem[] = [];
  for (const level of levels) {
    const levelItems = allItems.filter((item) => item.level === level);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Morphological Analysis Test Items
 */
export async function generateMorphologicalAnalysisItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  components?: MorphComponent[]
): Promise<MorphologicalAnalysisItem[]> {
  const { getMorphologicalAnalysisByLevel } = await import('./morphologicalAnalysis');
  let allItems = getMorphologicalAnalysisByLevel(levels);

  // Filter by component types if specified
  if (components && components.length > 0) {
    allItems = allItems.filter((item) => components.includes(item.questionType));
  }

  // Pick random items per level
  const items: MorphologicalAnalysisItem[] = [];
  for (const level of levels) {
    const levelItems = allItems.filter((item) => item.level === level);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Verb Form Identification Test Items
 */
export async function generateVerbFormIdItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  forms?: ArabicVerbForm[],
  verbTypes?: VerbType[]
): Promise<VerbFormIdItem[]> {
  const { getVerbFormIdByLevel } = await import('./verbFormId');
  let allItems = getVerbFormIdByLevel(levels);

  // Filter by forms if specified
  if (forms && forms.length > 0) {
    allItems = allItems.filter((item) => forms.includes(item.correctForm));
  }

  // Filter by verb types if specified
  if (verbTypes && verbTypes.length > 0) {
    allItems = allItems.filter((item) => item.verbType && verbTypes.includes(item.verbType));
  }

  // Pick random items per level
  const items: VerbFormIdItem[] = [];
  for (const level of levels) {
    const levelItems = allItems.filter((item) => item.level === level);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Idiomatic Expressions Test Items
 */
export async function generateIdiomaticExpressionItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  categories?: IdiomCategory[]
): Promise<IdiomaticExpressionItem[]> {
  const { getIdiomaticExpressionsByLevel } = await import('./idiomaticExpressions');
  let allItems = getIdiomaticExpressionsByLevel(levels);

  // Filter by categories if specified
  if (categories && categories.length > 0) {
    allItems = allItems.filter((item) => categories.includes(item.category));
  }

  // Pick random items per level
  const items: IdiomaticExpressionItem[] = [];
  for (const level of levels) {
    const levelItems = allItems.filter((item) => item.level === level);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Word Family Test Items
 */
export async function generateWordFamilyItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number
): Promise<WordFamilyItem[]> {
  const { getWordFamilyByLevel } = await import('./wordFamily');
  const items: WordFamilyItem[] = [];

  for (const level of levels) {
    const levelItems = getWordFamilyByLevel([level]);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Quranic Vocabulary Test Items
 */
export async function generateQuranicVocabularyItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  categories?: QuranicCategory[]
): Promise<QuranicVocabularyItem[]> {
  const { getQuranicVocabularyByLevel } = await import('./quranicVocabulary');
  let allItems = getQuranicVocabularyByLevel(levels);

  // Filter by categories if specified
  if (categories && categories.length > 0) {
    allItems = allItems.filter((item) => categories.includes(item.category));
  }

  // Pick random items per level
  const items: QuranicVocabularyItem[] = [];
  for (const level of levels) {
    const levelItems = allItems.filter((item) => item.level === level);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Synonyms/Antonyms Test Items
 */
export async function generateSynonymsAntonymsItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  relationTypes?: RelationType[]
): Promise<SynonymsAntonymsItem[]> {
  const { getSynonymsAntonymsByLevel } = await import('./synonymsAntonyms');
  let allItems = getSynonymsAntonymsByLevel(levels);

  // Filter by relation types if specified
  if (relationTypes && relationTypes.length > 0) {
    allItems = allItems.filter((item) => relationTypes.includes(item.relationType));
  }

  // Pick random items per level
  const items: SynonymsAntonymsItem[] = [];
  for (const level of levels) {
    const levelItems = allItems.filter((item) => item.level === level);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Negation Pattern Test Items
 */
export async function generateNegationItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  particles?: NegationParticle[]
): Promise<NegationItem[]> {
  const { getNegationItemsByLevel } = await import('./negationPatterns');
  let allItems = getNegationItemsByLevel(levels);

  // Filter by particles if specified
  if (particles && particles.length > 0) {
    allItems = allItems.filter((item) => particles.includes(item.correctParticle));
  }

  // Pick random items per level
  const items: NegationItem[] = [];
  for (const level of levels) {
    const levelItems = allItems.filter((item) => item.level === level);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Preposition Usage Test Items
 */
export async function generatePrepositionItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  prepositions?: ArabicPreposition[]
): Promise<PrepositionItem[]> {
  const { getPrepositionItemsByLevel } = await import('./prepositionUsage');
  let allItems = getPrepositionItemsByLevel(levels);

  // Filter by prepositions if specified
  if (prepositions && prepositions.length > 0) {
    allItems = allItems.filter((item) => prepositions.includes(item.correctPreposition));
  }

  // Pick random items per level
  const items: PrepositionItem[] = [];
  for (const level of levels) {
    const levelItems = allItems.filter((item) => item.level === level);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Question Words Test Items
 */
export async function generateQuestionWordItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  words?: QuestionWord[]
): Promise<QuestionWordItem[]> {
  const { getQuestionWordItemsByLevel } = await import('./questionWords');
  let allItems = getQuestionWordItemsByLevel(levels);

  // Filter by question words if specified
  if (words && words.length > 0) {
    allItems = allItems.filter((item) => words.includes(item.correctWord));
  }

  // Pick random items per level
  const items: QuestionWordItem[] = [];
  for (const level of levels) {
    const levelItems = allItems.filter((item) => item.level === level);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Relative Clause Test Items
 */
export async function generateRelativeClauseItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  pronouns?: RelativePronoun[]
): Promise<RelativeClauseItem[]> {
  const { getRelativeClauseItemsByLevel } = await import('./relativeClauses');
  let allItems = getRelativeClauseItemsByLevel(levels);

  // Filter by pronouns if specified
  if (pronouns && pronouns.length > 0) {
    allItems = allItems.filter((item) => pronouns.includes(item.correctPronoun));
  }

  // Pick random items per level
  const items: RelativeClauseItem[] = [];
  for (const level of levels) {
    const levelItems = allItems.filter((item) => item.level === level);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Spelling/Orthography Test Items
 */
export async function generateSpellingItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  rules?: SpellingRule[]
): Promise<SpellingItem[]> {
  const { getSpellingItemsByLevel } = await import('./spellingOrthography');
  let allItems = getSpellingItemsByLevel(levels);

  // Filter by rules if specified
  if (rules && rules.length > 0) {
    allItems = allItems.filter((item) => rules.includes(item.spellingRule));
  }

  // Pick random items per level
  const items: SpellingItem[] = [];
  for (const level of levels) {
    const levelItems = allItems.filter((item) => item.level === level);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Demonstrative Test Items
 */
export async function generateDemonstrativeItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  demonstratives?: Demonstrative[]
): Promise<DemonstrativeItem[]> {
  const { getDemonstrativeItemsByLevel } = await import('./demonstratives');
  let allItems = getDemonstrativeItemsByLevel(levels);

  // Filter by demonstratives if specified
  if (demonstratives && demonstratives.length > 0) {
    allItems = allItems.filter((item) => demonstratives.includes(item.correctDemonstrative));
  }

  // Pick random items per level
  const items: DemonstrativeItem[] = [];
  for (const level of levels) {
    const levelItems = allItems.filter((item) => item.level === level);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Possessive Pronoun Test Items
 */
export async function generatePossessiveItems(
  levels: FrequencyLevel[],
  itemsPerLevel: number,
  pronouns?: PossessivePronoun[]
): Promise<PossessiveItem[]> {
  const { getPossessiveItemsByLevel } = await import('./possessivePronouns');
  let allItems = getPossessiveItemsByLevel(levels);

  // Filter by pronouns if specified
  if (pronouns && pronouns.length > 0) {
    allItems = allItems.filter((item) => pronouns.includes(item.correctPronoun));
  }

  // Pick random items per level
  const items: PossessiveItem[] = [];
  for (const level of levels) {
    const levelItems = allItems.filter((item) => item.level === level);
    const selected = pickRandom(levelItems, itemsPerLevel);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Quranic Frequency VST Items
 */
export async function generateQuranicVstItems(
  tiers: QuranicFrequencyTier[],
  itemsPerTier: number
): Promise<QuranicVstItem[]> {
  const { loadQuranicVstData } = await import('./quranicVst');
  const allItems = await loadQuranicVstData();
  const items: QuranicVstItem[] = [];

  for (const tier of tiers) {
    const tierItems = allItems.filter((item) => item.tier === tier);
    const selected = pickRandom(tierItems, itemsPerTier);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Ayah Context Cloze Items
 */
export async function generateAyahContextItems(
  tiers: QuranicFrequencyTier[],
  itemsPerTier: number
): Promise<AyahContextItem[]> {
  const { loadAyahContextData } = await import('./ayahContext');
  const allItems = await loadAyahContextData(tiers);
  const items: AyahContextItem[] = [];

  for (const tier of tiers) {
    const tierItems = allItems.filter((item) => item.tier === tier);
    const selected = pickRandom(tierItems, itemsPerTier);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Morphological Chain Items
 */
export async function generateMorphChainItems(
  tiers: QuranicFrequencyTier[],
  itemsPerTier: number,
  chainLength?: ChainLength | null
): Promise<MorphChainItem[]> {
  const { loadMorphChainData } = await import('./morphChain');
  let allItems = await loadMorphChainData();

  // Filter by chain length
  if (chainLength === 'short') {
    allItems = allItems.filter((item) => item.steps.length <= 3);
  } else if (chainLength === 'medium') {
    allItems = allItems.filter((item) => item.steps.length >= 4 && item.steps.length <= 5);
  } else if (chainLength === 'long') {
    allItems = allItems.filter((item) => item.steps.length >= 6);
  }

  const items: MorphChainItem[] = [];

  for (const tier of tiers) {
    const tierItems = allItems.filter((item) => item.tier === tier);
    const selected = pickRandom(tierItems, itemsPerTier);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate Grammar Tag Identification Items
 */
export async function generateGrammarTagItems(
  tiers: QuranicFrequencyTier[],
  itemsPerTier: number,
  difficulty?: GrammarDifficulty
): Promise<GrammarTagItem[]> {
  const { loadGrammarTagData } = await import('./grammarTag');
  let allItems = await loadGrammarTagData();

  // Filter by difficulty mode
  if (difficulty === 'easy') {
    // POS only: Noun vs Verb vs Particle
    const posPatterns = ['N', 'V', 'P', 'PRON', 'DET', 'CONJ', 'NEG', 'REL'];
    allItems = allItems.filter((item) => posPatterns.some(p => item.correctTag.startsWith(p)));
  } else if (difficulty === 'medium') {
    // Case: items with NOM/ACC/GEN
    allItems = allItems.filter((item) =>
      item.correctTag.includes('NOM') || item.correctTag.includes('ACC') || item.correctTag.includes('GEN')
    );
  }
  // 'hard' = no filter, full tags

  const items: GrammarTagItem[] = [];

  for (const tier of tiers) {
    const tierItems = allItems.filter((item) => item.tier === tier);
    const selected = pickRandom(tierItems, itemsPerTier);
    items.push(...selected);
  }

  return shuffle(items);
}

/**
 * Generate test items based on configuration.
 * All data is loaded on demand via dynamic imports.
 */
export async function generateTestItems(
  config: TestConfig
): Promise<(MultipleChoiceItem | YesNoItem | ProductiveItem | SentenceTestItem | SentenceProductionItem | CollocationItem | RootPatternItem | TranslationTestItem | ReadingComprehensionItem | VerbConjugationItem | ClozeItem | DiacriticsItem | IrabItem | WordDerivationItem | MorphologicalAnalysisItem | VerbFormIdItem | IdiomaticExpressionItem | WordFamilyItem | QuranicVocabularyItem | SynonymsAntonymsItem | NegationItem | PrepositionItem | QuestionWordItem | RelativeClauseItem | SpellingItem | DemonstrativeItem | PossessiveItem | QuranicVstItem | AyahContextItem | MorphChainItem | GrammarTagItem)[]> {
  switch (config.type) {
    case 'vst':
    case 'vlt':
      return await generateMultipleChoiceItems(config.levels, config.itemsPerLevel);

    case 'yesno':
      // For Yes/No test, split items between real and pseudo
      const realCount = Math.ceil(
        (config.itemsPerLevel * config.levels.length) / 2
      );
      const pseudoCount = Math.floor(
        (config.itemsPerLevel * config.levels.length) / 2
      );
      return await generateYesNoItems(config.levels, realCount, pseudoCount);

    case 'productive':
      return await generateProductiveItems(config.levels, config.itemsPerLevel);

    case 'sentence':
      return await generateSentenceItems(
        config.levels,
        config.itemsPerLevel,
        (config as TestConfig & { sentenceTypes?: SentenceType[] }).sentenceTypes
      );

    case 'sentence_production':
      // Use difficulties instead of levels for sentence production
      const difficulties = (config as TestConfig & { difficulties?: SentenceDifficulty[] }).difficulties
        || ['beginner', 'intermediate'];
      return await generateSentenceProductionItems(difficulties, config.itemsPerLevel);

    case 'collocation':
      return await generateCollocationItems(
        config.levels,
        config.itemsPerLevel,
        (config as TestConfig & { collocationTypes?: CollocationType[] }).collocationTypes
      );

    case 'root_pattern':
      return await generateRootPatternItems(config.levels, config.itemsPerLevel);

    case 'translation':
      const translationDirection = (config as TestConfig & { translationDirection?: TranslationDirection | 'mixed' }).translationDirection || 'mixed';
      return await generateTranslationItems(config.levels, config.itemsPerLevel, translationDirection);

    case 'reading_comprehension':
      const passageTopics = (config as TestConfig & { passageTopics?: PassageTopic[] }).passageTopics;
      return await generateReadingComprehensionItems(config.levels, config.itemsPerLevel, passageTopics);

    case 'verb_conjugation': {
      const verbTenses = (config as TestConfig & { verbTenses?: VerbTense[] }).verbTenses;
      const verbForms = (config as TestConfig & { verbForms?: VerbForm[] }).verbForms;
      const vcVerbTypes = (config as TestConfig & { verbTypes?: VerbType[] }).verbTypes;
      return await generateVerbConjugationItems(config.levels, config.itemsPerLevel, verbTenses, verbForms, vcVerbTypes);
    }

    case 'cloze':
      const clozeTypes = (config as TestConfig & { clozeTypes?: ClozeType[] }).clozeTypes;
      return await generateClozeItems(config.levels, config.itemsPerLevel, clozeTypes);

    case 'diacritics':
      return await generateDiacriticsItems(config.levels, config.itemsPerLevel);

    case 'irab':
      const grammaticalRoles = (config as TestConfig & { grammaticalRoles?: GrammaticalRole[] }).grammaticalRoles;
      return await generateIrabItems(config.levels, config.itemsPerLevel, grammaticalRoles);

    case 'word_derivation': {
      const derivationTypes = (config as TestConfig & { derivationTypes?: DerivationType[] }).derivationTypes;
      const wdVerbTypes = (config as TestConfig & { verbTypes?: VerbType[] }).verbTypes;
      return await generateWordDerivationItems(config.levels, config.itemsPerLevel, derivationTypes, wdVerbTypes);
    }

    case 'morphological_analysis':
      const morphComponents = (config as TestConfig & { morphComponents?: MorphComponent[] }).morphComponents;
      return await generateMorphologicalAnalysisItems(config.levels, config.itemsPerLevel, morphComponents);

    case 'verb_form_id': {
      const verbFormIdForms = (config as TestConfig & { verbFormIdForms?: ArabicVerbForm[] }).verbFormIdForms;
      const vfVerbTypes = (config as TestConfig & { verbTypes?: VerbType[] }).verbTypes;
      return await generateVerbFormIdItems(config.levels, config.itemsPerLevel, verbFormIdForms, vfVerbTypes);
    }

    case 'idiomatic':
      const idiomCategories = (config as TestConfig & { idiomCategories?: IdiomCategory[] }).idiomCategories;
      return await generateIdiomaticExpressionItems(config.levels, config.itemsPerLevel, idiomCategories);

    case 'word_family':
      return await generateWordFamilyItems(config.levels, config.itemsPerLevel);

    case 'quranic':
      const quranicCategories = (config as TestConfig & { quranicCategories?: QuranicCategory[] }).quranicCategories;
      return await generateQuranicVocabularyItems(config.levels, config.itemsPerLevel, quranicCategories);

    case 'synonyms_antonyms':
      const relationTypes = (config as TestConfig & { relationTypes?: RelationType[] }).relationTypes;
      return await generateSynonymsAntonymsItems(config.levels, config.itemsPerLevel, relationTypes);

    case 'negation':
      const negationParticles = (config as TestConfig & { negationParticles?: NegationParticle[] }).negationParticles;
      return await generateNegationItems(config.levels, config.itemsPerLevel, negationParticles);

    case 'preposition':
      const prepositions = (config as TestConfig & { prepositions?: ArabicPreposition[] }).prepositions;
      return await generatePrepositionItems(config.levels, config.itemsPerLevel, prepositions);

    case 'question_words':
      const questionWords = (config as TestConfig & { questionWords?: QuestionWord[] }).questionWords;
      return await generateQuestionWordItems(config.levels, config.itemsPerLevel, questionWords);

    case 'relative_clause':
      const relativePronouns = (config as TestConfig & { relativePronouns?: RelativePronoun[] }).relativePronouns;
      return await generateRelativeClauseItems(config.levels, config.itemsPerLevel, relativePronouns);

    case 'spelling':
      const spellingRules = (config as TestConfig & { spellingRules?: SpellingRule[] }).spellingRules;
      return await generateSpellingItems(config.levels, config.itemsPerLevel, spellingRules);

    case 'demonstrative':
      const demonstratives = (config as TestConfig & { demonstratives?: Demonstrative[] }).demonstratives;
      return await generateDemonstrativeItems(config.levels, config.itemsPerLevel, demonstratives);

    case 'possessive':
      const possessivePronouns = (config as TestConfig & { possessivePronouns?: PossessivePronoun[] }).possessivePronouns;
      return await generatePossessiveItems(config.levels, config.itemsPerLevel, possessivePronouns);

    case 'quranic_vst': {
      const qConfig = config as TestConfig & { quranicTiers?: QuranicFrequencyTier[] };
      return await generateQuranicVstItems(qConfig.quranicTiers || ['q100', 'q300'], config.itemsPerLevel);
    }

    case 'ayah_context': {
      const acConfig = config as TestConfig & { quranicTiers?: QuranicFrequencyTier[] };
      return await generateAyahContextItems(acConfig.quranicTiers || ['q100', 'q300'], config.itemsPerLevel);
    }

    case 'morph_chain': {
      const mcConfig = config as TestConfig & { quranicTiers?: QuranicFrequencyTier[]; chainLength?: ChainLength | null };
      return await generateMorphChainItems(mcConfig.quranicTiers || ['q100', 'q300'], config.itemsPerLevel, mcConfig.chainLength);
    }

    case 'grammar_tag': {
      const gtConfig = config as TestConfig & { quranicTiers?: QuranicFrequencyTier[]; grammarDifficulty?: GrammarDifficulty };
      return await generateGrammarTagItems(gtConfig.quranicTiers || ['q100', 'q300'], config.itemsPerLevel, gtConfig.grammarDifficulty);
    }

    default:
      return [];
  }
}

/**
 * Default test configurations based on Nation's recommendations
 */
export const defaultConfigs: Record<string, TestConfig> = {
  // Quick vocabulary check (5-10 minutes)
  quickCheck: {
    type: 'vst',
    levels: ['1k', '2k', '3k'],
    itemsPerLevel: 5,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: false,
  },

  // Full Vocabulary Size Test
  fullVST: {
    type: 'vst',
    levels: ['1k', '2k', '3k', '5k', '10k'],
    itemsPerLevel: 10,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: false,
  },

  // Vocabulary Levels Test (specific level)
  vlt1k: {
    type: 'vlt',
    levels: ['1k'],
    itemsPerLevel: 10,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },

  // Yes/No Quick Test
  yesNoQuick: {
    type: 'yesno',
    levels: ['1k', '2k'],
    itemsPerLevel: 10, // 10 real + 10 pseudo
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: false,
  },

  // Productive Vocabulary Test
  productiveBasic: {
    type: 'productive',
    levels: ['1k', '2k'],
    itemsPerLevel: 5,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },

  // Sentence Comprehension Test - All sentence types
  sentenceAll: {
    type: 'sentence',
    levels: ['1k', '2k', '3k'],
    itemsPerLevel: 5,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },

  // Conditional Sentences Focus
  sentenceConditionals: {
    type: 'sentence',
    levels: ['2k', '3k', '5k'],
    itemsPerLevel: 5,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
    sentenceTypes: ['conditional'],
  } as TestConfig & { sentenceTypes: SentenceType[] },

  // Negation Focus
  sentenceNegation: {
    type: 'sentence',
    levels: ['1k', '2k'],
    itemsPerLevel: 5,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
    sentenceTypes: ['negative'],
  } as TestConfig & { sentenceTypes: SentenceType[] },

  // Questions Focus
  sentenceQuestions: {
    type: 'sentence',
    levels: ['1k', '2k'],
    itemsPerLevel: 5,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
    sentenceTypes: ['interrogative'],
  } as TestConfig & { sentenceTypes: SentenceType[] },

  // Sentence Production - Beginner
  sentenceProductionBeginner: {
    type: 'sentence_production',
    levels: ['1k', '2k'],
    itemsPerLevel: 5,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
    difficulties: ['beginner'],
  } as TestConfig & { difficulties: SentenceDifficulty[] },

  // Sentence Production - Progressive (Beginner to Intermediate)
  sentenceProductionProgressive: {
    type: 'sentence_production',
    levels: ['1k', '2k', '3k'],
    itemsPerLevel: 5,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
    difficulties: ['beginner', 'intermediate'],
  } as TestConfig & { difficulties: SentenceDifficulty[] },

  // Sentence Production - Full (All levels)
  sentenceProductionFull: {
    type: 'sentence_production',
    levels: ['1k', '2k', '3k', '5k'],
    itemsPerLevel: 4,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
    difficulties: ['beginner', 'intermediate', 'advanced'],
  } as TestConfig & { difficulties: SentenceDifficulty[] },

  // Collocation Test - Basic
  collocationBasic: {
    type: 'collocation',
    levels: ['1k', '2k'],
    itemsPerLevel: 5,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },

  // Collocation Test - Full
  collocationFull: {
    type: 'collocation',
    levels: ['1k', '2k', '3k', '5k', '10k'],
    itemsPerLevel: 4,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },

  // Root Pattern Test - Basic
  rootPatternBasic: {
    type: 'root_pattern',
    levels: ['1k', '2k'],
    itemsPerLevel: 4,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },

  // Root Pattern Test - Full
  rootPatternFull: {
    type: 'root_pattern',
    levels: ['1k', '2k', '3k', '5k', '10k'],
    itemsPerLevel: 3,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },

  // Translation Test - Arabic to English
  translationArToEn: {
    type: 'translation',
    levels: ['1k', '2k'],
    itemsPerLevel: 5,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
    translationDirection: 'ar_to_en',
  } as TestConfig & { translationDirection: TranslationDirection },

  // Translation Test - English to Arabic
  translationEnToAr: {
    type: 'translation',
    levels: ['1k', '2k'],
    itemsPerLevel: 5,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
    translationDirection: 'en_to_ar',
  } as TestConfig & { translationDirection: TranslationDirection },

  // Translation Test - Mixed
  translationMixed: {
    type: 'translation',
    levels: ['1k', '2k', '3k'],
    itemsPerLevel: 4,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
    translationDirection: 'mixed',
  } as TestConfig & { translationDirection: 'mixed' },

  // Reading Comprehension Test - Basic
  readingComprehensionBasic: {
    type: 'reading_comprehension',
    levels: ['1k', '2k'],
    itemsPerLevel: 1,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },

  // Reading Comprehension Test - Full
  readingComprehensionFull: {
    type: 'reading_comprehension',
    levels: ['1k', '2k', '3k', '5k', '10k'],
    itemsPerLevel: 1,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },

  // Verb Conjugation Test - Basic
  verbConjugationBasic: {
    type: 'verb_conjugation',
    levels: ['1k', '2k'],
    itemsPerLevel: 5,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },

  // Verb Conjugation Test - Full
  verbConjugationFull: {
    type: 'verb_conjugation',
    levels: ['1k', '2k', '3k'],
    itemsPerLevel: 4,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },

  // Cloze Test - Basic
  clozeBasic: {
    type: 'cloze',
    levels: ['1k', '2k'],
    itemsPerLevel: 5,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },

  // Cloze Test - Full
  clozeFull: {
    type: 'cloze',
    levels: ['1k', '2k', '3k', '5k'],
    itemsPerLevel: 3,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },

  // Diacritics Test - Basic
  diacriticsBasic: {
    type: 'diacritics',
    levels: ['1k', '2k'],
    itemsPerLevel: 5,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },

  // Diacritics Test - Full
  diacriticsFull: {
    type: 'diacritics',
    levels: ['1k', '2k', '3k', '5k'],
    itemsPerLevel: 3,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },

  // I'rab Test - Basic
  irabBasic: {
    type: 'irab',
    levels: ['1k', '2k'],
    itemsPerLevel: 5,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },

  // I'rab Test - Full
  irabFull: {
    type: 'irab',
    levels: ['1k', '2k', '3k', '5k'],
    itemsPerLevel: 3,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },

  // Word Derivation Test - Basic
  wordDerivationBasic: {
    type: 'word_derivation',
    levels: ['1k', '2k'],
    itemsPerLevel: 5,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },

  // Word Derivation Test - Full
  wordDerivationFull: {
    type: 'word_derivation',
    levels: ['1k', '2k', '3k', '5k'],
    itemsPerLevel: 3,
    shuffle: true,
    timeLimit: 0,
    showImmediateFeedback: true,
  },
};
