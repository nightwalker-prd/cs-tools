# Kalaam Web — Design Document

**Date:** 2026-02-15
**Location:** `apps/kalaam/` in alqalam-tools monorepo
**Package:** `@arabtools/kalaam`
**Goal:** Public web app replicating Kalaam's core Quranic Arabic learning experience without the social/gamification fluff.

---

## 1. Architecture Overview

New app at `apps/kalaam/` in the alqalam-tools Turborepo monorepo.

```
apps/kalaam/
├── scripts/              # Build-time SQLite → JSON extraction
│   └── extract-db.ts     # Reads quran.db + en_quran.db → JSON chunks
├── public/
│   └── data/             # Generated JSON data (lazy-loaded at runtime)
│       ├── quran/        # Per-surah: arabic text + word-by-word translations
│       ├── words/        # Frequency-ranked word batches (500 words each)
│       ├── grammar/      # Transformation data per lemma
│       └── meta/         # Surah names, lemma index, particle translations
├── src/
│   ├── pages/            # Route-level components (5 main views)
│   ├── components/       # Feature-specific components
│   ├── hooks/            # Custom hooks (data loading, SRS integration)
│   ├── lib/              # Utilities, data access layer
│   └── types/            # TypeScript types mirroring DB schema
```

**Key decisions:**
- **Data pipeline:** Build-time script extracts SQLite → chunked JSON in `public/data/`. No WASM at runtime.
- **SRS engine:** Reuse `@arabtools/srs` (FSRS algorithm, `useSrsEngine()`, storage).
- **UI components:** Reuse `@arabtools/ui` (Card, Button, Tabs, Dialog, etc.) + custom Kalaam-specific components.
- **Styling:** Kalaam's teal/white color scheme via app-level Tailwind config extending the base preset.
- **Routing:** Hash-based client-side routing (consistent with other alqalam-tools apps).

**Data chunking strategy:**
- 114 surah files — lazy-loaded when user opens a surah
- 10 word batches of ~480 words each (frequency-ranked) — loaded progressively
- Grammar/transformation data loaded on-demand per lemma
- First-load: surah index + lemma index + first word batch ≈ ~1.1MB

---

## 2. Data Model & Extraction

### Source databases

| Database | Size | Location |
|----------|------|----------|
| `quran.db` | 121MB | Kalaam IPA bundle — morphology, arabic text, quiz data |
| `en_quran.db` | 109MB | Kalaam IPA bundle — English translations, transformations, explanations |

### Extracted JSON structure

#### `public/data/meta/`

**`surah-index.json`** — 114 surahs
```typescript
{ surahNum: number, arabic: string, english: string, transliteration: string, ayahCount: number }[]
```

**`lemma-index.json`** — 4,784 lemmas sorted by frequency
```typescript
{ id: number, lemma: string, count: number, isParticle: boolean, meaning: string, transliteration: string }[]
```

**`particles.json`** — 62 particle translations
```typescript
{ lemma: string, translation: string }[]
```

**`parent-forms.json`** — 90 grammar pattern explanations
```typescript
{ id: number, form: string, formD: string, meaningChange: string, friendlyName: string, explanation: string, example: string }[]
```

**`grammar-tags.json`** — 993 morphological tags
```typescript
{ tag: string, color: string, description: string, friendlyDesc: string }[]
```

**`grammar-translations.json`** — 15 pronoun suffix translations
```typescript
{ tag: string, translation: string }[]
```

#### `public/data/quran/{surahNum}.json` (114 files)

```typescript
{
  surahNum: number
  name: { arabic: string, english: string, transliteration: string }
  ayahs: [{
    ayahNum: number
    arabic: string
    translation: string
    words: [{
      wordLoc: string
      arabic: string
      parts: [{
        arabic: string
        partOfSpeech: string
        grammar: string
        grammarColor: string
        grammarDesc: string
        root: string
        lemma: string
        lemmaId: number
      }]
      translation: string
      transliteration: string
    }]
  }]
}
```

#### `public/data/words/{batch}.json` (10 files, ~480 words each)

