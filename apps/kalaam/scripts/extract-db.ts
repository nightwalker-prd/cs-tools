/**
 * extract-db.ts — Reads quran.db and en_quran.db (English.zip) and writes
 * chunked JSON to apps/kalaam/public/data/{meta,quran,words,grammar}/
 *
 * Run:  cd apps/kalaam && npx tsx scripts/extract-db.ts
 *   or: pnpm --filter @arabtools/kalaam extract-data
 */

import Database from 'better-sqlite3';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_DIR =
  '/Users/miftah/Desktop/kalaam/extracted/Payload/Kalaam.app/assets/src/assets/db';
const QURAN_DB_PATH = path.join(DB_DIR, 'quran.db');
const ENGLISH_ZIP_PATH = path.join(DB_DIR, 'English.zip');
const EN_QURAN_DB_PATH = '/tmp/en_quran.db';

const APP_ROOT = path.resolve(__dirname, '..');
const DATA_ROOT = path.join(APP_ROOT, 'public', 'data');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJSON(filePath: string, data: unknown) {
  fs.writeFileSync(filePath, JSON.stringify(data));
}

function log(msg: string) {
  console.log(`[extract] ${msg}`);
}

/**
 * Strip ROOT:xxx and LEM:xxx segments from a morphology grammar string
 * to produce the canonical grammar tag that matches the `grammar` table.
 *
 * Example: "ROOT:سمو|LEM:اسْم|M|GEN" -> "M|GEN"
 */
function extractGrammarTag(fullGrammar: string): string {
  return fullGrammar
    .split('|')
    .filter((seg) => !seg.startsWith('ROOT:') && !seg.startsWith('LEM:'))
    .join('|');
}

// ---------------------------------------------------------------------------
// 1. Extract English.zip if needed
// ---------------------------------------------------------------------------
if (!fs.existsSync(EN_QURAN_DB_PATH)) {
  log('Extracting English.zip ...');
  execSync(`unzip -o "${ENGLISH_ZIP_PATH}" -d /tmp`);
}

