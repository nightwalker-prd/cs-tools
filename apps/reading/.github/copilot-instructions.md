# Reading App Agent Notes

## Scope
- Applies to files under `apps/reading/`; this file takes precedence over root guidance for local decisions.

## Code Style
- Keep React root pattern with `StrictMode` + shared `ErrorBoundary` in [../src/main.tsx](../src/main.tsx).
- Use shared Arabic utilities/hooks from `@arabtools/core` (examples in [../src/components/ReadingTool.tsx](../src/components/ReadingTool.tsx)).

## Architecture
- Reading dataset is assembled via exports in [../src/data/reading/index.ts](../src/data/reading/index.ts).
- Word-by-word data is intentionally huge and lazy-loaded; keep dynamic import pattern in [../src/components/ReadingTool.tsx](../src/components/ReadingTool.tsx) and avoid eager imports from `wordByWord.ts`.
- TTS behavior is implemented through `useSpeechSynthesis`; preserve stop/reset flows on text changes.

## Build and Test
- Dev: `pnpm --filter @arabtools/reading dev`
- Build: `pnpm --filter @arabtools/reading build`
- Typecheck: `pnpm --filter @arabtools/reading typecheck`

## Conventions
- Keep manual chunking for large reading data in [../vite.config.ts](../vite.config.ts) to protect initial load.
- Maintain RTL + Amiri typography where Arabic text is rendered in reading views.
- If changing reading data modules, avoid introducing circular imports in `src/data/reading/*`.
