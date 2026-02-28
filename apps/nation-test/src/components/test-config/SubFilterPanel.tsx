import { cn } from '@arabtools/ui';
import type { TestType } from '../../types';
import type { ConfigState, ConfigActions } from './useTestConfig';
import { frequencyLevels, allSentenceTypes, allDifficulties, allCollocationTypes, translationDirections, allPassageTopics, allVerbTenses, allVerbForms, allVerbTypes, allClozeTypes, allGrammaticalRoles, allDerivationTypes, allMorphComponents, allArabicVerbForms, allIdiomCategories, allQuranicCategories, allRelationTypes, allNegationParticles, allArabicPrepositions, allQuestionWords, allRelativePronouns, allSpellingRules, allDemonstratives, allPossessivePronouns, quranicFrequencyTiers, grammarDifficulties, chainLengths } from './constants';
import { sentenceTypeLabels } from '../../data/sentences';
import { difficultyLabels } from '../../data/sentenceProduction';
import { collocationTypeLabels } from '../../data/collocations';
import { topicLabels } from '../../data/readingComprehension';
import { tenseLabels, formLabels } from '../../data/verbConjugation';
import { verbTypeLabels } from '../../data/verbTypes';
import { clozeTypeLabels } from '../../data/clozeTest';
import { roleLabels } from '../../data/irabTest';
import { derivationTypeLabels } from '../../data/wordDerivation';
import { morphComponentLabels } from '../../data/morphologicalAnalysis';
import { verbFormLabels } from '../../data/verbFormId';
import { idiomCategoryLabels } from '../../data/idiomaticExpressions';
import { quranicCategoryLabels } from '../../data/quranicVocabulary';
import { relationTypeLabels } from '../../data/synonymsAntonyms';
import { negationParticleLabels } from '../../data/negationPatterns';
import { prepositionLabels } from '../../data/prepositionUsage';
import { questionWordLabels } from '../../data/questionWords';
import { relativePronounLabels } from '../../data/relativeClauses';
import { spellingRuleLabels } from '../../data/spellingOrthography';
import { demonstrativeLabels } from '../../data/demonstratives';
import { possessivePronounLabels } from '../../data/possessivePronouns';

interface SubFilterPanelProps {
  state: ConfigState;
  actions: ConfigActions;
}

// Generic toggle button with bilingual label
function FilterButton({ selected, onClick, english, arabic, colorClass }: {
  selected: boolean;
  onClick: () => void;
  english: string;
  arabic?: string;
  colorClass?: string;
}) {
  const activeClass = colorClass || 'border-primary bg-primary/10 text-primary';
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-2 rounded-xl border text-sm transition-all',
        selected ? activeClass : 'border-border hover:border-primary/50 bg-white/60'
      )}
    >
      <div className="font-medium">{english}</div>
      {arabic && <div className="text-xs font-arabic opacity-70" dir="rtl">{arabic}</div>}
    </button>
  );
}

// Arabic-primary button (larger Arabic text, smaller English)
function ArabicFilterButton({ selected, onClick, arabic, subtext, colorClass }: {
  selected: boolean;
  onClick: () => void;
  arabic: string;
  subtext?: string;
  colorClass?: string;
}) {
  const activeClass = colorClass || 'border-primary bg-primary/10 text-primary';
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-2 rounded-xl border text-center transition-all',
        selected ? activeClass : 'border-border hover:border-primary/50 bg-white/60'
      )}
    >
      <div className="text-xl font-arabic" dir="rtl">{arabic}</div>
      {subtext && <div className="text-xs text-muted-foreground">{subtext}</div>}
    </button>
  );
}

