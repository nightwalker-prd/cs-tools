/**
 * Implicit credit assignment via prerequisite graph traversal.
 *
 * When a topic is reviewed successfully, partial credit flows backward
 * through the prerequisite graph to related topics. This models the
 * insight that reviewing advanced topics reinforces understanding of
 * their prerequisites.
 *
 * Credit decays with graph distance:
 * - Direct prerequisite: 50% credit
 * - 2 hops away: 30% credit
 * - 3 hops away: 15% credit
 * - 4+ hops: no credit
 */

import type { PrerequisiteGraph } from '../types/graph';
import type { SrsItem } from '../types/items';
import type { ResponseQuality } from '../types/reviews';

/** Credit decay factors by distance (hops) */
const CREDIT_DECAY: ReadonlyArray<number> = [
  1.0,  // 0 hops (the reviewed item itself)
  0.5,  // 1 hop (direct prerequisite)
  0.3,  // 2 hops
  0.15, // 3 hops
];

/** Maximum hops for credit propagation */
const MAX_HOPS = 3;

/**
 * Result of credit assignment for a single item.
 */
export interface CreditAssignment {
  /** Topic ID receiving credit */
  topicId: string;
  /** Credit factor (0-1) */
  credit: number;
  /** Distance from the reviewed topic */
  hops: number;
}

/**
 * Calculate implicit credit for prerequisite topics when a topic is reviewed.
 *
 * Uses BFS traversal backward through the prerequisite graph.
 * Credit decays based on graph distance.
 *
 * @param graph - The prerequisite graph
 * @param reviewedTopicId - The topic that was just reviewed
 * @param quality - Quality of the review (only positive reviews give credit)
 * @returns Array of credit assignments for prerequisite topics
 */
export function calculateImplicitCredit(
  graph: PrerequisiteGraph,
  reviewedTopicId: string,
  quality: ResponseQuality,
): CreditAssignment[] {
  // Only successful reviews propagate credit
  if (quality === 0) return [];

  // Quality factor: Easy gives more credit than Hard
  const qualityFactor = quality / 3; // 0.33 for Hard, 0.67 for Good, 1.0 for Easy

  const assignments: CreditAssignment[] = [];
  const visited = new Set<string>();

  // BFS backward through prerequisites
  const queue: Array<{ topicId: string; hops: number }> = [];

  // Start from the reviewed topic's prerequisites
  const directPrereqs = graph.prerequisites.get(reviewedTopicId);
  if (!directPrereqs) return [];

  visited.add(reviewedTopicId);

  for (const prereqId of directPrereqs) {
    if (!visited.has(prereqId)) {
      queue.push({ topicId: prereqId, hops: 1 });
      visited.add(prereqId);
    }
  }

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (current.hops > MAX_HOPS) continue;

    const decayFactor = CREDIT_DECAY[current.hops] ?? 0;
    const credit = decayFactor * qualityFactor;

    if (credit > 0) {
      assignments.push({
        topicId: current.topicId,
        credit,
        hops: current.hops,
      });
    }

    // Continue BFS to further prerequisites
    if (current.hops < MAX_HOPS) {
      const prereqs = graph.prerequisites.get(current.topicId);
      if (prereqs) {
        for (const prereqId of prereqs) {
          if (!visited.has(prereqId)) {
            queue.push({ topicId: prereqId, hops: current.hops + 1 });
            visited.add(prereqId);
          }
        }
      }
    }
  }

  return assignments;
}

/**
 * Apply implicit credit to SRS items, adjusting their stability.
 *
 * Credit is applied as a small stability boost — the prerequisite topics
 * have their stability increased proportionally to the credit factor.
 *
 * @param items - All SRS items (will find matching items by contentId)
 * @param credits - Credit assignments from calculateImplicitCredit
 * @param stabilityBoostFactor - How much credit translates to stability (default 0.1)
 * @returns Updated items array (new objects for changed items)
 */
export function applyImplicitCredit(
  items: SrsItem[],
  credits: CreditAssignment[],
  stabilityBoostFactor: number = 0.1,
): SrsItem[] {
  if (credits.length === 0) return items;

  // Build lookup: topicId → credit
  const creditMap = new Map<string, number>();
  for (const assignment of credits) {
    const existing = creditMap.get(assignment.topicId) ?? 0;
    creditMap.set(assignment.topicId, Math.max(existing, assignment.credit));
  }

  return items.map(item => {
    const credit = creditMap.get(item.contentId);
    if (credit === undefined || item.phase === 'new') return item;

    // Apply stability boost proportional to credit
    const boost = item.stability * stabilityBoostFactor * credit;
    return {
      ...item,
      stability: item.stability + boost,
    };
  });
}

/**
 * Get the credit decay factor for a given number of hops.
 */
export function getCreditDecay(hops: number): number {
  if (hops < 0 || hops >= CREDIT_DECAY.length) return 0;
  return CREDIT_DECAY[hops];
}
