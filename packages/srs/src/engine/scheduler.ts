/**
 * FSRS-inspired spaced repetition scheduler.
 *
 * All functions are pure — no side effects, no mutation.
 *
 * Core formula: R(t,S) = (1 + t/(9*S))^(-1)
 * Where R = retrievability, t = elapsed days, S = stability
 *
 * Learning flow:
 *   new → learning (1min, 10min steps) → review (FSRS intervals)
 *   if lapsed → relearning (10min step) → review
 */

import type { SrsItem } from '../types/items';
import type { ResponseQuality } from '../types/reviews';
import type { FsrsWeights, LearningSteps } from '../types/scheduling';
import { DEFAULT_FSRS_WEIGHTS, DEFAULT_LEARNING_STEPS } from '../types/scheduling';

// ─── Core FSRS Functions ────────────────────────────────────────

/**
 * Calculate memory retrievability at time t with stability S.
 *
 * R(t, S) = (1 + t / (9 * S))^(-1)
 *
 * @param elapsedDays - Days since last review
 * @param stability - Current memory stability in days
 * @returns Probability of recall [0-1]
 */
export function calculateRetrievability(
  elapsedDays: number,
  stability: number,
): number {
  if (stability <= 0) return 0;
  if (elapsedDays <= 0) return 1;
  return Math.pow(1 + elapsedDays / (9 * stability), -1);
}

/**
 * Update difficulty after a review.
 *
 * Applies mean reversion toward w4 and adjusts by response quality.
 * Result is clamped to [1, 10].
 *
 * @param currentDifficulty - Current difficulty score [1-10]
 * @param quality - Response quality (0-3)
 * @param weights - FSRS weight parameters
 * @returns Updated difficulty [1-10]
 */
export function calculateDifficulty(
  currentDifficulty: number,
  quality: ResponseQuality,
  weights: FsrsWeights = DEFAULT_FSRS_WEIGHTS,
): number {
  // Mean reversion: pull difficulty toward midpoint (w4)
  // Strength of reversion is proportional to distance from midpoint
  const midpoint = weights.w4;
  const meanReversion = weights.w5 * 0.1 * (midpoint - currentDifficulty);
  // Quality delta: higher quality → decrease difficulty, lower → increase
  const qualityDelta = weights.w5 * (quality - 2);
  const newDifficulty = currentDifficulty + meanReversion - qualityDelta;
  return clamp(newDifficulty, 1, 10);
}

/**
 * Calculate new stability after a successful review (quality >= 1).
 *
 * S' = S * (1 + e^(w6) * (11 - D) * S^(-w7) * (e^(w8 * (1 - R)) - 1))
 *
 * @param stability - Current stability
 * @param difficulty - Current difficulty [1-10]
 * @param retrievability - Current retrievability [0-1]
 * @param weights - FSRS weights
 * @returns New stability after success
 */
export function stabilityAfterSuccess(
  stability: number,
  difficulty: number,
  retrievability: number,
  weights: FsrsWeights = DEFAULT_FSRS_WEIGHTS,
): number {
  if (stability <= 0) return weights.w2; // fallback to Good initial

  const growthFactor =
    Math.exp(weights.w6) *
    (11 - difficulty) *
    Math.pow(stability, -weights.w7) *
    (Math.exp(weights.w8 * (1 - retrievability)) - 1);

  return stability * (1 + growthFactor);
}

/**
 * Calculate new stability after a failure (quality = 0, "Again").
 *
 * S' = w9 * D^w10 * S^w11 * e^(...) (simplified)
 *
 * @param stability - Current stability
 * @param difficulty - Current difficulty [1-10]
 * @param retrievability - Current retrievability [0-1]
 * @param weights - FSRS weights
 * @returns New stability after failure (always less than current)
 */
export function stabilityAfterFailure(
  stability: number,
  difficulty: number,
  retrievability: number,
  weights: FsrsWeights = DEFAULT_FSRS_WEIGHTS,
): number {
  if (stability <= 0) return weights.w0; // fallback to Again initial

  // Decay formula: new stability is a fraction of current stability.
  // Higher difficulty and lower retrievability lead to more decay.
  // w9 = base decay factor, w10 = difficulty influence, w11 = retrievability influence
  const difficultyFactor = Math.pow(difficulty / 10, weights.w10);
  const retrievabilityFactor = Math.pow(retrievability + 0.01, weights.w11);
  const decayRate = weights.w9 + (1 - weights.w9) * difficultyFactor * (1 - retrievabilityFactor);

  const newStability = stability * Math.max(weights.w9, 1 - decayRate);

  // Ensure it's less than current stability and at least 0.1
  return Math.max(0.1, Math.min(newStability, stability - 0.01));
}

/**
 * Convert stability to a review interval for a target retention rate.
 *
 * I = 9 * S * (1/R - 1)
 *
 * @param stability - Memory stability in days
 * @param targetRetention - Desired retention rate (0-1)
 * @returns Interval in days
 */
