#!/usr/bin/env node
/**
 * Generate phrase-level groupings for Quranic ayahs.
 * Reads per-surah word JSON files and identifies grammatical phrase groups
 * using rule-based pattern detection.
 *
 * Usage: node scripts/generate-phrase-data.js
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const QURAN_DIR = join(ROOT, 'apps/kalimat/public/data/quran');
const PHRASE_DIR = join(ROOT, 'apps/kalimat/public/data/phrases');

mkdirSync(PHRASE_DIR, { recursive: true });

// Common Arabic particles/prepositions that start Jar-Majrur phrases
const JAR_PARTICLES = new Set([
  'فِي', 'في', 'مِن', 'من', 'إِلَى', 'إلى', 'عَلَى', 'على',
  'عَن', 'عن', 'بِ', 'لِ', 'كَ',
]);

// Preposition-like meanings
const JAR_MEANINGS = /^(in|from|to|on|upon|about|with|for|by|like|at|over|through|against|into|between|among|before|after|under|above|behind|near)\b/i;

// Conjunction particles
const CONJUNCTIONS = new Set(['وَ', 'فَ', 'ثُمَّ', 'أَو', 'أَم', 'بَل', 'لَكِن']);
const CONJUNCTION_MEANINGS = /^(and|then|or|but|rather|yet|so|nor)\b/i;

// Definiteness prefix
const DEFINITE_MEANINGS = /^the\b/i;

// Detect if a word is a particle (no root, short meaning)
function isParticle(word) {
  return !word.root || word.root === '';
}

/**
 * Group words into phrases for a single ayah.
 * Returns an array of PhraseGroup objects.
 */
function groupPhrases(words) {
  const phrases = [];
  let i = 0;

  while (i < words.length) {
    const w = words[i];
    const next = words[i + 1];
    const next2 = words[i + 2];

    // Pattern 1: Jar-Majrur (preposition + noun)
    // A particle whose meaning is a preposition, followed by a content word
    if (next && isParticle(w) && JAR_MEANINGS.test(w.meaning)) {
      // Check for chained Jar-Majrur: prep + noun + prep + noun
      if (next2 && words[i + 3] && isParticle(next2) && JAR_MEANINGS.test(next2.meaning)) {
        phrases.push({
          wordIndices: [w.wordNum, next.wordNum, next2.wordNum, words[i + 3].wordNum],
          label: 'jar-majrur',
        });
        i += 4;
        continue;
      }
      phrases.push({
        wordIndices: [w.wordNum, next.wordNum],
        label: 'jar-majrur',
      });
      i += 2;
      continue;
    }

    // Pattern 2: Conjunction pair (conjunction + word)
    if (next && isParticle(w) && CONJUNCTION_MEANINGS.test(w.meaning)) {
      phrases.push({
        wordIndices: [w.wordNum, next.wordNum],
        label: 'conjunction',
      });
      i += 2;
      continue;
    }

    // Pattern 3: Idafa (genitive chain) - two nouns where second has "of" in meaning
    if (next && !isParticle(w) && !isParticle(next) && /\bof\b/i.test(next.meaning)) {
      // Check for triple idafa
      if (next2 && !isParticle(next2) && /\bof\b/i.test(next2.meaning)) {
        phrases.push({
          wordIndices: [w.wordNum, next.wordNum, next2.wordNum],
          label: 'idafa',
        });
        i += 3;
        continue;
      }
      phrases.push({
        wordIndices: [w.wordNum, next.wordNum],
        label: 'idafa',
      });
      i += 2;
      continue;
    }

    // Pattern 4: Na't-Man'ut (adjective-noun) - two non-particle words with same root
    if (next && !isParticle(w) && !isParticle(next) && w.root && next.root && w.root === next.root) {
      phrases.push({
        wordIndices: [w.wordNum, next.wordNum],
        label: 'sifa',
      });
      i += 2;
      continue;
    }

    // No pattern matched - single word
    i++;
  }

  return phrases;
}

console.log('Generating phrase data...\n');

let totalPhrases = 0;

for (let surahNum = 1; surahNum <= 114; surahNum++) {
  const filePath = join(QURAN_DIR, `surah-${surahNum}.json`);
  if (!existsSync(filePath)) {
    console.log(`  Skipping surah ${surahNum} (no word file)`);
    continue;
  }

  const words = JSON.parse(readFileSync(filePath, 'utf-8'));

  // Group words by ayah
  const ayahMap = new Map();
  for (const w of words) {
    const list = ayahMap.get(w.ayahNum) ?? [];
    list.push(w);
    ayahMap.set(w.ayahNum, list);
  }

  const ayahPhrases = [];
  for (const [ayahNum, ayahWords] of ayahMap) {
    const sorted = ayahWords.sort((a, b) => a.wordNum - b.wordNum);
    const phrases = groupPhrases(sorted);
    if (phrases.length > 0) {
      ayahPhrases.push({ ayahNum, phrases });
      totalPhrases += phrases.length;
    }
  }

  writeFileSync(
    join(PHRASE_DIR, `surah-${surahNum}.json`),
    JSON.stringify(ayahPhrases)
  );

  if (surahNum % 20 === 0 || surahNum === 1) {
    console.log(`  → surah-${surahNum}.json: ${ayahPhrases.length} ayahs with phrases`);
  }
}

console.log(`\n  → 114 phrase files written (${totalPhrases} total phrases)`);
console.log('Done!');
