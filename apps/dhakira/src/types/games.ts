// Per-game state interfaces

// Sequence Memory Game
export type SequenceGameState = 'IDLE' | 'SHOWING' | 'PLAYER_TURN' | 'GAME_OVER';

export interface SequenceGameData {
  state: SequenceGameState;
  sequence: number[];
  playerIndex: number;
  level: number;
  activeTile: number | null;
  lastClickResult: 'correct' | 'wrong' | null;
  startTime: number | null;
}

// Number Memory Game
export type NumberGameState = 'IDLE' | 'SHOWING' | 'INPUT' | 'GAME_OVER';

export interface NumberGameData {
  state: NumberGameState;
  currentNumber: string;
  level: number;
  startTime: number | null;
  displayTimeRemaining: number;
}

// Chimp Memory Game
export type ChimpGameState = 'IDLE' | 'MEMORIZE' | 'RECALL' | 'GAME_OVER';

export interface ChimpGameData {
  state: ChimpGameState;
  numberPositions: Map<number, number>;
  level: number;
  nextExpected: number;
  startTime: number | null;
}

// Working Memory (N-Back) Game
export type WorkingMemoryGameState = 'IDLE' | 'SHOWING' | 'RESPONDING' | 'GAME_OVER';

export interface WorkingMemoryGameData {
  state: WorkingMemoryGameState;
  history: number[];
  currentPosition: number | null;
  nBack: number;
  score: number;
  lives: number;
  streak: number;
  round: number;
  lastAnswerCorrect: boolean | null;
  startTime: number | null;
}

// Operation Span Game
export type OperationSpanGameState = 'IDLE' | 'MATH' | 'LETTER' | 'RECALL' | 'FEEDBACK' | 'RESULTS';

export interface MathProblem {
  operand1: number;
  operand2: number;
  operation: '+' | '-';
  shownAnswer: number;
  isCorrect: boolean;
}

export interface OperationSpanGameData {
  state: OperationSpanGameState;
  currentSpan: number;
  currentTrial: number;
  currentItem: number;
  mathProblem: MathProblem | null;
  currentLetter: string | null;
  lettersToRemember: string[];
  playerRecall: string[];
  score: number;
  spanScores: number[];
  mathCorrect: number;
  mathTotal: number;
  startTime: number | null;
}

// Corsi Block Tapping Game
export type CorsiBlockTappingGameState = 'IDLE' | 'SHOWING' | 'PLAYER_TURN' | 'FEEDBACK' | 'GAME_OVER';

export interface CorsiBlockTappingGameData {
  state: CorsiBlockTappingGameState;
  currentSpan: number;
  attempt: number;
  sequence: number[];
  playerSequence: number[];
  showingIndex: number;
  lastResult: 'correct' | 'wrong' | null;
  highestSpan: number;
  totalCorrect: number;
  startTime: number | null;
}

// Digit Span Game
export type DigitSpanMode = 'forward' | 'backward';
export type DigitSpanGameState = 'MODE_SELECT' | 'SHOWING' | 'RECALL' | 'FEEDBACK' | 'GAME_OVER';

export interface DigitSpanGameData {
  state: DigitSpanGameState;
  mode: DigitSpanMode | null;
  currentSpan: number;
  attempt: number;
  sequence: number[];
  playerInput: number[];
  showingIndex: number;
  lastResult: 'correct' | 'wrong' | null;
  highestSpan: number;
  startTime: number | null;
}

// Dual N-Back Game
export type DualNBackGameState = 'IDLE' | 'PLAYING' | 'RESPONDING' | 'BLOCK_COMPLETE' | 'SESSION_COMPLETE';

export interface DualNBackTrial {
  position: number;
  letter: string;
  positionMatch: boolean;
  letterMatch: boolean;
}

export interface DualNBackGameData {
  state: DualNBackGameState;
  nBack: number;
  currentBlock: number;
  currentTrial: number;
  trialsInBlock: number;
  history: DualNBackTrial[];
  currentPosition: number | null;
  currentLetter: string | null;
  playerPressedPosition: boolean;
  playerPressedLetter: boolean;
  positionFeedback: 'hit' | 'miss' | 'false-alarm' | null;
  letterFeedback: 'hit' | 'miss' | 'false-alarm' | null;
  positionHits: number;
  positionMisses: number;
  positionFalseAlarms: number;
  letterHits: number;
  letterMisses: number;
  letterFalseAlarms: number;
  highestN: number;
  blocksCompleted: number;
  startTime: number | null;
}
