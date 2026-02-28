# Sarf Navigator Agent Notes

## Scope
- Applies to files under `apps/sarf-navigator/`; this file takes precedence over root guidance for local decisions.

## Code Style
- Use `@/*` for app-local imports where existing files do so (see [../tsconfig.json](../tsconfig.json)).
- Keep app shell with `StrictMode` + shared `ErrorBoundary` from [../src/main.tsx](../src/main.tsx).

## Architecture
- Navigation uses hash-based routing in [../src/hooks/useHashRouter.ts](../src/hooks/useHashRouter.ts); preserve URL-hash behavior.
- Topic content is source-of-truth in `src/data/topics/*` with mapping in [../src/data/topics/index.ts](../src/data/topics/index.ts).
- Markdown rendering goes through [../src/components/ContentRenderer.tsx](../src/components/ContentRenderer.tsx) with Arabic detection and component overrides.

## Build and Test
- Dev: `pnpm --filter @arabtools/sarf-navigator dev`
- Build: `pnpm --filter @arabtools/sarf-navigator build`
- Typecheck: `pnpm --filter @arabtools/sarf-navigator typecheck`

## Conventions
- Preserve visited-page persistence key `arabtools-sarf-visited` in [../src/components/SarfNavigator.tsx](../src/components/SarfNavigator.tsx).
- Keep markdown bundle chunking behavior in [../vite.config.ts](../vite.config.ts).
- Maintain Arabic rendering rules (`dir="rtl"`, `.font-arabic`) in content components when touching markdown/UI output.
