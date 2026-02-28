import type { NahwTopic } from '../types';

export const mafUlMutlaq: NahwTopic = {
  id: 'maf-ul-mutlaq',
  titleAr: 'المفعول المطلق',
  titleEn: 'Absolute Object (Maf\'ul Mutlaq)',
  transliteration: 'al-Maf\'ul al-Mutlaq',
  categoryId: 'governed',
  subcategoryId: 'accusative',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The maf\'ul mutlaq (absolute object) is a masdar (verbal noun) from the same root as the verb, placed in the accusative case. It serves three purposes: confirming the action, showing its count, or specifying its type.',
      body: `## The Absolute Object (المفعول المطلق)

The maf'ul mutlaq is a **masdar** (verbal noun) derived from the **same root** as the verb, placed in the **accusative case** (mansub). It reinforces or qualifies the verb's meaning.

### Three Types of Maf'ul Mutlaq

#### 1. Confirming the Action (التأكيد)
Repeats the meaning of the verb for emphasis:
- ضَرَبْتُهُ ضَرْبًا — I struck him (emphatic)

#### 2. Showing Count (العدد)
Indicates how many times the action occurred:
- ضَرَبْتُهُ ضَرْبَتَيْنِ — I struck him twice

#### 3. Specifying Type (النوع)
Describes the manner or quality of the action:
- ضَرَبْتُهُ ضَرْبًا شَدِيدًا — I struck him a severe strike`,
      rules: [
        {
          arabic: 'المفعول المطلق مصدر منصوب',
          english: 'The maf\'ul mutlaq is a masdar in the accusative from the same root as its verb.',
          examples: [
            { arabic: 'اذْكُرُوا اللهَ ذِكْرًا كَثِيرًا', translation: 'Remember Allah with much remembrance', source: 'Al-Ahzab 33:41', irab: 'ذِكْرًا: maf\'ul mutlaq mansub (specifying type)' },
          ],
        },
        {
          english: 'The maf\'ul mutlaq has three functions: confirming the verb (tawkid), showing count (\'adad), or specifying type (naw\').',
          examples: [
            { arabic: 'فَهَزَمُوهُمْ بِإِذْنِ اللهِ', translation: 'He defeated them decisively' },
            { arabic: 'سَجَدْتُ سَجْدَتَيْنِ', translation: 'I prostrated twice', irab: 'سَجْدَتَيْنِ: maf\'ul mutlaq counting' },
          ],
        },
      ],
      tables: [
        {
          title: 'Three Types of Maf\'ul Mutlaq',
          titleAr: 'أنواع المفعول المطلق الثلاثة',
          headers: ['Type', 'Arabic', 'Example', 'Translation'],
          rows: [
            ['Confirming', 'التأكيد', 'ضَرَبْتُهُ ضَرْبًا', 'I struck him (emphatic)'],
            ['Counting', 'العدد', 'ضَرَبْتُهُ ضَرْبَتَيْنِ', 'I struck him twice'],
            ['Specifying', 'النوع', 'ضَرَبْتُهُ ضَرْبًا شَدِيدًا', 'I struck him a severe strike'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 2, Chapter 1',
    },
    {
      difficulty: 'intermediate',
      summary: 'In many cases, a substitute can replace the actual masdar in the maf\'ul mutlaq position. These substitutes include words like كُلّ, بَعْض, synonymous masdars, or demonstrative pronouns. The verb of the maf\'ul mutlaq can also be deleted when understood.',
      body: `## Substitutes for the Masdar in Maf'ul Mutlaq

The actual masdar can be replaced by a substitute (نائب عن المصدر) that serves the same grammatical function:

### 1. كُلّ or بَعْض Added to the Masdar
- ضَرَبْتُهُ كُلَّ الضَّرْبِ — I struck him with every kind of striking

### 2. A Synonym (مرادف)
A masdar from a different root but with a similar meaning:
- قَعَدْتُ جُلُوسًا — I sat a sitting (جُلُوس is a synonym masdar, not from قَعَدَ)

### 3. The Demonstrative Pronoun (اسم الإشارة)
- ضَرَبْتُهُ ذَلِكَ الضَّرْبَ — I struck him that (kind of) striking

### 4. A Number Word
- ضَرَبْتُهُ ثَلَاثَ ضَرَبَاتٍ — I struck him three strikes

### 5. Tool/Instrument Noun
- ضَرَبْتُهُ سَوْطًا — I struck him a whip('s strike)

### Deletion of the Verb
When the context makes the verb clear, it can be deleted:
- صَبْرًا جَمِيلًا — Beautiful patience! (i.e., اصْبِرْ صَبْرًا جَمِيلًا)`,
      rules: [
        {
          arabic: 'ينوب عن المصدر ما يدل عليه',
          english: 'A substitute that indicates the masdar can replace it in the maf\'ul mutlaq position.',
          examples: [
            { arabic: 'ضَرَبْتُهُ كُلَّ الضَّرْبِ', translation: 'I struck him with every kind of striking', irab: 'كُلَّ: substitute for maf\'ul mutlaq, mansub' },
          ],
        },
        {
          arabic: 'قد يُحذف عامل المفعول المطلق',
          english: 'The verb governing the maf\'ul mutlaq may be deleted when the meaning is understood from context.',
          examples: [
            { arabic: 'صَبْرًا جَمِيلًا', translation: 'Beautiful patience! (i.e., be patient with beautiful patience)', irab: 'صَبْرًا: maf\'ul mutlaq, verb اصْبِرْ deleted' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Part 4',
    },
    {
      difficulty: 'advanced',
      summary: 'Scholars debate what exactly operates on the maf\'ul mutlaq — is it the verb alone, the verb and fa\'il together, or the entire clause? The acting masdar (المصدر العامل) can itself serve as the operator. Quranic examples illustrate complex usages.',
      body: `## Advanced Study of the Maf'ul Mutlaq

### Debate on the Operator (العامل)
What grammatical element puts the maf'ul mutlaq in the accusative?

- **Basran view**: The verb alone operates on the maf'ul mutlaq
- **Kufan view**: The verb and fa'il together constitute the operator

### The Masdar as Operator
When the masdar itself governs like a verb, it can take its own maf'ul mutlaq:
- إِطْعَامُهُ إِطْعَامًا — His feeding (was) a (real) feeding

### Deletion of the Verb in Common Expressions
Deletion is extremely common in everyday speech and du'a:
- سُبْحَانَ اللهِ — Glory be to Allah (= أُسَبِّحُ اللهَ تَسْبِيحًا → سُبْحَانَ)
- مَعَاذَ اللهِ — I seek refuge in Allah (= أَعُوذُ بِاللهِ مَعَاذًا)`,
      rules: [
        {
          arabic: 'عامل المفعول المطلق هو الفعل عند البصريين',
          english: 'The Basran grammarians hold that the verb alone is the operator of the maf\'ul mutlaq, while the Kufans include the fa\'il.',
          examples: [
            { arabic: 'فَإِنَّ جَهَنَّمَ جَزَاؤُكُمْ جَزَاءً مَوْفُورًا', translation: 'Indeed Hell will be your recompense — a full recompense', source: 'Al-Isra 17:63' },
          ],
        },
        {
          arabic: 'المصدر قد يعمل عمل الفعل في المفعول المطلق',
          english: 'The masdar can itself act as the operator for another maf\'ul mutlaq, just as a verb would.',
          examples: [
            { arabic: 'سُبْحَانَ اللهِ', translation: 'Glory be to Allah', irab: 'سُبْحَانَ: maf\'ul mutlaq, verb أُسَبِّحُ deleted' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 7',
    },
  ],
  relatedTopicIds: ['maf-ul-bih', 'fail', 'verbal-sentence'],
  tags: ['maf\'ul mutlaq', 'absolute object', 'masdar', 'mansub', 'accusative', 'tawkid'],
};

export const mafUlFihi: NahwTopic = {
  id: 'maf-ul-fihi',
  titleAr: 'المفعول فيه / الظرف',
  titleEn: 'Adverb of Time/Place (Dharf)',
  transliteration: 'al-Maf\'ul fih / adh-Dharf',
  categoryId: 'governed',
  subcategoryId: 'accusative',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The maf\'ul fihi (adverb of time or place) is a noun in the accusative indicating when or where the action occurred. Time adverbs include يَوْم, لَيْلَة, شَهْر, سَنَة. Place adverbs include أَمَام, خَلْف, فَوْق, تَحْت.',
      body: `## The Adverb of Time/Place (المفعول فيه / الظرف)

The maf'ul fihi — also called الظرف (dharf) — is a noun in the **accusative case** (mansub) that indicates **when** or **where** the action of the verb occurred.

### Two Categories of Dharf

#### 1. ظرف الزمان (Adverb of Time)
Indicates when the action happened:
- يَوْم (day), لَيْلَة (night), شَهْر (month), سَنَة (year), سَاعَة (hour), حِين (a time/while)

#### 2. ظرف المكان (Adverb of Place)
Indicates where the action happened:
- أَمَام (in front of), خَلْف (behind), يَمِين (right), شِمَال (left), فَوْق (above), تَحْت (below/under)

Both types are **mansub** (accusative) and indicate the time or place of the verb's action.`,
      rules: [
        {
          arabic: 'الظرف منصوب يدل على زمان الفعل أو مكانه',
          english: 'The dharf is an accusative noun indicating the time or place of the verb\'s action.',
          examples: [
            { arabic: 'صُمْ شَهْرَ رَمَضَانَ', translation: 'Fast the month of Ramadan', irab: 'شَهْرَ: dharf zaman mansub' },
            { arabic: 'جَلَسْتُ أَمَامَ المُعَلِّمِ', translation: 'I sat in front of the teacher', irab: 'أَمَامَ: dharf makan mansub' },
          ],
        },
      ],
      tables: [
        {
          title: 'Common Adverbs',
          titleAr: 'الظروف الشائعة',
          headers: ['Type', 'Arabic', 'Meaning', 'Example'],
          rows: [
            ['Time', 'يَوْم', 'day', 'صُمْتُ يَوْمَ الاثْنَيْنِ'],
            ['Time', 'لَيْلَة', 'night', 'سَهِرْتُ لَيْلَةَ القَدْرِ'],
            ['Time', 'شَهْر', 'month', 'صُمْ شَهْرَ رَمَضَانَ'],
            ['Place', 'أَمَام', 'in front of', 'جَلَسْتُ أَمَامَ المُعَلِّمِ'],
            ['Place', 'فَوْق', 'above', 'الكِتَابُ فَوْقَ المَكْتَبِ'],
            ['Place', 'تَحْت', 'below/under', 'القَلَمُ تَحْتَ الكُرْسِيِّ'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 2, Chapter 1',
    },
    {
      difficulty: 'intermediate',
      summary: 'Adverbs are classified as specific (محدود/مختص) or non-specific (مبهم). Specific adverbs can also function as regular nouns and be preceded by prepositions. When a dharf is preceded by a preposition, it becomes jar-majrur instead.',
      body: `## Intermediate Study of the Dharf

### Classification of Adverbs

#### 1. Specific Adverbs (مختص / محدود)
Limited to a particular time or place:
- يَوْم الجُمُعَة — Friday
- شَهْر رَمَضَان — the month of Ramadan

#### 2. Non-Specific Adverbs (مبهم)
Vague or general time/place words:
- حِين — a time/while
- وَقْت — a time
- مَكَان — a place

### Dharf vs. Jar-Majrur
When a dharf is preceded by a preposition, it is no longer a dharf — it becomes **jar-majrur**:
- صُمْتُ فِي شَهْرِ رَمَضَانَ — I fasted in the month of Ramadan

### Words That Are Only Adverbs
Some words function exclusively as adverbs and are never used otherwise:
- عِنْد — at/near
- لَدُنْ — from (the presence of)
- قَطُّ — ever (in the past)
- إِذْ — when (past)
- إِذَا — when (future/conditional)`,
      rules: [
        {
          arabic: 'الظرف المختص يجوز جره بالحرف',
          english: 'A specific (limited) adverb can be preceded by a preposition, converting it from dharf to jar-majrur.',
          examples: [
            { arabic: 'صُمْتُ فِي شَهْرِ رَمَضَانَ', translation: 'I fasted in the month of Ramadan', irab: 'فِي شَهْرِ: jar-majrur (not dharf anymore)' },
          ],
        },
        {
          arabic: 'الظرف المبهم لا يخرج عن الظرفية غالبًا',
          english: 'Non-specific (vague) adverbs typically remain adverbs and rarely function as regular nouns.',
          examples: [
            { arabic: 'جِئْتُ حِينَ جَاءَ المُعَلِّمُ', translation: 'I came when the teacher came', irab: 'حِينَ: dharf zaman mansub (non-specific)' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Part 4',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced classification distinguishes between adverbs that are exclusively adverbial (الظرف اللازم) and those that can flexibly function as subjects, objects, or other positions (الظرف المتصرف). Detailed rules govern the operator of the dharf and when adverbs can be fronted.',
      body: `## Advanced Study of the Dharf

### المتصرف (Flexible Adverbs)
Can be used as a dharf or as a regular noun in other grammatical positions:
- يَوْم, لَيْلَة, مَكَان
- يَوْمُ الجُمُعَةِ مُبَارَكٌ — Friday is blessed (يَوْمُ used as mubtada', not dharf)

### غير المتصرف (Non-Flexible Adverbs)
Can only function as a dharf (mansub) or with a preposition (majrur), never as subject or object:
- عِنْدَ, لَدَى, لَدُنْ, إِذْ, إِذَا
- قَبْلُ and بَعْدُ (when cut from idafa)

### Operator of the Dharf
The verb or verb-like element before it operates on the dharf, putting it in the accusative case.

### Special Time Adverbs for Negation
- قَطُّ for past negation: مَا فَعَلْتُهُ قَطُّ — I never did it at all
- عَوْضُ for future negation: لَا أَفْعَلُهُ عَوْضُ — I will never do it`,
      rules: [
        {
          arabic: 'الظرف المتصرف يُستعمل ظرفًا وغير ظرف',
          english: 'A flexible adverb can be used both as an adverb (dharf) and as a regular noun in other grammatical positions.',
          examples: [
            { arabic: 'يَوْمُ الجُمُعَةِ مُبَارَكٌ', translation: 'Friday is blessed', irab: 'يَوْمُ: mubtada\' marfu\' (not used as dharf here)' },
          ],
        },
        {
          arabic: 'الظرف غير المتصرف لا يخرج عن النصب على الظرفية أو الجر',
          english: 'A non-flexible adverb can only be used as an adverb (mansub) or with a preposition (majrur), never as subject or object.',
          examples: [
            { arabic: 'مَا فَعَلْتُهُ قَطُّ', translation: 'I never did it at all', irab: 'قَطُّ: dharf zaman mabni (non-flexible, only adverbial)' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 7',
    },
  ],
  relatedTopicIds: ['maf-ul-bih', 'maf-ul-mutlaq', 'verbal-sentence'],
  tags: ['maf\'ul fihi', 'dharf', 'adverb', 'time', 'place', 'mansub', 'accusative'],
};

export const mafUlLahu: NahwTopic = {
  id: 'maf-ul-lahu',
  titleAr: 'المفعول له',
  titleEn: 'Object of Purpose (Maf\'ul lahu)',
  transliteration: 'al-Maf\'ul lahu',
  categoryId: 'governed',
  subcategoryId: 'accusative',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The maf\'ul lahu (object of purpose/reason) is a masdar in the accusative case that explains WHY the action was performed. It must share the same subject and time as the main verb.',
      body: `## The Object of Purpose (المفعول له)

The maf'ul lahu answers the question **"Why?"** (لِمَاذَا؟). It is a **masdar** (verbal noun) in the **accusative case** that explains the reason behind the action.

### Conditions for the Maf'ul lahu

1. **Must be a masdar** (verbal noun)
2. **Must share the same subject** (fa'il) as the verb
3. **Must occur at the same time** as the verb

When all three conditions are met, the masdar can stand alone in the accusative without a preposition.`,
      rules: [
        {
          arabic: 'المفعول له مصدر منصوب يُبيّن سبب الفعل',
          english: 'The maf\'ul lahu is a masdar in accusative that explains the reason for the verb\'s action.',
          examples: [
            { arabic: 'قُمْتُ إِجْلَالًا لِلْمُعَلِّمِ', translation: 'I stood out of respect for the teacher', irab: 'إِجْلَالًا: maf\'ul lahu mansub' },
            { arabic: 'جِئْتُكَ طَلَبًا لِلْعِلْمِ', translation: 'I came to you seeking knowledge', irab: 'طَلَبًا: maf\'ul lahu mansub' },
          ],
        },
        {
          arabic: 'يُشترط اتحاد الفاعل والوقت',
          english: 'The maf\'ul lahu requires that its subject and time match those of the main verb.',
          examples: [
            { arabic: 'ضَرَبْتُهُ تَأْدِيبًا', translation: 'I disciplined him as correction', irab: 'تَأْدِيبًا: maf\'ul lahu — same subject (I) and same time' },
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 2, Chapter 1',
    },
    {
      difficulty: 'intermediate',
      summary: 'When the conditions of the maf\'ul lahu are not met (e.g., it is not a masdar, or the subject differs), the purpose must be expressed using a preposition (لِ or مِنْ أَجْلِ) instead of accusative alone.',
      body: `## Intermediate Study of the Maf'ul lahu

### When Conditions Are Met
The masdar stands alone in the accusative:
- قُمْتُ إِجْلَالًا — I stood out of respect

### When Conditions Are NOT Met
A preposition (لِ or مِنْ أَجْلِ) must be used:
- جِئْتُ لِلدِّرَاسَةِ — I came for studying (الدِّرَاسَة is not a pure masdar from جَاءَ)

### The Definite Maf'ul lahu
When the maf'ul lahu has the definite article (ال) or is in idafa, scholars differ:
- Some allow the accusative even with definiteness
- Others require the preposition لِ

### Interchangeable Constructions
Both constructions can sometimes coexist:
- جِئْتُ طَلَبًا لِلْعِلْمِ = جِئْتُ لِطَلَبِ العِلْمِ`,
      rules: [
        {
          arabic: 'إذا فُقد شرط المفعول له جُرّ باللام',
          english: 'When a condition of the maf\'ul lahu is not met, the purpose is expressed using a preposition instead.',
          examples: [
            { arabic: 'جِئْتُ لِلدِّرَاسَةِ', translation: 'I came for studying', irab: 'لِلدِّرَاسَةِ: jar-majrur (not maf\'ul lahu because الدِّرَاسَة has ال)' },
          ],
        },
        {
          arabic: 'المفعول له إذا كان معرفةً فالأكثر جرّه',
          english: 'When the maf\'ul lahu is definite (with ال or idafa), it is more common to use a preposition.',
          examples: [
            { arabic: 'جِئْتُ لِطَلَبِ العِلْمِ', translation: 'I came for the pursuit of knowledge', irab: 'لِطَلَبِ: jar-majrur because of idafa' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Part 4',
    },
    {
      difficulty: 'advanced',
      summary: 'Scholars debate the exact conditions required. Some Kufan grammarians allow non-masdars as maf\'ul lahu. The interaction between the maf\'ul lahu and prepositional phrases raises questions about which construction takes priority when both are possible.',
      body: `## Advanced Study of the Maf'ul lahu

### Basran vs. Kufan Debate on Conditions
- **Basrans** strictly require all three conditions (masdar, same subject, same time)
- **Kufans** are more lenient, allowing some flexibility

### Inner-State Requirement
Some grammarians add an additional condition: the masdar must indicate a **psychological or emotional state** (مصدر قلبي), such as:
- إِجْلَال (respect), خَوْف (fear), طَلَب (seeking), رَجَاء (hope), حَذَر (caution)

### Context Determines Preference
When both the accusative and prepositional constructions are valid, the context and the speaker's intent determine which is preferred.

### Quranic Example
- وَالَّذِينَ صَبَرُوا ابْتِغَاءَ وَجْهِ رَبِّهِمْ — And those who are patient, seeking the countenance of their Lord
  Here ابْتِغَاءَ is a maf'ul lahu in the accusative despite being in idafa.`,
      rules: [
        {
          arabic: 'اختلف النحاة في اشتراط كون المفعول له مصدرًا قلبيًّا',
          english: 'Grammarians differ on whether the maf\'ul lahu must be a masdar indicating an inner state (emotion/intention) or can be any masdar.',
          examples: [
            { arabic: 'وَالَّذِينَ صَبَرُوا ابْتِغَاءَ وَجْهِ رَبِّهِمْ', translation: 'And those who are patient, seeking the countenance of their Lord', source: 'Ar-Ra\'d 13:22', irab: 'ابْتِغَاءَ: maf\'ul lahu mansub — a psychological masdar' },
          ],
        },
        {
          arabic: 'الأصل في المفعول له أن يكون مصدرًا نكرةً',
          english: 'The default for the maf\'ul lahu is to be an indefinite masdar; definiteness often necessitates a preposition.',
          examples: [
            { arabic: 'فَعَلْتُهُ حَذَرَ الموتِ', translation: 'I did it out of fear of death', irab: 'حَذَرَ: maf\'ul lahu with idafa — some allow it, others require لِحَذَرِ' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 7',
    },
  ],
  relatedTopicIds: ['maf-ul-bih', 'maf-ul-mutlaq', 'verbal-sentence'],
  tags: ['maf\'ul lahu', 'purpose', 'reason', 'masdar', 'mansub', 'accusative'],
};

export const mafUlMaAhu: NahwTopic = {
  id: 'maf-ul-ma-ahu',
  titleAr: 'المفعول معه',
  titleEn: 'Object of Accompaniment (Maf\'ul ma\'ahu)',
  transliteration: 'al-Maf\'ul ma\'ahu',
  categoryId: 'governed',
  subcategoryId: 'accusative',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The maf\'ul ma\'ahu (object of accompaniment) is a noun in the accusative case that comes after واو المعية (waw of accompaniment), indicating what the action was done alongside, not with.',
      body: `## The Object of Accompaniment (المفعول معه)

The maf'ul ma'ahu shows that two things happened **simultaneously**, but only one is the actual doer. It comes after **واو المعية** (waw of accompaniment).

### Key Distinction
The noun after waw al-ma'iyya is **mansub** (accusative), NOT ma'tuf (conjoined). The second noun did not participate in the action — it merely accompanied it.

### Examples
- سِرْتُ وَالنِّيلَ — I walked alongside the Nile (the Nile didn't walk)
- جَاءَ الأَمِيرُ وَالجَيْشَ — The commander came with the army (focus is on the commander's arrival)`,
      rules: [
        {
          arabic: 'المفعول معه اسم منصوب بعد واو المعية',
          english: 'The maf\'ul ma\'ahu is a noun in the accusative after waw al-ma\'iyya, indicating accompaniment.',
          examples: [
            { arabic: 'سِرْتُ وَالنِّيلَ', translation: 'I walked alongside the Nile', irab: 'النِّيلَ: maf\'ul ma\'ahu mansub' },
            { arabic: 'جَاءَ الأَمِيرُ وَالجَيْشَ', translation: 'The commander came with the army', irab: 'الجَيْشَ: maf\'ul ma\'ahu mansub' },
          ],
        },
        {
          arabic: 'واو المعية تدل على المصاحبة لا المشاركة',
          english: 'Waw al-ma\'iyya indicates accompaniment (happening alongside), not partnership in the action.',
          examples: [
            { arabic: 'اسْتَوَى الماءُ وَالخَشَبَةَ', translation: 'The water reached level with the plank', irab: 'الخَشَبَةَ: maf\'ul ma\'ahu — the plank didn\'t rise, the water did' },
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 2, Chapter 1',
    },
    {
      difficulty: 'intermediate',
      summary: 'The critical skill is distinguishing واو المعية from واو العطف. When the waw could be either, context determines the interpretation. If the noun after waw can logically share in the verb\'s action, \'atf (conjunction) is preferred; if it cannot, ma\'iyya is required.',
      body: `## Distinguishing واو المعية from واو العطف

### When 'Atf Is Impossible — Must Be Ma'iyya
When the noun after waw cannot logically share in the verb's action:
- سِرْتُ وَالنِّيلَ — The Nile can't walk, so this must be waw al-ma'iyya

### When Both Are Possible — 'Atf Is Preferred
When the noun after waw can logically share in the action:
- جَاءَ مُحَمَّدٌ وَعَلِيٌّ — Both can come, so 'atf (conjunction) is preferred → raf'

### When 'Atf Would Cause Grammatical Issues — Ma'iyya Required
- لَا تَنْهَ عَنْ خُلُقٍ وَتَأْتِيَ مِثْلَهُ — Do not forbid a behavior and then do the same
  Here 'atf would put the second verb in jazm (prohibition), which is not intended.`,
      rules: [
        {
          arabic: 'إذا تعذّر العطف تعيّنت المعية',
          english: 'When conjunction (\'atf) is logically impossible, the waw must be waw al-ma\'iyya and the noun after it is maf\'ul ma\'ahu.',
          examples: [
            { arabic: 'سِرْتُ وَالنِّيلَ', translation: 'I walked alongside the Nile', irab: 'النِّيلَ: maf\'ul ma\'ahu (Nile can\'t walk, so \'atf is impossible)' },
          ],
        },
        {
          arabic: 'إذا أمكن العطف فهو أَوْلَى',
          english: 'When conjunction is logically possible, it is preferred over the ma\'iyya interpretation.',
          examples: [
            { arabic: 'جَاءَ مُحَمَّدٌ وَعَلِيٌّ', translation: 'Muhammad and Ali came', irab: 'عَلِيٌّ: ma\'tuf (conjoined) — both can come, so \'atf is preferred' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Part 4',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study examines priority rules when the waw could be either conjunction or accompaniment. Basran and Kufan grammarians differ on the operator of the maf\'ul ma\'ahu — is it the waw itself or the verb before it? Edge cases from Quranic text and poetry are analyzed.',
      body: `## Advanced Study of the Maf'ul ma'ahu

### Debate on the Operator
- **Basran view**: The verb operates on the maf'ul ma'ahu; waw al-ma'iyya is just a marker
- **Kufan view**: Waw al-ma'iyya itself causes the nasb (accusative)

### Priority Rules
1. If 'atf is impossible → must be ma'iyya
2. If raf' after waw causes a grammatical error → nasb required
3. If both work → 'atf is preferred (according to the majority)

### After Negative + Verb
- مَا صَنَعْتَ وَأَبَاكَ — What did you do with your father?

### After Interrogative
- كَيْفَ أَنْتَ وَقُرَيْشًا — How are you with regard to Quraysh?
  After an interrogative, the noun after waw is typically maf'ul ma'ahu (mansub).`,
      rules: [
        {
          arabic: 'اختلفوا في ناصب المفعول معه',
          english: 'Scholars differ on what causes the nasb of the maf\'ul ma\'ahu — the verb (Basran view) or the waw (Kufan view).',
          examples: [
            { arabic: 'مَا صَنَعْتَ وَأَبَاكَ', translation: 'What did you do regarding your father?', irab: 'أَبَاكَ: maf\'ul ma\'ahu mansub with fatha on the alif' },
          ],
        },
        {
          arabic: 'يجب النصب على المعية بعد الاستفهام',
          english: 'After an interrogative, the noun after waw is typically in the accusative (maf\'ul ma\'ahu).',
          examples: [
            { arabic: 'كَيْفَ أَنْتَ وَقُرَيْشًا', translation: 'How are you with regard to Quraysh?', irab: 'قُرَيْشًا: maf\'ul ma\'ahu mansub after interrogative' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 7',
    },
  ],
  relatedTopicIds: ['maf-ul-bih', 'atf', 'verbal-sentence'],
  tags: ['maf\'ul ma\'ahu', 'accompaniment', 'waw', 'mansub', 'accusative', 'ma\'iyya'],
};

export const mustathna: NahwTopic = {
  id: 'mustathna',
  titleAr: 'المستثنى',
  titleEn: 'Exception (Mustathna)',
  transliteration: 'al-Mustathna',
  categoryId: 'governed',
  subcategoryId: 'accusative',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The mustathna (exception) is a noun that is excluded from the general rule using إِلَّا or other exception tools. It appears in three cases: complete affirmative (mansub), complete negative (mansub or following), and incomplete negative (according to position).',
      body: `## The Exception (المستثنى)

The mustathna is a noun **excluded** from the general statement using **إِلَّا** or another exception tool.

### Structure
المستثنى منه + إِلَّا + المستثنى
(excepted from) + (except) + (exception)

### Three Cases of Exception

#### 1. Complete Affirmative (تام موجب)
The sentence is positive and the excepted-from noun is mentioned:
- جَاءَ القَوْمُ إِلَّا زَيْدًا → mustathna is **always mansub**

#### 2. Complete Negative (تام منفي)
The sentence is negative and the excepted-from noun is mentioned:
- مَا جَاءَ القَوْمُ إِلَّا زَيْدًا / إِلَّا زَيْدٌ → **mansub** or **badal** (follow the case of the mustathna minhu)

#### 3. Incomplete Negative (ناقص / مفرّغ)
The sentence is negative and the excepted-from noun is NOT mentioned:
- مَا جَاءَ إِلَّا زَيْدٌ → treat as if إِلَّا isn't there; i'rab is determined by position`,
      rules: [
        {
          arabic: 'المستثنى بإلّا في الكلام التام الموجب منصوب',
          english: 'In a complete affirmative sentence, the exception with إِلَّا is always in the accusative.',
          examples: [
            { arabic: 'فَسَجَدُوا إِلَّا إِبْلِيسَ', translation: 'They prostrated except Iblis', source: 'Al-Baqarah 2:34', irab: 'إِبْلِيسَ: mustathna mansub with fatha' },
            { arabic: 'جَاءَ الطُّلَّابُ إِلَّا طَالِبًا', translation: 'The students came except one student' },
          ],
        },
        {
          arabic: 'المستثنى في الكلام الناقص المنفي يُعرب بحسب موقعه',
          english: 'In an incomplete negative sentence, the exception is parsed according to its grammatical position (as if إِلَّا were not there).',
          examples: [
            { arabic: 'مَا جَاءَ إِلَّا زَيْدٌ', translation: 'No one came except Zayd', irab: 'زَيْدٌ: fa\'il marfu\' (not mustathna — incomplete negative)' },
          ],
        },
      ],
      tables: [
        {
          title: 'The Three Cases of Exception',
          titleAr: 'حالات الاستثناء الثلاث',
          headers: ['Case', 'Arabic Term', 'Example', 'I\'rab of Mustathna'],
          rows: [
            ['Complete Affirmative', 'تام موجب', 'جَاءَ القَوْمُ إِلَّا زَيْدًا', 'Always mansub'],
            ['Complete Negative', 'تام منفي', 'مَا جَاءَ القَوْمُ إِلَّا زَيْدًا/زَيْدٌ', 'Mansub or badal (follow case)'],
            ['Incomplete Negative', 'ناقص منفي', 'مَا جَاءَ إِلَّا زَيْدٌ', 'By position (fa\'il here)'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 2, Chapter 1',
    },
    {
      difficulty: 'intermediate',
      summary: 'Beyond إِلَّا, Arabic has other exception tools: غَيْر and سِوَى (nouns, always mudaf), and خَلَا, عَدَا, حَاشَا (which can function as either verbs or prepositions). Each has distinct grammatical behavior.',
      body: `## Other Exception Tools

### غَيْر and سِوَى
These are nouns that follow the i'rab rules of the mustathna with إِلَّا. The noun after them is always **majrur** (mudaf ilayhi):
- جَاءَ القَوْمُ غَيْرَ زَيْدٍ — The people came except Zayd

### خَلَا (except/apart from)
- As a verb → mansub object: خَلَا زَيْدًا
- As a preposition → majrur: خَلَا زَيْدٍ

### عَدَا (except/apart from)
- As a verb → mansub: عَدَا زَيْدًا
- As a preposition → majrur: عَدَا زَيْدٍ

### حَاشَا (far be it / except)
Primarily a preposition → majrur: حَاشَا زَيْدٍ

### مَا خَلَا / مَا عَدَا
When preceded by ما المصدرية, they are always verbs and the noun is always **mansub**:
- جَاءَ القَوْمُ مَا خَلَا زَيْدًا`,
      rules: [
        {
          arabic: 'غَيْر وَسِوَى يُعربان إعراب المستثنى بإلّا',
          english: 'غَيْر and سِوَى take the same i\'rab as the mustathna with إِلَّا, and the noun after them is majrur (mudaf ilayhi).',
          examples: [
            { arabic: 'جَاءَ القَوْمُ غَيْرَ زَيْدٍ', translation: 'The people came except Zayd', irab: 'غَيْرَ: mansub (like mustathna with إِلَّا) — زَيْدٍ: mudaf ilayhi' },
          ],
        },
        {
          arabic: 'خَلَا وَعَدَا يجوز فيهما الفعلية والحرفية',
          english: 'خَلَا and عَدَا can function as either verbs (making the noun mansub) or prepositions (making it majrur).',
          examples: [
            { arabic: 'جَاءَ القَوْمُ مَا خَلَا زَيْدًا', translation: 'The people came except Zayd', irab: 'ما خَلَا: ما المصدرية + verb → زَيْدًا: mansub (always after ما)' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Part 4',
    },
    {
      difficulty: 'advanced',
      summary: 'The advanced study covers detailed i\'rab analysis of the mustathna in all three cases, the scholarly debate on حَاشَا (is it a preposition only, or can it be a verb?), and complex Quranic exception constructions. Also covered: multiple exceptions in one sentence and chained exceptions.',
      body: `## Advanced Study of the Mustathna

### Why Is the Mustathna Mansub in the Complete Affirmative?
Scholars debate the operator:
- Is إِلَّا the operator that causes nasb?
- Or is the verb itself the operator?

### The Complete Negative Case
- **Basrans** prefer badal (following the case of the mustathna minhu)
- **Kufans** allow both nasb and badal equally

### The حَاشَا Debate
- **Sibawayh** holds that حَاشَا is a preposition only
- Other grammarians say it can also be a verb
- It does **NOT** accept ما before it (unlike خَلَا and عَدَا)

### Multiple Exceptions
Multiple exceptions can appear in one sentence:
- جَاءَ القَوْمُ إِلَّا زَيْدًا وَإِلَّا عَمْرًا

### الاستثناء المنقطع (Disconnected Exception)
When the mustathna is not of the same genus as the mustathna minhu:
- مَا فِي الدَّارِ أَحَدٌ إِلَّا حِمَارًا — There is no one in the house except a donkey
  The donkey is not a person, so this is a **disconnected exception** — always mansub.`,
      rules: [
        {
          arabic: 'حَاشَا لا تدخل عليها مَا المصدرية عند الأكثرين',
          english: 'Unlike خَلَا and عَدَا, the exception tool حَاشَا does not accept ما before it according to the majority of grammarians.',
          examples: [
            { arabic: 'حَاشَا زَيْدٍ', translation: 'Except Zayd', irab: 'حَاشَا: preposition — زَيْدٍ: majrur' },
          ],
        },
        {
          arabic: 'الاستثناء المنقطع: المستثنى ليس من جنس المستثنى منه',
          english: 'Disconnected exception is when the mustathna is not of the same type as what it is excepted from — it is always mansub.',
          examples: [
            { arabic: 'مَا فِي الدَّارِ أَحَدٌ إِلَّا حِمَارًا', translation: 'There is no one in the house except a donkey', irab: 'حِمَارًا: mansub — disconnected exception (donkey is not a person)' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 8',
    },
  ],
  relatedTopicIds: ['maf-ul-bih', 'hal', 'verbal-sentence'],
  tags: ['mustathna', 'exception', 'illa', 'istithna', 'mansub', 'accusative'],
};
