import type { NahwTopic } from '../types';

export const fail: NahwTopic = {
  id: 'fail',
  titleAr: 'الفاعل',
  titleEn: 'Subject (Fa\'il)',
  transliteration: 'al-Faa\'il',
  categoryId: 'governed',
  subcategoryId: 'nominative',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The fa\'il (subject/doer) is the noun that comes after the verb and indicates who performed the action. It is always in the nominative case (marfu\'). Example: رَحِمَ اللهُ التَّائِبَ (Allah had mercy on the repentant).',
      body: `## The Subject (الفاعل)

The fa'il is the doer of the action. It comes after the verb and is always in the **nominative case** (marfu').

Key points:
- The fa'il must agree with the verb in gender (masculine/feminine)
- The verb always stays **singular** even if the fa'il is dual or plural
- If the fa'il is removed (passive voice), a **deputy subject** (نائب الفاعل) takes its place`,
      rules: [
        {
          arabic: 'الفاعل مرفوع دائماً',
          english: 'The fa\'il is always in the nominative case.',
          examples: [
            { arabic: 'رَحِمَ اللهُ التَّائِبَ', translation: 'Allah had mercy on the repentant', irab: 'اللهُ: fa\'il marfu\' with damma' },
            { arabic: 'جَاءَ الحَقُّ وَزَهَقَ البَاطِلُ', translation: 'Truth has come and falsehood has perished', source: 'Al-Isra 17:81' },
          ],
        },
        {
          arabic: 'نائب الفاعل يحل محل الفاعل المحذوف',
          english: 'The deputy subject (na\'ib al-fa\'il) replaces the fa\'il in passive constructions.',
          examples: [
            { arabic: 'رُحِمَ التَّائِبُ', translation: 'The repentant was shown mercy', irab: 'التَّائِبُ: na\'ib al-fa\'il marfu\'' },
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 2, Chapter 1',
    },
    {
      difficulty: 'intermediate',
      summary: 'The fa\'il can be an explicit noun, a hidden pronoun, or an interpreted masdar. When the fa\'il is feminine, a ta\' of feminization is added to the past verb. Detailed rules govern when this ta\' is obligatory vs. optional.',
      body: `## Intermediate Study of the Fa'il

### Types of Fa'il
1. **Explicit noun** (ظاهر): جَاءَ زَيْدٌ
2. **Connected pronoun** (ضمير متصل): كَتَبْتُ (the تُ is the fa'il)
3. **Hidden pronoun** (ضمير مستتر): اكْتُبْ (hidden أَنْتَ is the fa'il)
4. **Interpreted masdar** (مصدر مؤول): يَسُرُّنِي أَنْ تَنْجَحَ

### Feminization of the Verb
When the fa'il is feminine, add تاء التأنيث to the past tense verb:

**Obligatory:** When the fa'il is:
- A real feminine noun directly after the verb: جَاءَتْ فَاطِمَةُ
- A feminine pronoun: هِيَ ذَهَبَتْ

**Optional:** When the fa'il is:
- Separated from the verb: جَاءَ اليَوْمَ فَاطِمَةُ / جَاءَتِ اليَوْمَ فَاطِمَةُ
- A grammatically feminine noun (not a real female): طَلَعَ/طَلَعَتِ الشَّمْسُ`,
      rules: [
        {
          arabic: 'تاء التأنيث واجبة مع المؤنث الحقيقي',
          english: 'The ta\' of feminization is obligatory when the fa\'il is a real feminine noun adjacent to the verb.',
          examples: [
            { arabic: 'جَاءَتْ فَاطِمَةُ', translation: 'Fatima came' },
          ],
        },
        {
          arabic: 'الفاعل قد يكون ضميراً مستتراً',
          english: 'The fa\'il can be a hidden pronoun, especially with imperatives and first/second person.',
          examples: [
            { arabic: 'اكْتُبْ', translation: 'Write!', irab: 'Fa\'il: hidden أَنْتَ' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Book 3-4',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced fa\'il study covers the types of hidden pronouns (obligatorily hidden vs. optionally hidden), the interpreted masdar serving as fa\'il, the fa\'il of passive participles, and scholarly debates on verb-subject agreement.',
      body: `## Advanced Study of the Fa'il

### Hidden Pronoun Types
1. **Obligatorily hidden** (واجب الاستتار): in 1st person (أَفْعَلُ — أَنَا) and imperative 2nd person singular (افْعَلْ — أَنْتَ)
2. **Optionally hidden** (جائز الاستتار): in 3rd person masculine singular (يَفْعَلُ — هُوَ) and 3rd person feminine (تَفْعَلُ — هِيَ)

### Interpreted Masdar as Fa'il
أَعْجَبَنِي أَنْ تَنْجَحَ (your success impressed me) — أَنْ تَنْجَحَ is interpreted as masdar (نَجَاحُكَ) serving as fa'il

### Fa'il of Passive Participles
المَكْتُوبُ دَرْسُهُ — دَرْسُهُ is the na'ib al-fa'il of the passive participle

### Verb-Subject Agreement
- Past verb + dual/plural fa'il: verb stays singular
- BUT: if verb comes after fa'il (rare word order), some allow plural verb: الرِّجَالُ جَاءُوا

### Important Note
The fa'il can never be deleted (unlike maf'ul bih), but it can be hidden as a pronoun.`,
      rules: [
        {
          arabic: 'الضمير المستتر وجوبًا في الفعل المضارع المبدوء بالهمزة أو النون',
          english: 'The pronoun is obligatorily hidden in first person mudari\' (أَفْعَلُ/نَفْعَلُ) and singular imperative (افْعَلْ), and optionally hidden in third person.',
          examples: [
            { arabic: 'أَقْرَأُ القُرْآنَ', translation: 'I read the Quran', irab: 'Fa\'il: obligatorily hidden أَنَا' },
            { arabic: 'يَقْرَأُ القُرْآنَ', translation: 'He reads the Quran', irab: 'Fa\'il: optionally hidden هُوَ (could also be explicit)' },
          ],
        },
        {
          arabic: 'المصدر المؤوّل قد يقع فاعلًا',
          english: 'The interpreted masdar (أَنْ + verb) can serve as fa\'il.',
          examples: [
            { arabic: 'يَسُرُّنِي أَنْ تَنْجَحَ', translation: 'It pleases me that you succeed', irab: 'أَنْ تَنْجَحَ: interpreted masdar (= نَجَاحُكَ) — fa\'il of يَسُرُّ' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 7',
    },
  ],
  relatedTopicIds: ['verbal-sentence', 'maf-ul-bih', 'mubtada-khabar', 'transitive-intransitive'],
  tags: ['fa\'il', 'subject', 'doer', 'marfu', 'nominative', 'na\'ib'],
};

export const mubtadaKhabar: NahwTopic = {
  id: 'mubtada-khabar',
  titleAr: 'المبتدأ والخبر',
  titleEn: 'Mubtada and Khabar',
  transliteration: 'al-Mubtada\' wa al-Khabar',
  categoryId: 'governed',
  subcategoryId: 'nominative',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The mubtada\' (subject) and khabar (predicate) are the two pillars of the nominal sentence. Both are in the nominative case. The mubtada\' is what we talk about and the khabar is what we say about it.',
      body: `## Mubtada' and Khabar

### المبتدأ (The Subject)
The mubtada' is the noun placed at the beginning of a nominal sentence. It is **marfu'** (nominative) by the semantic operator of initiation (الابتداء).

### الخبر (The Predicate)
The khabar is what completes the meaning about the mubtada'. It too is **marfu'** (nominative).`,
      rules: [
        {
          arabic: 'المبتدأ والخبر مرفوعان',
          english: 'Both mubtada\' and khabar are in the nominative case.',
          examples: [
            { arabic: 'اللهُ رَبُّنَا', translation: 'Allah is our Lord', irab: 'اللهُ: mubtada\' marfu\' — رَبُّنَا: khabar marfu\'' },
            { arabic: 'مُحَمَّدٌ رَسُولُنَا', translation: 'Muhammad is our Messenger' },
          ],
        },
        {
          arabic: 'المبتدأ معرفة والخبر نكرة غالباً',
          english: 'The mubtada\' is typically definite (ma\'rifa) and the khabar is typically indefinite (nakira).',
          examples: [
            { arabic: 'الصَّبْرُ جَمِيلٌ', translation: 'Patience is beautiful', irab: 'الصَّبْرُ: definite mubtada\' — جَمِيلٌ: indefinite khabar' },
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 2, Chapter 1',
    },
    {
      difficulty: 'intermediate',
      summary: 'The khabar has four forms: single word, jar-majrur, dharf, or sentence (verbal/nominal). The mubtada\' can be deleted when implied, and the khabar can be fronted when it is a jar-majrur or when the mubtada\' is indefinite.',
      body: `## Intermediate Study of Mubtada' and Khabar

### Four Types of Khabar
1. **Single word** (مفرد): اللهُ كَرِيمٌ
2. **Jar wa majrur** (جار ومجرور): الكِتَابُ عَلَى الطَّاوِلَةِ
3. **Dharf** (ظرف): المُعَلِّمُ أَمَامَكَ
4. **Sentence** (جملة):
   - Verbal: الطَّالِبُ يَدْرُسُ (The student studies)
   - Nominal: البَيْتُ بَابُهُ مَفْتُوحٌ (The house — its door is open)

### Fronting the Khabar (تقديم الخبر)
The khabar is normally second, but it can be fronted:

**Obligatory fronting:**
- When mubtada' is indefinite: فِي الدَّارِ رَجُلٌ (In the house is a man)
- When khabar is an interrogative: أَيْنَ الكِتَابُ (Where is the book?)

**Optional fronting:**
- When both are definite with no ambiguity: عَلِيٌّ فِي المَسْجِدِ = فِي المَسْجِدِ عَلِيٌّ

### Deletion of Khabar
The khabar is deleted when understood:
- After لَوْلَا: لَوْلَا الإِسْلَامُ (لَهَلَكْنَا) — "If not for Islam..." (the khabar مَوْجُودٌ is implied)`,
      rules: [
        {
          arabic: 'يجب تقديم الخبر إذا كان المبتدأ نكرة',
          english: 'The khabar must be fronted when the mubtada\' is indefinite.',
          examples: [
            { arabic: 'فِي الدَّارِ رَجُلٌ', translation: 'In the house is a man', irab: 'فِي الدَّارِ: fronted khabar — رَجُلٌ: indefinite mubtada\'' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Book 3-4',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced topics include when deletion of the mubtada\' or khabar is obligatory vs. forbidden, multiple predicates for a single subject, and complex sentences where the khabar is itself a full clause with its own grammatical structure.',
      body: `## Advanced Study of Mubtada' and Khabar

### Obligatory Deletion of Mubtada'
1. With qualifying adjectives: الحَمْدُ للهِ (mubtada' of laudatory predicate sometimes deleted)
2. With oath answers: فِي ذِمَّتِي لَأَفْعَلَنَّ (the mubtada' is implied)
3. After لَوْلَا: لَوْلَا زَيْدٌ لَهَلَكْتَ — the khabar مَوْجُودٌ is obligatorily deleted

### Obligatory Deletion of Khabar
1. After لَوْلَا: لَوْلَا العَقْلُ لَهَلَكَ الإنسانُ — khabar مَوْجُودٌ is obligatorily deleted
2. With oaths: لَعَمْرُكَ — the khabar قَسَمِي is deleted

### Multiple Khabars
الرُّمَّانُ حُلْوٌ حَامِضٌ — two predicates for one subject (debated: are they two khabars or is the second na't of the first?)

### Forbidden Deletion
When there is ambiguity that deletion would cause, deletion is forbidden.

### The Khabar as a Full Sentence
اللهُ يَعْلَمُ مَا فِي قُلُوبِكُمْ — يَعْلَمُ and what follows is the khabar.`,
      rules: [
        {
          arabic: 'يجب حذف الخبر بعد لولا',
          english: 'The khabar must be obligatorily deleted after لَوْلَا, with the meaning of مَوْجُودٌ (existing) implied.',
          examples: [
            { arabic: 'لَوْلَا العِلْمُ لَهَلَكَ النَّاسُ', translation: 'Were it not for knowledge, people would perish', irab: 'العِلْمُ: mubtada\' — khabar مَوْجُودٌ is obligatorily deleted' },
          ],
        },
        {
          arabic: 'يجوز تعدد الخبر لمبتدأ واحد',
          english: 'A single mubtada\' can have multiple khabars, each providing different information about the subject.',
          examples: [
            { arabic: 'اللهُ غَفُورٌ رَحِيمٌ', translation: 'Allah is Forgiving, Merciful', irab: 'غَفُورٌ: first khabar — رَحِيمٌ: second khabar — both for the mubtada\' اللهُ' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 7',
    },
  ],
  relatedTopicIds: ['nominal-sentence', 'kana-and-sisters', 'inna-and-sisters', 'fail'],
  tags: ['mubtada', 'khabar', 'subject', 'predicate', 'nominal', 'marfu'],
};

export const mafulBih: NahwTopic = {
  id: 'maf-ul-bih',
  titleAr: 'المفعول به',
  titleEn: 'Direct Object (Maf\'ul bih)',
  transliteration: 'al-Maf\'ul bih',
  categoryId: 'governed',
  subcategoryId: 'accusative',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The maf\'ul bih (direct object) is the noun upon which the action of the verb falls. It is always in the accusative case (mansub). Example: أَعْبُدُ اللهَ (I worship Allah).',
      body: `## The Direct Object (المفعول به)

The maf'ul bih is the noun that **receives** the action of a transitive verb. It is always in the **accusative case** (mansub).

Without the direct object, a transitive verb's meaning is incomplete.`,
      rules: [
        {
          arabic: 'المفعول به منصوب دائماً',
          english: 'The direct object is always in the accusative case.',
          examples: [
            { arabic: 'أَعْبُدُ اللهَ', translation: 'I worship Allah', irab: 'اللهَ: maf\'ul bih mansub with fatha' },
            { arabic: 'خَلَقَ اللهُ السَّمَاوَاتِ وَالأَرْضَ', translation: 'Allah created the heavens and the earth' },
          ],
        },
        {
          arabic: 'المفعول به قد يتقدم على الفاعل',
          english: 'The maf\'ul bih can come before the fa\'il for emphasis or style.',
          examples: [
            { arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', translation: 'You alone we worship, and You alone we ask for help', source: 'Al-Fatiha 1:5' },
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 2, Chapter 1',
    },
    {
      difficulty: 'intermediate',
      summary: 'The maf\'ul bih can be fronted before the verb or fa\'il. Fronting is obligatory when the object is an interrogative or has an attached pronoun referring to the fa\'il. A verb can take multiple objects (verbs of the heart take two).',
      body: `## Intermediate Study of the Direct Object

### Fronting the Maf'ul bih
The object normally comes after the verb and fa'il, but fronting is possible:

**Obligatory fronting before the verb:**
- When the object is an interrogative: مَاذَا فَعَلْتَ؟ (What did you do?)
- For emphasis with إِيَّا: إِيَّاكَ نَعْبُدُ

**Obligatory fronting before the fa'il:**
- When the fa'il has a pronoun referring to the object: أَكْرَمَ الأُسْتَاذَ طُلَّابُهُ (The teacher's students honored him)

### Multiple Objects
Some verbs take **two objects**:
- Verbs of giving: أَعْطَيْتُ زَيْدًا كِتَابًا (I gave Zayd a book)
- Verbs of the heart: ظَنَنْتُ الامْتِحَانَ سَهْلًا (I thought the exam easy)

### Deletion of the Maf'ul bih
The object can be deleted when understood from context:
- رَبِّ اغْفِرْ (My Lord, forgive [me/my sins])`,
      rules: [
        {
          arabic: 'يجب تقديم المفعول به إذا كان اسم استفهام',
          english: 'The maf\'ul bih must be fronted when it is an interrogative word.',
          examples: [
            { arabic: 'مَاذَا فَعَلْتَ؟', translation: 'What did you do?', irab: 'مَاذَا: maf\'ul bih mansub, fronted' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Book 4-5',
    },
    {
      difficulty: 'advanced',
      summary: 'The advanced study of maf\'ul bih covers ishtighal (occupancy — when the verb is "busy" with a pronoun and the preceding noun is explained by it), detailed fronting rules, and deletion of the maf\'ul bih for rhetorical effect. Also covered: the maf\'ul bih of the masdar and participle.',
      body: `## Advanced Study of the Direct Object

### الاشتغال (Ishtighal/Occupancy)
A noun is fronted and the verb after it has a pronoun referring to it:
- زَيْدًا ضَرَبْتُهُ (Zayd — I hit him) → the verb is "occupied" with هُ instead of directly governing زَيْدًا
- The fronted noun is actually governed by an estimated (deleted) verb: [ضَرَبْتُ] زَيْدًا ضَرَبْتُهُ
- This is why the noun is in nasb — not by the visible verb, but by a hidden one

### Detailed Fronting Rules
1. **Fronting obligatory**: when maf'ul is an interrogative or conditional → مَنْ رَأَيْتَ؟
2. **Fronting obligatory**: when maf'ul is a quantifier with ال → كُلَّ ذَلِكَ فَعَلْتُ
3. **Fronting forbidden**: when there is ambiguity about which is fa'il and which is maf'ul

### Deletion for Rhetoric
- After response to question: مَنْ قَرَأْتَ؟ — الكِتَابَ (maf'ul kept, verb deleted)
- In Quran: إِيَّاكَ نَعْبُدُ — fronting + pronoun form for exclusive emphasis

### Maf'ul bih of the Masdar
إِعْطَاءُ زَيْدٍ المَالَ (المَالَ is maf'ul bih of the masdar إِعْطَاء)`,
      rules: [
        {
          arabic: 'الاشتغال: الفعل اشتغل بضمير المفعول عن المفعول نفسه',
          english: 'In ishtighal, the verb is "occupied" with a pronoun referring to a fronted noun. The fronted noun is actually governed by a hidden duplicate verb.',
          examples: [
            { arabic: 'زَيْدًا أَكْرَمْتُهُ', translation: 'Zayd — I honored him', irab: 'زَيْدًا: maf\'ul bih of a hidden verb [أَكْرَمْتُ] — أَكْرَمْتُهُ: visible verb occupied with هُ' },
          ],
        },
        {
          arabic: 'يجوز حذف المفعول به اختصارًا أو اقتصارًا',
          english: 'The maf\'ul bih can be deleted either for brevity (the listener can recover it) or for restricting the meaning to the verb alone.',
          examples: [
            { arabic: 'رَبِّ اغْفِرْ', translation: 'My Lord, forgive (me)', irab: 'Maf\'ul bih (لِي) deleted for brevity' },
            { arabic: 'هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ', translation: 'Are those who know equal to those who don\'t know?', source: 'Az-Zumar 39:9', irab: 'Maf\'ul bih deleted for restriction (emphasis is on knowing vs not knowing, not what is known)' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 7',
    },
  ],
  relatedTopicIds: ['transitive-intransitive', 'fail', 'verbal-sentence'],
  tags: ['maf\'ul', 'object', 'mansub', 'accusative', 'direct object'],
};

export const hal: NahwTopic = {
  id: 'hal',
  titleAr: 'الحال',
  titleEn: 'Hal (Circumstantial)',
  transliteration: 'al-Haal',
  categoryId: 'governed',
  subcategoryId: 'accusative',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The hal describes the state/condition of the doer or object at the time of the action. It is always indefinite (nakira) and in the accusative case (mansub). Example: أَعْبُدُ اللهَ خَاشِيًا (I worship Allah with humility).',
      body: `## Hal - The Circumstantial Accusative (الحال)

The hal answers the question "In what state?" (كَيْفَ؟). It describes the condition of the subject or object at the moment the action occurs.

Key features:
- Always **indefinite** (nakira)
- Always **accusative** (mansub)
- The word it describes (صاحب الحال) is usually definite (ma'rifa)`,
      rules: [
        {
          arabic: 'الحال منصوب ونكرة',
          english: 'The hal is always accusative and indefinite.',
          examples: [
            { arabic: 'أَعْبُدُ اللهَ خَاشِيًا', translation: 'I worship Allah with humility', irab: 'خَاشِيًا: hal mansub' },
            { arabic: 'جَاءَ زَيْدٌ رَاكِبًا', translation: 'Zayd came riding' },
          ],
        },
        {
          arabic: 'صاحب الحال معرفة',
          english: 'The possessor of hal (sahib al-hal) is typically definite.',
          examples: [
            { arabic: 'فَخَرَجَ مِنْهَا خَائِفًا يَتَرَقَّبُ', translation: 'So he left it fearful, looking about', source: 'Al-Qasas 28:21' },
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 2, Chapter 1',
    },
    {
      difficulty: 'intermediate',
      summary: 'The hal can be not only a single word (mufrad) but also a sentence (verbal or nominal) or a semi-sentence (jar-majrur/dharf). When the hal is a sentence, it may be introduced by waw al-haliyya. The sahib al-hal (possessor of the hal) has specific conditions.',
      body: `## Intermediate Study of the Hal

### Types of Hal
1. **Hal as mufrad** (single word): جَاءَ زَيْدٌ رَاكِبًا
2. **Hal as a verbal sentence**: جَاءَ زَيْدٌ يَرْكَبُ فَرَسَهُ
3. **Hal as a nominal sentence**: جَاءَ زَيْدٌ وَهُوَ رَاكِبٌ (with waw al-haliyya)
4. **Hal as jar-majrur/dharf**: رَأَيْتُ الهِلَالَ بَيْنَ السَّحَابِ
5. **Multiple hals**: جَاءَ زَيْدٌ رَاكِبًا مُبْتَسِمًا (both describe Zayd)

### Conditions for Sahib al-Hal
The sahib al-hal is typically definite (ma'rifa). If it is indefinite, the hal must be fronted or there must be grammatical justification.`,
      rules: [
        {
          arabic: 'الحال قد تكون جملة فعلية أو اسمية',
          english: 'The hal can be a verbal sentence, nominal sentence, or semi-sentence, not just a single word.',
          examples: [
            { arabic: 'جَاءَ زَيْدٌ يَضْحَكُ', translation: 'Zayd came laughing', irab: 'يَضْحَكُ: verbal sentence as hal' },
            { arabic: 'جَاءَ زَيْدٌ وَهُوَ يَضْحَكُ', translation: 'Zayd came while he was laughing', irab: 'وَهُوَ يَضْحَكُ: nominal sentence with waw al-haliyya as hal' },
          ],
        },
        {
          arabic: 'الأصل في صاحب الحال أن يكون معرفة',
          english: 'The sahib al-hal is typically definite. If indefinite, the hal should be fronted or have grammatical justification.',
          examples: [
            { arabic: 'فِيهَا يُفْرَقُ كُلُّ أَمْرٍ حَكِيمٍ', translation: 'In it every wise matter is decided' },
            { arabic: 'جَاءَنِي رَجُلٌ رَاكِبًا', translation: 'A man came to me riding', irab: 'Indefinite sahib al-hal is allowed after the hal or when justified' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Part 4',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced hal study covers: hal with indefinite sahib al-hal (conditions and justifications), obligatory hal that cannot be omitted, permanent vs. temporary hal, and complex Quranic hal constructions.',
      body: `## Advanced Study of the Hal

### Hal with Indefinite Sahib al-Hal
Hal from an indefinite noun is allowed when:
1. **Hal is fronted**: رَاكِبًا جَاءَ رَجُلٌ
2. **Sahib al-hal is qualified by na't**: جَاءَ رَجُلٌ طَوِيلٌ رَاكِبًا
3. **After negation**: مَا جَاءَ أَحَدٌ رَاكِبًا
4. **After interrogative**: هَلْ جَاءَ رَجُلٌ رَاكِبًا

### Obligatory Hal (الحال اللازمة)
Cannot be removed from the sentence:
- After خَلَقَ: خَلَقَ اللهُ الزَّرَافَةَ يَدَاهَا أَطْوَلُ مِنْ رِجْلَيْهَا
- In proverbs and fixed expressions

### Permanent vs. Temporary Hal
- **Temporary** (مؤقتة): the normal type — describes state at time of action
- **Permanent/continuous** (مؤكِّدة): reinforces an already known quality → وَأَرْسَلْنَاكَ لِلنَّاسِ رَسُولًا

### Linked vs. Sequential Multiple Hals
- **Linked** (مُتَرَادِفَة): both hals describe the same entity
- **Sequential** (مُتَدَاخِلَة): the second hal describes the possessor of the first`,
      rules: [
        {
          arabic: 'قد يأتي الحال من النكرة بشروط',
          english: 'Hal from an indefinite noun is allowed under specific conditions: after negation, interrogation, or when the hal is fronted.',
          examples: [
            { arabic: 'وَجَاءُوا أَبَاهُمْ عِشَاءً يَبْكُونَ', translation: 'And they came to their father at night, weeping', source: 'Yusuf 12:16', irab: 'يَبْكُونَ: hal sentence — عِشَاءً: dharf (time)' },
          ],
        },
        {
          arabic: 'الحال المؤكِّدة تؤكد مضمون الجملة',
          english: 'The confirming hal reinforces the content of the sentence rather than adding new information.',
          examples: [
            { arabic: 'وَأَرْسَلْنَاكَ لِلنَّاسِ رَسُولًا', translation: 'And We have sent you to mankind as a messenger', source: 'An-Nisa 4:79', irab: 'رَسُولًا: confirming hal — his being a messenger is already known from the verb أَرْسَلْنَاكَ' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 8',
    },
  ],
  relatedTopicIds: ['tamyiz', 'maf-ul-bih', 'na-t'],
  tags: ['hal', 'circumstantial', 'mansub', 'accusative', 'state', 'condition'],
};

export const tamyiz: NahwTopic = {
  id: 'tamyiz',
  titleAr: 'التمييز',
  titleEn: 'Tamyiz (Specifier)',
  transliteration: 'at-Tamyiz',
  categoryId: 'governed',
  subcategoryId: 'accusative',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The tamyiz is an indefinite noun in the accusative case that clarifies what is meant by an ambiguous quantity or concept. Example: رَمَضَانُ ثَلَاثُونَ يَوْمًا (Ramadan is thirty days).',
      body: `## Tamyiz - The Specifier (التمييز)

The tamyiz removes ambiguity from a preceding word or concept. It specifies **what kind** or **in what respect**.

Key features:
- Always **indefinite** (nakira)
- Always **accusative** (mansub)
- Removes ambiguity from numbers, measures, or general statements`,
      rules: [
        {
          arabic: 'التمييز منصوب ونكرة',
          english: 'The tamyiz is always accusative and indefinite, clarifying an ambiguous preceding element.',
          examples: [
            { arabic: 'رَمَضَانُ ثَلَاثُونَ يَوْمًا', translation: 'Ramadan is thirty days', irab: 'يَوْمًا: tamyiz mansub — specifies what "thirty" refers to' },
            { arabic: 'عِنْدِي رِطْلٌ عَسَلًا', translation: 'I have a pound of honey', irab: 'عَسَلًا: tamyiz mansub — specifies the measure' },
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 2, Chapter 1',
    },
    {
      difficulty: 'intermediate',
      summary: 'Tamyiz is of two types: tamyiz al-mufrad (also called tamyiz al-dhaat), which specifies a measure or number, and tamyiz al-nisba (also called tamyiz al-jumla), which specifies the meaning of an entire sentence. The latter is more subtle and common.',
      body: `## Intermediate Study of Tamyiz

### Tamyiz al-Mufrad/Dhaat (ذات)
Specifies a concrete measure, weight, number, or quantity:
- After numbers: عِنْدِي عِشْرُونَ كِتَابًا
- After measures: رِطْلٌ عَسَلًا, ذِرَاعٌ حَرِيرًا

### Tamyiz al-Nisba/Jumla (نسبة)
Specifies the meaning of a sentence:
- After comparative: زَيْدٌ أَكْثَرُ مَالًا (Zayd has more wealth)
- After verb of wonder: مَا أَحْسَنَ زَيْدًا رَجُلًا (How good Zayd is as a man)
- After كَفَى: كَفَى بِاللهِ شَهِيدًا (Allah suffices as a witness)
- After verbs like طَابَ, ازْدَادَ: طَابَ الرَّجُلُ نَفْسًا (The man became good in soul)

### Tamyiz after كَمْ
- **كَمِ الاستفهامية**: tamyiz is singular mansub: كَمْ كِتَابًا عِنْدَكَ (How many books do you have?)
- **كَمِ الخبرية**: tamyiz is singular majrur or plural majrur: كَمْ كِتَابٍ قَرَأْتُ (Many a book I read)`,
      rules: [
        {
          arabic: 'تمييز النسبة يوضح نسبة الكلام لا ذاتًا',
          english: 'Nisba tamyiz specifies the meaning of the overall sentence, not a concrete noun.',
          examples: [
            { arabic: 'طَابَ زَيْدٌ نَفْسًا', translation: 'Zayd became good in spirit', irab: 'نَفْسًا: tamyiz nisba — specifies what aspect "became good" refers to' },
            { arabic: 'زَيْدٌ أَكْبَرُ سِنًّا', translation: 'Zayd is older in age', irab: 'سِنًّا: tamyiz nisba mansub — specifies what أَكْبَرُ refers to' },
          ],
        },
        {
          arabic: 'تمييز كَمْ الاستفهامية مفرد منصوب',
          english: 'The tamyiz of interrogative كَمْ is singular and accusative, while that of khabariyya كَمْ is singular/plural and genitive.',
          examples: [
            { arabic: 'كَمْ كِتَابًا قَرَأْتَ؟', translation: 'How many books have you read?', irab: 'كِتَابًا: tamyiz mansub (interrogative كَمْ)' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Part 4',
    },
    {
      difficulty: 'advanced',
      summary: 'The "transfer" tamyiz (التمييز المحوّل) occurs when the tamyiz was originally a fa\'il or maf\'ul bih that was moved to the accusative tamyiz position. This transformation is a key concept in advanced grammar. Quranic examples illuminate complex tamyiz usage.',
      body: `## Advanced Study of Tamyiz

### Transfer Tamyiz (المحوّل)
The tamyiz was originally in another grammatical position:
1. **From fa'il**: طَابَ زَيْدٌ نَفْسًا (originally: طَابَتْ نَفْسُ زَيْدٍ — نَفْس was fa'il)
2. **From maf'ul**: فَجَّرْنَا الأَرْضَ عُيُونًا (We caused the earth to gush springs — originally عُيُون was maf'ul or related)
3. **From mubtada'**: أَنَا أَكْثَرُ مِنْكَ مَالًا (originally: مَالِي أَكْثَرُ — مَال was mubtada')

### Non-Transfer Tamyiz
Some tamyiz is not derived from another position: عِشْرُونَ كِتَابًا (not moved from anywhere)

### Quranic Examples
- وَاشْتَعَلَ الرَّأْسُ شَيْبًا (And the head has ignited with white hair) — شَيْبًا transferred from fa'il
- وَفَجَّرْنَا الأَرْضَ عُيُونًا (We caused the earth to gush forth springs) — عُيُونًا transferred from maf'ul

### Can Tamyiz Be Definite?
Rarely, and mostly in poetry. Standard rule: tamyiz must be indefinite.`,
      rules: [
        {
          arabic: 'التمييز المحوّل أصله فاعل أو مفعول',
          english: 'Transfer tamyiz was originally a fa\'il or maf\'ul bih that was moved to the accusative tamyiz position for rhetorical effect.',
          examples: [
            { arabic: 'وَاشْتَعَلَ الرَّأْسُ شَيْبًا', translation: 'And the head has ignited with white hair', source: 'Maryam 19:4', irab: 'شَيْبًا: tamyiz muharrak — originally fa\'il (اشْتَعَلَ شَيْبُ الرَّأْسِ → الرَّأْسُ اشْتَعَلَ شَيْبًا)' },
          ],
        },
        {
          arabic: 'التمييز لا يكون معرفةً في الغالب',
          english: 'Tamyiz is almost always indefinite in standard Arabic; definite tamyiz is extremely rare and limited to poetry.',
          examples: [
            { arabic: 'وَفَجَّرْنَا الأَرْضَ عُيُونًا', translation: 'And We caused the earth to gush forth springs', source: 'Al-Qamar 54:12', irab: 'عُيُونًا: tamyiz muharrak — indefinite, transferred from maf\'ul' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 8',
    },
  ],
  relatedTopicIds: ['hal', 'maf-ul-bih'],
  tags: ['tamyiz', 'specifier', 'mansub', 'accusative', 'number'],
};
