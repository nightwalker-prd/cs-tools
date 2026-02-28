import { BookOpen, BookMarked, Menu, X, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import type { KitabMeta, FiqhTerm, FiqhTopic, ViewMode } from '../types';
import type { SearchResult } from '../hooks/useSearch';
import { ViewModeToggle } from './ViewModeToggle';
import { SearchInput } from './SearchInput';
import { NavigationTree } from './NavigationTree';

interface SidebarProps {
  index: KitabMeta[];
  terms: FiqhTerm[];
  topics: FiqhTopic[];
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  activeKitabId: string | null;
  activeTopicId: string | null;
  visitedSections: string[];
  bookmarkCount: number;
  searchQuery: string;
  searchResults: SearchResult[];
  onSearchChange: (q: string) => void;
  onSearchSelect: (result: SearchResult) => void;
  onSearchClear: () => void;
  onNavigateKitab: (id: string) => void;
  onNavigateTopic: (id: string) => void;
  onGoHome: () => void;
  onNavigateGlossary: () => void;
  onNavigateQuiz: () => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  index,
  topics,
  viewMode,
  onViewChange,
  activeKitabId,
  activeTopicId,
  visitedSections,
  bookmarkCount,
  searchQuery,
  searchResults,
  onSearchChange,
  onSearchSelect,
  onSearchClear,
  onNavigateKitab,
  onNavigateTopic,
  onGoHome,
  onNavigateGlossary,
  onNavigateQuiz,
  sidebarOpen,
  onCloseSidebar,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const visitedKitabCount = new Set(visitedSections.map(s => s.split('/')[0])).size;

  return (
    <>
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={onCloseSidebar}
      />
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
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
        <div className="sidebar-header">
          <button className="sidebar-brand" onClick={onGoHome}>
            <span className="brand-icon">فقه</span>
            <div>
              <h1>Fiqh</h1>
              <div className="subtitle">مختصر القدوري</div>
            </div>
          </button>
        </div>

        <div className="sidebar-stats">
          <div className="sidebar-stat">
            <BookOpen size={14} />
            <span>{visitedKitabCount} / {index.length} kutub</span>
          </div>
          <div className="sidebar-stat">
            <BookMarked size={14} />
            <span>{bookmarkCount} saved</span>
          </div>
        </div>

        <ViewModeToggle viewMode={viewMode} onViewChange={onViewChange} />

        <SearchInput
          query={searchQuery}
          results={searchResults}
          onQueryChange={onSearchChange}
          onSelect={onSearchSelect}
          onClear={onSearchClear}
        />

        <NavigationTree
          index={index}
          topics={topics}
          viewMode={viewMode}
          activeKitabId={activeKitabId}
          activeTopicId={activeTopicId}
          visitedSections={visitedSections}
          onNavigateKitab={onNavigateKitab}
          onNavigateTopic={onNavigateTopic}
        />

        <div className="sidebar-footer">
          <button className="sidebar-footer-btn" onClick={onNavigateGlossary}>
            Glossary
          </button>
          <button className="sidebar-footer-btn" onClick={onNavigateQuiz}>
            Quiz
          </button>
        </div>
      </aside>
    </>
  );
}

export function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="hamburger-btn" onClick={onClick}>
      <Menu size={22} />
    </button>
  );
}
