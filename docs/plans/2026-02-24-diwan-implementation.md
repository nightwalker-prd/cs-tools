# Diwan Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an Arabic poetry collection viewer (Diwan) with 16 poets and ~78 poems, using the established sidebar + content layout pattern.

**Architecture:** Sidebar-by-poet navigation (grouped by era) with a poem reader showing two-hemistich verse layout, English translations, and vocabulary highlights. Data bundled as TypeScript files. Hash-based routing.

**Tech Stack:** React 19, Vite 6, TypeScript 5.7, Tailwind CSS 4.0, @arabtools/ui, @arabtools/core

---

## Task 1: Scaffold App

**Files:**
- Create: `apps/diwan/package.json`
- Create: `apps/diwan/index.html`
- Create: `apps/diwan/tsconfig.json`
- Create: `apps/diwan/vite.config.ts`
- Create: `apps/diwan/src/main.tsx`
- Create: `apps/diwan/src/App.tsx`
- Create: `apps/diwan/src/index.css`
- Modify: `scripts/deploy.sh` — add `diwan` to ALL_APPS

**Step 1: Create `apps/diwan/package.json`**

```json
{
  "name": "@arabtools/diwan",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src/"
  },
  "dependencies": {
    "@arabtools/core": "*",
    "@arabtools/ui": "*",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.18",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react-swc": "^3.8.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.0",
    "vite": "^6.0.0"
  }
}
```

**Step 2: Create `apps/diwan/vite.config.ts`**

```ts
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
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'vendor';
          }
          if (id.includes('@radix-ui/')) {
            return 'radix';
          }
          if (id.includes('/data/poems/')) {
            return 'poem-data';
          }
        },
      },
    },
  },
  server: {
    port: 5198,
    open: true,
  },
});
```

**Step 3: Create `apps/diwan/tsconfig.json`**

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

**Step 4: Create `apps/diwan/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/icon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>Diwan - Arabic Poetry Collection</title>
    <meta name="description" content="Classical Arabic poetry collection. Browse diwans of 16 poets from pre-Islamic to modern era with translations and vocabulary." />
    <meta name="theme-color" content="#1a3150" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 5: Create `apps/diwan/src/main.tsx`**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from '@arabtools/ui';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
```

**Step 6: Create `apps/diwan/src/App.tsx`** (placeholder)

```tsx
export default function App() {
  return <div>Diwan</div>;
}
```

**Step 7: Create `apps/diwan/src/index.css`**

Copy the standard theme from reading app — fonts import, `@import "tailwindcss"`, `@theme` block with all color variables, body styles, heading fonts, `.font-arabic` class.

**Step 8: Add diwan to deploy script**

In `scripts/deploy.sh`, add `diwan` to the `ALL_APPS` string.

**Step 9: Install and verify**

```bash
cd /Users/miftah/projects/alqalam-tools
npm install
npx turbo build --filter=@arabtools/diwan
```

Expected: Build succeeds with dist/ output.

**Step 10: Commit**

```bash
git add apps/diwan/ scripts/deploy.sh
git commit -m "feat(diwan): scaffold app with TypeScript + Tailwind + Vite"
```

---

## Task 2: Types and Data Layer

**Files:**
- Create: `apps/diwan/src/types.ts`
- Create: `apps/diwan/src/data/poets.ts`
- Create: `apps/diwan/src/data/eras.ts`

**Step 1: Create `apps/diwan/src/types.ts`**

```ts
export type Era = 'jahili' | 'islami' | 'umawi' | 'abbasi' | 'andalusi' | 'sufi' | 'modern';

export type Genre = 'ghazal' | 'madih' | 'hija' | 'ritha' | 'zuhd' | 'khamriyyat' | 'wasf' | 'fakhr' | 'hikma' | 'sufi' | 'hanin' | 'wataniyyat';

export interface Poet {
  id: string;
  nameAr: string;
  nameEn: string;
  era: Era;
  dates: string;
  bioAr: string;
  bioEn: string;
  genres: Genre[];
}

export interface Verse {
  sadr: string;
  ajuz: string;
}

export interface VocabItem {
  word: string;
  meaning: string;
}

export interface Poem {
  id: string;
  poetId: string;
  titleAr: string;
  titleEn: string;
  genre: Genre;
  level: 'beginner' | 'intermediate' | 'advanced';
  verses: Verse[];
  translationEn: string;
  vocabularyHighlights: VocabItem[];
  context: string;
}

export interface EraInfo {
  id: Era;
  nameAr: string;
  nameEn: string;
  order: number;
}
```

**Step 2: Create `apps/diwan/src/data/eras.ts`**

