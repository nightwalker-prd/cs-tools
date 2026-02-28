/**
 * Prerequisite graph builder and query functions.
 *
 * Builds a DAG (Directed Acyclic Graph) from prerequisite edges,
 * supporting topological sort, dependency queries, and depth calculation.
 */

import type { PrerequisiteEdge, PrerequisiteGraph } from '../types/graph';
import { edgeKey } from '../types/graph';

/**
 * Build a prerequisite graph from a list of edges.
 *
 * @param edges - Directed edges where `from` must be learned before `to`
 * @returns The constructed prerequisite graph
 * @throws Error if a cycle is detected
 */
export function buildGraph(edges: PrerequisiteEdge[]): PrerequisiteGraph {
  const nodes = new Set<string>();
  const dependents = new Map<string, Set<string>>();
  const prerequisites = new Map<string, Set<string>>();
  const weights = new Map<string, number>();

  for (const edge of edges) {
    nodes.add(edge.from);
    nodes.add(edge.to);

    // Forward: from → dependents (topics that depend on `from`)
    if (!dependents.has(edge.from)) {
      dependents.set(edge.from, new Set());
    }
    dependents.get(edge.from)!.add(edge.to);

    // Reverse: to → prerequisites (topics that `to` depends on)
    if (!prerequisites.has(edge.to)) {
      prerequisites.set(edge.to, new Set());
    }
    prerequisites.get(edge.to)!.add(edge.from);

    // Edge weight
    weights.set(edgeKey(edge.from, edge.to), edge.weight ?? 1.0);
  }

  // Ensure all nodes have entries in both maps
  for (const node of nodes) {
    if (!dependents.has(node)) dependents.set(node, new Set());
    if (!prerequisites.has(node)) prerequisites.set(node, new Set());
  }

  const graph: PrerequisiteGraph = { nodes, dependents, prerequisites, weights };

  // Validate no cycles
  if (hasCycle(graph)) {
    throw new Error('Prerequisite graph contains a cycle');
  }

  return graph;
}

/**
 * Topological sort of the graph (Kahn's algorithm).
 *
 * Returns topics in an order where all prerequisites come before
 * their dependents. Useful for determining study order.
 *
 * @param graph - The prerequisite graph
 * @returns Topologically sorted array of topic IDs
 */
export function topologicalSort(graph: PrerequisiteGraph): string[] {
  // In-degree count for each node
  const inDegree = new Map<string, number>();
  for (const node of graph.nodes) {
    const prereqs = graph.prerequisites.get(node);
    inDegree.set(node, prereqs ? prereqs.size : 0);
  }

  // Queue starts with nodes that have no prerequisites
  const queue: string[] = [];
  for (const [node, degree] of inDegree) {
    if (degree === 0) {
      queue.push(node);
    }
  }

  // Sort the initial queue for deterministic ordering
  queue.sort();

  const sorted: string[] = [];

  while (queue.length > 0) {
    const node = queue.shift()!;
    sorted.push(node);

    const deps = graph.dependents.get(node);
    if (deps) {
      // Process in sorted order for determinism
      const sortedDeps = [...deps].sort();
      for (const dep of sortedDeps) {
        const newDegree = (inDegree.get(dep) ?? 0) - 1;
        inDegree.set(dep, newDegree);
        if (newDegree === 0) {
          queue.push(dep);
        }
      }
    }
  }

  return sorted;
}

/**
 * Get all prerequisites of a topic (transitive closure).
 *
 * @param graph - The prerequisite graph
 * @param topicId - The topic to find prerequisites for
 * @returns Set of all prerequisite topic IDs
 */
export function getPrerequisites(
  graph: PrerequisiteGraph,
  topicId: string,
): string[] {
  const result: string[] = [];
  const visited = new Set<string>();
  const queue: string[] = [];

  const directPrereqs = graph.prerequisites.get(topicId);
  if (!directPrereqs) return [];

  for (const prereq of directPrereqs) {
    queue.push(prereq);
    visited.add(prereq);
  }

  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current);

    const prereqs = graph.prerequisites.get(current);
    if (prereqs) {
      for (const prereq of prereqs) {
        if (!visited.has(prereq)) {
          visited.add(prereq);
          queue.push(prereq);
        }
      }
    }
  }

  return result;
}

/**
 * Get all dependents of a topic (transitive closure).
 *
 * @param graph - The prerequisite graph
 * @param topicId - The topic to find dependents for
 * @returns Set of all dependent topic IDs
 */
export function getDependents(
  graph: PrerequisiteGraph,
  topicId: string,
): string[] {
  const result: string[] = [];
  const visited = new Set<string>();
  const queue: string[] = [];

  const directDeps = graph.dependents.get(topicId);
  if (!directDeps) return [];

  for (const dep of directDeps) {
    queue.push(dep);
    visited.add(dep);
  }

  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current);

    const deps = graph.dependents.get(current);
    if (deps) {
      for (const dep of deps) {
        if (!visited.has(dep)) {
          visited.add(dep);
          queue.push(dep);
        }
      }
    }
  }

  return result;
}

/**
 * Get the depth of a topic in the prerequisite graph.
 *
 * Depth is the length of the longest path from a root node
 * (no prerequisites) to this topic.
 *
 * @param graph - The prerequisite graph
 * @param topicId - The topic to find depth for
 * @returns Depth (0 for root topics, higher for deeper topics)
 */
export function getDepth(
  graph: PrerequisiteGraph,
  topicId: string,
): number {
  if (!graph.nodes.has(topicId)) return -1;

  const prereqs = graph.prerequisites.get(topicId);
  if (!prereqs || prereqs.size === 0) return 0;

  // Memoized DFS for depth
  const memo = new Map<string, number>();
  return computeDepth(graph, topicId, memo);
}

function computeDepth(
  graph: PrerequisiteGraph,
  topicId: string,
  memo: Map<string, number>,
): number {
  if (memo.has(topicId)) return memo.get(topicId)!;

  const prereqs = graph.prerequisites.get(topicId);
  if (!prereqs || prereqs.size === 0) {
    memo.set(topicId, 0);
    return 0;
  }

  let maxPrereqDepth = 0;
  for (const prereq of prereqs) {
    maxPrereqDepth = Math.max(maxPrereqDepth, computeDepth(graph, prereq, memo));
  }

  const depth = maxPrereqDepth + 1;
  memo.set(topicId, depth);
  return depth;
}

/**
 * Check if the graph has a cycle using DFS.
 */
function hasCycle(graph: PrerequisiteGraph): boolean {
  const WHITE = 0; // unvisited
  const GRAY = 1;  // in current path
  const BLACK = 2; // fully processed

  const color = new Map<string, number>();
  for (const node of graph.nodes) {
    color.set(node, WHITE);
  }

  function dfs(node: string): boolean {
    color.set(node, GRAY);

    const deps = graph.dependents.get(node);
    if (deps) {
      for (const dep of deps) {
        if (color.get(dep) === GRAY) return true; // back edge = cycle
        if (color.get(dep) === WHITE && dfs(dep)) return true;
      }
    }

    color.set(node, BLACK);
    return false;
  }

  for (const node of graph.nodes) {
    if (color.get(node) === WHITE && dfs(node)) {
      return true;
    }
  }

  return false;
}
