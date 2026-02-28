import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Heart, Zap, Target } from 'lucide-react';
import { useWorkingMemoryGame } from '../hooks/games/useWorkingMemoryGame';
import { useGameStats } from '../hooks/useGameStats';
import { GameOverModal } from '../components/games/GameOverModal';

interface WorkingMemoryProps {
  onBack: () => void;
}

export function WorkingMemory({ onBack }: WorkingMemoryProps) {
  const { gameData, startGame, respond, playAgain, getDuration } = useWorkingMemoryGame();
  const { stats, recordAttempt } = useGameStats('working-memory');
  const hasRecordedRef = useRef(false);

  useEffect(() => {
    if (gameData.state === 'IDLE') hasRecordedRef.current = false;
  }, [gameData.state]);

  useEffect(() => {
    if (gameData.state === 'GAME_OVER' && !hasRecordedRef.current) {
      hasRecordedRef.current = true;
      recordAttempt(gameData.score, getDuration());
    }
  }, [gameData.state, gameData.score, getDuration, recordAttempt]);

  const handlePlayAgain = () => {
    hasRecordedRef.current = false;
    playAgain();
  };

  const getFeedbackClass = () => {
    if (gameData.lastAnswerCorrect === null) return '';
    return gameData.lastAnswerCorrect ? 'ring-2 ring-green-500' : 'ring-2 ring-red-500';
  };

  return (
    <div className="game-page animate-fade-in-up">
      <div className="game-header">
        <button className="back-btn" onClick={onBack} aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="game-title">Working Memory</h1>
          {gameData.state !== 'IDLE' && <p className="game-subtitle">{gameData.nBack}-Back</p>}
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
              <p className="text-primary text-lg mb-2">Positions will appear one at a time on the grid.</p>
              <p className="text-muted-foreground mb-2">
                After each position, decide if it matches the position
                from <span className="text-accent font-medium">N steps ago</span>.
              </p>
              <p className="text-muted-foreground mb-6">
                Start with 2-Back. Get 10 correct in a row to increase the level. 3 wrong answers ends the game.
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

          {(gameData.state === 'SHOWING' || gameData.state === 'RESPONDING') && (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-6"
            >
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-xl border border-border">
                  <Target className="w-4 h-4 text-accent" />
                  <span className="text-muted-foreground text-sm">Score:</span>
                  <span className="text-foreground font-medium">{gameData.score}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-xl border border-border">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-muted-foreground text-sm">Lives:</span>
                  <span className="text-foreground font-medium">{gameData.lives}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-xl border border-border">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span className="text-muted-foreground text-sm">Streak:</span>
                  <span className="text-foreground font-medium">{gameData.streak}/10</span>
                </div>
              </div>

              <div className="text-2xl font-serif text-accent">{gameData.nBack}-Back</div>

              <motion.div
                className={`p-4 bg-card/80 rounded-2xl border border-border transition-all duration-300 ${getFeedbackClass()}`}
                animate={gameData.lastAnswerCorrect !== null ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 0.2 }}
              >
                <div className="tile-grid tile-grid-3x3 mx-auto max-w-60">
                  {Array.from({ length: 9 }, (_, i) => (
                    <div
                      key={i}
                      className={`tile ${gameData.state === 'SHOWING' && gameData.currentPosition === i ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={gameData.state}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-muted-foreground"
                >
                  {gameData.state === 'SHOWING' && 'Watch the position...'}
                  {gameData.state === 'RESPONDING' && `Does this match ${gameData.nBack} positions ago?`}
                </motion.p>
              </AnimatePresence>

              <AnimatePresence>
                {gameData.state === 'RESPONDING' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center justify-center gap-4"
                  >
                    <motion.button
                      onClick={() => respond(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-secondary px-8 py-3 text-lg"
                    >
                      No Match
                    </motion.button>
                    <motion.button
                      onClick={() => respond(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary px-8 py-3 text-lg"
                    >
                      Match
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-muted-foreground text-sm">Round {gameData.round}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {gameData.state === 'GAME_OVER' && (
        <GameOverModal
          score={gameData.score}
          highScore={Math.max(stats.highScore, gameData.score)}
          onPlayAgain={handlePlayAgain}
          onExit={onBack}
        />
      )}
    </div>
  );
}
