import { useMemo } from 'react';
import type { GameType, HafizRub } from '../../types';
import { CompleteAyah } from './CompleteAyah';
import { WordOrder } from './WordOrder';
import { FirstLetters } from './FirstLetters';
import { BeforeAfter } from './BeforeAfter';
import { AudioRecall } from './AudioRecall';
import { SpeedRound } from './SpeedRound';
import { MeaningRecall } from './MeaningRecall';

interface GameRouterProps {
  gameType: GameType;
  rubs: HafizRub[];
  onBack: () => void;
}

export function GameRouter({ gameType, rubs, onBack }: GameRouterProps) {
  const memorizedRubs = useMemo(
    () => rubs.filter((r) => r.stage === 'memorized' || r.stage === 'solid'),
    [rubs],
  );

  if (memorizedRubs.length === 0) {
    return (
      <div className="game-empty fade-in-up">
        <div className="game-empty-content">
          <h3>No memorized rubs yet</h3>
          <p>Memorize some rubs first to play games.</p>
          <button className="btn btn-primary" onClick={onBack}>
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  switch (gameType) {
    case 'complete-ayah':
      return <CompleteAyah rubs={memorizedRubs} onBack={onBack} />;
    case 'word-order':
      return <WordOrder rubs={memorizedRubs} onBack={onBack} />;
    case 'first-letters':
      return <FirstLetters rubs={memorizedRubs} onBack={onBack} />;
    case 'before-after':
      return <BeforeAfter rubs={memorizedRubs} onBack={onBack} />;
    case 'audio-recall':
      return <AudioRecall rubs={memorizedRubs} onBack={onBack} />;
    case 'speed-round':
      return <SpeedRound rubs={memorizedRubs} onBack={onBack} />;
    case 'meaning-recall':
      return <MeaningRecall rubs={memorizedRubs} onBack={onBack} />;
    default:
      return null;
  }
}