export function stabilityToInterval(
  stability: number,
  targetRetention: number = 0.9,
): number {
  if (stability <= 0) return 0;
  if (targetRetention <= 0 || targetRetention >= 1) return 0;
  return 9 * stability * (1 / targetRetention - 1);
}

// ─── Main Scheduling Function ───────────────────────────────────

/**
 * Schedule an item after a review, returning the updated SrsItem.
 *
 * This is the main entry point for the scheduler. It handles:
 * - Phase transitions (new → learning → review → relearning)
 * - Learning steps (1min, 10min for new; 10min for relearn)
 * - FSRS interval calculation for review-phase items
 *
 * @param item - Current SRS item state
 * @param quality - Response quality (0-3)
 * @param weights - FSRS weights (optional, uses defaults)
 * @param steps - Learning steps (optional, uses defaults)
 * @param targetRetention - Target retention rate (optional, default 0.9)
 * @param maxInterval - Maximum interval in days (optional, default 365)
 * @param now - Current timestamp in ms (optional, defaults to Date.now())
 * @returns Updated SRS item with new scheduling parameters
 */
export function scheduleItem(
  item: SrsItem,
  quality: ResponseQuality,
  weights: FsrsWeights = DEFAULT_FSRS_WEIGHTS,
  steps: LearningSteps = DEFAULT_LEARNING_STEPS,
  targetRetention: number = 0.9,
  maxInterval: number = 365,
  now: number = Date.now(),
): SrsItem {
  const elapsedDays = item.last_review
    ? (now - item.last_review) / (1000 * 60 * 60 * 24)
    : 0;

  switch (item.phase) {
    case 'new':
      return scheduleNew(item, quality, weights, steps, now);
    case 'learning':
      return scheduleLearning(item, quality, weights, steps, targetRetention, maxInterval, now);
    case 'review':
      return scheduleReview(item, quality, weights, targetRetention, maxInterval, elapsedDays, now);
    case 'relearning':
      return scheduleRelearning(item, quality, weights, steps, targetRetention, maxInterval, now);
  }
}

// ─── Phase-specific Scheduling ──────────────────────────────────

function scheduleNew(
  item: SrsItem,
  quality: ResponseQuality,
  weights: FsrsWeights,
  steps: LearningSteps,
  now: number,
): SrsItem {
  // First review of a new item — assign initial stability based on quality
  const initialStability = getInitialStability(quality, weights);
  const newDifficulty = calculateDifficulty(item.difficulty_score, quality, weights);

  if (quality === 0) {
    // Again → stay in learning, repeat first step
    const stepMinutes = steps.newSteps[0] ?? 1;
    return {
      ...item,
      phase: 'learning',
      stability: initialStability,
      difficulty_score: newDifficulty,
      reps: 0,
      elapsed_days: 0,
      scheduled_days: minutesToDays(stepMinutes),
      last_review: now,
      due: now + stepMinutes * 60 * 1000,
    };
  }

  if (quality === 3) {
    // Easy → skip learning, go directly to review
    return {
      ...item,
      phase: 'review',
      stability: initialStability,
      difficulty_score: newDifficulty,
      reps: 1,
      elapsed_days: 0,
      scheduled_days: Math.min(Math.round(initialStability), 365),
      last_review: now,
      due: now + Math.min(Math.round(initialStability), 365) * 24 * 60 * 60 * 1000,
    };
  }

  // Hard or Good → enter learning phase at first step
  const stepMinutes = steps.newSteps[0] ?? 1;
  return {
    ...item,
    phase: 'learning',
    stability: initialStability,
    difficulty_score: newDifficulty,
    reps: 0,
    elapsed_days: 0,
    scheduled_days: minutesToDays(stepMinutes),
    last_review: now,
    due: now + stepMinutes * 60 * 1000,
  };
}

function scheduleLearning(
  item: SrsItem,
  quality: ResponseQuality,
  weights: FsrsWeights,
  steps: LearningSteps,
  targetRetention: number,
  maxInterval: number,
  now: number,
): SrsItem {
  const newDifficulty = calculateDifficulty(item.difficulty_score, quality, weights);

  if (quality === 0) {
    // Again → reset to first learning step
    const stepMinutes = steps.newSteps[0] ?? 1;
    return {
      ...item,
      stability: getInitialStability(0, weights),
      difficulty_score: newDifficulty,
      reps: 0,
      elapsed_days: 0,
      scheduled_days: minutesToDays(stepMinutes),
      last_review: now,
      due: now + stepMinutes * 60 * 1000,
    };
  }

  // Advance through learning steps
  const currentStep = findCurrentStep(item, steps.newSteps);
  const nextStepIndex = currentStep + 1;

  if (nextStepIndex >= steps.newSteps.length || quality === 3) {
    // Graduate to review phase
    const stability = stabilityAfterSuccess(
      item.stability || getInitialStability(quality, weights),
      newDifficulty,
      1.0, // just reviewed
      weights,
    );
    const interval = Math.min(
      Math.round(stabilityToInterval(stability, targetRetention)),
      maxInterval,
    );
    const intervalDays = Math.max(interval, 1);

    return {
      ...item,
      phase: 'review',
      stability,
      difficulty_score: newDifficulty,
      reps: item.reps + 1,
      elapsed_days: 0,
      scheduled_days: intervalDays,
      last_review: now,
      due: now + intervalDays * 24 * 60 * 60 * 1000,
    };
  }

  // Move to next learning step
  const nextStepMinutes = steps.newSteps[nextStepIndex] ?? 10;
  return {
    ...item,
    difficulty_score: newDifficulty,
    reps: item.reps + 1,
    elapsed_days: 0,
    scheduled_days: minutesToDays(nextStepMinutes),
    last_review: now,
    due: now + nextStepMinutes * 60 * 1000,
  };
}

