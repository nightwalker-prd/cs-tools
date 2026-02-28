# Sarf Forge Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Productionize sarf-forge from a single JSX prototype into a full monorepo app powered by 446 real verbs and the @arabiyya/sarf morphological engine.

**Architecture:** Convert the prototype's hardcoded 120 root+pattern combinations into a live forge engine that uses @arabiyya/sarf to generate real Arabic words from any root+pattern combination. Import verb data from the conjugation app's curated collection (446 verbs across 10 sarf units). Preserve the game mechanics (forge, discover, collect) and dark-theme UI aesthetic.

**Tech Stack:** React 19, TypeScript 5.7 (strict), Vite 6, Tailwind CSS 4, @arabiyya/sarf 6.1.0, @arabtools/ui, @arabtools/core

---

### Task 1: Scaffold the app

**Files:**
- Create: `apps/sarf-forge/package.json`
- Create: `apps/sarf-forge/vite.config.ts`
- Create: `apps/sarf-forge/tsconfig.json`
- Create: `apps/sarf-forge/index.html`
- Create: `apps/sarf-forge/src/main.tsx`
- Create: `apps/sarf-forge/src/index.css`
- Create: `apps/sarf-forge/src/App.tsx`
- Create: `apps/sarf-forge/src/vite-env.d.ts`

**Step 1: Create package.json**

```json
{
  "name": "@arabtools/sarf-forge",
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
    "@arabtools/conjugation": "*",
    "@arabtools/core": "*",
    "@arabtools/ui": "*",
    "@arabiyya/sarf": "^6.1.0",
    "lucide-react": "^0.460.0",
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
    "vite": "^6.0.0",
    "vite-plugin-pwa": "^0.21.1"
  }
}
```

**Step 2: Create vite.config.ts**

Port: 5197. Manual chunks for react, sarf.

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Sarf Forge - Arab Tools',
        short_name: 'Sarf Forge',
        description: 'Forge Arabic words by combining roots and patterns',
        theme_color: '#0a0a12',
        background_color: '#0a0a12',
        display: 'standalone',
        orientation: 'any',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
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
          sarf: ['@arabiyya/sarf'],
        },
      },
    },
  },
  server: {
    port: 5197,
    open: true,
  },
});
```

**Step 3: Create tsconfig.json**

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

**Step 4: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/icon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>Sarf Forge - Arab Tools</title>
    <meta name="description" content="Forge Arabic words by combining roots and morphological patterns. Discover how the Arabic derivation system works through play." />
    <meta name="theme-color" content="#0a0a12" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 5: Create src/vite-env.d.ts**

```typescript
/// <reference types="vite/client" />
```

**Step 6: Create src/main.tsx**

```typescript
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

**Step 7: Create src/index.css**

Dark forge theme. Uses Crimson Text + Amiri (matching prototype) plus Tailwind 4.

```css
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Amiri:wght@400;700&family=Open+Sans:wght@300;400;500;600;700&display=swap');

@import "tailwindcss";

@theme {
  --color-background: #0a0a12;
  --color-foreground: #e0ddd5;
  --color-card: #15152a;
  --color-card-foreground: #e0ddd5;
  --color-popover: #15152a;
  --color-popover-foreground: #e0ddd5;
  --color-primary: #FFD700;
  --color-primary-foreground: #0a0a12;
  --color-secondary: #1a1a2e;
  --color-secondary-foreground: #e0ddd5;
  --color-muted: #1e1e36;
  --color-muted-foreground: #8a8775;
  --color-accent: #4ECDC4;
  --color-accent-foreground: #0a0a12;
  --color-destructive: #FF6B6B;
  --color-destructive-foreground: #ffffff;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-input: transparent;
  --color-ring: #FFD700;
  --radius: 0.75rem;

  --color-forge-gold: #FFD700;
  --color-forge-cyan: #4ECDC4;
  --color-forge-red: #FF6B6B;
  --color-forge-orange: #FFA500;

  --font-arabic: 'Amiri', serif;
  --font-serif: 'Crimson Text', 'EB Garamond', serif;
  --font-sans: 'Open Sans', system-ui, sans-serif;
}

* {
  border-color: var(--color-border);
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-serif);
}

/* Forge animations */
@keyframes particleFly {
  0% { opacity: 1; transform: translate(0, 0) scale(1); }
  100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0); }
}

@keyframes forgeGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 200, 50, 0.1); }
  50% { box-shadow: 0 0 40px rgba(255, 200, 50, 0.3); }
}

@keyframes forgePulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes unlockPulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

/* Mobile */
@media (max-width: 640px) {
  button, select, input, .touch-target {
    min-height: 44px;
  }
}

/* PWA safe areas */
@media (display-mode: standalone) {
  body {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }
}

/* iOS Safari fixes */
@supports (-webkit-touch-callout: none) {
  button, [role="button"] {
    -webkit-tap-highlight-color: transparent;
  }
  .overflow-auto, .overflow-y-auto {
    -webkit-overflow-scrolling: touch;
  }
}
```

**Step 8: Create src/App.tsx (minimal placeholder)**

```typescript
export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-5">
      <h1 className="text-center text-3xl font-arabic text-primary">
        مَصْنَعُ الصَّرْف
      </h1>
      <p className="text-center text-sm text-muted-foreground font-sans tracking-widest uppercase mt-1">
        The Sarf Forge
      </p>
    </div>
  );
}
```

**Step 9: Install dependencies and verify the app runs**

Run: `cd /Users/miftah/projects/alqalam-tools && npm install`
Run: `npx turbo build --filter=@arabtools/sarf-forge`

Expected: Build passes. App scaffold is functional.

**Step 10: Commit**

```bash
git add apps/sarf-forge/package.json apps/sarf-forge/vite.config.ts apps/sarf-forge/tsconfig.json apps/sarf-forge/index.html apps/sarf-forge/src/
git commit -m "feat(sarf-forge): scaffold app with TypeScript + Tailwind + Vite"
```

---

### Task 2: Create types and data layer

**Files:**
- Create: `apps/sarf-forge/src/types/index.ts`
- Create: `apps/sarf-forge/src/data/roots.ts`
- Create: `apps/sarf-forge/src/data/patterns.ts`

**Step 1: Create types**

File: `apps/sarf-forge/src/types/index.ts`

