import { useState, useCallback } from 'react';
import type { TestConfig, TestType, FrequencyLevel, QuranicFrequencyTier } from '../../types';
import type { SentenceType } from '../../data/sentences';
import type { SentenceDifficulty } from '../../data/sentenceProduction';
import type { CollocationType } from '../../data/collocations';
import type { TranslationDirection } from '../../data/translations';
import type { PassageTopic } from '../../data/readingComprehension';
import type { VerbTense, VerbForm } from '../../data/verbConjugation';
import type { VerbType } from '../../data/verbTypes';
import type { ClozeType } from '../../data/clozeTest';
import type { GrammaticalRole } from '../../data/irabTest';
import type { DerivationType } from '../../data/wordDerivation';
import type { MorphComponent } from '../../data/morphologicalAnalysis';
import type { ArabicVerbForm } from '../../data/verbFormId';
import type { IdiomCategory } from '../../data/idiomaticExpressions';
import type { QuranicCategory } from '../../data/quranicVocabulary';
import type { RelationType } from '../../data/synonymsAntonyms';
import type { NegationParticle } from '../../data/negationPatterns';
import type { ArabicPreposition } from '../../data/prepositionUsage';
import type { QuestionWord } from '../../data/questionWords';
import type { RelativePronoun } from '../../data/relativeClauses';
import type { SpellingRule } from '../../data/spellingOrthography';
import type { Demonstrative } from '../../data/demonstratives';
import type { PossessivePronoun } from '../../data/possessivePronouns';
import type { GrammarDifficulty, ChainLength } from './constants';

export interface ConfigState {
  selectedType: TestType;
  selectedLevels: FrequencyLevel[];
  itemsPerLevel: number;
  showFeedback: boolean;
  selectedSentenceTypes: SentenceType[];
  selectedDifficulties: SentenceDifficulty[];
  selectedCollocationTypes: CollocationType[];
  translationDirection: TranslationDirection | 'mixed';
  selectedPassageTopics: PassageTopic[];
  selectedVerbTenses: VerbTense[];
  selectedVerbForms: VerbForm[];
  selectedVerbTypes: VerbType[];
  selectedClozeTypes: ClozeType[];
  selectedGrammaticalRoles: GrammaticalRole[];
  selectedDerivationTypes: DerivationType[];
  selectedMorphComponents: MorphComponent[];
  selectedArabicVerbForms: ArabicVerbForm[];
  selectedIdiomCategories: IdiomCategory[];
  selectedQuranicCategories: QuranicCategory[];
  selectedRelationTypes: RelationType[];
  selectedNegationParticles: NegationParticle[];
  selectedPrepositions: ArabicPreposition[];
  selectedQuestionWords: QuestionWord[];
  selectedRelativePronouns: RelativePronoun[];
  selectedSpellingRules: SpellingRule[];
  selectedDemonstratives: Demonstrative[];
  selectedPossessivePronouns: PossessivePronoun[];
  selectedQuranicTiers: QuranicFrequencyTier[];
  grammarDifficulty: GrammarDifficulty;
  chainLength: ChainLength | null;
}

export interface ConfigActions {
  setSelectedType: (type: TestType) => void;
  setItemsPerLevel: (n: number) => void;
  setShowFeedback: (v: boolean) => void;
  setTranslationDirection: (d: TranslationDirection | 'mixed') => void;
  toggleLevel: (level: FrequencyLevel) => void;
  toggleDifficulty: (d: SentenceDifficulty) => void;
  toggleSentenceType: (t: SentenceType) => void;
  toggleCollocationTypes: (t: CollocationType) => void;
  togglePassageTopic: (t: PassageTopic) => void;
  toggleVerbTense: (t: VerbTense) => void;
  toggleVerbForm: (f: VerbForm) => void;
  toggleVerbType: (t: VerbType) => void;
  toggleClozeType: (t: ClozeType) => void;
  toggleGrammaticalRole: (r: GrammaticalRole) => void;
  toggleDerivationType: (t: DerivationType) => void;
  toggleMorphComponent: (c: MorphComponent) => void;
  toggleArabicVerbForm: (f: ArabicVerbForm) => void;
  toggleIdiomCategory: (c: IdiomCategory) => void;
  toggleQuranicCategory: (c: QuranicCategory) => void;
  toggleRelationType: (t: RelationType) => void;
  toggleNegationParticle: (p: NegationParticle) => void;
  togglePreposition: (p: ArabicPreposition) => void;
  toggleQuestionWord: (w: QuestionWord) => void;
  toggleRelativePronoun: (p: RelativePronoun) => void;
  toggleSpellingRule: (r: SpellingRule) => void;
  toggleDemonstrative: (d: Demonstrative) => void;
  togglePossessivePronoun: (p: PossessivePronoun) => void;
  toggleQuranicTier: (t: QuranicFrequencyTier) => void;
  setGrammarDifficulty: (d: GrammarDifficulty) => void;
  setChainLength: (l: ChainLength | null) => void;
  buildConfig: () => TestConfig | null;
  totalItems: number;
}

function toggleItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

export function useTestConfig(initialType: TestType = 'vst'): [ConfigState, ConfigActions] {
  const [selectedType, setSelectedType] = useState<TestType>(initialType);
  const [selectedLevels, setSelectedLevels] = useState<FrequencyLevel[]>(['1k', '2k']);
  const [itemsPerLevel, setItemsPerLevel] = useState(5);
  const [showFeedback, setShowFeedback] = useState(true);
  const [selectedSentenceTypes, setSelectedSentenceTypes] = useState<SentenceType[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<SentenceDifficulty[]>(['beginner', 'intermediate']);
  const [selectedCollocationTypes, setSelectedCollocationTypes] = useState<CollocationType[]>([]);
  const [translationDirection, setTranslationDirection] = useState<TranslationDirection | 'mixed'>('mixed');
  const [selectedPassageTopics, setSelectedPassageTopics] = useState<PassageTopic[]>([]);
  const [selectedVerbTenses, setSelectedVerbTenses] = useState<VerbTense[]>([]);
  const [selectedVerbForms, setSelectedVerbForms] = useState<VerbForm[]>([]);
  const [selectedVerbTypes, setSelectedVerbTypes] = useState<VerbType[]>([]);
  const [selectedClozeTypes, setSelectedClozeTypes] = useState<ClozeType[]>([]);
  const [selectedGrammaticalRoles, setSelectedGrammaticalRoles] = useState<GrammaticalRole[]>([]);
  const [selectedDerivationTypes, setSelectedDerivationTypes] = useState<DerivationType[]>([]);
  const [selectedMorphComponents, setSelectedMorphComponents] = useState<MorphComponent[]>([]);
  const [selectedArabicVerbForms, setSelectedArabicVerbForms] = useState<ArabicVerbForm[]>([]);
  const [selectedIdiomCategories, setSelectedIdiomCategories] = useState<IdiomCategory[]>([]);
  const [selectedQuranicCategories, setSelectedQuranicCategories] = useState<QuranicCategory[]>([]);
  const [selectedRelationTypes, setSelectedRelationTypes] = useState<RelationType[]>([]);
  const [selectedNegationParticles, setSelectedNegationParticles] = useState<NegationParticle[]>([]);
  const [selectedPrepositions, setSelectedPrepositions] = useState<ArabicPreposition[]>([]);
  const [selectedQuestionWords, setSelectedQuestionWords] = useState<QuestionWord[]>([]);
  const [selectedRelativePronouns, setSelectedRelativePronouns] = useState<RelativePronoun[]>([]);
  const [selectedSpellingRules, setSelectedSpellingRules] = useState<SpellingRule[]>([]);
  const [selectedDemonstratives, setSelectedDemonstratives] = useState<Demonstrative[]>([]);
  const [selectedPossessivePronouns, setSelectedPossessivePronouns] = useState<PossessivePronoun[]>([]);
  const [selectedQuranicTiers, setSelectedQuranicTiers] = useState<QuranicFrequencyTier[]>(['q100', 'q300']);
  const [grammarDifficulty, setGrammarDifficulty] = useState<GrammarDifficulty>('easy');
  const [chainLength, setChainLength] = useState<ChainLength | null>(null);

  const state: ConfigState = {
    selectedType, selectedLevels, itemsPerLevel, showFeedback,
    selectedSentenceTypes, selectedDifficulties, selectedCollocationTypes,
    translationDirection, selectedPassageTopics, selectedVerbTenses,
    selectedVerbForms, selectedVerbTypes, selectedClozeTypes, selectedGrammaticalRoles,
    selectedDerivationTypes, selectedMorphComponents, selectedArabicVerbForms,
    selectedIdiomCategories, selectedQuranicCategories, selectedRelationTypes,
    selectedNegationParticles, selectedPrepositions, selectedQuestionWords,
    selectedRelativePronouns, selectedSpellingRules, selectedDemonstratives,
    selectedPossessivePronouns,
    selectedQuranicTiers,
    grammarDifficulty,
    chainLength,
  };

  const isQuranicTest = ['quranic_vst', 'ayah_context', 'morph_chain', 'grammar_tag'].includes(selectedType);
  const totalItems =
    selectedType === 'sentence_production'
      ? selectedDifficulties.length * itemsPerLevel
      : isQuranicTest
        ? selectedQuranicTiers.length * itemsPerLevel
        : selectedLevels.length * itemsPerLevel;

  const buildConfig = useCallback((): TestConfig | null => {
    const quranicTypes: TestType[] = ['quranic_vst', 'ayah_context', 'morph_chain', 'grammar_tag'];
    if (selectedType === 'sentence_production') {
      if (selectedDifficulties.length === 0) return null;
    } else if (quranicTypes.includes(selectedType)) {
      if (selectedQuranicTiers.length === 0) return null;
    } else {
      if (selectedLevels.length === 0) return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config: any = {
      type: selectedType,
      levels: selectedLevels,
      itemsPerLevel,
      shuffle: true,
      timeLimit: 0,
      showImmediateFeedback: showFeedback,
    };

    if (selectedType === 'sentence' && selectedSentenceTypes.length > 0) config.sentenceTypes = selectedSentenceTypes;
    if (selectedType === 'sentence_production') config.difficulties = selectedDifficulties;
    if (selectedType === 'collocation' && selectedCollocationTypes.length > 0) config.collocationTypes = selectedCollocationTypes;
    if (selectedType === 'translation') config.translationDirection = translationDirection;
    if (selectedType === 'reading_comprehension' && selectedPassageTopics.length > 0) config.passageTopics = selectedPassageTopics;
    if (selectedType === 'verb_conjugation') {
      if (selectedVerbTenses.length > 0) config.verbTenses = selectedVerbTenses;
      if (selectedVerbForms.length > 0) config.verbForms = selectedVerbForms;
      if (selectedVerbTypes.length > 0) config.verbTypes = selectedVerbTypes;
    }
    if (selectedType === 'cloze' && selectedClozeTypes.length > 0) config.clozeTypes = selectedClozeTypes;
    if (selectedType === 'irab' && selectedGrammaticalRoles.length > 0) config.grammaticalRoles = selectedGrammaticalRoles;
    if (selectedType === 'word_derivation') {
      if (selectedDerivationTypes.length > 0) config.derivationTypes = selectedDerivationTypes;
      if (selectedVerbTypes.length > 0) config.verbTypes = selectedVerbTypes;
    }
    if (selectedType === 'morphological_analysis' && selectedMorphComponents.length > 0) config.morphComponents = selectedMorphComponents;
    if (selectedType === 'verb_form_id') {
      if (selectedArabicVerbForms.length > 0) config.verbFormIdForms = selectedArabicVerbForms;
      if (selectedVerbTypes.length > 0) config.verbTypes = selectedVerbTypes;
    }
    if (selectedType === 'idiomatic' && selectedIdiomCategories.length > 0) config.idiomCategories = selectedIdiomCategories;
    if (selectedType === 'quranic' && selectedQuranicCategories.length > 0) config.quranicCategories = selectedQuranicCategories;
    if (selectedType === 'synonyms_antonyms' && selectedRelationTypes.length > 0) config.relationTypes = selectedRelationTypes;
    if (selectedType === 'negation' && selectedNegationParticles.length > 0) config.negationParticles = selectedNegationParticles;
    if (selectedType === 'preposition' && selectedPrepositions.length > 0) config.prepositions = selectedPrepositions;
    if (selectedType === 'question_words' && selectedQuestionWords.length > 0) config.questionWords = selectedQuestionWords;
    if (selectedType === 'relative_clause' && selectedRelativePronouns.length > 0) config.relativePronouns = selectedRelativePronouns;
    if (selectedType === 'spelling' && selectedSpellingRules.length > 0) config.spellingRules = selectedSpellingRules;
    if (selectedType === 'demonstrative' && selectedDemonstratives.length > 0) config.demonstratives = selectedDemonstratives;
    if (selectedType === 'possessive' && selectedPossessivePronouns.length > 0) config.possessivePronouns = selectedPossessivePronouns;
    if (quranicTypes.includes(selectedType)) {
      config.quranicTiers = selectedQuranicTiers;
      if (selectedType === 'grammar_tag') config.grammarDifficulty = grammarDifficulty;
      if (selectedType === 'morph_chain' && chainLength) config.chainLength = chainLength;
    }

    return config as TestConfig;
  }, [
    selectedType, selectedLevels, itemsPerLevel, showFeedback,
    selectedSentenceTypes, selectedDifficulties, selectedCollocationTypes,
    translationDirection, selectedPassageTopics, selectedVerbTenses,
    selectedVerbForms, selectedVerbTypes, selectedClozeTypes, selectedGrammaticalRoles,
    selectedDerivationTypes, selectedMorphComponents, selectedArabicVerbForms,
    selectedIdiomCategories, selectedQuranicCategories, selectedRelationTypes,
    selectedNegationParticles, selectedPrepositions, selectedQuestionWords,
    selectedRelativePronouns, selectedSpellingRules, selectedDemonstratives,
    selectedPossessivePronouns,
    selectedQuranicTiers, grammarDifficulty, chainLength,
  ]);

  const actions: ConfigActions = {
    setSelectedType,
    setItemsPerLevel,
    setShowFeedback,
    setTranslationDirection,
    toggleLevel: (level) => setSelectedLevels((prev) => toggleItem(prev, level)),
    toggleDifficulty: (d) => setSelectedDifficulties((prev) => toggleItem(prev, d)),
    toggleSentenceType: (t) => setSelectedSentenceTypes((prev) => toggleItem(prev, t)),
    toggleCollocationTypes: (t) => setSelectedCollocationTypes((prev) => toggleItem(prev, t)),
    togglePassageTopic: (t) => setSelectedPassageTopics((prev) => toggleItem(prev, t)),
    toggleVerbTense: (t) => setSelectedVerbTenses((prev) => toggleItem(prev, t)),
    toggleVerbForm: (f) => setSelectedVerbForms((prev) => toggleItem(prev, f)),
    toggleVerbType: (t) => setSelectedVerbTypes((prev) => toggleItem(prev, t)),
    toggleClozeType: (t) => setSelectedClozeTypes((prev) => toggleItem(prev, t)),
    toggleGrammaticalRole: (r) => setSelectedGrammaticalRoles((prev) => toggleItem(prev, r)),
    toggleDerivationType: (t) => setSelectedDerivationTypes((prev) => toggleItem(prev, t)),
    toggleMorphComponent: (c) => setSelectedMorphComponents((prev) => toggleItem(prev, c)),
    toggleArabicVerbForm: (f) => setSelectedArabicVerbForms((prev) => toggleItem(prev, f)),
    toggleIdiomCategory: (c) => setSelectedIdiomCategories((prev) => toggleItem(prev, c)),
    toggleQuranicCategory: (c) => setSelectedQuranicCategories((prev) => toggleItem(prev, c)),
    toggleRelationType: (t) => setSelectedRelationTypes((prev) => toggleItem(prev, t)),
    toggleNegationParticle: (p) => setSelectedNegationParticles((prev) => toggleItem(prev, p)),
    togglePreposition: (p) => setSelectedPrepositions((prev) => toggleItem(prev, p)),
    toggleQuestionWord: (w) => setSelectedQuestionWords((prev) => toggleItem(prev, w)),
    toggleRelativePronoun: (p) => setSelectedRelativePronouns((prev) => toggleItem(prev, p)),
    toggleSpellingRule: (r) => setSelectedSpellingRules((prev) => toggleItem(prev, r)),
    toggleDemonstrative: (d) => setSelectedDemonstratives((prev) => toggleItem(prev, d)),
    togglePossessivePronoun: (p) => setSelectedPossessivePronouns((prev) => toggleItem(prev, p)),
    toggleQuranicTier: (t) => setSelectedQuranicTiers((prev) => toggleItem(prev, t)),
    setGrammarDifficulty,
    setChainLength,
    buildConfig,
    totalItems,
  };

  return [state, actions];
}
