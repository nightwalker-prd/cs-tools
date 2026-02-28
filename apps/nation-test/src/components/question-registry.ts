import type { ComponentType } from 'react';
import type { TestType } from '../types';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { YesNoQuestion } from './YesNoQuestion';
import { ProductiveQuestion } from './ProductiveQuestion';
import { SentenceQuestion } from './SentenceQuestion';
import { SentenceProductionQuestion } from './SentenceProductionQuestion';
import { CollocationQuestion } from './CollocationQuestion';
import { RootPatternQuestion } from './RootPatternQuestion';
import { ReadingComprehensionQuestion } from './ReadingComprehensionQuestion';
import { VerbConjugationQuestion } from './VerbConjugationQuestion';
import { ClozeQuestion } from './ClozeQuestion';
import { DiacriticsQuestion } from './DiacriticsQuestion';
import { IrabQuestion } from './IrabQuestion';
import { WordDerivationQuestion } from './WordDerivationQuestion';
import { MorphologicalAnalysisQuestion } from './MorphologicalAnalysisQuestion';
import { VerbFormIdQuestion } from './VerbFormIdQuestion';
import { IdiomaticExpressionQuestion } from './IdiomaticExpressionQuestion';
import { WordFamilyQuestion } from './WordFamilyQuestion';
import { QuranicVocabularyQuestion } from './QuranicVocabularyQuestion';
import { SynonymsAntonymsQuestion } from './SynonymsAntonymsQuestion';
import { NegationQuestion } from './NegationQuestion';
import { PrepositionQuestion } from './PrepositionQuestion';
import { QuestionWordsQuestion } from './QuestionWordsQuestion';
import { RelativeClauseQuestion } from './RelativeClauseQuestion';
import { SpellingQuestion } from './SpellingQuestion';
import { DemonstrativeQuestion } from './DemonstrativeQuestion';
import { PossessiveQuestion } from './PossessiveQuestion';
import { QuranicVstQuestion } from './QuranicVstQuestion';
import { AyahContextQuestion } from './AyahContextQuestion';
import { MorphChainQuestion } from './MorphChainQuestion';
import { GrammarTagQuestion } from './GrammarTagQuestion';

// 'translation' is handled separately due to extra props (direction, distractors)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const questionRegistry: Record<string, ComponentType<any>> = {
  vst: MultipleChoiceQuestion,
  vlt: MultipleChoiceQuestion,
  yesno: YesNoQuestion,
  productive: ProductiveQuestion,
  sentence: SentenceQuestion,
  sentence_production: SentenceProductionQuestion,
  collocation: CollocationQuestion,
  root_pattern: RootPatternQuestion,
  reading_comprehension: ReadingComprehensionQuestion,
  verb_conjugation: VerbConjugationQuestion,
  cloze: ClozeQuestion,
  diacritics: DiacriticsQuestion,
  irab: IrabQuestion,
  word_derivation: WordDerivationQuestion,
  morphological_analysis: MorphologicalAnalysisQuestion,
  verb_form_id: VerbFormIdQuestion,
  idiomatic: IdiomaticExpressionQuestion,
  word_family: WordFamilyQuestion,
  quranic: QuranicVocabularyQuestion,
  synonyms_antonyms: SynonymsAntonymsQuestion,
  negation: NegationQuestion,
  preposition: PrepositionQuestion,
  question_words: QuestionWordsQuestion,
  relative_clause: RelativeClauseQuestion,
  spelling: SpellingQuestion,
  demonstrative: DemonstrativeQuestion,
  possessive: PossessiveQuestion,
  quranic_vst: QuranicVstQuestion,
  ayah_context: AyahContextQuestion,
  morph_chain: MorphChainQuestion,
  grammar_tag: GrammarTagQuestion,
};

/**
 * Look up the question component for a given test type.
 * Returns undefined for 'translation' (handled as a special case in VocabularyTest).
 */
export function getQuestionComponent(testType: TestType): ComponentType<any> | undefined {
  return questionRegistry[testType];
}
