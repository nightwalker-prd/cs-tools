#!/usr/bin/env node
/**
 * Regenerate quran-words data for the hafiz app from en_quran.db + quran.db.
 *
 * Uses two databases:
 * - en_quran.db: transformations (word forms, meanings, roots), transliterations
 * - quran.db (Kalaam): morphology table for accurate word-to-lemma mapping
 *
 * Fixes over AI-generated data:
 * - Correct lemmaId values (from morphology table, not diacritics guessing)
 * - Clean meanings from database (strip parenthetical grammar notes)
 * - Correct roots from step=1 transformations
 * - Correct transliterations from wordTransliteration table
 *
 * Usage: node scripts/regenerate-hafiz-words.js [en_quran.db] [quran.db]
 */

import Database from 'better-sqlite3';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const EN_DB_PATH =
  process.argv[2] || join(process.env.HOME, 'Desktop', 'en_quran.db');
const KALAAM_DB_PATH =
  process.argv[3] ||
  join(process.env.HOME, 'Downloads', 'old-downloads', 'quran.db');
const WORDS_DIR = join(ROOT, 'apps/hafiz/public/data/quran-words');
const LEMMAS_PATH = join(ROOT, 'apps/hafiz/public/data/lemmas.json');

mkdirSync(WORDS_DIR, { recursive: true });

// Arabic diacritics regex
const DIACRITICS =
  /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g;
function stripDiacritics(s) {
  return s.replace(DIACRITICS, '');
}

/**
 * Clean a meaning string by removing parenthetical grammar/context notes
 * while preserving meaningful English parenthetical content.
 */
function cleanMeaning(meaning) {
  if (!meaning) return '';

  // Strip parenthetical content containing Arabic characters (cross-references)
  let cleaned = meaning.replace(
    /\s*\([^)]*[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF][^)]*\)/g,
    '',
  );

  // Strip grammar case notes: (in genitive case), (in possessive case), etc.
  cleaned = cleaned.replace(/\s*\(in \w+ case\)/gi, '');

  // Strip contextual role notes: (subject of ...), (object of ...), etc.
  cleaned = cleaned.replace(
    /\s*\((?:subject|object|describes?|owned|connected|belonging|possessed|refers?|modifier|complement|predicate|attribute)\b[^)]*\)/gi,
    '',
  );

  // Strip generic contextual notes
  cleaned = cleaned.replace(
    /\s*\((?:of (?:this|the) (?:ayah|sentence|verse|clause))[^)]*\)/gi,
    '',
  );

  // Clean up whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  return cleaned;
}

// ─── Open databases ──────────────────────────────────────────────────────────
console.log(`Opening en_quran.db: ${EN_DB_PATH}`);
const enDb = new Database(EN_DB_PATH, { readonly: true });

let kalaamDb = null;
try {
  console.log(`Opening quran.db: ${KALAAM_DB_PATH}`);
  kalaamDb = new Database(KALAAM_DB_PATH, { readonly: true });
} catch (e) {
  console.warn(`  Warning: Could not open quran.db: ${e.message}`);
  console.warn('  Falling back to diacritics-stripping for lemma matching');
}

// ─── Build lemma lookups ─────────────────────────────────────────────────────
console.log('Building lemma lookups...');
const lemmaRows = enDb
  .prepare(
    'SELECT id, lemma, meaning, transliteration, lemmaId FROM lemmaTranslation ORDER BY id',
  )
  .all();

// Fallback: stripped lemma form → lemmaId (for words not in morphology table)
const lemmaByStripped = {};
for (const l of lemmaRows) {
  const stripped = stripDiacritics(l.lemma);
  if (!lemmaByStripped[stripped]) lemmaByStripped[stripped] = l.lemmaId;
}

// Primary: use morphology from quran.db for accurate lemma mapping
// Build: lemma form → lemmaCount.id (which equals lemmaTranslation.lemmaId)
const lemmaFormToId = {};
if (kalaamDb) {
  const lemmaCountRows = kalaamDb
    .prepare('SELECT id, lemma FROM lemmaCount')
    .all();
  for (const lc of lemmaCountRows) {
    lemmaFormToId[lc.lemma] = Number(lc.id);
  }
  console.log(`  → ${lemmaCountRows.length} lemma forms from quran.db`);
}
console.log(`  → ${lemmaRows.length} lemmas from en_quran.db`);

// ─── Build morphology word→lemmaId lookup ────────────────────────────────────
// For each word (wordLoc), find the primary lemma from morphology table
const wordLemmaMap = {};
if (kalaamDb) {
  console.log('Building word→lemma map from morphology...');
  const morphRows = kalaamDb
    .prepare(
      `
    SELECT wordLoc, lemma, root, partOfSpeech
    FROM morphology
    ORDER BY surahNum, ayahNum, wordNum, id
  `,
    )
    .all();

  // For each wordLoc, pick the best morpheme for lemma mapping:
  // Prefer morpheme with a root (content word), otherwise use the first one
  const wordMorphemes = {};
  for (const m of morphRows) {
    if (!wordMorphemes[m.wordLoc]) wordMorphemes[m.wordLoc] = [];
    wordMorphemes[m.wordLoc].push(m);
  }

  for (const [wordLoc, morphemes] of Object.entries(wordMorphemes)) {
    // Find the "primary" morpheme: one with a root, or the longest lemma
    let best = morphemes[0];
    for (const m of morphemes) {
      if (m.root && !best.root) {
        best = m;
      } else if (m.root && best.root && m.lemma.length > best.lemma.length) {
        best = m;
      }
    }

    const lemmaId = lemmaFormToId[best.lemma];
    if (lemmaId != null) {
      wordLemmaMap[wordLoc] = lemmaId;
    }
  }
  console.log(
    `  → ${Object.keys(wordLemmaMap).length} words mapped to lemmaIds`,
  );
}

