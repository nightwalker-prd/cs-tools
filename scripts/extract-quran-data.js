#!/usr/bin/env node
/**
 * Extract Quran data from en_quran.db SQLite database
 * Outputs TypeScript data files and per-surah JSON files for the kalimat app.
 *
 * Usage: node scripts/extract-quran-data.js [path-to-db]
 */

import Database from 'better-sqlite3';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const DB_PATH = process.argv[2] || join(process.env.HOME, 'Downloads', 'en_quran.db');
const KALAAM_DB_PATH = process.argv[3] || join(process.env.HOME, 'Desktop/kalaam/extracted/Payload/Kalaam.app/assets/src/assets/db/quran.db');
const DATA_DIR = join(ROOT, 'apps/kalimat/src/data');
const PUBLIC_DIR = join(ROOT, 'apps/kalimat/public/data/quran');
const TRANSFORMATIONS_DIR = join(ROOT, 'apps/kalimat/public/data/transformations');
const ROOTS_DIR = join(ROOT, 'apps/kalimat/public/data/roots');
const MORPHEMES_DIR = join(ROOT, 'apps/kalimat/public/data/morphemes');

mkdirSync(DATA_DIR, { recursive: true });
mkdirSync(join(DATA_DIR, 'lemma-etymology'), { recursive: true });
mkdirSync(join(DATA_DIR, 'lemma-context'), { recursive: true });
mkdirSync(PUBLIC_DIR, { recursive: true });
mkdirSync(TRANSFORMATIONS_DIR, { recursive: true });
mkdirSync(ROOTS_DIR, { recursive: true });
mkdirSync(MORPHEMES_DIR, { recursive: true });

console.log(`Opening database: ${DB_PATH}`);
const db = new Database(DB_PATH, { readonly: true });

// ─── Surah Names ──────────────────────────────────────────────────────────────
function extractSurahNames() {
  console.log('Extracting surah names...');
  const rows = db.prepare('SELECT surahNum, english, transliteration, arabic FROM surahNames ORDER BY surahNum').all();
  const ts = `export interface SurahName {
  num: number;
  english: string;
  transliteration: string;
  arabic: string;
}

export const surahNames: SurahName[] = ${JSON.stringify(
    rows.map(r => ({ num: r.surahNum, english: r.english, transliteration: r.transliteration, arabic: r.arabic })),
    null, 2
  )};
`;
  writeFileSync(join(DATA_DIR, 'surah-names.ts'), ts);
  console.log(`  → ${rows.length} surahs`);
  return rows;
}

// ─── Particles ────────────────────────────────────────────────────────────────
function extractParticles() {
  console.log('Extracting particles...');
  const rows = db.prepare('SELECT "index", lemma, translation FROM pTranslation ORDER BY "index"').all();
  const ts = `export interface Particle {
  index: number;
  lemma: string;
  translation: string;
}

export const particles: Particle[] = ${JSON.stringify(
    rows.map(r => ({ index: r.index, lemma: r.lemma, translation: r.translation })),
    null, 2
  )};
`;
  writeFileSync(join(DATA_DIR, 'particles.ts'), ts);
  console.log(`  → ${rows.length} particles`);
}

// ─── Lemmas ───────────────────────────────────────────────────────────────────
function extractLemmas() {
  console.log('Extracting lemmas...');
  const rows = db.prepare('SELECT id, lemma, meaning, transliteration, lemmaId FROM lemmaTranslation ORDER BY id').all();

  // Core lemma data (without etymology info)
  const ts = `export interface Lemma {
  id: number;
  lemma: string;
  meaning: string;
  transliteration: string;
  lemmaId: number;
}

export const lemmas: Lemma[] = ${JSON.stringify(
    rows.map(r => ({ id: r.id, lemma: r.lemma, meaning: r.meaning, transliteration: r.transliteration, lemmaId: r.lemmaId })),
    null, 2
  )};
`;
  writeFileSync(join(DATA_DIR, 'lemmas.ts'), ts);
  console.log(`  → ${rows.length} lemmas`);

  // Etymology chunks
  console.log('Extracting lemma etymology chunks...');
  const infoRows = db.prepare('SELECT id, info FROM lemmaTranslation ORDER BY id').all();
  const CHUNK_COUNT = 10;
  const chunkSize = Math.ceil(infoRows.length / CHUNK_COUNT);

  for (let i = 0; i < CHUNK_COUNT; i++) {
    const chunk = infoRows.slice(i * chunkSize, (i + 1) * chunkSize);
    const chunkData = {};
    for (const row of chunk) {
      if (row.info) {
        chunkData[row.id] = row.info;
      }
    }
    const chunkTs = `/** Etymology data for lemma IDs in chunk ${i} */
export const etymologyChunk${i}: Record<number, string> = ${JSON.stringify(chunkData, null, 2)};
`;
    writeFileSync(join(DATA_DIR, 'lemma-etymology', `chunk-${i}.ts`), chunkTs);
    console.log(`  → chunk-${i}: ${Object.keys(chunkData).length} entries`);
  }

  return rows;
}

