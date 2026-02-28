import { BookOpen, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import type { HafizRub, HafizStats, SearchResult } from '../../types';
import { SearchInput } from './SearchInput';
import { JuzTree } from './JuzTree';

interface SidebarProps {
  stats: HafizStats;
  rubs: HafizRub[];
  activeRubId: number | null;
  query: string;
  searchResults: SearchResult[];
  onQueryChange: (q: string) => void;
  onClearSearch: () => void;
  onSelectRub: (rubId: number) => void;
  onGoHome: () => void;
  onNavigate: (hash: string) => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  stats,
  rubs,
  activeRubId,
  query,
  searchResults,
  onQueryChange,
  onClearSearch,
  onSelectRub,
  onGoHome,
  onNavigate,
  sidebarOpen,
  onCloseSidebar,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <>
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={onCloseSidebar}
      />

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
            <span className="brand-icon">حفظ</span>
            <div>
              <h1>Hafiz Tracker</h1>
              <div className="subtitle">متابعة الحفظ</div>
            </div>
          </button>
          <div className="sidebar-stats">
            <div className="stat">
              <div className="stat-value">{stats.memorized}</div>
              <div className="stat-label">Memorized</div>
            </div>
            <div className="stat">
              <div className="stat-value">{stats.dueCount}</div>
              <div className="stat-label">Due</div>
            </div>
            <div className="stat">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total</div>
            </div>
          </div>
        </div>

        <div className="sidebar-nav-links">
          <button className="nav-link-btn" onClick={() => onNavigate('revision')}>
            Revision Session
            {stats.dueCount > 0 && <span className="nav-badge">{stats.dueCount}</span>}
          </button>
          <button className="nav-link-btn" onClick={() => onNavigate('games')}>
            Memory Games
          </button>
          <button className="nav-link-btn" onClick={() => onNavigate('challenge')}>
            30-Day Challenge
          </button>
        </div>

        <div className="sidebar-search">
          <SearchInput
            query={query}
            results={searchResults}
            onQueryChange={onQueryChange}
            onSelect={(result) => {
              if (result.type === 'rub') {
                onSelectRub(result.id);
              }
              onClearSearch();
            }}
            onClear={onClearSearch}
          />
        </div>

        <JuzTree
          rubs={rubs}
          activeRubId={activeRubId}
          onSelectRub={onSelectRub}
        />

        <div className="sidebar-footer">
          <BookOpen size={14} />
          <span>Al-Qalam Hafiz Series</span>
        </div>
      </aside>
    </>
  );
}