```ts
import { EraInfo } from '../types';

export const ERAS: EraInfo[] = [
  { id: 'jahili', nameAr: 'العصر الجاهلي', nameEn: 'Pre-Islamic', order: 1 },
  { id: 'islami', nameAr: 'صدر الإسلام', nameEn: 'Early Islamic', order: 2 },
  { id: 'umawi', nameAr: 'العصر الأموي', nameEn: 'Umayyad', order: 3 },
  { id: 'abbasi', nameAr: 'العصر العباسي', nameEn: 'Abbasid', order: 4 },
  { id: 'andalusi', nameAr: 'العصر الأندلسي', nameEn: 'Andalusian', order: 5 },
  { id: 'sufi', nameAr: 'الشعر الصوفي', nameEn: 'Sufi', order: 6 },
  { id: 'modern', nameAr: 'العصر الحديث', nameEn: 'Modern', order: 7 },
];
```

**Step 3: Create `apps/diwan/src/data/poets.ts`**

Full poet data for all 16 poets with bios. Each poet entry has `id`, `nameAr`, `nameEn`, `era`, `dates`, `bioAr`, `bioEn`, `genres`. This is the poet metadata — no poem content yet.

**Step 4: Verify build**

```bash
npx turbo build --filter=@arabtools/diwan
```

**Step 5: Commit**

```bash
git add apps/diwan/src/types.ts apps/diwan/src/data/
git commit -m "feat(diwan): add types and data layer with 16 poets"
```

---

## Task 3: Poem Data — Pre-Islamic Poets (15 poems)

**Files:**
- Create: `apps/diwan/src/data/poems/imru-al-qays.ts` (5 poems)
- Create: `apps/diwan/src/data/poems/tarafa.ts` (5 poems)
- Create: `apps/diwan/src/data/poems/antara.ts` (5 poems)
- Create: `apps/diwan/src/data/poems/index.ts`

Each poem file exports a `Poem[]` array. Each poem has: Arabic verses (sadr/ajuz pairs), English translation, vocabulary highlights (5-8 words), context blurb, genre, and level.

**Sources for content:** Famous well-known poems — Mu'allaqat for Imru' al-Qays and Tarafa, heroic odes for Antara.

**Step 1:** Create poem data files with authentic Arabic text and translations.

**Step 2:** Create `apps/diwan/src/data/poems/index.ts` that re-exports all poems and provides a lookup by poetId:

```ts
import { Poem } from '../../types';
import { imruAlQaysPoems } from './imru-al-qays';
import { tarafaPoems } from './tarafa';
import { antaraPoems } from './antara';
// ... more imports added in later tasks

export const ALL_POEMS: Poem[] = [
  ...imruAlQaysPoems,
  ...tarafaPoems,
  ...antaraPoems,
];

export function getPoemsByPoet(poetId: string): Poem[] {
  return ALL_POEMS.filter(p => p.poetId === poetId);
}

export function getPoemById(id: string): Poem | undefined {
  return ALL_POEMS.find(p => p.id === id);
}
```

**Step 3: Verify build**

```bash
npx turbo build --filter=@arabtools/diwan
```

**Step 4: Commit**

```bash
git add apps/diwan/src/data/poems/
git commit -m "feat(diwan): add pre-Islamic poetry (Imru' al-Qays, Tarafa, Antara)"
```

---

## Task 4: Poem Data — Islamic & Umayyad Poets (15 poems)

**Files:**
- Create: `apps/diwan/src/data/poems/hassan.ts` (5 poems)
- Create: `apps/diwan/src/data/poems/jarir.ts` (5 poems)
- Create: `apps/diwan/src/data/poems/majnun.ts` (5 poems)
- Modify: `apps/diwan/src/data/poems/index.ts` — add imports

**Step 1:** Create poem data files. Hassan ibn Thabit: praise of the Prophet, defense poems. Jarir: satire and praise. Majnun Layla: famous love poetry.

**Step 2:** Update index.ts with new imports.

**Step 3: Verify build, commit**

```bash
git commit -m "feat(diwan): add Islamic & Umayyad poetry (Hassan, Jarir, Majnun)"
```

---

## Task 5: Poem Data — Abbasid Poets Part 1 (15 poems)

**Files:**
- Create: `apps/diwan/src/data/poems/abu-nuwas.ts` (5 poems)
- Create: `apps/diwan/src/data/poems/mutanabbi.ts` (5 poems)
- Create: `apps/diwan/src/data/poems/abu-tammam.ts` (5 poems)
- Modify: `apps/diwan/src/data/poems/index.ts`

