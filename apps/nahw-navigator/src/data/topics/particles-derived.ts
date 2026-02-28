import type { NahwTopic } from '../types';

export const particles: NahwTopic = {
  id: 'particles',
  titleAr: 'الحروف',
  titleEn: 'Particles',
  transliteration: 'al-Huruuf',
  categoryId: 'words',
  subcategoryId: 'particles-and-derived',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Particles (huruuf) have two characteristics: they are always non-declinable (mabni), and they are either governing (\'aamil) or non-governing (ghayr \'aamil) depending on whether they affect the i\'rab of the following word.',
      body: `## Particles (حَرْفٌ)

A particle has two important characteristics:

### Characteristic 1: I'rab

All particles are **مَبْنِيٌّ** — they remain unchanged in all circumstances. Unlike nouns and verbs, particles never change their form.

### Characteristic 2: Governance

Particles are of two types according to whether they cause the i'rab of a subsequent noun or verb to change:

#### 1. Governing Particle (حَرْفٌ عَامِلٌ)
A governing particle causes the i'rab of the following word(s) to change.

> The particle **لَمْ** causes the following verb to become **مَجْزُومٌ**:
> **لَمْ يَذْهَبْ زَيْدٌ** — Zaid did not go. (the verb يَذْهَبْ is مَجْزُومٌ because of لَمْ)

#### 2. Non-Governing Particle (حَرْفٌ غَيْرُ عَامِلٍ)
A non-governing particle does not cause the i'rab of the following word(s) to change.

> The particle **مَا** makes the past tense negative, but it does not change the i'rab of the words after it:
> **مَا ذَهَبَ زَيْدٌ** — Zaid did not go. (i'rab unchanged)`,
      rules: [
        {
          arabic: 'جميع الحروف مبنية',
          english: 'All particles are non-declinable (mabni) — they never change form.',
          examples: [
            { arabic: 'فِي', translation: 'in', irab: 'Particle — always mabni' },
            { arabic: 'مِنْ', translation: 'from', irab: 'Particle — always mabni' },
            { arabic: 'إِنَّ', translation: 'indeed', irab: 'Particle — always mabni' },
          ],
        },
        {
          arabic: 'الحرف العامل يغير إعراب ما بعده',
          english: 'A governing particle (harf \'aamil) changes the i\'rab of the word that follows it.',
          examples: [
            { arabic: 'لَمْ يَذْهَبْ زَيْدٌ', translation: 'Zaid did not go.', irab: 'لَمْ is governing — it puts يَذْهَبْ in jazm state' },
            { arabic: 'لَنْ يَذْهَبَ زَيْدٌ', translation: 'Zaid will never go.', irab: 'لَنْ is governing — it puts يَذْهَبَ in nasb state' },
          ],
        },
        {
          arabic: 'الحرف غير العامل لا يغير إعراب ما بعده',
          english: 'A non-governing particle (ghayr \'aamil) does not change the i\'rab of the following word.',
          examples: [
            { arabic: 'مَا ذَهَبَ زَيْدٌ', translation: 'Zaid did not go.', irab: 'مَا is non-governing — ذَهَبَ is unchanged' },
          ],
        },
      ],
      tables: [
        {
          title: 'Types of Particles',
          titleAr: 'أنواع الحروف',
          headers: ['Type', 'Arabic', 'Effect', 'Example'],
          rows: [
            ['Governing', 'حَرْفٌ عَامِلٌ', 'Changes i\'rab of following word', 'لَمْ يَذْهَبْ (jazm)'],
            ['Non-Governing', 'حَرْفٌ غَيْرُ عَامِلٍ', 'No i\'rab change', 'مَا ذَهَبَ (no change)'],
          ],
        },
        {
          title: 'Examples of Governing Particles',
          titleAr: 'أمثلة على الحروف العاملة',
          headers: ['Particle', 'Function', 'I\'rab Effect', 'Example'],
          rows: [
            ['لَمْ', 'Past negation of mudaari\'', 'مَجْزُومٌ (jazm)', 'لَمْ يَذْهَبْ'],
            ['لَنْ', 'Future negation of mudaari\'', 'مَنْصُوبٌ (nasb)', 'لَنْ يَذْهَبَ'],
            ['فِي', 'Preposition (in)', 'مَجْرُورٌ (jarr)', 'فِي الْمَسْجِدِ'],
            ['مِنْ', 'Preposition (from)', 'مَجْرُورٌ (jarr)', 'مِنَ الْبَيْتِ'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 1, pp. 44-45',
    },
  ],
  relatedTopicIds: ['word-types', 'verb-negation', 'verb-irab'],
  tags: ['particles', 'harf', 'huruuf', 'governing', '\'aamil', 'ghayr \'aamil', 'mabni', 'non-declinable'],
};

export const masdarDerived: NahwTopic = {
  id: 'masdar-derived',
  titleAr: 'المصدر والمشتقات',
  titleEn: 'Masdar & Derived Nouns',
  transliteration: 'al-Masdar wa al-Mushtaqqaat',
  categoryId: 'words',
  subcategoryId: 'particles-and-derived',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The masdar (verbal noun) covers the infinitive, gerund, and verbal noun in English. Derived nouns (mushtaqqaat) include the active participle (ism fa\'il), passive participle (ism maf\'uul), resembling adjective (sifa mushabbaha), and comparative/superlative (ism tafdeel).',
      body: `## The Verbal Noun (المَصْدَرُ — Masdar)

In vocabulary lists, three words are written for verbs: the past tense, the present tense, and the **masdar**.

> The past and present are verbs; the **masdar** is a **noun**.

**Example:** **سَأَلَ** → **يَسْأَلُ** → **سُؤَالًا**

The English equivalents of a masdar are:

1. An **infinitive** — a noun with "to" before it (e.g. *to ask*)
2. A **gerund** — a noun ending in "-ing" (e.g. *asking*)
3. A **verbal noun** — a noun without any element of action (e.g. *question*)

> Memory tip: infini**t**ive → **t**o; **g**erund → -in**g**

When a masdar is used as a verbal noun, it can have its own plural:
> **سُؤَالٌ** ج **أَسْئِلَةٌ** (question / questions)

## Derived Nouns (المُشْتَقَّاتُ)

Some nouns are made by placing the letters of the masdar in different forms. These are called **مُشْتَقٌّ** (derived noun). Four types:

### 1. Active Participle (اِسْمُ الْفَاعِلِ)

Represents **the one who is carrying out the verb**.

**For three-letter verbs:** Pattern **فَاعِلٌ**
> **رَزَقَ** → **رَازِقٌ** (provider)

**For verbs with more than three letters:** Change the يـ of the mudaari' to مُـ, and place a kasra on the second-to-last letter:
> **أَنْذَرَ / يُنْذِرُ** → **مُنْذِرٌ** (warner)

Translation: Add "-er" after the verb, or say "one who" before it.

### 2. Passive Participle (اِسْمُ الْمَفْعُولِ)

Represents **the one upon whom the action is carried out**.

**For three-letter verbs:** Pattern **مَفْعُولٌ**
> **رَزَقَ** → **مَرْزُوقٌ** (one who is provided for)

**For verbs with more than three letters:** Change the يـ to مُـ, and place a fatha on the second-to-last letter:
> **أَنْذَرَ / يُنْذِرُ** → **مُنْذَرٌ** (one who is warned)

Translation: Add "-ed" after the verb, or say "one who is" before it.

### 3. Resembling Adjective (الصِّفَةُ الْمُشَبَّهَةُ بِاسْمِ الْفَاعِلِ)

Depicts the one carrying out the verb, but its meaning is usually **more long-term or intense** than the active participle.

Common patterns:
- **فَعِيلٌ** — e.g. **كَثِيرٌ** (abundant)
- **فَعُولٌ** — e.g. **صَبُورٌ** (patient)
- **فَعْلَانُ** (feminine: **فَعْلَى**) — e.g. **غَضْبَانُ / غَضْبَى** (angry)
- **فَعَّالٌ** — e.g. **صَبَّارٌ** (extremely patient — intensified form)

### 4. Comparative/Superlative (اِسْمُ التَّفْضِيلِ)

Depicts the meaning in a **comparative** or **superlative** context.

Pattern: **أَفْعَلُ** (feminine: **فُعْلَى**)
> **صَدَقَ** → **أَصْدَقُ** (more/most truthful)
> **غَضِبَ** → **أَغْضَبُ** (angrier/angriest)

Translation: Add "-er" or "more" (comparative) or "-est" or "most" (superlative).

### Usage Note

The active participle, passive participle, and resembling adjective can all function as both **nouns** and **adjectives**:
- As adjective: **مُجْتَهِدٌ** = hardworking
- As noun: **مُجْتَهِدٌ** = one who works hard`,
      rules: [
        {
          arabic: 'المصدر اسم يدل على الحدث بلا زمن',
          english: 'The masdar (verbal noun) is a noun that indicates an action without being tied to time. It covers the infinitive, gerund, and verbal noun in English.',
          examples: [
            { arabic: 'سُؤَالٌ', translation: 'to ask / asking / question', irab: 'Masdar from سَأَلَ' },
          ],
        },
        {
          arabic: 'اسم الفاعل من الثلاثي على وزن فاعل',
          english: 'The active participle of a three-letter verb follows the pattern faa\'il.',
          examples: [
            { arabic: 'رَازِقٌ', translation: 'provider / one who provides', irab: 'Ism fa\'il from رَزَقَ — pattern فَاعِلٌ' },
          ],
        },
        {
          arabic: 'اسم الفاعل من غير الثلاثي: تبديل ياء المضارع بميم مضمومة وكسر ما قبل الآخر',
          english: 'The active participle of verbs with more than three letters: change the yaa of the mudaari\' to mu- and put kasra on the penultimate letter.',
          examples: [
            { arabic: 'مُنْذِرٌ', translation: 'warner / one who warns', irab: 'Ism fa\'il from أَنْذَرَ — يُنْذِرُ → مُنْذِرٌ' },
          ],
        },
        {
          arabic: 'اسم المفعول من الثلاثي على وزن مفعول',
          english: 'The passive participle of a three-letter verb follows the pattern maf\'uul.',
          examples: [
            { arabic: 'مَرْزُوقٌ', translation: 'provided / one who is provided for', irab: 'Ism maf\'uul from رَزَقَ — pattern مَفْعُولٌ' },
          ],
        },
        {
          arabic: 'اسم المفعول من غير الثلاثي: تبديل ياء المضارع بميم مضمومة وفتح ما قبل الآخر',
          english: 'The passive participle of verbs with more than three letters: change the yaa to mu- and put fatha on the penultimate letter.',
          examples: [
            { arabic: 'مُنْذَرٌ', translation: 'warned / one who is warned', irab: 'Ism maf\'uul from أَنْذَرَ — يُنْذِرُ → مُنْذَرٌ' },
          ],
        },
        {
          arabic: 'الصفة المشبهة تدل على صفة ثابتة',
          english: 'The resembling adjective (sifa mushabbaha) expresses a permanent quality, more long-term than the active participle.',
          examples: [
            { arabic: 'كَثِيرٌ', translation: 'abundant', irab: 'Sifa mushabbaha — pattern فَعِيلٌ' },
            { arabic: 'صَبُورٌ', translation: 'patient', irab: 'Sifa mushabbaha — pattern فَعُولٌ' },
            { arabic: 'غَضْبَانُ', translation: 'angry', irab: 'Sifa mushabbaha — pattern فَعْلَانُ' },
          ],
        },
        {
          arabic: 'اسم التفضيل على وزن أَفْعَلُ',
          english: 'The comparative/superlative noun (ism tafdeel) follows the pattern af\'al for masculine and fu\'la for feminine.',
          examples: [
            { arabic: 'أَصْدَقُ', translation: 'more/most truthful', irab: 'Ism tafdeel from صَدَقَ — pattern أَفْعَلُ' },
            { arabic: 'أَغْضَبُ', translation: 'angrier/angriest', irab: 'Ism tafdeel from غَضِبَ' },
          ],
        },
      ],
      tables: [
        {
          title: 'Masdar — English Equivalents',
          titleAr: 'المصدر — المقابل الإنجليزي',
          headers: ['English Function', 'Form', 'Arabic Example'],
          rows: [
            ['Infinitive', '"to ask"', 'سُؤَالٌ'],
            ['Gerund', '"asking"', 'سُؤَالٌ'],
            ['Verbal Noun', '"question"', 'سُؤَالٌ ج أَسْئِلَةٌ'],
          ],
        },
        {
          title: 'Derived Noun Patterns',
          titleAr: 'أوزان المشتقات',
          headers: ['Type', 'Arabic Term', 'Three-Letter Pattern', 'More Than Three', 'Example'],
          rows: [
            ['Active Participle', 'اِسْمُ الْفَاعِلِ', 'فَاعِلٌ', 'مُفْعِلٌ (kasra penult.)', 'رَازِقٌ / مُنْذِرٌ'],
            ['Passive Participle', 'اِسْمُ الْمَفْعُولِ', 'مَفْعُولٌ', 'مُفْعَلٌ (fatha penult.)', 'مَرْزُوقٌ / مُنْذَرٌ'],
            ['Resembling Adj.', 'الصِّفَةُ الْمُشَبَّهَةُ', 'فَعِيلٌ / فَعُولٌ / فَعْلَانُ / فَعَّالٌ', '—', 'كَثِيرٌ / صَبُورٌ'],
            ['Comparative/Superl.', 'اِسْمُ التَّفْضِيلِ', 'أَفْعَلُ (m.) / فُعْلَى (f.)', '—', 'أَصْدَقُ / صُدْقَى'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 1, pp. 45-50',
    },
  ],
  relatedTopicIds: ['word-types', 'verb-tense', 'verb-gender-voice'],
  tags: ['masdar', 'verbal noun', 'infinitive', 'gerund', 'derived nouns', 'mushtaqqaat', 'ism fa\'il', 'ism maf\'uul', 'sifa mushabbaha', 'ism tafdeel', 'active participle', 'passive participle', 'comparative', 'superlative'],
};
