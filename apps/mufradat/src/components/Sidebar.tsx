import { BookOpen, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import type { VocabBand, ViewMode } from '../types';
import type { BandStatsMap } from '../types';
import { SearchInput } from './SearchInput';
import { WordTree } from './WordTree';
import type { SearchResult } from '../hooks/useSearch';

interface SidebarProps {
  activeSlug: string;
  query: string;
  searchResults: SearchResult[];
  onQueryChange: (q: string) => void;
  onClearSearch: () => void;
  onNavigate: (slug: string) => void;
  onGoHome: () => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  bands: VocabBand[];
  bandStats: BandStatsMap;
  masteredCount: number;
  dueCount: number;
  totalCount: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  activeSlug,
  query,
  searchResults,
  onQueryChange,
  onClearSearch,
  onNavigate,
  onGoHome,
  sidebarOpen,
  onCloseSidebar,
  viewMode,
  onViewChange,
  bands,
  bandStats,
  masteredCount,
  dueCount,
  totalCount,
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
            <span className="brand-icon">مفر</span>
            <div>
              <h1>Mufradat</h1>
              <div className="subtitle">مفردات</div>
            </div>
          </button>
          <div className="sidebar-stats">
            <div className="stat">
              <div className="stat-value">{masteredCount}</div>
              <div className="stat-label">Mastered</div>
            </div>
            <div className="stat">
              <div className="stat-value">{dueCount}</div>
              <div className="stat-label">Due</div>
            </div>
            <div className="stat">
              <div className="stat-value">{totalCount.toLocaleString()}</div>
              <div className="stat-label">Total</div>
            </div>
          </div>
        </div>

        <div className="view-toggle">
          <button
            className={`view-toggle-btn ${viewMode === 'browse' ? 'active' : ''}`}
            onClick={() => onViewChange('browse')}
          >
            Browse
          </button>
          <button
            className={`view-toggle-btn ${viewMode === 'study' ? 'active' : ''}`}
            onClick={() => onViewChange('study')}
          >
            Study
          </button>
        </div>

        <div className="sidebar-search">
          <SearchInput
            query={query}
            results={searchResults}
            onQueryChange={onQueryChange}
            onSelect={(wordId) => {
              onNavigate(`word/${wordId}`);
              onCloseSidebar();
            }}
            onClear={onClearSearch}
          />
        </div>

        <WordTree
          bands={bands}
          activeSlug={activeSlug}
          onNavigate={onNavigate}
          viewMode={viewMode}
          bandStats={bandStats}
        />

        <div className="sidebar-footer">
          <BookOpen size={14} />
          <span>Al-Qalam Vocabulary</span>
        </div>
      </aside>
    </>
  );
}

export function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="hamburger-btn" onClick={onClick}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    </button>
  );
}
