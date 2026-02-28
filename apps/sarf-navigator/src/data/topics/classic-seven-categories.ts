import type { SarfTopic } from '../types';

// ============================================================================
// Topic 15: The Sound Verb (as-Saheeh)
// ============================================================================

export const clSoundVerb: SarfTopic = {
  id: 'cl-sound-verb',
  titleAr: 'الصحيح',
  titleEn: 'The Sound Verb',
  transliteration: 'as-Saheeh',
  categoryId: 'cl-seven-categories',
  subcategoryId: 'cl-sound-doubled',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'The sound verb is a verb whose root letters do not contain any weak letters or hamzah in a way that causes morphophonemic changes. It serves as the baseline category.',
      body: `## The Sound Verb (الصحيح / as-Saheeh)

The sound verb is the **baseline category** in Arabic morphology. Its root letters do not contain:
- Weak letters (حروف العلة: و، ي) that cause i'lal changes
- Hamzah (ء) that causes lightening changes
- Two identical letters that cause assimilation

Because of this, the sound verb conjugates regularly without any morphophonemic changes. All other categories are defined by how they *deviate* from this baseline.

A sound verb that is completely free of all these factors is specifically called **سَالِم (saalim)** — "completely sound."`,
      rules: [
        {
          arabic: 'الصحيح: ما خلت حروفه الأصلية من حروف العلة والهمزة والتضعيف',
          english:
            'The sound verb is one whose root letters are free from weak letters, hamzah, and doubling. It undergoes no morphophonemic changes.',
          examples: [
            { arabic: 'نَصَرَ يَنْصُرُ', translation: 'he helped / he helps' },
            { arabic: 'ضَرَبَ يَضْرِبُ', translation: 'he struck / he strikes' },
            { arabic: 'فَتَحَ يَفْتَحُ', translation: 'he opened / he opens' },
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Maqsid 3, Baab 1',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta clarifies that the sound verb is not entirely immune to i\'lal — it can undergo transfer (naql), substitution (ta\'weed), and deletion (hadhf) in specific augmented patterns.',
      body: `## I'lal in the Sound Verb (اعتلال الصحيح)

While the sound verb is the baseline, Al-Wusta clarifies that even sound verbs can undergo certain i'lal changes in augmented forms:

### Types of I'lal in Sound Verbs

1. **Transfer (النقل / an-naql)** — moving a vowel from one letter to another
2. **Substitution (التعويض / at-ta'weed)** — compensating for a deleted letter
3. **Deletion (الحذف / al-hadhf)** — removing a letter

### I'lal in the Past Tense

The past tense undergoes lightening (تخفيف / takhfeef) in certain augmented patterns:
- From the pattern إفعال (if'aal): the hamza of the added pattern is lightened
- Example: إِسْتَطَاعَ → اسْتَطَاعَ

### Passive Voice Note

In the passive voice (المبني للمفعول), the faa' of the word takes specific vowels:
- قِيلَ (it was said), بِيعَ (it was sold), خِيفَ (it was feared)
- The dammah form is also permissible: قُولَ، بُوعَ، خُوفَ`,
      rules: [
        {
          arabic: 'الصحيح يعتل بالنقل والتعويض والحذف في الأبواب المزيدة',
          english:
            'The sound verb undergoes i\'lal through transfer, substitution, and deletion in augmented forms.',
          examples: [
            { arabic: 'اسْتَطَاعَ', translation: 'he was able (lightening of if\'aal hamza)' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 3, Baab 1',
    },
    {
      difficulty: 'advanced',
      summary:
        "Even sound verbs can undergo i'laal in augmented forms. Form IV (if'aal) lightens its hamza, and the passive voice produces unexpected vowel patterns. Explore how sound roots behave across Forms II-X.",
      body: `## Sound Verbs in Augmented Forms (الصحيح في الأبواب المزيدة)

### I'laal of Hamza in Form IV (if'aal)

Sound verbs in Form IV (أَفْعَلَ) undergo **hamza lightening** (takhfeef):
- The pattern begins with أَ (hamza), and when a first-person prefix is added: أَأَفْعَلُ → أُفْعِلُ
- The two hamzas are resolved by lightening

### Passive Voice Patterns

In the passive of augmented forms, sound verbs follow predictable patterns:
- Form II passive: فُعِّلَ (fu\\'ila)
- Form IV passive: أُفْعِلَ (uf\\'ila)
- Form VII passive: اُنْفُعِلَ (unfu\\'ila)

### Cross-Form Exploration

Use the transformer below to verify that sound verbs produce **identical** sound and actual forms — confirming they are the baseline with zero i'laal.`,
      interactiveWidget: 'ilaal-transformer',
      widgetConfig: { presetVerbType: 'sahih', presetRoot: 'نصر', compact: true },
      sourceRef: 'Al-Kubra fi at-Tasreef, Maqsid 3, Baab 1',
    },
  ],
  relatedTopicIds: ['cl-doubled-verb', 'cl-foundational-principles'],
  tags: ['seven-categories', 'sound', 'baseline'],
};

// ============================================================================
// Topic 16: The Doubled Verb (al-Mudaa'af)
// ============================================================================

export const clDoubledVerb: SarfTopic = {
  id: 'cl-doubled-verb',
  titleAr: 'المضاعف',
  titleEn: 'The Doubled Verb',
  transliteration: 'al-Mudaa\'af',
  categoryId: 'cl-seven-categories',
  subcategoryId: 'cl-sound-doubled',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'The doubled verb has two identical root letters that merge together (assimilate) in most conjugated forms. It comes in trilateral and quadrilateral types.',
      body: `## The Doubled Verb (المضاعف / al-Mudaa'af)

The doubled verb has **two identical root letters** that undergo assimilation (إدغام / idghaam) — merging into one letter with a shaddah.

> Example: رَدَّ — its origin is رَدَدَ (he returned)

### Two Types

| # | Type | Arabic | Example |
|---|------|--------|---------|
| 1 | **Trilateral Doubled** (المضاعف الثلاثي) | المضاعف الثلاثي | رَدَّ (he returned) |
| 2 | **Quadrilateral Doubled** (المضاعف الرباعي) | المضاعف الرباعي | زَلْزَلَ يُزَلْزِلُ (he shook) |

The trilateral doubled verb has its **middle and final** root letters identical (e.g., ر-د-د). The quadrilateral has its 1st and 3rd letters identical AND its 2nd and 4th letters identical (e.g., ز-ل-ز-ل).`,
      rules: [
        {
          arabic: 'المضاعف: ما كان فيه حرفان من جنس واحد فيُدغم أحدهما في الآخر',
          english:
            'The doubled verb has two letters of the same kind. One assimilates into the other, producing a shaddah.',
          examples: [
            { arabic: 'رَدَّ (أصله: رَدَدَ)', translation: 'he returned (origin: radada)' },
            { arabic: 'مَدَّ (أصله: مَدَدَ)', translation: 'he stretched (origin: madada)' },
            { arabic: 'زَلْزَلَ', translation: 'he shook (quadrilateral doubled)' },
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Maqsid 3, Baab 2',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta details assimilation rules across all conjugated forms: when it is obligatory, prohibited, or permissible — in the past, present, imperative, and derived nouns.',
      body: `## Assimilation Rules in the Doubled Verb (إدغام المضاعف)

Al-Wusta provides detailed rules for when assimilation is **obligatory**, **prohibited**, or **permissible** across all forms:

### In the Past Tense
- **Prohibited** when attached to a voweled pronoun: رَدَدْتُ، رَدَدْنَا
- **Obligatory** otherwise: رَدَّ، رَدَّا، رَدُّوا، رَدَّتْ

### In the Present Tense
- **Prohibited** in the feminine plural: يَرْدُدْنَ، تَرْدُدْنَ
- **Obligatory** in all others: يَرُدُّ (after transfer/naql)

### In the Imperative
- **Prohibited** in the feminine plural: اُرْدُدْنَ
- **Permissible** in 2nd person masculine singular — both forms are valid: رُدَّ and رُدْ
- **Obligatory** in all other forms: رُدَّا، رُدُّوا

### In Derived Nouns
- **Obligatory** in the active participle and nouns of time/place: رَادٌّ، مَرَدٌّ
- **Prohibited** in the passive participle: مَرْدُودٌ (NOT مَرْدُدٌّ)

### Miscellaneous Points
- One of two identical letters may be **replaced** by a weak letter: أَمْلَيْتُ (origin: أَمْلَلْتُ)
- One may be **deleted**: ظَلْتُ (origin: ظَلَلْتُ)
- Letters with close articulation points can also assimilate: يَدَّكِرُونَ (origin: يَتَذَكَّرُونَ)`,
      rules: [
        {
          arabic: 'الإدغام واجب مع الساكن، ممتنع مع الضمير المتحرك، جائز في أمر المفرد المذكر',
          english:
            'Assimilation is obligatory with quiescent endings, prohibited with voweled pronouns, and permissible in the 2nd person masculine singular imperative.',
          examples: [
            { arabic: 'رَدَدْتُ (ممتنع)', translation: 'I returned (assimilation prohibited)' },
            { arabic: 'رَدَّ (واجب)', translation: 'he returned (assimilation obligatory)' },
            { arabic: 'رُدَّ / رُدْ (جائز)', translation: 'return! (both forms permissible)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Assimilation Rules by Form',
          titleAr: 'أحكام الإدغام حسب الصيغة',
          headers: ['Form', 'Status', 'Example'],
          rows: [
            ['Past + voweled pronoun', 'Prohibited', 'رَدَدْتُ (radadtu)'],
            ['Past + no voweled pronoun', 'Obligatory', 'رَدَّ (radda)'],
            ['Present feminine plural', 'Prohibited', 'يَرْدُدْنَ (yardudna)'],
            ['Present all others', 'Obligatory', 'يَرُدُّ (yaruddu)'],
            ['Imperative feminine plural', 'Prohibited', 'اُرْدُدْنَ (urdudna)'],
            ['Imperative 2nd masc. sg.', 'Permissible', 'رُدَّ / رُدْ (rudda / rud)'],
            ['Active participle', 'Obligatory', 'رَادٌّ (raadd)'],
            ['Passive participle', 'Prohibited', 'مَرْدُودٌ (mardood)'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 3, Baab 2',
    },
    {
      difficulty: 'advanced',
      summary:
        "Doubled verbs in augmented forms (II-X) show complex idghaam interactions. Forms VII, VIII, and X have unique assimilation patterns. Some forms block idghaam entirely.",
      body: `## Doubled Verbs in Augmented Forms (المضاعف في الأبواب المزيدة)

### Form II (فَعَّلَ)
The existing shaddah on 'ayn complicates the doubling:
- رَدَّدَ → can produce triple consonant effects
- The form's own tashdeed interacts with the root's doubling

### Form VII (اِنْفَعَلَ)
- اِنْمَدَّ (he stretched out) — full idghaam of the doubled root
- The nun of infi'aal does not affect idghaam behavior

### Form VIII (اِفْتَعَلَ)
- اِمْتَدَّ (he extended) — idghaam after the taa' of ifti'aal
- Passive: اُمْتُدَّ — idghaam maintained in passive

### Form X (اِسْتَفْعَلَ)
- اِسْتَمَدَّ (he sought extension) — idghaam at the end
- اِسْتَعَدَّ (he prepared) — doubled root with full idghaam

### Edge Cases
- When a suffix begins with a voweled pronoun, idghaam breaks: اِسْتَعْدَدْتُ
- When the jussive removes the final vowel: لَمْ يَسْتَعِدَّ → لَمْ يَسْتَعِدّ

### Comparison Across Forms

Use the transformer to see how a doubled root like ر-د-د behaves across all available forms. Notice where idghaam is maintained vs. broken.`,
      interactiveWidget: 'ilaal-transformer',
      widgetConfig: { presetVerbType: "mudaa'af", presetRoot: 'ردد', compact: true },
      sourceRef: 'Al-Kubra fi at-Tasreef, Maqsid 3, Baab 2',
    },
  ],
  relatedTopicIds: ['cl-sound-verb', 'cl-six-trilateral-doors'],
  tags: ['seven-categories', 'doubled', 'idghaam', 'assimilation'],
};

// ============================================================================
// Topic 17: The Assimilated Verb (al-Mithaal)
// ============================================================================

export const clAssimilatedVerb: SarfTopic = {
  id: 'cl-assimilated-verb',
  titleAr: 'المثال',
  titleEn: 'The Assimilated Verb',
  transliteration: 'al-Mithaal',
  categoryId: 'cl-seven-categories',
  subcategoryId: 'cl-weak-verbs',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'The assimilated verb has a weak letter (waaw or yaa\') as its first root letter. It comes in two types: waawi and yaa\'i.',
      body: `## The Assimilated Verb (المثال / al-Mithaal)

The assimilated verb has a **weak letter as its first root letter** (فاء الكلمة). It is called "assimilated" (مثال) because it *resembles* the sound verb in the past tense (no changes occur there), but diverges in the present tense and other forms.

### Two Types

| # | Type | Arabic | Example |
|---|------|--------|---------|
| 1 | **Waawi** (مثال واوي) | مثال واويّ | وَعَدَ يَعِدُ (he promised / he promises) |
| 2 | **Yaa'i** (مثال يائي) | مثال يائيّ | يَسَرَ يَيْسِرُ (it was easy / it becomes easy) |

The most common type is the **waawi** assimilated verb, where the first root letter is a waaw (و).`,
      rules: [
        {
          arabic: 'المثال: ما كانت فاؤه حرف علة — واوي أو يائي',
          english:
            'The assimilated verb has a weak letter as its first radical — either waaw (waawi) or yaa\' (yaa\'i).',
          examples: [
            { arabic: 'وَعَدَ يَعِدُ', translation: 'he promised / he promises (waawi)' },
            { arabic: 'وَجَدَ يَجِدُ', translation: 'he found / he finds (waawi)' },
            { arabic: 'يَسَرَ يَيْسِرُ', translation: 'it was easy / it becomes easy (yaa\'i)' },
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Maqsid 3, Baab 3, Fasl 1',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta details weak-letter changes in the assimilated verb across the present tense (waaw deletion), imperative, masdar (deletion with taa\' compensation), and derived nouns. Five verb doors are covered.',
      body: `## Weak-Letter Changes in the Assimilated Verb (اعتلال المثال)

Al-Wusta covers five verb doors for the assimilated verb and details its i'lal across all forms:

### Five Verb Doors
1. وَعَدَ يَعِدُ — "to promise"
2. وَضَعَ يَضَعُ — "to place"
3. وَجَلَ يَوْجَلُ — "to fear"
4. وَسَمَ يُوسَمُ — "to brand"
5. وَرِثَ يَرِثُ — "to inherit"

### In the Past Tense
- The past tense generally has **no changes** (hence the name "assimilated" — it resembles the sound verb)
- Exception: The ifti'aal (افتعال) form changes the waaw to taa' and assimilates: اِوْتَعَدَ → اِتَّعَدَ

### In the Present Tense
- The waaw is **deleted** when the 'ayn has kasrah: يَوْعِدُ → يَعِدُ
- When a kasrah is restored before a deleted waaw, the waaw returns: لَمْ يُوعَدْ (passive)

### In the Masdar
- The masdar undergoes **deletion and compensation**: وَعْدٌ → وِعْدَةٌ → عِدَة ('idah) — the waaw is deleted and taa' marbuuta is added

### In Derived Nouns
- The active/passive participle and time/place nouns are **NOT changed**: وَاعِدٌ، مَوْعُودٌ، مَوْعِدٌ
- The noun of time/place follows the pattern مَفْعِل: مَوْعِدٌ، مَوْضِعٌ، مَوْسِمٌ`,
      rules: [
        {
          arabic: 'تُحذف واو المثال في المضارع إذا كُسرت عينه، وتُعوَّض في المصدر بتاء التأنيث',
          english:
            'The waaw is deleted in the present tense when the \'ayn has kasrah, and compensated in the masdar with taa\' marbuuta.',
          examples: [
            { arabic: 'يَوْعِدُ → يَعِدُ', translation: 'waaw deleted in present tense' },
            { arabic: 'وَعْدٌ → عِدَة', translation: 'masdar: waaw deleted, taa\' added' },
            { arabic: 'وَاعِدٌ (لا تغيير)', translation: 'active participle: no change' },
          ],
        },
      ],
      tables: [
        {
          title: 'I\'lal of the Assimilated Verb by Form',
          titleAr: 'اعتلال المثال حسب الصيغة',
          headers: ['Form', 'Change Type', 'Example'],
          rows: [
            ['Past tense', 'No change', 'وَعَدَ (wa\'ada)'],
            ['Past ifti\'aal', 'Substitution + assimilation', 'اِوْتَعَدَ → اِتَّعَدَ'],
            ['Present (kasrah on \'ayn)', 'Deletion of waaw', 'يَوْعِدُ → يَعِدُ'],
            ['Masdar', 'Deletion + compensation', 'وَعْدٌ → عِدَة'],
            ['Active participle', 'No change', 'وَاعِدٌ (waa\'id)'],
            ['Passive participle', 'No change', 'مَوْعُودٌ (maw\'uud)'],
            ['Noun of time/place', 'No change (pattern maf\'il)', 'مَوْعِدٌ (maw\'id)'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 3, Baab 3, Fasl 1',
    },
    {
      difficulty: 'advanced',
      summary:
        "Assimilated verbs in Forms II-X show varied behavior. The waaw is protected in most augmented forms but undergoes special assimilation in Form VIII (ifti'aal).",
      body: `## Assimilated Verbs in Augmented Forms (المثال في الأبواب المزيدة)

### The Waaw Across Augmented Forms

In most augmented forms, the waaw of the assimilated verb is **protected** and does not undergo deletion:

| Form | Example | Change? |
|------|---------|---------|
| II فَعَّلَ | وَصَّلَ | No change (waaw stays) |
| III فَاعَلَ | وَاعَدَ | No change |
| IV أَفْعَلَ | أَوْعَدَ | No change |
| V تَفَعَّلَ | تَوَقَّعَ | No change |
| VI تَفَاعَلَ | تَوَاصَلَ | No change |

### Form VIII: Special Assimilation

Form VIII (اِفْتَعَلَ) is the exception — the waaw **assimilates with the taa'**:

**Step-by-step**: اِوْتَعَدَ → the waaw becomes taa' → اِتْتَعَدَ → idghaam → **اِتَّعَدَ**

This is the most distinctive feature of assimilated verbs in the augmented forms.

### Form VII: Naql on Faa'

In Form VII (اِنْفَعَلَ), the waaw can undergo naql:
- اِنْوَعَدَ → the vowel of the waaw transfers

### Yaa'i Assimilated Verbs

Yaa'i assimilated verbs (like يَسَرَ) generally do not undergo changes in augmented forms, as the yaa' is more stable than waaw.

### Interactive Comparison

Enter the root و ع د below to see how the waaw behaves differently across Forms I through X:`,
      interactiveWidget: 'ilaal-transformer',
      widgetConfig: { presetVerbType: 'mithaal-waawi', presetRoot: 'وعد', compact: true },
      sourceRef: 'Al-Kubra fi at-Tasreef, Maqsid 3, Baab 3, Fasl 1',
    },
  ],
  relatedTopicIds: ['cl-sound-verb', 'cl-hollow-verb', 'cl-doubly-weak-verb'],
  tags: ['seven-categories', 'weak', 'assimilated', 'mithaal'],
};

// ============================================================================
// Topic 18: The Hollow Verb (al-Ajwaf)
// ============================================================================

export const clHollowVerb: SarfTopic = {
  id: 'cl-hollow-verb',
  titleAr: 'الأجوف',
  titleEn: 'The Hollow Verb',
  transliteration: 'al-Ajwaf',
  categoryId: 'cl-seven-categories',
  subcategoryId: 'cl-weak-verbs',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'The hollow verb has a weak letter (waaw or yaa\') as its middle root letter. Its middle letter undergoes flipping (qalb) and deletion in conjugation.',
      body: `## The Hollow Verb (الأجوف / al-Ajwaf)

The hollow verb has a **weak letter as its middle root letter** (عين الكلمة). It is called "hollow" because its core (middle) is "empty" — it undergoes significant changes.

### Two Types

| # | Type | Arabic | Example |
|---|------|--------|---------|
| 1 | **Waawi** (أجوف واوي) | أجوف واويّ | قَالَ يَقُولُ (he said / he says) |
| 2 | **Yaa'i** (أجوف يائي) | أجوف يائيّ | بَاعَ يَبِيعُ (he sold / he sells) |

The hollow verb is one of the most commonly encountered categories. The original middle root letter (waaw or yaa') frequently changes to an alif in the past tense.`,
      rules: [
        {
          arabic: 'الأجوف: ما كانت عينه حرف علة — واوي أو يائي',
          english:
            'The hollow verb has a weak letter as its middle radical — either waaw (waawi) or yaa\' (yaa\'i). The middle letter undergoes qalb (flipping) to alif.',
          examples: [
            { arabic: 'قَالَ يَقُولُ (أصله: قَوَلَ)', translation: 'he said / he says (origin: qawala)' },
            { arabic: 'بَاعَ يَبِيعُ (أصله: بَيَعَ)', translation: 'he sold / he sells (origin: baya\'a)' },
            { arabic: 'خَافَ يَخَافُ (أصله: خَوِفَ)', translation: 'he feared / he fears (origin: khawifa)' },
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Maqsid 3, Baab 3, Fasl 2',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta covers hollow verb i\'lal in detail: naql (transfer) and qalb (flipping) in the present tense, deletion with voweled pronouns in the past, and active/passive participle formation.',
      body: `## I'lal in the Hollow Verb (اعتلال الأجوف)

Al-Wusta covers three verb doors for the hollow: قَالَ يَقُولُ، بَاعَ يَبِيعُ، خَافَ يَخَافُ.

### In the Past Tense

The 'ayn undergoes **qalb** (flipping) — the waaw/yaa' becomes alif:
- قَوَلَ → قَالَ (the waaw flips to alif)
- بَيَعَ → بَاعَ (the yaa' flips to alif)

When attached to a **voweled pronoun**, the 'ayn is **deleted**:
- قُلْتُ (I said), بِعْتُ (I sold), خِفْتُ (I feared)

The vowel on the faa' after deletion indicates the original letter:
- Dammah → original waaw: **قُلْتُ** (from قَوَلَ)
- Kasrah → original yaa': **بِعْتُ** (from بَيَعَ)

### In the Present Tense (Active Voice)

The 'ayn undergoes **naql** (vowel transfer):

| Original | After naql | After qalb | Result |
|----------|-----------|------------|--------|
| يَقْوُلُ | يَقُوْلُ | — | يَقُولُ |
| يَبْيِعُ | يَبِيْعُ | — | يَبِيعُ |
| يَخْوَفُ | يَخَوْفُ | يَخَافُ | يَخَافُ |

When a jazm particle enters, the 'ayn **drops**: لَمْ يَقُلْ، لَمْ يَبِعْ

### Active & Passive Participles

- Active participle: the 'ayn flips to hamza — قَاوِلٌ → **قَائِلٌ**، بَايِعٌ → **بَائِعٌ**
- Passive participle: naql + deletion — مَقْوُولٌ → **مَقُولٌ**، مَبْيُوعٌ → **مَبِيعٌ**
- Augmented participles: مُجْوِبٌ → **مُجِيبٌ** (naql + qalb)

### Equality of Participles in ifti'aal/infi'aal
In افتعال and انفعال patterns, active and passive participles become identical:
- **مُخْتَارٌ** = both "one who chooses" and "chosen"`,
      rules: [
        {
          arabic: 'الأجوف يعتل بالنقل والقلب في المضارع، وبالحذف مع الضمير المتحرك في الماضي',
          english:
            'The hollow verb undergoes transfer (naql) and flipping (qalb) in the present, and deletion with voweled pronouns in the past tense.',
          examples: [
            { arabic: 'قُلْتُ (حذف العين)', translation: 'I said (\'ayn deleted, dammah indicates waaw)' },
            { arabic: 'يَقُولُ (نقل)', translation: 'he says (vowel transferred from \'ayn to faa\')' },
            { arabic: 'قَائِلٌ (قلب العين إلى همزة)', translation: 'one who says (\'ayn flipped to hamza)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Hollow Verb I\'lal Summary',
          titleAr: 'ملخص اعتلال الأجوف',
          headers: ['Form', 'I\'lal Type', 'Waawi Example', 'Yaa\'i Example'],
          rows: [
            ['Past tense', 'Qalb (flipping)', 'قَوَلَ → قَالَ', 'بَيَعَ → بَاعَ'],
            ['Past + pronoun', 'Deletion', 'قُلْتُ', 'بِعْتُ'],
            ['Present active', 'Naql (transfer)', 'يَقُولُ', 'يَبِيعُ'],
            ['Present + jazm', 'Deletion', 'لَمْ يَقُلْ', 'لَمْ يَبِعْ'],
            ['Active participle', 'Qalb to hamza', 'قَائِلٌ', 'بَائِعٌ'],
            ['Passive participle', 'Naql + deletion', 'مَقُولٌ', 'مَبِيعٌ'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 3, Baab 3, Fasl 2',
    },
    {
      difficulty: 'advanced',
      summary:
        "Hollow verbs in Forms II-X show the full range of i'laal behavior: blocked by shaddah in Forms II/V, buffered by alif in III/VI, and full naql+qalb in IV/VII/VIII/X. Passive participle ambiguity in ifti'aal.",
      body: `## Hollow Verbs in Augmented Forms (الأجوف في الأبواب المزيدة)

### Forms That Block I'laal

**Forms II and V** — The shaddah on 'ayn prevents naql:
- II: قَوَّلَ (qawwala) → no change, waaw stays as-is
- V: تَقَوَّلَ (taqawwala) → no change

**Forms III and VI** — The long alif creates a buffer:
- III: قَاوَلَ (qaawala) → waaw buffered by preceding alif
- VI: تَقَاوَلَ (taqaawala) → same buffering effect

### Forms With Full I'laal

**Forms IV, VII, VIII, X** — Naql and qalb operate freely:

| Form | Past | Present | Pattern |
|------|------|---------|---------|
| IV أَفْعَلَ | أَقَالَ | يُقِيلُ | Full naql + qalb |
| VII اِنْفَعَلَ | اِنْقَادَ | يَنْقَادُ | Full naql + qalb |
| VIII اِفْتَعَلَ | اِخْتَارَ | يَخْتَارُ | Full naql + qalb |
| X اِسْتَفْعَلَ | اِسْتَقَالَ | يَسْتَقِيلُ | Full naql + qalb |

### Passive Participle Ambiguity

In Forms VII and VIII, the active and passive participles of hollow verbs become **identical**:
- مُنْقَادٌ = "one who is led" AND "one who leads"
- مُخْتَارٌ = "chosen" AND "one who chooses"

This is because both participles undergo the same naql + qalb, erasing the vowel distinction.

### Interactive Comparison

Explore hollow verb behavior across all forms:`,
      interactiveWidget: 'ilaal-transformer',
      widgetConfig: { presetVerbType: 'ajwaf-waawi', presetRoot: 'قول', compact: true },
      sourceRef: 'Al-Kubra fi at-Tasreef, Maqsid 3, Baab 3, Fasl 2',
    },
  ],
  relatedTopicIds: ['cl-assimilated-verb', 'cl-defective-verb', 'cl-doubly-weak-verb'],
  tags: ['seven-categories', 'weak', 'hollow', 'ajwaf', 'ilal'],
};

// ============================================================================
// Topic 19: The Defective Verb (an-Naaqis)
// ============================================================================

export const clDefectiveVerb: SarfTopic = {
  id: 'cl-defective-verb',
  titleAr: 'الناقص',
  titleEn: 'The Defective Verb',
  transliteration: 'an-Naaqis',
  categoryId: 'cl-seven-categories',
  subcategoryId: 'cl-weak-verbs',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'The defective verb has a weak letter (waaw or yaa\') as its last root letter. The final letter undergoes flipping and deletion in conjugation.',
      body: `## The Defective Verb (الناقص / an-Naaqis)

The defective verb has a **weak letter as its last root letter** (لام الكلمة). It is called "defective" because it is "incomplete" — its final letter undergoes changes that can result in deletion.

### Two Types

| # | Type | Arabic | Example |
|---|------|--------|---------|
| 1 | **Waawi** (ناقص واوي) | ناقص واويّ | دَعَا يَدْعُو (he called / he calls) |
| 2 | **Yaa'i** (ناقص يائي) | ناقص يائيّ | رَمَى يَرْمِي (he threw / he throws) |

The defective verb's final root letter frequently changes to an alif in the past tense (via qalb/flipping), and is often deleted in certain conjugated forms.`,
      rules: [
        {
          arabic: 'الناقص: ما كانت لامه حرف علة — واوي أو يائي',
          english:
            'The defective verb has a weak letter as its final radical — either waaw (waawi) or yaa\' (yaa\'i).',
          examples: [
            { arabic: 'دَعَا يَدْعُو', translation: 'he called / he calls (waawi)' },
            { arabic: 'رَمَى يَرْمِي', translation: 'he threw / he throws (yaa\'i)' },
            { arabic: 'سَعَى يَسْعَى', translation: 'he strove / he strives (yaa\'i)' },
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Maqsid 3, Baab 3, Fasl 3',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta covers defective verb i\'lal across five verb doors: qalb in the past/present, taskeen in yaa\'i/waawi presents, deletion in plurals, and changes in active/passive participles.',
      body: `## I'lal in the Defective Verb (اعتلال الناقص)

Al-Wusta covers five verb doors for the defective: سَعَى يَسْعَى، دَعَا يَدْعُو، رَمَى يَرْمِي، رَضِيَ يَرْضَى، سَرُوَ يَسْرُو.

### In the Past Tense

The laam undergoes **qalb** (flipping to alif):
- دَعَوَ → دَعَا، رَمَيَ → رَمَى، سَعَيَ → سَعَى

With the masculine plural pronoun, **deletion** occurs:
- دَعَوْا (they called), رَمَوْا (they threw), سَعَوْا (they strove)

### In the Present Tense

**Pattern سَعَى/رَضِيَ** — qalb (flipping): يَسْعَيُ → يَسْعَى، يَرْضَيُ → يَرْضَى
**Pattern رَمَى/دَعَا** — taskeen (quiescence): يَرْمِيُ → يَرْمِي، يَدْعُوُ → يَدْعُو

Plurals undergo deletion:
- يَرْمُونَ (origin: يَرْمِيُونَ) — laam silenced → damma on 'ayn → laam deleted
- يَدْعُونَ (origin: يَدْعُوُونَ) — laam silenced → laam deleted

### Active Participle
Undergoes qalb then deletion with tanween:
- دَاعِوٌ → دَاعِيٌ → دَاعٍ (daa'in)
- Feminine forms keep the laam: دَاعِيَةٌ (daa'iya)

### Passive Participle
- Waawi: مَدْعُوْوٌ → مَدْعُوٌّ (idghaam)
- Yaa'i: مَرْمُوْيٌ → مَرْمِيٌّ (qalb then idghaam)

### Noun of Place and Time
Undergoes qalb on pattern مَفْعَل: مَدْعًى، مَرْمًى، مَسْعًى`,
      rules: [
        {
          arabic: 'الناقص يعتل بالقلب والحذف في الماضي والمضارع، وبالحذف مع التنوين في اسم الفاعل',
          english:
            'The defective verb undergoes qalb and deletion in the past/present, and deletion with tanween in the active participle.',
          examples: [
            { arabic: 'دَعَوَ → دَعَا', translation: 'past: laam flipped to alif' },
            { arabic: 'يَرْمِيُ → يَرْمِي', translation: 'present: laam made quiescent (taskeen)' },
            { arabic: 'دَاعِيٌ → دَاعٍ', translation: 'active participle: laam deleted with tanween' },
          ],
        },
      ],
      tables: [
        {
          title: 'Defective Verb I\'lal Summary',
          titleAr: 'ملخص اعتلال الناقص',
          headers: ['Form', 'I\'lal Type', 'Example'],
          rows: [
            ['Past (3rd masc. sg.)', 'Qalb', 'دَعَوَ → دَعَا'],
            ['Past (3rd masc. pl.)', 'Deletion', 'دَعَوْا'],
            ['Present (sa\'aa pattern)', 'Qalb', 'يَسْعَيُ → يَسْعَى'],
            ['Present (ramaa pattern)', 'Taskeen', 'يَرْمِيُ → يَرْمِي'],
            ['Present (masc. plural)', 'Deletion', 'يَرْمِيُونَ → يَرْمُونَ'],
            ['Active participle', 'Qalb + deletion', 'دَاعِوٌ → دَاعٍ'],
            ['Passive participle (waawi)', 'Idghaam', 'مَدْعُوْوٌ → مَدْعُوٌّ'],
            ['Passive participle (yaa\'i)', 'Qalb + idghaam', 'مَرْمُوْيٌ → مَرْمِيٌّ'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 3, Baab 3, Fasl 3',
    },
    {
      difficulty: 'advanced',
      summary:
        "Defective verbs in augmented forms show consistent qalb on the laam across all patterns. Five doors (vowel patterns) extend to Forms II-X with predictable i'laal behavior.",
      body: `## Defective Verbs in Augmented Forms (الناقص في الأبواب المزيدة)

### Consistent Qalb Across Forms

Unlike hollow verbs (where some forms block i'laal), defective verbs undergo **qalb on the laam in all augmented forms**:

| Form | Waawi Example | Yaa'i Example |
|------|--------------|---------------|
| II فَعَّلَ | سَمَّى (he named) | رَبَّى (he raised) |
| III فَاعَلَ | نَادَى (he called) | لاقَى (he encountered) |
| IV أَفْعَلَ | أَعْطَى (he gave) | أَبْدَى (he showed) |
| V تَفَعَّلَ | تَسَمَّى (he was named) | تَرَبَّى (he was raised) |
| VI تَفَاعَلَ | تَنَادَى (they called each other) | تَلاقَى (they met) |
| VIII اِفْتَعَلَ | اِدَّعَى (he claimed) | اِرْتَمَى (he threw himself) |
| X اِسْتَفْعَلَ | اِسْتَدْعَى (he summoned) | اِسْتَرْمَى (he asked to throw) |

### Present Tense Patterns

In the present tense, defective verbs maintain their taskeen and deletion:
- يُسَمِّي (he names) — yaa' quiescent
- يُنَادِي (he calls) — yaa' quiescent
- يُسَمُّونَ (they name) — yaa' deleted before waaw of the plural

### Participles in Augmented Forms

Active participles: مُسَمٍّ (one who names), مُنَادٍ (one who calls) — laam deleted with tanween
Passive participles: مُسَمًّى (named), مُنَادًى (called) — laam flips to alif

### Interactive Comparison

Explore defective verb behavior across all forms:`,
      interactiveWidget: 'ilaal-transformer',
      widgetConfig: { presetVerbType: 'naaqis-waawi', presetRoot: 'دعو', compact: true },
      sourceRef: 'Al-Kubra fi at-Tasreef, Maqsid 3, Baab 3, Fasl 3',
    },
  ],
  relatedTopicIds: ['cl-hollow-verb', 'cl-doubly-weak-verb', 'cl-assimilated-verb'],
  tags: ['seven-categories', 'weak', 'defective', 'naaqis', 'ilal'],
};

// ============================================================================
// Topic 20: The Doubly-Weak Verb (al-Lafeef)
// ============================================================================

export const clDoublyWeakVerb: SarfTopic = {
  id: 'cl-doubly-weak-verb',
  titleAr: 'اللفيف',
  titleEn: 'The Doubly-Weak Verb',
  transliteration: 'al-Lafeef',
  categoryId: 'cl-seven-categories',
  subcategoryId: 'cl-weak-verbs',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'The doubly-weak verb (lafeef) has two weak letters in its root. It comes in two types: joined (maqroon) where the weak letters are adjacent, and separated (mafrooq) where they are apart.',
      body: `## The Doubly-Weak Verb (اللفيف / al-Lafeef)

The lafeef has **two weak letters** among its root letters. It is the most complex category because it combines the changes of two weak verb types.

### Two Types

| # | Type | Arabic | Example |
|---|------|--------|---------|
| 1 | **Joined** (لفيف مقرون) | لفيف مقرون | طَوَى (he folded) — the two weak letters are adjacent ('ayn and laam) |
| 2 | **Separated** (لفيف مفروق) | لفيف مفروق | وَقَى (he protected) — the two weak letters are separated (faa' and laam) |

In the joined type, the middle and final root letters are both weak. In the separated type, the first and final root letters are both weak.`,
      rules: [
        {
          arabic: 'اللفيف: ما كان فيه حرفان من حروف العلة — مقرون أو مفروق',
          english:
            'The lafeef has two weak letters in its root — joined (adjacent) or separated (by a strong letter).',
          examples: [
            { arabic: 'طَوَى (لفيف مقرون)', translation: 'he folded (joined: waaw + yaa\' adjacent)' },
            { arabic: 'وَقَى (لفيف مفروق)', translation: 'he protected (separated: waaw + yaa\' apart)' },
            { arabic: 'رَوَى (لفيف مقرون)', translation: 'he narrated (joined)' },
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Maqsid 3, Baab 3, Fasl 4',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta explains that the lafeef maqroon follows the defective verb\'s i\'lal rules for its laam (the \'ayn is not changed), while the lafeef mafrooq follows both the assimilated verb\'s rules (for its faa\') and the defective verb\'s rules (for its laam).',
      body: `## I'lal in the Doubly-Weak Verb (اعتلال اللفيف)

### Lafeef Maqroon (Joined)

The laam undergoes i'lal following the **defective verb** (الناقص) rules. The 'ayn does **NOT** undergo i'lal.

Verb doors:
- رَوَى يَرْوِي (rawaa yarwee) — "he narrated" (from 2 patterns)
- قَوِيَ يَقْوَى (qawiya yaqwaa) — "he became strong"

Example: رَوَى يَرْوِي — the laam changes like a defective verb, but the waaw ('ayn) stays unchanged.

### Lafeef Mafrooq (Separated)

The faa' undergoes i'lal following the **assimilated verb** (المثال) rules, and the laam undergoes i'lal following the **defective verb** (الناقص) rules.

Verb doors:
- وَقَى يَقِي (waqaa yaqee) — "he protected"
- وَلِيَ يَلِي (waliya yalee) — "he was in charge of"

Example: وَقَى يَقِي — the waaw (faa') is deleted like an assimilated verb, and the yaa' (laam) changes like a defective verb.

### Key Principle

The lafeef simply **combines** the i'lal rules of its component categories:
- **Maqroon** = defective verb rules only (for the laam)
- **Mafrooq** = assimilated verb rules (for the faa') + defective verb rules (for the laam)`,
      rules: [
        {
          arabic: 'المقرون يعتل لامه كالناقص، والمفروق يعتل فاؤه كالمثال ولامه كالناقص',
          english:
            'The joined type follows defective verb rules for its laam. The separated type follows assimilated rules for its faa\' and defective rules for its laam.',
          examples: [
            { arabic: 'رَوَى يَرْوِي', translation: 'maqroon: laam changes like defective verb' },
            { arabic: 'وَقَى يَقِي', translation: 'mafrooq: faa\' deleted (assimilated) + laam changed (defective)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Lafeef I\'lal Rules',
          titleAr: 'قواعد اعتلال اللفيف',
          headers: ['Type', 'Faa\' (1st letter)', 'Laam (last letter)', 'Example'],
          rows: [
            ['Maqroon (joined)', 'No i\'lal', 'Follows defective verb', 'رَوَى يَرْوِي (rawaa yarwee)'],
            ['Mafrooq (separated)', 'Follows assimilated verb', 'Follows defective verb', 'وَقَى يَقِي (waqaa yaqee)'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 3, Baab 3, Fasl 4',
    },
    {
      difficulty: 'advanced',
      summary:
        "Lafif verbs in augmented forms combine rules from their component categories. Maqroon follows defective rules for the laam. Mafrooq follows both assimilated (faa') and defective (laam) rules.",
      body: `## Lafif Verbs in Augmented Forms (اللفيف في الأبواب المزيدة)

### Lafif Maqroon (Joined) in Augmented Forms

Since maqroon = hollow + defective, in augmented forms:
- The 'ayn (middle weak letter) follows **hollow verb rules** for that form
- The laam (final weak letter) follows **defective verb rules**

| Form | Example | 'Ayn Behavior | Laam Behavior |
|------|---------|---------------|---------------|
| II فَعَّلَ | قَوَّى (he strengthened) | Shaddah blocks naql | Qalb to alif |
| IV أَفْعَلَ | أَحْيَا (he revived) | Naql + qalb | Qalb to alif |
| VIII اِفْتَعَلَ | اِحْتَوَى (he contained) | Naql + qalb | Qalb to alif |
| X اِسْتَفْعَلَ | اِسْتَحْيَا (he was shy) | Naql + qalb | Qalb to alif |

### Lafif Mafrooq (Separated) in Augmented Forms

Since mafrooq = assimilated + defective, in augmented forms:
- The faa' (first weak letter) follows **assimilated verb rules**
- The laam (final weak letter) follows **defective verb rules**

| Form | Example | Faa' Behavior | Laam Behavior |
|------|---------|---------------|---------------|
| II فَعَّلَ | وَلَّى (he appointed) | Waaw stays | Qalb to alif |
| IV أَفْعَلَ | أَوْفَى (he fulfilled) | Waaw stays | Qalb to alif |
| VIII اِفْتَعَلَ | اِتَّقَى (he was pious) | Waaw → taa' + idghaam | Qalb to alif |
| X اِسْتَفْعَلَ | اِسْتَوْفَى (he collected fully) | Waaw stays | Qalb to alif |

### Double I'laal

The lafif is unique in that **two separate i'laal processes** can occur simultaneously in the same word. Understanding which rules apply to which position is the key challenge.

### Interactive Comparison

Explore lafif behavior across forms:`,
      interactiveWidget: 'ilaal-transformer',
      widgetConfig: { presetVerbType: 'lafif-maqroon', presetRoot: 'طوي', compact: true },
      sourceRef: 'Al-Kubra fi at-Tasreef, Maqsid 3, Baab 3, Fasl 4',
    },
  ],
  relatedTopicIds: ['cl-assimilated-verb', 'cl-defective-verb', 'cl-hollow-verb'],
  tags: ['seven-categories', 'weak', 'doubly-weak', 'lafeef'],
};

// ============================================================================
// Topic 21: The Hamzated Verb (al-Mahmooz)
// ============================================================================

export const clHamzatedVerb: SarfTopic = {
  id: 'cl-hamzated-verb',
  titleAr: 'المهموز',
  titleEn: 'The Hamzated Verb',
  transliteration: 'al-Mahmooz',
  categoryId: 'cl-seven-categories',
  subcategoryId: 'cl-hamzated',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'The hamzated verb has a hamzah (ء) as one of its root letters. It comes in three types depending on the position of the hamzah: first, middle, or last letter.',
      body: `## The Hamzated Verb (المهموز / al-Mahmooz)

The hamzated verb has a **hamzah (ء)** as one of its root letters. The hamzah undergoes lightening (takhfeef) in certain forms.

### Three Types

| # | Type | Arabic | Example |
|---|------|--------|---------|
| 1 | **Hamzah as first letter** (مهموز الفاء) | مهموز الفاء | أَخَذَ (he took) |
| 2 | **Hamzah as middle letter** (مهموز العين) | مهموز العين | سَأَلَ (he asked) |
| 3 | **Hamzah as last letter** (مهموز اللام) | مهموز اللام | قَرَأَ (he read/recited) |

The hamzated verb is generally the most straightforward of the non-sound categories, as its changes mostly involve easing the pronunciation of the hamzah rather than fundamental morphological changes.`,
      rules: [
        {
          arabic: 'المهموز: ما كانت إحدى حروفه الأصلية همزة',
          english:
            'The hamzated verb has a hamzah as one of its root letters — positioned as faa\', \'ayn, or laam.',
          examples: [
            { arabic: 'أَخَذَ (مهموز الفاء)', translation: 'he took (hamzah as 1st letter)' },
            { arabic: 'سَأَلَ (مهموز العين)', translation: 'he asked (hamzah as 2nd letter)' },
            { arabic: 'قَرَأَ (مهموز اللام)', translation: 'he read (hamzah as 3rd letter)' },
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Maqsid 3, Baab 4',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta details hamza lightening (takhfeef) rules: in the past tense of if\'aal, the first-person present tense, the imperative, and irregular deletions in common verbs like خُذْ and كُلْ.',
      body: `## I'lal in the Hamzated Verb (اعتلال المهموز)

Al-Wusta covers i'lal through **takhfeef** (lightening/easing the hamza) in the past, present, and imperative.

### In the Past Tense
From the pattern **if'aal** (إفعال):
- أَأْمَنَ → آمَنَ (aamana — he believed): the second hamza is lightened

### In the Present Tense
Only the **first-person singular** form undergoes lightening:
- أَأْخُذُ → آخُذُ (aakhdhu — I take): the second hamza is lightened

### In the Imperative
- The hamza is lightened at the beginning: اِئْذَنْ → ائْذَنْ (i'dhan — give permission)
- **Irregular deletion** in common verbs (due to frequent usage):
  - خُذْ (take!) — hamza entirely deleted from أُخُذْ
  - كُلْ (eat!) — hamza entirely deleted from أُكُلْ
  - سَلْ (ask!) — used without hamza at the beginning
  - مُرْ (command!) — used without hamza at the beginning

### The Verb رَأَى (to see)
This verb undergoes special i'lal through naql and deletion (contrary to standard rules, due to frequent usage):
- يَرْأَيُ → يَرَى (yaraa — he sees)
- The imperative: رَهْ (rah!) — with haa' as-sakt in pausing

### Hamza Replacement
The hamza may be replaced by a weak letter:
- Matching its own vowel: أَئِمَّةٌ → أَيِمَّةٌ (leaders)
- Matching the preceding vowel: أُؤْمِلَ → أُوْمِلَ
- Matching the preceding weak letter: خَطِيئَةٌ → خَطِيَّةٌ (sin)`,
      rules: [
        {
          arabic: 'المهموز يعتل بالتخفيف في الماضي والمضارع والأمر، وبالحذف في خُذْ وكُلْ',
          english:
            'The hamzated verb undergoes lightening (takhfeef) in past/present/imperative, and irregular deletion in common verbs like خُذْ and كُلْ.',
          examples: [
            { arabic: 'أَأْمَنَ → آمَنَ', translation: 'past: hamza lightened (if\'aal pattern)' },
            { arabic: 'أَأْخُذُ → آخُذُ', translation: 'present 1st person: hamza lightened' },
            { arabic: 'خُذْ (أصله: اُؤْخُذْ)', translation: 'imperative: hamza irregularly deleted' },
          ],
        },
      ],
      tables: [
        {
          title: 'Hamzated Verb I\'lal Rules',
          titleAr: 'قواعد اعتلال المهموز',
          headers: ['Form', 'I\'lal Type', 'Example'],
          rows: [
            ['Past (if\'aal)', 'Takhfeef (lightening)', 'أَأْمَنَ → آمَنَ'],
            ['Present (1st person)', 'Takhfeef', 'أَأْخُذُ → آخُذُ'],
            ['Imperative (regular)', 'Takhfeef', 'اِئْذَنْ → ائْذَنْ'],
            ['Imperative (خُذْ، كُلْ)', 'Deletion (irregular)', 'أُخُذْ → خُذْ'],
            ['Imperative (سَلْ، مُرْ)', 'Deletion (at beginning only)', 'اِسْأَلْ → سَلْ'],
            ['رَأَى (special)', 'Naql + deletion', 'يَرْأَيُ → يَرَى'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 3, Baab 4',
    },
    {
      difficulty: 'advanced',
      summary:
        "Hamzated verbs in Forms II-X undergo takhfeef (lightening) when two hamzas would meet. The three positions (faa', 'ayn, laam) each produce different patterns across the augmented forms.",
      body: `## Hamzated Verbs in Augmented Forms (المهموز في الأبواب المزيدة)

### Hamzah as Faa' (مهموز الفاء) in Augmented Forms

| Form | Example | Takhfeef? |
|------|---------|-----------|
| II فَعَّلَ | أَثَّرَ (he affected) | No (single hamza) |
| IV أَفْعَلَ | آمَنَ = أَأْمَنَ (he believed) | Yes — two hamzas merge to madd |
| V تَفَعَّلَ | تَأَثَّرَ (he was affected) | No |
| VIII اِفْتَعَلَ | اِئْتَمَنَ (he entrusted) | Initial hamza lightened |

### Hamzah as 'Ayn (مهموز العين) in Augmented Forms

| Form | Example | Notes |
|------|---------|-------|
| II فَعَّلَ | سَأَّلَ (he interrogated) | Hamza with shaddah |
| IV أَفْعَلَ | أَسْأَلَ → not commonly used | Rare |
| VIII اِفْتَعَلَ | اِتَّأَدَ (he was cautious) | Standard |

### Hamzah as Laam (مهموز اللام) in Augmented Forms

| Form | Example | Notes |
|------|---------|-------|
| II فَعَّلَ | قَرَّأَ (he made someone read) | Standard |
| IV أَفْعَلَ | أَقْرَأَ (he made someone recite) | Standard |
| V تَفَعَّلَ | تَنَبَّأَ (he prophesied) | Standard |
| VIII اِفْتَعَلَ | اِقْتَرَأَ (not commonly used) | Rare |

### Key Pattern: Form IV Two-Hamza Resolution

The most distinctive i'laal in hamzated augmented forms is **Form IV with hamzah-faa' verbs**:
- أَأْمَنَ → آمَنَ (the two hamzas merge into a madd alif)
- This is the same takhfeef seen in Form I first-person: أَأْخُذُ → آخُذُ

### Interactive Comparison

Explore hamzated verb conjugations:`,
      interactiveWidget: 'ilaal-transformer',
      widgetConfig: { presetVerbType: 'mahmooz-faa', presetRoot: 'أخذ', compact: true },
      sourceRef: 'Al-Kubra fi at-Tasreef, Maqsid 3, Baab 4',
    },
  ],
  relatedTopicIds: ['cl-sound-verb', 'cl-doubled-verb'],
  tags: ['seven-categories', 'hamzated', 'takhfeef', 'lightening'],
};
