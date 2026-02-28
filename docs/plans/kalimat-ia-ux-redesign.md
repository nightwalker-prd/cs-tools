# Kalimat IA + UX/UI Reorganization Plan

## Goal
Reorganize Kalimat into a clearer learning journey that is more engaging and informative while preserving existing data and core components.

Primary outcomes:
- Faster first-use orientation
- Clearer path from reading to practice
- More informative progress feedback
- Consistent, calmer UI hierarchy

---

## Current IA Issues (Summary)

1. Top-level navigation is feature-first, not journey-first.
2. Discovery and practice are weakly connected (high context switching).
3. Home screen has too many equal-priority actions.
4. Visual patterns are inconsistent (cards/tables/inline style variants).
5. Reader interactions are informative but not strongly action-driven.

---

## Proposed Information Architecture

Use 4 top-level pillars:

1. **Dashboard**
2. **Read**
3. **Learn**
4. **Explore**

### Sitemap (Target)

- Dashboard
  - Today’s Focus
  - My Progress Snapshot
  - Continue Last Activity
  - Milestones

- Read
  - Quran Reader (default entry)
  - Surah Navigator
  - Ayah View
  - Word Anatomy

- Learn
  - Continue Session (if active)
  - Start Session
  - Placement Test
  - Session Results

- Explore
  - Search (word-first)
  - Roots
  - Frequency
  - Grammar Patterns
  - Lemma Detail

### Navigation Relabeling

- Home → Dashboard
- Progress → My Progress (inside Dashboard section)
- Assessment → Placement Test
- By Surah remains under Read context
- By Root / By Frequency / Grammar Patterns grouped under Explore

---

## Low-Fidelity Screen Structure

## 1) Dashboard (new Home structure)

### A. Hero row (single primary CTA)
- Left: comprehension ring + “You understand X% vocabulary”
- Right: one primary CTA based on state:
  - New user: “Take Placement Test”
  - Returning with due items: “Review Due Words”
  - Returning without due: “Continue Learning Session”

### B. Today panel
- Due words count
- Suggested session preset (size + source)
- Last studied time

### C. Progress snapshot cards (3)
- Words known
- Roots covered
- Surahs above threshold

### D. Continue cards (secondary)
- Resume last surah/ayah
- Resume last explore topic (root/pattern)

### E. Milestones strip
- Next milestone (“+2% to reach 25% comprehension”)
- Small celebratory state if reached

---

## 2) Read

### A. Read landing
- Surah selector + quick links to last read and highest-gain surah
- Lightweight explanation of mastery coloring

### B. Reader view
- Keep current verse rendering and colored words
- Add explicit action row in word popover:
  - Add to Review Queue
  - Mark Known
  - Practice this Ayah

### C. Ayah view
- Keep word/phrase toggle
- Add “Study this Ayah” CTA that deep-links into Learn with context preset

### D. Surah list/detail
- Keep list/table but emphasize comprehension impact:
  - Per-surah known %
  - Optional “best next surah” hint

---

## 3) Learn

### A. Learn landing (stateful)
- If active session exists: Resume card at top
- Preset chips:
  - Quick Review (10 due)
  - Frequency Boost (Tier 1, 20)
  - Surah Focus (current surah)

### B. Session config
- Simplify toggles into grouped sections with helper text
- Keep advanced controls collapsible

### C. Study session
- Keep quiz modes
- Add session context header (why these words were selected)

### D. Results
- Add “What to do next” recommendations:
  - Review difficult words
  - Continue in Reader
  - Start next session

---

## 4) Explore

### A. Unified Explore landing
- Search at top (primary)
- Four tiles:
  - Roots
  - Frequency
  - Grammar Patterns
  - Random discovery

### B. Roots/Frequency/Patterns
- Keep current data-heavy views
- Add one-line educational framing at top of each page
- Standardize table/card header pattern and spacing

### C. Lemma detail
- Keep etymology + root links
- Add contextual CTAs:
  - Add to review
  - Find in reader occurrences
  - View root family

---

## Engagement Upgrades (No New Backend)

1. **Next Best Action engine** (front-end only)
- Compute simple recommendation from existing progress state:
  - due > 0 → review
  - low tier coverage → tier recommendation
  - unfinished surah streak → resume reading

2. **Milestone messaging**
- Lightweight progress nudges at 10/25/50/75%

