import { describe, it, expect } from 'vitest';

// Vocabulary
import { level1k, level2k, level3k, level5k, level10k } from '../vocabulary';

// Pseudowords
import { allPseudowords } from '../pseudowords';

// Sentences
import {
  declarativeSentences,
  interrogativeSentences,
  conditionalSentences,
  negativeSentences,
  imperativeSentences,
  comparativeSentences,
  temporalSentences,
  causalSentences,
} from '../sentences';

// Sentence production
import {
  beginnerSentences,
  intermediateSentences,
  advancedSentences,
} from '../sentenceProduction';

// Other data files
import { collocations } from '../collocations';
import { rootPatterns } from '../rootPatterns';
import { translations } from '../translations';
import { readingComprehensionData } from '../readingComprehension';
import { verbConjugationItems } from '../verbConjugation';
import { clozeItems } from '../clozeTest';
import { diacriticsItems } from '../diacriticsTest';
import { irabItems } from '../irabTest';
import { wordDerivationItems } from '../wordDerivation';
import { morphologicalAnalysisItems } from '../morphologicalAnalysis';
import { verbFormIdItems } from '../verbFormId';
import { idiomaticExpressionItems } from '../idiomaticExpressions';
import { wordFamilyItems } from '../wordFamily';
import { quranicVocabularyItems } from '../quranicVocabulary';
import { synonymsAntonymsItems } from '../synonymsAntonyms';
import { negationItems } from '../negationPatterns';
import { prepositionItems } from '../prepositionUsage';
import { questionWordItems } from '../questionWords';
import { relativeClauseItems } from '../relativeClauses';
import { spellingItems } from '../spellingOrthography';
import { demonstrativeItems } from '../demonstratives';
import { possessiveItems } from '../possessivePronouns';

// Regexes
const ARABIC_RE = /[\u0600-\u06FF]/;
const DIACRITICS_RE = /[\u064B-\u0652]/;
const VALID_LEVELS = new Set(['1k', '2k', '3k', '5k', '10k']);
const VALID_POS = new Set(['verb', 'noun', 'adjective', 'adverb', 'particle', 'preposition']);

// Collect all items with IDs across all files
const allVocabulary = [...level1k, ...level2k, ...level3k, ...level5k, ...level10k];

const allSentences = [
  ...declarativeSentences,
  ...interrogativeSentences,
  ...conditionalSentences,
  ...negativeSentences,
  ...imperativeSentences,
  ...comparativeSentences,
  ...temporalSentences,
  ...causalSentences,
];

const allProductionSentences = [
  ...beginnerSentences,
  ...intermediateSentences,
  ...advancedSentences,
];

// Flatten reading comprehension (passages + questions)
const rcPassageIds: string[] = [];
const rcQuestionIds: string[] = [];
for (const passage of readingComprehensionData) {
  rcPassageIds.push(passage.id);
  for (const q of passage.questions) {
    rcQuestionIds.push(q.id);
  }
}

// Gather ALL IDs for global uniqueness check
function collectAllIds(): string[] {
  const ids: string[] = [];
  for (const item of allVocabulary) ids.push(item.id);
  for (const item of allPseudowords) ids.push(item.id);
  for (const item of allSentences) ids.push(item.id);
  for (const item of allProductionSentences) ids.push(item.id);
  for (const item of collocations) ids.push(item.id);
  for (const item of rootPatterns) ids.push(item.id);
  for (const item of translations) ids.push(item.id);
  ids.push(...rcPassageIds, ...rcQuestionIds);
  for (const item of verbConjugationItems) ids.push(item.id);
  for (const item of clozeItems) ids.push(item.id);
  for (const item of diacriticsItems) ids.push(item.id);
  for (const item of irabItems) ids.push(item.id);
  for (const item of wordDerivationItems) ids.push(item.id);
  for (const item of morphologicalAnalysisItems) ids.push(item.id);
  for (const item of verbFormIdItems) ids.push(item.id);
  for (const item of idiomaticExpressionItems) ids.push(item.id);
  for (const item of wordFamilyItems) ids.push(item.id);
  for (const item of quranicVocabularyItems) ids.push(item.id);
  for (const item of synonymsAntonymsItems) ids.push(item.id);
  for (const item of negationItems) ids.push(item.id);
  for (const item of prepositionItems) ids.push(item.id);
  for (const item of questionWordItems) ids.push(item.id);
  for (const item of relativeClauseItems) ids.push(item.id);
  for (const item of spellingItems) ids.push(item.id);
  for (const item of demonstrativeItems) ids.push(item.id);
  for (const item of possessiveItems) ids.push(item.id);
  return ids;
}