// ─── Ayah Translations ───────────────────────────────────────────────────────
function extractAyahTranslations() {
  console.log('Extracting ayah translations...');
  const rows = db.prepare('SELECT id, surahNum, ayahNum, text FROM ayahTranslation ORDER BY id').all();
  const ts = `export interface AyahTranslation {
  id: number;
  surahNum: number;
  ayahNum: number;
  text: string;
}

export const ayahTranslations: AyahTranslation[] = ${JSON.stringify(
    rows.map(r => ({ id: r.id, surahNum: r.surahNum, ayahNum: r.ayahNum, text: r.text })),
    null, 2
  )};
`;
  writeFileSync(join(DATA_DIR, 'ayah-translations.ts'), ts);
  console.log(`  → ${rows.length} ayah translations`);
}

// ─── Root Frequency ──────────────────────────────────────────────────────────
function extractRootFrequency() {
  console.log('Computing root frequencies...');
  // Count how many word occurrences each root has (using step=1 which has the root)
  const rows = db.prepare(`
    SELECT root, COUNT(*) as count
    FROM transformations
    WHERE step = 1 AND root IS NOT NULL AND length(root) > 0
    GROUP BY root
    ORDER BY count DESC
  `).all();

  const ts = `export interface RootFrequency {
  root: string;
  count: number;
  tier: 1 | 2 | 3 | 4;
}

export const rootFrequency: RootFrequency[] = ${JSON.stringify(
    rows.map((r, i) => ({
      root: r.root,
      count: r.count,
      tier: i < 100 ? 1 : i < 300 ? 2 : i < 600 ? 3 : 4,
    })),
    null, 2
  )};

/** Lookup root → frequency data */
export const rootFrequencyMap: Record<string, RootFrequency> = Object.fromEntries(
  rootFrequency.map(r => [r.root, r])
);
`;
  writeFileSync(join(DATA_DIR, 'root-frequency.ts'), ts);
  console.log(`  → ${rows.length} roots`);

  // Compute coverage stats
  const total = rows.reduce((s, r) => s + r.count, 0);
  const top100 = rows.slice(0, 100).reduce((s, r) => s + r.count, 0);
  const top300 = rows.slice(0, 300).reduce((s, r) => s + r.count, 0);
  const top600 = rows.slice(0, 600).reduce((s, r) => s + r.count, 0);
  console.log(`  Coverage: T1=${(top100/total*100).toFixed(1)}% T2=${(top300/total*100).toFixed(1)}% T3=${(top600/total*100).toFixed(1)}%`);

  return rows;
}

