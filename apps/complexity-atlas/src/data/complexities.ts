export interface ComplexityEntry {
  name: string;
  category: 'sorting' | 'searching' | 'data-structure' | 'graph';
  time: { best: string; average: string; worst: string };
  space: string;
  stable?: boolean;
  notes?: string;
}

export const algorithms: ComplexityEntry[] = [
  { name: 'Bubble Sort', category: 'sorting', time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' }, space: 'O(1)', stable: true },
  { name: 'Selection Sort', category: 'sorting', time: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' }, space: 'O(1)', stable: false },
  { name: 'Insertion Sort', category: 'sorting', time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' }, space: 'O(1)', stable: true },
  { name: 'Merge Sort', category: 'sorting', time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' }, space: 'O(n)', stable: true },
  { name: 'Quick Sort', category: 'sorting', time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' }, space: 'O(log n)', stable: false },
  { name: 'Heap Sort', category: 'sorting', time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' }, space: 'O(1)', stable: false },
  { name: 'Counting Sort', category: 'sorting', time: { best: 'O(n+k)', average: 'O(n+k)', worst: 'O(n+k)' }, space: 'O(k)', stable: true, notes: 'k = range of input' },
  { name: 'Radix Sort', category: 'sorting', time: { best: 'O(nk)', average: 'O(nk)', worst: 'O(nk)' }, space: 'O(n+k)', stable: true, notes: 'k = number of digits' },
  { name: 'Linear Search', category: 'searching', time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' }, space: 'O(1)' },
  { name: 'Binary Search', category: 'searching', time: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' }, space: 'O(1)' },
  { name: 'BFS', category: 'graph', time: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' }, space: 'O(V)' },
  { name: 'DFS', category: 'graph', time: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' }, space: 'O(V)' },
  { name: "Dijkstra's", category: 'graph', time: { best: 'O(V+E log V)', average: 'O(V+E log V)', worst: 'O(V²)' }, space: 'O(V)', notes: 'With min-heap' },
  { name: 'Tim Sort', category: 'sorting', time: { best: 'O(n)', average: 'O(n log n)', worst: 'O(n log n)' }, space: 'O(n)', stable: true },
  { name: 'Bucket Sort', category: 'sorting', time: { best: 'O(n+k)', average: 'O(n+k)', worst: 'O(n²)' }, space: 'O(n)', notes: 'k = number of buckets' },
  { name: 'Shell Sort', category: 'sorting', time: { best: 'O(n log n)', average: 'O(n^(4/3))', worst: 'O(n²)' }, space: 'O(1)', notes: 'Depends on gap sequence' },
  { name: 'Bellman-Ford', category: 'graph', time: { best: 'O(VE)', average: 'O(VE)', worst: 'O(VE)' }, space: 'O(V)', notes: 'Handles negative weights' },
  { name: 'Floyd-Warshall', category: 'graph', time: { best: 'O(V³)', average: 'O(V³)', worst: 'O(V³)' }, space: 'O(V²)', notes: 'All-pairs shortest path' },
  { name: 'A* Search', category: 'graph', time: { best: 'O(E)', average: 'O(E)', worst: 'O(V²)' }, space: 'O(V)', notes: 'Depends on heuristic' },
  { name: "Kruskal's MST", category: 'graph', time: { best: 'O(E log E)', average: 'O(E log E)', worst: 'O(E log E)' }, space: 'O(V)', notes: 'Uses union-find' },
  { name: "Prim's MST", category: 'graph', time: { best: 'O(V+E log V)', average: 'O(V+E log V)', worst: 'O(V+E log V)' }, space: 'O(V)', notes: 'With binary heap' },
];

export interface DSComplexity {
  name: string;
  access: string;
  search: string;
  insert: string;
  delete: string;
  spaceNote?: string;
}

export const dataStructures: DSComplexity[] = [
  { name: 'Array', access: 'O(1)', search: 'O(n)', insert: 'O(n)', delete: 'O(n)' },
  { name: 'Linked List', access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)', spaceNote: 'Insert/delete at known position' },
  { name: 'Stack', access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)' },
  { name: 'Queue', access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)' },
  { name: 'Hash Table', access: 'N/A', search: 'O(1)*', insert: 'O(1)*', delete: 'O(1)*', spaceNote: '*Average case' },
  { name: 'BST', access: 'O(log n)*', search: 'O(log n)*', insert: 'O(log n)*', delete: 'O(log n)*', spaceNote: '*Balanced' },
  { name: 'Heap', access: 'O(1)', search: 'O(n)', insert: 'O(log n)', delete: 'O(log n)', spaceNote: 'Access is peek (min/max)' },
  { name: 'Trie', access: 'O(m)', search: 'O(m)', insert: 'O(m)', delete: 'O(m)', spaceNote: 'm = key length' },
  { name: 'AVL Tree', access: 'O(log n)', search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)', spaceNote: 'Self-balancing BST' },
  { name: 'Red-Black Tree', access: 'O(log n)', search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)', spaceNote: 'Self-balancing BST' },
  { name: 'B-Tree', access: 'O(log n)', search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)', spaceNote: 'Used in databases & filesystems' },
  { name: 'Skip List', access: 'O(log n)', search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)', spaceNote: 'Average case, O(n) worst' },
  { name: 'Bloom Filter', access: 'N/A', search: 'O(1)', insert: 'O(1)', delete: 'N/A', spaceNote: 'Probabilistic; false positives possible' },
  { name: 'Disjoint Set', access: 'N/A', search: 'O(\u03B1(n))', insert: 'O(\u03B1(n))', delete: 'O(\u03B1(n))', spaceNote: '\u03B1 = inverse Ackermann function' },
];
