# Arab Tools

A Turborepo monorepo containing 5 standalone Arabic learning tools extracted from the Al Qalam Institute platform.

## Apps

| App | Description | Port |
|-----|-------------|------|
| `hans-wehr` | Hans Wehr Arabic-English Dictionary | 5173 |
| `sarf-charts` | Arabic Verb Conjugation Charts (Forms I-X) | 5174 |
| `tarkeeb` | Tarkeeb Grammar Analysis Tool | 5175 |
| `sarf-tool` | Sarf Morphology Analysis Tool | 5176 |
| `conjugation` | Conjugation Practice Drills | 5177 |

## Packages

| Package | Description |
|---------|-------------|
| `@arabtools/ui` | Shared shadcn/ui components (15 components) |
| `@arabtools/core` | Shared hooks, utils, and types |
| `@arabtools/styles` | Tailwind preset and global styles |

## Getting Started

```bash
# Install dependencies
pnpm install

# Run all apps in development
pnpm dev

# Run a specific app
pnpm --filter @arabtools/hans-wehr dev

# Build all apps
pnpm build

# Build a specific app
pnpm --filter @arabtools/sarf-charts build
```

## Architecture

```
arabtools/
├── turbo.json              # Turborepo configuration
├── pnpm-workspace.yaml     # pnpm workspace config
├── packages/
│   ├── ui/                 # @arabtools/ui - Shared UI components
│   │   └── src/
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── select.tsx
│   │       ├── tabs.tsx
│   │       ├── table.tsx
│   │       └── ...
│   ├── core/               # @arabtools/core - Shared logic
│   │   └── src/
│   │       ├── hooks/      # useSpeechSynthesis, usePersistedState
│   │       ├── utils/      # arabic.ts, shuffle.ts
│   │       └── types/      # TarkeebExercise, SarfExercise, etc.
│   └── styles/             # @arabtools/styles - Shared styles
│       ├── globals.css     # Global CSS with fonts and variables
│       └── tailwind.preset.js
└── apps/
    ├── hans-wehr/          # Dictionary lookup tool
    ├── sarf-charts/        # Verb conjugation tables
    ├── tarkeeb/            # Grammar analysis tool
    ├── sarf-tool/          # Morphology analysis tool
    └── conjugation/        # Verb drill practice
```

## Dependencies

- **@arabiyya/sarf**: Arabic verb conjugation library (used by sarf-charts, conjugation)
- **React 19**: UI framework
- **Vite**: Build tool
- **Tailwind CSS 4**: Styling
- **Radix UI**: Headless UI components
- **lucide-react**: Icons

## Theme

The apps use an Islamic manuscript aesthetic:

- **Primary**: Navy (`#1a3150`)
- **Accent**: Gold (`#c5a253`)
- **Fonts**: EB Garamond (headings), Open Sans (body), Amiri (Arabic)

## Data

- **Hans Wehr Dictionary**: 28 JSON files (one per Arabic letter) loaded lazily
- **Sarf/Tarkeeb Exercises**: Bundled in app builds (~30-50KB gzipped)

## Deployment

Each app can be deployed independently to:
- **Vercel**: Native Turborepo support
- **Cloudflare Pages**: Static site hosting
- **Netlify**: Static site hosting

Build output is in each app's `dist/` directory.

## License

Private - Al Qalam Institute
