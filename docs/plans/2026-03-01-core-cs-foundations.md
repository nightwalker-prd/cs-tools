# Core CS Foundations — 8 Explorer Apps Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add 8 new explorer apps (Computer Architecture, Automata, Programming Languages, Computer Graphics, Concurrency, Information Theory, Numerical Methods, API Design) bringing the suite from 21 to 29 tools.

**Architecture:** Each app follows the identical 14-file explorer scaffold used by all existing apps (e.g., `apps/software-engineering/`). Config files are templated with per-app values (name, port, icon, color). Components are copied verbatim from a reference app. Only `topics.ts` and `quiz.ts` contain unique content per app.

**Tech Stack:** React 19, Vite 6, TypeScript 5.7 (strict), Tailwind CSS 4.0, @cstools/core + @cstools/ui workspace packages, Lucide icons.

---

## App Configuration Table

| App | Dir | Package | Port | Icon | Color | Title | Subtitle | Description (for index.html meta) |
|-----|-----|---------|------|------|-------|-------|----------|------------------------------------|
| Computer Architecture | `apps/computer-architecture` | `@cstools/computer-architecture` | 5194 | `CircuitBoard` | `#FF6B6B` | Computer Architecture | Gates, Pipelines & Caches | Interactive guide to computer architecture — digital logic, CPU pipelines, caches, and modern processor design |
| Automata & Formal Languages | `apps/automata` | `@cstools/automata` | 5195 | `Infinity` | `#C678DD` | Automata & Formal Languages | DFA, CFG & Computability | Interactive guide to automata theory — finite automata, regular languages, context-free grammars, and computability |
| Programming Languages | `apps/programming-languages` | `@cstools/programming-languages` | 5196 | `FileCode` | `#61AFEF` | Programming Languages | Types, Semantics & Paradigms | Interactive guide to programming language theory — type systems, evaluation strategies, paradigms, and runtime design |
| Computer Graphics | `apps/computer-graphics` | `@cstools/computer-graphics` | 5197 | `Monitor` | `#E06C75` | Computer Graphics | Rendering, Shading & Ray Tracing | Interactive guide to computer graphics — math foundations, rendering pipeline, ray tracing, and real-time techniques |
| Concurrency & Parallelism | `apps/concurrency` | `@cstools/concurrency` | 5198 | `Workflow` | `#56B6C2` | Concurrency & Parallelism | Threads, Locks & Async Patterns | Interactive guide to concurrency — threading models, synchronization, lock-free algorithms, and async patterns |
| Information Theory | `apps/information-theory` | `@cstools/information-theory` | 5199 | `Radio` | `#D19A66` | Information Theory & Coding | Entropy, Compression & Error Correction | Interactive guide to information theory — entropy, compression algorithms, error-correcting codes, and Shannon limits |
| Numerical Methods | `apps/numerical-methods` | `@cstools/numerical-methods` | 5200 | `Sigma` | `#CBA6F7` | Numerical Methods & Linear Algebra | Matrices, Optimization & FFT | Interactive guide to numerical methods — linear algebra, optimization, floating-point analysis, and numerical computing |
| API Design | `apps/api-design` | `@cstools/api-design` | 5201 | `Plug` | `#F5A97F` | API Design & Protocols | REST, GraphQL & gRPC | Interactive guide to API design — RESTful patterns, GraphQL, gRPC, authentication, and API operations |

---

## Per-App File Manifest (14 files each)

Every app creates these files. The **Reference App** for all templates is `apps/software-engineering/`.

**Config files (4):**
1. `package.json` — Change `name` to package name from table
2. `index.html` — Change `<title>` and `<meta name="description">`
3. `vite.config.ts` — Change `server.port`
4. `tsconfig.json` — Identical (copy verbatim)

**Source files (6):**
5. `src/main.tsx` — Identical (copy verbatim)
6. `src/index.css` — Change `--color-primary`, `--color-accent`, `--color-ring` to app color
7. `src/App.tsx` — Change: icon import, icon usage (2 places), localStorage prefix (3 keys), title text, description text
8. `src/components/Sidebar.tsx` — Change: icon import, icon usage, title, subtitle, active color
9. `src/components/TopicView.tsx` — Identical (copy verbatim)
10. `src/components/ConceptCard.tsx` — Identical (copy verbatim)
11. `src/components/QuizMode.tsx` — Identical (copy verbatim)
12. `src/components/SearchResults.tsx` — Identical (copy verbatim)

**Data files (2) — unique per app:**
13. `src/data/topics.ts` — 13 topics, 39 concepts (see design doc for topic breakdown)
14. `src/data/quiz.ts` — 39 questions, 3 per topic, varied answer indices

