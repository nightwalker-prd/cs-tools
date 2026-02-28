import { useState } from 'react';
import { BookOpen, ChevronRight, Menu, PanelLeftClose, PanelLeftOpen, Search, X } from 'lucide-react';
import type { Unit, Lesson, ProgressData } from '../data/types';
import type { SearchResult } from '../hooks/useSearch';

interface SidebarProps {
  units: Unit[];
  lessons: Lesson[];
  activeSlug: string;
  progress: ProgressData;
  query: string;
  searchResults: SearchResult[];
  onQueryChange: (q: string) => void;
  onNavigate: (slug: string) => void;
  onGoHome: () => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  units,
  lessons,
  activeSlug,
  progress,
  query,
  searchResults,
  onQueryChange,
  onNavigate,
  onGoHome,
  sidebarOpen,
  onCloseSidebar,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>(() => {
    // Auto-expand the unit containing the active lesson
    const activeLesson = lessons.find(l => l.id === activeSlug);
    if (activeLesson) return { [activeLesson.unitId]: true };
    return {};
  });

  const visitedCount = Object.keys(progress.lessonsVisited).length;
  const totalLessons = lessons.length;

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const handleNavigate = (lessonId: string) => {
    onNavigate(lessonId);
    onCloseSidebar();
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
            <span className="brand-icon">إنشاء</span>
            <div>
              <h1>Insha Guide</h1>
              <div className="subtitle">دليل الإنشاء</div>
            </div>
          </button>
          <div className="sidebar-stats">
            <div className="stat">
              <div className="stat-value">{visitedCount}</div>
              <div className="stat-label">Visited</div>
            </div>
            <div className="stat">
              <div className="stat-value">{totalLessons}</div>
              <div className="stat-label">Lessons</div>
            </div>
          </div>
        </div>

        <div className="sidebar-search">
          <div className="search-wrapper">
            <div className="search-input-container">
              <Search size={14} className="search-icon" />
              <input
                className="search-input"
                type="text"
                placeholder="Search lessons..."
                value={query}
                onChange={e => onQueryChange(e.target.value)}
              />
              {query && (
                <button className="search-clear" onClick={() => onQueryChange('')}>
                  <X size={14} />
                </button>
              )}
            </div>
            {query && searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map(r => (
                  <button
                    key={r.lessonId}
                    className="search-result-item"
                    onClick={() => handleNavigate(r.lessonId)}
                  >
                    <span className="search-result-title">{r.titleEn}</span>
                    <span className="search-result-ar">{r.titleAr}</span>
                    <span className="search-result-category">
                      {units.find(u => u.id === r.unitId)?.titleEn ?? r.unitId}
                    </span>
                  </button>
                ))}
              </div>
            )}
            {query && searchResults.length === 0 && (
              <div className="search-results">
                <div className="search-empty">No lessons found</div>
              </div>
            )}
          </div>
        </div>

        <nav className="sidebar-nav">
          {units.map(unit => {
            const unitLessons = lessons.filter(l => l.unitId === unit.id);
            const isExpanded = !!expandedUnits[unit.id];
            const hasActiveTopic = unitLessons.some(l => l.id === activeSlug);

            return (
              <div key={unit.id} className="folder-group">
                <button
                  className={`folder-header ${hasActiveTopic ? 'active' : ''}`}
                  onClick={() => toggleUnit(unit.id)}
                >
                  <ChevronRight
                    size={14}
                    className={`chevron-icon ${isExpanded ? 'expanded' : ''}`}
                  />
                  <span className="folder-name">Unit {unit.number}: {unit.titleEn}</span>
                  <span className="folder-title-ar">{unit.titleAr}</span>
                </button>
                {isExpanded && (
                  <div className="folder-children">
                    {unitLessons.map(lesson => (
                      <button
                        key={lesson.id}
                        className={`nav-item ${lesson.id === activeSlug ? 'active' : ''}`}
                        onClick={() => handleNavigate(lesson.id)}
                      >
                        <span className={`nav-dot ${progress.lessonsVisited[lesson.id] ? 'visited' : ''}`} />
                        <span className="nav-title">
                          {lesson.number}. {lesson.titleEn}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <BookOpen size={14} />
          <span>Al-Ibtida' fi al-Insha'</span>
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