```typescript
/** Root type classification matching the conjugation app */
export type VerbType =
  | 'Regular'
  | 'Mithal'
  | 'Ajwaf'
  | 'Naqis'
  | "Mudaa'af"
  | "Mahmooz al-Fa'"
  | "Mahmooz al-'Ayn"
  | 'Mahmooz al-Lam'
  | 'Lafif Maqroon'
  | 'Lafif Mafrooq';

/** Verb form (Roman numeral I-X) */
export type VerbForm = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'X';

/** Difficulty tier for progressive unlocking */
export type Tier = 1 | 2 | 3 | 4;

/** A root available for forging */
export interface ForgeRoot {
  id: string;
  letters: string;       // "ك-ت-ب"
  arabic: string;        // "كتب"
  root: string;          // "ك ت ب" (space-separated, matches conjugation format)
  meaning: string;       // "to write"
  field: string;         // "Writing"
  type: VerbType;
  verbForm: VerbForm;
  pastTense: string;
  presentTense: string;
  tier: Tier;
}

/** A morphological pattern to apply to roots */
export interface ForgePattern {
  id: string;
  display: string;       // "فَاعِلٌ"
  name: string;          // "Active Participle"
  nameAr: string;        // "اسم فاعل"
  desc: string;          // "The one who does"
  tier: Tier;
  color: string;         // hex color for UI
  /** Which key in صرف صغير to extract (if applicable) */
  sarfKey?: string;
  /** Which derivative this maps to */
  derivativeType: 'activeParticiple' | 'passiveParticiple' | 'masdar' | 'pastVerb' | 'presentVerb' | 'placeNoun' | 'instrumentNoun' | 'intensive' | 'formVerb';
}

/** Result of a forge attempt */
export interface ForgeResult {
  word: string;
  meaning: string;
  success: boolean;
  note: string;
  rootId: string;
  patternId: string;
}

/** A discovered word in the collection */
export interface Discovery {
  key: string;           // "rootId+patternId"
  word: string;
  meaning: string;
  root: ForgeRoot;
  pattern: ForgePattern;
  timestamp: number;
}

/** Persisted game state */
export interface GameState {
  discoveries: Discovery[];
  stats: {
    attempts: number;
    found: number;
    failed: number;
  };
  unlockedTiers: Tier[];
}

/** Tier unlock thresholds */
export const TIER_THRESHOLDS: Record<Tier, number> = {
  1: 0,   // Always available
  2: 8,   // Discover 8 words
  3: 20,  // Discover 20 words
  4: 40,  // Discover 40 words
};
```

**Step 2: Create roots data**

File: `apps/sarf-forge/src/data/roots.ts`

Import verbs from the conjugation app and map them into `ForgeRoot` format. Assign tiers based on sarf unit (Unit 1 = tier 1 beginner, Units 2-4 = tier 2, Units 5-7 = tier 3, Units 8-9 = tier 4).

```typescript
import type { ForgeRoot, Tier, VerbType, VerbForm } from '../types';
import { arabicWords } from '@arabtools/conjugation/src/data/arabicRoots';

/** Deduplicate by root letters (keep first occurrence) and map to ForgeRoot */
function buildRoots(): ForgeRoot[] {
  const seen = new Set<string>();
  const roots: ForgeRoot[] = [];

  for (const word of arabicWords) {
    const rootKey = word.root;
    if (seen.has(rootKey)) continue;
    seen.add(rootKey);

    const letters = word.root.split(' ');
    const id = letters.map(l => l).join('');
    const tier = assignTier(word.type, word.verbForm);

    roots.push({
      id,
      letters: letters.join('-'),
      arabic: letters.join(''),
      root: word.root,
      meaning: word.meaning || '',
      field: word.meaning ? capitalizeFirst(word.meaning.replace(/^to /, '')) : '',
      type: word.type as VerbType,
      verbForm: (word.verbForm || 'I') as VerbForm,
      pastTense: word.pastTense,
      presentTense: word.presentTense,
      tier,
    });
  }

  return roots;
}

function assignTier(type: string, verbForm?: string): Tier {
  // Forms II-X are tier 4 (advanced derived forms)
  if (verbForm && verbForm !== 'I') return 4;
  // Sound verbs are tier 1
  if (type === 'Regular') return 1;
  // Hamzated verbs are tier 2
  if (type.startsWith('Mahmooz')) return 2;
  // Mithal (assimilated) are tier 2
  if (type === 'Mithal') return 2;
  // Ajwaf (hollow) and Naqis (defective) are tier 3
  if (type === 'Ajwaf' || type === 'Naqis') return 3;
  // Doubled and Lafif are tier 4
  return 4;
}

function capitalizeFirst(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const ROOTS: ForgeRoot[] = buildRoots();

/** Get roots available at a given set of unlocked tiers */
export function getAvailableRoots(unlockedTiers: Set<number>): ForgeRoot[] {
  return ROOTS.filter(r => unlockedTiers.has(r.tier));
}
```

**Step 3: Create patterns data**

File: `apps/sarf-forge/src/data/patterns.ts`

```typescript
import type { ForgePattern } from '../types';

export const PATTERNS: ForgePattern[] = [
  // Tier 1 — Core derivatives
  {
    id: 'activeParticiple',
    display: 'فَاعِلٌ',
    name: 'Active Participle',
    nameAr: 'اسم فاعل',
    desc: 'The one who does',
    tier: 1,
    color: '#4ECDC4',
    derivativeType: 'activeParticiple',
  },
  {
    id: 'passiveParticiple',
    display: 'مَفْعُولٌ',
    name: 'Passive Participle',
    nameAr: 'اسم مفعول',
    desc: 'The thing done to',
    tier: 1,
    color: '#FF6B6B',
    derivativeType: 'passiveParticiple',
  },
  {
    id: 'masdar',
    display: 'مَصْدَر',
    name: 'Verbal Noun',
    nameAr: 'مصدر',
    desc: 'The act itself',
    tier: 1,
    color: '#FFE66D',
    derivativeType: 'masdar',
  },
  {
    id: 'pastVerb',
    display: 'فَعَلَ',
    name: 'Past Tense',
    nameAr: 'فعل ماضي',
    desc: 'He did it',
    tier: 1,
    color: '#95E1D3',
    derivativeType: 'pastVerb',
  },
  {
    id: 'presentVerb',
    display: 'يَفْعَلُ',
    name: 'Present Tense',
    nameAr: 'فعل مضارع',
    desc: 'He does it',
    tier: 1,
    color: '#A8D8EA',
    derivativeType: 'presentVerb',
  },

  // Tier 2 — Noun patterns
  {
    id: 'placeNoun',
    display: 'مَفْعَلٌ',
    name: 'Place Noun',
    nameAr: 'اسم مكان',
    desc: 'Where it happens',
    tier: 2,
    color: '#78C4D4',
    derivativeType: 'placeNoun',
  },
  {
    id: 'intensive',
    display: 'فَعَّالٌ',
    name: 'Intensive / Professional',
    nameAr: 'صيغة مبالغة',
    desc: 'One who does it a lot',
    tier: 2,
    color: '#F38181',
    derivativeType: 'intensive',
  },

  // Tier 3 — Form derivatives as patterns
  {
    id: 'formII',
    display: 'فَعَّلَ',
    name: 'Form II',
    nameAr: 'باب التفعيل',
    desc: 'Intensive / causative',
    tier: 3,
    color: '#FCBAD3',
    derivativeType: 'formVerb',
    sarfKey: '2',
  },
  {
    id: 'formIII',
    display: 'فَاعَلَ',
    name: 'Form III',
    nameAr: 'باب المفاعلة',
    desc: 'Mutual / reciprocal action',
    tier: 3,
    color: '#C9B1FF',
    derivativeType: 'formVerb',
    sarfKey: '3',
  },
  {
    id: 'formIV',
    display: 'أَفْعَلَ',
    name: 'Form IV',
    nameAr: 'باب الإفعال',
    desc: 'Causative',
    tier: 3,
    color: '#AA96DA',
    derivativeType: 'formVerb',
    sarfKey: '4',
  },
  {
    id: 'formV',
    display: 'تَفَعَّلَ',
    name: 'Form V',
    nameAr: 'باب التفعّل',
    desc: 'Reflexive of II',
    tier: 4,
    color: '#B5EAD7',
    derivativeType: 'formVerb',
    sarfKey: '5',
  },
  {
    id: 'formVI',
    display: 'تَفَاعَلَ',
    name: 'Form VI',
    nameAr: 'باب التفاعل',
    desc: 'Reciprocal / pretense',
    tier: 4,
    color: '#E2F0CB',
    derivativeType: 'formVerb',
    sarfKey: '6',
  },
  {
    id: 'formVII',
    display: 'اِنْفَعَلَ',
    name: 'Form VII',
    nameAr: 'باب الانفعال',
    desc: 'Passive / reflexive',
    tier: 4,
    color: '#FFDAC1',
    derivativeType: 'formVerb',
    sarfKey: '7',
  },
  {
    id: 'formVIII',
    display: 'اِفْتَعَلَ',
    name: 'Form VIII',
    nameAr: 'باب الافتعال',
    desc: 'Reflexive / middle voice',
    tier: 4,
    color: '#FF9AA2',
    derivativeType: 'formVerb',
    sarfKey: '8',
  },
  {
    id: 'formX',
    display: 'اِسْتَفْعَلَ',
    name: 'Form X',
    nameAr: 'باب الاستفعال',
    desc: 'To seek / consider',
    tier: 4,
    color: '#C7CEEA',
    derivativeType: 'formVerb',
    sarfKey: '10',
  },
];

/** Get patterns available at a given set of unlocked tiers */
export function getAvailablePatterns(unlockedTiers: Set<number>): ForgePattern[] {
  return PATTERNS.filter(p => unlockedTiers.has(p.tier));
}
```

