/**
 * @arabtools/data — Shared data package
 *
 * Unified access to grammar, vocabulary, and reading data
 * extracted from nahw-navigator, tarkeeb, nation-test, and reading apps.
 */

// Types
export type {
  Pillar,
  Difficulty,
  NahwExample,
  NahwRule,
  NahwTable,
  LevelContent,
  NahwTopic,
  NahwSubcategory,
  NahwCategory,
  GrammaticalLabel,
  GrammaticalLabels,
  FrequencyLevel,
  WordExample,
  WordFamily,
  ReadingLevel,
  VocabularyHighlight,
  WordTranslation,
  ReadingText,
  ReadingTextSummary,
} from './types';

// Grammar
export {
  allTopics,
  topicMap,
  getTopicById,
  getTopicsByCategory,
  categories,
  grammaticalLabels,
  getAllLabels,
  findLabelById,
  getLabelsByCategory,
} from './grammar/index';

// Vocabulary
export {
  level1k,
  level2k,
  level3k,
  level5k,
  level10k,
} from './vocabulary/index';

// Reading
export {
  allReadingTexts,
  getTextsByLevel,
  getTextsByCategory,
  getTextById,
} from './reading/index';

// Quran
export type { SurahInfo, RubRange } from './quran/index';
export {
  SURAH_DATA,
  RUB_AYAH_RANGES,
  expandRubToAyahs,
  getRubsForJuz,
  getJuzForRub,
  getRubDescription,
  getSurahName,
  getRubRange,
  getSurahsForRub,
  getAyahCountForRub,
  calculateDailyTargets,
} from './quran/index';
