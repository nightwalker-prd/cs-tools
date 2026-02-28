# insha-guide Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an interactive Arabic composition study + practice tool with 40 lessons across 6 units, based on Al-Ibtida' fi al-Insha' textbook.

**Architecture:** Lesson-centric reader with Study/Practice tabs per lesson. Sidebar tree navigation with 6 units. Hash-based routing. Progress tracking via `usePersistedState`. Follows nahw-navigator's layout and fstu-exercises' practice patterns.

**Tech Stack:** React 19, Vite 6, Tailwind CSS 4, TypeScript 5.7, `@arabtools/ui`, `@arabtools/core`

**Design doc:** `docs/plans/2026-02-13-insha-guide-design.md`

**Source data:** `/Users/miftah/Downloads/insha-book/notes-part-{1-6}.md` (6 markdown files covering 40 lessons)

---

## Task 1: Scaffold the App

**Files:**
- Create: `apps/insha-guide/package.json`
- Create: `apps/insha-guide/vite.config.ts`
- Create: `apps/insha-guide/tsconfig.json`
- Create: `apps/insha-guide/postcss.config.js`
- Create: `apps/insha-guide/index.html`
- Create: `apps/insha-guide/src/main.tsx`
- Create: `apps/insha-guide/src/App.tsx`
- Create: `apps/insha-guide/src/index.css`
- Modify: `turbo.json` (bump concurrency if needed)

**Step 1: Create app directory and config files**

`package.json` — copy from `apps/nahw-navigator/package.json`, change:
- `name` → `"@arabtools/insha-guide"`
- Remove `react-markdown` and `remark-gfm` from dependencies (not needed)

`vite.config.ts` — copy from `apps/nahw-navigator/vite.config.ts`, change:
- Port → `5186`
- Manifest name → `'Insha Guide - Arab Tools'`
- Short name → `'Insha Guide'`
- Description → `'Interactive Arabic composition guide with study lessons and practice exercises.'`
- Remove markdown manual chunks

`tsconfig.json` — exact copy from `apps/nahw-navigator/tsconfig.json`

`postcss.config.js` — exact copy:
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

`index.html` — copy from `apps/nahw-navigator/index.html`, change:
- Title → `Insha Guide - Arab Tools`
- Description → `Interactive Arabic composition guide with study lessons and practice exercises.`

**Step 2: Create src entry files**

`src/main.tsx` — exact pattern:
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

`src/App.tsx`:
```tsx
import { InshaGuide } from './components/InshaGuide';

export default function App() {
  return <InshaGuide />;
}
```

`src/index.css` — copy from `apps/nahw-navigator/src/index.css` entirely (same theme, fonts, layout patterns). Will customize CSS classes in later tasks.

**Step 3: Check turbo.json concurrency**

Current: 38 for ~34 workspaces. After adding insha-guide → ~35 workspaces. 38 is still sufficient. No change needed.

**Step 4: Install dependencies and verify build**

Run: `cd /Users/miftah/projects/alqalam-tools && npm install`
Run: `npx turbo build --filter=@arabtools/insha-guide`

