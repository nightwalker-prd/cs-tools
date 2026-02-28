# Kalaam Web Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build `@arabtools/kalaam` — a web clone of the Kalaam Quranic Arabic learning app inside the alqalam-tools monorepo.

**Architecture:** New app at `apps/kalaam/` using pre-extracted JSON data from Kalaam's SQLite databases. Reuses `@arabtools/srs` for spaced repetition, `@arabtools/ui` for shared components, and Tailwind CSS with a custom teal/white theme. Hash-based client-side routing, localStorage persistence, mobile-first layout.

**Tech Stack:** React 19, Vite 6, TypeScript 5.7, Tailwind CSS 4, `@arabtools/srs` (FSRS), `@arabtools/ui` (Radix), better-sqlite3 (build-time extraction only)

**Design doc:** `docs/plans/2026-02-15-kalaam-design.md`

**Source databases:**
- `quran.db` at `/Users/miftah/Desktop/kalaam/extracted/Payload/Kalaam.app/assets/src/assets/db/quran.db`
- `en_quran.db` — extract from `/Users/miftah/Desktop/kalaam/extracted/Payload/Kalaam.app/assets/src/assets/db/English.zip` to `/tmp/en_quran.db`

---

## Task 1: App Scaffold

**Files:**
- Create: `apps/kalaam/package.json`
- Create: `apps/kalaam/tsconfig.json`
- Create: `apps/kalaam/vite.config.ts`
- Create: `apps/kalaam/postcss.config.js`
- Create: `apps/kalaam/index.html`
- Create: `apps/kalaam/src/main.tsx`
- Create: `apps/kalaam/src/App.tsx`
- Create: `apps/kalaam/src/index.css`
- Create: `apps/kalaam/src/types/index.ts`

**Step 1: Create package.json**

```json
{
  "name": "@arabtools/kalaam",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src/",
    "extract-data": "npx tsx scripts/extract-db.ts"
  },
  "dependencies": {
    "@arabtools/core": "*",
    "@arabtools/srs": "*",
    "@arabtools/ui": "*",
    "lucide-react": "^0.468.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.18",
    "@types/better-sqlite3": "^7.6.8",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react-swc": "^3.8.0",
    "autoprefixer": "^10.4.20",
    "better-sqlite3": "^12.6.2",
    "postcss": "^8.4.49",
    "tailwindcss": "^4.0.0",
    "tsx": "^4.19.0",
    "typescript": "^5.7.0",
    "vite": "^6.0.0"
  }
}
```

**Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"]
}
```

**Step 3: Create vite.config.ts**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    port: 5180,
    open: true,
  },
});
```

**Step 4: Create postcss.config.js**

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

**Step 5: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>Kalaam - Learn Quranic Arabic</title>
    <meta name="description" content="Learn Quranic Arabic vocabulary with spaced repetition — understand 100% of the Quran" />
    <meta name="theme-color" content="#1D729B" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 6: Create src/index.css with Kalaam's teal theme**

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&family=Amiri:wght@400;700&display=swap');

@import "tailwindcss";

@theme {
  --color-primary: #1D729B;
  --color-primary-light: #DAF2F6;
  --color-primary-dark: #247CA0;
  --color-accent: #E37730;
  --color-accent-light: #FFF3EC;
  --color-background: #FFFFFF;
  --color-card: #F5F7FA;
  --color-card-hover: #EEF1F5;
  --color-text: #1A1A2E;
  --color-text-secondary: #6B7280;
  --color-border: #E5E7EB;
  --color-grammar-root: #2D8C3C;
  --color-grammar-vowel: #E8751A;
  --color-grammar-meaning: #1D729B;
  --color-success: #10B981;
  --color-danger: #EF4444;

  --font-sans: 'Poppins', sans-serif;
  --font-arabic: 'Noto Sans Arabic', 'Amiri', serif;
  --font-quran: 'Amiri', serif;

  --radius: 0.75rem;
}

* {
  border-color: var(--color-border);
}

