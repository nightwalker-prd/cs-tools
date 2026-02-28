import type { NahwTopic } from '../types';

export const mudafIlayhi: NahwTopic = {
  id: 'mudaf-ilayhi',
  titleAr: 'المضاف إليه',
  titleEn: 'Genitive Construction (Idafa)',
  transliteration: 'al-Mudaf ilayhi',
  categoryId: 'governed',
  subcategoryId: 'genitive',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The idafa (genitive construction) connects two nouns where the second (mudaf ilayhi) is always in the genitive case (majrur). The first noun (mudaf) loses its tanween and definite article. Example: كِتَابُ الطَّالِبِ (the student\'s book).',
      body: `## The Genitive Construction (الإضافة)

The idafa connects two nouns together:
- **المُضَاف** (annexed) — the first noun
- **المُضَاف إِلَيْهِ** (annexed to) — the second noun

### Key Rules

1. The mudaf **drops its tanween**: كِتَابٌ → كِتَابُ الطَّالِبِ
2. The mudaf **drops ال** if it has it — you cannot say الكِتَابُ الطَّالِبِ
3. The mudaf ilayhi is **always majrur** (genitive case)

### Types of Meaning

The idafa can express different relationships:
- **Possession** (إضافة الملك): كِتَابُ عَلِيٍّ — Ali's book
- **Specification** (إضافة البيان): خَاتَمُ ذَهَبٍ — A ring of gold
- **Partitive** (إضافة التبعيض): بَعْضُ الطُّلَّابِ — Some of the students`,
      rules: [
        {
          arabic: 'المضاف إليه مجرور دائمًا',
          english: 'The mudaf ilayhi is always in the genitive case.',
          examples: [
            { arabic: 'هَذَا كِتَابُ الطَّالِبِ', translation: 'This is the student\'s book', irab: 'الطَّالِبِ: mudaf ilayhi majrur with kasra' },
            { arabic: 'ذَنْبُ العَبْدِ مَغْفُورٌ', translation: 'The servant\'s sin is forgiven', irab: 'العَبْدِ: mudaf ilayhi majrur' },
          ],
        },
        {
          arabic: 'المضاف يُحذف منه التنوين والألف واللام',
          english: 'The mudaf loses its tanween and cannot have the definite article ال.',
          examples: [
            { arabic: 'غُلَامُ زَيْدٍ', translation: 'Zayd\'s servant', irab: 'غُلَامُ: mudaf — no tanween (was غُلَامٌ)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Types of Idafa',
          titleAr: 'أنواع الإضافة المعنوية',
          headers: ['Type', 'Arabic', 'Example', 'Translation'],
          rows: [
            ['Possession', 'إضافة الملك', 'كِتَابُ عَلِيٍّ', 'Ali\'s book'],
            ['Specification', 'إضافة البيان', 'خَاتَمُ ذَهَبٍ', 'A ring of gold'],
            ['Partitive', 'إضافة التبعيض', 'بَعْضُ الطُّلَّابِ', 'Some of the students'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 2, Chapter 1',
    },
    {
      difficulty: 'intermediate',
      summary: 'There are two types of idafa: true idafa (الإضافة المحضة/المعنوية) which makes the mudaf definite, and non-true idafa (الإضافة اللفظية/غير المحضة) which doesn\'t. Non-true idafa occurs with active participles and adjectives resembling verbs.',
      body: `## True vs. Non-True Idafa

### 1. True Idafa (الإضافة المحضة / المعنوية)

The mudaf **becomes definite** through the idafa:
- كِتَابُ الطَّالِبِ — "the student's book" (كِتَابُ is now definite)

### 2. Non-True Idafa (الإضافة غير المحضة / اللفظية)

The mudaf does **NOT** become definite:
- حَسَنُ الوَجْهِ — "beautiful of face" (حَسَن remains indefinite)

This occurs with derived nouns (المشتقات):
- **اسم الفاعل**: كَاتِبُ الدَّرْسِ (the lesson's writer)
- **الصفة المشبهة**: حَسَنُ الوَجْهِ (beautiful of face)
- **اسم المفعول**: مَكْتُوبُ الدَّرْسِ
- **صيغة المبالغة**: عَلَّامُ الغُيُوبِ

### Why It Matters

The distinction affects the نعت (adjective) agreement. An indefinite noun needs an indefinite na't, so non-true idafa can serve as na't for an indefinite noun:

رَأَيْتُ رَجُلًا حَسَنَ الوَجْهِ — "I saw a man beautiful of face" (حَسَنَ is indefinite, matching رَجُلًا)`,
      rules: [
        {
          arabic: 'الإضافة المحضة تُفيد التعريف',
          english: 'True idafa grants definiteness to the mudaf; non-true (lafziyya) idafa does not.',
          examples: [
            { arabic: 'كِتَابُ الطَّالِبِ مُفِيدٌ', translation: 'The student\'s book is useful', irab: 'كِتَابُ: definite through true idafa — مُفِيدٌ: khabar (indefinite because khabar)' },
            { arabic: 'رَأَيْتُ رَجُلًا حَسَنَ الوَجْهِ', translation: 'I saw a man beautiful of face', irab: 'حَسَنَ: non-true idafa, remains indefinite — serves as na\'t for رَجُلًا' },
          ],
        },
        {
          arabic: 'الإضافة اللفظية تكون مع المشتقات',
          english: 'Non-true idafa occurs with derived nouns (active participle, passive participle, sifa mushabbaha, etc.).',
          examples: [
            { arabic: 'مُحَمَّدٌ كَاتِبُ الدَّرْسِ', translation: 'Muhammad is the lesson\'s writer', irab: 'كَاتِبُ: ism fa\'il in non-true idafa — but becomes definite if referring to past action' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Part 4',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced idafa topics include: verbal nouns (masdars) in idafa that govern objects, stacking multiple idafas, and the conditions under which the mudaf or mudaf ilayhi can be deleted while the other remains.',
      body: `## Advanced Idafa Topics

### 1. Masdar in Idafa

When a masdar (verbal noun) is the mudaf, it can govern like its verb:

إِعْطَاءُ الفَقِيرِ المَالَ
- إِعْطَاءُ: masdar/mudaf
- الفَقِيرِ: mudaf ilayhi (originally the fa'il)
- المَالَ: maf'ul bih of the masdar

### 2. Stacking Idafas

Multiple idafas can be chained:

بَابُ دَارِ أَبِي زَيْدٍ — "The door of the house of the father of Zayd" (4 levels)

### 3. Deleting the Mudaf

The mudaf can be deleted while the mudaf ilayhi takes its grammatical position:

قَالَ تَعَالَى: **وَاسْأَلِ القَرْيَةَ** — meaning أَهْلَ القَرْيَةِ (the mudaf أَهْل is deleted)

### 4. Deleting the Mudaf Ilayhi

The mudaf ilayhi can be deleted, and tanween returns to the mudaf:

كُلٌّ يَمُوتُ = كُلُّ إِنْسَانٍ يَمُوتُ — the mudaf ilayhi إِنْسَانٍ is deleted

### 5. Separating Mudaf from Mudaf Ilayhi

Separation between the two parts is rare and mostly occurs in poetry.`,
      rules: [
        {
          arabic: 'يجوز حذف المضاف وإقامة المضاف إليه مقامه',
          english: 'The mudaf can be deleted and the mudaf ilayhi takes its grammatical position.',
          examples: [
            { arabic: 'وَاسْأَلِ القَرْيَةَ', translation: 'And ask the village (meaning: its people)', source: 'Yusuf 12:82', irab: 'القَرْيَةَ: originally mudaf ilayhi, takes position of deleted mudaf أَهْلَ' },
          ],
        },
        {
          arabic: 'المصدر المضاف يعمل عمل فعله',
          english: 'A masdar in idafa can govern like its verb, with the mudaf ilayhi acting as its subject or object.',
          examples: [
            { arabic: 'أَعْجَبَنِي إِكْرَامُ زَيْدٍ الضَّيْفَ', translation: 'Zayd\'s honoring of the guest impressed me', irab: 'إِكْرَامُ: masdar/mudaf — زَيْدٍ: mudaf ilayhi (fa\'il of masdar) — الضَّيْفَ: maf\'ul bih of masdar' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 6',
    },
  ],
  relatedTopicIds: ['five-nouns', 'maf-ul-bih', 'prepositions'],
  tags: ['mudaf', 'idafa', 'genitive', 'majrur', 'construction'],
};