// ─── Root to Lemma Mapping ───────────────────────────────────────────────────
function extractRootToLemma(lemmaRows) {
  console.log('Computing root-to-lemma mapping...');

  // Arabic diacritics removal for matching
  const diacritics = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g;
  function stripDiacritics(s) {
    return s.replace(diacritics, '');
  }

  // Build a map: stripped lemma consonants → lemmaId
  const lemmaByStripped = {};
  for (const l of lemmaRows) {
    const stripped = stripDiacritics(l.lemma);
    if (!lemmaByStripped[stripped]) lemmaByStripped[stripped] = [];
    lemmaByStripped[stripped].push(l.id);
  }

  // Get distinct roots
  const roots = db.prepare(`
    SELECT DISTINCT root FROM transformations
    WHERE step = 1 AND root IS NOT NULL AND length(root) > 0
    ORDER BY root
  `).all();

  // For each root, find lemmas that match
  // Strategy: Get all words derived from this root (step=1) and look for corresponding lemmas
  const rootToLemma = {};

  // Alternative approach: look at lemmaTranslation.info which often mentions the root
  // Better approach: use the transformation chain to link roots to lemma meanings
  // Most reliable: match roots from transformations step=1 to lemma consonant skeletons
  for (const { root } of roots) {
    // Get unique new_word values at step=1 for this root
    const words = db.prepare(`
      SELECT DISTINCT new_word FROM transformations WHERE step = 1 AND root = ?
    `).all(root);

    const matchedIds = new Set();
    for (const { new_word } of words) {
      const stripped = stripDiacritics(new_word);
      if (lemmaByStripped[stripped]) {
        for (const id of lemmaByStripped[stripped]) matchedIds.add(id);
      }
    }

    // Also try matching the root itself
    const rootStripped = stripDiacritics(root);
    if (lemmaByStripped[rootStripped]) {
      for (const id of lemmaByStripped[rootStripped]) matchedIds.add(id);
    }

    // Also try root letters joined (e.g. "حمد" from root "حمد")
    // Remove dashes from roots like "ح-م-د"
    const rootNoDash = root.replace(/-/g, '');
    if (rootNoDash !== root && lemmaByStripped[rootNoDash]) {
      for (const id of lemmaByStripped[rootNoDash]) matchedIds.add(id);
    }

    if (matchedIds.size > 0) {
      rootToLemma[root] = [...matchedIds].sort((a, b) => a - b);
    }
  }

  const ts = `/** Mapping from root → array of lemma IDs that derive from that root */
export const rootToLemma: Record<string, number[]> = ${JSON.stringify(rootToLemma, null, 2)};
`;
  writeFileSync(join(DATA_DIR, 'root-to-lemma.ts'), ts);
  console.log(`  → ${Object.keys(rootToLemma).length} roots mapped to lemmas`);
}

// ─── Per-Surah JSON (lazy-loaded) ────────────────────────────────────────────
function extractSurahWords(surahNames) {
  console.log('Extracting per-surah word files...');

  // Build a lemma lookup by stripped form for quick matching
  const lemmaRows = db.prepare('SELECT id, lemma FROM lemmaTranslation').all();
  const diacritics = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g;
  function stripDiacritics(s) { return s.replace(diacritics, ''); }

  const lemmaLookup = {};
  for (const l of lemmaRows) {
    const stripped = stripDiacritics(l.lemma);
    if (!lemmaLookup[stripped]) lemmaLookup[stripped] = l.id;
  }

  for (const surah of surahNames) {
    const surahNum = surah.surahNum;

    // Get final-step words (the actual word forms in the Quran)
    const words = db.prepare(`
      SELECT
        t.surahNum, t.ayahNum, t.wordNum,
        t.new_word as word, t.new_meaning as meaning,
        t.root
      FROM transformations t
      WHERE t.surahNum = ? AND t.step = (
        SELECT MAX(t2.step) FROM transformations t2 WHERE t2.wordLoc = t.wordLoc
      )
      ORDER BY t.ayahNum, t.wordNum
    `).all(surahNum);

    // Get step=1 roots for each word
    const rootSteps = db.prepare(`
      SELECT wordLoc, root, new_word FROM transformations
      WHERE surahNum = ? AND step = 1
    `).all(surahNum);

    const rootMap = {};
    const baseWordMap = {};
    for (const rs of rootSteps) {
      rootMap[rs.wordLoc] = rs.root;
      baseWordMap[rs.wordLoc] = rs.new_word;
    }

    // Get transliterations
    const translits = db.prepare(`
      SELECT id, transliteration FROM wordTransliteration
      WHERE id LIKE ?
    `).all(`${surahNum}:%`);

    const translitMap = {};
    for (const t of translits) {
      translitMap[t.id] = t.transliteration;
    }

    const surahWords = words.map(w => {
      const wordLoc = `${w.surahNum}:${w.ayahNum}:${w.wordNum}`;
      const root = rootMap[wordLoc] || '';
      const baseWord = baseWordMap[wordLoc] || '';

      // Try to match to a lemma
      let lemmaId = null;
      if (baseWord) {
        const stripped = stripDiacritics(baseWord);
        if (lemmaLookup[stripped]) lemmaId = lemmaLookup[stripped];
      }

      return {
        id: wordLoc,
        ayahNum: w.ayahNum,
        wordNum: w.wordNum,
        word: w.word,
        meaning: w.meaning,
        transliteration: translitMap[wordLoc] || '',
        root,
        lemmaId,
      };
    });

    writeFileSync(join(PUBLIC_DIR, `surah-${surahNum}.json`), JSON.stringify(surahWords));
    if (surahNum % 20 === 0 || surahNum === 1) {
      console.log(`  → surah-${surahNum}.json: ${surahWords.length} words`);
    }
  }
  console.log(`  → 114 surah files written`);
}