**Step 4: Verify types compile**

Run: `cd /Users/miftah/projects/alqalam-tools && npx tsc --noEmit --project apps/sarf-forge/tsconfig.json`

Expected: No type errors.

**Step 5: Commit**

```bash
git add apps/sarf-forge/src/types/ apps/sarf-forge/src/data/
git commit -m "feat(sarf-forge): add types and data layer with 446 verbs from conjugation app"
```

---

### Task 3: Build the forge engine

**Files:**
- Create: `apps/sarf-forge/src/engine/verb-type-map.ts`
- Create: `apps/sarf-forge/src/engine/forge.ts`

**Step 1: Create verb type mapping**

File: `apps/sarf-forge/src/engine/verb-type-map.ts`

```typescript
/** Maps UI verb type names to @arabiyya/sarf internal type keys */
export const VERB_TYPE_MAP: Record<string, string> = {
  'Regular': 'sahih',
  'Mithal': 'mithaal',
  'Ajwaf': 'ajwaf',
  'Naqis': 'naaqis',
  "Mudaa'af": "mudaa'af",
  "Mahmooz al-Fa'": 'sahih',
  "Mahmooz al-'Ayn": 'sahih',
  'Mahmooz al-Lam': 'sahih',
  'Lafif Maqroon': 'naaqis',
  'Lafif Mafrooq': 'mithaal',
};

/** Form I bab detection keys */
export const FORM_ONE_BABS = ['nasara', 'daraba', 'fataha', "sami'a", 'hasiba', 'karuma'] as const;
```

**Step 2: Create the forge engine**

File: `apps/sarf-forge/src/engine/forge.ts`

This is the core engine. Given a ForgeRoot and ForgePattern, it uses @arabiyya/sarf to produce a ForgeResult.

```typescript
import { sarf, sarfHelpers } from '@arabiyya/sarf';
import type { ForgeRoot, ForgePattern, ForgeResult } from '../types';
import { VERB_TYPE_MAP, FORM_ONE_BABS } from './verb-type-map';

/**
 * Forge a word by combining a root with a pattern.
 * Uses @arabiyya/sarf to generate real Arabic words.
 */
export function forgeWord(root: ForgeRoot, pattern: ForgePattern): ForgeResult {
  const baseResult = {
    rootId: root.id,
    patternId: pattern.id,
  };

  try {
    if (pattern.derivativeType === 'formVerb') {
      return forgeFormVerb(root, pattern);
    }

    return forgeDerivative(root, pattern);
  } catch (e) {
    return {
      ...baseResult,
      word: '',
      meaning: '',
      success: false,
      note: getFailureNote(root, pattern, e instanceof Error ? e.message : 'Unknown error'),
    };
  }
}

/** Forge a derivative (participle, masdar, etc.) from the root's own form */
function forgeDerivative(root: ForgeRoot, pattern: ForgePattern): ForgeResult {
  const baseResult = { rootId: root.id, patternId: pattern.id };
  const sarfVerbType = VERB_TYPE_MAP[root.type] || 'sahih';
  const verbTypeData = (sarf as Map<string, unknown>).get(sarfVerbType);

  if (!verbTypeData) {
    return { ...baseResult, word: '', meaning: '', success: false, note: `Verb type "${root.type}" not found in morphological database.` };
  }

  // Get the correct form chapter
  const formNumber = romanToNumber(root.verbForm);
  const chapterKey = formNumber === '1'
    ? detectFormOneBab(root, sarfVerbType, verbTypeData)
    : formNumber;

  const chapter = (verbTypeData as Map<string, { exists?: boolean }>).get(chapterKey);
  if (!chapter || !chapter.exists) {
    return { ...baseResult, word: '', meaning: '', success: false, note: `Form ${root.verbForm} is not available for ${root.type} verbs.` };
  }

  // Replace root letters
  const rootLetters = root.root.split(' ');
  const [fa, ain, lam] = rootLetters;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conjugated = sarfHelpers.replaceRoots(chapter as any, { ف: fa, ع: ain, ل: lam });

  const sarfKabeer = (conjugated as Record<string, unknown>)['صرف كبير'] as Record<string, unknown>;
  const sarfSagheer = (conjugated as Record<string, unknown>)['صرف صغير'] as Record<string, unknown>;
  const maaroof = sarfKabeer?.معروف as Record<string, unknown> | undefined;
  const hasMajhool = sarfKabeer?.مجهول !== null && sarfKabeer?.مجهول !== undefined;

  let word = '';

  switch (pattern.derivativeType) {
    case 'activeParticiple': {
      word = ((sarfSagheer?.معروف as Record<string, string>)?.فاعل) || '';
      break;
    }
    case 'passiveParticiple': {
      if (!hasMajhool) {
        return { ...baseResult, word: '', meaning: '', success: false, note: `This verb (${root.letters}) doesn't have a passive voice, so no passive participle exists. Some verbs are inherently intransitive.` };
      }
      word = ((sarfSagheer?.مجهول as Record<string, string>)?.مفعول) || '';
      break;
    }
    case 'masdar': {
      const masdarValue = sarfSagheer?.مصدر;
      if (typeof masdarValue === 'string') {
        word = masdarValue;
      } else if (Array.isArray(masdarValue)) {
        word = masdarValue[0] || '';
      }
      break;
    }
    case 'pastVerb': {
      const pastForms = maaroof?.ماضي as Record<string, string> | undefined;
      word = pastForms?.['هُوَ'] || pastForms?.['هو'] || '';
      break;
    }
    case 'presentVerb': {
      const presentMarfoo = (maaroof?.مضارع as Record<string, unknown>)?.مرفوع as Record<string, string> | undefined;
      word = presentMarfoo?.['هُوَ'] || presentMarfoo?.['هو'] || '';
      break;
    }
    case 'placeNoun': {
      // Place nouns aren't directly in sarf data — generate from pattern
      const placeNoun = generatePlaceNoun(rootLetters);
      if (placeNoun) {
        word = placeNoun;
      } else {
        return { ...baseResult, word: '', meaning: '', success: false, note: `Place noun (مَفْعَل) pattern not productive for this root. Arabic chose a different word for "the place of ${root.meaning}."` };
      }
      break;
    }
    case 'intensive': {
      // Intensive forms aren't directly in sarf — generate from pattern
      const intensive = generateIntensive(rootLetters);
      if (intensive) {
        word = intensive;
      } else {
        return { ...baseResult, word: '', meaning: '', success: false, note: `Intensive (فَعَّال) pattern not commonly attested for this root.` };
      }
      break;
    }
  }

  if (!word) {
    return { ...baseResult, word: '', meaning: '', success: false, note: getFailureNote(root, pattern, 'not found') };
  }

  const meaning = buildMeaning(root, pattern);

  return {
    ...baseResult,
    word,
    meaning,
    success: true,
    note: buildSuccessNote(root, pattern),
  };
}

