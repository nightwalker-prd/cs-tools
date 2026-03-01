# Software Engineering Explorer — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a Software Engineering Explorer app (#21) covering the full SE lifecycle — requirements, testing, code quality, agile processes, and production readiness.

**Architecture:** Standard explorer app pattern (identical to databases/dev-experience template). 14 files: 4 config, 6 source/components, 2 data files. Registered in hub and CLAUDE.md.

**Tech Stack:** React 19, Vite 6, TypeScript 5.7 (strict), Tailwind CSS 4, @cstools/ui + @cstools/core shared packages, Lucide icons.

---

### Task 1: Create app scaffold (config files)

**Files:**
- Create: `apps/software-engineering/package.json`
- Create: `apps/software-engineering/index.html`
- Create: `apps/software-engineering/vite.config.ts`
- Create: `apps/software-engineering/tsconfig.json`

**Step 1: Create directory structure**

```bash
mkdir -p apps/software-engineering/src/{components,data}
```

**Step 2: Create package.json**

```json
{
  "name": "@cstools/software-engineering",
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

**Step 3: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Software Engineering Explorer - CS Tools</title>
    <meta name="description" content="Interactive guide to software engineering practices — requirements, testing, code quality, agile, and production readiness" />
    <meta name="theme-color" content="#0D1117" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 4: Create vite.config.ts**

Port: **5193**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: { port: 5193 },
});
```

**Step 5: Create tsconfig.json**

Same as all other explorer apps (ES2022, strict, bundler resolution, react-jsx, path alias).

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
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src/**/*"]
}
```

---

### Task 2: Create app source files (main, CSS, App, Sidebar)

**Files:**
- Create: `apps/software-engineering/src/main.tsx`
- Create: `apps/software-engineering/src/index.css`
- Create: `apps/software-engineering/src/App.tsx`
- Create: `apps/software-engineering/src/components/Sidebar.tsx`

**Step 1: Create src/main.tsx**

Standard React 19 entry point (identical to all explorers).

```tsx
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

**Step 2: Create src/index.css**

Same theme as all explorers but with primary/accent color `#E5C07B` (warm gold).

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
  --color-primary: #E5C07B;
  --color-primary-foreground: #0D1117;
  --color-secondary: #21262D;
  --color-secondary-foreground: #E6EDF3;
  --color-muted: #21262D;
  --color-muted-foreground: #8B949E;
  --color-accent: #E5C07B;
  --color-accent-foreground: #0D1117;
  --color-destructive: #F85149;
  --color-destructive-foreground: #E6EDF3;
  --color-border: #30363D;
  --color-input: #30363D;
  --color-ring: #E5C07B;
  --radius: 0.5rem;
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: 'Inter', system-ui, sans-serif;
}
```

**Step 3: Create src/App.tsx**

Copy from `apps/dev-experience/src/App.tsx` with these changes:
- Icon: `Wrench` (from lucide-react) instead of `SquareTerminal`
- localStorage prefix: `software-engineering-` instead of `dev-experience-`
- Title: "Software Engineering Explorer"
- Description: "Master the discipline of building software — requirements, testing, code quality, agile practices, and production readiness. Select a topic from the sidebar to begin."
- Accent color: `#E5C07B` instead of `#98C379`

**Step 4: Create src/components/Sidebar.tsx**

Copy from `apps/dev-experience/src/components/Sidebar.tsx` with these changes:
- Icon: `Wrench` instead of `SquareTerminal`
- Title: "Software Engineering"
- Subtitle: "Practices, Testing & Delivery"
- Active chapter highlight color: `#E5C07B` instead of `#98C379`

---

### Task 3: Create shared component files

**Files:**
- Create: `apps/software-engineering/src/components/TopicView.tsx`
- Create: `apps/software-engineering/src/components/ConceptCard.tsx`
- Create: `apps/software-engineering/src/components/QuizMode.tsx`
- Create: `apps/software-engineering/src/components/SearchResults.tsx`

