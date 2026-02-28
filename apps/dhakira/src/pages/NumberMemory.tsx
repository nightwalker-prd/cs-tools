import { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { useNumberGame } from '../hooks/games/useNumberGame';
import { useGameStats } from '../hooks/useGameStats';
import { GameOverModal } from '../components/games/GameOverModal';

interface NumberMemoryProps {
  onBack: () => void;
}

export function NumberMemory({ onBack }: NumberMemoryProps) {
  const { gameData, startGame, submitAnswer, playAgain, getDuration, getProgress } = useNumberGame();
  const { stats, recordAttempt } = useGameStats('number-memory');
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const hasRecordedRef = useRef(false);

  useEffect(() => {
    if (gameData.state === 'INPUT' && inputRef.current) inputRef.current.focus();
  }, [gameData.state]);

  useEffect(() => {
    if (gameData.state === 'SHOWING') setInputValue('');
  }, [gameData.state, gameData.level]);

  useEffect(() => {
    if (gameData.state === 'IDLE') hasRecordedRef.current = false;
  }, [gameData.state]);

  useEffect(() => {
    if (gameData.state === 'GAME_OVER' && !hasRecordedRef.current) {
      hasRecordedRef.current = true;
      recordAttempt(gameData.level, getDuration());
    }
  }, [gameData.state, gameData.level, getDuration, recordAttempt]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) submitAnswer(inputValue.trim());
  };

  const handlePlayAgain = () => {
    hasRecordedRef.current = false;
    playAgain();
  };

  const progress = getProgress();

  return (
    <div className="game-page animate-fade-in-up">
      <div className="game-header">
        <button className="back-btn" onClick={onBack} aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="game-title">Number Memory</h1>
          {gameData.state !== 'IDLE' && (
            <p className="game-subtitle">Level {gameData.level} ({gameData.level} digit{gameData.level !== 1 ? 's' : ''})</p>
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
              <p className="text-primary text-lg mb-2">A number will appear on screen. Memorize it.</p>
              <p className="text-muted-foreground mb-2">
                You will have 1 second per digit to memorize the number. After it disappears, type it from memory.
              </p>
              <p className="text-muted-foreground mb-6">
                Each correct answer adds one more digit. How far can you go?
              </p>
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

          {gameData.state === 'SHOWING' && (
            <motion.div
              key="showing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-8"
            >
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground">
                Memorize this number
              </motion.p>

              <motion.div
                key={gameData.currentNumber}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-6xl sm:text-7xl md:text-8xl text-accent tracking-wider"
              >
                {gameData.currentNumber}
              </motion.div>

              <div className="w-full max-w-md mx-auto">
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: 'linear' }}
                  />
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  {Math.ceil(gameData.displayTimeRemaining / 1000)}s remaining
                </p>
              </div>
            </motion.div>
          )}

          {gameData.state === 'INPUT' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6 w-full max-w-md mx-auto"
            >
              <p className="text-primary text-lg">What was the number?</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="Enter the number"
                  className="w-full px-6 py-4 bg-card border border-border rounded-xl text-foreground text-center text-3xl font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  autoComplete="off"
                />

                <motion.button
                  type="submit"
                  disabled={!inputValue.trim()}
                  whileHover={{ scale: inputValue.trim() ? 1.02 : 1 }}
                  whileTap={{ scale: inputValue.trim() ? 0.98 : 1 }}
                  className={`w-full px-6 py-4 rounded-xl font-medium text-lg transition-colors ${
                    inputValue.trim()
                      ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                      : 'bg-secondary text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  Submit
                </motion.button>
              </form>

              <p className="text-muted-foreground text-sm">
                Level {gameData.level} — {gameData.level} digit{gameData.level !== 1 ? 's' : ''}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {gameData.state === 'GAME_OVER' && (
        <GameOverModal
          score={gameData.level}
          highScore={Math.max(stats.highScore, gameData.level)}
          label="Level"
          onPlayAgain={handlePlayAgain}
          onExit={onBack}
        />
      )}
    </div>
  );
}
