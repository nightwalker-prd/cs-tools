import type { DataStructureInfo } from '../types';

export const hashTable: DataStructureInfo = {
  id: 'hash-table',
  name: 'Hash Table',
  category: 'hash',
  pillar: 'dsa',
  difficulty: 'medium',
  description: 'A data structure that maps keys to values using a hash function. Provides average O(1) lookup, insert, and delete operations.',
  operations: [
    { name: 'Search', average: 'O(1)', worst: 'O(n)' },
    { name: 'Insert', average: 'O(1)', worst: 'O(n)' },
    { name: 'Delete', average: 'O(1)', worst: 'O(n)' },
  ],
  useCases: [
    'Caching and memoization',
    'Database indexing',
    'Symbol tables in compilers',
    'Counting frequencies',
    'Deduplication',
  ],
  keyPoints: [
    'Average O(1) for search, insert, delete',
    'Worst case O(n) when all keys hash to same bucket',
    'Collision resolution: chaining (linked lists) or open addressing (linear/quadratic probing)',
    'Load factor = n/m; resize when load factor exceeds threshold',
    'Good hash function distributes keys uniformly',
  ],
};

export const hashDataStructures: DataStructureInfo[] = [
  hashTable,
];
