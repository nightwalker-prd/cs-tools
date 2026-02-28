import type { PrerequisiteEdge } from '../types/graph';
import { buildGraph } from './prerequisite-graph';

export const CS_TOPIC_IDS = {
  // Unit 1: Foundations
  unit1: [
    'arrays', 'strings', 'linked-lists', 'stacks', 'queues',
    'hash-tables', 'recursion', 'big-o-notation',
  ],
  // Unit 2: Trees & Graphs
  unit2: [
    'binary-trees', 'bst', 'heaps', 'priority-queues',
    'graphs', 'bfs', 'dfs', 'topological-sort',
  ],
  // Unit 3: Sorting & Searching
  unit3: [
    'bubble-sort', 'insertion-sort', 'merge-sort', 'quick-sort',
    'binary-search', 'counting-sort', 'heap-sort',
  ],
  // Unit 4: Advanced DS
  unit4: [
    'tries', 'segment-trees', 'union-find', 'balanced-bst', 'skip-lists',
  ],
  // Unit 5: Dynamic Programming
  unit5: [
    'memoization', 'tabulation', 'knapsack', 'longest-common-subsequence',
    'edit-distance', 'coin-change',
  ],
  // Unit 6: Advanced Algorithms
  unit6: [
    'dijkstra', 'bellman-ford', 'minimum-spanning-tree',
    'network-flow', 'string-matching',
  ],
};

export const CS_PREREQUISITE_EDGES: PrerequisiteEdge[] = [
  // Unit 1 foundations
  { from: 'arrays', to: 'strings' },
  { from: 'arrays', to: 'linked-lists' },
  { from: 'arrays', to: 'hash-tables' },
  { from: 'linked-lists', to: 'stacks' },
  { from: 'linked-lists', to: 'queues' },
  { from: 'arrays', to: 'recursion' },
  { from: 'arrays', to: 'big-o-notation' },

  // Unit 1 -> Unit 2
  { from: 'linked-lists', to: 'binary-trees' },
  { from: 'recursion', to: 'binary-trees' },
  { from: 'binary-trees', to: 'bst' },
  { from: 'binary-trees', to: 'heaps' },
  { from: 'heaps', to: 'priority-queues' },
  { from: 'linked-lists', to: 'graphs' },
  { from: 'hash-tables', to: 'graphs' },
  { from: 'graphs', to: 'bfs' },
  { from: 'graphs', to: 'dfs' },
  { from: 'queues', to: 'bfs' },
  { from: 'stacks', to: 'dfs' },
  { from: 'dfs', to: 'topological-sort' },

  // Unit 1 -> Unit 3
  { from: 'arrays', to: 'bubble-sort' },
  { from: 'arrays', to: 'insertion-sort' },
  { from: 'recursion', to: 'merge-sort' },
  { from: 'arrays', to: 'merge-sort' },
  { from: 'recursion', to: 'quick-sort' },
  { from: 'arrays', to: 'quick-sort' },
  { from: 'arrays', to: 'binary-search' },
  { from: 'big-o-notation', to: 'binary-search' },
  { from: 'arrays', to: 'counting-sort' },
  { from: 'heaps', to: 'heap-sort' },

  // Unit 2 -> Unit 4
  { from: 'binary-trees', to: 'tries' },
  { from: 'binary-trees', to: 'segment-trees' },
  { from: 'graphs', to: 'union-find' },
  { from: 'bst', to: 'balanced-bst' },
  { from: 'linked-lists', to: 'skip-lists' },

  // Unit 1+2 -> Unit 5
  { from: 'recursion', to: 'memoization' },
  { from: 'arrays', to: 'tabulation' },
  { from: 'memoization', to: 'tabulation' },
  { from: 'tabulation', to: 'knapsack' },
  { from: 'tabulation', to: 'longest-common-subsequence' },
  { from: 'strings', to: 'longest-common-subsequence' },
  { from: 'tabulation', to: 'edit-distance' },
  { from: 'strings', to: 'edit-distance' },
  { from: 'tabulation', to: 'coin-change' },

  // Unit 2+3 -> Unit 6
  { from: 'bfs', to: 'dijkstra' },
  { from: 'priority-queues', to: 'dijkstra' },
  { from: 'graphs', to: 'bellman-ford' },
  { from: 'dijkstra', to: 'bellman-ford' },
  { from: 'graphs', to: 'minimum-spanning-tree' },
  { from: 'union-find', to: 'minimum-spanning-tree' },
  { from: 'graphs', to: 'network-flow' },
  { from: 'bfs', to: 'network-flow' },
  { from: 'strings', to: 'string-matching' },
  { from: 'tabulation', to: 'string-matching' },
];

let _cachedGraph: ReturnType<typeof buildGraph> | null = null;

export function getCsPrerequisiteGraph(): ReturnType<typeof buildGraph> {
  if (!_cachedGraph) {
    _cachedGraph = buildGraph(CS_PREREQUISITE_EDGES);
  }
  return _cachedGraph;
}

export function getAllCsTopicIds(): string[] {
  return [
    ...CS_TOPIC_IDS.unit1,
    ...CS_TOPIC_IDS.unit2,
    ...CS_TOPIC_IDS.unit3,
    ...CS_TOPIC_IDS.unit4,
    ...CS_TOPIC_IDS.unit5,
    ...CS_TOPIC_IDS.unit6,
  ];
}