```typescript
{
  lemmaId: number
  lemma: string
  meaning: string
  transliteration: string
  info: string
  count: number
  root: string
  partOfSpeech: string
  isParticle: boolean
  bestExample: { wordLoc: string, arabic: string, surahNum: number, ayahNum: number }
  contextTranslation: { textBefore: string, match: string, textAfter: string }
  quiz: { correctAnswer: string, wrongChoices: string[] }
}
```

#### `public/data/grammar/{lemmaId}.json` (~4,784 files, on-demand)

```typescript
{
  lemmaId: number
  lemma: string
  root: string
  partOfSpeech: string
  verbForm: string
  transformations: [{
    step: number
    arabic: string
    meaning: string
    notes: string
    colorCoding: object | null
    form: string
    formD: string
    changeIdentifier: string
    parentFormId: number
  }]
  derivedForms: [{
    arabic: string
    meaning: string
    grammarTag: string
    grammarDesc: string
    grammarColor: string
    count: number
    examples: [{
      surahNum: number
      ayahNum: number
      wordLoc: string
      ayahArabic: string
      ayahTranslation: string
    }]
  }]
}
```

### Size estimates

| Chunk | Size |
|-------|------|
| Meta files | ~500KB |
| Surah files (114) | ~15MB total |
| Word batches (10) | ~8MB total |
| Grammar files (4,784) | ~20MB total (avg ~4KB each, on-demand) |
| **First paint** | **~1.1MB** (surah-index + lemma-index + first word batch) |

---

## 3. Screens & UI Design

### 5 main views

**1. Study (home)**
- Daily lesson card: new cards + review cards counts
- "Start today's lesson" CTA
- Practice section with quiz option, "Delay grammar" toggle
- My Progress: current/record streak, week-day circles, points
- Quran understanding % with projection chart

**2. Read (Quran browser)**
- View type selector: Surah / Juz / Hizb / Quarter / Page
- Understanding progress bar
- Scrollable section list
- "Continue reading" sticky button
- Surah view: RTL arabic + translation, bookmarks, ayah numbers
- Word-by-word mode: tap word → popup with translation, grammar color, audio icon

**3. Flashcard session**
- Progress bar + points counter
- Stacked card visual (CSS transforms)
- Front: large arabic, transliteration, frequency, Quranic context
- Back: arabic + root, meaning (teal), audio, context, "More information"
- 2-button default: "Don't know" / "Know" (maps to FSRS Again/Good)
- Long-press for 4-button: Again/Hard/Good/Easy
- Quiz variant: 4-option multiple choice from cacheTestData

**4. Word Details**
- Details tab: meaning, ayah context, linguistic explanation, grammar flow diagram
- Usages tab: root frequency, derived forms with Quranic examples
- Grammar flow: vertical cards with arrows, color-coded (green roots, orange diacritics)

**5. Settings**
- Stats overview, surah prioritization, lesson settings, display settings, export/import

### Design language

```
Colors:
  --primary:        #1D729B (teal)
  --primary-light:  #DAF2F6 (pale blue)
  --primary-dark:   #247CA0 (hover)
  --accent:         #E37730 (orange, streaks)
  --bg:             #FFFFFF
  --bg-card:        #F5F7FA
  --text:           #1A1A2E
  --text-secondary: #6B7280
  --grammar-root:   #2D8C3C (green)
  --grammar-vowel:  #E8751A (orange)
  --grammar-meaning:#1D729B (teal)

Typography:
  UI: Poppins (400, 500, 600, 700)
  Arabic display: Noto Sans Arabic / Kitab
  Quranic text: Amiri (from @arabtools/styles)

Cards: rounded-xl (12px), shadow-sm
Layout: single-column mobile-first, max-width 430px on desktop
```

---

## 4. SRS Integration & Learning Flow

### Deck seeding

4,784 SrsItems created from lemma index on first load:
```typescript
{
  contentId: `lemma-${lemmaId}`,
  contentType: 'quran-vocab',
  pillar: isParticle ? 'particle' : 'vocabulary',
  difficulty_score: deriveDifficulty(frequency, partOfSpeech)
}
```

