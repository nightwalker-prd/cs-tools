import type { DataStructureInfo } from '../types';

export const binaryTree: DataStructureInfo = {
  id: 'binary-tree',
  name: 'Binary Tree',
  category: 'trees',
  pillar: 'dsa',
  difficulty: 'easy',
  description: 'A hierarchical data structure where each node has at most two children (left and right). The foundation for BSTs, heaps, and many advanced structures.',
  operations: [
    { name: 'Search', average: 'O(n)', worst: 'O(n)' },
    { name: 'Insert', average: 'O(n)', worst: 'O(n)' },
    { name: 'Delete', average: 'O(n)', worst: 'O(n)' },
    { name: 'Traversal', average: 'O(n)', worst: 'O(n)' },
  ],
  useCases: [
    'Hierarchical data representation',
    'Expression trees',
    'Huffman coding',
    'Foundation for BST, heap, trie',
  ],
  keyPoints: [
    'Each node has at most 2 children',
    'Traversals: in-order, pre-order, post-order, level-order',
    'Complete binary tree: all levels filled except possibly the last',
    'Full binary tree: every node has 0 or 2 children',
    'Height of balanced tree: O(log n)',
  ],
};

export const bst: DataStructureInfo = {
  id: 'bst',
  name: 'Binary Search Tree',
  category: 'trees',
  pillar: 'dsa',
  difficulty: 'medium',
  description: 'A binary tree where the left subtree contains only nodes with keys less than the parent, and the right subtree contains only nodes with keys greater than the parent.',
  operations: [
    { name: 'Search', average: 'O(log n)', worst: 'O(n)' },
    { name: 'Insert', average: 'O(log n)', worst: 'O(n)' },
    { name: 'Delete', average: 'O(log n)', worst: 'O(n)' },
    { name: 'Min/Max', average: 'O(log n)', worst: 'O(n)' },
  ],
  useCases: [
    'Dynamic sorted data',
    'Database indexing',
    'Auto-complete and dictionary',
    'Range queries',
  ],
  keyPoints: [
    'In-order traversal produces sorted output',
    'Worst case O(n) when tree degenerates to a linked list',
    'Self-balancing variants: AVL, Red-Black, B-trees',
    'Deletion has 3 cases: leaf, one child, two children',
  ],
};

export const heap: DataStructureInfo = {
  id: 'heap',
  name: 'Heap (Binary Heap)',
  category: 'trees',
  pillar: 'dsa',
  difficulty: 'medium',
  description: 'A complete binary tree where each node satisfies the heap property: in a max-heap, parent >= children; in a min-heap, parent <= children. Efficiently implemented as an array.',
  operations: [
    { name: 'Find min/max', average: 'O(1)', worst: 'O(1)' },
    { name: 'Insert', average: 'O(log n)', worst: 'O(log n)' },
    { name: 'Extract min/max', average: 'O(log n)', worst: 'O(log n)' },
    { name: 'Build heap', average: 'O(n)', worst: 'O(n)' },
  ],
  useCases: [
    'Priority queues',
    'Heap sort',
    "Dijkstra's algorithm",
    'Median finding (two heaps)',
    'Top-K problems',
  ],
  keyPoints: [
    'Complete binary tree stored as array',
    'Parent at index i: children at 2i+1 and 2i+2',
    'Build heap is O(n), not O(n log n)',
    'Min-heap: smallest at root; Max-heap: largest at root',
    'Not suitable for searching arbitrary elements',
  ],
};

export const treeDataStructures: DataStructureInfo[] = [
  binaryTree,
  bst,
  heap,
];
