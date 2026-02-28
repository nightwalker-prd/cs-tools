import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Target, Calculator, Check, X } from 'lucide-react';
import { useOperationSpan } from '../hooks/games/useOperationSpan';
import { useGameStats } from '../hooks/useGameStats';

interface OperationSpanProps {
  onBack: () => void;
}

export function OperationSpan({ onBack }: OperationSpanProps) {
  const {
    gameData, startGame, answerMath, selectLetter, clearRecall,
    submitRecall, playAgain, getDuration, getMaxScore, getMathAccuracy,
    getOverallTrial, LETTERS,
  } = useOperationSpan();
  const { stats, recordAttempt } = useGameStats('operation-span');
  const hasRecordedRef = useRef(false);

  useEffect(() => {
    if (gameData.state === 'IDLE') hasRecordedRef.current = false;
  }, [gameData.state]);

  useEffect(() => {
    if (gameData.state === 'RESULTS' && !hasRecordedRef.current) {
      hasRecordedRef.current = true;
      recordAttempt(gameData.score, getDuration());
    }
  }, [gameData.state, gameData.score, getDuration, recordAttempt]);

  const handlePlayAgain = () => {
    hasRecordedRef.current = false;
    playAgain();
  };

  return (
    <div className="game-page animate-fade-in-up">
      <div className="game-header">
        <button className="back-btn" onClick={onBack} aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="game-title">Operation Span</h1>
          {gameData.state !== 'IDLE' && gameData.state !== 'RESULTS' && (
            <p className="game-subtitle">
              Trial {getOverallTrial()}/15 &middot; Span {gameData.currentSpan}
            </p>
          )}
        </div>
      </div>

      <div className="game-area">
        <AnimatePresence mode="wait">
          {gameData.state === 'IDLE' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-6 text-center max-w-md mx-auto"
            >
              <p className="text-primary text-lg mb-2">Solve math problems while remembering letters.</p>
              <p className="text-muted-foreground mb-2">
                After each math problem, a letter will appear briefly. At the end of each set,
                recall the letters <span className="text-accent font-medium">in order</span>.
              </p>
              <p className="text-muted-foreground mb-4">15 trials across span levels 3–7. Max score: 75.</p>
              {stats.highScore > 0 && (
                <p className="text-muted-foreground mb-4">
                  High Score: <span className="text-accent">{stats.highScore}</span>
                </p>
              )}
              <motion.button
                className="btn-primary mx-auto flex items-center gap-2"
                onClick={startGame}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play size={18} /> Start
              </motion.button>
            </motion.div>
          )}

          {gameData.state === 'MATH' && gameData.mathProblem && (
            <motion.div
              key="math"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-6"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-xl border border-border">
                  <Target className="w-4 h-4 text-accent" />
                  <span className="text-muted-foreground text-sm">Score:</span>
                  <span className="text-foreground font-medium">{gameData.score}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-xl border border-border">
                  <Calculator className="w-4 h-4 text-green-500" />
                  <span className="text-muted-foreground text-sm">Item:</span>
                  <span className="text-foreground font-medium">{gameData.currentItem + 1}/{gameData.currentSpan}</span>
                </div>
              </div>

              <div className="p-8 bg-card/80 rounded-2xl border border-border">
                <p className="text-3xl sm:text-5xl font-serif text-foreground mb-2">
                  {gameData.mathProblem.operand1} {gameData.mathProblem.operation}{' '}
                  {gameData.mathProblem.operand2} = {gameData.mathProblem.shownAnswer}?
                </p>
                <p className="text-muted-foreground text-sm">Is this equation correct?</p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <motion.button
                  onClick={() => answerMath(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-xl font-medium text-lg hover:bg-red-500 transition-colors"
                >
                  <X className="w-5 h-5" /> FALSE
                </motion.button>
                <motion.button
                  onClick={() => answerMath(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-xl font-medium text-lg hover:bg-green-500 transition-colors"
                >
                  <Check className="w-5 h-5" /> TRUE
                </motion.button>
              </div>
            </motion.div>
          )}

          {gameData.state === 'LETTER' && gameData.currentLetter && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-center space-y-4"
            >
              <p className="text-muted-foreground">Remember this letter</p>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-32 h-32 bg-accent rounded-2xl flex items-center justify-center mx-auto"
              >
                <span className="text-7xl font-serif text-accent-foreground">
                  {gameData.currentLetter}
                </span>
              </motion.div>
              <p className="text-muted-foreground text-sm">
                Letter {gameData.currentItem + 1} of {gameData.currentSpan}
              </p>
            </motion.div>
          )}

          {gameData.state === 'RECALL' && (
            <motion.div
              key="recall"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6 w-full max-w-md mx-auto"
            >
              <p className="text-primary text-lg">
                Tap the letters in order ({gameData.currentSpan} letters)
              </p>

              <div className="flex items-center justify-center gap-2 min-h-[60px] p-4 bg-card/80 rounded-xl border border-border">
                {gameData.playerRecall.length === 0 ? (
                  <span className="text-muted-foreground">Tap letters below...</span>
                ) : (
                  gameData.playerRecall.map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-12 h-12 bg-accent text-accent-foreground rounded-lg flex items-center justify-center text-2xl font-serif"
                    >
                      {letter}
                    </motion.span>
                  ))
                )}
              </div>

              <div className="grid grid-cols-4 gap-2">
                {LETTERS.map((letter) => {
                  const canSelect = gameData.playerRecall.length < gameData.currentSpan;
                  return (
                    <motion.button
                      key={letter}
                      onClick={() => selectLetter(letter)}
                      disabled={!canSelect}
                      whileHover={canSelect ? { scale: 1.05 } : {}}
                      whileTap={canSelect ? { scale: 0.95 } : {}}
                      className={`w-full aspect-square rounded-xl text-xl sm:text-2xl font-serif transition-colors ${
                        canSelect
                          ? 'bg-card border border-border text-foreground hover:bg-secondary'
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      {letter}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-4">
                <motion.button
                  onClick={clearRecall}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary"
                >
                  Clear
                </motion.button>
                <motion.button
                  onClick={submitRecall}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary"
                >
                  Submit
                </motion.button>
              </div>
            </motion.div>
          )}

          {gameData.state === 'FEEDBACK' && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-6"
            >
              <p className="text-primary text-lg">Trial Complete</p>

              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Correct sequence:</p>
                <div className="flex items-center justify-center gap-2">
                  {gameData.lettersToRemember.map((letter, i) => (
                    <span key={i} className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center text-2xl font-serif">
                      {letter}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Your sequence:</p>
                <div className="flex items-center justify-center gap-2">
                  {gameData.lettersToRemember.map((correctLetter, i) => {
                    const playerLetter = gameData.playerRecall[i];
                    const isCorrect = playerLetter === correctLetter;
                    return (
                      <span
                        key={i}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-serif text-white ${
                          isCorrect ? 'bg-green-600' : 'bg-red-600'
                        }`}
                      >
                        {playerLetter || '—'}
                      </span>
                    );
                  })}
                </div>
              </div>

              <p className="text-accent text-xl font-serif">
                +{gameData.playerRecall.filter((l, i) => l === gameData.lettersToRemember[i]).length}/{gameData.currentSpan}
              </p>
            </motion.div>
          )}

          {gameData.state === 'RESULTS' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6 max-w-md mx-auto"
            >
              <h2 className="font-serif text-3xl text-primary">Session Complete!</h2>

              <div className="p-6 bg-card/80 rounded-2xl border border-border">
                <p className="text-muted-foreground text-sm mb-2">Final Score</p>
                <p className="text-5xl font-serif text-accent">{gameData.score}/{getMaxScore()}</p>
                {gameData.score > stats.highScore && (
                  <p className="text-green-500 mt-2">New High Score!</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-card/80 rounded-xl border border-border">
                  <p className="text-muted-foreground text-sm">Math Accuracy</p>
                  <p className="text-2xl font-serif text-foreground">{getMathAccuracy()}%</p>
                </div>
                <div className="p-4 bg-card/80 rounded-xl border border-border">
                  <p className="text-muted-foreground text-sm">Duration</p>
                  <p className="text-2xl font-serif text-foreground">{Math.round(getDuration() / 1000)}s</p>
                </div>
              </div>

              <div className="p-4 bg-card/80 rounded-xl border border-border">
                <p className="text-muted-foreground text-sm mb-3">Score by Span Level</p>
                <div className="flex items-center justify-center gap-2">
                  {[3, 4, 5, 6, 7].map((span, i) => (
                    <div key={span} className="text-center">
                      <p className="text-muted-foreground text-xs">Span {span}</p>
                      <p className="text-foreground font-medium">{gameData.spanScores[i] || 0}/{span * 3}</p>
                    </div>
                  ))}
                </div>
              </div>

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
                  className="btn-primary"
                >
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
