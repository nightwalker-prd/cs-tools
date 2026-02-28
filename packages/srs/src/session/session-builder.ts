/**
 * Session builder: constructs a study session from the SRS deck.
 *
 * Selects items for review, prioritizes them, and applies interleaving.
 */

import type { SrsItem } from '../types/items';
import type { SessionConfig, SessionItem } from '../types/sessions';
import { DEFAULT_SESSION_CONFIG } from '../types/sessions';
import { interleaveItems } from '../engine/interleaver';

/**
 * Build a study session queue from the current SRS deck.
 *
 * Selection order:
 * 1. Overdue items (past their due date) — highest priority
 * 2. Items due today
 * 3. New items (up to the configured ratio/limit)
 *
 * All items are then interleaved across pillars for variety.
 *
 * @param items - All SRS items in the deck
 * @param config - Session configuration (optional, uses defaults)
 * @param now - Current timestamp (optional, defaults to Date.now())
 * @returns Ordered session queue
 */
export function buildSession(
  items: SrsItem[],
  config: SessionConfig = DEFAULT_SESSION_CONFIG,
  now: number = Date.now(),
): SessionItem[] {
  // Filter by pillar if specified
  const filtered = config.pillars.length > 0
    ? items.filter(item => config.pillars.includes(item.pillar))
    : items;

  // Separate new items from due items
  const newItems: SrsItem[] = [];
  const dueItems: SrsItem[] = [];

  for (const item of filtered) {
    if (item.phase === 'new') {
      newItems.push(item);
    } else if (item.due <= now) {
      dueItems.push(item);
    }
  }

  // Sort due items: learning/relearning first, then by how overdue
  dueItems.sort((a, b) => {
    // Phase priority: relearning > learning > review
    const phaseOrder = { relearning: 0, learning: 1, review: 2, new: 3 };
    const phaseDiff = phaseOrder[a.phase] - phaseOrder[b.phase];
    if (phaseDiff !== 0) return phaseDiff;

    // Within same phase, more overdue first
    return a.due - b.due;
  });

  // Cap new items
  const maxNew = Math.min(config.maxNewItems, Math.floor(config.maxItems * config.newItemRatio));
  const selectedNew = newItems.slice(0, maxNew);

  // Build session with interleaving
  if (config.interleave) {
    return interleaveItems(
      dueItems,
      selectedNew,
      config.maxItems,
      config.newItemRatio,
      now,
    );
  }

  // Without interleaving: just concatenate and assign positions
  const combined = [...dueItems, ...selectedNew].slice(0, config.maxItems);
  return combined.map((item, index) => ({
    srsItem: item,
    questionType: 'multiple-choice',
    position: index,
  }));
}

/**
 * Get counts for the session builder preview.
 *
 * @param items - All SRS items
 * @param now - Current timestamp
 * @returns Counts of items by category
 */
export function getSessionPreview(
  items: SrsItem[],
  now: number = Date.now(),
): SessionPreview {
  let dueCount = 0;
  let overdueCount = 0;
  let newCount = 0;
  let learningCount = 0;

  for (const item of items) {
    if (item.phase === 'new') {
      newCount++;
    } else if (item.phase === 'learning' || item.phase === 'relearning') {
      if (item.due <= now) learningCount++;
    } else if (item.due <= now) {
      const overdueDays = (now - item.due) / (1000 * 60 * 60 * 24);
      if (overdueDays > 1) {
        overdueCount++;
      } else {
        dueCount++;
      }
    }
  }

  return {
    dueCount,
    overdueCount,
    newCount,
    learningCount,
    totalAvailable: dueCount + overdueCount + newCount + learningCount,
  };
}

export interface SessionPreview {
  /** Items due today (not overdue) */
  dueCount: number;
  /** Items past their due date by more than 1 day */
  overdueCount: number;
  /** New items never reviewed */
  newCount: number;
  /** Items in learning/relearning phase that are due */
  learningCount: number;
  /** Total items available for a session */
  totalAvailable: number;
}
