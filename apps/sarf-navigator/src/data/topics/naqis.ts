import type { SarfTopic } from '../types';

export const naqisWaawi: SarfTopic = {
  id: 'naqis-waawi',
  titleAr: 'الناقص الواوي',
  titleEn: 'Waawi Naqis',
  transliteration: 'an-Naaqis al-Waawi',
  categoryId: 'weak-verbs',
  subcategoryId: 'naqis',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'A naqis verb (الناقص) has a weak letter as its final root letter (لام الفعل). The waawi naqis has و as the final root. The و changes to different letters depending on the vowel environment.',
      body: `## الناقص الواوي (Waawi Naqis)

A **naqis** (defective) verb has a weak letter as its **final root letter** (لام الفعل).

The **waawi naqis** has **و** as the final root letter.

### Key Feature
The و transforms based on context:
- Past: دَعَوَ → دَعَا (و becomes alif)
- Present: يَدْعُوُ → يَدْعُو (و stays with damma)

### Common Waawi Naqis Verbs
- دَعَا يَدْعُو (to call/invite) — root: د ع و
- غَزَا يَغْزُو (to raid) — root: غ ز و
- تَلَا يَتْلُو (to recite) — root: ت ل و
- عَفَا يَعْفُو (to pardon) — root: ع ف و`,
      rules: [
        {
          arabic: 'الناقص الواوي تظهر واوه في المضارع مع الضمة',
          english: 'The و of waawi naqis appears in the present tense with damma.',
          examples: [
            { arabic: 'دَعَا يَدْعُو', translation: 'to call (و appears in present)' },
            { arabic: 'غَزَا يَغْزُو', translation: 'to raid (و appears in present)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Common Waawi Naqis Verbs',
          titleAr: 'أفعال شائعة من الناقص الواوي',
          headers: ['Past', 'Present', 'Root', 'Meaning'],
          rows: [
            ['دَعَا', 'يَدْعُو', 'د ع و', 'to call/invite'],
            ['غَزَا', 'يَغْزُو', 'غ ز و', 'to raid'],
            ['تَلَا', 'يَتْلُو', 'ت ل و', 'to recite'],
            ['عَفَا', 'يَعْفُو', 'ع ف و', 'to pardon'],
            ['سَمَا', 'يَسْمُو', 'س م و', 'to rise/be lofty'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 193-225',
    },
    {
      difficulty: 'intermediate',
      summary: 'In waawi naqis, the final و changes to alif in the past (دَعَا), stays as و in the present (يَدْعُو), drops in the jussive (لَمْ يَدْعُ), and special endings appear with pronoun suffixes.',
      body: `## Conjugation Rules for Waawi Naqis

### Changes by Form
1. **Past tense**: و → ا: دَعَا
2. **Present tense**: و stays: يَدْعُو
3. **Jussive**: و drops: لَمْ يَدْعُ
4. **Command**: و drops: اُدْعُ

### Short Conjugation
دَعَا - يَدْعُو - اُدْعُ - لَا تَدْعُ - دُعِيَ - يُدْعَى - دَاعٍ - مَدْعُوٌّ - دُعَاءً

### Past Tense with Pronouns
The alif changes based on the suffix:
- دَعَا (he called)
- دَعَوْا (they called — و returns)
- دَعَتْ (she called — alif drops)
- دَعَوْتُ (I called — و appears)

### Present Tense Changes
The و drops before certain endings:
- يَدْعُو (he calls)
- يَدْعُونَ (they call — و stays before نَ)
- تَدْعُو (she calls)
- تَدْعِينَ (you f. call — و drops before ينَ)`,
      rules: [
        {
          arabic: 'الناقص الواوي في الماضي مع واو الجماعة ترجع الواو',
          english: 'In the past tense with the group و suffix, the original و returns.',
          examples: [
            { arabic: 'دَعَا → دَعَوْا', translation: 'he called → they called' },
            { arabic: 'غَزَا → غَزَوْا', translation: 'he raided → they raided' },
          ],
        },
      ],
      tables: [
        {
          title: 'Past Tense — دَعَا with Pronouns',
          titleAr: 'الماضي مع الضمائر - دعا',
          headers: ['Person', 'Arabic', 'English'],
          rows: [
            ['He', 'دَعَا', 'he called'],
            ['They (m)', 'دَعَوْا', 'they called'],
            ['She', 'دَعَتْ', 'she called'],
            ['They (f)', 'دَعَوْنَ', 'they (f) called'],
            ['You (m.s)', 'دَعَوْتَ', 'you called'],
            ['I', 'دَعَوْتُ', 'I called'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 193-225',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study covers the passive voice forms (دُعِيَ، يُدْعَى), the active participle pattern (دَاعٍ with tanween on ya), the heavy conjugation (تصريف كبير), and naqis verbs in enhanced forms.',
      body: `## Advanced Waawi Naqis

### Passive Voice
- دَعَا → **دُعِيَ** (he was called — و becomes ي in passive)
- يَدْعُو → **يُدْعَى** (he is called — و becomes ا with fatha)

### Active Participle (اسم الفاعل)
The active participle of naqis follows pattern فَاعِل but the final weak letter creates special forms:
- دَاعٍ (caller — with tanween kasra, not دَاعِيٌ)
- In definite: الدَّاعِي (the caller)

### Full Present Tense Conjugation
| Person | Marfu' | Mansoob | Majzoom |
|--------|--------|---------|---------|
| 3rd m.s | يَدْعُو | يَدْعُوَ | يَدْعُ |
| 3rd f.s | تَدْعُو | تَدْعُوَ | تَدْعُ |
| 3rd m.d | يَدْعُوَانِ | يَدْعُوَا | يَدْعُوَا |
| 3rd m.p | يَدْعُونَ | يَدْعُوا | يَدْعُوا |
| 2nd m.s | تَدْعُو | تَدْعُوَ | تَدْعُ |

### In Enhanced Forms
| Form | Active | Passive | Meaning |
|------|--------|---------|---------|
| I | دَعَا | دُعِيَ | to call |
| III | دَاعَى | دُوعِيَ | to challenge |
| IV | أَدْعَى | أُدْعِيَ | to claim (rare) |
| VIII | اِدَّعَى | اُدُّعِيَ | to claim |`,
      rules: [
        {
          arabic: 'اسم الفاعل من الناقص ينون بالكسر نحو: داعٍ، قاضٍ',
          english: 'The active participle of naqis verbs takes kasra tanween: دَاعٍ, قَاضٍ.',
          examples: [
            { arabic: 'دَاعٍ / الدَّاعِي', translation: 'caller / the caller' },
            { arabic: 'غَازٍ / الغَازِي', translation: 'raider / the raider' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 193-225',
    },
  ],
  relatedTopicIds: ['naqis-yaai', 'ajwaf-waawi', 'lafif-maqrun', 'murakkab-naqis'],
  tags: ['naqis', 'waawi', 'defective', 'weak verb', 'final weak'],
};

export const naqisYaai: SarfTopic = {
  id: 'naqis-yaai',
  titleAr: 'الناقص اليائي',
  titleEn: "Ya'i Naqis",
  transliteration: "an-Naaqis al-Ya'i",
  categoryId: 'weak-verbs',
  subcategoryId: 'naqis',
  levels: [
    {
      difficulty: 'beginner',
      summary: "The ya'i naqis (الناقص اليائي) has ي as its final root letter. The ي becomes alif in the past tense (like waawi naqis) but shows kasra+ya in the present. Example: رَمَى يَرْمِي (to throw).",
      body: `## الناقص اليائي (Ya'i Naqis)

The **ya'i naqis** has **ي** as the final root letter.

### Key Feature
The ي transforms based on context:
- Past: رَمَيَ → رَمَى (ي becomes alif maqsura)
- Present: يَرْمِيُ → يَرْمِي (ي stays with kasra)

### Common Ya'i Naqis Verbs
- رَمَى يَرْمِي (to throw) — root: ر م ي
- مَشَى يَمْشِي (to walk) — root: م ش ي
- قَضَى يَقْضِي (to judge) — root: ق ض ي
- بَنَى يَبْنِي (to build) — root: ب ن ي

### Alif Maqsura (ى) vs. Regular Alif (ا)
Ya'i naqis verbs write the past with **alif maqsura** (ى):
- رَمَى (not رَمَا)
- مَشَى (not مَشَا)`,
      rules: [
        {
          arabic: 'الناقص اليائي يُكتب ماضيه بالألف المقصورة',
          english: "Ya'i naqis verbs write their past tense with alif maqsura (ى), not regular alif (ا).",
          examples: [
            { arabic: 'رَمَى يَرْمِي', translation: 'to throw (alif maqsura in past)' },
            { arabic: 'قَضَى يَقْضِي', translation: 'to judge (alif maqsura in past)' },
          ],
        },
      ],
      tables: [
        {
          title: "Common Ya'i Naqis Verbs",
          titleAr: 'أفعال شائعة من الناقص اليائي',
          headers: ['Past', 'Present', 'Root', 'Meaning'],
          rows: [
            ['رَمَى', 'يَرْمِي', 'ر م ي', 'to throw'],
            ['مَشَى', 'يَمْشِي', 'م ش ي', 'to walk'],
            ['قَضَى', 'يَقْضِي', 'ق ض ي', 'to judge'],
            ['بَنَى', 'يَبْنِي', 'ب ن ي', 'to build'],
            ['جَرَى', 'يَجْرِي', 'ج ر ي', 'to run'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 193-225',
    },
    {
      difficulty: 'intermediate',
      summary: "Ya'i naqis conjugation: past has alif maqsura (رَمَى), present has kasra+ya (يَرْمِي), jussive drops the ya (لَمْ يَرْمِ), command drops the ya (اِرْمِ).",
      body: `## Conjugation Rules for Ya'i Naqis

### Changes by Form
1. **Past tense**: ي → ى (alif maqsura): رَمَى
2. **Present tense**: ي stays with kasra: يَرْمِي
3. **Jussive**: ي drops: لَمْ يَرْمِ
4. **Command**: ي drops: اِرْمِ

### Short Conjugation
رَمَى - يَرْمِي - اِرْمِ - لَا تَرْمِ - رُمِيَ - يُرْمَى - رَامٍ - مَرْمِيٌّ - رَمْيًا

### Past Tense with Pronouns
- رَمَى (he threw)
- رَمَوْا (they threw — alif drops)
- رَمَتْ (she threw — alif drops)
- رَمَيْتُ (I threw — ي returns)

### Comparison: Waawi vs Ya'i Naqis
| Feature | Waawi (دعا) | Ya'i (رمى) |
|---------|------------|-----------|
| Past ending | ا (alif) | ى (alif maqsura) |
| Present | يَدْعُو | يَرْمِي |
| Command | اُدْعُ | اِرْمِ |
| Passive past | دُعِيَ | رُمِيَ |`,
      rules: [
        {
          arabic: 'الفرق بين الناقص الواوي واليائي يظهر في المضارع والأمر',
          english: 'The difference between waawi and ya\'i naqis shows in the present and command forms.',
          examples: [
            { arabic: 'يَدْعُو / اُدْعُ', translation: 'he calls / call! (waawi — damma)' },
            { arabic: 'يَرْمِي / اِرْمِ', translation: 'he throws / throw! (ya\'i — kasra)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 193-225',
    },
    {
      difficulty: 'advanced',
      summary: "Advanced study covers the full conjugation tables of ya'i naqis across all persons, the active participle (رَامٍ), passive forms (رُمِيَ، يُرْمَى), and naqis verbs in enhanced forms like Form VIII (اِقْتَضَى).",
      body: `## Advanced Ya'i Naqis

### Active Participle
Like waawi naqis, the participle takes tanween kasra:
- رَامٍ / الرَّامِي (thrower / the thrower)
- قَاضٍ / القَاضِي (judge / the judge)
- بَانٍ / البَانِي (builder / the builder)

### Passive Voice
- رَمَى → **رُمِيَ** (it was thrown)
- يَرْمِي → **يُرْمَى** (it is thrown)

### Full Present Tense Conjugation
| Person | Marfu' | Mansoob | Majzoom |
|--------|--------|---------|---------|
| 3rd m.s | يَرْمِي | يَرْمِيَ | يَرْمِ |
| 3rd f.s | تَرْمِي | تَرْمِيَ | تَرْمِ |
| 3rd m.d | يَرْمِيَانِ | يَرْمِيَا | يَرْمِيَا |
| 3rd m.p | يَرْمُونَ | يَرْمُوا | يَرْمُوا |
| 2nd m.s | تَرْمِي | تَرْمِيَ | تَرْمِ |

### In Enhanced Forms
| Form | Active | Meaning |
|------|--------|---------|
| I | رَمَى | to throw |
| II | رَمَّى | to train in archery |
| IV | أَرْمَى | to make throw |
| V | تَرَمَّى | to aim at |
| VIII | اِرْتَمَى | to throw oneself |`,
      rules: [
        {
          arabic: 'الناقص اليائي في جمع المذكر يحذف الياء وتُضم ما قبلها',
          english: "In masculine plural, ya'i naqis drops ي and the letter before takes damma: يَرْمُونَ.",
          examples: [
            { arabic: 'يَرْمِي → يَرْمُونَ', translation: 'he throws → they throw' },
            { arabic: 'يَقْضِي → يَقْضُونَ', translation: 'he judges → they judge' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 193-225',
    },
  ],
  relatedTopicIds: ['naqis-waawi', 'ajwaf-yaai', 'lafif-maqrun', 'murakkab-naqis'],
  tags: ['naqis', 'yaai', 'defective', 'weak verb', 'final weak'],
};
