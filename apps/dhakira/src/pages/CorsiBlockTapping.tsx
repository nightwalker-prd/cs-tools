import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Target, RotateCcw } from 'lucide-react';
import { useCorsiBlockTapping } from '../hooks/games/useCorsiBlockTapping';
import { useGameStats } from '../hooks/useGameStats';

interface CorsiBlockTappingProps {
  onBack: () => void;
}

export function CorsiBlockTapping({ onBack }: CorsiBlockTappingProps) {
  const {
    gameData, startGame, tapBlock, playAgain, getDuration, getActiveBlockId, BLOCK_POSITIONS,
  } = useCorsiBlockTapping();
  const { stats, recordAttempt } = useGameStats('corsi-block-tapping');
  const hasRecordedRef = useRef(false);
  const [tappedBlock, setTappedBlock] = useState<number | null>(null);

  useEffect(() => {
    if (gameData.state === 'IDLE') hasRecordedRef.current = false;
  }, [gameData.state]);

  useEffect(() => {
    if (gameData.state === 'GAME_OVER' && !hasRecordedRef.current) {
      hasRecordedRef.current = true;
      recordAttempt(gameData.highestSpan, getDuration());
    }
  }, [gameData.state, gameData.highestSpan, getDuration, recordAttempt]);

  const handlePlayAgain = () => {
    hasRecordedRef.current = false;
    playAgain();
  };

  const handleTap = (blockId: number) => {
    if (gameData.state === 'PLAYER_TURN') {
      setTappedBlock(blockId);
      setTimeout(() => setTappedBlock(null), 150);
      tapBlock(blockId);
    }
  };

  const activeBlockId = getActiveBlockId();

  return (
    <div className="game-page animate-fade-in-up">
      <div className="game-header">
        <button className="back-btn" onClick={onBack} aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="game-title">Corsi Block Tapping</h1>
          {gameData.state !== 'IDLE' && gameData.state !== 'GAME_OVER' && (
            <p className="game-subtitle">
              Span {gameData.currentSpan} &middot; Attempt {gameData.attempt}/2
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
              <p className="text-primary text-lg mb-2">Watch the blocks light up in sequence.</p>
              <p className="text-muted-foreground mb-2">
                Then tap them back in the <span className="text-accent font-medium">same order</span>.
              </p>
              <p className="text-muted-foreground mb-4">
                The sequence gets longer as you progress. You have 2 attempts per level.
              </p>
              {stats.highScore > 0 && (
                <p className="text-muted-foreground mb-4">
                  Best Span: <span className="text-accent">{stats.highScore}</span>
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

          {(gameData.state === 'SHOWING' || gameData.state === 'PLAYER_TURN' || gameData.state === 'FEEDBACK') && (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-lg space-y-6 mx-auto"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-xl border border-border">
                  <Target className="w-4 h-4 text-accent" />
                  <span className="text-muted-foreground text-sm">Span:</span>
                  <span className="text-foreground font-medium">{gameData.currentSpan}</span>
                </div>
                {gameData.state === 'PLAYER_TURN' && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-xl border border-border">
                    <span className="text-muted-foreground text-sm">Tapped:</span>
                    <span className="text-foreground font-medium">{gameData.playerSequence.length}/{gameData.sequence.length}</span>
                  </div>
                )}
              </div>

              <p className="text-center text-muted-foreground">
                {gameData.state === 'SHOWING' && 'Watch the sequence...'}
                {gameData.state === 'PLAYER_TURN' && 'Your turn — tap the blocks in order'}
                {gameData.state === 'FEEDBACK' && gameData.lastResult === 'correct' && (
                  <span className="text-green-500">Correct!</span>
                )}
                {gameData.state === 'FEEDBACK' && gameData.lastResult === 'wrong' && (
                  <span className="text-red-500">Wrong sequence</span>
                )}
              </p>

              <div
                className="relative w-full aspect-square bg-card/80 rounded-2xl border border-border max-w-md mx-auto"
              >
                {BLOCK_POSITIONS.map((block) => {
                  const isActive = activeBlockId === block.id;
                  const isTapped = tappedBlock === block.id;
                  const isCorrectFeedback = gameData.state === 'FEEDBACK' && gameData.lastResult === 'correct' && gameData.sequence.includes(block.id);
                  const isWrongFeedback = gameData.state === 'FEEDBACK' && gameData.lastResult === 'wrong' &&
                    gameData.playerSequence[gameData.playerSequence.length - 1] === block.id;

                  return (
                    <motion.button
                      key={block.id}
                      onClick={() => handleTap(block.id)}
                      disabled={gameData.state !== 'PLAYER_TURN'}
                      className={`absolute w-[12%] aspect-square rounded-xl transition-all duration-150 ${
                        isActive ? 'bg-accent scale-110' :
                        isTapped ? 'bg-accent/80 scale-95' :
                        isCorrectFeedback ? 'bg-green-500' :
                        isWrongFeedback ? 'bg-red-500' :
                        'bg-secondary hover:bg-secondary/80'
                      } ${gameData.state === 'PLAYER_TURN' ? 'cursor-pointer' : 'cursor-default'}`}
                      style={{
                        left: `calc(${block.x}% - 6%)`,
                        top: `calc(${block.y}% - 6%)`,
                      }}
                      whileHover={gameData.state === 'PLAYER_TURN' ? { scale: 1.1 } : {}}
                      whileTap={gameData.state === 'PLAYER_TURN' ? { scale: 0.9 } : {}}
                      animate={isActive ? { scale: [1, 1.15, 1.1] } : {}}
                    />
                  );
                })}
              </div>

              {gameData.state === 'PLAYER_TURN' && (
                <div className="flex items-center justify-center gap-2">
                  {Array.from({ length: gameData.sequence.length }, (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        i < gameData.playerSequence.length ? 'bg-accent' : 'bg-secondary'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {gameData.state === 'GAME_OVER' && (
            <motion.div
              key="gameover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6 max-w-md mx-auto"
            >
              <h2 className="font-serif text-3xl text-primary">Game Over</h2>

              <div className="p-6 bg-card/80 rounded-2xl border border-border">
                <p className="text-muted-foreground text-sm mb-2">Corsi Span</p>
                <p className="text-5xl font-serif text-accent">{gameData.highestSpan}</p>
                {gameData.highestSpan > stats.highScore && (
                  <p className="text-green-500 mt-2">New Best!</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-card/80 rounded-xl border border-border">
                  <p className="text-muted-foreground text-sm">Blocks Correct</p>
                  <p className="text-2xl font-serif text-foreground">{gameData.totalCorrect}</p>
                </div>
                <div className="p-4 bg-card/80 rounded-xl border border-border">
                  <p className="text-muted-foreground text-sm">Duration</p>
                  <p className="text-2xl font-serif text-foreground">{Math.round(getDuration() / 1000)}s</p>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-xl">
                <p className="text-muted-foreground text-sm">
                  {gameData.highestSpan <= 3 && 'Below average spatial span'}
                  {gameData.highestSpan === 4 && 'Low-average spatial span'}
                  {gameData.highestSpan === 5 && 'Average spatial span'}
                  {gameData.highestSpan === 6 && 'Above average spatial span'}
                  {gameData.highestSpan >= 7 && 'Excellent spatial span!'}
                </p>
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
                  className="btn-primary flex items-center gap-2"
                >
                  <RotateCcw size={18} /> Play Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