// ─── Transformations (per-surah, lazy-loaded) ───────────────────────────────
function extractTransformations() {
  console.log('Extracting transformations (per-surah)...');

  for (let surahNum = 1; surahNum <= 114; surahNum++) {
    const rows = db.prepare(`
      SELECT wordLoc, step, new_word, new_meaning, change_identifier,
             affixes, form, root, weak_letter_change, semantic_change, notes
      FROM transformations
      WHERE surahNum = ?
      ORDER BY ayahNum, wordNum, step
    `).all(surahNum);

    const byWord = {};
    for (const r of rows) {
      if (!byWord[r.wordLoc]) byWord[r.wordLoc] = { r: '', steps: [] };
      if (r.step === 1 && r.root) byWord[r.wordLoc].r = r.root;

      const step = { s: r.step, a: r.new_word, m: r.new_meaning };
      if (r.change_identifier) step.c = r.change_identifier;
      if (r.affixes) {
        try { step.x = JSON.parse(r.affixes); } catch (_) { /* skip */ }
      }
      if (r.form) step.f = r.form;
      if (r.weak_letter_change) step.wk = true;
      if (r.semantic_change) step.sc = true;
      if (r.notes) step.n = r.notes;

      byWord[r.wordLoc].steps.push(step);
    }

    writeFileSync(
      join(TRANSFORMATIONS_DIR, `surah-${surahNum}.json`),
      JSON.stringify(byWord)
    );

    if (surahNum % 20 === 0 || surahNum === 1) {
      console.log(`  → surah-${surahNum}.json: ${Object.keys(byWord).length} words`);
    }
  }
  console.log('  → 114 transformation files written');
}

// ─── Grammar Patterns ───────────────────────────────────────────────────────
function extractGrammarPatterns() {
  console.log('Extracting grammar patterns...');

  const rows = db.prepare(`
    SELECT id, form, form_d, change_identifier, friendly_change_identifier,
           count, form_desc, explanation, affixes, example, similar
    FROM parentForms
    ORDER BY count DESC
  `).all();

  function categorize(changeId) {
    const c = (changeId || '').toLowerCase();
    if (/\b(past|present|imperative|passive|future|verb)\b/.test(c)) return 'verb';
    if (/\b(noun|adjective|comparative|intensive|superlative)\b/.test(c)) return 'noun';
    if (/\b(definite|conjunction|preposition|بِ|لِ|كَ|وَ|فَ)\b/.test(c)) return 'prefix';
    if (/\b(genitive|nominative|accusative|tanween)\b/.test(c)) return 'suffix';
    if (/\b(pronoun|his|her|their|your|our|them)\b/.test(c)) return 'pronoun';
    if (/\b(plural|dual|feminine)\b/.test(c)) return 'plural';
    return 'other';
  }

  const patterns = rows.map(r => {
    let affixes = null;
    let example = null;
    let similar = null;
    try { if (r.affixes) affixes = JSON.parse(r.affixes); } catch (_) { /* skip */ }
    try { if (r.example) example = JSON.parse(r.example); } catch (_) { /* skip */ }
    try {
      if (r.similar) {
        similar = JSON.parse(r.similar);
        if (similar && similar.similarPatternIds) {
          similar.similarPatternIds = similar.similarPatternIds.map(Number);
        }
      }
    } catch (_) { /* skip */ }

    return {
      id: r.id,
      form: r.form || '',
      formD: r.form_d || '',
      changeId: r.change_identifier || '',
      friendlyName: r.friendly_change_identifier || '',
      count: r.count || 0,
      formDesc: r.form_desc || '',
      explanation: r.explanation || '',
      affixes,
      example,
      similar,
      category: categorize(r.change_identifier),
    };
  });

  const ts = `import type { GrammarPattern, PatternCategory } from '@/types';

export const grammarPatterns: GrammarPattern[] = ${JSON.stringify(patterns, null, 2)};

export const grammarPatternMap: Record<number, GrammarPattern> = Object.fromEntries(
  grammarPatterns.map(p => [p.id, p])
);

export const PATTERN_CATEGORIES: { key: PatternCategory; label: string }[] = [
  { key: 'verb', label: 'Verbs' },
  { key: 'noun', label: 'Nouns' },
  { key: 'prefix', label: 'Prefixes' },
  { key: 'suffix', label: 'Suffixes' },
  { key: 'pronoun', label: 'Pronouns' },
  { key: 'plural', label: 'Plurals' },
  { key: 'other', label: 'Other' },
];
`;
  writeFileSync(join(DATA_DIR, 'grammar-patterns.ts'), ts);
  console.log(`  → ${patterns.length} grammar patterns`);
}

