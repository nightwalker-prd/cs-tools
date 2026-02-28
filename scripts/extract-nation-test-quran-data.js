#!/usr/bin/env node
/**
 * Extract Quranic data from quran.db and en_quran.db for nation-test app.
 * Generates JSON data files for 4 new test types:
 *   1. Quranic Frequency VST (quranic-vst.json)
 *   2. Ayah Context Cloze (ayah-context/surah-{N}.json)
 *   3. Morphological Chain (morph-chains.json)
 *   4. Grammar Tag Identification (grammar-tags.json)
 *
 * Usage: node scripts/extract-nation-test-quran-data.js
 */

import Database from 'better-sqlite3';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const QURAN_DB_PATH = process.argv[2] || join(process.env.HOME, 'Downloads', 'quran.db');
const EN_QURAN_DB_PATH = process.argv[3] || join(process.env.HOME, 'Downloads', 'en_quran.db');
const DATA_DIR = join(ROOT, 'apps/nation-test/public/data');

mkdirSync(DATA_DIR, { recursive: true });
mkdirSync(join(DATA_DIR, 'ayah-context'), { recursive: true });

console.log(`Opening quran.db: ${QURAN_DB_PATH}`);
const qdb = new Database(QURAN_DB_PATH, { readonly: true });

console.log(`Opening en_quran.db: ${EN_QURAN_DB_PATH}`);
const edb = new Database(EN_QURAN_DB_PATH, { readonly: true });

// ─── Helpers ──────────────────────────────────────────────────────────────────