### Daily lesson session

```
engine.startSession({
  maxItems: 20,        // configurable
  maxNewItems: 5,      // configurable
  pillars: ['vocabulary', 'particle']
})
→ FSRS picks: overdue → due today → new items
→ Interleaver mixes (no 3+ consecutive same difficulty)
```

### Grading

| UI | FSRS | Trigger |
|----|------|---------|
| "Don't know" | Again (0) | Swipe left / tap |
| "Know" | Good (2) | Swipe right / tap |
| "Hard" | Hard (1) | Long-press menu |
| "Easy" | Easy (3) | Long-press menu |

### Surah prioritization

User selects surahs → lemmaIds from those surahs get boosted priority in session builder → new items from prioritized surahs introduced first.

### Quran understanding %

Computed from SRS deck: for each ayah, count learned lemmas (review phase, stability > threshold) weighted by frequency. Linear projection for "100% in ~Y months."

### Storage

```
arabtools-srs-kalaam-state     → SrsItem[]
arabtools-srs-kalaam-history   → ReviewLog[]
arabtools-srs-kalaam-session   → crash recovery
kalaam-settings                → user preferences
kalaam-bookmarks               → reading bookmarks
```

---

## 5. Component Architecture

### Routes

```
/                    → Study (home)
/read                → Quran browser
/read/:surahNum      → Surah reader
/lesson              → Active flashcard session
/word/:lemmaId       → Word details
/settings            → Settings
```

### Component tree

```
App
├── BottomNav
├── StudyPage
│   ├── DailyLessonCard
│   ├── PracticeCard
│   ├── ProgressSection
│   └── UnderstandingChart
├── ReadPage
│   ├── ViewTypeSelector
│   ├── UnderstandingBar
│   ├── SectionList
│   └── ContinueReadingButton
├── SurahReaderPage
│   ├── SurahHeader
│   ├── AyahBlock → TappableWord
│   ├── WordPopup
│   └── ReaderModeBar
├── LessonPage
│   ├── LessonProgressBar
│   ├── FlashcardStack (CardFront / CardBack)
│   ├── QuizCard
│   └── GradeButtons
├── WordDetailPage
│   ├── WordHeader
│   ├── DetailsTab (AyahSection, ExplanationSection, GrammarFlowDiagram)
│   └── UsagesTab (RootSummary, DerivedFormGroup)
└── SettingsPage
    ├── StatsOverview
    ├── SurahPrioritization
    ├── LessonSettings
    └── DisplaySettings
```

### Custom hooks

```typescript
useQuranData(surahNum)    // Lazy-loads surah JSON, caches in memory
useWordBatch(batchNum)    // Lazy-loads word batch for SRS seeding
useGrammarData(lemmaId)   // Lazy-loads grammar/{lemmaId}.json on demand
useLemmaIndex()           // Loads once, provides word lookup + search
useUnderstanding()        // Computes Quran % from SRS deck state
usePrioritization()       // Manages prioritized surahs + session filtering
```

### Build pipeline

```
1. scripts/extract-db.ts
   - Reads quran.db + en_quran.db via better-sqlite3
   - Writes chunked JSON to apps/kalaam/public/data/
   - Validates completeness

2. tsc -b && vite build
   - TypeScript → JS bundle (~150-200KB gzipped)
   - public/data/ copied as static assets

3. pnpm --filter @arabtools/kalaam dev
```

### Fonts

- Poppins (400, 500, 600) via Google Fonts
- Noto Sans Arabic via Google Fonts
- Amiri from @arabtools/styles as fallback

---

## 6. What's Excluded (v1)

- Social features (friends, messaging, leaderboards)
- Gamification beyond streaks (points display only, no levels/badges/achievements)
- AI mnemonic images
- Audio recitation (can add later via public Quran audio API)
- Voice input
- Lottie animations
- Multi-language UI (English only)
- Authentication / cloud sync (localStorage only)
- Premium/payment features
