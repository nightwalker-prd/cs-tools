export interface Kitab {
  id: string;
  titleAr: string;
  titleEn: string;
  order: number;
  categoryId: string;
  pageRange: [number, number];
  abwab: Bab[];
}

export interface KitabMeta {
  id: string;
  titleAr: string;
  titleEn: string;
  order: number;
  categoryId: string;
  pageRange: [number, number];
  babCount: number;
  sectionCount: number;
}

export interface Bab {
  id: string;
  kitabId: string;
  titleAr: string;
  titleEn: string;
  order: number;
  sections: Section[];
}

export interface Section {
  id: string;
  babId: string;
  kitabId: string;
  titleAr: string;
  titleEn: string;
  order: number;
  textAr: string;
  textEn?: string;
  sourcePage: number;
  masail: Masalah[];
}

export interface Masalah {
  id: string;
  sectionId: string;
  kitabId: string;
  topicId: string;
  titleAr: string;
  titleEn: string;
  rulingAr: string;
  rulingEn: string;
  conditions?: string[];
  evidence?: Evidence[];
  difficulty: 'basic' | 'intermediate' | 'detailed';
}

export interface Evidence {
  type: 'quran' | 'hadith' | 'ijma' | 'qiyas' | 'text';
  textAr: string;
  textEn?: string;
  reference?: string;
}

export interface FiqhCategory {
  id: string;
  titleAr: string;
  titleEn: string;
  icon: string;
  description: string;
  kitabIds: string[];
}

export interface FiqhTopic {
  id: string;
  titleAr: string;
  titleEn: string;
  categoryId: string;
  summaryEn: string;
  masailIds: string[];
  tags: string[];
  relatedTopicIds: string[];
}

export interface FiqhTerm {
  id: string;
  termAr: string;
  termEn: string;
  transliteration: string;
  definitionAr: string;
  definitionEn: string;
  category: string;
}

export interface Bookmark {
  id: string;
  targetId: string;
  targetType: 'section' | 'masalah';
  note?: string;
  createdAt: number;
}

export interface Annotation {
  id: string;
  sectionId: string;
  text: string;
  createdAt: number;
  updatedAt: number;
}

export type ViewMode = 'reader' | 'topic';

export interface FiqhRoute {
  type: 'home' | 'kitab' | 'section' | 'topic' | 'glossary' | 'quiz';
  kitabId?: string;
  babId?: string;
  topicId?: string;
}

export interface QuizQuestion {
  id: string;
  type: 'ruling' | 'conditions' | 'kitab';
  questionAr: string;
  questionEn: string;
  options: QuizOption[];
  correctIndex: number;
  masalahId?: string;
}

export interface QuizOption {
  text: string;
  textAr?: string;
}

export interface QuizState {
  questions: QuizQuestion[];
  currentIndex: number;
  answers: (number | null)[];
  completed: boolean;
}
