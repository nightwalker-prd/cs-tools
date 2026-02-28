# Curriculum Roadmap View — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a Curriculum Roadmap View to the hub app showing a 6-unit learning path with topic mastery from tashkhis placement test results.

**Architecture:** New view alongside existing Tools view in the hub. Data flows from `@arabtools/srs` (topic definitions, prerequisites) and tashkhis localStorage (mastery scores). No backend — all client-side.

**Tech Stack:** React 19, TypeScript 5.7, CSS (matching existing hub styles), `@arabtools/srs` package, `@arabtools/core` (usePersistedState)

**Design doc:** `docs/plans/2026-02-22-curriculum-roadmap-design.md`

---

### Task 1: Types and Data Layer

**Files:**
- Create: `apps/hub/src/types/roadmap.ts`
- Create: `apps/hub/src/data/topic-tools.ts`

**Step 1: Create roadmap types**

Create `apps/hub/src/types/roadmap.ts`:

```typescript
export type TopicStatus = 'not-started' | 'in-progress' | 'mastered';

export interface TopicMastery {
  topicId: string;
  status: TopicStatus;
  percentage: number;
}

export interface UnitProgress {
  unitNumber: number;
  titleEn: string;
  titleAr: string;
  topics: TopicMastery[];
  masteredCount: number;
  totalCount: number;
}

export interface TopicDefinition {
  id: string;
  label: string;
  labelAr: string;
  unit: number;
}
```

**Step 2: Create topic-to-tool mapping**

Create `apps/hub/src/data/topic-tools.ts`:

```typescript
/**
 * Maps each of the 43 nahw topics to relevant tool IDs.
 * Ordered by relevance: practice tools first, then reference.
 * Detail panel shows max 4 per topic.
 */
export const TOPIC_TOOLS: Record<string, string[]> = {
  // ── Unit 1: Words ──
  'word-types': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'definite-indefinite': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'gender': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'number': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'noun-irab': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'diptotes': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'verb-tense': ['conjugation', 'fstu-exercises', 'sarf-charts', 'tarkeeb'],
  'verb-irab': ['conjugation', 'fstu-exercises', 'tarkeeb', 'nahw-navigator'],
  'verb-negation': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'verb-gender-voice': ['conjugation', 'fstu-exercises', 'tarkeeb', 'nahw-navigator'],
  'particles': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'masdar-derived': ['masdar-trainer', 'sarf-charts', 'sarf-tool', 'fstu-exercises'],

  // ── Unit 2: Sentences ──
  'nominal-sentence': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'kana-and-sisters': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'inna-and-sisters': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'verbal-sentence': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'maf-ul-bih': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'naib-al-fail': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'maf-ul-fihi': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'maf-ul-mutlaq': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'maf-ul-lahu': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'hal': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'tamyiz': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'mustathna': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'maf-ul-ma-ahu': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],

  // ── Unit 3: Phrases ──
  'na-t': ['tarkib-builder', 'fstu-exercises', 'tarkib-guide', 'tarkeeb'],
  'demonstrative-phrases': ['tarkib-builder', 'fstu-exercises', 'tarkib-guide', 'tarkeeb'],
  'atf': ['tarkib-builder', 'fstu-exercises', 'tarkib-guide', 'tarkeeb'],
  'badal': ['tarkib-builder', 'fstu-exercises', 'tarkib-guide', 'tarkeeb'],
  'mudaf-ilayhi': ['tarkib-builder', 'fstu-exercises', 'tarkib-guide', 'tarkeeb'],
  'prepositions': ['tarkib-builder', 'fstu-exercises', 'tarkib-guide', 'tarkeeb'],
  'shibh-al-jumla': ['tarkib-builder', 'fstu-exercises', 'tarkib-guide', 'tarkeeb'],
  'number-phrases': ['tarkib-builder', 'fstu-exercises', 'tarkib-guide', 'tarkeeb'],

  // ── Unit 4: Pronouns ──
  'damir-marfu': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'damir-mansub': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'damir-majrur': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'harf-istifham': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'ism-istifham': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'tawkid': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],

  // ── Unit 5: Nested Sentences ──
  'jumla-sughra': ['fstu-exercises', 'tarkeeb', 'insha-guide', 'nahw-navigator'],
  'ism-mawsul': ['fstu-exercises', 'tarkeeb', 'insha-guide', 'nahw-navigator'],
  'harf-mawsul': ['fstu-exercises', 'tarkeeb', 'insha-guide', 'nahw-navigator'],
  'verbal-phrases': ['fstu-exercises', 'tarkeeb', 'insha-guide', 'nahw-navigator'],

  // ── Unit 6: Joining Sentences ──
  'nida': ['fstu-exercises', 'tarkeeb', 'insha-guide', 'nahw-navigator'],
  'qasam': ['fstu-exercises', 'tarkeeb', 'insha-guide', 'nahw-navigator'],
  'shart': ['fstu-exercises', 'tarkeeb', 'insha-guide', 'nahw-navigator'],
  'amr-nahy': ['conjugation', 'fstu-exercises', 'tarkeeb', 'nahw-navigator'],
  'jumla-ta-liliyya': ['fstu-exercises', 'tarkeeb', 'insha-guide', 'nahw-navigator'],
  'jumla-istidrakiyya': ['fstu-exercises', 'tarkeeb', 'insha-guide', 'nahw-navigator'],
};

/** Max tools shown in the topic detail panel */
export const MAX_TOOLS_PER_TOPIC = 4;
```

