import { PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import { SUBJECTS } from '../data/subjects';
import { getCoursesBySubject } from '../data/catalog';

interface SidebarProps {
  activeCourseId: string;
  getWatchedCount: (courseId: string) => number;
  onNavigate: (courseId: string) => void;
  onGoHome: () => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  activeCourseId,
  getWatchedCount,
  onNavigate,
  onGoHome,
  sidebarOpen,
  onCloseSidebar,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const handleNavigate = (courseId: string) => {
    onNavigate(courseId);
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
            <div className="brand-icon">د</div>
            <div>
              <h1>Durus</h1>
              <div className="subtitle">دروس</div>
            </div>
          </button>
        </div>

        <nav className="sidebar-nav">
          {SUBJECTS.map((subject) => {
            const courses = getCoursesBySubject(subject.id);
            if (courses.length === 0) return null;
            return (
              <div key={subject.id} className="subject-group">
                <div className="subject-header">
                  {subject.title}
                </div>
                {courses.map((course) => {
                  const watched = getWatchedCount(course.id);
                  return (
                    <button
                      key={course.id}
                      className={`course-nav-item ${activeCourseId === course.id ? 'active' : ''}`}
                      onClick={() => handleNavigate(course.id)}
                    >
                      <span className="course-nav-title">{course.title}</span>
                      {watched > 0 && (
                        <span className="course-nav-progress">
                          {watched}/{course.totalVideos}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="hamburger-btn" onClick={onClick} aria-label="Open menu">
      &#9776;
    </button>
  );
}
