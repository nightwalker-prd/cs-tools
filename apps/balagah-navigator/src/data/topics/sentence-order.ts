import type { BalagahTopic } from '../types';

export const sentenceOrder: BalagahTopic = {
  id: 'sentence-order',
  titleAr: 'تَرْتِيبُ الْجُمْلَةِ',
  titleEn: 'Sentence Order',
  transliteration: 'Tartib al-Jumlah',
  unitId: 'maani',
  partId: 'maani-order',
  content: {
    summary:
      'Both nominal and verbal sentences have a regular grammatical word order that can be altered for emphasis (ta\'kid), rhyming prose (saj\'), natural order, hierarchy, or to bring good news first. Word order alteration applies within a sentence, within parts of a sentence, and between sentences.',
    body: `## Overview

A جُمْلَةٌ فِعْلِيَّةٌ and جُمْلَةٌ اسْمِيَّةٌ both have regular grammatical structures which can be adjusted to create emphasis or focus.

## Alteration of Word Order in a جُمْلَةٌ اسْمِيَّةٌ

The regular word order is:

<div dir="rtl" class="font-arabic">مُبْتَدَأٌ — خَبَرٌ</div>

Sometimes this order changes due to grammatical necessity (e.g. when a نَكِرَةٌ is مُبْتَدَأٌ and a شِبْهُ الْجُمْلَةِ is خَبَرٌ). When there is no grammatical obligation, either can be fronted, but the point being emphasized comes first.

### Example: Topic of discussion as مُبْتَدَأٌ

<div dir="rtl" class="font-arabic">﴿اللّٰهُ رَبُّنَا وَرَبُّكُمْ﴾</div>

*Allah is our Lord and your Lord.* — Both words are مَعْرِفَة, so either could come first. The topic of discussion is chosen as the مُبْتَدَأٌ.

### Example: خَبَرٌ fronted for emphasis

<div dir="rtl" class="font-arabic">﴿لَكُمْ دِيْنُكُمْ وَلِيَ دِيْنِ﴾</div>

*For you is your faith, and for me, my faith.* — The خَبَرٌ is brought before the مُبْتَدَأٌ to emphasize the separation and distinction.

## Alteration of Word Order in a جُمْلَةٌ فِعْلِيَّةٌ

The regular word order is:

<div dir="rtl" class="font-arabic">فِعْلٌ — فَاعِلٌ — مَفْعُوْلٌ بِهِ</div>

### تَأْكِيدٌ — Emphasis

A word can be fronted for emphasis.

<div dir="rtl" class="font-arabic">﴿إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ﴾</div>

*You alone do we worship.* — The مَفْعُوْلٌ بِهِ is fronted to create emphasis, reflected in the word "alone".

<div dir="rtl" class="font-arabic">﴿وَهُمْ يَعْلَمُوْنَ﴾</div>

*Whilst they know.* — The فَاعِلٌ (now مُبْتَدَأٌ) is fronted to create emphasis.

### سَجَعٌ — Rhyming Prose

A word can be fronted to maintain the rhythm of a sentence.

<div dir="rtl" class="font-arabic">﴿خُذُوْهُ فَغُلُّوْهُ ۞ ثُمَّ الْجَحِيمَ صَلُّوْهُ ۞ ثُمَّ فِيْ سِلْسِلَةٍ ذَرْعُهَا سَبْعُونَ ذِرَاعًا فَاسْلُكُوْهُ﴾</div>

*Seize him, then put a collar around his neck, and then, let him burn in the blazing fire. Thereafter, fasten him with a chain the measure of which is seventy hands.*

The مَفْعُوْلٌ has been fronted in the last two verses to keep the pattern of verses ending in ه.

## Alteration Within Parts of a Sentence

When two or more words are joined via a حَرْفُ عَطْفٍ, one must come before the other. Reasons include:

### تَرْتِيبٌ حَقِيقِيٌّ — Natural Order

<div dir="rtl" class="font-arabic">﴿لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ﴾</div>

*Neither dozing overtakes Him nor sleep.* — Dozing (سِنَةٌ) naturally precedes sleep (نَوْمٌ).

### تَرْتِيبٌ رُتَبِيٌّ — Hierarchy

<div dir="rtl" class="font-arabic">﴿وَاِذْ يَرْفَعُ اِبْرٰهِمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَاِسْمٰعِيلُ﴾</div>

*When Ibrahim was raising up the foundations of the House, along with Isma'il.* — Ibrahim is mentioned first (and Isma'il delayed even after the مَفْعُوْلٌ بِهِ) to show the hierarchy between father and son.

### تَعْجِيلُ الْمَسَرَّةِ — Bringing Good News First

<div dir="rtl" class="font-arabic">﴿إِذْ قَالَ اللّٰهُ يٰعِيسٰٓى إِنِّيْ مُتَوَفِّيكَ وَرَافِعُكَ إِلَيَّ وَمُطَهِّرُكَ مِنَ الَّذِينَ كَفَرُوا﴾</div>

*O 'Isa! I am to take you in full and to raise you towards Myself.* — The good news of being saved is mentioned first, as it was the most pressing concern for 'Isa when he was surrounded by those who wanted to kill him.

## Order Within Sentences

In a paragraph of multiple sentences, one sentence may be fronted over another.

### تَعْجِيلُ الْمَسَرَّةِ — Bringing Good News First

<div dir="rtl" class="font-arabic">﴿عَفَا اللّٰهُ عَنْكَ لِمَ أَذِنْتَ لَهُمْ﴾</div>

*(O Prophet,) Allah has forgiven you; why did you permit them?* — The sentence mentioning the Prophet's pardon is mentioned even before the error, to avoid him worrying about Allah's displeasure.`,
    rules: [
      {
        arabic: 'تَأْكِيدٌ',
        english:
          'A word can be fronted from its regular position for emphasis (ta\'kid). This applies to both nominal and verbal sentences.',
        examples: [
          {
            arabic: '﴿إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ﴾',
            translation: 'You alone do we worship.',
            source: 'Quran 1:5',
            analysis: 'The maf\'ul bihi is fronted for emphasis — reflected in the word "alone".',
          },
        ],
      },
      {
        arabic: 'سَجَعٌ',
        english:
          'A word can be fronted to keep the rhythm or rhyming prose (saj\') of a sentence.',
        examples: [
          {
            arabic: '﴿خُذُوْهُ فَغُلُّوْهُ ۞ ثُمَّ الْجَحِيمَ صَلُّوْهُ﴾',
            translation: 'Seize him, then let him burn in the blazing fire.',
            source: 'Quran 69:30-31',
            analysis: 'The maf\'ul is fronted to keep the pattern of verses ending in ه.',
          },
        ],
      },
      {
        arabic: 'تَعْجِيلُ الْمَسَرَّةِ',
        english:
          'Good news is mentioned first to reassure the listener before mentioning the concern.',
        examples: [
          {
            arabic: '﴿عَفَا اللّٰهُ عَنْكَ لِمَ أَذِنْتَ لَهُمْ﴾',
            translation: 'Allah has forgiven you; why did you permit them?',
            source: 'Quran 9:43',
            analysis: 'Pardon is mentioned before the error to avoid worry.',
          },
        ],
      },
    ],
    examples: [
      {
        arabic: '﴿إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ﴾',
        translation: 'You alone do we worship and You alone do we ask for help.',
        source: 'Quran 1:5',
        analysis: 'تَأْكِيدٌ — maf\'ul bihi fronted for emphasis.',
      },
      {
        arabic: '﴿لَكُمْ دِيْنُكُمْ وَلِيَ دِيْنِ﴾',
        translation: 'For you is your faith, and for me, my faith.',
        source: 'Quran 109:6',
        analysis: 'Khabar fronted before mubtada\' for emphasis on the distinction.',
      },
      {
        arabic: '﴿لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ﴾',
        translation: 'Neither dozing overtakes Him nor sleep.',
        source: 'Quran 2:255',
        analysis: 'تَرْتِيبٌ حَقِيقِيٌّ — dozing naturally precedes sleep.',
      },
      {
        arabic: '﴿وَاِذْ يَرْفَعُ اِبْرٰهِمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَاِسْمٰعِيلُ﴾',
        translation: 'When Ibrahim was raising up the foundations of the House, along with Isma\'il.',
        source: 'Quran 2:127',
        analysis: 'تَرْتِيبٌ رُتَبِيٌّ — Ibrahim mentioned first to show the hierarchy between father and son.',
      },
      {
        arabic: '﴿عَفَا اللّٰهُ عَنْكَ لِمَ أَذِنْتَ لَهُمْ﴾',
        translation: 'Allah has forgiven you; why did you permit them?',
        source: 'Quran 9:43',
        analysis: 'تَعْجِيلُ الْمَسَرَّةِ — pardon mentioned before the error.',
      },
    ],
    tables: [
      {
        title: 'Regular Word Order',
        titleAr: 'التَّرْتِيبُ الأَصْلِيُّ',
        headers: ['Sentence Type', 'Regular Order'],
        rows: [
          ['جُمْلَةٌ اسْمِيَّةٌ', 'مُبْتَدَأٌ → خَبَرٌ'],
          ['جُمْلَةٌ فِعْلِيَّةٌ', 'فِعْلٌ → فَاعِلٌ → مَفْعُوْلٌ بِهِ'],
        ],
      },
      {
        title: 'Reasons for Altering Word Order',
        titleAr: 'أَسْبَابُ تَغْيِيرِ التَّرْتِيبِ',
        headers: ['Reason', 'Arabic', 'Description'],
        rows: [
          ['Emphasis', 'تَأْكِيدٌ', 'Fronting a word to emphasize it'],
          ['Rhyming prose', 'سَجَعٌ', 'Fronting a word to maintain sentence rhythm'],
          ['Natural order', 'تَرْتِيبٌ حَقِيقِيٌّ', 'Following the natural sequence of events'],
          ['Hierarchy', 'تَرْتِيبٌ رُتَبِيٌّ', 'Listing by rank or importance'],
          ['Good news first', 'تَعْجِيلُ الْمَسَرَّةِ', 'Mentioning positive information before negative'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['sentence-types-grammar', 'parts-of-sentence'],
  tags: ['maani', 'word-order', 'takid', 'saj', 'tartib', 'tajil-masarrah'],
};