Abu Nuwas: wine poetry (khamriyyat). Al-Mutanabbi: wisdom and praise. Abu Tammam: panegyric odes.

**Commit:** `"feat(diwan): add Abbasid poetry part 1 (Abu Nuwas, Mutanabbi, Abu Tammam)"`

---

## Task 6: Poem Data — Abbasid Poets Part 2 (15 poems)

**Files:**
- Create: `apps/diwan/src/data/poems/abu-al-atahiya.ts` (5 poems)
- Create: `apps/diwan/src/data/poems/al-maarri.ts` (5 poems)
- Create: `apps/diwan/src/data/poems/imam-shafii.ts` (5 poems)
- Modify: `apps/diwan/src/data/poems/index.ts`

Abu al-Atahiya: ascetic poetry. Al-Ma'arri: philosophical/wisdom verses. Imam al-Shafi'i: famous wisdom poetry (دع الأيام تفعل ما تشاء, etc.).

**Commit:** `"feat(diwan): add Abbasid poetry part 2 (Abu al-Atahiya, Ma'arri, Shafi'i)"`

---

## Task 7: Poem Data — Andalusian, Sufi, Modern (18 poems)

**Files:**
- Create: `apps/diwan/src/data/poems/ibn-zaydun.ts` (5 poems)
- Create: `apps/diwan/src/data/poems/ibn-al-farid.ts` (5 poems)
- Create: `apps/diwan/src/data/poems/rabia.ts` (3 poems)
- Create: `apps/diwan/src/data/poems/darwish.ts` (5 poems)
- Modify: `apps/diwan/src/data/poems/index.ts`

Ibn Zaydun: longing/love poetry. Ibn al-Farid: Sufi mystical. Rabi'a al-Adawiyya: divine love. Mahmoud Darwish: homeland/resistance.

**Commit:** `"feat(diwan): add Andalusian, Sufi, and Modern poetry"`

---

## Task 8: Sidebar Component

**Files:**
- Create: `apps/diwan/src/components/Sidebar.tsx`
- Create: `apps/diwan/src/App.css`
- Modify: `apps/diwan/src/App.tsx`

**Step 1: Create App.css**

CSS for the sidebar layout following reading app pattern:
- `.app-layout` grid (300px sidebar + 1fr content)
- `.sidebar` styling (sticky, custom scrollbar, border-right)
- `.sidebar-brand` header with icon and title
- `.sidebar-stats` 3-column stats row
- `.sidebar-search` input styling
- `.era-group` collapsible era sections with chevron rotation
- `.poet-item` navigation items with dot indicators for read status
- `.poem-subitem` nested poem links
- Responsive: `@media (max-width: 900px)` — hamburger + overlay pattern
- All animations: fadeIn, slideInLeft

**Step 2: Create Sidebar.tsx**

Component that:
- Receives `poets`, `poems`, `readPoemIds`, `selectedPoetId`, `selectedPoemId`
- Groups poets by era using `ERAS` ordering
- Collapsible era sections (click chevron to expand/collapse)
- Under each poet, lists their poems as sub-items
- Search input filters poets/poems by Arabic or English name
- Dot indicator: gold for read poems, muted for unread
- Mobile: hamburger button toggle, overlay dismiss

**Step 3: Update App.tsx**

Wire sidebar with placeholder main content. Import App.css. Use `usePersistedState` for sidebar collapse state and read tracking.

**Step 4: Verify dev server**

```bash
pnpm --filter @arabtools/diwan dev
```

Verify sidebar renders with all 16 poets grouped by 7 eras.

**Step 5: Commit**

```bash
git commit -m "feat(diwan): add sidebar with poet navigation by era"
```

---

## Task 9: Home View

**Files:**
- Create: `apps/diwan/src/components/HomeView.tsx`
- Modify: `apps/diwan/src/App.tsx`

Landing page shown when no poet/poem is selected. Shows:
- Hero header: الديوان title with subtitle "Arabic Poetry Collection"
- Stats: poet count, poem count, era count
- Featured poet cards (3-4 curated poets as entry points)
- Brief intro text about the collection

Follow reading app's home view pattern with fadeInUp animation.

**Commit:** `"feat(diwan): add home view with stats and featured poets"`

---

## Task 10: Poet View

**Files:**
- Create: `apps/diwan/src/components/PoetView.tsx`
- Modify: `apps/diwan/src/App.tsx`

Shown when a poet is selected but no specific poem. Displays:
- Poet name (Arabic large, English subtitle)
- Dates and era badge
- Brief bio (Arabic + English)
- Grid/list of all poems by this poet, each showing:
  - Title (Arabic + English)
  - Genre badge (color-coded)
  - Level indicator (beginner/intermediate/advanced dot)
  - Read status indicator