**Step 3: Build and typecheck**

Run: `npx turbo typecheck --filter=@arabtools/hub`
Expected: PASS (new files have no imports yet, just data)

**Step 4: Commit**

```bash
git add apps/hub/src/types/roadmap.ts apps/hub/src/data/topic-tools.ts
git commit -m "feat(hub): add roadmap types and topic-to-tool mapping data"
```

---

### Task 2: Add @arabtools/srs Dependency and Topic Data Hook

**Files:**
- Modify: `apps/hub/package.json`
- Create: `apps/hub/src/data/topics.ts`

**Step 1: Add srs dependency to hub**

Add `"@arabtools/srs": "*"` to `dependencies` in `apps/hub/package.json`.

Run: `npm install` at repo root.

**Step 2: Create topic data bridge**

Create `apps/hub/src/data/topics.ts`. This re-exports the topic data we need from `@arabtools/srs` and the tashkhis category map, avoiding direct srs graph imports in components:

```typescript
import { NAHW_TOPIC_IDS, NAHW_PREREQUISITE_EDGES } from '@arabtools/srs';
import type { TopicDefinition } from '@/types/roadmap';

/** Unit metadata */
export const UNIT_TITLES: Record<number, { en: string; ar: string }> = {
  1: { en: 'Unit 1: Words', ar: 'الوحدة ١: الكلمات' },
  2: { en: 'Unit 2: Sentences', ar: 'الوحدة ٢: الجمل' },
  3: { en: 'Unit 3: Phrases', ar: 'الوحدة ٣: التراكيب' },
  4: { en: 'Unit 4: Pronouns', ar: 'الوحدة ٤: الضمائر' },
  5: { en: 'Unit 5: Nested Sentences', ar: 'الوحدة ٥: الجمل المركبة' },
  6: { en: 'Unit 6: Joining Sentences', ar: 'الوحدة ٦: ربط الجمل' },
};

/** English + Arabic labels for each topic. Matches tashkhis category-map.ts. */
const TOPIC_LABELS: Record<string, { label: string; labelAr: string }> = {
  'word-types': { label: 'Word Types', labelAr: 'أقسام الكلمة' },
  'definite-indefinite': { label: 'Definite & Indefinite', labelAr: 'المعرفة والنكرة' },
  'gender': { label: 'Gender', labelAr: 'المذكر والمؤنث' },
  'number': { label: 'Number', labelAr: 'المفرد والمثنى والجمع' },
  'noun-irab': { label: "Noun I'rab", labelAr: 'إعراب الاسم' },
  'diptotes': { label: 'Diptotes', labelAr: 'الممنوع من الصرف' },
  'verb-tense': { label: 'Verb Tense', labelAr: 'أزمنة الفعل' },
  'verb-irab': { label: "Verb I'rab", labelAr: 'إعراب الفعل' },
  'verb-negation': { label: 'Verb Negation', labelAr: 'نفي الفعل' },
  'verb-gender-voice': { label: 'Voice & Gender', labelAr: 'المبني للمعلوم والمجهول' },
  'particles': { label: 'Particles', labelAr: 'الحروف' },
  'masdar-derived': { label: 'Masdar & Derived', labelAr: 'المصدر والمشتقات' },
  'nominal-sentence': { label: 'Nominal Sentence', labelAr: 'الجملة الاسمية' },
  'kana-and-sisters': { label: 'Kana & Sisters', labelAr: 'كان وأخواتها' },
  'inna-and-sisters': { label: 'Inna & Sisters', labelAr: 'إنّ وأخواتها' },
  'verbal-sentence': { label: 'Verbal Sentence', labelAr: 'الجملة الفعلية' },
  'maf-ul-bih': { label: "Maf'ul Bih", labelAr: 'المفعول به' },
  'naib-al-fail': { label: "Na'ib al-Fa'il", labelAr: 'نائب الفاعل' },
  'maf-ul-fihi': { label: "Maf'ul Fihi", labelAr: 'المفعول فيه' },
  'maf-ul-mutlaq': { label: "Maf'ul Mutlaq", labelAr: 'المفعول المطلق' },
  'maf-ul-lahu': { label: "Maf'ul Lahu", labelAr: 'المفعول لأجله' },
  'hal': { label: 'Hal', labelAr: 'الحال' },
  'tamyiz': { label: 'Tamyiz', labelAr: 'التمييز' },
  'mustathna': { label: 'Mustathna', labelAr: 'المستثنى' },
  'maf-ul-ma-ahu': { label: "Maf'ul Ma'ahu", labelAr: 'المفعول معه' },
  'na-t': { label: "Na't (Adjective)", labelAr: 'النعت' },
  'demonstrative-phrases': { label: 'Demonstrative Phrases', labelAr: 'أسماء الإشارة' },
  'atf': { label: 'Atf (Conjunction)', labelAr: 'العطف' },
  'badal': { label: 'Badal (Apposition)', labelAr: 'البدل' },
  'mudaf-ilayhi': { label: 'Mudaf Ilayhi', labelAr: 'المضاف إليه' },
  'prepositions': { label: 'Prepositions', labelAr: 'حروف الجر' },
  'shibh-al-jumla': { label: 'Shibh al-Jumla', labelAr: 'شبه الجملة' },
  'number-phrases': { label: 'Number Phrases', labelAr: 'العدد والمعدود' },
  'damir-marfu': { label: 'Nominative Pronouns', labelAr: 'الضمير المرفوع' },
  'damir-mansub': { label: 'Accusative Pronouns', labelAr: 'الضمير المنصوب' },
  'damir-majrur': { label: 'Genitive Pronouns', labelAr: 'الضمير المجرور' },
  'harf-istifham': { label: 'Question Particles', labelAr: 'حرف الاستفهام' },
  'ism-istifham': { label: 'Question Nouns', labelAr: 'اسم الاستفهام' },
  'tawkid': { label: 'Emphasis', labelAr: 'التوكيد' },
  'jumla-sughra': { label: 'Small Sentence', labelAr: 'الجملة الصغرى' },
  'ism-mawsul': { label: 'Relative Pronoun', labelAr: 'الاسم الموصول' },
  'harf-mawsul': { label: 'Connecting Particle', labelAr: 'الحرف الموصول' },
  'verbal-phrases': { label: 'Verbal Phrases', labelAr: 'التراكيب الفعلية' },
  'nida': { label: 'Vocative', labelAr: 'النداء' },
  'qasam': { label: 'Oath', labelAr: 'القسم' },
  'shart': { label: 'Conditional', labelAr: 'الشرط' },
  'amr-nahy': { label: 'Command & Prohibition', labelAr: 'الأمر والنهي' },
  'jumla-ta-liliyya': { label: 'Reason Clause', labelAr: 'الجملة التعليلية' },
  'jumla-istidrakiyya': { label: 'Adversative Clause', labelAr: 'الجملة الاستدراكية' },
};

/** All 43 topics organized by unit, with labels. */
export function getTopicsByUnit(): Map<number, TopicDefinition[]> {
  const units = new Map<number, TopicDefinition[]>();
  const entries = Object.entries(NAHW_TOPIC_IDS) as [string, readonly string[]][];

  for (const [key, topicIds] of entries) {
    const unitNum = parseInt(key.replace('unit', ''), 10);
    const topics: TopicDefinition[] = topicIds.map((id) => ({
      id,
      label: TOPIC_LABELS[id]?.label ?? id,
      labelAr: TOPIC_LABELS[id]?.labelAr ?? '',
      unit: unitNum,
    }));
    units.set(unitNum, topics);
  }

  return units;
}

/** Direct prerequisites for a topic (not transitive). */
export function getDirectPrerequisites(topicId: string): string[] {
  return NAHW_PREREQUISITE_EDGES
    .filter((e) => e.to === topicId)
    .map((e) => e.from);
}

/** Direct dependents for a topic (not transitive). */
export function getDirectDependents(topicId: string): string[] {
  return NAHW_PREREQUISITE_EDGES
    .filter((e) => e.from === topicId)
    .map((e) => e.to);
}
```

