# OSINT Explorer Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create an OSINT fundamentals explorer app (#32) in the cs-tools monorepo covering reconnaissance, SOCMINT, GEOINT, verification, threat intelligence, and operational security.

**Architecture:** Standard cs-tools explorer scaffold — identical to all 31 existing apps. Sidebar navigation with 4 parts / 13 topics, concept cards with key points / trade-offs / real-world examples, quiz mode with 39 questions, full-text search, localStorage persistence.

**Tech Stack:** React 19, Vite 6, TypeScript 5.7 (strict), Tailwind CSS 4.0, @cstools/ui, @cstools/core, lucide-react (Radar icon)

---

### Task 1: Create app scaffold files

**Files:**
- Create: `apps/osint/package.json`
- Create: `apps/osint/vite.config.ts`
- Create: `apps/osint/tsconfig.json`
- Create: `apps/osint/index.html`
- Create: `apps/osint/src/main.tsx`
- Create: `apps/osint/src/index.css`

**Step 1: Create `apps/osint/package.json`**

```json
{
  "name": "@cstools/osint",
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

**Step 2: Create `apps/osint/vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: { port: 5204 },
});
```

**Step 3: Create `apps/osint/tsconfig.json`**

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

**Step 4: Create `apps/osint/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OSINT Explorer - CS Tools</title>
    <meta name="description" content="Interactive guide to OSINT fundamentals — reconnaissance, SOCMINT, GEOINT, verification, threat intelligence, and operational security" />
    <meta name="theme-color" content="#0D1117" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 5: Create `apps/osint/src/main.tsx`**

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

**Step 6: Create `apps/osint/src/index.css`**

Use accent color `#00D4AA` (teal).

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
  --color-primary: #00D4AA;
  --color-primary-foreground: #0D1117;
  --color-secondary: #21262D;
  --color-secondary-foreground: #E6EDF3;
  --color-muted: #21262D;
  --color-muted-foreground: #8B949E;
  --color-accent: #00D4AA;
  --color-accent-foreground: #0D1117;
  --color-destructive: #F85149;
  --color-destructive-foreground: #E6EDF3;
  --color-border: #30363D;
  --color-input: #30363D;
  --color-ring: #00D4AA;
  --radius: 0.5rem;
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: 'Inter', system-ui, sans-serif;
}
```

**Step 7: Commit**

```bash
git add apps/osint/package.json apps/osint/vite.config.ts apps/osint/tsconfig.json apps/osint/index.html apps/osint/src/main.tsx apps/osint/src/index.css
git commit -m "feat(osint): scaffold app with config files and entry point"
```

---

### Task 2: Create topics data (13 topics, 39 concepts)

**Files:**
- Create: `apps/osint/src/data/topics.ts`

**Step 1: Write topics.ts**

Structure: 4 parts, 13 topics, 3 concepts per topic (39 total). Each concept has `id`, `name`, `description`, `keyPoints` (3-5 items), optional `tradeoffs` and `realWorld`.

**Parts:**
1. Foundations & Ethics (Topics 1-3)
2. Collection Techniques (Topics 4-7)
3. Analysis & Verification (Topics 8-10)
4. Advanced & Specialized (Topics 11-13)

**Topic outline:**
1. OSINT Fundamentals — intelligence cycle, OSINT vs other INTs, collection management
2. Legal & Ethical Frameworks — privacy law, terms of service, ethical guidelines
3. Operational Security (OPSEC) — sock puppets, attribution risks, secure research environments
4. Search Engine Intelligence (SEARCHINT) — Google dorking, cached content, advanced operators
5. Social Media Intelligence (SOCMINT) — platform APIs, profile analysis, network mapping
6. Domain & Infrastructure Recon — WHOIS, DNS, certificate transparency, IP geolocation
7. Geospatial Intelligence (GEOINT) — satellite imagery, geolocation techniques, mapping tools
8. Image & Video Analysis — reverse image search, EXIF data, deepfake detection
9. Data Correlation & Link Analysis — entity resolution, graph analysis, timeline reconstruction
10. Verification & Fact-Checking — source evaluation, multi-source corroboration, digital forensics
11. Dark Web & Deep Web Intel — Tor, onion services, marketplace monitoring, paste sites
12. Threat Intelligence & CTI — IOCs, TTPs, MITRE ATT&CK, threat feeds
13. OSINT Automation & Tooling — frameworks (Maltego, SpiderFoot), APIs, custom scripts

File must export: `Concept` interface, `Topic` interface, `Chapter` type alias, `parts` array, `topics` array, `chapters` alias, `getChapter()` function.

Follow exact type structure from media-streaming template.

**Step 2: Commit**

```bash
git add apps/osint/src/data/topics.ts
git commit -m "feat(osint): add 13 topics with 39 concepts covering OSINT lifecycle"
```

---

### Task 3: Create quiz data (39 questions)

**Files:**
- Create: `apps/osint/src/data/quiz.ts`

**Step 1: Write quiz.ts**

3 questions per topic (39 total). Each question has: `id` (string like `t1-q1`), `chapterId` (number 1-13), `question`, `options` (4 choices), `answer` (0-indexed), `explanation`.

Must export: `QuizQuestion` interface, `quizQuestions` array, `getQuestionsForChapter()` function.

**Step 2: Commit**

```bash
git add apps/osint/src/data/quiz.ts
git commit -m "feat(osint): add 39 quiz questions (3 per topic)"
```

---

### Task 4: Create UI components

**Files:**
- Create: `apps/osint/src/components/ConceptCard.tsx`
- Create: `apps/osint/src/components/TopicView.tsx`
- Create: `apps/osint/src/components/QuizMode.tsx`
- Create: `apps/osint/src/components/SearchResults.tsx`
- Create: `apps/osint/src/components/Sidebar.tsx`

**Step 1: Create all 5 components**

Copy exact code from media-streaming template for each component, changing only:
- **Sidebar.tsx**: Icon `Tv` → `Radar`, title `Media Streaming` → `OSINT`, subtitle `Codecs, Protocols & CDN Architecture` → `Reconnaissance, Analysis & Intelligence`, accent color `#E879F9` → `#00D4AA`
- **All other components**: No changes needed — they are identical across all apps

