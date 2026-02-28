// Game type identifiers
export type GameType =
  | 'sequence-memory'
  | 'number-memory'
  | 'chimp-memory'
  | 'working-memory'
  | 'operation-span'
  | 'corsi-block-tapping'
  | 'digit-span-forward'
  | 'digit-span-backward'
  | 'dual-n-back'
  // Quran Memorization Games
  | 'first-word'
  | 'complete-ayah'
  | 'word-order'
  | 'chain-reaction'
  | 'similar-ayah'
  | 'audio-recall'
  | 'blind-listen'
  | 'reverse-lookup'
  | 'last-words'
  | 'speed-round'
  | 'ayah-sprint'
  | 'mistake-marathon'
  | 'quran-wordle'
  | 'quran-word-search'
  | 'first-letters'
  | 'surah-sleuth'
  | 'before-after'
  | 'progressive-blanking'
  | 'meaning-links'
  | 'phrase-chunks'
  | 'memory-palace'
  | 'story-chain'
  | 'ayah-pegs'
  | 'elaborative-recall';

// Extensible for future phases (tajweed, training)
export type GameCategory = 'cognitive' | 'quran';

export interface GameAttempt {
  date: string;
  score: number;
  duration: number;
}

export interface GameStats {
  highScore: number;
  attempts: GameAttempt[];
  currentStreak: number;
  lastPlayedDate: string | null;
}

export type AllGameStats = Record<GameType, GameStats>;

export interface GameInfo {
  id: GameType;
  title: string;
  description: string;
  icon: string;
}

export interface CategoryInfo {
  id: GameCategory;
  title: string;
  titleAr: string;
  description: string;
  icon: string;
  games: GameInfo[];
}
