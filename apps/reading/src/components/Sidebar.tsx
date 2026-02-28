import { Menu, X, BookOpen, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { collections, totalTextCount } from '../data/navigation';
import { SearchInput } from './SearchInput';
import { TopicTree } from './TopicTree';
import type { SearchResult } from '../hooks/useSearch';

interface SidebarProps {
  activeTextId: string;
  visitedPages: string[];
  query: string;
  searchResults: SearchResult[];
  onQueryChange: (q: string) => void;
  onClearSearch: () => void;
  onNavigate: (textId: string) => void;
  onGoHome: () => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  activeTextId,
  visitedPages,
  query,
  searchResults,
  onQueryChange,
  onClearSearch,
  onNavigate,
  onGoHome,
  sidebarOpen,
  onCloseSidebar,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <>
      <div className={`sidebar-overlay${sidebarOpen ? ' visible' : ''}`} onClick={onCloseSidebar} />
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
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
            <div className="brand-icon">
              <BookOpen size={20} />
            </div>
            <div>
              <h1>Reading Tool</h1>
              <div className="subtitle">قراءة</div>
            </div>
          </button>
          <div className="sidebar-stats">
            <div className="stat">
              <div className="stat-value">{totalTextCount}</div>
              <div className="stat-label">Texts</div>
            </div>
            <div className="stat">
              <div className="stat-value">{collections.length}</div>
              <div className="stat-label">Collections</div>
            </div>
            <div className="stat">
              <div className="stat-value">{visitedPages.length}</div>
              <div className="stat-label">Read</div>
            </div>
          </div>
        </div>

        <SearchInput
          query={query}
          results={searchResults}
          onQueryChange={onQueryChange}
          onClearSearch={onClearSearch}
          onSelect={(id) => {
            onNavigate(id);
            onCloseSidebar();
          }}
        />

        <TopicTree
          collections={collections}
          activeTextId={activeTextId}
          visitedPages={visitedPages}
          onNavigate={(id) => {
            onNavigate(id);
            onCloseSidebar();
          }}
        />

        <div className="sidebar-footer">
          <BookOpen size={12} />
          <span>Al Qalam Arabic Tools</span>
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