**Step 3: Build and typecheck**

Run: `npx turbo typecheck --filter=@arabtools/hub`
Expected: PASS

**Step 4: Commit**

```bash
git add apps/hub/package.json package-lock.json apps/hub/src/data/topics.ts
git commit -m "feat(hub): add srs dependency and topic data bridge"
```

---

### Task 3: Progress Hook (useRoadmapProgress)

**Files:**
- Create: `apps/hub/src/hooks/useRoadmapProgress.ts`

**Step 1: Create the progress computation hook**

Create `apps/hub/src/hooks/useRoadmapProgress.ts`:

```typescript
import { useMemo } from 'react';
import type { TopicMastery, TopicStatus, UnitProgress } from '@/types/roadmap';
import { getTopicsByUnit, UNIT_TITLES } from '@/data/topics';

/** Tashkhis types — read raw from localStorage */
interface TashkhisCategoryScore {
  categoryId: string;
  percentage: number;
}

interface TashkhisUnitScorecard {
  categories: TashkhisCategoryScore[];
}

interface TashkhisResult {
  completedAt: number;
  scorecards: TashkhisUnitScorecard[];
}

function getStatusFromPercentage(percentage: number): TopicStatus {
  if (percentage >= 70) return 'mastered';
  if (percentage > 0) return 'in-progress';
  return 'not-started';
}

function readTashkhisHistory(): TashkhisResult | null {
  try {
    const raw = localStorage.getItem('arabtools-tashkhis-history');
    if (!raw) return null;
    const history: TashkhisResult[] = JSON.parse(raw);
    if (!Array.isArray(history) || history.length === 0) return null;
    // Most recent result (highest completedAt)
    return history.reduce((a, b) => (a.completedAt > b.completedAt ? a : b));
  } catch {
    return null;
  }
}

export function useRoadmapProgress() {
  const topicsByUnit = useMemo(() => getTopicsByUnit(), []);

  const tashkhisResult = useMemo(() => readTashkhisHistory(), []);

  const scoreByTopic = useMemo(() => {
    const map = new Map<string, number>();
    if (!tashkhisResult) return map;
    for (const scorecard of tashkhisResult.scorecards) {
      for (const cat of scorecard.categories) {
        map.set(cat.categoryId, cat.percentage);
      }
    }
    return map;
  }, [tashkhisResult]);

  const topicMasteryMap = useMemo(() => {
    const map = new Map<string, TopicMastery>();
    for (const [, topics] of topicsByUnit) {
      for (const topic of topics) {
        const percentage = scoreByTopic.get(topic.id) ?? 0;
        map.set(topic.id, {
          topicId: topic.id,
          status: getStatusFromPercentage(percentage),
          percentage,
        });
      }
    }
    return map;
  }, [topicsByUnit, scoreByTopic]);

  const unitProgress = useMemo((): UnitProgress[] => {
    const result: UnitProgress[] = [];
    for (const [unitNum, topics] of topicsByUnit) {
      const title = UNIT_TITLES[unitNum];
      if (!title) continue;
      const topicMasteries = topics.map(
        (t) => topicMasteryMap.get(t.id) ?? { topicId: t.id, status: 'not-started' as const, percentage: 0 }
      );
      result.push({
        unitNumber: unitNum,
        titleEn: title.en,
        titleAr: title.ar,
        topics: topicMasteries,
        masteredCount: topicMasteries.filter((t) => t.status === 'mastered').length,
        totalCount: topicMasteries.length,
      });
    }
    return result;
  }, [topicsByUnit, topicMasteryMap]);

  return {
    hasTashkhisData: tashkhisResult !== null,
    topicMasteryMap,
    unitProgress,
  };
}
```