/** Forge a verb in a different form (II-X) */
function forgeFormVerb(root: ForgeRoot, pattern: ForgePattern): ForgeResult {
  const baseResult = { rootId: root.id, patternId: pattern.id };
  const sarfVerbType = VERB_TYPE_MAP[root.type] || 'sahih';
  const verbTypeData = (sarf as Map<string, unknown>).get(sarfVerbType);

  if (!verbTypeData) {
    return { ...baseResult, word: '', meaning: '', success: false, note: `Verb type "${root.type}" not found.` };
  }

  const formNumber = pattern.sarfKey || '2';
  const chapter = (verbTypeData as Map<string, { exists?: boolean }>).get(formNumber);

  if (!chapter || !chapter.exists) {
    return {
      ...baseResult,
      word: '', meaning: '', success: false,
      note: `Form ${pattern.name} doesn't exist for ${root.type} (${root.letters}) verbs. Not every root works in every form — this is one of the key constraints of Arabic morphology.`,
    };
  }

  const rootLetters = root.root.split(' ');
  const [fa, ain, lam] = rootLetters;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conjugated = sarfHelpers.replaceRoots(chapter as any, { ف: fa, ع: ain, ل: lam });

  const sarfKabeer = (conjugated as Record<string, unknown>)['صرف كبير'] as Record<string, unknown>;
  const maaroof = sarfKabeer?.معروف as Record<string, unknown> | undefined;
  const pastForms = maaroof?.ماضي as Record<string, string> | undefined;
  const word = pastForms?.['هُوَ'] || pastForms?.['هو'] || '';

  if (!word) {
    return { ...baseResult, word: '', meaning: '', success: false, note: `Could not generate Form ${pattern.name} for ${root.letters}.` };
  }

  return {
    ...baseResult,
    word,
    meaning: `Form ${pattern.name.replace('Form ', '')} of "${root.meaning}"`,
    success: true,
    note: `${pattern.desc}. The root ${root.letters} in ${pattern.name} (${pattern.nameAr}).`,
  };
}

/** Detect the correct Form I bab by matching past/present tense */
function detectFormOneBab(root: ForgeRoot, sarfVerbType: string, verbTypeData: unknown): string {
  const rootLetters = root.root.split(' ');
  if (rootLetters.length < 3) return 'nasara';
  const [fa, ain, lam] = rootLetters;

  for (const bab of FORM_ONE_BABS) {
    try {
      const chapter = (verbTypeData as Map<string, { exists?: boolean }>).get(bab);
      if (!chapter || !chapter.exists) continue;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const conjugated = sarfHelpers.replaceRoots(chapter as any, { ف: fa, ع: ain, ل: lam });
      const sarfKabeer = (conjugated as Record<string, unknown>)['صرف كبير'] as Record<string, unknown>;
      const maaroof = sarfKabeer?.معروف as Record<string, unknown> | undefined;
      const pastForms = maaroof?.ماضي as Record<string, string> | undefined;
      if (!pastForms) continue;

      const presentMarfoo = (maaroof?.مضارع as Record<string, unknown>)?.مرفوع as Record<string, string> | undefined;
      if (!presentMarfoo) continue;

      const huwa = pastForms['هُوَ'] || pastForms['هو'];
      const huwaPresent = presentMarfoo['هُوَ'] || presentMarfoo['هو'];

      if (huwa === root.pastTense && huwaPresent === root.presentTense) return bab;
    } catch {
      continue;
    }
  }

  return 'nasara';
}

/** Convert Roman numeral form to sarf number key */
function romanToNumber(form: string): string {
  const map: Record<string, string> = {
    'I': '1', 'II': '2', 'III': '3', 'IV': '4', 'V': '5',
    'VI': '6', 'VII': '7', 'VIII': '8', 'IX': '9', 'X': '10',
  };
  return map[form] || '1';
}

/** Generate a place noun (مَفْعَل) from root letters */
function generatePlaceNoun(rootLetters: string[]): string | null {
  if (rootLetters.length < 3) return null;
  // مَفْعَل pattern: م + root[0] + ْ + root[1] + َ + root[2]
  return `مَ${rootLetters[0]}ْ${rootLetters[1]}َ${rootLetters[2]}`;
}

/** Generate an intensive form (فَعَّال) from root letters */
function generateIntensive(rootLetters: string[]): string | null {
  if (rootLetters.length < 3) return null;
  // فَعَّال pattern: root[0] + َ + root[1] + َّ + ا + root[2]
  return `${rootLetters[0]}َ${rootLetters[1]}َّا${rootLetters[2]}`;
}

