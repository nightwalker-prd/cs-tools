import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { useSequenceGame } from '../hooks/games/useSequenceGame';
import { useGameStats } from '../hooks/useGameStats';
import { GameOverModal } from '../components/games/GameOverModal';

interface SequenceMemoryProps {
  onBack: () => void;
}

export function SequenceMemory({ onBack }: SequenceMemoryProps) {
  const { gameData, startGame, handleTileClick, playAgain, getDuration } = useSequenceGame();
  const { stats, recordAttempt } = useGameStats('sequence-memory');
  const hasRecordedRef = useRef(false);
  const [showingIndex, setShowingIndex] = useState(-1);

  useEffect(() => {
    if (gameData.state === 'IDLE') hasRecordedRef.current = false;
  }, [gameData.state]);

  useEffect(() => {
    if (gameData.state === 'GAME_OVER' && !hasRecordedRef.current) {
      hasRecordedRef.current = true;
      recordAttempt(gameData.level, getDuration());
    }
  }, [gameData.state, gameData.level, getDuration, recordAttempt]);

  useEffect(() => {
    if (gameData.state !== 'SHOWING') {
      setShowingIndex(-1);
      return;
    }
    const sequence = gameData.sequence;
    let currentIndex = 0;
    const initialTimer = setTimeout(() => setShowingIndex(0), 200);
    const intervalId = setInterval(() => {
      currentIndex++;
      if (currentIndex < sequence.length) setShowingIndex(currentIndex);
      else setShowingIndex(-1);
    }, 800);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
    };
  }, [gameData.state, gameData.sequence]);

  const handlePlayAgain = () => {
    hasRecordedRef.current = false;
    playAgain();
  };

  const isTileActive = (tileIndex: number): boolean => {
    if (gameData.state !== 'SHOWING') return false;
    if (showingIndex < 0 || showingIndex >= gameData.sequence.length) return false;
    return gameData.sequence[showingIndex] === tileIndex;
  };

  return (
    <div className="game-page animate-fade-in-up">
      <div className="game-header">
        <button className="back-btn" onClick={onBack} aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="game-title">Sequence Memory</h1>
          {gameData.state !== 'IDLE' && <p className="game-subtitle">Level {gameData.level}</p>}
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
              <p className="text-primary text-lg mb-2">Watch the sequence of tiles that light up.</p>
              <p className="text-muted-foreground mb-2">
                After the sequence finishes, repeat it by clicking the tiles in the same order.
              </p>
              <p className="text-muted-foreground mb-6">
                Each round adds one more tile. How far can you go?
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

          {(gameData.state === 'SHOWING' || gameData.state === 'PLAYER_TURN') && (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center space-y-6"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={gameData.state}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-muted-foreground"
                >
                  {gameData.state === 'SHOWING' ? 'Watch the sequence...' : 'Your turn! Repeat the sequence.'}
                </motion.p>
              </AnimatePresence>

              <div className="tile-grid tile-grid-3x3 mx-auto max-w-60">
                {Array.from({ length: 9 }, (_, i) => (
                  <button
                    key={i}
                    className={`tile ${isTileActive(i) ? 'active' : ''}`}
                    onClick={() => handleTileClick(i)}
                    disabled={gameData.state !== 'PLAYER_TURN'}
                  />
                ))}
              </div>

              <p className="text-muted-foreground text-sm">
                {gameData.state === 'SHOWING'
                  ? `Level ${gameData.level} — ${gameData.sequence.length} tile${gameData.sequence.length !== 1 ? 's' : ''}`
                  : `${gameData.playerIndex + 1} / ${gameData.sequence.length}`}
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
