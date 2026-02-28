# Design: New Test Types for Nation Test

## Overview

Add three new test types to expand vocabulary testing beyond word-meaning associations:

1. **Collocation Test** - Test knowledge of natural word combinations
2. **Root-Pattern Recognition** - Test morphological awareness of Arabic roots
3. **Translation Test** - Test meaning transfer between languages

## Test Type Designs

### 1. Collocation Test

**Format:** Fill-in-the-blank multiple choice

**Data Structure:**
```typescript
export type CollocationType = 'verb_noun' | 'adj_noun' | 'verb_prep' | 'adv_verb';

export interface CollocationItem {
  id: string;
  phraseWithBlank: string;        // "_____ خُطبة"
  fullPhraseVocalized: string;    // "يُلقي خُطبةً"
  correctCollocate: string;       // "يُلقي"
  distractors: string[];          // ["يَعمل", "يَكتب", "يَفعل"]
  translation: string;
  collocationType: CollocationType;
  level: FrequencyLevel;
}
```

**Collocation Categories:**
| Type | Example | Translation |
|------|---------|-------------|
| verb_noun | يُلقي خُطبة | deliver a speech |
| verb_noun | يَعقِد اجتماعًا | hold a meeting |
| adj_noun | خَطأ فادِح | grave mistake |
| verb_prep | يَعتَمِد على | depend on |

**UI Behavior:**
- Show phrase with blank and 4 options
- Highlight correct answer in green on feedback
- Show full vocalized phrase + translation after answering

### 2. Root-Pattern Recognition Test

**Format:** Multiple selection (checkboxes)

**Data Structure:**
```typescript
export interface RootPatternItem {
  id: string;
  root: string;                   // "ك-ت-ب"
  rootLetters: string;            // "كتب"
  rootMeaning: string;            // "writing, books"
  correctForms: {
    word: string;                 // "كِتاب"
    wordVocalized: string;        // "كِتَابٌ"
    pattern: string;              // "فِعال"
    meaning: string;              // "book"
  }[];
  distractors: {
    word: string;
    wordVocalized: string;
    actualRoot: string;           // for educational feedback
  }[];
  level: FrequencyLevel;
}
```

**UI Behavior:**
- Display: "Which words derive from the root **ك-ت-ب** (writing)?"
- Show 6-8 word options (mix of correct + distractors)
- User selects multiple answers via checkboxes
- Feedback shows all correct forms with patterns and meanings
- Educational: reveals which root distractors actually come from

### 3. Translation Test

**Format:** Bidirectional (multiple choice or text input)

**Data Structure:**
```typescript
export type TranslationDirection = 'ar_to_en' | 'en_to_ar';

export interface TranslationItem {
  id: string;
  arabic: string;
  arabicVocalized: string;
  english: string;
  alternatives: {
    arabic?: string[];            // for en→ar direction
    english?: string[];           // for ar→en direction
  };
  keyVocabulary: string[];
  grammarNote?: string;
  level: FrequencyLevel;
}
```

**Direction Behavior:**
| Direction | Input | Output |
|-----------|-------|--------|
| Arabic → English | Show Arabic sentence | Multiple choice (4 English options) |
| English → Arabic | Show English sentence | Text input with lenient matching |

**Lenient Matching (en→ar):**
- Strip diacritics before comparing
- Accept any listed alternative
- Check if key vocabulary words are present
- Length tolerance (±30%)

**Config Options:**
- Direction: "Arabic → English", "English → Arabic", or "Mixed"
- When mixed: randomize direction per question

## Implementation Plan

### Files to Create

| File | Purpose |
|------|---------|
| `src/data/collocations.ts` | Collocation data + types |
| `src/data/rootPatterns.ts` | Root-pattern data + types |
| `src/data/translations.ts` | Translation data + types |
| `src/components/CollocationQuestion.tsx` | Collocation UI |
| `src/components/RootPatternQuestion.tsx` | Root-pattern UI |
| `src/components/TranslationQuestion.tsx` | Translation UI |

### Files to Modify

| File | Changes |
|------|---------|
| `src/types.ts` | Add new TestType values |
| `src/data/testGenerator.ts` | Add generator functions |
| `src/components/TestConfig.tsx` | Add test type cards + options |
| `src/components/VocabularyTest.tsx` | Add conditional rendering |
| `src/components/index.ts` | Export new components |
| `src/data/index.ts` | Export new data modules |

### Initial Content Targets

| Data File | Items |
|-----------|-------|
| `collocations.ts` | ~50 items (10 per level) |
| `rootPatterns.ts` | ~40 items |
| `translations.ts` | ~75 items (15 per level) |

## Type Updates

Add to `types.ts`:
```typescript
export type TestType =
  | 'vst' | 'vlt' | 'yesno' | 'productive'
  | 'sentence' | 'sentence_production'
  | 'collocation'
  | 'root_pattern'
  | 'translation';
```