// ─── Root Family Trees (per-letter, lazy-loaded) ────────────────────────────
function extractRootFamilyTrees() {
  console.log('Extracting root family trees...');

  const arabicLetters = 'ء أ إ آ ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي'.split(' ');

  for (const letter of arabicLetters) {
    // Get all roots starting with this letter
    const roots = db.prepare(`
      SELECT DISTINCT root FROM transformations
      WHERE step = 1 AND root IS NOT NULL AND length(root) > 0
        AND substr(root, 1, 1) = ?
      ORDER BY root
    `).all(letter);

    const familyData = {};

    for (const { root } of roots) {
      // Base forms (step 1): the initial word forms with pattern info
      const baseRows = db.prepare(`
        SELECT new_word, new_meaning, form, change_identifier, COUNT(*) as cnt
        FROM transformations
        WHERE root = ? AND step = 1
        GROUP BY new_word, new_meaning, form, change_identifier
        ORDER BY cnt DESC
      `).all(root);

      const baseForms = baseRows.map(r => {
        const bf = { w: r.new_word, m: r.new_meaning, c: r.cnt };
        if (r.form) bf.p = r.form;
        if (r.change_identifier) bf.pn = r.change_identifier;
        return bf;
      });

      // Derived forms (final step): the actual Quranic word forms
      const derivedRows = db.prepare(`
        SELECT t.new_word, t.new_meaning, t.form, t.change_identifier,
               COUNT(*) as cnt,
               MAX(t.step) as maxStep,
               MIN(t.wordLoc) as firstRef
        FROM transformations t
        WHERE t.root = ? AND t.step = (
          SELECT MAX(t2.step) FROM transformations t2 WHERE t2.wordLoc = t.wordLoc
        )
        GROUP BY t.new_word, t.new_meaning
        ORDER BY cnt DESC
      `).all(root);

      const derivedForms = derivedRows.map(r => {
        const df = { w: r.new_word, m: r.new_meaning, s: r.maxStep, c: r.cnt };
        if (r.form) df.p = r.form;
        if (r.firstRef) df.ref = r.firstRef;
        return df;
      });

      if (baseForms.length > 0 || derivedForms.length > 0) {
        familyData[root] = { baseForms, derivedForms };
      }
    }

    const filename = `${letter}.json`;
    writeFileSync(join(ROOTS_DIR, filename), JSON.stringify(familyData));
    if (Object.keys(familyData).length > 0) {
      console.log(`  → ${filename}: ${Object.keys(familyData).length} roots`);
    }
  }
  console.log('  → Root family tree files written');
}

// ─── Morpheme Color-Coding (per-surah, lazy-loaded) ─────────────────────────
function extractMorphemes() {
  console.log('Extracting morpheme color-coding (per-surah)...');

  let totalWords = 0;

  for (let surahNum = 1; surahNum <= 114; surahNum++) {
    const rows = db.prepare(`
      SELECT t.wordLoc, t.new_word, t.new_meaning, t.colorCoding
      FROM transformations t
      WHERE t.surahNum = ? AND t.colorCoding IS NOT NULL AND length(t.colorCoding) > 2
        AND t.step = (SELECT MAX(t2.step) FROM transformations t2 WHERE t2.wordLoc = t.wordLoc)
      ORDER BY t.ayahNum, t.wordNum
    `).all(surahNum);

    const morphemeData = {};

    for (const r of rows) {
      try {
        const cc = JSON.parse(r.colorCoding);
        morphemeData[r.wordLoc] = {
          w: cc.word || r.new_word,
          m: cc.meaning || r.new_meaning,
          p: cc.pieces || {},
        };
      } catch (_) {
        // Skip malformed JSON
      }
    }

    writeFileSync(
      join(MORPHEMES_DIR, `surah-${surahNum}.json`),
      JSON.stringify(morphemeData)
    );

    totalWords += Object.keys(morphemeData).length;
    if (surahNum % 20 === 0 || surahNum === 1) {
      console.log(`  → surah-${surahNum}.json: ${Object.keys(morphemeData).length} words`);
    }
  }
  console.log(`  → 114 morpheme files written (${totalWords} total words)`);
}

