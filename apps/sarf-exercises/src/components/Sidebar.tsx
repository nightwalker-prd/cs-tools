import { Home, Settings, Play, BarChart3, BookOpen, BookX, Menu, X, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import type { Route } from '../hooks/useHashRouter';
import type { SarfSrsState } from '../hooks/useSarfSrs';

interface SidebarProps {
  route: Route;
  onNavigate: (route: Route) => void;
  onGoHome: () => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
  srs: SarfSrsState;
  showPdf: boolean;
  onTogglePdf: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  route,
  onNavigate,
  onGoHome,
  sidebarOpen,
  onCloseSidebar,
  srs,
  showPdf,
  onTogglePdf,
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
            <span className="brand-icon">صر</span>
            <div>
              <h1>Sarf Exercises</h1>
              <div className="subtitle">تمارين الصرف</div>
            </div>
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Navigation</div>

          <button
            className={`nav-item ${route === '' ? 'active' : ''}`}
            onClick={onGoHome}
          >
            <span className="nav-icon"><Home size={16} /></span>
            <span className="nav-title">Home</span>
          </button>

          <button
            className={`nav-item ${route === 'config' ? 'active' : ''}`}
            onClick={() => onNavigate('config')}
          >
            <span className="nav-icon"><Settings size={16} /></span>
            <span className="nav-title">New Session</span>
          </button>

          <button
            className={`nav-item ${route === 'exercise' ? 'active' : ''}`}
            onClick={() => onNavigate('exercise')}
          >
            <span className="nav-icon"><Play size={16} /></span>
            <span className="nav-title">Active Exercise</span>
          </button>

          <button
            className={`nav-item ${route === 'results' ? 'active' : ''}`}
            onClick={() => onNavigate('results')}
          >
            <span className="nav-icon"><BarChart3 size={16} /></span>
            <span className="nav-title">Results</span>
          </button>

          <div className="nav-section-label">Reference</div>

          <button
            className={`nav-item ${showPdf ? 'active' : ''}`}
            onClick={onTogglePdf}
          >
            <span className="nav-icon">{showPdf ? <BookX size={16} /> : <BookOpen size={16} />}</span>
            <span className="nav-title">{showPdf ? 'Hide Textbook' : 'Show Textbook'}</span>
          </button>
        </nav>

        {/* SRS Stats Mini */}
        <div className="srs-stats-mini">
          <h4>SRS Stats</h4>
          <div className="srs-stat-row">
            <span className="srs-stat-label">Total Cards</span>
            <span className="srs-stat-value">{srs.stats.total}</span>
          </div>
          <div className="srs-stat-row">
            <span className="srs-stat-label">Due Now</span>
            <span className="srs-stat-value due">{srs.stats.due}</span>
          </div>
          <div className="srs-stat-row">
            <span className="srs-stat-label">New</span>
            <span className="srs-stat-value">{srs.stats.newCount}</span>
          </div>
          <div className="srs-stat-row">
            <span className="srs-stat-label">Learning</span>
            <span className="srs-stat-value">{srs.stats.learning}</span>
          </div>
          <div className="srs-stat-row">
            <span className="srs-stat-label">Review</span>
            <span className="srs-stat-value">{srs.stats.review}</span>
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
