# Nahw Atlas Agent Notes

## Scope
- Applies to files under `apps/nahw-atlas/`; this file takes precedence over root guidance for local decisions.

## Code Style
- Use `@/*` imports for app-local modules (configured in [../tsconfig.json](../tsconfig.json) and [../vite.config.ts](../vite.config.ts)).
- Keep React entry structure consistent with `StrictMode` + shared `ErrorBoundary` in [../src/main.tsx](../src/main.tsx).

## Architecture
- Diagram domain data lives in `src/data/*-diagram.ts` and `src/data/domains.ts`; search/filter utilities are in [../src/lib/node-matcher.ts](../src/lib/node-matcher.ts).
- Mermaid loading must go through [../src/lib/mermaid-init.ts](../src/lib/mermaid-init.ts) instead of direct global initialization.
- Keep progress logic in [../src/hooks/useProgress.ts](../src/hooks/useProgress.ts); avoid duplicating persistence logic in components.

## Build and Test
- Dev: `pnpm --filter @arabtools/nahw-atlas dev`
- Build: `pnpm --filter @arabtools/nahw-atlas build`
- Typecheck: `pnpm --filter @arabtools/nahw-atlas typecheck`

## Conventions
- Preserve manual chunking for mermaid/dagre graph stack in [../vite.config.ts](../vite.config.ts).
- Existing progress storage key is `nahw-atlas-progress`; if changing it, include migration/backward-compat handling.
- Keep RTL/Arabic typography behavior in UI elements where Arabic text appears.
