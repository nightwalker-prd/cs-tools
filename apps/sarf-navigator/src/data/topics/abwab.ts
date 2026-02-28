import type { SarfTopic } from '../types';

export const abwabOverview: SarfTopic = {
  id: 'abwab-overview',
  titleAr: 'الأبواب الستة',
  titleEn: 'The Six Categories',
  transliteration: 'al-Abwaab as-Sitta',
  categoryId: 'fundamentals',
  subcategoryId: 'verb-categories',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Triliteral verbs are classified into six categories (abwab) based on the vowel pattern of their past and present tense. Each baab determines how the verb is conjugated.',
      body: `## The Six Verb Categories (الأبواب الستة)

Arabic triliteral verbs follow one of **six vowel patterns** (abwab). The baab tells you the vowel on the middle letter (عين الفعل) in both past and present tenses.

### Why Abwab Matter
The baab determines:
- How the verb sounds in present tense
- The command form
- Derived nouns (masdar, ism faa'il, ism maf'ool)`,
      rules: [
        {
          arabic: 'الباب يُعرف من حركة عين الفعل في الماضي والمضارع',
          english: 'The baab is identified by the vowel on the middle root letter in both past and present tenses.',
        },
      ],
      tables: [
        {
          title: 'The Six Abwab',
          titleAr: 'الأبواب الستة',
          headers: ['Baab', 'Past', 'Present', 'Vowel Pattern', 'Example'],
          rows: [
            ['1', 'فَتَحَ', 'يَفْتَحُ', 'a-a', 'فَتَحَ يَفْتَحُ (to open)'],
            ['2', 'سَمِعَ', 'يَسْمَعُ', 'i-a', 'سَمِعَ يَسْمَعُ (to hear)'],
            ['3', 'ضَرَبَ', 'يَضْرِبُ', 'a-i', 'ضَرَبَ يَضْرِبُ (to strike)'],
            ['4', 'نَصَرَ', 'يَنْصُرُ', 'a-u', 'نَصَرَ يَنْصُرُ (to help)'],
            ['5', 'كَرُمَ', 'يَكْرُمُ', 'u-u', 'كَرُمَ يَكْرُمُ (to be noble)'],
            ['6', 'حَسِبَ', 'يَحْسِبُ', 'i-i', 'حَسِبَ يَحْسِبُ (to reckon)'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 15-30',
    },
    {
      difficulty: 'intermediate',
      summary: 'Each baab has specific uses: abwab 1-4 are transitive and intransitive, baab 5 (karuma) is exclusively intransitive for qualities, and baab 6 (hasiba) is rare. The short conjugation (tasreef sagheer) shows all derived forms of each baab.',
      body: `## Detailed Baab Analysis

### التصريف الصغير (Short Conjugation)
For each baab, the short conjugation lists:
1. **الماضي المعلوم** (active past)
2. **المضارع المعلوم** (active present)
3. **الأمر** (command)
4. **النهي** (prohibition)
5. **الماضي المجهول** (passive past)
6. **المضارع المجهول** (passive present)
7. **اسم الفاعل** (active participle)
8. **اسم المفعول** (passive participle)
9. **المصدر** (verbal noun)

### Baab Characteristics
- **باب فَتَحَ**: Most common, both transitive and intransitive
- **باب سَمِعَ**: Common with verbs of sensation and emotion
- **باب كَرُمَ**: Only for stative/quality verbs, always intransitive`,
      rules: [
        {
          arabic: 'باب كَرُمَ خاص بالصفات اللازمة',
          english: 'Baab karuma is exclusively for stative qualities and is always intransitive.',
          examples: [
            { arabic: 'كَرُمَ يَكْرُمُ', translation: 'to be noble' },
            { arabic: 'حَسُنَ يَحْسُنُ', translation: 'to be beautiful' },
          ],
        },
      ],
      tables: [
        {
          title: 'Short Conjugation — باب فَتَحَ',
          titleAr: 'التصريف الصغير - باب فتح',
          headers: ['Form', 'Arabic', 'English'],
          rows: [
            ['Active Past', 'فَتَحَ', 'he opened'],
            ['Active Present', 'يَفْتَحُ', 'he opens'],
            ['Command', 'اِفْتَحْ', 'open!'],
            ['Prohibition', 'لَا تَفْتَحْ', 'don\'t open!'],
            ['Passive Past', 'فُتِحَ', 'it was opened'],
            ['Passive Present', 'يُفْتَحُ', 'it is opened'],
            ['Active Participle', 'فَاتِحٌ', 'opener/opening'],
            ['Passive Participle', 'مَفْتُوحٌ', 'opened'],
            ['Verbal Noun', 'فَتْحًا', 'opening'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 15-60',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study covers how to determine the correct baab for any verb, the scholarly categorization of transitive vs. intransitive usage across abwab, and exceptional verbs that don\'t follow standard patterns.',
      body: `## Advanced Baab Analysis

### How to Determine the Baab
The baab cannot always be predicted from the past tense alone — the present tense vowel must be known. Dictionaries list both: فَتَحَ يَفْتَحُ.

### Transitivity Rules by Baab
| Baab | Transitive | Intransitive |
|------|-----------|-------------|
| فَتَحَ يَفْتَحُ | Both | Both |
| سَمِعَ يَسْمَعُ | Both | Both |
| ضَرَبَ يَضْرِبُ | Both | Both |
| نَصَرَ يَنْصُرُ | Both | Both |
| كَرُمَ يَكْرُمُ | Never | Always |
| حَسِبَ يَحْسِبُ | Both | Both |

### Rare Observations
- Some verbs appear in multiple abwab with different meanings
- باب حَسِبَ has very few verbs in classical Arabic`,
      rules: [
        {
          arabic: 'الباب لا يُعرف من الماضي وحده بل لا بد من المضارع',
          english: 'The baab cannot be determined from the past tense alone — the present tense form is essential.',
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 15-76',
    },
  ],
  relatedTopicIds: ['verb-forms', 'baab-fataha', 'conjugation-patterns'],
  tags: ['abwab', 'categories', 'baab', 'verb patterns', 'triliteral'],
};

export const baabFataha: SarfTopic = {
  id: 'baab-fataha',
  titleAr: 'باب فَتَحَ يَفْتَحُ',
  titleEn: 'Baab Fataha',
  transliteration: 'Baab Fataha Yaftahu',
  categoryId: 'fundamentals',
  subcategoryId: 'verb-categories',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Baab Fataha (فَتَحَ يَفْتَحُ) is the first and most common verb category. The middle root letter has fatha in both past and present. It can be both transitive and intransitive.',
      body: `## باب فَتَحَ يَفْتَحُ

This is the **most common** verb category in Arabic. The pattern is:
- **Past**: فَعَلَ (fatha on middle letter)
- **Present**: يَفْعَلُ (fatha on middle letter)

### Common Verbs in This Baab
- فَتَحَ يَفْتَحُ (to open)
- مَنَعَ يَمْنَعُ (to prevent)
- قَطَعَ يَقْطَعُ (to cut)
- جَمَعَ يَجْمَعُ (to gather)`,
      rules: [
        {
          english: 'Baab Fataha has fatha (a) on the middle root letter in both past and present tenses.',
          examples: [
            { arabic: 'فَتَحَ يَفْتَحُ فَتْحًا', translation: 'to open (opening)' },
            { arabic: 'مَنَعَ يَمْنَعُ مَنْعًا', translation: 'to prevent (prevention)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Common Verbs — باب فَتَحَ',
          titleAr: 'أفعال شائعة من باب فتح',
          headers: ['Past', 'Present', 'Masdar', 'Meaning'],
          rows: [
            ['فَتَحَ', 'يَفْتَحُ', 'فَتْحًا', 'to open'],
            ['مَنَعَ', 'يَمْنَعُ', 'مَنْعًا', 'to prevent'],
            ['قَطَعَ', 'يَقْطَعُ', 'قَطْعًا', 'to cut'],
            ['جَمَعَ', 'يَجْمَعُ', 'جَمْعًا', 'to gather'],
            ['صَنَعَ', 'يَصْنَعُ', 'صُنْعًا', 'to make'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 15-30',
    },
    {
      difficulty: 'intermediate',
      summary: 'The full short conjugation of باب فتح includes active/passive forms, participles, command, and verbal noun. The command form uses hamzatul-wasl when the second root letter has sukoon.',
      body: `## Full Conjugation of باب فتح

### Short Conjugation (التصريف الصغير)
فَتَحَ - يَفْتَحُ - اِفْتَحْ - لَا تَفْتَحْ - فُتِحَ - يُفْتَحُ - فَاتِحٌ - مَفْتُوحٌ - فَتْحًا

### Command Form Rules
The command of باب فتح starts with **همزة الوصل** (connecting hamzah) because the second letter of the present stem has sukoon:
يَفْتَحُ → تَفْتَحُ → (drop prefix) فْتَحْ → (add hamzah) اِفْتَحْ`,
      rules: [
        {
          arabic: 'أمر باب فتح يبدأ بهمزة وصل مكسورة',
          english: 'The command form of باب فتح begins with a kasra hamzatul-wasl because the ayn has sukoon.',
          examples: [
            { arabic: 'اِفْتَحْ', translation: 'open!' },
            { arabic: 'اِقْطَعْ', translation: 'cut!' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 15-60',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced analysis covers the throat-letter rule (حروف الحلق) that determines when a verb falls in باب فتح, the multiple masdar patterns possible, and comparison with other abwab.',
      body: `## Advanced باب فتح Analysis

### Throat Letter Rule
Verbs with a throat letter (حروف الحلق: ء ه ع ح غ خ) as the middle or final root letter tend to fall in باب فتح because these letters prefer the fatha vowel.

### Masdar Patterns
باب فتح can have several masdar patterns:
- فَعْلٌ: فَتْحٌ (opening)
- فِعَالَةٌ: كِتَابَةٌ (writing)
- فَعَلَانٌ: غَلَيَانٌ (boiling)`,
      rules: [
        {
          arabic: 'حروف الحلق تجذب الفتحة',
          english: 'Throat letters attract the fatha vowel, which is why many verbs with these letters fall in باب فتح.',
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 15-76',
    },
  ],
  relatedTopicIds: ['abwab-overview', 'verb-forms', 'conjugation-patterns'],
  tags: ['baab', 'fataha', 'verb category', 'conjugation'],
};