body {
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

.font-arabic {
  font-family: var(--font-arabic);
  direction: rtl;
}

.font-quran {
  font-family: var(--font-quran);
  direction: rtl;
  font-feature-settings: 'liga', 'dlig';
}
```

**Step 7: Create src/types/index.ts**

Define all TypeScript types mirroring the extracted JSON schema — see design doc Section 2 for all type shapes. Key types: `SurahIndex`, `LemmaIndex`, `SurahData`, `AyahData`, `WordData`, `WordPart`, `WordBatchItem`, `GrammarData`, `Transformation`, `DerivedForm`, `ParentForm`, `GrammarTag`.

**Step 8: Create src/main.tsx**

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

**Step 9: Create src/App.tsx — minimal shell with hash router**

Bare-bones App with a hash-based router state (`study` | `read` | `settings`) and a BottomNav. Just renders the route name for now — pages will be built in later tasks.

**Step 10: Install dependencies and verify build**

Run: `cd /Users/miftah/projects/alqalam-tools && pnpm install && pnpm --filter @arabtools/kalaam build`
Expected: Clean TypeScript compilation, Vite outputs to `apps/kalaam/dist/`

**Step 11: Commit**

```bash
git add apps/kalaam/
git commit -m "feat(kalaam): scaffold app with teal theme and hash router"
```

---

## Task 2: Data Extraction Script

**Files:**
- Create: `apps/kalaam/scripts/extract-db.ts`
- Create: `apps/kalaam/public/data/meta/` (generated)
- Create: `apps/kalaam/public/data/quran/` (generated)
- Create: `apps/kalaam/public/data/words/` (generated)
- Create: `apps/kalaam/public/data/grammar/` (generated)

**Step 1: Write the extraction script**

`apps/kalaam/scripts/extract-db.ts` reads both SQLite databases using `better-sqlite3` (already a monorepo root devDep) and writes all JSON chunks.

The script should:

1. Open `quran.db` and `en_quran.db` (extract English.zip to /tmp first if needed)
2. **Meta extraction:**
   - Query `surahNames` from en_quran.db → write `meta/surah-index.json`
   - Query `lemmaCount` + `lemmaTranslation` joined → write `meta/lemma-index.json` (sorted by frequency desc)
   - Query `pTranslation` → write `meta/particles.json`
   - Query `parentForms` → write `meta/parent-forms.json`
   - Query `grammar` from quran.db → write `meta/grammar-tags.json`
   - Query `grammarTranslation` → write `meta/grammar-translations.json`
3. **Surah extraction (114 files):**
   - For each surah 1-114:
     - Get ayahs from `ayahArabic` + `ayahTranslation`
     - For each ayah, get words from `arabicWords` + `wordTranslation` + `wordTransliteration`
     - For each word, get morphology parts from `morphology` + grammar tag colors from `grammar`
     - Write `quran/{surahNum}.json`
4. **Word batch extraction (10 files):**
   - Join `lemmaCount` + `lemmaTranslation` + `bestMorphologyRowForLemma` + `lemmaInAyahTranslation` + `cacheTestData` (language_id=19 for English)
   - Sort by frequency desc, split into 10 batches of ~480
   - Write `words/batch-{0-9}.json`
5. **Grammar extraction (per-lemma files):**
   - For each lemma, query `transformations` from en_quran.db (grouped by wordLoc, ordered by step)
   - Query `morphology` for all derived forms, group by unique (arabic, grammarTag), count occurrences, get example ayahs
   - Write `grammar/{lemmaId}.json`
6. **Validation:** Print counts — should match: 114 surahs, 6236 ayahs, 77429 words, 4784 lemmas, 4784 grammar files

**Step 2: Run the extraction**

Run: `cd /Users/miftah/projects/alqalam-tools && pnpm --filter @arabtools/kalaam extract-data`
Expected: All JSON files generated in `apps/kalaam/public/data/`, validation counts printed.

**Step 3: Add `public/data/` to .gitignore** (generated data, ~40MB, should not be committed)

Create `apps/kalaam/.gitignore`:
```
public/data/
dist/
```

**Step 4: Verify a few generated files manually**

Spot-check: `public/data/quran/1.json` should have 7 ayahs (Al-Fatihah), `public/data/meta/surah-index.json` should have 114 entries.

**Step 5: Commit**

```bash
git add apps/kalaam/scripts/ apps/kalaam/.gitignore
git commit -m "feat(kalaam): add SQLite-to-JSON extraction script"
```

---

## Task 3: Data Hooks & Types

**Files:**
- Create: `apps/kalaam/src/types/index.ts` (expand from scaffold)
- Create: `apps/kalaam/src/hooks/useQuranData.ts`
- Create: `apps/kalaam/src/hooks/useWordBatch.ts`
- Create: `apps/kalaam/src/hooks/useGrammarData.ts`
- Create: `apps/kalaam/src/hooks/useLemmaIndex.ts`
- Create: `apps/kalaam/src/hooks/index.ts`

**Step 1: Write complete TypeScript types**

All types from the design doc Section 2 — `SurahIndex`, `LemmaIndexEntry`, `SurahData`, `AyahData`, `WordData`, `WordPart`, `WordBatchItem`, `GrammarData`, `Transformation`, `DerivedForm`, `DerivedFormExample`, `ParentForm`, `GrammarTag`, `GrammarTranslation`, `Particle`.

**Step 2: Write data hooks**

Each hook follows this pattern:
- State: `{ data: T | null, loading: boolean, error: string | null }`
- Fetches from `/data/.../*.json` via `fetch()`
- Caches in a module-level `Map` to avoid re-fetching
- Returns `{ data, loading, error }`

`useLemmaIndex()` — loads once on mount, provides `getById(lemmaId)` and `search(query)` helpers.

`useQuranData(surahNum)` — loads per-surah JSON when surahNum changes.

`useWordBatch(batchNum)` — loads a specific word batch.

`useGrammarData(lemmaId)` — loads grammar data for one lemma on demand.

**Step 3: Build and verify types compile**

Run: `pnpm --filter @arabtools/kalaam build`
Expected: Clean compilation

**Step 4: Commit**

```bash
git add apps/kalaam/src/types/ apps/kalaam/src/hooks/
git commit -m "feat(kalaam): add data types and lazy-loading hooks"
```

---

## Task 4: Router & Layout Shell

**Files:**
- Modify: `apps/kalaam/src/App.tsx`
- Create: `apps/kalaam/src/hooks/useRouter.ts`
- Create: `apps/kalaam/src/components/BottomNav.tsx`
- Create: `apps/kalaam/src/components/PageContainer.tsx`
- Create: `apps/kalaam/src/pages/StudyPage.tsx` (placeholder)
- Create: `apps/kalaam/src/pages/ReadPage.tsx` (placeholder)
- Create: `apps/kalaam/src/pages/SettingsPage.tsx` (placeholder)

**Step 1: Write hash router hook**

`useRouter()` — reads `window.location.hash`, returns `{ route, params, navigate }`. Supports:
- `#/` → `{ page: 'study' }`
- `#/read` → `{ page: 'read' }`
- `#/read/:surahNum` → `{ page: 'surah', params: { surahNum } }`
- `#/lesson` → `{ page: 'lesson' }`
- `#/word/:lemmaId` → `{ page: 'word', params: { lemmaId } }`
- `#/settings` → `{ page: 'settings' }`

Listens to `hashchange` events. `navigate(hash)` sets `location.hash`.

**Step 2: Write BottomNav**

3 tabs matching Kalaam: Study (BookOpen icon), Read (BookText icon), Settings (Settings icon). Teal active state, gray inactive. Fixed to bottom, 56px height.

**Step 3: Write PageContainer**

Max-width 430px centered wrapper with `pb-16` (room for BottomNav). Scrollable.

**Step 4: Write placeholder pages**

Each page renders its name in a centered heading. Will be replaced in later tasks.

**Step 5: Wire up App.tsx**

App renders `<PageContainer>` with the active page based on router, plus `<BottomNav>`. Hide BottomNav on `lesson` and `word` routes (those are full-screen).

**Step 6: Build and verify**

Run: `pnpm --filter @arabtools/kalaam build`
Expected: Clean build, dev server shows 3 tabs with navigation working.

**Step 7: Commit**

```bash
git add apps/kalaam/src/
git commit -m "feat(kalaam): add hash router, bottom nav, and page shell"
```

---

## Task 5: Study Page

**Files:**
- Modify: `apps/kalaam/src/pages/StudyPage.tsx`
- Create: `apps/kalaam/src/components/study/DailyLessonCard.tsx`
- Create: `apps/kalaam/src/components/study/ProgressSection.tsx`
- Create: `apps/kalaam/src/components/study/UnderstandingChart.tsx`
- Create: `apps/kalaam/src/hooks/useKalaamSrs.ts`
- Create: `apps/kalaam/src/hooks/useUnderstanding.ts`
- Create: `apps/kalaam/src/hooks/useSettings.ts`
- Create: `apps/kalaam/src/lib/settings.ts`

**Step 1: Write useSettings hook**

Persisted settings in localStorage key `kalaam-settings`:
```typescript
{
  newPerDay: number       // default 5
  maxReviews: number      // default 20
  delayGrammar: boolean   // default false
  showTransliteration: boolean // default true
  fontSize: number        // default 1 (multiplier)
  prioritizedSurahs: number[] // default [1, 105..114]
}
```

Use `@arabtools/core`'s `usePersistedState` or a simple `useState` + `localStorage` wrapper.

**Step 2: Write useKalaamSrs hook**

Wraps `@arabtools/srs`'s `useSrsEngine` with Kalaam-specific logic:
- On first load: checks if deck is seeded. If not, loads lemma-index.json and creates 4,784 SrsItems.
- Provides: `{ dueCount, newCount, reviewCount, startLesson, isSeeded }`
- Storage key: `arabtools-srs-kalaam`

**Step 3: Write useUnderstanding hook**

Computes Quran understanding % from SRS deck state:
- Load lemma-index (has frequency counts)
- Count which lemmas are "learned" (review phase in SRS)
- Sum their frequencies / total word count in Quran (77,429)
- Return `{ percentage, projectionMonths }`

**Step 4: Write DailyLessonCard**

Match screenshot IMG_0098:
- Two stat boxes side by side: "New cards" (count) + "Review cards" (count with circular progress)
- Teal "Start today's lesson →" button
- Uses `useKalaamSrs` for counts

**Step 5: Write ProgressSection**

Match screenshot IMG_0099:
- Current streak + Record streak with icons
- Week day indicator circles (M T W T F S S) — today highlighted
- Total points + This week points
- Streak data from localStorage key `kalaam-streak`

**Step 6: Write UnderstandingChart**

Match screenshot IMG_0099:
- "With X minutes/day, you'll understand 100% of the Quran in ~Y months"
- Simple line chart (CSS/SVG — no chart library) showing current % and projected growth
- "I understand X% of the Quran" callout bubble
- "Share progress" button (copies text to clipboard)

**Step 7: Assemble StudyPage**

Stack: DailyLessonCard → PracticeCard (simple CTA for quiz) → ProgressSection → UnderstandingChart.

Header: "Daily Lesson" with settings gear icon on right.

**Step 8: Build and verify**

Run: `pnpm --filter @arabtools/kalaam build`

**Step 9: Commit**

```bash
git add apps/kalaam/src/
git commit -m "feat(kalaam): implement Study page with SRS stats and progress"
```

---

## Task 6: Quran Reader — Browser & Surah List

**Files:**
- Modify: `apps/kalaam/src/pages/ReadPage.tsx`
- Create: `apps/kalaam/src/components/read/ViewTypeSelector.tsx`
- Create: `apps/kalaam/src/components/read/UnderstandingBar.tsx`
- Create: `apps/kalaam/src/components/read/SurahList.tsx`
- Create: `apps/kalaam/src/lib/quran-divisions.ts`

**Step 1: Write quran-divisions.ts**

Static data mapping surahs to Juz (30), Hizb (60), Quarter (240). Each entry: `{ number, name, startSurah, startAyah, endSurah, endAyah, ayahCount }`. This is derivable from standard Quran structure data.

**Step 2: Write ViewTypeSelector**

Bottom sheet modal (match screenshot IMG_0101): Surah / Juz / Hizb / Quarter options. On select, updates view mode. Uses a dropdown or sheet triggered by the current mode label.

**Step 3: Write UnderstandingBar**

Teal progress bar showing "Quran Understanding" percentage. "+X% since joined" badge. Uses `useUnderstanding()`.

**Step 4: Write SurahList**

Scrollable list of sections based on current view type. Each item shows: number badge, title, surah range + ayah count. Tapping navigates to `#/read/{surahNum}`. Star icon for prioritized surahs.

**Step 5: Assemble ReadPage**

Header with view type dropdown + search icon + bookmark icon + settings icon. UnderstandingBar below header. SurahList as main content. "Continue reading" sticky teal button at bottom.

**Step 6: Build and verify**

Run: `pnpm --filter @arabtools/kalaam build`

**Step 7: Commit**

```bash
git add apps/kalaam/src/
git commit -m "feat(kalaam): implement Quran browser with surah list and view types"
```

---

## Task 7: Quran Reader — Surah View with Word-by-Word

**Files:**
- Create: `apps/kalaam/src/pages/SurahReaderPage.tsx`
- Create: `apps/kalaam/src/components/read/SurahHeader.tsx`
- Create: `apps/kalaam/src/components/read/AyahBlock.tsx`
- Create: `apps/kalaam/src/components/read/TappableWord.tsx`
- Create: `apps/kalaam/src/components/read/WordPopup.tsx`
- Create: `apps/kalaam/src/components/read/ReaderModeBar.tsx`
- Modify: `apps/kalaam/src/App.tsx` (add route)

**Step 1: Write SurahHeader**

Decorative frame matching screenshot IMG_0108: Surah name in Arabic calligraphy, decorative border. Below: Juz / Hizb / Quarter indicators.

**Step 2: Write AyahBlock**

For each ayah: ayah number badge on left, Arabic text RTL, English translation below. Bookmark icon. Match screenshot IMG_0108.

In "Word by Word" mode: Arabic text is rendered as individual `TappableWord` components instead of a single text block.

**Step 3: Write TappableWord**

Each word is a `<span>` with `cursor-pointer`. On click, opens `WordPopup`. Learned words (from SRS deck state) can optionally have faded translations below them.

**Step 4: Write WordPopup**

Floating popup (match screenshot IMG_0102): Arabic word large, English translation, speaker icon, "Mark word as unfamiliar" button. Shows grammar color bar. Tap "More information" navigates to `#/word/{lemmaId}`.

Position the popup near the tapped word using absolute positioning.

**Step 5: Write ReaderModeBar**

Bottom tab bar with 3 modes: Translation (show/hide ayah translations), Word by Word (enable/disable word-level interaction), Prioritize (highlight words from prioritized surahs). Match screenshot IMG_0102 bottom.

**Step 6: Assemble SurahReaderPage**

Uses `useQuranData(surahNum)`. Back arrow navigates to `#/read`. Shows SurahHeader, then scrollable list of AyahBlocks. ReaderModeBar at bottom. Audio play/pause controls (placeholder — no actual audio in v1, just the UI).

**Step 7: Build and verify**

Run: `pnpm --filter @arabtools/kalaam build`

**Step 8: Commit**

```bash
git add apps/kalaam/src/
git commit -m "feat(kalaam): implement Surah reader with word-by-word popups"
```

---

## Task 8: Flashcard Session

**Files:**
- Create: `apps/kalaam/src/pages/LessonPage.tsx`
- Create: `apps/kalaam/src/components/lesson/FlashcardStack.tsx`
- Create: `apps/kalaam/src/components/lesson/CardFront.tsx`
- Create: `apps/kalaam/src/components/lesson/CardBack.tsx`
- Create: `apps/kalaam/src/components/lesson/GradeButtons.tsx`
- Create: `apps/kalaam/src/components/lesson/LessonProgressBar.tsx`
- Create: `apps/kalaam/src/components/lesson/LessonComplete.tsx`
- Create: `apps/kalaam/src/hooks/useLessonSession.ts`
- Modify: `apps/kalaam/src/App.tsx` (add route)

**Step 1: Write useLessonSession hook**

Wraps `@arabtools/srs` session management:
- `startSession()` — calls engine.startSession with settings (maxItems, maxNewItems)
- `currentItem` — the current SrsItem + resolved word data (from word batch)
- `grade(quality)` — grades current card, advances to next
- `progress` — `{ current, total, points }`
- `isComplete` — true when all items reviewed
- `results` — summary stats after completion

**Step 2: Write LessonProgressBar**

Top bar: thin teal progress bar (current/total), points counter with star icon on right. Back arrow on left.

**Step 3: Write FlashcardStack**

Visual stack of 3 cards using CSS transforms (match screenshot IMG_0110):
- Back cards: `scale(0.95) translateY(-8px)` and `scale(0.9) translateY(-16px)` with lower opacity
- Front card: full size, interactive
- Flip animation: `transform: rotateY(180deg)` with `perspective(1000px)` and `backface-visibility: hidden`

State: `'front' | 'back'`. Click/tap to flip. After flip, show GradeButtons.

**Step 4: Write CardFront**

Match screenshot IMG_0109/0110:
- Speaker icon top-left
- Large Arabic word centered (font-quran, ~3rem)
- Transliteration + "Occurs X times" below
- Quranic context sentence (arabic, full ayah snippet with target word highlighted)
- "Tap to flip" prompt at bottom

**Step 5: Write CardBack**

Match screenshot IMG_0111:
- Top-right: image icon, delete icon, hint icon (non-functional in v1)
- Root letters + speaker icon (left side)
- Large Arabic word (right side)
- Transliteration below root
- English meaning large and teal: **"hasten!"**
- Copy icon next to meaning
- Speaker icon
- Quranic context sentence
- "More information" button (navigates to `#/word/{lemmaId}`)
- "Swipe for next" prompt

**Step 6: Write GradeButtons**

Bottom bar after flip: "Don't know" (left, with chevron-left) and "Know" (right, with chevron-right). Match screenshot IMG_0111 bottom.

**Step 7: Write LessonComplete**

Summary screen after all cards reviewed: cards reviewed count, accuracy %, points earned, streak update. "Back to Study" button.

**Step 8: Assemble LessonPage**

Uses `useLessonSession`. Shows LessonProgressBar + FlashcardStack. On complete, shows LessonComplete. Back arrow exits to study page with confirmation if mid-session.

**Step 9: Build and verify**

Run: `pnpm --filter @arabtools/kalaam build`

**Step 10: Commit**

```bash
git add apps/kalaam/src/
git commit -m "feat(kalaam): implement flashcard session with SRS grading"
```

---

## Task 9: Word Details Page

**Files:**
- Create: `apps/kalaam/src/pages/WordDetailPage.tsx`
- Create: `apps/kalaam/src/components/word/WordHeader.tsx`
- Create: `apps/kalaam/src/components/word/DetailsTab.tsx`
- Create: `apps/kalaam/src/components/word/AyahSection.tsx`
- Create: `apps/kalaam/src/components/word/ExplanationSection.tsx`
- Create: `apps/kalaam/src/components/word/GrammarFlowDiagram.tsx`
- Create: `apps/kalaam/src/components/word/TransformationCard.tsx`
- Create: `apps/kalaam/src/components/word/UsagesTab.tsx`
- Create: `apps/kalaam/src/components/word/DerivedFormGroup.tsx`
- Modify: `apps/kalaam/src/App.tsx` (add route)

**Step 1: Write WordHeader**

Match screenshot IMG_0113 top: Back arrow, word location reference "(38:16:3)", speaker icon, image icon. Below: Details / Usages tab selector (teal underline active state).

**Step 2: Write AyahSection**

Collapsible "Ayah" section: full Arabic ayah text with target word bolded + English translation with keyword bolded. Match screenshot IMG_0113/0114.

**Step 3: Write ExplanationSection**

Collapsible "Explanation" section: renders the `lemmaTranslation.info` paragraph. Match screenshot IMG_0114. Expand/collapse with chevron.

**Step 4: Write GrammarFlowDiagram**

Match screenshots IMG_0104/0105/0115 — the vertical flow diagram:
- First card: root letters in green (`--grammar-root`), meaning below
- Arrow (gray, centered)
- Step cards: Arabic word with color-coded diacritics/affixes, meaning, transformation note with grammar explanation
- Arrow between each step
- Final card: the actual Quranic form

Each card uses `TransformationCard`.

**Step 5: Write TransformationCard**

Rounded `bg-card` card with:
- Arabic word centered, large (with color coding from `colorCoding` JSON — split word into pieces, each colored)
- English meaning below
- Info icon that shows the `parentForm` explanation as a tooltip/popover
- Grammar note text in `text-secondary`

**Step 6: Write UsagesTab**

Match screenshots IMG_0106/0116:
- Header: "The root X occurs Y times in the Quran, in Z derived forms"
- List of derived forms, each expandable
- Each `DerivedFormGroup`: Arabic form + meaning + count on one line, expand to show example ayahs with context

**Step 7: Write DerivedFormGroup**

Expandable row: Arabic derived form (right), meaning + count (left). Expanded: list of ayah examples — each shows surah:ayah reference, Arabic text with target word bolded, English translation.

**Step 8: Assemble WordDetailPage**

Uses `useGrammarData(lemmaId)`. Tab state: 'details' | 'usages'. Renders WordHeader + active tab content. Loading state while grammar JSON loads.

**Step 9: Build and verify**

Run: `pnpm --filter @arabtools/kalaam build`

**Step 10: Commit**

```bash
git add apps/kalaam/src/
git commit -m "feat(kalaam): implement Word Details with grammar flow and usages"
```

---

## Task 10: Settings & Surah Prioritization

**Files:**
- Modify: `apps/kalaam/src/pages/SettingsPage.tsx`
- Create: `apps/kalaam/src/components/settings/StatsOverview.tsx`
- Create: `apps/kalaam/src/components/settings/SurahPrioritization.tsx`
- Create: `apps/kalaam/src/components/settings/LessonSettings.tsx`
- Create: `apps/kalaam/src/components/settings/DisplaySettings.tsx`
- Create: `apps/kalaam/src/components/settings/DataExport.tsx`

**Step 1: Write StatsOverview**

Card showing: words learned / 4784 total, Quran understanding %, current streak, total reviews.

**Step 2: Write SurahPrioritization**

Searchable list of 114 surahs with checkboxes. Default prioritized: Al-Fatihah (1), surahs 105-114. Show surah name (arabic + english) and ayah count. Saves to `kalaam-settings.prioritizedSurahs`.

**Step 3: Write LessonSettings**

Sliders/inputs for: new words per day (1-20, default 5), max reviews per session (5-50, default 20), delay grammar toggle.

**Step 4: Write DisplaySettings**

Font size slider (0.8x - 1.5x), show transliteration toggle.

**Step 5: Write DataExport**

"Export Progress" button: downloads SRS state + settings as JSON file. "Import Progress" button: file picker to restore from JSON. "Reset Progress" with confirmation dialog.

**Step 6: Assemble SettingsPage**

Stack all sections with dividers. Header: "Settings".

**Step 7: Build and verify**

Run: `pnpm --filter @arabtools/kalaam build`

**Step 8: Commit**

```bash
git add apps/kalaam/src/
git commit -m "feat(kalaam): implement Settings with surah prioritization and data export"
```

---

## Task 11: Quiz Mode

**Files:**
- Create: `apps/kalaam/src/components/lesson/QuizCard.tsx`
- Create: `apps/kalaam/src/hooks/useQuizSession.ts`
- Modify: `apps/kalaam/src/pages/LessonPage.tsx` (add quiz mode)
- Modify: `apps/kalaam/src/pages/StudyPage.tsx` (add quiz CTA)

**Step 1: Write QuizCard**

Match screenshot IMG_0109 top:
- Speaker icon, large Arabic word, transliteration, frequency
- Quranic context sentence
- "Translate the Arabic word using one of the following methods"
- Text input mode: type answer, check button
- Multiple-choice mode: 4 buttons (1 correct from `quiz.correctAnswer` + 3 from `quiz.wrongChoices`)

**Step 2: Write useQuizSession**

Similar to useLessonSession but uses quiz format. Grades: correct answer → Good (2), wrong → Again (0). Tracks score.

**Step 3: Add quiz mode to LessonPage**

Study page "Start challenge →" navigates to `#/lesson?mode=quiz`. LessonPage checks query param and renders QuizCard instead of FlashcardStack.

**Step 4: Build and verify**

Run: `pnpm --filter @arabtools/kalaam build`

**Step 5: Commit**

```bash
git add apps/kalaam/src/
git commit -m "feat(kalaam): add quiz mode with multiple-choice and text input"
```

---

## Task 12: Polish & Integration Testing

**Files:**
- Modify: various — cross-cutting polish pass

**Step 1: Loading states**

Add skeleton loaders for: surah list (while surah-index loads), surah reader (while surah JSON loads), flashcard (while word batch loads), word details (while grammar JSON loads). Simple pulse animation placeholder cards.

**Step 2: Empty states**

Handle: no reviews due ("All caught up!"), no words learned yet (onboarding prompt), surah not found (404-style message).

**Step 3: Error states**

Handle fetch failures for JSON data with retry button. Handle SRS storage corruption with "Reset data" option.

**Step 4: Responsive layout**

Verify mobile (375px) and desktop (1440px). On desktop, center content in max-430px column with subtle side margins. Ensure all Arabic text renders correctly RTL.

**Step 5: Keyboard navigation**

Flashcard: Space to flip, Left arrow for "Don't know", Right arrow for "Know". Quiz: 1-4 number keys for choices.

**Step 6: Full build**

Run: `pnpm --filter @arabtools/kalaam build`
Expected: Clean build, no TypeScript errors, no warnings.

**Step 7: Manual smoke test**

Dev server: verify all 5 pages render, flashcard flow works end-to-end, word details load grammar, surah reader shows word popups.

**Step 8: Commit**

```bash
git add apps/kalaam/
git commit -m "feat(kalaam): add loading states, error handling, and responsive polish"
```

---

## Summary

| Task | What | Key Components |
|------|------|---------------|
| 1 | App scaffold | package.json, vite, tailwind, types, router shell |
| 2 | Data extraction | SQLite → JSON script, all content extracted |
| 3 | Data hooks | useLemmaIndex, useQuranData, useWordBatch, useGrammarData |
| 4 | Router & layout | Hash router, BottomNav, PageContainer |
| 5 | Study page | DailyLessonCard, ProgressSection, UnderstandingChart, SRS integration |
| 6 | Quran browser | ViewTypeSelector, SurahList, UnderstandingBar |
| 7 | Surah reader | AyahBlock, TappableWord, WordPopup, ReaderModeBar |
| 8 | Flashcards | FlashcardStack, CardFront/Back, GradeButtons, LessonComplete |
| 9 | Word details | GrammarFlowDiagram, TransformationCard, UsagesTab |
| 10 | Settings | SurahPrioritization, LessonSettings, DataExport |
| 11 | Quiz mode | QuizCard, multiple-choice + text input |
| 12 | Polish | Loading/empty/error states, responsive, keyboard nav |
