/**
 * Advanced Tarkeeb Exercises - Part 4 (Thematic Content)
 * Quranic verses, Hadith, and Classical Poetry
 *
 * Grammar concepts covered:
 * - Conditional sentences (الشرط)
 * - Circumstantial expressions (الحال)
 * - Specification (التمييز)
 * - Exception (الاستثناء)
 * - Emphasis (التوكيد)
 * - Relative clauses (الموصول)
 */

import { TarkeebExercise } from './types';

export const exercises: TarkeebExercise[] = [
  // ============================================
  // SECTION 1: CONDITIONAL SENTENCES (الشرط)
  // Units 8-11 equivalents
  // ============================================

  // --- Quranic Conditionals ---
  {
    id: 1749,
    unit: "8",
    section: "1",
    arabic: "إِنْ تَنْصُرُوا اللَّهَ يَنْصُرْكُمْ وَيُثَبِّتْ أَقْدَامَكُمْ",
    translation: "If you support Allah, He will support you and make your feet firm",
    vocabulary: "Quran 47:7",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "in", prominence: "primary" },
      { conceptId: "fil-shart", prominence: "primary" },
      { conceptId: "jawab-shart", prominence: "primary" },
      { conceptId: "jazm", prominence: "secondary" }
    ]
  },
  {
    id: 1750,
    unit: "8",
    section: "1",
    arabic: "وَإِنْ تَعُدُّوا نِعْمَةَ اللَّهِ لَا تُحْصُوهَا",
    translation: "And if you count the blessings of Allah, you could not enumerate them",
    vocabulary: "Quran 16:18",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "in", prominence: "primary" },
      { conceptId: "fil-shart", prominence: "primary" },
      { conceptId: "jawab-shart", prominence: "primary" },
      { conceptId: "mafool-bih", prominence: "secondary" }
    ]
  },
  {
    id: 1751,
    unit: "8",
    section: "2",
    arabic: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا",
    translation: "When the victory of Allah comes and the conquest, and you see the people entering the religion of Allah in multitudes",
    vocabulary: "Quran 110:1-2",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "idha", prominence: "primary" },
      { conceptId: "fil-shart", prominence: "primary" },
      { conceptId: "hal", prominence: "secondary" },
      { conceptId: "tamyiz", prominence: "secondary" }
    ]
  },
  {
    id: 1752,
    unit: "8",
    section: "2",
    arabic: "إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا",
    translation: "When the earth is shaken with its final earthquake and the earth discharges its burdens",
    vocabulary: "Quran 99:1-2",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "idha", prominence: "primary" },
      { conceptId: "fil-majhul", prominence: "secondary" },
      { conceptId: "mafool-mutlaq", prominence: "secondary" }
    ]
  },
  {
    id: 1753,
    unit: "9",
    section: "1",
    arabic: "لَوْ أَنْزَلْنَا هَذَا الْقُرْآنَ عَلَى جَبَلٍ لَرَأَيْتَهُ خَاشِعًا مُتَصَدِّعًا مِنْ خَشْيَةِ اللَّهِ",
    translation: "If We had sent down this Quran upon a mountain, you would have seen it humbled and breaking apart from fear of Allah",
    vocabulary: "Quran 59:21",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "law", prominence: "primary" },
      { conceptId: "hal", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1754,
    unit: "9",
    section: "1",
    arabic: "وَلَوْ شَاءَ رَبُّكَ لَآمَنَ مَنْ فِي الْأَرْضِ كُلُّهُمْ جَمِيعًا",
    translation: "And if your Lord had willed, those on earth would have believed - all of them entirely",
    vocabulary: "Quran 10:99",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "law", prominence: "primary" },
      { conceptId: "tawkid", prominence: "secondary" },
      { conceptId: "ism-mawsul", prominence: "secondary" }
    ]
  },
  {
    id: 1755,
    unit: "9",
    section: "2",
    arabic: "مَنْ يَعْمَلْ سُوءًا يُجْزَ بِهِ",
    translation: "Whoever does a wrong will be recompensed for it",
    vocabulary: "Quran 4:123",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "man", prominence: "primary" },
      { conceptId: "fil-shart", prominence: "primary" },
      { conceptId: "fil-majhul", prominence: "secondary" },
      { conceptId: "jazm", prominence: "secondary" }
    ]
  },
  {
    id: 1756,
    unit: "9",
    section: "2",
    arabic: "وَمَنْ يَتَّقِ اللَّهَ يَجْعَلْ لَهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
    translation: "And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect",
    vocabulary: "Quran 65:2-3",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "man", prominence: "primary" },
      { conceptId: "fil-shart", prominence: "primary" },
      { conceptId: "jawab-shart", prominence: "primary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },

  // --- Hadith Conditionals ---
  {
    id: 1757,
    unit: "8",
    section: "3",
    arabic: "إِذَا سَأَلْتَ فَاسْأَلِ اللَّهَ وَإِذَا اسْتَعَنْتَ فَاسْتَعِنْ بِاللَّهِ",
    translation: "If you ask, then ask Allah, and if you seek help, then seek help from Allah",
    vocabulary: "Tirmidhi",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "idha", prominence: "primary" },
      { conceptId: "fil-amr", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1758,
    unit: "8",
    section: "3",
    arabic: "مَنْ صَلَّى عَلَيَّ صَلَاةً صَلَّى اللَّهُ عَلَيْهِ بِهَا عَشْرًا",
    translation: "Whoever sends salutations upon me once, Allah will send salutations upon him ten times",
    vocabulary: "Muslim",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "man", prominence: "primary" },
      { conceptId: "mafool-mutlaq", prominence: "secondary" },
      { conceptId: "adad", prominence: "secondary" }
    ]
  },
  {
    id: 1759,
    unit: "9",
    section: "3",
    arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    translation: "Whoever believes in Allah and the Last Day, let him speak good or remain silent",
    vocabulary: "Bukhari & Muslim",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "man", prominence: "primary" },
      { conceptId: "kana", prominence: "secondary" },
      { conceptId: "fil-amr", prominence: "secondary" }
    ]
  },
  {
    id: 1760,
    unit: "9",
    section: "3",
    arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",
    translation: "Whoever travels a path seeking knowledge, Allah makes easy for him a path to Paradise",
    vocabulary: "Muslim",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "man", prominence: "primary" },
      { conceptId: "hal", prominence: "secondary" },
      { conceptId: "mafool-bih", prominence: "secondary" }
    ]
  },
  {
    id: 1761,
    unit: "10",
    section: "1",
    arabic: "لَوْ كُنْتُمْ تُوكَلُونَ عَلَى اللَّهِ حَقَّ تَوَكُّلِهِ لَرَزَقَكُمْ كَمَا يَرْزُقُ الطَّيْرَ",
    translation: "If you were to rely upon Allah with true reliance, He would provide for you as He provides for the birds",
    vocabulary: "Tirmidhi",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "law", prominence: "primary" },
      { conceptId: "kana", prominence: "secondary" },
      { conceptId: "mafool-mutlaq", prominence: "secondary" }
    ]
  },
  {
    id: 1762,
    unit: "10",
    section: "1",
    arabic: "إِنْ لَمْ تَسْتَحِ فَاصْنَعْ مَا شِئْتَ",
    translation: "If you have no shame, then do as you wish",
    vocabulary: "Bukhari",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "in", prominence: "primary" },
      { conceptId: "lam", prominence: "secondary" },
      { conceptId: "fil-amr", prominence: "secondary" }
    ]
  },

  // --- Poetry Conditionals ---
  {
    id: 1763,
    unit: "10",
    section: "2",
    arabic: "إِذَا أَنْتَ أَكْرَمْتَ الْكَرِيمَ مَلَكْتَهُ وَإِنْ أَنْتَ أَكْرَمْتَ اللَّئِيمَ تَمَرَّدَا",
    translation: "If you honor the noble, you possess him; but if you honor the base, he becomes defiant",
    vocabulary: "Al-Mutanabbi",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "idha", prominence: "primary" },
      { conceptId: "in", prominence: "primary" },
      { conceptId: "mafool-bih", prominence: "secondary" }
    ]
  },
  {
    id: 1764,
    unit: "10",
    section: "2",
    arabic: "إِذَا غَامَرْتَ فِي شَرَفٍ مَرُومٍ فَلَا تَقْنَعْ بِمَا دُونَ النُّجُومِ",
    translation: "If you venture for lofty honor, do not be content with less than the stars",
    vocabulary: "Al-Mutanabbi",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "idha", prominence: "primary" },
      { conceptId: "fil-nahy", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1765,
    unit: "11",
    section: "1",
    arabic: "وَمَنْ يَكُنْ ذَا فَضْلٍ فَيَبْخَلْ بِفَضْلِهِ عَلَى قَوْمِهِ يُسْتَغْنَ عَنْهُ وَيُذْمَمِ",
    translation: "And whoever has merit but withholds it from his people will be dispensed with and blamed",
    vocabulary: "Zuhayr ibn Abi Sulma",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "man", prominence: "primary" },
      { conceptId: "fil-majhul", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1766,
    unit: "11",
    section: "1",
    arabic: "لَوْ كَانَ فِي الْقَلْبِ حُبٌّ لِسِوَاكُمُ لَمَا جَالَ فِي قَلْبِي سِوَى ذِكْرِكُمْ",
    translation: "If there were love in my heart for others, nothing but your memory would have circulated in my heart",
    vocabulary: "Classical Poetry",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "law", prominence: "primary" },
      { conceptId: "kana", prominence: "secondary" },
      { conceptId: "mustathna", prominence: "secondary" }
    ]
  },

  // ============================================
  // SECTION 2: CIRCUMSTANTIAL (الحال)
  // Units 12-15 equivalents
  // ============================================

  // --- Quranic Hal ---
  {
    id: 1767,
    unit: "12",
    section: "1",
    arabic: "وَمَا خَلَقْنَا السَّمَاءَ وَالْأَرْضَ وَمَا بَيْنَهُمَا لَاعِبِينَ",
    translation: "And We did not create the heaven and earth and that between them playing",
    vocabulary: "Quran 21:16",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "hal", prominence: "primary" },
      { conceptId: "mafool-bih", prominence: "secondary" },
      { conceptId: "atf", prominence: "secondary" }
    ]
  },
  {
    id: 1768,
    unit: "12",
    section: "1",
    arabic: "وَجَاءُوا أَبَاهُمْ عِشَاءً يَبْكُونَ",
    translation: "And they came to their father at night, weeping",
    vocabulary: "Quran 12:16",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "hal", prominence: "primary" },
      { conceptId: "jumlah-fi-mahall-nasb", prominence: "secondary" },
      { conceptId: "mafool-fih", prominence: "secondary" }
    ]
  },
  {
    id: 1769,
    unit: "12",
    section: "2",
    arabic: "وَلَا تَمْشِ فِي الْأَرْضِ مَرَحًا إِنَّكَ لَنْ تَخْرِقَ الْأَرْضَ وَلَنْ تَبْلُغَ الْجِبَالَ طُولًا",
    translation: "And do not walk upon the earth exultantly. Indeed, you will never tear the earth apart, and you will never reach the mountains in height",
    vocabulary: "Quran 17:37",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "hal", prominence: "primary" },
      { conceptId: "tamyiz", prominence: "primary" },
      { conceptId: "fil-nahy", prominence: "secondary" },
      { conceptId: "lan", prominence: "secondary" }
    ]
  },
  {
    id: 1770,
    unit: "12",
    section: "2",
    arabic: "فَخَرَجَ عَلَى قَوْمِهِ فِي زِينَتِهِ",
    translation: "So he came out before his people in his adornment",
    vocabulary: "Quran 28:79",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "hal", prominence: "primary" },
      { conceptId: "shibh-jumlah", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1771,
    unit: "13",
    section: "1",
    arabic: "فَرَجَعَ مُوسَى إِلَى قَوْمِهِ غَضْبَانَ أَسِفًا",
    translation: "So Moses returned to his people angry and grieved",
    vocabulary: "Quran 20:86",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "hal", prominence: "primary" },
      { conceptId: "hal", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1772,
    unit: "13",
    section: "1",
    arabic: "وَتَرَى الشَّمْسَ إِذَا طَلَعَتْ تَزَاوَرُ عَنْ كَهْفِهِمْ ذَاتَ الْيَمِينِ",
    translation: "And you would see the sun when it rose, inclining away from their cave on the right",
    vocabulary: "Quran 18:17",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "hal", prominence: "primary" },
      { conceptId: "jumlah-fi-mahall-nasb", prominence: "secondary" },
      { conceptId: "idha", prominence: "secondary" }
    ]
  },
  {
    id: 1773,
    unit: "13",
    section: "2",
    arabic: "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِلْعَالَمِينَ",
    translation: "And We have not sent you except as a mercy to the worlds",
    vocabulary: "Quran 21:107",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "hal", prominence: "primary" },
      { conceptId: "mustathna", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },

  // --- Hadith Hal ---
  {
    id: 1774,
    unit: "12",
    section: "3",
    arabic: "صَلُّوا كَمَا رَأَيْتُمُونِي أُصَلِّي",
    translation: "Pray as you have seen me praying",
    vocabulary: "Bukhari",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "hal", prominence: "primary" },
      { conceptId: "fil-amr", prominence: "secondary" },
      { conceptId: "ism-mawsul", prominence: "secondary" }
    ]
  },
  {
    id: 1775,
    unit: "12",
    section: "3",
    arabic: "لَا يَزَالُ لِسَانُكَ رَطْبًا مِنْ ذِكْرِ اللَّهِ",
    translation: "Let your tongue remain moist with the remembrance of Allah",
    vocabulary: "Tirmidhi",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "hal", prominence: "primary" },
      { conceptId: "ma-zala", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1776,
    unit: "13",
    section: "3",
    arabic: "كَانَ النَّبِيُّ ﷺ يَخْطُبُ قَائِمًا ثُمَّ يَجْلِسُ ثُمَّ يَقُومُ",
    translation: "The Prophet (peace be upon him) would give the sermon standing, then sit, then stand again",
    vocabulary: "Bukhari & Muslim",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "hal", prominence: "primary" },
      { conceptId: "kana", prominence: "secondary" },
      { conceptId: "atf", prominence: "secondary" }
    ]
  },
  {
    id: 1777,
    unit: "13",
    section: "3",
    arabic: "نَهَى النَّبِيُّ ﷺ أَنْ يَشْرَبَ الرَّجُلُ قَائِمًا",
    translation: "The Prophet (peace be upon him) forbade that a man drink while standing",
    vocabulary: "Muslim",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "hal", prominence: "primary" },
      { conceptId: "mafool-bih", prominence: "secondary" },
      { conceptId: "fil-madhi", prominence: "secondary" }
    ]
  },
  {
    id: 1778,
    unit: "14",
    section: "1",
    arabic: "مَا مِنْ عَبْدٍ يَقُولُ لَا إِلَهَ إِلَّا اللَّهُ مُخْلِصًا إِلَّا فُتِحَتْ لَهُ أَبْوَابُ السَّمَاءِ",
    translation: "No servant says 'There is no god but Allah' sincerely except that the gates of heaven are opened for him",
    vocabulary: "Tirmidhi",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "hal", prominence: "primary" },
      { conceptId: "mustathna", prominence: "secondary" },
      { conceptId: "fil-majhul", prominence: "secondary" }
    ]
  },
  {
    id: 1779,
    unit: "14",
    section: "1",
    arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    translation: "Actions are but by intentions, and every person will have only what they intended",
    vocabulary: "Bukhari & Muslim",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "hasr", prominence: "primary" },
      { conceptId: "harf-jarr", prominence: "secondary" },
      { conceptId: "ism-mawsul", prominence: "secondary" }
    ]
  },

  // --- Poetry Hal ---
  {
    id: 1780,
    unit: "14",
    section: "2",
    arabic: "وَلَيْلٍ كَمَوْجِ الْبَحْرِ أَرْخَى سُدُولَهُ عَلَيَّ بِأَنْوَاعِ الْهُمُومِ لِيَبْتَلِي",
    translation: "And a night like the waves of the sea let down its curtains upon me with various sorrows to test me",
    vocabulary: "Imru al-Qays",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "hal", prominence: "primary" },
      { conceptId: "tashbih", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1781,
    unit: "14",
    section: "2",
    arabic: "أَتَانِي حَبِيبِي وَالنُّجُومُ شَوَاهِدُ وَقَدْ نَامَ عُذَّالِي وَنَامَ الْحَوَاسِدُ",
    translation: "My beloved came to me while the stars were witnesses, and my critics and enviers had slept",
    vocabulary: "Classical Poetry",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "hal", prominence: "primary" },
      { conceptId: "jumlah-ismiyyah", prominence: "secondary" },
      { conceptId: "atf", prominence: "secondary" }
    ]
  },
  {
    id: 1782,
    unit: "15",
    section: "1",
    arabic: "خُذُوا كُلَّ شَيْءٍ مِنِّي وَدَعُوا فُؤَادِي حُرًّا طَلِيقًا مِنَ الْهَوَى",
    translation: "Take everything from me, but leave my heart free and released from passion",
    vocabulary: "Classical Poetry",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "hal", prominence: "primary" },
      { conceptId: "fil-amr", prominence: "secondary" },
      { conceptId: "mafool-bih", prominence: "secondary" }
    ]
  },
  {
    id: 1783,
    unit: "15",
    section: "1",
    arabic: "قِفَا نَبْكِ مِنْ ذِكْرَى حَبِيبٍ وَمَنْزِلِ بِسِقْطِ اللِّوَى بَيْنَ الدَّخُولِ فَحَوْمَلِ",
    translation: "Stop, let us weep from the memory of a beloved and a dwelling at the edge of the sand dune between Dakhul and Hawmal",
    vocabulary: "Imru al-Qays",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "fil-amr", prominence: "primary" },
      { conceptId: "harf-jarr", prominence: "secondary" },
      { conceptId: "idafa", prominence: "secondary" }
    ]
  },

  // ============================================
  // SECTION 3: SPECIFICATION (التمييز)
  // Units 16-20 equivalents
  // ============================================

  // --- Quranic Tamyiz ---
  {
    id: 1784,
    unit: "16",
    section: "1",
    arabic: "وَفَجَّرْنَا الْأَرْضَ عُيُونًا فَالْتَقَى الْمَاءُ عَلَى أَمْرٍ قَدْ قُدِرَ",
    translation: "And We caused the earth to burst with springs, and the waters met for a matter already predestined",
    vocabulary: "Quran 54:12",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "tamyiz", prominence: "primary" },
      { conceptId: "mafool-bih", prominence: "secondary" },
      { conceptId: "fil-majhul", prominence: "secondary" }
    ]
  },
  {
    id: 1785,
    unit: "16",
    section: "1",
    arabic: "وَاشْتَعَلَ الرَّأْسُ شَيْبًا وَلَمْ أَكُنْ بِدُعَائِكَ رَبِّ شَقِيًّا",
    translation: "And my head has filled with white hair, and never have I been in my supplication to You, my Lord, unhappy",
    vocabulary: "Quran 19:4",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "tamyiz", prominence: "primary" },
      { conceptId: "kana", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1786,
    unit: "16",
    section: "2",
    arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ فَصَلِّ لِرَبِّكَ وَانْحَرْ",
    translation: "Indeed, We have granted you the Abundance. So pray to your Lord and sacrifice",
    vocabulary: "Quran 108:1-2",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "inna", prominence: "primary" },
      { conceptId: "fil-amr", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1787,
    unit: "17",
    section: "1",
    arabic: "أَنَا أَكْثَرُ مِنْكَ مَالًا وَأَعَزُّ نَفَرًا",
    translation: "I am greater than you in wealth and mightier in number",
    vocabulary: "Quran 18:34",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "tamyiz", prominence: "primary" },
      { conceptId: "ism-tafdil", prominence: "primary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1788,
    unit: "17",
    section: "1",
    arabic: "وَكَفَى بِاللَّهِ شَهِيدًا",
    translation: "And sufficient is Allah as a witness",
    vocabulary: "Quran 4:79",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "tamyiz", prominence: "primary" },
      { conceptId: "harf-jarr", prominence: "secondary" },
      { conceptId: "fail", prominence: "secondary" }
    ]
  },
  {
    id: 1789,
    unit: "17",
    section: "2",
    arabic: "إِنِّي رَأَيْتُ أَحَدَ عَشَرَ كَوْكَبًا وَالشَّمْسَ وَالْقَمَرَ رَأَيْتُهُمْ لِي سَاجِدِينَ",
    translation: "Indeed I have seen eleven stars and the sun and the moon; I saw them prostrating to me",
    vocabulary: "Quran 12:4",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "tamyiz", prominence: "primary" },
      { conceptId: "adad", prominence: "primary" },
      { conceptId: "hal", prominence: "secondary" }
    ]
  },

  // --- Hadith Tamyiz ---
  {
    id: 1790,
    unit: "16",
    section: "3",
    arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    translation: "The Muslim is the one from whose tongue and hand the Muslims are safe",
    vocabulary: "Bukhari & Muslim",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "ism-mawsul", prominence: "primary" },
      { conceptId: "harf-jarr", prominence: "secondary" },
      { conceptId: "atf", prominence: "secondary" }
    ]
  },
  {
    id: 1791,
    unit: "17",
    section: "3",
    arabic: "رُبَّ صَائِمٍ لَيْسَ لَهُ مِنْ صِيَامِهِ إِلَّا الْجُوعُ وَرُبَّ قَائِمٍ لَيْسَ لَهُ مِنْ قِيَامِهِ إِلَّا السَّهَرُ",
    translation: "Perhaps a fasting person has nothing from his fast except hunger, and perhaps a praying person has nothing from his prayer except sleeplessness",
    vocabulary: "Ibn Majah",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "laysa", prominence: "primary" },
      { conceptId: "mustathna", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1792,
    unit: "18",
    section: "1",
    arabic: "مَا مَلَأَ آدَمِيٌّ وِعَاءً شَرًّا مِنْ بَطْنٍ",
    translation: "A human being fills no vessel worse than his stomach",
    vocabulary: "Tirmidhi",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "tamyiz", prominence: "primary" },
      { conceptId: "ism-tafdil", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1793,
    unit: "18",
    section: "1",
    arabic: "أَنَا وَكَافِلُ الْيَتِيمِ فِي الْجَنَّةِ هَكَذَا وَأَشَارَ بِالسَّبَّابَةِ وَالْوُسْطَى",
    translation: "I and the one who sponsors an orphan will be in Paradise like this - and he indicated with his index and middle fingers",
    vocabulary: "Bukhari",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "mubtada", prominence: "primary" },
      { conceptId: "atf", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },

  // --- Poetry Tamyiz ---
  {
    id: 1794,
    unit: "18",
    section: "2",
    arabic: "أَعَزُّ مَكَانًا فِي الدُّنَا سَرْجُ سَابِحٍ وَخَيْرُ جَلِيسٍ فِي الزَّمَانِ كِتَابُ",
    translation: "The proudest place in the world is the saddle of a swift horse, and the best companion in time is a book",
    vocabulary: "Al-Mutanabbi",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "tamyiz", prominence: "primary" },
      { conceptId: "ism-tafdil", prominence: "primary" },
      { conceptId: "idafa", prominence: "secondary" }
    ]
  },
  {
    id: 1795,
    unit: "18",
    section: "2",
    arabic: "وَمَا نَيْلُ الْمَطَالِبِ بِالتَّمَنِّي وَلَكِنْ تُؤْخَذُ الدُّنْيَا غِلَابًا",
    translation: "Goals are not achieved by wishing, but the world is taken by force",
    vocabulary: "Al-Mutanabbi",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "tamyiz", prominence: "primary" },
      { conceptId: "harf-jarr", prominence: "secondary" },
      { conceptId: "fil-majhul", prominence: "secondary" }
    ]
  },
  {
    id: 1796,
    unit: "19",
    section: "1",
    arabic: "تَكَلَّمْ فَإِنَّ الصَّمْتَ ضَرْبٌ مِنَ الْعِيِّ وَإِنَّ كَلَامَ الْمَرْءِ يُنْبِئُ عَنْ عَقْلِهِ",
    translation: "Speak, for silence is a kind of incapacity, and a person's speech reveals his intellect",
    vocabulary: "Classical Poetry",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "inna", prominence: "primary" },
      { conceptId: "fil-amr", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },

  // ============================================
  // SECTION 4: EXCEPTION (الاستثناء)
  // Various units
  // ============================================

  // --- Quranic Exception ---
  {
    id: 1797,
    unit: "20",
    section: "1",
    arabic: "لَا إِكْرَاهَ فِي الدِّينِ قَدْ تَبَيَّنَ الرُّشْدُ مِنَ الْغَيِّ",
    translation: "There is no compulsion in religion. The right course has become distinct from the wrong",
    vocabulary: "Quran 2:256",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "laa-naafiya-liljins", prominence: "primary" },
      { conceptId: "harf-jarr", prominence: "secondary" },
      { conceptId: "fil-madhi", prominence: "secondary" }
    ]
  },
  {
    id: 1798,
    unit: "20",
    section: "1",
    arabic: "وَلَا تَقُولَنَّ لِشَيْءٍ إِنِّي فَاعِلٌ ذَلِكَ غَدًا إِلَّا أَنْ يَشَاءَ اللَّهُ",
    translation: "And never say of anything, 'Indeed, I will do that tomorrow,' except when adding 'If Allah wills'",
    vocabulary: "Quran 18:23-24",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "mustathna", prominence: "primary" },
      { conceptId: "illa", prominence: "primary" },
      { conceptId: "fil-nahy", prominence: "secondary" }
    ]
  },
  {
    id: 1799,
    unit: "20",
    section: "2",
    arabic: "فَسَجَدَ الْمَلَائِكَةُ كُلُّهُمْ أَجْمَعُونَ إِلَّا إِبْلِيسَ اسْتَكْبَرَ وَكَانَ مِنَ الْكَافِرِينَ",
    translation: "So the angels prostrated - all of them entirely, except Iblis. He refused and was arrogant and became of the disbelievers",
    vocabulary: "Quran 38:73-74",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "mustathna", prominence: "primary" },
      { conceptId: "illa", prominence: "primary" },
      { conceptId: "tawkid", prominence: "secondary" },
      { conceptId: "kana", prominence: "secondary" }
    ]
  },
  {
    id: 1800,
    unit: "21",
    section: "1",
    arabic: "وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِنْ قَبْلِهِ الرُّسُلُ",
    translation: "Muhammad is not but a messenger. Other messengers have passed on before him",
    vocabulary: "Quran 3:144",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "mustathna", prominence: "primary" },
      { conceptId: "hasr", prominence: "primary" },
      { conceptId: "fil-madhi", prominence: "secondary" }
    ]
  },
  {
    id: 1801,
    unit: "21",
    section: "1",
    arabic: "قُلْ لَا أَمْلِكُ لِنَفْسِي نَفْعًا وَلَا ضَرًّا إِلَّا مَا شَاءَ اللَّهُ",
    translation: "Say: I possess no power to benefit myself or harm myself except what Allah wills",
    vocabulary: "Quran 7:188",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "mustathna", prominence: "primary" },
      { conceptId: "illa", prominence: "primary" },
      { conceptId: "mafool-bih", prominence: "secondary" }
    ]
  },
  {
    id: 1802,
    unit: "21",
    section: "2",
    arabic: "وَمَا أُوتِيتُمْ مِنَ الْعِلْمِ إِلَّا قَلِيلًا",
    translation: "And you have not been given of knowledge except a little",
    vocabulary: "Quran 17:85",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "mustathna", prominence: "primary" },
      { conceptId: "fil-majhul", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },

  // --- Hadith Exception ---
  {
    id: 1803,
    unit: "20",
    section: "3",
    arabic: "كُلُّ أُمَّتِي يَدْخُلُونَ الْجَنَّةَ إِلَّا مَنْ أَبَى",
    translation: "All of my ummah will enter Paradise except those who refuse",
    vocabulary: "Bukhari",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "mustathna", prominence: "primary" },
      { conceptId: "illa", prominence: "primary" },
      { conceptId: "ism-mawsul", prominence: "secondary" }
    ]
  },
  {
    id: 1804,
    unit: "20",
    section: "3",
    arabic: "لَا تُسَافِرِ الْمَرْأَةُ إِلَّا مَعَ ذِي مَحْرَمٍ",
    translation: "A woman should not travel except with a mahram (close male relative)",
    vocabulary: "Bukhari & Muslim",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "mustathna", prominence: "primary" },
      { conceptId: "illa", prominence: "primary" },
      { conceptId: "fil-nahy", prominence: "secondary" }
    ]
  },
  {
    id: 1805,
    unit: "21",
    section: "3",
    arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    translation: "None of you truly believes until he loves for his brother what he loves for himself",
    vocabulary: "Bukhari & Muslim",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "laa", prominence: "primary" },
      { conceptId: "ism-mawsul", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1806,
    unit: "21",
    section: "3",
    arabic: "لَا تَزُولُ قَدَمَا عَبْدٍ يَوْمَ الْقِيَامَةِ حَتَّى يُسْأَلَ عَنْ عُمُرِهِ فِيمَا أَفْنَاهُ",
    translation: "The feet of a servant will not move on the Day of Judgment until he is asked about his life and how he spent it",
    vocabulary: "Tirmidhi",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "laa", prominence: "primary" },
      { conceptId: "fil-majhul", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },

  // --- Poetry Exception ---
  {
    id: 1807,
    unit: "22",
    section: "1",
    arabic: "وَمَا الْحُبُّ إِلَّا لِلْحَبِيبِ الْأَوَّلِ",
    translation: "And love is only for the first beloved",
    vocabulary: "Abu Tammam",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "mustathna", prominence: "primary" },
      { conceptId: "hasr", prominence: "primary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1808,
    unit: "22",
    section: "1",
    arabic: "لَا يَسْلَمُ الشَّرَفُ الرَّفِيعُ مِنَ الْأَذَى حَتَّى يُرَاقَ عَلَى جَوَانِبِهِ الدَّمُ",
    translation: "Lofty honor is not safe from harm until blood is spilled on its sides",
    vocabulary: "Al-Mutanabbi",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "laa", prominence: "primary" },
      { conceptId: "fil-majhul", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1809,
    unit: "22",
    section: "2",
    arabic: "لَيْسَ الْجَمَالُ بِأَثْوَابٍ تُزَيِّنُنَا إِنَّ الْجَمَالَ جَمَالُ الْعِلْمِ وَالْأَدَبِ",
    translation: "Beauty is not in clothes that adorn us; true beauty is the beauty of knowledge and manners",
    vocabulary: "Ali ibn Abi Talib",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "laysa", prominence: "primary" },
      { conceptId: "inna", prominence: "secondary" },
      { conceptId: "idafa", prominence: "secondary" }
    ]
  },

  // ============================================
  // SECTION 5: EMPHASIS (التوكيد)
  // Various units
  // ============================================

  // --- Quranic Emphasis ---
  {
    id: 1810,
    unit: "23",
    section: "1",
    arabic: "فَسَجَدَ الْمَلَائِكَةُ كُلُّهُمْ أَجْمَعُونَ",
    translation: "So the angels prostrated - all of them entirely",
    vocabulary: "Quran 15:30",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "tawkid", prominence: "primary" },
      { conceptId: "fail", prominence: "secondary" },
      { conceptId: "fil-madhi", prominence: "secondary" }
    ]
  },
  {
    id: 1811,
    unit: "23",
    section: "1",
    arabic: "إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ",
    translation: "Indeed, Allah and His angels send blessings upon the Prophet",
    vocabulary: "Quran 33:56",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "inna", prominence: "primary" },
      { conceptId: "atf", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1812,
    unit: "23",
    section: "2",
    arabic: "وَإِذْ أَخَذَ اللَّهُ مِيثَاقَ النَّبِيِّينَ لَمَا آتَيْتُكُمْ مِنْ كِتَابٍ وَحِكْمَةٍ",
    translation: "And when Allah took the covenant of the prophets, 'Whatever I give you of Scripture and wisdom...'",
    vocabulary: "Quran 3:81",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "idha", prominence: "primary" },
      { conceptId: "mafool-bih", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1813,
    unit: "24",
    section: "1",
    arabic: "قُلْ إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "Say: Indeed, my prayer, my rites of sacrifice, my living and my dying are for Allah, Lord of the worlds",
    vocabulary: "Quran 6:162",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "inna", prominence: "primary" },
      { conceptId: "atf", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" },
      { conceptId: "badal", prominence: "secondary" }
    ]
  },
  {
    id: 1814,
    unit: "24",
    section: "1",
    arabic: "وَلَقَدْ رَآهُ نَزْلَةً أُخْرَى عِنْدَ سِدْرَةِ الْمُنْتَهَى",
    translation: "And he certainly saw him in another descent at the Lote Tree of the Utmost Boundary",
    vocabulary: "Quran 53:13-14",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "tawkid", prominence: "primary" },
      { conceptId: "mafool-fih", prominence: "secondary" },
      { conceptId: "idafa", prominence: "secondary" }
    ]
  },
  {
    id: 1815,
    unit: "24",
    section: "2",
    arabic: "كَلَّا إِنَّ الْإِنْسَانَ لَيَطْغَى أَنْ رَآهُ اسْتَغْنَى",
    translation: "No! Indeed, mankind transgresses because he sees himself self-sufficient",
    vocabulary: "Quran 96:6-7",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "inna", prominence: "primary" },
      { conceptId: "tawkid", prominence: "secondary" },
      { conceptId: "mafool-lahu", prominence: "secondary" }
    ]
  },

  // --- Hadith Emphasis ---
  {
    id: 1816,
    unit: "23",
    section: "3",
    arabic: "وَاللَّهِ لَأَغْزُوَنَّ قُرَيْشًا وَاللَّهِ لَأَغْزُوَنَّ قُرَيْشًا وَاللَّهِ لَأَغْزُوَنَّ قُرَيْشًا",
    translation: "By Allah, I will raid Quraysh. By Allah, I will raid Quraysh. By Allah, I will raid Quraysh",
    vocabulary: "Abu Dawud",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "tawkid", prominence: "primary" },
      { conceptId: "fil-mudari", prominence: "secondary" },
      { conceptId: "mafool-bih", prominence: "secondary" }
    ]
  },
  {
    id: 1817,
    unit: "24",
    section: "3",
    arabic: "إِنَّ لِلَّهِ تِسْعَةً وَتِسْعِينَ اسْمًا مِائَةً إِلَّا وَاحِدًا مَنْ أَحْصَاهَا دَخَلَ الْجَنَّةَ",
    translation: "Indeed, Allah has ninety-nine names, one hundred less one. Whoever memorizes them will enter Paradise",
    vocabulary: "Bukhari & Muslim",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "inna", prominence: "primary" },
      { conceptId: "adad", prominence: "secondary" },
      { conceptId: "man", prominence: "secondary" }
    ]
  },
  {
    id: 1818,
    unit: "25",
    section: "1",
    arabic: "أَلَا إِنَّ الدُّنْيَا مَلْعُونَةٌ مَلْعُونٌ مَا فِيهَا إِلَّا ذِكْرَ اللَّهِ وَمَا وَالَاهُ",
    translation: "Verily, the world is cursed, cursed is what is in it, except the remembrance of Allah and what is related to it",
    vocabulary: "Tirmidhi",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "tawkid", prominence: "primary" },
      { conceptId: "mustathna", prominence: "secondary" },
      { conceptId: "ism-mawsul", prominence: "secondary" }
    ]
  },
  {
    id: 1819,
    unit: "25",
    section: "1",
    arabic: "إِنَّ اللَّهَ كَتَبَ الْإِحْسَانَ عَلَى كُلِّ شَيْءٍ",
    translation: "Indeed, Allah has prescribed excellence in all things",
    vocabulary: "Muslim",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "inna", prominence: "primary" },
      { conceptId: "mafool-bih", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },

  // --- Poetry Emphasis ---
  {
    id: 1820,
    unit: "25",
    section: "2",
    arabic: "إِنَّ الْحَيَاةَ عَقِيدَةٌ وَجِهَادُ",
    translation: "Indeed, life is belief and struggle",
    vocabulary: "Ahmad Shawqi",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "inna", prominence: "primary" },
      { conceptId: "khabar-inna", prominence: "secondary" },
      { conceptId: "atf", prominence: "secondary" }
    ]
  },
  {
    id: 1821,
    unit: "25",
    section: "2",
    arabic: "أَلَا كُلُّ شَيْءٍ مَا خَلَا اللَّهَ بَاطِلُ وَكُلُّ نَعِيمٍ لَا مَحَالَةَ زَائِلُ",
    translation: "Indeed, everything besides Allah is false, and every blessing will inevitably perish",
    vocabulary: "Labid ibn Rabi'ah",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "tawkid", prominence: "primary" },
      { conceptId: "mustathna", prominence: "secondary" },
      { conceptId: "mubtada", prominence: "secondary" }
    ]
  },
  {
    id: 1822,
    unit: "26",
    section: "1",
    arabic: "وَإِنَّمَا الْأُمَمُ الْأَخْلَاقُ مَا بَقِيَتْ فَإِنْ هُمُ ذَهَبَتْ أَخْلَاقُهُمْ ذَهَبُوا",
    translation: "Nations are but their morals as long as they remain; if their morals go, they go",
    vocabulary: "Ahmad Shawqi",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "hasr", prominence: "primary" },
      { conceptId: "jumlah-shart", prominence: "secondary" },
      { conceptId: "in", prominence: "secondary" }
    ]
  },

  // ============================================
  // SECTION 6: RELATIVE CLAUSES (الموصول)
  // Units 4, 6-7 equivalents
  // ============================================

  // --- Quranic Relative Clauses ---
  {
    id: 1823,
    unit: "6",
    section: "1",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ وَجَعَلَ الظُّلُمَاتِ وَالنُّورَ",
    translation: "Praise be to Allah, who created the heavens and the earth and made the darkness and the light",
    vocabulary: "Quran 6:1",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "ism-mawsul", prominence: "primary" },
      { conceptId: "alladhi", prominence: "primary" },
      { conceptId: "jumlah-silah", prominence: "secondary" }
    ]
  },
  {
    id: 1824,
    unit: "6",
    section: "1",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    translation: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire",
    vocabulary: "Quran 2:201",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "munada", prominence: "primary" },
      { conceptId: "fil-amr", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1825,
    unit: "6",
    section: "2",
    arabic: "الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ طُوبَى لَهُمْ وَحُسْنُ مَآبٍ",
    translation: "Those who believe and do righteous deeds - for them is happiness and a good return",
    vocabulary: "Quran 13:29",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "ism-mawsul", prominence: "primary" },
      { conceptId: "alladhina", prominence: "primary" },
      { conceptId: "atf", prominence: "secondary" }
    ]
  },
  {
    id: 1826,
    unit: "6",
    section: "2",
    arabic: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا وَإِنَّ اللَّهَ لَمَعَ الْمُحْسِنِينَ",
    translation: "And those who strive for Us - We will surely guide them to Our ways. And indeed, Allah is with the doers of good",
    vocabulary: "Quran 29:69",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "ism-mawsul", prominence: "primary" },
      { conceptId: "alladhina", prominence: "primary" },
      { conceptId: "tawkid", prominence: "secondary" }
    ]
  },
  {
    id: 1827,
    unit: "7",
    section: "1",
    arabic: "وَمَا تَفْعَلُوا مِنْ خَيْرٍ يَعْلَمْهُ اللَّهُ",
    translation: "And whatever good you do, Allah knows it",
    vocabulary: "Quran 2:197",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "ism-mawsul", prominence: "primary" },
      { conceptId: "ma", prominence: "primary" },
      { conceptId: "jumlah-shart", prominence: "secondary" }
    ]
  },
  {
    id: 1828,
    unit: "7",
    section: "1",
    arabic: "فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ وَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ",
    translation: "Whoever does an atom's weight of good will see it, and whoever does an atom's weight of evil will see it",
    vocabulary: "Quran 99:7-8",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "ism-mawsul", prominence: "primary" },
      { conceptId: "man", prominence: "primary" },
      { conceptId: "jumlah-shart", prominence: "secondary" },
      { conceptId: "tamyiz", prominence: "secondary" }
    ]
  },
  {
    id: 1829,
    unit: "7",
    section: "2",
    arabic: "وَمِنَ النَّاسِ مَنْ يَقُولُ آمَنَّا بِاللَّهِ وَبِالْيَوْمِ الْآخِرِ وَمَا هُمْ بِمُؤْمِنِينَ",
    translation: "And of the people are some who say, 'We believe in Allah and the Last Day,' but they are not believers",
    vocabulary: "Quran 2:8",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "ism-mawsul", prominence: "primary" },
      { conceptId: "man", prominence: "primary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },

  // --- Hadith Relative Clauses ---
  {
    id: 1830,
    unit: "6",
    section: "3",
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    translation: "The best of you are those who learn the Quran and teach it",
    vocabulary: "Bukhari",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "ism-mawsul", prominence: "primary" },
      { conceptId: "man", prominence: "primary" },
      { conceptId: "ism-tafdil", prominence: "secondary" }
    ]
  },
  {
    id: 1831,
    unit: "6",
    section: "3",
    arabic: "الْمُؤْمِنُ الَّذِي يُخَالِطُ النَّاسَ وَيَصْبِرُ عَلَى أَذَاهُمْ خَيْرٌ مِنَ الَّذِي لَا يُخَالِطُهُمْ",
    translation: "The believer who mixes with people and is patient with their harm is better than the one who does not mix with them",
    vocabulary: "Ibn Majah",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "ism-mawsul", prominence: "primary" },
      { conceptId: "alladhi", prominence: "primary" },
      { conceptId: "ism-tafdil", prominence: "secondary" }
    ]
  },
  {
    id: 1832,
    unit: "7",
    section: "3",
    arabic: "مَا مِنْ مُسْلِمٍ يَغْرِسُ غَرْسًا أَوْ يَزْرَعُ زَرْعًا فَيَأْكُلُ مِنْهُ طَيْرٌ أَوْ إِنْسَانٌ إِلَّا كَانَ لَهُ صَدَقَةً",
    translation: "No Muslim plants a plant or cultivates a crop that a bird or human eats from, except that it is charity for him",
    vocabulary: "Bukhari & Muslim",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-shart", prominence: "primary" },
      { conceptId: "mafool-mutlaq", prominence: "secondary" },
      { conceptId: "mustathna", prominence: "secondary" }
    ]
  },
  {
    id: 1833,
    unit: "7",
    section: "3",
    arabic: "الَّذِي يَشْرَبُ فِي آنِيَةِ الذَّهَبِ وَالْفِضَّةِ إِنَّمَا يُجَرْجِرُ فِي بَطْنِهِ نَارَ جَهَنَّمَ",
    translation: "The one who drinks from vessels of gold and silver is only pouring the fire of Hell into his stomach",
    vocabulary: "Bukhari & Muslim",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "ism-mawsul", prominence: "primary" },
      { conceptId: "alladhi", prominence: "primary" },
      { conceptId: "hasr", prominence: "secondary" }
    ]
  },

  // --- Poetry Relative Clauses ---
  {
    id: 1834,
    unit: "7",
    section: "4",
    arabic: "وَالنَّفْسُ رَاغِبَةٌ إِذَا رَغَّبْتَهَا وَإِذَا تُرَدُّ إِلَى قَلِيلٍ تَقْنَعُ",
    translation: "The soul desires when you make it desire, but when you return it to little, it is content",
    vocabulary: "Al-Mutanabbi",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "idha", prominence: "primary" },
      { conceptId: "fil-majhul", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1835,
    unit: "4",
    section: "4",
    arabic: "مَنْ طَلَبَ الْعُلَا سَهِرَ اللَّيَالِيَ",
    translation: "Whoever seeks greatness must stay awake through the nights",
    vocabulary: "Classical Poetry",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "ism-mawsul", prominence: "primary" },
      { conceptId: "man", prominence: "primary" },
      { conceptId: "mafool-fih", prominence: "secondary" }
    ]
  },
  {
    id: 1836,
    unit: "4",
    section: "4",
    arabic: "لَيْسَ مَنْ يَعْلَمُ كَمَنْ لَا يَعْلَمُ",
    translation: "The one who knows is not like the one who does not know",
    vocabulary: "Classical Proverb",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "ism-mawsul", prominence: "primary" },
      { conceptId: "man", prominence: "primary" },
      { conceptId: "laysa", prominence: "secondary" }
    ]
  },

  // ============================================
  // ADDITIONAL MIXED CONTENT
  // ============================================

  {
    id: 1837,
    unit: "26",
    section: "2",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي",
    translation: "My Lord, expand for me my chest and ease for me my task and untie the knot from my tongue that they may understand my speech",
    vocabulary: "Quran 20:25-28",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "fil-amr", prominence: "primary" },
      { conceptId: "munada", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1838,
    unit: "26",
    section: "2",
    arabic: "وَقُلْ رَبِّ زِدْنِي عِلْمًا",
    translation: "And say: My Lord, increase me in knowledge",
    vocabulary: "Quran 20:114",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "fil-amr", prominence: "primary" },
      { conceptId: "munada", prominence: "secondary" },
      { conceptId: "tamyiz", prominence: "secondary" }
    ]
  },
  {
    id: 1839,
    unit: "27",
    section: "1",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عِلْمٍ لَا يَنْفَعُ وَمِنْ قَلْبٍ لَا يَخْشَعُ وَمِنْ نَفْسٍ لَا تَشْبَعُ وَمِنْ دَعْوَةٍ لَا يُسْتَجَابُ لَهَا",
    translation: "O Allah, I seek refuge in You from knowledge that does not benefit, a heart that does not fear, a soul that is not satisfied, and a supplication that is not answered",
    vocabulary: "Muslim",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "munada", prominence: "primary" },
      { conceptId: "harf-jarr", prominence: "secondary" },
      { conceptId: "jumlah-silah", prominence: "secondary" }
    ]
  },
  {
    id: 1840,
    unit: "27",
    section: "1",
    arabic: "رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا",
    translation: "Our Lord, do not hold us accountable if we forget or make a mistake. Our Lord, do not lay upon us a burden like that which You laid upon those before us",
    vocabulary: "Quran 2:286",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "munada", prominence: "primary" },
      { conceptId: "fil-nahy", prominence: "secondary" },
      { conceptId: "jumlah-shart", prominence: "secondary" }
    ]
  },
  {
    id: 1841,
    unit: "27",
    section: "2",
    arabic: "لَوْلَا أَنْ رَأَى بُرْهَانَ رَبِّهِ كَذَلِكَ لِنَصْرِفَ عَنْهُ السُّوءَ وَالْفَحْشَاءَ إِنَّهُ مِنْ عِبَادِنَا الْمُخْلَصِينَ",
    translation: "Had he not seen the proof of his Lord, thus We turned away from him evil and immorality. Indeed, he was of Our chosen servants",
    vocabulary: "Quran 12:24",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "lau-la", prominence: "primary" },
      { conceptId: "mafool-bih", prominence: "secondary" },
      { conceptId: "inna", prominence: "secondary" }
    ]
  },
  {
    id: 1842,
    unit: "27",
    section: "2",
    arabic: "وَلَوْلَا فَضْلُ اللَّهِ عَلَيْكُمْ وَرَحْمَتُهُ مَا زَكَى مِنْكُمْ مِنْ أَحَدٍ أَبَدًا",
    translation: "And if not for the favor of Allah upon you and His mercy, not one of you would have been pure, ever",
    vocabulary: "Quran 24:21",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "lau-la", prominence: "primary" },
      { conceptId: "atf", prominence: "secondary" },
      { conceptId: "mafool-fih", prominence: "secondary" }
    ]
  },
  {
    id: 1843,
    unit: "28",
    section: "1",
    arabic: "سُبْحَانَ الَّذِي أَسْرَى بِعَبْدِهِ لَيْلًا مِنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى",
    translation: "Exalted is He who took His servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa",
    vocabulary: "Quran 17:1",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "ism-mawsul", prominence: "primary" },
      { conceptId: "alladhi", prominence: "primary" },
      { conceptId: "mafool-fih", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1844,
    unit: "28",
    section: "1",
    arabic: "وَعَسَى أَنْ تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَكُمْ وَعَسَى أَنْ تُحِبُّوا شَيْئًا وَهُوَ شَرٌّ لَكُمْ",
    translation: "Perhaps you hate something and it is good for you, and perhaps you love something and it is bad for you",
    vocabulary: "Quran 2:216",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "hal", prominence: "primary" },
      { conceptId: "jumlah-ismiyyah", prominence: "secondary" },
      { conceptId: "mafool-bih", prominence: "secondary" }
    ]
  },
  {
    id: 1845,
    unit: "28",
    section: "2",
    arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ خَلَقَ الْإِنْسَانَ مِنْ عَلَقٍ",
    translation: "Read in the name of your Lord who created - created man from a clinging substance",
    vocabulary: "Quran 96:1-2",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "fil-amr", prominence: "primary" },
      { conceptId: "ism-mawsul", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1846,
    unit: "28",
    section: "2",
    arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَكُونُوا مَعَ الصَّادِقِينَ",
    translation: "O you who believe, fear Allah and be with the truthful",
    vocabulary: "Quran 9:119",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "munada", prominence: "primary" },
      { conceptId: "ism-mawsul", prominence: "secondary" },
      { conceptId: "fil-amr", prominence: "secondary" }
    ]
  },
  {
    id: 1847,
    unit: "29",
    section: "1",
    arabic: "لَقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ لِمَنْ كَانَ يَرْجُو اللَّهَ وَالْيَوْمَ الْآخِرَ",
    translation: "There has certainly been for you in the Messenger of Allah an excellent pattern for anyone who hopes in Allah and the Last Day",
    vocabulary: "Quran 33:21",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "tawkid", prominence: "primary" },
      { conceptId: "kana", prominence: "secondary" },
      { conceptId: "ism-mawsul", prominence: "secondary" }
    ]
  },
  {
    id: 1848,
    unit: "29",
    section: "1",
    arabic: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا",
    translation: "And hold firmly to the rope of Allah all together and do not become divided",
    vocabulary: "Quran 3:103",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "fil-amr", prominence: "primary" },
      { conceptId: "hal", prominence: "secondary" },
      { conceptId: "fil-nahy", prominence: "secondary" }
    ]
  },
  {
    id: 1849,
    unit: "29",
    section: "2",
    arabic: "الدُّنْيَا سِجْنُ الْمُؤْمِنِ وَجَنَّةُ الْكَافِرِ",
    translation: "The world is a prison for the believer and a paradise for the disbeliever",
    vocabulary: "Muslim",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-ismiyyah", prominence: "primary" },
      { conceptId: "mubtada", prominence: "secondary" },
      { conceptId: "khabar", prominence: "secondary" }
    ]
  },
  {
    id: 1850,
    unit: "29",
    section: "2",
    arabic: "إِنَّ مِنْ أَحَبِّكُمْ إِلَيَّ وَأَقْرَبِكُمْ مِنِّي مَجْلِسًا يَوْمَ الْقِيَامَةِ أَحَاسِنَكُمْ أَخْلَاقًا",
    translation: "Indeed, the most beloved of you to me and the nearest of you to me in position on the Day of Resurrection are those of you with the best character",
    vocabulary: "Tirmidhi",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "inna", prominence: "primary" },
      { conceptId: "ism-tafdil", prominence: "secondary" },
      { conceptId: "tamyiz", prominence: "secondary" }
    ]
  },
  {
    id: 1851,
    unit: "30",
    section: "1",
    arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    translation: "Seeking knowledge is an obligation upon every Muslim",
    vocabulary: "Ibn Majah",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-ismiyyah", prominence: "primary" },
      { conceptId: "mubtada", prominence: "secondary" },
      { conceptId: "harf-jarr", prominence: "secondary" }
    ]
  },
  {
    id: 1852,
    unit: "30",
    section: "1",
    arabic: "تَفَكُّرُ سَاعَةٍ خَيْرٌ مِنْ عِبَادَةِ سَنَةٍ",
    translation: "An hour of contemplation is better than a year of worship",
    vocabulary: "Classical saying",
    difficulty: "advanced",
    conceptReferences: [
      { conceptId: "jumlah-ismiyyah", prominence: "primary" },
      { conceptId: "ism-tafdil", prominence: "secondary" },
      { conceptId: "idafa", prominence: "secondary" }
    ]
  }
];
