import type { ComplexityClass } from '../types/complexity';

export function complexityToColor(c: string): string {
  const map: Record<string, string> = {
    'O(1)': '#3FB950',
    'O(log n)': '#58A6FF',
    'O(n)': '#D2A8FF',
    'O(n log n)': '#D29922',
    'O(n^2)': '#FFA657',
    'O(n^3)': '#FF7B72',
    'O(2^n)': '#F85149',
    'O(n!)': '#F85149',
  };
  return map[c] || '#8B949E';
}

export function formatBigO(notation: string): string {
  return notation
    .replace(/\^(\d+)/g, '<sup>$1</sup>')
    .replace(/log n/g, 'log n');
}

export function compareComplexity(a: ComplexityClass, b: ComplexityClass): number {
  const order: ComplexityClass[] = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n^2)', 'O(n^3)', 'O(2^n)', 'O(n!)'];
  return order.indexOf(a) - order.indexOf(b);
}

export function estimateOperations(complexity: ComplexityClass, n: number): number {
  const fns: Record<ComplexityClass, (n: number) => number> = {
    'O(1)': () => 1,
    'O(log n)': (n) => Math.log2(n),
    'O(n)': (n) => n,
    'O(n log n)': (n) => n * Math.log2(n),
    'O(n^2)': (n) => n * n,
    'O(n^3)': (n) => n * n * n,
    'O(2^n)': (n) => Math.pow(2, n),
    'O(n!)': (n) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; },
  };
  return fns[complexity]?.(n) ?? n;
}
