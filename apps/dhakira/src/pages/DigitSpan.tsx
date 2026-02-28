import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, Delete, Check } from 'lucide-react';
import { useDigitSpan } from '../hooks/games/useDigitSpan';
import { useGameStats } from '../hooks/useGameStats';
import type { DigitSpanMode } from '../types/games';

interface DigitSpanProps {
  onBack: () => void;
  initialMode?: DigitSpanMode;
}

export function DigitSpan({ onBack, initialMode }: DigitSpanProps) {
  const {
    gameData,
    selectMode,
    inputDigit,
    clearInput,
    submitRecall,
    changeMode,
    playAgain,
    getDuration,
    getCurrentDigit,
    getExpectedAnswer,
  } = useDigitSpan();

  const forwardStats = useGameStats('digit-span-forward');
  const backwardStats = useGameStats('digit-span-backward');

  const hasRecordedRef = useRef(false);
  const highScoreAtStartRef = useRef(0);
  const didAutoSelectRef = useRef(false);

  // Auto-select mode if initialMode is provided
  useEffect(() => {
    if (initialMode && gameData.state === 'MODE_SELECT' && !didAutoSelectRef.current) {
      didAutoSelectRef.current = true;
      selectMode(initialMode);
    }
  }, [initialMode, gameData.state, selectMode]);

  // Track high score at game start
  useEffect(() => {
    if (gameData.state === 'MODE_SELECT') {
      hasRecordedRef.current = false;
    }
    if (gameData.state === 'SHOWING' && gameData.showingIndex === 0) {
      const currentStats = gameData.mode === 'forward' ? forwardStats.stats : backwardStats.stats;
      highScoreAtStartRef.current = currentStats.highScore;
    }
  }, [gameData.state, gameData.mode, gameData.showingIndex, forwardStats.stats, backwardStats.stats]);

  // Record attempt on game over
  useEffect(() => {
    if (gameData.state === 'GAME_OVER' && !hasRecordedRef.current && gameData.mode) {
      hasRecordedRef.current = true;
      const recordFn = gameData.mode === 'forward'
        ? forwardStats.recordAttempt
        : backwardStats.recordAttempt;
      recordFn(gameData.highestSpan, getDuration());
    }
  }, [gameData.state, gameData.highestSpan, gameData.mode, getDuration, forwardStats.recordAttempt, backwardStats.recordAttempt]);

  const handlePlayAgain = () => {
    hasRecordedRef.current = false;
    playAgain();
  };

  const handleModeSelect = (mode: DigitSpanMode) => {
    hasRecordedRef.current = false;
    highScoreAtStartRef.current = mode === 'forward'
      ? forwardStats.stats.highScore
      : backwardStats.stats.highScore;
    selectMode(mode);
  };

  const currentDigit = getCurrentDigit();
  const expectedAnswer = getExpectedAnswer();

  return (
    <div className="game-page animate-fade-in-up">
      <div className="game-header">
        <button className="back-btn" onClick={onBack} aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="game-title">Digit Span</h1>
          {gameData.mode && gameData.state !== 'MODE_SELECT' && gameData.state !== 'GAME_OVER' && (
            <p className="game-subtitle">
              {gameData.mode === 'forward' ? 'Forward' : 'Backward'} — Span {gameData.currentSpan} — Attempt {gameData.attempt}/2
            </p>
          )}
        </div>
      </div>

      <div className="game-area">
        <AnimatePresence mode="wait">
          {/* MODE_SELECT State */}
          {gameData.state === 'MODE_SELECT' && (
            <motion.div
              key="mode-select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8 max-w-md mx-auto"
            >
              <div className="space-y-4">
                <p className="text-primary text-lg">
                  Remember sequences of digits.
                </p>
                <p className="text-muted-foreground">
                  Choose a mode to begin.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Forward Mode */}
                <motion.button
                  onClick={() => handleModeSelect('forward')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-6 bg-card border border-border rounded-2xl text-left hover:border-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <ArrowRight size={24} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-foreground font-medium text-lg">Forward</h3>
                      <p className="text-muted-foreground text-sm">Recall digits in the same order</p>
                    </div>
                    {forwardStats.stats.highScore > 0 && (
                      <div className="text-accent font-medium">
                        Best: {forwardStats.stats.highScore}
                      </div>
                    )}
                  </div>
                </motion.button>

                {/* Backward Mode */}
                <motion.button
                  onClick={() => handleModeSelect('backward')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-6 bg-card border border-border rounded-2xl text-left hover:border-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                      <ArrowLeft size={24} className="text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-foreground font-medium text-lg">Backward</h3>
                      <p className="text-muted-foreground text-sm">Recall digits in reverse order</p>
                    </div>
                    {backwardStats.stats.highScore > 0 && (
                      <div className="text-accent font-medium">
                        Best: {backwardStats.stats.highScore}
                      </div>
                    )}
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* SHOWING State */}
          {gameData.state === 'SHOWING' && currentDigit !== null && (
            <motion.div
              key="showing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-6"
            >
              <p className="text-muted-foreground">Watch the sequence...</p>

              <motion.div
                key={gameData.showingIndex}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-32 h-32 bg-accent rounded-2xl flex items-center justify-center mx-auto"
              >
                <span className="text-7xl font-serif text-accent-foreground">
                  {currentDigit}
                </span>
              </motion.div>

              <p className="text-muted-foreground text-sm">
                Digit {gameData.showingIndex + 1} of {gameData.sequence.length}
              </p>
            </motion.div>
          )}

          {/* RECALL State */}
          {gameData.state === 'RECALL' && (
            <motion.div
              key="recall"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6 w-full max-w-sm mx-auto"
            >
              <p className="text-primary text-lg">
                Enter digits {gameData.mode === 'backward' ? 'backward' : 'forward'}
              </p>

              {/* Input display */}
              <div className="flex items-center justify-center gap-2 min-h-[60px] p-4 bg-secondary/50 rounded-xl">
                {gameData.playerInput.length === 0 ? (
                  <span className="text-muted-foreground">Tap digits below...</span>
                ) : (
                  gameData.playerInput.map((digit, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-12 h-12 bg-accent text-accent-foreground rounded-lg flex items-center justify-center text-2xl font-serif"
                    >
                      {digit}
                    </motion.span>
                  ))
                )}
              </div>

              <p className="text-muted-foreground text-sm">
                {gameData.playerInput.length}/{gameData.currentSpan} entered
              </p>

              {/* Number pad */}
              <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                  <motion.button
                    key={digit}
                    onClick={() => inputDigit(digit)}
                    disabled={gameData.playerInput.length >= gameData.currentSpan}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      w-full aspect-square rounded-xl text-xl sm:text-2xl font-serif transition-colors
                      ${gameData.playerInput.length >= gameData.currentSpan
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'bg-card text-foreground hover:bg-secondary'
                      }
                    `}
                  >
                    {digit}
                  </motion.button>
                ))}
                <div /> {/* Empty space */}
                <motion.button
                  onClick={() => inputDigit(0)}
                  disabled={gameData.playerInput.length >= gameData.currentSpan}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    w-full aspect-square rounded-xl text-xl sm:text-2xl font-serif transition-colors
                    ${gameData.playerInput.length >= gameData.currentSpan
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : 'bg-card text-foreground hover:bg-secondary'
                    }
                  `}
                >
                  0
                </motion.button>
                <div /> {/* Empty space */}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  onClick={clearInput}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Delete size={18} />
                  Clear
                </motion.button>
                <motion.button
                  onClick={submitRecall}
                  disabled={gameData.playerInput.length === 0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-colors
                    ${gameData.playerInput.length === 0
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : 'bg-accent text-accent-foreground hover:bg-accent/90'
                    }
                  `}
                >
                  <Check size={18} />
                  Submit
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* FEEDBACK State */}
          {gameData.state === 'FEEDBACK' && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-6"
            >
              <p className={`text-2xl font-serif ${
                gameData.lastResult === 'correct' ? 'text-green-600' : 'text-red-500'
              }`}>
                {gameData.lastResult === 'correct' ? 'Correct!' : 'Incorrect'}
              </p>

              {gameData.lastResult === 'wrong' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">Expected:</p>
                    <div className="flex items-center justify-center gap-2">
                      {expectedAnswer.map((digit, i) => (
                        <span
                          key={i}
                          className="w-10 h-10 bg-green-600 text-white rounded-lg flex items-center justify-center text-xl font-serif"
                        >
                          {digit}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">Your answer:</p>
                    <div className="flex items-center justify-center gap-2">
                      {gameData.playerInput.map((digit, i) => {
                        const isCorrect = digit === expectedAnswer[i];
                        return (
                          <span
                            key={i}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl font-serif ${
                              isCorrect ? 'bg-green-600 text-white' : 'bg-red-500 text-white'
                            }`}
                          >
                            {digit}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* GAME_OVER State */}
          {gameData.state === 'GAME_OVER' && (
            <motion.div
              key="gameover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6 max-w-md mx-auto"
            >
              <h2 className="font-serif text-3xl text-foreground">Game Over</h2>

              {/* Mode badge */}
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                gameData.mode === 'forward'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {gameData.mode === 'forward' ? 'Forward Mode' : 'Backward Mode'}
              </div>

              {/* Main score */}
              <div className="p-6 bg-secondary/50 rounded-2xl">
                <p className="text-muted-foreground text-sm mb-2">Digit Span</p>
                <p className="text-5xl font-serif text-accent">
                  {gameData.highestSpan}
                </p>
                {gameData.highestSpan > highScoreAtStartRef.current && (
                  <p className="text-green-600 mt-2">New Best!</p>
                )}
                {gameData.highestSpan === 9 && (
                  <p className="text-accent mt-2">Perfect Score!</p>
                )}
              </div>

              {/* Stats */}
              <div className="p-4 bg-secondary/50 rounded-xl">
                <p className="text-muted-foreground text-sm">Duration</p>
                <p className="text-2xl font-serif text-foreground">
                  {Math.round(getDuration() / 1000)}s
                </p>
              </div>

              {/* Interpretation */}
              <div className="p-4 bg-secondary/30 rounded-xl">
                <p className="text-muted-foreground text-sm">
                  {gameData.mode === 'forward' ? (
                    <>
                      {gameData.highestSpan <= 4 && 'Below average forward span'}
                      {gameData.highestSpan === 5 && 'Low-average forward span'}
                      {gameData.highestSpan === 6 && 'Average forward span'}
                      {gameData.highestSpan === 7 && 'Above average forward span'}
                      {gameData.highestSpan >= 8 && 'Excellent forward span!'}
                    </>
                  ) : (
                    <>
                      {gameData.highestSpan <= 3 && 'Below average backward span'}
                      {gameData.highestSpan === 4 && 'Average backward span'}
                      {gameData.highestSpan === 5 && 'Above average backward span'}
                      {gameData.highestSpan >= 6 && 'Excellent backward span!'}
                    </>
                  )}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3">
                <motion.button
                  onClick={onBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary"
                >
                  Exit
                </motion.button>
                <motion.button
                  onClick={changeMode}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary"
                >
                  Change Mode
                </motion.button>
                <motion.button
                  onClick={handlePlayAgain}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary flex items-center gap-2"
                >
                  <RotateCcw size={18} />
                  Play Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
