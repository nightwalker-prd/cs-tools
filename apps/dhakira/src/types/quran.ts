// Quran memorization game types
// Ported from life-os with storage key updates

export type MasteryLevel = 0 | 1 | 2 | 3 | 4 | 5

export interface AyahMastery {
  surah: number
  ayah: number
  level: MasteryLevel
  correctStreak: number
  totalAttempts: number
  correctAttempts: number
  avgResponseTime: number
  lastAttemptAt: string | null
  mistakeHistory: MistakeRecord[]
}

export interface MistakeRecord {
  date: string
  gameType: QuranGameType
  expected: string
  given: string
}

export type QuranGameType =
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
  | 'elaborative-recall'

export type QuranGameMode = 'my-progress' | 'practice-any'

export interface AyahRange {
  surah: number
  startAyah: number
  endAyah: number
}

export interface QuranGameConfig {
  mode: QuranGameMode
  timedMode: boolean
  selectedRanges: AyahRange[]
}

export interface QuranGameSettings {
  mode: QuranGameMode
  timedMode: boolean
  audioHints: boolean
  audioFeedback: boolean
  selectedSurah: number | null
}

export interface QuranGameSession {
  gameType: QuranGameType
  startedAt: string
  ayahsTested: Array<{ surah: number; ayah: number }>
  correctCount: number
  wrongCount: number
  totalTime: number
  perfectRun: number
  bestPerfectRun: number
}

export interface QuranGameStats {
  dailyStreak: number
  lastPlayedDate: string | null
  totalSessions: number
  totalAyahsTested: number
  totalCorrect: number
}

export interface DifficultySettings {
  hintLevel: 0 | 1 | 2 | 3
  timeLimit: number | null
  blanksPercent: number
  wordsRequired: number
}

export type QuranGameState = 'idle' | 'playing' | 'answering' | 'feedback' | 'complete'

export interface QuranGameQuestion {
  surah: number
  ayah: number
  questionText: string
  correctAnswer: string
  options?: string[]
  words?: string[]
  audioUrl?: string
}

export const QURAN_GAME_STORAGE_KEYS = {
  mastery: 'arabtools-dhakira-quran-mastery',
  mistakes: 'arabtools-dhakira-quran-mistakes',
  streaks: 'arabtools-dhakira-quran-streaks',
  settings: 'arabtools-dhakira-quran-settings',
} as const
