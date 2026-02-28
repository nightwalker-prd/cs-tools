import { describe, it, expect } from 'vitest';
import {
  buildGraph,
  topologicalSort,
  getPrerequisites,
  getDependents,
  getDepth,
} from '../graph/prerequisite-graph';
import {
  getCsPrerequisiteGraph,
  getAllCsTopicIds,
  CS_PREREQUISITE_EDGES,
} from '../graph/cs-prerequisites';
import type { PrerequisiteEdge } from '../types/graph';

// ─── buildGraph ─────────────────────────────────────────────────

describe('buildGraph', () => {
  it('creates graph with correct nodes', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
    ];
    const graph = buildGraph(edges);
    expect(graph.nodes.size).toBe(3);
    expect(graph.nodes.has('A')).toBe(true);
    expect(graph.nodes.has('B')).toBe(true);
    expect(graph.nodes.has('C')).toBe(true);
  });

  it('creates correct forward edges (dependents)', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
    ];
    const graph = buildGraph(edges);
    const deps = graph.dependents.get('A')!;
    expect(deps.has('B')).toBe(true);
    expect(deps.has('C')).toBe(true);
  });

  it('creates correct reverse edges (prerequisites)', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'C' },
      { from: 'B', to: 'C' },
    ];
    const graph = buildGraph(edges);
    const prereqs = graph.prerequisites.get('C')!;
    expect(prereqs.has('A')).toBe(true);
    expect(prereqs.has('B')).toBe(true);
  });

  it('throws on cyclic graph', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
      { from: 'C', to: 'A' },
    ];
    expect(() => buildGraph(edges)).toThrow('cycle');
  });

  it('handles empty edges', () => {
    const graph = buildGraph([]);
    expect(graph.nodes.size).toBe(0);
  });

  it('stores edge weights', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B', weight: 0.8 },
    ];
    const graph = buildGraph(edges);
    expect(graph.weights.get('A→B')).toBe(0.8);
  });

  it('defaults weight to 1.0', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B' },
    ];
    const graph = buildGraph(edges);
    expect(graph.weights.get('A→B')).toBe(1.0);
  });
});

// ─── topologicalSort ────────────────────────────────────────────

describe('topologicalSort', () => {
  it('returns nodes in valid topological order', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'C', to: 'D' },
    ];
    const graph = buildGraph(edges);
    const sorted = topologicalSort(graph);

    // A must come before B and C
    expect(sorted.indexOf('A')).toBeLessThan(sorted.indexOf('B'));
    expect(sorted.indexOf('A')).toBeLessThan(sorted.indexOf('C'));

    // B and C must come before D
    expect(sorted.indexOf('B')).toBeLessThan(sorted.indexOf('D'));
    expect(sorted.indexOf('C')).toBeLessThan(sorted.indexOf('D'));
  });

  it('includes all nodes', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
    ];
    const graph = buildGraph(edges);
    const sorted = topologicalSort(graph);
    expect(sorted).toHaveLength(3);
    expect(sorted).toContain('A');
    expect(sorted).toContain('B');
    expect(sorted).toContain('C');
  });

  it('returns empty for empty graph', () => {
    const graph = buildGraph([]);
    expect(topologicalSort(graph)).toEqual([]);
  });

  it('handles disconnected components', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B' },
      { from: 'C', to: 'D' },
    ];
    const graph = buildGraph(edges);
    const sorted = topologicalSort(graph);
    expect(sorted).toHaveLength(4);
    expect(sorted.indexOf('A')).toBeLessThan(sorted.indexOf('B'));
    expect(sorted.indexOf('C')).toBeLessThan(sorted.indexOf('D'));
  });
});

// ─── getPrerequisites ───────────────────────────────────────────

describe('getPrerequisites', () => {
  it('returns direct prerequisites', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
    ];
    const graph = buildGraph(edges);
    const prereqs = getPrerequisites(graph, 'B');
    expect(prereqs).toContain('A');
  });

  it('returns transitive prerequisites', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
      { from: 'C', to: 'D' },
    ];
    const graph = buildGraph(edges);
    const prereqs = getPrerequisites(graph, 'D');
    expect(prereqs).toContain('A');
    expect(prereqs).toContain('B');
    expect(prereqs).toContain('C');
    expect(prereqs).toHaveLength(3);
  });

  it('returns empty for root nodes', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B' },
    ];
    const graph = buildGraph(edges);
    expect(getPrerequisites(graph, 'A')).toEqual([]);
  });

  it('handles diamond dependencies without duplicates', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'C', to: 'D' },
    ];
    const graph = buildGraph(edges);
    const prereqs = getPrerequisites(graph, 'D');

    // Should have A, B, C — no duplicates
    expect(prereqs).toHaveLength(3);
    const unique = new Set(prereqs);
    expect(unique.size).toBe(prereqs.length);
  });
});

// ─── getDependents ──────────────────────────────────────────────