// ─── Surah Word Stats (for comprehension calculation) ───────────────────────
function extractSurahWordStats() {
  console.log('Extracting surah word stats...');

  // Build lemmaId lookup (same as extractSurahWords)
  const lemmaRows = db.prepare('SELECT id, lemma FROM lemmaTranslation').all();
  const diacritics = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g;
  function stripDiacritics(s) { return s.replace(diacritics, ''); }

  const lemmaLookup = {};
  for (const l of lemmaRows) {
    const stripped = stripDiacritics(l.lemma);
    if (!lemmaLookup[stripped]) lemmaLookup[stripped] = l.id;
  }

  const stats = [];

  for (let surahNum = 1; surahNum <= 114; surahNum++) {
    // Get step=1 data (root info) for each word
    const step1Rows = db.prepare(`
      SELECT wordLoc, root, new_word FROM transformations
      WHERE surahNum = ? AND step = 1
    `).all(surahNum);

    const wordsByLemma = {};
    const wordsByRoot = {};
    let particleCount = 0;
    let totalWords = step1Rows.length;

    for (const r of step1Rows) {
      const root = r.root && r.root.length > 0 ? r.root : null;

      // Try to match to lemma
      let lemmaId = null;
      if (r.new_word) {
        const stripped = stripDiacritics(r.new_word);
        if (lemmaLookup[stripped]) lemmaId = lemmaLookup[stripped];
      }

      if (root) {
        wordsByRoot[root] = (wordsByRoot[root] || 0) + 1;
      }

      if (lemmaId) {
        wordsByLemma[lemmaId] = (wordsByLemma[lemmaId] || 0) + 1;
      }

      if (!root && !lemmaId) {
        particleCount++;
      }
    }

    stats.push({
      surahNum,
      totalWords,
      wordsByLemma,
      wordsByRoot,
      particleCount,
    });
  }

  const ts = `export interface SurahWordStat {
  surahNum: number;
  totalWords: number;
  wordsByLemma: Record<number, number>;
  wordsByRoot: Record<string, number>;
  particleCount: number;
}

export const surahWordStats: SurahWordStat[] = ${JSON.stringify(stats, null, 2)};
`;
  writeFileSync(join(DATA_DIR, 'surah-word-stats.ts'), ts);

  const totalAllWords = stats.reduce((s, r) => s + r.totalWords, 0);
  const totalParticles = stats.reduce((s, r) => s + r.particleCount, 0);
  console.log(`  → ${stats.length} surahs, ${totalAllWords} total words, ${totalParticles} particles`);
}

