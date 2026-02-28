import type { NahwTopic } from '../types';

export const wordTypes: NahwTopic = {
  id: 'word-types',
  titleAr: 'أقسام الكلمة',
  titleEn: 'Word Types',
  transliteration: 'Aqsaam al-Kalima',
  categoryId: 'introduction',
  subcategoryId: 'word-types',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Arabic words are divided into three categories: nouns (ism), verbs (fi\'l), and particles (harf). Every word in Arabic belongs to one of these three types.',
      body: `## The Three Types of Words

Every word in the Arabic language falls into one of three categories. Understanding this classification is the foundation of Arabic grammar.

### 1. Noun (الاسم - al-Ism)
A noun is a word that indicates a meaning by itself, without being tied to a specific time.

### 2. Verb (الفعل - al-Fi'l)
A verb is a word that indicates a meaning tied to a specific time (past, present, or future).

### 3. Particle (الحرف - al-Harf)
A particle is a word that has no meaning by itself — it only has meaning when combined with other words.`,
      rules: [
        {
          english: 'A noun (ism) indicates a meaning independent of time.',
          examples: [
            { arabic: 'الرَّبُّ', translation: 'the Lord', irab: 'Noun - indicates a being without reference to time' },
            { arabic: 'كِتَابٌ', translation: 'a book', irab: 'Noun - indicates a thing without reference to time' },
          ],
        },
        {
          english: 'A verb (fi\'l) indicates a meaning tied to time — past, present, or command.',
          examples: [
            { arabic: 'عَبَدَ', translation: 'he worshipped (past)' },
            { arabic: 'يَعْبُدُ', translation: 'he worships (present)' },
            { arabic: 'اعْبُدْ', translation: 'worship! (command)' },
          ],
        },
        {
          english: 'A particle (harf) has no independent meaning — it only functions with other words.',
          examples: [
            { arabic: 'فِي', translation: 'in' },
            { arabic: 'إِنَّ', translation: 'indeed' },
            { arabic: 'مِنْ', translation: 'from' },
          ],
        },
      ],
      tables: [
        {
          title: 'The Three Word Types',
          titleAr: 'أقسام الكلمة الثلاثة',
          headers: ['Arabic', 'Type', 'Example', 'Meaning'],
          rows: [
            ['الاسم', 'Noun (Ism)', 'الرَّبُّ', 'the Lord'],
            ['الفعل', 'Verb (Fi\'l)', 'عَبَدَ / يَعْبُدُ / اعْبُدْ', 'worshipped / worships / worship!'],
            ['الحرف', 'Particle (Harf)', 'فِي، إِنَّ', 'in, indeed'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Introduction, Chapter 1',
    },
    {
      difficulty: 'intermediate',
      summary: 'The three word types are distinguished by specific signs. Nouns accept tanween, the definite article (al-), and prepositions. Verbs accept tense markers and subject pronouns. Particles accept neither set of signs.',
      body: `## Distinguishing Word Types

In the intermediate study, we learn the **signs** (علامات) that help identify each word type. This is crucial for grammatical analysis (i'rab).

### Signs of the Noun
A word is a noun if it accepts any of these:
- **Tanween** (nunation): كِتَابٌ، كِتَابًا، كِتَابٍ
- **The definite article** (ال): الكِتَابُ
- **A preposition before it**: فِي الكِتَابِ

### Signs of the Verb
A word is a verb if it accepts:
- **قَدْ** (indeed/already): قَدْ كَتَبَ
- **السِّين / سَوْفَ** (will): سَيَكْتُبُ
- **Subject pronouns**: كَتَبْتُ، كَتَبُوا

### The Particle
Particles accept neither the signs of nouns nor verbs. They are identified by **exclusion** — if a word is neither a noun nor a verb, it is a particle.`,
      rules: [
        {
          arabic: 'علامات الاسم',
          english: 'Signs of nouns: tanween (ـٌ ـً ـٍ), the definite article (ال), and being preceded by a preposition.',
        },
        {
          arabic: 'علامات الفعل',
          english: 'Signs of verbs: accepting qad (قَدْ), future markers (سَ / سَوْفَ), and conjugation with subject pronouns.',
        },
        {
          arabic: 'الحرف لا علامة له',
          english: 'Particles have no distinctive signs — they are identified by exclusion from the other two categories.',
        },
      ],
      tables: [
        {
          title: 'Signs of Each Word Type',
          titleAr: 'علامات أقسام الكلمة',
          headers: ['Word Type', 'Sign', 'Example'],
          rows: [
            ['Noun', 'Tanween (ـٌ)', 'كِتَابٌ'],
            ['Noun', 'Definite article (ال)', 'الكِتَابُ'],
            ['Noun', 'After preposition', 'فِي الكِتَابِ'],
            ['Verb (Past)', 'تاء الفاعل', 'كَتَبْتُ'],
            ['Verb (Present)', 'سَ / سَوْفَ', 'سَيَكْتُبُ'],
            ['Verb (Present)', 'قَدْ', 'قَدْ يَكْتُبُ'],
            ['Particle', 'No sign (by exclusion)', 'فِي، إِنَّ، هَلْ'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Book 1, Introduction',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced word type study covers the detailed signs (علامات) used to identify each word type, scholarly debates on classification boundaries, and the subcategories of particles. Some words are disputed between categories.',
      body: `## Advanced Word Type Classification

### 1. Detailed Signs of the Noun (علامات الاسم)
The noun has 10+ identifying signs, the most famous being:
- **Tanween** (تنوين): كِتَابٌ
- **The definite article** (ال): الكِتَابُ
- **Preposition** (حرف الجر): فِي الكِتَابِ
- **Vocative** (النداء بيَا): يَا رَجُلُ
- **Idafa** (الإضافة): كِتَابُ اللهِ
- **Isnad/predication** (الإسناد): زَيْدٌ قَائِمٌ
- **Being described by na't**: الرَّجُلُ الكَرِيمُ

### 2. Signs of the Verb (علامات الفعل)
- **تاء التأنيث الساكنة** (past tense): قَامَتْ
- **تاء الفاعل** (past tense): كَتَبْتُ
- **ياء المخاطبة** (present tense): تَكْتُبِينَ
- **نون التوكيد** (present/imperative): لَأَكْتُبَنَّ / اكْتُبَنَّ

### 3. The Particle — Identified by Exclusion
The particle has **no positive signs** — it is only identified by the fact that it accepts neither the signs of nouns nor the signs of verbs.

### 4. Scholarly Debates
- Is **اسم الفعل** (verb-like noun, e.g., هَيْهَاتَ) a noun or a verb? Most grammarians classify it as a noun.
- Is **المصدر** (masdar) closer to the verb or the noun? Basran grammarians hold the noun (masdar) is the root from which verbs derive, while Kufan grammarians hold the verb is the root.

### 5. Particle Subcategories
- **عاملة** (governing particles): like إِنَّ — they affect the case of words after them
- **غير عاملة** (non-governing particles): like هَلْ — they don't affect case`,
      rules: [
        {
          arabic: 'للاسم علامات كثيرة أشهرها الجر والتنوين وأل',
          english: 'Nouns have many identifying signs, the most famous being: accepting genitive case, tanween, and the definite article ال.',
          examples: [
            { arabic: 'الكِتَابُ المُفِيدُ', translation: 'The useful book', irab: 'الكِتَابُ: noun — accepts ال, jarr, and tanween (كِتَابٍ)' },
          ],
        },
        {
          arabic: 'اختلف البصريون والكوفيون في أصل الاشتقاق',
          english: 'Basran grammarians hold that the noun (masdar) is the root from which verbs derive, while Kufan grammarians hold the verb is the root.',
          examples: [
            { arabic: 'ضَرَبَ → ضَرْب', translation: 'he struck → striking', irab: 'Basrans: ضَرْب (masdar/noun) is the root. Kufans: ضَرَبَ (verb) is the root.' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 1',
    },
  ],
  relatedTopicIds: ['nominal-sentence', 'verbal-sentence'],
  tags: ['ism', 'fi\'l', 'harf', 'noun', 'verb', 'particle', 'kalima', 'word'],
};

export const nominalSentence: NahwTopic = {
  id: 'nominal-sentence',
  titleAr: 'الجملة الاسمية',
  titleEn: 'Nominal Sentence',
  transliteration: 'al-Jumla al-Ismiyya',
  categoryId: 'introduction',
  subcategoryId: 'sentence-types',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'A nominal sentence (jumla ismiyya) begins with a noun. It consists of a subject (mubtada\') and a predicate (khabar). Example: اللهُ خَالِقُ كُلِّ شَيْءٍ (Allah is the Creator of everything).',
      body: `## The Nominal Sentence

A **nominal sentence** is one that begins with a noun. It has two essential parts:

1. **المُبْتَدَأ (al-Mubtada')** — the subject
2. **الخَبَر (al-Khabar)** — the predicate

The mubtada' is what we are talking about, and the khabar is what we say about it.`,
      rules: [
        {
          arabic: 'الجملة الاسمية تبدأ بالاسم',
          english: 'A nominal sentence begins with a noun (the mubtada\').',
          examples: [
            { arabic: 'اللهُ خَالِقُ كُلِّ شَيْءٍ', translation: 'Allah is the Creator of everything', source: 'Az-Zumar 39:62' },
            { arabic: 'مُحَمَّدٌ رَسُولُ اللهِ', translation: 'Muhammad is the Messenger of Allah' },
          ],
        },
        {
          english: 'Both the mubtada\' and khabar are in the nominative case (marfu\').',
          examples: [
            { arabic: 'اللهُ رَبُّنَا', translation: 'Allah is our Lord', irab: 'اللهُ: mubtada\' marfu\' — رَبُّنَا: khabar marfu\'' },
          ],
        },
      ],
      tables: [
        {
          title: 'Nominal Sentence Structure',
          titleAr: 'تركيب الجملة الاسمية',
          headers: ['Component', 'Arabic Term', 'Case', 'Example'],
          rows: [
            ['Subject', 'المبتدأ', 'Nominative (مرفوع)', 'اللهُ'],
            ['Predicate', 'الخبر', 'Nominative (مرفوع)', 'خَالِقُ كُلِّ شَيْءٍ'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Introduction, Chapter 2',
    },
    {
      difficulty: 'intermediate',
      summary: 'The mubtada\' is raised by the abstract operator of "initiation" (al-ibtida\'). The khabar can be a single word, a phrase, or an entire sentence. When particles like inna or kana enter, the case of the mubtada\' or khabar changes.',
      body: `## Detailed Study of the Nominal Sentence

### The Mubtada' (المبتدأ)
The mubtada' is a noun placed at the beginning of a sentence to form a judgement about it. It is raised (marfu') by the **semantic operator of initiation** (الابتداء).

### Types of Khabar
The khabar (predicate) can take several forms:

1. **Single word**: اللهُ رَحِيمٌ (Allah is Merciful)
2. **Phrase (jar wa majrur)**: الكِتَابُ عَلَى المَكْتَبِ (The book is on the desk)
3. **Verbal sentence**: الطَّالِبُ يَدْرُسُ (The student studies)
4. **Nominal sentence**: الرَّجُلُ أَبُوهُ عَالِمٌ (The man — his father is a scholar)

### Entering of Operators
When operators like كَانَ or إِنَّ enter upon the nominal sentence, the i'rab changes:
- **كَانَ**: keeps mubtada' nominative (its "noun"), puts khabar accusative (its "predicate")
- **إِنَّ**: puts mubtada' accusative (its "noun"), keeps khabar nominative (its "predicate")`,
      rules: [
        {
          arabic: 'الخبر أنواعه أربعة',
          english: 'The khabar can be: (1) a single word, (2) a jar-majrur phrase, (3) a verbal sentence, or (4) a nominal sentence.',
        },
        {
          arabic: 'كان ترفع الاسم وتنصب الخبر',
          english: 'Kana raises its noun (ism) and puts its predicate (khabar) in the accusative.',
        },
        {
          arabic: 'إن تنصب الاسم وترفع الخبر',
          english: 'Inna puts its noun (ism) in the accusative and raises its predicate (khabar).',
        },
      ],
      sourceRef: 'Al-Wusta, Book 1',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced nominal sentence topics include: governed sentences (جملة لها محل من الإعراب) vs. non-governed sentences (لا محل لها), semi-sentences (شبه الجملة), and how sentences receive i\'rab based on their position.',
      body: `## Advanced Nominal Sentence Study

### 1. Sentences with I'rab Position (الجمل التي لها محل من الإعراب)
There are **7 positions** where a sentence occupies a grammatical position:

a. **In place of khabar:** زَيْدٌ يَقْرَأُ (يَقْرَأُ is sentence khabar)
b. **In place of hal:** جَاءَ زَيْدٌ يَرْكَبُ
c. **In place of na't:** جَاءَ رَجُلٌ يَحْمِلُ كِتَابًا
d. **In place of maf'ul bih:** ظَنَنْتُ زَيْدًا يَقُومُ
e. **In place of mudaf ilayhi:** جِئْتُ حِينَ قَامَ زَيْدٌ
f. **As jawab shart with fa:** إِنْ تَجْتَهِدْ فَأَنْتَ نَاجِحٌ
g. **After particles:** إِنَّ زَيْدًا يَقُومُ

### 2. Sentences without I'rab Position (الجمل التي لا محل لها من الإعراب)
There are **7 types** of sentences with no grammatical position:

a. **Opening sentence** (الابتدائية)
b. **Explanatory sentence** (التفسيرية)
c. **Sila of mawsul:** جَاءَ الَّذِي نَجَحَ
d. **Jawab qasam:** وَاللهِ لَأَجْتَهِدَنَّ
e. **Jawab shart without fa (jussive):** إِنْ تَجْتَهِدْ تَنْجَحْ
f. **Parenthetical** (اعتراضية): زَيْدٌ — وَاللهِ — كَرِيمٌ
g. **Continuation** (تابعة لما لا محل لها)

### 3. شبه الجملة (Semi-sentences)
Jar-majrur and dharf constructions that act as predicates:
- الكِتَابُ عَلَى المَكْتَبِ — jar-majrur as khabar
- الطَّالِبُ أَمَامَ المُعَلِّمِ — dharf as khabar`,
      rules: [
        {
          arabic: 'الجمل التي لها محل من الإعراب سبع',
          english: 'There are 7 positions where a sentence occupies a grammatical position (has mahall min al-i\'rab).',
          examples: [
            { arabic: 'زَيْدٌ يَقْرَأُ', translation: 'Zayd reads', irab: 'يَقْرَأُ: verbal sentence in position of khabar (محل رفع)' },
            { arabic: 'جَاءَ رَجُلٌ يَحْمِلُ كِتَابًا', translation: 'A man carrying a book came', irab: 'يَحْمِلُ كِتَابًا: sentence in position of na\'t (محل رفع)' },
          ],
        },
        {
          arabic: 'الجمل التي لا محل لها من الإعراب سبع',
          english: 'There are 7 cases where a sentence has no grammatical position (no mahall min al-i\'rab).',
          examples: [
            { arabic: 'جَاءَ الَّذِي نَجَحَ', translation: 'The one who succeeded came', irab: 'نَجَحَ: sila sentence — no i\'rab position (لا محل لها)' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Parts 1, 7',
    },
  ],
  relatedTopicIds: ['verbal-sentence', 'mubtada-khabar', 'kana-and-sisters', 'inna-and-sisters'],
  tags: ['jumla ismiyya', 'nominal', 'mubtada', 'khabar', 'sentence'],
};

export const verbalSentence: NahwTopic = {
  id: 'verbal-sentence',
  titleAr: 'الجملة الفعلية',
  titleEn: 'Verbal Sentence',
  transliteration: 'al-Jumla al-Fi\'liyya',
  categoryId: 'introduction',
  subcategoryId: 'sentence-types',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'A verbal sentence (jumla fi\'liyya) begins with a verb. It consists of a verb and a subject (fa\'il). Example: خَلَقَ اللهُ كُلَّ شَيْءٍ (Allah created everything).',
      body: `## The Verbal Sentence

A **verbal sentence** is one that begins with a verb. Its essential parts are:

1. **الفِعْل (al-Fi'l)** — the verb
2. **الفَاعِل (al-Fa'il)** — the subject/doer

If the verb is transitive, it also takes an object (maf'ul bih).`,
      rules: [
        {
          arabic: 'الجملة الفعلية تبدأ بالفعل',
          english: 'A verbal sentence begins with a verb followed by its subject (fa\'il).',
          examples: [
            { arabic: 'خَلَقَ اللهُ كُلَّ شَيْءٍ', translation: 'Allah created everything', source: 'Az-Zumar 39:62' },
            { arabic: 'جَاءَ الحَقُّ', translation: 'The truth has come', source: 'Al-Isra 17:81' },
          ],
        },
        {
          english: 'The fa\'il (subject) is always in the nominative case (marfu\').',
          examples: [
            { arabic: 'نَصَرَ اللهُ المُؤْمِنِينَ', translation: 'Allah helped the believers', irab: 'اللهُ: fa\'il marfu\' with damma' },
          ],
        },
      ],
      tables: [
        {
          title: 'Verbal Sentence Structure',
          titleAr: 'تركيب الجملة الفعلية',
          headers: ['Component', 'Arabic Term', 'Case', 'Example'],
          rows: [
            ['Verb', 'الفعل', '—', 'خَلَقَ'],
            ['Subject', 'الفاعل', 'Nominative (مرفوع)', 'اللهُ'],
            ['Object', 'المفعول به', 'Accusative (منصوب)', 'كُلَّ شَيْءٍ'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Introduction, Chapter 2',
    },
    {
      difficulty: 'intermediate',
      summary: 'The verbal sentence has strict word order: verb then fa\'il. The verb always remains singular even when the fa\'il is dual or plural. When the fa\'il is deleted or unknown, a deputy subject (na\'ib al-fa\'il) takes its place in the passive voice.',
      body: `## Detailed Study of the Verbal Sentence

### Word Order
The standard order is: **Verb → Fa'il → Object(s)**

The verb **always remains singular** regardless of whether the fa'il is dual or plural:
- ✓ جَاءَ الرِّجَالُ (The men came) — verb stays singular
- ✗ جَاءُوا الرِّجَالُ — incorrect

### The Passive Voice (المبني للمجهول)
When the fa'il is removed, the verb changes to passive form and the object takes the position of fa'il, called **نَائِبُ الفَاعِل** (deputy subject):
- Active: كَتَبَ الطَّالِبُ الدَّرْسَ (The student wrote the lesson)
- Passive: كُتِبَ الدَّرْسُ (The lesson was written)`,
      rules: [
        {
          arabic: 'الفعل يبقى مفرداً مع الفاعل',
          english: 'The verb remains singular even when the fa\'il is dual or plural.',
          examples: [
            { arabic: 'جَاءَ الطُّلَّابُ', translation: 'The students came', irab: 'جَاءَ: singular verb — الطُّلَّابُ: plural fa\'il' },
          ],
        },
        {
          arabic: 'نائب الفاعل يحل محل الفاعل',
          english: 'In passive voice, the deputy subject (na\'ib al-fa\'il) replaces the fa\'il and takes nominative case.',
          examples: [
            { arabic: 'رُحِمَ التَّائِبُ', translation: 'The repentant was shown mercy', irab: 'التَّائِبُ: na\'ib al-fa\'il marfu\'' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Book 1',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced verbal sentence study covers verb-subject gender agreement rules in detail, the passive voice and its detailed formation patterns, and how verbal sentences can occupy grammatical positions within larger sentences.',
      body: `## Advanced Verbal Sentence Study

### 1. Verb-Subject Agreement Details
a. **Verb before fa'il:** ALWAYS singular, may agree in gender (تاء التأنيث for feminine fa'il)
b. **Ta' al-ta'nith is obligatory** when fa'il is real feminine adjacent to verb: قَامَتْ هِنْدُ
c. **Ta' al-ta'nith is optional** when: fa'il is separated from verb, or fa'il is grammatically feminine (شَمْس، أَرْض)
d. **Collective nouns** (جَمْع تكسير): both masculine and feminine verb allowed

### 2. Passive Voice Detailed Patterns
a. **Past 3-letter:** فُعِلَ (كُتِبَ، قُرِئَ، سُمِعَ)
b. **Past 4-letter+:** ضُمّ الأول وكُسر ما قبل الآخر (أُكْرِمَ، اُسْتُخْرِجَ)
c. **Present 3-letter:** يُفْعَلُ (يُكْتَبُ، يُقْرَأُ)
d. **Present 4-letter+:** ضُمّ الأول وفُتح ما قبل الآخر (يُكْرَمُ، يُسْتَخْرَجُ)
e. **Hollow verbs:** قَالَ → قِيلَ, بَاعَ → بِيعَ (middle vowel changes to kasra)

### 3. Verbal Sentence Placement
a. **As khabar:** المُعَلِّمُ يَشْرَحُ (verbal sentence is khabar of mubtada')
b. **As hal:** جَاءَ الطَّالِبُ يَرْكُضُ
c. **As na't:** رَأَيْتُ رَجُلًا يَبْكِي`,
      rules: [
        {
          arabic: 'يجب تأنيث الفعل إذا كان الفاعل مؤنثًا حقيقيًّا متصلًا',
          english: 'The verb must take ta\' al-ta\'nith when the fa\'il is a real feminine noun directly adjacent to the verb.',
          examples: [
            { arabic: 'قَامَتْ فَاطِمَةُ', translation: 'Fatima stood up', irab: 'قَامَتْ: ta\' al-ta\'nith obligatory — فَاطِمَةُ is real feminine, adjacent' },
            { arabic: 'طَلَعَ/طَلَعَتِ الشَّمْسُ', translation: 'The sun rose', irab: 'ta\' optional — الشَّمْسُ is grammatically feminine, not real feminine' },
          ],
        },
        {
          arabic: 'الأَجْوَفُ في المبني للمجهول تُقلب عينه',
          english: 'In hollow (ajwaf) verbs, the passive voice changes the middle radical to kasra (past) or damma (present).',
          examples: [
            { arabic: 'قَالَ → قِيلَ', translation: 'he said → it was said', irab: 'Hollow verb: middle letter changes in passive' },
            { arabic: 'يَقُولُ → يُقَالُ', translation: 'he says → it is said' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Parts 1, 7',
    },
  ],
  relatedTopicIds: ['nominal-sentence', 'fail', 'transitive-intransitive', 'maf-ul-bih'],
  tags: ['jumla fi\'liyya', 'verbal', 'fa\'il', 'sentence', 'fi\'l'],
};
