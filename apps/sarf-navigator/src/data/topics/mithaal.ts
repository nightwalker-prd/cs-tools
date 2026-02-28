import type { SarfTopic } from '../types';

export const mithaalWaawi: SarfTopic = {
  id: 'mithaal-waawi',
  titleAr: 'المثال الواوي',
  titleEn: 'Waawi Mithaal',
  transliteration: 'al-Mithaal al-Waawi',
  categoryId: 'weak-verbs',
  subcategoryId: 'mithaal',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'A mithaal verb (المثال) has a weak letter as its first root letter. The waawi mithaal (المثال الواوي) has و as the first root letter. The و drops in the present tense of most abwab.',
      body: `## المثال الواوي (Waawi Mithaal)

A **mithaal** verb has a weak letter (و or ي) as its **first root letter** (فاء الفعل).

The **waawi mithaal** has **و** as the first root letter.

### Key Feature
The و **drops** in the present tense for most verb categories:
- وَعَدَ → يَعِدُ (not يَوْعِدُ)
- وَصَلَ → يَصِلُ (not يَوْصِلُ)

### Common Waawi Mithaal Verbs
- وَجَدَ يَجِدُ (to find)
- وَضَعَ يَضَعُ (to place)
- وَقَعَ يَقَعُ (to fall/occur)
- وَلَدَ يَلِدُ (to give birth)`,
      rules: [
        {
          arabic: 'المثال الواوي تُحذف واوه في المضارع إذا كان من باب ضَرَبَ أو باب فَتَحَ',
          english: 'The و of waawi mithaal drops in the present tense when the verb follows baab daraba or baab fataha.',
          examples: [
            { arabic: 'وَعَدَ يَعِدُ', translation: 'to promise (و dropped in present)' },
            { arabic: 'وَضَعَ يَضَعُ', translation: 'to place (و dropped in present)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Common Waawi Mithaal Verbs',
          titleAr: 'أفعال شائعة من المثال الواوي',
          headers: ['Past', 'Present', 'Command', 'Meaning'],
          rows: [
            ['وَعَدَ', 'يَعِدُ', 'عِدْ', 'to promise'],
            ['وَصَلَ', 'يَصِلُ', 'صِلْ', 'to arrive/connect'],
            ['وَجَدَ', 'يَجِدُ', 'جِدْ', 'to find'],
            ['وَضَعَ', 'يَضَعُ', 'ضَعْ', 'to place'],
            ['وَقَعَ', 'يَقَعُ', 'قَعْ', 'to fall/occur'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 137-152',
    },
    {
      difficulty: 'intermediate',
      summary: 'The و drops in the present tense and command form in باب ضَرَبَ and باب فَتَحَ. In باب كَرُمَ, the و stays. The command form has no hamzatul-wasl since the second letter already has a vowel after deletion.',
      body: `## Conjugation Rules for Waawi Mithaal

### When و Drops
The و drops in the **present tense** and **command** when:
1. The verb is in **باب ضَرَبَ** (a-i): وَعَدَ يَعِدُ
2. The verb is in **باب فَتَحَ** (a-a) with throat letter: وَضَعَ يَضَعُ

### When و Stays
The و **stays** in:
- **باب كَرُمَ**: وَسُمَ يَوْسُمُ (to be handsome)
- **باب نَصَرَ**: وَجُهَ يَوْجُهُ

### Command Form
Because the و drops, the command has no hamzatul-wasl:
- يَعِدُ → عِدْ (not اِعِدْ)
- يَصِلُ → صِلْ (not اِصِلْ)

### Short Conjugation
وَعَدَ - يَعِدُ - عِدْ - لَا تَعِدْ - وُعِدَ - يُوعَدُ - وَاعِدٌ - مَوْعُودٌ - وَعْدًا`,
      rules: [
        {
          arabic: 'أمر المثال الواوي لا يحتاج همزة وصل لأن ما بعد الحذف متحرك',
          english: 'The command of waawi mithaal needs no hamzatul-wasl because the letter after deletion already has a vowel.',
          examples: [
            { arabic: 'عِدْ', translation: 'promise! (from وَعَدَ)' },
            { arabic: 'صِلْ', translation: 'connect! (from وَصَلَ)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Short Conjugation — وَعَدَ',
          titleAr: 'التصريف الصغير - وعد',
          headers: ['Form', 'Arabic', 'English'],
          rows: [
            ['Active Past', 'وَعَدَ', 'he promised'],
            ['Active Present', 'يَعِدُ', 'he promises'],
            ['Command', 'عِدْ', 'promise!'],
            ['Prohibition', 'لَا تَعِدْ', "don't promise!"],
            ['Passive Past', 'وُعِدَ', 'he was promised'],
            ['Passive Present', 'يُوعَدُ', 'he is promised'],
            ['Active Participle', 'وَاعِدٌ', 'promiser'],
            ['Passive Participle', 'مَوْعُودٌ', 'promised'],
            ['Verbal Noun', 'وَعْدًا', 'promise'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 137-152',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study covers the full 14-form conjugation of waawi mithaal verbs, the passive voice where و reappears (وُعِدَ، يُوعَدُ), and exceptional verbs like وَقَى that combine mithaal + naqis patterns.',
      body: `## Advanced Waawi Mithaal

### و in Passive Voice
In the passive, the و **reappears** because the vowel pattern changes:
- وَعَدَ → وُعِدَ (passive past — و stays with damma)
- يَعِدُ → يُوعَدُ (passive present — و returns)

### Full Conjugation Pattern (Active Past)
| Person | Singular | Dual | Plural |
|--------|----------|------|--------|
| 3rd m. | وَعَدَ | وَعَدَا | وَعَدُوا |
| 3rd f. | وَعَدَتْ | وَعَدَتَا | وَعَدْنَ |
| 2nd m. | وَعَدْتَ | وَعَدْتُمَا | وَعَدْتُمْ |
| 2nd f. | وَعَدْتِ | وَعَدْتُمَا | وَعَدْتُنَّ |
| 1st | وَعَدْتُ | وَعَدْنَا | وَعَدْنَا |

### Full Conjugation Pattern (Active Present)
| Person | Singular | Dual | Plural |
|--------|----------|------|--------|
| 3rd m. | يَعِدُ | يَعِدَانِ | يَعِدُونَ |
| 3rd f. | تَعِدُ | تَعِدَانِ | يَعِدْنَ |
| 2nd m. | تَعِدُ | تَعِدَانِ | تَعِدُونَ |
| 2nd f. | تَعِدِينَ | تَعِدَانِ | تَعِدْنَ |
| 1st | أَعِدُ | نَعِدُ | نَعِدُ |

### Exceptional Verbs
- **وَقَى يَقِي**: Mithaal + Naqis (و dropped + ي as final root)
- **وَفَى يَفِي**: Same double-weak pattern`,
      rules: [
        {
          arabic: 'المثال الواوي في المجهول ترجع الواو لأن حركة ما قبلها تتغير',
          english: 'In the passive voice, the و returns because the preceding vowel changes.',
          examples: [
            { arabic: 'وُعِدَ', translation: 'he was promised (و stays in passive)' },
            { arabic: 'يُوعَدُ', translation: 'he is promised (و returns in passive present)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 137-152',
    },
  ],
  relatedTopicIds: ['mithaal-yaai', 'ajwaf-waawi', 'lafif-mafruq'],
  tags: ['mithaal', 'waawi', 'weak verb', 'initial weak'],
};

export const mithaalYaai: SarfTopic = {
  id: 'mithaal-yaai',
  titleAr: 'المثال اليائي',
  titleEn: "Ya'i Mithaal",
  transliteration: "al-Mithaal al-Ya'i",
  categoryId: 'weak-verbs',
  subcategoryId: 'mithaal',
  levels: [
    {
      difficulty: 'beginner',
      summary: "A ya'i mithaal (المثال اليائي) has ي as its first root letter. Unlike waawi mithaal, the ي usually stays in conjugation. These verbs are less common than waawi mithaal.",
      body: `## المثال اليائي (Ya'i Mithaal)

The **ya'i mithaal** has **ي** as the first root letter (فاء الفعل).

### Key Difference from Waawi
Unlike the waawi mithaal, the ي **usually stays** in conjugation:
- يَبِسَ يَيْبَسُ (to dry)
- يَئِسَ يَيْأَسُ (to despair)

### Common Ya'i Mithaal Verbs
- يَسَرَ يَيْسِرُ (to be easy)
- يَقِظَ يَيْقَظُ (to wake up)
- يَمَنَ يَيْمِنُ (to be blessed)`,
      rules: [
        {
          english: "Ya'i mithaal verbs keep their initial ي in most conjugation forms, unlike waawi mithaal where و drops.",
          examples: [
            { arabic: 'يَبِسَ يَيْبَسُ', translation: 'to dry (ي stays in present)' },
            { arabic: 'يَئِسَ يَيْأَسُ', translation: 'to despair (ي stays in present)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 153-167',
    },
    {
      difficulty: 'intermediate',
      summary: "The ya'i mithaal follows regular conjugation in most forms. Some scholars treat يَسَرَ as having ي drop in certain dialects. The passive and participle forms follow standard patterns.",
      body: `## Conjugation of Ya'i Mithaal

### Regular Pattern
Most ya'i mithaal verbs conjugate **regularly** — the ي stays:
- يَبِسَ → يَيْبَسُ → اِيبَسْ
- يَئِسَ → يَيْأَسُ → اِيأَسْ

### Short Conjugation
يَبِسَ - يَيْبَسُ - اِيبَسْ - لَا تَيْبَسْ - يُبِسَ - يُيبَسُ - يَابِسٌ - مَيْبُوسٌ - يُبْسًا

### Note on Rarity
Ya'i mithaal verbs are **rare** in Arabic. Most weak-initial verbs use و.`,
      rules: [
        {
          arabic: 'المثال اليائي نادر وغالبًا تبقى ياؤه في التصريف',
          english: "Ya'i mithaal is rare and the ي usually stays in conjugation.",
          examples: [
            { arabic: 'يَبِسَ يَيْبَسُ يُبْسًا', translation: 'to dry (complete short conjugation)' },
          ],
        },
      ],
      tables: [
        {
          title: "Short Conjugation — يَبِسَ",
          titleAr: 'التصريف الصغير - يبس',
          headers: ['Form', 'Arabic', 'English'],
          rows: [
            ['Active Past', 'يَبِسَ', 'it dried'],
            ['Active Present', 'يَيْبَسُ', 'it dries'],
            ['Command', 'اِيبَسْ', 'dry!'],
            ['Prohibition', 'لَا تَيْبَسْ', "don't dry!"],
            ['Active Participle', 'يَابِسٌ', 'dry/dried'],
            ['Verbal Noun', 'يُبْسًا', 'dryness'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 153-167',
    },
    {
      difficulty: 'advanced',
      summary: "Advanced study examines the scholarly debate on whether certain ya'i mithaal verbs should be treated as regular or weak, the interaction with enhanced forms (mazid), and comparison with waawi mithaal patterns.",
      body: `## Advanced Ya'i Mithaal

### Scholarly Discussion
Some grammarians debate whether verbs like يَسَرَ truly belong to ya'i mithaal or are simply regular verbs with ي as a strong root letter.

### Comparison: Waawi vs. Ya'i Mithaal
| Feature | Waawi (واوي) | Ya'i (يائي) |
|---------|-------------|-------------|
| First root | و | ي |
| Drops in present? | Yes (usually) | No (usually) |
| Frequency | Very common | Rare |
| Command form | No hamzah (عِدْ) | Has hamzah (اِيبَسْ) |

### In Enhanced Forms
Both types behave regularly in enhanced forms (أبواب المزيد):
- وَعَدَ → أَوْعَدَ (Form IV — و returns)
- يَبِسَ → أَيْبَسَ (Form IV — ي stays)`,
      rules: [
        {
          arabic: 'المثال اليائي في أبواب المزيد يصرف تصريفًا عاديًا',
          english: "Ya'i mithaal in enhanced forms conjugates regularly.",
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 153-167',
    },
  ],
  relatedTopicIds: ['mithaal-waawi', 'lafif-mafruq'],
  tags: ['mithaal', 'yaai', 'weak verb', 'initial weak'],
};
