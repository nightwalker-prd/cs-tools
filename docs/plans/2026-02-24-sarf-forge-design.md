# Sarf Forge — Productionization Design

**Date:** 2026-02-24
**Status:** Approved

## Overview

Productionize sarf-forge from a 46.5KB JSX prototype (12 roots, 10 patterns, 120 hardcoded combos) into a full monorepo app powered by real verb data from the conjugation app (446 verbs) and the @arabiyya/sarf morphological engine.

## Core Mechanic (Preserved)

Select root → select pattern → forge → discover word or learn why it fails. Collection system, tier progression, particle effects, stats tracking all preserved.

## Key Changes

### 1. Data Layer: Hardcoded → Live Morphological Engine

- **Engine:** `@arabiyya/sarf` v6.1.0 (already in repo) generates real Arabic words from root + form/pattern
- **Roots:** Import from conjugation app's `arabicRoots.ts` (446 verbs with type metadata)
- **Derivatives:** masdar-trainer's entries provide ism fa'il, ism maf'ul, masdar patterns
- **Failed combos:** Engine detects failure reason (form doesn't exist for verb type, no passive, etc.) and generates explanations by morphological category

### 2. Root Inventory: 12 → 446 (Tiered)

| Tier | Level | Source | Roots |
|------|-------|--------|-------|
| 1 | Beginner | Sarf Unit 1 | ~50 Regular/sahih |
| 2 | Intermediate | Units 2-4 | ~80 Hamzated, Mithal |
| 3 | Intermediate+ | Units 5-7 | ~80 Ajwaf, Naqis |
| 4 | Advanced | Units 8-9 | ~50 Mudaa'af, Lafif |
| 5 | All | Remaining | Forms II-X derived |

Unlock tiers by discovering enough words in previous tier.

### 3. Pattern Inventory: 10 → ~20

- Active participle (اسم فاعل): فَاعِل for Form I, مُفَعِّل for II, etc.
- Passive participle (اسم مفعول): مَفْعُول for Form I, مُفَعَّل for II, etc.
- Masdar (verbal noun): varies by form
- Place/time noun (اسم مكان/زمان): مَفْعَل، مَفْعِل
- Instrument noun (اسم آلة): مِفْعَال، مِفْعَل، مِفْعَلَة
- Intensive (صيغة مبالغة): فَعَّال، فَعُول، فَعِيل
- Verb forms II-X as unlockable pattern "upgrades"

### 4. Full Monorepo Conversion

- TypeScript strict mode
- Tailwind CSS 4 with theme (navy #1a3150, gold #c5a253, parchment #FAF7F2)
- @arabtools/ui components (Card, Button, Badge, Tabs, Dialog)
- @arabtools/core hooks (usePersistedState)
- PWA support, Amiri font, RTL

### 5. Game Features

- Forge animation with particle effects
- Stats: attempts, discovered, dead ends, completion %
- Lexicon: full collection with filtering by root/pattern/tier
- Root mastery tracking
- Pattern mastery tracking
- Progress saved with `alqalam-sarf-forge-` localStorage prefix

## Architecture

```
apps/sarf-forge/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── data/
│   │   ├── roots.ts               (imports from conjugation, maps to forge format)
│   │   └── patterns.ts            (derivative pattern definitions)
│   ├── engine/
│   │   ├── forge.ts               (root + pattern → word via @arabiyya/sarf)
│   │   ├── verb-type-map.ts       (conjugation type → sarf type mapping)
│   │   └── failure-explanations.ts
│   ├── components/
│   │   ├── RootSelector.tsx
│   │   ├── PatternSelector.tsx
│   │   ├── ForgeButton.tsx
│   │   ├── ForgeResult.tsx
│   │   ├── Lexicon.tsx
│   │   ├── StatsBar.tsx
│   │   └── TierProgress.tsx
│   ├── hooks/
│   │   └── useForgeState.ts
│   └── types/
│       └── index.ts
```

## Not In Scope

- Deck-building card game variant
- Chain derivation trees
- Pattern prediction challenges
- Quranic usage overlay
- Multiplayer/leaderboards
