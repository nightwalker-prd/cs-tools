# Sarf Navigator Classic Path — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a Classic learning path to sarf-navigator with 21 topics across 4 units, populated from As-Sughra (beginner) and Al-Wusta (intermediate) textbooks, using the same view-switching pattern as nahw-navigator.

**Architecture:** Data-driven view switching via `view-data.ts` that provides `getTopicsForView(mode)`, `getCategoriesForView(mode)`, `getTopicMapForView(mode)`. The same UI components render both Classic and FSTU views with different data. View preference persisted to `arabtools-sarf-view` in localStorage.

**Tech Stack:** TypeScript 5.7, React 19, Vite 6, Tailwind CSS 4.0, `@arabtools/core` (usePersistedState)

---

## Task 1: Create classic-categories.ts

**Files:**
- Create: `apps/sarf-navigator/src/data/classic-categories.ts`

**Step 1: Create the categories file**

```typescript
import type { SarfCategory } from './types';

export const classicCategories: SarfCategory[] = [
  {
    id: 'cl-introduction',
    titleAr: 'المقدمة',
    titleEn: 'Introduction',
    icon: 'BookOpen',
    description: 'Foundational concepts: word types, verb categories, morphological scale, and core principles.',
    subcategories: [
      {
        id: 'cl-word-fundamentals',
        titleAr: 'أساسيات الكلمة',
        titleEn: 'Word Fundamentals',
        topicIds: ['cl-word-types', 'cl-verb-categories'],
      },
      {
        id: 'cl-morphology-basics',
        titleAr: 'أساسيات الصرف',
        titleEn: 'Morphology Basics',
        topicIds: ['cl-morphological-scale', 'cl-foundational-principles'],
      },
    ],
  },
  {
    id: 'cl-verb-paradigms',
    titleAr: 'أبواب الفعل',
    titleEn: 'Verb Paradigms',
    icon: 'Layers',
    description: 'The six trilateral doors and augmented verb patterns for trilateral and quadrilateral roots.',
    subcategories: [
      {
        id: 'cl-bare-trilateral',
        titleAr: 'الثلاثي المجرد',
        titleEn: 'Bare Trilateral',
        topicIds: ['cl-six-trilateral-doors'],
      },
      {
        id: 'cl-augmented-trilateral',
        titleAr: 'الثلاثي المزيد',
        titleEn: 'Augmented Trilateral',
        topicIds: ['cl-augmented-one', 'cl-augmented-two', 'cl-augmented-three'],
      },
      {
        id: 'cl-quadrilateral',
        titleAr: 'الرباعي',
        titleEn: 'Quadrilateral',
        topicIds: ['cl-quadrilateral-verbs'],
      },
    ],
  },
  {
    id: 'cl-derivatives',
    titleAr: 'المشتقات',
    titleEn: 'Derivatives',
    icon: 'PenTool',
    description: 'Verbal nouns, tense conjugations, imperative/prohibition, and the ten derived noun types.',
    subcategories: [
      {
        id: 'cl-verbal-nouns',
        titleAr: 'المصادر',
        titleEn: 'Verbal Nouns',
        topicIds: ['cl-masdar'],
      },
      {
        id: 'cl-tenses',
        titleAr: 'الأزمنة',
        titleEn: 'Tenses',
        topicIds: ['cl-past-tense', 'cl-present-tense', 'cl-imperative-prohibition'],
      },
      {
        id: 'cl-derived-nouns',
        titleAr: 'الأسماء المشتقة',
        titleEn: 'Derived Nouns',
        topicIds: ['cl-derived-nouns'],
      },
    ],
  },
  {
    id: 'cl-seven-categories',
    titleAr: 'الأقسام السبعة',
    titleEn: 'Seven Categories',
    icon: 'Zap',
    description: 'Sound, doubled, weak (assimilated, hollow, defective, doubly-weak), and hamzated verbs.',
    subcategories: [
      {
        id: 'cl-sound-doubled',
        titleAr: 'الصحيح والمضاعف',
        titleEn: 'Sound & Doubled',
        topicIds: ['cl-sound-verb', 'cl-doubled-verb'],
      },
      {
        id: 'cl-weak-verbs',
        titleAr: 'المعتل',
        titleEn: 'Weak Verbs',
        topicIds: ['cl-assimilated-verb', 'cl-hollow-verb', 'cl-defective-verb', 'cl-doubly-weak-verb'],
      },
      {
        id: 'cl-hamzated',
        titleAr: 'المهموز',
        titleEn: 'Hamzated',
        topicIds: ['cl-hamzated-verb'],
      },
    ],
  },
];
```