function scheduleReview(
  item: SrsItem,
  quality: ResponseQuality,
  weights: FsrsWeights,
  targetRetention: number,
  maxInterval: number,
  elapsedDays: number,
  now: number,
): SrsItem {
  const retrievability = calculateRetrievability(elapsedDays, item.stability);
  const newDifficulty = calculateDifficulty(item.difficulty_score, quality, weights);

  if (quality === 0) {
    // Lapse → enter relearning
    const newStability = stabilityAfterFailure(
      item.stability,
      newDifficulty,
      retrievability,
      weights,
    );

    return {
      ...item,
      phase: 'relearning',
      stability: newStability,
      difficulty_score: newDifficulty,
      lapses: item.lapses + 1,
      elapsed_days: elapsedDays,
      scheduled_days: minutesToDays(10), // relearn step
      last_review: now,
      due: now + 10 * 60 * 1000, // 10 minutes
    };
  }

  // Successful review — compute new stability and interval
  const newStability = stabilityAfterSuccess(
    item.stability,
    newDifficulty,
    retrievability,
    weights,
  );

  // Apply quality multiplier to interval
  const qualityMultiplier = quality === 1 ? 0.8 : quality === 3 ? 1.3 : 1.0;
  const rawInterval = stabilityToInterval(newStability, targetRetention) * qualityMultiplier;
  const interval = Math.max(1, Math.min(Math.round(rawInterval), maxInterval));

  return {
    ...item,
    phase: 'review',
    stability: newStability,
    difficulty_score: newDifficulty,
    reps: item.reps + 1,
    elapsed_days: elapsedDays,
    scheduled_days: interval,
    last_review: now,
    due: now + interval * 24 * 60 * 60 * 1000,
  };
}

function scheduleRelearning(
  item: SrsItem,
  quality: ResponseQuality,
  weights: FsrsWeights,
  steps: LearningSteps,
  targetRetention: number,
  maxInterval: number,
  now: number,
): SrsItem {
  const newDifficulty = calculateDifficulty(item.difficulty_score, quality, weights);

  if (quality === 0) {
    // Again → restart relearning
    const stepMinutes = steps.relearnSteps[0] ?? 10;
    return {
      ...item,
      stability: stabilityAfterFailure(item.stability, newDifficulty, 0.5, weights),
      difficulty_score: newDifficulty,
      lapses: item.lapses + 1,
      scheduled_days: minutesToDays(stepMinutes),
      last_review: now,
      due: now + stepMinutes * 60 * 1000,
    };
  }

  // Graduate back to review
  const stability = stabilityAfterSuccess(
    item.stability,
    newDifficulty,
    1.0,
    weights,
  );
  const interval = Math.max(
    1,
    Math.min(Math.round(stabilityToInterval(stability, targetRetention)), maxInterval),
  );

  return {
    ...item,
    phase: 'review',
    stability,
    difficulty_score: newDifficulty,
    reps: item.reps + 1,
    elapsed_days: 0,
    scheduled_days: interval,
    last_review: now,
    due: now + interval * 24 * 60 * 60 * 1000,
  };
}

// ─── Helpers ────────────────────────────────────────────────────

/**
 * Get initial stability based on first response quality.
 */
export function getInitialStability(
  quality: ResponseQuality,
  weights: FsrsWeights = DEFAULT_FSRS_WEIGHTS,
): number {
  switch (quality) {
    case 0: return weights.w0;
    case 1: return weights.w1;
    case 2: return weights.w2;
    case 3: return weights.w3;
  }
}

/**
 * Find current learning step index based on scheduled interval.
 */
function findCurrentStep(item: SrsItem, steps: number[]): number {
  const scheduledMinutes = item.scheduled_days * 24 * 60;
  for (let i = steps.length - 1; i >= 0; i--) {
    if (Math.abs(scheduledMinutes - steps[i]) < 0.5) {
      return i;
    }
  }
  return 0;
}

function minutesToDays(minutes: number): number {
  return minutes / (24 * 60);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
