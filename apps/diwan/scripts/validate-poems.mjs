#!/usr/bin/env node
/**
 * Validate merged poem JSON files in public/data/poems/
 */
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const PUBLIC_DIR = join(import.meta.dirname, '..', 'public', 'data', 'poems');

const files = readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.json') && f !== '_index.json');
let totalErrors = 0;

for (const file of files.sort()) {
  const poems = JSON.parse(readFileSync(join(PUBLIC_DIR, file), 'utf8'));
  const poetSlug = file.replace('.json', '');
  const errors = [];

  for (const poem of poems) {
    // Check required fields
    if (!poem.id) errors.push(`Missing id`);
    if (!poem.poetId) errors.push(`${poem.id}: missing poetId`);
    if (!poem.titleAr) errors.push(`${poem.id}: missing titleAr`);
    if (!poem.titleEn) errors.push(`${poem.id}: missing titleEn`);
    if (!poem.genre) errors.push(`${poem.id}: missing genre`);
    if (!poem.level) errors.push(`${poem.id}: missing level`);
    if (!poem.verses || poem.verses.length === 0) errors.push(`${poem.id}: no verses`);
    if (!poem.translationEn) errors.push(`${poem.id}: missing translationEn`);
    if (!poem.vocabularyHighlights || poem.vocabularyHighlights.length === 0) {
      errors.push(`${poem.id}: missing vocabularyHighlights`);
    }
    if (!poem.context) errors.push(`${poem.id}: missing context`);

    // Check poetId matches file
    if (poem.poetId !== poetSlug) {
      errors.push(`${poem.id}: poetId "${poem.poetId}" doesn't match file "${poetSlug}"`);
    }

    // Check verses have sadr/ajuz
    if (poem.verses) {
      for (let i = 0; i < poem.verses.length; i++) {
        const v = poem.verses[i];
        if (!v.sadr && !v.ajuz) errors.push(`${poem.id}: verse ${i} empty`);
        // Check for OCR artifact remnants (verse numbers as sadr/ajuz)
        if (v.sadr && /^\d+$/.test(v.sadr.trim())) {
          errors.push(`${poem.id}: verse ${i} sadr is just a number "${v.sadr}"`);
        }
        if (v.ajuz && /^\d+$/.test(v.ajuz.trim())) {
          errors.push(`${poem.id}: verse ${i} ajuz is just a number "${v.ajuz}"`);
        }
      }
    }

    // Check level is valid
    if (poem.level && !['beginner', 'intermediate', 'advanced'].includes(poem.level)) {
      errors.push(`${poem.id}: invalid level "${poem.level}"`);
    }
  }

  // Check for duplicate IDs
  const ids = poems.map(p => p.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length > 0) errors.push(`Duplicate IDs: ${dupes.join(', ')}`);

  // Summary
  const verseCount = poems.reduce((s, p) => s + (p.verses?.length || 0), 0);
  if (errors.length === 0) {
    console.log(`  ${poetSlug}: ${poems.length} poems, ${verseCount} verses`);
  } else {
    console.log(`  ${poetSlug}: ${poems.length} poems, ${verseCount} verses, ${errors.length} ERRORS`);
    errors.slice(0, 10).forEach(e => console.log(`    - ${e}`));
    if (errors.length > 10) console.log(`    ... and ${errors.length - 10} more`);
    totalErrors += errors.length;
  }
}

console.log(`\nTotal errors: ${totalErrors}`);
process.exit(totalErrors > 0 ? 1 : 0);
