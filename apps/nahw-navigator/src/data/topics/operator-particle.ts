import type { NahwTopic } from '../types';

export const prepositions: NahwTopic = {
  id: 'prepositions',
  titleAr: 'حروف الجر',
  titleEn: 'Prepositions',
  transliteration: 'Huruf al-Jarr',
  categoryId: 'operator',
  subcategoryId: 'operator-particles',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Prepositions (huruf al-jarr) are 13 particles that put the noun after them in the genitive case (majrur). They include بِ، مِنْ، إِلَى، عَنْ، عَلَى، اللام، فِي، الكاف, and others.',
      body: `## Prepositions (حروف الجر)

Prepositions are particles that cause the noun following them to take the **genitive case** (kasra or ya'). There are **13 prepositions** in Arabic.

They are the primary cause of the genitive case in nouns.`,
      rules: [
        {
          arabic: 'حروف الجر تجر الاسم بعدها',
          english: 'Prepositions put the noun after them in the genitive case (majrur).',
        },
      ],
      tables: [
        {
          title: 'The 13 Prepositions',
          titleAr: 'حروف الجر الثلاثة عشر',
          headers: ['#', 'Particle', 'Meaning', 'Example', 'Translation'],
          rows: [
            ['1', 'بِ', 'with/by', 'أَسْتَعِينُ بِاللهِ', 'I seek help from Allah'],
            ['2', 'مِنْ', 'from', 'تُبْتُ مِنْ كُلِّ ذَنْبٍ', 'I repented from every sin'],
            ['3', 'إِلَى', 'to/toward', 'تُبْتُ إِلَى اللهِ', 'I turned to Allah'],
            ['4', 'عَنْ', 'from/away from', 'لَا نَرْغَبُ عَنْ سُنَّةِ نَبِيِّنَا', 'We don\'t turn from our Prophet\'s way'],
            ['5', 'عَلَى', 'on/upon', 'تَجِبُ التَّوْبَةُ عَلَى كُلِّ مُذْنِبٍ', 'Repentance is obligatory on every sinner'],
            ['6', 'لِ', 'for/to', 'نَصُومُ للهِ', 'We fast for Allah'],
            ['7', 'فِي', 'in', 'النَّجَاةُ فِي الصِّدْقِ', 'Salvation is in truthfulness'],
            ['8', 'كَ', 'like/as', 'العِلْمُ كَالنُّورِ', 'Knowledge is like light'],
            ['9', 'حَتَّى', 'until', 'أَعْبُدُ اللهَ حَتَّى المَوْتِ', 'I worship Allah until death'],
            ['10', 'وَ (قسم)', 'by (oath)', 'وَاللهِ لَا أَكْذِبَنَّ', 'By Allah, I shall not lie'],
            ['11', 'تَ (قسم)', 'by (oath)', 'تَاللهِ لَأَصْدُقَنَّ', 'By Allah, I shall speak truth'],
            ['12', 'مُذْ', 'since', 'تُبْتُ مُذْ يَوْمِ البُلُوغِ', 'I repented since maturity'],
            ['13', 'مُنْذُ', 'since', 'تَجِبُ الصَّلَاةُ مُنْذُ يَوْمِ البُلُوغِ', 'Prayer is obligatory since maturity'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 1, Chapter 2',
    },
    {
      difficulty: 'intermediate',
      summary: 'Each preposition carries multiple meanings depending on context. For example, بِ can mean "with" (instrument), "by means of" (cause), or be extra (زائدة) for emphasis. Understanding these meanings is essential for correct i\'rab.',
      body: `## Preposition Meanings in Detail

### Meanings of بِ (ba')
1. **Instrument/means** (الاستعانة): كَتَبْتُ بِالقَلَمِ — I wrote with a pen
2. **Cause** (السببية): هَلَكَ بِالجُوعِ — He perished because of hunger
3. **Oath** (القسم): بِاللهِ لَأَفْعَلَنَّ — By Allah I shall do it
4. **Extra/emphatic** (الزائدة): كَفَى بِاللهِ شَهِيدًا — Allah suffices as a witness

### Meanings of مِنْ (min)
1. **Starting point** (ابتداء الغاية): سَافَرْتُ مِنْ مَكَّةَ — I traveled from Mecca
2. **Partitive** (التبعيض): أَنْفِقُوا مِنْ طَيِّبَاتِ مَا كَسَبْتُمْ — Spend from the good things you earned
3. **Genus** (بيان الجنس): فَاجْتَنِبُوا الرِّجْسَ مِنَ الأَوْثَانِ — Avoid the abomination of idols
4. **Extra/emphatic** (الزائدة): مَا جَاءَنَا مِنْ بَشِيرٍ — No bringer of good tidings came to us

### Meanings of اللام (lam)
1. **Possession** (الملك): للهِ مَا فِي السَّمَاوَاتِ — To Allah belongs what is in the heavens
2. **Purpose** (التعليل): جِئْتُ لِلدِّرَاسَةِ — I came to study
3. **Benefit** (الاختصاص): الحَمْدُ للهِ — Praise is for Allah`,
      rules: [
        {
          arabic: 'حروف الجر لها معانٍ متعددة',
          english: 'Each preposition carries multiple meanings determined by context.',
        },
        {
          arabic: 'الباء الزائدة لا تؤثر في المعنى',
          english: 'The "extra ba\'" (ba\' za\'ida) is used for emphasis and doesn\'t change the core meaning.',
          examples: [
            { arabic: 'كَفَى بِاللهِ شَهِيدًا', translation: 'Allah suffices as a witness', source: 'An-Nisa 4:79', irab: 'بِ: extra (za\'ida) — اللهِ: fa\'il of كَفَى' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Book 1-2',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study covers: conditions for حَتَّى as a preposition vs. particle of nasb, the difference between مُذْ/مُنْذُ as prepositions vs. adverbs, scholarly debates on the number of prepositions, and the phenomenon of extra (za\'ida) prepositions.',
      body: `## Advanced Study of Prepositions

### Hatta (حتى) — Three Functions
حتى operates differently based on context:
1. **Preposition** (حرف جر): أَكَلْتُ السَّمَكَةَ حَتَّى رَأْسِهَا — I ate the fish including its head
2. **Particle of nasb** (حرف نصب): اعْبُدْ رَبَّكَ حَتَّى يَأْتِيَكَ اليَقِينُ — Worship your Lord until certainty comes
3. **Starting particle** (حرف ابتداء): مَرِضَ حَتَّى لَا يَرْجُونَهُ — He fell ill until they had no hope

### Mudh/Mundhu (مُذْ/مُنْذُ) — Dual Function
- **As prepositions** (followed by a noun): مَا رَأَيْتُهُ مُنْذُ يَوْمِ الجُمُعَةِ
- **As adverbs** (followed by a sentence): مَا رَأَيْتُهُ مُنْذُ سَافَرَ

### Extra Prepositions (حروف الجر الزائدة)
Three prepositions can be "extra" (grammatically present but semantically redundant):
- **مِنْ** after negation/question: هَلْ مِنْ خَالِقٍ غَيْرُ اللهِ
- **بِ** after كَفَى and similar: كَفَى بِاللهِ وَلِيًّا
- **اللام** in certain idioms

### Scholarly Debate on Number
Some scholars count additional prepositions:
- **رُبَّ** (sometimes/many a): رُبَّ أَخٍ لَكَ لَمْ تَلِدْهُ أُمُّكَ
- **خَلَا / عَدَا / حَاشَا** (except) — debated whether prepositions or verbs
- Some grammarians count up to 20 prepositions`,
      rules: [
        {
          arabic: 'حتى لها ثلاثة أوجه',
          english: 'Hatta has three grammatical functions: preposition (jarr), particle of nasb (for verbs), and starter particle (ibtida\').',
        },
        {
          arabic: 'مذ ومنذ قد يكونان ظرفين',
          english: 'Mudh and mundhu function as prepositions before nouns but as adverbs before sentences.',
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 3-4',
    },
  ],
  relatedTopicIds: ['irab-signs', 'maf-ul-bih'],
  tags: ['jarr', 'preposition', 'huruf', 'ba', 'min', 'ila', 'an', 'ala', 'fi', 'lam'],
};

export const nasbParticles: NahwTopic = {
  id: 'nasb-particles',
  titleAr: 'حروف النصب',
  titleEn: 'Nasb Particles',
  transliteration: 'Huruf an-Nasb',
  categoryId: 'operator',
  subcategoryId: 'operator-particles',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Four particles put the present tense verb (mudari\') in the subjunctive (nasb): أَنْ (to), كَيْ (in order to), لَنْ (will never), and إِذَنْ (then).',
      body: `## Nasb Particles (حروف النصب)

These four particles enter upon the present tense verb (المضارع) and change its ending from damma (ـُ) to fatha (ـَ).`,
      rules: [
        {
          arabic: 'حروف النصب تنصب الفعل المضارع',
          english: 'Nasb particles put the mudari\' verb in the accusative (subjunctive), changing its ending to fatha.',
        },
      ],
      tables: [
        {
          title: 'The 4 Nasb Particles',
          titleAr: 'حروف النصب الأربعة',
          headers: ['#', 'Particle', 'Meaning', 'Example', 'Translation'],
          rows: [
            ['1', 'أَنْ', 'to', 'أُحِبُّ أَنْ أُطِيعَ اللهَ', 'I love to obey Allah'],
            ['2', 'كَيْ', 'in order to', 'أُحِبُّ طُولَ العُمْرِ كَيْ أَطْلُبَ العِلْمَ', 'I love long life to seek knowledge'],
            ['3', 'لَنْ', 'will never', 'لَنْ أُشْرِكَ بِاللهِ', 'I will never associate partners with Allah'],
            ['4', 'إِذَنْ', 'then', 'إِذَنْ تَدْخُلَ الجَنَّةَ', 'Then you will enter Paradise'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 1, Chapter 2',
    },
    {
      difficulty: 'intermediate',
      summary: 'أَنْ can be hidden (مُضْمَرَة) after certain particles like لام التعليل, حتى, and فاء السببية. Understanding hidden أَنْ is essential for correctly analyzing verb case endings.',
      body: `## Intermediate Study of Nasb Particles

### Hidden أَنْ (أَنْ المُضْمَرَة)
In several constructions, أَنْ is **implied** but not written:

1. **After لام التعليل** (lam of purpose): جِئْتُ لِأَتَعَلَّمَ → جِئْتُ لِ(أَنْ) أَتَعَلَّمَ
2. **After حَتَّى** (until/so that): اعْبُدْ رَبَّكَ حَتَّى يَأْتِيَكَ اليَقِينُ
3. **After فاء السببية** (fa of causation): لَا تَكْسَلْ فَتَنْدَمَ
4. **After واو المعية** (waw of accompaniment): لَا تَنْهَ عَنْ خُلُقٍ وَتَأْتِيَ مِثْلَهُ
5. **After أَوْ** (meaning إِلَى أَنْ): أَسْلِمْ أَوْ تَمُوتَ

### Conditions for إِذَنْ
For إِذَنْ to cause nasb, three conditions must be met:
1. It must be at the beginning of a sentence (in response)
2. The verb must refer to the future
3. It must not be separated from the verb`,
      rules: [
        {
          arabic: 'أَنْ قد تكون مُضْمَرَة',
          english: 'The particle أَنْ can be hidden (implied) after certain particles, still causing the verb to be in nasb.',
          examples: [
            { arabic: 'جِئْتُ لِأَتَعَلَّمَ', translation: 'I came to learn', irab: 'أَتَعَلَّمَ: mansub by hidden أَنْ after لام التعليل' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Book 2',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study of nasb particles covers the hidden أَنْ in 10+ positions beyond the basic ones, the conditions for each position, and scholarly debates on whether nasb in certain constructions is truly caused by hidden أَنْ or by other factors.',
      body: `## Advanced Nasb Particle Study

### 1. Hidden أَنْ in Detail — Positions Where It Is Implied
a. **After لام التعليل:** لِيَعْلَمَ (= لِأَنْ يَعْلَمَ)
b. **After لام الجحود** (negation lam after كان منفية): مَا كَانَ اللهُ لِيُعَذِّبَهُمْ
c. **After حَتَّى:** حَتَّى يَأْتِيَ
d. **After فاء السببية** (after negation/request): لَا تَكْسَلْ فَتَنْدَمَ
e. **After واو المعية** (after negation/request): لَا تَنْهَ عَنْ خُلُقٍ وَتَأْتِيَ مِثْلَهُ
f. **After أَوْ** (meaning إِلَى أَنْ or إِلَّا أَنْ): لَأَقْتُلَنَّهُ أَوْ يُسْلِمَ
g. **After ثُمَّ** in rhetorical contexts (debated)

### 2. Conditions for فاء السببية to Cause Nasb
The fa must be preceded by one of these:
a. Negation (نَفْي)
b. Command (أَمْر)
c. Prohibition (نَهْي)
d. Wish (تَمَنٍّ)
e. Hope (تَرَجٍّ)
f. Question (استفهام)
g. Offer (عَرْض)

The fa must indicate a result/consequence of what precedes it.

### 3. Scholarly Debate
Some Kufan grammarians reject the concept of hidden أَنْ and say the nasb is caused by the particles themselves (لام, حتى, etc.).

### 4. إِذَنْ Conditions Reviewed
- Must be at start of clause
- Verb must be future
- No separation between إِذَنْ and the verb`,
      rules: [
        {
          arabic: 'أَنْ تُضمر وجوبًا بعد لام الجحود',
          english: 'أَنْ is obligatorily hidden after لام الجحود (negation lam after negated كان/يكون).',
          examples: [
            { arabic: 'مَا كَانَ اللهُ لِيُعَذِّبَهُمْ', translation: 'Allah would not punish them', source: 'Al-Anfal 8:33', irab: 'لِيُعَذِّبَهُمْ: لام الجحود + hidden أَنْ + mansub verb' },
          ],
        },
        {
          arabic: 'فاء السببية تنصب المضارع بشروط',
          english: 'Fa\' al-sababiyya causes nasb of the mudari\' only when preceded by negation, command, prohibition, wish, hope, question, or offer.',
          examples: [
            { arabic: 'لَا تَكْسَلْ فَتَنْدَمَ', translation: 'Don\'t be lazy, lest you regret', irab: 'فَتَنْدَمَ: mansub by hidden أَنْ after فاء السببية (preceded by prohibition)' },
            { arabic: 'اجْتَهِدْ فَتَنْجَحَ', translation: 'Study hard so you succeed', irab: 'فَتَنْجَحَ: mansub by hidden أَنْ after فاء السببية (preceded by command)' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 4',
    },
  ],
  relatedTopicIds: ['jazm-particles', 'verbal-sentence'],
  tags: ['nasb', 'subjunctive', 'an', 'kay', 'lan', 'idhan', 'mudari'],
};

export const jazmParticles: NahwTopic = {
  id: 'jazm-particles',
  titleAr: 'حروف الجزم',
  titleEn: 'Jazm Particles',
  transliteration: 'Huruf al-Jazm',
  categoryId: 'operator',
  subcategoryId: 'operator-particles',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Jazm particles put the present tense verb in the jussive case (sukun). Four particles affect one verb (لَمْ، لَمَّا، لام الأمر، لا الناهية), and two conditional particles affect two verbs (إِنْ، إِذْمَا).',
      body: `## Jazm Particles (حروف الجزم)

These particles enter upon the present tense verb and put it in the **jussive case** (مجزوم), typically indicated by sukun.

### Type 1: Affecting One Verb
Four particles affect a single verb.

### Type 2: Affecting Two Verbs (Conditional)
Two particles create conditional sentences, affecting both the condition verb and the answer verb.`,
      rules: [
        {
          arabic: 'حروف الجزم تجزم الفعل المضارع',
          english: 'Jazm particles put the mudari\' verb in the jussive case (sukun on the last letter).',
        },
      ],
      tables: [
        {
          title: 'Jazm Particles - Single Verb',
          titleAr: 'حروف الجزم - فعل واحد',
          headers: ['#', 'Particle', 'Meaning', 'Example', 'Translation'],
          rows: [
            ['1', 'لَمْ', 'did not', 'لَمْ تَطْلُعِ الشَّمْسُ', 'The sun has not risen'],
            ['2', 'لَمَّا', 'not yet', 'لَمَّا يُؤَذِّنِ المُؤَذِّنُ', 'The muezzin has not yet called'],
            ['3', 'لِـ (الأمر)', 'let (command)', 'لِيَذْهَبْ إِلَى المَسْجِدِ', 'Let him go to the mosque'],
            ['4', 'لَا (الناهية)', 'don\'t (prohibition)', 'لَا تَتْرُكْ صَلَاةَ الفَجْرِ', 'Don\'t abandon Fajr prayer'],
          ],
        },
        {
          title: 'Jazm Particles - Two Verbs (Conditional)',
          titleAr: 'حروف الجزم - فعلين',
          headers: ['#', 'Particle', 'Example', 'Translation'],
          rows: [
            ['1', 'إِنْ', 'إِنْ تَتُبْ تُغْفَرْ ذُنُوبُكَ', 'If you repent, your sins will be forgiven'],
            ['2', 'إِذْمَا', 'إِذْمَا تَتُبْ تُقْبَلْ تَوْبَتُكَ', 'Whenever you repent, your repentance is accepted'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 1, Chapter 2',
    },
    {
      difficulty: 'intermediate',
      summary: 'Beyond the two conditional particles, there are 11 conditional nouns (asma\' al-shart) that also cause jazm of two verbs: مَنْ، مَا، مَهْمَا، مَتَى، أَيَّانَ, and others. The condition clause and answer each have specific rules.',
      body: `## Intermediate Study of Jazm

### Conditional Nouns (أسماء الشرط)
In addition to إِنْ and إِذْمَا, there are **11 conditional nouns** that cause jazm:
مَنْ، مَا، مَهْمَا، مَتَى، إِذَا مَا، أَيَّانَ، أَيْنَ، أَيْنَمَا، أَنَّى، حَيْثُمَا، أَيٌّ

### The Conditional Answer (جواب الشرط)
When the answer cannot be a jussive verb (e.g., it's a nominal sentence, past tense, or has an extra particle), a **فَ** (fa) is added:
- إِنْ تَتُبْ فَأَنْتَ مُفْلِحٌ (If you repent, then you are successful)
- إِنْ جَاءَكَ فَاسِقٌ بِنَبَإٍ فَتَبَيَّنُوا (If a fasiq comes to you with news, then verify)

### Difference between لَمْ and لَمَّا
- **لَمْ**: Simple past negation — the action may happen later
- **لَمَّا**: Negation with expectation — implies the action hasn't happened **yet** but is expected`,
      rules: [
        {
          arabic: 'أسماء الشرط تجزم فعلين',
          english: 'Conditional nouns cause jazm of two verbs: the condition and the answer.',
          examples: [
            { arabic: 'مَنْ يَعْمَلْ صَالِحًا يَدْخُلِ الجَنَّةَ', translation: 'Whoever does good will enter Paradise' },
            { arabic: 'أَيْنَمَا تَكُونُوا يُدْرِكْكُمُ المَوْتُ', translation: 'Wherever you are, death will reach you', source: 'An-Nisa 4:78' },
          ],
        },
        {
          arabic: 'الفاء تربط جواب الشرط',
          english: 'Fa is added to the conditional answer when it cannot take jazm directly.',
        },
      ],
      sourceRef: 'Al-Wusta, Book 2-3',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced jazm study details all 11 conditional nouns with their specific meanings and conditions. Also covered: detailed rules for the conditional answer (jawab al-shart), when the fa\' al-jaza\' is required, and the interaction between conditional tools and verb tense.',
      body: `## Advanced Jazm Study

### 1. The 11 Conditional Nouns in Detail
a. **مَنْ:** for rational beings → مَنْ يَعْمَلْ سُوءًا يُجْزَ بِهِ
b. **مَا:** for non-rational/general → مَا تَفْعَلُوا مِنْ خَيْرٍ يَعْلَمْهُ اللهُ
c. **مَهْمَا:** for non-rational (like مَا) → مَهْمَا تَأْتِنَا بِهِ مِنْ آيَةٍ
d. **مَتَى:** for time → مَتَى تَجْتَهِدْ تَنْجَحْ
e. **أَيَّانَ:** for time (formal) → أَيَّانَ تَطْلُبِ العِلْمَ تَجِدْهُ
f. **أَيْنَ:** for place → أَيْنَمَا تَكُونُوا يُدْرِكْكُمُ المَوْتُ
g. **أَنَّى:** for place/manner → أَنَّى تَذْهَبْ أَذْهَبْ مَعَكَ
h. **حَيْثُمَا:** for place → حَيْثُمَا تَجْلِسْ أَجْلِسْ
i. **أَيّ:** flexible (for all) → أَيَّ كِتَابٍ تَقْرَأْ أَقْرَأْ
j. **إِذَا مَا:** like إِذَا for time → إِذَا مَا تَأْتِنِي آتِكَ
k. **كَيْفَمَا:** for manner (debated) → كَيْفَمَا تَجْلِسْ أَجْلِسْ

### 2. When فَاء الجزاء Is Required in the Answer
a. When the answer is a **nominal sentence:** إِنْ تَجْتَهِدْ فَأَنْتَ نَاجِحٌ
b. When the answer is a **past tense verb with قَدْ:** إِنْ تَجْتَهِدْ فَقَدْ نَجَحْتَ
c. When the answer starts with **سَوْفَ/سَ:** إِنْ تَتُبْ فَسَوْفَ يَغْفِرُ اللهُ
d. When the answer starts with **لَنْ/مَا:** إِنْ تَجْتَهِدْ فَلَنْ تَنْدَمَ
e. When the answer is **imperative:** إِنْ رَأَيْتَ الفَقِيرَ فَأَعْطِهِ
f. **Mnemonic:** answers with these cannot be put in jazm, so fa is needed

### 3. أَيّ Is Unique
أَيّ is the only conditional noun that is mu'rab (takes i'rab), and it is always mudaf.`,
      rules: [
        {
          arabic: 'فاء الجزاء واجبة إذا كان الجواب جملة اسمية',
          english: 'The fa\' of conditional answer is obligatory when the answer is a nominal sentence, past tense with qad, starts with sawfa/sa/lan/ma, or is imperative.',
          examples: [
            { arabic: 'إِنْ تَجْتَهِدْ فَأَنْتَ نَاجِحٌ', translation: 'If you study hard, then you are successful', irab: 'فَ: fa\' al-jaza\' (obligatory — answer is nominal sentence)' },
          ],
        },
        {
          arabic: 'أَيّ هي الوحيدة المعربة من أسماء الشرط',
          english: 'أَيّ is the only conditional noun that takes i\'rab (is declinable) — all others are indeclinable (mabni).',
          examples: [
            { arabic: 'أَيَّ كِتَابٍ تَقْرَأْ أَقْرَأْ', translation: 'Whichever book you read, I will read', irab: 'أَيَّ: conditional noun mansub (maf\'ul bih of تَقْرَأْ) — mu\'rab, mudaf to كِتَابٍ' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Parts 4-5',
    },
  ],
  relatedTopicIds: ['nasb-particles', 'verbal-sentence'],
  tags: ['jazm', 'jussive', 'lam', 'lamma', 'la nahiya', 'shart', 'conditional'],
};
