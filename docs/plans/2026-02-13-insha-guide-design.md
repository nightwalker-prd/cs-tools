# insha-guide Design Document

**Date:** 2026-02-13
**App:** `@arabtools/insha-guide` (الإنشاء)
**Source:** Al-Ibtida' fi al-Kitabah wa al-Insha' by Abd al-Mu'izz al-Tunisi (100 lessons, 230 pages)

## Overview

A study + practice hybrid tool for Arabic composition (insha'). Students read structured lesson content then drill exercises, following the book's 40-lesson progressive curriculum. Combines nahw-navigator's sidebar/content rendering with fstu-exercises' interactive practice modes.

## Content Structure

6 units following the book's progression:

| Unit | Arabic | English | Lessons | Content |
|------|--------|---------|---------|---------|
| 1 | أسس الكلام | Foundations of Speech | 1-3 | Parts of speech, noun/verb/particle signs, triliteral verb patterns |
| 2 | الجملة والاستفهام | Sentences & Questions | 4-7 | Interrogatives, 5 sentence types, construction drills |
| 3 | الفقرة والربط | Paragraphs & Linking | 8-13 | Free writing, sentence transformation, paragraphs, Hajj vocab, 7 linking tool categories |
| 4 | الإملاء | Spelling Rules | 14-27 | Punctuation (16 marks), hamza, taa marbouta/mabsouta, soft alif, composition methodology |
| 5 | الوصف والكتابة | Description & Writing | 28-38 | 6 model essays, descriptive vocabulary, 3 linguistic benefits sections (synonym groups) |
| 6 | المراسلة | Correspondence | 39-40 | Letters, telegrams, 5 congratulatory telegram models |

## Lesson Page Layout

Each lesson has two tabs:

### Study Tab (الدرس)
Content blocks rendered as rich components:
- **GrammarTable** — verb patterns, noun types, particle meanings
- **VocabularyGrid** — themed word lists (colors, directions, numbers, etc.)
- **ModelEssay** — Arabic text + translation + vocabulary highlights
- **RuleCard** — spelling rules (hamza, taa, soft alif)
- **SynonymGroup** — linguistic benefits synonym/antonym displays
- **LinkingToolCard** — 7 categories of connectors with examples

### Practice Tab (تدريبات)
Interactive exercises:
- **FillInBlank** — prepositions, punctuation, hamza placement
- **WordOrdering** — rearrange scrambled words
- **MatchPairs** — antonym/synonym matching
- **SentenceConstruction** — build sentences from components
- **TextExtraction** — tag nouns/verbs/particles in passages
- **MultipleChoice** — interrogative selection, preposition meanings

Two modes per exercise: Practice (reveal/hide) and Quiz (graded).

## Navigation

- **Sidebar**: Collapsible tree (6 units → lessons), progress dots, search bar
- **Homepage**: Hero + 6 unit cards with progress bars + continue-learning cards
- **Breadcrumbs**: Unit → Lesson
- **Hash routing**: `#lesson-1`, `#lesson-12`

## State Management

- `usePersistedState` with key `arabtools-insha-progress`
- Tracks: visited lessons, exercise scores, questions mastered, streak, last viewed

## Component Architecture

```
InshaaGuide (orchestrator)
├── Sidebar (SearchInput, UnitTree, Stats)
├── HomePage (Hero, UnitCards, ContinueLearning)
└── LessonView
    ├── Breadcrumb
    ├── LessonHeader
    ├── TabBar (Study | Practice)
    ├── StudyContent (GrammarTable, VocabularyGrid, ModelEssay, RuleCard, SynonymGroup, LinkingToolCard)
    └── PracticeContent (PracticeMode, QuizMode, exercise type components)
```

## Data Layer

TypeScript data files, not markdown:

```typescript
interface Lesson {
  id: string;
  number: number;
  titleAr: string;
  titleEn: string;
  unitId: string;
  content: LessonContent[];
  exercises: Exercise[];
}

interface LessonContent {
  type: 'grammar-table' | 'vocabulary-grid' | 'model-essay' |
        'rule-card' | 'synonym-group' | 'linking-tools' | 'text';
  data: any;
}

interface Exercise {
  type: 'fill-blank' | 'word-order' | 'match-pairs' |
        'multiple-choice' | 'text-extraction' | 'sentence-build';
  questions: Question[];
}
```

## Technical Details

- Package: `@arabtools/insha-guide`
- Dependencies: `@arabtools/ui`, `@arabtools/core`, `@arabtools/styles`
- Stack: React 19 + Vite 6 + Tailwind 4 + TypeScript 5.7
- Same patterns as nahw-navigator + fstu-exercises
