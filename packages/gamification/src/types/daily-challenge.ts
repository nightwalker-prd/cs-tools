export interface DailyChallengeQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  category: string;
}

export interface DailyChallengeState {
  date: string; // ISO date
  questions: DailyChallengeQuestion[];
  answeredIndices: number[];
  correctCount: number;
  completed: boolean;
  xpEarned: number;
}
