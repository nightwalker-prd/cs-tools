export type Pillar = 'dsa' | 'systems' | 'engineering' | 'theory';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Topic {
  id: string;
  name: string;
  pillar: Pillar;
  difficulty: Difficulty;
  description: string;
  prerequisites: string[];
}

export interface TopicProgress {
  topicId: string;
  mastery: number;  // 0-100
  lastPracticed?: number;
  totalAttempts: number;
  correctAttempts: number;
}
