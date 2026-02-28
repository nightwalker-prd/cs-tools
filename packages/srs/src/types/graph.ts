/**
 * Prerequisite graph types for topic dependencies.
 */

/**
 * A directed edge in the prerequisite graph.
 * `from` must be learned before `to`.
 */
export interface PrerequisiteEdge {
  /** The prerequisite topic ID */
  from: string;
  /** The dependent topic ID */
  to: string;
  /** Optional weight for credit propagation (default 1.0) */
  weight?: number;
}

/**
 * Adjacency list representation of the prerequisite DAG.
 */
export interface PrerequisiteGraph {
  /** All topic IDs in the graph */
  nodes: Set<string>;
  /** Forward edges: topic → topics that depend on it */
  dependents: Map<string, Set<string>>;
  /** Reverse edges: topic → topics it depends on */
  prerequisites: Map<string, Set<string>>;
  /** Edge weights for credit propagation */
  weights: Map<string, number>;
}

/**
 * Creates a weight key from an edge pair.
 */
export function edgeKey(from: string, to: string): string {
  return `${from}→${to}`;
}