**Step 2: Build and typecheck**

Run: `npx turbo typecheck --filter=@arabtools/hub`
Expected: PASS

**Step 3: Commit**

```bash
git add apps/hub/src/hooks/useRoadmapProgress.ts
git commit -m "feat(hub): add useRoadmapProgress hook for tashkhis mastery"
```

---

### Task 4: Roadmap State Hook (useRoadmapState)

**Files:**
- Create: `apps/hub/src/hooks/useRoadmapState.ts`

**Step 1: Create the roadmap UI state hook**

Create `apps/hub/src/hooks/useRoadmapState.ts`:

```typescript
import { useCallback, useMemo } from 'react';
import { usePersistedState } from '@arabtools/core';
import type { UnitProgress } from '@/types/roadmap';

interface RoadmapState {
  expandedUnits: number[];
  selectedTopic: string | null;
}

const DEFAULT_STATE: RoadmapState = {
  expandedUnits: [],
  selectedTopic: null,
};

export function useRoadmapState(unitProgress: UnitProgress[]) {
  const [state, setState] = usePersistedState<RoadmapState>(
    'arabtools-hub-roadmap',
    DEFAULT_STATE,
  );

  // Auto-expand units with in-progress topics (if user hasn't manually set any)
  const expandedUnits = useMemo(() => {
    if (state.expandedUnits.length > 0) return new Set(state.expandedUnits);
    // Default: expand units that have in-progress topics
    const autoExpand = new Set<number>();
    for (const unit of unitProgress) {
      if (unit.topics.some((t) => t.status === 'in-progress')) {
        autoExpand.add(unit.unitNumber);
      }
    }
    // If nothing is in-progress, expand unit 1
    if (autoExpand.size === 0) autoExpand.add(1);
    return autoExpand;
  }, [state.expandedUnits, unitProgress]);

  const toggleUnit = useCallback((unitNum: number) => {
    setState((prev) => {
      const current = new Set(prev.expandedUnits);
      if (current.has(unitNum)) {
        current.delete(unitNum);
      } else {
        current.add(unitNum);
      }
      return { ...prev, expandedUnits: [...current] };
    });
  }, [setState]);

  const selectTopic = useCallback((topicId: string | null) => {
    setState((prev) => ({
      ...prev,
      selectedTopic: prev.selectedTopic === topicId ? null : topicId,
    }));
  }, [setState]);

  return {
    expandedUnits,
    selectedTopic: state.selectedTopic,
    toggleUnit,
    selectTopic,
  };
}
```

**Step 2: Build and typecheck**

Run: `npx turbo typecheck --filter=@arabtools/hub`
Expected: PASS

**Step 3: Commit**

```bash
git add apps/hub/src/hooks/useRoadmapState.ts
git commit -m "feat(hub): add useRoadmapState hook for roadmap UI state"
```

---

### Task 5: TopicNode Component

**Files:**
- Create: `apps/hub/src/components/TopicNode.tsx`

**Step 1: Create TopicNode component**

Create `apps/hub/src/components/TopicNode.tsx`:

```typescript
import { Check } from 'lucide-react';
import type { TopicMastery, TopicDefinition } from '@/types/roadmap';

interface TopicNodeProps {
  topic: TopicDefinition;
  mastery: TopicMastery;
  isSelected: boolean;
  onClick: () => void;
}

export function TopicNode({ topic, mastery, isSelected, onClick }: TopicNodeProps) {
  const statusClass =
    mastery.status === 'mastered'
      ? 'topic-node--mastered'
      : mastery.status === 'in-progress'
        ? 'topic-node--in-progress'
        : 'topic-node--not-started';

  return (
    <button
      className={`topic-node ${statusClass} ${isSelected ? 'topic-node--selected' : ''}`}
      onClick={onClick}
      type="button"
    >
      <span className="topic-node-indicator">
        {mastery.status === 'mastered' ? (
          <Check size={12} />
        ) : mastery.status === 'in-progress' ? (
          <span className="topic-node-pct">{Math.round(mastery.percentage)}%</span>
        ) : null}
      </span>
      <span className="topic-node-label">{topic.label}</span>
      <span className="topic-node-label-ar font-arabic" dir="rtl">{topic.labelAr}</span>
    </button>
  );
}
```

**Step 2: Build and typecheck**

Run: `npx turbo typecheck --filter=@arabtools/hub`
Expected: PASS

**Step 3: Commit**

```bash
git add apps/hub/src/components/TopicNode.tsx
git commit -m "feat(hub): add TopicNode component for roadmap topics"
```

