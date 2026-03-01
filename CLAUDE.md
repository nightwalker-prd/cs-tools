# CLAUDE.md

## Project Overview

**cstools** is a Turborepo monorepo containing standalone Computer Science learning tools with shared packages. Each app can be deployed independently.

## Tech Stack

- **Monorepo**: Turborepo 2.3 + pnpm workspaces
- **Framework**: React 19 + Vite 6.0
- **Language**: TypeScript 5.7 (strict)
- **Styling**: Tailwind CSS 4.0 + custom preset
- **UI**: Radix UI (shadcn/ui pattern) + Lucide icons

## Development Commands

```bash
pnpm install
pnpm dev                              # Run all apps
pnpm --filter @cstools/algo-viz dev   # Run specific app
pnpm build                            # Build all
pnpm typecheck                        # TypeScript check
pnpm lint                             # Lint all
pnpm clean                            # Clean build artifacts
pnpm test                             # Run tests
```

## Architecture

### Apps
| App | Port | Purpose |
|-----|------|---------|
| hub | 5170 | Central dashboard with global stats |
| algo-viz | 5173 | Step-by-step algorithm visualizer |
| dsa-drills | 5174 | SRS-backed DSA flashcards & drills |
| system-design | 5175 | Interactive system design reference |
| complexity-atlas | 5176 | Big-O reference & practice |
| ddia | 5177 | DDIA book concept explorer with quizzes |
| networking | 5178 | Full-stack networking topic explorer |
| leetcode-guide | 5179 | LeetCode problem-solving patterns guide |
| databases | 5180 | Database concepts explorer with quizzes |
| os | 5181 | Operating systems concepts explorer with quizzes |
| design-patterns | 5182 | Software design patterns explorer with quizzes |
| devops | 5183 | DevOps & CI/CD concepts explorer with quizzes |
| security | 5184 | Security & cryptography explorer with quizzes |
| ml | 5185 | Machine learning concepts explorer with quizzes |
| data-science | 5186 | Data science & analytics explorer with quizzes |
| discrete-math | 5187 | Discrete mathematics explorer with quizzes |
| distributed-systems | 5188 | Distributed systems concepts explorer with quizzes |
| functional-programming | 5189 | Functional programming concepts explorer with quizzes |
| compilers | 5190 | Compilers & DSLs explorer with quizzes |
| dev-experience | 5191 | Developer experience & CLI mastery explorer with quizzes |
| systems-programming | 5192 | Systems programming concepts explorer with quizzes |
| software-engineering | 5193 | Software engineering practices explorer with quizzes |
| computer-architecture | 5194 | Computer architecture concepts explorer with quizzes |
| automata | 5195 | Automata & formal languages explorer with quizzes |
| programming-languages | 5196 | Programming language theory explorer with quizzes |
| computer-graphics | 5197 | Computer graphics concepts explorer with quizzes |
| concurrency | 5198 | Concurrency & parallelism explorer with quizzes |
| information-theory | 5199 | Information theory & coding explorer with quizzes |
| numerical-methods | 5200 | Numerical methods & linear algebra explorer with quizzes |
| api-design | 5201 | API design & protocols explorer with quizzes |
| media-streaming | 5202 | Media streaming concepts explorer with quizzes |
| algorithm-analysis | 5203 | Algorithm analysis concepts explorer with quizzes |

### Shared Packages (8)
| Package | Contents |
|---------|----------|
| `@cstools/ui` | shadcn/ui components + CS-specific (CodeBlock, TreeView, etc.) |
| `@cstools/core` | Hooks: `usePersistedState`, `useTimer`, `useKeyboardShortcuts`. Utils: shuffle, complexity, algorithm helpers. |
| `@cstools/styles` | Tailwind preset with dark developer theme |
| `@cstools/srs` | Spaced Repetition System (FSRS algorithm) with CS prerequisite graph |
| `@cstools/analytics` | Error tracking, blind spot detection, retention forecasting |
| `@cstools/gamification` | XP, achievements, streaks, daily challenges |
| `@cstools/data` | Algorithms, data structures, systems concepts |
| `@cstools/exercises` | CS exercise definitions (trace-output, complexity-match, code-fix, etc.) |

### Theme
- Dark developer aesthetic (GitHub-dark inspired)
- Primary: `#0D1117`, Accent: `#58A6FF`, Success: `#3FB950`
- Fonts: JetBrains Mono (code), Inter (body/headings)

### State Management
- React hooks + localStorage (no Redux/Zustand)
- `usePersistedState` hook for type-safe localStorage
- All keys prefixed with `cstools-`

## Key Conventions

- Each app builds with `tsc -b && vite build` -> `dist/` output
- Use Fisher-Yates shuffle (never `Math.random().sort`)
- Import shared: `import { Button } from '@cstools/ui'`
- CS pillars: `dsa`, `systems`, `engineering`, `theory`