**Step 2: Commit**

```bash
git add apps/osint/src/components/
git commit -m "feat(osint): add UI components (sidebar, topic view, concept cards, quiz, search)"
```

---

### Task 5: Create App.tsx

**Files:**
- Create: `apps/osint/src/App.tsx`

**Step 1: Write App.tsx**

Copy from media-streaming template, changing:
- Icon: `Tv` → `Radar`
- localStorage keys: `media-streaming-*` → `osint-*`
- Title: `Media Streaming Explorer` → `OSINT Explorer`
- Description text: update to OSINT description
- Accent color: `#E879F9` → `#00D4AA`

**Step 2: Commit**

```bash
git add apps/osint/src/App.tsx
git commit -m "feat(osint): add main App component with state management"
```

---

### Task 6: Install, build, and verify

**Step 1: Install dependencies**

```bash
cd /Users/miftah/projects/cs-tools
pnpm install
```

Expected: resolves workspace dependencies, no errors.

**Step 2: Build the app**

```bash
pnpm --filter @cstools/osint build
```

Expected: `tsc -b && vite build` succeeds with zero TypeScript errors.

**Step 3: Fix any build errors**

If TypeScript errors occur, fix them and rebuild.

**Step 4: Commit build fixes (if any)**

```bash
git add apps/osint/
git commit -m "fix(osint): resolve build errors"
```

---

### Task 7: Hub registration & CLAUDE.md

**Files:**
- Modify: `apps/hub/src/App.tsx`
- Modify: `CLAUDE.md`

**Step 1: Update hub App.tsx**

1. Add `Radar` to lucide-react icon imports (line 2)
2. Add tool entry after algorithm-analysis:
```ts
{
  name: 'OSINT',
  description: 'OSINT fundamentals — reconnaissance, SOCMINT, GEOINT, verification, threat intelligence, and operational security',
  icon: Radar,
  color: '#00D4AA',
  port: 5204,
  stats: '13 topics, 39 concepts, 39 quiz questions',
  tags: ['reference', 'quiz'],
},
```
3. Update overallStats: Tools 31→32, Topics 363→376, Questions 1166→1205, Concepts 1086→1125

**Step 2: Update CLAUDE.md**

Add row after algorithm-analysis:
```
| osint | 5204 | OSINT fundamentals explorer with quizzes |
```

**Step 3: Build hub**

```bash
pnpm --filter @cstools/hub build
```

Expected: builds clean.

**Step 4: Commit**

```bash
git add apps/hub/src/App.tsx CLAUDE.md
git commit -m "feat(hub): register OSINT app (#32) — update stats to 32 tools, 376 topics, 1205 questions"
```

---

### Task 8: Final verification

**Step 1: Full build check**

```bash
pnpm --filter @cstools/osint build && pnpm --filter @cstools/hub build
```

Expected: Both pass with zero errors.

**Step 2: Verify file count**

```bash
find apps/osint/src -name '*.ts' -o -name '*.tsx' -o -name '*.css' | wc -l
```

Expected: 10 files (App.tsx, main.tsx, index.css, 5 components, topics.ts, quiz.ts)