These are **direct copies** from `apps/dev-experience/src/components/` with no modifications. They import from `../data/topics` and `../data/quiz` (relative), so they work in any explorer app.

---

### Task 4: Create topics.ts data file

**File:**
- Create: `apps/software-engineering/src/data/topics.ts`

**Format:** Same TypeScript interfaces as all explorers:
- `Concept { id, name, description, keyPoints[], tradeoffs?[], realWorld?[] }`
- `Topic { id, title, part, partTitle, summary, concepts[] }`
- `Chapter = Topic` type alias
- Export: `parts`, `topics`, `chapters`, `getChapter(id)`

**Parts:**
```typescript
export const parts = [
  { id: 1, title: 'Requirements & Design' },
  { id: 2, title: 'Code Quality & Testing' },
  { id: 3, title: 'Process & Collaboration' },
  { id: 4, title: 'Delivery & Operations' },
];
```

**13 Topics, 3 Concepts Each (39 total):**

**Part 1: Requirements & Design (Topics 1-3)**

Topic 1: **Requirements Engineering** (part 1)
- `requirements-gathering`: Requirements Gathering Techniques — interviews, user stories (As a X, I want Y, so that Z), use cases, personas, story mapping
- `functional-nonfunctional`: Functional vs Non-Functional Requirements — features vs quality attributes (performance, security, scalability), measurability, SLA-driven NFRs
- `requirements-traceability`: Requirements Traceability & Change Management — traceability matrices, requirements churn, scope creep, MoSCoW prioritization

Topic 2: **Software Architecture Fundamentals** (part 1)
- `architectural-styles`: Architectural Styles — layered, microservices, event-driven, hexagonal/ports-and-adapters, monolith-first approach
- `quality-attributes`: Quality Attributes & Trade-offs — scalability vs simplicity, consistency vs availability (CAP), maintainability vs performance, architecture quality scenarios
- `adrs`: Architecture Decision Records — lightweight ADR format (title/context/decision/consequences), when to write them, living documentation

Topic 3: **API & Interface Design** (part 1)
- `rest-design`: REST API Design Principles — resource naming, HTTP methods, status codes, HATEOAS, Richardson Maturity Model
- `api-versioning`: API Versioning & Backward Compatibility — URL vs header versioning, semantic versioning for APIs, deprecation strategy, breaking vs non-breaking changes
- `api-patterns`: API Design Patterns — pagination (cursor vs offset), filtering/sorting, rate limiting, idempotency keys, GraphQL vs REST trade-offs

**Part 2: Code Quality & Testing (Topics 4-7)**

Topic 4: **Clean Code & Code Smells** (part 2)
- `naming-functions`: Naming & Function Design — intention-revealing names, function length heuristics, single responsibility, command-query separation
- `code-smells`: Common Code Smells — long method, feature envy, god class, primitive obsession, shotgun surgery, when smells are acceptable
- `design-principles`: DRY, KISS & YAGNI — when DRY becomes harmful (wrong abstraction), KISS vs clever code, YAGNI and premature abstraction, rule of three

Topic 5: **Refactoring Techniques** (part 2)
- `refactoring-mechanics`: Systematic Refactoring — extract method, move field, replace conditional with polymorphism, introduce parameter object, refactoring in small safe steps
- `refactoring-safety`: Refactoring Safety & Test Coverage — characterization tests before refactoring, seams and dependency injection for testability, strangler fig pattern for legacy
- `technical-debt`: Technical Debt — Martin Fowler's tech debt quadrant (reckless/prudent x deliberate/inadvertent), tracking and prioritizing, interest metaphor, refactoring sprints

