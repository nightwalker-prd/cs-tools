import type { BalagahTopic } from '../types';

export const majazIntro: BalagahTopic = {
  id: 'majaz-intro',
  titleAr: 'الْمَجَازُ',
  titleEn: 'Metaphor (Introduction)',
  transliteration: 'Al-Majaz',
  unitId: 'bayan',
  partId: 'bayan-majaz',
  content: {
    summary:
      'Majaz (metaphor) is a figure of speech that uses a word figuratively rather than literally. The key concept is the ilaqah (link) between the literal and metaphorical meaning, which determines whether the metaphor is an isti\'arah (based on tashbih) or a majaz mursal (based on another relationship).',
    body: `## Definition

<div dir="rtl" class="font-arabic">الْمَجَازُ</div>

A مَجَازٌ (metaphor) is a figure of speech that uses a word or phrase figuratively, rather than literally.

<div dir="rtl" class="font-arabic">﴿قَدْ جَاءَكُمْ مِنَ اللَّهِ نُورٌ﴾</div>

*Indeed, a light has come to you from Allah.* (Al-Ma'idah 5:15)

In this verse, the word نُورٌ is not used literally. Instead it is used metaphorically to refer to the Prophet (peace and blessings be upon him).

## عَلَاقَةٌ — The Link

<div dir="rtl" class="font-arabic">عَلَاقَةٌ</div>

In a مَجَازٌ, there is always a link between the literal meaning and the metaphorical meaning. This link is known as the عَلَاقَةٌ (ilaqah).

For example, with نُورٌ:
- **Literal meaning:** light
- **Metaphorical meaning:** the Prophet (peace and blessings be upon him)
- **عَلَاقَةٌ:** تَشْبِيهٌ — the Prophet is compared to light because he guides people, just as light illuminates darkness.

## Two Types of مَجَازٌ

Depending on the عَلَاقَةٌ between the literal and metaphorical meaning, there are two types:

### 1. اِسْتِعَارَةٌ (Isti'arah)
A مَجَازٌ in which the عَلَاقَةٌ is تَشْبِيهٌ (resemblance). The metaphor is based on a comparison.

### 2. مَجَازٌ مُرْسَلٌ (Majaz Mursal)
A مَجَازٌ in which the عَلَاقَةٌ is something **other than** تَشْبِيهٌ — such as cause, result, part-whole, or temporal relationships.`,
    rules: [
      {
        arabic: 'الْمَجَازُ',
        english:
          'A figure of speech that uses a word figuratively rather than literally. There must be a link (ilaqah) between the literal and metaphorical meaning.',
        examples: [
          {
            arabic: '﴿قَدْ جَاءَكُمْ مِنَ اللَّهِ نُورٌ﴾',
            translation: 'Indeed, a light has come to you from Allah.',
            source: 'Al-Ma\'idah 5:15',
            analysis:
              'The word nur (light) is used metaphorically for the Prophet. The ilaqah is tashbih — he guides like light.',
          },
        ],
      },
      {
        arabic: 'عَلَاقَةٌ',
        english:
          'The link between the literal and metaphorical meaning in a majaz. If based on tashbih, it is isti\'arah; otherwise it is majaz mursal.',
      },
    ],
    tables: [
      {
        title: 'Two Types of Majaz',
        titleAr: 'نَوْعَا الْمَجَازِ',
        headers: ['Type', 'Arabic', 'Ilaqah (Link)'],
        rows: [
          ['Isti\'arah', 'اِسْتِعَارَةٌ', 'Based on tashbih (resemblance)'],
          ['Majaz Mursal', 'مَجَازٌ مُرْسَلٌ', 'Based on other relationships (cause, part, etc.)'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['istiarah', 'majaz-mursal', 'tashbih'],
  tags: ['bayan', 'majaz', 'metaphor', 'figurative-language'],
};

export const istiarah: BalagahTopic = {
  id: 'istiarah',
  titleAr: 'الاِسْتِعَارَةُ',
  titleEn: 'Metaphorical Borrowing',
  transliteration: "Al-Isti'arah",
  unitId: 'bayan',
  partId: 'bayan-majaz',
  content: {
    summary:
      'Isti\'arah is a metaphor where the link (ilaqah) between literal and figurative meaning is tashbih (resemblance). It has two main types: mufradah (single-word) and tamthiliyyah (sentence-level). Single-word isti\'arah is further categorized by the type of borrowed word, elements mentioned, and use of extension.',
    body: `## Definition

<div dir="rtl" class="font-arabic">الاِسْتِعَارَةُ</div>

An اِسْتِعَارَةٌ is a figure of speech in which a word or sentence is used metaphorically instead of literally, and the عَلَاقَةٌ (link) between the literal and metaphorical meaning is تَشْبِيهٌ (resemblance).

## Two Main Types

1. **اِسْتِعَارَةٌ مُفْرَدَةٌ** — a single word used metaphorically (also simply called اِسْتِعَارَةٌ)
2. **اِسْتِعَارَةٌ تَمْثِيلِيَّةٌ** — an entire sentence used metaphorically

## اِسْتِعَارَةٌ مُفْرَدَةٌ — Single-Word Metaphor

<div dir="rtl" class="font-arabic">﴿الر كِتَابٌ أَنْزَلْنَاهُ إِلَيْكَ لِتُخْرِجَ النَّاسَ مِنَ الظُّلُمَاتِ إِلَى النُّورِ﴾</div>

*This is a book We have sent down to you, so that you may deliver the people, out of darkness into the light.* (Ibrahim 14:1)

Two single-word metaphors here:
- **الظُّلُمَاتِ** (darkness): mushabbah is الضَّلَالَةُ (misguidance), mushabbah bih is الظُّلُمَاتِ (darkness)
- **النُّورِ** (light): mushabbah is الْهِدَايَةُ (guidance), mushabbah bih is النُّورِ (light)

### Categorisation 1: Type of مُسْتَعَارٌ (Borrowed Word)

#### اِسْتِعَارَةٌ أَصْلِيَّةٌ — Original Metaphor
An اِسْتِعَارَةٌ in which an اِسْمٌ جَامِدٌ (non-derived noun) is used metaphorically.

> خَطَبَ الْأَسَدُ — *The lion gave a lecture.* (The noun أَسَدٌ is used metaphorically for a brave person.)

#### اِسْتِعَارَةٌ تَبَعِيَّةٌ — Subsidiary Metaphor
An اِسْتِعَارَةٌ in which a verb or اِسْمٌ مُشْتَقٌّ (derived noun) is used metaphorically.

> زَأَرَ الْخَطِيبُ — *The lecturer roared.* (The verb زَأَرَ is used metaphorically for confident speech.)

### Categorisation 2: Elements Mentioned

#### اِسْتِعَارَةٌ مُصَرَّحَةٌ — Explicit Metaphor
The مُسْتَعَارٌ (borrowed word) is the مُشَبَّهٌ بِهِ. The مُشَبَّهٌ is removed and only the مُشَبَّهٌ بِهِ remains.

<div dir="rtl" class="font-arabic">﴿الر كِتَابٌ أَنْزَلْنَاهُ إِلَيْكَ لِتُخْرِجَ النَّاسَ مِنَ الظُّلُمَاتِ إِلَى النُّورِ﴾</div>

Here الظُّلُمَاتِ and النُّورِ are the مُشَبَّهٌ بِهِ — the musarrahah type.

#### اِسْتِعَارَةٌ مَكْنِيَّةٌ — Implied Metaphor
The مُشَبَّهٌ بِهِ is omitted. Instead, a لَازِمٌ (inseparable attribute) of the مُشَبَّهٌ بِهِ is mentioned.

<div dir="rtl" class="font-arabic">﴿وَإِذَا الْكَوَاكِبُ انْتَثَرَتْ﴾</div>

*And when the stars will scatter.* (Al-Infitar 82:2)

The verb انْتَثَرَتْ (scattered) is a لَازِمٌ of the implied مُشَبَّهٌ بِهِ (beads from a broken string). The original تَشْبِيهٌ: الْكَوَاكِبُ مِثْلُ الْجَوَاهِرِ فِي سِلْكِهَا — "the stars are like beads in their thread."

### Categorisation 3: Use of Extension (مُلَائِمٌ)

In an اِسْتِعَارَةٌ, something may be mentioned that matches either the مُشَبَّهٌ or مُشَبَّهٌ بِهِ. This is called a مُلَائِمٌ.

#### اِسْتِعَارَةٌ مُطْلَقَةٌ — Unextended Metaphor
An اِسْتِعَارَةٌ in which no مُلَائِمٌ is mentioned.

#### اِسْتِعَارَةٌ مُرَشَّحَةٌ — Extended Metaphor
An اِسْتِعَارَةٌ in which a مُلَائِمٌ of the مُشَبَّهٌ بِهِ is mentioned.

<div dir="rtl" class="font-arabic">﴿أُولَئِكَ الَّذِينَ اشْتَرَوُا الضَّلَالَةَ بِالْهُدَى فَمَا رَبِحَتْ تِجَارَتُهُمْ﴾</div>

*Those are the people who purchased misguidance in exchange for guidance. And their transaction was not profitable.* (Al-Baqarah 2:16)

The word اشْتَرَوْا (purchased) is an اِسْتِعَارَةٌ for "exchange." The word رَبِحَتْ (profited) is a مُلَائِمٌ of the مُشَبَّهٌ بِهِ, extending the commercial metaphor.

## اِسْتِعَارَةٌ تَمْثِيلِيَّةٌ — Sentence-Level Metaphor

<div dir="rtl" class="font-arabic">الاِسْتِعَارَةُ التَّمْثِيلِيَّةُ</div>

An اِسْتِعَارَةٌ تَمْثِيلِيَّةٌ uses an **entire sentence** metaphorically to convey a message, similar to an English idiom. While اِسْتِعَارَةٌ مُفْرَدَةٌ uses a single word in its metaphorical meaning, the تَمْثِيلِيَّةٌ type uses the whole sentence.

<div dir="rtl" class="font-arabic">﴿مَا مِنْ دَابَّةٍ إِلَّا هُوَ آخِذٌ بِنَاصِيَتِهَا﴾</div>

*There is no creature, but He holds it by the forelock.* (Hud 11:56)

This sentence-level metaphor conveys that Allah has complete control over every creature.`,
    rules: [
      {
        arabic: 'اِسْتِعَارَةٌ مُفْرَدَةٌ',
        english:
          'A single word used metaphorically based on a tashbih. Analyzed by: (1) type of borrowed word, (2) elements mentioned, (3) use of extension.',
      },
      {
        arabic: 'اِسْتِعَارَةٌ أَصْلِيَّةٌ / تَبَعِيَّةٌ',
        english:
          'Asliyyah: a non-derived noun used metaphorically. Taba\'iyyah: a verb or derived noun used metaphorically.',
      },
      {
        arabic: 'اِسْتِعَارَةٌ مُصَرَّحَةٌ / مَكْنِيَّةٌ',
        english:
          'Musarrahah (explicit): the mushabbah bih is stated. Makniyyah (implied): the mushabbah bih is omitted, replaced by one of its attributes (lazim).',
      },
      {
        arabic: 'اِسْتِعَارَةٌ مُطْلَقَةٌ / مُرَشَّحَةٌ',
        english:
          'Mutlaqah: no extension (mula\'im) is mentioned. Murashshahah: an attribute matching the mushabbah bih is added, extending the metaphor.',
      },
      {
        arabic: 'اِسْتِعَارَةٌ تَمْثِيلِيَّةٌ',
        english:
          'A sentence-level metaphor where the entire sentence is used figuratively to convey a message, like an idiom.',
      },
    ],
    examples: [
      {
        arabic: '﴿لِتُخْرِجَ النَّاسَ مِنَ الظُّلُمَاتِ إِلَى النُّورِ﴾',
        translation:
          'So that you may deliver the people, out of darkness into the light.',
        source: 'Ibrahim 14:1',
        analysis:
          'Two isti\'arah musarrahah: "darkness" for misguidance, "light" for guidance. The mushabbah bih is stated directly.',
      },
      {
        arabic: '﴿وَإِذَا الْكَوَاكِبُ انْتَثَرَتْ﴾',
        translation: 'And when the stars will scatter.',
        source: 'Al-Infitar 82:2',
        analysis:
          'Isti\'arah makniyyah: the mushabbah bih (beads) is omitted. Only its lazim (intatharat — scattering) is mentioned.',
      },
      {
        arabic: '﴿أُولَئِكَ الَّذِينَ اشْتَرَوُا الضَّلَالَةَ بِالْهُدَى فَمَا رَبِحَتْ تِجَارَتُهُمْ﴾',
        translation:
          'Those who purchased misguidance in exchange for guidance. And their transaction was not profitable.',
        source: 'Al-Baqarah 2:16',
        analysis:
          'Isti\'arah murashshahah: "purchased" is the metaphor; "profited" and "transaction" extend the commercial metaphor as mula\'im.',
      },
      {
        arabic: '﴿مَا مِنْ دَابَّةٍ إِلَّا هُوَ آخِذٌ بِنَاصِيَتِهَا﴾',
        translation: 'There is no creature, but He holds it by the forelock.',
        source: 'Hud 11:56',
        analysis:
          'Isti\'arah tamthiliyyah: the entire sentence is used metaphorically to express Allah\'s complete control.',
      },
    ],
    tables: [
      {
        title: 'Comparison: Tashbih vs Isti\'arah Elements',
        titleAr: 'مُقَارَنَةٌ بَيْنَ التَّشْبِيهِ وَالاِسْتِعَارَةِ',
        headers: ['Element', 'Tashbih Baligh', 'Musarrahah', 'Makniyyah'],
        rows: [
          ['مُشَبَّهٌ', 'Present', 'Omitted', 'Present'],
          ['مُشَبَّهٌ بِهِ', 'Present', 'Present', 'Omitted'],
          ['وَجْهُ الشَّبَهِ', 'Omitted', 'Omitted', 'Omitted'],
          ['أَدَاةُ التَّشْبِيهِ', 'Omitted', 'Omitted', 'Omitted'],
          ['لَازِمٌ', '—', '—', 'Present'],
        ],
      },
      {
        title: 'Categories of Isti\'arah Mufradah',
        titleAr: 'أَقْسَامُ الاِسْتِعَارَةِ الْمُفْرَدَةِ',
        headers: ['Perspective', 'Type 1', 'Type 2'],
        rows: [
          ['By borrowed word', 'أَصْلِيَّةٌ (noun)', 'تَبَعِيَّةٌ (verb/derived)'],
          ['By elements', 'مُصَرَّحَةٌ (explicit)', 'مَكْنِيَّةٌ (implied)'],
          ['By extension', 'مُطْلَقَةٌ (unextended)', 'مُرَشَّحَةٌ (extended)'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['majaz-intro', 'tashbih', 'majaz-mursal'],
  tags: ['bayan', 'majaz', 'istiarah', 'metaphor'],
};

export const majazMursal: BalagahTopic = {
  id: 'majaz-mursal',
  titleAr: 'الْمَجَازُ الْمُرْسَلُ',
  titleEn: 'Metonymy (Majaz Mursal)',
  transliteration: 'Al-Majaz al-Mursal',
  unitId: 'bayan',
  partId: 'bayan-majaz',
  content: {
    summary:
      'Majaz Mursal is a type of figurative language where the relationship (ilaqah) between the literal and intended meaning is NOT based on tashbih (resemblance), but on another link such as causality, result, whole-part, past state, future state, or proximity.',
    body: `## Definition

<div dir="rtl" class="font-arabic">الْمَجَازُ الْمُرْسَلُ</div>

A مَجَازٌ مُرْسَلٌ is a type of figurative language where the relationship between the literal meaning and the intended meaning is **not** based on تَشْبِيهٌ (resemblance), but rather on something closely related to the literal meaning. There are seven types of عَلَاقَة.

## 1. سَبَبِيَّةٌ — Causality

The literal meaning is the **cause** of the metaphorical meaning.

<div dir="rtl" class="font-arabic">«اَلْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُوْنَ مِنْ لِسَانِهِ وَيَدِهِ»</div>

*A Muslim is the one from whose tongue and hands Muslims are safe.* (Hadith)

- **لِسَانٌ** (tongue) → literally means the organ, metaphorically means **words** (the tongue is the cause of words)
- **يَدٌ** (hand) → literally means the limb, metaphorically means **actions** (the hand is the cause of actions)

## 2. مُسَبَّبِيَّةٌ — Result

The literal meaning is the **result** of the metaphorical meaning.

<div dir="rtl" class="font-arabic">﴿وَيُنَزِّلُ لَكُمْ مِنَ السَّمَاءِ رِزْقًا﴾</div>

*And He sends down provision for you from the sky.* (Ghafir 40:13)

- **رِزْقٌ** (provision/sustenance) → literally means sustenance, metaphorically means **rain** (sustenance is the result of rain)

## 3. كُلِّيَّةٌ — Whole for Part

The literal meaning is the **whole** but the intended meaning is a **part**.

<div dir="rtl" class="font-arabic">﴿يَجْعَلُونَ أَصَابِعَهُمْ فِي آذَانِهِمْ﴾</div>

*They thrust their fingers in their ears.* (Al-Baqarah 2:19)

- **أَصَابِعٌ** (fingers) → literally means whole fingers, metaphorically means **fingertips** (the whole is used for the part)

## 4. جُزْئِيَّةٌ — Part for Whole

The literal meaning is a **part** but the intended meaning is the **whole**.

<div dir="rtl" class="font-arabic">﴿أَوْ تَحْرِيرُ رَقَبَةٍ﴾</div>

*Freeing of a neck.* (Al-Ma'idah 5:89)

- **رَقَبَةٌ** (neck) → literally means the neck, metaphorically means the **entire slave** (a part is used for the whole)

## 5. اِعْتِبَارُ مَا كَانَ — Past State

The literal meaning is the **past state** of the metaphorical meaning.

<div dir="rtl" class="font-arabic">﴿وَآتُوا الْيَتَامَى أَمْوَالَهُمْ﴾</div>

*Give the orphans their property.* (An-Nisa 4:2)

- **يَتَامَى** (orphans) → they are no longer orphans (now adults), but the term reflects their **past state**

## 6. اِعْتِبَارُ مَا يَكُونُ — Future State

The literal meaning is the **future state** of the metaphorical meaning.

<div dir="rtl" class="font-arabic">﴿قَالَ أَحَدُهُمَا إِنِّي أَرَانِي أَعْصِرُ خَمْرًا﴾</div>

*I have seen myself [in a dream] pressing wine.* (Yusuf 12:36)

- **خَمْرٌ** (wine) → literally means wine, but he was pressing **grapes** — wine is the **future state** of grapes

## 7. مُقَارَبَةٌ — Proximity

The literal meaning is something **near in time or space** to the metaphorical meaning.

<div dir="rtl" class="font-arabic">مَنْ تَرَكَهَا (الصَّلَاةَ) فَقَدْ كَفَرَ</div>

*Whoever leaves salah intentionally has disbelieved.* (Hadith)

- **كَفَرَ** (disbelieved) → literally means became a disbeliever, metaphorically means **came close to** disbelief (proximity)`,
    rules: [
      {
        arabic: 'الْمَجَازُ الْمُرْسَلُ',
        english:
          'A figurative expression where the link (ilaqah) between literal and intended meaning is NOT resemblance (tashbih), but one of seven other relationships.',
      },
      {
        arabic: 'سَبَبِيَّةٌ',
        english: 'Causality — the literal meaning is the CAUSE of the intended meaning.',
      },
      {
        arabic: 'مُسَبَّبِيَّةٌ',
        english: 'Result — the literal meaning is the RESULT of the intended meaning.',
      },
      {
        arabic: 'كُلِّيَّةٌ',
        english: 'Whole — the literal meaning is the WHOLE, the intended meaning is a PART.',
      },
      {
        arabic: 'جُزْئِيَّةٌ',
        english: 'Part — the literal meaning is a PART, the intended meaning is the WHOLE.',
      },
      {
        arabic: 'اِعْتِبَارُ مَا كَانَ',
        english: 'Past State — the literal meaning reflects the PAST STATE of the intended meaning.',
      },
      {
        arabic: 'اِعْتِبَارُ مَا يَكُونُ',
        english: 'Future State — the literal meaning reflects the FUTURE STATE of the intended meaning.',
      },
      {
        arabic: 'مُقَارَبَةٌ',
        english: 'Proximity — the literal meaning is something NEAR to the intended meaning.',
      },
    ],
    examples: [
      {
        arabic: '«اَلْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُوْنَ مِنْ لِسَانِهِ وَيَدِهِ»',
        translation: 'A Muslim is the one from whose tongue and hands Muslims are safe.',
        source: 'Hadith',
        analysis:
          'Sababiyyah: "tongue" (cause) for "words" (effect); "hand" (cause) for "actions" (effect).',
      },
      {
        arabic: '﴿يَجْعَلُونَ أَصَابِعَهُمْ فِي آذَانِهِمْ﴾',
        translation: 'They thrust their fingers in their ears.',
        source: 'Al-Baqarah 2:19',
        analysis:
          'Kulliyyah: "fingers" (whole) is used to mean "fingertips" (part).',
      },
      {
        arabic: '﴿أَوْ تَحْرِيرُ رَقَبَةٍ﴾',
        translation: 'Freeing of a neck.',
        source: "Al-Ma'idah 5:89",
        analysis:
          'Juz\'iyyah: "neck" (part) is used to mean "the entire slave" (whole).',
      },
      {
        arabic: '﴿قَالَ أَحَدُهُمَا إِنِّي أَرَانِي أَعْصِرُ خَمْرًا﴾',
        translation: 'I have seen myself [in a dream] pressing wine.',
        source: 'Yusuf 12:36',
        analysis:
          'I\'tibar ma yakun: "wine" (future state) is used for "grapes" (current state).',
      },
    ],
    tables: [
      {
        title: 'Seven Types of Ilaqah in Majaz Mursal',
        titleAr: 'أَنْوَاعُ الْعَلَاقَةِ فِي الْمَجَازِ الْمُرْسَلِ',
        headers: ['Ilaqah', 'Arabic', 'Relationship', 'Example Word'],
        rows: [
          ['Sababiyyah', 'سَبَبِيَّةٌ', 'Cause → Effect', 'لِسَان (tongue → words)'],
          ['Musabbabiyyah', 'مُسَبَّبِيَّةٌ', 'Effect → Cause', 'رِزْق (provision → rain)'],
          ['Kulliyyah', 'كُلِّيَّةٌ', 'Whole → Part', 'أَصَابِع (fingers → fingertips)'],
          ['Juz\'iyyah', 'جُزْئِيَّةٌ', 'Part → Whole', 'رَقَبَة (neck → slave)'],
          ['I\'tibar ma kan', 'اِعْتِبَارُ مَا كَانَ', 'Past State', 'يَتَامَى (orphans → adults)'],
          ['I\'tibar ma yakun', 'اِعْتِبَارُ مَا يَكُونُ', 'Future State', 'خَمْر (wine → grapes)'],
          ['Muqarabah', 'مُقَارَبَةٌ', 'Proximity', 'كَفَرَ (disbelief → near it)'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['majaz-intro', 'istiarah', 'majaz-aqli'],
  tags: ['bayan', 'majaz', 'majaz-mursal', 'metonymy'],
};

export const majazAqli: BalagahTopic = {
  id: 'majaz-aqli',
  titleAr: 'الْمَجَازُ الْعَقْلِيُّ وَالاِشْتِقَاقِيُّ',
  titleEn: 'Intellectual & Derivational Metaphor',
  transliteration: "Al-Majaz al-'Aqli wa al-Ishtiqaqi",
  unitId: 'bayan',
  partId: 'bayan-majaz',
  content: {
    summary:
      'Majaz Aqli (intellectual metaphor) attributes an action to someone or something that is not its actual doer. Majaz Ishtiqaqi (derivational metaphor) uses one morphological form in the meaning of another, such as ism fa\'il for ism maf\'ul or vice versa.',
    body: `## الْمَجَازُ الْعَقْلِيُّ — Intellectual Metaphor

<div dir="rtl" class="font-arabic">الْمَجَازُ الْعَقْلِيُّ</div>

الْمَجَازُ الْعَقْلِيُّ is a metaphor in the link between the مُسْنَدٌ (predicate) and مُسْنَدٌ إِلَيْهِ (subject). It attributes a فِعْلٌ (action) to someone or something that is **not its actual فَاعِلٌ** (doer).

<div dir="rtl" class="font-arabic">﴿إِنَّ فِرْعَوْنَ عَلَا فِي الْأَرْضِ ... يُذَبِّحُ أَبْنَاءَهُمْ﴾</div>

*Indeed, Fir'awn had become high-handed in the land ... slaughtering their sons.* (Al-Qasas 28:4)

Fir'awn is described as slaughtering the sons of the Banu Israel, although he may not have physically carried out the act himself. The action is ascribed to him because he commanded his army to do so.

## الْمَجَازُ الاِشْتِقَاقِيُّ — Derivational Metaphor (Supplement)

<div dir="rtl" class="font-arabic">الْمَجَازُ الاِشْتِقَاقِيُّ</div>

الْمَجَازُ الْعَقْلِيُّ can also occur in مُشْتَقَّاتٌ (derived forms): one مُشْتَقٌّ can be used in the meaning of another.

### اِسْمُ فَاعِلٍ in the Meaning of اِسْمُ مَفْعُولٍ

<div dir="rtl" class="font-arabic">﴿فَهُوَ فِي عِيشَةٍ رَاضِيَةٍ﴾</div>

*He will be in an enjoyable life.* (Al-Haqqah 69:21)

The word رَاضِيَةٌ is an اِسْمُ فَاعِلٍ (meaning "happy/satisfied"), but it is used here in the meaning of the اِسْمُ مَفْعُولٍ مَرْضِيَّةٌ (meaning "enjoyable/pleasing").

### اِسْمُ مَفْعُولٍ in the Meaning of اِسْمُ فَاعِلٍ

<div dir="rtl" class="font-arabic">﴿حِجَابًا مَسْتُورًا﴾</div>

*A covering veil.* (Al-Isra 17:45)

The word مَسْتُورٌ is an اِسْمُ مَفْعُولٍ (meaning "covered/hidden"), but it is used here in the meaning of the اِسْمُ فَاعِلٍ سَاتِرٌ (meaning "covering/concealing").`,
    rules: [
      {
        arabic: 'الْمَجَازُ الْعَقْلِيُّ',
        english:
          'An intellectual metaphor that attributes an action to someone or something that is not the actual doer — a metaphor in the link between subject and predicate.',
        examples: [
          {
            arabic: '﴿إِنَّ فِرْعَوْنَ عَلَا فِي الْأَرْضِ ... يُذَبِّحُ أَبْنَاءَهُمْ﴾',
            translation:
              'Indeed, Fir\'awn had become high-handed in the land ... slaughtering their sons.',
            source: 'Al-Qasas 28:4',
            analysis:
              'Fir\'awn did not personally slaughter — the act is attributed to him as the commander.',
          },
        ],
      },
      {
        arabic: 'الْمَجَازُ الاِشْتِقَاقِيُّ',
        english:
          'A derivational metaphor where one morphological form (mushtaqq) is used in the meaning of another — e.g., ism fa\'il for ism maf\'ul or vice versa.',
      },
    ],
    examples: [
      {
        arabic: '﴿فَهُوَ فِي عِيشَةٍ رَاضِيَةٍ﴾',
        translation: 'He will be in an enjoyable life.',
        source: 'Al-Haqqah 69:21',
        analysis:
          'Majaz ishtiqaqi: radiyah (ism fa\'il — happy) used in the meaning of mardiyyah (ism maf\'ul — pleasing/enjoyable).',
      },
      {
        arabic: '﴿حِجَابًا مَسْتُورًا﴾',
        translation: 'A covering veil.',
        source: 'Al-Isra 17:45',
        analysis:
          'Majaz ishtiqaqi: mastur (ism maf\'ul — covered) used in the meaning of satir (ism fa\'il — covering).',
      },
    ],
    tables: [
      {
        title: 'Derivational Metaphor: Form Swaps',
        titleAr: 'الْمَجَازُ الاِشْتِقَاقِيُّ',
        headers: ['Verse Word', 'Its Form', 'Intended Meaning', 'Intended Form'],
        rows: [
          ['رَاضِيَةٌ', 'اِسْمُ فَاعِلٍ', 'مَرْضِيَّةٌ (enjoyable)', 'اِسْمُ مَفْعُولٍ'],
          ['مَسْتُورٌ', 'اِسْمُ مَفْعُولٍ', 'سَاتِرٌ (covering)', 'اِسْمُ فَاعِلٍ'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['majaz-intro', 'istiarah', 'majaz-mursal'],
  tags: ['bayan', 'majaz', 'majaz-aqli', 'majaz-ishtiqaqi'],
};
