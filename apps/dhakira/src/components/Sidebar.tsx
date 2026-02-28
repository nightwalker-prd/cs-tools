import { useState } from 'react';
import { BookOpen, Menu, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import type { GameType, GameCategory } from '../types';
import { SearchInput } from './SearchInput';
import { GameTree } from './GameTree';
import { useAllGameStats } from '../hooks/useGameStats';

interface SidebarProps {
  activeGame: GameType | null;
  onNavigate: (category: GameCategory, gameId: GameType) => void;
  onGoHome: () => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ activeGame, onNavigate, onGoHome, sidebarOpen, onCloseSidebar, isCollapsed, onToggleCollapse }: SidebarProps) {
  const [query, setQuery] = useState('');
  const allStats = useAllGameStats();

  const totalGames = Object.values(allStats).reduce((sum, s) => sum + s.attempts.length, 0);
  const bestStreak = Math.max(...Object.values(allStats).map((s) => s.currentStreak), 0);

  const handleNavigate = (category: GameCategory, gameId: GameType) => {
    onNavigate(category, gameId);
    onCloseSidebar();
    setQuery('');
  };

  return (
    <>
      <div className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={onCloseSidebar} />

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-header-top">
            <button className="sidebar-collapse-btn" onClick={onToggleCollapse}
              title={isCollapsed ? 'Pin sidebar' : 'Collapse sidebar'}>
              {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
            {isCollapsed && (
              <button className="sidebar-close-btn" onClick={onCloseSidebar}>
                <X size={18} />
              </button>
            )}
          </div>
          <button className="sidebar-brand" onClick={onGoHome}>
            <span className="brand-icon">ذكر</span>
            <div>
              <h1>Dhakira</h1>
              <div className="subtitle">ذاكرة</div>
            </div>
          </button>
        </div>

        <div className="sidebar-stats">
          <div className="sidebar-stat">
            <span className="sidebar-stat-value">{totalGames}</span>
            <span className="sidebar-stat-label">played</span>
          </div>
          <div className="sidebar-stat">
            <span className="sidebar-stat-value">{bestStreak}</span>
            <span className="sidebar-stat-label">streak</span>
          </div>
        </div>

        <div className="sidebar-search">
          <SearchInput
            query={query}
            onQueryChange={setQuery}
            onSelect={(category, gameId) => handleNavigate(category, gameId)}
            onClear={() => setQuery('')}
          />
        </div>

        <GameTree activeGame={activeGame} onNavigate={handleNavigate} />

        <div className="sidebar-footer">
          <BookOpen size={14} />
          <span>Al-Qalam Tools</span>
        </div>
      </aside>
    </>
  );
}

export function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="hamburger-btn" onClick={onClick}>
      <Menu size={20} />
    </button>
  );
}
