export interface XpEntry {
  amount: number;
  source: string;
  sourceApp: string;
  timestamp: number;
}

export interface XpState {
  totalXp: number;
  level: number;
  history: XpEntry[]; // capped at 100 most recent
}

export interface LevelInfo {
  level: number;
  title: string;
  xpRequired: number;
  xpForNext: number;
  progress: number; // 0-1 fraction toward next level
}

export interface LevelDef {
  level: number;
  title: string;
  minXp: number;
  icon: string;
}
