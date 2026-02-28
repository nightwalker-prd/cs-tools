/**
 * Transforms all_exercises.json from fstu repo into typed unit data files
 * for the fstu-exercises app.
 *
 * Usage: npx tsx scripts/transform-fstu-exercises.ts
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const INPUT = '/Users/miftah/projects/fstu/fstu-arabic-exercises/all_exercises.json';
const OUTPUT_DIR = join(__dirname, '../apps/fstu-exercises/src/data');

// ── Unit mapping ──
const UNIT_MAP = [
  { unit: 1, title: 'Words & Nouns', pageStart: 15, pageEnd: 59 },
  { unit: 2, title: 'Sentences & Verbs', pageStart: 61, pageEnd: 134 },
  { unit: 3, title: 'Phrases', pageStart: 135, pageEnd: 295 },
  { unit: 4, title: 'Pronouns & Emphasis', pageStart: 296, pageEnd: 416 },
  { unit: 5, title: 'Advanced Topics', pageStart: 417, pageEnd: 602 },
];

function getUnit(bookStart: number): number {
  for (const m of UNIT_MAP) {
    if (bookStart >= m.pageStart && bookStart <= m.pageEnd) return m.unit;
  }
  return 5;
}

// ── Tag detection ──
type Tag =
  | 'translation' | 'fill-blank' | 'grammar-analysis'
  | 'descriptive-phrase' | 'demonstrative-phrase'
  | 'possessive-phrase' | 'conjunctive-phrase'
  | 'verb-conjugation' | 'pronouns' | 'emphasis'
  | 'relative-clause' | 'conditional' | 'irab'
  | 'morphology' | 'vocabulary';

const TAG_KEYWORDS: [RegExp, Tag][] = [
  [/translat/i, 'translation'],
  [/fill.?in|blank|\.{3,}/i, 'fill-blank'],
  [/i['\u2019]?rab|إعراب/i, 'irab'],
  [/grammar|نحو|analysis/i, 'grammar-analysis'],
  [/descriptive|نعت|adjective/i, 'descriptive-phrase'],
  [/demonstrative|إشار/i, 'demonstrative-phrase'],
  [/possessive|إضاف|mudaf/i, 'possessive-phrase'],
  [/conjunct|عطف|atf/i, 'conjunctive-phrase'],
  [/conjugat|verb|فعل|majhul|maruf|mudari|madi|amr/i, 'verb-conjugation'],
  [/pronoun|ضمير/i, 'pronouns'],
  [/emphasi|emphatic|تأكيد|tawkid/i, 'emphasis'],
  [/relative|موصول|الذي/i, 'relative-clause'],
  [/condition|شرط/i, 'conditional'],
  [/morpholog|صرف|sarf|wazn|pattern|root/i, 'morphology'],
  [/vocab|key.?term|word|كلم/i, 'vocabulary'],
];

function deriveTags(title: string, description: string, filename: string): Tag[] {
  const combined = `${title} ${description} ${filename}`;
  const tags = new Set<Tag>();
  for (const [re, tag] of TAG_KEYWORDS) {
    if (re.test(combined)) tags.add(tag);
  }
  if (tags.size === 0) tags.add('grammar-analysis');
  return [...tags];
}

// ── Parse section key ──
function parseSectionKey(key: string): { bookStart: number; bookEnd: number; chunkStart: number; chunkEnd: number } | null {
  const m = key.match(/FSTU Arabic-(\d+)-(\d+)_pages(\d+)-(\d+)/);
  if (!m) return null;
  return {
    bookStart: parseInt(m[1]),
    bookEnd: parseInt(m[2]),
    chunkStart: parseInt(m[3]),
    chunkEnd: parseInt(m[4]),
  };
}

// ── Escape for TS string literal ──
function escStr(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

// ── Main ──
interface RawQuestion { question: string; answer: string }
interface RawExercise { title: string; description: string; questions: RawQuestion[] }
type RawData = Record<string, Record<string, RawExercise>>;

const raw: RawData = JSON.parse(readFileSync(INPUT, 'utf-8'));

interface TransformedSection {
  id: string;
  title: string;
  bookPages: { start: number; end: number };
  exercises: {
    id: string;
    title: string;
    description: string;
    tags: Tag[];
    questions: { id: string; question: string; answer: string }[];
  }[];
}

// Group sections by unit
const unitSections: Record<number, TransformedSection[]> = { 1: [], 2: [], 3: [], 4: [], 5: [] };

// Track section indices per unit for stable IDs
const sectionCountPerUnit: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

// Sort section keys to get deterministic ordering
const sortedKeys = Object.keys(raw).sort((a, b) => {
  const pa = parseSectionKey(a);
  const pb = parseSectionKey(b);
  if (!pa || !pb) return 0;
  if (pa.bookStart !== pb.bookStart) return pa.bookStart - pb.bookStart;
  return pa.chunkStart - pb.chunkStart;
});

for (const sectionKey of sortedKeys) {
  const parsed = parseSectionKey(sectionKey);
  if (!parsed) continue;

  const unit = getUnit(parsed.bookStart);
  const sIdx = ++sectionCountPerUnit[unit];
  const sectionId = `u${unit}-s${sIdx}`;

  const exercises = Object.entries(raw[sectionKey]);
  const transformedExercises = exercises.map(([filename, ex], exIdx) => {
    const exId = `${sectionId}-ex${exIdx + 1}`;
    const tags = deriveTags(ex.title, ex.description, filename);
    const questions = ex.questions.map((q, qIdx) => ({
      id: `${exId}-q${qIdx + 1}`,
      question: q.question,
      answer: q.answer,
    }));
    return {
      id: exId,
      title: ex.title,
      description: ex.description.replace(/^##?\s*/, ''),
      tags,
      questions,
    };
  });

  // Build a readable title from the section key
  const sectionTitle = `Pages ${parsed.bookStart}–${parsed.bookEnd} (Part ${parsed.chunkStart}–${parsed.chunkEnd})`;

  unitSections[unit].push({
    id: sectionId,
    title: sectionTitle,
    bookPages: { start: parsed.bookStart, end: parsed.bookEnd },
    exercises: transformedExercises,
  });
}

