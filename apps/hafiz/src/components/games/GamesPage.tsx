import { PenTool, Shuffle, Type, ArrowLeftRight, Headphones, Zap, Languages } from 'lucide-react';
import type { GameType } from '../../types';

interface GamesPageProps {
  onSelectGame: (type: GameType) => void;
}

const GAMES: Array<{
  type: GameType;
  title: string;
  description: string;
  icon: typeof PenTool;
}> = [
  {
    type: 'complete-ayah',
    title: 'Complete the Ayah',
    description: 'Fill in randomly blanked words',
    icon: PenTool,
  },
  {
    type: 'word-order',
    title: 'Word Order',
    description: 'Reconstruct scrambled ayah',
    icon: Shuffle,
  },
  {
    type: 'first-letters',
    title: 'First Letters',
    description: 'Given first letters, recall full ayah',
    icon: Type,
  },
  {
    type: 'before-after',
    title: 'Before & After',
    description: 'What comes next or before?',
    icon: ArrowLeftRight,
  },
  {
    type: 'audio-recall',
    title: 'Audio Recall',
    description: 'Hear audio, identify the ayah',
    icon: Headphones,
  },
  {
    type: 'speed-round',
    title: 'Speed Round',
    description: '60-second timed mixed questions',
    icon: Zap,
  },
  {
    type: 'meaning-recall',
    title: 'Meaning Recall',
    description: 'Match English translations to Arabic ayahs',
    icon: Languages,
  },
];

export function GamesPage({ onSelectGame }: GamesPageProps) {
  return (
    <div className="games-page fade-in-up">
      <div className="page-header">
        <h2>Memory Games</h2>
        <p className="page-subtitle">
          Test and strengthen your memorization with interactive exercises
        </p>
      </div>

      <div className="game-cards-grid">
        {GAMES.map((game) => {
          const Icon = game.icon;
          return (
            <div key={game.type} className="game-card">
              <div className="game-card-icon">
                <Icon size={28} />
              </div>
              <h3 className="game-card-title">{game.title}</h3>
              <p className="game-card-desc">{game.description}</p>
              <button
                className="btn btn-primary"
                onClick={() => onSelectGame(game.type)}
              >
                Play
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
