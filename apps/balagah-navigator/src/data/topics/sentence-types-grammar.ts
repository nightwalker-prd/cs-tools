import type { BalagahTopic } from '../types';

export const sentenceTypesGrammar: BalagahTopic = {
  id: 'sentence-types-grammar',
  titleAr: 'أَنْوَاعُ الْجُمَلِ حَسَبَ النَّحْوِ',
  titleEn: 'Types of Sentences According to Grammar',
  transliteration: 'Anwa\' al-Jumal Hasab al-Nahw',
  unitId: 'maani',
  partId: 'maani-types-grammar',
  content: {
    summary:
      'Sentences are classified as nominal (ismiyyah) or verbal (fi\'liyyah). In Balagah, unlike Nahw, a sentence with a verb anywhere in it is considered fi\'liyyah. Nominal sentences convey thubut (permanence) while verbal sentences convey huduth (occurrence) or tajaddud (recurrence).',
    body: `## Two Types of Sentences

According to grammar, there are two types of sentences:

<div dir="rtl" class="font-arabic">
١) جُمْلَةٌ اسْمِيَّةٌ
٢) جُمْلَةٌ فِعْلِيَّةٌ
</div>

In Nahw, when a sentence starts with a noun, it is classified as a جُمْلَةٌ اسْمِيَّةٌ regardless of the content of its خَبَرٌ. However, in Balagah, if a sentence begins with a noun but contains a فِعْلٌ in its خَبَرٌ, it is still categorized as a جُمْلَةٌ فِعْلِيَّةٌ. This is because the focus of Balagah is on the **meaning** of the sentence, and the presence of a فِعْلٌ anywhere gives the meaning of a verb.

## جُمْلَةٌ اسْمِيَّةٌ — Nominal Sentence

A جُمْلَةٌ اسْمِيَّةٌ represents a **connection** between the مُبْتَدَأٌ and خَبَرٌ, indicating that the مُبْتَدَأٌ possesses the characteristic described in the خَبَرٌ.

### Types of Connections

The connection can be of two types:

- **ثُبُوْتٌ** (Thubut — Stative): A connection without reference to its duration. This is the default tense of the جُمْلَةٌ اسْمِيَّةٌ.
- **دَوَامٌ** (Dawam — Continuous): The establishment of a long-lasting, eternal connection.

The connection can occur in any tense:

**Present Tense (default):**

<div dir="rtl" class="font-arabic">الرَّجُلُ قَائِمٌ</div>

*The man is standing.* — This is ثُبُوْتٌ.

**Present with long-term meaning (دَوَامٌ):**

<div dir="rtl" class="font-arabic">﴿اَلْحَمْدُ لِلّٰهِ رَبِّ الْعَلَمِيْنَ﴾</div>

*All praise is for Allah, Lord of the worlds.* — The quality of Allah being Lord of the worlds is eternal.

**Past Tense:**

<div dir="rtl" class="font-arabic">﴿إِنَّ إِبْرٰهِيْمَ كَانَ أُمَّةً قَانِتًا لِلّٰهِ حَنِيْفًا﴾</div>

*Surely, Ibrahim was an Ummah.* — This is ثُبُوْتٌ فِي الْمَاضِيْ.

**Future Tense:**

<div dir="rtl" class="font-arabic">﴿إِنَّ الْمُتَّقِيْنَ فِيْ جَنّٰتٍ وَعُيُوْنٍ﴾</div>

*Surely, the God-Fearing will be in gardens and springs.* — This is ثُبُوْتٌ فِي الْمُسْتَقْبِلِ.

### Note on كَانَ

The meaning of a جُمْلَةٌ اسْمِيَّةٌ with كَانَ defaults to a link that existed in the past and has since ended. However, كَانَ can indicate an ongoing link when:

1. **The subject is Allah:** ﴿وَكَانَ اللهُ عَلِيْمًا حَكِيْمًا﴾ — *Allah is ever Knowing, Wise.* (Implies eternal possession of these qualities.)

2. **The subject possesses a quality inherently:** ﴿وَكَانَ الْإِنْسَانُ عَجُوْلًا﴾ — *Man is prone to be hasty.* (Indicates a predisposed trait.)

3. **The sentence shows a certain future event (Prophetic perfect tense):** ﴿إِنَّ الْبَاطِلَ كَانَ زَهُوْقًا﴾ — *Surely, falsehood is ever bound to vanish.* (Implies inevitability.)

## جُمْلَةٌ فِعْلِيَّةٌ — Verbal Sentence

A جُمْلَةٌ فِعْلِيَّةٌ shows the **occurrence** of an action. There are two types:

- **حُدُوْثٌ** (Huduth — Single Occurrence): A single occurrence in the past or future.
- **تَجَدُّدٌ** (Tajaddud — Repeated Occurrence): A recurring action in the past, present, or future.

### حُدُوْثٌ — Single Occurrence

**Simple Past:**

<div dir="rtl" class="font-arabic">﴿وَقَتَلَ دَاوُدُ جَالُوْتَ﴾</div>

*And Dawud killed Goliath.*

**Simple Future:**

<div dir="rtl" class="font-arabic">﴿ثُمَّ يَأْتِيْ مِنْ بَعْدِ ذٰلِكَ سَبْعٌ شِدَادٌ﴾</div>

*Then after that will come seven hard years.*

### تَجَدُّدٌ — Repeated Occurrence

**Past Habitual:**

<div dir="rtl" class="font-arabic">﴿كَانَا يَأْكُلَانِ الطَّعَامَ﴾</div>

*They used to eat food.*

**Present Habitual:**

<div dir="rtl" class="font-arabic">﴿وَاللهُ يَرْزُقُ مَنْ يَشَآءُ بِغَيْرِ حِسَابٍ﴾</div>

*Allah gives whom He wills without counting.*

## The Hypocrites Example

<div dir="rtl" class="font-arabic">﴿وَإِذَا لَقُوا الَّذِيْنَ اٰمَنُوْا قَالُوْا اٰمَنَّا وَإِذَا خَلَوْا إِلَىٰ شَيَاطِيْنِهِمْ قَالُوْا إِنَّا مَعَكُمْ﴾</div>

*When they meet those who believe, they say, "We have entered Faith;" but when they are alone with their satans, they say, "Indeed, we are with you."*

The first quote (اٰمَنَّا) is a جُمْلَةٌ فِعْلِيَّةٌ depicting حُدُوْثٌ — their faith claim is hypocritical with no ثُبُوْتٌ. The second quote (إِنَّا مَعَكُمْ) is a جُمْلَةٌ اسْمِيَّةٌ depicting ثُبُوْتٌ and دَوَامٌ — their evil association is genuine and lasting.

## Interchanging فِعْلٌ مُضَارِعٌ and فِعْلٌ مَاضٍ

**Past tense for a future event** — to indicate certainty:

<div dir="rtl" class="font-arabic">﴿أَتَىٰٓ أَمْرُ اللهِ فَلَا تَسْتَعْجِلُوْهُ﴾</div>

*The Event ordained by Allah will surely come to pass.* — The past tense أَتَىٰ is used for a future event to emphasize its inevitability.

**Present tense for a past event** — to highlight its severity:

<div dir="rtl" class="font-arabic">﴿فَفَرِيْقًا كَذَّبْتُمْ وَفَرِيْقًا تَقْتُلُوْنَ﴾</div>

*A faction you denied, and a faction you kill.* — The present tense تَقْتُلُوْنَ describes a past event to highlight the abomination of the action.`,
    rules: [
      {
        arabic: 'جُمْلَةٌ اسْمِيَّةٌ',
        english:
          'A nominal sentence shows a connection (thubut) between subject and predicate, indicating the subject possesses the described quality. It can express permanence (dawam) or a stative connection.',
        examples: [
          {
            arabic: '﴿اَلْحَمْدُ لِلّٰهِ رَبِّ الْعَلَمِيْنَ﴾',
            translation: 'All praise is for Allah, Lord of the worlds.',
            source: 'Quran 1:2',
            analysis: 'Jumlah ismiyyah with dawam — the connection is eternal.',
          },
        ],
      },
      {
        arabic: 'جُمْلَةٌ فِعْلِيَّةٌ',
        english:
          'A verbal sentence shows the occurrence of an action — either a single occurrence (huduth) or a repeated occurrence (tajaddud).',
        examples: [
          {
            arabic: '﴿وَقَتَلَ دَاوُدُ جَالُوْتَ﴾',
            translation: 'And Dawud killed Goliath.',
            source: 'Quran 2:251',
            analysis: 'Jumlah fi\'liyyah with huduth — a single past occurrence.',
          },
        ],
      },
      {
        english:
          'In Balagah (unlike Nahw), if a sentence begins with a noun but contains a fi\'l in its khabar, it is classified as fi\'liyyah because the focus is on meaning.',
      },
    ],
    examples: [
      {
        arabic: '﴿إِنَّ إِبْرٰهِيْمَ كَانَ أُمَّةً قَانِتًا لِلّٰهِ حَنِيْفًا﴾',
        translation: 'Surely, Ibrahim was an Ummah.',
        source: 'Quran 16:120',
        analysis: 'Ismiyyah with thubut in the past — a stative quality in the past tense.',
      },
      {
        arabic: '﴿إِنَّ الْمُتَّقِيْنَ فِيْ جَنّٰتٍ وَعُيُوْنٍ﴾',
        translation: 'Surely, the God-Fearing will be in gardens and springs.',
        source: 'Quran 15:45',
        analysis: 'Ismiyyah with thubut in the future.',
      },
      {
        arabic: '﴿كَانَا يَأْكُلَانِ الطَّعَامَ﴾',
        translation: 'They used to eat food.',
        source: 'Quran 5:75',
        analysis: 'Fi\'liyyah with tajaddud — a repeated past occurrence (habitual).',
      },
      {
        arabic: '﴿أَتَىٰٓ أَمْرُ اللهِ فَلَا تَسْتَعْجِلُوْهُ﴾',
        translation: 'The Event ordained by Allah will surely come to pass.',
        source: 'Quran 16:1',
        analysis: 'Past tense used for a future event to emphasize certainty and inevitability.',
      },
      {
        arabic: '﴿فَفَرِيْقًا كَذَّبْتُمْ وَفَرِيْقًا تَقْتُلُوْنَ﴾',
        translation: 'A faction you denied, and a faction you kill.',
        source: 'Quran 2:87',
        analysis: 'Present tense used for a past event to highlight the severity of the action.',
      },
    ],
    tables: [
      {
        title: 'Nahw vs. Balagah Classification',
        titleAr: 'مُقَارَنَةٌ بَيْنَ النَّحْوِ وَالْبَلَاغَةِ',
        headers: ['Sentence', 'زَيْدٌ صَائِمٌ', 'زَيْنَبُ تَصُوْمُ', 'تَصُوْمُ زَيْنَبُ'],
        rows: [
          ['عِلْمُ النَّحْوِ', 'اسْمِيَّةٌ', 'اسْمِيَّةٌ', 'فِعْلِيَّةٌ'],
          ['عِلْمُ الْبَلَاغَةِ', 'اسْمِيَّةٌ', 'فِعْلِيَّةٌ', 'فِعْلِيَّةٌ'],
        ],
      },
      {
        title: 'Nominal vs Verbal Sentence Properties',
        titleAr: 'خَصَائِصُ الْجُمْلَةِ الاسْمِيَّةِ وَالْفِعْلِيَّةِ',
        headers: ['Property', 'جُمْلَةٌ اسْمِيَّةٌ', 'جُمْلَةٌ فِعْلِيَّةٌ'],
        rows: [
          ['Shows', 'Connection (ثُبُوْتٌ)', 'Occurrence of action'],
          ['Types', 'ثُبُوْتٌ (stative) / دَوَامٌ (continuous)', 'حُدُوْثٌ (single) / تَجَدُّدٌ (repeated)'],
          ['Tenses', 'Past, present, future', 'Past, present, future'],
          ['Focus', 'Quality/state of the subject', 'Action performed by the subject'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['parts-of-sentence', 'khabariyyah', 'sentence-order'],
  tags: ['maani', 'ismiyyah', 'fi\'liyyah', 'thubut', 'huduth', 'tajaddud', 'dawam'],
};