---

### Task 6: TopicDetail Component

**Files:**
- Create: `apps/hub/src/components/TopicDetail.tsx`

**Step 1: Create TopicDetail component**

Create `apps/hub/src/components/TopicDetail.tsx`:

```typescript
import { ExternalLink } from 'lucide-react';
import type { TopicDefinition, TopicMastery } from '@/types/roadmap';
import { getDirectPrerequisites, getDirectDependents } from '@/data/topics';
import { TOPIC_TOOLS, MAX_TOOLS_PER_TOPIC } from '@/data/topic-tools';
import { tools } from '@/data/tools';

interface TopicDetailProps {
  topic: TopicDefinition;
  mastery: TopicMastery;
  topicMasteryMap: Map<string, TopicMastery>;
  allTopics: Map<string, TopicDefinition>;
  onSelectTopic: (topicId: string) => void;
}

const STATUS_LABELS: Record<string, string> = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  'mastered': 'Mastered',
};

export function TopicDetail({
  topic,
  mastery,
  topicMasteryMap,
  allTopics,
  onSelectTopic,
}: TopicDetailProps) {
  const prerequisites = getDirectPrerequisites(topic.id);
  const dependents = getDirectDependents(topic.id);
  const toolIds = (TOPIC_TOOLS[topic.id] ?? []).slice(0, MAX_TOOLS_PER_TOPIC);
  const toolItems = toolIds
    .map((id) => tools.find((t) => t.id === id))
    .filter(Boolean) as typeof tools;

  return (
    <div className="topic-detail animate-fade-in">
      <div className="topic-detail-header">
        <div>
          <h3 className="topic-detail-title">{topic.label}</h3>
          <p className="topic-detail-title-ar font-arabic" dir="rtl">{topic.labelAr}</p>
        </div>
        <div className={`topic-detail-status topic-detail-status--${mastery.status}`}>
          {STATUS_LABELS[mastery.status]}
          {mastery.percentage > 0 && ` (${Math.round(mastery.percentage)}%)`}
        </div>
      </div>

      {prerequisites.length > 0 && (
        <div className="topic-detail-section">
          <h4 className="topic-detail-section-title">Prerequisites</h4>
          <div className="topic-detail-chips">
            {prerequisites.map((prereqId) => {
              const prereq = allTopics.get(prereqId);
              const prereqMastery = topicMasteryMap.get(prereqId);
              if (!prereq) return null;
              return (
                <button
                  key={prereqId}
                  className={`topic-chip topic-chip--${prereqMastery?.status ?? 'not-started'}`}
                  onClick={() => onSelectTopic(prereqId)}
                  type="button"
                >
                  {prereq.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {dependents.length > 0 && (
        <div className="topic-detail-section">
          <h4 className="topic-detail-section-title">Unlocks</h4>
          <div className="topic-detail-chips">
            {dependents.map((depId) => {
              const dep = allTopics.get(depId);
              if (!dep) return null;
              return (
                <button
                  key={depId}
                  className="topic-chip topic-chip--not-started"
                  onClick={() => onSelectTopic(depId)}
                  type="button"
                >
                  {dep.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {toolItems.length > 0 && (
        <div className="topic-detail-section">
          <h4 className="topic-detail-section-title">Practice with</h4>
          <div className="topic-detail-tools">
            {toolItems.map((tool) => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="topic-detail-tool"
              >
                <span className="topic-detail-tool-name">{tool.name}</span>
                <span className="topic-detail-tool-name-ar font-arabic">{tool.nameAr}</span>
                <ExternalLink size={12} className="topic-detail-tool-icon" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

**Step 2: Build and typecheck**

Run: `npx turbo typecheck --filter=@arabtools/hub`
Expected: PASS

**Step 3: Commit**

```bash
git add apps/hub/src/components/TopicDetail.tsx
git commit -m "feat(hub): add TopicDetail panel with prereqs, dependents, and tools"
```

---

### Task 7: UnitCard Component

**Files:**
- Create: `apps/hub/src/components/UnitCard.tsx`

**Step 1: Create UnitCard component**

Create `apps/hub/src/components/UnitCard.tsx`:

```typescript
import { ChevronRight } from 'lucide-react';
import type { TopicDefinition, TopicMastery, UnitProgress } from '@/types/roadmap';
import { TopicNode } from './TopicNode';
import { TopicDetail } from './TopicDetail';

interface UnitCardProps {
  unit: UnitProgress;
  topics: TopicDefinition[];
  isExpanded: boolean;
  selectedTopic: string | null;
  topicMasteryMap: Map<string, TopicMastery>;
  allTopics: Map<string, TopicDefinition>;
  onToggle: () => void;
  onSelectTopic: (topicId: string | null) => void;
}