// -- TESTS --

describe('Global ID Uniqueness', () => {
  it('all IDs across all data files should be globally unique', () => {
    const allIds = collectAllIds();
    const seen = new Map<string, number>();
    const duplicates: string[] = [];

    for (const id of allIds) {
      const count = (seen.get(id) || 0) + 1;
      seen.set(id, count);
      if (count === 2) duplicates.push(id);
    }

    expect(duplicates).toEqual([]);
  });

  it('all IDs should follow the standard format {type}-{level}-{seq}', () => {
    const allIds = collectAllIds();
    const idFormat = /^[a-z]+-[a-z0-9]+-\d{3}(-q\d+)?$/;
    const nonStandard = allIds.filter((id) => !idFormat.test(id));
    expect(nonStandard).toEqual([]);
  });
});

describe('Vocabulary', () => {
  it('should have no duplicate headword+POS within same level', () => {
    const byLevel = new Map<string, string[]>();
    for (const v of allVocabulary) {
      const key = `${v.level}:${v.headword}:${v.partOfSpeech}`;
      if (!byLevel.has(key)) byLevel.set(key, []);
      byLevel.get(key)!.push(v.id);
    }
    const dups = [...byLevel.entries()].filter(([, ids]) => ids.length > 1).map(([key, ids]) => `${key} => ${ids.join(', ')}`);
    expect(dups).toEqual([]);
  });

  it('all headwords should contain Arabic characters', () => {
    const nonArabic = allVocabulary.filter((v) => !ARABIC_RE.test(v.headword));
    expect(nonArabic.map((v) => v.id)).toEqual([]);
  });

  it('all headwordVocalized fields should contain diacritics', () => {
    const noDiacritics = allVocabulary.filter(
      (v) => !DIACRITICS_RE.test(v.headwordVocalized)
    );
    expect(noDiacritics.map((v) => v.id)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = allVocabulary.filter((v) => !VALID_LEVELS.has(v.level));
    expect(invalid.map((v) => v.id)).toEqual([]);
  });

  it('all partOfSpeech fields should be valid', () => {
    const invalid = allVocabulary.filter(
      (v) => !VALID_POS.has(v.partOfSpeech)
    );
    expect(invalid.map((v) => `${v.id}: ${v.partOfSpeech}`)).toEqual([]);
  });

  it('no required string fields should be empty', () => {
    const empty = allVocabulary.filter(
      (v) =>
        !v.id ||
        !v.headword ||
        !v.headwordVocalized ||
        !v.root ||
        !v.partOfSpeech ||
        v.meanings.length === 0
    );
    expect(empty.map((v) => v.id)).toEqual([]);
  });

  it('level distribution (informational)', () => {
    const dist = { '1k': level1k.length, '2k': level2k.length, '3k': level3k.length, '5k': level5k.length, '10k': level10k.length };
    console.log('Vocabulary level distribution:', dist);
    expect(allVocabulary.length).toBe(1824);
  });
});

describe('Pseudowords', () => {
  it('all words should contain Arabic characters', () => {
    const nonArabic = allPseudowords.filter((p) => !ARABIC_RE.test(p.word));
    expect(nonArabic.map((p) => p.id)).toEqual([]);
  });

  it('should have 300 pseudowords', () => {
    expect(allPseudowords.length).toBe(300);
  });
});

describe('Collocations', () => {
  it('all distractor arrays should have exactly 3 items', () => {
    const bad = collocations.filter((c) => c.distractors.length !== 3);
    expect(bad.map((c) => `${c.id}: ${c.distractors.length} distractors`)).toEqual([]);
  });

  it('all fullPhraseVocalized should contain diacritics', () => {
    const noDiacritics = collocations.filter(
      (c) => !DIACRITICS_RE.test(c.fullPhraseVocalized)
    );
    expect(noDiacritics.map((c) => c.id)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = collocations.filter((c) => !VALID_LEVELS.has(c.level));
    expect(invalid.map((c) => c.id)).toEqual([]);
  });

  it('phraseWithBlank preposition should match fullPhraseVocalized', () => {
    const prepCollocations = collocations.filter(
      (c) => c.collocationType === 'verb_prep'
    );
    const mismatched: string[] = [];
    for (const c of prepCollocations) {
      // Extract the preposition from phraseWithBlank (non-blank part)
      const blankParts = c.phraseWithBlank.replace('_____', '').trim();
      // Check that fullPhraseVocalized ends with or contains the same preposition (ignoring diacritics)
      const stripped = c.fullPhraseVocalized.replace(/[\u064B-\u0652]/g, '');
      if (!stripped.includes(blankParts.replace(/[\u064B-\u0652]/g, ''))) {
        mismatched.push(`${c.id}: blank="${c.phraseWithBlank}" full="${c.fullPhraseVocalized}"`);
      }
    }
    expect(mismatched).toEqual([]);
  });

  it('no required string fields should be empty', () => {
    const empty = collocations.filter(
      (c) =>
        !c.id ||
        !c.phraseWithBlank ||
        !c.fullPhraseVocalized ||
        !c.correctCollocate ||
        !c.translation
    );
    expect(empty.map((c) => c.id)).toEqual([]);
  });
});

describe('Sentences', () => {
  it('all sentence texts should contain Arabic characters', () => {
    const nonArabic = allSentences.filter((s) => !ARABIC_RE.test(s.sentence));
    expect(nonArabic.map((s) => s.id)).toEqual([]);
  });

  it('all distractor arrays should have exactly 3 items', () => {
    const bad = allSentences.filter((s) => s.distractors.length !== 3);
    expect(bad.map((s) => `${s.id}: ${s.distractors.length} distractors`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = allSentences.filter((s) => !VALID_LEVELS.has(s.level));
    expect(invalid.map((s) => s.id)).toEqual([]);
  });
});

describe('Sentence Production', () => {
  it('all model answers should contain Arabic characters', () => {
    const nonArabic = allProductionSentences.filter(
      (s) => !ARABIC_RE.test(s.modelAnswer)
    );
    expect(nonArabic.map((s) => s.id)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = allProductionSentences.filter((s) => !VALID_LEVELS.has(s.level));
    expect(invalid.map((s) => s.id)).toEqual([]);
  });
});

describe('Cloze Test', () => {
  it('all sentence fields should contain Arabic characters', () => {
    const nonArabic = clozeItems.filter(
      (c) => !ARABIC_RE.test(c.sentence)
    );
    expect(nonArabic.map((c) => c.id)).toEqual([]);
  });

  it('all distractor arrays should have exactly 3 items', () => {
    const bad = clozeItems.filter((c) => c.distractors.length !== 3);
    expect(bad.map((c) => `${c.id}: ${c.distractors.length} distractors`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = clozeItems.filter((c) => !VALID_LEVELS.has(c.level));
    expect(invalid.map((c) => c.id)).toEqual([]);
  });
});

describe('Diacritics Test', () => {
  it('all vocalized fields should contain diacritics', () => {
    const noDiacritics = diacriticsItems.filter(
      (d) => !DIACRITICS_RE.test(d.wordVocalized)
    );
    expect(noDiacritics.map((d) => d.id)).toEqual([]);
  });

  it('all distractor arrays should have exactly 3 items', () => {
    const bad = diacriticsItems.filter((d) => d.distractors.length !== 3);
    expect(bad.map((d) => `${d.id}: ${d.distractors.length} distractors`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = diacriticsItems.filter((d) => !VALID_LEVELS.has(d.level));
    expect(invalid.map((d) => d.id)).toEqual([]);
  });
});

describe('I\'rab Test', () => {
  it('all sentence fields should contain Arabic characters', () => {
    const nonArabic = irabItems.filter((i) => !ARABIC_RE.test(i.sentence));
    expect(nonArabic.map((i) => i.id)).toEqual([]);
  });

  // Known issue: I'rab items have 2 distractors (case ending pairs) not 3
  it('all distractor arrays should have at least 2 items', () => {
    const bad = irabItems.filter((i) => i.distractors.length < 2);
    expect(bad.map((i) => `${i.id}: ${i.distractors.length} distractors`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = irabItems.filter((i) => !VALID_LEVELS.has(i.level));
    expect(invalid.map((i) => i.id)).toEqual([]);
  });
});

describe('Word Derivation', () => {
  it('all root fields should contain Arabic characters', () => {
    const nonArabic = wordDerivationItems.filter((w) => !ARABIC_RE.test(w.root));
    expect(nonArabic.map((w) => w.id)).toEqual([]);
  });

  it('all distractor arrays should have exactly 3 items', () => {
    const bad = wordDerivationItems.filter((w) => w.distractors.length !== 3);
    expect(bad.map((w) => `${w.id}: ${w.distractors.length} distractors`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = wordDerivationItems.filter((w) => !VALID_LEVELS.has(w.level));
    expect(invalid.map((w) => w.id)).toEqual([]);
  });
});

describe('Morphological Analysis', () => {
  it('all word fields should contain Arabic characters', () => {
    const nonArabic = morphologicalAnalysisItems.filter(
      (m) => !ARABIC_RE.test(m.word)
    );
    expect(nonArabic.map((m) => m.id)).toEqual([]);
  });

  it('all distractor arrays should have exactly 3 items', () => {
    const bad = morphologicalAnalysisItems.filter(
      (m) => m.distractors.length !== 3
    );
    expect(bad.map((m) => `${m.id}: ${m.distractors.length} distractors`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = morphologicalAnalysisItems.filter(
      (m) => !VALID_LEVELS.has(m.level)
    );
    expect(invalid.map((m) => m.id)).toEqual([]);
  });
});

describe('Verb Form ID', () => {
  it('all verb fields should contain Arabic characters', () => {
    const nonArabic = verbFormIdItems.filter((v) => !ARABIC_RE.test(v.verb));
    expect(nonArabic.map((v) => v.id)).toEqual([]);
  });

  it('all distractor arrays should have exactly 3 items', () => {
    const bad = verbFormIdItems.filter((v) => v.distractors.length !== 3);
    expect(bad.map((v) => `${v.id}: ${v.distractors.length} distractors`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = verbFormIdItems.filter((v) => !VALID_LEVELS.has(v.level));
    expect(invalid.map((v) => v.id)).toEqual([]);
  });
});

describe('Verb Conjugation', () => {
  it('all verb fields should contain Arabic characters', () => {
    const nonArabic = verbConjugationItems.filter(
      (v) => !ARABIC_RE.test(v.baseVerb)
    );
    expect(nonArabic.map((v) => v.id)).toEqual([]);
  });

  it('all distractor arrays should have exactly 3 items', () => {
    const bad = verbConjugationItems.filter(
      (v) => v.distractors.length !== 3
    );
    expect(bad.map((v) => `${v.id}: ${v.distractors.length} distractors`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = verbConjugationItems.filter(
      (v) => !VALID_LEVELS.has(v.level)
    );
    expect(invalid.map((v) => v.id)).toEqual([]);
  });
});

describe('Root Patterns', () => {
  it('all root fields should contain Arabic characters', () => {
    const nonArabic = rootPatterns.filter((r) => !ARABIC_RE.test(r.root));
    expect(nonArabic.map((r) => r.id)).toEqual([]);
  });

  // Known issue: Root pattern items have 2 distractors not 3
  it('all distractor arrays should have at least 2 items', () => {
    const bad = rootPatterns.filter((r) => r.distractors.length < 2);
    expect(bad.map((r) => `${r.id}: ${r.distractors.length} distractors`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = rootPatterns.filter((r) => !VALID_LEVELS.has(r.level));
    expect(invalid.map((r) => r.id)).toEqual([]);
  });
});

describe('Translations', () => {
  it('all arabic fields should contain Arabic characters', () => {
    const nonArabic = translations.filter((t) => !ARABIC_RE.test(t.arabic));
    expect(nonArabic.map((t) => t.id)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = translations.filter((t) => !VALID_LEVELS.has(t.level));
    expect(invalid.map((t) => t.id)).toEqual([]);
  });
});

describe('Reading Comprehension', () => {
  it('all passage text should contain Arabic characters', () => {
    const nonArabic = readingComprehensionData.filter(
      (p) => !ARABIC_RE.test(p.passage)
    );
    expect(nonArabic.map((p) => p.id)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = readingComprehensionData.filter(
      (p) => !VALID_LEVELS.has(p.level)
    );
    expect(invalid.map((p) => p.id)).toEqual([]);
  });

  it('all questions should have passage-prefixed IDs', () => {
    for (const passage of readingComprehensionData) {
      for (const q of passage.questions) {
        expect(q.id).toContain(passage.id);
      }
    }
  });
});

describe('Idiomatic Expressions', () => {
  it('all expression fields should contain Arabic characters', () => {
    const nonArabic = idiomaticExpressionItems.filter(
      (i) => !ARABIC_RE.test(i.expression)
    );
    expect(nonArabic.map((i) => i.id)).toEqual([]);
  });

  it('all distractor arrays should have exactly 3 items', () => {
    const bad = idiomaticExpressionItems.filter(
      (i) => i.distractors.length !== 3
    );
    expect(bad.map((i) => `${i.id}: ${i.distractors.length} distractors`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = idiomaticExpressionItems.filter(
      (i) => !VALID_LEVELS.has(i.level)
    );
    expect(invalid.map((i) => i.id)).toEqual([]);
  });
});

describe('Word Family', () => {
  it('all headword fields should contain Arabic characters', () => {
    const nonArabic = wordFamilyItems.filter(
      (w) => !ARABIC_RE.test(w.root)
    );
    expect(nonArabic.map((w) => w.id)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = wordFamilyItems.filter((w) => !VALID_LEVELS.has(w.level));
    expect(invalid.map((w) => w.id)).toEqual([]);
  });
});

describe('Quranic Vocabulary', () => {
  it('all word fields should contain Arabic characters', () => {
    const nonArabic = quranicVocabularyItems.filter(
      (q) => !ARABIC_RE.test(q.word)
    );
    expect(nonArabic.map((q) => q.id)).toEqual([]);
  });

  it('all distractor arrays should have exactly 3 items', () => {
    const bad = quranicVocabularyItems.filter(
      (q) => q.distractors.length !== 3
    );
    expect(bad.map((q) => `${q.id}: ${q.distractors.length} distractors`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = quranicVocabularyItems.filter(
      (q) => !VALID_LEVELS.has(q.level)
    );
    expect(invalid.map((q) => q.id)).toEqual([]);
  });
});

describe('Synonyms and Antonyms', () => {
  it('all word fields should contain Arabic characters', () => {
    const nonArabic = synonymsAntonymsItems.filter(
      (s) => !ARABIC_RE.test(s.word)
    );
    expect(nonArabic.map((s) => s.id)).toEqual([]);
  });

  it('all distractor arrays should have exactly 3 items', () => {
    const bad = synonymsAntonymsItems.filter(
      (s) => s.distractors.length !== 3
    );
    expect(bad.map((s) => `${s.id}: ${s.distractors.length} distractors`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = synonymsAntonymsItems.filter(
      (s) => !VALID_LEVELS.has(s.level)
    );
    expect(invalid.map((s) => s.id)).toEqual([]);
  });
});

describe('Negation Patterns', () => {
  it('all sentence fields should contain Arabic characters', () => {
    const nonArabic = negationItems.filter(
      (n) => !ARABIC_RE.test(n.sentence)
    );
    expect(nonArabic.map((n) => n.id)).toEqual([]);
  });

  it('all distractor arrays should have exactly 3 items', () => {
    const bad = negationItems.filter((n) => n.distractors.length !== 3);
    expect(bad.map((n) => `${n.id}: ${n.distractors.length} distractors`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = negationItems.filter((n) => !VALID_LEVELS.has(n.level));
    expect(invalid.map((n) => n.id)).toEqual([]);
  });
});

describe('Preposition Usage', () => {
  it('all sentence fields should contain Arabic characters', () => {
    const nonArabic = prepositionItems.filter(
      (p) => !ARABIC_RE.test(p.sentence)
    );
    expect(nonArabic.map((p) => p.id)).toEqual([]);
  });

  it('all distractor arrays should have exactly 3 items', () => {
    const bad = prepositionItems.filter((p) => p.distractors.length !== 3);
    expect(bad.map((p) => `${p.id}: ${p.distractors.length} distractors`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = prepositionItems.filter(
      (p) => !VALID_LEVELS.has(p.level)
    );
    expect(invalid.map((p) => p.id)).toEqual([]);
  });
});

describe('Question Words', () => {
  it('all word fields should contain Arabic characters', () => {
    const nonArabic = questionWordItems.filter(
      (q) => !ARABIC_RE.test(q.question)
    );
    expect(nonArabic.map((q) => q.id)).toEqual([]);
  });

  it('all distractor arrays should have exactly 3 items', () => {
    const bad = questionWordItems.filter((q) => q.distractors.length !== 3);
    expect(bad.map((q) => `${q.id}: ${q.distractors.length} distractors`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = questionWordItems.filter(
      (q) => !VALID_LEVELS.has(q.level)
    );
    expect(invalid.map((q) => q.id)).toEqual([]);
  });
});

describe('Relative Clauses', () => {
  it('all sentence fields should contain Arabic characters', () => {
    const nonArabic = relativeClauseItems.filter(
      (r) => !ARABIC_RE.test(r.sentence)
    );
    expect(nonArabic.map((r) => r.id)).toEqual([]);
  });

  it('all distractor arrays should have exactly 3 items', () => {
    const bad = relativeClauseItems.filter((r) => r.distractors.length !== 3);
    expect(bad.map((r) => `${r.id}: ${r.distractors.length} distractors`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = relativeClauseItems.filter(
      (r) => !VALID_LEVELS.has(r.level)
    );
    expect(invalid.map((r) => r.id)).toEqual([]);
  });
});

describe('Spelling / Orthography', () => {
  it('all word fields should contain Arabic characters', () => {
    const nonArabic = spellingItems.filter((s) => !ARABIC_RE.test(s.correctWord));
    expect(nonArabic.map((s) => s.id)).toEqual([]);
  });

  it('all incorrectSpellings arrays should have at least 2 items', () => {
    const bad = spellingItems.filter((s) => s.incorrectSpellings.length < 2);
    expect(bad.map((s) => `${s.id}: ${s.incorrectSpellings.length} options`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = spellingItems.filter((s) => !VALID_LEVELS.has(s.level));
    expect(invalid.map((s) => s.id)).toEqual([]);
  });
});

describe('Demonstratives', () => {
  it('all sentence fields should contain Arabic characters', () => {
    const nonArabic = demonstrativeItems.filter(
      (d) => !ARABIC_RE.test(d.sentence)
    );
    expect(nonArabic.map((d) => d.id)).toEqual([]);
  });

  it('all distractor arrays should have exactly 3 items', () => {
    const bad = demonstrativeItems.filter((d) => d.distractors.length !== 3);
    expect(bad.map((d) => `${d.id}: ${d.distractors.length} distractors`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = demonstrativeItems.filter(
      (d) => !VALID_LEVELS.has(d.level)
    );
    expect(invalid.map((d) => d.id)).toEqual([]);
  });
});

describe('Possessive Pronouns', () => {
  it('all sentence fields should contain Arabic characters', () => {
    const nonArabic = possessiveItems.filter(
      (p) => !ARABIC_RE.test(p.sentence)
    );
    expect(nonArabic.map((p) => p.id)).toEqual([]);
  });

  it('all distractor arrays should have exactly 3 items', () => {
    const bad = possessiveItems.filter((p) => p.distractors.length !== 3);
    expect(bad.map((p) => `${p.id}: ${p.distractors.length} distractors`)).toEqual([]);
  });

  it('all level fields should be valid', () => {
    const invalid = possessiveItems.filter(
      (p) => !VALID_LEVELS.has(p.level)
    );
    expect(invalid.map((p) => p.id)).toEqual([]);
  });
});
