/**
 * Calibration engine: tracks learner performance to adjust scheduling.
 *
 * Maintains a rolling average of recent reviews per pillar to compute
 * a learning speed multiplier. Fast learners get longer intervals,
 * struggling learners get shorter ones.
 */

import type { Pillar } from '../types/items';
import type { ResponseQuality } from '../types/reviews';

/**
 * A single calibration sample from a review.
 */
export interface CalibrationSample {
  timestamp: number;
  quality: ResponseQuality;
  pillar: Pillar;
  elapsed_ms: number;
}

/**
 * Per-pillar calibration state.
 */
export interface PillarCalibration {
  samples: CalibrationSample[];
  speedMultiplier: number;
}

/**
 * Full calibration state across all pillars.
 */
export interface CalibrationState {
  grammar: PillarCalibration;
  vocabulary: PillarCalibration;
  reading: PillarCalibration;
  quran: PillarCalibration;
  globalSpeedMultiplier: number;
}

/** Maximum number of samples to keep per pillar */
const MAX_SAMPLES = 50;

/** Minimum multiplier (struggling learner) */
const MIN_MULTIPLIER = 0.5;

/** Maximum multiplier (fast learner) */
const MAX_MULTIPLIER = 1.5;

/**
 * Create a fresh calibration state.
 */
export function createCalibrationState(): CalibrationState {
  return {
    grammar: { samples: [], speedMultiplier: 1.0 },
    vocabulary: { samples: [], speedMultiplier: 1.0 },
    reading: { samples: [], speedMultiplier: 1.0 },
    quran: { samples: [], speedMultiplier: 1.0 },
    globalSpeedMultiplier: 1.0,
  };
}

/**
 * Add a review sample and recalculate speed multipliers.
 *
 * @param state - Current calibration state
 * @param sample - New review sample
 * @returns Updated calibration state (new object, no mutation)
 */
export function addCalibrationSample(
  state: CalibrationState,
  sample: CalibrationSample,
): CalibrationState {
  const pillar = sample.pillar;
  const pillarState = state[pillar];

  // Add sample and trim to max size
  const newSamples = [...pillarState.samples, sample].slice(-MAX_SAMPLES);

  // Recalculate pillar multiplier
  const pillarMultiplier = calculateSpeedMultiplier(newSamples);

  const newPillarState: PillarCalibration = {
    samples: newSamples,
    speedMultiplier: pillarMultiplier,
  };

  const newState = {
    ...state,
    [pillar]: newPillarState,
  };

  // Recalculate global multiplier as weighted average
  newState.globalSpeedMultiplier = calculateGlobalMultiplier(newState);

  return newState;
}

/**
 * Calculate speed multiplier from a set of samples.
 *
 * Based on:
 * - Average response quality (higher = faster learner)
 * - Average response time (faster responses = more confident)
 *
 * @param samples - Recent review samples
 * @returns Speed multiplier [0.5 - 1.5]
 */
export function calculateSpeedMultiplier(samples: CalibrationSample[]): number {
  if (samples.length < 5) {
    // Not enough data to calibrate
    return 1.0;
  }

  // Average quality (0-3 scale, 2 = "Good" is baseline)
  const avgQuality = samples.reduce((sum, s) => sum + s.quality, 0) / samples.length;

  // Normalize: quality 2 = 1.0, quality 3 = 1.25, quality 0 = 0.5
  const qualityFactor = 0.5 + (avgQuality / 3) * 0.75;

  // Success rate (quality > 0 means recalled)
  const successRate = samples.filter(s => s.quality > 0).length / samples.length;

  // Weight success rate more heavily (70%) vs quality factor (30%)
  const multiplier = successRate * 0.7 + qualityFactor * 0.3;

  // Scale to [0.5, 1.5] range
  // multiplier ranges from ~0.3 (all failures) to ~1.0 (all easy)
  const scaled = MIN_MULTIPLIER + (multiplier / 1.0) * (MAX_MULTIPLIER - MIN_MULTIPLIER);

  return clamp(scaled, MIN_MULTIPLIER, MAX_MULTIPLIER);
}

/**
 * Calculate global multiplier as weighted average of pillar multipliers.
 * Pillars with more samples have more weight.
 */
function calculateGlobalMultiplier(state: CalibrationState): number {
  const pillars: Pillar[] = ['grammar', 'vocabulary', 'reading', 'quran'];
  let totalWeight = 0;
  let weightedSum = 0;

  for (const pillar of pillars) {
    const weight = state[pillar].samples.length;
    totalWeight += weight;
    weightedSum += weight * state[pillar].speedMultiplier;
  }

  if (totalWeight === 0) return 1.0;
  return clamp(weightedSum / totalWeight, MIN_MULTIPLIER, MAX_MULTIPLIER);
}

/**
 * Get the speed multiplier for a specific pillar.
 * Falls back to global multiplier if pillar has insufficient data.
 */
export function getSpeedMultiplier(
  state: CalibrationState,
  pillar: Pillar,
): number {
  const pillarState = state[pillar];
  if (pillarState.samples.length < 5) {
    return state.globalSpeedMultiplier;
  }
  return pillarState.speedMultiplier;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
