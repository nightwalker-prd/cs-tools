import type { BalagahTopic } from '../types';

export const introduction: BalagahTopic = {
  id: 'introduction',
  titleAr: 'مُقَدِّمَةٌ فِي الْبَلَاغَةِ',
  titleEn: 'Introduction to Balagah',
  transliteration: 'Muqaddimah fi al-Balagah',
  unitId: 'maani',
  partId: 'maani-intro',
  content: {
    summary:
      'An overview of the three layers of Arabic language study (Grammar, Balagah, Ijaz) and the three sub-sciences of Balagah: Ilm al-Ma\'ani, Ilm al-Bayan, and Ilm al-Badi\'.',
    body: `## The Three Layers of Arabic Language Study

The study of the Arabic language can be divided into three layers:

### 1. Grammar (النَّحْوُ وَالصَّرْفُ)

Grammar encompasses Nahw (Syntax) and Sarf (Morphology). In Nahw, the initial discussion revolves around the إِعْرَابٌ of words and their position in a sentence. Sarf, on the other hand, focuses on the structure of words.

### 2. Balagah (اَلْبَلَاغَةُ)

<div dir="rtl" class="font-arabic">اَلْبَلَاغَةُ</div>

Balagah delves into the intricacies of word usage, sentence structure, emphasis placement, speech length and brevity, and other related topics. It explores, for instance, the appropriate word choice or sentence structure — e.g. the positioning of a مَفْعُوْلٌ بِهِ in relation to the verb.

### 3. Ijaz (اَلْإِعْجَازُ)

<div dir="rtl" class="font-arabic">اَلْإِعْجَازُ</div>

Ijaz is the remarkable utilization of Balagah within the Quran, resulting in a text that is truly miraculous and unparalleled in its form.

## The Three Sub-Sciences of Balagah

The field of Balagah comprises three distinct sub-sciences:

<div dir="rtl" class="font-arabic">
١) عِلْمُ الْمَعَانِي
٢) عِلْمُ الْبَيَانِ
٣) عِلْمُ الْبَدِيْعِ
</div>

The mastery of these three sub-sciences is crucial to comprehend the miraculous nature of the language used in the Quran.

**Ilm al-Ma'ani** (عِلْمُ الْمَعَانِي) deals with aspects of Arabic related to the meaning of words, sentences, and their structures. It covers eight topics: parts of a sentence, types of sentences, word order, nakirah and ma'rifah, restrictions, joining sentences, length of speech, and miscellaneous rules.

**Ilm al-Bayan** (عِلْمُ الْبَيَانِ) deals with the different ways of expressing a single meaning through simile (tashbih), metaphor (isti'arah, majaz), and metonymy (kinayah).

**Ilm al-Badi'** (عِلْمُ الْبَدِيْعِ) deals with the beautification of speech through semantic embellishments (muhassinat ma'nawiyyah) and verbal embellishments (muhassinat lafdhiyyah).`,
    rules: [
      {
        arabic: 'اَلْبَلَاغَةُ',
        english:
          'Balagah is the study of effective and eloquent expression in Arabic, encompassing word usage, sentence structure, emphasis, and speech length.',
      },
      {
        arabic: 'اَلْإِعْجَازُ',
        english:
          "Ijaz is the miraculous and inimitable utilization of Balagah within the Quran — the highest level of Arabic eloquence that no human can replicate.",
      },
    ],
    tables: [
      {
        title: 'The Three Sub-Sciences of Balagah',
        titleAr: 'عُلُومُ الْبَلَاغَةِ الثَّلَاثَةُ',
        headers: ['Sub-Science', 'Arabic', 'Focus'],
        rows: [
          ['Ilm al-Ma\'ani', 'عِلْمُ الْمَعَانِي', 'Meaning & sentence structure'],
          ['Ilm al-Bayan', 'عِلْمُ الْبَيَانِ', 'Simile, metaphor & metonymy'],
          ['Ilm al-Badi\'', 'عِلْمُ الْبَدِيْعِ', 'Beautification of speech'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['parts-of-sentence', 'tashbih', 'muhassinat-manawiyyah'],
  tags: ['introduction', 'balagah', 'maani', 'bayan', 'badi'],
};
