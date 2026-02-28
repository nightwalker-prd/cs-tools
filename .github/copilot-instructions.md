# Project Guidelines

## Code Style
- Stack: React 19 + TypeScript strict + Vite + Tailwind (`tsconfig.json`, app `vite.config.ts`, app `tailwind.config.ts`).
- Keep TypeScript warnings clean: `noUnusedLocals` and `noUnusedParameters` are enabled in [tsconfig.json](tsconfig.json).
- Many newer apps use `@/*` path aliases mapped to `src/*`; keep imports consistent with each app’s `tsconfig.json` and `vite.config.ts` (examples: [apps/nahw-atlas/tsconfig.json](apps/nahw-atlas/tsconfig.json), [apps/sarf-navigator/vite.config.ts](apps/sarf-navigator/vite.config.ts)).
- Reuse shared packages instead of local duplication:
  - UI from `@arabtools/ui` (see [packages/ui/src/index.ts](packages/ui/src/index.ts)).
  - Hooks/utils/types from `@arabtools/core` (see [packages/core/src/index.ts](packages/core/src/index.ts)).
- Arabic UI must preserve RTL and Arabic typography patterns used in apps (examples: [apps/hans-wehr/src/App.tsx](apps/hans-wehr/src/App.tsx), [apps/sarf-charts/src/App.tsx](apps/sarf-charts/src/App.tsx)).

## Architecture
- Monorepo layout: apps in `apps/*`, shared packages in `packages/*` ([pnpm-workspace.yaml](pnpm-workspace.yaml)).
- Task orchestration uses Turborepo; follow existing task graph and package boundaries ([turbo.json](turbo.json)).
- Shared responsibilities:
  - `@arabtools/core`: hooks (`usePersistedState`, speech), Arabic utils, shuffle, types.
  - `@arabtools/ui`: shadcn/Radix-style components + `ErrorBoundary`.
  - `@arabtools/styles`: Tailwind preset and globals.
- Data is frontend/static-first; avoid introducing backend assumptions. Example lazy JSON loading in [apps/hans-wehr/src/dataLoader.ts](apps/hans-wehr/src/dataLoader.ts).
- Some apps intentionally split heavy client bundles with manual chunks; preserve those boundaries when adding dependencies (examples: [apps/reading/vite.config.ts](apps/reading/vite.config.ts), [apps/nahw-atlas/vite.config.ts](apps/nahw-atlas/vite.config.ts), [apps/sarf-navigator/vite.config.ts](apps/sarf-navigator/vite.config.ts)).

## Build and Test
- Install: `pnpm install`
- Root workflows:
  - `pnpm dev`
  - `pnpm build`
  - `pnpm typecheck`
  - `pnpm lint`
  - `pnpm test` / `pnpm test:watch`
- App-scoped workflows (preferred for focused changes):
  - `pnpm --filter @arabtools/<app-name> dev`
  - `pnpm --filter @arabtools/<app-name> build`
- Useful targets for current apps:
  - `pnpm --filter @arabtools/nahw-atlas build`
  - `pnpm --filter @arabtools/sarf-navigator build`
  - `pnpm --filter @arabtools/reading build`
- For TypeScript changes, run at minimum `pnpm --filter @arabtools/<app-name> build`; for cross-package changes, run `pnpm build`.

## Project Conventions
- localStorage keys must use `arabtools-` prefix via `usePersistedState` ([packages/core/src/hooks/usePersistedState.ts](packages/core/src/hooks/usePersistedState.ts)).
- If touching legacy persisted keys without the prefix, preserve backward compatibility or migrate safely (example legacy key: [apps/nahw-atlas/src/hooks/useProgress.ts](apps/nahw-atlas/src/hooks/useProgress.ts)).
- Arabic matching/normalization should use shared utils (`removeDiacritics`, `normalizeArabic`) instead of ad-hoc logic ([packages/core/src/utils/arabic.ts](packages/core/src/utils/arabic.ts)).
- Randomization should use shared Fisher–Yates `shuffle` util, not `array.sort(() => Math.random() - 0.5)` ([packages/core/src/utils/shuffle.ts](packages/core/src/utils/shuffle.ts)).
- Keep app independence: each app should still build/deploy standalone (`dist/` outputs, matrix deployment in [.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

## Integration Points
- Arabic conjugation logic uses `@arabiyya/sarf` in morphology/conjugation apps.
- Course content integrates external resources (YouTube embeds, PDF links) in `course-viewer` data/components (examples in [apps/course-viewer/src/data/courses](apps/course-viewer/src/data/courses), [apps/course-viewer/src/components/VideoOverlay.tsx](apps/course-viewer/src/components/VideoOverlay.tsx)).
- `nahw-atlas` integrates Mermaid diagrams through a lazy init wrapper; keep diagram loading patterns centralized ([apps/nahw-atlas/src/lib/mermaid-init.ts](apps/nahw-atlas/src/lib/mermaid-init.ts)).
- `sarf-navigator` integrates Markdown rendering via `react-markdown` + `remark-gfm` with Arabic-aware component overrides ([apps/sarf-navigator/src/components/ContentRenderer.tsx](apps/sarf-navigator/src/components/ContentRenderer.tsx)).
- PWA behavior is configured per app with `vite-plugin-pwa` (example: [apps/hans-wehr/vite.config.ts](apps/hans-wehr/vite.config.ts)).

## Security
- This repo is static frontend-only; no built-in auth/backend layer is present.
- Do not commit secrets; deployment credentials are provided via GitHub Secrets in CI ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)).
- Treat browser persistence and external embeds as sensitive surfaces when changing data handling or iframe/resource loading.
