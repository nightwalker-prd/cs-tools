import type { BalagahTopic } from '../types';

export const kinayah: BalagahTopic = {
  id: 'kinayah',
  titleAr: 'الكِنَايَةُ',
  titleEn: 'Allegory',
  transliteration: 'Al-Kinayah',
  unitId: 'bayan',
  partId: 'bayan-kinayah',
  content: {
    summary:
      'Kinayah (allegory) is a figure of speech in which the literal meaning of a sentence is not intended, even though it could be interpreted literally. It conveys a deeper meaning through indirect expression.',
    body: `## Definition

<div dir="rtl" class="font-arabic">الكِنَايَةُ</div>

A كِنَايَةٌ (allegory) is a figure of speech in which the literal meaning of a sentence is **not intended**, even though it **could** be interpreted literally. The speaker uses an indirect expression to convey a deeper meaning.

For example, the English sentence "I don't have blood on my hands" is an allegory used to convey innocence — it is not intended to be taken literally, though the literal meaning is also possible.

## Quranic Example

<div dir="rtl" class="font-arabic">﴿قَالَتْ أَنَّى يَكُونُ لِي غُلَامٌ وَلَمْ يَمْسَسْنِي بَشَرٌ وَلَمْ أَكُ بَغِيًّا﴾</div>

*Maryam said, "How shall I have a son while no human has ever touched me?"* (Maryam 19:20)

In this verse, the word "touched" (يَمْسَسْنِي) is used as a كِنَايَةٌ to convey the meaning of cohabitation, rather than a literal touch. The literal meaning is possible but the intended meaning is figurative.

## Kinayah vs. Majaz

The key distinction between كِنَايَةٌ and مَجَازٌ:
- In **مَجَازٌ**, the literal meaning is **impossible** or clearly not intended.
- In **كِنَايَةٌ**, the literal meaning **could** be true, but the speaker intends a deeper meaning beyond it.

This makes كِنَايَةٌ a subtler form of figurative language — the literal reading is plausible, but the intended meaning goes beyond it.`,
    rules: [
      {
        arabic: 'الكِنَايَةُ',
        english:
          'A figure of speech in which the literal meaning is not intended, even though it could be interpreted literally. The speaker conveys a deeper meaning through indirect expression.',
        examples: [
          {
            arabic: '﴿وَلَمْ يَمْسَسْنِي بَشَرٌ﴾',
            translation: 'No human has ever touched me.',
            source: 'Maryam 19:20',
            analysis:
              'The word "touched" is kinayah for cohabitation. The literal meaning (physical touch) is possible, but the intended meaning is figurative.',
          },
        ],
      },
    ],
    examples: [
      {
        arabic: '﴿قَالَتْ أَنَّى يَكُونُ لِي غُلَامٌ وَلَمْ يَمْسَسْنِي بَشَرٌ وَلَمْ أَكُ بَغِيًّا﴾',
        translation:
          'Maryam said, "How shall I have a son while no human has ever touched me?"',
        source: 'Maryam 19:20',
        analysis:
          'Kinayah: "touched" (يَمْسَسْنِي) allegorically refers to cohabitation. The literal reading is plausible but not the intended meaning.',
      },
    ],
    tables: [
      {
        title: 'Kinayah vs. Majaz',
        titleAr: 'الفَرْقُ بَيْنَ الكِنَايَةِ وَالمَجَازِ',
        headers: ['Feature', 'Kinayah', 'Majaz'],
        rows: [
          ['Literal meaning possible?', 'Yes', 'No / Clearly not intended'],
          ['Intended meaning', 'Deeper/indirect', 'Figurative'],
          ['Subtlety', 'More subtle', 'More direct metaphor'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['tashbih', 'istiarah', 'majaz-mursal'],
  tags: ['bayan', 'kinayah', 'allegory', 'figurative-language'],
};