Expected: Build succeeds (will have empty component error — that's fine, we fix in next task).

**Step 5: Commit**

```bash
git add apps/insha-guide/
git commit -m "feat: scaffold insha-guide app"
```

---

## Task 2: Define Types and Data Structure

**Files:**
- Create: `apps/insha-guide/src/data/types.ts`
- Create: `apps/insha-guide/src/data/units.ts`

**Step 1: Create types file**

`src/data/types.ts`:
```typescript
// ─── Content Block Types ───

export interface GrammarTableData {
  title: string;
  titleAr?: string;
  headers: string[];
  rows: string[][];
  note?: string;
}

export interface VocabularyItem {
  arabic: string;
  transliteration?: string;
  english: string;
}

export interface VocabularyGridData {
  title: string;
  titleAr?: string;
  items: VocabularyItem[];
}

export interface ModelEssayData {
  title: string;
  titleAr?: string;
  paragraphs: { arabic: string; translation: string }[];
  vocabulary?: VocabularyItem[];
  questions?: string[];
}

export interface RuleCardData {
  title: string;
  titleAr?: string;
  rule: string;
  examples: { arabic: string; explanation: string }[];
  note?: string;
}

export interface SynonymGroupData {
  title: string;
  titleAr?: string;
  groups: {
    concept: string;
    conceptAr: string;
    words: { arabic: string; english: string }[];
    example?: string;
  }[];
}

export interface LinkingToolData {
  title: string;
  titleAr?: string;
  categories: {
    name: string;
    nameAr: string;
    tools: { arabic: string; english: string; example?: string; exampleTranslation?: string }[];
  }[];
}

export interface TextBlockData {
  content: string;
  arabic?: boolean;
}

export type LessonContentBlock =
  | { type: 'grammar-table'; data: GrammarTableData }
  | { type: 'vocabulary-grid'; data: VocabularyGridData }
  | { type: 'model-essay'; data: ModelEssayData }
  | { type: 'rule-card'; data: RuleCardData }
  | { type: 'synonym-group'; data: SynonymGroupData }
  | { type: 'linking-tools'; data: LinkingToolData }
  | { type: 'text'; data: TextBlockData };

// ─── Exercise Types ───

export interface FillBlankQuestion {
  id: string;
  sentence: string;      // Use ___ for blank
  answer: string;
  options?: string[];     // If multiple choice
  hint?: string;
}

export interface WordOrderQuestion {
  id: string;
  words: string[];        // Scrambled
  answer: string[];       // Correct order
  translation?: string;
}

export interface MatchPairQuestion {
  id: string;
  pairs: { left: string; right: string }[];
}

export interface MultipleChoiceQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface SentenceBuildQuestion {
  id: string;
  prompt: string;
  components: { type: string; options: string[] }[];
  answer: string;
}

export type ExerciseQuestion =
  | { type: 'fill-blank'; data: FillBlankQuestion }
  | { type: 'word-order'; data: WordOrderQuestion }
  | { type: 'match-pairs'; data: MatchPairQuestion }
  | { type: 'multiple-choice'; data: MultipleChoiceQuestion }
  | { type: 'sentence-build'; data: SentenceBuildQuestion };

export interface Exercise {
  id: string;
  title: string;
  titleAr?: string;
  instruction: string;
  instructionAr?: string;
  questions: ExerciseQuestion[];
}

// ─── Lesson & Unit ───

export interface Lesson {
  id: string;
  number: number;
  titleAr: string;
  titleEn: string;
  unitId: string;
  content: LessonContentBlock[];
  exercises: Exercise[];
}

export interface Unit {
  id: string;
  number: number;
  titleAr: string;
  titleEn: string;
  description: string;
  lessonIds: string[];
}

// ─── Progress ───

export interface ProgressData {
  lessonsVisited: Record<string, number>;  // lessonId → timestamp
  exerciseScores: Record<string, { score: number; bestScore: number; completedAt: number }>;
  questionsMastered: Record<string, boolean>;
  lastViewed: { lessonId: string; timestamp: number } | null;
  streak: { count: number; lastDate: string | null };
}
```

**Step 2: Create units definition**

`src/data/units.ts`:
```typescript
import type { Unit } from './types';

export const UNITS: Unit[] = [
  {
    id: 'foundations',
    number: 1,
    titleAr: 'أسس الكلام',
    titleEn: 'Foundations of Speech',
    description: 'Parts of speech, noun/verb/particle signs, triliteral verb patterns',
    lessonIds: ['lesson-1', 'lesson-2', 'lesson-3'],
  },
  {
    id: 'sentences',
    number: 2,
    titleAr: 'الجملة والاستفهام',
    titleEn: 'Sentences & Questions',
    description: 'Interrogative tools, 5 sentence types, construction drills',
    lessonIds: ['lesson-4', 'lesson-5', 'lesson-6', 'lesson-7'],
  },
  {
    id: 'paragraphs',
    number: 3,
    titleAr: 'الفقرة والربط',
    titleEn: 'Paragraphs & Linking',
    description: 'Free writing, sentence transformation, paragraphs, linking tools',
    lessonIds: ['lesson-8', 'lesson-9', 'lesson-10', 'lesson-11', 'lesson-12', 'lesson-13'],
  },
  {
    id: 'spelling',
    number: 4,
    titleAr: 'الإملاء',
    titleEn: 'Spelling Rules',
    description: 'Punctuation, hamza rules, taa marbouta/mabsouta, soft alif',
    lessonIds: [
      'lesson-14', 'lesson-15', 'lesson-16', 'lesson-17', 'lesson-18',
      'lesson-19', 'lesson-20', 'lesson-21', 'lesson-22', 'lesson-23',
      'lesson-24', 'lesson-25', 'lesson-26', 'lesson-27',
    ],
  },
  {
    id: 'writing',
    number: 5,
    titleAr: 'الوصف والكتابة',
    titleEn: 'Description & Writing',
    description: 'Model essays, descriptive vocabulary, linguistic benefits',
    lessonIds: [
      'lesson-28', 'lesson-29', 'lesson-30', 'lesson-31', 'lesson-32',
      'lesson-33', 'lesson-34', 'lesson-35', 'lesson-36', 'lesson-37', 'lesson-38',
    ],
  },
  {
    id: 'correspondence',
    number: 6,
    titleAr: 'المراسلة',
    titleEn: 'Correspondence',
    description: 'Letters, telegram types, congratulatory telegram models',
    lessonIds: ['lesson-39', 'lesson-40'],
  },
];
```

**Step 3: Verify types compile**

Run: `cd /Users/miftah/projects/alqalam-tools && npx tsc --noEmit -p apps/insha-guide/tsconfig.json`
Expected: No errors

**Step 4: Commit**

```bash
git add apps/insha-guide/src/data/
git commit -m "feat(insha-guide): add types and unit definitions"
```

---

## Task 3: Create Hook Layer (Router + Progress)

**Files:**
- Create: `apps/insha-guide/src/hooks/useHashRouter.ts`
- Create: `apps/insha-guide/src/hooks/useProgress.ts`
- Create: `apps/insha-guide/src/hooks/useSearch.ts`

**Step 1: Create useHashRouter**

Copy exactly from `apps/nahw-navigator/src/hooks/useHashRouter.ts` — same hook, no changes needed.

**Step 2: Create useProgress**

Adapt from `apps/fstu-exercises/src/hooks/useProgress.ts` but use `arabtools-insha-progress` key and the `ProgressData` type from our types.ts.

**Step 3: Create useSearch**

Simple search hook that filters lessons by title/content keywords. Search over lesson titles (Arabic + English) and content text.

```typescript
import { useMemo } from 'react';
import type { Lesson } from '../data/types';

export interface SearchResult {
  lessonId: string;
  titleEn: string;
  titleAr: string;
  unitId: string;
  matchType: 'title' | 'content';
}

export function useSearch(lessons: Lesson[], query: string): SearchResult[] {
  return useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    for (const lesson of lessons) {
      const titleMatch =
        lesson.titleEn.toLowerCase().includes(q) ||
        lesson.titleAr.includes(q);

      if (titleMatch) {
        results.push({
          lessonId: lesson.id,
          titleEn: lesson.titleEn,
          titleAr: lesson.titleAr,
          unitId: lesson.unitId,
          matchType: 'title',
        });
        continue;
      }

      // Search content blocks for text matches
      const contentMatch = lesson.content.some(block => {
        if (block.type === 'text') return block.data.content.toLowerCase().includes(q);
        if (block.type === 'grammar-table') return block.data.title.toLowerCase().includes(q);
        if (block.type === 'vocabulary-grid') {
          return block.data.items.some(
            item => item.arabic.includes(q) || item.english.toLowerCase().includes(q)
          );
        }
        return false;
      });

      if (contentMatch) {
        results.push({
          lessonId: lesson.id,
          titleEn: lesson.titleEn,
          titleAr: lesson.titleAr,
          unitId: lesson.unitId,
          matchType: 'content',
        });
      }
    }

    return results;
  }, [lessons, query]);
}
```

**Step 4: Verify types compile**

Run: `npx tsc --noEmit -p apps/insha-guide/tsconfig.json`

**Step 5: Commit**

```bash
git add apps/insha-guide/src/hooks/
git commit -m "feat(insha-guide): add router, progress, and search hooks"
```

---

## Task 4: Build Core Layout Components

**Files:**
- Create: `apps/insha-guide/src/components/InshaGuide.tsx`
- Create: `apps/insha-guide/src/components/Sidebar.tsx`
- Create: `apps/insha-guide/src/components/HomePage.tsx`
- Create: `apps/insha-guide/src/components/Breadcrumb.tsx`

**Step 1: Create InshaGuide orchestrator**

Follow `apps/nahw-navigator/src/components/NahwNavigator.tsx` pattern:
- Uses `useHashRouter` for `slug`, `navigate`, `goHome`
- Uses `usePersistedState` for sidebar open state, visited lessons
- Sidebar + main content area with conditional rendering (home vs lesson view)
- Responsive layout with hamburger button on mobile

**Step 2: Create Sidebar**

Follow `apps/nahw-navigator/src/components/Sidebar.tsx` pattern:
- Brand section with Arabic name (إنشاء) and stats
- Search input
- Collapsible unit tree (6 units → lesson items)
- Progress dots per lesson (visited/not, has exercises completed)
- Footer with book attribution

**Step 3: Create HomePage**

Follow `apps/nahw-navigator/src/components/HomePage.tsx` + `apps/fstu-exercises/src/components/HomePage.tsx`:
- Hero section: "Insha Guide" title + "دليل الإنشاء" subtitle + description
- 6 unit cards with lesson count, progress bar, and first-lesson link
- Continue-learning card (last viewed lesson)
- Stats bar (lessons visited, exercises completed)

**Step 4: Create Breadcrumb**

Simple breadcrumb: Home → Unit Name → Lesson Title. Clickable home link calls `goHome()`.

**Step 5: Verify app renders**

Run: `npx turbo dev --filter=@arabtools/insha-guide`
Expected: App loads at localhost:5186, shows homepage with 6 unit cards (no lesson data yet, but structure renders)

**Step 6: Commit**

```bash
git add apps/insha-guide/src/components/
git commit -m "feat(insha-guide): add core layout components"
```

---

## Task 5: Build Study Content Renderers

**Files:**
- Create: `apps/insha-guide/src/components/study/GrammarTable.tsx`
- Create: `apps/insha-guide/src/components/study/VocabularyGrid.tsx`
- Create: `apps/insha-guide/src/components/study/ModelEssay.tsx`
- Create: `apps/insha-guide/src/components/study/RuleCard.tsx`
- Create: `apps/insha-guide/src/components/study/SynonymGroup.tsx`
- Create: `apps/insha-guide/src/components/study/LinkingToolCard.tsx`
- Create: `apps/insha-guide/src/components/study/TextBlock.tsx`
- Create: `apps/insha-guide/src/components/study/index.ts`
- Create: `apps/insha-guide/src/components/StudyContent.tsx`

**Step 1: Create GrammarTable**

Renders a titled table with headers and rows. Arabic text gets `dir="rtl"` and `font-arabic` class. Follow `apps/nahw-navigator` GrammarTable pattern.

**Step 2: Create VocabularyGrid**

Grid of vocabulary cards (arabic + transliteration + english). 2-3 columns responsive. Each card has Arabic large, English below.

**Step 3: Create ModelEssay**

Renders essay paragraphs with Arabic text (RTL, Amiri font) and English translation side by side or stacked. Vocabulary sidebar/footer. Follow the model essay pattern from the notes.

**Step 4: Create RuleCard**

Card with rule title, rule text, and examples list. Visual indicator for rule importance. Used for spelling rules (hamza, taa, soft alif).

**Step 5: Create SynonymGroup**

Displays grouped synonyms with concept header. Each group shows Arabic words with English meanings. Used for the 3 linguistic benefits sections.

**Step 6: Create LinkingToolCard**

Displays the 7 linking tool categories with Arabic connectors, their meanings, and example sentences. Category headers with collapsible content.

**Step 7: Create TextBlock**

Simple text renderer for introductory/explanatory text. Detects Arabic content and applies RTL/font.

**Step 8: Create StudyContent orchestrator**

Takes a `LessonContentBlock[]` and renders each block with the appropriate component via switch on `type`.

**Step 9: Commit**

```bash
git add apps/insha-guide/src/components/study/ apps/insha-guide/src/components/StudyContent.tsx
git commit -m "feat(insha-guide): add study content renderer components"
```

---

## Task 6: Build Exercise/Practice Components

**Files:**
- Create: `apps/insha-guide/src/components/practice/FillBlank.tsx`
- Create: `apps/insha-guide/src/components/practice/WordOrder.tsx`
- Create: `apps/insha-guide/src/components/practice/MatchPairs.tsx`
- Create: `apps/insha-guide/src/components/practice/MultipleChoice.tsx`
- Create: `apps/insha-guide/src/components/practice/SentenceBuild.tsx`
- Create: `apps/insha-guide/src/components/practice/index.ts`
- Create: `apps/insha-guide/src/components/PracticeContent.tsx`

**Step 1: Create FillBlank**

Shows sentence with blank (`___`). Student either types answer or selects from options. Reveal button shows correct answer. Tracks correct/incorrect.

**Step 2: Create WordOrder**

Shows scrambled words as draggable/tappable chips. Student arranges them in correct order. Check button compares to answer array. Green/red feedback.

**Step 3: Create MatchPairs**

Two columns of items. Student taps left then right to match pairs. Matched pairs highlight. Score shown at end.

**Step 4: Create MultipleChoice**

Question with 2-4 options. Student selects one. Immediate feedback with explanation. Follow fstu-exercises QuestionCard pattern.

**Step 5: Create SentenceBuild**

Prompt with component slots. Each slot has dropdown/chips to select the right word. Builds a complete sentence.

**Step 6: Create PracticeContent orchestrator**

Takes `Exercise[]` and renders exercises sequentially. Has Practice mode (reveal/hide, no grading) and Quiz mode (graded, one at a time). Progress bar across questions. Results summary at end.

**Step 7: Commit**

```bash
git add apps/insha-guide/src/components/practice/ apps/insha-guide/src/components/PracticeContent.tsx
git commit -m "feat(insha-guide): add practice exercise components"
```

---

## Task 7: Build LessonView with Study/Practice Tabs

**Files:**
- Create: `apps/insha-guide/src/components/LessonView.tsx`
- Modify: `apps/insha-guide/src/components/InshaGuide.tsx` (wire up lesson routing)

**Step 1: Create LessonView**

Layout:
- Breadcrumb (Unit → Lesson)
- Lesson header (number, Arabic title, English title)
- Tab bar with two tabs: "Study" (الدرس) and "Practice" (تدريبات)
- Tab content: `StudyContent` for study tab, `PracticeContent` for practice tab
- Active tab persisted via `usePersistedState`
- Practice tab shows exercise count badge
- If no exercises for this lesson, practice tab is disabled with "(coming soon)" label

**Step 2: Wire up routing in InshaGuide**

When `slug` matches `lesson-N`, look up the lesson in data, find its unit, and render `LessonView`. Pass lesson data, unit data, navigate/goHome functions. Mark lesson as visited on render.

**Step 3: Verify with dev server**

Run: `npx turbo dev --filter=@arabtools/insha-guide`
Navigate to `#lesson-1` — should render lesson view with tabs (no data yet, so empty content)

**Step 4: Commit**

```bash
git add apps/insha-guide/src/components/LessonView.tsx apps/insha-guide/src/components/InshaGuide.tsx
git commit -m "feat(insha-guide): add LessonView with study/practice tabs"
```

---

## Task 8: Create Lesson Data — Unit 1 (Foundations of Speech)

**Files:**
- Create: `apps/insha-guide/src/data/lessons/lesson-01.ts`
- Create: `apps/insha-guide/src/data/lessons/lesson-02.ts`
- Create: `apps/insha-guide/src/data/lessons/lesson-03.ts`

**Source:** `/Users/miftah/Downloads/insha-book/notes-part-1.md`

**Step 1: Create lesson-01 (The Word / الكلمة)**

Encode from notes-part-1 "Lesson 1: The Word":
- Content blocks: text intro, grammar-table (parts of speech), grammar-table (noun types), grammar-table (noun signs), grammar-table (verb tenses), grammar-table (6 triliteral patterns with all examples), grammar-table (verb signs)
- Exercises: multiple-choice (identify noun/verb/particle), word-order (arrange letters into words)

**Step 2: Create lesson-02 (The Particle / الحرف)**

Encode from notes-part-1 "Lesson 2":
- Content: grammar-table (prepositions overview), detailed grammar-tables for each preposition's meanings (إلى, الباء, على, عن, في, اللام, من, الكاف) with Quranic examples, grammar-table (conjunctions وَ فَ ثمّ), grammar-table (particle signs)
- Exercises: fill-blank (insert correct preposition), multiple-choice (preposition meanings)

**Step 3: Create lesson-03 (Exercises / تدريبات)**

Encode from notes-part-1 "Lesson 3":
- Content: text (exercise instructions), model-essay (story of Marwan for reading comprehension)
- Exercises: match-pairs (antonyms), fill-blank (preposition passage), multiple-choice (extract nouns/verbs/particles from passage)

**Step 4: Create lessons index**

`apps/insha-guide/src/data/lessons/index.ts` — exports all lessons, provides `getAllLessons()`, `getLessonById()`, `getLessonsByUnit()` helpers.

**Step 5: Verify with dev server**

Navigate to `#lesson-1` — study tab should render grammar tables, practice tab should have exercises.

**Step 6: Commit**

```bash
git add apps/insha-guide/src/data/lessons/
git commit -m "feat(insha-guide): add Unit 1 lesson data (foundations of speech)"
```

---

## Task 9: Create Lesson Data — Unit 2 (Sentences & Questions)

**Files:**
- Create: `apps/insha-guide/src/data/lessons/lesson-04.ts`
- Create: `apps/insha-guide/src/data/lessons/lesson-05.ts`
- Create: `apps/insha-guide/src/data/lessons/lesson-06.ts`
- Create: `apps/insha-guide/src/data/lessons/lesson-07.ts`

**Source:** `/Users/miftah/Downloads/insha-book/notes-part-2.md`

**Step 1: Create lesson-04 (Interrogative Tools / أدوات الاستفهام)**
- Content: grammar-table (11 interrogative tools with usage), grammar-table (examples)
- Exercises: fill-blank (choose correct interrogative), multiple-choice

**Step 2: Create lesson-05 (Interrogative Exercises / تدريبات)**
- Exercises: fill-blank (insert interrogative), sentence-build (formulate questions for answers)

**Step 3: Create lesson-06 (The Sentence / الجملة)**
- Content: grammar-table (5 sentence types with examples: idaafa, descriptive, verb+subject, verb+subject+object, passive)
- Exercises: multiple-choice (identify sentence type), sentence-build

**Step 4: Create lesson-07 (Sentence Construction / تدريبات)**
- Content: vocabulary-grid (agricultural terms, common verbs, numbers, colors, directions, time/place adverbs)
- Exercises: word-order (rearrange sentences), fill-blank (school canteen passage, seasonal sentences), multiple-choice (select justification)

**Step 5: Update lessons index, verify, commit**

```bash
git add apps/insha-guide/src/data/lessons/lesson-0{4,5,6,7}.ts apps/insha-guide/src/data/lessons/index.ts
git commit -m "feat(insha-guide): add Unit 2 lesson data (sentences & questions)"
```

---

## Task 10: Create Lesson Data — Unit 3 (Paragraphs & Linking)

**Files:**
- Create: `apps/insha-guide/src/data/lessons/lesson-08.ts` through `lesson-13.ts`

**Source:** `/Users/miftah/Downloads/insha-book/notes-part-3.md`

**Step 1: Create lessons 8-13**

- lesson-08: Free Writing (الكتابة الحرّة) — guided library visit writing, grammar drills (kaana, inna, relative pronouns, etc.)
- lesson-09: Sentence Construction (تركيب الجمل) — expressing one idea in different structures
- lesson-10: The Paragraph (الفقرة) — definition, ordering scrambled sentences
- lesson-11: Hajj Vocabulary — vocabulary-grid of 15 Hajj terms
- lesson-12: Linking Tools (أدوات الربط) — THE major lesson with 7 categories of connectors
- lesson-13: Linking Between Sentences — practical paragraph composition

**Step 2: Update index, verify, commit**

```bash
git add apps/insha-guide/src/data/lessons/lesson-{08,09,10,11,12,13}.ts apps/insha-guide/src/data/lessons/index.ts
git commit -m "feat(insha-guide): add Unit 3 lesson data (paragraphs & linking)"
```

---

## Task 11: Create Lesson Data — Unit 4 (Spelling Rules)

**Files:**
- Create: `apps/insha-guide/src/data/lessons/lesson-14.ts` through `lesson-27.ts`

**Source:** `/Users/miftah/Downloads/insha-book/notes-part-4.md`

**Step 1: Create lessons 14-27**

- lesson-14 to lesson-15: Linking exercises continuation
- lesson-16: Punctuation marks (16 marks reference) — grammar-tables
- lesson-17: Punctuation practice — story of the gold jar
- lesson-18: Spelling introduction & goals
- lesson-19: Hamza wasl vs qat' — rule-cards with examples
- lesson-20: Hamza in middle — rule-card (vowel strength hierarchy)
- lesson-21: Hamza at end — rule-card
- lesson-22: Hamza exercises
- lesson-23: Taa marbouta vs mabsouta — rule-cards with tables
- lesson-24: Taa exercises
- lesson-25: Soft alif — rule-card (origin determination methods)
- lesson-26: Soft alif exercises
- lesson-27: Composition methodology (3-phase: read, discuss, write)

**Step 2: Update index, verify, commit**

```bash
git add apps/insha-guide/src/data/lessons/lesson-{14,15,16,17,18,19,20,21,22,23,24,25,26,27}.ts
git commit -m "feat(insha-guide): add Unit 4 lesson data (spelling rules)"
```

---

## Task 12: Create Lesson Data — Units 5 & 6 (Writing & Correspondence)

**Files:**
- Create: `apps/insha-guide/src/data/lessons/lesson-28.ts` through `lesson-40.ts`

**Source:** `/Users/miftah/Downloads/insha-book/notes-part-5.md` and `notes-part-6.md`

**Step 1: Create lessons 28-38 (Unit 5: Description & Writing)**

- lesson-28: Description intro (الوصف) + model essay "My School"
- lesson-29: Linguistic benefits 1 (12 synonym groups)
- lesson-30: Model essay "My House"
- lesson-31: Model essay "A Day in Nature"
- lesson-32: Describing a place exercise
- lesson-33: Linguistic benefits 2 (14 synonym groups)
- lesson-34: Description of the Prophet — model essay
- lesson-35: Describing a Mother — model essay + poetry
- lesson-36: Describing a Scholar — model essay
- lesson-37: Describing a person exercise
- lesson-38: Linguistic benefits 3 (13 synonym groups)

**Step 2: Create lessons 39-40 (Unit 6: Correspondence)**

- lesson-39: Correspondence (المراسلة) — types, telegram characteristics
- lesson-40: Congratulatory telegrams — 5 models with analysis

**Step 3: Update index, verify, commit**

```bash
git add apps/insha-guide/src/data/lessons/
git commit -m "feat(insha-guide): add Units 5-6 lesson data (writing & correspondence)"
```

---

## Task 13: Polish CSS and Responsive Design

**Files:**
- Modify: `apps/insha-guide/src/index.css`

**Step 1: Customize CSS**

Using the nahw-navigator CSS as base, add/customize:
- Study tab content styling (grammar tables, vocabulary grids, model essays, rule cards, synonym groups, linking tools)
- Practice tab styling (exercise cards, fill-blank inputs, word-order chips, match-pair columns, results display)
- Tab bar styling (Study/Practice tabs with active indicator)
- Progress bar components
- Responsive breakpoints (mobile sidebar overlay, card grid collapse)

**Step 2: Verify on mobile viewport**

Open dev tools, check 375px and 768px breakpoints. Sidebar should overlay on mobile, cards should stack.

**Step 3: Commit**

```bash
git add apps/insha-guide/src/index.css
git commit -m "style(insha-guide): polish CSS and responsive layout"
```

---

## Task 14: Final Integration and Build Verification

**Files:**
- All existing files verified

**Step 1: Run full build**

Run: `npx turbo build --filter=@arabtools/insha-guide`
Expected: Build succeeds with no TypeScript or Vite errors.

**Step 2: Check all lessons render**

Navigate through each lesson (#lesson-1 through #lesson-40):
- Study tab shows content
- Practice tab shows exercises (where available)
- Sidebar highlights active lesson
- Progress dots update when visiting

**Step 3: Check homepage**

- 6 unit cards display with correct lesson counts
- Progress bars reflect visited lessons
- Continue-learning card shows last viewed

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat(insha-guide): complete Arabic composition study & practice tool"
```

---

## Task Summary

| Task | Description | Est. Complexity |
|------|-------------|----------------|
| 1 | Scaffold app | Low |
| 2 | Types and data structure | Low |
| 3 | Hooks (router, progress, search) | Low |
| 4 | Core layout (InshaGuide, Sidebar, HomePage, Breadcrumb) | Medium |
| 5 | Study content renderers (7 components) | Medium |
| 6 | Practice exercise components (6 components) | Medium |
| 7 | LessonView with tabs | Low |
| 8 | Unit 1 data (3 lessons) | Medium |
| 9 | Unit 2 data (4 lessons) | Medium |
| 10 | Unit 3 data (6 lessons) | Medium |
| 11 | Unit 4 data (14 lessons) | High |
| 12 | Units 5-6 data (13 lessons) | High |
| 13 | CSS polish and responsive | Medium |
| 14 | Integration and build verification | Low |
