import type { NahwTopic } from '../types';

export const nat: NahwTopic = {
  id: 'na-t',
  titleAr: 'النعت',
  titleEn: 'Adjective (Na\'t)',
  transliteration: 'an-Na\'t',
  categoryId: 'governed',
  subcategoryId: 'following',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The na\'t (adjective) follows the noun it describes and matches it in four things: case, definiteness, gender, and number. Example: جَاءَ رَجُلٌ صَالِحٌ (A righteous man came).',
      body: `## The Adjective (النعت)

The na't (also called الصفة - sifa) is a **follower** (تابع) that describes a preceding noun (المنعوت - the described noun).

The na't must match its described noun in **four things**:
1. **Case** (إعراب) — nominative, accusative, or genitive
2. **Definiteness** (تعريف وتنكير) — definite or indefinite
3. **Gender** (تذكير وتأنيث) — masculine or feminine
4. **Number** (إفراد وتثنية وجمع) — singular, dual, or plural`,
      rules: [
        {
          arabic: 'النعت يتبع المنعوت في أربعة أشياء',
          english: 'The adjective follows the described noun in case, definiteness, gender, and number.',
          examples: [
            { arabic: 'جَاءَ رَجُلٌ صَالِحٌ', translation: 'A righteous man came', irab: 'Both indefinite, nominative, masculine, singular' },
            { arabic: 'رَأَيْتُ المَرْأَةَ الصَّالِحَةَ', translation: 'I saw the righteous woman', irab: 'Both definite, accusative, feminine, singular' },
          ],
        },
        {
          arabic: 'النعت قد يكون جملة',
          english: 'The na\'t can be a sentence (verbal or nominal) when the described noun is indefinite.',
          examples: [
            { arabic: 'جَاءَ رَجُلٌ يَحْمِلُ كِتَابًا', translation: 'A man carrying a book came', irab: 'يَحْمِلُ كِتَابًا: verbal sentence as na\'t' },
          ],
        },
      ],
      tables: [
        {
          title: 'Na\'t Agreement Rules',
          titleAr: 'مطابقة النعت للمنعوت',
          headers: ['Described Noun', 'Na\'t', 'Agreement'],
          rows: [
            ['رَجُلٌ صَالِحٌ', 'Indef. masc. sing. nom.', 'Full match'],
            ['الرَّجُلُ الصَّالِحُ', 'Def. masc. sing. nom.', 'Full match'],
            ['رَأَيْتُ امْرَأَةً صَالِحَةً', 'Indef. fem. sing. acc.', 'Full match'],
            ['الرِّجَالُ الصَّالِحُونَ', 'Def. masc. pl. nom.', 'Full match'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 2, Chapter 1',
    },
    {
      difficulty: 'intermediate',
      summary: 'There are two types of na\'t: real (حقيقي) describing the noun itself, and causal (سببي) describing something related to the noun. Causal na\'t only agrees in case and definiteness, not gender/number.',
      body: `## Intermediate Study of Na't

### Real Na't (النعت الحقيقي)
Describes the noun itself directly. Must match in all four aspects (case, definiteness, gender, number).

### Causal Na't (النعت السببي)
Describes something **related to** the described noun (like its possession or attribute). It only matches in **two things**: case and definiteness.

For gender, the causal na't follows the noun **after** it, not the described noun:
> جَاءَ رَجُلٌ حَسَنَةٌ أَخْلَاقُهُ — "A man came whose manners are good"
(حَسَنَةٌ is feminine because أَخْلَاق is feminine, not because رَجُل is masculine)

### Multiple Na'ts
A noun can have multiple adjectives, each following the same agreement rules:
> جَاءَ رَجُلٌ طَوِيلٌ كَرِيمٌ — "A tall, generous man came"`,
      rules: [
        {
          arabic: 'النعت السببي يتبع في اثنين فقط',
          english: 'The causal na\'t agrees with the described noun only in case and definiteness; it takes its gender from the noun after it.',
          examples: [
            { arabic: 'رَأَيْتُ رَجُلًا حَسَنَةً أَخْلَاقُهُ', translation: 'I saw a man whose manners are good', irab: 'حَسَنَةً: feminine (follows أَخْلَاق), accusative (follows رَجُلًا)' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Book 4-5',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced na\'t study covers detailed rules for causal na\'t (النعت السببي), na\'t with sentences and semi-sentences, and the conditions for when a sentence can serve as na\'t. Quranic analysis reveals complex na\'t constructions.',
      body: `## Advanced Study of Na't

### 1. Causal Na't — Detailed Rules
- Must contain a pronoun referring back to the described noun
- The pronoun must match the described noun in gender/number
- The na't itself only matches in case and definiteness

### 2. Na't with a Sentence
- Only indefinite nouns can be described by a sentence na't
- The sentence must contain a pronoun (explicit or hidden) linking back to the described noun
- جَاءَ رَجُلٌ يَحْمِلُ كِتَابًا (verbal sentence na't)
- جَاءَ رَجُلٌ أَبُوهُ كَرِيمٌ (nominal sentence na't)

### 3. Na't with a Semi-Sentence (شبه جملة)
- Jar-majrur or dharf: رَأَيْتُ عُصْفُورًا فَوْقَ الشَّجَرَةِ

### 4. Multiple Na'ts
A noun can have multiple adjectives, each following agreement rules.

### 5. Quranic Examples
وَقَالَ رَجُلٌ مُؤْمِنٌ مِنْ آلِ فِرْعَوْنَ يَكْتُمُ إِيمَانَهُ — has both single-word and sentence na't`,
      rules: [
        {
          arabic: 'النعت الجملة لا يكون إلا للنكرة',
          english: 'A sentence can only serve as na\'t for an indefinite noun.',
          examples: [
            { arabic: 'جَاءَ رَجُلٌ يَحْمِلُ كِتَابًا', translation: 'A man carrying a book came', irab: 'يَحْمِلُ كِتَابًا: verbal sentence as na\'t for the indefinite رَجُلٌ' },
            { arabic: 'رَأَيْتُ طَالِبًا أَبُوهُ عَالِمٌ', translation: 'I saw a student whose father is a scholar', irab: 'أَبُوهُ عَالِمٌ: nominal sentence as na\'t for the indefinite طَالِبًا' },
          ],
        },
        {
          arabic: 'النعت السببي يجب أن يشتمل على ضمير يعود على المنعوت',
          english: 'The causal na\'t must contain a pronoun that refers back to the described noun.',
          examples: [
            { arabic: 'وَقَالَ رَجُلٌ مُؤْمِنٌ مِنْ آلِ فِرْعَوْنَ يَكْتُمُ إِيمَانَهُ', translation: 'And a believing man from the family of Pharaoh who concealed his faith said', source: 'Ghafir 40:28', irab: 'مُؤْمِنٌ: single-word na\'t — يَكْتُمُ إِيمَانَهُ: sentence na\'t (pronoun ـهُ refers back to رَجُلٌ)' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 8',
    },
  ],
  relatedTopicIds: ['hal', 'mubtada-khabar', 'irab-signs'],
  tags: ['na\'t', 'sifa', 'adjective', 'follower', 'tabi\'', 'agreement'],
};

export const tawkid: NahwTopic = {
  id: 'tawkid',
  titleAr: 'التوكيد',
  titleEn: 'Emphasis (Tawkid)',
  transliteration: 'at-Tawkid',
  categoryId: 'governed',
  subcategoryId: 'following',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Tawkid (emphasis) is a follower (tabi\') that reinforces the meaning of the word before it. It comes in two types: verbal tawkid (التوكيد اللفظي) — repeating the exact word, and semantic tawkid (التوكيد المعنوي) — using special words like نَفْس، عَيْن، كُلّ، جَمِيع.',
      body: `## Emphasis (التوكيد)

Two types of tawkid:

### 1. Verbal (اللفظي)
Repeating the same word:
- جَاءَ جَاءَ زَيْدٌ
- الحَقَّ الحَقَّ

### 2. Semantic (المعنوي)
Using emphasis words:
- **نَفْس** (self): جَاءَ زَيْدٌ نَفْسُهُ (Zayd himself came)
- **عَيْن** (very): رَأَيْتُ الأَمِيرَ عَيْنَهُ (I saw the commander himself)
- **كُلّ** (all/entire): اتْرُكِ الذُّنُوبَ كُلَّهَا (Leave all sins)
- **جَمِيع** (all together): جَاءَ القَوْمُ جَمِيعُهُمْ

The tawkid follows the mu'akkad (emphasized word) in its case.`,
      rules: [
        {
          arabic: 'التوكيد يتبع المؤكَّد في إعرابه',
          english: 'Tawkid follows the emphasized word in its grammatical case (raf\', nasb, jarr).',
          examples: [
            { arabic: 'جَاءَ الأَمِيرُ نَفْسُهُ', translation: 'The commander himself came', irab: 'نَفْسُهُ: tawkid ma\'nawi, marfu\' (follows الأَمِيرُ)' },
            { arabic: 'رَأَيْتُ الأَمِيرَ نَفْسَهُ', translation: 'I saw the commander himself', irab: 'نَفْسَهُ: tawkid ma\'nawi, mansub (follows الأَمِيرَ)' },
          ],
        },
        {
          arabic: 'التوكيد اللفظي يكون بتكرار اللفظ',
          english: 'Verbal tawkid is achieved by repeating the exact word for emphasis.',
          examples: [
            { arabic: 'اتْرُكِ الذُّنُوبَ كُلَّهَا', translation: 'Leave all sins entirely', irab: 'كُلَّهَا: tawkid ma\'nawi mansub (follows الذُّنُوبَ)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Semantic Tawkid Words',
          titleAr: 'ألفاظ التوكيد المعنوي',
          headers: ['Word', 'Arabic', 'Meaning', 'Example'],
          rows: [
            ['نَفْس', 'Self', 'same/self', 'جَاءَ زَيْدٌ نَفْسُهُ'],
            ['عَيْن', 'Very/exact', 'the very same', 'رَأَيْتُ الأَمِيرَ عَيْنَهُ'],
            ['كُلّ', 'All/entire', 'all of', 'قَرَأْتُ الكِتَابَ كُلَّهُ'],
            ['جَمِيع', 'All together', 'all collectively', 'جَاءَ القَوْمُ جَمِيعُهُمْ'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 2, Chapter 2',
    },
    {
      difficulty: 'intermediate',
      summary: 'Semantic tawkid words have a critical condition: they must contain a pronoun suffix that matches the emphasized noun in person, gender, and number. Without this matching pronoun, the tawkid is invalid.',
      body: `## Intermediate Study of Tawkid

### 1. The Pronoun Must Match the Mu'akkad
- جَاءَ زَيْدٌ نَفْسُهُ (هُ matches زَيْد — masculine singular)
- جَاءَتْ هِنْدٌ نَفْسُهَا (هَا matches هِنْد — feminine singular)
- جَاءَ الرِّجَالُ أَنْفُسُهُمْ (هُمْ matches الرِّجَالُ — masculine plural)

### 2. Usage of كُلّ
كُلّ is used for plural/collective, not singular items (you say القَوْمُ كُلُّهُمْ but not typically زَيْدٌ كُلُّهُ).

### 3. Order
نَفْس/عَيْن for singulars, then كُلّ/جَمِيع for plurals and collectives.

### 4. Tawkid of Pronouns
You can emphasize pronouns:
- أَنْتَ نَفْسُكَ فَعَلْتَ ذَلِكَ`,
      rules: [
        {
          arabic: 'لا بد في التوكيد المعنوي من ضمير يطابق المؤكَّد',
          english: 'Semantic tawkid must contain a pronoun suffix matching the emphasized word in person, gender, and number.',
          examples: [
            { arabic: 'جَاءَ الطُّلَّابُ أَنْفُسُهُمْ', translation: 'The students themselves came', irab: 'أَنْفُسُهُمْ: tawkid ma\'nawi — هُمْ matches الطُّلَّابُ (masc. pl.)' },
            { arabic: 'رَأَيْتُ المَرْأَةَ عَيْنَهَا', translation: 'I saw the woman herself', irab: 'عَيْنَهَا: tawkid ma\'nawi — هَا matches المَرْأَةَ (fem. sing.)' },
          ],
        },
        {
          arabic: 'يجوز توكيد الضمير المتصل',
          english: 'Connected pronouns can be emphasized, but they should first be reinforced with a separate pronoun before the tawkid.',
          examples: [
            { arabic: 'أَنْتَ نَفْسُكَ قُلْتَ ذَلِكَ', translation: 'You yourself said that', irab: 'نَفْسُكَ: tawkid of the pronoun أَنْتَ' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Part 4',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced tawkid covers emphasis of implicit/hidden pronouns, the use of أَجْمَع and its sisters (أَجْمَعِين، جَمْعَاء، جُمَع) as emphatic follow-ups to كُلّ, and scholarly debates on whether verbal tawkid can span more than two repetitions.',
      body: `## Advanced Study of Tawkid

### 1. أَجْمَعُ and Its Sisters
Follow-up emphasis after كُلّ:
- Masculine singular: كُلُّهُ أَجْمَعُ
- Masculine plural: كُلُّهُمْ أَجْمَعُونَ (or أَجْمَعِينَ in nasb/jarr)
- Feminine singular: كُلُّهَا جَمْعَاءُ
- Feminine plural: كُلُّهُنَّ جُمَعُ

### 2. Order of Tawkid
نَفْس/عَيْن → كُلّ → أَجْمَع (cannot skip or reverse)

### 3. Hidden Pronoun Tawkid
To emphasize a hidden pronoun, first separate it:
- زَيْدٌ قَامَ هُوَ نَفْسُهُ (hidden pronoun in قَامَ → made explicit with هُوَ → then emphasized with نَفْسُهُ)

### 4. Verbal Tawkid Repetition
Verbal tawkid can be three repetitions max in prose: هَيَّا هَيَّا هَيَّا

### 5. Tawkid with Indefinite Nouns
Can you use tawkid with indefinite nouns? Majority say no (semantic tawkid requires definite noun).`,
      rules: [
        {
          arabic: 'أجمعُ وأخواتها تأتي تأكيدًا بعد كلّ',
          english: 'أَجْمَعُ and its feminine/plural forms follow كُلّ as additional emphasis, and cannot be used alone without كُلّ preceding.',
          examples: [
            { arabic: 'جَاءَ القَوْمُ كُلُّهُمْ أَجْمَعُونَ', translation: 'All the people came, every single one', irab: 'كُلُّهُمْ: first tawkid — أَجْمَعُونَ: second tawkid (intensifier after كُلّ)' },
          ],
        },
        {
          arabic: 'لا يؤكَّد بالنفس والعين إلا المعرفة',
          english: 'Semantic tawkid with نَفْس and عَيْن can only emphasize definite nouns, not indefinite ones.',
          examples: [
            { arabic: 'جَاءَ الرَّجُلُ نَفْسُهُ', translation: 'The man himself came', irab: 'Valid: الرَّجُلُ is definite' },
            { arabic: 'لَا يُقَالُ: جَاءَ رَجُلٌ نَفْسُهُ', translation: 'Invalid: cannot emphasize indefinite noun رَجُلٌ with نَفْس' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 8',
    },
  ],
  relatedTopicIds: ['na-t', 'atf', 'badal', 'mubtada-khabar'],
  tags: ['tawkid', 'emphasis', 'follower', 'tabi\'', 'nafs', 'ayn', 'kull'],
};

export const atf: NahwTopic = {
  id: 'atf',
  titleAr: 'العطف',
  titleEn: 'Conjunction (\'Atf)',
  transliteration: 'al-\'Atf',
  categoryId: 'governed',
  subcategoryId: 'following',
  levels: [
    {
      difficulty: 'beginner',
      summary: '\'Atf (conjunction) connects a word to a previous word using a conjunction particle, making the second word follow the first in grammatical case. There are 9 conjunction particles, each with a different meaning.',
      body: `## Conjunction (العطف)

The 'atf structure: **المعطوف عليه + حرف العطف + المعطوف**

The ma'tuf (conjoined word) follows the ma'tuf 'alayhi (word conjoined to) in its i'rab.`,
      rules: [
        {
          arabic: 'المعطوف يتبع المعطوف عليه في إعرابه',
          english: 'The conjoined word follows the word it is conjoined to in grammatical case.',
          examples: [
            { arabic: 'أَطِيعُوا اللهَ وَرَسُولَهُ', translation: 'Obey Allah and His Messenger', irab: 'رَسُولَهُ: ma\'tuf mansub (follows اللهَ in accusative)' },
            { arabic: 'جَاءَ زَيْدٌ وَعَمْرٌو', translation: 'Zayd and Amr came', irab: 'عَمْرٌو: ma\'tuf marfu\' (follows زَيْدٌ)' },
          ],
        },
        {
          english: 'There are 9 conjunction particles, each with its own meaning and usage.',
          examples: [
            { arabic: 'ثُمَّ', translation: 'then (with delay)' },
            { arabic: 'فَ', translation: 'then (immediately)' },
            { arabic: 'أَوْ', translation: 'or' },
          ],
        },
      ],
      tables: [
        {
          title: 'The 9 Conjunction Particles',
          titleAr: 'حروف العطف التسعة',
          headers: ['#', 'Particle', 'Meaning', 'Example', 'Translation'],
          rows: [
            ['1', 'وَ', 'and', 'جَاءَ زَيْدٌ وَعَمْرٌو', 'Zayd and Amr came'],
            ['2', 'فَ', 'then (immediately)', 'دَخَلَ فَجَلَسَ', 'He entered then sat'],
            ['3', 'ثُمَّ', 'then (with delay)', 'أَكَلَ ثُمَّ شَرِبَ', 'He ate then drank'],
            ['4', 'أَوْ', 'or', 'خُذْ كِتَابًا أَوْ قَلَمًا', 'Take a book or pen'],
            ['5', 'أَمْ', 'or (in question)', 'أَزَيْدٌ عِنْدَكَ أَمْ عَمْرٌو', 'Is Zayd with you or Amr?'],
            ['6', 'لَا', 'not (negating second)', 'جَاءَ زَيْدٌ لَا عَمْرٌو', 'Zayd came, not Amr'],
            ['7', 'بَلْ', 'rather/but', 'مَا جَاءَ زَيْدٌ بَلْ عَمْرٌو', 'Zayd didn\'t come, rather Amr'],
            ['8', 'لَكِنْ', 'but/however', 'مَا جَاءَ زَيْدٌ لَكِنْ عَمْرٌو', 'Zayd didn\'t come but Amr did'],
            ['9', 'حَتَّى', 'until/even', 'أَكَلْتُ السَّمَكَةَ حَتَّى رَأْسَهَا', 'I ate the fish even its head'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 2, Chapter 2',
    },
    {
      difficulty: 'intermediate',
      summary: 'Each conjunction particle carries a specific nuance. وَ indicates simple joining, فَ adds immediacy and sequence, ثُمَّ adds delay between events, أَوْ can mean choice or doubt, and بَلْ indicates correction or retraction.',
      body: `## Intermediate Study of 'Atf

### 1. وَ (and)
Joins without implying order:
- جَاءَ زَيْدٌ وَعَمْرٌو (both came, maybe simultaneously)

### 2. فَ (then — immediately)
Implies immediate sequence:
- دَخَلَ فَجَلَسَ (entered then immediately sat)

### 3. ثُمَّ (then — with delay)
Implies delayed sequence:
- زَرَعَ ثُمَّ حَصَدَ (planted then [after time] harvested)

### 4. أَوْ (or)
Choice (in commands), doubt (in statements), or division:
- اقْرَأْ أَوِ اكْتُبْ (choice)

### 5. أَمْ (or — in questions)
Only in questions, paired with hamza:
- أَعَرَبِيٌّ أَمْ أَعْجَمِيٌّ (is he Arab or non-Arab?)

### 6. بَلْ (rather)
Correction after negative or retraction after affirmative:
- مَا زَيْدٌ شَاعِرًا بَلْ كَاتِبًا

### 7. لَكِنْ (but)
Correction after negative only:
- مَا جَاءَ زَيْدٌ لَكِنْ عَمْرٌو

### 8. حَتَّى as Conjunction
The ma'tuf must be part of the ma'tuf 'alayhi (part of the whole).`,
      rules: [
        {
          arabic: 'الواو لمطلق الجمع والفاء للترتيب والتعقيب',
          english: 'Waw indicates simple joining without order; fa indicates both order and immediacy; thumma indicates order with delay.',
          examples: [
            { arabic: 'تَوَضَّأَ فَصَلَّى', translation: 'He performed wudu then immediately prayed', irab: 'فَ: conjunction particle indicating immediate sequence' },
          ],
        },
        {
          arabic: 'أَوْ للتخيير في الأمر وللشك في الخبر',
          english: 'أَوْ indicates choice in commands and doubt/uncertainty in statements.',
          examples: [
            { arabic: 'اقْرَأْ أَوِ اكْتُبْ', translation: 'Read or write (your choice)', irab: 'أَوْ: conjunction of choice' },
            { arabic: 'جَاءَ زَيْدٌ أَوْ عَمْرٌو', translation: 'Zayd or Amr came (speaker unsure)', irab: 'أَوْ: conjunction of doubt' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Part 4',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced \'atf covers the 9 conjunction particles with their detailed meanings and conditions, and the important distinction between عطف النسق (regular conjunction) and عطف البيان (explicative apposition). The latter resembles badal but has key differences.',
      body: `## Advanced Study of 'Atf

### 1. عَطْفُ النَّسَق (Regular Conjunction)
Standard conjunction with the 9 particles (covered above).

### 2. عَطْفُ البَيَان (Explicative Apposition)
The second noun explains the first without a conjunction particle:
- Like na't but with proper nouns: عُمَرُ الفَارُوقُ (Umar the Distinguisher)
- Reveals the identity of an unclear noun: جَاءَنِي أَخُوكَ زَيْدٌ (your brother, i.e. Zayd)

### 3. Difference Between 'Atf al-Bayan and Badal
- **'Atf al-bayan**: the second is meant to clarify/explain the first (both intended)
- **Badal**: the second replaces the first (only the second is intended)
- **Test**: if you can remove the first word and meaning holds → badal; if both are needed → 'atf al-bayan

### 4. Conditions for حَتَّى as Conjunction
The ma'tuf must be part of the ma'tuf 'alayhi and typically the extreme (most/least) of it.

### 5. Special Rules for لَكِنْ
Can only follow negative or prohibition.`,
      rules: [
        {
          arabic: 'عطف البيان يوضح المعطوف عليه بدون حرف عطف',
          english: '\'Atf al-bayan (explicative apposition) clarifies the preceding noun without a conjunction particle, similar to na\'t with proper nouns.',
          examples: [
            { arabic: 'عُمَرُ الفَارُوقُ خَلِيفَةُ المُسْلِمِينَ', translation: 'Umar the Distinguisher, the caliph of Muslims', irab: 'الفَارُوقُ: \'atf bayan for عُمَرُ (clarifies which Umar)' },
          ],
        },
        {
          arabic: 'الفرق بين عطف البيان والبدل: البيان توضيح والبدل إحلال',
          english: 'The difference: \'atf al-bayan explains (both words intended), while badal replaces (only the second intended).',
          examples: [
            { arabic: 'جَاءَنِي أَخُوكَ زَيْدٌ', translation: 'Your brother, Zayd, came to me', irab: 'زَيْدٌ: \'atf bayan — clarifies who أَخُوكَ is (both needed for full meaning)' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 8',
    },
  ],
  relatedTopicIds: ['na-t', 'tawkid', 'badal', 'maf-ul-ma-ahu'],
  tags: ['atf', 'conjunction', 'waw', 'fa', 'thumma', 'follower', 'tabi\''],
};

export const badal: NahwTopic = {
  id: 'badal',
  titleAr: 'البدل',
  titleEn: 'Substitution (Badal)',
  transliteration: 'al-Badal',
  categoryId: 'governed',
  subcategoryId: 'following',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Badal (substitution) is a follower where the second word is the actual intended meaning, and the first is mentioned as an introduction. There are 4 types: all-from-all (بدل كُلّ من كُلّ), part-from-all (بدل بعض من كُلّ), inclusion (بدل اشتمال), and mistake (بدل غلط).',
      body: `## Substitution (البدل)

The badal follows the mubdal minhu (substituted-from) in case. Four types:

### 1. All-from-All (بدل كل من كل)
Synonym or restatement:
- اعْبُدْ رَبَّكَ إِلَهَ العَالَمِينَ

### 2. Part-from-All (بدل بعض من كل)
Part of the whole:
- أَكَلْتُ الرَّغِيفَ ثُلُثَهُ

### 3. Inclusion (بدل اشتمال)
Attribute contained in:
- أَعْجَبَنِي زَيْدٌ عِلْمُهُ

### 4. Mistake (بدل غلط)
Correcting a slip:
- رَأَيْتُ زَيْدًا عَمْرًا`,
      rules: [
        {
          arabic: 'البدل يتبع المبدل منه في الإعراب',
          english: 'The badal follows the mubdal minhu in grammatical case.',
          examples: [
            { arabic: 'اهْدِنَا الصِّرَاطَ المُسْتَقِيمَ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ', translation: 'Guide us to the straight path, the path of those You have blessed', source: 'Al-Fatiha 1:6-7', irab: 'صِرَاطَ الَّذِينَ: badal kull min kull, mansub (follows الصِّرَاطَ)' },
          ],
        },
        {
          english: 'The four types of badal differ in the relationship between the badal and what it substitutes for.',
          examples: [
            { arabic: 'أَعْجَبَنِي زَيْدٌ عِلْمُهُ', translation: 'Zayd\'s knowledge impressed me', irab: 'عِلْمُهُ: badal ishtimal marfu\' — knowledge is contained in Zayd but is not Zayd himself' },
          ],
        },
      ],
      tables: [
        {
          title: 'The Four Types of Badal',
          titleAr: 'أنواع البدل الأربعة',
          headers: ['Type', 'Arabic Term', 'Example', 'Translation'],
          rows: [
            ['All from all', 'بدل كل من كل', 'اعْبُدْ رَبَّكَ إِلَهَ العَالَمِينَ', 'Worship your Lord, the God of the worlds'],
            ['Part from all', 'بدل بعض من كل', 'أَكَلْتُ الرَّغِيفَ ثُلُثَهُ', 'I ate the loaf — a third of it'],
            ['Inclusion', 'بدل اشتمال', 'أَعْجَبَنِي زَيْدٌ عِلْمُهُ', 'Zayd impressed me — his knowledge'],
            ['Mistake', 'بدل غلط', 'رَأَيْتُ زَيْدًا عَمْرًا', 'I saw Zayd — I mean Amr'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 2, Chapter 2',
    },
    {
      difficulty: 'intermediate',
      summary: 'Badal from pronouns is very common, especially in Quranic Arabic. Part-from-all and inclusion badal must contain a pronoun referring back to the mubdal minhu. Understanding when a following noun is badal vs. na\'t vs. \'atf al-bayan is important.',
      body: `## Intermediate Study of Badal

### 1. Badal from Pronouns
Very common in Quran:
- Pronoun + explicit badal: لَهُ فِيهَا زَفِيرٌ — هَا is mubdal minhu, content that follows is badal

### 2. Part-from-All Conditions
The badal must contain a pronoun matching the mubdal minhu:
- أَكَلْتُ الرَّغِيفَ ثُلُثَـ(ـهُ) — هُ refers back to الرَّغِيف

### 3. Inclusion Badal
Same pronoun condition:
- أَعْجَبَنِي زَيْدٌ عِلْمُـ(ـهُ) — هُ refers back to زَيْد

### 4. Badal in Quran
قُلْ أَغَيْرَ اللهِ أَتَّخِذُ وَلِيًّا فَاطِرِ السَّمَاوَاتِ — فَاطِرِ is badal from اللهِ`,
      rules: [
        {
          arabic: 'بدل البعض والاشتمال يجب اشتماله على ضمير يعود على المبدل منه',
          english: 'Part-from-all and inclusion badal must contain a pronoun referring back to the mubdal minhu.',
          examples: [
            { arabic: 'قَرَأْتُ الكِتَابَ نِصْفَهُ', translation: 'I read the book — half of it', irab: 'نِصْفَهُ: badal ba\'d min kull — هُ refers back to الكِتَابَ' },
          ],
        },
        {
          arabic: 'البدل من الضمير كثير في القرآن',
          english: 'Badal from pronouns is very common in Quranic Arabic.',
          examples: [
            { arabic: 'قُلْ أَغَيْرَ اللهِ أَتَّخِذُ وَلِيًّا فَاطِرِ السَّمَاوَاتِ وَالأَرْضِ', translation: 'Say: Shall I take a protector other than Allah, Originator of heavens and earth?', source: 'Al-An\'am 6:14', irab: 'فَاطِرِ: badal kull min kull from اللهِ, majrur' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Part 4',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced badal covers substitution with sentences, the scholarly debate on the relationship between badal and \'atf al-bayan, and edge cases where the badal\'s case differs from expectations. Some grammarians consider badal al-ghalat (mistake badal) to not truly exist in formal Arabic.',
      body: `## Advanced Study of Badal

### 1. Badal with Sentence
A full sentence can serve as badal for another sentence:
- مَنْ يَفْعَلْ خَيْرًا يَجِدْ ثَوَابَهُ، مَنْ يُصَلِّ يُثَبْ — second conditional is badal for the first

### 2. Relationship with 'Atf al-Bayan
- Some scholars (like Ibn Hisham) consider them very close, almost identical
- Key difference: badal = the second replaces the first; 'atf al-bayan = the second clarifies the first
- **Test**: if first can be removed → badal; if both needed → 'atf al-bayan

### 3. بدل الغلط in Formal Arabic
Most scholars say it exists only in speech, not in prepared/written Arabic. In Quran, what looks like mistake badal is actually بدل إضراب (retraction badal) — a deliberate rhetorical correction.

### 4. Badal Case Disagreement
Rare cases where badal appears to disagree in case with mubdal minhu due to hidden operators.`,
      rules: [
        {
          arabic: 'البدل قد يكون جملة من جملة',
          english: 'A complete sentence can serve as badal for another sentence, replacing its meaning entirely.',
          examples: [
            { arabic: 'أَمَدَّكُمْ بِمَا تَعْلَمُونَ أَمَدَّكُمْ بِأَنْعَامٍ وَبَنِينَ', translation: 'He extended to you what you know, extended to you livestock and sons', source: 'Ash-Shu\'ara 26:132-133', irab: 'أَمَدَّكُمْ بِأَنْعَامٍ: sentence badal — explains what مَا تَعْلَمُونَ refers to' },
          ],
        },
        {
          arabic: 'بدل الغلط لا يقع في فصيح الكلام عند الأكثرين',
          english: 'Most scholars hold that badal al-ghalat (mistake substitution) does not occur in formal/eloquent Arabic — it exists only in casual speech.',
          examples: [
            { arabic: 'رَأَيْتُ زَيْدًا — عَمْرًا أَعْنِي', translation: 'I saw Zayd — I mean Amr', irab: 'In formal Arabic, this is expressed with correction (إضراب), not as a grammatical badal' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 8',
    },
  ],
  relatedTopicIds: ['na-t', 'tawkid', 'atf', 'mubtada-khabar'],
  tags: ['badal', 'substitution', 'follower', 'tabi\'', 'apposition'],
};
