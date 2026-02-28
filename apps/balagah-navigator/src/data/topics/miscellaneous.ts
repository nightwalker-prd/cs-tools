import type { BalagahTopic } from '../types';

export const miscellaneous: BalagahTopic = {
  id: 'miscellaneous',
  titleAr: 'مُتَفَرِّقَاتٌ',
  titleEn: 'Miscellaneous Devices',
  transliteration: 'Mutafarriqat',
  unitId: 'maani',
  partId: 'maani-misc',
  content: {
    summary:
      'Four miscellaneous literary devices in Ilm al-Ma\'ani: tajahul al-\'arif (feigning ignorance), at-taghlib (predominance — one word represents two meanings), uslub al-hakim (the wise style — answering a more suitable question), and tanzil (treating one category as another).',
    body: `## Overview

This section covers four miscellaneous literary devices that do not fall neatly into the previous categories of Ilm al-Ma'ani.

## تَجَاهُلُ الْعَارِفِ — Feigning Ignorance

تَجَاهُلُ الْعَارِفِ is a literary device used to express a statement as though the speaker is unaware of it, even though he is fully aware. This creates a rhetorical effect of fairness, humility, or indirect persuasion.

<div dir="rtl" class="font-arabic">﴿وَإِنَّا أَوْ إِيَّاكُمْ لَعَلَى هُدًى أَوْ فِي ضَلَالٍ مُبِينٍ﴾</div>

*And We or you are either on the right path or in open error.* — The speaker knows with certainty that he is on the right path, but presents both options as if uncertain, in order to be diplomatic and persuasive.

## التَّغْلِيبُ — Predominance

التَّغْلِيبُ is a literary device in which one word is used to represent two meanings. It occurs in several ways:

### 1. Dual/Plural for Different Singulars

Using a dual or plural form to represent different singular forms.

Example: Using الْقَمَرَانِ (the two moons) to represent both الْقَمَرُ (moon) and الشَّمْسُ (sun).

### 2. One Gender for Both

Using one gender to represent both genders.

Example: Using وَالِدَانِ and أَبَوَانِ (both masculine dual) to refer to mother and father.

### 3. One Category for All

Using a term typically associated with one group to encompass all.

<div dir="rtl" class="font-arabic">﴿الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ﴾</div>

*Praise belongs to Allah, Lord of the worlds.* — The word عَالَمِينَ is a plural usually used for عُقَلَاءُ (rational beings), but here it encompasses both عُقَلَاءِ and غَيْرُ عَقَلَاءِ (rational and non-rational beings).

## أُسْلُوبُ الْحَكِيمِ — The Wise Style

أُسْلُوبُ الْحَكِيمِ is a literary device in which a question is not answered directly. Instead, an answer to a more suitable or beneficial question is given.

<div dir="rtl" class="font-arabic">﴿يَسْأَلُونَكَ عَنِ الْأَهِلَّةِ قُلْ هِيَ مَوَاقِيتُ لِلنَّاسِ وَالْحَجِّ﴾</div>

*They ask you regarding the crescents. Say: They are signs to mark fixed periods of time.* — When the companions inquired about the physical cause of the moon's changes, Allah responded with information more pertinent to their lives: the practical purpose of lunar phases for determining times and Hajj.

## تَنْزِيلٌ — Treating One Category as Another

تَنْزِيلٌ is a literary device in which one thing is addressed or treated under the ruling of another. For example, speaking to a غَيْرُ عَاقِلٍ (non-rational being) as if it were عَاقِلٌ (rational).

<div dir="rtl" class="font-arabic">﴿فَقَالَ أَلَا تَأْكُلُونَ﴾</div>

*Ibrahim (peace be upon him) said (to the idols): Do you not eat?* — The verb تَأْكُلُونَ addresses the idols using the 2nd person masculine plural, a form normally used for rational beings. Without تَنْزِيلٌ, the singular feminine form would have been used.`,
    rules: [
      {
        arabic: 'تَجَاهُلُ الْعَارِفِ',
        english:
          'Feigning ignorance — expressing a statement as though the speaker is unaware of it, even though he knows it, for diplomatic or persuasive effect.',
        examples: [
          {
            arabic: '﴿وَإِنَّا أَوْ إِيَّاكُمْ لَعَلَى هُدًى أَوْ فِي ضَلَالٍ مُبِينٍ﴾',
            translation: 'And We or you are either on the right path or in open error.',
            source: 'Quran 34:24',
            analysis: 'The speaker knows he is on the truth but presents both sides to be persuasive.',
          },
        ],
      },
      {
        arabic: 'التَّغْلِيبُ',
        english:
          'Predominance — one word or form is used to represent two meanings or categories, such as using a dual for two different singulars, one gender for both, or one category for all.',
        examples: [
          {
            arabic: '﴿الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ﴾',
            translation: 'Praise belongs to Allah, Lord of the worlds.',
            source: 'Quran 1:2',
            analysis: 'عَالَمِينَ (plural for rational beings) encompasses both rational and non-rational beings.',
          },
        ],
      },
      {
        arabic: 'أُسْلُوبُ الْحَكِيمِ',
        english:
          'The wise style — a question is not answered directly; instead, a more suitable or beneficial answer is given.',
        examples: [
          {
            arabic: '﴿يَسْأَلُونَكَ عَنِ الْأَهِلَّةِ قُلْ هِيَ مَوَاقِيتُ لِلنَّاسِ وَالْحَجِّ﴾',
            translation: 'They ask you about the crescents. Say: They are signs to mark fixed periods of time.',
            source: 'Quran 2:189',
            analysis: 'Instead of explaining the physical cause, Allah gives the practical wisdom.',
          },
        ],
      },
      {
        arabic: 'تَنْزِيلٌ',
        english:
          'Treating one category as another — addressing a non-rational being as if it were rational, or vice versa.',
        examples: [
          {
            arabic: '﴿فَقَالَ أَلَا تَأْكُلُونَ﴾',
            translation: 'Ibrahim said (to the idols): Do you not eat?',
            source: 'Quran 37:91',
            analysis: 'Idols are addressed using the rational-being verb form تَأْكُلُونَ.',
          },
        ],
      },
    ],
    examples: [
      {
        arabic: '﴿وَإِنَّا أَوْ إِيَّاكُمْ لَعَلَى هُدًى أَوْ فِي ضَلَالٍ مُبِينٍ﴾',
        translation: 'And We or you are either on the right path or in open error.',
        source: 'Quran 34:24',
        analysis: 'تَجَاهُلُ الْعَارِفِ — feigning ignorance for diplomatic persuasion.',
      },
      {
        arabic: '﴿الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ﴾',
        translation: 'Praise belongs to Allah, Lord of the worlds.',
        source: 'Quran 1:2',
        analysis: 'التَّغْلِيبُ — one plural encompasses both rational and non-rational beings.',
      },
      {
        arabic: '﴿يَسْأَلُونَكَ عَنِ الْأَهِلَّةِ قُلْ هِيَ مَوَاقِيتُ لِلنَّاسِ وَالْحَجِّ﴾',
        translation: 'They ask you about the crescents. Say: They are signs to mark fixed periods of time.',
        source: 'Quran 2:189',
        analysis: 'أُسْلُوبُ الْحَكِيمِ — answering a more suitable question.',
      },
      {
        arabic: '﴿فَقَالَ أَلَا تَأْكُلُونَ﴾',
        translation: 'Ibrahim said (to the idols): Do you not eat?',
        source: 'Quran 37:91',
        analysis: 'تَنْزِيلٌ — non-rational beings addressed as rational.',
      },
    ],
    tables: [
      {
        title: 'Miscellaneous Devices in Ma\'ani',
        titleAr: 'مُتَفَرِّقَاتُ عِلْمِ المَعَانِي',
        headers: ['Device', 'Arabic', 'Description'],
        rows: [
          ['Feigning ignorance', 'تَجَاهُلُ الْعَارِفِ', 'Speaker pretends not to know something for rhetorical effect'],
          ['Predominance', 'التَّغْلِيبُ', 'One word/form represents two meanings or categories'],
          ['The wise style', 'أُسْلُوبُ الْحَكِيمِ', 'Answering a more suitable question than the one asked'],
          ['Category transfer', 'تَنْزِيلٌ', 'Treating one category as another (e.g. non-rational as rational)'],
        ],
      },
      {
        title: 'Types of Taghlib',
        titleAr: 'أَنْوَاعُ التَّغْلِيبِ',
        headers: ['Type', 'Example', 'Explanation'],
        rows: [
          ['Dual for different singulars', 'الْقَمَرَانِ', 'Represents both القمر (moon) and الشمس (sun)'],
          ['One gender for both', 'وَالِدَانِ / أَبَوَانِ', 'Masculine dual for both father and mother'],
          ['One category for all', 'الْعَالَمِينَ', 'Rational-being plural encompasses all beings'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['khabar-insha-interchange', 'ijaz'],
  tags: ['maani', 'miscellaneous', 'tajahul', 'taghlib', 'uslub-hakim', 'tanzil'],
};
