export type AlgorithmCategory = 'sorting' | 'searching' | 'graph' | 'dynamic-programming' | 'greedy' | 'divide-conquer' | 'backtracking' | 'string';

export interface AlgorithmStep {
  description: string;
  highlights: number[];  // indices being compared/swapped
  state: number[];       // current array/data state
  line?: number;         // pseudocode line number
}

export interface Algorithm {
  id: string;
  name: string;
  category: AlgorithmCategory;
  description: string;
  pseudocode: string[];
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  stable?: boolean;
  inPlace?: boolean;
}
