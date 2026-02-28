import type { NahwTopic } from '../types';

export const wordTypes: NahwTopic = {
  id: 'word-types',
  titleAr: 'أقسام الكلمة',
  titleEn: 'Word Types',
  transliteration: 'Aqsaam al-Kalima',
  categoryId: 'words',
  subcategoryId: 'word-types',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'All Arabic words fall into exactly three categories: nouns (ism), verbs (fi\'l), and particles (harf). Learning to identify each type is the first step in Arabic grammar.',
      body: `## The Three Types of Words

In Arabic, a word is called **كَلِمَة**. All Arabic words fall into exactly three categories:

### 1. Noun (اِسْمٌ - Ism)
A noun is a name or a thing — man, pen, paper. It indicates a meaning by itself, without being tied to a specific time.

### 2. Verb (فِعْلٌ - Fi'l)
A verb is a word that shows an action — run, sit, hit. It indicates a meaning tied to a specific time (past, present, or future).

### 3. Particle (حَرْفٌ - Harf)
A particle is usually a one- or two-letter word that has no meaning by itself. It only gains meaning when combined with other words — e.g. **فِي** (in), **لِ** (for).

### How to Recognise Each Type

- **Nouns** usually have **اَلْ** at the beginning or **تَنْوِيْن** at the end: **اَلْقَلَمُ** / **قَلَمٌ**
- **Verbs** come in recognisable patterns: **فَتَحَ** (past) / **يَفْتَحُ** (present) / **اِفْتَحْ** (imperative)
- **Particles** are typically one or two letters: **فِي** (in), **لِ** (for)`,
      rules: [
        {
          arabic: 'الكلمة ثلاثة أنواع: اسم وفعل وحرف',
          english: 'A word (kalima) is of three types: noun (ism), verb (fi\'l), and particle (harf).',
          examples: [
            { arabic: 'رَجُلٌ', translation: 'a man', irab: 'Noun — indicates a being without reference to time' },
            { arabic: 'فَتَحَ', translation: 'he opened', irab: 'Verb — indicates an action tied to the past' },
            { arabic: 'فِي', translation: 'in', irab: 'Particle — has no meaning without other words' },
          ],
        },
        {
          arabic: 'الاسم يُعرف بالألف واللام والتنوين',
          english: 'A noun is recognised by the definite article (al-) or tanween at the end.',
          examples: [
            { arabic: 'اَلْقَلَمُ', translation: 'the pen', irab: 'Noun — has اَلْ prefix' },
            { arabic: 'قَلَمٌ', translation: 'a pen', irab: 'Noun — has tanween' },
          ],
        },
        {
          arabic: 'الفعل يُعرف بأوزانه المعروفة',
          english: 'A verb is recognised by its tense patterns: past (fa\'ala), present (yaf\'alu), and imperative (if\'al).',
          examples: [
            { arabic: 'فَتَحَ / يَفْتَحُ / اِفْتَحْ', translation: 'he opened / he opens / open!', irab: 'Verb — three tense forms' },
          ],
        },
      ],
      tables: [
        {
          title: 'The Three Word Types',
          titleAr: 'أقسام الكلمة الثلاثة',
          headers: ['Arabic', 'Type', 'Meaning', 'Example'],
          rows: [
            ['اِسْمٌ', 'Noun (Ism)', 'A name or thing', 'قَلَمٌ (pen), رَجُلٌ (man)'],
            ['فِعْلٌ', 'Verb (Fi\'l)', 'An action', 'فَتَحَ (opened), يَفْتَحُ (opens)'],
            ['حَرْفٌ', 'Particle (Harf)', 'A connecting word', 'فِي (in), لِ (for)'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 1, pp. 15-16',
    },
  ],
  relatedTopicIds: ['definite-indefinite', 'verb-tense', 'particles'],
  tags: ['word types', 'kalima', 'ism', 'fi\'l', 'harf', 'noun', 'verb', 'particle', 'aqsaam'],
};

export const definiteIndefinite: NahwTopic = {
  id: 'definite-indefinite',
  titleAr: 'المعرفة والنكرة',
  titleEn: 'Definite & Indefinite',
  transliteration: 'al-Ma\'rifa wa an-Nakira',
  categoryId: 'words',
  subcategoryId: 'noun-characteristics',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Arabic nouns are either definite (ma\'rifa) with the article al- or a proper name, or indefinite (nakira) with tanween. The al- interacts differently with sun letters and moon letters.',
      body: `## Definite and Indefinite Nouns

### Definite (مَعْرِفَة)

A noun is definite in two ways:

1. **Proper noun (name)** — e.g. **مُحَمَّدٌ** (Muhammad)
2. **Noun with اَلْ before it** — equivalent to English "the": **اَلرَّسُوْلُ** (the messenger)

### Adding اَلْ — Sun and Moon Letters

When اَلْ is added to a noun, the **لَام** is sometimes pronounced and sometimes not:

- **حُرُوْفٌ قَمَرِيَّة** (Moon Letters) — the لَام **is** pronounced. The letter is like other stars seen next to the moon.
  > **اَلْمَاءُ** — the لَام is audible

- **حُرُوْفٌ شَمْسِيَّة** (Sun Letters) — the لَام **is not** pronounced; it is absorbed into the first letter of the noun. Like stars not seen next to the sun.
  > **اَلرَّجُلُ** — the لَام is silent, assimilated into the ر

**Rule:** Regardless of pronunciation, the اَلْ must always be **written**.

### Translation of اَلْ

اَلْ is usually translated as **the**: **اَلرَّسُوْلُ** (the messenger), **اَلنَّبِيُّ** (the prophet).

Exceptions:
- If the noun after اَلْ refers to something **tangible in a general sense**, translate as "a" or omit: **اَلْوَلَدُ** (a child)
- If the noun refers to something **intangible**: **اَلْعِلْمُ** (knowledge)
- The word **اَلْمَرْءُ** is translated as **a person** (not "the person")

### Indefinite (نَكِرَة)

An indefinite noun has **تَنْوِيْن** at the end — equivalent to English "a/an":
> **رَسُوْلٌ** — a messenger

### Translation of تَنْوِيْن

- Singular words → **a**: **رَسُوْلٌ** (a messenger)
- Plural words → **some / a few**: **طُلَّابٌ** (some students)`,
      rules: [
        {
          arabic: 'المعرفة: ما دل على شيء معين',
          english: 'A definite noun (ma\'rifa) is made definite by a proper name or the article al-.',
          examples: [
            { arabic: 'مُحَمَّدٌ', translation: 'Muhammad', irab: 'Definite — proper noun' },
            { arabic: 'اَلرَّسُوْلُ', translation: 'the messenger', irab: 'Definite — has اَلْ' },
          ],
        },
        {
          arabic: 'النكرة: ما دل على شيء غير معين',
          english: 'An indefinite noun (nakira) carries tanween and translates as "a/an" for singular or "some" for plural.',
          examples: [
            { arabic: 'رَسُوْلٌ', translation: 'a messenger', irab: 'Indefinite — has tanween' },
            { arabic: 'طُلَّابٌ', translation: 'some students', irab: 'Indefinite plural — tanween' },
          ],
        },
        {
          arabic: 'الحروف الشمسية تدغم فيها لام اَلْ',
          english: 'With sun letters, the lam of al- is assimilated into the following letter (not pronounced but still written).',
          examples: [
            { arabic: 'اَلرَّجُلُ', translation: 'the man', irab: 'Sun letter ر — lam silent' },
            { arabic: 'اَلشَّمْسُ', translation: 'the sun', irab: 'Sun letter ش — lam silent' },
          ],
        },
        {
          arabic: 'الحروف القمرية تظهر فيها لام اَلْ',
          english: 'With moon letters, the lam of al- is fully pronounced.',
          examples: [
            { arabic: 'اَلْمَاءُ', translation: 'the water', irab: 'Moon letter م — lam audible' },
            { arabic: 'اَلْقَمَرُ', translation: 'the moon', irab: 'Moon letter ق — lam audible' },
          ],
        },
      ],
      tables: [
        {
          title: 'Definite vs Indefinite',
          titleAr: 'المعرفة والنكرة',
          headers: ['Type', 'Arabic Term', 'Marker', 'Example'],
          rows: [
            ['Definite', 'مَعْرِفَة', 'اَلْ or proper name', 'اَلرَّسُوْلُ (the messenger)'],
            ['Indefinite', 'نَكِرَة', 'تَنْوِيْن', 'رَسُوْلٌ (a messenger)'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 1, pp. 17-19',
    },
  ],
  relatedTopicIds: ['word-types', 'noun-irab', 'diptotes'],
  tags: ['definite', 'indefinite', 'ma\'rifa', 'nakira', 'al', 'tanween', 'sun letters', 'moon letters', 'huruf shamsiyya', 'huruf qamariyya'],
};

export const gender: NahwTopic = {
  id: 'gender',
  titleAr: 'الجنس (المذكر والمؤنث)',
  titleEn: 'Gender',
  transliteration: 'al-Jins (al-Mudhakkar wa al-Mu\'annath)',
  categoryId: 'words',
  subcategoryId: 'noun-characteristics',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'All Arabic nouns have grammatical gender: masculine (mudhakkar) or feminine (mu\'annath). There are three types of feminine nouns: natural gender, taa marbuuta ending, and traditional Arab usage.',
      body: `## Gender in Arabic

All Arabic nouns — living and non-living — have grammatical gender: either **مُذَكَّر** (masculine) or **مُؤَنَّث** (feminine).

### Feminine Nouns (مُؤَنَّث) — Three Types

**1. Natural Gender**
The noun is feminine by nature:
> **مَرْيَمُ** (Maryam) / **أُمٌّ** (mother)

**2. Grammatical Sign (التَّاءُ الْمَرْبُوطَة)**
The word ends with **ة** (taa marbuuta):
> **جَنَّةٌ** (a garden) / **اَلسَّنَةُ** (the year)

**3. Arab Usage (سَمَاعِي)**
The Arabs have historically used the word as feminine, even without a ة. These are marked with **(مث)** in dictionaries. Most **body parts that occur in pairs** and **names of tribes** fall here:
> **شَمْسٌ** (sun), **أَرْضٌ** (earth), **عَيْنٌ** (eye), **يَدٌ** (hand), **رِيْحٌ** (wind), **نَفْسٌ** (soul), **نَارٌ** (fire), **رِجْلٌ** (foot), **دُنْيَا** (world), **سَمَاءٌ** (sky)

### Masculine Nouns (مُذَكَّر)

All nouns that do not fall into the three feminine categories above are masculine.`,
      rules: [
        {
          arabic: 'كل اسم في العربية إما مذكر أو مؤنث',
          english: 'Every Arabic noun is either masculine (mudhakkar) or feminine (mu\'annath).',
        },
        {
          arabic: 'المؤنث ثلاثة أنواع: حقيقي ولفظي وسماعي',
          english: 'Feminine nouns come in three types: natural gender, taa marbuuta ending, and traditional Arab usage.',
          examples: [
            { arabic: 'أُمٌّ', translation: 'mother', irab: 'Feminine — natural gender' },
            { arabic: 'جَنَّةٌ', translation: 'a garden', irab: 'Feminine — ends in taa marbuuta (ة)' },
            { arabic: 'شَمْسٌ', translation: 'sun', irab: 'Feminine — traditional Arab usage (سماعي)' },
          ],
        },
        {
          arabic: 'ما لم يكن مؤنثا فهو مذكر',
          english: 'Any noun that does not fall into the three feminine categories is masculine.',
          examples: [
            { arabic: 'رَجُلٌ', translation: 'a man', irab: 'Masculine — does not meet any feminine criteria' },
            { arabic: 'كِتَابٌ', translation: 'a book', irab: 'Masculine — no feminine marker' },
          ],
        },
      ],
      tables: [
        {
          title: 'Three Types of Feminine Nouns',
          titleAr: 'أنواع المؤنث الثلاثة',
          headers: ['Type', 'Arabic', 'Description', 'Examples'],
          rows: [
            ['Natural', 'حقيقي', 'Feminine by nature', 'مَرْيَمُ (Maryam), أُمٌّ (mother)'],
            ['Grammatical', 'لفظي (التاء المربوطة)', 'Ends in ة', 'جَنَّةٌ (garden), اَلسَّنَةُ (year)'],
            ['Traditional', 'سماعي', 'Historically used as feminine', 'شَمْسٌ (sun), أَرْضٌ (earth), يَدٌ (hand)'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 1, pp. 19-20',
    },
  ],
  relatedTopicIds: ['number', 'noun-irab', 'verb-gender-voice'],
  tags: ['gender', 'masculine', 'feminine', 'mudhakkar', 'mu\'annath', 'taa marbuuta', 'jins'],
};

export const number: NahwTopic = {
  id: 'number',
  titleAr: 'العدد (المفرد والمثنى والجمع)',
  titleEn: 'Number',
  transliteration: 'al-\'Adad (al-Mufrad, al-Muthanna, wa al-Jam\')',
  categoryId: 'words',
  subcategoryId: 'noun-characteristics',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Arabic has three numbers: singular (mufrad), dual (muthanna) for exactly two, and plural (jam\') for three or more. Plurals come in two types: regular (sound) and irregular (broken).',
      body: `## Number in Arabic

Arabic has three numbers: **singular**, **dual**, and **plural**.

### Singular (مُفْرَد)
A single item:
> **رَجُلٌ** — a man

### Dual (مُثَنَّى)
Refers to exactly two. Formed from the مُفْرَد by:
1. Placing a **فَتْحَة** on the last letter of the word
2. Adding **ـانِ**

> **رَجُلٌ** → **رَجُلَانِ** — two men

**Rule with ة:** If انِ is added after a round ة, the ة is written as a normal **ت** (open taa):
> **جَنَّةٌ** → **جَنَّتَانِ** — two gardens

**Dual and definiteness:** A dual word **never** has تَنْوِيْن. It can have اَلْ (making it definite) or lack it (making it indefinite, despite having no تَنْوِيْن):
> **رَجُلَانِ** (indefinite — two men) / **اَلرَّجُلَانِ** (definite — the two men)

### Plural (جَمْع)
Three or more. Two types: **regular (سَالِم)** and **irregular (مُكَسَّر)**.

#### Sound Masculine Plural (جَمْعُ الْمُذَكَّرِ السَّالِمُ)
Formed by placing a **ضَمَّة** on the last letter of the مُفْرَد, then adding **ـوْنَ**:
> **مُسْلِمٌ** → **مُسْلِمُوْنَ** — Muslims

**Translation note:** Words like "ones" or "people" may be added when translating:
> **اَلصَّادِقُوْنَ** — *the truthful ones / the truthful people*

#### Sound Feminine Plural (جَمْعُ الْمُؤَنَّثِ السَّالِمُ)
Formed by removing the ة, placing a **فَتْحَة** on the last letter, and adding **ـاتٌ**:
> **مُسْلِمَةٌ** → **مُسْلِمَاتٌ** — Muslim women

**Key sign:** The round **ة** marks a singular feminine word; **ـاتٌ** marks a feminine plural.

#### Broken Plural (اَلْجَمْعُ الْمُكَسَّرُ)
Does **not** follow a fixed pattern. These must be memorised:
> **رَسُوْلٌ** → **رُسُلٌ** / **نَهْرٌ** → **أَنْهَارٌ**`,
      rules: [
        {
          arabic: 'المثنى يُصاغ بإضافة ـانِ على المفرد',
          english: 'The dual is formed by adding -aani to the singular after placing a fatha on the last letter.',
          examples: [
            { arabic: 'رَجُلٌ → رَجُلَانِ', translation: 'a man → two men' },
            { arabic: 'جَنَّةٌ → جَنَّتَانِ', translation: 'a garden → two gardens (ة becomes ت)' },
          ],
        },
        {
          arabic: 'جمع المذكر السالم يُصاغ بإضافة ـوْنَ',
          english: 'The sound masculine plural is formed by adding -uuna to the singular.',
          examples: [
            { arabic: 'مُسْلِمٌ → مُسْلِمُوْنَ', translation: 'a Muslim → Muslims' },
            { arabic: 'اَلصَّادِقُوْنَ', translation: 'the truthful ones' },
          ],
        },
        {
          arabic: 'جمع المؤنث السالم يُصاغ بحذف التاء وإضافة ـاتٌ',
          english: 'The sound feminine plural is formed by removing the taa marbuuta and adding -aat.',
          examples: [
            { arabic: 'مُسْلِمَةٌ → مُسْلِمَاتٌ', translation: 'a Muslim woman → Muslim women' },
          ],
        },
        {
          arabic: 'الجمع المكسر لا يتبع قاعدة ثابتة',
          english: 'The broken plural does not follow a fixed pattern and must be memorised.',
          examples: [
            { arabic: 'رَسُوْلٌ → رُسُلٌ', translation: 'a messenger → messengers' },
            { arabic: 'نَهْرٌ → أَنْهَارٌ', translation: 'a river → rivers' },
          ],
        },
      ],
      tables: [
        {
          title: 'Number Types in Arabic',
          titleAr: 'أنواع العدد',
          headers: ['Number', 'Arabic Term', 'Formation', 'Example'],
          rows: [
            ['Singular', 'مُفْرَد', 'Base form', 'رَجُلٌ (a man)'],
            ['Dual', 'مُثَنَّى', 'Singular + ـانِ', 'رَجُلَانِ (two men)'],
            ['Sound Masc. Plural', 'جَمْع مُذَكَّر سَالِم', 'Singular + ـوْنَ', 'مُسْلِمُوْنَ (Muslims)'],
            ['Sound Fem. Plural', 'جَمْع مُؤَنَّث سَالِم', 'Remove ة + ـاتٌ', 'مُسْلِمَاتٌ (Muslim women)'],
            ['Broken Plural', 'جَمْع مُكَسَّر', 'Irregular pattern', 'رُسُلٌ (messengers)'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 1, pp. 20-23',
    },
  ],
  relatedTopicIds: ['gender', 'noun-irab', 'definite-indefinite'],
  tags: ['number', 'singular', 'dual', 'plural', 'mufrad', 'muthanna', 'jam\'', 'sound plural', 'broken plural', 'salim', 'mukassar'],
};

export const nounIrab: NahwTopic = {
  id: 'noun-irab',
  titleAr: 'إعراب الأسماء',
  titleEn: 'Noun I\'rab',
  transliteration: 'I\'raab al-Asmaa\'',
  categoryId: 'words',
  subcategoryId: 'noun-characteristics',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Nouns appear in three grammatical states: raf\' (nominative), nasb (accusative), and jarr (genitive). Six types of declinable nouns each have their own i\'rab signs, including singular, broken plural, dual, sound masculine plural, sound feminine plural, and diptotes.',
      body: `## Noun I'rab (Grammatical States)

Nouns appear in three grammatical states according to their function in the sentence:

1. **مَرْفُوْعٌ** (Raf' — nominative)
2. **مَنْصُوْبٌ** (Nasb — accusative)
3. **مَجْرُوْرٌ** (Jarr — genitive)

This parallels English pronoun cases: *I* (subject) / *me* (object) / *my* (possession).

### Declinable vs Non-Declinable Nouns

- **مُعْرَبٌ** (Declinable) — endings change to reflect the grammatical state.
- **مَبْنِيٌّ** (Non-declinable) — endings do not change regardless of grammatical state (e.g. demonstratives like هٰذَا).

### The Six Types of Declinable Nouns

Six types of **مُعْرَب** nouns exist, each with its own i'rab signs:

1. **اَلْمُفْرَدُ** (Singular) — standard vowel markers
2. **اَلْجَمْعُ الْمُكَسَّرُ** (Broken Plural) — same as singular
3. **اَلْمُثَنَّى** (Dual) — uses letter markers (alif/yaa)
4. **جَمْعُ الْمُذَكَّرِ السَّالِمُ** (Sound Masculine Plural) — uses letter markers (waw/yaa)
5. **جَمْعُ الْمُؤَنَّثِ السَّالِمُ** (Sound Feminine Plural) — uses kasra for both nasb and jarr
6. **غَيْرُ مُنْصَرِفٍ** (Diptote) — uses fatha in place of kasra for jarr

### Key Observations

- The **dual** shares the same form for nasb and jarr (يْنِ).
- The **sound masculine plural** also shares the same form for nasb and jarr (يْنَ).
- The **sound feminine plural** shares the same form for nasb and jarr (ـاتٍ with kasra, not fatha).
- **Diptotes** (غَيْر مُنْصَرِف) take fatha in place of kasra for jarr.
- **Non-declinable** words (مَبْنِيّ) remain unchanged in all positions.`,
      rules: [
        {
          arabic: 'الاسم المعرب يتغير آخره بتغير موقعه في الجملة',
          english: 'A declinable noun\'s ending changes based on its grammatical position in the sentence.',
          examples: [
            { arabic: 'كِتَابٌ / كِتَابًا / كِتَابٍ', translation: 'a book (raf\' / nasb / jarr)', irab: 'Singular noun — standard damma / fatha / kasra' },
          ],
        },
        {
          arabic: 'المثنى يُرفع بالألف ويُنصب ويُجر بالياء',
          english: 'The dual is nominative with alif (-aani) and accusative/genitive with yaa (-ayni).',
          examples: [
            { arabic: 'مُسْلِمَانِ / مُسْلِمَيْنِ', translation: 'two Muslims (raf\' / nasb-jarr)', irab: 'Dual — alif for raf\', yaa for nasb and jarr' },
          ],
        },
        {
          arabic: 'جمع المذكر السالم يُرفع بالواو ويُنصب ويُجر بالياء',
          english: 'The sound masculine plural is nominative with waw (-uuna) and accusative/genitive with yaa (-iina).',
          examples: [
            { arabic: 'مُسْلِمُوْنَ / مُسْلِمِيْنَ', translation: 'Muslims (raf\' / nasb-jarr)', irab: 'Sound masc. plural — waw for raf\', yaa for nasb and jarr' },
          ],
        },
        {
          arabic: 'جمع المؤنث السالم يُنصب بالكسرة نيابة عن الفتحة',
          english: 'The sound feminine plural uses kasra for both nasb and jarr (kasra replaces fatha in nasb).',
          examples: [
            { arabic: 'مُسْلِمَاتٌ / مُسْلِمَاتٍ / مُسْلِمَاتٍ', translation: 'Muslim women (raf\' / nasb / jarr)', irab: 'Sound fem. plural — damma for raf\', kasra for both nasb and jarr' },
          ],
        },
        {
          arabic: 'غير المنصرف يُجر بالفتحة نيابة عن الكسرة',
          english: 'Diptotes use fatha in place of kasra for jarr (genitive).',
          examples: [
            { arabic: 'إِبْرَاهِيْمُ / إِبْرَاهِيْمَ / إِبْرَاهِيْمَ', translation: 'Ibrahim (raf\' / nasb / jarr)', irab: 'Diptote — fatha for both nasb and jarr' },
          ],
        },
        {
          arabic: 'المبني لا يتغير آخره',
          english: 'Non-declinable (mabni) words remain unchanged regardless of grammatical position.',
          examples: [
            { arabic: 'هٰذَا', translation: 'this', irab: 'Non-declinable — same form in all positions' },
          ],
        },
      ],
      tables: [
        {
          title: 'Complete Noun I\'rab Table',
          titleAr: 'جدول إعراب الأسماء',
          headers: ['Type', 'Raf\' (Nominative)', 'Nasb (Accusative)', 'Jarr (Genitive)'],
          rows: [
            ['1. Singular (مُفْرَد)', 'ضَمَّة — كِتَابٌ', 'فَتْحَة — كِتَابًا', 'كَسْرَة — كِتَابٍ'],
            ['2. Broken Plural (جَمْع مُكَسَّر)', 'ضَمَّة — كُتُبٌ', 'فَتْحَة — كُتُبًا', 'كَسْرَة — كُتُبٍ'],
            ['3. Dual (مُثَنَّى)', 'انِ — مُسْلِمَانِ', 'يْنِ — مُسْلِمَيْنِ', 'يْنِ — مُسْلِمَيْنِ'],
            ['4. Sound Masc. Plural (جَمْع مُذَكَّر سَالِم)', 'وْنَ — مُسْلِمُوْنَ', 'يْنَ — مُسْلِمِيْنَ', 'يْنَ — مُسْلِمِيْنَ'],
            ['5. Sound Fem. Plural (جَمْع مُؤَنَّث سَالِم)', 'اتٌ — مُسْلِمَاتٌ', 'اتٍ — مُسْلِمَاتٍ', 'اتٍ — مُسْلِمَاتٍ'],
            ['6. Diptote (غَيْر مُنْصَرِف)', 'ضَمَّة — إِبْرَاهِيْمُ', 'فَتْحَة — إِبْرَاهِيْمَ', 'فَتْحَة — إِبْرَاهِيْمَ'],
            ['Non-declinable (مَبْنِيّ)', 'unchanged — هٰذَا', 'unchanged — هٰذَا', 'unchanged — هٰذَا'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 1, pp. 24-28',
    },
  ],
  relatedTopicIds: ['number', 'diptotes', 'definite-indefinite', 'verb-irab'],
  tags: ['i\'rab', 'noun i\'rab', 'case endings', 'raf\'', 'nasb', 'jarr', 'nominative', 'accusative', 'genitive', 'mu\'rab', 'mabni', 'singular', 'dual', 'plural', 'five nouns', 'sound plural'],
};

export const diptotes: NahwTopic = {
  id: 'diptotes',
  titleAr: 'غير المنصرف',
  titleEn: 'Diptotes',
  transliteration: 'Ghayr Munsarif',
  categoryId: 'words',
  subcategoryId: 'noun-characteristics',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Diptotes (ghayr munsarif) are special nouns that do not take kasra or tanween. There are three categories: certain names, certain broken plural patterns, and certain adjective patterns.',
      body: `## Diptotes (غَيْرُ مُنْصَرِفٍ — Partially-Declinable Nouns)

These special nouns do **not** take كَسْرَة or تَنْوِيْن. They use **فَتْحَة** in place of **كَسْرَة** for the genitive case. There are three categories:

### 1. Names

Five types of names are غَيْر مُنْصَرِف:

1. **Non-Arabic names** — e.g. **إِبْرَاهِيْمُ** (Ibrahim)
2. **Feminine names** — e.g. **آمِنَةُ** (Amina); includes masculine names ending in ة, e.g. **حَمْزَةُ** (Hamza)
3. **Names in the pattern of a verb** — e.g. **أَحْمَدُ** (Ahmad)
4. **Names in the pattern of فُعَلُ** — e.g. **عُمَرُ** (Umar)
5. **Names ending in انْ** — e.g. **عُثْمَانُ** (Uthman)

**Mnemonic:** The great grandfather of the Prophet (إِبْرَاهِيْمُ), his mother (آمِنَةُ), his name (أَحْمَدُ), his second Khalif (عُمَرُ), and his third Khalif (عُثْمَانُ).

**Exception:** Six prophet names are **not** diptotes (they are fully declinable):
> **نُوْحٌ، شُعَيْبٌ، هُوْدٌ، صَالِحٌ، لُوْطٌ، مُحَمَّدٌ**

### 2. Plurals

Broken plurals with certain patterns are غَيْر مُنْصَرِف:
> **أَنْبِيَاءُ** (prophets), **عُلَمَاءُ** (scholars), **أَشْيَاءُ** (things), **مَدَارِسُ** (schools), **قَرَاطِيْسُ** (papers)

**Mnemonic:** The **أَنْبِيَاءُ** (prophets) passed on knowledge to the **عُلَمَاءُ** (scholars) who taught **أَشْيَاءُ** (things) in **مَدَارِسُ** (schools) using **قَرَاطِيْسُ** (papers).

### 3. Adjectives

Adjectives in the pattern of **أَفْعَلُ** and **فَعْلَانُ** are غَيْر مُنْصَرِف:
> **أَحْمَرُ** (red) / **غَضْبَانُ** (angry)`,
      rules: [
        {
          arabic: 'غير المنصرف لا يقبل التنوين ولا الكسرة',
          english: 'Diptotes do not accept tanween or kasra. They take fatha in place of kasra for the genitive.',
          examples: [
            { arabic: 'مَرَرْتُ بِإِبْرَاهِيْمَ', translation: 'I passed by Ibrahim', irab: 'إِبْرَاهِيْمَ: majrur with fatha (not kasra)' },
          ],
        },
        {
          arabic: 'خمسة أنواع من الأسماء غير منصرفة',
          english: 'Five types of names are diptotes: non-Arabic, feminine, verb-patterned, fu\'al-patterned, and ending in -aan.',
          examples: [
            { arabic: 'إِبْرَاهِيْمُ', translation: 'Ibrahim', irab: 'Non-Arabic name — diptote' },
            { arabic: 'آمِنَةُ', translation: 'Amina', irab: 'Feminine name — diptote' },
            { arabic: 'أَحْمَدُ', translation: 'Ahmad', irab: 'Verb-patterned name — diptote' },
            { arabic: 'عُمَرُ', translation: 'Umar', irab: 'Fu\'al-patterned name — diptote' },
            { arabic: 'عُثْمَانُ', translation: 'Uthman', irab: 'Name ending in -aan — diptote' },
          ],
        },
        {
          arabic: 'بعض الجموع المكسرة غير منصرفة',
          english: 'Certain broken plural patterns are diptotes.',
          examples: [
            { arabic: 'أَنْبِيَاءُ', translation: 'prophets', irab: 'Broken plural — diptote' },
            { arabic: 'مَدَارِسُ', translation: 'schools', irab: 'Broken plural — diptote' },
          ],
        },
        {
          arabic: 'الصفات على وزن أَفْعَل وفَعْلَان غير منصرفة',
          english: 'Adjectives in the patterns af\'al and fa\'laan are diptotes.',
          examples: [
            { arabic: 'أَحْمَرُ', translation: 'red', irab: 'Af\'al pattern adjective — diptote' },
            { arabic: 'غَضْبَانُ', translation: 'angry', irab: 'Fa\'laan pattern adjective — diptote' },
          ],
        },
      ],
      tables: [
        {
          title: 'Categories of Diptotes',
          titleAr: 'أنواع غير المنصرف',
          headers: ['Category', 'Sub-type', 'Example', 'Meaning'],
          rows: [
            ['Names', 'Non-Arabic', 'إِبْرَاهِيْمُ', 'Ibrahim'],
            ['Names', 'Feminine', 'آمِنَةُ / حَمْزَةُ', 'Amina / Hamza'],
            ['Names', 'Verb-patterned', 'أَحْمَدُ', 'Ahmad'],
            ['Names', 'Fu\'al pattern', 'عُمَرُ', 'Umar'],
            ['Names', 'Ending in -aan', 'عُثْمَانُ', 'Uthman'],
            ['Plurals', 'Broken plurals', 'أَنْبِيَاءُ / مَدَارِسُ', 'prophets / schools'],
            ['Adjectives', 'Af\'al pattern', 'أَحْمَرُ', 'red'],
            ['Adjectives', 'Fa\'laan pattern', 'غَضْبَانُ', 'angry'],
          ],
        },
        {
          title: 'Diptote I\'rab Signs',
          titleAr: 'علامات إعراب غير المنصرف',
          headers: ['State', 'Sign', 'Example'],
          rows: [
            ['Raf\' (Nominative)', 'ضَمَّة (no tanween)', 'إِبْرَاهِيْمُ'],
            ['Nasb (Accusative)', 'فَتْحَة (no tanween)', 'إِبْرَاهِيْمَ'],
            ['Jarr (Genitive)', 'فَتْحَة (replaces kasra)', 'إِبْرَاهِيْمَ'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 1, pp. 28-30',
    },
  ],
  relatedTopicIds: ['noun-irab', 'number', 'definite-indefinite'],
  tags: ['diptotes', 'ghayr munsarif', 'partially declinable', 'tanween', 'kasra', 'names', 'broken plural', 'adjective pattern'],
};
