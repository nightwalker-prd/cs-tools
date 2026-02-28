// Type re-exports (erased at compile time, no bundle impact)
export type { WordFamily, FrequencyLevel } from '../types';
export type { Pseudoword } from './pseudowords';
export type { SentenceTestItem, SentenceType } from './sentences';
export type { SentenceProductionItem, SentenceDifficulty } from './sentenceProduction';
export type { CollocationItem, CollocationType } from './collocations';
export type { RootPatternItem } from './rootPatterns';
export type { TranslationItem, TranslationDirection } from './translations';
export type { ReadingComprehensionItem, PassageTopic } from './readingComprehension';
export type { VerbConjugationItem, VerbTense, VerbForm } from './verbConjugation';
export type { ClozeItem, ClozeType } from './clozeTest';
export type { DiacriticsItem } from './diacriticsTest';
export type { IrabItem, GrammaticalRole } from './irabTest';
export type { WordDerivationItem, DerivationType } from './wordDerivation';
export type { MorphologicalAnalysisItem, MorphComponent } from './morphologicalAnalysis';
export type { VerbFormIdItem, ArabicVerbForm } from './verbFormId';
export type { IdiomaticExpressionItem, IdiomCategory } from './idiomaticExpressions';
export type { WordFamilyItem } from './wordFamily';
export type { QuranicVocabularyItem, QuranicCategory } from './quranicVocabulary';
export type { SynonymsAntonymsItem, RelationType } from './synonymsAntonyms';
export type { NegationItem, NegationParticle } from './negationPatterns';
export type { PrepositionItem, ArabicPreposition } from './prepositionUsage';
export type { QuestionWordItem, QuestionWord } from './questionWords';
export type { RelativeClauseItem, RelativePronoun } from './relativeClauses';
export type { SpellingItem, SpellingRule } from './spellingOrthography';
export type { DemonstrativeItem, Demonstrative } from './demonstratives';
export type { PossessiveItem, PossessivePronoun } from './possessivePronouns';

// Async test generator (the only runtime export needed from this barrel)
export { generateTestItems, defaultConfigs } from './testGenerator';
export type { TranslationTestItem } from './testGenerator';
