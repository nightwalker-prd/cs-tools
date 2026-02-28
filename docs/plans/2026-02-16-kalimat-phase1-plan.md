# Kalimat Phase 1: Enrichments Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Enrich existing Kalimat views with contextual translations, grammar tags, and corpus morphology data from the Kalaam DB.

**Architecture:** Add new extraction functions to the existing `scripts/extract-quran-data.js` (which uses `better-sqlite3`) to pull data from the Kalaam `quran.db`. New data goes into `src/data/` (bundled) for small datasets and `public/data/` (lazy-loaded) for per-surah data. New hooks follow the existing `useMorphemeLoader` pattern for lazy-loading per-surah JSON.

**Tech Stack:** `better-sqlite3` for extraction, React hooks for data loading, existing CSS class patterns for styling.

**Note:** Etymology (1a) is already extracted and displayed. Phrase mode (2a) is already in AyahView. This plan covers the remaining Phase 1 items.

**Database paths:**
- `en_quran.db`: `/Users/miftah/Desktop/en_quran.db`
- Kalaam `quran.db`: `/Users/miftah/Desktop/kalaam/extracted/Payload/Kalaam.app/assets/src/assets/db/quran.db`

---

## Task 1: Extract Contextual Translations from Kalaam DB

Extracts `lemmaInAyahTranslation` (4,783 rows) into chunked TypeScript files. Each lemma gets a context example showing how it appears in English translation.

**Files:**
- Modify: `scripts/extract-quran-data.js`
- Create: `apps/kalimat/src/data/lemma-context/chunk-0.ts` through `chunk-9.ts`

**Step 1: Add Kalaam DB path handling to extract script**

At the top of `scripts/extract-quran-data.js`, after the existing `DB_PATH` line, add:

```js
const KALAAM_DB_PATH = process.argv[3] || join(process.env.HOME, 'Desktop/kalaam/extracted/Payload/Kalaam.app/assets/src/assets/db/quran.db');
```

After the existing `mkdirSync` calls, add:

```js
mkdirSync(join(DATA_DIR, 'lemma-context'), { recursive: true });
```

**Step 2: Add extraction function**

Add this function to `scripts/extract-quran-data.js` before the `main()` call:

```js
// ─── Lemma Context (from Kalaam DB) ──────────────────────────────────────────
function extractLemmaContext(kalaamDb) {
  console.log('Extracting lemma contextual translations...');
  const rows = kalaamDb.prepare(`
    SELECT lc.id, lc.lemma, lit.location, lit.textBefore, lit.closestExactMatch, lit.textAfter
    FROM lemmaCount lc
    JOIN lemmaInAyahTranslation lit ON lc.lemma = lit.lemma
    ORDER BY CAST(lc.id AS INTEGER)
  `).all();

  // Group by lemma ID
  const byLemma = {};
  for (const r of rows) {
    const id = Number(r.id);
    if (!byLemma[id]) byLemma[id] = [];
    // Parse location like "95:2:1:1" → surahNum:ayahNum
    const parts = r.location.split(':');
    const ref = `${parts[0]}:${parts[1]}`;
    byLemma[id].push({
      ref,
      before: r.textBefore || '',
      match: r.closestExactMatch || '',
      after: r.textAfter || '',
    });
  }

  // Chunk into 10 files
  const CHUNK_COUNT = 10;
  const allIds = Object.keys(byLemma).map(Number).sort((a, b) => a - b);
  const chunkSize = Math.ceil(allIds.length / CHUNK_COUNT);

  for (let i = 0; i < CHUNK_COUNT; i++) {
    const chunkIds = allIds.slice(i * chunkSize, (i + 1) * chunkSize);
    const chunkData = {};
    for (const id of chunkIds) {
      chunkData[id] = byLemma[id];
    }
    const chunkTs = `/** Contextual translation data for lemma IDs in chunk ${i} */
export const contextChunk${i}: Record<number, { ref: string; before: string; match: string; after: string }[]> = ${JSON.stringify(chunkData, null, 2)};
`;
    writeFileSync(join(DATA_DIR, 'lemma-context', `chunk-${i}.ts`), chunkTs);
    console.log(`  → context chunk-${i}: ${chunkIds.length} lemmas`);
  }
}
```

**Step 3: Call the function in main()**

In the `main()` function, open the Kalaam DB and call the extractor:

```js
// Open Kalaam DB for additional data
let kalaamDb;
try {
  kalaamDb = new Database(KALAAM_DB_PATH, { readonly: true });
  console.log(`Opened Kalaam DB: ${KALAAM_DB_PATH}`);
  extractLemmaContext(kalaamDb);
} catch (e) {
  console.warn(`Kalaam DB not found at ${KALAAM_DB_PATH}, skipping Kalaam extractions`);
}
```

