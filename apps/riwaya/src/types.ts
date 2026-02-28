export interface Character {
  id: string;
  nameAr: string;
  nameEn: string;
  role: 'protagonist' | 'supporting' | 'narrator';
}

export interface DialogueLine {
  speaker: string;
  textAr: string;
  textEn: string;
  mood?: 'neutral' | 'happy' | 'curious' | 'surprised';
}

export interface StoryVocab {
  arabic: string;
  transliteration: string;
  english: string;
  root?: string;
}

export interface GrammarPoint {
  titleAr: string;
  titleEn: string;
  explanation: string;
  examples: string[];
}

export interface ComprehensionQuestion {
  questionAr: string;
  questionEn: string;
  options: string[];
  correctIndex: number;
}

export interface StoryEpisode {
  id: string;
  arcId: string;
  number: number;
  titleAr: string;
  titleEn: string;
  setting: string;
  characters: Character[];
  dialogueLines: DialogueLine[];
  vocabulary: StoryVocab[];
  grammarPoint: GrammarPoint;
  comprehensionQuestions: ComprehensionQuestion[];
  culturalNotes: string[];
}

export interface StoryArc {
  id: string;
  titleAr: string;
  titleEn: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  episodes: StoryEpisode[];
  totalEpisodes: number;
}

export interface StoryProgress {
  arcId: string;
  completedEpisodes: number[];
  currentEpisode: number;
  xpEarned: number;
  startedAt: string;
  lastPlayedAt: string;
}

export interface StoryChoice {
  id: string;
  textAr: string;
  textEn: string;
  consequence?: string;
}

export interface ArcProgress {
  completedEpisodes: number[];
  currentEpisode: number;
  xpEarned: number;
  startedAt: string;
  lastPlayedAt: string;
}

export interface RiwayaProgress {
  arcs: Record<string, ArcProgress>;
  totalXp: number;
  lastPlayedArcId: string | null;
}
