import fs from 'fs';
import path from 'path';

const poemsDir = 'apps/diwan/public/data/poems';
const files = fs.readdirSync(poemsDir).filter(f => f !== '_index.json' && f.endsWith('.json'));

const index = [];
for (const file of files) {
  const poems = JSON.parse(fs.readFileSync(path.join(poemsDir, file), 'utf-8'));
  for (const p of poems) {
    index.push({
      id: p.id,
      poetId: p.poetId,
      titleAr: p.titleAr,
      titleEn: p.titleEn,
      genre: p.genre,
      level: p.level
    });
  }
}

fs.writeFileSync(path.join(poemsDir, '_index.json'), JSON.stringify(index, null, 2));
console.log(`Updated _index.json with ${index.length} poems`);

const counts = {};
index.forEach(p => { counts[p.poetId] = (counts[p.poetId] || 0) + 1; });
Object.keys(counts).sort().forEach(k => console.log(`  ${k}: ${counts[k]}`));