/** Build a meaning string for successful forges */
function buildMeaning(root: ForgeRoot, pattern: ForgePattern): string {
  const base = root.meaning?.replace(/^to /, '') || '';
  switch (pattern.derivativeType) {
    case 'activeParticiple':
      return `One who ${base}s`;
    case 'passiveParticiple':
      return `That which is ${getPassiveParticiple(base)}`;
    case 'masdar':
      return `The act of ${base}ing`;
    case 'pastVerb':
      return `He ${base}${base.endsWith('e') ? 'd' : 'ed'}`;
    case 'presentVerb':
      return `He ${base}s`;
    case 'placeNoun':
      return `Place of ${base}ing`;
    case 'intensive':
      return `One who ${base}s intensely/professionally`;
    default:
      return root.meaning || '';
  }
}

function getPassiveParticiple(base: string): string {
  if (base.endsWith('e')) return base + 'd';
  return base + 'ed';
}

/** Build an educational note for successful forges */
function buildSuccessNote(root: ForgeRoot, pattern: ForgePattern): string {
  const typeNote = root.type !== 'Regular'
    ? ` Note: ${root.letters} is a ${root.type.toLowerCase()} root, so morphological transformations may apply.`
    : '';

  return `${pattern.name} (${pattern.nameAr}) derived from the root ${root.letters} (${root.meaning}).${typeNote}`;
}

/** Build an educational note for failed forges */
function getFailureNote(root: ForgeRoot, pattern: ForgePattern, reason: string): string {
  if (reason.includes('not available')) {
    return `${pattern.name} (${pattern.nameAr}) is not attested for ${root.type} roots like ${root.letters}. Arabic morphology constrains which patterns work with which root types.`;
  }

  if (reason.includes('passive')) {
    return `The root ${root.letters} (${root.meaning}) is intransitive — it doesn't take a direct object, so no passive participle exists.`;
  }

  return `The combination of ${root.letters} + ${pattern.display} doesn't produce a standard word in Arabic. ${pattern.desc} isn't productive for this root — the language chose different patterns to express this concept.`;
}
```

**Step 3: Verify types compile**

Run: `cd /Users/miftah/projects/alqalam-tools && npx tsc --noEmit --project apps/sarf-forge/tsconfig.json`

Expected: No type errors.

**Step 4: Commit**

```bash
git add apps/sarf-forge/src/engine/
git commit -m "feat(sarf-forge): add forge engine using @arabiyya/sarf for live word generation"
```

---

### Task 4: Build the game state hook

**Files:**
- Create: `apps/sarf-forge/src/hooks/useForgeState.ts`

**Step 1: Create the persisted game state hook**

File: `apps/sarf-forge/src/hooks/useForgeState.ts`

```typescript
import { useState, useCallback, useMemo, useEffect } from 'react';
import { usePersistedState } from '@arabtools/core';
import type { ForgeRoot, ForgePattern, ForgeResult, Discovery, GameState, Tier } from '../types';
import { TIER_THRESHOLDS } from '../types';
import { forgeWord } from '../engine/forge';

const INITIAL_STATE: GameState = {
  discoveries: [],
  stats: { attempts: 0, found: 0, failed: 0 },
  unlockedTiers: [1],
};

export function useForgeState() {
  const [gameState, setGameState] = usePersistedState<GameState>(
    'alqalam-sarf-forge-state',
    INITIAL_STATE
  );

  const [selectedRoot, setSelectedRoot] = useState<ForgeRoot | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<ForgePattern | null>(null);
  const [result, setResult] = useState<ForgeResult | null>(null);
  const [isForging, setIsForging] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [showLexicon, setShowLexicon] = useState(false);

  // Check for tier unlocks whenever discoveries change
  useEffect(() => {
    const discoveryCount = gameState.discoveries.length;
    const newTiers: Tier[] = [];

    for (const [tier, threshold] of Object.entries(TIER_THRESHOLDS)) {
      const tierNum = Number(tier) as Tier;
      if (discoveryCount >= threshold && !gameState.unlockedTiers.includes(tierNum)) {
        newTiers.push(tierNum);
      }
    }

    if (newTiers.length > 0) {
      setGameState(prev => ({
        ...prev,
        unlockedTiers: [...prev.unlockedTiers, ...newTiers],
      }));
    }
  }, [gameState.discoveries.length]);

  const unlockedTiersSet = useMemo(
    () => new Set(gameState.unlockedTiers),
    [gameState.unlockedTiers]
  );

  const discoveredKeys = useMemo(
    () => new Set(gameState.discoveries.map(d => d.key)),
    [gameState.discoveries]
  );

  const forge = useCallback(() => {
    if (!selectedRoot || !selectedPattern || isForging) return;

    setIsForging(true);
    setResult(null);

    // Simulate forge delay for dramatic effect
    setTimeout(() => {
      const forgeResult = forgeWord(selectedRoot, selectedPattern);
      setResult(forgeResult);
      setIsForging(false);
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 100);

      const key = `${selectedRoot.id}+${selectedPattern.id}`;

      setGameState(prev => {
        const newStats = {
          attempts: prev.stats.attempts + 1,
          found: prev.stats.found + (forgeResult.success ? 1 : 0),
          failed: prev.stats.failed + (forgeResult.success ? 0 : 1),
        };

        const newDiscoveries = forgeResult.success && !prev.discoveries.find(d => d.key === key)
          ? [...prev.discoveries, {
              key,
              word: forgeResult.word,
              meaning: forgeResult.meaning,
              root: selectedRoot,
              pattern: selectedPattern,
              timestamp: Date.now(),
            }]
          : prev.discoveries;

        return {
          ...prev,
          stats: newStats,
          discoveries: newDiscoveries,
        };
      });
    }, 800);
  }, [selectedRoot, selectedPattern, isForging, setGameState]);

  const selectRoot = useCallback((root: ForgeRoot) => {
    setSelectedRoot(root);
    setResult(null);
  }, []);

  const selectPattern = useCallback((pattern: ForgePattern) => {
    setSelectedPattern(pattern);
    setResult(null);
  }, []);

  const resetGame = useCallback(() => {
    setGameState(INITIAL_STATE);
    setSelectedRoot(null);
    setSelectedPattern(null);
    setResult(null);
  }, [setGameState]);

  return {
    // Selection state
    selectedRoot,
    selectedPattern,
    selectRoot,
    selectPattern,

    // Forge
    forge,
    isForging,
    result,

    // Particles
    showParticles,

    // Game state
    discoveries: gameState.discoveries,
    stats: gameState.stats,
    unlockedTiers: unlockedTiersSet,
    discoveredKeys,

    // Lexicon
    showLexicon,
    setShowLexicon,

    // Reset
    resetGame,
  };
}
```

**Step 2: Verify types compile**

Run: `cd /Users/miftah/projects/alqalam-tools && npx tsc --noEmit --project apps/sarf-forge/tsconfig.json`

Expected: No type errors.

**Step 3: Commit**

```bash
git add apps/sarf-forge/src/hooks/
git commit -m "feat(sarf-forge): add persisted game state hook with tier unlock system"
```

---

### Task 5: Build UI components

**Files:**
- Create: `apps/sarf-forge/src/components/Particles.tsx`
- Create: `apps/sarf-forge/src/components/StatsBar.tsx`
- Create: `apps/sarf-forge/src/components/RootSelector.tsx`
- Create: `apps/sarf-forge/src/components/PatternSelector.tsx`
- Create: `apps/sarf-forge/src/components/ForgeArea.tsx`
- Create: `apps/sarf-forge/src/components/ForgeResult.tsx`
- Create: `apps/sarf-forge/src/components/Lexicon.tsx`

**Step 1: Create Particles component**

File: `apps/sarf-forge/src/components/Particles.tsx`

Convert from prototype's inline-style particle system to Tailwind where possible, keeping CSS custom properties for dynamic values.

```typescript
import { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
  delay: number;
}

