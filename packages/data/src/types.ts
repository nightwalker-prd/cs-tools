export type Pillar = 'dsa' | 'systems' | 'engineering' | 'theory';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Language = 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'pseudocode';

export interface Algorithm {
  id: string;
  name: string;
  category: string;
  pillar: Pillar;
  difficulty: Difficulty;
  description: string;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  pseudocode: string[];
  keyPoints: string[];
}

export interface DataStructureInfo {
  id: string;
  name: string;
  category: string;
  pillar: Pillar;
  difficulty: Difficulty;
  description: string;
  operations: { name: string; average: string; worst: string }[];
  useCases: string[];
  keyPoints: string[];
}

export interface SystemConcept {
  id: string;
  name: string;
  category: string;
  pillar: Pillar;
  difficulty: Difficulty;
  description: string;
  keyPoints: string[];
  tradeoffs?: string[];
  realWorldExamples?: string[];
}

export interface DesignPattern {
  id: string;
  name: string;
  category: 'creational' | 'structural' | 'behavioral';
  description: string;
  useCases: string[];
  codeExample?: string;
}