function InfoBox({ children, colorClass }: { children: React.ReactNode; colorClass?: string }) {
  return (
    <div className={cn('p-3 rounded-xl text-xs text-muted-foreground', colorClass || 'bg-muted/50')}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-serif text-primary">{children}</h3>;
}

function SectionDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

export function SubFilterPanel({ state, actions }: SubFilterPanelProps) {
  const { selectedType } = state;
  const isQuranicTest = ['quranic_vst', 'ayah_context', 'morph_chain', 'grammar_tag'].includes(selectedType);

  return (
    <div className="space-y-6">
      {/* Quranic Frequency Tiers (for quranic tests) */}
      {isQuranicTest ? (
        <div className="space-y-3">
          <SectionTitle>Quranic Frequency Tiers</SectionTitle>
          <SectionDescription>Select which frequency tiers to include</SectionDescription>
          <div className="flex flex-wrap gap-3">
            {quranicFrequencyTiers.map((tier) => (
              <button
                key={tier.tier}
                onClick={() => actions.toggleQuranicTier(tier.tier)}
                className={cn(
                  'px-4 py-2 rounded-xl border-2 transition-all',
                  state.selectedQuranicTiers.includes(tier.tier)
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-border hover:border-emerald-400/50'
                )}
              >
                <div className="font-semibold">{tier.name}</div>
                <div className="text-xs opacity-80">{tier.desc}</div>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {state.selectedQuranicTiers.length === 0
              ? 'Please select at least one tier'
              : `Selected: ${state.selectedQuranicTiers.map(t => quranicFrequencyTiers.find(q => q.tier === t)?.name).join(', ')}`}
          </p>
        </div>
      ) : (
        /* Frequency Levels (for non-quranic tests) */
        <div className="space-y-3">
          <SectionTitle>Frequency Levels</SectionTitle>
          <SectionDescription>Select which frequency bands to include</SectionDescription>
          <div className="flex flex-wrap gap-3">
            {frequencyLevels.map((level) => (
              <button
                key={level.level}
                onClick={() => actions.toggleLevel(level.level)}
                className={cn(
                  'px-4 py-2 rounded-xl border-2 transition-all',
                  state.selectedLevels.includes(level.level)
                    ? 'border-primary bg-primary text-white'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <span className="font-semibold">{level.name}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {state.selectedLevels.length === 0
              ? 'Please select at least one level'
              : `Selected: ${[...state.selectedLevels].sort().join(', ')}`}
          </p>
        </div>
      )}

      {/* Type-specific filters */}
      {renderTypeFilters(selectedType, state, actions)}

      {/* Items per level */}
      <div className="space-y-3">
        <SectionTitle>
          {selectedType === 'sentence_production' ? 'Items per Difficulty' : 'Items per Level'}
        </SectionTitle>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="3"
            max="15"
            value={state.itemsPerLevel}
            onChange={(e) => actions.setItemsPerLevel(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <span className="w-12 text-center font-semibold">{state.itemsPerLevel}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Total items: <strong>{actions.totalItems}</strong>
          {selectedType === 'yesno' && ' (including pseudowords)'}
        </p>
      </div>

      {/* Feedback option */}
      <div className="space-y-3">
        <SectionTitle>Options</SectionTitle>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={state.showFeedback}
            onChange={(e) => actions.setShowFeedback(e.target.checked)}
            className="w-5 h-5 rounded border-border accent-primary"
          />
          <span>Show feedback after each question</span>
        </label>
      </div>
    </div>
  );
}

function renderTypeFilters(type: TestType, state: ConfigState, actions: ConfigActions) {
  switch (type) {
    case 'sentence':
      return (
        <div className="space-y-3">
          <SectionTitle>Sentence Types</SectionTitle>
          <SectionDescription>Select grammatical structures (leave empty for all)</SectionDescription>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allSentenceTypes.map((t) => (
              <FilterButton
                key={t}
                selected={state.selectedSentenceTypes.includes(t)}
                onClick={() => actions.toggleSentenceType(t)}
                english={sentenceTypeLabels[t].english}
                arabic={sentenceTypeLabels[t].arabic}
                colorClass="border-accent bg-accent/10 text-accent-foreground"
              />
            ))}
          </div>
          {state.selectedSentenceTypes.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Selected: {state.selectedSentenceTypes.map((t) => sentenceTypeLabels[t].english).join(', ')}
            </p>
          )}
        </div>
      );

    case 'sentence_production':
      return (
        <div className="space-y-3">
          <SectionTitle>Difficulty Levels</SectionTitle>
          <SectionDescription>Sentences become progressively more complex</SectionDescription>
          <div className="grid grid-cols-3 gap-3">
            {allDifficulties.map((d) => (
              <FilterButton
                key={d}
                selected={state.selectedDifficulties.includes(d)}
                onClick={() => actions.toggleDifficulty(d)}
                english={difficultyLabels[d].english}
                arabic={difficultyLabels[d].arabic}
                colorClass={
                  d === 'beginner'
                    ? 'border-green-500 bg-green-100 text-green-800'
                    : d === 'intermediate'
                      ? 'border-amber-500 bg-amber-100 text-amber-800'
                      : 'border-red-500 bg-red-100 text-red-800'
                }
              />
            ))}
          </div>
          {state.selectedDifficulties.length === 0 && (
            <p className="text-xs text-muted-foreground">Please select at least one difficulty</p>
          )}
          <InfoBox>
            <strong>Beginner:</strong> Simple sentences with adverbs of time, manner, place<br />
            <strong>Intermediate:</strong> Conditionals, temporal clauses<br />
            <strong>Advanced:</strong> Unreal conditions, concessive clauses, relative clauses
          </InfoBox>
        </div>
      );

    case 'collocation':
      return (
        <div className="space-y-3">
          <SectionTitle>Collocation Types</SectionTitle>
          <SectionDescription>Select collocation patterns (leave empty for all)</SectionDescription>
          <div className="grid grid-cols-2 gap-3">
            {allCollocationTypes.map((t) => (
              <FilterButton
                key={t}
                selected={state.selectedCollocationTypes.includes(t)}
                onClick={() => actions.toggleCollocationTypes(t)}
                english={collocationTypeLabels[t].english}
                arabic={collocationTypeLabels[t].arabic}
                colorClass="border-accent bg-accent/10 text-accent-foreground"
              />
            ))}
          </div>
        </div>
      );

    case 'translation':
      return (
        <div className="space-y-3">
          <SectionTitle>Translation Direction</SectionTitle>
          <SectionDescription>Choose which direction(s) to translate</SectionDescription>
          <div className="grid grid-cols-3 gap-3">
            {translationDirections.map((dir) => (
              <button
                key={dir.value}
                onClick={() => actions.setTranslationDirection(dir.value)}
                className={cn(
                  'px-4 py-3 rounded-xl border-2 text-center transition-all',
                  state.translationDirection === dir.value
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <div className="font-semibold">{dir.label}</div>
                <div className="text-xs text-muted-foreground">{dir.description}</div>
              </button>
            ))}
          </div>
        </div>
      );

    case 'reading_comprehension':
      return (
        <div className="space-y-3">
          <SectionTitle>Passage Topics</SectionTitle>
          <SectionDescription>Select topics (leave empty for all)</SectionDescription>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {allPassageTopics.map((t) => (
              <FilterButton
                key={t}
                selected={state.selectedPassageTopics.includes(t)}
                onClick={() => actions.togglePassageTopic(t)}
                english={topicLabels[t].english}
                arabic={topicLabels[t].arabic}
                colorClass="border-accent bg-accent/10 text-accent-foreground"
              />
            ))}
          </div>
          <InfoBox>
            <strong>Note:</strong> Reading comprehension tests include longer passages (80-300 words) with 3-5 questions each.
          </InfoBox>
        </div>
      );

    case 'verb_conjugation':
      return (
        <div className="space-y-6">
          <div className="space-y-3">
            <SectionTitle>Verb Tenses</SectionTitle>
            <SectionDescription>Select tenses (leave empty for all)</SectionDescription>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {allVerbTenses.map((t) => (
                <FilterButton
                  key={t}
                  selected={state.selectedVerbTenses.includes(t)}
                  onClick={() => actions.toggleVerbTense(t)}
                  english={tenseLabels[t].english}
                  arabic={tenseLabels[t].arabic}
                />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <SectionTitle>Verb Forms</SectionTitle>
            <SectionDescription>Select forms (leave empty for all)</SectionDescription>
            <div className="grid grid-cols-5 gap-2">
              {allVerbForms.map((f) => (
                <FilterButton
                  key={f}
                  selected={state.selectedVerbForms.includes(f)}
                  onClick={() => actions.toggleVerbForm(f)}
                  english={f}
                  arabic={formLabels[f].arabic}
                  colorClass="border-accent bg-accent/10 text-accent-foreground"
                />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <SectionTitle>Verb Type</SectionTitle>
            <SectionDescription>Filter by root type (leave empty for all)</SectionDescription>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {allVerbTypes.map((t) => (
                <FilterButton
                  key={t}
                  selected={state.selectedVerbTypes.includes(t)}
                  onClick={() => actions.toggleVerbType(t)}
                  english={verbTypeLabels[t].english}
                  arabic={verbTypeLabels[t].arabic}
                  colorClass="border-rose-500 bg-rose-100 text-rose-800"
                />
              ))}
            </div>
          </div>
          <InfoBox>
            <strong>Sound:</strong> Regular roots | <strong>Hollow:</strong> Weak middle letter |
            <strong> Defective:</strong> Weak final letter | <strong>Assimilated:</strong> Weak first letter |
            <strong> Doubled:</strong> 2nd=3rd radical | <strong>Hamzated:</strong> Has hamza |
            <strong> Doubly weak:</strong> Two weak letters
          </InfoBox>
        </div>
      );

    case 'cloze':
      return (
        <div className="space-y-3">
          <SectionTitle>Cloze Types</SectionTitle>
          <SectionDescription>Select types of blanks (leave empty for all)</SectionDescription>
          <div className="grid grid-cols-3 gap-3">
            {allClozeTypes.map((t) => (
              <FilterButton
                key={t}
                selected={state.selectedClozeTypes.includes(t)}
                onClick={() => actions.toggleClozeType(t)}
                english={clozeTypeLabels[t].english}
                arabic={clozeTypeLabels[t].arabic}
              />
            ))}
          </div>
          <InfoBox>
            <strong>Vocabulary:</strong> Missing content words<br />
            <strong>Grammar:</strong> Correct grammatical forms<br />
            <strong>Collocation:</strong> Natural word combinations
          </InfoBox>
        </div>
      );

    case 'irab':
      return (
        <div className="space-y-3">
          <SectionTitle>Grammatical Roles</SectionTitle>
          <SectionDescription>Select roles (leave empty for all)</SectionDescription>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {allGrammaticalRoles.map((r) => (
              <FilterButton
                key={r}
                selected={state.selectedGrammaticalRoles.includes(r)}
                onClick={() => actions.toggleGrammaticalRole(r)}
                english={roleLabels[r].english}
                arabic={roleLabels[r].arabic}
              />
            ))}
          </div>
          <InfoBox>
            <strong>Note:</strong> I'rab tests focus on choosing the correct case ending based on grammatical function.
          </InfoBox>
        </div>
      );

    case 'word_derivation':
      return (
        <div className="space-y-6">
          <div className="space-y-3">
            <SectionTitle>Derivation Types</SectionTitle>
            <SectionDescription>Select derivation patterns (leave empty for all)</SectionDescription>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {allDerivationTypes.map((t) => (
                <FilterButton
                  key={t}
                  selected={state.selectedDerivationTypes.includes(t)}
                  onClick={() => actions.toggleDerivationType(t)}
                  english={derivationTypeLabels[t].english}
                  arabic={derivationTypeLabels[t].arabic}
                  colorClass="border-accent bg-accent/10 text-accent-foreground"
                />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <SectionTitle>Verb Type</SectionTitle>
            <SectionDescription>Filter by root type (leave empty for all)</SectionDescription>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {allVerbTypes.map((t) => (
                <FilterButton
                  key={t}
                  selected={state.selectedVerbTypes.includes(t)}
                  onClick={() => actions.toggleVerbType(t)}
                  english={verbTypeLabels[t].english}
                  arabic={verbTypeLabels[t].arabic}
                  colorClass="border-rose-500 bg-rose-100 text-rose-800"
                />
              ))}
            </div>
          </div>
        </div>
      );

    case 'morphological_analysis':
      return (
        <div className="space-y-3">
          <SectionTitle>Component Types</SectionTitle>
          <SectionDescription>Select morphological components (leave empty for all)</SectionDescription>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allMorphComponents.map((c) => (
              <FilterButton
                key={c}
                selected={state.selectedMorphComponents.includes(c)}
                onClick={() => actions.toggleMorphComponent(c)}
                english={morphComponentLabels[c].english}
                arabic={morphComponentLabels[c].arabic}
              />
            ))}
          </div>
        </div>
      );

    case 'verb_form_id':
      return (
        <div className="space-y-3">
          <SectionTitle>Verb Forms</SectionTitle>
          <SectionDescription>Select verb forms (leave empty for all)</SectionDescription>
          <div className="grid grid-cols-5 gap-2">
            {allArabicVerbForms.map((f) => (
              <FilterButton
                key={f}
                selected={state.selectedArabicVerbForms.includes(f)}
                onClick={() => actions.toggleArabicVerbForm(f)}
                english={f}
                arabic={verbFormLabels[f].arabic}
                colorClass="border-accent bg-accent/10 text-accent-foreground"
              />
            ))}
          </div>
          <div className="space-y-3">
            <SectionTitle>Verb Type</SectionTitle>
            <SectionDescription>Filter by root type (leave empty for all)</SectionDescription>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {allVerbTypes.map((t) => (
                <FilterButton
                  key={t}
                  selected={state.selectedVerbTypes.includes(t)}
                  onClick={() => actions.toggleVerbType(t)}
                  english={verbTypeLabels[t].english}
                  arabic={verbTypeLabels[t].arabic}
                  colorClass="border-rose-500 bg-rose-100 text-rose-800"
                />
              ))}
            </div>
          </div>
          <InfoBox>
            <strong>Note:</strong> Arabic has 10 verb forms (I-X), each with distinct patterns and meanings. Filter by verb type to focus on weak verb patterns.
          </InfoBox>
        </div>
      );

    case 'idiomatic':
      return (
        <div className="space-y-3">
          <SectionTitle>Idiom Categories</SectionTitle>
          <SectionDescription>Select categories (leave empty for all)</SectionDescription>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {allIdiomCategories.map((c) => (
              <FilterButton
                key={c}
                selected={state.selectedIdiomCategories.includes(c)}
                onClick={() => actions.toggleIdiomCategory(c)}
                english={idiomCategoryLabels[c].english}
                arabic={idiomCategoryLabels[c].arabic}
                colorClass="border-accent bg-accent/10 text-accent-foreground"
              />
            ))}
          </div>
        </div>
      );

    case 'quranic':
      return (
        <div className="space-y-3">
          <SectionTitle>Quranic Categories</SectionTitle>
          <SectionDescription>Select categories (leave empty for all)</SectionDescription>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allQuranicCategories.map((c) => (
              <FilterButton
                key={c}
                selected={state.selectedQuranicCategories.includes(c)}
                onClick={() => actions.toggleQuranicCategory(c)}
                english={quranicCategoryLabels[c].english}
                arabic={quranicCategoryLabels[c].arabic}
                colorClass="border-emerald-500 bg-emerald-100 text-emerald-800"
              />
            ))}
          </div>
          <InfoBox colorClass="bg-emerald-50">
            <strong>Note:</strong> Quranic vocabulary tests include terms from the Quran, hadith, and classical texts.
          </InfoBox>
        </div>
      );

    case 'synonyms_antonyms':
      return (
        <div className="space-y-3">
          <SectionTitle>Relation Types</SectionTitle>
          <SectionDescription>Select types (leave empty for both)</SectionDescription>
          <div className="grid grid-cols-2 gap-3">
            {allRelationTypes.map((t) => (
              <FilterButton
                key={t}
                selected={state.selectedRelationTypes.includes(t)}
                onClick={() => actions.toggleRelationType(t)}
                english={relationTypeLabels[t].english}
                arabic={relationTypeLabels[t].arabic}
                colorClass={t === 'synonym'
                  ? 'border-blue-500 bg-blue-100 text-blue-800'
                  : 'border-orange-500 bg-orange-100 text-orange-800'
                }
              />
            ))}
          </div>
          <InfoBox>
            <strong>Synonyms:</strong> Words with similar meanings<br />
            <strong>Antonyms:</strong> Words with opposite meanings
          </InfoBox>
        </div>
      );

    case 'negation':
      return (
        <div className="space-y-3">
          <SectionTitle>Negation Particles</SectionTitle>
          <SectionDescription>Select particles (leave empty for all)</SectionDescription>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {allNegationParticles.map((p) => (
              <ArabicFilterButton
                key={p}
                selected={state.selectedNegationParticles.includes(p)}
                onClick={() => actions.toggleNegationParticle(p)}
                arabic={negationParticleLabels[p].arabic}
                colorClass="border-red-500 bg-red-100 text-red-800"
              />
            ))}
          </div>
          <InfoBox colorClass="bg-red-50">
            <strong>لا:</strong> Present tense | <strong>لم:</strong> Past (jussive) |
            <strong> لن:</strong> Future | <strong>ليس:</strong> Nominal |
            <strong> ما:</strong> Classical past | <strong>لمّا:</strong> "Not yet"
          </InfoBox>
        </div>
      );

    case 'preposition':
      return (
        <div className="space-y-3">
          <SectionTitle>Prepositions</SectionTitle>
          <SectionDescription>Select prepositions (leave empty for all)</SectionDescription>
          <div className="grid grid-cols-5 gap-2">
            {allArabicPrepositions.map((p) => (
              <ArabicFilterButton
                key={p}
                selected={state.selectedPrepositions.includes(p)}
                onClick={() => actions.togglePreposition(p)}
                arabic={prepositionLabels[p].arabic}
                subtext={prepositionLabels[p].meanings[0]}
                colorClass="border-violet-500 bg-violet-100 text-violet-800"
              />
            ))}
          </div>
          <InfoBox colorClass="bg-violet-50">
            <strong>Note:</strong> Arabic prepositions often don't map 1:1 to English.
          </InfoBox>
        </div>
      );

    case 'question_words':
      return (
        <div className="space-y-3">
          <SectionTitle>Question Words</SectionTitle>
          <SectionDescription>Select question words (leave empty for all)</SectionDescription>
          <div className="grid grid-cols-5 gap-2">
            {allQuestionWords.map((w) => (
              <ArabicFilterButton
                key={w}
                selected={state.selectedQuestionWords.includes(w)}
                onClick={() => actions.toggleQuestionWord(w)}
                arabic={questionWordLabels[w].arabic}
                subtext={questionWordLabels[w].meaning}
                colorClass="border-cyan-500 bg-cyan-100 text-cyan-800"
              />
            ))}
          </div>
          <InfoBox colorClass="bg-cyan-50">
            <strong>Note:</strong> هَلْ is for yes/no questions. ما vs ماذا: both mean "what", but ماذا is used before verbs.
          </InfoBox>
        </div>
      );

    case 'relative_clause':
      return (
        <div className="space-y-3">
          <SectionTitle>Relative Pronouns</SectionTitle>
          <SectionDescription>Select pronouns (leave empty for all)</SectionDescription>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {allRelativePronouns.map((p) => (
              <ArabicFilterButton
                key={p}
                selected={state.selectedRelativePronouns.includes(p)}
                onClick={() => actions.toggleRelativePronoun(p)}
                arabic={relativePronounLabels[p].arabic}
                subtext={`${relativePronounLabels[p].gender} ${relativePronounLabels[p].number}`}
                colorClass="border-teal-500 bg-teal-100 text-teal-800"
              />
            ))}
          </div>
          <InfoBox colorClass="bg-teal-50">
            <strong>Note:</strong> Relative pronouns must agree with their antecedent in gender and number.
          </InfoBox>
        </div>
      );

    case 'spelling':
      return (
        <div className="space-y-3">
          <SectionTitle>Spelling Rules</SectionTitle>
          <SectionDescription>Select spelling rules (leave empty for all)</SectionDescription>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {allSpellingRules.map((r) => (
              <FilterButton
                key={r}
                selected={state.selectedSpellingRules.includes(r)}
                onClick={() => actions.toggleSpellingRule(r)}
                english={spellingRuleLabels[r].english}
                arabic={spellingRuleLabels[r].arabic}
                colorClass="border-amber-500 bg-amber-100 text-amber-800"
              />
            ))}
          </div>
          <InfoBox colorClass="bg-amber-50">
            <strong>ألف مقصورة:</strong> ى vs ي | <strong>تاء مربوطة:</strong> ة vs ه |
            <strong> همزة:</strong> When to write أ، إ، ا
          </InfoBox>
        </div>
      );

    case 'demonstrative':
      return (
        <div className="space-y-3">
          <SectionTitle>Demonstratives</SectionTitle>
          <SectionDescription>Select demonstratives (leave empty for all)</SectionDescription>
          <div className="grid grid-cols-5 gap-2">
            {allDemonstratives.map((d) => (
              <ArabicFilterButton
                key={d}
                selected={state.selectedDemonstratives.includes(d)}
                onClick={() => actions.toggleDemonstrative(d)}
                arabic={demonstrativeLabels[d].arabic}
                subtext={demonstrativeLabels[d].distance}
                colorClass="border-pink-500 bg-pink-100 text-pink-800"
              />
            ))}
          </div>
          <InfoBox colorClass="bg-pink-50">
            <strong>Near:</strong> هذا، هذه، هؤلاء | <strong>Far:</strong> ذلك، تلك، أولئك<br />
            Must agree with the noun in gender and number.
          </InfoBox>
        </div>
      );

    case 'possessive':
      return (
        <div className="space-y-3">
          <SectionTitle>Possessive Pronouns</SectionTitle>
          <SectionDescription>Select possessive pronouns (leave empty for all)</SectionDescription>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
            {allPossessivePronouns.map((p) => (
              <ArabicFilterButton
                key={p}
                selected={state.selectedPossessivePronouns.includes(p)}
                onClick={() => actions.togglePossessivePronoun(p)}
                arabic={possessivePronounLabels[p].arabic}
                subtext={possessivePronounLabels[p].meaning}
                colorClass="border-indigo-500 bg-indigo-100 text-indigo-800"
              />
            ))}
          </div>
          <InfoBox colorClass="bg-indigo-50">
            <strong>1st person:</strong> ـي (my), ـنَا (our) |
            <strong> 2nd person:</strong> ـكَ/ـكِ (your) |
            <strong> 3rd person:</strong> ـهُ/ـهَا (his/her)
          </InfoBox>
        </div>
      );

    case 'morph_chain':
      return (
        <div className="space-y-3">
          <SectionTitle>Chain Length</SectionTitle>
          <SectionDescription>Filter by derivation chain length (leave empty for all)</SectionDescription>
          <div className="grid grid-cols-3 gap-3">
            {chainLengths.map((cl) => (
              <button
                key={cl.value}
                onClick={() => actions.setChainLength(state.chainLength === cl.value ? null : cl.value)}
                className={cn(
                  'px-4 py-3 rounded-xl border-2 text-center transition-all',
                  state.chainLength === cl.value
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-800'
                    : 'border-border hover:border-emerald-400/50'
                )}
              >
                <div className="font-semibold">{cl.name}</div>
                <div className="text-xs text-muted-foreground">{cl.desc}</div>
              </button>
            ))}
          </div>
          <InfoBox colorClass="bg-emerald-50">
            <strong>Note:</strong> Each chain shows the step-by-step morphological derivation from root to final Quranic word form.
          </InfoBox>
        </div>
      );

    case 'grammar_tag':
      return (
        <div className="space-y-3">
          <SectionTitle>Difficulty Mode</SectionTitle>
          <SectionDescription>Choose the granularity of grammar tags</SectionDescription>
          <div className="grid grid-cols-3 gap-3">
            {grammarDifficulties.map((gd) => (
              <button
                key={gd.value}
                onClick={() => actions.setGrammarDifficulty(gd.value)}
                className={cn(
                  'px-4 py-3 rounded-xl border-2 text-center transition-all',
                  state.grammarDifficulty === gd.value
                    ? gd.value === 'easy'
                      ? 'border-green-500 bg-green-100 text-green-800'
                      : gd.value === 'medium'
                        ? 'border-amber-500 bg-amber-100 text-amber-800'
                        : 'border-red-500 bg-red-100 text-red-800'
                    : 'border-border hover:border-emerald-400/50'
                )}
              >
                <div className="font-semibold">{gd.name}</div>
                <div className="text-xs text-muted-foreground">{gd.desc}</div>
              </button>
            ))}
          </div>
          <InfoBox colorClass="bg-emerald-50">
            <strong>Easy:</strong> Distinguish nouns, verbs, and particles<br />
            <strong>Medium:</strong> Identify case endings (marfūʿ, manṣūb, majrūr)<br />
            <strong>Hard:</strong> Full grammatical tag with gender, number, and state
          </InfoBox>
        </div>
      );

    default:
      return null;
  }
}
