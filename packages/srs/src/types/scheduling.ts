/**
 * FSRS scheduling parameters and weight configuration.
 */

/**
 * FSRS weight parameters that control the scheduling algorithm.
 *
 * These weights tune how stability and difficulty evolve after each review.
 * The defaults are calibrated from FSRS research for general use.
 */
export interface FsrsWeights {
  /** Initial stability for "Again" response (days) */
  w0: number;
  /** Initial stability for "Hard" response (days) */
  w1: number;
  /** Initial stability for "Good" response (days) */
  w2: number;
  /** Initial stability for "Easy" response (days) */
  w3: number;
  /** Difficulty mean reversion weight */
  w4: number;
  /** Difficulty response delta */
  w5: number;
  /** Stability growth exponent after success */
  w6: number;
  /** Difficulty factor for stability growth */
  w7: number;
  /** Retrievability factor for stability growth */
  w8: number;
  /** Stability decay factor after failure */
  w9: number;
  /** Difficulty factor for stability decay */
  w10: number;
  /** Stability factor for stability decay */
  w11: number;
}

/**
 * Default FSRS weights based on published research.
 * These provide reasonable starting values for most learners.
 */
export const DEFAULT_FSRS_WEIGHTS: FsrsWeights = {
  w0: 0.4,    // initial stability: Again
  w1: 0.6,    // initial stability: Hard
  w2: 2.4,    // initial stability: Good
  w3: 5.8,    // initial stability: Easy
  w4: 4.93,   // difficulty mean reversion
  w5: 0.94,   // difficulty response delta
  w6: 0.86,   // stability growth exponent
  w7: 0.01,   // difficulty factor for growth
  w8: 1.49,   // retrievability factor for growth
  w9: 0.14,   // stability decay base
  w10: 0.68,  // difficulty factor for decay
  w11: 2.17,  // stability factor for decay
};

/**
 * Learning step configuration for new and relearning items.
 * Steps are in minutes.
 */
export interface LearningSteps {
  /** Steps for new items entering learning phase (in minutes) */
  newSteps: number[];
  /** Steps for items that have lapsed (in minutes) */
  relearnSteps: number[];
}

/**
 * Default learning steps.
 * New: 1 min → 10 min → graduate to review
 * Relearn: 10 min → graduate back to review
 */
export const DEFAULT_LEARNING_STEPS: LearningSteps = {
  newSteps: [1, 10],
  relearnSteps: [10],
};

/**
 * Full scheduling configuration.
 */
export interface SchedulingConfig {
  /** FSRS weight parameters */
  weights: FsrsWeights;
  /** Learning step configuration */
  steps: LearningSteps;
  /** Target retention rate (0-1). Default 0.9 = 90% */
  targetRetention: number;
  /** Maximum interval in days. Default 365 */
  maxInterval: number;
}

/**
 * Default scheduling configuration.
 */
export const DEFAULT_SCHEDULING_CONFIG: SchedulingConfig = {
  weights: DEFAULT_FSRS_WEIGHTS,
  steps: DEFAULT_LEARNING_STEPS,
  targetRetention: 0.9,
  maxInterval: 365,
};
