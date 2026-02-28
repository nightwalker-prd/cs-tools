// 8 phonetically distinct consonants for Dual N-Back

export const DUAL_NBACK_LETTERS = ['C', 'H', 'K', 'L', 'Q', 'R', 'S', 'T'] as const;

export type DualNBackLetter = (typeof DUAL_NBACK_LETTERS)[number];

// Grid size (3x3)
export const GRID_SIZE = 9;

// Session configuration
export const BLOCKS_PER_SESSION = 5;
export const BASE_TRIALS_PER_BLOCK = 20; // Actual trials = 20 + N

// Timing (ms)
export const STIMULUS_DURATION = 500;
export const RESPONSE_WINDOW = 2500;
export const INTER_TRIAL_INTERVAL = 500;
export const BLOCK_PAUSE = 3000;

// Match probability
export const MATCH_PROBABILITY = 0.25; // 25% chance for each stream

// Progression thresholds
export const ADVANCE_THRESHOLD = 0.8; // 80% accuracy to advance
export const DROP_THRESHOLD = 0.5; // Below 50% to drop

// Limits
export const MIN_N = 1;
export const MAX_N = 9;
export const STARTING_N = 2;
