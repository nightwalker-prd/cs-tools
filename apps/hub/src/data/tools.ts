export interface Tool {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  category: Category;
  icon: string;
  url: string;
}

export type Category =
  | 'Reference'
  | 'Morphology'
  | 'Grammar'
  | 'Practice'
  | 'Reading & Writing'
  | 'Quran'
  | 'Courses'
  | 'Assessment';

export const CATEGORIES: Category[] = [
  'Reference',
  'Morphology',
  'Grammar',
  'Practice',
  'Reading & Writing',
  'Quran',
  'Courses',
  'Assessment',
];

export const tools: Tool[] = [
  // Reference
  {
    id: 'hans-wehr',
    name: 'Hans Wehr Dictionary',
    nameAr: 'معجم هانز فير',
    description: 'Search Arabic roots to discover all derived forms, meanings, and patterns.',
    category: 'Reference',
    icon: 'BookOpen',
    url: 'https://arabtools-hans-wehr.pages.dev',
  },

  // Morphology
  {
    id: 'sarf-charts',
    name: 'Sarf Charts',
    nameAr: 'جداول الصرف',
    description: 'Interactive verb conjugation tables for all ten forms (I-X) with auto verb-type detection.',
    category: 'Morphology',
    icon: 'Table',
    url: 'https://arabtools-sarf-charts.pages.dev',
  },
  {
    id: 'sarf-tool',
    name: 'Sarf Analysis',
    nameAr: 'تحليل صرفي',
    description: 'Morphology analysis tool for identifying word roots, patterns, and verb forms.',
    category: 'Morphology',
    icon: 'Search',
    url: 'https://arabtools-sarf-tool.pages.dev',
  },
  {
    id: 'sarf-platform',
    name: 'Sarf Platform',
    nameAr: 'منصة الصرف',
    description: 'Verified conjugation tables for 400+ verbs across all 10 forms, cross-validated with CamelMorph.',
    category: 'Morphology',
    icon: 'Database',
    url: 'https://arabtools-sarf-platform.pages.dev',
  },
  {
    id: 'sarf-navigator',
    name: 'Sarf Navigator',
    nameAr: 'دليل الصرف',
    description: 'Interactive morphology reference with beginner, intermediate, and advanced levels.',
    category: 'Morphology',
    icon: 'Compass',
    url: 'https://arabtools-sarf-navigator.pages.dev',
  },
  {
    id: 'masdar-trainer',
    name: 'Masdar & Derivatives',
    nameAr: 'المصادر والمشتقات',
    description: 'Practice verbal nouns, active participles, and passive participles across forms I-X.',
    category: 'Morphology',
    icon: 'Dumbbell',
    url: 'https://arabtools-masdar-trainer.pages.dev',
  },

  // Grammar
  {
    id: 'tarkeeb',
    name: 'Tarkeeb Analysis',
    nameAr: 'التركيب',
    description: 'Grammar analysis tool for sentence parsing with 30+ labels, student/expert modes, and TTS.',
    category: 'Grammar',
    icon: 'GitBranch',
    url: 'https://arabtools-tarkeeb.pages.dev',
  },
  {
    id: 'nahw-navigator',
    name: 'Nahw Navigator',
    nameAr: 'دليل النحو',
    description: 'Interactive grammar reference with beginner, intermediate, and advanced levels.',
    category: 'Grammar',
    icon: 'Map',
    url: 'https://arabtools-nahw-navigator.pages.dev',
  },
  {
    id: 'nahw-atlas',
    name: 'Nahw Atlas',
    nameAr: 'أطلس النحو',
    description: 'Visual grammar reference with interactive tree diagrams covering words, sentences, and phrases.',
    category: 'Grammar',
    icon: 'Network',
    url: 'https://arabtools-nahw-atlas.pages.dev',
  },
  {
    id: 'tarkib-guide',
    name: 'Tarkib Guide',
    nameAr: 'دليل التراكيب',
    description: 'Comprehensive grammar reference for phrases, sentences, pronouns, and advanced topics.',
    category: 'Grammar',
    icon: 'BookMarked',
    url: 'https://arabtools-tarkib-guide.pages.dev',
  },
  {
    id: 'tarkib-builder',
    name: 'Tarkib Builder',
    nameAr: 'بناء التراكيب',
    description: 'Build Arabic phrases and sentences by placing words into grammatical slots.',
    category: 'Grammar',
    icon: 'Puzzle',
    url: 'https://arabtools-tarkib-builder.pages.dev',
  },
  {
    id: 'bina',
    name: 'Bina',
    nameAr: 'بناء',
    description: 'Build Arabic sentences that pass grammar test cases — 22 challenges across 6 categories.',
    category: 'Grammar',
    icon: 'Code',
    url: 'https://arabtools-bina.pages.dev',
  },

  // Practice
  {
    id: 'conjugation',
    name: 'Conjugation Practice',
    nameAr: 'تمارين التصريف',
    description: 'Verb conjugation drills with 446 preset verbs, 3-layer validation, and custom word lists.',
    category: 'Practice',
    icon: 'PenTool',
    url: 'https://arabtools-conjugation.pages.dev',
  },
  {
    id: 'mufradat',
    name: 'Mufradat',
    nameAr: 'مفردات',
    description: 'Root-family vocabulary navigator with spaced repetition across 1,824 words in 5 frequency bands.',
    category: 'Practice',
    icon: 'BookA',
    url: 'https://arabtools-mufradat.pages.dev',
  },
  {
    id: 'sarf-exercises',
    name: 'Sarf Exercises',
    nameAr: 'تمارين الصرف',
    description: 'Verb conjugation exercises with SRS — conjugation, translation, and labeling across 500+ verbs.',
    category: 'Practice',
    icon: 'Dumbbell',
    url: 'https://arabtools-sarf-exercises.pages.dev',
  },
  {
    id: 'tarjama',
    name: 'Tarjama',
    nameAr: 'ترجمة',
    description: 'English to Arabic translation drills with spaced repetition scheduling.',
    category: 'Practice',
    icon: 'Languages',
    url: 'https://arabtools-tarjama.pages.dev',
  },
  {
    id: 'dhakira',
    name: 'Dhakira',
    nameAr: 'ذاكرة',
    description: 'Cognitive memory training — sequence, digit span, n-back, and Quran-based memory games.',
    category: 'Practice',
    icon: 'Brain',
    url: 'https://arabtools-dhakira.pages.dev',
  },

  // Reading & Writing
  {
    id: 'insha-guide',
    name: 'Insha Guide',
    nameAr: 'دليل الإنشاء',
    description: 'Interactive Arabic composition guide with study lessons and practice exercises.',
    category: 'Reading & Writing',
    icon: 'Pencil',
    url: 'https://arabtools-insha-guide.pages.dev',
  },
  {
    id: 'reading',
    name: 'Reading Tool',
    nameAr: 'قراءة',
    description: 'Graded Arabic reading with sidebar navigation, 600+ texts across 14 collections, word-by-word translations, and TTS.',
    category: 'Reading & Writing',
    icon: 'BookOpen',
    url: 'https://arabtools-reading.pages.dev',
  },
  {
    id: 'diwan',
    name: 'Diwan',
    nameAr: 'ديوان',
    description: 'Arabic poetry collection spanning 7 eras — 78 poems from 16 poets with verse display, translations, and vocabulary highlights.',
    category: 'Reading & Writing',
    icon: 'Feather',
    url: 'https://arabtools-diwan.pages.dev',
  },

  // Quran
  {
    id: 'kalimat',
    name: 'Quranic Vocabulary',
    nameAr: 'كلمات القرآن',
    description: 'Explore Quranic vocabulary by root, frequency, and pattern. Quran reader with grammar badges, word anatomy, weak verb trainer, and similar words drills.',
    category: 'Quran',
    icon: 'BookHeart',
    url: 'https://arabtools-kalimat.pages.dev',
  },

  {
    id: 'hafiz',
    name: 'Hafiz Tracker',
    nameAr: 'متابعة الحفظ',
    description:
      'Quran memorization tracker with rub grid, FSRS revision scheduling, and memory games.',
    category: 'Quran',
    icon: 'BookMarked',
    url: 'https://arabtools-hafiz.pages.dev',
  },

  // Courses
  {
    id: 'fstu-exercises',
    name: 'FSTU Exercises',
    nameAr: 'تمارين المعهد',
    description: '838 exercises with 11,789 questions — practice, quiz, and flashcard modes with progress tracking.',
    category: 'Courses',
    icon: 'ClipboardList',
    url: 'https://arabtools-fstu-exercises.pages.dev',
  },
  {
    id: 'durus',
    name: 'Durus',
    nameAr: 'دروس',
    description: 'Video course player with playlist management, progress tracking, and exam resources.',
    category: 'Courses',
    icon: 'Play',
    url: 'https://arabtools-durus.pages.dev',
  },

  // Assessment
  {
    id: 'nation-test',
    name: 'Vocabulary Test',
    nameAr: 'اختبار المفردات',
    description: "Research-based vocabulary testing based on Paul Nation's methodology. Measure your Arabic vocabulary size.",
    category: 'Assessment',
    icon: 'BarChart3',
    url: 'https://arabtools-nation-test.pages.dev',
  },
  {
    id: 'tashkhis',
    name: 'Tashkhis',
    nameAr: 'تشخيص',
    description: 'Adaptive Arabic placement test — diagnose strengths and weaknesses across 45 categories.',
    category: 'Assessment',
    icon: 'Target',
    url: 'https://arabtools-tashkhis.pages.dev',
  },
];
