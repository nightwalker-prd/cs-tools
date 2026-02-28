/**
 * Cross-reference quran word data against corpus morphology data
 * to fix diacritical errors in the word text.
 *
 * The corpus data (from Kalaam DB) has correct Uthmani text.
 * The quran data (from en_quran.db) sometimes has wrong diacritics.
 *
 * Strategy: For each word, reconstruct the full word from corpus morphemes
 * and compare with the quran data. If they differ (after normalization),
 * use the corpus version.
 */
const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const QURAN_DIR = join(__dirname, '..', 'apps/kalimat/public/data/quran');
const CORPUS_DIR = join(__dirname, '..', 'apps/kalimat/public/data/corpus');

// Strip diacritics for comparison of base letters
function stripDiacritics(text) {
  if (!text) return '';
  return text.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g, '');
}

let totalFixed = 0;
const fixes = [];

for (let surah = 1; surah <= 114; surah++) {
  const quranPath = join(QURAN_DIR, `surah-${surah}.json`);
  const corpusPath = join(CORPUS_DIR, `surah-${surah}.json`);

  let quranData, corpusData;
  try {
    quranData = JSON.parse(readFileSync(quranPath, 'utf8'));
    corpusData = JSON.parse(readFileSync(corpusPath, 'utf8'));
  } catch {
    continue;
  }

  let changed = false;

  for (const word of quranData) {
    const morphemes = corpusData[word.id];
    if (!morphemes || morphemes.length === 0) continue;

    // Reconstruct word from corpus morphemes
    const corpusWord = morphemes.map(m => m.ar).join('');

    // Compare base letters (without diacritics) - if same base but different diacritics,
    // trust the corpus version
    const quranBase = stripDiacritics(word.word);
    const corpusBase = stripDiacritics(corpusWord);

    if (quranBase === corpusBase && word.word !== corpusWord) {
      fixes.push({
        id: word.id,
        old: word.word,
        new: corpusWord,
      });
      word.word = corpusWord;
      changed = true;
      totalFixed++;
    }
  }

  if (changed) {
    writeFileSync(quranPath, JSON.stringify(quranData));
  }
}

console.log(`Fixed ${totalFixed} words with diacritical corrections`);
if (fixes.length <= 30) {
  for (const f of fixes) {
    console.log(`  ${f.id}: ${f.old} → ${f.new}`);
  }
} else {
  for (const f of fixes.slice(0, 20)) {
    console.log(`  ${f.id}: ${f.old} → ${f.new}`);
  }
  console.log(`  ... and ${fixes.length - 20} more`);
}
