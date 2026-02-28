export type Era = 'jahili' | 'islami' | 'umawi' | 'abbasi' | 'andalusi' | 'sufi' | 'modern';

export type Genre = 'ghazal' | 'madih' | 'hija' | 'ritha' | 'zuhd' | 'khamriyyat' | 'wasf' | 'fakhr' | 'hikma' | 'sufi' | 'hanin' | 'wataniyyat';

export interface Poet {
  id: string;
  nameAr: string;
  nameEn: string;
  era: Era;
  dates: string;
  bioAr: string;
  bioEn: string;
  genres: Genre[];
}

export interface Verse {
  sadr: string;
  ajuz: string;
}

export interface VocabItem {
  word: string;
  meaning: string;
}

export interface Poem {
  id: string;
  poetId: string;
  titleAr: string;
  titleEn: string;
  genre: Genre;
  level: 'beginner' | 'intermediate' | 'advanced';
  verses: Verse[];
  translationEn: string;
  vocabularyHighlights: VocabItem[];
  context: string;
}

export interface PoemMeta {
  id: string;
  poetId: string;
  titleAr: string;
  titleEn: string;
  genre: Genre;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface EraInfo {
  id: Era;
  nameAr: string;
  nameEn: string;
  order: number;
}

export interface WordDictionary {
  version: number;
  entries: Record<string, string>;
}

// I'rab (grammatical analysis) types
export interface IrabWord {
  word: string;
  role: string;
  roleAr: string;
  case: string;
  caseAr: string;
  pos: string;
  posAr: string;
  category: 'nominal' | 'verbal' | 'particle' | 'modifier';
  notes?: string;
}

export interface VerseIrab {
  sadr: IrabWord[];
  ajuz?: IrabWord[];
}

export interface PoemIrab {
  poemId: string;
  verses: VerseIrab[];
}
