import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { useChimpGame } from '../hooks/games/useChimpGame';
import { useGameStats } from '../hooks/useGameStats';
import { GameOverModal } from '../components/games/GameOverModal';

interface ChimpMemoryProps {
  onBack: () => void;
}

export function ChimpMemory({ onBack }: ChimpMemoryProps) {
  const { gameData, startGame, handleTileClick, playAgain, getDuration, getNumberAt } = useChimpGame();
  const { stats, recordAttempt } = useGameStats('chimp-memory');
  const hasRecordedRef = useRef(false);

  useEffect(() => {
    if (gameData.state === 'GAME_OVER' && !hasRecordedRef.current) {
      hasRecordedRef.current = true;
      recordAttempt(gameData.level - 3, getDuration());
    }
  }, [gameData.state, gameData.level, getDuration, recordAttempt]);

  useEffect(() => {
    if (gameData.state === 'MEMORIZE' || gameData.state === 'RECALL') {
      hasRecordedRef.current = false;
    }
  }, [gameData.state]);

  const handlePlayAgain = () => {
    hasRecordedRef.current = false;
    playAgain();
  };

  const getInstructionText = () => {
    switch (gameData.state) {
      case 'IDLE': return 'Memorize the positions of the numbers, then click them in ascending order after they hide.';
      case 'MEMORIZE': return 'Click "1" to start hiding the numbers';
      case 'RECALL': return `Click the position of ${gameData.nextExpected}`;
      default: return '';
    }
  };

  return (
    <div className="game-page animate-fade-in-up">
      <div className="game-header">
        <button className="back-btn" onClick={onBack} aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="game-title">Chimp Memory</h1>
          {gameData.state !== 'IDLE' && (
            <p className="game-subtitle">{gameData.level} numbers</p>
          )}
        </div>
      </div>

      <div className="game-area">
        <motion.p
          key={gameData.state}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground text-center max-w-md"
        >
          {getInstructionText()}
        </motion.p>

        {gameData.state === 'IDLE' && (
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={startGame}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary flex items-center gap-2"
          >
            <Play size={20} /> Start
          </motion.button>
        )}

        {(gameData.state === 'MEMORIZE' || gameData.state === 'RECALL') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="tile-grid tile-grid-5x5 mx-auto max-w-80">
              {Array.from({ length: 25 }, (_, index) => {
                const numberAtTile = getNumberAt(index);
                const hasNumber = numberAtTile !== null;
                const showNumber = gameData.state === 'MEMORIZE' && hasNumber;

                return (
                  <button
                    key={index}
                    className={`tile ${showNumber ? 'active' : ''}`}
                    onClick={() => handleTileClick(index)}
                    disabled={
                      gameData.state === 'MEMORIZE'
                        ? !hasNumber || numberAtTile !== 1
                        : !hasNumber
                    }
                  >
                    {showNumber ? numberAtTile : ''}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {gameData.state === 'GAME_OVER' && (
        <GameOverModal
          score={gameData.level - 3}
          highScore={stats.highScore}
          label="Score"
          onPlayAgain={handlePlayAgain}
          onExit={onBack}
        />
      )}
    </div>
  );
}
