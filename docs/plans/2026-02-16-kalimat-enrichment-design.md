# Kalimat Feature Enrichment Design

**Date:** 2026-02-16
**Status:** Approved
**Target:** `apps/kalimat`

## Goal

Enrich Kalimat with data from two complementary databases, phased by quick wins first. Target audience: intermediate Arabic students who can read Arabic script.

## Data Sources

| Database | Path | Character |
|----------|------|-----------|
| `en_quran.db` | `/Users/miftah/Desktop/en_quran.db` | Pedagogical: step-by-step word transformations, etymology, phrase groupings, transliterations |
| Kalaam `quran.db` | `/Users/miftah/Desktop/kalaam/extracted/Payload/Kalaam.app/assets/src/assets/db/quran.db` | Analytical: corpus morphology (129K rows), 993 grammar tags, pre-computed quiz distractors (77K), contextual translations, 79 languages |

## Data Strategy

Static extraction at build time. Scripts extract from SQLite into TypeScript/JSON files. Large datasets go in `public/data/` for lazy-loading. Small datasets go in `src/data/` for bundling.

---

## Phase 1: Enrichments (minimal new UI)

### 1a. Etymology "Word Story" on LemmaDetail

- Add collapsible section to `LemmaDetail.tsx` showing `lemmaTranslation.info` text
- Source: `en_quran.db` → `lemmaTranslation` table, `info` column
- 4,784 paragraphs with root origin, semantic evolution, Quranic usage
- Extract to `data/lemma-etymology/` (chunked files, already partially exists)

### 1b. Contextual Translation on LemmaDetail

- New section: "See in context" with 1-3 examples per lemma
- Format: `textBefore` **closestExactMatch** `textAfter` with surah:ayah reference
- Source: Kalaam DB → `lemmaInAyahTranslation` (4,783 rows)
- Extract to `data/lemma-context/` (chunked by lemma ID range)

### 1c. Grammar Tags with Colors

- Extract 993 grammar definitions from Kalaam DB → `grammar` table
- Each tag: grammar string, color hex, verbose description, friendly description
- Add grammar tag badges to `AyahView` and `QuranReader` word popups
- Map words → grammar tags via `morphology` table

### 1d. Enhanced Morphology on Word Popups

- Merge Kalaam DB `morphology` data: part of speech, verb form, person, gender, number
- Extract per-surah → `public/data/morphology/` (chunked by surah, lazy-loaded)
- Show alongside transformation steps: "2nd person masculine plural imperfect verb, Form IV"

---

## Phase 2: New Study Modes

### 2a. Phrase-by-Phrase Reader

- Toggle in QuranReader between word-by-word and phrase mode
- Source: `en_quran.db` → `ayahWordMappings` (6,236 ayahs with phrase groupings)
- Extract → `data/phrase-mappings/` (chunked by surah)
- Phrases as grouped chips/blocks with combined translation
- Subtle visual separator at phrase boundaries

### 2b. Challenge Mode (Quick Quiz)

- New route: `#/challenge`
- Source: Kalaam DB → `challengeWordOptions` (77K pre-computed distractors)
- Flow: show Arabic word → 4 English choices (1 correct + 3 distractors)
- Extract → `public/data/challenges/` (chunked by frequency tier or surah)
- Integrates with learning engine for progress tracking
- Session sizes: 10, 20, 50 words

### 2c. Morpheme Drill

- New route: `#/morpheme-drill`
- Source: Kalaam DB → `arabicWords` (77K words with `:1` through `:5` sub-parts) + `partsOfWordCount`
- Show word split into pieces → student labels each piece
- Example: `وَ | لَ | قَدْ | كَرَّمْ | نَا` → "and | surely | indeed | we honored | us"
- Extract → `public/data/word-parts/` (chunked by surah)

---

## Phase 3: Advanced / Specialized

### 3a. Weak Verb Trainer

- New route: `#/weak-verbs`
- Source: `en_quran.db` → `transformations` where `weak_letter_change=1` (12,571 instances)
- Group by type: hollow, defective, assimilated, doubly weak
- Drill: root + pattern → predict weak letter behavior
- Show transformation note explaining why

### 3b. Full Morphology Merge into Word Anatomy

- Enhance `WordAnatomy.tsx` with both databases side-by-side:
  - Transformation chain (pedagogical, from en_quran.db)
  - Grammar tags (analytical, from Kalaam DB morphology)
- Cross-reference `form_change_id` with grammar tags

### 3c. Multi-Language Quiz (stretch)

- Source: Kalaam DB → `cacheTestData` (381K rows, 79 languages)
- Language picker in settings
- Quiz in any supported language

---

## Extraction Scripts

```
scripts/
  extract-etymology.ts        # en_quran.db → data/lemma-etymology/
  extract-context.ts          # kalaam quran.db → data/lemma-context/
  extract-grammar-tags.ts     # kalaam quran.db → data/grammar-tags.ts
  extract-morphology.ts       # kalaam quran.db → public/data/morphology/
  extract-phrases.ts          # en_quran.db → data/phrase-mappings/
  extract-challenges.ts       # kalaam quran.db → public/data/challenges/
  extract-word-parts.ts       # kalaam quran.db → public/data/word-parts/
  extract-weak-verbs.ts       # en_quran.db → data/weak-verbs.ts
```

## New Routes

| Route | Phase | Description |
|-------|-------|-------------|
| `#/challenge` | 2 | Quick quiz with pre-computed distractors |
| `#/morpheme-drill` | 2 | Identify word pieces |
| `#/weak-verbs` | 3 | Weak letter change drills |

## New Data Files

| Path | Phase | Source DB | Size Estimate |
|------|-------|-----------|---------------|
| `data/lemma-etymology/` | 1 | en_quran.db | ~500KB (chunked) |
| `data/lemma-context/` | 1 | Kalaam | ~300KB (chunked) |
| `data/grammar-tags.ts` | 1 | Kalaam | ~50KB |
| `public/data/morphology/` | 1 | Kalaam | ~3MB (114 surah files) |
| `data/phrase-mappings/` | 2 | en_quran.db | ~400KB (chunked) |
| `public/data/challenges/` | 2 | Kalaam | ~2MB (chunked) |
| `public/data/word-parts/` | 2 | Kalaam | ~1.5MB (chunked) |
| `data/weak-verbs.ts` | 3 | en_quran.db | ~200KB |
