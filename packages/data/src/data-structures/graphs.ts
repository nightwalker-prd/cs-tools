import type { DataStructureInfo } from '../types';

export const adjacencyList: DataStructureInfo = {
  id: 'adjacency-list',
  name: 'Adjacency List',
  category: 'graphs',
  pillar: 'dsa',
  difficulty: 'medium',
  description: 'A graph representation where each vertex stores a list of its adjacent vertices. Space-efficient for sparse graphs.',
  operations: [
    { name: 'Add vertex', average: 'O(1)', worst: 'O(1)' },
    { name: 'Add edge', average: 'O(1)', worst: 'O(1)' },
    { name: 'Remove edge', average: 'O(E/V)', worst: 'O(V)' },
    { name: 'Check adjacency', average: 'O(E/V)', worst: 'O(V)' },
    { name: 'Get neighbors', average: 'O(degree)', worst: 'O(V)' },
  ],
  useCases: [
    'Sparse graphs',
    'Social networks',
    'Web page links',
    'Most graph algorithms in practice',
  ],
  keyPoints: [
    'Space: O(V + E)',
    'Preferred for sparse graphs (E << V^2)',
    'Iterating neighbors is efficient',
    'Can use array of lists, hash map, or linked lists',
  ],
};

export const adjacencyMatrix: DataStructureInfo = {
  id: 'adjacency-matrix',
  name: 'Adjacency Matrix',
  category: 'graphs',
  pillar: 'dsa',
  difficulty: 'medium',
  description: 'A graph representation using a 2D matrix where entry [i][j] indicates whether an edge exists between vertices i and j. Fast edge lookup but space-intensive.',
  operations: [
    { name: 'Add edge', average: 'O(1)', worst: 'O(1)' },
    { name: 'Remove edge', average: 'O(1)', worst: 'O(1)' },
    { name: 'Check adjacency', average: 'O(1)', worst: 'O(1)' },
    { name: 'Get neighbors', average: 'O(V)', worst: 'O(V)' },
  ],
  useCases: [
    'Dense graphs',
    'Weighted graphs with frequent edge queries',
    'Floyd-Warshall algorithm',
    'Small graphs where space is not a concern',
  ],
  keyPoints: [
    'Space: O(V^2)',
    'O(1) edge lookup',
    'Preferred for dense graphs',
    'Symmetric matrix for undirected graphs',
    'Wastes space for sparse graphs',
  ],
};

export const graphDataStructures: DataStructureInfo[] = [
  adjacencyList,
  adjacencyMatrix,
];