Note: All classic topic IDs use `cl-` prefix to avoid collisions with existing FSTU topic IDs.

**Step 2: Verify no TypeScript errors**

Run: `cd apps/sarf-navigator && npx tsc --noEmit`

This will fail because classic topics don't exist yet, but the categories file itself should parse cleanly.

---

## Task 2: Create view-data.ts

**Files:**
- Create: `apps/sarf-navigator/src/data/view-data.ts`

**Step 1: Create the view switching facade**

```typescript
import type { SarfTopic, SarfCategory } from './types';
import { allTopics, topicMap as fstuTopicMap } from './topics';
import { categories as fstuCategories } from './categories';
import { classicTopics, classicTopicMap } from './topics/classic-index';
import { classicCategories } from './classic-categories';

export type ViewMode = 'classic' | 'fstu';

export function getTopicsForView(view: ViewMode): SarfTopic[] {
  return view === 'classic' ? classicTopics : allTopics;
}

export function getTopicMapForView(view: ViewMode): Record<string, SarfTopic> {
  return view === 'classic' ? classicTopicMap : fstuTopicMap;
}

export function getCategoriesForView(view: ViewMode): SarfCategory[] {
  return view === 'classic' ? classicCategories : fstuCategories;
}
```

Note: This file cannot be verified yet — it imports `classic-index` which will be created in Task 9. Create it now for reference; it will compile after Task 9.

---

## Task 3: Refactor components to accept data via props

Six files need to stop importing data directly and accept it via props instead. This mirrors the nahw-navigator pattern exactly.

**Files:**
- Modify: `apps/sarf-navigator/src/hooks/useSearch.ts`
- Modify: `apps/sarf-navigator/src/components/TopicTree.tsx`
- Modify: `apps/sarf-navigator/src/components/HomePage.tsx`
- Modify: `apps/sarf-navigator/src/components/Breadcrumb.tsx`
- Modify: `apps/sarf-navigator/src/components/TopicView.tsx`
- Modify: `apps/sarf-navigator/src/components/Sidebar.tsx`

### Step 1: Refactor useSearch.ts

Replace the entire file with:

```typescript
import { useState, useMemo, useCallback } from 'react';
import { removeDiacritics, normalizeArabic } from '@arabtools/core';
import type { SarfTopic, SarfCategory } from '../data/types';

export interface SearchResult {
  topic: SarfTopic;
  categoryName: string;
}

function normalize(text: string): string {
  return removeDiacritics(normalizeArabic(text)).toLowerCase();
}

export function useSearch(topics: SarfTopic[], categories: SarfCategory[]) {
  const [query, setQuery] = useState('');

  const searchIndex = useMemo(() =>
    topics.map(topic => {
      const category = categories.find(c => c.id === topic.categoryId);
      const searchable = normalize(
        [topic.titleAr, topic.titleEn, topic.transliteration, ...topic.tags].join(' ')
      );
      return { topic, categoryName: category?.titleEn ?? '', searchable };
    }),
    [topics, categories]
  );

  const results = useMemo((): SearchResult[] => {
    const q = query.trim();
    if (q.length < 2) return [];

    const normalizedQuery = normalize(q);

    return searchIndex
      .filter(entry => entry.searchable.includes(normalizedQuery))
      .slice(0, 10)
      .map(entry => ({
        topic: entry.topic,
        categoryName: entry.categoryName,
      }));
  }, [query, searchIndex]);

  const clearSearch = useCallback(() => setQuery(''), []);

  return { query, setQuery, results, clearSearch };
}
```

Key change: `useSearch()` now takes `topics` and `categories` as parameters instead of importing them. The `searchIndex` is built inside `useMemo` (reactive to view changes) instead of at module level.

### Step 2: Refactor TopicTree.tsx

Replace the entire file with:

```typescript
import { useState } from 'react';
import { usePersistedState } from '@arabtools/core';
import type { SarfTopic, SarfCategory } from '../data/types';
import { LevelDots } from './LevelTabs';

interface TopicTreeProps {
  categories: SarfCategory[];
  topicMap: Record<string, SarfTopic>;
  activeSlug: string;
  visitedPages: string[];
  onNavigate: (slug: string) => void;
}

export function TopicTree({ categories, topicMap, activeSlug, visitedPages, onNavigate }: TopicTreeProps) {
  const [expanded, setExpanded] = usePersistedState<string[]>('arabtools-sarf-expanded', ['fundamentals']);

  const toggleSection = (id: string) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <nav className="sidebar-nav">
      {categories.map(cat => {
        const isExpanded = expanded.includes(cat.id);
        const hasActiveTopic = cat.subcategories.some(sub =>
          sub.topicIds.some(tid => tid === activeSlug)
        );

        return (
          <div key={cat.id} className="folder-group">
            <button
              className={`folder-header ${hasActiveTopic ? 'active' : ''}`}
              onClick={() => toggleSection(cat.id)}
            >
              <svg className={`chevron-icon ${isExpanded ? 'expanded' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="folder-name">{cat.titleEn}</span>
              <span className="folder-title-ar">{cat.titleAr}</span>
            </button>

            {isExpanded && (
              <div className="folder-children">
                {cat.subcategories.map(sub => (
                  <SubcategoryGroup
                    key={sub.id}
                    subcategory={sub}
                    topicMap={topicMap}
                    activeSlug={activeSlug}
                    visitedPages={visitedPages}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

interface SubcategoryGroupProps {
  subcategory: { id: string; titleEn: string; titleAr: string; topicIds: string[] };
  topicMap: Record<string, SarfTopic>;
  activeSlug: string;
  visitedPages: string[];
  onNavigate: (slug: string) => void;
}

function SubcategoryGroup({ subcategory, topicMap, activeSlug, visitedPages, onNavigate }: SubcategoryGroupProps) {
  const [subExpanded, setSubExpanded] = useState(true);
  const topics = subcategory.topicIds.map(id => topicMap[id]).filter(Boolean);

  if (topics.length === 0) return null;

  // If only one topic, skip the subcategory header
  if (topics.length === 1) {
    const topic = topics[0];
    const isActive = topic.id === activeSlug;
    const isVisited = visitedPages.includes(topic.id);
    return (
      <button
        className={`nav-item ${isActive ? 'active' : ''}`}
        onClick={() => onNavigate(topic.id)}
      >
        <span className={`nav-dot ${isVisited ? 'visited' : ''}`} />
        <span className="nav-title">{topic.titleEn}</span>
        <LevelDots levels={topic.levels} />
      </button>
    );
  }

  return (
    <div className="subcategory-group">
      <button
        className="subcategory-header"
        onClick={() => setSubExpanded(!subExpanded)}
      >
        <span className="subcategory-name">{subcategory.titleEn}</span>
      </button>
      {subExpanded && topics.map(topic => {
        const isActive = topic.id === activeSlug;
        const isVisited = visitedPages.includes(topic.id);
        return (
          <button
            key={topic.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onNavigate(topic.id)}
          >
            <span className={`nav-dot ${isVisited ? 'visited' : ''}`} />
            <span className="nav-title">{topic.titleEn}</span>
            <LevelDots levels={topic.levels} />
          </button>
        );
      })}
    </div>
  );
}
```

Key changes: Removed `import { categories }` and `import { topicMap }`. Added `categories` and `topicMap` to `TopicTreeProps`. Passed `topicMap` down to `SubcategoryGroup`.

### Step 3: Refactor HomePage.tsx

Replace the entire file with:

```typescript
import type { SarfTopic, SarfCategory } from '../data/types';

interface HomePageProps {
  categories: SarfCategory[];
  allTopics: SarfTopic[];
  onNavigate: (slug: string) => void;
}

export function HomePage({ categories, allTopics, onNavigate }: HomePageProps) {
  return (
    <div className="animate-fade-in-up">
      <div className="hero">
        <h1 className="hero-title">Sarf Navigator</h1>
        <p className="hero-subtitle font-arabic">دليل الصرف</p>
        <p className="hero-description">
          Interactive Arabic morphology reference with beginner, intermediate, and advanced levels.
        </p>
      </div>

      <div className="nav-cards">
        {categories.map(cat => {
          const topicCount = allTopics.filter(t => t.categoryId === cat.id).length;
          const firstTopicId = cat.subcategories[0]?.topicIds[0];

          return (
            <button
              key={cat.id}
              className="nav-card"
              onClick={() => firstTopicId && onNavigate(firstTopicId)}
            >
              <div className="nav-card-header">
                <h2>{cat.titleEn}</h2>
                <span className="font-arabic">{cat.titleAr}</span>
              </div>
              <p className="nav-card-desc">{cat.description}</p>
              <div className="nav-card-tags">
                <span className="tag">{topicCount} topics</span>
                {cat.subcategories.map(sub => (
                  <span key={sub.id} className="tag">{sub.titleEn}</span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <div className="home-content">
        <div className="home-stats">
          <div className="stat">
            <div className="stat-value">{allTopics.length}</div>
            <div className="stat-label">Topics</div>
          </div>
          <div className="stat">
            <div className="stat-value">{allTopics.reduce((sum, t) => sum + t.levels.length, 0)}</div>
            <div className="stat-label">Lessons</div>
          </div>
          <div className="stat">
            <div className="stat-value">3</div>
            <div className="stat-label">Levels</div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Key changes: Removed direct imports of `categories` and `allTopics`. Added them as props. Removed the hardcoded "FSTU Sarf curriculum" text from hero description.

### Step 4: Refactor Breadcrumb.tsx

Replace the entire file with:

```typescript
import type { SarfTopic, SarfCategory } from '../data/types';

interface BreadcrumbProps {
  topic: SarfTopic;
  categories: SarfCategory[];
  onGoHome: () => void;
}

export function Breadcrumb({ topic, categories, onGoHome }: BreadcrumbProps) {
  const category = categories.find(c => c.id === topic.categoryId);

  return (
    <nav className="breadcrumb">
      <button onClick={onGoHome} className="breadcrumb-link">Home</button>
      <span className="breadcrumb-sep">/</span>
      {category && (
        <>
          <span className="breadcrumb-item">{category.titleEn}</span>
          <span className="breadcrumb-sep">/</span>
        </>
      )}
      <span className="breadcrumb-current">{topic.titleEn}</span>
    </nav>
  );
}
```

Key change: Removed `import { categories }`. Added `categories` to `BreadcrumbProps`.

### Step 5: Refactor TopicView.tsx

Replace the entire file with:

```typescript
import { usePersistedState } from '@arabtools/core';
import type { SarfTopic, SarfCategory, Difficulty } from '../data/types';
import { Breadcrumb } from './Breadcrumb';
import { LevelTabs } from './LevelTabs';
import { LevelContent } from './LevelContent';
import { RelatedTopics } from './RelatedTopics';

interface TopicViewProps {
  topic: SarfTopic;
  categories: SarfCategory[];
  onNavigate: (slug: string) => void;
  onGoHome: () => void;
}

export function TopicView({ topic, categories, onNavigate, onGoHome }: TopicViewProps) {
  const [activeLevel, setActiveLevel] = usePersistedState<Difficulty>('arabtools-sarf-level', 'beginner');

  // Find the content for the active level, fall back to first available
  const availableLevels = topic.levels.map(l => l.difficulty);
  const effectiveLevel = availableLevels.includes(activeLevel) ? activeLevel : availableLevels[0];
  const content = topic.levels.find(l => l.difficulty === effectiveLevel);

  return (
    <div className="topic-view animate-fade-in-up">
      <Breadcrumb topic={topic} categories={categories} onGoHome={onGoHome} />

      <header className="topic-header">
        <h1 className="topic-title-en">{topic.titleEn}</h1>
        <p className="topic-title-ar font-arabic" dir="rtl">{topic.titleAr}</p>
        <p className="topic-transliteration">{topic.transliteration}</p>
      </header>

      <LevelTabs
        levels={topic.levels}
        activeLevel={effectiveLevel}
        onChangeLevel={setActiveLevel}
      />

      {content && <LevelContent content={content} />}

      <RelatedTopics topicIds={topic.relatedTopicIds} onNavigate={onNavigate} />
    </div>
  );
}
```

Key change: Added `categories: SarfCategory[]` to `TopicViewProps`. Passes `categories` to `Breadcrumb`.

Note: `RelatedTopics` is NOT changed — it still imports the FSTU `topicMap` directly, matching nahw-navigator's pattern. Classic topics should use FSTU topic IDs in `relatedTopicIds` where applicable.

### Step 6: Refactor Sidebar.tsx

Replace the entire file with:

```typescript
import { BookOpen, Menu, X } from 'lucide-react';
import type { SarfTopic, SarfCategory } from '../data/types';
import type { ViewMode } from '../data/view-data';
import { SearchInput } from './SearchInput';
import { TopicTree } from './TopicTree';
import type { SearchResult } from '../hooks/useSearch';

interface SidebarProps {
  activeSlug: string;
  visitedPages: string[];
  query: string;
  searchResults: SearchResult[];
  onQueryChange: (q: string) => void;
  onClearSearch: () => void;
  onNavigate: (slug: string) => void;
  onGoHome: () => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  categories: SarfCategory[];
  allTopics: SarfTopic[];
  topicMap: Record<string, SarfTopic>;
}

export function Sidebar({
  activeSlug,
  visitedPages,
  query,
  searchResults,
  onQueryChange,
  onClearSearch,
  onNavigate,
  onGoHome,
  sidebarOpen,
  onCloseSidebar,
  viewMode,
  onViewChange,
  categories,
  allTopics,
  topicMap,
}: SidebarProps) {
  const visitedCount = visitedPages.length;
  const totalTopics = allTopics.length;

  return (
    <>
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={onCloseSidebar}
      />

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-header-top">
            <button className="sidebar-close-btn" onClick={onCloseSidebar}>
              <X size={18} />
            </button>
          </div>
          <button className="sidebar-brand" onClick={onGoHome}>
            <span className="brand-icon">ص</span>
            <div>
              <h1>Sarf Navigator</h1>
              <div className="subtitle">دليل الصرف</div>
            </div>
          </button>
          <div className="sidebar-stats">
            <div className="stat">
              <div className="stat-value">{visitedCount}</div>
              <div className="stat-label">Visited</div>
            </div>
            <div className="stat">
              <div className="stat-value">{totalTopics}</div>
              <div className="stat-label">Topics</div>
            </div>
          </div>
        </div>

        <div className="view-toggle">
          <button
            className={`view-toggle-btn ${viewMode === 'classic' ? 'active' : ''}`}
            onClick={() => onViewChange('classic')}
          >
            Classic
          </button>
          <button
            className={`view-toggle-btn ${viewMode === 'fstu' ? 'active' : ''}`}
            onClick={() => onViewChange('fstu')}
          >
            FSTU
          </button>
        </div>

        <div className="sidebar-search">
          <SearchInput
            query={query}
            results={searchResults}
            onQueryChange={onQueryChange}
            onSelect={(topicId) => {
              onNavigate(topicId);
              onCloseSidebar();
            }}
            onClear={onClearSearch}
          />
        </div>

        <TopicTree
          categories={categories}
          topicMap={topicMap}
          activeSlug={activeSlug}
          visitedPages={visitedPages}
          onNavigate={onNavigate}
        />

        <div className="sidebar-footer">
          <BookOpen size={14} />
          <span>Al-Qalam Sarf Series</span>
        </div>
      </aside>
    </>
  );
}

export function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="hamburger-btn" onClick={onClick}>
      <Menu size={20} />
    </button>
  );
}
```

Key changes: Added `viewMode`, `onViewChange`, `categories`, `allTopics`, `topicMap` props. Added view toggle buttons (`.view-toggle` div). Changed footer text to "Al-Qalam Sarf Series". Passes `categories` and `topicMap` to `TopicTree`.

---

## Task 4: Refactor SarfNavigator.tsx

**Files:**
- Modify: `apps/sarf-navigator/src/components/SarfNavigator.tsx`

**Step 1: Replace the entire file**

```typescript
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePersistedState } from '@arabtools/core';
import { useHashRouter } from '../hooks/useHashRouter';
import { useSearch } from '../hooks/useSearch';
import type { ViewMode } from '../data/view-data';
import { getTopicsForView, getTopicMapForView, getCategoriesForView } from '../data/view-data';
import { Sidebar, HamburgerButton } from './Sidebar';
import { HomePage } from './HomePage';
import { TopicView } from './TopicView';

export function SarfNavigator() {
  const { slug, navigate, goHome } = useHashRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visitedPages, setVisitedPages] = usePersistedState<string[]>('arabtools-sarf-visited', []);
  const [viewMode, setViewMode] = usePersistedState<ViewMode>('arabtools-sarf-view', 'classic');
  const mainRef = useRef<HTMLDivElement>(null);

  // Derive active data from view mode
  const activeTopics = getTopicsForView(viewMode);
  const activeTopicMap = getTopicMapForView(viewMode);
  const activeCategories = getCategoriesForView(viewMode);

  const { query, setQuery, results, clearSearch } = useSearch(activeTopics, activeCategories);

  // Resolve current topic
  const topic = slug ? activeTopicMap[slug] ?? null : null;

  // Navigate home if current slug doesn't exist in new view
  useEffect(() => {
    if (slug && !activeTopicMap[slug]) {
      goHome();
    }
  }, [viewMode, slug, activeTopicMap, goHome]);

  // Track visited pages
  useEffect(() => {
    if (slug && !visitedPages.includes(slug)) {
      setVisitedPages([...visitedPages, slug]);
    }
  }, [slug, visitedPages, setVisitedPages]);

  // Scroll to top on page change
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [slug]);

  const handleNavigate = useCallback((newSlug: string) => {
    navigate(newSlug);
    setSidebarOpen(false);
  }, [navigate]);

  const handleViewChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, [setViewMode]);

  return (
    <div className="app-layout">
      <HamburgerButton onClick={() => setSidebarOpen(true)} />

      <Sidebar
        activeSlug={slug}
        visitedPages={visitedPages}
        query={query}
        searchResults={results}
        onQueryChange={setQuery}
        onClearSearch={clearSearch}
        onNavigate={handleNavigate}
        onGoHome={goHome}
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
        viewMode={viewMode}
        onViewChange={handleViewChange}
        categories={activeCategories}
        allTopics={activeTopics}
        topicMap={activeTopicMap}
      />

      <main className="main-content" ref={mainRef}>
        {!slug ? (
          <HomePage categories={activeCategories} allTopics={activeTopics} onNavigate={handleNavigate} />
        ) : topic ? (
          <TopicView topic={topic} categories={activeCategories} onNavigate={handleNavigate} onGoHome={goHome} />
        ) : (
          <div className="empty-state">
            <h2>Topic Not Found</h2>
            <p>The topic &ldquo;{slug}&rdquo; could not be found.</p>
            <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={goHome}>
              Go Home
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
```

Key changes vs current: Added `viewMode` state via `usePersistedState('arabtools-sarf-view', 'classic')`. Uses `view-data.ts` functions to derive active data. Added `handleViewChange` callback. Passes new props to Sidebar, HomePage, TopicView. Added effect to navigate home when slug doesn't exist in new view.

---

## Task 5: Create classic-introduction.ts (Topics 1-4)

**Files:**
- Create: `apps/sarf-navigator/src/data/topics/classic-introduction.ts`

**Content sources:**
- **Beginner** content from: `/Users/miftah/Downloads/as-sughra-fi-tasreef/notes-as-sughra.md`
  - Topic 1 (word-types): Muqaddimah, Chapter 1 (أقسام الكلمة)
  - Topic 2 (verb-categories): Muqaddimah, Chapter 2 (أقسام الفعل)
  - Topic 3 (morphological-scale): Muqaddimah, Chapter 3 (الميزان الصرفي)
  - Topic 4 (foundational-principles): Maqsid 1, Section 1 (المبادئ — noun categories, trilateral/quadrilateral, mujarrad/mazeed, huroof az-ziyaadah)

- **Intermediate** content from: `/Users/miftah/Downloads/al-wusta-fi-as-tasreef/notes-1-muqaddima.md`
  - Topic 1: Section on أقسام الكلمة (deeper examples, grammatical details)
  - Topic 2: Section on أقسام الفعل (all sub-types: transitivity, voice, affirmation, conjugability, etc.)
  - Topic 3: Section on الميزان الصرفي (detailed rules, exceptions)
  - Topic 4: Section on المبادئ (expanded noun categories, huroof az-ziyaadah with mnemonic)

**Structure for each topic:**

```typescript
import type { SarfTopic } from '../types';

export const clWordTypes: SarfTopic = {
  id: 'cl-word-types',
  titleAr: 'أقسام الكلمة',
  titleEn: 'Word Types',
  transliteration: 'Aqsaam al-Kalima',
  categoryId: 'cl-introduction',
  subcategoryId: 'cl-word-fundamentals',
  levels: [
    {
      difficulty: 'beginner',
      summary: '...from As-Sughra...',
      body: `## ...markdown content...`,
      rules: [...],
      tables: [...],
      sourceRef: 'As-Sughra fi at-Tasreef, Muqaddimah, Chapter 1',
    },
    {
      difficulty: 'intermediate',
      summary: '...from Al-Wusta...',
      body: `## ...markdown content...`,
      rules: [...],
      examples: [...],
      tables: [...],
      sourceRef: 'Al-Wusta fi at-Tasreef, Muqaddimah',
    },
  ],
  relatedTopicIds: ['cl-verb-categories', 'cl-foundational-principles'],
  tags: ['ism', 'fi\'l', 'harf', 'noun', 'verb', 'particle', 'word types', 'kalima'],
};

// ... clVerbCategories, clMorphologicalScale, clFoundationalPrinciples
```

Read the source files, extract the relevant sections, and populate each topic's `body`, `rules`, `examples`, and `tables` fields. Follow the exact format shown in the existing `fundamentals.ts` file.

---

## Task 6: Create classic-verb-paradigms.ts (Topics 5-9)

**Files:**
- Create: `apps/sarf-navigator/src/data/topics/classic-verb-paradigms.ts`

**Content sources:**
- **Beginner** from As-Sughra (`notes-as-sughra.md`):
  - Topic 5 (six-trilateral-doors): Maqsid 1, Section 2 — 6 doors with vowel patterns
  - Topic 6 (augmented-one): Maqsid 1, Section 3 — تفعيل/مفاعلة/إفعال
  - Topic 7 (augmented-two): Maqsid 1, Section 3 — 5 patterns
  - Topic 8 (augmented-three): Maqsid 1, Section 3 — استفعال + rare forms
  - Topic 9 (quadrilateral): Maqsid 1, Section 4 — bare + augmented quadrilateral

- **Intermediate** from Al-Wusta:
  - Topic 5: `notes-1-muqaddima.md` — 6 doors detailed (meanings, typical usage per door)
  - Topic 6: `notes-1-muqaddima.md` — 3 baabs with 8-10 semantic meanings each
  - Topic 7: `notes-2-maqsid-1.md` — 5 patterns detailed
  - Topic 8: `notes-2-maqsid-1.md` — istif'aal + rare forms
  - Topic 9: `notes-2-maqsid-1.md` — quadrilateral detailed (6 mulhaq patterns)

**Exports:** `clSixTrilateralDoors`, `clAugmentedOne`, `clAugmentedTwo`, `clAugmentedThree`, `clQuadrilateralVerbs`

Follow the same pattern as Task 5 — each topic has beginner (As-Sughra) and intermediate (Al-Wusta) levels.

---

## Task 7: Create classic-derivatives.ts (Topics 10-14)

**Files:**
- Create: `apps/sarf-navigator/src/data/topics/classic-derivatives.ts`

**Content sources:**
- **Beginner** from As-Sughra (`notes-as-sughra.md`):
  - Topic 10 (masdar): Maqsid 2, masdar section
  - Topic 11 (past-tense): Maqsid 2, past tense section
  - Topic 12 (present-tense): Maqsid 2, present tense section
  - Topic 13 (imperative-prohibition): Maqsid 2, amr + nahi sections
  - Topic 14 (derived-nouns): Maqsid 2, 10 derived nouns section

- **Intermediate** from Al-Wusta:
  - Topic 10: `notes-2-maqsid-1.md` — masdar patterns detailed
  - Topic 11: `notes-2-maqsid-1.md` — past tense 5 topics
  - Topic 12: `notes-2-maqsid-1.md` — present tense 6 topics + conclusion
  - Topic 13: `notes-2-maqsid-1.md` — imperative + noon of emphasis
  - Topic 14: `notes-3-maqsid-2.md` — all 10 derived nouns detailed

**Exports:** `clMasdar`, `clPastTense`, `clPresentTense`, `clImperativeProhibition`, `clDerivedNouns`

---

## Task 8: Create classic-seven-categories.ts (Topics 15-21)

**Files:**
- Create: `apps/sarf-navigator/src/data/topics/classic-seven-categories.ts`

**Content sources:**
- **Beginner** from As-Sughra (`notes-as-sughra.md`):
  - Topic 15 (sound-verb): Maqsid 3 — الصحيح
  - Topic 16 (doubled-verb): Maqsid 3 — المضاعف
  - Topic 17 (assimilated-verb): Maqsid 3 — المثال
  - Topic 18 (hollow-verb): Maqsid 3 — الأجوف
  - Topic 19 (defective-verb): Maqsid 3 — الناقص
  - Topic 20 (doubly-weak-verb): Maqsid 3 — اللفيف
  - Topic 21 (hamzated-verb): Maqsid 3 — المهموز

- **Intermediate** from Al-Wusta:
  - Topic 15: `notes-3-maqsid-2.md` — sound verb + i'lal overview
  - Topic 16: `notes-3-maqsid-2.md` — doubled verb + assimilation rules
  - Topic 17: `notes-3-maqsid-2.md` — assimilated verb detailed
  - Topic 18: `notes-3-maqsid-2.md` + `notes-4-maqsid-3.md` — hollow verb (present, masdar, derived nouns)
  - Topic 19: `notes-4-maqsid-3.md` — defective verb (5 patterns, complete i'lal)
  - Topic 20: `notes-4-maqsid-3.md` — doubly-weak (maqroon + mafrooq)
  - Topic 21: `notes-4-maqsid-3.md` — hamzated verb (3 types, takhfeef, special cases)

**Exports:** `clSoundVerb`, `clDoubledVerb`, `clAssimilatedVerb`, `clHollowVerb`, `clDefectiveVerb`, `clDoublyWeakVerb`, `clHamzatedVerb`

---

## Task 9: Create classic-index.ts

**Files:**
- Create: `apps/sarf-navigator/src/data/topics/classic-index.ts`

**Step 1: Create the index file**

```typescript
import type { SarfTopic } from '../types';

// Introduction
import { clWordTypes, clVerbCategories, clMorphologicalScale, clFoundationalPrinciples } from './classic-introduction';

// Verb Paradigms
import { clSixTrilateralDoors, clAugmentedOne, clAugmentedTwo, clAugmentedThree, clQuadrilateralVerbs } from './classic-verb-paradigms';

// Derivatives
import { clMasdar, clPastTense, clPresentTense, clImperativeProhibition, clDerivedNouns } from './classic-derivatives';

// Seven Categories
import { clSoundVerb, clDoubledVerb, clAssimilatedVerb, clHollowVerb, clDefectiveVerb, clDoublyWeakVerb, clHamzatedVerb } from './classic-seven-categories';

export const classicTopics: SarfTopic[] = [
  // Introduction
  clWordTypes,
  clVerbCategories,
  clMorphologicalScale,
  clFoundationalPrinciples,
  // Verb Paradigms
  clSixTrilateralDoors,
  clAugmentedOne,
  clAugmentedTwo,
  clAugmentedThree,
  clQuadrilateralVerbs,
  // Derivatives
  clMasdar,
  clPastTense,
  clPresentTense,
  clImperativeProhibition,
  clDerivedNouns,
  // Seven Categories
  clSoundVerb,
  clDoubledVerb,
  clAssimilatedVerb,
  clHollowVerb,
  clDefectiveVerb,
  clDoublyWeakVerb,
  clHamzatedVerb,
];

export const classicTopicMap: Record<string, SarfTopic> = {};
for (const topic of classicTopics) {
  classicTopicMap[topic.id] = topic;
}
```

---

## Task 10: Add view-toggle CSS

**Files:**
- Modify: `apps/sarf-navigator/src/index.css`

The `.view-toggle` CSS likely already exists (nahw-navigator shares the same CSS patterns). Check if `index.css` already has `.view-toggle` styles. If not, add these styles (from nahw-navigator's CSS):

```css
.view-toggle {
  display: flex;
  gap: 0.25rem;
  padding: 0 1rem;
  margin-bottom: 0.75rem;
}

.view-toggle-btn {
  flex: 1;
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.view-toggle-btn:hover {
  background: var(--bg-hover);
}

.view-toggle-btn.active {
  background: var(--lapis);
  color: white;
  border-color: var(--lapis);
}
```

Search for existing `.view-toggle` styles first. If they exist, skip this task.

---

## Task 11: Build and verify

**Step 1: TypeScript check**

Run: `cd apps/sarf-navigator && npx tsc --noEmit`
Expected: No errors

**Step 2: Build**

Run: `npx turbo build --filter=@arabtools/sarf-navigator`
Expected: Build succeeds

**Step 3: Manual verification**

Run: `npx turbo dev --filter=@arabtools/sarf-navigator`
Verify:
- Classic/FSTU toggle appears in sidebar
- Classic view shows 4 categories with 21 topics
- FSTU view shows original 5 categories with 33 topics
- Switching views navigates home if current topic doesn't exist in new view
- Search works in both views
- Breadcrumb shows correct category for each view
- Topic content renders with beginner/intermediate tabs

**Step 4: Commit**

```bash
git add apps/sarf-navigator/src/data/classic-categories.ts \
       apps/sarf-navigator/src/data/view-data.ts \
       apps/sarf-navigator/src/data/topics/classic-introduction.ts \
       apps/sarf-navigator/src/data/topics/classic-verb-paradigms.ts \
       apps/sarf-navigator/src/data/topics/classic-derivatives.ts \
       apps/sarf-navigator/src/data/topics/classic-seven-categories.ts \
       apps/sarf-navigator/src/data/topics/classic-index.ts \
       apps/sarf-navigator/src/components/SarfNavigator.tsx \
       apps/sarf-navigator/src/components/Sidebar.tsx \
       apps/sarf-navigator/src/components/TopicTree.tsx \
       apps/sarf-navigator/src/components/HomePage.tsx \
       apps/sarf-navigator/src/components/Breadcrumb.tsx \
       apps/sarf-navigator/src/components/TopicView.tsx \
       apps/sarf-navigator/src/hooks/useSearch.ts \
       apps/sarf-navigator/src/index.css
git commit -m "feat: add Classic learning path to sarf-navigator with 21 topics from As-Sughra and Al-Wusta textbooks"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Create classic-categories.ts | 1 new |
| 2 | Create view-data.ts | 1 new |
| 3 | Refactor 6 components to accept data via props | 6 modified |
| 4 | Refactor SarfNavigator.tsx with viewMode | 1 modified |
| 5 | Create classic-introduction.ts (topics 1-4) | 1 new |
| 6 | Create classic-verb-paradigms.ts (topics 5-9) | 1 new |
| 7 | Create classic-derivatives.ts (topics 10-14) | 1 new |
| 8 | Create classic-seven-categories.ts (topics 15-21) | 1 new |
| 9 | Create classic-index.ts | 1 new |
| 10 | Add view-toggle CSS (if missing) | 1 modified |
| 11 | Build, verify, commit | 0 |

**Totals:** 7 new files, 8 modified files
