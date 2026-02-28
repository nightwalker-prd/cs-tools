/**
 * Extract poem data from TypeScript source files and write JSON to public/data/poems/.
 * Run with: npx tsx scripts/extract-poems-to-json.mts
 */
import * as fs from 'fs';
import * as path from 'path';

const POEMS_DIR = path.resolve(import.meta.dirname, '../src/data/poems');
const OUTPUT_DIR = path.resolve(import.meta.dirname, '../public/data/poems');

// Dynamically import each poet file
const files = fs.readdirSync(POEMS_DIR).filter(f => f.endsWith('.ts') && f !== 'index.ts');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

let totalPoems = 0;
const poemIndex: Array<{ id: string; poetId: string; titleAr: string; titleEn: string; genre: string; level: string }> = [];

for (const file of files) {
  const poetId = file.replace('.ts', '');
  const mod = await import(path.join(POEMS_DIR, file));

  // Find the exported array (named like xxxPoems)
  const exportName = Object.keys(mod).find(k => Array.isArray(mod[k]));
  if (!exportName) {
    console.log(`  Skipping ${file} - no array export found`);
    continue;
  }

  const poems = mod[exportName];
  totalPoems += poems.length;

  // Write full poems to JSON
  const outputPath = path.join(OUTPUT_DIR, `${poetId}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(poems, null, 2));
  console.log(`  ${poetId}: ${poems.length} poems -> ${outputPath}`);

  // Extract metadata for index
  for (const p of poems) {
    poemIndex.push({
      id: p.id,
      poetId: p.poetId,
      titleAr: p.titleAr,
      titleEn: p.titleEn,
      genre: p.genre,
      level: p.level,
    });
  }
}

// Write poem index
const indexPath = path.join(OUTPUT_DIR, '_index.json');
fs.writeFileSync(indexPath, JSON.stringify(poemIndex, null, 2));
console.log(`\nTotal: ${totalPoems} poems across ${files.length} poets`);
console.log(`Index written to ${indexPath}`);
