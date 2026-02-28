/**
 * Advanced Tarkeeb Exercises - Part 2 (Units 31-40)
 * Split from original advanced.ts for better file management
 */

import { TarkeebExercise } from './types';

export const exercises: TarkeebExercise[] = [
  {
    "id": 1012,
    "unit": "31",
    "section": "1",
    "arabic": "لَا إِلَهَ إِلَّا اللَّهُ",
    "translation": "There is no god but Allah",
    "difficulty": "beginner",
    "conceptReferences": [
      { "conceptId": "jumlah-ismiyyah", "prominence": "primary" },
      { "conceptId": "illa", "prominence": "primary" },
      { "conceptId": "mustathna", "prominence": "primary", "examples": ["اللَّهُ"] },
      { "conceptId": "ism", "prominence": "secondary", "examples": ["إِلَهَ"] },
      { "conceptId": "rafa", "prominence": "secondary" }
    ]
  },
  {
    "id": 1013,
    "unit": "31",
    "section": "1",
    "arabic": "لَا رَجُلَ فِي الدَّارِ",
    "translation": "There is no man in the house",
    "difficulty": "beginner"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1014,
    "unit": "31",
    "section": "1",
    "arabic": "لَا طَالِبَ كَسُولٌ",
    "translation": "No student is lazy",
    "difficulty": "intermediate",
    "conceptReferences": [
      { "conceptId": "jumlah-ismiyyah", "prominence": "primary" },
      { "conceptId": "ism", "prominence": "secondary", "examples": ["طَالِبَ"] },
      { "conceptId": "khabar", "prominence": "secondary", "examples": ["كَسُولٌ"] },
      { "conceptId": "nasb", "prominence": "secondary" }
    ]
  },
  {
    "id": 1015,
    "unit": "31",
    "section": "1",
    "arabic": "لَا شَكَّ فِي ذَلِكَ",
    "translation": "There is no doubt in that",
    "difficulty": "beginner"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },

  // Section 2: اسم لا المضاف (معرب منصوب)
  {
    "id": 1016,
    "unit": "31",
    "section": "2",
    "arabic": "لَا طَالِبَ عِلْمٍ كَسُولٌ",
    "translation": "No student of knowledge is lazy",
    "difficulty": "intermediate",
    "conceptReferences": [
      { "conceptId": "jumlah-ismiyyah", "prominence": "primary" },
      { "conceptId": "idafa", "prominence": "primary", "examples": ["طَالِبَ عِلْمٍ"] },
      { "conceptId": "mudhaf", "prominence": "primary", "examples": ["طَالِبَ"] },
      { "conceptId": "mudhaf-ilayh", "prominence": "primary", "examples": ["عِلْمٍ"] },
      { "conceptId": "jarr", "prominence": "secondary" },
      { "conceptId": "khabar", "prominence": "secondary", "examples": ["كَسُولٌ"] }
    ]
  },
  {
    "id": 1017,
    "unit": "31",
    "section": "2",
    "arabic": "لَا صَاحِبَ حَقٍّ ضَائِعٌ",
    "translation": "No owner of a right is lost",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1018,
    "unit": "31",
    "section": "2",
    "arabic": "لَا ذَا عِلْمٍ جَاهِلٌ",
    "translation": "No possessor of knowledge is ignorant",
    "difficulty": "advanced",
    "conceptReferences": [
      { "conceptId": "jumlah-ismiyyah", "prominence": "primary" },
      { "conceptId": "idafa", "prominence": "primary", "examples": ["ذَا عِلْمٍ"] },
      { "conceptId": "mudhaf", "prominence": "primary", "examples": ["ذَا"] },
      { "conceptId": "mudhaf-ilayh", "prominence": "primary", "examples": ["عِلْمٍ"] },
      { "conceptId": "jarr", "prominence": "secondary" },
      { "conceptId": "khabar", "prominence": "secondary", "examples": ["جَاهِلٌ"] }
    ]
  },

  // Section 3: اسم لا الشبيه بالمضاف
  {
    "id": 1019,
    "unit": "31",
    "section": "3",
    "arabic": "لَا قَارِئًا كِتَابًا حَاضِرٌ",
    "translation": "No reader of a book is present",
    "difficulty": "advanced",
    "conceptReferences": [
      { "conceptId": "jumlah-ismiyyah", "prominence": "primary" },
      { "conceptId": "ism-fail", "prominence": "primary", "examples": ["قَارِئًا"] },
      { "conceptId": "mafool-bih", "prominence": "primary", "examples": ["كِتَابًا"] },
      { "conceptId": "nasb", "prominence": "primary" },
      { "conceptId": "khabar", "prominence": "secondary", "examples": ["حَاضِرٌ"] },
      { "conceptId": "rafa", "prominence": "secondary" }
    ]
  },
  {
    "id": 1020,
    "unit": "31",
    "section": "3",
    "arabic": "لَا رَاغِبًا فِي الشَّرِّ مُفْلِحٌ",
    "translation": "No one desiring evil will succeed",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },

  // Section 4: لا النافية للجنس في القرآن
  {
    "id": 1021,
    "unit": "31",
    "section": "4",
    "arabic": "ذَلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ",
    "translation": "That is the Book in which there is no doubt (Quranic)",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1022,
    "unit": "31",
    "section": "4",
    "arabic": "لَا إِكْرَاهَ فِي الدِّينِ",
    "translation": "There is no compulsion in religion (Quranic)",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1023,
    "unit": "31",
    "section": "4",
    "arabic": "لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
    "translation": "No fear will be upon them, nor will they grieve (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },

  // Section 5: لا المكررة
  {
    "id": 1024,
    "unit": "31",
    "section": "5",
    "arabic": "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    "translation": "There is no power and no strength except through Allah",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1025,
    "unit": "31",
    "section": "5",
    "arabic": "لَا أَهْلَ وَلَا مَالَ",
    "translation": "No family and no wealth",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },

  // ============================================
  // Unit 32: الإغراء والتحذير (Exhortation & Warning)
  // ============================================

  // Section 1: الإغراء
  {
    "id": 1026,
    "unit": "32",
    "section": "1",
    "arabic": "الصِّدْقَ الصِّدْقَ يَا بُنَيَّ",
    "translation": "Truthfulness, truthfulness, O my son!",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1027,
    "unit": "32",
    "section": "1",
    "arabic": "الْجِدَّ الْجِدَّ فِي الدِّرَاسَةِ",
    "translation": "Seriousness, seriousness in studying!",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1028,
    "unit": "32",
    "section": "1",
    "arabic": "الصَّبْرَ عِنْدَ الْمُصِيبَةِ",
    "translation": "Patience at the time of calamity!",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1029,
    "unit": "32",
    "section": "1",
    "arabic": "أَخَاكَ أَخَاكَ",
    "translation": "Your brother, your brother! (Stick to him)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },

  // Section 2: التحذير
  {
    "id": 1030,
    "unit": "32",
    "section": "2",
    "arabic": "إِيَّاكَ وَالْكَذِبَ",
    "translation": "Beware of lying!",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1031,
    "unit": "32",
    "section": "2",
    "arabic": "إِيَّاكَ وَالْغَضَبَ",
    "translation": "Beware of anger!",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1032,
    "unit": "32",
    "section": "2",
    "arabic": "إِيَّاكُمْ وَمُحْدَثَاتِ الْأُمُورِ",
    "translation": "Beware of newly invented matters (in religion)!",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1033,
    "unit": "32",
    "section": "2",
    "arabic": "إِيَّاكَ أَنْ تَكْذِبَ",
    "translation": "Beware of lying! (with أن)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },

  // Section 3: التحذير بدون إياك
  {
    "id": 1034,
    "unit": "32",
    "section": "3",
    "arabic": "الْأَسَدَ الْأَسَدَ",
    "translation": "The lion, the lion! (Warning)",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1035,
    "unit": "32",
    "section": "3",
    "arabic": "النَّارَ النَّارَ",
    "translation": "Fire, fire! (Warning)",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1036,
    "unit": "32",
    "section": "3",
    "arabic": "رَأْسَكَ وَالسَّقْفَ",
    "translation": "Your head and the ceiling! (Watch out!)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1037,
    "unit": "32",
    "section": "3",
    "arabic": "نَفْسَكَ وَالشُّبُهَاتِ",
    "translation": "Yourself and doubtful matters! (Protect yourself)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },

  // ============================================
  // Unit 33: أسماء الأفعال (Noun-Verbs)
  // ============================================

  // Section 1: أسماء أفعال الأمر
  {
    "id": 1038,
    "unit": "33",
    "section": "1",
    "arabic": "صَهْ عَنِ الْكَلَامِ",
    "translation": "Be quiet! (Stop talking)",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1039,
    "unit": "33",
    "section": "1",
    "arabic": "مَهْ عَنْ هَذَا الْفِعْلِ",
    "translation": "Stop! (this action)",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1040,
    "unit": "33",
    "section": "1",
    "arabic": "آمِينَ يَا رَبَّ الْعَالَمِينَ",
    "translation": "Amen, O Lord of the worlds!",
    "difficulty": "beginner"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1041,
    "unit": "33",
    "section": "1",
    "arabic": "حَيَّ عَلَى الصَّلَاةِ",
    "translation": "Come to prayer!",
    "difficulty": "beginner"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1042,
    "unit": "33",
    "section": "1",
    "arabic": "هَلُمَّ إِلَى الطَّعَامِ",
    "translation": "Come to the food!",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },

  // Section 2: أسماء أفعال ماضية
  {
    "id": 1043,
    "unit": "33",
    "section": "2",
    "arabic": "هَيْهَاتَ هَيْهَاتَ لِمَا تُوعَدُونَ",
    "translation": "Far, far away is what you are promised! (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1044,
    "unit": "33",
    "section": "2",
    "arabic": "هَيْهَاتَ أَنْ يَنْجَحَ الْكَسُولُ",
    "translation": "Far be it that the lazy one succeeds!",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1045,
    "unit": "33",
    "section": "2",
    "arabic": "شَتَّانَ مَا بَيْنَ الْعَالِمِ وَالْجَاهِلِ",
    "translation": "How different the scholar and the ignorant are!",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1046,
    "unit": "33",
    "section": "2",
    "arabic": "سُرْعَانَ مَا انْتَهَى الدَّرْسُ",
    "translation": "How quickly the lesson ended!",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },

  // Section 3: أسماء أفعال مضارعة
  {
    "id": 1047,
    "unit": "33",
    "section": "3",
    "arabic": "أُفٍّ لَكُمْ",
    "translation": "Ugh to you! (I am disgusted with you)",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1048,
    "unit": "33",
    "section": "3",
    "arabic": "فَلَا تَقُلْ لَهُمَا أُفٍّ",
    "translation": "Do not say 'ugh' to them (Quranic)",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1049,
    "unit": "33",
    "section": "3",
    "arabic": "وَيْ كَأَنَّهُ لَا يُفْلِحُ الْكَافِرُونَ",
    "translation": "Woe! It seems the disbelievers will not succeed (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },

  // Section 4: أسماء الأفعال المنقولة
  {
    "id": 1050,
    "unit": "33",
    "section": "4",
    "arabic": "عَلَيْكَ نَفْسَكَ",
    "translation": "Mind yourself! (Take care of yourself)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1051,
    "unit": "33",
    "section": "4",
    "arabic": "عَلَيْكُمْ أَنْفُسَكُمْ",
    "translation": "Take care of yourselves! (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1052,
    "unit": "33",
    "section": "4",
    "arabic": "دُونَكَ الْكِتَابَ",
    "translation": "Take the book!",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1053,
    "unit": "33",
    "section": "4",
    "arabic": "رُوَيْدَكَ يَا صَاحِبِي",
    "translation": "Gently, my friend! (Slow down)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1054,
    "unit": "33",
    "section": "4",
    "arabic": "مَكَانَكُمْ",
    "translation": "Stay in your places!",
    "difficulty": "intermediate"
  ,
    "conceptReferences": [
      {
            "conceptId": "kana",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-kana",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-kana",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      }
]
  },
  // Unit 34: التنازع (Governance Conflict) - Advanced
  {
    "id": 1085,
    "unit": "34",
    "section": "1",
    "arabic": "تَعَالَمْنَا وَجَهِلْنَا مَا عَلِمَهُ غَيْرُنَا وَمَا جَهِلْنَاهُ",
    "translation": "We pretended to know and were ignorant of what others knew and what we were ignorant of",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1086,
    "unit": "34",
    "section": "2",
    "arabic": "أُعْطِيتُ وَأَعْطَيْتُ الَّذِينَ آمَنُوا مَا وَعَدَهُمُ اللَّهُ",
    "translation": "I was given and I gave those who believed what Allah promised them",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1087,
    "unit": "34",
    "section": "3",
    "arabic": "إِيَّايَ فَارْهَبُونِ",
    "translation": "So fear Me alone! (Quranic - Al-Baqarah)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1088,
    "unit": "34",
    "section": "3",
    "arabic": "فَفَرِيقًا كَذَّبْتُمْ وَفَرِيقًا تَقْتُلُونَ",
    "translation": "A group you denied and a group you are killing (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1089,
    "unit": "34",
    "section": "4",
    "arabic": "وَإِذَا رَأَيْتَهُمْ تُعْجِبُكَ أَجْسَامُهُمْ وَإِنْ يَقُولُوا تَسْمَعْ لِقَوْلِهِمْ",
    "translation": "When you see them, their bodies please you, and if they speak, you listen (Quranic)",
    "vocabulary": "تنازع ضمني: رأيتَهم وتُعجبك - المنافقون ٤",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "inna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1090,
    "unit": "34",
    "section": "5",
    "arabic": "قَدْ كُنْتُ وَكَانَتِ الدُّنْيَا إِلَيَّ تَحِنُّ وَأَحِنُّ إِلَيْهَا",
    "translation": "I used to and the world used to yearn for me and I for it (Poetry)",
    "vocabulary": "تنازع شعري مركب: كنتُ وكانت، ثم تحنّ وأحنّ - شاهد نحوي",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "kana",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-kana",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-kana",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1091,
    "unit": "34",
    "section": "5",
    "arabic": "جَفَانِي وَلَمْ أَجْفُ وَسَاءَنِي صَدُّهُ عَنِّي",
    "translation": "He shunned me though I did not shun, and his turning away from me hurt me",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1092,
    "unit": "34",
    "section": "6",
    "arabic": "عَجِبْتُ لَهُ وَأَعْجَبَنِي مَنْ يَزْهَدُ فِيمَا يَرْغَبُ فِيهِ غَيْرُهُ",
    "translation": "I marveled at him and was impressed by one who abstains from what others desire",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1093,
    "unit": "34",
    "section": "6",
    "arabic": "بِعْتُهُ وَاشْتَرَاهُ مِنِّي مَا لَمْ يَكُنْ يُبَاعُ وَلَا يُشْتَرَى",
    "translation": "I sold to him and he bought from me what was never sold nor bought",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1094,
    "unit": "34",
    "section": "7",
    "arabic": "أَحْبَبْتُكَ وَأَحْبَبْتَنِي قَبْلَ أَنْ نَلْتَقِيَ حُبًّا لَمْ يَعْرِفْهُ غَيْرُنَا",
    "translation": "I loved you and you loved me before we met, a love unknown to others",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1095,
    "unit": "34",
    "section": "7",
    "arabic": "نَظَرْتُ إِلَيْهِ وَنَظَرَ إِلَيَّ نَظْرَةَ مَنْ يَوَدُّ لَوْ أَنَّهُ لَمْ يَرَنِي",
    "translation": "I looked at him and he looked at me with the look of one who wished he hadn't seen me",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1096,
    "unit": "34",
    "section": "8",
    "arabic": "إِذَا لَمْ تَسْتَطِعْ شَيْئًا فَدَعْهُ وَجَاوِزْهُ إِلَى مَا تَسْتَطِيعُ",
    "translation": "If you cannot do something, leave it and pass to what you can (Poetry)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1097,
    "unit": "34",
    "section": "8",
    "arabic": "وَقَدْ جَمَعْتُكُمُ الْيَوْمَ وَجَمَعَنِي الْقَدَرُ بِكُمْ عَلَى غَيْرِ مِيعَادٍ",
    "translation": "I have gathered you today and fate gathered me with you without appointment",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1098,
    "unit": "34",
    "section": "4",
    "arabic": "أَتُحَاجُّونَنَا فِي اللَّهِ وَهُوَ رَبُّنَا وَرَبُّكُمْ وَلَنَا أَعْمَالُنَا وَلَكُمْ أَعْمَالُكُمْ",
    "translation": "Do you argue with us about Allah when He is our Lord and your Lord? (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1099,
    "unit": "34",
    "section": "8",
    "arabic": "عَلِمْنَا وَعَلِمُوا أَنَّ الْحَقَّ مَعَنَا وَلَكِنْ جَحَدُوا بِهِ ظُلْمًا",
    "translation": "We knew and they knew the truth is with us, but they denied it wrongfully",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "dhalla",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-kana",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-kana",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      }
]
  },
  // Unit 35: الاشتغال (Preoccupation/Anticipation) - Advanced
  {
    "id": 1130,
    "unit": "35",
    "section": "1",
    "arabic": "الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ جَزَاهُمْ رَبُّهُمْ",
    "translation": "Those who believed and did righteous deeds - their Lord rewarded them",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1131,
    "unit": "35",
    "section": "2",
    "arabic": "أَكُلَّ امْرِئٍ تَحْسَبِينَ امْرَأً وَنَارًا تَوَقَّدُ بِاللَّيْلِ نَارًا",
    "translation": "Do you think every person is a real person, and every fire burning at night a real fire? (Poetry)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1132,
    "unit": "35",
    "section": "3",
    "arabic": "وَإِنْ أَحَدٌ مِنَ الْمُشْرِكِينَ اسْتَجَارَكَ فَأَجِرْهُ",
    "translation": "If any polytheist seeks your protection, grant him protection (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "inna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1133,
    "unit": "35",
    "section": "4",
    "arabic": "وَالسَّمَاءَ بَنَيْنَاهَا بِأَيْدٍ وَإِنَّا لَمُوسِعُونَ",
    "translation": "And the heaven - We constructed it with strength (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "inna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1134,
    "unit": "35",
    "section": "4",
    "arabic": "وَالْأَرْضَ فَرَشْنَاهَا فَنِعْمَ الْمَاهِدُونَ",
    "translation": "And the earth - We spread it out, excellent are those who spread (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1135,
    "unit": "35",
    "section": "5",
    "arabic": "وَنُوحًا إِذْ نَادَى مِنْ قَبْلُ فَاسْتَجَبْنَا لَهُ",
    "translation": "And Noah - when he called before, We answered him (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1136,
    "unit": "35",
    "section": "5",
    "arabic": "وَإِبْرَاهِيمَ إِذْ قَالَ لِقَوْمِهِ اعْبُدُوا اللَّهَ",
    "translation": "And Ibrahim - when he said to his people: Worship Allah (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1137,
    "unit": "35",
    "section": "6",
    "arabic": "الَّذِي أَنْقَذَنِي مِنَ الْغَرَقِ شَكَرْتُهُ وَأَهْدَيْتُ إِلَيْهِ",
    "translation": "The one who saved me from drowning - I thanked him and gave him a gift",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1138,
    "unit": "35",
    "section": "7",
    "arabic": "وَالَّذِينَ كَفَرُوا وَكَذَّبُوا بِآيَاتِنَا أُولَئِكَ أَصْحَابُ الْجَحِيمِ",
    "translation": "Those who disbelieved and denied Our signs - they are companions of Hellfire (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1139,
    "unit": "35",
    "section": "7",
    "arabic": "وَلَمَّا جَاءَهُمْ كِتَابٌ مِنْ عِنْدِ اللَّهِ مُصَدِّقٌ لِمَا مَعَهُمْ",
    "translation": "And when a Book came to them from Allah confirming what was with them (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-filiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "fil-madhi",
            "prominence": "primary"
      },
      {
            "conceptId": "fail",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "mafool-bih",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1140,
    "unit": "35",
    "section": "8",
    "arabic": "مَنْ عَرَفَ قَدْرَ نَفْسِهِ أَحْسَنَ إِلَيْهِ النَّاسُ",
    "translation": "Whoever knows his own worth - people treat him well",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1141,
    "unit": "35",
    "section": "8",
    "arabic": "الْحَقَّ أَقُولُهُ وَلَوْ كَرِهَ الْكَافِرُونَ",
    "translation": "The truth - I speak it even if the disbelievers hate it",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1142,
    "unit": "35",
    "section": "2",
    "arabic": "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ",
    "translation": "Did We not expand for you your chest? (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1143,
    "unit": "35",
    "section": "3",
    "arabic": "فَإِذَا السَّمَاءُ انْشَقَّتْ",
    "translation": "When the sky splits open (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1144,
    "unit": "35",
    "section": "4",
    "arabic": "وَالنَّجْمَ وَالشَّجَرَ يَسْجُدَانِ",
    "translation": "And the stars and trees - they prostrate (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  // Unit 36: لولا ولوما (Counterfactual Conditionals) - Advanced
  {
    "id": 1175,
    "unit": "36",
    "section": "1",
    "arabic": "وَلَوْلَا دَفْعُ اللَّهِ النَّاسَ بَعْضَهُمْ بِبَعْضٍ لَفَسَدَتِ الْأَرْضُ",
    "translation": "Were it not for Allah's repelling people by means of others, the earth would have been corrupted (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1176,
    "unit": "36",
    "section": "1",
    "arabic": "وَلَوْلَا دَفْعُ اللَّهِ النَّاسَ بَعْضَهُمْ بِبَعْضٍ لَهُدِّمَتْ صَوَامِعُ وَبِيَعٌ وَصَلَوَاتٌ وَمَسَاجِدُ",
    "translation": "Were it not for Allah's repelling people by means of others, monasteries, churches, synagogues, and mosques would have been demolished (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1177,
    "unit": "36",
    "section": "2",
    "arabic": "لَوْلَا أَنْ مَنَّ اللَّهُ عَلَيْنَا لَخَسَفَ بِنَا",
    "translation": "Had Allah not favored us, He would have made us swallowed up (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1178,
    "unit": "36",
    "section": "3",
    "arabic": "فَلَوْلَا أَنَّهُ كَانَ مِنَ الْمُسَبِّحِينَ لَلَبِثَ فِي بَطْنِهِ إِلَى يَوْمِ يُبْعَثُونَ",
    "translation": "And had he not been of those who glorify, he would have remained in its belly until the Day of Resurrection (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "kana",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-kana",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-kana",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1179,
    "unit": "36",
    "section": "4",
    "arabic": "قَالَ لَقَدْ عَلِمْتَ مَا أَنْزَلَ هَؤُلَاءِ إِلَّا رَبُّ السَّمَاوَاتِ وَالْأَرْضِ بَصَائِرَ وَإِنِّي لَأَظُنُّكَ يَا فِرْعَوْنُ مَثْبُورًا",
    "translation": "He said: You have known that none sent these down except the Lord of the heavens and earth as evidence, and I think, O Pharaoh, that you are destroyed (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "inna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1180,
    "unit": "36",
    "section": "5",
    "arabic": "لَوْلَا أَنْ ثَبَّتْنَاكَ لَقَدْ كِدْتَ تَرْكَنُ إِلَيْهِمْ شَيْئًا قَلِيلًا",
    "translation": "Had We not made you firm, you would have almost inclined toward them a little (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1181,
    "unit": "36",
    "section": "5",
    "arabic": "هَلَّا جِئْتَنَا بِآيَةٍ مِنْ رَبِّكَ كَمَا أُرْسِلَ الْأَوَّلُونَ",
    "translation": "Why did you not bring us a sign from your Lord as the earlier messengers were sent?",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1182,
    "unit": "36",
    "section": "6",
    "arabic": "لَوْلَا إِذْ سَمِعْتُمُوهُ ظَنَّ الْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بِأَنْفُسِهِمْ خَيْرًا",
    "translation": "Why, when you heard it, did the believing men and women not think good of themselves? (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1183,
    "unit": "36",
    "section": "7",
    "arabic": "لَوْلَا أَنْ رَأَى بُرْهَانَ رَبِّهِ كَذَلِكَ لِنَصْرِفَ عَنْهُ السُّوءَ وَالْفَحْشَاءَ",
    "translation": "Had he not seen the proof of his Lord... Thus to avert evil and indecency from him (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1184,
    "unit": "36",
    "section": "7",
    "arabic": "وَلَوْلَا أَنْ كَتَبَ اللَّهُ عَلَيْهِمُ الْجَلَاءَ لَعَذَّبَهُمْ فِي الدُّنْيَا",
    "translation": "And had Allah not decreed exile for them, He would have punished them in this world (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1185,
    "unit": "36",
    "section": "8",
    "arabic": "لَوْلَا أَنِّي رَأَيْتُ رَسُولَ اللَّهِ يَفْعَلُ ذَلِكَ لَمَا فَعَلْتُهُ",
    "translation": "Had I not seen the Messenger of Allah doing that, I would not have done it (Hadith pattern)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1186,
    "unit": "36",
    "section": "8",
    "arabic": "لَوْلَا أَنْ أَشُقَّ عَلَى أُمَّتِي لَأَمَرْتُهُمْ بِالسِّوَاكِ عِنْدَ كُلِّ صَلَاةٍ",
    "translation": "Were it not that I would burden my community, I would have ordered them to use the toothstick for every prayer (Hadith)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1187,
    "unit": "36",
    "section": "3",
    "arabic": "فَلَوْلَا كَانَتْ قَرْيَةٌ آمَنَتْ فَنَفَعَهَا إِيمَانُهَا إِلَّا قَوْمَ يُونُسَ",
    "translation": "Then was there any city that believed and benefited from its faith except the people of Jonah? (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "kana",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-kana",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-kana",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1188,
    "unit": "36",
    "section": "6",
    "arabic": "لَوْلَا أُنْزِلَ عَلَيْهِ مَلَكٌ فَيَكُونَ مَعَهُ نَذِيرًا",
    "translation": "Why was an angel not sent down to him to be a warner with him? (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1189,
    "unit": "36",
    "section": "7",
    "arabic": "وَلَقَدْ هَمَّتْ بِهِ وَهَمَّ بِهَا لَوْلَا أَنْ رَأَى بُرْهَانَ رَبِّهِ",
    "translation": "And she desired him, and he would have desired her, had he not seen the proof of his Lord (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  // Unit 37: الاختصاص (Specification) - Advanced
  {
    "id": 1220,
    "unit": "37",
    "section": "1",
    "arabic": "إِنَّا مَعَاشِرَ الْأَنْبِيَاءِ تَنَامُ أَعْيُنُنَا وَلَا تَنَامُ قُلُوبُنَا",
    "translation": "We, companies of prophets, our eyes sleep but our hearts do not sleep (Hadith)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "inna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1221,
    "unit": "37",
    "section": "1",
    "arabic": "نَحْنُ الْعَرَبَ أَفْصَحُ النَّاسِ لِسَانًا وَأَبْلَغُهُمْ بَيَانًا",
    "translation": "We Arabs are the most eloquent of people in tongue and most eloquent in expression",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1222,
    "unit": "37",
    "section": "2",
    "arabic": "نَحْنُ أَيُّهَا الرَّاسِخُونَ فِي الْعِلْمِ نُؤْمِنُ بِالْمُتَشَابِهِ",
    "translation": "We, those firmly grounded in knowledge, believe in the ambiguous verses",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "laalla",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1223,
    "unit": "37",
    "section": "3",
    "arabic": "عَلَيْنَا الْقُرَّاءَ حِفْظُ كِتَابِ اللَّهِ وَتَعْلِيمُهُ",
    "translation": "Upon us reciters is preserving the Book of Allah and teaching it",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1224,
    "unit": "37",
    "section": "4",
    "arabic": "بِنَا أَهْلَ الثُّغُورِ حِمَايَةُ بِلَادِ الْإِسْلَامِ",
    "translation": "Through us, people of the frontiers, is the protection of the lands of Islam",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1225,
    "unit": "37",
    "section": "5",
    "arabic": "فَسْئَلُوا أَهْلَ الذِّكْرِ إِنْ كُنْتُمْ لَا تَعْلَمُونَ",
    "translation": "Ask the people of remembrance if you do not know (Quranic - context for specification)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "inna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1226,
    "unit": "37",
    "section": "6",
    "arabic": "نَحْنُ الْمُسْلِمِينَ نُؤْمِنُ بِاللَّهِ وَرُسُلِهِ",
    "translation": "We Muslims believe in Allah and His messengers",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1227,
    "unit": "37",
    "section": "6",
    "arabic": "أَنَا الْعَرَبِيَّ أَفْخَرُ بِلُغَتِي الْعَرَبِيَّةِ",
    "translation": "I the Arab am proud of my Arabic language",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1228,
    "unit": "37",
    "section": "7",
    "arabic": "نَحْنُ مَعَاشِرَ الْعُلَمَاءِ نَخْشَى اللَّهَ وَنَتَّقِيهِ",
    "translation": "We scholars fear Allah and are conscious of Him",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "laalla",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1229,
    "unit": "37",
    "section": "7",
    "arabic": "أَنَا أَيُّهَا الْفَقِيرُ أَرْضَى بِمَا قَسَمَ اللَّهُ لِي",
    "translation": "I the poor one am content with what Allah has apportioned for me",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1230,
    "unit": "37",
    "section": "8",
    "arabic": "أَنَا ابْنَ جَلَا وَطَلَّاعَ الثَّنَايَا مَتَى أَضَعِ الْعِمَامَةَ تَعْرِفُونِي",
    "translation": "I am the son of clarity and climber of peaks; when I remove my turban, you will know me (poetry)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1231,
    "unit": "37",
    "section": "8",
    "arabic": "نَحْنُ بَنِي ضَبَّةَ أَصْحَابُ الْجَمَلِ الْأَعْظَمِ قِتَالُنَا",
    "translation": "We, sons of Dabba, companions of the camel, our fighting is greatest (poetry)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1232,
    "unit": "37",
    "section": "2",
    "arabic": "نَحْنُ أَيُّهَا الْمُؤْمِنُونَ الَّذِينَ جَاهَدُوا فِي سَبِيلِ اللَّهِ نَرْجُو رَحْمَةَ اللَّهِ",
    "translation": "We believers who strove in Allah's way hope for Allah's mercy",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1233,
    "unit": "37",
    "section": "4",
    "arabic": "لَنَا حَمَلَةَ الْعِلْمِ نَشْرُ الْهِدَايَةِ وَإِقَامَةُ الْحُجَّةِ",
    "translation": "For us, carriers of knowledge, is spreading guidance and establishing proof",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "laalla",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1234,
    "unit": "37",
    "section": "5",
    "arabic": "إِنَّا آلَ الرَّسُولِ لَا تَحِلُّ لَنَا الصَّدَقَةُ",
    "translation": "We, family of the Messenger, charity is not permissible for us (Hadith reference)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "inna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  // Unit 38: أساليب القصر (Restriction Patterns) - Advanced
  {
    "id": 1265,
    "unit": "38",
    "section": "1",
    "arabic": "إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُمْ بِغَيْرِ حِسَابٍ",
    "translation": "Only the patient will be given their reward without account (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "inna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1266,
    "unit": "38",
    "section": "1",
    "arabic": "إِنَّمَا وَلِيُّكُمُ اللَّهُ وَرَسُولُهُ وَالَّذِينَ آمَنُوا",
    "translation": "Your ally is only Allah, His Messenger, and those who believe (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "inna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1267,
    "unit": "38",
    "section": "2",
    "arabic": "وَمَا أَنْتَ إِلَّا بَشَرٌ مِثْلُنَا فَأْتِ بِآيَةٍ",
    "translation": "You are only a human like us, so bring a sign (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1268,
    "unit": "38",
    "section": "2",
    "arabic": "وَمَا عَلَى الرَّسُولِ إِلَّا الْبَلَاغُ الْمُبِينُ",
    "translation": "Upon the Messenger is only the clear transmission (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1269,
    "unit": "38",
    "section": "3",
    "arabic": "لَا يَمَسُّهُ إِلَّا الْمُطَهَّرُونَ",
    "translation": "None touch it except the purified (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1270,
    "unit": "38",
    "section": "4",
    "arabic": "وَلِلَّهِ الْمَشْرِقُ وَالْمَغْرِبُ فَأَيْنَمَا تُوَلُّوا فَثَمَّ وَجْهُ اللَّهِ",
    "translation": "To Allah belongs the east and west; wherever you turn, there is the Face of Allah (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1271,
    "unit": "38",
    "section": "5",
    "arabic": "مَا فِي الدَّارِ إِلَّا زَيْدٌ وَهُوَ يَنْتَظِرُكَ",
    "translation": "No one is in the house except Zayd, and he is waiting for you",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1272,
    "unit": "38",
    "section": "5",
    "arabic": "مَا زَيْدٌ إِلَّا كَاتِبٌ مُبْدِعٌ لَا يُجَارَى",
    "translation": "Zayd is only a creative writer who is unmatched",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1273,
    "unit": "38",
    "section": "6",
    "arabic": "لَا خَالِقَ إِلَّا اللَّهُ فَهُوَ رَبُّ كُلِّ شَيْءٍ",
    "translation": "There is no creator except Allah, for He is the Lord of all things",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1274,
    "unit": "38",
    "section": "7",
    "arabic": "مَا زَيْدٌ إِلَّا شَاعِرٌ لَا كَاتِبٌ فَحَسْبُ",
    "translation": "Zayd is only a poet, not merely a writer",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1275,
    "unit": "38",
    "section": "8",
    "arabic": "وَمَا خَلَقْتُ الْجِنَّ وَالْإِنْسَ إِلَّا لِيَعْبُدُونِ",
    "translation": "I did not create jinn and mankind except to worship Me (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "inna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1276,
    "unit": "38",
    "section": "8",
    "arabic": "قُلْ إِنَّمَا أَنَا بَشَرٌ مِثْلُكُمْ يُوحَى إِلَيَّ أَنَّمَا إِلَهُكُمْ إِلَهٌ وَاحِدٌ",
    "translation": "Say: I am only a human like you; it is revealed to me that your god is one God (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "inna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1277,
    "unit": "38",
    "section": "2",
    "arabic": "وَمَا أَهْلَكْنَا مِنْ قَرْيَةٍ إِلَّا وَلَهَا كِتَابٌ مَعْلُومٌ",
    "translation": "We did not destroy any city except that it had a known decree (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "lakinna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1278,
    "unit": "38",
    "section": "4",
    "arabic": "لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ وَمَا بَيْنَهُمَا وَمَا تَحْتَ الثَّرَى",
    "translation": "To Him belongs what is in the heavens and earth and between them and under the soil (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1279,
    "unit": "38",
    "section": "6",
    "arabic": "إِنَّمَا إِلَهُكُمُ اللَّهُ الَّذِي لَا إِلَهَ إِلَّا هُوَ وَسِعَ كُلَّ شَيْءٍ عِلْمًا",
    "translation": "Your god is only Allah, there is no deity except Him; He has encompassed all things in knowledge (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "inna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  // Unit 39: الحذف وأنواعه (Ellipsis Types) - Advanced
  {
    "id": 1310,
    "unit": "39",
    "section": "1",
    "arabic": "وَالَّذِينَ يُمَسِّكُونَ بِالْكِتَابِ وَأَقَامُوا الصَّلَاةَ إِنَّا لَا نُضِيعُ أَجْرَ الْمُصْلِحِينَ",
    "translation": "Those who hold fast to the Book and establish prayer - indeed, We will not waste the reward of the reformers (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "inna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1311,
    "unit": "39",
    "section": "2",
    "arabic": "يُسَبِّحُ لِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ الْمَلِكِ الْقُدُّوسِ",
    "translation": "Whatever is in the heavens and earth glorifies Allah, the Sovereign, the Pure (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1312,
    "unit": "39",
    "section": "3",
    "arabic": "أَوَلَمْ يَرَوْا إِلَى الطَّيْرِ فَوْقَهُمْ صَافَّاتٍ وَيَقْبِضْنَ مَا يُمْسِكُهُنَّ إِلَّا الرَّحْمَنُ",
    "translation": "Do they not see the birds above, spreading and folding wings? None holds them except the Most Merciful (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-filiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "fil-madhi",
            "prominence": "primary"
      },
      {
            "conceptId": "fail",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "mafool-bih",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1313,
    "unit": "39",
    "section": "4",
    "arabic": "وَقِيلَ لِلَّذِينَ اتَّقَوْا مَاذَا أَنْزَلَ رَبُّكُمْ قَالُوا خَيْرًا",
    "translation": "And it was said to those who feared Allah: What has your Lord sent down? They said: Good (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1314,
    "unit": "39",
    "section": "5",
    "arabic": "وَاللَّهُ يَدْعُو إِلَى دَارِ السَّلَامِ وَيَهْدِي مَنْ يَشَاءُ",
    "translation": "Allah calls to the abode of peace and guides whom He wills (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1315,
    "unit": "39",
    "section": "6",
    "arabic": "حُرِّمَتْ عَلَيْكُمُ الْمَيْتَةُ وَالدَّمُ وَلَحْمُ الْخِنْزِيرِ",
    "translation": "Prohibited for you are carrion, blood, and the flesh of swine (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1316,
    "unit": "39",
    "section": "6",
    "arabic": "وَجَاءَ رَجُلٌ مِنْ أَقْصَى الْمَدِينَةِ يَسْعَى",
    "translation": "And a man came from the farthest part of the city running (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1317,
    "unit": "39",
    "section": "7",
    "arabic": "تِلْكَ آيَاتُ اللَّهِ نَتْلُوهَا عَلَيْكَ بِالْحَقِّ وَإِنَّكَ لَمِنَ الْمُرْسَلِينَ",
    "translation": "These are the verses of Allah which We recite to you in truth; and you are among the messengers (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "inna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1318,
    "unit": "39",
    "section": "8",
    "arabic": "رَأَيْتُ رِجَالًا عُلَمَاءَ وَجُهَّالًا",
    "translation": "I saw scholarly men and ignorant ones",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1319,
    "unit": "39",
    "section": "9",
    "arabic": "قَالُوا سَلَامًا قَالَ سَلَامٌ",
    "translation": "They said: Peace. He said: Peace (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1320,
    "unit": "39",
    "section": "9",
    "arabic": "وَلَوْ شَاءَ اللَّهُ لَجَعَلَكُمْ أُمَّةً وَاحِدَةً",
    "translation": "And if Allah had willed, He would have made you one nation (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1321,
    "unit": "39",
    "section": "1",
    "arabic": "بَرَاءَةٌ مِنَ اللَّهِ وَرَسُولِهِ إِلَى الَّذِينَ عَاهَدْتُمْ مِنَ الْمُشْرِكِينَ",
    "translation": "A declaration of immunity from Allah and His Messenger to those polytheists with whom you made a treaty (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1322,
    "unit": "39",
    "section": "3",
    "arabic": "أَنْتُمْ وَآبَاؤُكُمُ الْأَقْدَمُونَ",
    "translation": "You and your ancient forefathers",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1323,
    "unit": "39",
    "section": "5",
    "arabic": "فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ",
    "translation": "As for the orphan, do not oppress. As for the petitioner, do not repel (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "layta",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1324,
    "unit": "39",
    "section": "6",
    "arabic": "وَتَرَى الْجِبَالَ تَحْسَبُهَا جَامِدَةً وَهِيَ تَمُرُّ مَرَّ السَّحَابِ صُنْعَ اللَّهِ",
    "translation": "You see the mountains thinking them solid while they pass like clouds - the handiwork of Allah (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-filiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "fil-madhi",
            "prominence": "primary"
      },
      {
            "conceptId": "fail",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "mafool-bih",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      }
]
  },
  // Unit 40: أل الموصولة (Relative ال) - Advanced
  {
    "id": 1355,
    "unit": "40",
    "section": "1",
    "arabic": "الْمُقِيمُو الصَّلَاةِ وَالْمُؤْتُو الزَّكَاةِ",
    "translation": "Those who establish prayer and give zakat (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1356,
    "unit": "40",
    "section": "1",
    "arabic": "الْحَافِظُونَ لِحُدُودِ اللَّهِ",
    "translation": "Those who observe the limits of Allah (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1357,
    "unit": "40",
    "section": "2",
    "arabic": "الْمَلْعُونُونَ فِي كِتَابِ اللَّهِ",
    "translation": "Those cursed in the Book of Allah",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1358,
    "unit": "40",
    "section": "2",
    "arabic": "الْمُسْتَضْعَفُونَ فِي الْأَرْضِ يُرِيدُ اللَّهُ أَنْ يَمُنَّ عَلَيْهِمْ",
    "translation": "Those oppressed in the earth - Allah wants to favor them (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "anna",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-inna",
            "prominence": "primary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1359,
    "unit": "40",
    "section": "3",
    "arabic": "الطَّيِّبُ لِسَانُهُ مَحْبُوبٌ عِنْدَ النَّاسِ",
    "translation": "The one whose tongue is good is loved among people",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1360,
    "unit": "40",
    "section": "4",
    "arabic": "الْأَقْرَبُ إِلَى اللَّهِ الْأَتْقَى",
    "translation": "The closest to Allah is the most pious",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1361,
    "unit": "40",
    "section": "5",
    "arabic": "الضَّارِبُ زَيْدًا أَمْسِ سَيُعَاقَبُ الْيَوْمَ",
    "translation": "The one who struck Zayd yesterday will be punished today",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1362,
    "unit": "40",
    "section": "6",
    "arabic": "الْآمِرُونَ بِالْمَعْرُوفِ وَالنَّاهُونَ عَنِ الْمُنْكَرِ",
    "translation": "Those who enjoin right and forbid wrong (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1363,
    "unit": "40",
    "section": "6",
    "arabic": "الرَّاكِعُونَ السَّاجِدُونَ",
    "translation": "Those who bow and prostrate (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1364,
    "unit": "40",
    "section": "7",
    "arabic": "أَكْرَمْتُ الْعَامِلَ الْخَيْرَ فِي الْمَدِينَةِ",
    "translation": "I honored the one who does good in the city",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1365,
    "unit": "40",
    "section": "7",
    "arabic": "رَأَيْتُ الضَّارِبَ زَيْدًا يَهْرُبُ مِنَ الْمَكَانِ",
    "translation": "I saw the one who struck Zayd fleeing from the place",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "kana",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-kana",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-kana",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1366,
    "unit": "40",
    "section": "8",
    "arabic": "الْمُحْسِنُ إِلَى النَّاسِ يُحِبُّهُ اللَّهُ وَالنَّاسُ",
    "translation": "The one who does good to people is loved by Allah and the people",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1367,
    "unit": "40",
    "section": "2",
    "arabic": "الْمَغْضُوبُ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    "translation": "Those who have incurred anger and those astray (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1368,
    "unit": "40",
    "section": "4",
    "arabic": "الْأَعْلَى صَوْتًا لَيْسَ بِالضَّرُورَةِ الْأَصْدَقَ قَوْلًا",
    "translation": "The loudest in voice is not necessarily the most truthful in speech",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "laysa",
            "prominence": "primary"
      },
      {
            "conceptId": "ism-kana",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar-kana",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "nasb",
            "prominence": "secondary"
      }
]
  },
  {
    "id": 1369,
    "unit": "40",
    "section": "6",
    "arabic": "التَّائِبُونَ الْعَابِدُونَ الْحَامِدُونَ السَّائِحُونَ",
    "translation": "Those who repent, worship, praise, and travel (for Allah) (Quranic)",
    "difficulty": "advanced"
  ,
    "conceptReferences": [
      {
            "conceptId": "jumlah-ismiyyah",
            "prominence": "primary"
      },
      {
            "conceptId": "mubtada",
            "prominence": "primary"
      },
      {
            "conceptId": "khabar",
            "prominence": "primary"
      },
      {
            "conceptId": "rafa",
            "prominence": "secondary"
      },
      {
            "conceptId": "harf-jarr",
            "prominence": "secondary"
      },
      {
            "conceptId": "majrur",
            "prominence": "secondary"
      },
      {
            "conceptId": "jarr",
            "prominence": "secondary"
      }
]
  }
];
