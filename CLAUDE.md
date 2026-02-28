# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

**arabtools** is a Turborepo monorepo containing 7 standalone Arabic language learning tools with 3 shared packages. Each app can be deployed independently.

## Tech Stack

- **Monorepo**: Turborepo 2.3 + pnpm workspaces
- **Framework**: React 19 + Vite 6.0
- **Language**: TypeScript 5.7 (strict)
- **Styling**: Tailwind CSS 4.0 + custom preset
- **UI**: Radix UI (shadcn/ui pattern) + Lucide icons
- **Arabic Conjugation**: @arabiyya/sarf 6.1.0

## Development Commands

```bash
# Install dependencies
pnpm install

# Run all apps
pnpm dev

# Run specific app
pnpm --filter @arabtools/hans-wehr dev
pnpm --filter @arabtools/sarf-charts dev
pnpm --filter @arabtools/tarkeeb dev
pnpm --filter @arabtools/conjugation dev

# Build all
pnpm build

# TypeScript check all packages
pnpm typecheck

# Lint all
pnpm lint

# Clean build artifacts
pnpm clean
```

## Architecture

### Apps (7)
| App | Port | Purpose |
|-----|------|---------|
| hans-wehr | 5173 | Arabic-English dictionary (28 JSON files, lazy-loaded by letter) |
| sarf-charts | 5174 | Verb conjugation tables (Forms I-X, auto verb-type detection) |
| tarkeeb | 5175 | Grammar analysis (30+ labels, student/expert modes, TTS) |
| sarf-tool | 5176 | Morphology analysis (word patterns, root analysis) |
| conjugation | 5177 | Practice drills (446 preset verbs, 3-layer validation, custom word lists) |
| nation-test | — | Paul Nation vocabulary testing (VST, VLT, Yes/No, Productive) |

### Shared Packages (3)
| Package | Contents |
|---------|----------|
| `@arabtools/ui` | 15 shadcn/ui components (Card, Button, Dialog, Table, Tabs, etc.) |
| `@arabtools/core` | Hooks: `useSpeechSynthesis` (Arabic TTS), `usePersistedState` (localStorage). Utils: Arabic text (diacritics, normalization, sun/moon letters), Fisher-Yates shuffle. Types: exercises, dictionary. |
| `@arabtools/styles` | Tailwind preset with theme colors, fonts, animations |

### Theme Colors
- Navy: `#1a3150` (primary/lapis)
- Gold: `#c5a253` (accent)
- Parchment: `#FAF7F2` (light), `#F5EDE3` (warm), `#E8DFD4` (dark)

### Fonts
- Sans: Open Sans
- Serif: EB Garamond
- Arabic: Amiri

### State Management
- React hooks + localStorage (no Redux/Zustand/Context)
- `usePersistedState` hook for type-safe localStorage
- All keys prefixed with `arabtools-`

### Data Loading
- **Hans Wehr**: 28 JSON files lazy-loaded per letter from `public/data/hans-wehr/`
- **Exercises**: Bundled as TypeScript data files, compiled at build time
- **Course Viewer**: YouTube playlist URLs + external PDF links
- No backend — all apps are fully static

### CI/CD
- Cloudflare Pages deployment workflow configured

## Key Conventions

- Each app builds with `tsc -b && vite build` → `dist/` output
- Arabic text: always `dir="rtl"`, Amiri font
- Diacritics removal: `removeDiacritics()` from `@arabtools/core`
- Use Fisher-Yates shuffle (never `Math.random().sort`)
- Import shared components: `import { Button } from '@arabtools/ui'`

## Portfolio Context

This is one of 12 projects in `/Users/miftah/projects/`. Full portfolio at `/Users/miftah/projects/PORTFOLIO.md`.

### Related Projects
| Project | Relationship |
|---------|-------------|
| **Alqalaminstituteplatform** | Parent platform (32.1 MB). These tools were extracted from it. Shares @arabiyya/sarf, theme, `arabtools-` localStorage prefix. |
| **fstu** | FSTU curriculum content. Video lessons and PDF textbook URLs preserved in `docs/course-viewer-urls.md`. |
| **course-platform** | Earlier version of fstu. Same Nahw curriculum, older stack (React 18, Vite 5). |
| **wazn-trainer** | Standalone verb pattern drills. Covers Forms I-X also in `conjugation` app. |
| **life-os** | Has 100+ Arabic grammar games sharing educational patterns. |
| **utils** | PDF processing tools. Feeds extracted content into fstu. |