const SUCCESS_COLORS = ['#FFD700', '#4ECDC4', '#FFE66D', '#F8B500'];
const FAILURE_COLORS = ['#FF6B6B', '#cc5555', '#994444'];

interface ParticlesProps {
  active: boolean;
  success: boolean;
}

export function Particles({ active, success }: ParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) return;
    const colors = success ? SUCCESS_COLORS : FAILURE_COLORS;
    const count = success ? 20 : 8;

    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 40,
      y: 50 + (Math.random() - 0.5) * 20,
      dx: (Math.random() - 0.5) * 100,
      dy: -Math.random() * 80 - 20,
      size: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.3,
    }));

    setParticles(newParticles);
    const t = setTimeout(() => setParticles([]), 1500);
    return () => clearTimeout(t);
  }, [active, success]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `particleFly 1.2s ease-out ${p.delay}s forwards`,
            opacity: 0,
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
```

**Step 2: Create StatsBar component**

File: `apps/sarf-forge/src/components/StatsBar.tsx`

```typescript
import type { Tier } from '../types';
import { TIER_THRESHOLDS } from '../types';

interface StatsBarProps {
  discovered: number;
  totalPossible: number;
  failed: number;
  unlockedTiers: Set<number>;
  onShowLexicon: () => void;
}

export function StatsBar({ discovered, totalPossible, failed, unlockedTiers, onShowLexicon }: StatsBarProps) {
  // Find next tier to unlock
  const nextTier = ([2, 3, 4] as Tier[]).find(t => !unlockedTiers.has(t));
  const nextThreshold = nextTier ? TIER_THRESHOLDS[nextTier] : null;

  return (
    <div className="flex justify-center gap-4 mt-3.5 flex-wrap">
      <div className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center">
        <div className="text-xl font-bold text-accent">{discovered}</div>
        <div className="text-[10px] text-muted-foreground font-sans uppercase tracking-wide">Discovered</div>
      </div>
      <div className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center">
        <div className="text-xl font-bold text-primary">{totalPossible}</div>
        <div className="text-[10px] text-muted-foreground font-sans uppercase tracking-wide">Total Words</div>
      </div>
      <div className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center">
        <div className="text-xl font-bold text-destructive">{failed}</div>
        <div className="text-[10px] text-muted-foreground font-sans uppercase tracking-wide">Dead Ends</div>
      </div>
      <button
        onClick={onShowLexicon}
        className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center cursor-pointer hover:bg-white/[0.08] transition-colors"
      >
        <div className="text-xl">📖</div>
        <div className="text-[10px] text-muted-foreground font-sans uppercase tracking-wide">Lexicon</div>
      </button>

      {nextTier && nextThreshold && (
        <div className="w-full flex justify-center mt-1">
          <div className="text-xs text-muted-foreground font-sans">
            {discovered}/{nextThreshold} to unlock Tier {nextTier}
          </div>
        </div>
      )}
    </div>
  );
}
```

**Step 3: Create RootSelector component**

File: `apps/sarf-forge/src/components/RootSelector.tsx`

```typescript
import type { ForgeRoot } from '../types';

interface RootSelectorProps {
  roots: ForgeRoot[];
  selectedRoot: ForgeRoot | null;
  onSelect: (root: ForgeRoot) => void;
  hasLockedRoots: boolean;
}

