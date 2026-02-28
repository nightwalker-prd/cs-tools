export { sortingAlgorithms, bubbleSort, insertionSort, mergeSort, quickSort, heapSort } from './sorting';
export { searchingAlgorithms, linearSearch, binarySearch, bfs, dfs } from './searching';
export { graphAlgorithms, dijkstra, kruskal, topologicalSort } from './graph';
export { dynamicAlgorithms, fibonacci, knapsack, lcs, coinChange } from './dynamic';

import { sortingAlgorithms } from './sorting';
import { searchingAlgorithms } from './searching';
import { graphAlgorithms } from './graph';
import { dynamicAlgorithms } from './dynamic';

export const allAlgorithms = [
  ...sortingAlgorithms,
  ...searchingAlgorithms,
  ...graphAlgorithms,
  ...dynamicAlgorithms,
];
