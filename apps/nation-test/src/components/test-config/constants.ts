import type { TestType, FrequencyLevel, QuranicFrequencyTier } from '../../types';
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
import {
  BookOpen, CheckSquare, PenTool, Layers, MessageSquare, Edit3, Link2, GitBranch, Languages,
  FileText, RefreshCw, TextCursorInput, Type, Scale, Workflow, Puzzle, Hash, Quote, Users,
  BookMarked, ArrowLeftRight, Ban, Link as LinkIcon, HelpCircle, SpellCheck, Pointer, UserCircle,
  Star, TextSearch, GitMerge, Tags,
} from 'lucide-react';
import { createElement } from 'react';

// ── Test type definitions ──────────────────────────────────────────

export interface TestTypeInfo {
  type: TestType;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export const testTypes: TestTypeInfo[] = [
  { type: 'vst', name: 'Vocabulary Size Test', description: "Estimate your total Arabic vocabulary size. Based on Nation's VST methodology.", icon: createElement(Layers, { className: 'w-5 h-5' }) },
  { type: 'vlt', name: 'Vocabulary Levels Test', description: 'Test your knowledge at specific frequency levels (1K, 2K, etc.).', icon: createElement(BookOpen, { className: 'w-5 h-5' }) },
  { type: 'yesno', name: 'Yes/No Test', description: 'Quick assessment - indicate if you know each word. Includes pseudowords to control for guessing.', icon: createElement(CheckSquare, { className: 'w-5 h-5' }) },
  { type: 'productive', name: 'Productive Test', description: 'Test your ability to recall and produce words from definitions.', icon: createElement(PenTool, { className: 'w-5 h-5' }) },
  { type: 'sentence', name: 'Sentence Comprehension', description: 'Test vocabulary and grammar in context. Includes conditionals, questions, negatives, and more.', icon: createElement(MessageSquare, { className: 'w-5 h-5' }) },
  { type: 'sentence_production', name: 'Sentence Production', description: 'Write Arabic sentences with adverbs, conditions, temporal clauses. Progressive difficulty.', icon: createElement(Edit3, { className: 'w-5 h-5' }) },
  { type: 'collocation', name: 'Collocation Test', description: 'Test knowledge of natural word combinations. Which words go together in Arabic?', icon: createElement(Link2, { className: 'w-5 h-5' }) },
  { type: 'root_pattern', name: 'Root-Pattern Recognition', description: 'Identify which words derive from a common Arabic root. Test morphological awareness.', icon: createElement(GitBranch, { className: 'w-5 h-5' }) },
  { type: 'translation', name: 'Translation Test', description: 'Translate between Arabic and English. Bidirectional with multiple difficulty levels.', icon: createElement(Languages, { className: 'w-5 h-5' }) },
  { type: 'reading_comprehension', name: 'Reading Comprehension', description: 'Test understanding of longer Arabic passages with multiple questions per passage.', icon: createElement(FileText, { className: 'w-5 h-5' }) },
  { type: 'verb_conjugation', name: 'Verb Conjugation', description: 'Conjugate Arabic verbs across tenses, persons, and forms. Test mastery.', icon: createElement(RefreshCw, { className: 'w-5 h-5' }) },
  { type: 'cloze', name: 'Cloze Test', description: 'Fill in the missing word in context. Tests vocabulary, grammar, and collocations.', icon: createElement(TextCursorInput, { className: 'w-5 h-5' }) },
  { type: 'diacritics', name: 'Diacritics Test', description: 'Add correct tashkeel to unvocalized Arabic text. Test pronunciation knowledge.', icon: createElement(Type, { className: 'w-5 h-5' }) },
  { type: 'irab', name: "I'rab (Case Endings)", description: 'Choose correct case endings based on grammatical role. Test mastery.', icon: createElement(Scale, { className: 'w-5 h-5' }) },
  { type: 'word_derivation', name: 'Word Derivation', description: 'Derive words from roots: participles, verbal nouns, place nouns.', icon: createElement(Workflow, { className: 'w-5 h-5' }) },
  { type: 'morphological_analysis', name: 'Morphological Analysis', description: 'Break down Arabic words into root, pattern, and affixes.', icon: createElement(Puzzle, { className: 'w-5 h-5' }) },
  { type: 'verb_form_id', name: 'Verb Form Identification', description: 'Identify verb forms (I-X) from conjugated verbs.', icon: createElement(Hash, { className: 'w-5 h-5' }) },
  { type: 'idiomatic', name: 'Idiomatic Expressions', description: 'Learn Arabic idioms and proverbs. Match expressions to meanings.', icon: createElement(Quote, { className: 'w-5 h-5' }) },
  { type: 'word_family', name: 'Word Families', description: 'Group words by their shared root. Identify all family members.', icon: createElement(Users, { className: 'w-5 h-5' }) },
  { type: 'quranic', name: 'Quranic Vocabulary', description: 'Learn vocabulary from the Quran and classical texts.', icon: createElement(BookMarked, { className: 'w-5 h-5' }) },
  { type: 'synonyms_antonyms', name: 'Synonyms & Antonyms', description: 'Find words with similar or opposite meanings.', icon: createElement(ArrowLeftRight, { className: 'w-5 h-5' }) },
  { type: 'negation', name: 'Negation Patterns', description: 'Master Arabic negation particles and their usage.', icon: createElement(Ban, { className: 'w-5 h-5' }) },
  { type: 'preposition', name: 'Preposition Usage', description: 'Learn which preposition goes with which verb.', icon: createElement(LinkIcon, { className: 'w-5 h-5' }) },
  { type: 'question_words', name: 'Question Words', description: 'Master Arabic interrogatives.', icon: createElement(HelpCircle, { className: 'w-5 h-5' }) },
  { type: 'relative_clause', name: 'Relative Clauses', description: 'Master Arabic relative pronouns.', icon: createElement(Link2, { className: 'w-5 h-5' }) },
  { type: 'spelling', name: 'Spelling/Orthography', description: 'Test Arabic spelling rules and orthography.', icon: createElement(SpellCheck, { className: 'w-5 h-5' }) },
  { type: 'demonstrative', name: 'Demonstratives', description: 'Master Arabic demonstrative pronouns.', icon: createElement(Pointer, { className: 'w-5 h-5' }) },
  { type: 'possessive', name: 'Possessive Pronouns', description: 'Master attached pronouns - Arabic possessives.', icon: createElement(UserCircle, { className: 'w-5 h-5' }) },
  { type: 'quranic_vst', name: 'Quranic Frequency VST', description: 'Vocabulary test using 4,784 Quranic lemmas with real frequency data.', icon: createElement(Star, { className: 'w-5 h-5' }) },
  { type: 'ayah_context', name: 'Ayah Context Cloze', description: 'Fill in blanked English translation for a highlighted Quranic word.', icon: createElement(TextSearch, { className: 'w-5 h-5' }) },
  { type: 'morph_chain', name: 'Morphological Chain', description: 'Trace step-by-step word derivation from root to final Quranic form.', icon: createElement(GitMerge, { className: 'w-5 h-5' }) },
  { type: 'grammar_tag', name: 'Grammar Tag ID', description: 'Identify the grammatical role of a highlighted word in its ayah.', icon: createElement(Tags, { className: 'w-5 h-5' }) },
];

// ── Category definitions ───────────────────────────────────────────

export interface CategoryDef {
  id: string;
  name: string;
  description: string;
  types: TestType[];
}

export const categories: CategoryDef[] = [
  {
    id: 'receptive',
    name: 'Receptive Knowledge',
    description: 'Recognize and understand vocabulary',
    types: ['vst', 'vlt', 'translation'],
  },
  {
    id: 'productive',
    name: 'Productive Knowledge',
    description: 'Recall and produce vocabulary',
    types: ['productive', 'sentence_production', 'cloze'],
  },
  {
    id: 'yesno',
    name: 'Yes/No Recognition',
    description: 'Quick word recognition assessment',
    types: ['yesno'],
  },
  {
    id: 'morphology',
    name: 'Form & Morphology',
    description: 'Roots, patterns, conjugation, and grammar',
    types: ['root_pattern', 'verb_conjugation', 'verb_form_id', 'word_derivation', 'morphological_analysis', 'diacritics', 'irab'],
  },
  {
    id: 'advanced',
    name: 'Advanced / Mixed',
    description: 'Sentences, collocations, and specialized tests',
    types: ['sentence', 'collocation', 'reading_comprehension', 'idiomatic', 'word_family', 'quranic', 'synonyms_antonyms', 'negation', 'preposition', 'question_words', 'relative_clause', 'spelling', 'demonstrative', 'possessive'],
  },
  {
    id: 'quranic_tests',
    name: 'Quranic',
    description: 'Tests powered by real Quranic data',
    types: ['quranic_vst', 'ayah_context', 'morph_chain', 'grammar_tag'],
  },
];

// ── Frequency levels ───────────────────────────────────────────────

export const frequencyLevels: { level: FrequencyLevel; name: string; words: string }[] = [
  { level: '1k', name: '1K', words: 'Most frequent 1000 word families' },
  { level: '2k', name: '2K', words: 'Second most frequent 1000' },
  { level: '3k', name: '3K', words: 'Third most frequent 1000' },
  { level: '5k', name: '5K', words: 'Word families 3001-5000' },
  { level: '10k', name: '10K', words: 'Word families 5001-10000' },
];

// ── Sub-filter value arrays ────────────────────────────────────────

export const allSentenceTypes: SentenceType[] = ['declarative', 'interrogative', 'conditional', 'negative', 'imperative', 'comparative', 'temporal', 'causal'];
export const allDifficulties: SentenceDifficulty[] = ['beginner', 'intermediate', 'advanced'];
export const allCollocationTypes: CollocationType[] = ['verb_noun', 'adj_noun', 'verb_prep', 'adv_verb'];
export const translationDirections: { value: TranslationDirection | 'mixed'; label: string; description: string }[] = [
  { value: 'mixed', label: 'Mixed', description: 'Random direction for each question' },
  { value: 'ar_to_en', label: 'Arabic \u2192 English', description: 'Multiple choice' },
  { value: 'en_to_ar', label: 'English \u2192 Arabic', description: 'Type your answer' },
];
export const allPassageTopics: PassageTopic[] = ['daily_life', 'islamic', 'news', 'story', 'academic'];
export const allVerbTenses: VerbTense[] = ['past', 'present', 'future', 'imperative'];
export const allVerbForms: VerbForm[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
export const allVerbTypes: VerbType[] = ['sound', 'hollow', 'defective', 'assimilated', 'doubled', 'hamzated', 'doubly_weak'];
export const allClozeTypes: ClozeType[] = ['vocabulary', 'grammar', 'collocation'];
export const allGrammaticalRoles: GrammaticalRole[] = ['subject', 'predicate', 'object', 'genitive', 'idafa', 'kana_predicate', 'inna_subject', 'hal', 'tamyiz'];
export const allDerivationTypes: DerivationType[] = ['active_participle', 'passive_participle', 'verbal_noun', 'place_noun', 'instrument_noun', 'intensive', 'comparative'];
export const allMorphComponents: MorphComponent[] = ['root', 'pattern', 'prefix', 'suffix'];
export const allArabicVerbForms: ArabicVerbForm[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
export const allIdiomCategories: IdiomCategory[] = ['body_parts', 'animals', 'nature', 'actions', 'emotions', 'religious', 'proverbs'];
export const allQuranicCategories: QuranicCategory[] = ['divine_names', 'worship', 'afterlife', 'prophets', 'morality', 'creation', 'legal', 'spiritual'];
export const allRelationTypes: RelationType[] = ['synonym', 'antonym'];
export const allNegationParticles: NegationParticle[] = ['la', 'ma', 'lam', 'lan', 'laysa', 'lamma'];
export const allArabicPrepositions: ArabicPreposition[] = ['bi', 'li', 'fi', 'min', 'ila', 'ala', 'an', 'maa', 'mundhu', 'hatta'];
export const allQuestionWords: QuestionWord[] = ['man', 'ma', 'madha', 'ayna', 'mata', 'kayfa', 'limadha', 'kam', 'ayy', 'hal'];
export const allRelativePronouns: RelativePronoun[] = ['alladhi', 'allati', 'alladhani', 'allatani', 'alladhina', 'allati_pl', 'ma'];
export const allSpellingRules: SpellingRule[] = ['alif_maqsura', 'ta_marbuta', 'hamza_wasl', 'hamza_qat', 'alif_hamza', 'double_letters'];
export const allDemonstratives: Demonstrative[] = ['hadha', 'hadhihi', 'hadhani', 'hatani', 'haula', 'dhalika', 'tilka', 'dhanika', 'tanika', 'ulaika'];
export const allPossessivePronouns: PossessivePronoun[] = ['i', 'ka', 'ki', 'hu', 'ha', 'na', 'kum', 'kunna', 'hum', 'hunna', 'kuma', 'huma'];

// Quranic test sub-filters
export const quranicFrequencyTiers: { tier: QuranicFrequencyTier; name: string; desc: string }[] = [
  { tier: 'q100', name: 'Top 100', desc: '~51% Quran coverage' },
  { tier: 'q300', name: 'Top 300', desc: '~71% coverage' },
  { tier: 'q600', name: 'Top 600', desc: '~83% coverage' },
  { tier: 'q1000', name: 'Top 1000', desc: '~91% coverage' },
  { tier: 'q_all', name: 'All', desc: '100% (4,784 lemmas)' },
];

export type GrammarDifficulty = 'easy' | 'medium' | 'hard';
export const grammarDifficulties: { value: GrammarDifficulty; name: string; desc: string }[] = [
  { value: 'easy', name: 'Easy', desc: 'POS only (Noun/Verb/Particle)' },
  { value: 'medium', name: 'Medium', desc: 'Case (nominative/accusative/genitive)' },
  { value: 'hard', name: 'Hard', desc: 'Full tag (case + gender + number + state)' },
];

export type ChainLength = 'short' | 'medium' | 'long';
export const chainLengths: { value: ChainLength; name: string; desc: string }[] = [
  { value: 'short', name: 'Short', desc: '2-3 steps' },
  { value: 'medium', name: 'Medium', desc: '4-5 steps' },
  { value: 'long', name: 'Long', desc: '6+ steps' },
];

// ── Preset definitions ─────────────────────────────────────────────

export interface PresetDef {
  id: string;
  name: string;
  description: string;
  config: Partial<import('../../types').TestConfig> & {
    type: TestType;
    sentenceTypes?: SentenceType[];
    difficulties?: SentenceDifficulty[];
    collocationTypes?: CollocationType[];
    translationDirection?: TranslationDirection | 'mixed';
  };
}

export const presets: PresetDef[] = [
  {
    id: 'quick',
    name: 'Quick Assessment',
    description: '20 items, MC + Yes/No, mixed levels',
    config: {
      type: 'vst',
      levels: ['1k', '2k', '3k', '5k'] as FrequencyLevel[],
      itemsPerLevel: 5,
      shuffle: true,
      timeLimit: 0,
      showImmediateFeedback: true,
    },
  },
  {
    id: 'vst-classic',
    name: 'Vocabulary Size Test',
    description: 'Classic VST, 5 items per level, all levels',
    config: {
      type: 'vst',
      levels: ['1k', '2k', '3k', '5k', '10k'] as FrequencyLevel[],
      itemsPerLevel: 5,
      shuffle: true,
      timeLimit: 0,
      showImmediateFeedback: false,
    },
  },
  {
    id: 'productive',
    name: 'Productive Check',
    description: 'Translation + productive, 30 items',
    config: {
      type: 'productive',
      levels: ['1k', '2k', '3k', '5k', '10k'] as FrequencyLevel[],
      itemsPerLevel: 6,
      shuffle: true,
      timeLimit: 0,
      showImmediateFeedback: true,
    },
  },
  {
    id: 'morphology',
    name: 'Form & Root Drill',
    description: 'Root patterns + verb forms, 25 items',
    config: {
      type: 'root_pattern',
      levels: ['1k', '2k', '3k', '5k', '10k'] as FrequencyLevel[],
      itemsPerLevel: 5,
      shuffle: true,
      timeLimit: 0,
      showImmediateFeedback: true,
    },
  },
  {
    id: 'full-battery',
    name: 'Full Battery',
    description: 'All levels, 10 items each',
    config: {
      type: 'vst',
      levels: ['1k', '2k', '3k', '5k', '10k'] as FrequencyLevel[],
      itemsPerLevel: 10,
      shuffle: true,
      timeLimit: 0,
      showImmediateFeedback: false,
    },
  },
];