export function UnitCard({
  unit,
  topics,
  isExpanded,
  selectedTopic,
  topicMasteryMap,
  allTopics,
  onToggle,
  onSelectTopic,
}: UnitCardProps) {
  const progressPct = unit.totalCount > 0
    ? Math.round((unit.masteredCount / unit.totalCount) * 100)
    : 0;

  const selectedTopicDef = selectedTopic ? topics.find((t) => t.id === selectedTopic) : null;
  const selectedTopicMastery = selectedTopic ? topicMasteryMap.get(selectedTopic) : null;

  return (
    <section className="unit-card">
      <button className="unit-card-header" onClick={onToggle} type="button">
        <ChevronRight
          size={16}
          className={`unit-card-chevron ${isExpanded ? 'expanded' : ''}`}
        />
        <div className="unit-card-titles">
          <span className="unit-card-title">{unit.titleEn}</span>
          <span className="unit-card-title-ar font-arabic" dir="rtl">{unit.titleAr}</span>
        </div>
        <span className="unit-card-progress-text">
          {unit.masteredCount}/{unit.totalCount}
        </span>
        <div className="unit-card-progress-bar">
          <div className="unit-card-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </button>

      {isExpanded && (
        <div className="unit-card-body animate-fade-in">
          <div className="topic-grid">
            {topics.map((topic) => {
              const mastery = topicMasteryMap.get(topic.id) ?? {
                topicId: topic.id,
                status: 'not-started' as const,
                percentage: 0,
              };
              return (
                <TopicNode
                  key={topic.id}
                  topic={topic}
                  mastery={mastery}
                  isSelected={selectedTopic === topic.id}
                  onClick={() => onSelectTopic(topic.id)}
                />
              );
            })}
          </div>

          {selectedTopicDef && selectedTopicMastery && (
            <TopicDetail
              topic={selectedTopicDef}
              mastery={selectedTopicMastery}
              topicMasteryMap={topicMasteryMap}
              allTopics={allTopics}
              onSelectTopic={(id) => onSelectTopic(id)}
            />
          )}
        </div>
      )}
    </section>
  );
}
```

**Step 2: Build and typecheck**

Run: `npx turbo typecheck --filter=@arabtools/hub`
Expected: PASS

**Step 3: Commit**

```bash
git add apps/hub/src/components/UnitCard.tsx
git commit -m "feat(hub): add UnitCard component with collapsible topic grid"
```

---

### Task 8: RoadmapView Component

**Files:**
- Create: `apps/hub/src/components/RoadmapView.tsx`

**Step 1: Create RoadmapView component**

Create `apps/hub/src/components/RoadmapView.tsx`:

```typescript
import { useMemo } from 'react';
import { ClipboardList } from 'lucide-react';
import type { TopicDefinition } from '@/types/roadmap';
import { useRoadmapProgress } from '@/hooks/useRoadmapProgress';
import { useRoadmapState } from '@/hooks/useRoadmapState';
import { getTopicsByUnit } from '@/data/topics';
import { UnitCard } from './UnitCard';