**Step 4: Run the extraction**

```bash
cd /Users/miftah/projects/alqalam-tools
node scripts/extract-quran-data.js /Users/miftah/Desktop/en_quran.db /Users/miftah/Desktop/kalaam/extracted/Payload/Kalaam.app/assets/src/assets/db/quran.db
```

Expected: 10 chunk files created in `apps/kalimat/src/data/lemma-context/`

**Step 5: Commit**

```bash
git add scripts/extract-quran-data.js apps/kalimat/src/data/lemma-context/
git commit -m "feat(kalimat): extract contextual translations from Kalaam DB"
```

---

## Task 2: Add Context Loader Hook and Display in LemmaDetail

**Files:**
- Modify: `apps/kalimat/src/hooks/useLemmaInfo.ts`
- Modify: `apps/kalimat/src/components/browse/LemmaDetail.tsx`

**Step 1: Add context chunk imports to useLemmaInfo.ts**

Add a parallel chunk loading system for context data. After the existing `chunkImports` object, add:

```ts
type ContextEntry = { ref: string; before: string; match: string; after: string };
type ContextMap = Record<number, ContextEntry[]>;

const contextImports: Record<number, () => Promise<{ [key: string]: ContextMap }>> = {
  0: () => import('@/data/lemma-context/chunk-0'),
  1: () => import('@/data/lemma-context/chunk-1'),
  2: () => import('@/data/lemma-context/chunk-2'),
  3: () => import('@/data/lemma-context/chunk-3'),
  4: () => import('@/data/lemma-context/chunk-4'),
  5: () => import('@/data/lemma-context/chunk-5'),
  6: () => import('@/data/lemma-context/chunk-6'),
  7: () => import('@/data/lemma-context/chunk-7'),
  8: () => import('@/data/lemma-context/chunk-8'),
  9: () => import('@/data/lemma-context/chunk-9'),
};
```

Add a `getContext` function alongside `getEtymology`:

```ts
const loadedContextChunks = useRef<Map<number, ContextMap>>(new Map());

const getContext = useCallback(async (lemmaId: number): Promise<ContextEntry[] | null> => {
  const chunkIdx = getChunkIndex(lemmaId);

  if (loadedContextChunks.current.has(chunkIdx)) {
    return loadedContextChunks.current.get(chunkIdx)![lemmaId] ?? null;
  }

  try {
    const mod = await contextImports[chunkIdx]();
    const chunkKey = `contextChunk${chunkIdx}`;
    const data = mod[chunkKey] as ContextMap;
    loadedContextChunks.current.set(chunkIdx, data);
    return data[lemmaId] ?? null;
  } catch {
    return null;
  }
}, []);
```

Return `getContext` from the hook: `return { getEtymology, getContext, loading };`

Export the `ContextEntry` type: `export type { ContextEntry };`

**Step 2: Add "See in Context" section to LemmaDetail.tsx**

In `LemmaDetail.tsx`, after the Etymology section (around line 143), add a new section:

```tsx
{/* Context Section */}
<section>
  <h2 className="font-serif text-2xl text-primary mb-4 flex items-center gap-2">
    <BookOpen size={20} className="text-accent" />
    See in Context
  </h2>
  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
    {contextExamples && contextExamples.length > 0 ? (
      <ul className="space-y-4">
        {contextExamples.slice(0, 3).map((ctx, i) => (
          <li key={i} className="text-sm leading-relaxed">
            <span className="text-muted-foreground">{ctx.before}</span>
            <span className="font-semibold text-accent">{ctx.match}</span>
            <span className="text-muted-foreground">{ctx.after}</span>
            <span className="ml-2 text-xs text-primary/60 font-mono">[{ctx.ref}]</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-muted-foreground italic text-sm text-center py-4">
        No contextual examples available.
      </p>
    )}
  </div>
</section>
```

Also add the state and effect at the top of the component:

```tsx
const { getEtymology, getContext, loading: etymLoading } = useLemmaInfo();
const [contextExamples, setContextExamples] = useState<ContextEntry[] | null>(null);

useEffect(() => {
  getContext(lemmaId).then(setContextExamples);
}, [lemmaId, getContext]);
```

Import `ContextEntry` type: `import type { ContextEntry } from '@/hooks/useLemmaInfo';`

**Step 3: Build and verify**

```bash
cd /Users/miftah/projects/alqalam-tools
npx turbo build --filter=@arabtools/kalimat
```

