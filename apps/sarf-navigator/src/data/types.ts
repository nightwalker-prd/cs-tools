export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface SarfExample {
  arabic: string;
  translation: string;
  source?: string;
  irab?: string;
}

export interface SarfRule {
  arabic?: string;
  english: string;
  examples?: SarfExample[];
}

export interface SarfTable {
  title: string;
  titleAr?: string;
  headers: string[];
  rows: string[][];
}

export interface LevelContent {
  difficulty: Difficulty;
  summary: string;
  body: string;
  rules?: SarfRule[];
  examples?: SarfExample[];
  tables?: SarfTable[];
  sourceRef?: string;
  interactiveWidget?: 'ilaal-transformer';
  widgetConfig?: { presetVerbType?: string; presetRoot?: string; compact?: boolean };
}

export interface SarfTopic {
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

export interface SarfSubcategory {
  id: string;
  titleAr: string;
  titleEn: string;
  topicIds: string[];
}

export interface SarfCategory {
  id: string;
  titleAr: string;
  titleEn: string;
  icon: string;
  description: string;
  subcategories: SarfSubcategory[];
}
