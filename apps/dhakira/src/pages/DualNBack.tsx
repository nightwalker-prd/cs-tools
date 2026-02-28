import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Grid3X3, Type, RotateCcw } from 'lucide-react';
import { useDualNBack } from '../hooks/games/useDualNBack';
import { useGameStats } from '../hooks/useGameStats';

interface DualNBackProps {
  onBack: () => void;
}

export function DualNBack({ onBack }: DualNBackProps) {
  const {
    gameData,
    startSession,
    pressPosition,
    pressLetter,
    playAgain,
    getDuration,
    getPositionAccuracy,
    getLetterAccuracy,
    canRespond,
    BLOCKS_PER_SESSION,
  } = useDualNBack();

  const { stats, recordAttempt } = useGameStats('dual-n-back');
  const hasRecordedRef = useRef(false);
  const highScoreAtStartRef = useRef(stats.highScore);

  // Track high score at game start
  useEffect(() => {
    if (gameData.state === 'IDLE') {
      hasRecordedRef.current = false;
      highScoreAtStartRef.current = stats.highScore;
    }
  }, [gameData.state, stats.highScore]);

  // Record attempt on session complete
  useEffect(() => {
    if (gameData.state === 'SESSION_COMPLETE' && !hasRecordedRef.current) {
      hasRecordedRef.current = true;
      recordAttempt(gameData.highestN, getDuration());
    }
  }, [gameData.state, gameData.highestN, getDuration, recordAttempt]);

  const handlePlayAgain = () => {
    hasRecordedRef.current = false;
    highScoreAtStartRef.current = stats.highScore;
    playAgain();
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!canRespond) return;
      if (e.key === 'a' || e.key === 'A') {
        pressPosition();
      }
      if (e.key === 'l' || e.key === 'L') {
        pressLetter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canRespond, pressPosition, pressLetter]);

  // Grid positions (3x3)
  const gridPositions = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div className="game-page animate-fade-in-up">
      <div className="game-header">
        <button className="back-btn" onClick={onBack} aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="game-title">Dual N-Back</h1>
          {(gameData.state === 'PLAYING' || gameData.state === 'RESPONDING') && (
            <p className="game-subtitle">
              {gameData.nBack}-Back — Block {gameData.currentBlock}/{BLOCKS_PER_SESSION} — Trial {gameData.currentTrial}/{gameData.trialsInBlock}
            </p>
          )}
        </div>
      </div>

      <div className="game-area">
        <AnimatePresence mode="wait">
          {/* IDLE State */}
          {gameData.state === 'IDLE' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-6 text-center max-w-md mx-auto space-y-6"
            >
              <div className="space-y-4">
                <p className="text-primary text-lg">
                  Track TWO things at once: position AND letter.
                </p>
                <p className="text-muted-foreground">
                  Press <span className="text-teal-600 font-medium">Position Match</span> when the square matches {gameData.nBack} trials ago.
                </p>
                <p className="text-muted-foreground">
                  Press <span className="text-amber-600 font-medium">Letter Match</span> when the letter matches {gameData.nBack} trials ago.
                </p>
                <p className="text-muted-foreground text-sm">
                  Keyboard: A for position, L for letter
                </p>
              </div>

              {stats.highScore > 0 && (
                <p className="text-muted-foreground">
                  Best N-Level: <span className="text-accent">{stats.highScore}-Back</span>
                </p>
              )}

              <motion.button
                onClick={startSession}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary mx-auto flex items-center gap-2 text-lg"
                aria-label="Start session"
              >
                <Play className="w-5 h-5" />
                Start Session
              </motion.button>
            </motion.div>
          )}

          {/* PLAYING / RESPONDING State */}
          {(gameData.state === 'PLAYING' || gameData.state === 'RESPONDING') && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-6"
            >
              {/* N-Back indicator */}
              <div className="text-3xl font-serif text-accent">
                {gameData.nBack}-Back
              </div>

              {/* 3x3 Grid with letter in center */}
              <div className="relative">
                <div className="grid grid-cols-3 gap-2 w-full max-w-[180px] mx-auto">
                  {gridPositions.map((pos) => {
                    const isActive = gameData.currentPosition === pos;
                    return (
                      <motion.div
                        key={pos}
                        className={`
                          w-full aspect-square rounded-xl transition-all duration-150
                          ${isActive ? 'bg-accent' : 'bg-secondary'}
                        `}
                        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                      />
                    );
                  })}
                </div>

                {/* Letter overlay in center */}
                {gameData.currentLetter && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <span className="text-4xl sm:text-5xl font-serif text-foreground drop-shadow-lg">
                      {gameData.currentLetter}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Response buttons */}
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  onClick={pressPosition}
                  disabled={!canRespond}
                  whileHover={canRespond ? { scale: 1.02 } : {}}
                  whileTap={canRespond ? { scale: 0.98 } : {}}
                  className={`
                    flex items-center gap-2 px-6 py-4 rounded-xl font-medium text-lg transition-all
                    ${gameData.playerPressedPosition
                      ? gameData.positionFeedback === 'hit'
                        ? 'bg-green-500 text-white'
                        : gameData.positionFeedback === 'false-alarm'
                          ? 'bg-red-500 text-white'
                          : 'bg-teal-500 text-white'
                      : gameData.positionFeedback === 'miss'
                        ? 'bg-red-500/50 text-white'
                        : 'bg-teal-600 text-white hover:bg-teal-500'
                    }
                    ${!canRespond ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  aria-label="Position match"
                >
                  <Grid3X3 size={20} />
                  Position (A)
                </motion.button>

                <motion.button
                  onClick={pressLetter}
                  disabled={!canRespond}
                  whileHover={canRespond ? { scale: 1.02 } : {}}
                  whileTap={canRespond ? { scale: 0.98 } : {}}
                  className={`
                    flex items-center gap-2 px-6 py-4 rounded-xl font-medium text-lg transition-all
                    ${gameData.playerPressedLetter
                      ? gameData.letterFeedback === 'hit'
                        ? 'bg-green-500 text-white'
                        : gameData.letterFeedback === 'false-alarm'
                          ? 'bg-red-500 text-white'
                          : 'bg-amber-500 text-white'
                      : gameData.letterFeedback === 'miss'
                        ? 'bg-red-500/50 text-white'
                        : 'bg-amber-600 text-white hover:bg-amber-500'
                    }
                    ${!canRespond ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  aria-label="Letter match"
                >
                  <Type size={20} />
                  Letter (L)
                </motion.button>
              </div>

              {/* Block progress */}
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: BLOCKS_PER_SESSION }, (_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-2 rounded-full ${
                      i < gameData.currentBlock - 1
                        ? 'bg-accent'
                        : i === gameData.currentBlock - 1
                          ? 'bg-accent/50'
                          : 'bg-secondary'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* BLOCK_COMPLETE State */}
          {gameData.state === 'BLOCK_COMPLETE' && (
            <motion.div
              key="block-complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-6"
            >
              <h2 className="font-serif text-2xl text-foreground">Block Complete</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <p className="text-teal-600 text-sm mb-1">Position</p>
                  <p className="text-2xl font-serif text-foreground">
                    {Math.round(getPositionAccuracy() * 100)}%
                  </p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <p className="text-amber-600 text-sm mb-1">Letter</p>
                  <p className="text-2xl font-serif text-foreground">
                    {Math.round(getLetterAccuracy() * 100)}%
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground">
                {getPositionAccuracy() >= 0.8 && getLetterAccuracy() >= 0.8
                  ? `Advancing to ${gameData.nBack}-Back!`
                  : getPositionAccuracy() < 0.5 || getLetterAccuracy() < 0.5
                    ? `Dropping to ${gameData.nBack}-Back`
                    : `Staying at ${gameData.nBack}-Back`
                }
              </p>

              <p className="text-muted-foreground text-sm">Next block starting...</p>
            </motion.div>
          )}

          {/* SESSION_COMPLETE State */}
          {gameData.state === 'SESSION_COMPLETE' && (
            <motion.div
              key="session-complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6 max-w-md mx-auto"
            >
              <h2 className="font-serif text-3xl text-foreground">Session Complete!</h2>

              {/* Main score */}
              <div className="p-6 bg-secondary/50 rounded-2xl">
                <p className="text-muted-foreground text-sm mb-2">Highest N-Level</p>
                <p className="text-5xl font-serif text-accent">
                  {gameData.highestN}-Back
                </p>
                {gameData.highestN > highScoreAtStartRef.current && (
                  <p className="text-green-600 mt-2">New Best!</p>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <p className="text-muted-foreground text-sm">Blocks</p>
                  <p className="text-2xl font-serif text-foreground">
                    {gameData.blocksCompleted}
                  </p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <p className="text-muted-foreground text-sm">Duration</p>
                  <p className="text-2xl font-serif text-foreground">
                    {Math.round(getDuration() / 1000)}s
                  </p>
                </div>
              </div>

              {/* Interpretation */}
              <div className="p-4 bg-secondary/30 rounded-xl">
                <p className="text-muted-foreground text-sm">
                  {gameData.highestN <= 2 && 'Keep practicing! Dual N-Back is challenging.'}
                  {gameData.highestN === 3 && 'Good progress! Average performance.'}
                  {gameData.highestN === 4 && 'Above average working memory!'}
                  {gameData.highestN >= 5 && 'Excellent! Superior working memory capacity.'}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  onClick={onBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary"
                >
                  Exit
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