---

## Tasks

### Task 1: Create scaffold for all 8 apps (config + components)

**Files (per app, 12 files × 8 apps = 96 files):**
- Create: `apps/{dir}/package.json`
- Create: `apps/{dir}/index.html`
- Create: `apps/{dir}/vite.config.ts`
- Create: `apps/{dir}/tsconfig.json`
- Create: `apps/{dir}/src/main.tsx`
- Create: `apps/{dir}/src/index.css`
- Create: `apps/{dir}/src/App.tsx`
- Create: `apps/{dir}/src/components/Sidebar.tsx`
- Create: `apps/{dir}/src/components/TopicView.tsx`
- Create: `apps/{dir}/src/components/ConceptCard.tsx`
- Create: `apps/{dir}/src/components/QuizMode.tsx`
- Create: `apps/{dir}/src/components/SearchResults.tsx`

**Instructions:**
For each app, copy the reference files from `apps/software-engineering/` and substitute values per the App Configuration Table above:

**`package.json`** template (change `name`):
```json
{
  "name": "{PACKAGE_NAME}",
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
    "@cstools/core": "workspace:*",
    "@cstools/ui": "workspace:*",
    "lucide-react": "^0.487.0",
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

**`vite.config.ts`** template (change port):
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: { port: {PORT} },
});
```

**`index.html`** template (change title + description):
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{TITLE} Explorer - CS Tools</title>
    <meta name="description" content="{DESCRIPTION}" />
    <meta name="theme-color" content="#0D1117" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**`src/index.css`** template (change 3 color values):
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

@import "tailwindcss";

@theme {
  --color-background: #0D1117;
  --color-foreground: #E6EDF3;
  --color-card: #161B22;
  --color-card-foreground: #E6EDF3;
  --color-popover: #161B22;
  --color-popover-foreground: #E6EDF3;
  --color-primary: {COLOR};
  --color-primary-foreground: #0D1117;
  --color-secondary: #21262D;
  --color-secondary-foreground: #E6EDF3;
  --color-muted: #21262D;
  --color-muted-foreground: #8B949E;
  --color-accent: {COLOR};
  --color-accent-foreground: #0D1117;
  --color-destructive: #F85149;
  --color-destructive-foreground: #E6EDF3;
  --color-border: #30363D;
  --color-input: #30363D;
  --color-ring: {COLOR};
  --radius: 0.5rem;
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: 'Inter', system-ui, sans-serif;
}
```

**`src/App.tsx`** template — copy from `apps/software-engineering/src/App.tsx` and change:
- Line 8: icon import (`Wrench` → `{ICON}`)
- Line 21: localStorage key `'software-engineering-bookmarks'` → `'{PREFIX}bookmarks'`
- Line 22: localStorage key `'software-engineering-completed'` → `'{PREFIX}completed'`
- Line 23: localStorage key `'software-engineering-quiz-scores'` → `'{PREFIX}quiz-scores'`
- Line 85: icon component `<Wrench ...>` → `<{ICON} ...>`  and color `#E5C07B` → `{COLOR}`
- Line 86: title text
- Lines 87-89: description text

**`src/components/Sidebar.tsx`** template — copy from `apps/software-engineering/src/components/Sidebar.tsx` and change:
- Line 1: icon import (`Wrench` → `{ICON}`)
- Line 32: icon component and color
- Line 33: title text
- Line 35: subtitle text
- Line 90/93: active color `#E5C07B` → `{COLOR}` (2 places)

**Verbatim copies** (no changes needed):
- `tsconfig.json` — copy from `apps/software-engineering/tsconfig.json`
- `src/main.tsx` — copy from `apps/software-engineering/src/main.tsx`
- `src/components/TopicView.tsx` — copy from `apps/software-engineering/src/components/TopicView.tsx`
- `src/components/ConceptCard.tsx` — copy from `apps/software-engineering/src/components/ConceptCard.tsx`
- `src/components/QuizMode.tsx` — copy from `apps/software-engineering/src/components/QuizMode.tsx`
- `src/components/SearchResults.tsx` — copy from `apps/software-engineering/src/components/SearchResults.tsx`

---

### Task 2: Create topics.ts for Computer Architecture (app #22)

**File:** Create `apps/computer-architecture/src/data/topics.ts`

