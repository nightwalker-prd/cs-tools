import type { BalagahUnit } from './types';

export const units: BalagahUnit[] = [
  {
    id: 'maani',
    titleAr: 'عِلْمُ الْمَعَانِي',
    titleEn: 'The Science of Meanings',
    icon: 'BookOpen',
    description: 'How sentence structure, word order, and emphasis convey precise meaning in Arabic.',
    parts: [
      {
        id: 'maani-intro',
        titleAr: 'مُقَدِّمَة',
        titleEn: 'Introduction',
        topicIds: ['introduction'],
      },
      {
        id: 'maani-parts',
        titleAr: 'أَرْكَانُ الجُمْلَةِ',
        titleEn: 'Parts of a Sentence',
        topicIds: ['parts-of-sentence'],
      },
      {
        id: 'maani-types-grammar',
        titleAr: 'أَنْوَاعُ الجُمَلِ نَحْوِيًّا',
        titleEn: 'Sentence Types (Grammar)',
        topicIds: ['sentence-types-grammar'],
      },
      {
        id: 'maani-types-meaning',
        titleAr: 'أَنْوَاعُ الجُمَلِ مَعْنَوِيًّا',
        titleEn: 'Sentence Types (Meaning)',
        topicIds: [
          'khabariyyah',
          'inshaiyyah-intro',
          'amr',
          'nahy',
          'istifham',
          'tamanni',
          'taraji',
          'nida-insha',
          'khabar-insha-interchange',
        ],
      },
      {
        id: 'maani-order',
        titleAr: 'تَرْتِيبُ الجُمْلَةِ',
        titleEn: 'Sentence Order',
        topicIds: ['sentence-order'],
      },
      {
        id: 'maani-nakirah-marifah',
        titleAr: 'النَّكِرَةُ وَالْمَعْرِفَةُ',
        titleEn: 'Indefinite & Definite',
        topicIds: [
          'damir',
          'al-ahdiyyah',
          'al-jinsiyyah',
          'al-istighraqiyyah',
          'alam',
          'isharah-mawsul-mudaf',
          'nakirah',
        ],
      },
      {
        id: 'maani-qasr',
        titleAr: 'القَصْرُ',
        titleEn: 'Restriction',
        topicIds: ['qasr'],
      },
      {
        id: 'maani-wasl-fasl',
        titleAr: 'الوَصْلُ وَالفَصْلُ',
        titleEn: 'Joining & Separating',
        topicIds: ['wasl-fasl'],
      },
      {
        id: 'maani-speech-length',
        titleAr: 'طُوْلُ الكَلَامِ',
        titleEn: 'Length of Speech',
        topicIds: ['musawah', 'ijaz', 'itnab'],
      },
      {
        id: 'maani-misc',
        titleAr: 'مُتَفَرِّقَات',
        titleEn: 'Miscellaneous',
        topicIds: ['miscellaneous'],
      },
    ],
  },
  {
    id: 'bayan',
    titleAr: 'عِلْمُ الْبَيَانِ',
    titleEn: 'The Science of Clarity',
    icon: 'Sparkles',
    description: 'Figurative language — similes, metaphors, and allegories that enrich Arabic expression.',
    parts: [
      {
        id: 'bayan-tashbih',
        titleAr: 'التَّشْبِيهُ',
        titleEn: 'Simile',
        topicIds: ['tashbih'],
      },
      {
        id: 'bayan-majaz',
        titleAr: 'الْمَجَازُ',
        titleEn: 'Metaphor',
        topicIds: ['majaz-intro', 'istiarah', 'majaz-mursal', 'majaz-aqli'],
      },
      {
        id: 'bayan-kinayah',
        titleAr: 'الكِنَايَةُ',
        titleEn: 'Allegory',
        topicIds: ['kinayah'],
      },
    ],
  },
  {
    id: 'badi',
    titleAr: 'عِلْمُ الْبَدِيْعِ',
    titleEn: 'The Science of Embellishment',
    icon: 'Gem',
    description: 'Rhetorical devices that beautify speech through meaning and sound.',
    parts: [
      {
        id: 'badi-manawi',
        titleAr: 'مُحَسَّنَاتٌ مَعْنَوِيَّةٌ',
        titleEn: 'Meaning Embellishments',
        topicIds: ['muhassinat-manawiyyah'],
      },
      {
        id: 'badi-lafdhi',
        titleAr: 'مُحَسَّنَاتٌ لَفْظِيَّةٌ',
        titleEn: 'Word Embellishments',
        topicIds: ['muhassinat-lafdhiyyah'],
      },
    ],
  },
];
