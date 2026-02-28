import { Home, BookOpen, BookMarked, Sprout, BarChart3, Shapes, GraduationCap, ClipboardCheck, Layers, Zap, Swords, Network, X, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { SearchBar } from './SearchBar';
import type { Route } from '@/types';

interface SidebarProps {
  route: Route;
  navigate: (path: string) => void;
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ route, navigate, isOpen, onClose, isCollapsed, onToggleCollapse }: SidebarProps) {
  const navTo = (path: string) => {
    navigate(path);
  };

  const isActive = (page: string) => route.page === page;

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-header-top">
            <button className="sidebar-collapse-btn" onClick={onToggleCollapse}
              title={isCollapsed ? 'Pin sidebar' : 'Collapse sidebar'}>
              {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
            {isCollapsed && (
              <button className="sidebar-close-btn" onClick={onClose}>
                <X size={18} />
              </button>
            )}
          </div>
          <button className="sidebar-brand" onClick={() => navTo('#/')}>
            <div className="brand-icon">ق</div>
            <div>
              <h1>Kalimat</h1>
              <div className="subtitle">كلمات القرآن</div>
            </div>
          </button>
        </div>

        <SearchBar onSelectLemma={(id) => navTo(`#/lemma/${id}`)} />

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">Browse</div>
            <button
              className={`nav-item ${isActive('home') ? 'active' : ''}`}
              onClick={() => navTo('#/')}
            >
              <span className="nav-item-icon"><Home size={18} /></span>
              <span className="nav-item-label">Home</span>
            </button>
            <button
              className={`nav-item ${isActive('read') ? 'active' : ''}`}
              onClick={() => navTo('#/read/1')}
            >
              <span className="nav-item-icon"><BookOpen size={18} /></span>
              <span className="nav-item-label">Quran Reader</span>
            </button>
            <button
              className={`nav-item ${isActive('surah-list') || isActive('surah') ? 'active' : ''}`}
              onClick={() => navTo('#/surahs')}
            >
              <span className="nav-item-icon"><BookMarked size={18} /></span>
              <span className="nav-item-label">By Surah</span>
            </button>
            <button
              className={`nav-item ${isActive('root-browser') || isActive('root') ? 'active' : ''}`}
              onClick={() => navTo('#/roots')}
            >
              <span className="nav-item-icon"><Sprout size={18} /></span>
              <span className="nav-item-label">By Root</span>
            </button>
            <button
              className={`nav-item ${isActive('frequency') ? 'active' : ''}`}
              onClick={() => navTo('#/frequency/1')}
            >
              <span className="nav-item-icon"><BarChart3 size={18} /></span>
              <span className="nav-item-label">By Frequency</span>
            </button>
            <button
              className={`nav-item ${isActive('patterns') || isActive('pattern') ? 'active' : ''}`}
              onClick={() => navTo('#/patterns')}
            >
              <span className="nav-item-icon"><Shapes size={18} /></span>
              <span className="nav-item-label">Grammar Patterns</span>
            </button>
            <button
              className={`nav-item ${isActive('word-anatomy') ? 'active' : ''}`}
              onClick={() => navTo('#/word/1/2/4')}
            >
              <span className="nav-item-icon"><Layers size={18} /></span>
              <span className="nav-item-label">Word Anatomy</span>
            </button>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Word Families</div>
            <button
              className={`nav-item ${isActive('family-hub') || isActive('family-tree') ? 'active' : ''}`}
              onClick={() => navTo('#/families')}
            >
              <span className="nav-item-icon"><Network size={18} /></span>
              <span className="nav-item-label">Explorer</span>
            </button>
            <button
              className={`nav-item ${isActive('cluster-browser') || isActive('cluster-detail') ? 'active' : ''}`}
              onClick={() => navTo('#/clusters')}
            >
              <span className="nav-item-icon"><Shapes size={18} /></span>
              <span className="nav-item-label">Clusters</span>
            </button>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Study</div>
            <button
              className={`nav-item ${isActive('learn') || isActive('session') || isActive('results') ? 'active' : ''}`}
              onClick={() => navTo('#/learn')}
            >
              <span className="nav-item-icon"><GraduationCap size={18} /></span>
              <span className="nav-item-label">Learn</span>
            </button>
            <button
              className={`nav-item ${isActive('weak-verbs') ? 'active' : ''}`}
              onClick={() => navTo('#/weak-verbs')}
            >
              <span className="nav-item-icon"><Zap size={18} /></span>
              <span className="nav-item-label">Weak Verbs</span>
            </button>
            <button
              className={`nav-item ${isActive('similar-words') ? 'active' : ''}`}
              onClick={() => navTo('#/similar-words')}
            >
              <span className="nav-item-icon"><Swords size={18} /></span>
              <span className="nav-item-label">Similar Words</span>
            </button>
            <button
              className={`nav-item ${isActive('assessment') ? 'active' : ''}`}
              onClick={() => navTo('#/assessment')}
            >
              <span className="nav-item-icon"><ClipboardCheck size={18} /></span>
              <span className="nav-item-label">Assessment</span>
            </button>
            <button
              className={`nav-item ${isActive('progress') ? 'active' : ''}`}
              onClick={() => navTo('#/progress')}
            >
              <span className="nav-item-icon"><BarChart3 size={18} /></span>
              <span className="nav-item-label">Progress</span>
            </button>
          </div>
        </nav>

        <div className="sidebar-footer">
          Quranic Vocabulary Trainer
        </div>
      </aside>
    </>
  );
}
