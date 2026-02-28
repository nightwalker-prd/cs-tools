# Diwan — Arabic Poetry Collection Viewer

**Date:** 2026-02-24
**Status:** Approved
**App:** `@arabtools/diwan`
**Port:** TBD

---

## Overview

A digital anthology of classical Arabic poetry organized by poet (diwan-style). Users browse poets grouped by era, read poems in traditional two-hemistich format with English translations and vocabulary highlights.

## Architecture

### Layout: Sidebar + Content (established pattern)

Follows the `reading` / `nahw-navigator` sidebar pattern:
- 300px fixed sidebar with poet navigation
- Main content area with poem reader
- 900px responsive breakpoint (sidebar → hamburger overlay on mobile)

```
Sidebar (300px)                    │  Main Content (flex)
─────────────────────────────────  │  ───────────────────────────────
🏛️ الديوان                        │  [Poet header: name, dates, bio]
"Arabic Poetry Collection"        │
                                  │  [Poem title (Arabic + English)]
📊 16 poets · 78 poems            │
                                  │  بيت ١: صدر | عجز
🔍 Search poems/poets...          │  بيت ٢: صدر | عجز
                                  │
▾ Pre-Islamic (الجاهلية)          │  ─── Translation ───
  ● Imru' al-Qays (5)            │  English verse translation
  ● Tarafa ibn al-Abd (5)        │
  ○ Antara ibn Shaddad (5)       │  ─── Vocabulary ───
                                  │  word | meaning | word | meaning
▾ Early Islamic                   │
  ● Hassan ibn Thabit (5)        │  [← Prev Poem]  [Next Poem →]
  ...                             │
```

### Data Model

**Poet:**
```ts
interface Poet {
  id: string;              // e.g. "imru-al-qays"
  nameAr: string;          // امرؤ القيس
  nameEn: string;          // Imru' al-Qays
  era: Era;                // 'jahili' | 'islami' | 'umawi' | 'abbasi' | 'andalusi' | 'sufi' | 'modern'
  eraAr: string;           // الجاهلية
  dates: string;           // "497–545 CE"
  bioAr: string;           // Brief Arabic biography
  bioEn: string;           // Brief English biography
  genres: Genre[];         // Primary genres
}
```

**Poem:**
```ts
interface Poem {
  id: string;              // e.g. "imru-al-qays-01"
  poetId: string;
  titleAr: string;         // قِفَا نَبْكِ
  titleEn: string;         // "Stop, Let Us Weep"
  genre: Genre;            // 'ghazal' | 'madih' | 'hija' | etc.
  level: 'beginner' | 'intermediate' | 'advanced';
  verses: Verse[];
  translationEn: string;   // Full English translation
  vocabularyHighlights: VocabItem[];
  context: string;         // Background/context for the poem
}

interface Verse {
  sadr: string;            // First hemistich (صدر)
  ajuz: string;            // Second hemistich (عجز)
}

interface VocabItem {
  word: string;
  meaning: string;
}

type Era = 'jahili' | 'islami' | 'umawi' | 'abbasi' | 'andalusi' | 'sufi' | 'modern';
type Genre = 'ghazal' | 'madih' | 'hija' | 'ritha' | 'zuhd' | 'khamriyyat' | 'wasf' | 'fakhr' | 'hikma' | 'sufi' | 'hanin' | 'wataniyyat';
```

### Poets & Content (16 poets, ~78 poems)

| Era | Poet | # Poems | Genres |
|-----|------|---------|--------|
| Pre-Islamic | Imru' al-Qays (امرؤ القيس) | 5 | Ghazal, Wasf |
| Pre-Islamic | Tarafa ibn al-Abd (طرفة بن العبد) | 5 | Fakhr, Wasf |
| Pre-Islamic | Antara ibn Shaddad (عنترة بن شداد) | 5 | Fakhr, Ghazal |
| Early Islamic | Hassan ibn Thabit (حسان بن ثابت) | 5 | Madih, Hija |
| Umayyad | Jarir (جرير) | 5 | Hija, Madih |
| Umayyad | Majnun Layla (مجنون ليلى) | 5 | Ghazal |
| Abbasid | Abu Nuwas (أبو نواس) | 5 | Khamriyyat |
| Abbasid | Al-Mutanabbi (المتنبي) | 5 | Madih, Hikma |
| Abbasid | Abu Tammam (أبو تمام) | 5 | Madih |
| Abbasid | Abu al-Atahiya (أبو العتاهية) | 5 | Zuhd |
| Abbasid | Al-Ma'arri (المعري) | 5 | Hikma, Zuhd |
| Abbasid | Imam al-Shafi'i (الإمام الشافعي) | 5 | Zuhd, Hikma |
| Andalusian | Ibn Zaydun (ابن زيدون) | 5 | Ghazal, Hanin |
| Sufi | Ibn al-Farid (ابن الفارض) | 5 | Sufi |
| Sufi | Rabi'a al-Adawiyya (رابعة العدوية) | 3 | Sufi |
| Modern | Mahmoud Darwish (محمود درويش) | 5 | Wataniyyat |

## Features

### Core
- **Sidebar navigation** — poets grouped by era, collapsible sections, poem count badges
- **Search** — filter poets and poems by name (Arabic or English)
- **Poem viewer** — two-hemistich (sadr/ajuz) layout per verse, RTL Amiri font, generous line height
- **Translation panel** — toggleable English translation below the Arabic
- **Vocabulary highlights** — key words with meanings in a grid
- **Poet bio header** — name, dates, brief bio shown above poems
- **Read tracking** — dot indicators in sidebar for read poems, persisted via localStorage

### Navigation
- Prev/Next poem navigation within a poet's diwan
- Breadcrumb: Era > Poet > Poem
- Genre badges on poems (visual indicator of ghazal, madih, etc.)

## Tech Stack

- React 19 + Vite 6 + TypeScript 5.7
- `@arabtools/ui` (Card, Button, ScrollArea, Badge, Separator)
- `@arabtools/core` (usePersistedState for read tracking, useSpeechSynthesis for TTS)
- `@arabtools/styles` (Tailwind preset — navy/gold/parchment theme, Amiri font)
- CSS matching existing sidebar pattern (custom CSS, not Tailwind for layout)
- Data as TypeScript files in `src/data/` (bundled at build time)
- Hash-based routing: `#poet/{id}`, `#poem/{id}`

## localStorage Keys

- `arabtools-diwan-read`: Set of read poem IDs
- `arabtools-diwan-sidebar`: Sidebar collapsed state per era
- `arabtools-diwan-prefs`: Translation toggle, etc.

## File Structure

```
apps/diwan/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── types.ts
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── PoetView.tsx
│   │   ├── PoemReader.tsx
│   │   ├── VocabularyPanel.tsx
│   │   └── HomeView.tsx
│   └── data/
│       ├── poets.ts
│       └── poems/
│           ├── imru-al-qays.ts
│           ├── tarafa.ts
│           ├── antara.ts
│           ├── hassan.ts
│           ├── jarir.ts
│           ├── majnun.ts
│           ├── abu-nuwas.ts
│           ├── mutanabbi.ts
│           ├── abu-tammam.ts
│           ├── abu-al-atahiya.ts
│           ├── al-maarri.ts
│           ├── imam-shafii.ts
│           ├── ibn-zaydun.ts
│           ├── ibn-al-farid.ts
│           ├── rabia.ts
│           └── darwish.ts
└── public/
```
