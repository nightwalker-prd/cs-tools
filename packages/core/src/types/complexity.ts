export type ComplexityClass = 'O(1)' | 'O(log n)' | 'O(n)' | 'O(n log n)' | 'O(n^2)' | 'O(n^3)' | 'O(2^n)' | 'O(n!)';

export interface TimeSpaceComplexity {
  time: { best: string; average: string; worst: string };
  space: string;
}

export interface Complexity {
  notation: string;
  name: string;
  class: ComplexityClass;
  color: string;
  growth: (n: number) => number;
}
