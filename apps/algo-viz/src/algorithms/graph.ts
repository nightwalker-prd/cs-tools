export interface GraphNode {
  id: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface GraphStep {
  type: 'graph';
  visited: string[];
  current: string | null;
  queue: string[];
  description: string;
  line: number;
}

/**
 * Default graph with 8 nodes arranged in a network layout.
 *
 *        A
 *       / \
 *      B   C
 *     / \   \
 *    D   E   F
 *     \   \ /
 *      G   H
 */
export const DEFAULT_GRAPH: Graph = {
  nodes: [
    { id: 'A', x: 50, y: 5 },
    { id: 'B', x: 25, y: 30 },
    { id: 'C', x: 75, y: 30 },
    { id: 'D', x: 10, y: 60 },
    { id: 'E', x: 40, y: 60 },
    { id: 'F', x: 80, y: 60 },
    { id: 'G', x: 20, y: 90 },
    { id: 'H', x: 60, y: 90 },
  ],
  edges: [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'B', to: 'E' },
    { from: 'C', to: 'F' },
    { from: 'D', to: 'G' },
    { from: 'E', to: 'H' },
    { from: 'F', to: 'H' },
  ],
};

function getNeighbors(graph: Graph, nodeId: string): string[] {
  const neighbors: string[] = [];
  for (const edge of graph.edges) {
    if (edge.from === nodeId) neighbors.push(edge.to);
    if (edge.to === nodeId) neighbors.push(edge.from);
  }
  return neighbors;
}

export function bfs(graph: Graph, start: string): GraphStep[] {
  const steps: GraphStep[] = [];
  const visited = new Set<string>();
  const queue: string[] = [start];

  steps.push({
    type: 'graph',
    visited: [],
    current: null,
    queue: [start],
    description: `Initialize BFS from node ${start}. Add ${start} to queue.`,
    line: 0,
  });

  visited.add(start);

  while (queue.length > 0) {
    const current = queue.shift()!;

    steps.push({
      type: 'graph',
      visited: [...visited].filter(v => v !== current),
      current,
      queue: [...queue],
      description: `Dequeue node ${current}. Process it.`,
      line: 3,
    });

    const neighbors = getNeighbors(graph, current);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);

        steps.push({
          type: 'graph',
          visited: [...visited].filter(v => v !== current),
          current,
          queue: [...queue],
          description: `Discover neighbor ${neighbor}. Add to queue.`,
          line: 5,
        });
      }
    }

    steps.push({
      type: 'graph',
      visited: [...visited],
      current: null,
      queue: [...queue],
      description: `Node ${current} fully explored.`,
      line: 7,
    });
  }

  steps.push({
    type: 'graph',
    visited: [...visited],
    current: null,
    queue: [],
    description: 'BFS traversal complete. All reachable nodes visited.',
    line: 9,
  });

  return steps;
}

export function dfs(graph: Graph, start: string): GraphStep[] {
  const steps: GraphStep[] = [];
  const visited = new Set<string>();
  const stack: string[] = [start];

  steps.push({
    type: 'graph',
    visited: [],
    current: null,
    queue: [start],
    description: `Initialize DFS from node ${start}. Push ${start} to stack.`,
    line: 0,
  });

  while (stack.length > 0) {
    const current = stack.pop()!;

    if (visited.has(current)) {
      continue;
    }

    visited.add(current);

    steps.push({
      type: 'graph',
      visited: [...visited].filter(v => v !== current),
      current,
      queue: [...stack],
      description: `Pop node ${current} from stack. Visit it.`,
      line: 3,
    });

    const neighbors = getNeighbors(graph, current).reverse();
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);

        steps.push({
          type: 'graph',
          visited: [...visited],
          current,
          queue: [...stack],
          description: `Push neighbor ${neighbor} onto stack.`,
          line: 5,
        });
      }
    }

    steps.push({
      type: 'graph',
      visited: [...visited],
      current: null,
      queue: [...stack],
      description: `Node ${current} fully explored.`,
      line: 7,
    });
  }

  steps.push({
    type: 'graph',
    visited: [...visited],
    current: null,
    queue: [],
    description: 'DFS traversal complete. All reachable nodes visited.',
    line: 9,
  });

  return steps;
}

export const GRAPH_PSEUDOCODE: Record<string, string[]> = {
  bfs: [
    'function BFS(graph, start):',
    '  queue = [start]',
    '  visited = {start}',
    '  while queue is not empty:',
    '    node = queue.dequeue()',
    '    for neighbor of node:',
    '      if neighbor not visited:',
    '        visited.add(neighbor)',
    '        queue.enqueue(neighbor)',
    '  return visited',
  ],
  dfs: [
    'function DFS(graph, start):',
    '  stack = [start]',
    '  visited = {}',
    '  while stack is not empty:',
    '    node = stack.pop()',
    '    if node not visited:',
    '      visited.add(node)',
    '      for neighbor of node:',
    '        stack.push(neighbor)',
    '  return visited',
  ],
};
