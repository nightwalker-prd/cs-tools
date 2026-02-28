import type { CategoryInfo, GameInfo, GameType } from '../types';

export const cognitiveGames: GameInfo[] = [
  {
    id: 'sequence-memory',
    title: 'Sequence Memory',
    description: 'Remember an increasingly long pattern of tiles',
    icon: '🧩',
  },
  {
    id: 'number-memory',
    title: 'Number Memory',
    description: 'Memorize increasingly long numbers',
    icon: '🔢',
  },
  {
    id: 'chimp-memory',
    title: 'Chimp Memory',
    description: 'Click numbers in order after they disappear',
    icon: '🐵',
  },
  {
    id: 'working-memory',
    title: 'Working Memory',
    description: 'N-back task testing working memory capacity',
    icon: '🧠',
  },
  {
    id: 'operation-span',
    title: 'Operation Span',
    description: 'Solve math problems while remembering letters',
    icon: '📐',
  },
  {
    id: 'corsi-block-tapping',
    title: 'Corsi Block Tapping',
    description: 'Repeat spatial sequences of increasing length',
    icon: '🎯',
  },
  {
    id: 'digit-span-forward',
    title: 'Digit Span (Forward)',
    description: 'Recall digits in the order presented',
    icon: '⏩',
  },
  {
    id: 'digit-span-backward',
    title: 'Digit Span (Backward)',
    description: 'Recall digits in reverse order',
    icon: '⏪',
  },
  {
    id: 'dual-n-back',
    title: 'Dual N-Back',
    description: 'Track position and letter N steps back',
    icon: '🔄',
  },
];

// Quran Memorization Games
export const quranCoreGames: GameInfo[] = [
  { id: 'first-word', title: 'First Word Recall', description: 'Type the first words of an ayah from its reference', icon: '📝' },
  { id: 'complete-ayah', title: 'Complete the Ayah', description: 'Fill in randomly blanked words', icon: '✍️' },
  { id: 'word-order', title: 'Word Order', description: 'Reorder shuffled words into correct sequence', icon: '🔀' },
  { id: 'chain-reaction', title: 'Chain Reaction', description: 'Recall the first words of the next ayah', icon: '⛓️' },
  { id: 'similar-ayah', title: 'Similar Ayah Showdown', description: 'Distinguish between similar ayahs', icon: '🔍' },
];

export const quranAudioGames: GameInfo[] = [
  { id: 'audio-recall', title: 'Audio Recall', description: 'Hear recitation, type the first words', icon: '🎧' },
  { id: 'blind-listen', title: 'Blind Listen', description: 'Identify the reference from audio only', icon: '👂' },
];

export const quranReverseGames: GameInfo[] = [
  { id: 'reverse-lookup', title: 'Reverse Lookup', description: 'See Arabic text, identify its reference', icon: '🔄' },
  { id: 'last-words', title: 'Last Words', description: 'Recall the ending words of an ayah', icon: '🔚' },
];

export const quranSpeedGames: GameInfo[] = [
  { id: 'speed-round', title: 'Speed Round', description: '60-second rapid-fire multiple choice', icon: '⚡' },
  { id: 'ayah-sprint', title: 'Ayah Sprint', description: '2-minute typing speed challenge', icon: '🏃' },
  { id: 'mistake-marathon', title: 'Mistake Marathon', description: 'Drill your weakest ayahs', icon: '🎯' },
];

export const quranPuzzleGames: GameInfo[] = [
  { id: 'quran-wordle', title: 'Quran Wordle', description: 'Guess Quranic words in 6 tries', icon: '🟩' },
  { id: 'quran-word-search', title: 'Quran Word Search', description: 'Find Quranic words in a letter grid', icon: '🔎' },
];

export const quranMemoryScienceGames: GameInfo[] = [
  { id: 'first-letters', title: 'First Letters', description: 'Reconstruct ayah from first letters only', icon: '🔤' },
  { id: 'surah-sleuth', title: 'Surah Sleuth', description: 'Identify which surah an ayah belongs to', icon: '🕵️' },
  { id: 'before-after', title: 'Before & After', description: 'Recall what comes before or after an ayah', icon: '↔️' },
  { id: 'progressive-blanking', title: 'Progressive Blanking', description: 'Increasing blank percentage each round', icon: '📊' },
  { id: 'meaning-links', title: 'Meaning Links', description: 'Match ayahs to thematic categories', icon: '🔗' },
  { id: 'phrase-chunks', title: 'Phrase Chunks', description: 'Reorder phrase units into correct order', icon: '🧱' },
];

export const quranAdvancedGames: GameInfo[] = [
  { id: 'memory-palace', title: 'Memory Palace', description: 'Method of Loci for spatial memorization', icon: '🏛️' },
  { id: 'story-chain', title: 'Story Chain', description: 'Link ayahs through narrative stories', icon: '📖' },
  { id: 'ayah-pegs', title: 'Ayah Pegs', description: 'Number-image associations for fast recall', icon: '📌' },
  { id: 'elaborative-recall', title: 'Elaborative Recall', description: 'Deep questioning for understanding', icon: '💭' },
];

export const allQuranGames: GameInfo[] = [
  ...quranCoreGames,
  ...quranAudioGames,
  ...quranReverseGames,
  ...quranSpeedGames,
  ...quranPuzzleGames,
  ...quranMemoryScienceGames,
  ...quranAdvancedGames,
];

export const categories: CategoryInfo[] = [
  {
    id: 'cognitive',
    title: 'Cognitive Training',
    titleAr: 'التدريب المعرفي',
    description: 'Evidence-based games that target core cognitive abilities',
    icon: '🧠',
    games: cognitiveGames,
  },
  {
    id: 'quran',
    title: 'Quran Memorization',
    titleAr: 'حفظ القرآن',
    description: 'Interactive games for Quran memorization with mastery tracking (Juz 1-5)',
    icon: '📖',
    games: allQuranGames,
  },
];

export const gameInfoMap: Record<GameType, GameInfo> = Object.fromEntries(
  [...cognitiveGames, ...allQuranGames].map((g) => [g.id, g])
) as Record<GameType, GameInfo>;
