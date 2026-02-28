const Database = require('better-sqlite3');
const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const DB_PATH = join(process.env.HOME, 'Downloads', 'en_quran.db');
const ROOTS_DIR = join(__dirname, '..', 'apps/kalimat/public/data/roots');

const db = new Database(DB_PATH, { readonly: true });

// Build a lookup: for each (root, final_word), find the first wordLoc
const stmt = db.prepare(`
  SELECT t.root, t.new_word, MIN(t.wordLoc) as firstRef
  FROM transformations t
  WHERE t.step = (
    SELECT MAX(t2.step) FROM transformations t2 WHERE t2.wordLoc = t.wordLoc
  )
  AND t.root IS NOT NULL AND length(t.root) > 0
  GROUP BY t.root, t.new_word
`);

const refMap = {};
for (const row of stmt.iterate()) {
  const key = row.root + '|' + row.new_word;
  refMap[key] = row.firstRef;
}
console.log('Built ref map with', Object.keys(refMap).length, 'entries');

// Now update each root JSON file
const files = readdirSync(ROOTS_DIR).filter(f => f.endsWith('.json'));
let updated = 0;
for (const file of files) {
  const path = join(ROOTS_DIR, file);
  const data = JSON.parse(readFileSync(path, 'utf8'));
  let changed = false;
  for (const [root, family] of Object.entries(data)) {
    if (family.derivedForms) {
      for (const df of family.derivedForms) {
        const key = root + '|' + df.w;
        if (refMap[key] && !df.ref) {
          df.ref = refMap[key];
          changed = true;
          updated++;
        }
      }
    }
  }
  if (changed) {
    writeFileSync(path, JSON.stringify(data));
  }
}
console.log('Updated', updated, 'derived forms with ref');
db.close();