- Clicking a poem navigates to `#poem/{id}`

**Commit:** `"feat(diwan): add poet view with bio and poem listing"`

---

## Task 11: Poem Reader (core feature)

**Files:**
- Create: `apps/diwan/src/components/PoemReader.tsx`
- Create: `apps/diwan/src/components/VocabularyPanel.tsx`
- Modify: `apps/diwan/src/App.tsx`
- Modify: `apps/diwan/src/App.css` — add poem reader styles

**Step 1: Add CSS for poem reader**

Key styles:
- `.poem-reader`: fadeIn animation, max-width 800px
- `.verse-container`: RTL, centered, Amiri font 1.6rem, line-height 2.2
- `.verse`: flex row with sadr + separator (|) + ajuz, generous padding
- `.verse .sadr, .verse .ajuz`: equal width, text-align appropriate for RTL
- `.verse-number`: small gold number badge
- `.translation-block`: accent background, English text, toggleable
- `.vocab-grid`: 2-column grid of word/meaning pairs
- `.poem-header`: title, genre badge, level indicator
- `.poem-context`: italic context block
- `.poem-nav`: prev/next buttons

**Step 2: Create VocabularyPanel.tsx**

Displays vocabulary highlights in a 2-column grid. Each item: Arabic word (Amiri, gold accent) + English meaning.

**Step 3: Create PoemReader.tsx**

Component that:
- Receives a `Poem` and its `Poet`
- Shows breadcrumb: Era > Poet > Poem title
- Poem title (Arabic large, English subtitle)
- Genre badge + level badge
- Context paragraph
- All verses in sadr/ajuz layout with verse numbers
- Translation section (toggleable via button)
- Vocabulary panel
- Prev/Next navigation within the poet's diwan
- Marks poem as read on mount (updates localStorage)

**Step 4: Wire into App.tsx**

Hash routing: parse `window.location.hash`:
- `""` or `"#"` → HomeView
- `"#poet/{id}"` → PoetView
- `"#poem/{id}"` → PoemReader

Listen to `hashchange` event. Use `usePersistedState` for read tracking set.

**Step 5: Verify full flow**

```bash
pnpm --filter @arabtools/diwan dev
```

Navigate: Home → click poet in sidebar → PoetView → click poem → PoemReader. Verify:
- Verses display RTL with hemistichs
- Translation toggles
- Vocabulary panel shows
- Prev/Next navigation works
- Read tracking persists

**Step 6: Commit**

```bash
git commit -m "feat(diwan): add poem reader with verse display, translation, and vocabulary"
```

---

## Task 12: Polish and Build Verification

**Files:**
- Modify: `apps/diwan/src/App.css` — responsive polish
- Modify: various components for edge cases

**Step 1:** Verify mobile responsive behavior at 900px breakpoint — sidebar hamburger, overlay, touch targets.

**Step 2:** Verify all 78 poems render without errors.

**Step 3:** Run full build:

```bash
npx turbo build --filter=@arabtools/diwan
```

Expected: Clean build, no TypeScript errors.

**Step 4:** Preview build:

```bash
pnpm --filter @arabtools/diwan preview
```

**Step 5: Commit any fixes**

```bash
git commit -m "fix(diwan): responsive polish and build verification"
```

---

## Task 13: Add to Hub

**Files:**
- Modify: hub app's tool registry to include Diwan entry
- Check: `apps/hub/src/data/` for tool listing pattern

Add Diwan to the hub with:
- Name: "Diwan"
- Arabic: "الديوان"
- Description: "Classical Arabic poetry collection — 16 poets from pre-Islamic to modern era"
- Icon: appropriate Lucide icon (e.g., `BookOpen` or `Scroll`)
- Port/URL: 5198 / arabtools-diwan

**Commit:** `"feat(hub): add Diwan poetry collection to tools listing"`

---

## Summary

| Task | Description | ~Poems |
|------|-------------|--------|
| 1 | Scaffold app | — |
| 2 | Types + poet data | — |
| 3 | Pre-Islamic poems | 15 |
| 4 | Islamic + Umayyad poems | 15 |
| 5 | Abbasid part 1 | 15 |
| 6 | Abbasid part 2 (incl. Imam Shafi'i) | 15 |
| 7 | Andalusian + Sufi + Modern | 18 |
| 8 | Sidebar component | — |
| 9 | Home view | — |
| 10 | Poet view | — |
| 11 | Poem reader (core) | — |
| 12 | Polish + build verify | — |
| 13 | Add to hub | — |

**Total: 13 tasks, 78 poems across 16 poets**
