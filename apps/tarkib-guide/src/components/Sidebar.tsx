import { useState, useCallback } from 'react';
import { ChevronRight, Menu, PanelLeftClose, PanelLeftOpen, X, BookOpen } from 'lucide-react';
import { sections } from '../data/navigation';

interface SidebarProps {
  activeSlug: string;
  visitedPages: string[];
  onNavigate: (slug: string) => void;
  onGoHome: () => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  activeSlug,
  visitedPages,
  onNavigate,
  onGoHome,
  sidebarOpen,
  onCloseSidebar,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    // Auto-expand section containing active slug
    const initial = new Set<string>();
    for (const section of sections) {
      if (section.pages.some(p => p.slug === activeSlug)) {
        initial.add(section.id);
      }
    }
    return initial;
  });

  const toggleSection = useCallback((id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const totalPages = sections.reduce((sum, s) => sum + s.pages.length, 0);
  const visitedCount = visitedPages.length;

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
            <span className="brand-icon">ت</span>
            <div>
              <h1>Tarkib Guide</h1>
              <div className="subtitle">دليل التركيب</div>
            </div>
          </button>
          <div className="sidebar-stats">
            <div className="stat">
              <div className="stat-value">{visitedCount}</div>
              <div className="stat-label">Read</div>
            </div>
            <div className="stat">
              <div className="stat-value">{totalPages}</div>
              <div className="stat-label">Total</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {sections.map(section => {
            const isExpanded = expandedSections.has(section.id);

            return (
              <div key={section.id} className="folder-group">
                <div
                  className={`folder-header ${isExpanded ? 'active' : ''}`}
                  onClick={() => toggleSection(section.id)}
                >
                  <ChevronRight
                    size={16}
                    className={`chevron-icon ${isExpanded ? 'expanded' : ''}`}
                  />
                  <span className="folder-name">{section.title}</span>
                  {section.titleAr && (
                    <span className="folder-title-ar">{section.titleAr}</span>
                  )}
                  <span className="folder-count">{section.pages.length}</span>
                </div>

                {isExpanded && (
                  <div className="folder-children">
                    {section.pages.map(page => {
                      const isActive = page.slug === activeSlug;
                      const isVisited = visitedPages.includes(page.slug);

                      return (
                        <div
                          key={page.slug}
                          className={`nav-item ${isActive ? 'active' : ''}`}
                          onClick={() => onNavigate(page.slug)}
                        >
                          <span className={`nav-dot ${isVisited ? 'visited' : ''}`} />
                          <span className="nav-title">{page.title}</span>
                          {page.titleAr && (
                            <span className="nav-title-ar">{page.titleAr}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <BookOpen size={14} />
          <span>FSTU Nahw Curriculum</span>
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
