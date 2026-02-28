import { BookOpen, Menu, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import type { BalagahTopic, BalagahUnit } from '../data/types';
import { SearchInput } from './SearchInput';
import { TopicTree } from './TopicTree';
import type { SearchResult } from '../hooks/useSearch';

interface SidebarProps {
  activeSlug: string;
  visitedPages: string[];
  query: string;
  searchResults: SearchResult[];
  onQueryChange: (q: string) => void;
  onClearSearch: () => void;
  onNavigate: (slug: string) => void;
  onGoHome: () => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  units: BalagahUnit[];
  allTopics: BalagahTopic[];
  topicMap: Record<string, BalagahTopic>;
}

export function Sidebar({
  activeSlug,
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
  units,
  allTopics,
  topicMap,
}: SidebarProps) {
  const visitedCount = visitedPages.length;
  const totalTopics = allTopics.length;

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
            <span className="brand-icon">بلاغة</span>
            <div>
              <h1>Balagah Navigator</h1>
              <div className="subtitle">دليل البلاغة</div>
            </div>
          </button>
          <div className="sidebar-stats">
            <div className="stat">
              <div className="stat-value">{visitedCount}</div>
              <div className="stat-label">Visited</div>
            </div>
            <div className="stat">
              <div className="stat-value">{totalTopics}</div>
              <div className="stat-label">Topics</div>
            </div>
          </div>
        </div>

        <div className="sidebar-search">
          <SearchInput
            query={query}
            results={searchResults}
            onQueryChange={onQueryChange}
            onSelect={(topicId) => {
              onNavigate(topicId);
              onCloseSidebar();
            }}
            onClear={onClearSearch}
          />
        </div>

        <TopicTree
          units={units}
          topicMap={topicMap}
          activeSlug={activeSlug}
          visitedPages={visitedPages}
          onNavigate={onNavigate}
        />

        <div className="sidebar-footer">
          <BookOpen size={14} />
          <span>First Steps to Understanding Balagah</span>
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
