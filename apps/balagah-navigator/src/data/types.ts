export interface BalagahExample {
  arabic: string;
  translation: string;
  source?: string;
  analysis?: string;
}

export interface BalagahRule {
  arabic?: string;
  english: string;
  examples?: BalagahExample[];
}

export interface BalagahTable {
  title: string;
  titleAr?: string;
  headers: string[];
  rows: string[][];
}

export interface TopicContent {
  summary: string;
  body: string;
  rules?: BalagahRule[];
  examples?: BalagahExample[];
  tables?: BalagahTable[];
  sourceRef?: string;
}

export interface BalagahTopic {
  id: string;
  titleAr: string;
  titleEn: string;
  transliteration: string;
  unitId: string;
  partId: string;
  content: TopicContent;
  relatedTopicIds: string[];
  tags: string[];
}

export interface BalagahPart {
  id: string;
  titleAr: string;
  titleEn: string;
  topicIds: string[];
}

export interface BalagahUnit {
  id: string;
  titleAr: string;
  titleEn: string;
  icon: string;
  description: string;
  parts: BalagahPart[];
}
