# Curriculum Roadmap View — Design Document

**Date:** 2026-02-22
**Location:** `apps/hub/` (enhancement to existing hub app)

## Problem

The monorepo has 21 tools, an SRS prerequisite graph (43 nahw topics in 6 units), and an adaptive placement test — but nothing connects the dots for a learner: "where am I, what should I do next, and how do I get there."

## Decision Summary

- **Approach chosen:** Curriculum Roadmap View (visual 6-unit learning path inside the hub)
- **Alternatives considered:** Smart Hub (progress badges only), Full Dashboard (roadmap + stats)
- **Why this approach:** Solves the core "what's next" problem with a visual curriculum. Progress badges and dashboard can follow later.

## Design

### 1. View Switching

Two-tab toggle at the top of the hub's main content area: **Tools** (current) and **Roadmap** (new). Sidebar stays unchanged for both views. Active view persisted in `arabtools-hub-view` localStorage key. Sidebar search filters topics (not tools) when in Roadmap view. Uses `@arabtools/ui` Tabs component.

### 2. Unit & Topic Layout

Each of the 6 units is a collapsible card. Expanded state shows a 3-column grid of topic nodes (2-col tablet, 1-col mobile).

**Collapsed:** Unit title (EN + AR), progress fraction (e.g., "8/12"), compact progress bar.

**Expanded by default:** Units with in-progress topics. All others collapsed.

**Topic node states (3 states, no locks):**
- **Not started** — grey, muted text
- **In progress** — gold border, partial fill, shows percentage
- **Mastered** — green check, solid fill

### 3. Topic Detail Panel

Clicking a topic opens an inline detail panel below the topic grid (not a modal). Only one open at a time. Contents:

- Topic name (Arabic + English)
- Mastery status + percentage from tashkhis
- Prerequisites with their mastery status (clickable to jump)
- Unlocks (dependents — what this topic enables)
- "Practice with" — up to 4 tool cards linking to relevant apps (new tab)

### 4. Progress Computation

**Single source: tashkhis** (`arabtools-tashkhis-history`). Most recent test's per-category scores. If no tashkhis data exists, everything shows as not-started with a "Take Placement Test" CTA banner.

**Thresholds:**
| Percentage | State |
|---|---|
| 0 or no data | Not started |
| 1–69% | In progress |
| 70%+ | Mastered |

**Why tashkhis only:** SRS state tracks vocabulary not grammar topics. No per-topic progress exists in other apps. Tashkhis maps 1:1 to the 43 nahw topics. More sources can be added later.

**Unit progress:** mastered topics / total topics in unit.

### 5. Topic-to-Tool Mapping

New data file `apps/hub/src/data/topic-tools.ts`. Maps each of the 43 topics to 2-5 relevant tool IDs, ordered by relevance (practice first, then reference).

**Coverage by tool:**
| Tool | Scope |
|---|---|
| tarkeeb | All 43 topics (grammar analysis) |
| nahw-navigator | All 43 topics (reference/browse) |
| nahw-atlas | All 43 topics (visual reference) |
| fstu-exercises | All 43 topics (curriculum exercises) |
| durus | All 43 topics (lessons) |
| tarkib-guide | Unit 3 phrase topics (8) |
| tarkib-builder | Unit 3 phrase topics (8) |
| conjugation | 5 verb topics |
| sarf-charts | masdar-derived, verb-tense |
| sarf-tool | masdar-derived |
| insha-guide | Unit 5-6 topics |

Detail panel shows max 4 tools per topic.

### 6. Component Architecture

**New files:**
```
apps/hub/src/
├── components/
│   ├── RoadmapView.tsx        — main roadmap container
│   ├── UnitCard.tsx           — collapsible unit with topic grid
│   ├── TopicNode.tsx          — individual topic chip
│   └── TopicDetail.tsx        — inline detail panel
├── data/
│   └── topic-tools.ts         — topic → tool ID mapping
├── hooks/
│   ├── useRoadmapProgress.ts  — reads tashkhis, computes mastery
│   └── useRoadmapState.ts     — expanded units, selected topic
└── types/
    └── roadmap.ts             — TopicMastery, UnitProgress types
```

**Modified files:**
- `Hub.tsx` — add view state + tab switching
- `Sidebar.tsx` — search filters topics in roadmap view

**New dependency:** `@arabtools/srs` in hub's `package.json` (imports prerequisite graph data and types — topic definitions, unit groupings).

**Data flow:**
- `useRoadmapProgress()` reads `arabtools-tashkhis-history`, imports nahw topics from `@arabtools/srs`, computes `Map<topicId, { status, percentage }>` and `unitProgress[]`
- `useRoadmapState()` tracks `expandedUnits`, `selectedTopic`, persisted to `arabtools-hub-roadmap` in localStorage

### 7. localStorage Keys

| Key | Purpose |
|---|---|
| `arabtools-hub-view` | Active view: 'tools' or 'roadmap' |
| `arabtools-hub-roadmap` | Expanded units, selected topic |
| `arabtools-tashkhis-history` | Read-only — placement test results |