Expected: Build succeeds with no type errors.

**Step 4: Commit**

```bash
git add apps/kalimat/src/hooks/useLemmaInfo.ts apps/kalimat/src/components/browse/LemmaDetail.tsx
git commit -m "feat(kalimat): add contextual translation display on LemmaDetail"
```

---

## Task 3: Extract Grammar Tags from Kalaam DB

Extracts 993 grammar tag definitions with colors and descriptions.

**Files:**
- Modify: `scripts/extract-quran-data.js`
- Create: `apps/kalimat/src/data/grammar-tags.ts`

**Step 1: Add extraction function**

Add to `scripts/extract-quran-data.js`:

```js
// ─── Grammar Tags (from Kalaam DB) ──────────────────────────────────────────
function extractGrammarTags(kalaamDb) {
  console.log('Extracting grammar tags...');
  const rows = kalaamDb.prepare(`
    SELECT grammar, color, verbose_desc, friendly_desc
    FROM grammar
    ORDER BY id
  `).all();

  const tags = {};
  for (const r of rows) {
    tags[r.grammar] = {
      color: r.color || '#666',
      verbose: r.verbose_desc || '',
      friendly: r.friendly_desc || '',
    };
  }

  const ts = `export interface GrammarTag {
  color: string;
  verbose: string;
  friendly: string;
}

export const grammarTags: Record<string, GrammarTag> = ${JSON.stringify(tags, null, 2)};
`;
  writeFileSync(join(DATA_DIR, 'grammar-tags.ts'), ts);
  console.log(\`  → \${rows.length} grammar tags\`);
}
```

Call it from the Kalaam DB section in `main()`:

```js
extractGrammarTags(kalaamDb);
```

**Step 2: Run extraction**

```bash
node scripts/extract-quran-data.js /Users/miftah/Desktop/en_quran.db /Users/miftah/Desktop/kalaam/extracted/Payload/Kalaam.app/assets/src/assets/db/quran.db
```

Expected: `apps/kalimat/src/data/grammar-tags.ts` created with 993 entries.

**Step 3: Commit**

```bash
git add scripts/extract-quran-data.js apps/kalimat/src/data/grammar-tags.ts
git commit -m "feat(kalimat): extract 993 grammar tags with colors from Kalaam DB"
```

---

## Task 4: Extract Corpus Morphology Per-Surah from Kalaam DB

Extracts 129K morphology rows into per-surah JSON files for lazy loading. Each word gets its grammar tags, part of speech, verb form, and person/gender/number.

**Files:**
- Modify: `scripts/extract-quran-data.js`
- Create: `apps/kalimat/public/data/corpus/surah-{1..114}.json`

**Step 1: Add extraction function**

```js
const CORPUS_DIR = join(ROOT, 'apps/kalimat/public/data/corpus');
mkdirSync(CORPUS_DIR, { recursive: true });

// ─── Corpus Morphology (from Kalaam DB) ──────────────────────────────────────
function extractCorpusMorphology(kalaamDb) {
  console.log('Extracting corpus morphology...');
  const rows = kalaamDb.prepare(`
    SELECT location, wordLoc, arabic, partOfSpeech, verbForm, grammar, root, lemma, surahNum, ayahNum, wordNum
    FROM morphology
    ORDER BY surahNum, ayahNum, wordNum, id
  `).all();

  // Group by surah
  const bySurah = {};
  for (const r of rows) {
    if (!bySurah[r.surahNum]) bySurah[r.surahNum] = {};
    const wordKey = r.wordLoc;
    if (!bySurah[r.surahNum][wordKey]) bySurah[r.surahNum][wordKey] = [];
    bySurah[r.surahNum][wordKey].push({
      loc: r.location,
      ar: r.arabic,
      pos: r.partOfSpeech || '',
      vf: r.verbForm || '',
      gr: r.grammar,
      root: r.root || '',
      lemma: r.lemma || '',
    });
  }

  let totalWords = 0;
  for (const [surahNum, data] of Object.entries(bySurah)) {
    writeFileSync(join(CORPUS_DIR, `surah-${surahNum}.json`), JSON.stringify(data));
    totalWords += Object.keys(data).length;
  }
  console.log(\`  → \${Object.keys(bySurah).length} surahs, \${totalWords} words\`);
}
```

Call from `main()`:

```js
extractCorpusMorphology(kalaamDb);
```

**Step 2: Run extraction**

```bash
node scripts/extract-quran-data.js /Users/miftah/Desktop/en_quran.db /Users/miftah/Desktop/kalaam/extracted/Payload/Kalaam.app/assets/src/assets/db/quran.db
```