export function RoadmapView() {
  const { hasTashkhisData, topicMasteryMap, unitProgress } = useRoadmapProgress();
  const { expandedUnits, selectedTopic, toggleUnit, selectTopic } = useRoadmapState(unitProgress);
  const topicsByUnit = useMemo(() => getTopicsByUnit(), []);

  // Flat map of all topics for TopicDetail prereq/dependent lookup
  const allTopics = useMemo(() => {
    const map = new Map<string, TopicDefinition>();
    for (const [, topics] of topicsByUnit) {
      for (const topic of topics) {
        map.set(topic.id, topic);
      }
    }
    return map;
  }, [topicsByUnit]);

  return (
    <div className="roadmap-view animate-fade-in-up">
      {!hasTashkhisData && (
        <div className="roadmap-cta">
          <ClipboardList size={20} />
          <div>
            <p className="roadmap-cta-title">Take the Placement Test</p>
            <p className="roadmap-cta-desc">See your progress across all 43 grammar topics.</p>
          </div>
          <a
            href="https://arabtools-tashkhis.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="roadmap-cta-btn"
          >
            Start Test
          </a>
        </div>
      )}

      <div className="roadmap-units">
        {unitProgress.map((unit) => (
          <UnitCard
            key={unit.unitNumber}
            unit={unit}
            topics={topicsByUnit.get(unit.unitNumber) ?? []}
            isExpanded={expandedUnits.has(unit.unitNumber)}
            selectedTopic={
              selectedTopic && topicsByUnit.get(unit.unitNumber)?.some((t) => t.id === selectedTopic)
                ? selectedTopic
                : null
            }
            topicMasteryMap={topicMasteryMap}
            allTopics={allTopics}
            onToggle={() => toggleUnit(unit.unitNumber)}
            onSelectTopic={selectTopic}
          />
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Build and typecheck**

Run: `npx turbo typecheck --filter=@arabtools/hub`
Expected: PASS

**Step 3: Commit**

```bash
git add apps/hub/src/components/RoadmapView.tsx
git commit -m "feat(hub): add RoadmapView container with CTA and unit cards"
```

---

### Task 9: View Switching in Hub.tsx

**Files:**
- Modify: `apps/hub/src/components/Hub.tsx`

**Step 1: Add view state and tab switching to Hub.tsx**

Replace the contents of `apps/hub/src/components/Hub.tsx` with:

```typescript
import { useState } from 'react';
import { usePersistedState } from '@arabtools/core';
import { useHubPreferences } from '@/hooks/useHubPreferences';
import { Sidebar, HamburgerButton } from './Sidebar';
import { PinnedSection } from './PinnedSection';
import { CategorySection } from './CategorySection';
import { HiddenToolsDrawer } from './HiddenToolsDrawer';
import { RoadmapView } from './RoadmapView';

type HubView = 'tools' | 'roadmap';

export function Hub() {
  const {
    pin,
    unpin,
    hide,
    unhide,
    pinnedTools,
    hiddenTools,
    visibleToolsByCategory,
    isPinned,
    hiddenCount,
  } = useHubPreferences();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeView, setActiveView] = usePersistedState<HubView>('arabtools-hub-view', 'tools');

  return (
    <div className="app-layout">
      <HamburgerButton onClick={() => setSidebarOpen(true)} />

      <Sidebar
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
        isPinned={isPinned}
        hiddenCount={hiddenCount}
        onShowHidden={() => setDrawerOpen(true)}
      />

      <main className="main-content">
        <div className="main-content-center">
          <div className="animate-fade-in-up">
            <div className="hero">
              <h1 className="hero-title">Arab Tools</h1>
              <p className="hero-subtitle font-arabic" dir="rtl">أدوات العربية</p>
              <p className="hero-description">
                Your Arabic learning toolkit — grammar, morphology, vocabulary, reading, and more.
              </p>
            </div>
          </div>

          <div className="view-tabs">
            <button
              className={`view-tab ${activeView === 'tools' ? 'view-tab--active' : ''}`}
              onClick={() => setActiveView('tools')}
              type="button"
            >
              Tools
            </button>
            <button
              className={`view-tab ${activeView === 'roadmap' ? 'view-tab--active' : ''}`}
              onClick={() => setActiveView('roadmap')}
              type="button"
            >
              Roadmap
            </button>
          </div>

          {activeView === 'tools' ? (
            <>
              <PinnedSection tools={pinnedTools} onUnpin={unpin} onHide={hide} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {Array.from(visibleToolsByCategory.entries()).map(([category, tools]) => (
                  <CategorySection
                    key={category}
                    category={category}
                    tools={tools}
                    isPinned={isPinned}
                    onPin={pin}
                    onUnpin={unpin}
                    onHide={hide}
                  />
                ))}
              </div>
            </>
          ) : (
            <RoadmapView />
          )}
        </div>
      </main>

      <HiddenToolsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        tools={hiddenTools}
        onUnhide={unhide}
      />
    </div>
  );
}
```

**Step 2: Build and typecheck**

Run: `npx turbo typecheck --filter=@arabtools/hub`
Expected: PASS

**Step 3: Commit**

```bash
git add apps/hub/src/components/Hub.tsx
git commit -m "feat(hub): add view switching between Tools and Roadmap"
```

---

### Task 10: CSS Styles for Roadmap

**Files:**
- Modify: `apps/hub/src/index.css`

**Step 1: Add roadmap styles to index.css**

Append the following CSS to the end of `apps/hub/src/index.css` (before the closing `}` of the last media query, or at the very end):

```css
/* ─── View Tabs ─── */
.view-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.view-tab {
  padding: 0.6rem 1.5rem;
  font-size: 0.9rem;
  font-family: var(--font-sans);
  font-weight: 500;
  color: var(--color-muted-foreground);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-tab:hover {
  color: var(--color-foreground);
}

.view-tab--active {
  color: var(--color-primary);
  border-bottom-color: var(--color-accent);
}

/* ─── Roadmap View ─── */
.roadmap-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.roadmap-cta {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: rgba(197, 162, 83, 0.08);
  border: 1px solid rgba(197, 162, 83, 0.2);
  border-radius: 12px;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

.roadmap-cta-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
}

.roadmap-cta-desc {
  font-size: 0.8rem;
  color: var(--color-muted-foreground);
  margin: 0;
}

.roadmap-cta-btn {
  margin-left: auto;
  padding: 0.4rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.2s ease;
}

.roadmap-cta-btn:hover {
  opacity: 0.9;
}

.roadmap-units {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* ─── Unit Card ─── */
.unit-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
}

.unit-card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  color: inherit;
  font-family: var(--font-sans);
  transition: background 0.15s ease;
}

.unit-card-header:hover {
  background: rgba(26, 49, 80, 0.03);
}

.unit-card-chevron {
  color: var(--color-primary);
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.unit-card-chevron.expanded {
  transform: rotate(90deg);
}

.unit-card-titles {
  flex: 1;
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  min-width: 0;
}

.unit-card-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-primary);
  font-family: var(--font-serif);
  white-space: nowrap;
}

.unit-card-title-ar {
  font-size: 0.9rem;
  color: var(--color-accent);
}

.unit-card-progress-text {
  font-size: 0.75rem;
  color: var(--color-muted-foreground);
  font-weight: 500;
  flex-shrink: 0;
}

.unit-card-progress-bar {
  width: 60px;
  height: 4px;
  background: var(--color-muted);
  border-radius: 2px;
  overflow: hidden;
  flex-shrink: 0;
}

.unit-card-progress-fill {
  height: 100%;
  background: var(--color-accent);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.unit-card-body {
  padding: 0 1.25rem 1.25rem;
  border-top: 1px solid var(--color-border);
}

/* ─── Topic Grid ─── */
.topic-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  padding-top: 1rem;
}

/* ─── Topic Node ─── */
.topic-node {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-card);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  font-family: var(--font-sans);
  color: inherit;
}

.topic-node:hover {
  border-color: rgba(26, 49, 80, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.topic-node--selected {
  border-color: var(--color-accent);
  box-shadow: 0 2px 8px rgba(197, 162, 83, 0.15);
}

.topic-node--not-started {
  opacity: 0.6;
}

.topic-node--in-progress {
  border-color: rgba(197, 162, 83, 0.4);
}

.topic-node--mastered {
  border-color: rgba(34, 139, 34, 0.3);
  background: rgba(34, 139, 34, 0.04);
}

.topic-node-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 0.55rem;
  font-weight: 700;
}

.topic-node--not-started .topic-node-indicator {
  background: var(--color-muted);
  color: var(--color-muted-foreground);
}

.topic-node--in-progress .topic-node-indicator {
  background: rgba(197, 162, 83, 0.15);
  color: var(--color-accent);
}

.topic-node--mastered .topic-node-indicator {
  background: rgba(34, 139, 34, 0.15);
  color: forestgreen;
}

.topic-node-pct {
  font-size: 0.55rem;
  font-weight: 700;
  line-height: 1;
}

.topic-node-label {
  font-size: 0.78rem;
  font-weight: 500;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.topic-node-label-ar {
  font-size: 0.75rem;
  color: var(--color-muted-foreground);
  flex-shrink: 0;
}

/* ─── Topic Detail Panel ─── */
.topic-detail {
  margin-top: 1rem;
  padding: 1.25rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 10px;
}

.topic-detail-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.topic-detail-title {
  font-size: 1.1rem;
  font-family: var(--font-serif);
  color: var(--color-primary);
  margin: 0;
}

.topic-detail-title-ar {
  font-size: 1rem;
  color: var(--color-accent);
  margin: 0.15rem 0 0;
}

.topic-detail-status {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  white-space: nowrap;
}

.topic-detail-status--not-started {
  background: var(--color-muted);
  color: var(--color-muted-foreground);
}

.topic-detail-status--in-progress {
  background: rgba(197, 162, 83, 0.12);
  color: #8b6914;
}

.topic-detail-status--mastered {
  background: rgba(34, 139, 34, 0.1);
  color: forestgreen;
}

.topic-detail-section {
  margin-top: 0.75rem;
}

.topic-detail-section-title {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-muted-foreground);
  margin: 0 0 0.4rem;
  font-family: var(--font-sans);
}

.topic-detail-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.topic-chip {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-card);
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: var(--font-sans);
  color: var(--color-foreground);
}

.topic-chip:hover {
  border-color: var(--color-accent);
}

.topic-chip--mastered {
  border-color: rgba(34, 139, 34, 0.3);
  background: rgba(34, 139, 34, 0.04);
}

.topic-chip--in-progress {
  border-color: rgba(197, 162, 83, 0.3);
  background: rgba(197, 162, 83, 0.04);
}

.topic-detail-tools {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.topic-detail-tool {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-card);
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
}

.topic-detail-tool:hover {
  border-color: var(--color-accent);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.topic-detail-tool-name {
  font-size: 0.8rem;
  font-weight: 500;
  flex: 1;
}

.topic-detail-tool-name-ar {
  font-size: 0.78rem;
  color: var(--color-accent);
}

.topic-detail-tool-icon {
  color: var(--color-muted-foreground);
  flex-shrink: 0;
}

/* ─── Roadmap Responsive ─── */
@media (max-width: 900px) {
  .topic-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .topic-detail-tools {
    grid-template-columns: 1fr;
  }

  .unit-card-titles {
    flex-direction: column;
    gap: 0;
  }
}

@media (max-width: 640px) {
  .topic-grid {
    grid-template-columns: 1fr;
  }

  .roadmap-cta {
    flex-direction: column;
    text-align: center;
  }

  .roadmap-cta-btn {
    margin-left: 0;
  }

  .topic-detail-header {
    flex-direction: column;
    gap: 0.5rem;
  }
}
```

**Step 2: Build and typecheck**

Run: `npx turbo typecheck --filter=@arabtools/hub`
Expected: PASS

**Step 3: Visual test**

Run: `npx turbo dev --filter=@arabtools/hub`
Open `http://localhost:5173` and verify:
- Two tabs visible (Tools / Roadmap)
- Tools view works as before
- Roadmap view shows 6 unit cards
- Unit cards expand/collapse
- Topic nodes display with correct states
- Clicking a topic shows the detail panel
- Tool links in detail panel work
- If no tashkhis data, CTA banner shows

**Step 4: Commit**

```bash
git add apps/hub/src/index.css
git commit -m "feat(hub): add CSS styles for roadmap view, unit cards, topic nodes, and detail panel"
```

---

### Task 11: Build Verification and Final Commit

**Files:**
- None new

**Step 1: Full typecheck**

Run: `npx turbo typecheck --filter=@arabtools/hub`
Expected: PASS with zero errors

**Step 2: Full build**

Run: `npx turbo build --filter=@arabtools/hub`
Expected: PASS, no chunk size warnings (roadmap is small data, no heavy deps)

**Step 3: Manual smoke test**

Run: `npx turbo dev --filter=@arabtools/hub`

Verify all of these:
1. Hub loads at `http://localhost:5173`
2. Tools tab is the default (or whatever was last persisted)
3. Tab switching works and persists on reload
4. Roadmap shows 6 units with correct titles (EN + AR)
5. Unit 1 is expanded by default (if no tashkhis data)
6. Clicking a topic opens the detail panel inline
7. Clicking the same topic closes the detail panel
8. Clicking a different topic in the same unit switches
9. Prerequisites and dependents in detail panel are clickable (jumps to that topic's unit)
10. Tool links open in new tab
11. "Take Placement Test" CTA shows when no tashkhis data
12. Mobile responsive: sidebar collapses, topic grid goes to 1-col

**Step 4: Commit (if any fixes were needed)**

```bash
git add -A
git commit -m "fix(hub): address roadmap visual/functional issues from smoke test"
```
