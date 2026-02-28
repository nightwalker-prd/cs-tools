import type { BalagahTopic } from '../types';

export const musawah: BalagahTopic = {
  id: 'musawah',
  titleAr: 'مُسَاوَاةٌ',
  titleEn: 'Moderation',
  transliteration: 'Musawah',
  unitId: 'maani',
  partId: 'maani-speech-length',
  content: {
    summary:
      'Musawah (moderation) is the balanced way of expressing an idea — neither too brief nor too wordy. The number of words used matches what is normally required to convey the meaning.',
    body: `## Definition

مُسَاوَاةٌ is a moderate way of expression which is neither too brief nor too wordy. It is one of three ways a speaker may express an idea, along with إِيْجَازٌ (conciseness) and إِطْنَابٌ (elaboration).

## Example

<div dir="rtl" class="font-arabic">﴿وَمَنْ يُطِعِ اللهَ وَرَسُوْلَهُ يُدْخِلْهُ جَنّٰتٍ تَجْرِيْ مِنْ تَحْتِهَا الْأَنْهٰرُ خٰلِدِيْنَ فِيْهَا وَذٰلِكَ الْفَوْزُ الْعَظِيْمُ﴾</div>

*Whoever obeys Allah and His Messenger, He will admit him to gardens beneath which rivers flow, where he will live forever. That is a great success.*

This verse expresses its meaning in a balanced manner — no words are omitted and no unnecessary words are added.`,
    rules: [
      {
        arabic: 'مُسَاوَاةٌ',
        english:
          'The balanced expression where the number of words matches what is normally required — neither concise nor elaborate.',
        examples: [
          {
            arabic: '﴿وَمَنْ يُطِعِ اللهَ وَرَسُوْلَهُ يُدْخِلْهُ جَنّٰتٍ تَجْرِيْ مِنْ تَحْتِهَا الْأَنْهٰرُ﴾',
            translation: 'Whoever obeys Allah and His Messenger, He will admit him to gardens beneath which rivers flow.',
            source: 'Quran 4:13',
            analysis: 'A balanced expression — no omission and no extra words.',
          },
        ],
      },
    ],
    examples: [
      {
        arabic: '﴿وَمَنْ يُطِعِ اللهَ وَرَسُوْلَهُ يُدْخِلْهُ جَنّٰتٍ تَجْرِيْ مِنْ تَحْتِهَا الْأَنْهٰرُ خٰلِدِيْنَ فِيْهَا وَذٰلِكَ الْفَوْزُ الْعَظِيْمُ﴾',
        translation: 'Whoever obeys Allah and His Messenger, He will admit him to gardens beneath which rivers flow, where he will live forever. That is a great success.',
        source: 'Quran 4:13',
        analysis: 'مُسَاوَاةٌ — balanced expression, neither brief nor wordy.',
      },
    ],
    tables: [
      {
        title: 'Three Ways of Expressing Ideas',
        titleAr: 'طُوْلُ الكَلَامِ',
        headers: ['Style', 'Arabic', 'Description'],
        rows: [
          ['Concise', 'إِيْجَازٌ', 'Fewer words than usually required'],
          ['Moderate', 'مُسَاوَاةٌ', 'The right number of words'],
          ['Elaborate', 'إِطْنَابٌ', 'More words than usually required'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['ijaz', 'itnab'],
  tags: ['maani', 'speech-length', 'musawah', 'moderation'],
};

export const ijaz: BalagahTopic = {
  id: 'ijaz',
  titleAr: 'إِيْجَازٌ',
  titleEn: 'Conciseness',
  transliteration: 'Ijaz',
  unitId: 'maani',
  partId: 'maani-speech-length',
  content: {
    summary:
      'Ijaz (conciseness) expresses meaning with fewer words than usually required. It has two main types: ijaz qasr (brevity in expression) and ijaz hadhf (omission). Omission is further divided into ikhtisar (abbreviation — omitting words/sentences) and iqtisar (sufficiency — including tadmin, iktifa\', and ihtibak).',
    body: `## Definition

إِيْجَازٌ is expressing an idea using fewer words than would usually be required. There are two types.

## إِيْجَازُ قَصْرٍ — Conciseness by Brevity

إِيْجَازُ قَصْرٍ is expressing an idea using relatively few words, with no omission — the words chosen are simply compact and rich in meaning.

<div dir="rtl" class="font-arabic">﴿وَلَكُمْ فِيْهَا مَا تَشْتَهِيْ أَنْفُسُكُمْ وَلَكُمْ فِيْهَا مَا تَدَّعُوْنَ﴾</div>

*And for you in Heaven is whatever your souls desire.* — Few words but the meaning is very extensive.

## إِيْجَازُ حَذْفٍ — Conciseness by Omission

إِيْجَازُ حَذْفٍ is removing something from the text while the meaning remains understood. This has two sub-types.

### حَذْفُ اخْتِصَارٍ — Omission by Abbreviation

حَذْفُ اخْتِصَارٍ is removing a word, words, phrase, or sentence which has a grammatical function in the sentence. Examples of what can be omitted:

**مُبْتَدَأٌ (Subject):**

<div dir="rtl" class="font-arabic">﴿وَمَآ أَدْرٰكَ مَا هِيَهْ ۞ ـــ نَارٌ حَامِيَةٌ﴾</div>

*And what may let you know what that is? [It is] A blazing Fire!*

**خَبَرٌ (Predicate):**

<div dir="rtl" class="font-arabic">﴿أُكُلُهَا دَآئِمٌ وَظِلُّهَا ـــ﴾</div>

*Its food is everlasting and its shade [is also everlasting].*

**فِعْلٌ (Verb):**

<div dir="rtl" class="font-arabic">﴿وَلَئِنْ سَأَلْتَهُمْ مَنْ خَلَقَ السَّمٰوٰتِ وَالْأَرْضَ ... لَيَقُوْلُنَّ ـــ اللهُ﴾</div>

*They will say: Allah (created them).*

**فَاعِلٌ (Doer):**

<div dir="rtl" class="font-arabic">﴿كَلَّآ إِذَا بَلَغَتْ ـــ التَّرَاقِيَ﴾</div>

*When [the soul] reaches the collar bone.*

**مَفْعُوْلٌ بِهِ (Object):**

<div dir="rtl" class="font-arabic">﴿فَذُوْقُوْا ـــ فَلَنْ تَزِيْدَكُمْ إِلَّا عَذَابًا﴾</div>

*Taste (the punishment), for we will only increase you in punishment.*

**حَرْفٌ (Particle):**

<div dir="rtl" class="font-arabic">﴿قَالُوْا تَاللهِ ـــ تَفْتَؤُا تَذْكُرُ يُوْسُفَ﴾</div>

*By God, you will not stop remembering Yusuf.* — The negative particle لَا is omitted.

**مُضَافٌ (Possessive):**

<div dir="rtl" class="font-arabic">﴿وَسْئَلِ ـــ الْقَرْيَةَ﴾</div>

*Ask [the people of] the town.*

**مَنْعُوْتٌ (Described noun):**

<div dir="rtl" class="font-arabic">﴿وَعِنْدَهُمْ ـــ قٰصِرٰتُ الطَّرْفِ عِيْنٌ﴾</div>

*And by their side there will be (wives) lowering their gazes.*

**نَعْتٌ (Adjective):**

<div dir="rtl" class="font-arabic">لَا صَلَاةَ لِمَنْ لَمْ يَقْرَأْ بِفَاتِحَةِ الْكِتَابِ</div>

*There is no complete salah without the recitation of al-Fatihah.*

**جَوَابُ الشَّرْطِ (Conditional response):**

<div dir="rtl" class="font-arabic">﴿قُلْ أَرَءَيْتُمْ إِنْ كَانَ مِنْ عِنْدِ اللهِ ثُمَّ كَفَرْتُمْ بِهِ ـــ﴾</div>

*Tell me, if it is from Allah, and still you reject it...* — The response is omitted.

**جُمْلَةٌ (Full sentence):**

<div dir="rtl" class="font-arabic">﴿إِنِّيْ أَمَنْتُ بِرَبِّكُمْ فَاسْمَعُوْنِ ۞ ـــ قِيْلَ ادْخُلِ الْجَنَّةَ﴾</div>

*I have believed in your Lord, so listen to me. [He was martyred.] It was said: Enter Paradise.*

### حَذْفُ اقْتِصَارٍ — Omission by Sufficiency

حَذْفُ اقْتِصَارٍ constructs a sentence so the addressee can deduce hidden meaning even though nothing has been grammatically removed.

**تَضْمِينٌ (Tadmin):** Mentioning a verb with the object of another verb to indicate both meanings.

<div dir="rtl" class="font-arabic">دَعْ مَا يَرِيبُكَ إِلَى مَا لَا يَرِيبُكَ</div>

*Leave what causes you doubt and turn to what does not cause you doubt.* — The meaning of اِذْهَبْ (go to) is encompassed via the phrase إِلَى مَا لَا يَرِيبُكَ.

**إِكْتِفَاءٌ (Iktifa'):** Omitting one of two commonly associated things, relying on the listener to understand.

<div dir="rtl" class="font-arabic">﴿بِيَدِكَ الْخَيْرُ إِنَّكَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ﴾</div>

*In Your hand is all goodness.* — The word شَرٌّ (evil) is commonly paired with خَيْرٌ but omitted out of respect.

**اِحْتِبَاكٌ (Ihtibak):** Mentioning two words explicitly while relying on context to understand their opposites.

<div dir="rtl" class="font-arabic">﴿قُلْ إِنِّي لَا أَمْلِكُ لَكُمْ ضَرًّا وَلَا رَشَدًا﴾</div>

*Say: I do not have control of harm or guidance.* — ضَرًّا (harm) implies نَفْعًا (benefit) and رَشَدًا (guidance) implies ضَلَالًا (misguidance).`,
    rules: [
      {
        arabic: 'إِيْجَازُ قَصْرٍ',
        english:
          'Conciseness by brevity — expressing a rich meaning with few but carefully chosen words, without omitting anything.',
        examples: [
          {
            arabic: '﴿وَلَكُمْ فِيْهَا مَا تَشْتَهِيْ أَنْفُسُكُمْ﴾',
            translation: 'And for you in Heaven is whatever your souls desire.',
            source: 'Quran 41:31',
            analysis: 'Few words, but the meaning encompasses every desire.',
          },
        ],
      },
      {
        arabic: 'حَذْفُ اخْتِصَارٍ',
        english:
          'Omission by abbreviation — removing a grammatically functional element (subject, predicate, verb, object, particle, etc.) when context allows.',
        examples: [
          {
            arabic: '﴿وَسْئَلِ ـــ الْقَرْيَةَ﴾',
            translation: 'Ask [the people of] the town.',
            source: 'Quran 12:82',
            analysis: 'The mudaf (أَهْلَ) is omitted; context supplies it.',
          },
        ],
      },
      {
        arabic: 'تَضْمِينٌ',
        english:
          'Mentioning a verb with the object complement of another verb to encompass both meanings.',
        examples: [
          {
            arabic: 'دَعْ مَا يَرِيبُكَ إِلَى مَا لَا يَرِيبُكَ',
            translation: 'Leave what causes you doubt and turn to what does not.',
            source: 'Hadith (Tirmidhi)',
            analysis: 'The meaning of اِذْهَبْ is encompassed through إِلَى.',
          },
        ],
      },
      {
        arabic: 'إِكْتِفَاءٌ',
        english:
          'Omitting one of two commonly associated things, relying on the listener to infer the missing one.',
        examples: [
          {
            arabic: '﴿بِيَدِكَ الْخَيْرُ﴾',
            translation: 'In Your hand is all goodness.',
            source: 'Quran 3:26',
            analysis: 'الشَّرُّ is implied but omitted out of respect.',
          },
        ],
      },
      {
        arabic: 'اِحْتِبَاكٌ',
        english:
          'Mentioning two words explicitly while relying on context to understand their opposites or related counterparts.',
        examples: [
          {
            arabic: '﴿قُلْ إِنِّي لَا أَمْلِكُ لَكُمْ ضَرًّا وَلَا رَشَدًا﴾',
            translation: 'Say: I do not have control of harm or guidance.',
            source: 'Quran 72:21',
            analysis: 'ضَرًّا implies نَفْعًا; رَشَدًا implies ضَلَالًا.',
          },
        ],
      },
    ],
    examples: [
      {
        arabic: '﴿وَلَكُمْ فِيْهَا مَا تَشْتَهِيْ أَنْفُسُكُمْ وَلَكُمْ فِيْهَا مَا تَدَّعُوْنَ﴾',
        translation: 'And for you in Heaven is whatever your souls desire.',
        source: 'Quran 41:31',
        analysis: 'إِيْجَازُ قَصْرٍ — brevity with rich meaning.',
      },
      {
        arabic: '﴿وَمَآ أَدْرٰكَ مَا هِيَهْ ۞ نَارٌ حَامِيَةٌ﴾',
        translation: 'What may let you know what that is? [It is] A blazing Fire!',
        source: 'Quran 101:10-11',
        analysis: 'حَذْفُ اخْتِصَارٍ — mubtada\' (هِيَ) omitted.',
      },
      {
        arabic: '﴿كَلَّآ إِذَا بَلَغَتْ ـــ التَّرَاقِيَ﴾',
        translation: 'When [the soul] reaches the collar bone.',
        source: 'Quran 75:26',
        analysis: 'حَذْفُ اخْتِصَارٍ — fa\'il (الرُّوحُ) omitted.',
      },
      {
        arabic: 'دَعْ مَا يَرِيبُكَ إِلَى مَا لَا يَرِيبُكَ',
        translation: 'Leave what causes you doubt and turn to what does not.',
        source: 'Hadith (Tirmidhi)',
        analysis: 'تَضْمِينٌ — the verb اِذْهَبْ is implied.',
      },
      {
        arabic: '﴿بِيَدِكَ الْخَيْرُ إِنَّكَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ﴾',
        translation: 'In Your hand is all goodness. Indeed, You are capable of everything.',
        source: 'Quran 3:26',
        analysis: 'إِكْتِفَاءٌ — الشَّرُّ implied but omitted.',
      },
      {
        arabic: '﴿قُلْ إِنِّي لَا أَمْلِكُ لَكُمْ ضَرًّا وَلَا رَشَدًا﴾',
        translation: 'Say: I do not have control of harm or guidance.',
        source: 'Quran 72:21',
        analysis: 'اِحْتِبَاكٌ — each implies its opposite.',
      },
    ],
    tables: [
      {
        title: 'Structure of Ijaz',
        titleAr: 'هَيْكَلُ الإِيْجَازِ',
        headers: ['Category', 'Sub-type', 'Description'],
        rows: [
          ['إِيْجَازُ قَصْرٍ', '—', 'Brevity — few words, rich meaning, no omission'],
          ['إِيْجَازُ حَذْفٍ', 'حَذْفُ اخْتِصَارٍ', 'Abbreviation — omitting grammatical elements'],
          ['إِيْجَازُ حَذْفٍ', 'حَذْفُ اقْتِصَارٍ — تَضْمِينٌ', 'Sufficiency — verb encompasses another verb\'s meaning'],
          ['إِيْجَازُ حَذْفٍ', 'حَذْفُ اقْتِصَارٍ — إِكْتِفَاءٌ', 'Sufficiency — omitting one of a common pair'],
          ['إِيْجَازُ حَذْفٍ', 'حَذْفُ اقْتِصَارٍ — اِحْتِبَاكٌ', 'Sufficiency — each word implies its opposite'],
        ],
      },
      {
        title: 'Types of Omission (Ikhtisar)',
        titleAr: 'أَنْوَاعُ المَحْذُوفِ',
        headers: ['Omitted Element', 'Arabic'],
        rows: [
          ['Subject', 'مُبْتَدَأٌ'],
          ['Predicate', 'خَبَرٌ'],
          ['Verb', 'فِعْلٌ'],
          ['Doer', 'فَاعِلٌ'],
          ['Object', 'مَفْعُوْلٌ بِهِ'],
          ['Particle', 'حَرْفٌ'],
          ['Possessive', 'مُضَافٌ'],
          ['Described noun', 'مَنْعُوْتٌ'],
          ['Adjective', 'نَعْتٌ'],
          ['Conditional response', 'جَوَابُ الشَّرْطِ'],
          ['Full sentence', 'جُمْلَةٌ'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['musawah', 'itnab'],
  tags: ['maani', 'speech-length', 'ijaz', 'qasr', 'hadhf', 'ikhtisar', 'iqtisar', 'tadmin', 'iktifa', 'ihtibak'],
};

export const itnab: BalagahTopic = {
  id: 'itnab',
  titleAr: 'إِطْنَابٌ',
  titleEn: 'Elaboration',
  transliteration: 'Itnab',
  unitId: 'maani',
  partId: 'maani-speech-length',
  content: {
    summary:
      'Itnab (elaboration) expresses meaning with more words than usually required for rhetorical benefit. It includes eight devices: mentioning specific after general, general after specific, repetition, appending, completing, parenthetical insertion, precautionary clarification, and clarification after ambiguity.',
    body: `## Definition

الإِطْنَابُ is expressing a meaning in more words than would usually be required. It occurs in various ways for rhetorical benefit.

## ذِكْرُ الْخَاصِّ بَعْدَ الْعَامِّ — Mentioning the Specific After the General

To mention something specifically after something general which already includes it, in order to emphasize it.

<div dir="rtl" class="font-arabic">﴿حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَى﴾</div>

*Take due care of all the prayers, and the middle prayer.* — الصَّلَوَاتِ already includes all prayers, but الصَّلَاةِ الْوُسْطَى is mentioned specifically to emphasize its importance.

## ذِكْرُ الْعَامِّ بَعْدَ الْخَاصِّ — Mentioning the General After the Specific

To mention something generally even though it has already been mentioned specifically.

<div dir="rtl" class="font-arabic">﴿رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَنْ دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ﴾</div>

*My Lord, grant pardon to me, and to my parents, and to everyone who enters my home as a believer, and to all the believing men and believing women.*

## تَكْرَارٌ — Repetition

To repeat a word or sentence for emphasis.

<div dir="rtl" class="font-arabic">﴿فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ﴾</div>

*So, which of the bounties of your Lord will you deny?* — This verse is repeated 31 times in Surah al-Rahman for continuous emphasis.

## تَذْيِيلٌ — Appending

Bringing two sentences one after the other, with the second emphasizing the meaning of the first.

<div dir="rtl" class="font-arabic">﴿وَقُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ إِنَّ الْبَاطِلَ كَانَ زَهُوقًا﴾</div>

*Truth has come and falsehood has vanished. Falsehood is surely bound to vanish.* — The second sentence emphasizes the first.

## تَتْمِيمٌ — Completing

Adding a word which highlights or completes the meaning of the sentence.

<div dir="rtl" class="font-arabic">﴿وَيُطْعِمُونَ الطَّعَامَ عَلَى حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا﴾</div>

*And they give food, out of their love for Him (Allah), to the needy, and the orphan, and the captive.* — The words عَلَى حُبِّهِ highlight the virtue of their spending.

## اعْتِرَاضٌ — Parenthetical Insertion

Bringing a sentence within another sentence.

<div dir="rtl" class="font-arabic">﴿وَيَجْعَلُونَ لِلَّهِ الْبَنَاتِ سُبْحَانَهُ وَلَهُمْ مَا يَشْتَهُونَ﴾</div>

*They ascribe daughters to Allah — Pure is He — and for themselves is what they desire!* — سُبْحَانَهُ is a parenthetical insertion expressing Allah's transcendence.

## اِحْتِرَاسٌ — Precautionary Clarification

Bringing a word, phrase, or sentence within another sentence to remove any misconception.

<div dir="rtl" class="font-arabic">﴿وَاضْمُمْ يَدَكَ إِلَى جَنَاحِكَ تَخْرُجْ بَيْضَاءَ مِنْ غَيْرِ سُوءٍ﴾</div>

*Press your hand under your arm, and it will come out brightly white without any disease.* — The phrase مِنْ غَيْرِ سُوءٍ prevents interpreting the whiteness as illness.

## التَّوْضِيحُ بَعْدَ الْإِبْهَامِ — Clarification After Ambiguity

Bringing a word or pronoun ambiguously followed by its clarification. Two forms:

**ضَمِيرُ الشَّأْنِ (Pronoun of Importance):** A pronoun at the beginning without an antecedent.

<div dir="rtl" class="font-arabic">﴿قُلْ هُوَ اللَّهُ أَحَدٌ﴾</div>

*Say: The truth is that Allah is One.* — هُوَ creates initial ambiguity, resolved by the rest.

**التَّمْيِيزُ الْمُحَوَّلُ (Converted Specification):** A tamyiz that was originally another slot in the sentence.

<div dir="rtl" class="font-arabic">﴿وَاشْتَعَلَ الرَّأْسُ شَيْبًا﴾</div>

*And my head has lit ablaze with grey hair.* — شَيْبًا is a tamyiz; the original sentence would be اِشْتَعَلَ شَيْبُ الرَّأْسِ. This structure creates emphasis by attributing the blaze to the entire head.`,
    rules: [
      {
        arabic: 'ذِكْرُ الْخَاصِّ بَعْدَ الْعَامِّ',
        english: 'Mentioning the specific after the general to emphasize the specific item.',
        examples: [
          {
            arabic: '﴿حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَى﴾',
            translation: 'Take due care of all the prayers, and the middle prayer.',
            source: 'Quran 2:238',
            analysis: 'The middle prayer is singled out from the general "all prayers" for emphasis.',
          },
        ],
      },
      {
        arabic: 'ذِكْرُ الْعَامِّ بَعْدَ الْخَاصِّ',
        english: 'Mentioning the general after the specific to broaden the scope.',
        examples: [
          {
            arabic: '﴿رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ ... وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ﴾',
            translation: 'My Lord, forgive me, my parents... and all believing men and women.',
            source: 'Quran 71:28',
            analysis: 'After specific individuals, the supplication broadens to include all believers.',
          },
        ],
      },
      {
        arabic: 'تَكْرَارٌ',
        english: 'Repeating a word or sentence for rhetorical emphasis.',
        examples: [
          {
            arabic: '﴿فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ﴾',
            translation: 'So, which of the bounties of your Lord will you deny?',
            source: 'Quran 55:13 (repeated 31 times)',
            analysis: 'Repetition creates continuous, building emphasis throughout the surah.',
          },
        ],
      },
      {
        arabic: 'تَذْيِيلٌ',
        english: 'Appending a second sentence that emphasizes the meaning of the first.',
        examples: [
          {
            arabic: '﴿جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ إِنَّ الْبَاطِلَ كَانَ زَهُوقًا﴾',
            translation: 'Truth has come and falsehood has vanished. Falsehood is surely bound to vanish.',
            source: 'Quran 17:81',
            analysis: 'The second sentence reinforces and universalizes the first.',
          },
        ],
      },
      {
        arabic: 'تَتْمِيمٌ',
        english: 'Adding a word that highlights or completes the meaning of the sentence.',
        examples: [
          {
            arabic: '﴿وَيُطْعِمُونَ الطَّعَامَ عَلَى حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا﴾',
            translation: 'They give food, out of their love for Him, to the needy, the orphan, and the captive.',
            source: 'Quran 76:8',
            analysis: 'عَلَى حُبِّهِ completes the meaning by highlighting the virtue of giving.',
          },
        ],
      },
      {
        arabic: 'اعْتِرَاضٌ',
        english: 'Inserting a parenthetical sentence within another sentence.',
        examples: [
          {
            arabic: '﴿وَيَجْعَلُونَ لِلَّهِ الْبَنَاتِ سُبْحَانَهُ وَلَهُمْ مَا يَشْتَهُونَ﴾',
            translation: 'They ascribe daughters to Allah — Pure is He — and for themselves is what they desire!',
            source: 'Quran 16:57',
            analysis: 'سُبْحَانَهُ is inserted parenthetically to declare Allah\'s transcendence.',
          },
        ],
      },
      {
        arabic: 'اِحْتِرَاسٌ',
        english: 'Adding a clarifying element to prevent misconception.',
        examples: [
          {
            arabic: '﴿تَخْرُجْ بَيْضَاءَ مِنْ غَيْرِ سُوءٍ﴾',
            translation: 'It will come out brightly white without any disease.',
            source: 'Quran 20:22',
            analysis: 'مِنْ غَيْرِ سُوءٍ prevents interpreting the whiteness as leprosy.',
          },
        ],
      },
      {
        arabic: 'التَّوْضِيحُ بَعْدَ الْإِبْهَامِ',
        english: 'Presenting something ambiguously first, then clarifying it for rhetorical impact.',
        examples: [
          {
            arabic: '﴿قُلْ هُوَ اللَّهُ أَحَدٌ﴾',
            translation: 'Say: The truth is that Allah is One.',
            source: 'Quran 112:1',
            analysis: 'ضَمِيرُ الشَّأْنِ — هُوَ creates initial suspense, resolved immediately.',
          },
        ],
      },
    ],
    examples: [
      {
        arabic: '﴿حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَى﴾',
        translation: 'Take due care of all the prayers, and the middle prayer.',
        source: 'Quran 2:238',
        analysis: 'ذِكْرُ الْخَاصِّ بَعْدَ الْعَامِّ — specific after general.',
      },
      {
        arabic: '﴿فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ﴾',
        translation: 'So, which of the bounties of your Lord will you deny?',
        source: 'Quran 55:13',
        analysis: 'تَكْرَارٌ — repeated 31 times for emphasis.',
      },
      {
        arabic: '﴿جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ إِنَّ الْبَاطِلَ كَانَ زَهُوقًا﴾',
        translation: 'Truth has come and falsehood has vanished. Falsehood is surely bound to vanish.',
        source: 'Quran 17:81',
        analysis: 'تَذْيِيلٌ — second sentence reinforces the first.',
      },
      {
        arabic: '﴿وَيُطْعِمُونَ الطَّعَامَ عَلَى حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا﴾',
        translation: 'They give food, out of their love for Him, to the needy, the orphan, and the captive.',
        source: 'Quran 76:8',
        analysis: 'تَتْمِيمٌ — عَلَى حُبِّهِ completes the meaning.',
      },
      {
        arabic: '﴿وَاشْتَعَلَ الرَّأْسُ شَيْبًا﴾',
        translation: 'And my head has lit ablaze with grey hair.',
        source: 'Quran 19:4',
        analysis: 'التَّوْضِيحُ بَعْدَ الْإِبْهَامِ — tamyiz muhawwal creates emphasis.',
      },
    ],
    tables: [
      {
        title: 'Types of Itnab (Elaboration)',
        titleAr: 'أَنْوَاعُ الإِطْنَابِ',
        headers: ['Type', 'Arabic', 'Description'],
        rows: [
          ['Specific after general', 'ذِكْرُ الْخَاصِّ بَعْدَ الْعَامِّ', 'Emphasize a specific item within a general category'],
          ['General after specific', 'ذِكْرُ الْعَامِّ بَعْدَ الْخَاصِّ', 'Broaden scope after mentioning specifics'],
          ['Repetition', 'تَكْرَارٌ', 'Repeat a word or sentence for emphasis'],
          ['Appending', 'تَذْيِيلٌ', 'Second sentence reinforces the first'],
          ['Completing', 'تَتْمِيمٌ', 'An added word highlights the meaning'],
          ['Parenthetical insertion', 'اعْتِرَاضٌ', 'A sentence inserted within another'],
          ['Precautionary clarification', 'اِحْتِرَاسٌ', 'Prevents misconception'],
          ['Clarification after ambiguity', 'التَّوْضِيحُ بَعْدَ الْإِبْهَامِ', 'Ambiguous then clarified'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['musawah', 'ijaz'],
  tags: ['maani', 'speech-length', 'itnab', 'elaboration', 'takrar', 'tadhyil', 'tatmim', 'itirad', 'ihtiras'],
};