// ─── Lemma Context (from Kalaam DB) ──────────────────────────────────────────
function extractLemmaContext(kalaamDb, kalaamToSeqId) {
  console.log('Extracting lemma contextual translations...');

  // Build surah:ayah → Arabic text lookup from ayahArabic table
  const ayahRows = kalaamDb.prepare(`SELECT surahNum, ayahNum, ayah FROM ayahArabic`).all();
  const arabicLookup = {};
  for (const a of ayahRows) {
    arabicLookup[`${a.surahNum}:${a.ayahNum}`] = a.ayah;
  }
  console.log(`  → loaded ${ayahRows.length} Arabic ayah texts`);

  const rows = kalaamDb.prepare(`
    SELECT lc.id, lc.lemma, lit.location, lit.textBefore, lit.closestExactMatch, lit.textAfter
    FROM lemmaCount lc
    JOIN lemmaInAyahTranslation lit ON lc.lemma = lit.lemma
    ORDER BY CAST(lc.id AS INTEGER)
  `).all();

  // Group by sequential lemma ID (translated from Kalaam DB ID)
  const byLemma = {};
  let skipped = 0;
  for (const r of rows) {
    const kalaamId = Number(r.id);
    const seqId = kalaamToSeqId[kalaamId];
    if (seqId == null) { skipped++; continue; }
    if (!byLemma[seqId]) byLemma[seqId] = [];
    // Parse location like "95:2:1:1" → surahNum:ayahNum
    const parts = r.location.split(':');
    const ref = `${parts[0]}:${parts[1]}`;
    const entry = {
      ref,
      before: r.textBefore || '',
      match: r.closestExactMatch || '',
      after: r.textAfter || '',
    };
    const ar = arabicLookup[ref];
    if (ar) entry.ar = ar;
    byLemma[seqId].push(entry);
  }
  if (skipped > 0) console.log(`  → skipped ${skipped} rows with no matching sequential ID`);

  // Chunk into 10 files using same fixed-range chunking as etymology/frontend
  // Frontend uses: chunkIndex = Math.floor((lemmaId - 1) / CHUNK_SIZE)
  const CHUNK_COUNT = 10;
  const CHUNK_SIZE = 479; // must match useLemmaInfo.ts CHUNK_SIZE

  for (let i = 0; i < CHUNK_COUNT; i++) {
    const minId = i * CHUNK_SIZE + 1;
    const maxId = (i + 1) * CHUNK_SIZE;
    const chunkData = {};
    for (const [id, entries] of Object.entries(byLemma)) {
      const numId = Number(id);
      if (numId >= minId && (i === CHUNK_COUNT - 1 || numId <= maxId)) {
        chunkData[numId] = entries;
      }
    }
    const chunkTs = `/** Contextual translation data for lemma IDs in chunk ${i} */
export const contextChunk${i}: Record<number, { ref: string; before: string; match: string; after: string; ar?: string }[]> = ${JSON.stringify(chunkData, null, 2)};
`;
    writeFileSync(join(DATA_DIR, 'lemma-context', `chunk-${i}.ts`), chunkTs);
    console.log(`  → context chunk-${i}: ${Object.keys(chunkData).length} lemmas`);
  }
}

// ─── Grammar Tags (from Kalaam DB) ──────────────────────────────────────────
function extractGrammarTags(kalaamDb) {
  console.log('Extracting grammar tags...');
  const rows = kalaamDb.prepare(`
    SELECT grammar, color, verbose_desc, friendly_desc
    FROM grammar
    ORDER BY id
  `).all();

  const tags = {};
  for (const r of rows) {
    tags[r.grammar] = {
      color: r.color || '#666',
      verbose: r.verbose_desc || '',
      friendly: r.friendly_desc || '',
    };
  }

  const ts = `export interface GrammarTag {
  color: string;
  verbose: string;
  friendly: string;
}

export const grammarTags: Record<string, GrammarTag> = ${JSON.stringify(tags, null, 2)};
`;
  writeFileSync(join(DATA_DIR, 'grammar-tags.ts'), ts);
  console.log(`  → ${rows.length} grammar tags`);
}

// ─── Corpus Morphology (from Kalaam DB) ──────────────────────────────────────
const CORPUS_DIR = join(ROOT, 'apps/kalimat/public/data/corpus');
mkdirSync(CORPUS_DIR, { recursive: true });

function extractCorpusMorphology(kalaamDb) {
  console.log('Extracting corpus morphology...');
  const rows = kalaamDb.prepare(`
    SELECT location, wordLoc, arabic, partOfSpeech, verbForm, grammar, root, lemma, surahNum, ayahNum, wordNum
    FROM morphology
    ORDER BY surahNum, ayahNum, wordNum, id
  `).all();

  // Group by surah
  const bySurah = {};
  for (const r of rows) {
    if (!bySurah[r.surahNum]) bySurah[r.surahNum] = {};
    const wordKey = r.wordLoc;
    if (!bySurah[r.surahNum][wordKey]) bySurah[r.surahNum][wordKey] = [];
    bySurah[r.surahNum][wordKey].push({
      loc: r.location,
      ar: r.arabic,
      pos: r.partOfSpeech || '',
      vf: r.verbForm || '',
      gr: r.grammar,
      root: r.root || '',
      lemma: r.lemma || '',
    });
  }

  let totalWords = 0;
  for (const [surahNum, data] of Object.entries(bySurah)) {
    writeFileSync(join(CORPUS_DIR, `surah-${surahNum}.json`), JSON.stringify(data));
    totalWords += Object.keys(data).length;
  }
  console.log(`  → ${Object.keys(bySurah).length} surahs, ${totalWords} words`);
}