export function RootSelector({ roots, selectedRoot, onSelect, hasLockedRoots }: RootSelectorProps) {
  return (
    <div className="mb-5">
      <h3 className="text-xs uppercase tracking-[0.12em] text-accent mb-2.5 font-sans font-semibold">
        ① Select Root — الجَذْر
      </h3>
      <div className="flex flex-wrap gap-2">
        {roots.map((root) => {
          const isSelected = selectedRoot?.id === root.id;
          const isTier1 = root.tier === 1;

          return (
            <button
              key={root.id}
              onClick={() => onSelect(root)}
              className={`
                px-3.5 py-2.5 rounded-[10px] text-center relative overflow-hidden
                transition-all duration-200 cursor-pointer
                ${isSelected
                  ? isTier1
                    ? 'border-accent/70 bg-accent/10 shadow-[0_0_20px_rgba(78,205,196,0.15)]'
                    : 'border-amber-400/70 bg-amber-400/10 shadow-[0_0_20px_rgba(255,180,50,0.15)]'
                  : isTier1
                    ? 'border-white/[0.08] bg-white/[0.03] hover:border-accent/40 hover:bg-accent/[0.06] hover:-translate-y-0.5'
                    : 'border-amber-400/30 bg-white/[0.03] hover:border-amber-400/50 hover:bg-amber-400/[0.06] hover:-translate-y-0.5'
                }
                border-[1.5px]
              `}
            >
              <div className="font-arabic text-[22px]" dir="rtl">{root.letters}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5 font-sans">
                {root.field}
                {root.type !== 'Regular' && (
                  <span className="text-amber-400 ml-1">⚡{root.type}</span>
                )}
              </div>
            </button>
          );
        })}
        {hasLockedRoots && (
          <div className="px-3.5 py-2.5 rounded-[10px] border-[1.5px] border-dashed border-amber-400/20 bg-amber-400/[0.02] text-center opacity-50 flex items-center gap-2">
            <span className="text-[11px] text-amber-400 font-sans">🔒 More roots at next tier</span>
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 4: Create PatternSelector component**

File: `apps/sarf-forge/src/components/PatternSelector.tsx`

```typescript
import type { ForgePattern } from '../types';

interface PatternSelectorProps {
  patterns: ForgePattern[];
  selectedPattern: ForgePattern | null;
  onSelect: (pattern: ForgePattern) => void;
}

export function PatternSelector({ patterns, selectedPattern, onSelect }: PatternSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-xs uppercase tracking-[0.12em] text-destructive mb-2.5 font-sans font-semibold">
        ② Select Pattern — الوَزْن
      </h3>
      <div className="flex flex-wrap gap-2">
        {patterns.map((pattern) => {
          const isSelected = selectedPattern?.id === pattern.id;

          return (
            <button
              key={pattern.id}
              onClick={() => onSelect(pattern)}
              className={`
                px-3.5 py-2.5 rounded-[10px] text-center
                transition-all duration-200 cursor-pointer
                hover:-translate-y-0.5
                border-[1.5px]
                ${isSelected
                  ? 'shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                  : 'border-white/[0.08] bg-white/[0.03]'
                }
              `}
              style={{
                borderColor: isSelected ? `${pattern.color}99` : undefined,
                background: isSelected ? `${pattern.color}15` : undefined,
              }}
            >
              <div
                className="font-arabic text-xl"
                dir="rtl"
                style={{ color: pattern.color }}
              >
                {pattern.display}
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5 font-sans">
                {pattern.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

**Step 5: Create ForgeArea component**

File: `apps/sarf-forge/src/components/ForgeArea.tsx`

```typescript
import type { ForgeRoot, ForgePattern } from '../types';
import { Particles } from './Particles';

interface ForgeAreaProps {
  selectedRoot: ForgeRoot | null;
  selectedPattern: ForgePattern | null;
  isForging: boolean;
  showParticles: boolean;
  lastSuccess: boolean;
  onForge: () => void;
}

export function ForgeArea({
  selectedRoot,
  selectedPattern,
  isForging,
  showParticles,
  lastSuccess,
  onForge,
}: ForgeAreaProps) {
  const canForge = selectedRoot && selectedPattern && !isForging;

  return (
    <div
      className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 text-center mb-5"
      style={{
        animation: isForging ? 'forgePulse 0.8s ease' : 'forgeGlow 3s ease infinite',
      }}
    >
      <Particles active={showParticles} success={lastSuccess} />

      {/* Selected items display */}
      <div className="flex items-center justify-center gap-5 mb-4">
        <div
          className={`px-5 py-3 rounded-[10px] min-w-[100px] border ${
            selectedRoot
              ? 'bg-accent/10 border-accent/30'
              : 'bg-white/[0.03] border-white/[0.06]'
          }`}
        >
          {selectedRoot ? (
            <div className="font-arabic text-[26px] text-accent" dir="rtl">
              {selectedRoot.letters}
            </div>
          ) : (
            <div className="text-sm text-[#555] font-sans">Root</div>
          )}
        </div>

        <div
          className="text-[28px] font-arabic text-primary"
          style={{ opacity: canForge ? 1 : 0.3 }}
        >
          ×
        </div>

        <div
          className="px-5 py-3 rounded-[10px] min-w-[100px] border"
          style={{
            background: selectedPattern ? `${selectedPattern.color}15` : 'rgba(255,255,255,0.03)',
            borderColor: selectedPattern ? `${selectedPattern.color}50` : 'rgba(255,255,255,0.06)',
          }}
        >
          {selectedPattern ? (
            <div
              className="font-arabic text-[26px]"
              dir="rtl"
              style={{ color: selectedPattern.color }}
            >
              {selectedPattern.display}
            </div>
          ) : (
            <div className="text-sm text-[#555] font-sans">Pattern</div>
          )}
        </div>
      </div>

      {/* Forge button */}
      <button
        disabled={!canForge}
        onClick={onForge}
        className={`
          px-10 py-3.5 rounded-xl text-lg font-arabic font-bold
          transition-all duration-300 relative overflow-hidden border-none
          ${canForge
            ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,200,50,0.3)] active:translate-y-0'
            : 'opacity-30 cursor-not-allowed'
          }
        `}
        style={{
          background: canForge
            ? 'linear-gradient(135deg, #FFD700, #FFA500)'
            : 'rgba(255,255,255,0.05)',
          color: canForge ? '#1a1a2e' : '#555',
        }}
      >
        {isForging ? '⚒ Forging...' : '⚒ Forge Word'}
      </button>
    </div>
  );
}
```

**Step 6: Create ForgeResult component**

File: `apps/sarf-forge/src/components/ForgeResult.tsx`

```typescript
import type { ForgeResult as ForgeResultType, ForgeRoot, ForgePattern } from '../types';

interface ForgeResultProps {
  result: ForgeResultType;
  root: ForgeRoot;
  pattern: ForgePattern;
}

export function ForgeResultDisplay({ result, root, pattern }: ForgeResultProps) {
  return (
    <div
      className={`rounded-2xl p-6 relative border ${
        result.success
          ? 'bg-gradient-to-br from-accent/[0.08] to-primary/[0.05] border-accent/25'
          : 'bg-gradient-to-br from-destructive/[0.08] to-destructive/[0.03] border-destructive/25'
      }`}
      style={{ animation: 'slideUp 0.4s ease' }}
    >
      {/* Badge */}
      <div
        className={`absolute -top-2.5 left-5 px-3 py-0.5 rounded-full text-[11px] font-sans font-semibold tracking-wide uppercase ${
          result.success
            ? 'bg-accent text-background'
            : 'bg-destructive text-white'
        }`}
      >
        {result.success ? '✦ Word Discovered' : '✗ Dead End'}
      </div>

      {result.success ? (
        <div className="text-center">
          <div
            className="font-arabic text-[42px] text-primary my-2"
            dir="rtl"
            style={{ textShadow: '0 0 30px rgba(255, 215, 0, 0.2)' }}
          >
            {result.word}
          </div>
          <div className="text-lg text-foreground my-1 mb-3">{result.meaning}</div>
          <div className="text-sm text-muted-foreground leading-relaxed max-w-[600px] mx-auto px-4 py-3 rounded-lg bg-black/20">
            {result.note}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="font-arabic text-[28px] text-destructive my-2 opacity-60" dir="rtl">
            {root.letters} + {pattern.display}
          </div>
          <div className="text-[15px] text-red-300 my-1 mb-3 italic">
            This combination doesn't produce a standard word
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed max-w-[600px] mx-auto px-4 py-3 rounded-lg bg-black/20 text-left">
            💡 {result.note}
          </div>
        </div>
      )}
    </div>
  );
}
```

**Step 7: Create Lexicon component**

File: `apps/sarf-forge/src/components/Lexicon.tsx`

```typescript
import type { Discovery } from '../types';

interface LexiconProps {
  discoveries: Discovery[];
  totalPossible: number;
  onClose: () => void;
}

export function Lexicon({ discoveries, totalPossible, onClose }: LexiconProps) {
  return (
    <div
      className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-5"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card rounded-2xl p-6 max-w-[500px] w-full max-h-[70vh] overflow-auto border border-white/10">
        <h2 className="font-arabic text-[22px] text-primary mb-4">
          📖 Word Lexicon ({discoveries.length}/{totalPossible})
        </h2>

        {discoveries.length === 0 ? (
          <p className="text-muted-foreground italic">No words discovered yet. Start forging!</p>
        ) : (
          <div className="flex flex-col gap-2">
            {discoveries.map((d) => (
              <div
                key={d.key}
                className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] flex justify-between items-center gap-3"
              >
                <div>
                  <span className="font-arabic text-xl text-primary">{d.word}</span>
                  <span className="text-sm text-muted-foreground ml-2 font-sans"> — {d.meaning}</span>
                </div>
                <div className="text-[11px] text-[#666] whitespace-nowrap font-sans">
                  {d.root.letters} + {d.pattern.display}
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 px-5 py-2 border border-white/20 rounded-lg bg-transparent text-foreground cursor-pointer font-sans hover:bg-white/[0.05] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
```

**Step 8: Verify types compile**

Run: `cd /Users/miftah/projects/alqalam-tools && npx tsc --noEmit --project apps/sarf-forge/tsconfig.json`

Expected: No type errors.

**Step 9: Commit**

```bash
git add apps/sarf-forge/src/components/
git commit -m "feat(sarf-forge): add UI components (root/pattern selectors, forge area, lexicon)"
```

---

### Task 6: Wire up App.tsx and verify the full app works

**Files:**
- Modify: `apps/sarf-forge/src/App.tsx`

**Step 1: Implement App.tsx**

Replace the placeholder with the full game layout wiring all components together.

```typescript
import { useMemo } from 'react';
import { useForgeState } from './hooks/useForgeState';
import { getAvailableRoots } from './data/roots';
import { getAvailablePatterns, PATTERNS } from './data/patterns';
import { ROOTS } from './data/roots';
import { StatsBar } from './components/StatsBar';
import { RootSelector } from './components/RootSelector';
import { PatternSelector } from './components/PatternSelector';
import { ForgeArea } from './components/ForgeArea';
import { ForgeResultDisplay } from './components/ForgeResult';
import { Lexicon } from './components/Lexicon';

export default function App() {
  const {
    selectedRoot,
    selectedPattern,
    selectRoot,
    selectPattern,
    forge,
    isForging,
    result,
    showParticles,
    discoveries,
    stats,
    unlockedTiers,
    showLexicon,
    setShowLexicon,
  } = useForgeState();

  const availableRoots = useMemo(
    () => getAvailableRoots(unlockedTiers),
    [unlockedTiers]
  );

  const availablePatterns = useMemo(
    () => getAvailablePatterns(unlockedTiers),
    [unlockedTiers]
  );

  const hasLockedRoots = availableRoots.length < ROOTS.length;
  const totalPossible = ROOTS.length * PATTERNS.length;

  // Determine last forge success for particle color
  const lastSuccess = result?.success ?? false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#121225] to-[#0d1117] text-foreground font-serif p-5 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Header */}
      <div className="text-center mb-7 relative z-[1]">
        <h1
          className="text-[32px] font-arabic font-bold m-0 tracking-[0.02em]"
          style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500, #FFD700)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 4s linear infinite',
          }}
        >
          مَصْنَعُ الصَّرْف
        </h1>
        <p className="text-sm text-muted-foreground mt-1 tracking-[0.1em] uppercase font-sans">
          The Sarf Forge — Craft Words from Roots & Patterns
        </p>

        <StatsBar
          discovered={discoveries.length}
          totalPossible={totalPossible}
          failed={stats.failed}
          unlockedTiers={unlockedTiers}
          onShowLexicon={() => setShowLexicon(true)}
        />

        {/* Tier unlock notification */}
        {unlockedTiers.size > 1 && stats.attempts > 0 && stats.attempts <= 12 && (
          <div
            className="mt-2.5 px-4 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/30 inline-block text-sm text-amber-400 font-sans"
            style={{ animation: 'unlockPulse 2s ease infinite' }}
          >
            ✦ Tier {Math.max(...Array.from(unlockedTiers))} Unlocked — New roots and patterns available
          </div>
        )}
      </div>

      {/* Lexicon overlay */}
      {showLexicon && (
        <Lexicon
          discoveries={discoveries}
          totalPossible={totalPossible}
          onClose={() => setShowLexicon(false)}
        />
      )}

      {/* Main layout */}
      <div className="max-w-[900px] mx-auto relative z-[1]">
        <RootSelector
          roots={availableRoots}
          selectedRoot={selectedRoot}
          onSelect={selectRoot}
          hasLockedRoots={hasLockedRoots}
        />

        <PatternSelector
          patterns={availablePatterns}
          selectedPattern={selectedPattern}
          onSelect={selectPattern}
        />

        <ForgeArea
          selectedRoot={selectedRoot}
          selectedPattern={selectedPattern}
          isForging={isForging}
          showParticles={showParticles}
          lastSuccess={lastSuccess}
          onForge={forge}
        />

        {/* Result */}
        {result && selectedRoot && selectedPattern && (
          <ForgeResultDisplay
            result={result}
            root={selectedRoot}
            pattern={selectedPattern}
          />
        )}
      </div>
    </div>
  );
}
```

**Step 2: Build the app**

Run: `cd /Users/miftah/projects/alqalam-tools && npx turbo build --filter=@arabtools/sarf-forge`

Expected: Build passes.

**Step 3: Run the app in dev mode and visually verify**

Run: `npm --filter @arabtools/sarf-forge dev`

Verify:
- App loads at http://localhost:5197
- Roots grid shows tier 1 roots (Regular verbs)
- Patterns grid shows tier 1 patterns
- Selecting a root + pattern and clicking "Forge" produces a real Arabic word
- Success/failure display works with notes
- Particle effects fire
- Stats update
- Lexicon opens and shows discovered words
- After 8 discoveries, tier 2 unlocks with new roots/patterns

**Step 4: Commit**

```bash
git add apps/sarf-forge/src/App.tsx
git commit -m "feat(sarf-forge): wire up full game with 446 verbs, forge engine, and tier progression"
```

---

### Task 7: Fix build issues, polish, and final verification

**Step 1: Run TypeScript check**

Run: `cd /Users/miftah/projects/alqalam-tools && npx tsc --noEmit --project apps/sarf-forge/tsconfig.json`

Fix any type errors.

**Step 2: Run full build**

Run: `cd /Users/miftah/projects/alqalam-tools && npx turbo build --filter=@arabtools/sarf-forge`

Fix any build errors (missing imports, unused variables, etc.).

**Step 3: Verify dev mode works end-to-end**

Run: `npm --filter @arabtools/sarf-forge dev`

Test:
- [ ] App loads without errors
- [ ] Root selection works
- [ ] Pattern selection works
- [ ] Forge button generates real Arabic words via @arabiyya/sarf
- [ ] Failed combinations show educational explanations
- [ ] Discoveries persist across page refreshes (localStorage)
- [ ] Tier progression unlocks new roots/patterns
- [ ] Lexicon shows all discoveries
- [ ] Stats are accurate
- [ ] Animations work (particles, forge glow, slide up)
- [ ] Mobile responsive

**Step 4: Final commit**

```bash
git add -A apps/sarf-forge/
git commit -m "feat(sarf-forge): productionize with real verb data, forge engine, and full UI"
```
