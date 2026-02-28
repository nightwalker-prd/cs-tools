import type { BalagahTopic } from '../types';

export const partsOfSentence: BalagahTopic = {
  id: 'parts-of-sentence',
  titleAr: 'أَجْزَاءُ الْجُمْلَةِ',
  titleEn: 'Parts of a Sentence',
  transliteration: 'Ajza\' al-Jumlah',
  unitId: 'maani',
  partId: 'maani-parts',
  content: {
    summary:
      'An Arabic sentence is composed of two categories of words: Umdah (essential parts — musnad ilayhi and musnad) and Fadlah (qualifiers/quyud). Though qualifiers are grammatically optional, they are usually the focal point of meaning.',
    body: `## The Two Categories

An Arabic sentence is made up of two types of words:

<div dir="rtl" class="font-arabic">
١) عُمْدَةٌ
٢) فَضْلَةٌ
</div>

## عُمْدَةٌ — Essential Parts

The عُمْدَةٌ are the essential parts of a sentence. Without these, a sentence would not be complete. These are:

- **مُسْنَدٌ إِلَيْهِ** (Musnad Ilayhi) — the subject of the sentence, including both the فَاعِلٌ and مُبْتَدَأٌ.
- **مُسْنَدٌ** (Musnad) — the information regarding the subject, including the فِعْلٌ or خَبَرٌ.

## فَضْلَةٌ — Qualifiers

The remaining parts of a sentence are called فَضْلَةٌ or قَيْدٌ (plural: قُيُوْدٌ). All types of مَفْعُوْلٌ and words of نَفْيٌ are considered فَضْلَةٌ, including:

<div dir="rtl" class="font-arabic">شَرْطٌ، تَوَاسِخُ، مُسْتَثْنَى، تَمْيِيْزٌ، حَالٌ، مَفْعُوْلٌ</div>

Even though the grammar of a sentence is complete without the فَضْلَةٌ, the meaning would not be complete. In fact, the فَضْلَةٌ are usually the focal point of the sentences.

### Quranic Example

<div dir="rtl" class="font-arabic">﴿وَلَا تَقْرَبُوا الزِّنَىٰ﴾</div>

*Do not go near **fornication**.*

In this verse, the word الزِّنَا is the مَفْعُوْلٌ بِهِ, a قَيْدٌ. Without this, the sentence لَا تَقْرَبُوا would be grammatically complete. However, the intended meaning would not be conveyed.`,
    rules: [
      {
        arabic: 'عُمْدَةٌ',
        english:
          'The essential parts of a sentence (musnad ilayhi + musnad) without which the sentence is incomplete.',
        examples: [
          {
            arabic: 'زَيْدٌ قَائِمٌ',
            translation: 'Zayd is standing.',
            analysis: 'زَيْدٌ is the musnad ilayhi (mubtada\') and قَائِمٌ is the musnad (khabar).',
          },
        ],
      },
      {
        arabic: 'فَضْلَةٌ',
        english:
          'The qualifiers (quyud) — grammatically optional parts that carry the focal meaning of the sentence.',
        examples: [
          {
            arabic: '﴿وَلَا تَقْرَبُوا الزِّنَىٰ﴾',
            translation: 'Do not go near fornication.',
            source: 'Quran 17:32',
            analysis: 'الزِّنَا is the maf\'ul bihi (qayd). Without it, the sentence is grammatically complete but the meaning is lost.',
          },
        ],
      },
    ],
    examples: [
      {
        arabic: '﴿وَلَا تَقْرَبُوا الْفَوَاحِشَ﴾',
        translation: 'Do not come close to immoral acts.',
        source: 'Quran 6:151',
        analysis: 'اَلْمَفْعُوْلُ بِهِ — the direct object specifies what is prohibited.',
      },
      {
        arabic: '﴿اذْكُرُوا اللهَ ذِكْرًا كَثِيْرًا﴾',
        translation: 'Remember Allah abundantly.',
        source: 'Quran 33:41',
        analysis: 'اَلْمَفْعُوْلُ الْمُطْلَقُ — the cognate accusative intensifies the action.',
      },
      {
        arabic: '﴿وَلَا تَقْتُلُوْٓا أَوْلَادَكُمْ خَشْيَةَ إِمْلَاقٍ﴾',
        translation: 'Do not kill your children for fear of poverty.',
        source: 'Quran 17:31',
        analysis: 'اَلْمَفْعُوْلُ لَهُ — the adverbial of cause gives the reason.',
      },
      {
        arabic: '﴿قَالُوا لَبِثْنَا يَوْمًا أَوْ بَعْضَ يَوْمٍ﴾',
        translation: 'They said, "We have stayed a day, or part of a day."',
        source: 'Quran 23:113',
        analysis: 'اَلْمَفْعُوْلُ فِيْهِ — the adverbial of time specifies duration.',
      },
      {
        arabic: '﴿لَا تَقْرَبُوا الصَّلوٰةَ وَأَنْتُمْ سُكْرَىٰ﴾',
        translation: 'Do not go near Salah when you are intoxicated.',
        source: 'Quran 4:43',
        analysis: 'حَالٌ — the hal describes the state of the subject.',
      },
      {
        arabic: '﴿فَلَنْ يُقْبَلَ مِنْ أَحَدِهِمْ مِلْءُ الْأَرْضِ ذَهَبًا﴾',
        translation: 'Even an Earth-full of gold shall never be accepted from any of them.',
        source: 'Quran 3:91',
        analysis: 'التَّمْيِيْزُ — the tamyiz specifies what fills the earth.',
      },
    ],
    tables: [
      {
        title: 'Examples of Various Quyud (Qualifiers)',
        titleAr: 'أَمْثِلَةُ الْقُيُوْدِ الْمُخْتَلِفَةِ',
        headers: ['Type (قَيْدٌ)', 'Example', 'Translation'],
        rows: [
          ['اَلْمَفْعُوْلُ بِهِ', '﴿وَلَا تَقْرَبُوا الْفَوَاحِشَ﴾', 'Do not come close to immoral acts.'],
          ['اَلْمَفْعُوْلُ الْمُطْلَقُ', '﴿اذْكُرُوا اللهَ ذِكْرًا كَثِيْرًا﴾', 'Remember Allah abundantly.'],
          ['اَلْمَفْعُوْلُ لَهُ', '﴿وَلَا تَقْتُلُوْٓا أَوْلَادَكُمْ خَشْيَةَ إِمْلَاقٍ﴾', 'Do not kill your children for fear of poverty.'],
          ['اَلْمَفْعُوْلُ فِيْهِ', '﴿قَالُوا لَبِثْنَا يَوْمًا أَوْ بَعْضَ يَوْمٍ﴾', 'We have stayed a day, or part of a day.'],
          ['اَلْمَفْعُوْلُ مَعَهُ', '﴿فَوَرَبِّكَ لَنَحْشُرَنَّهُمْ وَالشَّيَاطِيْنَ﴾', 'We will surely gather them along with the devils.'],
          ['حَالٌ', '﴿لَا تَقْرَبُوا الصَّلوٰةَ وَأَنْتُمْ سُكْرَىٰ﴾', 'Do not go near Salah when you are intoxicated.'],
          ['التَّمْيِيْزُ', '﴿فَلَنْ يُقْبَلَ مِنْ أَحَدِهِمْ مِلْءُ الْأَرْضِ ذَهَبًا﴾', 'Even an Earth-full of gold shall never be accepted.'],
          ['الْمُسْتَثْنَى', '﴿الْأَخِلَّاءُ يَوْمَئِذٍ بَعْضُهُمْ لِبَعْضٍ عَدُوٌّ إِلَّا الْمُتَّقِيْنَ﴾', 'Friends will become enemies, except the God-fearing.'],
          ['التَّوَاسِخُ', '﴿وَأَصْبَحَ فُؤَادُ أُمِّ مُوسَىٰ فُرْغًا﴾', 'The heart of the mother of Musa became restless.'],
          ['الشَّرْطُ', '﴿وَإِنْ كُنْتُمْ فِيْ رَيْبٍ مِمَّا نَزَّلْنَا عَلَىٰ عَبْدِنَا فَأْتُوا بِسُوْرَةٍ مِنْ مِثْلِهِ﴾', 'If you are in doubt about what We have revealed, bring a Surah like this.'],
          ['النَّفْيُ', '﴿أَلَيْسَ اللهُ بِأَحْكَمِ الْحَاكِمِيْنَ﴾', 'Is Allah not the Greatest Ruler of all rulers?'],
        ],
      },
      {
        title: 'Essential vs Qualifier Parts',
        titleAr: 'عُمْدَةٌ وَفَضْلَةٌ',
        headers: ['Category', 'Arabic', 'Components', 'Role'],
        rows: [
          ['Essential (عُمْدَةٌ)', 'مُسْنَدٌ إِلَيْهِ', 'فَاعِلٌ / مُبْتَدَأٌ', 'Subject of the sentence'],
          ['Essential (عُمْدَةٌ)', 'مُسْنَدٌ', 'فِعْلٌ / خَبَرٌ', 'Information about the subject'],
          ['Qualifier (فَضْلَةٌ)', 'قَيْدٌ / قُيُوْدٌ', 'مَفْعُوْلٌ، حَالٌ، تَمْيِيْزٌ، etc.', 'Focal meaning of the sentence'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['sentence-types-grammar', 'khabariyyah'],
  tags: ['maani', 'umdah', 'fadlah', 'musnad', 'musnad-ilayhi', 'quyud'],
};