**Content spec:** See design doc `docs/plans/2026-03-01-core-cs-foundations-design.md` for the 13-topic breakdown. Follow the exact same TypeScript types and export pattern as `apps/software-engineering/src/data/topics.ts`:
- Export `interface Concept { id, name, description, keyPoints: string[], tradeoffs?: string[], realWorld?: string[] }`
- Export `interface Topic { id, title, part, partTitle, summary, concepts: Concept[] }`
- Export `type Chapter = Topic`
- Export `const parts: { id: number; title: string }[]` — 4 parts
- Export `const topics: Topic[]` — 13 topics, 39 concepts (3 per topic)
- Export `const chapters = topics`
- Export `function getChapter(id: number): Topic | undefined`

Each concept needs: 5+ keyPoints, 2-3 tradeoffs, 3 realWorld examples. Content must be technically accurate.

### Task 3: Create quiz.ts for Computer Architecture (app #22)

**File:** Create `apps/computer-architecture/src/data/quiz.ts`

**Content spec:** 39 questions (3 per topic/chapter). Follow the exact TypeScript types from `apps/software-engineering/src/data/quiz.ts`:
- Export `interface QuizQuestion { id, chapterId, question, options: string[], answer: number, explanation: string }`
- Export `const quizQuestions: QuizQuestion[]`
- Export `function getQuestionsForChapter(chapterId: number): QuizQuestion[]`

Answer index distribution should be roughly even across 0-3. Each question has 4 options and an explanation.

### Task 4: Create topics.ts for Automata & Formal Languages (app #23)

**File:** Create `apps/automata/src/data/topics.ts`
**Content spec:** Same structure as Task 2. 13 topics from design doc automata section.

### Task 5: Create quiz.ts for Automata & Formal Languages (app #23)

**File:** Create `apps/automata/src/data/quiz.ts`
**Content spec:** Same structure as Task 3. 39 questions for automata topics.

### Task 6: Create topics.ts for Programming Languages (app #24)

**File:** Create `apps/programming-languages/src/data/topics.ts`
**Content spec:** Same structure as Task 2. 13 topics from design doc PL section.

### Task 7: Create quiz.ts for Programming Languages (app #24)

**File:** Create `apps/programming-languages/src/data/quiz.ts`
**Content spec:** Same structure as Task 3. 39 questions for PL topics.

### Task 8: Create topics.ts for Computer Graphics (app #25)

**File:** Create `apps/computer-graphics/src/data/topics.ts`
**Content spec:** Same structure as Task 2. 13 topics from design doc graphics section.

### Task 9: Create quiz.ts for Computer Graphics (app #25)

**File:** Create `apps/computer-graphics/src/data/quiz.ts`
**Content spec:** Same structure as Task 3. 39 questions for graphics topics.

### Task 10: Create topics.ts for Concurrency & Parallelism (app #26)

**File:** Create `apps/concurrency/src/data/topics.ts`
**Content spec:** Same structure as Task 2. 13 topics from design doc concurrency section.

### Task 11: Create quiz.ts for Concurrency & Parallelism (app #26)

**File:** Create `apps/concurrency/src/data/quiz.ts`
**Content spec:** Same structure as Task 3. 39 questions for concurrency topics.

### Task 12: Create topics.ts for Information Theory & Coding (app #27)

**File:** Create `apps/information-theory/src/data/topics.ts`
**Content spec:** Same structure as Task 2. 13 topics from design doc info theory section.

### Task 13: Create quiz.ts for Information Theory & Coding (app #27)

**File:** Create `apps/information-theory/src/data/quiz.ts`
**Content spec:** Same structure as Task 3. 39 questions for info theory topics.

### Task 14: Create topics.ts for Numerical Methods & Linear Algebra (app #28)

**File:** Create `apps/numerical-methods/src/data/topics.ts`
**Content spec:** Same structure as Task 2. 13 topics from design doc numerical methods section.

### Task 15: Create quiz.ts for Numerical Methods & Linear Algebra (app #28)

**File:** Create `apps/numerical-methods/src/data/quiz.ts`
**Content spec:** Same structure as Task 3. 39 questions for numerical methods topics.

### Task 16: Create topics.ts for API Design & Protocols (app #29)

**File:** Create `apps/api-design/src/data/topics.ts`
**Content spec:** Same structure as Task 2. 13 topics from design doc API design section.

### Task 17: Create quiz.ts for API Design & Protocols (app #29)

**File:** Create `apps/api-design/src/data/quiz.ts`
**Content spec:** Same structure as Task 3. 39 questions for API design topics.

### Task 18: Update hub + CLAUDE.md

**Files:**
- Modify: `apps/hub/src/App.tsx`
- Modify: `CLAUDE.md`

**Hub changes:**

1. Add new icon imports to line 2 (add: `CircuitBoard, Infinity, FileCode, Monitor, Workflow, Radio, Sigma, Plug`):

