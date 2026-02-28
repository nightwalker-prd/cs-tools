import type { SarfTopic } from '../types';

// ============================================================================
// Topic 10: The Verbal Noun / Masdar (al-Masdar)
// ============================================================================

export const clMasdar: SarfTopic = {
  id: 'cl-masdar',
  titleAr: 'المصدر',
  titleEn: 'The Verbal Noun (Masdar)',
  transliteration: 'al-Masdar',
  categoryId: 'cl-derivatives',
  subcategoryId: 'cl-verbal-nouns',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'The verbal noun (masdar) is the source from which verbs and nouns are derived. It indicates an action stripped of time reference.',
      body: `## The Verbal Noun / Masdar (المصدر)

The verbal noun (masdar / مصدر) is the **source** from which verbs and nouns are derived (منه يُشتقّ الأفعال والأسماء).

Unlike verbs, the masdar indicates an **event or action** without any time reference. For example:
- نَصْرٌ (nasr) — "helping" (the act itself, not tied to past/present/future)
- إِكْرَامٌ (ikraam) — "honoring"

Each verb form has its own masdar pattern. The bare trilateral verb has many possible masdar patterns (سماعي / heard), while the augmented forms have regular, predictable patterns (قياسي / analogical).`,
      rules: [
        {
          arabic: 'المصدر: اسم يدل على الحدث مجرد من الزمان',
          english:
            'The masdar is a noun indicating an event/action, stripped of time reference. From it, verbs and nouns are derived.',
          examples: [
            { arabic: 'نَصْرٌ', translation: 'helping (masdar of nasara)' },
            { arabic: 'إِكْرَامٌ', translation: 'honoring (masdar of akrama)' },
            { arabic: 'دَحْرَجَةٌ', translation: 'rolling (masdar of dahraja)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Masdar Patterns by Verb Form',
          titleAr: 'أوزان المصادر حسب الأبواب',
          headers: ['Verb Form', 'Masdar Pattern', 'Example'],
          rows: [
            ['تَفْعِيل (Form II)', 'تَفْعِيلًا', 'تَعْلِيمًا (teaching)'],
            ['مُفَاعَلَة (Form III)', 'مُفَاعَلَةً', 'مُقَاتَلَةً (fighting)'],
            ['إِفْعَال (Form IV)', 'إِفْعَالًا', 'إِكْرَامًا (honoring)'],
            ['تَفَعُّل (Form V)', 'تَفَعُّلًا', 'تَعَلُّمًا (learning)'],
            ['تَفَاعُل (Form VI)', 'تَفَاعُلًا', 'تَبَادُلًا (exchanging)'],
            ['اِنْفِعَال (Form VII)', 'اِنْفِعَالًا', 'اِنْكِسَارًا (breaking)'],
            ['اِفْتِعَال (Form VIII)', 'اِفْتِعَالًا', 'اِجْتِمَاعًا (gathering)'],
            ['اِسْتِفْعَال (Form X)', 'اِسْتِفْعَالًا', 'اِسْتِغْفَارًا (seeking forgiveness)'],
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Maqsid 2, Muqaddimah',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta details the masdar patterns for the bare trilateral verb, showing that different patterns convey different semantic nuances. A single verb may have multiple masdars with distinct meanings.',
      body: `## Detailed Masdar Patterns (أوزان المصدر)

Al-Wusta provides an extensive catalog of masdar patterns for the bare trilateral verb, each associated with particular semantic fields:

### Common Patterns by Usage

- **فَعْل (fa'l)** — Common in transitive verbs: صَدٌّ (blocking), وَقْفٌ (stopping)
- **فَعَل (fa'al)** — Common in intransitive verbs from فَعِلَ: فَرَحٌ (joy)
- **فُعُولَة (fu'oola)** — Common in intransitive verbs from فَعُلَ: سُهُولَة (ease)
- **فَعَالَة (fa'aala)** — Common in intransitive verbs from فَعُلَ: شَجَاعَة (bravery)
- **فُعُول (fu'ool)** — Common in intransitive verbs: صُدُود (turning away)
- **فِعَالَة (fi'aala)** — Common in professions: تِجَارَة (trade), وِكَالَة (agency)
- **فُعَال (fu'aal)** — Common in diseases and sounds: زُكَام (cold), بُكَاء (crying)
- **فَعِيل (fa'eel)** — Common in sounds and travel: شَهِيق (gasping), رَحِيل (departure)
- **فَعَلَان (fa'alaan)** — Common in fluctuation and movement: غَلَيَان (boiling)

### Multiple Masdars

A single verb may have **two masdars** with different meanings:
- هُدًى (hudan) — guidance in religion (الدِّين)
- هِدَايَة (hidaaya) — guidance on the path (السَّبِيل)

### Ism al-Masdar (اسم المصدر)

The ism al-masdar is a masdar-like noun whose letters are **fewer** than the letters of its verb:
- وُضُوء (wudoo' — ablution) from تَوَضَّأَ (tawadda'a — to perform ablution)`,
      rules: [
        {
          arabic: 'المصدر اسم يدل على الحدث مجرد من الزمان، ومنه يُشتق الأفعال والأسماء',
          english:
            'The masdar indicates an event stripped of time. Basran grammarians hold the masdar is the origin; Kufan grammarians hold the verb is the origin.',
          examples: [
            { arabic: 'صَدٌّ', translation: 'blocking (fa\'l pattern — transitive)' },
            { arabic: 'فَرَحٌ', translation: 'joy (fa\'al pattern — intransitive)' },
            { arabic: 'شَجَاعَة', translation: 'bravery (fa\'aala pattern — intransitive from fa\'ula)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Masdar Patterns with Semantic Fields',
          titleAr: 'أوزان المصدر ومعانيها',
          headers: ['Pattern', 'Semantic Field', 'Example'],
          rows: [
            ['فِعَالَة (fi\'aala)', 'Professions & governance', 'تِجَارَة (trade)'],
            ['فُعَال (fu\'aal)', 'Diseases & sounds', 'زُكَام (cold/flu)'],
            ['فَعَلَان (fa\'alaan)', 'Fluctuation & movement', 'غَلَيَان (boiling)'],
            ['فُعْلَة (fu\'la)', 'Colors', 'حُمْرَة (redness)'],
            ['فِعَل (fi\'al)', 'Area & space', 'كِبَر (largeness)'],
            ['تَفْعَال (taf\'aal)', 'Amplification', 'تَجْوَال (roaming)'],
            ['فَعَلُوت (fa\'aloot)', 'Hyperbole', 'مَلَكُوت (dominion)'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 2, Muqaddimah',
    },
  ],
  relatedTopicIds: ['cl-past-tense', 'cl-derived-nouns'],
  tags: ['masdar', 'verbal-noun', 'derivatives'],
};

// ============================================================================
// Topic 11: The Past Tense (al-Maadi)
// ============================================================================

export const clPastTense: SarfTopic = {
  id: 'cl-past-tense',
  titleAr: 'الفعل الماضي',
  titleEn: 'The Past Tense',
  transliteration: 'al-Fi\'l al-Maadi',
  categoryId: 'cl-derivatives',
  subcategoryId: 'cl-tenses',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'The past tense indicates an action that occurred in the past. It covers pronoun attachment, active/passive voice, and negation with maa and laa.',
      body: `## The Past Tense (الفعل الماضي)

The past tense (al-maadi / الماضي) indicates an action that occurred **in the past**.

> Example: حَجَّ رسولُ اللهِ ﷺ (The Messenger of Allah performed Hajj)

### Pronoun Attachment

The attached nominative (subject) pronouns connect to the past tense verb:
- نَصَرَا (they two [m.] helped)
- نَصَرُوا (they [m.] helped)

### Active and Passive Voice

| Type | Examples |
|------|----------|
| **Active** (المعلوم فاعله) | نَصَرَ (he helped), أَكْرَمَ (he honoured) |
| **Passive** (المجهول فاعله) | نُصِرَ (he was helped), أُكْرِمَ (he was honoured) |

### Negation

Two particles negate the past tense:
- **مَا** — Simple negation: مَا كَذَبَ (he did not lie)
- **لَا** — In supplications: لَا قَدَّرَ اللهُ (may Allah not decree it)`,
      rules: [
        {
          arabic: 'الماضي يدل على حدث وقع في الزمن الماضي',
          english:
            'The past tense indicates an action that occurred in the past. It is negated with maa and laa.',
          examples: [
            { arabic: 'نَصَرَ', translation: 'he helped (active past)' },
            { arabic: 'نُصِرَ', translation: 'he was helped (passive past)' },
            { arabic: 'مَا كَذَبَ', translation: 'he did not lie (negated)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Active vs. Passive Past Tense',
          titleAr: 'الماضي المعلوم والمجهول',
          headers: ['Type', 'Trilateral', 'Form IV', 'Quadrilateral'],
          rows: [
            ['Active', 'نَصَرَ (nasara)', 'أَكْرَمَ (akrama)', 'زَلْزَلَ (zalzala)'],
            ['Passive', 'نُصِرَ (nusira)', 'أُكْرِمَ (ukrima)', 'زُلْزِلَ (zulzila)'],
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Maqsid 2, Baab 1, Fasl 1',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta provides the complete conjugation table, i\'raab (parsing) rules, and detailed active/passive voice formation for the past tense including augmented forms.',
      body: `## Detailed Past Tense Analysis

### I'raab of the Past Tense

The past tense verb is **indeclinable** (مَبْنِيّ / mabniyy):
- Built on **damma** with واو الجماعة: سَمِعُوا الْقُرْآنَ
- Built on **sukoon** with a connected moving pronoun: رَضِيتُ
- Built on **fatha** in all other cases: سَمِعَ الْقُرْآنَ

### Passive Voice Formation

The passive past is formed by giving the **first voweled letter damma** and the **letter before the last kasra**:
- نَصَرَ → نُصِرَ, أَكْرَمَ → أُكْرِمَ

**Special rules:**
- If the past starts with hamzat al-wasl, the **third letter** gets damma: اُنْتُخِبَ, اُسْتُخْرِجَ
- If there is an extra alif after the faa', it becomes a waaw: حُورِسَ, تُعُورِفَ`,
      rules: [
        {
          arabic: 'الماضي مبني على الفتح، وعلى الضم مع واو الجماعة، وعلى السكون مع الضمائر المتحركة',
          english:
            'The past tense is built on fatha by default, damma with waaw al-jamaa\'a, and sukoon with moving pronouns.',
          examples: [
            { arabic: 'سَمِعَ', translation: 'he heard (built on fatha)' },
            { arabic: 'سَمِعُوا', translation: 'they heard (built on damma)' },
            { arabic: 'سَمِعْتُ', translation: 'I heard (built on sukoon)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Past Tense Conjugation Table',
          titleAr: 'تصريف الفعل الماضي',
          headers: ['Person', 'Pronoun', 'Conjugation'],
          rows: [
            ['3rd m. sg.', 'هُوَ (hidden)', 'نَصَرَ'],
            ['3rd m. dual', 'الألف', 'نَصَرَا'],
            ['3rd m. pl.', 'الواو', 'نَصَرُوا'],
            ['3rd f. sg.', 'هِيَ (hidden)', 'نَصَرَتْ'],
            ['3rd f. dual', 'الألف', 'نَصَرَتَا'],
            ['3rd f. pl.', 'النون', 'نَصَرْنَ'],
            ['2nd m. sg.', 'التاء', 'نَصَرْتَ'],
            ['2nd f. sg.', 'التاء', 'نَصَرْتِ'],
            ['2nd dual', 'التاء + م + ا', 'نَصَرْتُمَا'],
            ['2nd m. pl.', 'التاء + م', 'نَصَرْتُمْ'],
            ['2nd f. pl.', 'التاء + ن', 'نَصَرْتُنَّ'],
            ['1st sg.', 'التاء', 'نَصَرْتُ'],
            ['1st pl.', 'النون + ا', 'نَصَرْنَا'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 2, Baab 1, Fasl 1',
    },
  ],
  relatedTopicIds: ['cl-present-tense', 'cl-imperative-prohibition', 'cl-masdar'],
  tags: ['past-tense', 'maadi', 'conjugation', 'tenses'],
};

// ============================================================================
// Topic 12: The Present Tense (al-Mudaari')
// ============================================================================

export const clPresentTense: SarfTopic = {
  id: 'cl-present-tense',
  titleAr: 'الفعل المضارع',
  titleEn: 'The Present Tense',
  transliteration: 'al-Fi\'l al-Mudaari\'',
  categoryId: 'cl-derivatives',
  subcategoryId: 'cl-tenses',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'The present/imperfect tense indicates present or future action. It is marked by one of four prefix letters (أنيت) and can be negated by five particles.',
      body: `## The Present Tense (الفعل المضارع)

The present/imperfect tense (al-mudaari' / المضارع) indicates:
- **Present** (الحال): زيدٌ يُصَلِّي الآنَ (Zayd is praying now)
- **Future** (المستقبل): فاطمةُ تَصومُ غدًا (Fatimah will fast tomorrow)

### The Four Prefix Letters (حروف المضارعة)

The present tense is marked by one of **four prefix letters**, remembered by the mnemonic أَنَيْتُ:

| Letter | Arabic |
|--------|--------|
| Hamzah (أ) | 1st person singular |
| Nun (ن) | 1st person plural |
| Taa' (ت) | 2nd person & 3rd feminine |
| Yaa' (ي) | 3rd person masculine |

### Negation

Five particles negate the present tense:
1. **مَا** — negates present: مَا يَكْذِبُ (he is not lying)
2. **لَا** — negates present/future: لَا يَكْذِبُ (he does not lie)
3. **لَمْ** — flips to past meaning: لَمْ يُذْنِبْ (he did not sin)
4. **لَمَّا** — past with expectation: لَمَّا يَتُبْ (he has not yet repented)
5. **لَنْ** — emphatic future negation: لَنْ يَكْذِبَ (he will never lie)`,
      rules: [
        {
          arabic: 'المضارع يدل على الحال أو المستقبل، ويُعرف بحروف المضارعة: أنيت',
          english:
            'The mudaari\' indicates present or future action. It is identified by the four prefix letters: hamzah, nun, taa\', yaa\' (ANYT).',
          examples: [
            { arabic: 'يَنْصُرُ', translation: 'he helps (3rd m. sg.)' },
            { arabic: 'تَنْصُرُ', translation: 'she helps / you help (3rd f. / 2nd m.)' },
            { arabic: 'أَنْصُرُ', translation: 'I help (1st sg.)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Five Particles of Negation',
          titleAr: 'أحرف نفي المضارع الخمسة',
          headers: ['Particle', 'Function', 'Example'],
          rows: [
            ['مَا', 'Negates present', 'مَا يَكْذِبُ (he is not lying)'],
            ['لَا', 'Negates present & future', 'لَا يَكْذِبُ (he does not lie)'],
            ['لَمْ', 'Flips to past; causes jazm', 'لَمْ يُذْنِبْ (he did not sin)'],
            ['لَمَّا', 'Past + expectation; causes jazm', 'لَمَّا يَتُبْ (not yet repented)'],
            ['لَنْ', 'Emphatic future negation; causes nasb', 'لَنْ يَكْذِبَ (he will never lie)'],
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Maqsid 2, Baab 1, Fasl 2',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta covers the complete conjugation, i\'raab (parsing) in three forms, active/passive voice formation, the Five Verbs concept, and the Noon of Emphasis.',
      body: `## Detailed Present Tense Analysis

### I'raab of the Mudaari'

The mudaari' has three forms of i'raab:

**1. Overt I'raab** — with hidden pronoun and sound final letter:
- Raf' (nominative): damma — يَنْصُرُ
- Nasb (accusative): fatha — أَنْ يَنْصُرَ
- Jazm (jussive): removal of vowel — لَمْ يَنْصُرْ

**2. The Five Verbs** (الأفعال الخمسة) — ending in noon al-i'raab:
- Raf': retaining noon — يَنْصُرَانِ, يَنْصُرُونَ
- Nasb/Jazm: dropping noon — لَنْ يَنْصُرُوا, لَمْ يَنْصُرُوا

**3. Implied I'raab** — ending in weak letter:
- If ending in waaw/yaa': implied damma, apparent fatha, deletion for jazm
- If ending in alif: implied damma AND fatha, deletion for jazm

### Active and Passive Voice

- **Active**: prefix letter has **fatha** for trilateral (يَنْصُرُ), **damma** for 4+ letters (يُكْرِمُ)
- **Passive**: prefix letter has **damma**, letter before last has **fatha** (يُنْصَرُ, يُكْرَمُ)

### The Noon of Emphasis (نون التوكيد)

Two types: heavy (نَّ) and light (نْ). Attaches for future, imperative, or prohibition emphasis.`,
      rules: [
        {
          arabic: 'المضارع معرب إلا إذا اتصلت به نون النسوة أو نون التوكيد',
          english:
            'The mudaari\' is fully declinable (mu\'rab) unless the feminine plural noon or the noon of emphasis attaches to it.',
          examples: [
            { arabic: 'يَنْصُرُ / أَنْ يَنْصُرَ / لَمْ يَنْصُرْ', translation: 'he helps / that he help / he did not help (raf\'/nasb/jazm)' },
            { arabic: 'يَنْصُرَانِ / لَنْ يَنْصُرَا / لَمْ يَنْصُرَا', translation: 'they two help (Five Verbs — noon retained/dropped)' },
            { arabic: 'يَرْمِي / أَنْ يَرْمِيَ / لَمْ يَرْمِ', translation: 'he throws (implied/apparent/deletion)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Present Tense Conjugation Table',
          titleAr: 'تصريف الفعل المضارع',
          headers: ['Person', 'Prefix', 'Conjugation'],
          rows: [
            ['3rd m. sg.', 'ي', 'يَنْصُرُ'],
            ['3rd m. dual', 'ي', 'يَنْصُرَانِ'],
            ['3rd m. pl.', 'ي', 'يَنْصُرُونَ'],
            ['3rd f. sg.', 'ت', 'تَنْصُرُ'],
            ['3rd f. dual', 'ت', 'تَنْصُرَانِ'],
            ['3rd f. pl.', 'ي', 'يَنْصُرْنَ'],
            ['2nd m. sg.', 'ت', 'تَنْصُرُ'],
            ['2nd f. sg.', 'ت', 'تَنْصُرِينَ'],
            ['2nd dual', 'ت', 'تَنْصُرَانِ'],
            ['2nd m. pl.', 'ت', 'تَنْصُرُونَ'],
            ['2nd f. pl.', 'ت', 'تَنْصُرْنَ'],
            ['1st sg.', 'أ', 'أَنْصُرُ'],
            ['1st pl.', 'ن', 'نَنْصُرُ'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 2, Baab 1, Fasl 2',
    },
  ],
  relatedTopicIds: ['cl-past-tense', 'cl-imperative-prohibition'],
  tags: ['present-tense', 'mudaari', 'conjugation', 'tenses'],
};

// ============================================================================
// Topic 13: Imperative and Prohibition (al-Amr wa an-Nahy)
// ============================================================================

export const clImperativeProhibition: SarfTopic = {
  id: 'cl-imperative-prohibition',
  titleAr: 'الأمر والنهي',
  titleEn: 'Imperative & Prohibition',
  transliteration: 'al-Amr wa an-Nahy',
  categoryId: 'cl-derivatives',
  subcategoryId: 'cl-tenses',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'The imperative indicates future action (a command), and the prohibition uses laa an-naahiya with the mudaari\' to forbid an action.',
      body: `## The Imperative and Prohibition (الأمر والنهي)

### The Imperative (فعل الأمر)

The imperative (al-amr / الأمر) indicates the **future** (المستقبل):

> ﴿ وَاعْبُدُوا اللهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا ﴾
> "Worship Allah and do not associate anything with Him"

**Pronoun attachment:**
- اُعْبُدْ (worship! [sing. m.])
- اُعْبُدَا (worship! [dual m.])
- اُعْبُدُوا (worship! [pl. m.])

### The Prohibition (النهي)

The prohibition uses **لَا النَّاهِيَة** (the prohibitive laa) with the majzoom mudaari':
- لَا تَكْذِبْ (do not lie!)

### The Laam of Command (لام الأمر)

For 3rd person and 1st person commands, the laam of command attaches to the mudaari':
> ﴿ لِيُنْفِقْ ﴾ (let him spend)`,
      rules: [
        {
          arabic: 'الأمر يدل على طلب الفعل في المستقبل، والنهي يدل على طلب ترك الفعل',
          english:
            'The imperative requests an action in the future; the prohibition requests refraining from an action.',
          examples: [
            { arabic: 'اُعْبُدْ', translation: 'worship! (2nd m. sg.)' },
            { arabic: 'اُعْبُدُوا', translation: 'worship! (2nd m. pl.)' },
            { arabic: 'لَا تَكْذِبْ', translation: 'do not lie! (prohibition)' },
          ],
        },
      ],
      tables: [],
      sourceRef: 'As-Sughra fi at-Tasreef, Maqsid 2, Baab 1, Fasl 3',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta details how the imperative is formed from the majzoom mudaari\', the rules for hamzat al-wasl, the 3rd-person imperative with laam al-amr, and the Noon of Emphasis.',
      body: `## Detailed Imperative and Prohibition

### Forming the Imperative

The imperative is formed from the **2nd person forms of the majzoom mudaari'** by removing the prefix letter:
- تُعَلِّمُ → عَلِّمْ (teach!)

**Rules for hamzat al-wasl:**
If the letter after the removed prefix is saakin, add hamzat al-wasl:
- If the 'ayn has **fatha or kasra**: hamza gets **kasra** — اِرْكَعُوا (bow down!)
- If the 'ayn has **damma**: hamza gets **damma** — اُسْجُدُوا (prostrate!)

### The 3rd Person Imperative

Formed by adding the **laam of command** (لام الأمر المكسورة) to the majzoom mudaari':
- لِيَفْعَلُوا (let them do)
- The laam becomes silent in connected speech: فَلْيَعْمَلُوا

### The Prohibition (النهي)

Formed by adding لَا النَّاهِيَة to the 2nd person majzoom mudaari':
- لَا تَكْذِبْ (do not lie!)

### The Noon of Emphasis (نون التوكيد)

Two types attach to the mudaari' for emphasis:
1. **Heavy noon** (نون ثقيلة / نَّ): اِعْبُدَنَّ
2. **Light noon** (نون خفيفة / نْ): اِعْبُدَنْ

The heavy noon takes **kasra** with the alif pronoun and **fatha** in all other cases.`,
      rules: [
        {
          arabic: 'الأمر يُبنى من المضارع المجزوم بحذف حرف المضارعة',
          english:
            'The imperative is built from the majzoom mudaari\' by removing the prefix letter. If the next letter is saakin, add hamzat al-wasl.',
          examples: [
            { arabic: 'تَعَلَّمْ → اِرْكَعْ', translation: 'bow! (hamza with kasra — \'ayn has fatha)' },
            { arabic: 'اُسْجُدْ', translation: 'prostrate! (hamza with damma — \'ayn has damma)' },
            { arabic: 'لِيُنْفِقْ', translation: 'let him spend (3rd person with laam al-amr)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Imperative with Noon of Emphasis',
          titleAr: 'الأمر مع نون التوكيد',
          headers: ['Type', 'Form', 'Example'],
          rows: [
            ['Heavy noon (نَّ)', '2nd m. sg.', 'اِعْبُدَنَّ (worship! [emphatic])'],
            ['Heavy noon (نَّ)', 'With alif', 'أَطِيعَانِّ (obey! [dual, emphatic])'],
            ['Light noon (نْ)', '2nd m. sg.', 'اِعْبُدَنْ (worship! [light emphatic])'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 2, Baab 1, Fasl 3',
    },
  ],
  relatedTopicIds: ['cl-past-tense', 'cl-present-tense'],
  tags: ['imperative', 'prohibition', 'amr', 'nahy', 'tenses'],
};

// ============================================================================
// Topic 14: The Ten Derived Nouns (al-Asma' al-Mushtaqqa)
// ============================================================================

export const clDerivedNouns: SarfTopic = {
  id: 'cl-derived-nouns',
  titleAr: 'الأسماء المشتقة',
  titleEn: 'The Ten Derived Nouns',
  transliteration: 'al-Asmaa\' al-Mushtaqqa',
  categoryId: 'cl-derivatives',
  subcategoryId: 'cl-derived-nouns',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'There are ten types of derived nouns in Arabic, including the active participle, passive participle, elative, intensive forms, and nouns of place, time, instrument, instance, and manner.',
      body: `## The Ten Derived Nouns (الأسماء المشتقة العشرة)

Arabic has **ten types** of derived nouns that come from verb roots:

1. **Active Participle** (اسم الفاعل) — نَاصِرٌ (helper), مُكْرِمٌ (one who honours)
2. **Resembling Adjective** (الصفة المشبهة) — غَضْبَانُ (angry)
3. **Passive Participle** (اسم المفعول) — مَنْصُورٌ (helped), مُكْرَمٌ (honoured)
4. **Elative / Comparative** (اسم التفضيل) — أَكْبَرُ (greater/greatest)
5. **Intensive Forms** (صيغ المبالغة) — ظَلُومٌ (very oppressive), سَمِيعٌ (all-hearing)
6. **Nouns of Place and Time** (اسما المكان والزمان) — مَجْلِسٌ (sitting place)
7. **Noun of Single Instance** (اسم المرة) — حَجَّةٌ (one Hajj), تَكْبِيرَةٌ (one takbeer)
8. **Noun of Manner** (اسم الهيئة) — جِلْسَةٌ (a manner of sitting)
9. **Meem-Prefixed Masdar** (المصدر الميمي) — مَغْفِرَةٌ (forgiveness)
10. **Noun of Instrument** (اسم الآلة) — مِحْلَبٌ (milking pail), مِفْتَاحٌ (key)`,
      rules: [
        {
          arabic: 'الأسماء المشتقة عشرة أنواع',
          english:
            'There are ten types of derived nouns, each with specific patterns depending on the verb form.',
          examples: [
            { arabic: 'نَاصِرٌ / مُكْرِمٌ', translation: 'helper / one who honours (active participle)' },
            { arabic: 'مَنْصُورٌ / مُكْرَمٌ', translation: 'helped / honoured (passive participle)' },
            { arabic: 'مِفْتَاحٌ', translation: 'key (noun of instrument)' },
          ],
        },
      ],
      tables: [
        {
          title: 'The Ten Derived Nouns',
          titleAr: 'المشتقات العشرة',
          headers: ['#', 'Type', 'Arabic', 'Example'],
          rows: [
            ['1', 'Active Participle', 'اسم الفاعل', 'نَاصِرٌ (helper)'],
            ['2', 'Resembling Adjective', 'الصفة المشبهة', 'غَضْبَانُ (angry)'],
            ['3', 'Passive Participle', 'اسم المفعول', 'مَنْصُورٌ (helped)'],
            ['4', 'Elative', 'اسم التفضيل', 'أَكْبَرُ (greater)'],
            ['5', 'Intensive Forms', 'صيغ المبالغة', 'تَوَّابٌ (oft-repenting)'],
            ['6', 'Place/Time Nouns', 'اسما المكان والزمان', 'مَجْلِسٌ (assembly)'],
            ['7', 'Noun of Instance', 'اسم المرة', 'رَكْعَةٌ (one bowing)'],
            ['8', 'Noun of Manner', 'اسم الهيئة', 'جِلْسَةٌ (sitting manner)'],
            ['9', 'Meem Masdar', 'المصدر الميمي', 'مَغْفِرَةٌ (forgiveness)'],
            ['10', 'Noun of Instrument', 'اسم الآلة', 'مِفْتَاحٌ (key)'],
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Maqsid 2, Baab 2',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta provides detailed patterns for each derived noun type, distinguishing between trilateral and augmented forms, and explaining the differences between active participle and resembling adjective.',
      body: `## Detailed Derived Noun Patterns

### Active Participle (اسم الفاعل)

**From the bare trilateral:** Pattern فَاعِل (faa'il)
- نَاصِرٌ, نَاصِرَانِ, نَاصِرُونَ, نَاصِرَةٌ, نَاصِرَاتٌ

**From augmented trilateral:** Replace prefix with مُـ + kasra before last letter
- مُكْرِمٌ, مُسْتَخْرِجٌ, مُتَدَحْرِجٌ

### Resembling Adjective (الصفة المشبهة)

Indicates a **permanent quality** (not temporary action). Derived only from **intransitive verbs**.

**Key difference:** The active participle applies to all tenses; the resembling adjective conveys permanence.

Common patterns: أَفْعَل (أَحْمَر — red), فَعْلَان (غَضْبَان — angry), فَعِيل (كَرِيم — generous)

### Passive Participle (اسم المفعول)

**From the bare trilateral:** Pattern مَفْعُول (maf'ool)
- مَنْصُورٌ, مَنْصُورَةٌ

**From augmented:** Replace prefix with مُـ + fatha before last letter
- مُكْرَمٌ, مُسْتَخْرَجٌ

### Nouns of Time and Place

**From bare trilateral:**
- If mudaari' has kasra on 'ayn → مَفْعِل: مَجْلِسٌ
- Otherwise → مَفْعَل: المَشْرَبُ

**From augmented:** Same pattern as passive participle: المُدْخَلُ

### Noun of Instrument

Three standard patterns: مِفْعَل (مِحْلَب), مِفْعَلَة (مِكْنَسَة), مِفْعَال (مِفْتَاح)`,
      rules: [
        {
          arabic: 'اسم الفاعل من الثلاثي على وزن فاعل، ومن المزيد بإبدال حرف المضارعة ميمًا مضمومة وكسر ما قبل الآخر',
          english:
            'The active participle from the trilateral is on the pattern faa\'il; from augmented forms, replace the prefix with a damma-meem and give kasra before the last letter.',
          examples: [
            { arabic: 'نَاصِرٌ', translation: 'helper (faa\'il from nasara)' },
            { arabic: 'مُكْرِمٌ', translation: 'one who honours (from akrama)' },
            { arabic: 'مُسْتَخْرِجٌ', translation: 'one who extracts (from istakhraja)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Intensive Form Patterns (صيغ المبالغة)',
          titleAr: 'أوزان صيغ المبالغة',
          headers: ['Pattern', 'Example', 'Meaning'],
          rows: [
            ['فَعَّال (fa\'\'aal)', 'تَوَّابٌ', 'oft-repenting'],
            ['فَعُول (fa\'uul)', 'ظَلُومٌ / رَكُوبٌ', 'very unjust / something ridden'],
            ['فَعِيل (fa\'eel)', 'سَمِيعٌ / حَمِيدٌ', 'all-hearing / praised'],
            ['مِفْعَال (mif\'aal)', 'مِقْدَامٌ', 'very courageous'],
            ['فِعِّيل (fi\'\'eel)', 'صِدِّيقٌ', 'very truthful'],
            ['فُعَّال (fu\'\'aal)', 'كُبَّارٌ', 'very great'],
            ['فُعُّول (fu\'\'uul)', 'قُدُّوسٌ', 'most holy'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 2, Baab 2',
    },
  ],
  relatedTopicIds: ['cl-masdar', 'cl-past-tense', 'cl-present-tense'],
  tags: ['derived-nouns', 'active-participle', 'passive-participle', 'intensive-forms'],
};