3. **Contextual CTA bridge**
- Every detail screen has one “study now” or “continue reading” action

4. **Session intent clarity**
- Explain session selection source (e.g., “10 due words from recent mistakes”)

---

## UI System Cleanup

1. Replace repeated inline styles with semantic class utilities.
2. Standardize section primitives:
- page header
- section heading
- data card
- compact stat
- table container
3. Normalize button hierarchy:
- 1 primary per screen
- supporting secondary/tertiary actions
4. Improve focus visibility for keyboard users.
5. Keep existing color tokens; reduce one-off visual treatments.

---

## Component Mapping (Current → Target)

### Layout and nav
- apps/kalimat/src/components/Layout.tsx
- apps/kalimat/src/components/Sidebar.tsx

Actions:
- Reorder nav into Dashboard / Read / Learn / Explore
- Add section grouping labels and active context behavior

### Dashboard
- apps/kalimat/src/components/browse/Home.tsx
- apps/kalimat/src/components/progress/ProgressDashboard.tsx

Actions:
- Merge key progress summary into Dashboard
- Move deep progress grids into a secondary “My Progress” section

### Read
- apps/kalimat/src/components/reader/QuranReader.tsx
- apps/kalimat/src/components/context/AyahView.tsx
- apps/kalimat/src/components/browse/SurahBrowser.tsx
- apps/kalimat/src/components/browse/SurahWordList.tsx
- apps/kalimat/src/components/anatomy/WordAnatomy.tsx

Actions:
- Add bridging CTAs to Learn
- Prioritize per-surah and per-ayah actionable context

### Learn
- apps/kalimat/src/components/learn/LearnConfig.tsx
- apps/kalimat/src/components/learn/StudySession.tsx
- apps/kalimat/src/components/learn/AssessmentTest.tsx
- apps/kalimat/src/components/learn/SessionResults.tsx

Actions:
- Introduce presets
- Clarify selection rationale
- Improve completion pathways

### Explore
- apps/kalimat/src/components/SearchBar.tsx
- apps/kalimat/src/components/browse/RootBrowser.tsx
- apps/kalimat/src/components/browse/RootDetail.tsx
- apps/kalimat/src/components/browse/FrequencyBrowser.tsx
- apps/kalimat/src/components/browse/PatternBrowser.tsx
- apps/kalimat/src/components/browse/PatternDetail.tsx
- apps/kalimat/src/components/browse/LemmaDetail.tsx

Actions:
- Add unified Explore entry with search-first architecture
- Ensure each screen drives forward action

### Styling
- apps/kalimat/src/index.css

Actions:
- Extract repeated inline style patterns into classes
- Tighten spacing/typography scale for readability

---

## Implementation Sequence

## Phase 1 (High impact, low risk)
1. Sidebar IA reorganization and relabeling
2. Dashboard action hierarchy cleanup
3. Add contextual CTAs between Read ↔ Learn
4. Basic style consistency pass (remove most inline layout styles)

Success criteria:
- User can reach “next best action” in ≤2 clicks from Dashboard
- Fewer same-level competing CTAs on primary screens

## Phase 2 (Flow coherence)
1. Learn presets and resume session entry
2. Explore landing page with search-first model
3. Surah and ayah views show direct study entry points

Success criteria:
- Discovery-to-practice transition is explicit on all major screens

## Phase 3 (Engagement)
1. Milestones and progression nudges
2. Session intent explanations
3. Optional lightweight streak/consistency messaging

Success criteria:
- More repeatable daily loop (Dashboard → Learn/Read → Results → Dashboard)

---

## UX Copy Direction

Use concise action language:
- “Continue Learning”
- “Review Due Words”
- “Study This Ayah”
- “Add to Review Queue”
- “Next: Improve Tier 2 Coverage”

Avoid vague labels like “Browse” without context.

---

## Risks / Guardrails

1. Do not overcomplicate with new routes unless required.
2. Keep app fast and static-first (no backend assumptions).
3. Preserve existing Arabic-first readability and RTL behavior.
4. Keep component changes incremental to reduce regressions.

---

## Immediate Build Start (Recommended)

First coding slice:
1. Sidebar IA relabel + regroup
2. Dashboard (existing Home) CTA hierarchy redesign
3. Add “Study this Ayah” and “Add to Review Queue” CTAs in Read/Ayah views

This yields visible UX gains quickly without major data-model changes.