// ─── Regenerate lemmas.json ──────────────────────────────────────────────────
console.log('Regenerating lemmas.json...');
const lemmasJson = lemmaRows.map((r) => ({
  id: r.id,
  lemma: r.lemma,
  meaning: r.meaning,
  transliteration: r.transliteration,
  lemmaId: r.lemmaId,
}));
writeFileSync(LEMMAS_PATH, JSON.stringify(lemmasJson, null, 2));
console.log(`  → ${lemmasJson.length} lemmas written`);

// ─── Extract per-surah word files ────────────────────────────────────────────
console.log('Extracting per-surah word files...');

let totalWords = 0;
let morphMatches = 0;
let fallbackMatches = 0;
let noMatch = 0;
let cleanedMeanings = 0;

for (let surahNum = 1; surahNum <= 114; surahNum++) {
  // Get final-step words (the actual word forms in the Quran)
  // Use COALESCE to fall back to second-to-last step if final step has null word
  const words = enDb
    .prepare(
      `
    SELECT
      t.surahNum, t.ayahNum, t.wordNum,
      COALESCE(t.new_word, (
        SELECT t3.new_word FROM transformations t3
        WHERE t3.wordLoc = t.wordLoc AND t3.new_word IS NOT NULL
        ORDER BY t3.step DESC LIMIT 1
      )) as word,
      t.new_meaning as meaning
    FROM transformations t
    WHERE t.surahNum = ? AND t.step = (
      SELECT MAX(t2.step) FROM transformations t2 WHERE t2.wordLoc = t.wordLoc
    )
    ORDER BY t.ayahNum, t.wordNum
  `,
    )
    .all(surahNum);

  // Get step=1,2 roots and base words for fallback lemma matching
  const earlySteps = enDb
    .prepare(
      `
    SELECT wordLoc, root, new_word, step FROM transformations
    WHERE surahNum = ? AND step IN (1, 2)
    ORDER BY wordLoc, step
  `,
    )
    .all(surahNum);

  const rootMap = {};
  const baseWordStep1 = {};
  const baseWordStep2 = {};
  for (const rs of earlySteps) {
    if (rs.step === 1) {
      rootMap[rs.wordLoc] = rs.root || '';
      baseWordStep1[rs.wordLoc] = rs.new_word || '';
    } else {
      baseWordStep2[rs.wordLoc] = rs.new_word || '';
    }
  }

  // Get transliterations
  const translits = enDb
    .prepare(
      `
    SELECT id, transliteration FROM wordTransliteration
    WHERE id LIKE ?
  `,
    )
    .all(`${surahNum}:%`);

  const translitMap = {};
  for (const t of translits) {
    translitMap[t.id] = t.transliteration;
  }

  const surahWords = words.map((w) => {
    const wordLoc = `${w.surahNum}:${w.ayahNum}:${w.wordNum}`;
    const root = rootMap[wordLoc] || '';

    // Try morphology-based lemmaId first (most accurate)
    let lemmaId = wordLemmaMap[wordLoc] ?? null;

    if (lemmaId != null) {
      morphMatches++;
    } else {
      // Fallback: try diacritics-stripping on step 1 and step 2 base words
      const step1Word = baseWordStep1[wordLoc] || '';
      const step2Word = baseWordStep2[wordLoc] || '';
      for (const candidate of [step1Word, step2Word]) {
        if (!candidate) continue;
        const stripped = stripDiacritics(candidate);
        if (lemmaByStripped[stripped] != null) {
          lemmaId = lemmaByStripped[stripped];
          fallbackMatches++;
          break;
        }
      }
      if (lemmaId == null) noMatch++;
    }

    // Clean the meaning
    const rawMeaning = w.meaning || '';
    const meaning = cleanMeaning(rawMeaning);
    if (meaning !== rawMeaning) cleanedMeanings++;

    return {
      id: wordLoc,
      ayahNum: w.ayahNum,
      wordNum: w.wordNum,
      word: w.word,
      meaning,
      transliteration: translitMap[wordLoc] || '',
      root,
      lemmaId,
    };
  });

  writeFileSync(
    join(WORDS_DIR, `surah-${surahNum}.json`),
    JSON.stringify(surahWords),
  );
  totalWords += surahWords.length;

  if (surahNum % 20 === 0 || surahNum === 1) {
    console.log(`  → surah-${surahNum}.json: ${surahWords.length} words`);
  }
}

console.log(`\n  → 114 surah files written (${totalWords} total words)`);
console.log(
  `  → Lemma matches: ${morphMatches} morphology, ${fallbackMatches} fallback, ${noMatch} unmatched`,
);
console.log(`  → Meanings cleaned: ${cleanedMeanings}`);

enDb.close();
if (kalaamDb) kalaamDb.close();
console.log('\nDone!');