// ── Write unit files ──
mkdirSync(OUTPUT_DIR, { recursive: true });

const unitMeta: { unit: number; title: string; sectionCount: number; exerciseCount: number; questionCount: number }[] = [];

for (const unitDef of UNIT_MAP) {
  const sections = unitSections[unitDef.unit];
  const exerciseCount = sections.reduce((sum, s) => sum + s.exercises.length, 0);
  const questionCount = sections.reduce((sum, s) => sum + s.exercises.reduce((es, e) => es + e.questions.length, 0), 0);

  unitMeta.push({
    unit: unitDef.unit,
    title: unitDef.title,
    sectionCount: sections.length,
    exerciseCount,
    questionCount,
  });

  // Build the TS source
  let src = `import type { ExerciseUnit } from '../types';\n\n`;
  src += `const unit: ExerciseUnit = {\n`;
  src += `  unit: ${unitDef.unit},\n`;
  src += `  title: '${escStr(unitDef.title)}',\n`;
  src += `  sections: [\n`;

  for (const section of sections) {
    src += `    {\n`;
    src += `      id: '${section.id}',\n`;
    src += `      title: '${escStr(section.title)}',\n`;
    src += `      bookPages: { start: ${section.bookPages.start}, end: ${section.bookPages.end} },\n`;
    src += `      exercises: [\n`;

    for (const ex of section.exercises) {
      src += `        {\n`;
      src += `          id: '${ex.id}',\n`;
      src += `          title: '${escStr(ex.title)}',\n`;
      src += `          description: '${escStr(ex.description)}',\n`;
      src += `          tags: [${ex.tags.map(t => `'${t}'`).join(', ')}],\n`;
      src += `          questions: [\n`;

      for (const q of ex.questions) {
        src += `            { id: '${q.id}', question: '${escStr(q.question)}', answer: '${escStr(q.answer)}' },\n`;
      }

      src += `          ],\n`;
      src += `        },\n`;
    }

    src += `      ],\n`;
    src += `    },\n`;
  }

  src += `  ],\n`;
  src += `};\n\n`;
  src += `export default unit;\n`;

  writeFileSync(join(OUTPUT_DIR, `unit-${unitDef.unit}.ts`), src);
  console.log(`  unit-${unitDef.unit}.ts: ${sections.length} sections, ${exerciseCount} exercises, ${questionCount} questions`);
}

// ── Write unit-index.ts ──
let indexSrc = `import type { UnitMeta } from '../types';\n\n`;
indexSrc += `export const UNIT_INDEX: UnitMeta[] = [\n`;
for (const m of unitMeta) {
  indexSrc += `  { unit: ${m.unit}, title: '${escStr(m.title)}', sectionCount: ${m.sectionCount}, exerciseCount: ${m.exerciseCount}, questionCount: ${m.questionCount} },\n`;
}
indexSrc += `];\n`;
writeFileSync(join(OUTPUT_DIR, 'unit-index.ts'), indexSrc);

// ── Write data/index.ts (barrel with lazy imports) ──
let barrelSrc = `import type { ExerciseUnit } from '../types';\n\n`;
barrelSrc += `export { UNIT_INDEX } from './unit-index';\n`;
barrelSrc += `export { UNIT_MAPPING } from './unit-mapping';\n\n`;
barrelSrc += `const unitLoaders: Record<number, () => Promise<{ default: ExerciseUnit }>> = {\n`;
for (let i = 1; i <= 5; i++) {
  barrelSrc += `  ${i}: () => import('./unit-${i}'),\n`;
}
barrelSrc += `};\n\n`;
barrelSrc += `export async function loadUnit(unit: number): Promise<ExerciseUnit> {\n`;
barrelSrc += `  const loader = unitLoaders[unit];\n`;
barrelSrc += `  if (!loader) throw new Error(\`Unknown unit: \${unit}\`);\n`;
barrelSrc += `  const mod = await loader();\n`;
barrelSrc += `  return mod.default;\n`;
barrelSrc += `}\n`;
writeFileSync(join(OUTPUT_DIR, 'index.ts'), barrelSrc);

console.log('\nDone! Generated unit files in', OUTPUT_DIR);
console.log('Total:', unitMeta.reduce((s, m) => s + m.exerciseCount, 0), 'exercises,',
  unitMeta.reduce((s, m) => s + m.questionCount, 0), 'questions');
