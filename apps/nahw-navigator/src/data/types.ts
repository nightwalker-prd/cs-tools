export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface NahwExample {
  arabic: string;
  translation: string;
  source?: string;
  irab?: string;
}

export interface NahwRule {
  arabic?: string;
  english: string;
  examples?: NahwExample[];
}

export interface NahwTable {
  title: string;
  titleAr?: string;
  headers: string[];
  rows: string[][];
}

export interface VideoRef {
  videoId: string;
  title: string;
  duration: number;
}

export interface LevelContent {
  difficulty: Difficulty;
  summary: string;
  body: string;
  rules?: NahwRule[];
  examples?: NahwExample[];
  tables?: NahwTable[];
  sourceRef?: string;
  videos?: VideoRef[];
}

export interface NahwTopic {
  id: string;
  titleAr: string;
  titleEn: string;
  transliteration: string;
  categoryId: string;
  subcategoryId?: string;
  levels: LevelContent[];
  relatedTopicIds: string[];
  tags: string[];
}

export interface NahwSubcategory {
  id: string;
  titleAr: string;
  titleEn: string;
  topicIds: string[];
}

export interface NahwCategory {
  id: string;
  titleAr: string;
  titleEn: string;
  icon: string;
  description: string;
  subcategories: NahwSubcategory[];
}