function tierFromRank(rank) {
  if (rank <= 100) return 'q100';
  if (rank <= 300) return 'q300';
  if (rank <= 600) return 'q600';
  if (rank <= 1000) return 'q1000';
  return 'q_all';
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── 1. Quranic Frequency VST ────────────────────────────────────────────────

function extractQuranicVst() {
  console.log('\n=== Extracting Quranic VST data ===');

  // Get all lemmas ranked by frequency
  const lemmas = qdb.prepare(`
    SELECT id, lemma, count, isP FROM lemmaCount ORDER BY CAST(id AS INTEGER)
  `).all();
  console.log(`  → ${lemmas.length} lemmas from lemmaCount`);

  // Get cached test data (language_id=19 = English)
  const testDataRows = qdb.prepare(`
    SELECT id, lemma, translation, choice2, choice3, choice4
    FROM cacheTestData WHERE language_id = 19
  `).all();
  const testDataMap = {};
  for (const r of testDataRows) {
    testDataMap[r.id] = r;
  }
  console.log(`  → ${testDataRows.length} cached test entries`);

  // Get best morphology row per lemma
  const morphRows = qdb.prepare(`
    SELECT lemmaId, location, wordLoc, arabic, partOfSpeech, verbForm, grammar,
           root, lemma, surahNum, ayahNum, wordNum
    FROM bestMorphologyRowForLemma
  `).all();
  const morphMap = {};
  for (const r of morphRows) {
    morphMap[r.lemmaId] = r;
  }
  console.log(`  → ${morphRows.length} best morphology rows`);

  // Get lemma translations from en_quran.db
  const lemmaTransRows = edb.prepare(`
    SELECT id, lemma, meaning, transliteration, info FROM lemmaTranslation
  `).all();
  const lemmaTransMap = {};
  for (const r of lemmaTransRows) {
    lemmaTransMap[r.lemma] = r;
  }
  console.log(`  → ${lemmaTransRows.length} lemma translations`);

  // Get ayah context from lemmaInAyahTranslation
  const contextRows = qdb.prepare(`
    SELECT lemma, location, textBefore, closestExactMatch, textAfter
    FROM lemmaInAyahTranslation
  `).all();
  const contextMap = {};
  for (const r of contextRows) {
    if (!contextMap[r.lemma]) contextMap[r.lemma] = r;
  }
  console.log(`  → ${contextRows.length} context rows`);

  // Build ayah lookups
  const ayahArabicRows = qdb.prepare(`SELECT surahNum, ayahNum, ayah FROM ayahArabic`).all();
  const ayahArabicMap = {};
  for (const r of ayahArabicRows) {
    ayahArabicMap[`${r.surahNum}:${r.ayahNum}`] = r.ayah;
  }

  const ayahEnglishRows = edb.prepare(`SELECT surahNum, ayahNum, text FROM ayahTranslation`).all();
  const ayahEnglishMap = {};
  for (const r of ayahEnglishRows) {
    ayahEnglishMap[`${r.surahNum}:${r.ayahNum}`] = r.text;
  }

  const items = [];
  let skipped = 0;

  for (let i = 0; i < lemmas.length; i++) {
    const lc = lemmas[i];
    const rank = i + 1;
    const td = testDataMap[lc.id];
    if (!td || !td.translation) { skipped++; continue; }

    const morph = morphMap[lc.id] || {};
    const trans = lemmaTransMap[lc.lemma] || {};
    const ctx = contextMap[lc.lemma];

    // Parse surah:ayah from morph location or context
    let surahNum = morph.surahNum || 0;
    let ayahNum = morph.ayahNum || 0;
    if (!surahNum && ctx && ctx.location) {
      const parts = ctx.location.split(':');
      surahNum = parseInt(parts[0]) || 0;
      ayahNum = parseInt(parts[1]) || 0;
    }

    const ayahKey = `${surahNum}:${ayahNum}`;

    // Simplify POS
    let pos = 'N';
    const rawPOS = (morph.partOfSpeech || '').toUpperCase();
    if (rawPOS.includes('V') || rawPOS === 'V' || rawPOS.includes('VERB')) pos = 'V';
    else if (rawPOS.includes('P') && !rawPOS.includes('PN') && !rawPOS.includes('PRON')) pos = 'P';

    items.push({
      id: `qvst-${lc.id}`,
      lemma: lc.lemma,
      meaning: td.translation,
      transliteration: trans.transliteration || '',
      root: morph.root || '',
      pos,
      count: lc.count,
      tier: tierFromRank(rank),
      rank,
      surahNum,
      ayahNum,
      distractors: [td.choice2, td.choice3, td.choice4].filter(Boolean),
      contextBefore: ctx?.textBefore || '',
      contextMatch: ctx?.closestExactMatch || '',
      contextAfter: ctx?.textAfter || '',
      ayahArabic: ayahArabicMap[ayahKey] || '',
      ayahEnglish: ayahEnglishMap[ayahKey] || '',
      etymology: (trans.info || '').slice(0, 300),
    });
  }

  writeFileSync(join(DATA_DIR, 'quranic-vst.json'), JSON.stringify(items));
  console.log(`  → ${items.length} VST items written (${skipped} skipped)`);
  console.log(`  → Tier breakdown: q100=${items.filter(i => i.tier === 'q100').length}, q300=${items.filter(i => i.tier === 'q300').length}, q600=${items.filter(i => i.tier === 'q600').length}, q1000=${items.filter(i => i.tier === 'q1000').length}, q_all=${items.filter(i => i.tier === 'q_all').length}`);
}

// ─── 2. Ayah Context Cloze ───────────────────────────────────────────────────

function extractAyahContext() {
  console.log('\n=== Extracting Ayah Context Cloze data ===');

  // Build lemma frequency rank lookup
  const lemmas = qdb.prepare(`SELECT id, lemma, count FROM lemmaCount ORDER BY CAST(id AS INTEGER)`).all();
  const lemmaRankMap = {};
  for (let i = 0; i < lemmas.length; i++) {
    lemmaRankMap[lemmas[i].lemma] = i + 1;
  }

  // Get ayah texts
  const ayahArabicRows = qdb.prepare(`SELECT surahNum, ayahNum, ayah FROM ayahArabic`).all();
  const ayahArabicMap = {};
  for (const r of ayahArabicRows) {
    ayahArabicMap[`${r.surahNum}:${r.ayahNum}`] = r.ayah;
  }

  const ayahEnglishRows = edb.prepare(`SELECT surahNum, ayahNum, text FROM ayahTranslation`).all();
  const ayahEnglishMap = {};
  for (const r of ayahEnglishRows) {
    ayahEnglishMap[`${r.surahNum}:${r.ayahNum}`] = r.text;
  }

  // Get word translations (final step meanings from en_quran.db)
  const wordTransRows = edb.prepare(`
    SELECT CAST(surahNum || ':' || ayahNum || ':' || wordNum AS TEXT) as id,
           new_meaning as translation, surahNum, ayahNum, wordNum
    FROM transformations
    WHERE step = (SELECT MAX(step) FROM transformations t2 WHERE t2.wordLoc = transformations.wordLoc)
    ORDER BY surahNum, ayahNum, wordNum
  `).all();

  // Get word transliterations
  const translitRows = edb.prepare(`SELECT id, transliteration FROM wordTransliteration`).all();
  const translitMap = {};
  for (const r of translitRows) {
    translitMap[r.id] = r.transliteration;
  }

  // Get morphology for POS and lemma
  const morphRows = qdb.prepare(`
    SELECT wordLoc, partOfSpeech, lemma, root
    FROM morphology
    WHERE id IN (
      SELECT MIN(id) FROM morphology GROUP BY wordLoc
    )
  `).all();
  const morphMap = {};
  for (const r of morphRows) {
    morphMap[r.wordLoc] = r;
  }

  // Get all cached test data for distractor generation
  const testDataRows = qdb.prepare(`
    SELECT id, lemma, translation, choice2, choice3, choice4
    FROM cacheTestData WHERE language_id = 19
  `).all();
  // Map by lemma for distractor lookup
  const testDataByLemma = {};
  for (const r of testDataRows) {
    testDataByLemma[r.lemma] = r;
  }

  // Build a bank of content word translations for distractors
  const allTranslations = [];
  const translationsByPOS = { N: [], V: [], P: [] };
  for (const r of testDataRows) {
    if (r.translation) {
      allTranslations.push(r.translation);
      // We'll categorize distractors broadly
    }
  }

  console.log(`  → ${wordTransRows.length} word translations`);

  let totalItems = 0;
  let skippedSurahs = 0;

  for (let surahNum = 1; surahNum <= 114; surahNum++) {
    const surahWords = wordTransRows.filter(w => w.surahNum === surahNum);
    const items = [];

    for (const w of surahWords) {
      const wordLoc = `${w.surahNum}:${w.ayahNum}:${w.wordNum}`;
      const morph = morphMap[wordLoc];
      if (!morph) continue;

      // Skip particles and very short translations
      const translation = (w.translation || '').trim();
      if (!translation || translation.length < 2) continue;

      const lemma = morph.lemma || '';
      const rank = lemmaRankMap[lemma];
      if (!rank) continue; // Skip if not in lemma frequency list

      // Get POS category
      const rawPOS = (morph.partOfSpeech || '').toUpperCase();
      let pos = 'N';
      if (rawPOS.includes('V') || rawPOS === 'V') pos = 'V';
      else if ((rawPOS.includes('P') && !rawPOS.includes('PN') && !rawPOS.includes('PRON')) || rawPOS.includes('CONJ') || rawPOS.includes('DET')) pos = 'P';

      // Skip particles for cloze (not interesting)
      if (pos === 'P') continue;

      const ayahKey = `${w.surahNum}:${w.ayahNum}`;
      const ayahArabic = ayahArabicMap[ayahKey] || '';
      const ayahEnglish = ayahEnglishMap[ayahKey] || '';
      if (!ayahEnglish) continue;

      // Find blank position in English text
      const blankPosition = ayahEnglish.toLowerCase().indexOf(translation.toLowerCase());

      // Generate distractors from cached test data
      const td = testDataByLemma[lemma];
      let distractors = [];
      if (td) {
        distractors = [td.choice2, td.choice3, td.choice4].filter(Boolean);
      }
      // If not enough, pick random translations
      while (distractors.length < 3) {
        const randIdx = Math.floor(Math.random() * allTranslations.length);
        const d = allTranslations[randIdx];
        if (d && d !== translation && !distractors.includes(d)) {
          distractors.push(d);
        }
      }
      distractors = distractors.slice(0, 3);

      items.push({
        id: `ac-${wordLoc}`,
        surahNum: w.surahNum,
        ayahNum: w.ayahNum,
        wordNum: w.wordNum,
        arabic: morph.lemma || '',
        targetTranslation: translation,
        ayahArabic,
        ayahEnglish,
        blankPosition,
        distractors,
        pos,
        lemma,
        tier: tierFromRank(rank),
        transliteration: translitMap[wordLoc] || '',
      });
    }

    if (items.length > 0) {
      writeFileSync(join(DATA_DIR, 'ayah-context', `surah-${surahNum}.json`), JSON.stringify(items));
      totalItems += items.length;
    } else {
      skippedSurahs++;
    }

    if (surahNum % 20 === 0 || surahNum === 1) {
      console.log(`  → surah-${surahNum}: ${items.length} items`);
    }
  }

  console.log(`  → ${totalItems} total ayah context items across 114 surahs (${skippedSurahs} empty)`);
}

// ─── 3. Morphological Chain ──────────────────────────────────────────────────

function extractMorphChains() {
  console.log('\n=== Extracting Morphological Chain data ===');

  // Build lemma frequency rank lookup
  const lemmas = qdb.prepare(`SELECT id, lemma FROM lemmaCount ORDER BY CAST(id AS INTEGER)`).all();
  const lemmaRankMap = {};
  for (let i = 0; i < lemmas.length; i++) {
    lemmaRankMap[lemmas[i].lemma] = i + 1;
  }

  // Get all transformations grouped by wordLoc
  const rows = edb.prepare(`
    SELECT wordLoc, surahNum, ayahNum, wordNum, step, root,
           new_word, new_meaning, change_identifier, form, affixes
    FROM transformations
    ORDER BY surahNum, ayahNum, wordNum, step
  `).all();

  console.log(`  → ${rows.length} transformation rows`);

  // Group by wordLoc
  const byWord = {};
  for (const r of rows) {
    if (!byWord[r.wordLoc]) byWord[r.wordLoc] = [];
    byWord[r.wordLoc].push(r);
  }

  // Get lemma translations for root meanings
  const lemmaTransRows = edb.prepare(`SELECT lemma, meaning FROM lemmaTranslation`).all();
  const lemmaMeaningMap = {};
  for (const r of lemmaTransRows) {
    lemmaMeaningMap[r.lemma] = r.meaning;
  }

  // Build chains from word groups with 2+ steps
  const chains = [];
  const seen = new Set(); // Avoid duplicate chains (same root + step count)

  for (const [wordLoc, steps] of Object.entries(byWord)) {
    if (steps.length < 2) continue;

    const root = steps[0].root || '';
    if (!root) continue;

    // Deduplicate: one chain per root-stepCount combo (keep first)
    const dedupeKey = `${root}:${steps.length}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    // Get frequency tier from root's lemma
    const rank = lemmaRankMap[root] || lemmaRankMap[steps[0].new_word] || 5000;
    const rootMeaning = lemmaMeaningMap[root] || steps[0].new_meaning || '';

    const chainSteps = steps.map(s => {
      let affixes = null;
      if (s.affixes) {
        try { affixes = JSON.parse(s.affixes); } catch (_) { /* skip */ }
      }
      return {
        arabic: s.new_word,
        meaning: s.new_meaning || '',
        changeDesc: s.change_identifier || '',
        form: s.form || '',
        affixes: affixes ? JSON.stringify(affixes) : '',
      };
    });

    // Choose a random step to blank (not the first or last for variety, but allow it for short chains)
    const blankStep = steps.length <= 2
      ? Math.floor(Math.random() * steps.length)
      : 1 + Math.floor(Math.random() * (steps.length - 2));

    // Generate distractors: similar Arabic words
    // Use other words from same root or nearby entries
    const correctWord = chainSteps[blankStep].arabic;
    const distractors = [];

    // Find other words with same root but different forms
    const sameRootWords = Object.values(byWord)
      .filter(ws => ws[0]?.root === root && ws !== steps)
      .map(ws => ws[blankStep]?.new_word || ws[ws.length - 1]?.new_word)
      .filter(w => w && w !== correctWord);

    for (const w of shuffle(sameRootWords).slice(0, 3)) {
      if (!distractors.includes(w)) distractors.push(w);
    }

    // Fill remaining distractors from nearby entries
    if (distractors.length < 3) {
      const allWords = Object.values(byWord)
        .map(ws => ws[Math.min(blankStep, ws.length - 1)]?.new_word)
        .filter(w => w && w !== correctWord && !distractors.includes(w));
      for (const w of shuffle(allWords).slice(0, 3 - distractors.length)) {
        distractors.push(w);
      }
    }

    chains.push({
      id: `mc-${wordLoc}`,
      root,
      rootMeaning,
      tier: tierFromRank(rank),
      steps: chainSteps,
      blankStep,
      distractors: distractors.slice(0, 3),
    });
  }

  // Sort by frequency tier, then limit to ~5000
  chains.sort((a, b) => {
    const tierOrder = { q100: 0, q300: 1, q600: 2, q1000: 3, q_all: 4 };
    return (tierOrder[a.tier] || 4) - (tierOrder[b.tier] || 4);
  });
  const curated = chains.slice(0, 5000);

  writeFileSync(join(DATA_DIR, 'morph-chains.json'), JSON.stringify(curated));
  console.log(`  → ${curated.length} morph chains written (from ${chains.length} total)`);
  console.log(`  → Length breakdown: short(2-3)=${curated.filter(c => c.steps.length <= 3).length}, medium(4-5)=${curated.filter(c => c.steps.length >= 4 && c.steps.length <= 5).length}, long(6+)=${curated.filter(c => c.steps.length >= 6).length}`);
}

// ─── 4. Grammar Tag Identification ──────────────────────────────────────────

function extractGrammarTags() {
  console.log('\n=== Extracting Grammar Tag data ===');

  // Build lemma frequency rank lookup
  const lemmas = qdb.prepare(`SELECT id, lemma FROM lemmaCount ORDER BY CAST(id AS INTEGER)`).all();
  const lemmaRankMap = {};
  for (let i = 0; i < lemmas.length; i++) {
    lemmaRankMap[lemmas[i].lemma] = i + 1;
  }

  // Get grammar descriptions and colors
  const grammarRows = qdb.prepare(`
    SELECT grammar, color, verbose_desc, friendly_desc FROM grammar
  `).all();
  const grammarMap = {};
  for (const r of grammarRows) {
    grammarMap[r.grammar] = {
      color: r.color || '#666',
      verbose: r.verbose_desc || '',
      friendly: r.friendly_desc || '',
    };
  }
  console.log(`  → ${grammarRows.length} grammar tags`);

  // Get morphology data
  const morphRows = qdb.prepare(`
    SELECT location, wordLoc, arabic, partOfSpeech, verbForm, grammar,
           root, lemma, surahNum, ayahNum, wordNum
    FROM morphology
    ORDER BY surahNum, ayahNum, wordNum
  `).all();
  console.log(`  → ${morphRows.length} morphology rows`);

  // Get ayah texts
  const ayahArabicRows = qdb.prepare(`SELECT surahNum, ayahNum, ayah FROM ayahArabic`).all();
  const ayahArabicMap = {};
  for (const r of ayahArabicRows) {
    ayahArabicMap[`${r.surahNum}:${r.ayahNum}`] = r.ayah;
  }

  const ayahEnglishRows = edb.prepare(`SELECT surahNum, ayahNum, text FROM ayahTranslation`).all();
  const ayahEnglishMap = {};
  for (const r of ayahEnglishRows) {
    ayahEnglishMap[`${r.surahNum}:${r.ayahNum}`] = r.text;
  }

  // Get word translations
  const wordTransRows = edb.prepare(`
    SELECT CAST(surahNum || ':' || ayahNum || ':' || wordNum AS TEXT) as id,
           new_meaning as translation
    FROM transformations
    WHERE step = (SELECT MAX(step) FROM transformations t2 WHERE t2.wordLoc = transformations.wordLoc)
  `).all();
  const wordTransMap = {};
  for (const r of wordTransRows) {
    wordTransMap[r.id] = r.translation;
  }

  // Strip ROOT:xxx|, LEM:xxx|, LEM:xxx (at end), FAM:xxx from morphology grammar
  // to match the simplified format in the grammar lookup table.
  // morphology: "ROOT:سمو|LEM:اسْم|M|GEN" → grammar table: "M|GEN"
  function stripGrammar(g) {
    if (!g) return '';
    return g
      .replace(/ROOT:[^|]+\|/g, '')
      .replace(/LEM:[^|]+\|/g, '')
      .replace(/\|LEM:[^|]+$/g, '')
      .replace(/^LEM:[^|]+$/g, '')
      .replace(/FAM:[^|]+\|/g, '')
      .replace(/\|FAM:[^|]+$/g, '')
      .replace(/^FAM:[^|]+$/g, '');
  }

  const allGrammarTags = Object.keys(grammarMap);

  // Group tags by POS for same-category distractors
  const tagsByPOS = { N: [], V: [], P: [] };
  for (const tag of allGrammarTags) {
    const info = grammarMap[tag];
    const desc = (info.verbose || info.friendly || '').toLowerCase();
    if (desc.includes('verb') || tag.includes('V')) tagsByPOS.V.push(tag);
    else if (desc.includes('noun') || desc.includes('adj') || tag.includes('N') || tag.includes('ADJ')) tagsByPOS.N.push(tag);
    else tagsByPOS.P.push(tag);
  }

  const items = [];
  const seen = new Set();

  for (const morph of morphRows) {
    if (!morph.grammar || !morph.lemma) continue;

    const rank = lemmaRankMap[morph.lemma];
    if (!rank) continue;

    // Strip ROOT/LEM/FAM metadata to get the grammar table key
    const strippedTag = stripGrammar(morph.grammar);
    if (!strippedTag) continue;

    // Deduplicate by stripped grammar tag + lemma
    const dedupeKey = `${strippedTag}:${morph.lemma}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    const grammarInfo = grammarMap[strippedTag];
    if (!grammarInfo) continue;

    const ayahKey = `${morph.surahNum}:${morph.ayahNum}`;
    const ayahArabic = ayahArabicMap[ayahKey] || '';
    const ayahEnglish = ayahEnglishMap[ayahKey] || '';
    if (!ayahArabic || !ayahEnglish) continue;

    const meaning = wordTransMap[morph.wordLoc] || '';

    // Determine POS category for distractors
    let posCategory = 'N';
    const rawPOS = (morph.partOfSpeech || '').toUpperCase();
    if (rawPOS.includes('V') || rawPOS === 'V') posCategory = 'V';
    else if (rawPOS.includes('P') && !rawPOS.includes('PN') && !rawPOS.includes('PRON')) posCategory = 'P';

    // Generate 3 distractors from same POS category
    const correctTag = strippedTag;
    const pool = (tagsByPOS[posCategory] || allGrammarTags)
      .filter(t => t !== correctTag);
    const distractors = shuffle(pool).slice(0, 3).map(tag => ({
      tag,
      desc: grammarMap[tag]?.friendly || grammarMap[tag]?.verbose || tag,
      color: grammarMap[tag]?.color || '#666',
    }));

    if (distractors.length < 3) continue;

    items.push({
      id: `gt-${morph.location}`,
      surahNum: morph.surahNum,
      ayahNum: morph.ayahNum,
      wordNum: morph.wordNum,
      arabic: morph.arabic,
      meaning,
      ayahArabic,
      ayahEnglish,
      correctTag,
      correctTagDesc: grammarInfo.friendly || grammarInfo.verbose || correctTag,
      correctTagColor: grammarInfo.color,
      distractors,
      root: morph.root || '',
      lemma: morph.lemma,
      pos: morph.partOfSpeech || '',
      verbForm: morph.verbForm || '',
      tier: tierFromRank(rank),
    });
  }

  // Sort by tier, limit to ~10000
  items.sort((a, b) => {
    const tierOrder = { q100: 0, q300: 1, q600: 2, q1000: 3, q_all: 4 };
    return (tierOrder[a.tier] || 4) - (tierOrder[b.tier] || 4);
  });
  const curated = items.slice(0, 10000);

  writeFileSync(join(DATA_DIR, 'grammar-tags.json'), JSON.stringify(curated));
  console.log(`  → ${curated.length} grammar tag items written (from ${items.length} unique)`);
  console.log(`  → Tier breakdown: q100=${curated.filter(i => i.tier === 'q100').length}, q300=${curated.filter(i => i.tier === 'q300').length}, q600=${curated.filter(i => i.tier === 'q600').length}, q1000=${curated.filter(i => i.tier === 'q1000').length}, q_all=${curated.filter(i => i.tier === 'q_all').length}`);
}

// ─── Run All ─────────────────────────────────────────────────────────────────

console.log('Starting nation-test Quranic data extraction...\n');
extractQuranicVst();
extractAyahContext();
extractMorphChains();
extractGrammarTags();

qdb.close();
edb.close();
console.log('\nDone! All JSON data files generated in apps/nation-test/public/data/');
