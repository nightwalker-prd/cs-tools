# CS Tools

A monorepo of interactive Computer Science learning tools built with React, TypeScript, and Vite.

## Apps

| App | Description | Port |
|-----|-------------|------|
| `hub` | Central dashboard with global stats | 5170 |
| `algo-viz` | Step-by-step algorithm visualizer | 5173 |
| `dsa-drills` | SRS-backed DSA flashcard drills | 5174 |
| `system-design` | Interactive system design reference | 5175 |
| `complexity-atlas` | Big-O reference & practice | 5176 |

## Packages

| Package | Description |
|---------|-------------|
| `@cstools/ui` | Shared shadcn/ui + CS-specific components |
| `@cstools/core` | Hooks, utils, and types |
| `@cstools/styles` | Tailwind preset and global styles |
| `@cstools/srs` | Spaced Repetition System (FSRS) |
| `@cstools/analytics` | Error tracking & analytics |
| `@cstools/gamification` | XP, achievements, streaks |
| `@cstools/data` | CS content (algorithms, DS, systems) |
| `@cstools/exercises` | Exercise definitions & types |

## Getting Started

```bash
pnpm install
pnpm dev
pnpm --filter @cstools/algo-viz dev
```

## Tech Stack

- React 19 + Vite 6 + TypeScript 5.7 (strict)
- Tailwind CSS 4.0 + custom dark theme preset
- Radix UI (shadcn/ui) + Lucide icons
- Turborepo for monorepo orchestration

## Theme

Dark developer aesthetic (GitHub-dark inspired):
- **Primary**: `#0D1117`
- **Accent**: `#58A6FF`
- **Fonts**: JetBrains Mono (code), Inter (body/headings)
