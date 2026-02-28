import { useState } from 'react';
import { BookOpen, Menu, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import type { TestType } from '../types';
import { useTestSearch } from '../hooks/useTestSearch';
import { SearchInput } from './SearchInput';
import { TestTypeTree } from './TestTypeTree';

interface SidebarProps {
  activeType: TestType | null;
  onNavigate: (type: TestType) => void;
  onGoHome: () => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  activeType,
  onNavigate,
  onGoHome,
  sidebarOpen,
  onCloseSidebar,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [query, setQuery] = useState('');
  const results = useTestSearch(query);

  const handleNavigate = (type: TestType) => {
    onNavigate(type);
    onCloseSidebar();
    setQuery('');
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
            <span className="brand-icon">اخ</span>
            <div>
              <h1>Nation Test</h1>
              <div className="subtitle">اختبار المفردات</div>
            </div>
          </button>
        </div>

        <div className="sidebar-search">
          <SearchInput
            query={query}
            results={results}
            onQueryChange={setQuery}
            onSelect={(type) => handleNavigate(type as TestType)}
            onClear={() => setQuery('')}
          />
        </div>

        <TestTypeTree
          activeType={activeType}
          onNavigate={handleNavigate}
        />

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