Expected: 114 JSON files in `apps/kalimat/public/data/corpus/`.

**Step 3: Commit**

```bash
git add scripts/extract-quran-data.js apps/kalimat/public/data/corpus/
git commit -m "feat(kalimat): extract per-surah corpus morphology from Kalaam DB"
```

---

## Task 5: Add Corpus Morphology Loader Hook

**Files:**
- Create: `apps/kalimat/src/hooks/useCorpusLoader.ts`
- Modify: `apps/kalimat/src/types.ts` (add types)

**Step 1: Add types to types.ts**

Add at the end of `apps/kalimat/src/types.ts`:

```ts
// ─── Corpus Morphology (from Kalaam DB) ──────────────────────────────────────
export interface CorpusMorpheme {
  loc: string;    // e.g. "1:2:1:1"
  ar: string;     // Arabic piece, e.g. "ٱلْ"
  pos: string;    // Part of speech, e.g. "P" or "N"
  vf: string;     // Verb form, e.g. "VF:4" or ""
  gr: string;     // Grammar tags, e.g. "ROOT:حمد|LEM:حَمْد|M|NOM"
  root: string;   // Root, e.g. "حمد"
  lemma: string;  // Lemma, e.g. "حَمْد"
}

export type WordCorpus = CorpusMorpheme[];
export type SurahCorpus = Record<string, WordCorpus>;
```

**Step 2: Create useCorpusLoader.ts**

```ts
import { useRef, useCallback } from 'react';
import type { SurahCorpus } from '@/types';

export function useCorpusLoader() {
  const cache = useRef<Map<number, SurahCorpus>>(new Map());

  const loadCorpus = useCallback(async (surahNum: number): Promise<SurahCorpus> => {
    if (cache.current.has(surahNum)) {
      return cache.current.get(surahNum)!;
    }

    const response = await fetch(`/data/corpus/surah-${surahNum}.json`);
    const data: SurahCorpus = await response.json();
    cache.current.set(surahNum, data);
    return data;
  }, []);

  return { loadCorpus };
}
```

**Step 3: Build and verify**

```bash
npx turbo build --filter=@arabtools/kalimat
```

Expected: Build succeeds.

**Step 4: Commit**

```bash
git add apps/kalimat/src/types.ts apps/kalimat/src/hooks/useCorpusLoader.ts
git commit -m "feat(kalimat): add corpus morphology loader hook and types"
```

---

## Task 6: Add Grammar Tags to QuranReader Word Popup

Shows corpus morphology (part of speech, grammar tags with colors) in the QuranReader word popup.

**Files:**
- Modify: `apps/kalimat/src/components/reader/QuranReader.tsx`
- Create: `apps/kalimat/src/components/shared/GrammarBadges.tsx`

**Step 1: Create GrammarBadges component**

Create `apps/kalimat/src/components/shared/GrammarBadges.tsx`:

```tsx
import { grammarTags } from '@/data/grammar-tags';
import type { CorpusMorpheme } from '@/types';

interface GrammarBadgesProps {
  morphemes: CorpusMorpheme[];
  compact?: boolean;
}

/** Parse grammar string like "ROOT:حمد|LEM:حَمْد|M|NOM" into display tags */
function parseGrammarTags(gr: string): string[] {
  return gr.split('|').filter(t => !t.startsWith('ROOT:') && !t.startsWith('LEM:') && !t.startsWith('PREF') && !t.startsWith('SUFF'));
}

export function GrammarBadges({ morphemes, compact }: GrammarBadgesProps) {
  if (!morphemes.length) return null;

  // Collect all grammar tags from all morphemes
  const allTags: { tag: string; color: string; label: string }[] = [];
  for (const m of morphemes) {
    const tags = parseGrammarTags(m.gr);
    for (const tag of tags) {
      const info = grammarTags[tag];
      if (info) {
        allTags.push({ tag, color: info.color, label: compact ? tag : info.friendly || tag });
      }
    }
  }

  // Show the verbose description of the first morpheme with a recognized part of speech
  const mainMorpheme = morphemes.find(m => m.pos === 'N' || m.pos === 'V' || m.pos === 'ADJ');
  const mainGr = mainMorpheme ? mainMorpheme.gr : morphemes[0]?.gr || '';
  const fullKey = parseGrammarTags(mainGr).join('|');
  const fullInfo = grammarTags[fullKey];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      {fullInfo && (
        <div style={{ fontSize: '0.75rem', color: fullInfo.color, fontWeight: 500 }}>
          {fullInfo.verbose}
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
        {allTags.slice(0, 6).map((t, i) => (
          <span
            key={i}
            style={{
              fontSize: '0.65rem',
              padding: '0.1rem 0.4rem',
              borderRadius: '0.25rem',
              background: `${t.color}18`,
              color: t.color,
              border: `1px solid ${t.color}30`,
              fontWeight: 500,
            }}
          >
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Wire into QuranReader word popup**

In `apps/kalimat/src/components/reader/QuranReader.tsx`:

Add imports:
```tsx
import { useCorpusLoader } from '@/hooks/useCorpusLoader';
import { GrammarBadges } from '@/components/shared/GrammarBadges';
import type { SurahCorpus } from '@/types';
```

Add state and loading:
```tsx
const { loadCorpus } = useCorpusLoader();
const [corpus, setCorpus] = useState<SurahCorpus>({});