if (!fs.existsSync(EN_QURAN_DB_PATH)) {
  console.error('ERROR: en_quran.db not found after extraction');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. Open both databases
// ---------------------------------------------------------------------------
log('Opening databases...');
const quranDb = new Database(QURAN_DB_PATH, { readonly: true });
const enDb = new Database(EN_QURAN_DB_PATH, { readonly: true });

// ---------------------------------------------------------------------------
// Pre-build grammar lookup:  grammarTag -> { color, verbose_desc, friendly_desc }
// ---------------------------------------------------------------------------
interface GrammarInfo {
  color: string;
  verbose_desc: string;
  friendly_desc: string;
}

const grammarMap = new Map<string, GrammarInfo>();
const grammarRows = quranDb
  .prepare('SELECT grammar, color, verbose_desc, friendly_desc FROM grammar')
  .all() as { grammar: string; color: string; verbose_desc: string; friendly_desc: string }[];
for (const r of grammarRows) {
  grammarMap.set(r.grammar, r);
}

// ---------------------------------------------------------------------------
// 3. Meta extraction
// ---------------------------------------------------------------------------
function extractMeta() {
  const metaDir = path.join(DATA_ROOT, 'meta');
  ensureDir(metaDir);

  // ---- surah-index.json ----
  log('Extracting meta/surah-index.json ...');
  const surahNames = enDb
    .prepare('SELECT surahNum, arabic, english, transliteration FROM surahNames ORDER BY surahNum')
    .all() as { surahNum: number; arabic: string; english: string; transliteration: string }[];

  const ayahCounts = quranDb
    .prepare('SELECT surahNum, COUNT(*) as cnt FROM ayahArabic GROUP BY surahNum')
    .all() as { surahNum: number; cnt: number }[];
  const ayahCountMap = new Map(ayahCounts.map((r) => [r.surahNum, r.cnt]));

  const surahIndex = surahNames.map((s) => ({
    surahNum: s.surahNum,
    arabic: s.arabic,
    english: s.english,
    transliteration: s.transliteration,
    ayahCount: ayahCountMap.get(s.surahNum) ?? 0,
  }));
  writeJSON(path.join(metaDir, 'surah-index.json'), surahIndex);

  // ---- lemma-index.json ----
  log('Extracting meta/lemma-index.json ...');
  const lemmaTranslations = enDb
    .prepare('SELECT lemmaId, meaning, transliteration FROM lemmaTranslation')
    .all() as { lemmaId: number; meaning: string; transliteration: string }[];
  const ltMap = new Map(lemmaTranslations.map((r) => [r.lemmaId, r]));

  const lemmaIndexData = quranDb
    .prepare('SELECT id, lemma, count, isP FROM lemmaCount ORDER BY count DESC')
    .all() as { id: string; lemma: string; count: number; isP: number }[];

  const lemmaIndexOut = lemmaIndexData.map((lc) => {
    const lt = ltMap.get(Number(lc.id));
    return {
      id: Number(lc.id),
      lemma: lc.lemma,
      count: lc.count,
      isParticle: lc.isP === 1,
      meaning: lt?.meaning ?? '',
      transliteration: lt?.transliteration ?? '',
    };
  });
  writeJSON(path.join(metaDir, 'lemma-index.json'), lemmaIndexOut);

  // ---- particles.json ----
  log('Extracting meta/particles.json ...');
  const particles = enDb
    .prepare('SELECT lemma, translation FROM pTranslation')
    .all() as { lemma: string; translation: string }[];
  writeJSON(
    path.join(metaDir, 'particles.json'),
    particles.map((p) => ({ lemma: p.lemma, translation: p.translation }))
  );

  // ---- parent-forms.json ----
  log('Extracting meta/parent-forms.json ...');
  const parentForms = enDb
    .prepare(
      `SELECT id, form, form_d, meaning_change, friendly_change_identifier, explanation, example
       FROM parentForms`
    )
    .all() as {
    id: number;
    form: string;
    form_d: string;
    meaning_change: string;
    friendly_change_identifier: string;
    explanation: string;
    example: string;
  }[];
  writeJSON(
    path.join(metaDir, 'parent-forms.json'),
    parentForms.map((pf) => ({
      id: pf.id,
      form: pf.form ?? '',
      formD: pf.form_d ?? '',
      meaningChange: pf.meaning_change ?? '',
      friendlyName: pf.friendly_change_identifier ?? '',
      explanation: pf.explanation ?? '',
      example: pf.example ?? '',
    }))
  );

  // ---- grammar-tags.json ----
  log('Extracting meta/grammar-tags.json ...');
  writeJSON(
    path.join(metaDir, 'grammar-tags.json'),
    grammarRows.map((g) => ({
      tag: g.grammar,
      color: g.color ?? '',
      description: g.verbose_desc ?? '',
      friendlyDesc: g.friendly_desc ?? '',
    }))
  );

  // ---- grammar-translations.json ----
  log('Extracting meta/grammar-translations.json ...');
  const grammarTranslations = quranDb
    .prepare('SELECT grammar, translation FROM grammarTranslation')
    .all() as { grammar: string; translation: string }[];
  writeJSON(
    path.join(metaDir, 'grammar-translations.json'),
    grammarTranslations.map((gt) => ({
      tag: gt.grammar,
      translation: gt.translation,
    }))
  );
}

// ---------------------------------------------------------------------------
// 4. Surah extraction (114 files) — optimised with bulk pre-loading
// ---------------------------------------------------------------------------
function extractSurahs() {
  const quranDir = path.join(DATA_ROOT, 'quran');
  ensureDir(quranDir);

  // Pre-load ALL word translations and transliterations into memory (< 10 MB)
  log('Pre-loading word translations & transliterations...');
  const allWordTranslations = enDb
    .prepare('SELECT id, translation FROM wordTranslation')
    .all() as { id: string; translation: string }[];
  const wordTransMap = new Map(allWordTranslations.map((r) => [r.id, r.translation]));

  const allWordTransliterations = enDb
    .prepare('SELECT id, transliteration FROM wordTransliteration')
    .all() as { id: string; transliteration: string }[];
  const wordTranslitMap = new Map(allWordTransliterations.map((r) => [r.id, r.transliteration]));

  // Pre-load ALL ayah translations
  log('Pre-loading ayah translations...');
  const allAyahTranslations = enDb
    .prepare('SELECT surahNum, ayahNum, text FROM ayahTranslation')
    .all() as { surahNum: number; ayahNum: number; text: string }[];
  const ayahTransMap = new Map(
    allAyahTranslations.map((r) => [`${r.surahNum}:${r.ayahNum}`, r.text])
  );

  // Pre-load ALL morphology into a map by wordLoc
  log('Pre-loading morphology...');
  const allMorphology = quranDb
    .prepare(
      'SELECT wordLoc, arabic, partOfSpeech, grammar, root, lemma FROM morphology ORDER BY id'
    )
    .all() as {
    wordLoc: string;
    arabic: string;
    partOfSpeech: string;
    grammar: string;
    root: string;
    lemma: string;
  }[];

  const morphByWordLoc = new Map<string, typeof allMorphology>();
  for (const m of allMorphology) {
    let arr = morphByWordLoc.get(m.wordLoc);
    if (!arr) {
      arr = [];
      morphByWordLoc.set(m.wordLoc, arr);
    }
    arr.push(m);
  }
  log(`  Morphology loaded: ${allMorphology.length} parts across ${morphByWordLoc.size} wordLocs`);

  // Build lemma text -> lemmaId map for resolving lemmaId in word parts
  const lemmaToId = new Map<string, number>();
  const lemmaCountRows = quranDb
    .prepare('SELECT id, lemma FROM lemmaCount')
    .all() as { id: string; lemma: string }[];
  for (const r of lemmaCountRows) {
    lemmaToId.set(r.lemma, Number(r.id));
  }

  // Prepare per-surah queries
  const getSurahName = enDb.prepare(
    'SELECT arabic, english, transliteration FROM surahNames WHERE surahNum = ?'
  );
  const getAyahs = quranDb.prepare(
    'SELECT ayahNum, ayah FROM ayahArabic WHERE surahNum = ? ORDER BY ayahNum'
  );
  const getWords = quranDb.prepare(
    'SELECT wordLoc, arabicWord, wordNum FROM arabicWords WHERE surahNum = ? AND ayahNum = ? ORDER BY wordNum'
  );

  for (let surahNum = 1; surahNum <= 114; surahNum++) {
    if (surahNum % 10 === 1 || surahNum === 114) {
      log(`Extracting surah ${surahNum}/114 ...`);
    }

    const name = getSurahName.get(surahNum) as {
      arabic: string;
      english: string;
      transliteration: string;
    };

    const ayahRows = getAyahs.all(surahNum) as { ayahNum: number; ayah: string }[];

    const ayahs = ayahRows.map((ayahRow) => {
      const translation = ayahTransMap.get(`${surahNum}:${ayahRow.ayahNum}`) ?? '';

      const wordRows = getWords.all(surahNum, ayahRow.ayahNum) as {
        wordLoc: string;
        arabicWord: string;
        wordNum: number;
      }[];

      const words = wordRows.map((w) => {
        const morphRows = morphByWordLoc.get(w.wordLoc) ?? [];

        const parts = morphRows.map((m) => {
          const tag = extractGrammarTag(m.grammar);
          const gi = grammarMap.get(tag);
          return {
            arabic: m.arabic ?? '',
            partOfSpeech: m.partOfSpeech ?? '',
            grammar: m.grammar ?? '',
            grammarColor: gi?.color ?? '',
            grammarDesc: gi?.friendly_desc ?? gi?.verbose_desc ?? '',
            root: m.root ?? '',
            lemma: m.lemma ?? '',
            lemmaId: lemmaToId.get(m.lemma) ?? 0,
          };
        });

        return {
          wordLoc: w.wordLoc,
          arabic: w.arabicWord ?? '',
          parts,
          translation: wordTransMap.get(w.wordLoc) ?? '',
          transliteration: wordTranslitMap.get(w.wordLoc) ?? '',
        };
      });

      return {
        ayahNum: ayahRow.ayahNum,
        arabic: ayahRow.ayah,
        translation,
        words,
      };
    });

    writeJSON(path.join(quranDir, `${surahNum}.json`), {
      surahNum,
      name: {
        arabic: name?.arabic ?? '',
        english: name?.english ?? '',
        transliteration: name?.transliteration ?? '',
      },
      ayahs,
    });
  }
}

// ---------------------------------------------------------------------------
// 5. Word batch extraction (10 files)
// ---------------------------------------------------------------------------
function extractWordBatches() {
  const wordsDir = path.join(DATA_ROOT, 'words');
  ensureDir(wordsDir);

  log('Extracting word batches...');

  // Get all lemmas sorted by frequency
  const lemmas = quranDb
    .prepare('SELECT id, lemma, count, isP FROM lemmaCount ORDER BY count DESC')
    .all() as { id: string; lemma: string; count: number; isP: number }[];

  // Translations from en_quran.db
  const translations = enDb
    .prepare('SELECT lemmaId, meaning, transliteration, info FROM lemmaTranslation')
    .all() as {
    lemmaId: number;
    meaning: string;
    transliteration: string;
    info: string;
  }[];
  const transMap = new Map(translations.map((t) => [t.lemmaId, t]));

  // Best morphology row for each lemma (root + partOfSpeech + example)
  const bestMorphRows = quranDb
    .prepare(
      'SELECT lemmaId, wordLoc, arabic, partOfSpeech, verbForm, root, surahNum, ayahNum FROM bestMorphologyRowForLemma'
    )
    .all() as {
    lemmaId: number;
    wordLoc: string;
    arabic: string;
    partOfSpeech: string;
    verbForm: string;
    root: string;
    surahNum: number;
    ayahNum: number;
  }[];
  const bestMorphMap = new Map(bestMorphRows.map((r) => [r.lemmaId, r]));

  // Context translations from quran.db (lemmaInAyahTranslation)
  const contextRows = quranDb
    .prepare(
      'SELECT lemma, textBefore, closestExactMatch, textAfter FROM lemmaInAyahTranslation'
    )
    .all() as {
    lemma: string;
    textBefore: string;
    closestExactMatch: string;
    textAfter: string;
  }[];
  const contextMap = new Map(contextRows.map((r) => [r.lemma, r]));

  // Quiz data from quran.db
  const quizRows = quranDb
    .prepare(
      'SELECT id, translation, choice2, choice3, choice4 FROM cacheTestData WHERE language_id = 19'
    )
    .all() as {
    id: string;
    translation: string;
    choice2: string;
    choice3: string;
    choice4: string;
  }[];
  const quizMap = new Map(quizRows.map((r) => [r.id, r]));

  // Build batch items
  const allItems = lemmas.map((lc) => {
    const lemmaId = Number(lc.id);
    const trans = transMap.get(lemmaId);
    const bestMorph = bestMorphMap.get(lemmaId);
    const ctx = contextMap.get(lc.lemma);
    const quiz = quizMap.get(lc.id);

    return {
      lemmaId,
      lemma: lc.lemma,
      meaning: trans?.meaning ?? '',
      transliteration: trans?.transliteration ?? '',
      info: trans?.info ?? '',
      count: lc.count,
      root: bestMorph?.root ?? '',
      partOfSpeech: bestMorph?.partOfSpeech ?? '',
      isParticle: lc.isP === 1,
      bestExample: bestMorph
        ? {
            wordLoc: bestMorph.wordLoc,
            arabic: bestMorph.arabic,
            surahNum: bestMorph.surahNum,
            ayahNum: bestMorph.ayahNum,
          }
        : { wordLoc: '', arabic: '', surahNum: 0, ayahNum: 0 },
      contextTranslation: ctx
        ? {
            textBefore: ctx.textBefore ?? '',
            match: ctx.closestExactMatch ?? '',
            textAfter: ctx.textAfter ?? '',
          }
        : { textBefore: '', match: '', textAfter: '' },
      quiz: quiz
        ? {
            correctAnswer: quiz.translation,
            wrongChoices: [quiz.choice2, quiz.choice3, quiz.choice4],
          }
        : { correctAnswer: '', wrongChoices: ['', '', ''] },
    };
  });

  // Split into 10 batches
  const batchSize = Math.ceil(allItems.length / 10);
  for (let i = 0; i < 10; i++) {
    const batch = allItems.slice(i * batchSize, (i + 1) * batchSize);
    writeJSON(path.join(wordsDir, `batch-${i}.json`), batch);
    log(`  words/batch-${i}.json — ${batch.length} items`);
  }
}

// ---------------------------------------------------------------------------
// 6. Grammar extraction (one file per lemma)
// ---------------------------------------------------------------------------
function extractGrammar() {
  const grammarDir = path.join(DATA_ROOT, 'grammar');
  ensureDir(grammarDir);

  log('Extracting grammar files...');

  // All lemmas
  const lemmas = quranDb
    .prepare('SELECT id, lemma, count, isP FROM lemmaCount ORDER BY count DESC')
    .all() as { id: string; lemma: string; count: number; isP: number }[];

  // Best morphology for root/partOfSpeech/verbForm
  const bestMorphRows = quranDb
    .prepare('SELECT lemmaId, root, partOfSpeech, verbForm FROM bestMorphologyRowForLemma')
    .all() as { lemmaId: number; root: string; partOfSpeech: string; verbForm: string }[];
  const bestMorphMap = new Map(bestMorphRows.map((r) => [r.lemmaId, r]));

  // Translations
  const translations = enDb
    .prepare('SELECT lemmaId, meaning, transliteration FROM lemmaTranslation')
    .all() as { lemmaId: number; meaning: string; transliteration: string }[];
  const transMap = new Map(translations.map((t) => [t.lemmaId, t]));

  // Pre-load all transformations grouped by wordLoc
  log('  Loading transformations...');
  const allTransformations = enDb
    .prepare(
      `SELECT wordLoc, step, new_word, new_meaning, notes, colorCoding, form, form_d, change_identifier, form_change_id
       FROM transformations
       ORDER BY wordLoc, step`
    )
    .all() as {
    wordLoc: string;
    step: number;
    new_word: string;
    new_meaning: string;
    notes: string;
    colorCoding: string | null;
    form: string;
    form_d: string;
    change_identifier: string;
    form_change_id: number;
  }[];

  // Group transformations by wordLoc
  const transformsByWordLoc = new Map<string, typeof allTransformations>();
  for (const t of allTransformations) {
    let arr = transformsByWordLoc.get(t.wordLoc);
    if (!arr) {
      arr = [];
      transformsByWordLoc.set(t.wordLoc, arr);
    }
    arr.push(t);
  }
  log(`  Loaded ${allTransformations.length} transformation steps across ${transformsByWordLoc.size} wordLocs`);

  // Build lemma text -> first wordLoc that HAS transformations
  log('  Building lemma->wordLoc index...');
  const lemmaWordLocs = quranDb
    .prepare('SELECT DISTINCT lemma, wordLoc FROM morphology ORDER BY lemma, wordLoc')
    .all() as { lemma: string; wordLoc: string }[];

  const lemmaToFirstWordLoc = new Map<string, string>();
  for (const r of lemmaWordLocs) {
    if (!lemmaToFirstWordLoc.has(r.lemma)) {
      // Prefer a wordLoc that has transformations
      if (transformsByWordLoc.has(r.wordLoc)) {
        lemmaToFirstWordLoc.set(r.lemma, r.wordLoc);
      }
    }
  }
  // Second pass: fill in any lemmas that had no wordLoc with transformations
  for (const r of lemmaWordLocs) {
    if (!lemmaToFirstWordLoc.has(r.lemma)) {
      lemmaToFirstWordLoc.set(r.lemma, r.wordLoc);
    }
  }

  // Pre-load ayah text and translations for derived form examples
  log('  Loading ayah data for examples...');
  const ayahArabicAll = quranDb
    .prepare('SELECT surahNum, ayahNum, ayah FROM ayahArabic')
    .all() as { surahNum: number; ayahNum: number; ayah: string }[];
  const ayahArabicMap = new Map(
    ayahArabicAll.map((r) => [`${r.surahNum}:${r.ayahNum}`, r.ayah])
  );

  const ayahTransAll = enDb
    .prepare('SELECT surahNum, ayahNum, text FROM ayahTranslation')
    .all() as { surahNum: number; ayahNum: number; text: string }[];
  const ayahTransMap = new Map(
    ayahTransAll.map((r) => [`${r.surahNum}:${r.ayahNum}`, r.text])
  );

  // Derived forms query per lemma
  const getDerivedForms = quranDb.prepare(
    `SELECT arabic, grammar, COUNT(*) as cnt,
            GROUP_CONCAT(DISTINCT surahNum || ':' || ayahNum || ':' || wordLoc) as examples
     FROM morphology
     WHERE lemma = ?
     GROUP BY arabic, grammar
     ORDER BY cnt DESC`
  );

  let count = 0;
  for (const lc of lemmas) {
    const lemmaId = Number(lc.id);
    const bestMorph = bestMorphMap.get(lemmaId);
    const trans = transMap.get(lemmaId);

    // --- Transformations ---
    const firstWordLoc = lemmaToFirstWordLoc.get(lc.lemma);
    let transformations: {
      step: number;
      arabic: string;
      meaning: string;
      notes: string;
      colorCoding: Record<string, string> | null;
      form: string;
      formD: string;
      changeIdentifier: string;
      parentFormId: number;
    }[] = [];

    if (firstWordLoc) {
      const tSteps = transformsByWordLoc.get(firstWordLoc);
      if (tSteps && tSteps.length > 0) {
        transformations = tSteps.map((t) => {
          let colorCoding: Record<string, string> | null = null;
          if (t.colorCoding) {
            try {
              colorCoding = JSON.parse(t.colorCoding);
            } catch {
              // ignore parse errors
            }
          }
          return {
            step: t.step,
            arabic: t.new_word ?? '',
            meaning: t.new_meaning ?? '',
            notes: t.notes ?? '',
            colorCoding,
            form: t.form ?? '',
            formD: t.form_d ?? '',
            changeIdentifier: t.change_identifier ?? '',
            parentFormId: t.form_change_id ?? 0,
          };
        });
      }
    }

    // --- Derived Forms ---
    const dfRows = getDerivedForms.all(lc.lemma) as {
      arabic: string;
      grammar: string;
      cnt: number;
      examples: string;
    }[];

    const derivedForms = dfRows.map((df) => {
      const tag = extractGrammarTag(df.grammar);
      const gi = grammarMap.get(tag);

      // Parse up to 3 examples
      const exampleLocs = (df.examples ?? '').split(',').slice(0, 3);
      const examples = exampleLocs
        .map((loc) => {
          // loc format: "surahNum:ayahNum:surahNum:ayahNum:wordNum" (from GROUP_CONCAT)
          // wordLoc is "surahNum:ayahNum:wordNum", so the full string is
          // "morphology.surahNum:morphology.ayahNum:wordLoc"
          // e.g. "1:1:1:1:1" = surah 1, ayah 1, wordLoc "1:1:1"
          const parts = loc.split(':');
          if (parts.length < 3) return null;
          const surahNum = Number(parts[0]);
          const ayahNum = Number(parts[1]);
          const wordLoc = parts.slice(2).join(':');
          const key = `${surahNum}:${ayahNum}`;
          return {
            surahNum,
            ayahNum,
            wordLoc,
            ayahArabic: ayahArabicMap.get(key) ?? '',
            ayahTranslation: ayahTransMap.get(key) ?? '',
          };
        })
        .filter((e): e is NonNullable<typeof e> => e !== null);

      return {
        arabic: df.arabic ?? '',
        meaning: trans?.meaning ?? '',
        grammarTag: tag,
        grammarDesc: gi?.friendly_desc ?? gi?.verbose_desc ?? '',
        grammarColor: gi?.color ?? '',
        count: df.cnt,
        examples,
      };
    });

    writeJSON(path.join(grammarDir, `${lemmaId}.json`), {
      lemmaId,
      lemma: lc.lemma,
      root: bestMorph?.root ?? '',
      partOfSpeech: bestMorph?.partOfSpeech ?? '',
      verbForm: bestMorph?.verbForm ?? '',
      transformations,
      derivedForms,
    });

    count++;
    if (count % 1000 === 0) {
      log(`  grammar ${count}/${lemmas.length} ...`);
    }
  }

  log(`  grammar ${count}/${lemmas.length} done.`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const t0 = Date.now();

  ensureDir(DATA_ROOT);

  extractMeta();
  extractSurahs();
  extractWordBatches();
  extractGrammar();

  // ---------------------------------------------------------------------------
  // 7. Validation
  // ---------------------------------------------------------------------------
  log('');
  log('=== Validation ===');

  const surahFiles = fs
    .readdirSync(path.join(DATA_ROOT, 'quran'))
    .filter((f) => f.endsWith('.json'));
  log(`Surah files:     ${surahFiles.length} (expected ~114)`);

  let totalAyahs = 0;
  let totalWords = 0;
  for (const f of surahFiles) {
    const data = JSON.parse(
      fs.readFileSync(path.join(DATA_ROOT, 'quran', f), 'utf-8')
    );
    totalAyahs += data.ayahs.length;
    for (const a of data.ayahs) {
      totalWords += a.words.length;
    }
  }
  log(`Total ayahs:     ${totalAyahs} (expected ~6236)`);
  log(`Total words:     ${totalWords} (expected ~77429)`);

  let totalBatchItems = 0;
  for (let i = 0; i < 10; i++) {
    const batch = JSON.parse(
      fs.readFileSync(path.join(DATA_ROOT, 'words', `batch-${i}.json`), 'utf-8')
    );
    totalBatchItems += batch.length;
  }
  log(`Total lemmas:    ${totalBatchItems} (expected ~4784)`);

  const grammarFiles = fs
    .readdirSync(path.join(DATA_ROOT, 'grammar'))
    .filter((f) => f.endsWith('.json'));
  log(`Grammar files:   ${grammarFiles.length} (expected ~4784)`);

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  log(`\nDone in ${elapsed}s`);
}

main();

quranDb.close();
enDb.close();
