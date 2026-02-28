import { usePersistedState } from '@arabtools/core';
import type { GameType, GameCategory } from '../types';
import { categories } from '../data/categories';

interface GameTreeProps {
  activeGame: GameType | null;
  onNavigate: (category: GameCategory, gameId: GameType) => void;
}

export function GameTree({ activeGame, onNavigate }: GameTreeProps) {
  const [expanded, setExpanded] = usePersistedState<string[]>('dhakira-expanded', ['cognitive']);

  const toggleSection = (id: string) => {
    setExpanded((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  return (
    <nav className="sidebar-nav">
      {categories.map((cat) => {
        const isExpanded = expanded.includes(cat.id);
        const hasActive = cat.games.some((g) => g.id === activeGame);

        return (
          <div key={cat.id} className="folder-group">
            <button
              className={`folder-header ${hasActive ? 'active' : ''}`}
              onClick={() => toggleSection(cat.id)}
            >
              <svg
                className={`chevron-icon ${isExpanded ? 'expanded' : ''}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="folder-name">{cat.title}</span>
              <span className="folder-count">{cat.games.length}</span>
            </button>

            {isExpanded && (
              <div className="folder-children">
                {cat.games.map((game) => {
                  const isActive = game.id === activeGame;
                  return (
                    <button
                      key={game.id}
                      className={`nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => onNavigate(cat.id, game.id)}
                    >
                      <span className="nav-icon">{game.icon}</span>
                      <span className="nav-title">{game.title}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
