import type { DataStructureInfo } from '../types';

export const array: DataStructureInfo = {
  id: 'array',
  name: 'Array',
  category: 'linear',
  pillar: 'dsa',
  difficulty: 'easy',
  description: 'A contiguous block of memory storing elements of the same type. Provides O(1) random access by index but O(n) insertion/deletion in the middle.',
  operations: [
    { name: 'Access by index', average: 'O(1)', worst: 'O(1)' },
    { name: 'Search', average: 'O(n)', worst: 'O(n)' },
    { name: 'Insert at end', average: 'O(1)*', worst: 'O(n)' },
    { name: 'Insert at index', average: 'O(n)', worst: 'O(n)' },
    { name: 'Delete', average: 'O(n)', worst: 'O(n)' },
  ],
  useCases: [
    'Random access patterns',
    'Cache-friendly iteration',
    'Stack/queue implementation',
    'Matrix operations',
  ],
  keyPoints: [
    'Contiguous memory layout gives excellent cache performance',
    'Dynamic arrays (ArrayList, vector) amortize resizing to O(1)',
    'Fixed size in most languages; dynamic arrays double capacity when full',
    'Most common data structure in programming',
  ],
};

export const linkedList: DataStructureInfo = {
  id: 'linked-list',
  name: 'Linked List',
  category: 'linear',
  pillar: 'dsa',
  difficulty: 'easy',
  description: 'A sequence of nodes where each node contains data and a pointer to the next node. Supports O(1) insertion/deletion at known positions but O(n) random access.',
  operations: [
    { name: 'Access by index', average: 'O(n)', worst: 'O(n)' },
    { name: 'Search', average: 'O(n)', worst: 'O(n)' },
    { name: 'Insert at head', average: 'O(1)', worst: 'O(1)' },
    { name: 'Insert at tail', average: 'O(1)', worst: 'O(1)' },
    { name: 'Delete (given node)', average: 'O(1)', worst: 'O(1)' },
  ],
  useCases: [
    'Frequent insertions/deletions at arbitrary positions',
    'Implementing stacks and queues',
    'Memory-efficient when size is unknown',
    'Undo functionality in applications',
  ],
  keyPoints: [
    'No random access — must traverse from head',
    'Singly linked: each node points to next',
    'Doubly linked: each node points to next and previous',
    'Uses more memory per element due to pointer overhead',
    'Poor cache locality compared to arrays',
  ],
};

export const stack: DataStructureInfo = {
  id: 'stack',
  name: 'Stack',
  category: 'linear',
  pillar: 'dsa',
  difficulty: 'easy',
  description: 'A Last-In-First-Out (LIFO) data structure. Elements are added and removed from the same end (the top).',
  operations: [
    { name: 'Push', average: 'O(1)', worst: 'O(1)' },
    { name: 'Pop', average: 'O(1)', worst: 'O(1)' },
    { name: 'Peek/Top', average: 'O(1)', worst: 'O(1)' },
    { name: 'Search', average: 'O(n)', worst: 'O(n)' },
  ],
  useCases: [
    'Function call stack',
    'Expression evaluation and parsing',
    'Undo/redo operations',
    'DFS implementation',
    'Balanced parentheses checking',
  ],
  keyPoints: [
    'LIFO: Last In, First Out',
    'Can be implemented with array or linked list',
    'Call stack in programming languages is a stack',
    'Key operations: push, pop, peek — all O(1)',
  ],
};

export const queue: DataStructureInfo = {
  id: 'queue',
  name: 'Queue',
  category: 'linear',
  pillar: 'dsa',
  difficulty: 'easy',
  description: 'A First-In-First-Out (FIFO) data structure. Elements are added at the rear and removed from the front.',
  operations: [
    { name: 'Enqueue', average: 'O(1)', worst: 'O(1)' },
    { name: 'Dequeue', average: 'O(1)', worst: 'O(1)' },
    { name: 'Peek/Front', average: 'O(1)', worst: 'O(1)' },
    { name: 'Search', average: 'O(n)', worst: 'O(n)' },
  ],
  useCases: [
    'BFS implementation',
    'Task scheduling',
    'Print queue, message queue',
    'Buffer for streaming data',
  ],
  keyPoints: [
    'FIFO: First In, First Out',
    'Can be implemented with array (circular) or linked list',
    'Priority queue is a variation using a heap',
    'Deque (double-ended queue) allows operations at both ends',
  ],
};

export const linearDataStructures: DataStructureInfo[] = [
  array,
  linkedList,
  stack,
  queue,
];
