import { useState } from 'react';
import { BookOpen, Menu, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import { useChallengeSearch } from '../hooks/useChallengeSearch';
import { useProgress } from '../hooks/useProgress';
import { SearchInput } from './SearchInput';
import { ChallengeTree } from './ChallengeTree';
import { allChallenges } from '../data/challenges';

interface SidebarProps {
  activeChallengeId: string | null;
  onNavigate: (id: string) => void;
  onGoHome: () => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  activeChallengeId,
  onNavigate,
  onGoHome,
  sidebarOpen,
  onCloseSidebar,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [query, setQuery] = useState('');
  const results = useChallengeSearch(query);
  const { progress } = useProgress();

  const handleNavigate = (id: string) => {
    onNavigate(id);
    onCloseSidebar();
    setQuery('');
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={onCloseSidebar}
      />

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-header-top">
            <button
              className="sidebar-collapse-btn"
              onClick={onToggleCollapse}
              title={isCollapsed ? 'Pin sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
            {isCollapsed && (
              <button className="sidebar-close-btn" onClick={onCloseSidebar}>
                <X size={18} />
              </button>
            )}
          </div>
          <button className="sidebar-brand" onClick={onGoHome}>
            <span className="brand-icon">بن</span>
            <div>
              <h1>Bina</h1>
              <div className="subtitle">بِناء الجملة</div>
            </div>
          </button>
        </div>

        <div className="sidebar-search">
          <SearchInput
            query={query}
            results={results}
            onQueryChange={setQuery}
            onSelect={handleNavigate}
            onClear={() => setQuery('')}
          />
        </div>

        <ChallengeTree
          activeChallengeId={activeChallengeId}
          progress={progress}
          onNavigate={handleNavigate}
        />

        <div className="sidebar-stats">
          <div className="sidebar-stats-row">
            <span>Completed</span>
            <span className="sidebar-stats-value">
              {progress.totalCompleted}/{allChallenges.length}
            </span>
          </div>
          <div className="sidebar-stats-row">
            <span>Streak</span>
            <span className="sidebar-stats-value">{progress.currentStreak}d</span>
          </div>
          <div style={{ marginTop: '0.35rem' }}>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${(progress.totalCompleted / allChallenges.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

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
