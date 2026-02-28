import type { SarfTopic } from '../types';

export const thulathiMujarrad: SarfTopic = {
  id: 'thulathi-mujarrad',
  titleAr: 'الثلاثي المجرد',
  titleEn: 'Base Triliteral',
  transliteration: 'ath-Thulaathi al-Mujarrad',
  categoryId: 'derived',
  subcategoryId: 'verb-forms',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The base triliteral verb (الثلاثي المجرد) consists of exactly three root letters with no additions. It is the simplest verb form and the foundation for all derived forms. It has six categories (abwab).',
      body: `## الثلاثي المجرد (Base Triliteral)

The **base triliteral** verb has exactly **three root letters** with no additional letters. This is the simplest and most common verb form.

### Structure
فَعَلَ — three root letters on the pattern of ف ع ل

### The Six Abwab
All base triliteral verbs fall into one of six categories:
1. فَعَلَ يَفْعَلُ (a-a): فَتَحَ يَفْتَحُ
2. فَعِلَ يَفْعَلُ (i-a): سَمِعَ يَسْمَعُ
3. فَعَلَ يَفْعِلُ (a-i): ضَرَبَ يَضْرِبُ
4. فَعَلَ يَفْعُلُ (a-u): نَصَرَ يَنْصُرُ
5. فَعُلَ يَفْعُلُ (u-u): كَرُمَ يَكْرُمُ
6. فَعِلَ يَفْعِلُ (i-i): حَسِبَ يَحْسِبُ`,
      rules: [
        {
          arabic: 'الثلاثي المجرد هو ما كانت جميع حروفه أصلية بلا زيادة',
          english: 'The base triliteral has all original root letters with no additions.',
          examples: [
            { arabic: 'كَتَبَ', translation: 'to write (3 root letters: ك ت ب)' },
            { arabic: 'عَلِمَ', translation: 'to know (3 root letters: ع ل م)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 303-318',
    },
    {
      difficulty: 'intermediate',
      summary: 'Each base triliteral verb produces a complete family of derived forms: masdar (verbal noun), active/passive participles, and can be the basis for enhanced forms (mazid). Understanding the base is essential.',
      body: `## Base Triliteral Derivations

### The Complete Family
From each base triliteral verb, we derive:
1. **المصدر** (verbal noun): كِتَابَةً
2. **اسم الفاعل** (active participle): كَاتِبٌ
3. **اسم المفعول** (passive participle): مَكْتُوبٌ
4. **اسم الآلة** (tool noun): مِكْتَبٌ (desk)
5. **اسم المكان** (place noun): مَكْتَبَةٌ (library)
6. **صيغة المبالغة** (intensive form): كَتَّابٌ

### Masdar Patterns
Base triliteral masdars are **not predictable** — they must be memorized:
- فَتْحٌ (opening)
- عِلْمٌ (knowledge)
- كِتَابَةٌ (writing)
- دُخُولٌ (entry)
- ذَهَابٌ (going)`,
      rules: [
        {
          arabic: 'مصدر الثلاثي المجرد سماعي — لا قاعدة مطردة له',
          english: 'The masdar of base triliteral verbs is irregular — there is no single predictable pattern.',
          examples: [
            { arabic: 'فَتْحٌ، عِلْمٌ، كِتَابَةٌ', translation: 'opening, knowledge, writing — all different patterns' },
          ],
        },
      ],
      tables: [
        {
          title: 'Common Masdar Patterns',
          titleAr: 'أوزان المصادر الشائعة',
          headers: ['Pattern', 'Example', 'Verb', 'Meaning'],
          rows: [
            ['فَعْلٌ', 'فَتْحٌ', 'فَتَحَ', 'opening'],
            ['فِعْلٌ', 'عِلْمٌ', 'عَلِمَ', 'knowledge'],
            ['فُعُولٌ', 'دُخُولٌ', 'دَخَلَ', 'entry'],
            ['فِعَالَةٌ', 'كِتَابَةٌ', 'كَتَبَ', 'writing'],
            ['فَعَالٌ', 'ذَهَابٌ', 'ذَهَبَ', 'going'],
            ['فَعِيلٌ', 'صَرِيخٌ', 'صَرَخَ', 'screaming'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 303-318',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study examines the semantic tendencies of different masdar patterns, the scholarly categorization of which masdars belong to which abwab, and the relationship between base and enhanced forms.',
      body: `## Advanced Base Triliteral Analysis

### Masdar Pattern Tendencies
While masdars are technically unpredictable, some patterns tend to correlate:
| Pattern | Typical Meaning | Examples |
|---------|----------------|---------|
| فَعْلٌ | Action (general) | فَتْحٌ، ضَرْبٌ |
| فِعَالَةٌ | Craft/profession | كِتَابَةٌ، تِجَارَةٌ |
| فُعُولٌ | Motion/intransitive | دُخُولٌ، خُرُوجٌ |
| فُعْلَةٌ | Single instance | ضَرْبَةٌ، أَكْلَةٌ |
| فَعَلَانٌ | Movement/sound | غَلَيَانٌ، دَوَرَانٌ |

### Base → Enhanced Relationship
Every enhanced form is built on a base:
| Base | Form II | Form III | Form IV |
|------|---------|----------|---------|
| كَتَبَ | كَتَّبَ | كَاتَبَ | أَكْتَبَ |
| عَلِمَ | عَلَّمَ | عَالَمَ | أَعْلَمَ |
| فَتَحَ | فَتَّحَ | فَاتَحَ | أَفْتَحَ |

### Transitive vs. Intransitive by Baab
| Baab | Transitive? | Example |
|------|------------|---------|
| فَتَحَ يَفْتَحُ | Both | فَتَحَ (opened), ذَهَبَ (went) |
| سَمِعَ يَسْمَعُ | Both | سَمِعَ (heard), فَرِحَ (was happy) |
| كَرُمَ يَكْرُمُ | Never | كَرُمَ (was noble) — always intransitive |`,
      rules: [
        {
          arabic: 'لكل ثلاثي مجرد عائلة كاملة من المشتقات والمزيدات',
          english: 'Every base triliteral verb has a complete family of derivatives and enhanced forms.',
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 303-318',
    },
  ],
  relatedTopicIds: ['thulathi-mazid', 'abwab-overview', 'participles'],
  tags: ['thulathi', 'mujarrad', 'base', 'triliteral'],
};

export const thulathiMazid: SarfTopic = {
  id: 'thulathi-mazid',
  titleAr: 'الثلاثي المزيد فيه',
  titleEn: 'Enhanced Triliteral',
  transliteration: 'ath-Thulaathi al-Mazeed Feehi',
  categoryId: 'derived',
  subcategoryId: 'verb-forms',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Enhanced triliteral verbs (الثلاثي المزيد فيه) add 1, 2, or 3 letters to the base triliteral root. Forms II-X each add specific letters that change the meaning in predictable ways.',
      body: `## الثلاثي المزيد فيه (Enhanced Triliteral)

Enhanced forms add letters to the three-letter root to create new meanings.

### Three Groups by Number of Added Letters
1. **One added letter** (Forms II, III, IV)
2. **Two added letters** (Forms V, VI, VII, VIII)
3. **Three added letters** (Forms IX, X)

### The Ten Forms (الأبواب العشرة)
| Form | Pattern | Added Letters | Example |
|------|---------|--------------|---------|
| I | فَعَلَ | (base) | كَتَبَ |
| II | فَعَّلَ | تضعيف العين | كَتَّبَ |
| III | فَاعَلَ | ألف | كَاتَبَ |
| IV | أَفْعَلَ | همزة | أَكْتَبَ |
| V | تَفَعَّلَ | تاء + تضعيف | تَكَتَّبَ |
| VI | تَفَاعَلَ | تاء + ألف | تَكَاتَبَ |
| VII | اِنْفَعَلَ | ألف + نون | اِنْكَتَبَ |
| VIII | اِفْتَعَلَ | ألف + تاء | اِكْتَتَبَ |
| IX | اِفْعَلَّ | ألف + تضعيف | — |
| X | اِسْتَفْعَلَ | ألف + سين + تاء | اِسْتَكْتَبَ |`,
      rules: [
        {
          arabic: 'المزيد فيه ما زِيد على حروفه الأصلية حرف أو أكثر',
          english: 'Enhanced forms add one or more letters to the original root letters.',
          examples: [
            { arabic: 'عَلَّمَ (Form II)', translation: 'to teach (added doubling of middle letter)' },
            { arabic: 'تَعَلَّمَ (Form V)', translation: 'to learn (added ta + doubling)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 303-318',
    },
    {
      difficulty: 'intermediate',
      summary: 'Each form has typical meaning shifts: Form II = causative/intensive, Form III = reciprocal, Form IV = causative, Form V = reflexive of II, Form VI = mutual, Form VII = passive, Form VIII = reflexive, Form X = seeking.',
      body: `## Meaning Patterns of Enhanced Forms

### Typical Meanings
| Form | Meaning Pattern | Example |
|------|----------------|---------|
| II فَعَّلَ | Causative / Intensive | عَلَّمَ (to teach — make someone know) |
| III فَاعَلَ | Reciprocal / Attempted | كَاتَبَ (to correspond with) |
| IV أَفْعَلَ | Causative | أَخْرَجَ (to expel — make exit) |
| V تَفَعَّلَ | Reflexive of II | تَعَلَّمَ (to learn — teach oneself) |
| VI تَفَاعَلَ | Mutual / Pretended | تَكَاتَبَ (to exchange letters) |
| VII اِنْفَعَلَ | Passive / Middle | اِنْكَسَرَ (to break — intransitive) |
| VIII اِفْتَعَلَ | Reflexive | اِجْتَمَعَ (to gather — reflexive) |
| IX اِفْعَلَّ | Colors / Defects | اِحْمَرَّ (to turn red) |
| X اِسْتَفْعَلَ | Seeking / Considering | اِسْتَغْفَرَ (to seek forgiveness) |

### Masdar Patterns (Predictable!)
Unlike base triliteral, enhanced masdars follow **predictable** patterns:
- Form II: تَفْعِيلٌ (تَعْلِيمٌ)
- Form III: مُفَاعَلَةٌ / فِعَالٌ (مُكَاتَبَةٌ)
- Form IV: إِفْعَالٌ (إِخْرَاجٌ)
- Form V: تَفَعُّلٌ (تَعَلُّمٌ)
- Form X: اِسْتِفْعَالٌ (اِسْتِغْفَارٌ)`,
      rules: [
        {
          arabic: 'مصادر المزيد قياسية — تتبع أوزانًا مطردة',
          english: 'Enhanced form masdars are predictable — they follow regular patterns (unlike base triliteral).',
          examples: [
            { arabic: 'تَعْلِيمٌ (Form II)', translation: 'teaching (pattern: تَفْعِيل)' },
            { arabic: 'اِسْتِغْفَارٌ (Form X)', translation: 'seeking forgiveness (pattern: اِسْتِفْعَال)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 303-318',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study covers the complete conjugation patterns for all ten forms, how weak/hamzah roots interact with enhanced patterns, and the scholarly classification of rare forms beyond X.',
      body: `## Advanced Enhanced Forms

### Active/Passive Participle Patterns
| Form | Active Participle | Passive Participle |
|------|------------------|-------------------|
| II | مُفَعِّلٌ (مُعَلِّمٌ) | مُفَعَّلٌ (مُعَلَّمٌ) |
| III | مُفَاعِلٌ (مُكَاتِبٌ) | مُفَاعَلٌ (مُكَاتَبٌ) |
| IV | مُفْعِلٌ (مُخْرِجٌ) | مُفْعَلٌ (مُخْرَجٌ) |
| V | مُتَفَعِّلٌ (مُتَعَلِّمٌ) | مُتَفَعَّلٌ (مُتَعَلَّمٌ) |
| VII | مُنْفَعِلٌ (مُنْكَسِرٌ) | — |
| VIII | مُفْتَعِلٌ (مُجْتَمِعٌ) | مُفْتَعَلٌ (مُجْتَمَعٌ) |
| X | مُسْتَفْعِلٌ (مُسْتَغْفِرٌ) | مُسْتَفْعَلٌ (مُسْتَغْفَرٌ) |

### Key Pattern: All Enhanced Participles Use مُـ
Unlike base triliteral (فَاعِلٌ / مَفْعُولٌ), all enhanced forms use the **مُـ** prefix for both active and passive participles. The only difference is the vowel on the letter before the last.

### Rare Forms Beyond X
Classical grammarians list up to 15 forms, but only I-X are commonly used:
- Form XI: اِفْعَالَّ (extremely rare)
- Form XII: اِفْعَوْعَلَ (extremely rare)
- Form XIV: اِفْعَنْلَلَ (extremely rare)`,
      rules: [
        {
          arabic: 'جميع اسم الفاعل واسم المفعول من المزيد تبدأ بالميم المضمومة',
          english: 'All active and passive participles of enhanced forms begin with مُـ (damma on meem).',
          examples: [
            { arabic: 'مُعَلِّمٌ / مُعَلَّمٌ', translation: 'teacher / taught (Form II participles)' },
            { arabic: 'مُسْتَغْفِرٌ / مُسْتَغْفَرٌ', translation: 'seeker of forgiveness / forgiven (Form X)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 303-318',
    },
  ],
  relatedTopicIds: ['thulathi-mujarrad', 'rubaai-verbs', 'verb-classification'],
  tags: ['thulathi', 'mazid', 'enhanced', 'forms', 'derived'],
};

export const rubaaiVerbs: SarfTopic = {
  id: 'rubaai-verbs',
  titleAr: 'الرباعي',
  titleEn: 'Quadriliteral Verbs',
  transliteration: 'ar-Rubaa\'i',
  categoryId: 'derived',
  subcategoryId: 'verb-forms',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Quadriliteral verbs (الرباعي) have four root letters instead of three. They are less common but follow their own regular patterns. Example: تَرْجَمَ (to translate) — root: ت ر ج م.',
      body: `## الرباعي (Quadriliteral Verbs)

**Quadriliteral** verbs have **four root letters**.

### Pattern
- Past: فَعْلَلَ (four root letters)
- Present: يُفَعْلِلُ
- Masdar: فَعْلَلَةٌ

### Common Quadriliteral Verbs
- تَرْجَمَ يُتَرْجِمُ (to translate) — root: ت ر ج م
- دَحْرَجَ يُدَحْرِجُ (to roll) — root: د ح ر ج
- بَعْثَرَ يُبَعْثِرُ (to scatter) — root: ب ع ث ر
- زَلْزَلَ يُزَلْزِلُ (to shake/quake) — root: ز ل ز ل`,
      rules: [
        {
          arabic: 'الرباعي المجرد على وزن فَعْلَلَ يُفَعْلِلُ فَعْلَلَةً',
          english: 'Base quadriliteral follows the pattern فَعْلَلَ يُفَعْلِلُ فَعْلَلَةً.',
          examples: [
            { arabic: 'تَرْجَمَ يُتَرْجِمُ تَرْجَمَةً', translation: 'to translate (4-letter root)' },
            { arabic: 'دَحْرَجَ يُدَحْرِجُ دَحْرَجَةً', translation: 'to roll (4-letter root)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 329-371',
    },
    {
      difficulty: 'intermediate',
      summary: 'Quadriliteral verbs have their own enhanced forms: تَفَعْلَلَ (Form II) and اِفْعَنْلَلَ (Form III). Their masdars and participles follow predictable patterns.',
      body: `## Quadriliteral Conjugation

### Base Quadriliteral (Form I)
| Form | Arabic | Pattern |
|------|--------|---------|
| Active Past | تَرْجَمَ | فَعْلَلَ |
| Active Present | يُتَرْجِمُ | يُفَعْلِلُ |
| Command | تَرْجِمْ | فَعْلِلْ |
| Passive Past | تُرْجِمَ | فُعْلِلَ |
| Passive Present | يُتَرْجَمُ | يُفَعْلَلُ |
| Active Participle | مُتَرْجِمٌ | مُفَعْلِلٌ |
| Passive Participle | مُتَرْجَمٌ | مُفَعْلَلٌ |
| Masdar | تَرْجَمَةٌ | فَعْلَلَةٌ |

### Enhanced Quadriliteral
- **Form II**: تَفَعْلَلَ (reflexive) — تَدَحْرَجَ (to roll — intransitive)
- **Form III**: اِفْعَنْلَلَ (rare) — اِحْرَنْجَمَ (to gather)

### Doubled Quadriliteral
Some quadriliterals have doubled pairs:
- زَلْزَلَ (to shake) — ز ل repeated
- وَسْوَسَ (to whisper) — و س repeated`,
      rules: [
        {
          arabic: 'الرباعي المزيد: تَفَعْلَلَ للمطاوعة',
          english: 'Enhanced quadriliteral Form II (تَفَعْلَلَ) expresses reflexive/passive meaning.',
          examples: [
            { arabic: 'دَحْرَجَ → تَدَحْرَجَ', translation: 'to roll (transitive) → to roll (intransitive)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 329-371',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study covers the origin of quadriliteral roots (some from triliteral with added letter), the full enhanced form conjugations, and borrowed/arabicized quadriliterals.',
      body: `## Advanced Quadriliteral Analysis

### Origins of Quadriliteral Roots
Many quadriliterals derive from triliteral roots with an added letter:
- **بَعْثَرَ** ← بَعَثَ (to send) + ر
- **تَمَسْكَنَ** ← مسكين (to act poor)

### Borrowed Quadriliterals
Arabic borrows some quadriliterals from other languages:
- تَلْفَزَ (to televise) — from television
- فَلْسَفَ (to philosophize) — from philosophy
- تَرْجَمَ (to translate) — possibly from Aramaic

### Complete Enhanced Forms Table
| | Form I | Form II | Form III |
|---|--------|---------|----------|
| Pattern | فَعْلَلَ | تَفَعْلَلَ | اِفْعَنْلَلَ |
| Past | دَحْرَجَ | تَدَحْرَجَ | اِحْرَنْجَمَ |
| Present | يُدَحْرِجُ | يَتَدَحْرَجُ | يَحْرَنْجِمُ |
| Masdar | دَحْرَجَةً | تَدَحْرُجًا | اِحْرِنْجَامًا |
| Act. Part. | مُدَحْرِجٌ | مُتَدَحْرِجٌ | مُحْرَنْجِمٌ |`,
      rules: [
        {
          arabic: 'بعض الرباعي منحوت من الثلاثي بزيادة حرف',
          english: 'Some quadriliterals are derived from triliterals with an added letter.',
          examples: [
            { arabic: 'بَعْثَرَ ← بَعَثَ', translation: 'to scatter ← to send (added ر)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 329-371',
    },
  ],
  relatedTopicIds: ['thulathi-mujarrad', 'thulathi-mazid', 'verb-classification'],
  tags: ['rubaai', 'quadriliteral', 'four-letter', 'verb forms'],
};

export const verbClassification: SarfTopic = {
  id: 'verb-classification',
  titleAr: 'تصنيف الأفعال',
  titleEn: 'Verb Classification',
  transliteration: 'Tasneef al-Af\'aal',
  categoryId: 'derived',
  subcategoryId: 'verb-forms',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Arabic verbs are classified by multiple criteria: number of root letters (triliteral/quadriliteral), presence of additions (mujarrad/mazid), root letter types (sound/weak/hamzah/doubled), and transitivity (transitive/intransitive).',
      body: `## تصنيف الأفعال (Verb Classification)

### By Number of Root Letters
1. **ثلاثي** (Triliteral): 3 root letters — كَتَبَ
2. **رباعي** (Quadriliteral): 4 root letters — تَرْجَمَ

### By Additions
1. **مجرد** (Base): No extra letters — كَتَبَ
2. **مزيد** (Enhanced): With extra letters — كَاتَبَ

### By Root Letter Types
1. **صحيح** (Sound): No weak letters — كَتَبَ
2. **معتل** (Weak): Has و or ي — وَعَدَ، قَالَ
3. **مهموز** (Hamzah): Has hamzah — أَكَلَ، سَأَلَ
4. **مضاعف** (Doubled): Repeated root letter — مَدَّ

### By Transitivity
1. **متعدٍّ** (Transitive): Takes an object — كَتَبَ الدَّرْسَ
2. **لازم** (Intransitive): No object — ذَهَبَ`,
      rules: [
        {
          arabic: 'الفعل يُصنف من عدة جهات: عدد الحروف، الزيادة، نوع الحروف، التعدي',
          english: 'Verbs are classified by multiple criteria: letter count, additions, letter types, and transitivity.',
          examples: [
            { arabic: 'كَتَبَ: ثلاثي مجرد صحيح متعدٍّ', translation: 'to write: triliteral, base, sound, transitive' },
            { arabic: 'وَعَدَ: ثلاثي مجرد معتل متعدٍّ', translation: 'to promise: triliteral, base, weak, transitive' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 303-318',
    },
    {
      difficulty: 'intermediate',
      summary: 'Sound verbs (الصحيح) are subdivided into سالم (completely sound), مهموز (has hamzah), and مضاعف (has doubling). Weak verbs (المعتل) are subdivided by position of the weak letter.',
      body: `## Detailed Classification

### Sound Verbs (الصحيح)
| Type | Arabic | Description | Example |
|------|--------|-------------|---------|
| سالم | Sound | No special features | كَتَبَ |
| مهموز | Hamzah | Has hamzah root | أَكَلَ |
| مضاعف | Doubled | 2nd = 3rd root | مَدَّ |

### Weak Verbs (المعتل)
| Type | Arabic | Weak Position | Example |
|------|--------|--------------|---------|
| مثال | Mithaal | 1st root | وَعَدَ |
| أجوف | Ajwaf | 2nd root | قَالَ |
| ناقص | Naqis | 3rd root | دَعَا |
| لفيف مقرون | Joined | 2nd + 3rd | طَوَى |
| لفيف مفروق | Separated | 1st + 3rd | وَقَى |

### Classification Tree
\`\`\`
الفعل
├── ثلاثي
│   ├── مجرد (6 أبواب)
│   └── مزيد (Forms II-X)
└── رباعي
    ├── مجرد (Form I)
    └── مزيد (Forms II-III)
\`\`\``,
      rules: [
        {
          arabic: 'المعتل ينقسم حسب موضع حرف العلة في الجذر',
          english: 'Weak verbs are classified by the position of the weak letter in the root.',
          examples: [
            { arabic: 'مثال: حرف العلة فاء', translation: 'Mithaal: weak letter is 1st root' },
            { arabic: 'أجوف: حرف العلة عين', translation: 'Ajwaf: weak letter is 2nd root' },
            { arabic: 'ناقص: حرف العلة لام', translation: 'Naqis: weak letter is 3rd root' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 303-318',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced classification covers how each verb type interacts with enhanced forms, the complete taxonomy of Arabic verbs, and how to fully classify any given verb by examining its root and form.',
      body: `## Advanced Verb Classification

### Complete Taxonomy
Every Arabic verb can be fully described by its classification:
1. **Root count**: Triliteral or Quadriliteral
2. **Form**: I-X (triliteral) or I-III (quadriliteral)
3. **Root type**: Sound, Weak, Hamzah, or Doubled
4. **Transitivity**: Transitive or Intransitive
5. **Baab** (for Form I): One of six categories

### Classification Examples
| Verb | Classification |
|------|---------------|
| كَتَبَ | Triliteral, Form I, Sound (salim), Transitive, باب نصر |
| اِسْتَغْفَرَ | Triliteral, Form X, Sound, Transitive |
| وَعَدَ | Triliteral, Form I, Weak (mithaal waawi), Transitive, باب ضرب |
| قَالَ | Triliteral, Form I, Weak (ajwaf waawi), Trans/Intrans, باب نصر |
| تَرْجَمَ | Quadriliteral, Form I, Sound, Transitive |
| اِتَّقَى | Triliteral, Form VIII, Weak (lafif mafruq), Intransitive |

### How to Classify a Verb
1. Count root letters → triliteral or quadriliteral
2. Identify any extra letters → determine the form (I-X)
3. Check root letters for و، ي، ء، or doubling → determine root type
4. Check if it takes an object → transitive or intransitive
5. For Form I: check past/present vowels → determine the baab`,
      rules: [
        {
          arabic: 'لتصنيف أي فعل: حدد الجذر ثم الباب ثم النوع ثم التعدي',
          english: 'To classify any verb: identify the root, then the form, then the type, then transitivity.',
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 303-318',
    },
  ],
  relatedTopicIds: ['thulathi-mujarrad', 'thulathi-mazid', 'abwab-overview', 'rubaai-verbs'],
  tags: ['classification', 'taxonomy', 'verb types', 'categories'],
};
