export type RubStage = 'not_started' | 'learning' | 'memorized' | 'solid';

export interface HafizRub {
  id: number; // 1-240
  stage: RubStage;
  srsItemId?: string;
}

export interface HafizState {
  learningRubs: number[];
  settings: HafizSettings;
}

export interface HafizSettings {
  dailyNewTarget: number;
  revisionSessionSize: number;
  reciterId: string;
  maxSrsInterval: number;
}

export interface HafizStats {
  total: number;
  notStarted: number;
  learning: number;
  memorized: number;
  solid: number;
  dueCount: number;
  overdueCount: number;
  percentComplete: number;
}

export type Route =
  | { page: 'home' }
  | { page: 'rub'; rubId: number }
  | { page: 'revision' }
  | { page: 'games' }
  | { page: 'game'; gameType: GameType }
  | { page: 'challenge' }
  | { page: 'settings' };

export type GameType =
  | 'complete-ayah'
  | 'word-order'
  | 'first-letters'
  | 'before-after'
  | 'audio-recall'
  | 'speed-round'
  | 'meaning-recall';

export interface QuranWord {
  id: string;
  ayahNum: number;
  wordNum: number;
  word: string;
  meaning: string;
  transliteration: string;
  root: string;
  lemmaId: number | null;
}

export interface AyahTranslation {
  id: number;
  surahNum: number;
  ayahNum: number;
  text: string;
}

export interface Lemma {
  id: number;
  lemma: string;
  meaning: string;
  transliteration: string;
  lemmaId: number;
}

export interface HifdhChallenge {
  id: string;
  startDate: string;
  targetJuz: number[];
  status: 'active' | 'paused' | 'completed' | 'abandoned';
  dailyLogs: DailyChallengeLog[];
}

export interface DailyChallengeLog {
  date: string;
  rubsTargeted: number[];
  rubsCompleted: number[];
  sessionsCompleted: number;
  checklist: ChallengeChecklist;
  notes: string;
}

export interface ChallengeChecklist {
  madeIntention: boolean;
  recitedToSomeone: boolean;
  loggedProgress: boolean;
  notedDifficultAyahs: boolean;
}

export interface AyahData {
  num: number;
  text: string;
}

export interface SurahData {
  num: number;
  name: string;
  ayahs: AyahData[];
}

export interface SearchResult {
  type: 'rub' | 'surah';
  id: number;
  label: string;
  sublabel: string;
}

export type RevisionMode =
  | 'listen-repeat'
  | 'read-along'
  | 'active-recall'
  | 'word-order';

export type GameState = 'idle' | 'playing' | 'feedback' | 'complete';
