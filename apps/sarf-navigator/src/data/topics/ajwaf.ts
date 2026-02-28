import type { SarfTopic } from '../types';

export const ajwafWaawi: SarfTopic = {
  id: 'ajwaf-waawi',
  titleAr: 'الأجوف الواوي',
  titleEn: 'Waawi Hollow',
  transliteration: 'al-Ajwaf al-Waawi',
  categoryId: 'weak-verbs',
  subcategoryId: 'ajwaf',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'A hollow verb (الأجوف) has a weak letter as its middle root letter (عين الفعل). The waawi hollow has و as the middle root, which becomes ا in the past tense. Example: قَالَ (original root: ق و ل).',
      body: `## الأجوف الواوي (Waawi Hollow Verb)

A **hollow verb** (أجوف) has a weak letter as its **middle root letter** (عين الفعل).

The **waawi hollow** has **و** as the middle root letter.

### Key Feature
The و transforms into **alif** (ا) in the past tense:
- قَوَلَ → قَالَ (to say)
- صَوَمَ → صَامَ (to fast)

### Common Waawi Hollow Verbs
- قَالَ يَقُولُ (to say) — root: ق و ل
- صَامَ يَصُومُ (to fast) — root: ص و م
- نَامَ يَنَامُ (to sleep) — root: ن و م
- زَارَ يَزُورُ (to visit) — root: ز و ر`,
      rules: [
        {
          arabic: 'الأجوف الواوي أصل ألفه واو، وتظهر الواو في المضارع',
          english: 'The alif in waawi hollow verbs comes from و, which reappears in the present tense.',
          examples: [
            { arabic: 'قَالَ يَقُولُ', translation: 'to say (و appears in present as ـُو)' },
            { arabic: 'صَامَ يَصُومُ', translation: 'to fast (و appears in present as ـُو)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Common Waawi Hollow Verbs',
          titleAr: 'أفعال شائعة من الأجوف الواوي',
          headers: ['Past', 'Present', 'Root', 'Meaning'],
          rows: [
            ['قَالَ', 'يَقُولُ', 'ق و ل', 'to say'],
            ['صَامَ', 'يَصُومُ', 'ص و م', 'to fast'],
            ['زَارَ', 'يَزُورُ', 'ز و ر', 'to visit'],
            ['نَامَ', 'يَنَامُ', 'ن و م', 'to sleep'],
            ['عَادَ', 'يَعُودُ', 'ع و د', 'to return'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 169-191',
    },
    {
      difficulty: 'intermediate',
      summary: 'The middle و becomes alif in the past, returns as و in the present (باب نَصَرَ), and is deleted entirely in the jussive/command forms. The vowel before deletion determines the command vowel.',
      body: `## Conjugation Rules for Waawi Hollow

### The Three States of و
1. **Past tense**: و → ا (alif): قَالَ
2. **Present tense**: و returns with damma: يَقُولُ
3. **Jussive/Command**: و is deleted: قُلْ

### Deletion in Jussive and Command
When the و is deleted, the vowel transfers:
- يَقُولُ → لَمْ يَقُلْ (jussive — و deleted)
- يَقُولُ → قُلْ (command — و deleted)

### Short Conjugation
قَالَ - يَقُولُ - قُلْ - لَا تَقُلْ - قِيلَ - يُقَالُ - قَائِلٌ - مَقُولٌ - قَوْلًا

### Past Tense with Pronoun Suffixes
When a consonant suffix is added, the alif reverts:
- قَالَ → قُلْتُ (I said — alif deleted, damma appears)
- قَالَ → قُلْنَا (we said)`,
      rules: [
        {
          arabic: 'الأجوف يُحذف حرف العلة في الأمر والجزم',
          english: 'The weak middle letter is deleted in the command and jussive forms.',
          examples: [
            { arabic: 'قُلْ', translation: 'say! (و deleted from يَقُولُ)' },
            { arabic: 'لَمْ يَقُلْ', translation: 'he did not say (jussive — و deleted)' },
            { arabic: 'صُمْ', translation: 'fast! (و deleted from يَصُومُ)' },
          ],
        },
        {
          arabic: 'إذا اتصل بالأجوف ضمير ساكن حُذفت الألف وظهرت حركة الفاء',
          english: 'When a consonant pronoun suffix is added, the alif is deleted and the first root letter takes a vowel.',
          examples: [
            { arabic: 'قُلْتُ', translation: 'I said (damma because original is و)' },
            { arabic: 'صُمْتُ', translation: 'I fasted (damma because original is و)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Past Tense — قَالَ with Pronouns',
          titleAr: 'الماضي مع الضمائر - قال',
          headers: ['Person', 'Arabic', 'English'],
          rows: [
            ['He', 'قَالَ', 'he said'],
            ['They (m)', 'قَالُوا', 'they said'],
            ['She', 'قَالَتْ', 'she said'],
            ['You (m.s)', 'قُلْتَ', 'you said'],
            ['I', 'قُلْتُ', 'I said'],
            ['We', 'قُلْنَا', 'we said'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 169-191',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study covers the full 14-form conjugation tables, passive voice transformations (قِيلَ، يُقَالُ), how to distinguish waawi from ya\'i hollow verbs, and the behavior of hollow verbs in enhanced forms.',
      body: `## Advanced Waawi Hollow

### Passive Voice
The passive of hollow verbs has unique forms:
- قَالَ → **قِيلَ** (it was said — kasra + ya)
- يَقُولُ → **يُقَالُ** (it is said — damma + alif)

### How to Identify Waawi vs. Ya'i
Look at the **present tense**:
- **Damma** on middle = waawi: يَقُولُ (و)
- **Kasra** on middle = ya'i: يَبِيعُ (ي)

### Full Present Tense Conjugation
| Person | Singular | Dual | Plural |
|--------|----------|------|--------|
| 3rd m. | يَقُولُ | يَقُولَانِ | يَقُولُونَ |
| 3rd f. | تَقُولُ | تَقُولَانِ | يَقُلْنَ |
| 2nd m. | تَقُولُ | تَقُولَانِ | تَقُولُونَ |
| 2nd f. | تَقُولِينَ | تَقُولَانِ | تَقُلْنَ |
| 1st | أَقُولُ | نَقُولُ | نَقُولُ |

### In Enhanced Forms
- Form IV: أَقَالَ (caused to say)
- Form VII: اِنْقَادَ (to be led — root: ق و د)
- Form VIII: اِخْتَارَ (to choose — root: خ ي ر, but follows hollow pattern)
- Form X: اِسْتَقَالَ (to resign — root: ق و ل)`,
      rules: [
        {
          arabic: 'مجهول الأجوف الواوي: الماضي بالكسر والياء، والمضارع بالضم والألف',
          english: 'Passive of waawi hollow: past uses kasra+ya (قِيلَ), present uses damma+alif (يُقَالُ).',
          examples: [
            { arabic: 'قِيلَ', translation: 'it was said' },
            { arabic: 'يُقَالُ', translation: 'it is said' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 169-191',
    },
  ],
  relatedTopicIds: ['ajwaf-yaai', 'mithaal-waawi', 'naqis-waawi', 'murakkab-ajwaf'],
  tags: ['ajwaf', 'waawi', 'hollow', 'weak verb', 'middle weak'],
};

export const ajwafYaai: SarfTopic = {
  id: 'ajwaf-yaai',
  titleAr: 'الأجوف اليائي',
  titleEn: "Ya'i Hollow",
  transliteration: "al-Ajwaf al-Ya'i",
  categoryId: 'weak-verbs',
  subcategoryId: 'ajwaf',
  levels: [
    {
      difficulty: 'beginner',
      summary: "The ya'i hollow verb (الأجوف اليائي) has ي as its middle root letter. Like the waawi hollow, ي becomes ا in the past tense. Example: بَاعَ (original root: ب ي ع).",
      body: `## الأجوف اليائي (Ya'i Hollow Verb)

The **ya'i hollow** has **ي** as the middle root letter.

### Key Feature
The ي transforms into **alif** (ا) in the past tense:
- بَيَعَ → بَاعَ (to sell)
- سَيَرَ → سَارَ (to walk)

### Common Ya'i Hollow Verbs
- بَاعَ يَبِيعُ (to sell) — root: ب ي ع
- سَارَ يَسِيرُ (to walk) — root: س ي ر
- طَارَ يَطِيرُ (to fly) — root: ط ي ر
- عَاشَ يَعِيشُ (to live) — root: ع ي ش`,
      rules: [
        {
          arabic: 'الأجوف اليائي أصل ألفه ياء، وتظهر الياء في المضارع',
          english: "The alif in ya'i hollow verbs comes from ي, which reappears in the present tense.",
          examples: [
            { arabic: 'بَاعَ يَبِيعُ', translation: 'to sell (ي appears in present as ـِي)' },
            { arabic: 'سَارَ يَسِيرُ', translation: 'to walk (ي appears in present as ـِي)' },
          ],
        },
      ],
      tables: [
        {
          title: "Common Ya'i Hollow Verbs",
          titleAr: 'أفعال شائعة من الأجوف اليائي',
          headers: ['Past', 'Present', 'Root', 'Meaning'],
          rows: [
            ['بَاعَ', 'يَبِيعُ', 'ب ي ع', 'to sell'],
            ['سَارَ', 'يَسِيرُ', 'س ي ر', 'to walk'],
            ['طَارَ', 'يَطِيرُ', 'ط ي ر', 'to fly'],
            ['عَاشَ', 'يَعِيشُ', 'ع ي ش', 'to live'],
            ['غَابَ', 'يَغِيبُ', 'غ ي ب', 'to be absent'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 169-191',
    },
    {
      difficulty: 'intermediate',
      summary: "Ya'i hollow verbs show ي as kasra+ya in the present tense. Like waawi hollow, the weak letter deletes in jussive and command forms. The vowel before deletion is kasra (matching the ي origin).",
      body: `## Conjugation Rules for Ya'i Hollow

### The Three States of ي
1. **Past tense**: ي → ا (alif): بَاعَ
2. **Present tense**: ي returns with kasra: يَبِيعُ
3. **Jussive/Command**: ي is deleted: بِعْ

### Deletion in Jussive and Command
- يَبِيعُ → لَمْ يَبِعْ (jussive — ي deleted)
- يَبِيعُ → بِعْ (command — ي deleted)

### Short Conjugation
بَاعَ - يَبِيعُ - بِعْ - لَا تَبِعْ - بِيعَ - يُبَاعُ - بَائِعٌ - مَبِيعٌ - بَيْعًا

### Past Tense with Pronoun Suffixes
- بَاعَ → بِعْتُ (I sold — kasra because original is ي)
- بَاعَ → بِعْنَا (we sold)`,
      rules: [
        {
          arabic: 'إذا اتصل بالأجوف اليائي ضمير ساكن ظهرت الكسرة على الفاء',
          english: "When a consonant pronoun suffix is added to ya'i hollow, the first root letter takes kasra.",
          examples: [
            { arabic: 'بِعْتُ', translation: 'I sold (kasra because original is ي)' },
            { arabic: 'سِرْتُ', translation: 'I walked (kasra because original is ي)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Comparing Waawi and Ya\'i with Pronouns',
          titleAr: 'مقارنة الواوي واليائي مع الضمائر',
          headers: ['Person', 'Waawi (قَالَ)', 'Ya\'i (بَاعَ)'],
          rows: [
            ['He', 'قَالَ', 'بَاعَ'],
            ['I', 'قُلْتُ (damma)', 'بِعْتُ (kasra)'],
            ['We', 'قُلْنَا (damma)', 'بِعْنَا (kasra)'],
            ['Command', 'قُلْ (damma)', 'بِعْ (kasra)'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 169-191',
    },
    {
      difficulty: 'advanced',
      summary: "Advanced study covers the passive forms (بِيعَ، يُبَاعُ), the complete conjugation tables, and how ya'i hollow verbs behave in enhanced forms (Form VIII: اِخْتَارَ from خ ي ر).",
      body: `## Advanced Ya'i Hollow

### Passive Voice
- بَاعَ → **بِيعَ** (it was sold — kasra + ya)
- يَبِيعُ → **يُبَاعُ** (it is sold — damma + alif)

### Passive Comparison
| | Waawi (قال) | Ya'i (باع) |
|---|---|---|
| Active Past | قَالَ | بَاعَ |
| Passive Past | قِيلَ | بِيعَ |
| Active Present | يَقُولُ | يَبِيعُ |
| Passive Present | يُقَالُ | يُبَاعُ |

### Active Participle
The active participle of hollow verbs uses the pattern **فَاعِل** with hamzah:
- قَالَ → قَائِلٌ (sayer)
- بَاعَ → بَائِعٌ (seller)
- سَارَ → سَائِرٌ (walker)

### In Enhanced Forms
- Form VII: اِنْبَاعَ (to be sold — rare)
- Form VIII: اِخْتَارَ (to choose — root: خ ي ر)
- Form X: اِسْتَبَاعَ (to seek to buy)`,
      rules: [
        {
          arabic: 'اسم الفاعل من الأجوف يأتي على وزن فاعل بالهمزة',
          english: 'The active participle of hollow verbs follows the فَاعِل pattern with hamzah replacing the weak letter.',
          examples: [
            { arabic: 'قَائِلٌ', translation: 'sayer (from قَالَ)' },
            { arabic: 'بَائِعٌ', translation: 'seller (from بَاعَ)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 169-191',
    },
  ],
  relatedTopicIds: ['ajwaf-waawi', 'mithaal-yaai', 'naqis-yaai', 'murakkab-ajwaf'],
  tags: ['ajwaf', 'yaai', 'hollow', 'weak verb', 'middle weak'],
};