describe('getDependents', () => {
  it('returns direct dependents', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
    ];
    const graph = buildGraph(edges);
    const deps = getDependents(graph, 'A');
    expect(deps).toContain('B');
    expect(deps).toContain('C');
  });

  it('returns transitive dependents', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
      { from: 'C', to: 'D' },
    ];
    const graph = buildGraph(edges);
    const deps = getDependents(graph, 'A');
    expect(deps).toContain('B');
    expect(deps).toContain('C');
    expect(deps).toContain('D');
  });

  it('returns empty for leaf nodes', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B' },
    ];
    const graph = buildGraph(edges);
    expect(getDependents(graph, 'B')).toEqual([]);
  });
});

// ─── getDepth ───────────────────────────────────────────────────

describe('getDepth', () => {
  it('returns 0 for root nodes', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B' },
    ];
    const graph = buildGraph(edges);
    expect(getDepth(graph, 'A')).toBe(0);
  });

  it('returns 1 for direct dependents of root', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B' },
    ];
    const graph = buildGraph(edges);
    expect(getDepth(graph, 'B')).toBe(1);
  });

  it('returns correct depth for deep chains', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
      { from: 'C', to: 'D' },
    ];
    const graph = buildGraph(edges);
    expect(getDepth(graph, 'A')).toBe(0);
    expect(getDepth(graph, 'B')).toBe(1);
    expect(getDepth(graph, 'C')).toBe(2);
    expect(getDepth(graph, 'D')).toBe(3);
  });

  it('takes longest path for diamond graph', () => {
    const edges: PrerequisiteEdge[] = [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'C', to: 'D' },
    ];
    const graph = buildGraph(edges);
    // D has two paths: A→B→D (length 2) and A→C→D (length 2)
    expect(getDepth(graph, 'D')).toBe(2);
  });

  it('returns -1 for unknown nodes', () => {
    const graph = buildGraph([{ from: 'A', to: 'B' }]);
    expect(getDepth(graph, 'Z')).toBe(-1);
  });
});

// ─── CS Prerequisite Graph ──────────────────────────────────────

describe('CS prerequisite graph', () => {
  it('builds without errors (no cycles)', () => {
    expect(() => getCsPrerequisiteGraph()).not.toThrow();
  });

  it('contains all topics', () => {
    const allIds = getAllCsTopicIds();
    expect(allIds.length).toBeGreaterThan(0);
  });

  it('has all topics in the graph', () => {
    const graph = getCsPrerequisiteGraph();
    const allIds = getAllCsTopicIds();
    for (const id of allIds) {
      expect(graph.nodes.has(id)).toBe(true);
    }
  });

  it('arrays is a root node (depth 0)', () => {
    const graph = getCsPrerequisiteGraph();
    expect(getDepth(graph, 'arrays')).toBe(0);
  });

  it('arrays has many dependents', () => {
    const graph = getCsPrerequisiteGraph();
    const deps = getDependents(graph, 'arrays');
    // arrays is the foundation — should reach most topics
    expect(deps.length).toBeGreaterThan(20);
  });

  it('binary-trees depends on linked-lists', () => {
    const graph = getCsPrerequisiteGraph();
    const prereqs = getPrerequisites(graph, 'binary-trees');
    expect(prereqs).toContain('linked-lists');
  });

  it('bfs depends on graphs and queues', () => {
    const graph = getCsPrerequisiteGraph();
    const prereqs = getPrerequisites(graph, 'bfs');
    expect(prereqs).toContain('graphs');
    expect(prereqs).toContain('queues');
  });

  it('dijkstra depends on bfs and priority-queues', () => {
    const graph = getCsPrerequisiteGraph();
    const directPrereqs = graph.prerequisites.get('dijkstra');
    expect(directPrereqs?.has('bfs')).toBe(true);
    expect(directPrereqs?.has('priority-queues')).toBe(true);
  });

  it('knapsack depends on tabulation', () => {
    const graph = getCsPrerequisiteGraph();
    const prereqs = getPrerequisites(graph, 'knapsack');
    expect(prereqs).toContain('tabulation');
  });

  it('produces a valid topological sort', () => {
    const graph = getCsPrerequisiteGraph();
    const sorted = topologicalSort(graph);
    const allIds = getAllCsTopicIds();

    // Verify all topics are present
    expect(sorted).toHaveLength(allIds.length);

    // Verify ordering: for each edge, from appears before to
    for (const edge of CS_PREREQUISITE_EDGES) {
      const fromIdx = sorted.indexOf(edge.from);
      const toIdx = sorted.indexOf(edge.to);
      expect(fromIdx).toBeLessThan(toIdx);
    }
  });

  it('advanced topics have higher depth than basic ones', () => {
    const graph = getCsPrerequisiteGraph();

    const arraysDepth = getDepth(graph, 'arrays');
    const binaryTreesDepth = getDepth(graph, 'binary-trees');
    const bstDepth = getDepth(graph, 'bst');
    const dijkstraDepth = getDepth(graph, 'dijkstra');

    expect(arraysDepth).toBeLessThan(binaryTreesDepth);
    expect(binaryTreesDepth).toBeLessThan(bstDepth);
    expect(binaryTreesDepth).toBeLessThan(dijkstraDepth);
  });
});
