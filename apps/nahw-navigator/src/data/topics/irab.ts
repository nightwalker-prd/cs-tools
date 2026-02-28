import type { NahwTopic } from '../types';

export const irabSigns: NahwTopic = {
  id: 'irab-signs',
  titleAr: 'علامات الإعراب',
  titleEn: "I'rab Signs",
  transliteration: "Alaamaat al-I'raab",
  categoryId: 'irab',
  subcategoryId: 'irab-signs',
  levels: [
    {
      difficulty: 'beginner',
      summary: "I'rab signs are the markers that appear at the end of words to indicate their grammatical function. There are two categories: vowel markers (haraka) and letter markers (harf).",
      body: `## Signs of I'rab (علامات الإعراب)

I'rab is the change that occurs at the end of a word due to different grammatical agents (عوامل). The signs fall into two categories:

### 1. Vowel Markers (الحركة)
- **ضَمَّة** (damma) → nominative
- **فَتْحَة** (fatha) → accusative
- **كَسْرَة** (kasra) → genitive

### 2. Letter Markers (الحرف)
- **واو** (waw) → nominative (five nouns, sound masc. plural)
- **ألف** (alif) → nominative (dual), accusative (five nouns)
- **ياء** (ya') → genitive/accusative (dual, sound masc. plural, five nouns)
- **نون** (nun) → nominative of the five verb forms`,
      rules: [
        {
          arabic: 'الإعراب يظهر في آخر الكلمة',
          english: "I'rab markers appear at the end of words to indicate their grammatical role.",
        },
        {
          arabic: 'الأصل في الإعراب الحركات',
          english: 'The default i\'rab signs are vowel markers; letter markers are for special categories.',
        },
      ],
      tables: [
        {
          title: "Noun I'rab with Vowels",
          titleAr: 'إعراب الاسم بالحركات',
          headers: ['Category', 'Nominative', 'Accusative', 'Genitive'],
          rows: [
            ['Regular Singular', 'ضَمَّة (الرَّسُولُ)', 'فَتْحَة (الرَّسُولَ)', 'كَسْرَة (الرَّسُولِ)'],
            ['Broken Plural', 'ضَمَّة (كُتُبٌ)', 'فَتْحَة (كُتُبًا)', 'كَسْرَة (كُتُبٍ)'],
            ['Diptote (non-decl.)', 'ضَمَّة (أَحْمَدُ)', 'فَتْحَة (أَحْمَدَ)', 'فَتْحَة (أَحْمَدَ)'],
            ['Sound Fem. Plural', 'ضَمَّة (آيَاتٌ)', 'كَسْرَة (آيَاتٍ)', 'كَسْرَة (آيَاتٍ)'],
          ],
        },
        {
          title: "Noun I'rab with Letters",
          titleAr: 'إعراب الاسم بالحروف',
          headers: ['Category', 'Nominative', 'Accusative', 'Genitive'],
          rows: [
            ['Five Nouns', 'واو (أَبُوهُ)', 'ألف (أَبَاهُ)', 'ياء (أَبِيهِ)'],
            ['Dual', 'ألف (الوَالِدَانِ)', 'ياء (الوَالِدَيْنِ)', 'ياء (الوَالِدَيْنِ)'],
            ['Sound Masc. Plural', 'واو (المُرْسَلُونَ)', 'ياء (المُرْسَلِينَ)', 'ياء (المُرْسَلِينَ)'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 3',
    },
    {
      difficulty: 'intermediate',
      summary: "Beyond explicit (lafzi) i'rab, there is estimated (taqdiri) i'rab for words ending in alif/ya'/waw where the vowel cannot appear, and positional (mahalli) i'rab for indeclinable words like pronouns and demonstratives.",
      body: `## Three Types of I'rab

### 1. Explicit I'rab (الإعراب اللفظي)
The case marker is **visible** on the word. This is the default.
> يَجْتَهِدُ المُؤْمِنُ فِي الخَيْرِ

### 2. Estimated I'rab (الإعراب التقديري)
The case marker is **implied** but cannot appear due to the word's ending:

**Maqsur nouns** (ending in ألف): All three markers estimated
> يَسْعَى الفَتَى إِلَى الهُدَى

**Manqus nouns** (ending in ياء): Damma and kasra estimated, fatha visible
> جَاءَ القَاضِي (estimated damma)، رَأَيْتُ القَاضِيَ (visible fatha)

**Nouns with ya' mutakallim**: Markers estimated due to obligatory kasra before ي
> هَذَا كِتَابِي (estimated damma on the ba')

### 3. Positional I'rab (الإعراب المحلي)
For **indeclinable** words — pronouns, demonstratives, relative pronouns, some adverbs. The word doesn't change form but occupies a grammatical position.
> أَنْتَ عَالِمٌ — أَنْتَ is mubtada' (position = nominative) but the word itself doesn't show markers`,
      rules: [
        {
          arabic: 'الاسم المقصور تُقَدَّر عليه جميع الحركات',
          english: 'On maqsur nouns (ending in alif), all three case markers are estimated.',
          examples: [
            { arabic: 'جَاءَ الفَتَى', translation: 'The young man came', irab: 'الفَتَى: fa\'il, estimated damma on the alif' },
          ],
        },
        {
          arabic: 'المبني له إعراب محلي',
          english: 'Indeclinable words have positional (mahalli) i\'rab — they occupy a grammatical position without visible markers.',
          examples: [
            { arabic: 'هَذَا كِتَابٌ', translation: 'This is a book', irab: 'هَذَا: mubtada\' — positionally nominative (مبني في محل رفع)' },
          ],
        },
      ],
      tables: [
        {
          title: "Types of I'rab",
          titleAr: 'أنواع الإعراب',
          headers: ['Type', 'Arabic', 'When Used', 'Example'],
          rows: [
            ['Explicit', 'اللفظي', 'Markers visible on the word', 'المُؤْمِنُ / المُؤْمِنَ / المُؤْمِنِ'],
            ['Estimated', 'التقديري', 'Words ending in alif/ya\'', 'الفَتَى / القَاضِي'],
            ['Positional', 'المحلي', 'Indeclinable words', 'هَذَا / أَنْتَ / الَّذِي'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Book 1',
    },
    {
      difficulty: 'advanced',
      summary: "Advanced i'rab study covers the three types in depth: conditions for estimated markers, sub-categories of positional i'rab, verb i'rab (including the five verb forms), and the interplay between i'rab and sentence meaning.",
      body: `## Advanced I'rab Study

### Verb I'rab
The present tense verb (المضارع) is the only verb that takes i'rab:

**Explicit i'rab:**
- Sound-ending: ضمة / فتحة / سكون (نَطْمَعُ / أَنْ يَغْفِرَ / لَمْ نَقْنَطْ)
- Five verb forms: نون / حذف النون (يَعْمَلُونَ / لَنْ يَعْمَلُوا / لَمْ يَعْمَلُوا)

**Estimated i'rab:**
- Ending in waw/ya': Estimated damma, visible fatha, deletion for jazm (يَدْعُو / أَنْ يَهْدِيَ / لَمْ يَلْهُ)
- Ending in alif: All estimated except jazm by deletion (يَسْعَى / أَنْ يَرْضَى / لَمْ يَنْسَ)

**Positional i'rab:**
- With nun al-niswa: تَسْأَلْنَ — indeclinable, positionally raf'/nasb/jazm
- With emphatic nun: لَأَسْأَلَنَّ — indeclinable, positionally nasb

### The Relationship Between I'rab and Meaning
I'rab is not merely a grammatical formality — it **determines meaning**:
> مَا أَحْسَنَ زَيْدًا — What made Zayd good? (interrogative + verb)
> مَا أَحْسَنَ زَيْدًا! — How good Zayd is! (exclamation)
> مَا أَحْسَنُ زَيْدٍ — The good quality of Zayd (noun construction)

The same letters produce three different meanings based on i'rab.`,
      rules: [
        {
          arabic: 'المضارع هو الفعل الوحيد المعرب',
          english: 'The present tense (mudari\') is the only verb type that takes i\'rab.',
        },
        {
          arabic: 'الإعراب يميز المعنى',
          english: "I'rab distinguishes meaning — the same sequence of letters can have different meanings based on case endings.",
          examples: [
            { arabic: 'مَا أَحْسَنَ زَيْدًا!', translation: 'How good Zayd is! (exclamation)' },
            { arabic: 'مَا أَحْسَنَ زَيْدًا؟', translation: 'What made Zayd good? (question)' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 1',
    },
  ],
  relatedTopicIds: ['five-nouns', 'sound-plurals-dual'],
  tags: ['i\'rab', 'case ending', 'inflection', 'damma', 'fatha', 'kasra', 'signs', 'markers'],
};

export const fiveNouns: NahwTopic = {
  id: 'five-nouns',
  titleAr: 'الأسماء الخمسة',
  titleEn: 'The Five Nouns',
  transliteration: 'al-Asmaa\' al-Khamsa',
  categoryId: 'irab',
  subcategoryId: 'special-irab',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The five nouns are special nouns that show their i\'rab with letters instead of vowels: أَبٌ (father), أَخٌ (brother), حَمٌ (father-in-law), فُوٌ (mouth), ذُو (possessor). They use waw for nominative, alif for accusative, and ya\' for genitive.',
      body: `## The Five Nouns (الأسماء الخمسة)

These five nouns are unique because they show their grammatical case with **letters** instead of the usual short vowels.

### The Five Nouns
1. **أَبٌ** (ab) — father
2. **أَخٌ** (akh) — brother
3. **حَمٌ** (ham) — father-in-law
4. **فُوٌ** (fu) — mouth
5. **ذُو** (dhu) — possessor of`,
      rules: [
        {
          arabic: 'الأسماء الخمسة تُرفع بالواو وتُنصب بالألف وتُجر بالياء',
          english: 'The five nouns are raised with waw, put in accusative with alif, and lowered with ya\'.',
          examples: [
            { arabic: 'جَاءَ أَبُوكَ', translation: 'Your father came', irab: 'أَبُوكَ: marfu\' with waw' },
            { arabic: 'رَأَيْتُ أَبَاكَ', translation: 'I saw your father', irab: 'أَبَاكَ: mansub with alif' },
            { arabic: 'مَرَرْتُ بِأَبِيكَ', translation: 'I passed by your father', irab: 'أَبِيكَ: majrur with ya\'' },
          ],
        },
      ],
      tables: [
        {
          title: 'Five Nouns I\'rab',
          titleAr: 'إعراب الأسماء الخمسة',
          headers: ['Noun', 'Nominative (واو)', 'Accusative (ألف)', 'Genitive (ياء)'],
          rows: [
            ['Father', 'أَبُوهُ', 'أَبَاهُ', 'أَبِيهِ'],
            ['Brother', 'أَخُوهُ', 'أَخَاهُ', 'أَخِيهِ'],
            ['Father-in-law', 'حَمُوهَا', 'حَمَاهَا', 'حَمِيهَا'],
            ['Mouth', 'فُوهُ', 'فَاهُ', 'فِيهِ'],
            ['Possessor', 'ذُو عِلْمٍ', 'ذَا عِلْمٍ', 'ذِي عِلْمٍ'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 3',
    },
    {
      difficulty: 'intermediate',
      summary: 'The five nouns require specific conditions to be declined with letters: they must be singular, annexed (mudaf), and the annexation must not be to ya\' al-mutakallim. When these conditions are not met, they decline normally with vowels.',
      body: `## Conditions for the Five Nouns

The five nouns only decline with letters when **all three conditions** are met:

### Condition 1: Must be Singular
If dual or plural, normal rules apply:
- أَبَوَانِ (dual) — declines with alif/ya' (dual rules)
- آبَاءٌ (plural) — declines with vowels (broken plural rules)

### Condition 2: Must be Annexed (مضاف)
If not annexed, they decline with vowels:
- هَذَا أَبٌ (this is a father) — damma, not waw

### Condition 3: Annexation Not to Ya' al-Mutakallim
If annexed to "my" (ي), estimated i'rab:
- هَذَا أَبِي (this is my father) — estimated damma

### Special Notes on ذُو
- ذُو is always annexed (you can't say ذُو alone)
- It means "possessor of": ذُو عِلْمٍ = possessor of knowledge
- The feminine is ذَاتُ: ذَاتُ خُلُقٍ = a woman of character`,
      rules: [
        {
          arabic: 'شروط إعراب الأسماء الخمسة بالحروف',
          english: 'The five nouns require three conditions for letter-based i\'rab: singular, annexed, and not annexed to ya\' al-mutakallim.',
        },
        {
          arabic: 'ذُو ملازمة للإضافة',
          english: 'ذُو is always annexed and always followed by a noun indicating what is possessed.',
          examples: [
            { arabic: 'إِنَّ اللهَ ذُو فَضْلٍ عَظِيمٍ', translation: 'Indeed Allah is the possessor of great bounty', source: 'Al-Baqarah 2:105' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Book 1',
    },
    {
      difficulty: 'advanced',
      summary: 'The scholarly debate on whether there are 5 or 6 nouns (some add هَنٌ - a thing/possession), enforcement of the three conditions, dialectal differences in declining these nouns, and special cases where these nouns are declined with vowels instead of letters.',
      body: `## Advanced Study of the Five Nouns

### 1. Five vs. Six Debate
Some grammarians add **هَنٌ** (a thing) as the 6th noun:
- هَنُوكَ, هَنَاكَ, هَنِيكَ — but it rarely appears in full form
- Most scholars keep it at 5 and note هَنٌ is weak/rare

### 2. Strictness of Conditions
- **Must be singular:** أَبَوَانِ (dual) → normal dual rules
- **Must be mudaf:** أَبٌ (not mudaf) → normal vowel markers
- **Must not be mudaf to ياء المتكلم:** أَبِي → estimated vowels

### 3. Dialectal Differences
- **Hejazi dialect:** full letter i'rab (standard Arabic follows this)
- **Tamimi dialect:** أَبُكَ/أَبِكَ/أَبَكَ — shortened forms (qasr)
- **Some dialects:** always kasra — أَبِكَ in all three cases (naqis)

### 4. فُوٌ — Special Case
Only declined with letters when the **مِيم is removed** → فُوهُ, فَاهُ, فِيهِ.
With the mim kept: فَمٌ, فَمُهُ — regular vowel i'rab.

### 5. ذُو as a Relative Pronoun
In Tayy dialect, ذُو functions as a relative pronoun — different from the standard ذُو meaning "possessor."`,
      rules: [
        {
          arabic: 'اختلف النحاة في عدد الأسماء: خمسة أو ستة بإضافة هَنٌ',
          english: 'Grammarians debate whether there are 5 or 6 special nouns — some include هَنٌ (a thing/possession) as the 6th, though its usage is rare.',
          examples: [
            { arabic: 'هَنُوكَ مَوْجُودٌ', translation: 'Your thing is present', irab: 'هَنُوكَ: marfu\' with waw (if treated as 6th noun)' },
          ],
        },
        {
          arabic: 'فُوٌ لا تُعرب بالحروف إلا إذا حُذفت الميم',
          english: 'فُوٌ (mouth) is only declined with letters when the mim is removed. When the mim is kept (فَم), it follows normal vowel i\'rab.',
          examples: [
            { arabic: 'نَظَّفْ فَاكَ', translation: 'Clean your mouth', irab: 'فَاكَ: mansub with alif (mim removed → letter i\'rab)' },
            { arabic: 'نَظَّفْ فَمَكَ', translation: 'Clean your mouth', irab: 'فَمَكَ: mansub with fatha (mim kept → vowel i\'rab)' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Parts 9-10',
    },
  ],
  relatedTopicIds: ['irab-signs', 'sound-plurals-dual'],
  tags: ['five nouns', 'asmaa khamsa', 'abu', 'akhu', 'dhu', 'fu', 'hamu'],
};

export const soundPluralsDual: NahwTopic = {
  id: 'sound-plurals-dual',
  titleAr: 'الجمع السالم والمثنى',
  titleEn: 'Sound Plurals & Dual',
  transliteration: 'al-Jam\' as-Saalim wa al-Muthanna',
  categoryId: 'irab',
  subcategoryId: 'special-irab',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Sound masculine plural (جمع المذكر السالم) uses waw/ya\' for i\'rab. Sound feminine plural (جمع المؤنث السالم) uses damma/kasra. The dual (المثنى) uses alif/ya\'.',
      body: `## Sound Plurals and the Dual

These categories use special i'rab markers instead of the regular short vowels.

### Sound Masculine Plural (جمع المذكر السالم)
Formed by adding ـُونَ (nominative) or ـِينَ (accusative/genitive):
- المُسْلِمُونَ / المُسْلِمِينَ

### Sound Feminine Plural (جمع المؤنث السالم)
Formed by adding ـَاتٌ. Uses kasra instead of fatha for accusative:
- المُسْلِمَاتُ / المُسْلِمَاتِ (accusative and genitive both with kasra)

### The Dual (المثنى)
Formed by adding ـَانِ (nominative) or ـَيْنِ (accusative/genitive):
- المُسْلِمَانِ / المُسْلِمَيْنِ`,
      rules: [
        {
          arabic: 'جمع المذكر السالم يُرفع بالواو ويُنصب ويُجر بالياء',
          english: 'Sound masculine plural: nominative with waw, accusative and genitive with ya\'.',
          examples: [
            { arabic: 'جَاءَ المُسْلِمُونَ', translation: 'The Muslims came', irab: 'المُسْلِمُونَ: marfu\' with waw' },
            { arabic: 'رَأَيْتُ المُسْلِمِينَ', translation: 'I saw the Muslims', irab: 'المُسْلِمِينَ: mansub with ya\'' },
          ],
        },
        {
          arabic: 'جمع المؤنث السالم يُنصب بالكسرة',
          english: 'Sound feminine plural uses kasra (not fatha) for the accusative case.',
          examples: [
            { arabic: 'رَأَيْتُ المُسْلِمَاتِ', translation: 'I saw the Muslim women', irab: 'المُسْلِمَاتِ: mansub with kasra (instead of fatha)' },
          ],
        },
        {
          arabic: 'المثنى يُرفع بالألف ويُنصب ويُجر بالياء',
          english: 'The dual: nominative with alif, accusative and genitive with ya\'.',
          examples: [
            { arabic: 'جَاءَ الوَالِدَانِ', translation: 'The two parents came', irab: 'الوَالِدَانِ: marfu\' with alif' },
            { arabic: 'أَكْرَمْتُ الوَالِدَيْنِ', translation: 'I honored the two parents', irab: 'الوَالِدَيْنِ: mansub with ya\'' },
          ],
        },
      ],
      tables: [
        {
          title: 'Special I\'rab Categories',
          titleAr: 'إعراب الجموع والمثنى',
          headers: ['Category', 'Nominative', 'Accusative', 'Genitive'],
          rows: [
            ['Sound Masc. Pl.', 'واو (-ونَ)', 'ياء (-ينَ)', 'ياء (-ينَ)'],
            ['Sound Fem. Pl.', 'ضمة (-اتُ)', 'كسرة (-اتِ)', 'كسرة (-اتِ)'],
            ['Dual', 'ألف (-انِ)', 'ياء (-يْنِ)', 'ياء (-يْنِ)'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 3',
    },
    {
      difficulty: 'intermediate',
      summary: 'Sound masculine plural has conditions: it must be for rational male beings with specific word patterns. The nun of the dual and sound masculine plural is dropped when annexed (mudaf). The five verb forms follow the same pattern as the dual and sound masculine plural.',
      body: `## Intermediate Study

### Conditions for Sound Masculine Plural
Not every masculine noun can form a sound masculine plural. It must be:
1. A proper noun or adjective
2. For rational male beings
3. Free from feminine markers and compound structures

### Dropping the Nun (حذف النون)
When the dual or sound masculine plural is **annexed** (mudaf), the nun is dropped:
- مُعَلِّمُو المَدْرَسَةِ (the school's teachers) — not مُعَلِّمُونَ
- وَالِدَا الطِّفْلِ (the child's parents) — not وَالِدَانِ

### The Five Verb Forms (الأفعال الخمسة)
These verb forms follow the same pattern:
يَفْعَلَانِ، تَفْعَلَانِ، يَفْعَلُونَ، تَفْعَلُونَ، تَفْعَلِينَ

- **Nominative**: Presence of nun (يَعْمَلُونَ)
- **Accusative/Jussive**: Deletion of nun (لَنْ يَعْمَلُوا / لَمْ يَعْمَلُوا)`,
      rules: [
        {
          arabic: 'تُحذف نون المثنى والجمع عند الإضافة',
          english: 'The nun of the dual and sound masculine plural is dropped when the word is annexed.',
          examples: [
            { arabic: 'مُعَلِّمُو المَدْرَسَةِ', translation: 'The school\'s teachers', irab: 'Nun dropped due to idafa' },
          ],
        },
        {
          arabic: 'الأفعال الخمسة ترفع بثبوت النون',
          english: 'The five verb forms are nominative with the presence of nun, and accusative/jussive with its deletion.',
          examples: [
            { arabic: 'الطُّلَّابُ يَدْرُسُونَ', translation: 'The students study', irab: 'يَدْرُسُونَ: marfu\' — nun is present' },
            { arabic: 'لَنْ يَتْرُكُوا الصَّلَاةَ', translation: 'They will not abandon prayer', irab: 'يَتْرُكُوا: mansub — nun is dropped' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Book 1',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study covers words that look like sound masculine plurals but aren\'t (and therefore don\'t follow its i\'rab rules), the detailed conditions for what can form a sound masculine plural, and the five verb forms (الأفعال الخمسة) with their complete i\'rab rules.',
      body: `## Advanced Study of Sound Plurals and Dual

### 1. Words That Look Like Sound Masculine Plural but Aren't
a. **أُولُو** (possessors — irregular): أُولُو عِلْمٍ — looks like sound plural but is actually a noun meaning "possessors of"
b. **عِلِّيُّونَ** (a place in Paradise): looks like sound plural but is a proper noun
c. **سِنُونَ** (years) and **أَرَضُونَ** (lands): adopt sound plural form but their singular is not rational male
d. **عَالَمُونَ:** treated as sound plural despite عَالَم not being an adjective

### 2. Conditions for Sound Masculine Plural (Strict)
a. Must be a **proper noun of a rational male** (عَلَم لمذكر عاقل): مُحَمَّدُونَ
b. Or an **adjective for a rational male** (صفة لمذكر عاقل): مُسْلِمُونَ
c. Cannot have **ta' marbouta:** طَلْحَةُ → لا يُقال طَلْحَتُونَ
d. Cannot be a **compound name:** عَبْدُ اللهِ → لا يُقال عَبْدُاللهُونَ

### 3. الأفعال الخمسة (Five Verb Forms) Complete Rules
a. **The five:** يَفْعَلَانِ, تَفْعَلَانِ, يَفْعَلُونَ, تَفْعَلُونَ, تَفْعَلِينَ
b. **Raf':** presence of nun → يَكْتُبَانِ, يَكْتُبُونَ, تَكْتُبِينَ
c. **Nasb:** deletion of nun → لَنْ يَكْتُبَا, لَنْ يَكْتُبُوا, لَنْ تَكْتُبِي
d. **Jazm:** deletion of nun → لَمْ يَكْتُبَا, لَمْ يَكْتُبُوا, لَمْ تَكْتُبِي
e. Called "five" because they share 5 conjugation patterns (2 dual + 2 masculine plural + 1 feminine singular)

### 4. Sound Feminine Plural Exceptions
Words with ta' marbouta that are not truly feminine → حَمَّامَات (baths), إِسْطَبْلَات (stables) — same i'rab but not truly feminine`,
      rules: [
        {
          arabic: 'ليس كل ما جُمع بالواو والنون جمع مذكر سالم',
          english: 'Not every word ending in ون/ين is a true sound masculine plural — some words adopt this form irregularly.',
          examples: [
            { arabic: 'هَؤُلَاءِ أُولُو عِلْمٍ', translation: 'These are possessors of knowledge', irab: 'أُولُو: looks like sound masculine plural but is actually a special noun (الأسماء الستة pattern)' },
            { arabic: 'سِنُونَ وَأَرَضُونَ', translation: 'years and lands', irab: 'Treated as sound plural in i\'rab despite not meeting the strict conditions' },
          ],
        },
        {
          arabic: 'الأفعال الخمسة ترفع بثبوت النون وتنصب وتجزم بحذفها',
          english: 'The five verb forms are marfu\' with the presence of nun, and mansub/majzum with its deletion — mirroring how sound masculine plurals drop the nun in idafa.',
          examples: [
            { arabic: 'هُمْ يَعْمَلُونَ → لَنْ يَعْمَلُوا → لَمْ يَعْمَلُوا', translation: 'they work → they won\'t work → they didn\'t work', irab: 'raf\': nun present / nasb: nun deleted / jazm: nun deleted' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Parts 9-10',
    },
  ],
  relatedTopicIds: ['irab-signs', 'five-nouns', 'na-t'],
  tags: ['plural', 'dual', 'jam\'', 'muthanna', 'sound plural', 'masculine', 'feminine', 'nun'],
};
