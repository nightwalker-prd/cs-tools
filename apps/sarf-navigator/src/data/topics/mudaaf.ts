import type { SarfTopic } from '../types';

export const mudaafOverview: SarfTopic = {
  id: 'mudaaf-overview',
  titleAr: 'المضاعف',
  titleEn: 'Doubled Verbs',
  transliteration: 'al-Mudaa\'af',
  categoryId: 'doubled-complex',
  subcategoryId: 'doubled',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'A doubled verb (المضاعف) has identical second and third root letters. The two identical letters merge (idgham) in some forms and separate in others. Example: مَدَّ (to extend) — root: م د د.',
      body: `## المضاعف (Doubled Verbs)

A **doubled verb** (مضاعف) has the **same letter** as both its second and third root letters (عين = لام).

### Key Feature
The two identical letters **merge** (idgham/شدّة) when the letter after them has a vowel:
- مَدَدَ → مَدَّ (to extend)
- رَدَدَ → رَدَّ (to return/reject)

### Common Doubled Verbs
- مَدَّ يَمُدُّ (to extend) — root: م د د
- رَدَّ يَرُدُّ (to return) — root: ر د د
- شَدَّ يَشُدُّ (to tighten) — root: ش د د
- ضَرَّ يَضُرُّ (to harm) — root: ض ر ر
- حَبَّ يُحِبُّ (to love) — root: ح ب ب`,
      rules: [
        {
          arabic: 'المضاعف هو ما كانت عينه ولامه من جنس واحد',
          english: 'A doubled verb has its second and third root letters from the same letter.',
          examples: [
            { arabic: 'مَدَّ (م د د)', translation: 'to extend (دال repeated)' },
            { arabic: 'رَدَّ (ر د د)', translation: 'to return (دال repeated)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Common Doubled Verbs',
          titleAr: 'أفعال شائعة من المضاعف',
          headers: ['Merged', 'Unmerged', 'Root', 'Meaning'],
          rows: [
            ['مَدَّ', 'مَدَدَ', 'م د د', 'to extend'],
            ['رَدَّ', 'رَدَدَ', 'ر د د', 'to return'],
            ['شَدَّ', 'شَدَدَ', 'ش د د', 'to tighten'],
            ['ضَرَّ', 'ضَرَرَ', 'ض ر ر', 'to harm'],
            ['ظَنَّ', 'ظَنَنَ', 'ظ ن ن', 'to think/assume'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 245-268',
    },
    {
      difficulty: 'intermediate',
      summary: 'Doubled verbs merge (idgham) when the next letter has a vowel, and separate (fakk) when the next letter has sukoon. This creates two patterns in the past tense depending on the pronoun suffix.',
      body: `## Idgham and Fakk in Doubled Verbs

### When Letters Merge (إدغام)
The two identical letters merge when **what follows has a vowel**:
- مَدَّ (he extended) — third person singular
- يَمُدُّ (he extends) — present tense
- مُدَّ (command to one person)

### When Letters Separate (فكّ الإدغام)
The letters separate when **what follows has sukoon**:
- مَدَدْتُ (I extended) — consonant suffix
- مَدَدْنَا (we extended) — consonant suffix
- يَمْدُدْنَ (they f. extend) — noon of feminine plural

### Short Conjugation
مَدَّ - يَمُدُّ - مُدَّ - لَا تَمُدَّ - مُدَّ - يُمَدُّ - مَادٌّ - مَمْدُودٌ - مَدًّا

### Past Tense Conjugation
| Person | Arabic | Merged? |
|--------|--------|---------|
| He | مَدَّ | Yes |
| They (m) | مَدُّوا | Yes |
| She | مَدَّتْ | Yes |
| I | مَدَدْتُ | No (fakk) |
| We | مَدَدْنَا | No (fakk) |
| You (m.s) | مَدَدْتَ | No (fakk) |`,
      rules: [
        {
          arabic: 'يُدغم المضاعف إذا تحرك ما بعده، ويُفك إذا سكن ما بعده',
          english: 'Doubled letters merge when followed by a voweled letter, and separate when followed by sukoon.',
          examples: [
            { arabic: 'مَدَّ (idgham)', translation: 'he extended (followed by vowel)' },
            { arabic: 'مَدَدْتُ (fakk)', translation: 'I extended (followed by sukoon)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 245-268',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study covers the full conjugation of doubled verbs in all 14 forms, the two command patterns (مُدَّ with damma or مِدَّ with kasra depending on baab), passive voice, and doubled verbs in enhanced forms.',
      body: `## Advanced Doubled Verbs

### Command Form Variations
The command vowel depends on the baab:
- **باب نَصَرَ**: مُدَّ (with damma — يَمُدُّ)
- **باب فَتَحَ**: فِرَّ (with kasra — يَفِرُّ, to flee)
- **باب ضَرَبَ**: عِضَّ (with kasra — يَعِضُّ, to bite)

### Passive Voice
- مَدَّ → **مُدَّ** (it was extended)
- يَمُدُّ → **يُمَدُّ** (it is extended)

Note: Active مَدَّ and passive مُدَّ differ only in the hidden vowel.

### Full Present Tense
| Person | Marfu' | Mansoob | Majzoom |
|--------|--------|---------|---------|
| 3rd m.s | يَمُدُّ | يَمُدَّ | يَمُدَّ / يَمْدُدْ |
| 3rd f.s | تَمُدُّ | تَمُدَّ | تَمُدَّ / تَمْدُدْ |
| 3rd m.p | يَمُدُّونَ | يَمُدُّوا | يَمُدُّوا |
| 2nd m.s | تَمُدُّ | تَمُدَّ | تَمُدَّ / تَمْدُدْ |

### Jussive Special Case
In the jussive (مجزوم), there are **two valid forms**:
1. **Keep idgham**: لَمْ يَمُدَّ (with fatha on shaddah)
2. **Fakk**: لَمْ يَمْدُدْ (separate the letters)

### In Enhanced Forms
| Form | Example | Root | Meaning |
|------|---------|------|---------|
| I | مَدَّ | م د د | to extend |
| II | مَدَّدَ | م د د | to extend (intensive) |
| IV | أَمَدَّ | م د د | to supply |
| VIII | اِمْتَدَّ | م د د | to extend (intransitive) |
| X | اِسْتَمَدَّ | م د د | to seek help |`,
      rules: [
        {
          arabic: 'المضاعف في الجزم يجوز فيه الإدغام والفك',
          english: 'In the jussive, doubled verbs allow both merged (لَمْ يَمُدَّ) and separated (لَمْ يَمْدُدْ) forms.',
          examples: [
            { arabic: 'لَمْ يَمُدَّ', translation: 'he did not extend (idgham in jussive)' },
            { arabic: 'لَمْ يَمْدُدْ', translation: 'he did not extend (fakk in jussive)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 245-268',
    },
  ],
  relatedTopicIds: ['mudaaf-idgham', 'abwab-overview', 'conjugation-patterns'],
  tags: ['mudaaf', 'doubled', 'idgham', 'geminate'],
};

export const mudaafIdgham: SarfTopic = {
  id: 'mudaaf-idgham',
  titleAr: 'أحكام الإدغام',
  titleEn: 'Idgham Rules',
  transliteration: 'Ahkaam al-Idghaam',
  categoryId: 'doubled-complex',
  subcategoryId: 'doubled',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Idgham (الإدغام) is the merging of two identical or similar letters into one letter with shaddah. In doubled verbs, idgham is mandatory when the following letter has a vowel.',
      body: `## الإدغام (Merging/Assimilation)

**Idgham** is when two identical (or similar) letters merge into one letter with **shaddah** (ّ).

### In Doubled Verbs
- مَدَدَ → مَدَّ (the two داﻟs merge)
- رَدَدَ → رَدَّ (the two داﻟs merge)

### Simple Rule
- **Merge** when next letter has a vowel: مَدَّ، يَمُدُّ
- **Separate** when next letter has sukoon: مَدَدْتُ

### Why It Matters
Idgham makes Arabic easier to pronounce — saying مَدَّ is smoother than مَدَدَ.`,
      rules: [
        {
          arabic: 'الإدغام واجب إذا تحرك ما بعد المثلين',
          english: 'Idgham is obligatory when the letter following the two identical letters has a vowel.',
          examples: [
            { arabic: 'مَدَّ', translation: 'he extended (merged — followed by vowel)' },
            { arabic: 'مَدَدْتُ', translation: 'I extended (separated — followed by sukoon)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 245-268',
    },
    {
      difficulty: 'intermediate',
      summary: 'Idgham rules extend beyond doubled verbs. Form VIII (اِفْتَعَلَ) has special idgham when the first root letter is د، ذ، ز، ط، or ظ. The ت of the form assimilates to or with the root letter.',
      body: `## Extended Idgham Rules

### In Form VIII (باب الافتعال)
The ت of Form VIII assimilates with certain first root letters:

| Root Letter | Original | After Idgham | Meaning |
|------------|----------|-------------|---------|
| د | اِدْتَعَى | اِدَّعَى | to claim |
| ذ | اِذْتَكَرَ | اِذَّكَرَ / اِدَّكَرَ | to remember |
| ز | اِزْتَادَ | اِزْدَادَ | to increase |
| ط | اِطْتَلَعَ | اِطَّلَعَ | to discover |
| ظ | اِظْتَلَمَ | اِظَّلَمَ / اِطَّلَمَ | to be wronged |
| ص | اِصْتَبَرَ | اِصْطَبَرَ | to be patient |
| ض | اِضْتَرَبَ | اِضْطَرَبَ | to be disturbed |

### Types of Assimilation
1. **Complete idgham**: Both letters become the same → اِدَّعَى
2. **Partial change**: ت becomes ط → اِصْطَبَرَ، اِضْطَرَبَ
3. **ز exception**: ت becomes د → اِزْدَادَ`,
      rules: [
        {
          arabic: 'باب الافتعال يدغم التاء في بعض حروف الفاء',
          english: 'Form VIII assimilates its ت with certain first root letters.',
          examples: [
            { arabic: 'اِدَّعَى (أصلها اِدْتَعَى)', translation: 'to claim (د assimilated with ت)' },
            { arabic: 'اِصْطَبَرَ (أصلها اِصْتَبَرَ)', translation: 'to be patient (ت became ط after ص)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 245-268',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced idgham covers the interaction of idgham rules with other morphological changes (passive voice, jussive), quranic reading variations in idgham of doubled verbs, and the phonological principles behind assimilation.',
      body: `## Advanced Idgham Analysis

### Phonological Principles
Idgham occurs because of **phonological ease** (خفة). Arabic speakers naturally merge identical sounds:
1. **Homorganic** letters (same articulation point) → full merger
2. **Near-homorganic** (close articulation) → partial merger

### Articulation Points That Cause Assimilation
| Point | Letters | Example |
|-------|---------|---------|
| Tongue tip | د ت ط | اِدَّعَى |
| Tongue tip (emphatic) | ص ض ط ظ | اِصْطَبَرَ |
| Tongue sides | ز س | اِزْدَادَ |

### Idgham in Passive Voice of Doubled Verbs
The passive adds another layer of complexity:
- مَدَّ → مُدَّ (passive — only vowel changes)
- اِمْتَدَّ → اُمْتُدَّ (passive of Form VIII)

### Quranic Variations
Some readings show fakk (separation) where others show idgham:
- يَرْتَدِدْ / يَرْتَدَّ (whoever turns back — Quran 5:54)
- يَمْسَسْكَ / يَمَسَّكَ (if He touches you — Quran 6:17)

### Three Levels of Idgham
1. **إدغام كبير**: Both letters have vowels before merging
2. **إدغام صغير**: First letter has sukoon, second has vowel
3. **إدغام مثلين**: Two identical letters (as in doubled verbs)`,
      rules: [
        {
          arabic: 'الإدغام الصغير: أن يسكن الأول ويتحرك الثاني فيُدغمان',
          english: 'Small idgham: the first letter has sukoon and the second has a vowel, causing them to merge.',
          examples: [
            { arabic: 'مَدَدَ → مَدَّ', translation: 'extended (two dals merge)' },
            { arabic: 'يَمْدُدُ → يَمُدُّ', translation: 'extends (two dals merge in present)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 245-268',
    },
  ],
  relatedTopicIds: ['mudaaf-overview', 'hamzah-conjugation', 'conjugation-patterns'],
  tags: ['idgham', 'assimilation', 'doubled', 'phonology'],
};