// Add to the existing useEffect that loads surah data:
loadCorpus(surahNum).then(setCorpus);
```

In the selected word popover (after the existing MorphemeBar, around line 164), add:

```tsx
{corpus[selectedWord.id] && (
  <div style={{ marginTop: '0.5rem' }}>
    <GrammarBadges morphemes={corpus[selectedWord.id]} />
  </div>
)}
```

**Step 3: Build and verify**

```bash
npx turbo build --filter=@arabtools/kalimat
```

Expected: Build succeeds.

**Step 4: Commit**

```bash
git add apps/kalimat/src/components/shared/GrammarBadges.tsx apps/kalimat/src/components/reader/QuranReader.tsx
git commit -m "feat(kalimat): add grammar tag badges to QuranReader word popup"
```

---

## Task 7: Add Grammar Tags to AyahView Word Popup

**Files:**
- Modify: `apps/kalimat/src/components/context/AyahView.tsx`

**Step 1: Wire corpus data into AyahView**

Add imports:
```tsx
import { useCorpusLoader } from '@/hooks/useCorpusLoader';
import { GrammarBadges } from '@/components/shared/GrammarBadges';
import type { SurahCorpus } from '@/types';
```

Add state:
```tsx
const { loadCorpus } = useCorpusLoader();
const [corpus, setCorpus] = useState<SurahCorpus>({});
```

Add to existing useEffect (the one loading surah data):
```tsx
loadCorpus(surahNum).then(setCorpus);
```

In the selected word popover (after the root/frequency buttons, around line 183), add:

```tsx
{corpus[ayahWords[selectedWordIdx].id] && (
  <div style={{ marginTop: '0.5rem' }}>
    <GrammarBadges morphemes={corpus[ayahWords[selectedWordIdx].id]} />
  </div>
)}
```

**Step 2: Build and verify**

```bash
npx turbo build --filter=@arabtools/kalimat
```

**Step 3: Commit**

```bash
git add apps/kalimat/src/components/context/AyahView.tsx
git commit -m "feat(kalimat): add grammar tag badges to AyahView word popup"
```

---

## Task 8: Add Grammar Tags to Word-by-Word Breakdown in AyahView

Show grammar info inline in the word-by-word breakdown table, not just the popup.

**Files:**
- Modify: `apps/kalimat/src/components/context/AyahView.tsx`

**Step 1: Add grammar info to word breakdown items**

In the word-by-word mode section (around line 281-301), after the MorphemeBar and before the meaning span, add:

```tsx
{corpus[w.id] && (
  <div style={{ marginTop: '0.15rem' }}>
    <GrammarBadges morphemes={corpus[w.id]} compact />
  </div>
)}
```

**Step 2: Build and verify**

```bash
npx turbo build --filter=@arabtools/kalimat
```

**Step 3: Commit**

```bash
git add apps/kalimat/src/components/context/AyahView.tsx
git commit -m "feat(kalimat): add grammar badges to word-by-word breakdown"
```

---

## Task 9: Final Integration Build and Verification

**Step 1: Full build**

```bash
npx turbo build
```

Expected: All apps build successfully.

**Step 2: Visual check**

```bash
npx turbo dev --filter=@arabtools/kalimat
```

Verify in browser at `http://localhost:5181`:
- Navigate to any lemma → should show "See in Context" section below etymology
- Navigate to QuranReader (`#/read/1`) → click any word → should show grammar badges in popup
- Navigate to AyahView (`#/ayah/1/2`) → click a word → grammar badges in popup + in word-by-word list

**Step 3: Commit any fixes**

```bash
git add -A
git commit -m "feat(kalimat): Phase 1 enrichments complete"
```
