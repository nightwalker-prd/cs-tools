import type { SarfTopic } from '../types';

export const lafifMaqrun: SarfTopic = {
  id: 'lafif-maqrun',
  titleAr: 'اللفيف المقرون',
  titleEn: 'Joined Lafif',
  transliteration: 'al-Lafeef al-Maqroon',
  categoryId: 'weak-verbs',
  subcategoryId: 'lafif',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Lafif maqrun (اللفيف المقرون) is a verb with two weak letters that are adjacent — the middle and final root letters (عين and لام). It combines ajwaf and naqis patterns. Example: طَوَى (to fold) — root: ط و ي.',
      body: `## اللفيف المقرون (Joined Lafif)

A **lafif maqrun** verb has **two adjacent weak letters**: the middle (عين) and final (لام) root letters.

### Key Feature
It combines **ajwaf** (hollow) and **naqis** (defective) behaviors.

### Common Lafif Maqrun Verbs
- طَوَى يَطْوِي (to fold) — root: ط و ي
- رَوَى يَرْوِي (to narrate) — root: ر و ي
- نَوَى يَنْوِي (to intend) — root: ن و ي
- هَوَى يَهْوِي (to fall/desire) — root: ه و ي
- قَوِيَ يَقْوَى (to be strong) — root: ق و ي`,
      rules: [
        {
          arabic: 'اللفيف المقرون فيه حرفا علة متجاوران: العين واللام',
          english: 'Lafif maqrun has two adjacent weak letters: the middle and final root letters.',
          examples: [
            { arabic: 'طَوَى يَطْوِي', translation: 'to fold (و is middle, ي is final)' },
            { arabic: 'نَوَى يَنْوِي', translation: 'to intend (و is middle, ي is final)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Common Lafif Maqrun Verbs',
          titleAr: 'أفعال شائعة من اللفيف المقرون',
          headers: ['Past', 'Present', 'Root', 'Meaning'],
          rows: [
            ['طَوَى', 'يَطْوِي', 'ط و ي', 'to fold'],
            ['رَوَى', 'يَرْوِي', 'ر و ي', 'to narrate'],
            ['نَوَى', 'يَنْوِي', 'ن و ي', 'to intend'],
            ['هَوَى', 'يَهْوِي', 'ه و ي', 'to fall/desire'],
            ['قَوِيَ', 'يَقْوَى', 'ق و ي', 'to be strong'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 227-244',
    },
    {
      difficulty: 'intermediate',
      summary: 'Lafif maqrun conjugation primarily follows naqis rules (the final weak letter dominates). The middle و usually stays because it has a vowel. The command form drops the final ي.',
      body: `## Conjugation of Lafif Maqrun

### Which Rules Apply?
The **naqis** (final weak) rules dominate:
- Past: طَوَى (alif maqsura like ya'i naqis)
- Present: يَطْوِي (ي stays like naqis)
- Command: اِطْوِ (ي drops)

### Short Conjugation
طَوَى - يَطْوِي - اِطْوِ - لَا تَطْوِ - طُوِيَ - يُطْوَى - طَاوٍ - مَطْوِيٌّ - طَيًّا

### Past Tense with Pronouns
- طَوَى (he folded)
- طَوَوْا (they folded)
- طَوَتْ (she folded)
- طَوَيْتُ (I folded — ي returns)

### Special Case: قَوِيَ
The verb قَوِيَ يَقْوَى (to be strong) follows باب سَمِعَ:
- قَوِيَ → يَقْوَى (present with fatha)
- This is a stative/quality verb`,
      rules: [
        {
          arabic: 'اللفيف المقرون يعامل معاملة الناقص غالبًا',
          english: 'Lafif maqrun is mostly treated like a naqis verb — the final weak letter rules dominate.',
          examples: [
            { arabic: 'اِطْوِ', translation: 'fold! (ي dropped like naqis)' },
            { arabic: 'لَمْ يَطْوِ', translation: 'he did not fold (jussive — ي dropped)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Short Conjugation — طَوَى',
          titleAr: 'التصريف الصغير - طوى',
          headers: ['Form', 'Arabic', 'English'],
          rows: [
            ['Active Past', 'طَوَى', 'he folded'],
            ['Active Present', 'يَطْوِي', 'he folds'],
            ['Command', 'اِطْوِ', 'fold!'],
            ['Passive Past', 'طُوِيَ', 'it was folded'],
            ['Passive Present', 'يُطْوَى', 'it is folded'],
            ['Active Participle', 'طَاوٍ', 'folder'],
            ['Passive Participle', 'مَطْوِيٌّ', 'folded'],
            ['Verbal Noun', 'طَيًّا', 'folding'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 227-244',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced lafif maqrun covers full conjugation tables, passive voice (طُوِيَ، يُطْوَى), behavior in enhanced forms, and the interaction between the two weak letters in various morphological environments.',
      body: `## Advanced Lafif Maqrun

### Passive Voice
- طَوَى → **طُوِيَ** (it was folded)
- يَطْوِي → **يُطْوَى** (it is folded)

### Full Conjugation (Active Present)
| Person | Marfu' | Mansoob | Majzoom |
|--------|--------|---------|---------|
| 3rd m.s | يَطْوِي | يَطْوِيَ | يَطْوِ |
| 3rd f.s | تَطْوِي | تَطْوِيَ | تَطْوِ |
| 3rd m.p | يَطْوُونَ | يَطْوُوا | يَطْوُوا |
| 2nd m.s | تَطْوِي | تَطْوِيَ | تَطْوِ |

### Active Participle
Follows the naqis pattern with tanween kasra:
- طَاوٍ / الطَّاوِي (the one who folds)
- رَاوٍ / الرَّاوِي (the narrator)
- نَاوٍ / النَّاوِي (the one who intends)

### In Enhanced Forms
| Form | Example | Meaning |
|------|---------|---------|
| II | طَوَّى | to fold repeatedly |
| V | تَطَوَّى | to be folded |
| VII | اِنْطَوَى | to fold inward / be introverted |
| VIII | اِرْتَوَى | to quench thirst (root ر و ي) |`,
      rules: [
        {
          arabic: 'اللفيف المقرون في اسم الفاعل يحذف لامه وينون بالكسر',
          english: 'The active participle of lafif maqrun drops its final letter and takes kasra tanween.',
          examples: [
            { arabic: 'طَاوٍ', translation: 'folder (tanween kasra)' },
            { arabic: 'رَاوٍ', translation: 'narrator (tanween kasra)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 227-244',
    },
  ],
  relatedTopicIds: ['lafif-mafruq', 'naqis-yaai', 'ajwaf-waawi'],
  tags: ['lafif', 'maqrun', 'joined', 'double weak', 'weak verb'],
};

export const lafifMafruq: SarfTopic = {
  id: 'lafif-mafruq',
  titleAr: 'اللفيف المفروق',
  titleEn: 'Separated Lafif',
  transliteration: 'al-Lafeef al-Mafrooq',
  categoryId: 'weak-verbs',
  subcategoryId: 'lafif',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Lafif mafruq (اللفيف المفروق) is a verb with two weak letters that are separated — the first and final root letters (فاء and لام). It combines mithaal and naqis patterns. Example: وَقَى (to protect) — root: و ق ي.',
      body: `## اللفيف المفروق (Separated Lafif)

A **lafif mafruq** verb has **two separated weak letters**: the first (فاء) and final (لام) root letters.

### Key Feature
It combines **mithaal** (initial weak) and **naqis** (final weak) behaviors.

### Common Lafif Mafruq Verbs
- وَقَى يَقِي (to protect) — root: و ق ي
- وَفَى يَفِي (to fulfill) — root: و ف ي
- وَعَى يَعِي (to comprehend) — root: و ع ي
- وَلَى يَلِي (to govern) — root: و ل ي`,
      rules: [
        {
          arabic: 'اللفيف المفروق فيه حرفا علة متفرقان: الفاء واللام',
          english: 'Lafif mafruq has two separated weak letters: the first and final root letters.',
          examples: [
            { arabic: 'وَقَى يَقِي', translation: 'to protect (و is first, ي is final)' },
            { arabic: 'وَفَى يَفِي', translation: 'to fulfill (و is first, ي is final)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Common Lafif Mafruq Verbs',
          titleAr: 'أفعال شائعة من اللفيف المفروق',
          headers: ['Past', 'Present', 'Root', 'Meaning'],
          rows: [
            ['وَقَى', 'يَقِي', 'و ق ي', 'to protect'],
            ['وَفَى', 'يَفِي', 'و ف ي', 'to fulfill'],
            ['وَعَى', 'يَعِي', 'و ع ي', 'to comprehend'],
            ['وَلَى', 'يَلِي', 'و ل ي', 'to govern'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 227-244',
    },
    {
      difficulty: 'intermediate',
      summary: 'Lafif mafruq applies both mithaal rules (و drops in present) and naqis rules (ي changes in past/jussive). The result is a very short command form: قِ (protect!), فِ (fulfill!).',
      body: `## Conjugation of Lafif Mafruq

### Combined Rules
1. **Mithaal rule**: و drops in present → يَقِي (not يَوْقِي)
2. **Naqis rule**: ي becomes alif in past → وَقَى
3. **Both**: Command loses both → قِ

### Short Conjugation
وَقَى - يَقِي - قِ - لَا تَقِ - وُقِيَ - يُوقَى - وَاقٍ - مَوْقِيٌّ - وِقَايَةً

### The Ultra-Short Command
Because و drops (mithaal) and ي drops (naqis), the command is just **one letter**:
- وَقَى → قِ (protect!)
- وَفَى → فِ (fulfill!)
- وَعَى → عِ (comprehend!)

### Past Tense with Pronouns
- وَقَى (he protected)
- وَقَوْا (they protected)
- وَقَيْتُ (I protected — ي returns)`,
      rules: [
        {
          arabic: 'أمر اللفيف المفروق قد يكون حرفًا واحدًا',
          english: 'The command of lafif mafruq can be just one letter due to both weak letters dropping.',
          examples: [
            { arabic: 'قِ', translation: 'protect! (from وَقَى — both و and ي dropped)' },
            { arabic: 'فِ', translation: 'fulfill! (from وَفَى — both و and ي dropped)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Short Conjugation — وَقَى',
          titleAr: 'التصريف الصغير - وقى',
          headers: ['Form', 'Arabic', 'English'],
          rows: [
            ['Active Past', 'وَقَى', 'he protected'],
            ['Active Present', 'يَقِي', 'he protects'],
            ['Command', 'قِ', 'protect!'],
            ['Prohibition', 'لَا تَقِ', "don't protect!"],
            ['Passive Past', 'وُقِيَ', 'he was protected'],
            ['Passive Present', 'يُوقَى', 'he is protected'],
            ['Active Participle', 'وَاقٍ', 'protector'],
            ['Passive Participle', 'مَوْقِيٌّ', 'protected'],
            ['Verbal Noun', 'وِقَايَةً', 'protection'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 227-244',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study covers full conjugation tables across all persons, the passive voice (وُقِيَ، يُوقَى), active participle (وَاقٍ), and lafif mafruq in enhanced forms like Form VIII (اِتَّقَى).',
      body: `## Advanced Lafif Mafruq

### Passive Voice
- وَقَى → **وُقِيَ** (he was protected)
- يَقِي → **يُوقَى** (he is protected — و returns in passive)

### Full Present Tense Conjugation
| Person | Marfu' | Mansoob | Majzoom |
|--------|--------|---------|---------|
| 3rd m.s | يَقِي | يَقِيَ | يَقِ |
| 3rd f.s | تَقِي | تَقِيَ | تَقِ |
| 3rd m.p | يَقُونَ | يَقُوا | يَقُوا |
| 2nd m.s | تَقِي | تَقِيَ | تَقِ |
| 1st s. | أَقِي | أَقِيَ | أَقِ |

### Active Participle
- وَاقٍ / الوَاقِي (protector — note the و stays in participle)
- وَالٍ / الوَالِي (governor)

### In Enhanced Forms
The most famous lafif mafruq enhanced form:
- **اِتَّقَى** (Form VIII of وَقَى) — to be God-conscious
- تَقْوَى (verbal noun) — God-consciousness
- مُتَّقٍ / المُتَّقِي (participle) — the God-conscious person

| Form | Example | Meaning |
|------|---------|---------|
| I | وَقَى | to protect |
| V | تَوَقَّى | to be cautious |
| VIII | اِتَّقَى | to be God-conscious |
| X | اِسْتَوْفَى | to collect in full (root و ف ي) |`,
      rules: [
        {
          arabic: 'اتَّقى من باب الافتعال من وَقَى — أصلها اِوْتَقَى',
          english: 'اِتَّقَى is Form VIII of وَقَى — originally اِوْتَقَى, with the و assimilated into the ت.',
          examples: [
            { arabic: 'اِتَّقَى يَتَّقِي', translation: 'to be God-conscious (Form VIII of وقى)' },
            { arabic: 'تَقْوَى', translation: 'God-consciousness (verbal noun)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 227-244',
    },
  ],
  relatedTopicIds: ['lafif-maqrun', 'mithaal-waawi', 'naqis-yaai'],
  tags: ['lafif', 'mafruq', 'separated', 'double weak', 'weak verb'],
};