Topic 6: **Testing Strategies** (part 2)
- `test-pyramid`: Test Pyramid & Test Types — unit (fast, isolated), integration (component boundaries), E2E (full user flows), ratio heuristics (70/20/10)
- `tdd`: Test-Driven Development — red-green-refactor cycle, starting from failing test, triangulation, London vs Chicago school TDD
- `test-doubles`: Test Doubles & Isolation — mocks (verify behavior), stubs (provide canned answers), fakes (working implementation), spies, when to mock vs when to integrate

Topic 7: **Advanced Testing** (part 2)
- `property-testing`: Property-Based & Mutation Testing — generating random inputs (QuickCheck, fast-check), invariant properties, mutation testing (Stryker, PIT) for test quality
- `contract-testing`: Contract & Snapshot Testing — consumer-driven contracts (Pact), provider verification, snapshot/golden testing for UI, approval testing
- `performance-testing`: Load & Performance Testing — load testing (k6, Locust, JMeter), stress testing, soak testing, percentile-based SLOs (p99), benchmark-driven development

**Part 3: Process & Collaboration (Topics 8-10)**

Topic 8: **Agile Methodologies** (part 3)
- `scrum`: Scrum Framework — roles (PO, SM, dev team), ceremonies (sprint planning, daily standup, review, retro), sprint length, burndown charts
- `kanban`: Kanban & Flow — WIP limits, pull-based flow, cycle time vs lead time, cumulative flow diagrams, Kanban vs Scrum trade-offs
- `estimation`: Estimation & Planning — story points vs time estimates, planning poker, #NoEstimates movement, cone of uncertainty, velocity tracking

Topic 9: **Code Review & Collaboration** (part 3)
- `code-review`: Code Review Best Practices — review size (<400 lines), review checklists, constructive feedback, approval workflows, automated checks before human review
- `pair-programming`: Pair Programming & Mob Programming — driver/navigator roles, ping-pong pairing with TDD, remote pairing tools, when pairing helps vs hinders
- `branching-strategies`: Development Workflows — trunk-based development, feature branches, GitHub Flow, ship/show/ask, feature flags vs branches

Topic 10: **Documentation & Communication** (part 3)
- `technical-writing`: Technical Documentation — ADRs, RFCs/design docs, README-driven development, documentation-as-code (docs alongside source), Diátaxis framework
- `runbooks-playbooks`: Runbooks & Operational Docs — incident runbooks, on-call playbooks, troubleshooting guides, keeping docs current with automation
- `diagrams-communication`: Diagrams & Visual Communication — C4 model (context, container, component, code), sequence diagrams, diagrams as code (Mermaid, PlantUML), whiteboard architecture

**Part 4: Delivery & Operations (Topics 11-13)**

Topic 11: **Version Control Strategies** (part 4)
- `branching-models`: Branching Models — GitFlow (feature/develop/release/hotfix), trunk-based development, release branches, choosing the right model for team size
- `semantic-versioning`: Semantic Versioning & Release Management — semver (major.minor.patch), conventional commits, automated changelog generation, release trains
- `monorepo-polyrepo`: Monorepo vs Polyrepo — advantages of monorepo (atomic changes, shared tooling), polyrepo independence, tooling (Nx, Turborepo, Lerna), migration strategies

Topic 12: **Production Readiness** (part 4)
- `deployment-strategies`: Deployment Strategies — blue-green, canary, rolling deployments, feature flags (LaunchDarkly, Unleash), dark launches, database migration strategies
- `health-monitoring`: Health Checks & Monitoring — readiness vs liveness probes, structured logging, metrics (RED method: rate/errors/duration), distributed tracing
- `slos-slas`: SLOs, SLIs & SLAs — service level objectives vs indicators vs agreements, error budgets, reliability targets (three nines, four nines), burn rate alerts

Topic 13: **Incident Management & Reliability** (part 4)
- `incident-response`: Incident Response — severity levels, incident commander role, communication templates, war rooms, status pages
- `postmortems`: Blameless Postmortems — timeline reconstruction, contributing factors (not root cause), action items with owners, learning reviews, postmortem culture
- `chaos-engineering`: Chaos Engineering & Error Budgets — principles of chaos (steady state, introduce failure, minimize blast radius), chaos tools (Chaos Monkey, Litmus), error budget policies, game days

