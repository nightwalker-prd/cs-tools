import { useState, useRef, useMemo } from 'react';
import { Menu, X, Search, ChevronRight, EyeOff, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { tools, CATEGORIES, type Category, type Tool } from '@/data/tools';

interface SidebarProps {
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
  isPinned: (id: string) => boolean;
  hiddenCount: number;
  onShowHidden: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

function SearchInput({
  query,
  onQueryChange,
  onClear,
  results,
}: {
  query: string;
  onQueryChange: (q: string) => void;
  onClear: () => void;
  results: Tool[];
}) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const showResults = focused && query.length > 0;

  return (
    <div className="search-wrapper">
      <div className="search-input-container">
        <Search size={14} className="search-icon" />
        <input
          ref={inputRef}
          className="search-input"
          type="text"
          placeholder="Search tools..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              onClear();
              inputRef.current?.blur();
            }
          }}
        />
        {query && (
          <button className="search-clear" onClick={onClear}>
            <X size={14} />
          </button>
        )}
      </div>
      {showResults && (
        <div className="search-results">
          {results.length > 0 ? (
            results.map((tool) => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="search-result-item"
              >
                <span className="search-result-title">{tool.name}</span>
                <span className="search-result-ar font-arabic">{tool.nameAr}</span>
                <span className="search-result-category">{tool.category}</span>
              </a>
            ))
          ) : (
            <div className="search-empty">No tools found</div>
          )}
        </div>
      )}
    </div>
  );
}

function FolderGroup({
  category,
  categoryTools,
  isPinned,
}: {
  category: Category;
  categoryTools: Tool[];
  isPinned: (id: string) => boolean;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="folder-group">
      <button className={`folder-header ${expanded ? 'active' : ''}`} onClick={() => setExpanded(!expanded)}>
        <ChevronRight size={14} className={`chevron-icon ${expanded ? 'expanded' : ''}`} />
        <span className="folder-name">{category}</span>
        <span className="folder-count">{categoryTools.length}</span>
      </button>
      {expanded && (
        <div className="folder-children">
          {categoryTools.map((tool) => {
            const pinned = isPinned(tool.id);
            return (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`nav-item ${pinned ? 'pinned' : ''}`}
              >
                <span className={`nav-dot ${pinned ? 'pinned' : ''}`} />
                <span className="nav-title">{tool.name}</span>
                <span className="nav-title-ar font-arabic">{tool.nameAr}</span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Sidebar({
  sidebarOpen,
  onCloseSidebar,
  isPinned,
  hiddenCount,
  onShowHidden,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.nameAr.includes(query) ||
        t.description.toLowerCase().includes(q)
    );
  }, [query]);

  const toolsByCategory = useMemo(() => {
    const grouped = new Map<Category, Tool[]>();
    for (const cat of CATEGORIES) {
      const catTools = tools.filter((t) => t.category === cat);
      if (catTools.length > 0) {
        grouped.set(cat, catTools);
      }
    }
    return grouped;
  }, []);

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
          <div className="sidebar-brand">
            <span className="brand-icon">أدوات</span>
            <div>
              <h1>Arab Tools</h1>
              <div className="subtitle">أدوات العربية</div>
            </div>
          </div>
          <div className="sidebar-stats">
            <div className="stat">
              <div className="stat-value">{tools.length}</div>
              <div className="stat-label">Tools</div>
            </div>
            <div className="stat">
              <div className="stat-value">{CATEGORIES.length}</div>
              <div className="stat-label">Categories</div>
            </div>
          </div>
        </div>

        <div className="sidebar-search">
          <SearchInput
            query={query}
            onQueryChange={setQuery}
            onClear={() => setQuery('')}
            results={searchResults}
          />
        </div>

        <nav className="sidebar-nav">
          {Array.from(toolsByCategory.entries()).map(([category, catTools]) => (
            <FolderGroup
              key={category}
              category={category}
              categoryTools={catTools}
              isPinned={isPinned}
            />
          ))}
        </nav>

        <div className="sidebar-footer">
          {hiddenCount > 0 ? (
            <button onClick={onShowHidden}>
              <EyeOff size={14} />
              <span>{hiddenCount} hidden</span>
            </button>
          ) : (
            <span>Al-Qalam Arab Tools</span>
          )}
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
