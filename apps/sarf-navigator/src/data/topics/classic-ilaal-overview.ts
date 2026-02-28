import type { SarfTopic } from '../types';

export const clIlaalOverview: SarfTopic = {
  id: 'cl-ilaal-overview',
  titleAr: 'نظرة عامة على الإعلال',
  titleEn: "I'laal Overview",
  transliteration: "al-I'laal",
  categoryId: 'cl-seven-categories',
  subcategoryId: 'cl-ilaal-reference',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        "I'laal (الإعلال) refers to morphophonemic changes that occur to weak letters and hamzah in Arabic verb conjugation. Understanding these rules is key to mastering Arabic morphology.",
      body: `## What is I'laal? (ما هو الإعلال؟)

I'laal is the collective term for **changes that occur to weak letters** (حروف العلة: و، ي، ا) and **hamzah** (ء) during verb conjugation and word derivation.

These changes exist to make pronunciation easier — Arabic avoids certain combinations of sounds, and i'laal rules systematically resolve them.

### The Five Types of I'laal

| # | Type | Arabic | Meaning | Example |
|---|------|--------|---------|---------|
| 1 | **Qalb** | القلب | Flipping | وَ → ا in قَوَلَ → قَالَ |
| 2 | **Naql** | النقل | Transfer | Vowel moves: يَقْوُلُ → يَقُولُ |
| 3 | **Hadhf** | الحذف | Deletion | Letter removed: قُوَلْتُ → قُلْتُ |
| 4 | **Taskeen** | التسكين | Quiescence | Vowel removed: يَرْمِيُ → يَرْمِي |
| 5 | **Idghaam** | الإدغام | Assimilation | Letters merge: رَدَدَ → رَدَّ |

Additionally, hamzated verbs undergo:
- **Takhfeef** (التخفيف) — lightening the hamza
- **Ibdaal** (الإبدال) — substituting one letter for another
- **Ta'weed** (التعويض) — compensating for a deleted letter

### When Does I'laal Occur?

I'laal occurs when a weak letter or hamzah appears in a position that would create an awkward pronunciation. The specific change depends on:
1. **Position** of the weak letter (faa', 'ayn, or laam of the root)
2. **Surrounding vowels** (what vowels are on adjacent letters)
3. **Grammatical form** (past, present, imperative, participle, etc.)
4. **Verb form** (bare trilateral I, or augmented II-X)`,
      rules: [
        {
          arabic: 'الإعلال: تغييرات تطرأ على حروف العلة والهمزة لتسهيل النطق',
          english:
            "I'laal refers to changes applied to weak letters and hamzah to facilitate pronunciation. The main types are qalb (flipping), naql (transfer), hadhf (deletion), taskeen (quiescence), and idghaam (assimilation).",
          examples: [
            { arabic: 'قَوَلَ → قَالَ (قلب)', translation: 'qalb: waaw flipped to alif' },
            { arabic: 'يَقْوُلُ → يَقُولُ (نقل)', translation: 'naql: vowel transferred' },
            { arabic: 'قُوَلْتُ → قُلْتُ (حذف)', translation: 'hadhf: weak letter deleted' },
          ],
        },
      ],
      sourceRef: 'As-Sughra & Al-Wusta fi at-Tasreef, Maqsid 3',
    },
    {
      difficulty: 'intermediate',
      summary:
        "Each type of i'laal has specific conditions and exceptions. Understanding when each rule applies — and when it doesn't — is essential for accurate conjugation.",
      body: `## Conditions for Each Type of I'laal

### 1. Qalb (القلب) — Flipping

Qalb occurs when a weak letter **changes to alif**. Conditions:
- The weak letter must have a fathah before it (or carry a fathah)
- The letter before it must be voweled
- Most commonly: waaw/yaa' → alif in the past tense

**Hollow verb**: قَوَلَ → قَالَ (waaw preceded by fathah → alif)
**Defective verb**: دَعَوَ → دَعَا (waaw preceded by fathah → alif)

### 2. Naql (النقل) — Vowel Transfer

Naql occurs when a **vowel moves from a weak letter to the preceding consonant**:
- The preceding consonant must be originally unvoweled (sakin)
- The weak letter's vowel "transfers" to the consonant before it
- Common in present tense of hollow verbs

**Example**: يَقْوُلُ → يَقُوْلُ → يَقُولُ (dammah transfers from waaw to qaf)

### 3. Hadhf (الحذف) — Deletion

Hadhf occurs when a weak letter is **completely removed**:
- When two vowels meet (التقاء الساكنين)
- When attached to a voweled pronoun in hollow verbs
- In active participle of defective verbs with tanween

**Example**: قُوْلْتُ → قُلْتُ (waaw deleted when two sakins meet)

### 4. Taskeen (التسكين) — Quiescence

Taskeen removes the vowel from a weak letter, making it sakin:
- Occurs in present tense of defective verbs (certain patterns)
- The weak letter's vowel is dropped

**Example**: يَرْمِيُ → يَرْمِي (dammah dropped from yaa')

### 5. Idghaam (الإدغام) — Assimilation

Idghaam merges two identical or similar letters:
- Mandatory in doubled verbs when the second letter is unvoweled
- Prohibited when attached to a voweled pronoun

**Example**: رَدَدَ → رَدَّ (two dals merge into one with shaddah)

### Key Principle: Order of Operations

When multiple i'laal rules could apply, they follow a specific order:
1. Naql (transfer) happens first
2. Then qalb (flipping) if conditions are met
3. Then hadhf (deletion) if two sakins result`,
      rules: [
        {
          arabic: 'القلب يشترط تحرك ما قبل حرف العلة بالفتح، والنقل يشترط سكون ما قبله',
          english:
            "Qalb requires the letter before the weak letter to have fathah. Naql requires the preceding letter to be originally sakin (unvoweled). These conditions determine which rule applies.",
          examples: [
            { arabic: 'قَوَلَ → قَالَ', translation: 'qalb: fathah before waaw → waaw becomes alif' },
            { arabic: 'يَقْوُلُ → يَقُولُ', translation: 'naql: qaf was sakin → dammah transferred to it' },
            { arabic: 'رَدَدَ → رَدَّ', translation: 'idghaam: second dal sakin → merges with first' },
          ],
        },
      ],
      tables: [
        {
          title: "I'laal Types Summary",
          titleAr: 'ملخص أنواع الإعلال',
          headers: ['Type', 'Arabic', 'Condition', 'Result'],
          rows: [
            ['Qalb', 'القلب', 'Fathah before weak letter', 'Weak letter → alif'],
            ['Naql', 'النقل', 'Preceding letter sakin', 'Vowel transfers left'],
            ['Hadhf', 'الحذف', 'Two sakins meet', 'Weak letter removed'],
            ['Taskeen', 'التسكين', 'Heavy vowel on final weak', 'Vowel dropped'],
            ['Idghaam', 'الإدغام', 'Two identical letters', 'Letters merge (shaddah)'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 3, Introduction',
    },
    {
      difficulty: 'advanced',
      summary:
        "Explore i'laal interactively: enter any Arabic root to see the sound (baseline) form compared against the actual conjugation with i'laal applied. See exactly which slots change and why.",
      body: `## Interactive I'laal Explorer

Use the transformer below to enter any trilateral root and see:
- **Sound pattern**: How the verb *would* conjugate if it were a sound verb
- **Actual form**: How it *actually* conjugates with i'laal rules applied
- **Differences highlighted**: Every slot where i'laal has caused a change

### How to Use

1. Enter a 3-letter Arabic root (e.g., ق و ل)
2. The verb type is auto-detected
3. Select a form (I-X) to see the comparison
4. Click any highlighted row to see the step-by-step transformation

### Understanding the Comparison

When a weak letter appears in a root, the conjugation changes from what a sound verb pattern would produce. By comparing the two side-by-side, you can see exactly where and how i'laal operates.

For example, with root **ق و ل** (hollow waawi):
- Sound pattern for هُوَ past: **قَوَلَ** (fa'ala pattern with waaw)
- Actual form: **قَالَ** (waaw flipped to alif via qalb)`,
      interactiveWidget: 'ilaal-transformer',
      widgetConfig: { compact: false },
      sourceRef: 'Interactive tool based on @arabiyya/sarf conjugation data',
    },
  ],
  relatedTopicIds: ['cl-hollow-verb', 'cl-defective-verb', 'cl-assimilated-verb', 'cl-doubled-verb', 'cl-hamzated-verb'],
  tags: ['ilaal', 'overview', 'qalb', 'naql', 'hadhf', 'taskeen', 'idghaam', 'reference'],
};