2. Add 8 tool entries to the `tools` array after the Software Engineering entry:
```ts
  {
    name: 'Computer Architecture',
    description: 'Computer architecture — digital logic, CPU pipelines, caches, memory hierarchy, and modern processor design',
    icon: CircuitBoard,
    color: '#FF6B6B',
    port: 5194,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'Automata & Formal Languages',
    description: 'Automata theory — DFA, NFA, regular languages, context-free grammars, Turing machines, and computability',
    icon: Infinity,
    color: '#C678DD',
    port: 5195,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'Programming Languages',
    description: 'Programming language theory — type systems, evaluation strategies, paradigms, memory management, and runtime design',
    icon: FileCode,
    color: '#61AFEF',
    port: 5196,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'Computer Graphics',
    description: 'Computer graphics — math foundations, rendering pipeline, ray tracing, shaders, and real-time techniques',
    icon: Monitor,
    color: '#E06C75',
    port: 5197,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'Concurrency & Parallelism',
    description: 'Concurrency — threading models, synchronization, lock-free algorithms, async patterns, and distributed concurrency',
    icon: Workflow,
    color: '#56B6C2',
    port: 5198,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'Information Theory',
    description: 'Information theory — entropy, compression, error-correcting codes, channel capacity, and Shannon limits',
    icon: Radio,
    color: '#D19A66',
    port: 5199,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'Numerical Methods',
    description: 'Numerical methods — linear algebra, matrix decompositions, optimization, floating-point analysis, and FFT',
    icon: Sigma,
    color: '#CBA6F7',
    port: 5200,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
  {
    name: 'API Design & Protocols',
    description: 'API design — REST, GraphQL, gRPC, WebSockets, authentication, rate limiting, and API operations',
    icon: Plug,
    color: '#F5A97F',
    port: 5201,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
```

3. Update `overallStats`:
```ts
const overallStats = [
  { label: 'Tools', value: '29', icon: Server, color: '#58A6FF' },
  { label: 'Topics', value: '337+', icon: Layers, color: '#3FB950' },
  { label: 'Questions', value: '1088+', icon: HelpCircle, color: '#D2A8FF' },
  { label: 'Concepts', value: '1008+', icon: BookMarked, color: '#D29922' },
];
```

**CLAUDE.md changes** — add 8 rows after `software-engineering`:
```
| computer-architecture | 5194 | Computer architecture concepts explorer with quizzes |
| automata | 5195 | Automata & formal languages explorer with quizzes |
| programming-languages | 5196 | Programming language theory explorer with quizzes |
| computer-graphics | 5197 | Computer graphics concepts explorer with quizzes |
| concurrency | 5198 | Concurrency & parallelism explorer with quizzes |
| information-theory | 5199 | Information theory & coding explorer with quizzes |
| numerical-methods | 5200 | Numerical methods & linear algebra explorer with quizzes |
| api-design | 5201 | API design & protocols explorer with quizzes |
```

### Task 19: Build verification

**Commands:**
```bash
pnpm install
pnpm --filter @cstools/computer-architecture build
pnpm --filter @cstools/automata build
pnpm --filter @cstools/programming-languages build
pnpm --filter @cstools/computer-graphics build
pnpm --filter @cstools/concurrency build
pnpm --filter @cstools/information-theory build
pnpm --filter @cstools/numerical-methods build
pnpm --filter @cstools/api-design build
pnpm --filter @cstools/hub build
```

All 9 builds must pass `tsc -b && vite build` with zero errors.

### Task 20: Commit

```bash
git add apps/computer-architecture/ apps/automata/ apps/programming-languages/ apps/computer-graphics/ apps/concurrency/ apps/information-theory/ apps/numerical-methods/ apps/api-design/ apps/hub/src/App.tsx CLAUDE.md pnpm-lock.yaml
git commit -m "Add 8 core CS foundation apps — Architecture, Automata, PL Theory, Graphics, Concurrency, Info Theory, Numerical Methods, API Design (312 concepts, 312 quiz questions)"
```

---

## Execution Strategy

Tasks 2-17 (data files) are **parallelizable in pairs** — each app's topics.ts + quiz.ts can be created simultaneously, and all 8 apps are independent of each other. Maximum parallelism: dispatch up to 8 agents simultaneously for topics.ts files, then 8 for quiz.ts files (or pair them per app).

Task 1 (scaffold) must complete before any data file tasks.
Task 18 (hub update) must wait for all data files.
Task 19 (build) must wait for task 18.
Task 20 (commit) must wait for task 19.
