import { useState, useMemo } from 'react';
import { Menu, X, Feather, Search, ChevronRight, BookOpen, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import type { Poet, EraInfo } from '../types';

interface SidebarProps {
  poets: Poet[];
  eras: EraInfo[];
  poemCountByPoet: (poetId: string) => number;
  readPoems: string[];
  activePoetId: string | null;
  onNavigatePoet: (poetId: string) => void;
  onGoHome: () => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
  totalPoems: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  poets,
  eras,
  poemCountByPoet,
  readPoems,
  activePoetId,
  onNavigatePoet,
  onGoHome,
  sidebarOpen,
  onCloseSidebar,
  totalPoems,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [query, setQuery] = useState('');
  const [expandedEras, setExpandedEras] = useState<Set<string>>(new Set(eras.map(e => e.id)));

  const filteredPoets = useMemo(() => {
    if (!query.trim()) return poets;
    const q = query.toLowerCase().trim();
    return poets.filter(
      p => p.nameEn.toLowerCase().includes(q) || p.nameAr.includes(q)
    );
  }, [poets, query]);

  const poetsByEra = useMemo(() => {
    const map = new Map<string, Poet[]>();
    for (const era of eras) {
      const eraPoets = filteredPoets.filter(p => p.era === era.id);
      if (eraPoets.length > 0) {
        map.set(era.id, eraPoets);
      }
    }
    return map;
  }, [eras, filteredPoets]);

  const toggleEra = (eraId: string) => {
    setExpandedEras(prev => {
      const next = new Set(prev);
      if (next.has(eraId)) {
        next.delete(eraId);
      } else {
        next.add(eraId);
      }
      return next;
    });
  };

  return (
    <>
      <div
        className={`sidebar-overlay${sidebarOpen ? ' visible' : ''}`}
        onClick={onCloseSidebar}
      />
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
              <Feather size={20} />
            </div>
            <div>
              <h1>Diwan</h1>
              <div className="subtitle">ديوان</div>
            </div>
          </button>
          <div className="sidebar-stats">
            <div className="stat">
              <div className="stat-value">{poets.length}</div>
              <div className="stat-label">Poets</div>
            </div>
            <div className="stat">
              <div className="stat-value">{totalPoems}</div>
              <div className="stat-label">Poems</div>
            </div>
            <div className="stat">
              <div className="stat-value">{readPoems.length}</div>
              <div className="stat-label">Read</div>
            </div>
          </div>
        </div>

        <div className="sidebar-search">
          <div className="search-input-container">
            <Search size={14} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search poets..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <nav className="sidebar-nav">
          {eras.map(era => {
            const eraPoets = poetsByEra.get(era.id);
            if (!eraPoets) return null;
            const isExpanded = expandedEras.has(era.id);
            const hasActivePoet = eraPoets.some(p => p.id === activePoetId);

            return (
              <div key={era.id} className="era-group">
                <button
                  className={`era-header${hasActivePoet ? ' active' : ''}`}
                  onClick={() => toggleEra(era.id)}
                >
                  <ChevronRight
                    size={14}
                    className={`chevron-icon${isExpanded ? ' expanded' : ''}`}
                  />
                  <span className="era-name">{era.nameEn}</span>
                  <span className="era-count">{eraPoets.length}</span>
                </button>
                {isExpanded && (
                  <div className="era-children">
                    {eraPoets.map(poet => {
                      const count = poemCountByPoet(poet.id);
                      return (
                        <button
                          key={poet.id}
                          className={`poet-item${poet.id === activePoetId ? ' active' : ''}`}
                          onClick={() => onNavigatePoet(poet.id)}
                        >
                          <span className={`nav-dot${readPoems.some(r => r.startsWith(poet.id)) ? ' has-read' : ''}`} />
                          <span className="poet-name">{poet.nameEn}</span>
                          <span className="poet-name-ar">{poet.nameAr}</span>
                          {count > 0 && <span className="poet-poem-count">{count}</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          {filteredPoets.length === 0 && query && (
            <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.82rem', color: 'var(--color-muted-foreground)' }}>
              No poets found
            </div>
          )}
        </nav>

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