---

### Task 5: Create quiz.ts data file

**File:**
- Create: `apps/software-engineering/src/data/quiz.ts`

**Format:** Same as all explorers:
```typescript
export interface QuizQuestion {
  id: string;        // "tN-qM"
  chapterId: number; // 1-13
  question: string;
  options: string[]; // exactly 4
  answer: number;    // 0-indexed
  explanation: string;
}
```

**39 questions total** (3 per topic). Vary correct answer index across 0-3. Make wrong options plausible.

Key questions per topic:

1. Requirements: user story format, NFR measurability, MoSCoW prioritization
2. Architecture: when to choose microservices, quality attribute scenarios, ADR format
3. API Design: HTTP method semantics, versioning strategies, idempotency
4. Clean Code: naming conventions, when DRY is harmful, code smell identification
5. Refactoring: extract method safety, characterization tests, tech debt quadrant
6. Testing: test pyramid ratios, TDD cycle order, mock vs stub distinction
7. Advanced Testing: property-based testing purpose, contract testing, p99 vs average
8. Agile: Scrum roles, WIP limit purpose, estimation approaches
9. Code Review: optimal PR size, trunk-based vs feature branch, when to pair program
10. Documentation: Diátaxis framework, C4 model levels, ADR vs RFC
11. Version Control: semver breaking change rules, trunk-based development benefits, monorepo trade-offs
12. Production: blue-green vs canary difference, liveness vs readiness probes, error budget concept
13. Incidents: blameless postmortem principles, chaos engineering steady state, incident severity levels

---

### Task 6: Update hub

**File:**
- Modify: `apps/hub/src/App.tsx`

**Step 1: Add Wrench to icon imports (line 2)**

Add `Wrench` to the lucide-react import.

**Step 2: Add tool entry after Systems Programming (line ~196)**

```typescript
  {
    name: 'Software Engineering',
    description: 'Software engineering practices — requirements, testing, code quality, agile, and production readiness',
    icon: Wrench,
    color: '#E5C07B',
    port: 5193,
    stats: '13 topics, 39 concepts, 39 quiz questions',
    tags: ['reference', 'interactive'],
  },
```

**Step 3: Update overallStats (line ~207-211)**

```typescript
  { label: 'Tools', value: '21', icon: Server, color: '#58A6FF' },
  { label: 'Topics', value: '233+', icon: Layers, color: '#3FB950' },
  { label: 'Questions', value: '776+', icon: HelpCircle, color: '#D2A8FF' },
  { label: 'Concepts', value: '696+', icon: BookMarked, color: '#D29922' },
```

---

### Task 7: Update CLAUDE.md

**File:**
- Modify: `CLAUDE.md`

**Step 1: Add new row after systems-programming (line 53)**

```
| software-engineering | 5193 | Software engineering practices explorer with quizzes |
```

---

### Task 8: Build verification

**Step 1: Install dependencies**

```bash
pnpm install
```

Expected: resolves workspace dependencies, no errors.

**Step 2: Build the new app**

```bash
pnpm --filter @cstools/software-engineering build
```

Expected: `tsc -b` passes with no type errors, `vite build` produces `dist/` with index.html + JS + CSS.

**Step 3: Build the hub**

```bash
pnpm --filter @cstools/hub build
```

Expected: clean build with no type errors (verifies Wrench icon import works).

**Step 4: Commit**

```bash
git add apps/software-engineering/ apps/hub/src/App.tsx CLAUDE.md
git commit -m "feat: add Software Engineering explorer (app #21, port 5193)

13 topics, 39 concepts, 39 quiz questions covering requirements engineering,
testing strategies, code quality, agile methodologies, and production readiness.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```
