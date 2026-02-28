#!/usr/bin/env node
/**
 * Merge generated batch files into per-poet JSON files in public/data/poems/
 *
 * For existing poets: keeps first 5 poems from current file, appends generated poems
 * For new poets: creates new file from generated batches only
 *
 * Usage: node merge-batches.mjs [poetSlug...]
 * If no poets specified, merges all available
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const GENERATED_DIR = join(import.meta.dirname, '..', 'generated');
const PUBLIC_DIR = join(import.meta.dirname, '..', 'public', 'data', 'poems');

// Poets that already have 5 poems in public/data/poems/
const EXISTING_POETS = ['mutanabbi', 'abu-tammam', 'imru-al-qays', 'antara', 'hassan', 'abu-nuwas'];
const NEW_POETS = ['al-buhturi', 'al-khansa', 'labid', 'kab-ibn-zuhayr'];
const ALL_POETS = [...EXISTING_POETS, ...NEW_POETS];

function getBatchFiles(poetSlug) {
  const files = readdirSync(GENERATED_DIR)
    .filter(f => f.startsWith(`${poetSlug}-batch-`) && f.endsWith('.json'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/batch-(\d+)/)[1]);
      const numB = parseInt(b.match(/batch-(\d+)/)[1]);
      return numA - numB;
    });
  return files;
}

function mergePoet(poetSlug) {
  const batchFiles = getBatchFiles(poetSlug);
  if (batchFiles.length === 0) {
    console.log(`  ⏭  ${poetSlug}: no batch files found, skipping`);
    return null;
  }

  let poems = [];

  // For existing poets, keep original 5 poems
  if (EXISTING_POETS.includes(poetSlug)) {
    const existingFile = join(PUBLIC_DIR, `${poetSlug}.json`);
    if (existsSync(existingFile)) {
      const existing = JSON.parse(readFileSync(existingFile, 'utf8'));
      // Keep only the original 5 poems (IDs ending in -01 through -05)
      const originals = existing.filter(p => {
        const num = parseInt(p.id.split('-').pop());
        return num <= 5;
      });
      poems.push(...originals);
      console.log(`  📚 ${poetSlug}: kept ${originals.length} original poems`);
    }
  }

  // Append all batch poems in order
  let batchPoemCount = 0;
  for (const file of batchFiles) {
    const batch = JSON.parse(readFileSync(join(GENERATED_DIR, file), 'utf8'));
    poems.push(...batch);
    batchPoemCount += batch.length;
    console.log(`  📄 ${file}: ${batch.length} poems`);
  }

  // Sort by ID number
  poems.sort((a, b) => {
    const numA = parseInt(a.id.split('-').pop());
    const numB = parseInt(b.id.split('-').pop());
    return numA - numB;
  });

  // Check for duplicate IDs
  const ids = poems.map(p => p.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length > 0) {
    console.warn(`  ⚠️  ${poetSlug}: duplicate IDs found: ${dupes.join(', ')}`);
    // Remove duplicates, keeping first occurrence
    const seen = new Set();
    poems = poems.filter(p => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
  }

  // Write output
  const outputFile = join(PUBLIC_DIR, `${poetSlug}.json`);
  writeFileSync(outputFile, JSON.stringify(poems, null, 2));

  const totalVerses = poems.reduce((sum, p) => sum + p.verses.length, 0);
  console.log(`  ✅ ${poetSlug}: ${poems.length} poems, ${totalVerses} verses → ${outputFile}`);
  return { poet: poetSlug, poems: poems.length, verses: totalVerses, batches: batchFiles.length };
}

// Main
const requestedPoets = process.argv.slice(2);
const poetsToMerge = requestedPoets.length > 0 ? requestedPoets : ALL_POETS;

console.log(`Merging ${poetsToMerge.length} poets...\n`);

const results = [];
for (const poet of poetsToMerge) {
  console.log(`\n${poet}:`);
  const result = mergePoet(poet);
  if (result) results.push(result);
}

console.log('\n=== Summary ===');
console.log(`Poets merged: ${results.length}`);
const totalPoems = results.reduce((s, r) => s + r.poems, 0);
const totalVerses = results.reduce((s, r) => s + r.verses, 0);
console.log(`Total poems: ${totalPoems}`);
console.log(`Total verses: ${totalVerses}`);
