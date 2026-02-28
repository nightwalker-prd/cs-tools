import type { BalagahTopic } from '../types';

export const damir: BalagahTopic = {
  id: 'damir',
  titleAr: 'الضَّمِيرُ',
  titleEn: 'Pronouns in Balagah',
  transliteration: 'ad-Damir',
  unitId: 'maani',
  partId: 'maani-nakirah-marifah',
  content: {
    summary:
      'In Balagah, pronoun usage involves three key concepts: using a pronoun in place of a noun (idmar maqam al-izhar), repeating a noun instead of using a pronoun (izhar maqam al-idmar), and shifting between pronoun persons (iltifat) — each for specific rhetorical effects.',
    body: `## Pronouns in Balagah (الضَّمِيرُ)

A noun can be either نَكِرَةٌ or مَعْرِفَةٌ. The pronoun (ضَمِيرٌ) is the most definite of all definite forms. Balagah studies how pronoun choices create rhetorical effects.

### الإِضْمَارُ مَقَامَ الإِظْهَارِ — Using a Pronoun in Place of a Noun

A 3rd person pronoun (ضَمِيرُ الْغَائِبِ) is only used after an antecedent. However, sometimes it is used **without** an antecedent to highlight that the noun is **well known and understood by all**, and therefore does not need to be mentioned.

<div dir="rtl" class="font-arabic">﴿الٓمٓ ۞ تَنْزِيلُ الْكِتٰبِ لَا رَيْبَ فِيْهِ مِنْ رَبِّ الْعٰلَمِيْنَ ۞ أَمْ يَقُولُونَ افْتَرٰىهُ ۚ بَلْ هُوَ الْحَقُّ مِنْ رَبِّكَ﴾</div>

*Revelation of the Book — in which there is no doubt — is from the Lord of the worlds. Is it that they say, "He has fabricated it"?*

### الإِظْهَارُ مَقَامَ الإِضْمَارِ — Repeating a Noun Instead of Using a Pronoun

After a noun has been mentioned, it is normally referred to with a pronoun. However, sometimes the noun is **repeated** to highlight the **grandeur** of that thing.

<div dir="rtl" class="font-arabic">﴿اَلْقَارِعَةُ ۞ مَا الْقَارِعَةُ ۞ وَمَآ اَدْرٰىكَ مَا الْقَارِعَةُ﴾</div>

*The Striking Event! What is the Striking Event? And what may let you know what the Striking Event is?*

Even though الْقَارِعَةُ has been mentioned previously, it is repeated as a noun rather than replaced with its pronoun هِيَ — highlighting the grandeur of the event.

### الاِلْتِفَاتُ — Shifting Pronouns

الاِلْتِفَاتُ is to change the grammatical person in repeated pronouns — for example, from 1st person to 2nd person. This creates variety, re-engages the listener, and highlights different aspects of the message.

#### 1st to 2nd person

<div dir="rtl" class="font-arabic">﴿وَمَا لِيَ لَآ اَعْبُدُ الَّذِيْ فَطَرَنِيْ وَاِلَيْهِ تُرْجَعُوْنَ﴾</div>

*What excuse do I have if I do not worship the One who has created me and to whom **you** will be returned?*

#### 3rd to 2nd person

<div dir="rtl" class="font-arabic">﴿عَبَسَ وَتَوَلّٰى ۞ أَنْ جَآءَهُ الْأَعْمٰى ۞ وَمَا يُدْرِيكَ لَعَلَّهُ يَزَّكّٰى﴾</div>

The pronouns change from 3rd person (he frowned) to 2nd person (what may let **you** know).

### Note on مُخَاطَبٌ

The 2nd person pronoun can make a general reference to any person, not just the addressee:

<div dir="rtl" class="font-arabic">«ذِكْرُكَ أَخَاكَ بِمَا يَكْرَهُ»</div>

*[Backbiting] is your talking about your brother in a manner which he does not like.* — The pronoun "your" applies to anyone who hears or reads it.`,
    rules: [
      {
        arabic: 'الإِضْمَارُ مَقَامَ الإِظْهَارِ',
        english:
          'Using a pronoun without an antecedent highlights that the referent is universally known.',
        examples: [
          {
            arabic:
              '﴿بَلْ هُوَ الْحَقُّ مِنْ رَبِّكَ﴾',
            translation:
              'Rather, it is the truth from your Lord.',
            source: 'Quran 32:1-3',
            analysis:
              'هُوَ is used without an explicit antecedent — the Quran is so well-known it needs no introduction.',
          },
        ],
      },
      {
        arabic: 'الإِظْهَارُ مَقَامَ الإِضْمَارِ',
        english:
          'Repeating a noun where a pronoun is expected conveys grandeur and emphasis.',
        examples: [
          {
            arabic: '﴿اَلْقَارِعَةُ ۞ مَا الْقَارِعَةُ ۞ وَمَآ اَدْرٰىكَ مَا الْقَارِعَةُ﴾',
            translation:
              'The Striking Event! What is the Striking Event? And what may let you know what the Striking Event is?',
            source: 'Quran 101:1-3',
            analysis:
              'الْقَارِعَةُ is repeated three times instead of using the pronoun هِيَ, emphasizing its enormity.',
          },
        ],
      },
      {
        arabic: 'الاِلْتِفَاتُ',
        english:
          'Shifting between grammatical persons (iltifat) re-engages the listener and creates variety.',
        examples: [
          {
            arabic: '﴿وَمَا لِيَ لَآ اَعْبُدُ الَّذِيْ فَطَرَنِيْ وَاِلَيْهِ تُرْجَعُوْنَ﴾',
            translation:
              'What excuse do I have if I do not worship the One who has created me and to whom you will be returned?',
            source: 'Quran 36:22',
            analysis:
              'Shift from 1st person (I, me) to 2nd person (you) within the same verse.',
          },
          {
            arabic:
              '﴿عَبَسَ وَتَوَلّٰى ۞ أَنْ جَآءَهُ الْأَعْمٰى ۞ وَمَا يُدْرِيكَ لَعَلَّهُ يَزَّكّٰى﴾',
            translation:
              'He frowned and turned away, because the blind man came to him. And what may let you know — perhaps he would be purified.',
            source: 'Quran 80:1-3',
            analysis:
              'Shift from 3rd person (he frowned) to 2nd person (what may let you know).',
          },
        ],
      },
    ],
    examples: [
      {
        arabic: '﴿اَلْقَارِعَةُ ۞ مَا الْقَارِعَةُ﴾',
        translation: 'The Striking Event! What is the Striking Event?',
        source: 'Quran 101:1-2',
        analysis:
          'الإِظْهَارُ مَقَامَ الإِضْمَارِ — noun repeated for grandeur instead of pronoun.',
      },
      {
        arabic: '﴿وَمَا لِيَ لَآ اَعْبُدُ الَّذِيْ فَطَرَنِيْ وَاِلَيْهِ تُرْجَعُوْنَ﴾',
        translation:
          'What excuse do I have if I do not worship the One who created me and to whom you will be returned?',
        source: 'Quran 36:22',
        analysis: 'الاِلْتِفَاتُ — shift from 1st person to 2nd person.',
      },
    ],
    tables: [
      {
        title: 'Pronoun Devices in Balagah',
        titleAr: 'أَسَالِيبُ الضَّمِيرِ فِي البَلَاغَةِ',
        headers: ['Device', 'Arabic', 'Effect'],
        rows: [
          [
            'Pronoun without antecedent',
            'الإِضْمَارُ مَقَامَ الإِظْهَارِ',
            'Shows the referent is universally known',
          ],
          [
            'Noun repeated instead of pronoun',
            'الإِظْهَارُ مَقَامَ الإِضْمَارِ',
            'Highlights grandeur and emphasis',
          ],
          [
            'Shifting pronouns',
            'الاِلْتِفَاتُ',
            'Re-engages listener, creates variety',
          ],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['al-ahdiyyah', 'nakirah'],
  tags: [
    'damir',
    'pronoun',
    'idmar',
    'izhar',
    'iltifat',
    'shifting',
    'person',
  ],
};

export const alAhdiyyah: BalagahTopic = {
  id: 'al-ahdiyyah',
  titleAr: 'الْ العَهْدِيَّةُ',
  titleEn: 'The Definite Article: Familiarization',
  transliteration: "al-'Ahdiyya",
  unitId: 'maani',
  partId: 'maani-nakirah-marifah',
  content: {
    summary:
      "The definite article (ال) of familiarization (al-'ahdiyya) makes a noun definite because the referent is known to the listener through prior mention (dhikri), physical presence (huduri), or mental familiarity (dhihni).",
    body: `## اَلْ الْعَهْدِيَّةُ — The Familiarization Article

عَهْدٌ means acquaintance, familiarity or knowledge. A noun with an اَلْ الْعَهْدِيَّةُ implies that the addressee is familiar with that noun. There are three types.

### 1. عَهْدٌ ذِكْرِيٌّ — Previously Mentioned

If a word is used as نَكِرَةٌ and then repeated as مَعْرِفَةٌ, the عَهْدٌ is known as عَهْدٌ ذِكْرِيٌّ.

<div dir="rtl" class="font-arabic">﴿إِنَّآ أَرْسَلْنَا إِلَيْكُمْ رَسُوْلًا شَاهِدًا عَلَيْكُمْ كَمَآ أَرْسَلْنَآ إِلَىٰ فِرْعَوْنَ رَسُوْلًا ۞ فَعَصَىٰ فِرْعَوْنُ الرَّسُوْلَ﴾</div>

*We sent a **messenger** to Fir'awn. Then, Fir'awn disobeyed **the messenger**.* — الرَّسُوْلَ refers back to رَسُوْلًا mentioned earlier.

### 2. عَهْدٌ حُضُوْرِيٌّ — Physically Present

If the thing being spoken about is present, the عَهْدٌ is known as عَهْدٌ حُضُوْرِيٌّ.

<div dir="rtl" class="font-arabic">﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِيْنَكُمْ﴾</div>

***Today**, I have completed your religion for you.* — الْيَوْمَ refers to the specific day that was present (the day of Arafah).

### 3. عَهْدٌ ذِهْنِيٌّ — Mentally Familiar

If the addressee is familiar with the word even though it has not been mentioned previously, the عَهْدٌ is known as عَهْدٌ ذِهْنِيٌّ.

<div dir="rtl" class="font-arabic">﴿فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَنْ يَطَّوَّفَ بِهِمَا﴾</div>

*So whoever comes to **the House** for Hajj or performs 'Umrah.* — الْبَيْتِ is not mentioned previously, but it is universally known to refer to the Ka'bah.`,
    rules: [
      {
        arabic: 'عَهْدٌ ذِكْرِيٌّ',
        english:
          "Al-'ahdiyya dhikri: the noun was mentioned earlier as nakirah and then repeated as ma'rifah with ال.",
        examples: [
          {
            arabic:
              '﴿أَرْسَلْنَا إِلَىٰ فِرْعَوْنَ رَسُوْلًا ۞ فَعَصَىٰ فِرْعَوْنُ الرَّسُوْلَ﴾',
            translation:
              'We sent to Pharaoh a messenger. Then Pharaoh disobeyed the messenger.',
            source: 'Quran 73:15-16',
            analysis:
              'عَهْدٌ ذِكْرِيٌّ — الرَّسُول refers back to رَسُولًا mentioned earlier.',
          },
        ],
      },
      {
        arabic: 'عَهْدٌ حُضُوْرِيٌّ',
        english:
          "Al-'ahdiyya huduri: the referent is physically present in the situation.",
        examples: [
          {
            arabic: '﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِيْنَكُمْ﴾',
            translation: 'Today, I have completed your religion for you.',
            source: 'Quran 5:3',
            analysis:
              'عَهْدٌ حُضُوْرِيٌّ — الْيَوْمَ refers to the day of Arafah, which was present.',
          },
        ],
      },
      {
        arabic: 'عَهْدٌ ذِهْنِيٌّ',
        english:
          "Al-'ahdiyya dhihni: the referent is known in the listener's mind without prior mention.",
        examples: [
          {
            arabic:
              '﴿فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ﴾',
            translation: 'So whoever comes to the House for Hajj or performs Umrah.',
            source: 'Quran 2:158',
            analysis:
              'عَهْدٌ ذِهْنِيٌّ — الْبَيْت is not mentioned before, but everyone knows it means the Ka\'bah.',
          },
        ],
      },
    ],
    examples: [
      {
        arabic:
          '﴿أَرْسَلْنَا إِلَىٰ فِرْعَوْنَ رَسُوْلًا ۞ فَعَصَىٰ فِرْعَوْنُ الرَّسُوْلَ﴾',
        translation:
          'We sent to Pharaoh a messenger. Then Pharaoh disobeyed the messenger.',
        source: 'Quran 73:15-16',
        analysis: 'عَهْدٌ ذِكْرِيٌّ — refers back to the earlier indefinite mention.',
      },
      {
        arabic: '﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِيْنَكُمْ﴾',
        translation: 'Today, I have completed your religion for you.',
        source: 'Quran 5:3',
        analysis:
          'عَهْدٌ حُضُوْرِيٌّ — the day was physically present.',
      },
      {
        arabic: '﴿فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ﴾',
        translation: 'So whoever comes to the House for Hajj.',
        source: 'Quran 2:158',
        analysis:
          "عَهْدٌ ذِهْنِيٌّ — the Ka'bah is universally known.",
      },
    ],
    tables: [
      {
        title: 'Types of اَلْ الْعَهْدِيَّةُ',
        titleAr: 'أَنْوَاعُ الْ الْعَهْدِيَّةِ',
        headers: ['Type', 'Arabic', 'Meaning', 'Example'],
        rows: [
          [
            'Previously Mentioned',
            'عَهْدٌ ذِكْرِيٌّ',
            'Refers to a noun mentioned earlier',
            'رَسُوْلًا ... الرَّسُوْلَ',
          ],
          [
            'Physically Present',
            'عَهْدٌ حُضُوْرِيٌّ',
            'Referent is present in the situation',
            'الْيَوْمَ (the day of Arafah)',
          ],
          [
            'Mentally Familiar',
            'عَهْدٌ ذِهْنِيٌّ',
            "Known in listener's mind without mention",
            "الْبَيْت (the Ka'bah)",
          ],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['al-jinsiyyah', 'al-istighraqiyyah', 'damir'],
  tags: [
    'al',
    'ahdiyya',
    'definite article',
    'familiarization',
    'dhikri',
    'huduri',
    'dhihni',
  ],
};

export const alJinsiyyah: BalagahTopic = {
  id: 'al-jinsiyyah',
  titleAr: 'الْ الجِنْسِيَّةُ',
  titleEn: 'The Definite Article: Generic',
  transliteration: 'al-Jinsiyya',
  unitId: 'maani',
  partId: 'maani-nakirah-marifah',
  content: {
    summary:
      'The generic definite article (al-jinsiyya) refers to the type or genus of something rather than a specific member. It can refer to a general concept or an unspecified member. Though grammatically definite, it is semantically indefinite.',
    body: `## الْ الجِنْسِيَّةُ — The Generic Article

جِنْسٌ means species or type. A noun with an اَلْ الْجِنْسِيَّةُ implies the speaker is referring to the **type**, not a single specified member of the type.

A word with اَلْ الْجِنْسِيَّةُ can be used in two ways:

### 1. General Meaning or Concept

The word refers to a general meaning or concept.

<div dir="rtl" class="font-arabic">﴿وَجَعَلْنَا مِنَ الْمَآءِ كُلَّ شَيْءٍ حَيٍّ﴾</div>

*We created from **water** every living thing.* — Water is referred to in the general sense, not any individual type of water.

### 2. Unspecified Member of the Type

The word refers to an unspecified member of the type. This type will be مَعْرِفَةٌ grammatically, but نَكِرَةٌ in meaning.

<div dir="rtl" class="font-arabic">﴿وَأَخَافُ أَنْ يَأْكُلَهُ الذِّئْبُ وَأَنْتُمْ عَنْهُ غٰفِلُوْنَ﴾</div>

*I fear that **a wolf** may eat him up.* — الذِّئْبُ has اَلْ الْجِنْسِيَّةُ and does not refer to a specific wolf, rather any wolf. It is translated as "a wolf."`,
    rules: [
      {
        arabic: 'الْ الجِنْسِيَّةُ لِلْمَفْهُومِ الْعَامِّ',
        english:
          'The generic article for a general concept: refers to the genus as a whole.',
        examples: [
          {
            arabic: '﴿وَجَعَلْنَا مِنَ الْمَآءِ كُلَّ شَيْءٍ حَيٍّ﴾',
            translation: 'And We made from water every living thing.',
            source: 'Quran 21:30',
            analysis:
              'الْمَاء refers to water as a genus — the general concept, not specific water.',
          },
        ],
      },
      {
        arabic: 'الْ الجِنْسِيَّةُ لِفَرْدٍ غَيْرِ مُعَيَّنٍ',
        english:
          'The generic article for an unspecified member: grammatically definite but semantically indefinite.',
        examples: [
          {
            arabic: '﴿وَأَخَافُ أَنْ يَأْكُلَهُ الذِّئْبُ﴾',
            translation: 'I fear that a wolf may eat him up.',
            source: 'Quran 12:13',
            analysis:
              'الذِّئْبُ refers to any wolf, not a specific one. Grammatically مَعْرِفَة, semantically نَكِرَة.',
          },
        ],
      },
    ],
    examples: [
      {
        arabic: '﴿وَجَعَلْنَا مِنَ الْمَآءِ كُلَّ شَيْءٍ حَيٍّ﴾',
        translation: 'We created from water every living thing.',
        source: 'Quran 21:30',
        analysis: 'الْ الجِنْسِيَّةُ — water as a general concept.',
      },
      {
        arabic: '﴿وَأَخَافُ أَنْ يَأْكُلَهُ الذِّئْبُ﴾',
        translation: 'I fear that a wolf may eat him up.',
        source: 'Quran 12:13',
        analysis:
          'الْ الجِنْسِيَّةُ — an unspecified member; translated as "a wolf."',
      },
    ],
    tables: [
      {
        title: 'Two Uses of الْ الجِنْسِيَّةُ',
        titleAr: 'اِسْتِعْمَالَاتُ الْ الجِنْسِيَّةِ',
        headers: ['Usage', 'Meaning', 'Example'],
        rows: [
          [
            'General concept',
            'Refers to the genus as a whole',
            'الْمَاء — water in general',
          ],
          [
            'Unspecified member',
            'Any member of the type (semantically nakirah)',
            'الذِّئْبُ — any wolf',
          ],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['al-ahdiyyah', 'al-istighraqiyyah'],
  tags: [
    'al',
    'jinsiyya',
    'generic',
    'genus',
    'type',
    'definite article',
  ],
};

export const alIstighraqiyyah: BalagahTopic = {
  id: 'al-istighraqiyyah',
  titleAr: 'الْ الاِسْتِغْرَاقِيَّةُ',
  titleEn: 'The Definite Article: Comprehensive',
  transliteration: 'al-Istighraqiyya',
  unitId: 'maani',
  partId: 'maani-nakirah-marifah',
  content: {
    summary:
      'The comprehensive definite article (al-istighraqiyya) encompasses all members of a category. It comes in two types: true comprehensive (haqiqi — every single member) and customary comprehensive (urfi — all members in context).',
    body: `## الْ الاِسْتِغْرَاقِيَّةُ — The Comprehensive Article

اِسْتِغْرَاقٌ means to encompass. A noun with an اَلْ الْاِسْتِغْرَاقِيَّةُ implies the speaker is referring to **every member** of the type, not a single member.

### اِسْتِغْرَاقٌ حَقِيقِيٌّ — True Comprehensive

The word refers to **every single member** without exception.

<div dir="rtl" class="font-arabic">﴿وَالْعَصْرِ ۞ إِنَّ الْإِنْسَانَ لَفِيْ خُسْرٍ﴾</div>

***Man** is in a state of loss indeed.* — الْإِنْسَانُ refers to every member of mankind (with exceptions stated afterwards).

### اِسْتِغْرَاقٌ عُرْفِيٌّ — Customary Comprehensive

The word does not refer to every single member absolutely, but only those members which are **relative to the topic** of conversation.

<div dir="rtl" class="font-arabic">﴿وَجَآءَ السَّحَرَةُ فِرْعَوْنَ﴾</div>

***The sorcerers** came to Pharaoh.* — السَّحَرَةُ does not refer to every single sorcerer on earth, rather it is limited to the sorcerers of Fir'awn's kingdom.`,
    rules: [
      {
        arabic: 'اِسْتِغْرَاقٌ حَقِيقِيٌّ',
        english:
          'True comprehensive: the article encompasses every single individual without exception.',
        examples: [
          {
            arabic: '﴿إِنَّ الْإِنْسَانَ لَفِيْ خُسْرٍ﴾',
            translation: 'Indeed, mankind is in loss.',
            source: 'Quran 103:2',
            analysis:
              'اِسْتِغْرَاقٌ حَقِيقِيٌّ — الْإِنْسَان refers to all of humankind.',
          },
        ],
      },
      {
        arabic: 'اِسْتِغْرَاقٌ عُرْفِيٌّ',
        english:
          'Customary comprehensive: the article encompasses all contextually relevant members only.',
        examples: [
          {
            arabic: '﴿وَجَآءَ السَّحَرَةُ فِرْعَوْنَ﴾',
            translation: 'The sorcerers came to Pharaoh.',
            source: 'Quran 7:113',
            analysis:
              "اِسْتِغْرَاقٌ عُرْفِيٌّ — السَّحَرَةُ is limited to Fir'awn's sorcerers, not all sorcerers on earth.",
          },
        ],
      },
    ],
    examples: [
      {
        arabic: '﴿إِنَّ الْإِنْسَانَ لَفِيْ خُسْرٍ﴾',
        translation: 'Indeed, mankind is in loss.',
        source: 'Quran 103:2',
        analysis:
          'اِسْتِغْرَاقٌ حَقِيقِيٌّ — every single member of mankind.',
      },
      {
        arabic: '﴿وَجَآءَ السَّحَرَةُ فِرْعَوْنَ﴾',
        translation: 'The sorcerers came to Pharaoh.',
        source: 'Quran 7:113',
        analysis:
          'اِسْتِغْرَاقٌ عُرْفِيٌّ — all contextually relevant members.',
      },
    ],
    tables: [
      {
        title: 'Types of اِسْتِغْرَاق',
        titleAr: 'أَنْوَاعُ الاِسْتِغْرَاقِ',
        headers: ['Type', 'Arabic', 'Scope', 'Example'],
        rows: [
          [
            'True',
            'اِسْتِغْرَاقٌ حَقِيقِيٌّ',
            'Every single member without exception',
            'الْإِنْسَان — all mankind',
          ],
          [
            'Customary',
            'اِسْتِغْرَاقٌ عُرْفِيٌّ',
            'All contextually relevant members',
            "السَّحَرَةُ — Fir'awn's sorcerers",
          ],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['al-ahdiyyah', 'al-jinsiyyah'],
  tags: [
    'al',
    'istighraqiyya',
    'comprehensive',
    'haqiqi',
    'urfi',
    'encompassing',
  ],
};

export const alam: BalagahTopic = {
  id: 'alam',
  titleAr: 'العَلَمُ',
  titleEn: 'Proper Names',
  transliteration: "al-'Alam",
  unitId: 'maani',
  partId: 'maani-nakirah-marifah',
  content: {
    summary:
      "Proper names ('alam) are used primarily to refer to specific individuals. In Balagah, names with meaningful origins carry secondary rhetorical effects when the meaning of the name is invoked in context.",
    body: `## Proper Names (العَلَمُ)

An عَلَمٌ (proper name) is used to refer to someone or something.

### Primary Usage

<div dir="rtl" class="font-arabic">﴿مُحَمَّدٌ رَسُوْلُ اللهِ﴾</div>

***Muhammad** is the messenger of Allah.* — The name مُحَمَّدٌ is used simply to refer to a specific person.

### Secondary Usage

Names can carry additional implications if the name has a **special or unique meaning** which fits the context.

For example, the name **أَبُو لَهَبٍ** literally means "father of the flame." He was called this because of his fair, reddish complexion. His name is mentioned in the Quran where it connects to the punishment he will receive:

<div dir="rtl" class="font-arabic">﴿تَبَّتْ يَدَآ أَبِي لَهَبٍ وَتَبَّ ۞ مَآ أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ ۞ سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ﴾</div>

*May the two hands of Abu Lahab (the father of the **flame**) perish, and may he perish! ... He will soon enter a Fire, full of **flames**.* — The literal meaning of the name (flame) connects to his punishment.`,
    rules: [
      {
        english:
          'A proper name carries rhetorical weight when its original meaning resonates with the context.',
        examples: [
          {
            arabic:
              '﴿تَبَّتْ يَدَآ أَبِي لَهَبٍ وَتَبَّ ۞ سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ﴾',
            translation:
              'May the hands of Abu Lahab perish... He will soon enter a Fire, full of flames.',
            source: 'Quran 111:1-3',
            analysis:
              'The name Abu Lahab (Father of Flame) connects to his punishment in the Hellfire — the name\'s meaning adds rhetorical force.',
          },
        ],
      },
    ],
    examples: [
      {
        arabic: '﴿مُحَمَّدٌ رَسُوْلُ اللهِ﴾',
        translation: 'Muhammad is the messenger of Allah.',
        source: 'Quran 48:29',
        analysis: 'Primary usage — the name refers to a specific person.',
      },
      {
        arabic:
          '﴿تَبَّتْ يَدَآ أَبِي لَهَبٍ وَتَبَّ ۞ سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ﴾',
        translation:
          'May the hands of Abu Lahab perish... He will enter a Fire, full of flames.',
        source: 'Quran 111:1-3',
        analysis:
          "Secondary usage — name's meaning (flame) resonates with the context of punishment.",
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['isharah-mawsul-mudaf', 'damir'],
  tags: ['alam', 'proper name', 'marifah', 'definite', 'abu lahab'],
};

export const isharahMawsulMudaf: BalagahTopic = {
  id: 'isharah-mawsul-mudaf',
  titleAr: 'الإِشَارَةُ وَالمَوْصُولُ وَالمُضَافُ',
  titleEn: 'Demonstratives, Relatives & Possessives',
  transliteration: 'al-Isharah wal-Mawsul wal-Mudaf',
  unitId: 'maani',
  partId: 'maani-nakirah-marifah',
  content: {
    summary:
      'Demonstrative pronouns, relative pronouns, and possessive constructions are three types of definite nouns with primary and secondary rhetorical usages including showing grandeur (ta\'dhim), insignificance (tahqir), giving reasons (ta\'lil), pointing out errors (tanbih), and emphasizing a point (taqrir al-gharad).',
    body: `## Demonstratives, Relatives & Possessives

### اسْمُ إِشَارَةٍ — Demonstrative Pronouns

**Primary**: Point to something present.

**Secondary usages:**

#### تَعْظِيْمٌ — Showing Grandeur

<div dir="rtl" class="font-arabic">﴿الٓمٓ ۞ ذٰلِكَ الْكِتٰبُ لَا رَيْبَ فِيْهِ هُدًى لِّلْمُتَّقِيْنَ﴾</div>

***This** Book — there is no doubt in it — is guidance for the God-fearing.* — ذٰلِكَ (the far demonstrative) elevates the status of the Quran.

#### تَحْقِيْرٌ — Showing Insignificance

<div dir="rtl" class="font-arabic">﴿أَهٰذَا الَّذِىْ يَذْكُرُ اٰلِهَتَكُمْ﴾</div>

*Is **this** the one who talks of your gods?* — The demonstrative belittles the person being discussed.

---

### مَوْصُوْلٌ — Relative Pronouns

**Primary**: Reference something whose name is unknown and cannot be pointed to.

**Secondary usages:**

#### تَعْلِيْلٌ — Giving a Reason

<div dir="rtl" class="font-arabic">﴿إِنَّ الَّذِيْنَ يَسْتَكْبِرُوْنَ عَنْ عِبَادَتِيْ سَيَدْخُلُوْنَ جَهَنَّمَ دَاخِرِيْنَ﴾</div>

***Those who show arrogance against worshipping Me** shall enter Hell in disgrace.* — The relative pronoun shows the reason for their punishment.

#### تَنْبِيْهٌ عَلَى الْخَطَإِ — Pointing Out an Error

<div dir="rtl" class="font-arabic">﴿إِنَّ الَّذِيْنَ تَدْعُوْنَ مِنْ دُوْنِ اللهِ عِبَادٌ أَمْثَالُكُمْ﴾</div>

***Those whom you invoke beside Allah** are certainly slaves of Allah like you.* — The relative pronoun highlights the error in considering idols to be gods.

#### تَعْظِيْمٌ — Showing Grandeur

<div dir="rtl" class="font-arabic">﴿فَغَشِيَهُمْ مِنَ الْيَمِّ مَا غَشِيَهُمْ﴾</div>

*They were encircled by **that** [huge wave] from the sea **which overwhelmed them**.* — The relative pronoun conveys the enormity of the event.

#### تَحْقِيْرٌ — Showing Insignificance

<div dir="rtl" class="font-arabic">﴿فَاقْضِ مَآ أَنْتَ قَاضٍ﴾</div>

*So, decide **whatever** you must decide.* — The relative pronoun belittles the threat.

#### تَقْرِيْرُ الْغَرَضِ — Emphasizing the Point

<div dir="rtl" class="font-arabic">﴿وَرَاوَدَتْهُ الَّتِيْ هُوَ فِيْ بَيْتِهَا عَنْ نَفْسِهِ﴾</div>

*And **she, in whose house he was**, seduced him.* — The relative pronoun emphasizes how Yusuf (peace be upon him) resisted temptation despite residing in her house.

---

### مُضَافٌ — Possessive Construction

**Primary**: Express ownership or attribution.

**Secondary usages:**

#### تَعْظِيْمٌ — Showing Greatness

<div dir="rtl" class="font-arabic">﴿وَاذْكُرْ عَبْدَنَا دَاوُدَ ذَا الْأَيْدِ إِنَّهُ أَوَّابٌ﴾</div>

*And remember **Our servant** Dawud.* — Attributing "servant" to Allah shows the lofty status of Dawud (peace be upon him).

#### تَحْقِيْرٌ — Showing Insignificance

<div dir="rtl" class="font-arabic">لُعِنَ عَبْدُ الدِّيْنَارِ وَلُعِنَ عَبْدُ الدِّرْهَمِ</div>

***The slave of the dinar** is cursed, and **the slave of the dirham** is cursed.* — Attributing "slave" to the dinar and dirham shows the lowly status of the person.`,
    rules: [
      {
        english:
          "Demonstrative pronouns can convey grandeur (ta'dhim) or contempt (tahqir) depending on context.",
        examples: [
          {
            arabic: '﴿ذٰلِكَ الْكِتٰبُ لَا رَيْبَ فِيْهِ﴾',
            translation:
              'That is the Book about which there is no doubt.',
            source: 'Quran 2:2',
            analysis:
              'ذٰلِكَ (far demonstrative) used for تَعْظِيْمٌ — elevating the status of the Quran.',
          },
          {
            arabic: '﴿أَهٰذَا الَّذِىْ يَذْكُرُ اٰلِهَتَكُمْ﴾',
            translation: 'Is this the one who talks of your gods?',
            source: 'Quran 21:36',
            analysis:
              'هٰذَا used for تَحْقِيْرٌ — belittling the person being discussed.',
          },
        ],
      },
      {
        english:
          "Relative pronouns have five secondary usages: giving reason (ta'lil), pointing out error (tanbih), grandeur, insignificance, and emphasizing a point.",
        examples: [
          {
            arabic:
              '﴿إِنَّ الَّذِيْنَ يَسْتَكْبِرُوْنَ عَنْ عِبَادَتِيْ سَيَدْخُلُوْنَ جَهَنَّمَ دَاخِرِيْنَ﴾',
            translation:
              'Those who show arrogance against worshipping Me shall enter Hell in disgrace.',
            source: 'Quran 40:60',
            analysis:
              'تَعْلِيْلٌ — the relative pronoun shows the reason for the punishment.',
          },
          {
            arabic: '﴿وَرَاوَدَتْهُ الَّتِيْ هُوَ فِيْ بَيْتِهَا عَنْ نَفْسِهِ﴾',
            translation:
              'And she, in whose house he was, seduced him.',
            source: 'Quran 12:23',
            analysis:
              'تَقْرِيْرُ الْغَرَضِ — emphasizes how Yusuf resisted despite residing in her house.',
          },
        ],
      },
      {
        english:
          "Possessive constructions (mudaf) can show greatness (ta'dhim) or insignificance (tahqir) through attribution.",
        examples: [
          {
            arabic: '﴿وَاذْكُرْ عَبْدَنَا دَاوُدَ﴾',
            translation: 'And remember Our servant Dawud.',
            source: 'Quran 38:17',
            analysis:
              'تَعْظِيْمٌ — attributing "servant" to Allah elevates Dawud\'s status.',
          },
          {
            arabic: 'لُعِنَ عَبْدُ الدِّيْنَارِ وَلُعِنَ عَبْدُ الدِّرْهَمِ',
            translation:
              'The slave of the dinar is cursed, and the slave of the dirham is cursed.',
            source: 'Hadith',
            analysis:
              'تَحْقِيْرٌ — attributing "slave" to money shows the lowly status.',
          },
        ],
      },
    ],
    examples: [
      {
        arabic: '﴿ذٰلِكَ الْكِتٰبُ لَا رَيْبَ فِيْهِ﴾',
        translation: 'That is the Book about which there is no doubt.',
        source: 'Quran 2:2',
        analysis:
          'اسْمُ إِشَارَةٍ for تَعْظِيْمٌ — the far demonstrative elevates the Quran.',
      },
      {
        arabic:
          '﴿إِنَّ الَّذِيْنَ تَدْعُوْنَ مِنْ دُوْنِ اللهِ عِبَادٌ أَمْثَالُكُمْ﴾',
        translation:
          'Those whom you invoke beside Allah are certainly slaves of Allah like you.',
        source: 'Quran 7:194',
        analysis:
          'مَوْصُوْلٌ for تَنْبِيْهٌ عَلَى الْخَطَإِ — pointing out the error of idol worship.',
      },
      {
        arabic: '﴿وَاذْكُرْ عَبْدَنَا دَاوُدَ ذَا الْأَيْدِ﴾',
        translation: 'And remember Our servant Dawud, the possessor of strength.',
        source: 'Quran 38:17',
        analysis:
          "مُضَافٌ for تَعْظِيْمٌ — 'Our servant' shows Dawud's elevated status.",
      },
    ],
    tables: [
      {
        title: 'Secondary Usages of Definite Noun Types',
        titleAr: 'الاِسْتِعْمَالَاتُ الثَّانَوِيَّةُ لِأَنْوَاعِ المَعْرِفَةِ',
        headers: ['Type', 'Secondary Usage', 'Arabic Term'],
        rows: [
          ['اسْمُ إِشَارَةٍ', 'Grandeur', 'تَعْظِيْمٌ'],
          ['اسْمُ إِشَارَةٍ', 'Insignificance', 'تَحْقِيْرٌ'],
          ['مَوْصُوْلٌ', 'Giving reason', 'تَعْلِيْلٌ'],
          ['مَوْصُوْلٌ', 'Pointing out error', 'تَنْبِيْهٌ عَلَى الْخَطَإِ'],
          ['مَوْصُوْلٌ', 'Grandeur', 'تَعْظِيْمٌ'],
          ['مَوْصُوْلٌ', 'Insignificance', 'تَحْقِيْرٌ'],
          ['مَوْصُوْلٌ', 'Emphasizing point', 'تَقْرِيْرُ الْغَرَضِ'],
          ['مُضَافٌ', 'Greatness', 'تَعْظِيْمٌ'],
          ['مُضَافٌ', 'Insignificance', 'تَحْقِيْرٌ'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['alam', 'nakirah'],
  tags: [
    'isharah',
    'mawsul',
    'mudaf',
    'demonstrative',
    'relative',
    'possessive',
    'tadhim',
    'tahqir',
    'talil',
    'tanbih',
    'taqrir',
  ],
};

export const nakirah: BalagahTopic = {
  id: 'nakirah',
  titleAr: 'النَّكِرَةُ',
  titleEn: 'Indefinite Nouns',
  transliteration: 'an-Nakirah',
  unitId: 'maani',
  partId: 'maani-nakirah-marifah',
  content: {
    summary:
      "Indefinite nouns (nakirah) are used when the speaker does not need to specify a particular referent. In Balagah, indefiniteness carries five secondary meanings: concealing identity (ikhfa'), keeping unspecific (tanwi'), showing multitude (takthir), greatness (ta'dhim), and insignificance (tahqir).",
    body: `## Indefinite Nouns (النَّكِرَةُ)

A noun is brought as نَكِرَةٌ when the speaker or addressee is not familiar or acquainted with the person or thing being discussed, or when there is no benefit in mentioning it as مَعْرِفَة.

### Primary Usage

<div dir="rtl" class="font-arabic">﴿وَجَآءَ مِنْ أَقْصَا الْمَدِيْنَةِ رَجُلٌ يَسْعَىٰ﴾</div>

*And there came **a man** running from the farthest part of the city.* — The main purpose is to show that one person came to warn them. There was no need to specify who.

### Secondary Usages

#### إِخْفَاءُ الْأَمْرِ — Concealing Identity

<div dir="rtl" class="font-arabic">﴿فَقَالَتْ هَلْ أَدُلُّكُمْ عَلَىٰ أَهْلِ بَيْتٍ يَكْفُلُوْنَهُ لَكُمْ وَهُمْ لَهُ نٰصِحُوْنَ﴾</div>

*Shall I point out to you **a family** who will nurse him for you?* — The sister of Musa (peace be upon him) did not wish to reveal her mother's identity, so she kept it as نَكِرَة.

#### تَنْوِيْعٌ — Keeping Unspecific

<div dir="rtl" class="font-arabic">﴿اقْتُلُوْا يُوْسُفَ أَوِ اطْرَحُوْهُ أَرْضًا﴾</div>

*Throw him at some place on **earth**.* — أَرْضًا is indefinite to leave the choice unspecified.

#### تَكْثِيْرٌ — Showing Variety/Multitude

<div dir="rtl" class="font-arabic">﴿وَإِنْ يُكَذِّبُوْكَ فَقَدْ كُذِّبَتْ رُسُلٌ مِنْ قَبْلِكَ﴾</div>

*Indeed, **many** messengers have been rejected before you.* — A plural indefinite noun (رُسُلٌ) implies كَثِير (many) without stating it explicitly. The consolation is greater if many prophets shared the same ordeal.

#### تَعْظِيْمٌ — Showing Greatness

<div dir="rtl" class="font-arabic">﴿فَإِنْ لَّمْ تَفْعَلُوْا فَأْذَنُوْا بِحَرْبٍ مِنَ اللهِ وَرَسُوْلِهِ﴾</div>

*But if you do not, then listen to the declaration of **war** from Allah and His Messenger.* — حَرْبٍ in its indefinite form implies حَرْب عَظِيمَة (a great war).

#### تَحْقِيْرٌ — Showing Insignificance

<div dir="rtl" class="font-arabic">﴿وَمَا الْحَيٰوةُ الدُّنْيَا فِي الْاٰخِرَةِ إِلَّا مَتَاعٌ﴾</div>

*This life of the world in comparison to the hereafter is only a [momentary] **benefit**.* — مَتَاعٌ in its indefinite form means مَتَاع حَقِير (an insignificant benefit).`,
    rules: [
      {
        arabic: 'إِخْفَاءُ الْأَمْرِ',
        english:
          'An indefinite noun can conceal identity when the speaker intentionally withholds specification.',
        examples: [
          {
            arabic:
              '﴿هَلْ أَدُلُّكُمْ عَلَىٰ أَهْلِ بَيْتٍ يَكْفُلُوْنَهُ لَكُمْ﴾',
            translation:
              'Shall I point out to you a family who will nurse him for you?',
            source: 'Quran 28:12',
            analysis:
              "بَيْتٍ is indefinite to conceal that she meant her own mother's household.",
          },
        ],
      },
      {
        arabic: 'تَكْثِيْرٌ',
        english:
          'A plural indefinite noun implies multitude (kathir) without stating it explicitly.',
        examples: [
          {
            arabic: '﴿فَقَدْ كُذِّبَتْ رُسُلٌ مِنْ قَبْلِكَ﴾',
            translation: 'Indeed, many messengers have been rejected before you.',
            source: 'Quran 35:4',
            analysis:
              'رُسُلٌ is indefinite plural, implying many messengers — greater consolation for the Prophet.',
          },
        ],
      },
      {
        arabic: 'تَعْظِيْمٌ',
        english:
          'An indefinite noun used for ta\'dhim implies the referent is so grand it defies specification.',
        examples: [
          {
            arabic: '﴿فَأْذَنُوْا بِحَرْبٍ مِنَ اللهِ وَرَسُوْلِهِ﴾',
            translation:
              'Then listen to the declaration of war from Allah and His Messenger.',
            source: 'Quran 2:279',
            analysis:
              'حَرْبٍ is indefinite for تَعْظِيمٌ — a great and terrifying war.',
          },
        ],
      },
      {
        arabic: 'تَحْقِيْرٌ',
        english:
          'An indefinite noun used for tahqir implies the referent is insignificant.',
        examples: [
          {
            arabic: '﴿وَمَا الْحَيٰوةُ الدُّنْيَا فِي الْاٰخِرَةِ إِلَّا مَتَاعٌ﴾',
            translation:
              'This life of the world in comparison to the hereafter is only a benefit.',
            source: 'Quran 13:26',
            analysis:
              'مَتَاعٌ is indefinite for تَحْقِيرٌ — an insignificant, momentary benefit.',
          },
        ],
      },
    ],
    examples: [
      {
        arabic: '﴿وَجَآءَ مِنْ أَقْصَا الْمَدِيْنَةِ رَجُلٌ يَسْعَىٰ﴾',
        translation:
          'And there came a man running from the farthest part of the city.',
        source: 'Quran 36:20',
        analysis: 'Primary usage — identity is not relevant to the lesson.',
      },
      {
        arabic:
          '﴿هَلْ أَدُلُّكُمْ عَلَىٰ أَهْلِ بَيْتٍ يَكْفُلُوْنَهُ لَكُمْ﴾',
        translation:
          'Shall I point out to you a family who will nurse him?',
        source: 'Quran 28:12',
        analysis: "إِخْفَاءُ الْأَمْرِ — concealing her mother's identity.",
      },
      {
        arabic: '﴿فَقَدْ كُذِّبَتْ رُسُلٌ مِنْ قَبْلِكَ﴾',
        translation: 'Many messengers have been rejected before you.',
        source: 'Quran 35:4',
        analysis: 'تَكْثِيْرٌ — plural indefinite implies multitude.',
      },
      {
        arabic: '﴿فَأْذَنُوْا بِحَرْبٍ مِنَ اللهِ وَرَسُوْلِهِ﴾',
        translation:
          'Listen to the declaration of war from Allah and His Messenger.',
        source: 'Quran 2:279',
        analysis: 'تَعْظِيْمٌ — indefinite implies a great war.',
      },
      {
        arabic: '﴿وَمَا الْحَيٰوةُ الدُّنْيَا فِي الْاٰخِرَةِ إِلَّا مَتَاعٌ﴾',
        translation:
          'This life of the world in comparison to the hereafter is only a benefit.',
        source: 'Quran 13:26',
        analysis: 'تَحْقِيْرٌ — indefinite implies insignificance.',
      },
    ],
    tables: [
      {
        title: 'Secondary Usages of Nakirah',
        titleAr: 'الاِسْتِعْمَالَاتُ الثَّانَوِيَّةُ لِلنَّكِرَةِ',
        headers: ['Usage', 'Arabic', 'Effect'],
        rows: [
          [
            'Concealing identity',
            'إِخْفَاءُ الْأَمْرِ',
            'Deliberately keeps referent unknown',
          ],
          [
            'Keeping unspecific',
            'تَنْوِيْعٌ',
            'Leaves choice open to the addressee',
          ],
          [
            'Showing multitude',
            'تَكْثِيْرٌ',
            'Plural nakirah implies "many"',
          ],
          [
            'Showing greatness',
            'تَعْظِيْمٌ',
            'Implies the referent is too grand to specify',
          ],
          [
            'Showing insignificance',
            'تَحْقِيْرٌ',
            'Implies the referent is too small to specify',
          ],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['damir', 'al-ahdiyyah'],
  tags: [
    'nakirah',
    'indefinite',
    'ikhfa',
    'tanwi',
    'takthir',
    'tadhim',
    'tahqir',
  ],
};
