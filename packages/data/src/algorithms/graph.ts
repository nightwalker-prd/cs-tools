import type { Algorithm } from '../types';

export const dijkstra: Algorithm = {
  id: 'dijkstra',
  name: "Dijkstra's Algorithm",
  category: 'graph',
  pillar: 'dsa',
  difficulty: 'medium',
  description: 'Finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights. Uses a priority queue to greedily select the closest unvisited vertex.',
  timeComplexity: { best: 'O((V + E) log V)', average: 'O((V + E) log V)', worst: 'O((V + E) log V)' },
  spaceComplexity: 'O(V)',
  pseudocode: [
    'dist[source] = 0, dist[all others] = infinity',
    'pq = min-heap with (0, source)',
    'while pq is not empty:',
    '  (d, u) = pq.extractMin()',
    '  for each neighbor v of u:',
    '    if dist[u] + weight(u,v) < dist[v]:',
    '      dist[v] = dist[u] + weight(u,v)',
    '      pq.insert((dist[v], v))',
  ],
  keyPoints: [
    'Only works with non-negative edge weights',
    'Greedy algorithm using a priority queue',
    'O((V + E) log V) with a binary heap',
    'Foundation for many routing protocols (OSPF)',
    'For negative weights, use Bellman-Ford instead',
  ],
};

export const kruskal: Algorithm = {
  id: 'kruskal',
  name: "Kruskal's Algorithm",
  category: 'graph',
  pillar: 'dsa',
  difficulty: 'medium',
  description: 'Finds the minimum spanning tree of a connected weighted graph by sorting all edges and adding them one by one if they do not form a cycle, using Union-Find.',
  timeComplexity: { best: 'O(E log E)', average: 'O(E log E)', worst: 'O(E log E)' },
  spaceComplexity: 'O(V)',
  pseudocode: [
    'sort edges by weight',
    'initialize Union-Find for V vertices',
    'for each edge (u, v, w) in sorted order:',
    '  if find(u) != find(v):',
    '    union(u, v)',
    '    add edge to MST',
  ],
  keyPoints: [
    'Produces a minimum spanning tree',
    'Uses Union-Find (Disjoint Set) data structure',
    'Edge-centric: processes edges in weight order',
    'Good for sparse graphs',
    'Total MST weight is optimal',
  ],
};

export const topologicalSort: Algorithm = {
  id: 'topological-sort',
  name: 'Topological Sort',
  category: 'graph',
  pillar: 'dsa',
  difficulty: 'medium',
  description: 'Produces a linear ordering of vertices in a directed acyclic graph (DAG) such that for every directed edge (u, v), vertex u comes before v.',
  timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
  spaceComplexity: 'O(V)',
  pseudocode: [
    "Kahn's Algorithm (BFS-based):",
    'compute in-degree for each vertex',
    'enqueue all vertices with in-degree 0',
    'while queue is not empty:',
    '  u = queue.dequeue(), add u to result',
    '  for each neighbor v of u:',
    '    in-degree[v] -= 1',
    '    if in-degree[v] == 0: queue.enqueue(v)',
  ],
  keyPoints: [
    'Only works on directed acyclic graphs (DAGs)',
    'Used for task scheduling, build systems, course prerequisites',
    'Can detect cycles: if result has fewer than V vertices, a cycle exists',
    'Multiple valid orderings may exist',
  ],
};

export const graphAlgorithms: Algorithm[] = [
  dijkstra,
  kruskal,
  topologicalSort,
];