// ─── Weak Verb Drill Data ────────────────────────────────────────────────
function extractWeakVerbs() {
  console.log('Extracting weak verb drill data...');

  const WEAK_LETTERS = new Set(['و', 'ي', 'ا']);
  const WEAK_VERBS_DIR = join(ROOT, 'apps/kalimat/public/data');
  mkdirSync(WEAK_VERBS_DIR, { recursive: true });

  // Get all weak_letter_change rows with their "before" word from the previous step
  const rows = db.prepare(`
    SELECT
      t.wordLoc, t.surahNum, t.ayahNum, t.step,
      t.new_word AS after_word, t.new_meaning AS meaning,
      t.change_identifier, t.form, t.root, t.notes,
      prev.new_word AS before_word
    FROM transformations t
    JOIN transformations prev
      ON prev.wordLoc = t.wordLoc AND prev.step = t.step - 1
    WHERE t.weak_letter_change = 1
      AND t.root IS NOT NULL AND length(t.root) > 0
  `).all();

  console.log(`  → ${rows.length} raw weak letter change rows`);

  // Classify root by weak letter positions
  function classifyRoot(root) {
    const letters = [...root];
    const positions = [];
    for (let i = 0; i < letters.length; i++) {
      if (WEAK_LETTERS.has(letters[i])) positions.push(i + 1);
    }
    if (positions.length === 0) return { type: null, weakPos: [] };
    if (positions.length >= 2) return { type: 'doubly-weak', weakPos: positions };
    if (positions[0] === 1) return { type: 'assimilated', weakPos: positions };
    if (positions[0] === 2) return { type: 'hollow', weakPos: positions };
    return { type: 'defective', weakPos: positions };
  }

  // Deduplicate by root|form|change_identifier — keep first occurrence, count total
  const groups = {};
  for (const r of rows) {
    const key = `${r.root}|${r.form || ''}|${r.change_identifier || ''}`;
    if (!groups[key]) {
      groups[key] = { ...r, count: 1 };
    } else {
      groups[key].count++;
    }
  }

  const entries = [];
  for (const g of Object.values(groups)) {
    const { type, weakPos } = classifyRoot(g.root);
    if (!type) continue;

    entries.push({
      root: g.root,
      form: g.form || '',
      changeId: g.change_identifier || '',
      type,
      weakPos,
      before: g.before_word || '',
      after: g.after_word || '',
      meaning: g.meaning || '',
      note: g.notes || '',
      ref: `${g.surahNum}:${g.ayahNum}`,
      count: g.count,
    });
  }

  // Sort by count descending (most common changes first)
  entries.sort((a, b) => b.count - a.count);

  writeFileSync(
    join(WEAK_VERBS_DIR, 'weak-verbs.json'),
    JSON.stringify(entries, null, 2)
  );

  // Log type breakdown
  const byType = {};
  for (const e of entries) {
    byType[e.type] = (byType[e.type] || 0) + 1;
  }
  console.log(`  → ${entries.length} unique weak verb entries`);
  console.log(`  → Type breakdown: ${JSON.stringify(byType)}`);
}

// ─── Run All ─────────────────────────────────────────────────────────────────
console.log('Starting Quran data extraction...\n');

const surahNames = extractSurahNames();
extractParticles();
const lemmaRows = extractLemmas();
extractAyahTranslations();
extractRootFrequency();
extractRootToLemma(lemmaRows);
extractSurahWords(surahNames);
extractTransformations();
extractWeakVerbs();
extractGrammarPatterns();
extractRootFamilyTrees();
extractMorphemes();
extractSurahWordStats();

// Build Kalaam DB ID → sequential ID mapping before closing en_quran.db
const kalaamToSeqId = {};
for (const r of lemmaRows) {
  if (r.lemmaId != null) {
    kalaamToSeqId[r.lemmaId] = r.id;
  }
}

db.close();

// Open Kalaam DB for additional data
let kalaamDb;
try {
  kalaamDb = new Database(KALAAM_DB_PATH, { readonly: true });
  console.log(`\nOpened Kalaam DB: ${KALAAM_DB_PATH}`);
  extractLemmaContext(kalaamDb, kalaamToSeqId);
  extractGrammarTags(kalaamDb);
  extractCorpusMorphology(kalaamDb);
  kalaamDb.close();
} catch (e) {
  console.warn(`\nKalaam DB not found at ${KALAAM_DB_PATH}, skipping Kalaam extractions`);
  console.warn(`  Error: ${e.message}`);
}

console.log('\nDone! All data files generated.');
