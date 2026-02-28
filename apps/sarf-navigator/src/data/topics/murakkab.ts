import type { SarfTopic } from '../types';

export const murakkabOverview: SarfTopic = {
  id: 'murakkab-overview',
  titleAr: 'المركب',
  titleEn: 'Complex Verbs Overview',
  transliteration: 'al-Murakkab',
  categoryId: 'doubled-complex',
  subcategoryId: 'complex',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Complex verbs (المركب) combine two or more morphological features: weak letters + hamzah, weak letters + doubling, or multiple types of weakness. Understanding each feature individually is prerequisite.',
      body: `## المركب (Complex Verbs)

**Complex verbs** combine multiple morphological features in a single verb root. These are the most challenging verbs in Arabic morphology.

### Types of Complexity
1. **Weak + Hamzah**: A root has both a weak letter and hamzah
2. **Weak + Doubled**: A root has a weak letter and doubled letters
3. **Multiple Weak**: A root with weakness in more than one position (lafif)

### Why They're Difficult
Each feature brings its own rules, and when combined, these rules can interact in complex ways.

### Examples
- رَأَى يَرَى (to see) — hamzah + naqis
- جَاءَ يَجِيءُ (to come) — ajwaf + hamzah
- وَأَى يَئِي (to promise) — mithaal + hamzah + naqis`,
      rules: [
        {
          english: 'Complex verbs require understanding individual features (weak, hamzah, doubled) before studying their combinations.',
          examples: [
            { arabic: 'رَأَى يَرَى', translation: 'to see (hamzah + naqis features)' },
            { arabic: 'جَاءَ يَجِيءُ', translation: 'to come (ajwaf + hamzah features)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 269-302',
    },
    {
      difficulty: 'intermediate',
      summary: 'When features combine, one usually dominates. In رَأَى, the hamzah is deleted (تخفيف) giving رَأَى→يَرَى. In جَاءَ, the hollow rules dominate but hamzah stays on the seat.',
      body: `## Feature Interaction Rules

### Priority of Rules
When multiple features compete:
1. **Phonological ease** (تخفيف) takes priority
2. **Vowel-based** rules apply where relevant
3. **Writing rules** (hamzah seat) apply last

### رَأَى يَرَى (to see)
- Root: ر أ ي (hamzah as middle, ya as final)
- Past: رَأَى (hamzah stays, ya → alif maqsura)
- Present: يَرَى (hamzah deleted for ease — originally يَرْأَى)
- Command: رَ (ultra-short — both hamzah and ya drop!)

### جَاءَ يَجِيءُ (to come)
- Root: ج ي أ (ya as middle, hamzah as final)
- Past: جَاءَ (ya → alif like ajwaf, hamzah stays)
- Present: يَجِيءُ (ya returns with kasra, hamzah stays)
- Command: جِئْ`,
      rules: [
        {
          arabic: 'رأى يرى: حُذفت الهمزة تخفيفًا في المضارع',
          english: 'In رَأَى, the hamzah is deleted in the present tense for phonological ease.',
          examples: [
            { arabic: 'رَأَى → يَرَى', translation: 'to see (hamzah deleted in present)' },
            { arabic: 'رَ', translation: 'see! (shortest possible command)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 269-302',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study covers the complete conjugation of major complex verbs, the scholarly analysis of feature priority, and rare complex verb patterns found in classical texts.',
      body: `## Advanced Complex Verb Analysis

### Complete Conjugation of رَأَى
| Form | Arabic | Notes |
|------|--------|-------|
| Active Past | رَأَى | Hamzah stays |
| Active Present | يَرَى | Hamzah deleted |
| Command | رَ | Both hamzah and ya dropped |
| Passive Past | رُئِيَ | Hamzah on ya seat (kasra) |
| Passive Present | يُرَى | Hamzah deleted |
| Active Participle | رَاءٍ | Hamzah on line |
| Passive Participle | مَرْئِيٌّ | Hamzah on ya seat |

### Complete Conjugation of جَاءَ
| Form | Arabic | Notes |
|------|--------|-------|
| Active Past | جَاءَ | Hollow + final hamzah |
| Active Present | يَجِيءُ | Ya returns, hamzah stays |
| Command | جِئْ | Ya dropped, hamzah stays |
| Passive Past | جِيءَ | Kasra + ya (hollow passive) |
| Active Participle | جَائِيٌ / جَاءٍ | Two valid forms |
| Verbal Noun | مَجِيءٌ | Ya seat before hamzah |

### Rare Complex Patterns
- **وَأَى يَئِي**: Triple complexity (mithaal + hamzah + naqis)
- **وَاءَ يَوَاءُ**: Mithaal + hamzah
- **أَوَى يَأْوِي**: Hamzah + naqis`,
      rules: [
        {
          arabic: 'المركب يجمع أحكام نوعين أو أكثر من الإعلال',
          english: 'Complex verbs combine the rules of two or more types of morphological change.',
          examples: [
            { arabic: 'رَأَى: همزة + ناقص', translation: 'to see: hamzah + naqis features' },
            { arabic: 'جَاءَ: أجوف + همزة', translation: 'to come: hollow + hamzah features' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 269-302',
    },
  ],
  relatedTopicIds: ['murakkab-mithaal', 'murakkab-ajwaf', 'murakkab-naqis', 'hamzah-conjugation'],
  tags: ['murakkab', 'complex', 'combined features'],
};

export const murakkabMithaal: SarfTopic = {
  id: 'murakkab-mithaal',
  titleAr: 'تركيب المثال',
  titleEn: 'Mithaal Combinations',
  transliteration: 'Tarkeeb al-Mithaal',
  categoryId: 'doubled-complex',
  subcategoryId: 'complex',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Mithaal combination verbs have an initial weak letter (و or ي) combined with another feature like hamzah or doubling. The mithaal rules still apply (و drops in present) along with the additional feature.',
      body: `## Mithaal Combinations

These verbs start with a weak letter **and** have another morphological feature.

### Common Types
1. **Mithaal + Hamzah**: وَأَلَ (to seek refuge)
2. **Mithaal + Doubled**: وَدَّ (to love/wish) — root: و د د
3. **Mithaal + Naqis**: وَقَى (to protect) — this is lafif mafruq

### Key Verb: وَدَّ يَوَدُّ
A mithaal + doubled verb:
- Past: وَدَّ (doubled letters merge)
- Present: يَوَدُّ (و stays because it's باب فَتَحَ, doubled stays)
- Verbal noun: وُدٌّ / مَوَدَّةٌ (love/affection)`,
      rules: [
        {
          english: 'Mithaal combinations apply mithaal rules (و dropping) alongside the rules of the second feature.',
          examples: [
            { arabic: 'وَدَّ يَوَدُّ', translation: 'to love/wish (mithaal + doubled)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 269-302',
    },
    {
      difficulty: 'intermediate',
      summary: 'In mithaal + doubled verbs like وَدَّ, the و may or may not drop depending on the baab, while the doubled letters follow standard idgham rules. The two feature sets apply independently.',
      body: `## Mithaal + Doubled Conjugation

### وَدَّ يَوَدُّ (to love/wish)
Root: و د د — Mithaal (و) + Doubled (د د)

The و **stays** because this verb is in باب فَتَحَ (the و only drops in باب ضَرَبَ):
- يَوَدُّ (not يَدُّ)

The doubled دال follows normal idgham rules:
- وَدَّ (merged) vs. وَدِدْتُ (separated)

### Short Conjugation
وَدَّ - يَوَدُّ - وَدَّ - لَا تَوَدَّ

### Past Tense with Pronouns
| Person | Arabic | Notes |
|--------|--------|-------|
| He | وَدَّ | Both features active |
| I | وَدِدْتُ | Fakk (doubled separated) |
| They | وَدُّوا | Idgham maintained |`,
      rules: [
        {
          arabic: 'المثال المضاعف يجمع أحكام الإعلال والإدغام',
          english: 'Mithaal + doubled verbs combine weak-letter rules with idgham rules.',
          examples: [
            { arabic: 'وَدَّ / وَدِدْتُ', translation: 'he loved / I loved (idgham vs fakk)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 269-302',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced analysis covers rare mithaal combinations, their behavior in enhanced forms, and how to predict which feature dominates when rules conflict.',
      body: `## Advanced Mithaal Combinations

### Enhanced Forms
| Form | وَدَّ | Meaning |
|------|------|---------|
| I | وَدَّ | to love/wish |
| III | وَادَّ | to show affection |
| V | تَوَدَّدَ | to seek affection |
| VI | تَوَادَّ | to love each other |

### Mithaal + Hamzah Examples
- **وَأَلَ يَئِلُ**: to seek refuge (و drops + hamzah writing changes)
- Present: يَئِلُ (و dropped, hamzah on ya seat)

### Rule Priority in Mithaal Combinations
1. Mithaal و-dropping applies first (if in appropriate baab)
2. Then doubled/hamzah rules apply to the remaining letters
3. Writing rules (hamzah seat) apply last`,
      rules: [
        {
          arabic: 'في المثال المركب تُطبق أحكام المثال أولاً ثم الأحكام الأخرى',
          english: 'In mithaal combinations, mithaal rules apply first, then other rules follow.',
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 269-302',
    },
  ],
  relatedTopicIds: ['murakkab-overview', 'mithaal-waawi', 'mudaaf-overview'],
  tags: ['murakkab', 'mithaal', 'complex', 'combination'],
};

export const murakkabAjwaf: SarfTopic = {
  id: 'murakkab-ajwaf',
  titleAr: 'تركيب الأجوف',
  titleEn: 'Ajwaf Combinations',
  transliteration: 'Tarkeeb al-Ajwaf',
  categoryId: 'doubled-complex',
  subcategoryId: 'complex',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Ajwaf combination verbs have a hollow middle (و or ي) combined with another feature. The most common is ajwaf + hamzah, where the middle weak letter interacts with hamzah writing rules.',
      body: `## Ajwaf Combinations

These verbs have a weak middle letter **and** another morphological feature.

### Common Types
1. **Ajwaf + Hamzah (final)**: جَاءَ يَجِيءُ (to come) — root: ج ي أ
2. **Ajwaf + Hamzah (initial)**: آلَ يَؤُولُ (to return to) — root: أ و ل
3. **Ajwaf + Hamzah (final)**: شَاءَ يَشَاءُ (to will) — root: ش ي أ

### Key Feature
The hollow rules (deletion in jussive/command, alif in past) combine with hamzah writing rules.`,
      rules: [
        {
          english: 'Ajwaf combinations apply hollow rules (middle letter changes) alongside hamzah or other feature rules.',
          examples: [
            { arabic: 'جَاءَ يَجِيءُ', translation: 'to come (hollow ya + final hamzah)' },
            { arabic: 'شَاءَ يَشَاءُ', translation: 'to will (hollow ya + final hamzah)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 269-302',
    },
    {
      difficulty: 'intermediate',
      summary: 'In جَاءَ, the hollow ya becomes alif in the past and returns in the present, while the final hamzah stays throughout. In شَاءَ, the same hollow pattern occurs with the hamzah adapting its seat to surrounding vowels.',
      body: `## Ajwaf + Hamzah Conjugation

### جَاءَ يَجِيءُ (to come)
- Past: جَاءَ (ya → alif, hamzah stays)
- Present: يَجِيءُ (ya returns, hamzah stays)
- Jussive: لَمْ يَجِئْ (ya deleted, hamzah stays)
- Command: جِئْ (ya deleted, hamzah stays)

### شَاءَ يَشَاءُ (to will)
- Past: شَاءَ (ya → alif, hamzah on line after alif)
- Present: يَشَاءُ (ya → alif, hamzah on line)
- Jussive: لَمْ يَشَأْ (ya deleted, hamzah stays)
- Command: شَأْ (ya deleted, hamzah stays)

### Comparison Table
| Form | جاء | شاء |
|------|-----|-----|
| Past | جَاءَ | شَاءَ |
| Present | يَجِيءُ | يَشَاءُ |
| Jussive | لَمْ يَجِئْ | لَمْ يَشَأْ |
| Command | جِئْ | شَأْ |
| Passive Past | جِيءَ | شِيءَ |`,
      rules: [
        {
          arabic: 'الأجوف المهموز اللام يجمع أحكام الإعلال وكتابة الهمزة',
          english: 'Hollow verbs with final hamzah combine hollow letter changes with hamzah writing rules.',
          examples: [
            { arabic: 'جِئْ', translation: 'come! (ya deleted, hamzah on ya seat)' },
            { arabic: 'لَمْ يَشَأْ', translation: 'he did not will (ya deleted, hamzah on line)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 269-302',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced ajwaf combinations cover the full conjugation tables, passive forms, enhanced forms like Form IV (أَجَاءَ), and the special case of initial hamzah + hollow (آلَ يَؤُولُ).',
      body: `## Advanced Ajwaf Combinations

### Full Conjugation of جَاءَ
| Person | Past | Present |
|--------|------|---------|
| 3rd m.s | جَاءَ | يَجِيءُ |
| 3rd m.p | جَاءُوا | يَجِيئُونَ |
| 3rd f.s | جَاءَتْ | تَجِيءُ |
| 2nd m.s | جِئْتَ | تَجِيءُ |
| 1st s. | جِئْتُ | أَجِيءُ |

### Initial Hamzah + Hollow: آلَ يَؤُولُ
Root: أ و ل — hamzah as first, waw as middle
- Past: آلَ (hamzah + alif merge → madd)
- Present: يَؤُولُ (hamzah on waw seat)
- Meaning: to return to / to end up

### Enhanced Forms
| Form | جاء | Meaning |
|------|-----|---------|
| I | جَاءَ | to come |
| IV | أَجَاءَ | to bring/cause to come |
| X | اِسْتَجَاءَ | to summon |

### Passive with Pronouns
| Person | Past Passive |
|--------|-------------|
| He | جِيءَ بِهِ |
| They | جِيءَ بِهِمْ |
| I | جِيءَ بِي |`,
      rules: [
        {
          arabic: 'آلَ يَؤُولُ: همزة أولى مع واو وسطى',
          english: 'آلَ combines initial hamzah with a hollow waw middle, creating madd in the past tense.',
          examples: [
            { arabic: 'آلَ يَؤُولُ', translation: 'to return to (hamzah + hollow)' },
            { arabic: 'مَآلٌ', translation: 'outcome/destination (verbal noun)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 269-302',
    },
  ],
  relatedTopicIds: ['murakkab-overview', 'ajwaf-waawi', 'ajwaf-yaai', 'hamzah-conjugation'],
  tags: ['murakkab', 'ajwaf', 'complex', 'combination', 'hollow'],
};

export const murakkabNaqis: SarfTopic = {
  id: 'murakkab-naqis',
  titleAr: 'تركيب الناقص',
  titleEn: 'Naqis Combinations',
  transliteration: 'Tarkeeb an-Naaqis',
  categoryId: 'doubled-complex',
  subcategoryId: 'complex',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Naqis combination verbs have a final weak letter (و or ي) combined with another feature. The most notable is naqis + hamzah, as in رَأَى يَرَى (to see), where hamzah interacts with the final weak letter.',
      body: `## Naqis Combinations

These verbs have a weak final letter **and** another morphological feature.

### Common Types
1. **Naqis + Hamzah (middle)**: رَأَى يَرَى (to see) — root: ر أ ي
2. **Naqis + Doubled**: حَيَّ يَحْيَا (to live) — root: ح ي ي
3. **Naqis + Mithaal**: وَقَى يَقِي (to protect) — lafif mafruq

### Key Verb: رَأَى
The most important naqis + hamzah verb:
- root: ر أ ي
- The hamzah is deleted in the present for ease: يَرَى (not يَرْأَى)`,
      rules: [
        {
          english: 'Naqis combinations apply naqis rules (final letter changes) alongside the additional feature rules.',
          examples: [
            { arabic: 'رَأَى يَرَى', translation: 'to see (hamzah deleted + naqis ya)' },
            { arabic: 'حَيَّ يَحْيَا', translation: 'to live (doubled + naqis ya)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 269-302',
    },
    {
      difficulty: 'intermediate',
      summary: 'In رَأَى, the hamzah is uniquely deleted in the present tense (يَرَى not يَرْأَى), making the command just رَ — one of the shortest words in Arabic. In حَيَّ, doubled ya + naqis ya create special patterns.',
      body: `## Naqis + Hamzah: رَأَى يَرَى

### Conjugation
- Past: رَأَى (hamzah stays, ya → alif maqsura)
- Present: يَرَى (hamzah deleted!)
- Command: رَ (both hamzah and ya gone!)

### Short Conjugation
رَأَى - يَرَى - رَ - لَا تَرَ - رُئِيَ - يُرَى - رَاءٍ - مَرْئِيٌّ - رُؤْيَةً / رَأْيًا

### Naqis + Doubled: حَيَّ يَحْيَا
Root: ح ي ي — doubled ya + naqis pattern
- Past: حَيَّ (two yas merge)
- Present: يَحْيَا (ya appears twice — once in root, once as ending)
- This verb also has the variant: حَيِيَ (with fakk)

### Past Tense of رَأَى with Pronouns
| Person | Arabic | Notes |
|--------|--------|-------|
| He | رَأَى | Standard |
| They | رَأَوْا | Ya becomes waw-alif |
| She | رَأَتْ | Alif drops |
| I | رَأَيْتُ | Ya returns |`,
      rules: [
        {
          arabic: 'رأى يرى: الهمزة تحذف تخفيفًا في المضارع والأمر',
          english: 'In رأى, the hamzah is deleted in the present and command for phonological ease.',
          examples: [
            { arabic: 'يَرَى (أصلها يَرْأَى)', translation: 'he sees (hamzah deleted)' },
            { arabic: 'رَ (أصلها اِرْأَ)', translation: 'see! (both hamzah and ya deleted)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 269-302',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced analysis covers the full conjugation of رَأَى across all persons, the scholarly debate on its exact morphological classification, passive forms, and its behavior in enhanced forms.',
      body: `## Advanced Naqis Combinations

### Full Present Tense of رَأَى
| Person | Marfu' | Mansoob | Majzoom |
|--------|--------|---------|---------|
| 3rd m.s | يَرَى | يَرَى | يَرَ |
| 3rd f.s | تَرَى | تَرَى | تَرَ |
| 3rd m.d | يَرَيَانِ | يَرَيَا | يَرَيَا |
| 3rd m.p | يَرَوْنَ | يَرَوْا | يَرَوْا |
| 2nd m.s | تَرَى | تَرَى | تَرَ |
| 1st s. | أَرَى | أَرَى | أَرَ |

### Passive Voice
- رَأَى → **رُئِيَ** (it was seen — hamzah on ya seat)
- يَرَى → **يُرَى** (it is seen — hamzah still deleted)

### حَيَّ Advanced Conjugation
| Person | Past (idgham) | Past (fakk) |
|--------|--------------|-------------|
| He | حَيَّ | حَيِيَ |
| I | حَيِيتُ | حَيِيتُ |
| They | حَيُّوا | حَيِيُوا |

### Enhanced Forms of رَأَى
| Form | Active | Meaning |
|------|--------|---------|
| I | رَأَى | to see |
| IV | أَرَى | to show |
| VI | تَرَاءَى | to appear to each other |
| VIII | اِرْتَأَى | to form an opinion |`,
      rules: [
        {
          arabic: 'حَيَّ يجوز فيه الإدغام والفك: حَيَّ وحَيِيَ',
          english: 'The verb حَيَّ allows both merged (حَيَّ) and separated (حَيِيَ) forms.',
          examples: [
            { arabic: 'حَيَّ / حَيِيَ', translation: 'he lived (both forms valid)' },
            { arabic: 'أَرَى', translation: 'he showed (Form IV of رأى)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 269-302',
    },
  ],
  relatedTopicIds: ['murakkab-overview', 'naqis-waawi', 'naqis-yaai', 'hamzah-conjugation'],
  tags: ['murakkab', 'naqis', 'complex', 'combination', 'defective'],
};
