/**
 * @cstools/data — Shared data package
 *
 * CS algorithms, data structures, systems concepts, and design patterns.
 */

// Types
export type {
  Pillar,
  Difficulty,
  Language,
  Algorithm,
  DataStructureInfo,
  SystemConcept,
  DesignPattern,
} from './types';

// Algorithms
export {
  allAlgorithms,
  sortingAlgorithms,
  searchingAlgorithms,
  graphAlgorithms,
  dynamicAlgorithms,
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  linearSearch,
  binarySearch,
  bfs,
  dfs,
  dijkstra,
  kruskal,
  topologicalSort,
  fibonacci,
  knapsack,
  lcs,
  coinChange,
} from './algorithms';

// Data Structures
export {
  allDataStructures,
  linearDataStructures,
  treeDataStructures,
  graphDataStructures,
  hashDataStructures,
  array,
  linkedList,
  stack,
  queue,
  binaryTree,
  bst,
  heap,
  adjacencyList,
  adjacencyMatrix,
  hashTable,
} from './data-structures';

// Systems
export {
  allSystemConcepts,
  networkingConcepts,
  databaseConcepts,
  osConcepts,
  distributedConcepts,
  tcpIp,
  http,
  dns,
  webSockets,
  sqlVsNosql,
  indexing,
  acid,
  processes,
  threads,
  memoryManagement,
  capTheorem,
  consistencyModels,
  loadBalancing,
} from './systems';

// Patterns
export {
  designPatterns,
  singleton,
  factory,
  observer,
  strategy,
  solidPrinciples,
  generalPrinciples,
} from './patterns';
export type { Principle } from './patterns';
