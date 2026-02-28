/**
 * Cross-pillar interleaving engine.
 *
 * Mixes items from different pillars to create varied study sessions.
 * Rules:
 * 1. Round-robin across pillars, never >3 same pillar consecutively
 * 2. Overdue items get priority boost
 * 3. New items distributed at ~20% of session
 * 4. Question type escalation based on review count
 */

import type { SrsItem, Pillar, QuestionType } from '../types/items';
import type { SessionItem } from '../types/sessions';

/** Maximum same-pillar items in a row */
const MAX_CONSECUTIVE_SAME_PILLAR = 3;

/**
 * Interleave items from different pillars into a balanced session queue.
 *
 * @param dueItems - Items that are due for review (sorted by priority)
 * @param newItems - New items to introduce
 * @param maxItems - Maximum session size
 * @param newRatio - Target ratio of new items (0-1)
 * @param now - Current timestamp for overdue calculation
 * @returns Ordered session queue
 */
export function interleaveItems(
  dueItems: SrsItem[],
  newItems: SrsItem[],
  maxItems: number = 30,
  newRatio: number = 0.2,
  now: number = Date.now(),
): SessionItem[] {
  // Calculate how many new items to include
  const maxNew = Math.floor(maxItems * newRatio);
  const selectedNew = newItems.slice(0, maxNew);
  const remainingSlots = maxItems - selectedNew.length;
  const selectedDue = dueItems.slice(0, remainingSlots);

  // Score and sort all items by priority
  const scoredDue = selectedDue.map(item => ({
    item,
    score: calculatePriorityScore(item, now),
    isNew: false,
  }));

  const scoredNew = selectedNew.map(item => ({
    item,
    score: 0, // new items are interspersed, not priority-sorted
    isNew: true,
  }));

  // Sort due items by priority (highest first)
  scoredDue.sort((a, b) => b.score - a.score);

  // Interleave new items among due items
  const merged = distributeNewItems(scoredDue, scoredNew, maxItems);

  // Apply consecutive pillar constraint
  const balanced = enforcePillarLimit(merged);

  // Assign question types and positions
  return balanced.map((entry, index) => ({
    srsItem: entry.item,
    questionType: escalateQuestionType(entry.item),
    position: index,
  }));
}

/**
 * Calculate priority score for a due item.
 * Higher score = should be reviewed sooner.
 *
 * Factors:
 * - Overdue ratio: how far past due (major factor)
 * - Phase: relearning items get a boost
 * - Lapses: items with many lapses need attention
 */
export function calculatePriorityScore(
  item: SrsItem,
  now: number = Date.now(),
): number {
  let score = 0;

  // Overdue factor: (time past due) / (scheduled interval)
  if (item.due <= now) {
    const overdueDays = (now - item.due) / (1000 * 60 * 60 * 24);
    const scheduledDays = Math.max(item.scheduled_days, 0.01);
    score += 10 * (overdueDays / scheduledDays);
  }

  // Phase boost: relearning items need immediate attention
  if (item.phase === 'relearning') {
    score += 5;
  } else if (item.phase === 'learning') {
    score += 3;
  }

  // Lapse penalty: items that keep failing need review
  if (item.lapses > 0) {
    score += Math.min(item.lapses * 0.5, 3);
  }

  return score;
}

/**
 * Distribute new items evenly among due items.
 * Spreads new items at regular intervals throughout the queue.
 */
function distributeNewItems(
  dueEntries: ScoredEntry[],
  newEntries: ScoredEntry[],
  maxItems: number,
): ScoredEntry[] {
  if (newEntries.length === 0) return dueEntries.slice(0, maxItems);
  if (dueEntries.length === 0) return newEntries.slice(0, maxItems);

  const result: ScoredEntry[] = [];
  const totalItems = Math.min(dueEntries.length + newEntries.length, maxItems);

  // Calculate spacing: insert a new item every N items
  const spacing = Math.max(1, Math.floor(totalItems / (newEntries.length + 1)));

  let dueIdx = 0;
  let newIdx = 0;

  for (let i = 0; i < totalItems; i++) {
    // Insert new item at regular intervals
    if (
      newIdx < newEntries.length &&
      (i + 1) % (spacing + 1) === 0
    ) {
      result.push(newEntries[newIdx]);
      newIdx++;
    } else if (dueIdx < dueEntries.length) {
      result.push(dueEntries[dueIdx]);
      dueIdx++;
    } else if (newIdx < newEntries.length) {
      result.push(newEntries[newIdx]);
      newIdx++;
    }
  }

  return result;
}

/**
 * Enforce the consecutive pillar limit by swapping items when needed.
 */
function enforcePillarLimit(entries: ScoredEntry[]): ScoredEntry[] {
  if (entries.length <= MAX_CONSECUTIVE_SAME_PILLAR) return [...entries];

  const result = [...entries];

  for (let i = MAX_CONSECUTIVE_SAME_PILLAR; i < result.length; i++) {
    const current = result[i];
    // Check if last N items have the same pillar
    const previousPillars = result
      .slice(i - MAX_CONSECUTIVE_SAME_PILLAR, i)
      .map(e => e.item.pillar);

    const allSame = previousPillars.every(p => p === current.item.pillar);

    if (allSame) {
      // Find the nearest item with a different pillar to swap with
      const swapIndex = findSwapCandidate(result, i, current.item.pillar);
      if (swapIndex !== -1) {
        const temp = result[i];
        result[i] = result[swapIndex];
        result[swapIndex] = temp;
      }
    }
  }

  return result;
}

/**
 * Find an item after the given index with a different pillar.
 */
function findSwapCandidate(
  entries: ScoredEntry[],
  fromIndex: number,
  excludePillar: Pillar,
): number {
  for (let i = fromIndex + 1; i < entries.length; i++) {
    if (entries[i].item.pillar !== excludePillar) {
      return i;
    }
  }
  return -1;
}

/**
 * Escalate question type based on how many times an item has been reviewed.
 *
 * Progression:
 * - reps 0-1: multiple-choice (easiest recognition)
 * - reps 2-3: yes-no (recognition with less scaffolding)
 * - reps 4-5: fill-blank (partial recall)
 * - reps 6-7: match-pairs (relational recall)
 * - reps 8+:  type-answer (full recall)
 *
 * Items that have lapsed get demoted one level.
 */
export function escalateQuestionType(item: SrsItem): QuestionType {
  const effectiveReps = Math.max(0, item.reps - Math.floor(item.lapses / 2));

  if (effectiveReps <= 1) return 'multiple-choice';
  if (effectiveReps <= 3) return 'yes-no';
  if (effectiveReps <= 5) return 'fill-blank';
  if (effectiveReps <= 7) return 'match-pairs';
  return 'type-answer';
}

/**
 * Group items by pillar.
 */
export function groupByPillar(items: SrsItem[]): Record<Pillar, SrsItem[]> {
  const groups: Record<Pillar, SrsItem[]> = {
    dsa: [],
    systems: [],
    engineering: [],
    theory: [],
  };

  for (const item of items) {
    groups[item.pillar].push(item);
  }

  return groups;
}

// ─── Internal Types ─────────────────────────────────────────────

interface ScoredEntry {
  item: SrsItem;
  score: number;
  isNew: boolean;
}
