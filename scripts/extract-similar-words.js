#!/usr/bin/env node
/**
 * Extract similar word challenge data from Kalaam DB.
 * Maps each lemmaId to its 3 distractor lemmaIds from challengeWordOptions.
 *
 * Output: apps/kalimat/public/data/similar-words.json
 * Format: Record<lemmaId, [dist1LemmaId, dist2LemmaId, dist3LemmaId][]>
 *
 * Since each lemma appears in many word locations, we collect all unique
 * distractor sets across all locations for that lemma, then deduplicate.
 *
 * Usage: node scripts/extract-similar-words.js [path-to-kalaam-db]
 */

import Database from 'better-sqlite3';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const KALAAM_DB_PATH = process.argv[2] || join(process.env.HOME, 'Desktop/kalaam/extracted/Payload/Kalaam.app/assets/src/assets/db/quran.db');
const OUTPUT_DIR = join(ROOT, 'apps/kalimat/public/data');

mkdirSync(OUTPUT_DIR, { recursive: true });

console.log(`Opening Kalaam DB: ${KALAAM_DB_PATH}`);
const db = new Database(KALAAM_DB_PATH, { readonly: true });

// Get all challenge options joined with arabicWords to resolve lemmaIds
const rows = db.prepare(`
  SELECT
    CAST(aw.maxLemmaId AS INTEGER) as correctLemma,
    CAST(d1.maxLemmaId AS INTEGER) as dist1,
    CAST(d2.maxLemmaId AS INTEGER) as dist2,
    CAST(d3.maxLemmaId AS INTEGER) as dist3
  FROM challengeWordOptions cwo
  JOIN arabicWords aw ON aw.wordLoc = cwo.id
  JOIN arabicWords d1 ON d1.wordLoc = cwo.choice1WordLoc
  JOIN arabicWords d2 ON d2.wordLoc = cwo.choice2WordLoc
  JOIN arabicWords d3 ON d3.wordLoc = cwo.choice3WordLoc
  WHERE CAST(aw.maxLemmaId AS INTEGER) > 0
    AND CAST(d1.maxLemmaId AS INTEGER) > 0
    AND CAST(d2.maxLemmaId AS INTEGER) > 0
    AND CAST(d3.maxLemmaId AS INTEGER) > 0
    AND aw.maxLemmaId != d1.maxLemmaId
    AND aw.maxLemmaId != d2.maxLemmaId
    AND aw.maxLemmaId != d3.maxLemmaId
`).all();

console.log(`  Found ${rows.length} valid challenge rows`);

// Group by correctLemma, collect unique distractor lemmaId sets
const byLemma = new Map();

for (const row of rows) {
  const key = row.correctLemma;
  if (!byLemma.has(key)) {
    byLemma.set(key, new Set());
  }
  // Collect unique distractor lemmaIds
  const distractors = byLemma.get(key);
  distractors.add(row.dist1);
  distractors.add(row.dist2);
  distractors.add(row.dist3);
}

// Build output: Record<lemmaId, number[]> — unique distractor lemmaIds (max 6)
const output = {};
for (const [lemmaId, distractorSet] of byLemma) {
  output[lemmaId] = [...distractorSet].slice(0, 6);
}

const lemmaCount = Object.keys(output).length;
const json = JSON.stringify(output);
const outPath = join(OUTPUT_DIR, 'similar-words.json');
writeFileSync(outPath, json);

console.log(`  → ${lemmaCount} lemmas with distractors`);
console.log(`  → File size: ${(json.length / 1024).toFixed(1)} KB`);
console.log(`  → Written to ${outPath}`);

db.close();
