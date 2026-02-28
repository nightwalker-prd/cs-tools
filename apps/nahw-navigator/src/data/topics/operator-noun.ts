import type { NahwTopic } from '../types';

export const nounAsOperator: NahwTopic = {
  id: 'noun-as-operator',
  titleAr: 'الاسم العامل',
  titleEn: 'Noun as Operator',
  transliteration: 'al-Ism al-\'Aamil',
  categoryId: 'operator',
  subcategoryId: 'operator-nouns',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'In Arabic grammar, not only verbs act as operators — certain nouns can also govern other words. The three main noun operators are: the masdar (verbal noun), ism al-fa\'il (active participle), and ism al-maf\'ul (passive participle). Each can take a subject and/or object just like a verb.',
      body: `## Nouns That Operate Like Verbs (الاسم العامل)

In Arabic grammar, certain nouns can **govern** other words just like verbs do — raising subjects and putting objects in the accusative.

### The Three Main Noun Operators

1. **المصدر (Masdar / Verbal Noun):** operates like its verb
   - إِكْرَامُ زَيْدٍ الضَّيْفَ — "Zayd's honoring of the guest"

2. **اسم الفاعل (Active Participle):** raises a fa'il
   - أَقَائِمٌ زَيْدٌ — "Is Zayd standing?" (زَيْدٌ is its fa'il)

3. **اسم المفعول (Passive Participle):** raises a na'ib al-fa'il
   - المَكْتُوبُ دَرْسُهُ — "whose lesson is written" (دَرْسُهُ is its na'ib al-fa'il)`,
      rules: [
        {
          arabic: 'المصدر يعمل عمل فعله',
          english: 'The masdar (verbal noun) can govern like its verb, taking a subject and/or object.',
          examples: [
            { arabic: 'أَعْجَبَنِي إِكْرَامُكَ الضَّيْفَ', translation: 'Your honoring of the guest impressed me', irab: 'إِكْرَامُكَ: masdar (operator) — الضَّيْفَ: maf\'ul bih of the masdar' },
          ],
        },
        {
          arabic: 'اسم الفاعل يرفع فاعلًا وينصب مفعولًا',
          english: 'The active participle (ism al-fa\'il) can raise a subject and put an object in accusative.',
          examples: [
            { arabic: 'أَقَائِمٌ زَيْدٌ', translation: 'Is Zayd standing?', irab: 'قَائِمٌ: ism fa\'il (operator) — زَيْدٌ: fa\'il of the participle, marfu\'' },
            { arabic: 'هَذَا كَاتِبٌ الدَّرْسَ', translation: 'This one is writing the lesson', irab: 'كَاتِبٌ: ism fa\'il — الدَّرْسَ: maf\'ul bih of the participle' },
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 1, Chapter 3',
    },
    {
      difficulty: 'intermediate',
      summary: 'Five types of derived nouns can operate as grammatical agents: ism al-fa\'il, ism al-maf\'ul, sifa mushabbaha, sifa al-mubalagha, and ism al-tafdil. Each has specific conditions for when it can govern.',
      body: `## Five Derived Noun Operators

### 1. اسم الفاعل (Active Participle)

Governs under these conditions:
- **With ال:** always governs → الكَاتِبُ الدَّرْسَ
- **Without ال:** must refer to present/future, and needs support from negation, interrogative, etc. → أَمُكْرِمٌ زَيْدٌ عَمْرًا (Is Zayd honoring Amr?)

### 2. اسم المفعول (Passive Participle)

Same conditions as ism al-fa'il:
- أَمَضْرُوبٌ الغُلَامُ — "Is the boy being hit?"

### 3. الصفة المشبهة (Resembling Adjective)

Like حَسَن, كَبِير — operates on its related noun (السببي):
- زَيْدٌ حَسَنٌ وَجْهُهُ — "Zayd is handsome of face"

### 4. صيغة المبالغة (Intensive Form)

Like عَلَّامَة, فَعَّال — operates under the same conditions as ism fa'il:
- أَعَلَّامٌ زَيْدٌ المَسْأَلَةَ — "Does Zayd know the issue well?"

### 5. اسم التفضيل (Comparative/Superlative)

أَفْعَل pattern — weaker governance, typically operates only on tamyiz:
- زَيْدٌ أَكْثَرُ مَالًا — "Zayd has more wealth"`,
      rules: [
        {
          arabic: 'اسم الفاعل المجرد من أل يشترط فيه الحال أو الاستقبال',
          english: 'An active participle without ال only governs when it refers to present or future tense and is supported by a grammatical element (negation, interrogative, etc.).',
          examples: [
            { arabic: 'أَمُكْرِمٌ زَيْدٌ عَمْرًا', translation: 'Is Zayd honoring Amr?', irab: 'مُكْرِمٌ: ism fa\'il (operator, supported by hamza) — زَيْدٌ: fa\'il — عَمْرًا: maf\'ul bih' },
          ],
        },
        {
          arabic: 'الصفة المشبهة تعمل في السببي',
          english: 'The sifa mushabbaha (resembling adjective) governs the noun related to its subject (the sababiy).',
          examples: [
            { arabic: 'زَيْدٌ حَسَنٌ وَجْهُهُ', translation: 'Zayd is handsome of face', irab: 'حَسَنٌ: sifa mushabbaha (operator) — وَجْهُهُ: fa\'il of the sifa' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Part 3',
    },
    {
      difficulty: 'advanced',
      summary: 'Ism al-tafdil has three states of governance depending on its context: with ال, in idafa, or standalone (mujarrad). Also covered: ism al-fi\'l (verb-like nouns like هَيْهَاتَ, صَهْ, آمِينَ) and detailed conditions for when a masdar can govern.',
      body: `## Advanced Noun Operators

### 1. اسم التفضيل في ثلاث حالات (Ism al-Tafdil in Three States)

a. **With ال:** acts as superlative → الأَفْضَلُ (the best)

b. **In idafa:** أَفْضَلُ الرِّجَالِ (the best of men) — gets definiteness from idafa

c. **Standalone (مجرّد):** أَفْضَلُ مِنْ زَيْدٍ (better than Zayd) — always remains singular masculine

### 2. اسم الفعل (Verb-like Nouns)

Nouns that carry the meaning of verbs and govern like them:

**Command type (اسم فعل أمر):**
- صَهْ = اسكت (be quiet)
- آمِينَ = اللهم استجب (O Allah, answer)
- هَلُمَّ = تعال (come)

**Past type (اسم فعل ماضٍ):**
- هَيْهَاتَ = بَعُدَ (it is far)
- شَتَّانَ = افترق (how different)

**Present type (اسم فعل مضارع):**
- أُفٍّ = أَتَضَجَّرُ (I am disgusted)
- وَيْ = أَتَعَجَّبُ (I marvel)

### 3. Masdar Governance Conditions

The masdar can govern like its verb when:
- It can meaningfully replace the verb
- No explicit verb is present in the sentence`,
      rules: [
        {
          arabic: 'اسم التفضيل المجرّد يلزم الإفراد والتذكير',
          english: 'Ism al-tafdil when standalone (not with ال or idafa) always remains singular and masculine regardless of what it describes.',
          examples: [
            { arabic: 'هِنْدُ أَفْضَلُ مِنْ زَيْنَبَ', translation: 'Hind is better than Zaynab', irab: 'أَفْضَلُ: ism tafdil — remains masculine singular despite feminine subject' },
          ],
        },
        {
          arabic: 'اسم الفعل يعمل عمل الفعل الذي بمعناه',
          english: 'Ism al-fi\'l (verb-like noun) governs just like the verb it represents in meaning.',
          examples: [
            { arabic: 'هَيْهَاتَ النَّجَاحُ بِلَا عَمَلٍ', translation: 'Far-fetched is success without work', irab: 'هَيْهَاتَ: ism fi\'l madi (= بَعُدَ) — النَّجَاحُ: fa\'il of هَيْهَاتَ, marfu\'' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 6',
    },
  ],
  relatedTopicIds: ['transitive-intransitive', 'maf-ul-bih', 'fail', 'semantic-operator'],
  tags: ['ism', 'operator', 'masdar', 'ism fa\'il', 'ism maf\'ul', 'sifa mushabbaha', 'tafdil'],
};

export const semanticOperator: NahwTopic = {
  id: 'semantic-operator',
  titleAr: 'العامل المعنوي',
  titleEn: 'Semantic Operator',
  transliteration: 'al-\'Aamil al-Ma\'nawi',
  categoryId: 'operator',
  subcategoryId: 'operator-nouns',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Unlike verbs and particles which are explicit (lafzi) operators, the semantic operator (العامل المعنوي) is abstract — it is a meaning, not a word. There are two semantic operators: الابتداء (initiation) which raises the mubtada\' to nominative, and التجرّد (bare state) which keeps the mudari\' verb in its default nominative when no explicit operator precedes it.',
      body: `## The Semantic Operator (العامل المعنوي)

Unlike verbs and particles which are **explicit** (لفظي) operators, the semantic operator is **abstract** — it is a meaning, not a word you can point to.

### The Two Semantic Operators

#### 1. الابتداء (Initiation)

The act of placing a noun at the beginning of a sentence to form a judgement makes it **marfu'**. This is what gives the mubtada' its raf' — not any specific word, but the abstract concept of "starting."

- اللهُ رَبُّنَا — اللهُ is marfu' by الابتداء
- الصَّبْرُ جَمِيلٌ — الصَّبْرُ is marfu' by الابتداء

#### 2. التجرّد (Bare State / Absence of Operator)

When a mudari' verb appears without any nasb or jazm particle, it stays in its default **marfu'** state. The "operator" of this raf' is the abstract absence of any explicit operator.

- يَعْبُدُ المسلمُ اللهَ — يَعْبُدُ is marfu' because no particle precedes it`,
      rules: [
        {
          arabic: 'الابتداء يرفع المبتدأ',
          english: 'The semantic operator of "initiation" (al-ibtida\') raises the mubtada\' to the nominative case.',
          examples: [
            { arabic: 'اللهُ رَبُّنَا', translation: 'Allah is our Lord', irab: 'اللهُ: mubtada\' marfu\' by الابتداء (semantic operator)' },
            { arabic: 'الصَّبْرُ جَمِيلٌ', translation: 'Patience is beautiful', irab: 'الصَّبْرُ: mubtada\' marfu\' by الابتداء' },
          ],
        },
        {
          arabic: 'التجرّد يرفع الفعل المضارع',
          english: 'The semantic operator of "bare state" (at-tajarrud) keeps the mudari\' verb in the nominative (default) when no explicit particle precedes it.',
          examples: [
            { arabic: 'يَعْبُدُ المسلمُ اللهَ', translation: 'The Muslim worships Allah', irab: 'يَعْبُدُ: mudari\' marfu\' by التجرّد (no nasb/jazm particle)' },
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 1, Chapter 4',
    },
    {
      difficulty: 'intermediate',
      summary: 'The concept of "semantic" operators exists because Arabic grammar requires every i\'rab to have an operator (عامل). When no explicit word can be identified as the operator, grammarians posit an abstract meaning as the cause. This reflects the fundamental principle that no i\'rab exists without an operator.',
      body: `## Why Semantic Operators Exist

### The Core Principle

**لا إِعْرَابَ بِلَا عَامِلٍ** — No i'rab without an operator.

Arabic grammar demands that every case ending (i'rab) be caused by something. When no explicit word serves as the operator, grammarians posit an abstract **meaning** (معنى) as the cause — hence "semantic" (معنوي) as opposed to "explicit" (لفظي).

### Interaction with Explicit Operators

#### الابتداء gives way to explicit operators:

When كان or إنّ enters the sentence, الابتداء is overridden:
- الابتداء: زَيْدٌ قَائِمٌ (mubtada' marfu' by ibtida')
- إنّ enters: إِنَّ زَيْدًا قَائِمٌ (now governed by إنّ)

#### التجرّد gives way to nasb/jazm particles:

- التجرّد: يَعْبُدُ (marfu' by tajarrud)
- Nasb particle: لَنْ يَعْبُدَ (now governed by لَنْ)

### The Kufan Dissent

Some scholars (particularly from the Kufan school) deny that semantic operators exist, attributing the i'rab to other factors entirely.`,
      rules: [
        {
          arabic: 'كل إعراب لا بد له من عامل',
          english: 'Every case ending (i\'rab) must have an operator — if no explicit word serves as operator, a semantic (abstract) operator is posited.',
          examples: [
            { arabic: 'زَيْدٌ قَائِمٌ', translation: 'Zayd is standing', irab: 'زَيْدٌ: marfu\' by الابتداء — قَائِمٌ: marfu\' by المبتدأ (the mubtada\' operates on its khabar)' },
          ],
        },
        {
          arabic: 'العامل المعنوي يزول عند دخول عامل لفظي',
          english: 'The semantic operator is overridden when an explicit (lafzi) operator enters.',
          examples: [
            { arabic: 'زَيْدٌ قَائِمٌ → إِنَّ زَيْدًا قَائِمٌ', translation: 'Zayd is standing → Indeed Zayd is standing', irab: 'الابتداء replaced by إنّ as the operator' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Part 3',
    },
    {
      difficulty: 'advanced',
      summary: 'The advanced study covers tanazu\' al-\'aamilayn (conflict between two operators vying to govern the same word), conditions for when an operator can be deleted while its effect remains, and the Basran vs. Kufan debate on the nature and existence of semantic operators.',
      body: `## Advanced Operator Theory

### 1. تنازع العاملين (Conflict of Operators)

When two verbs or operators each try to govern the same noun:

أَكْرَمْتُ وَأَحْبَبْتُ زَيْدًا — both verbs want زَيْدًا as their object.

**Rule:** The **closer** verb governs, and the farther verb gets a hidden pronoun.

### 2. حذف العامل (Deletion of Operator)

The operator can be deleted when its effect (i'rab) remains on the governed word:

**Obligatory deletion:**
- بِسْمِ اللهِ = أَبْدَأُ بِسْمِ اللهِ — the verb أَبْدَأُ is deleted

**Optional deletion:**
- زَيْدًا (in answer to مَنْ تُكْرِمُ) = أُكْرِمُ زَيْدًا — verb optionally deleted

### 3. The Basran vs. Kufan Debate

**Basrans:** Semantic operators are real and necessary — every i'rab needs an operator, and when none is visible, an abstract one must be posited.

**Kufans:** Some scholars like al-Kisa'i rejected semantic operators, saying the mubtada' is marfu' "by itself" (بنفسه), not by ibtida'.

### 4. What Operates on the Khabar?

A longstanding debate: Is the khabar's raf' caused by:
- The mubtada' alone?
- The ibtida' alone?
- Both the mubtada' and ibtida' together?`,
      rules: [
        {
          arabic: 'إذا تنازع عاملان أُعمل الأقرب',
          english: 'When two operators compete to govern the same word, the closer operator takes governance and the farther one is given a hidden pronoun.',
          examples: [
            { arabic: 'أَكْرَمْتُ وَأَحْبَبْتُ زَيْدًا', translation: 'I honored and loved Zayd', irab: 'زَيْدًا: governed by أَحْبَبْتُ (closer verb) — أَكْرَمْتُ has hidden pronoun (هُ)' },
          ],
        },
        {
          arabic: 'قد يُحذف العامل ويبقى أثره',
          english: 'The operator can be deleted while its grammatical effect (i\'rab) remains on the governed word.',
          examples: [
            { arabic: 'بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ', translation: 'In the name of Allah, the Most Gracious, the Most Merciful', irab: 'The verb أَبْدَأُ (I begin) is deleted — بِسْمِ remains as jar-majrur' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 6',
    },
  ],
  relatedTopicIds: ['mubtada-khabar', 'noun-as-operator', 'fail', 'verbal-sentence'],
  tags: ['semantic', 'operator', 'ibtida', 'abstract', 'tajarrud', 'ma\'nawi'],
};
