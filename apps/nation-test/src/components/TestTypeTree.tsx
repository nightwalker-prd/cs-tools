import { usePersistedState } from '@arabtools/core';
import type { TestType } from '../types';
import { categories, testTypes } from './test-config/constants';

interface TestTypeTreeProps {
  activeType: TestType | null;
  onNavigate: (type: TestType) => void;
}

export function TestTypeTree({ activeType, onNavigate }: TestTypeTreeProps) {
  const [expanded, setExpanded] = usePersistedState<string[]>('arabtools-nation-expanded', ['receptive']);

  const toggleSection = (id: string) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <nav className="sidebar-nav">
      {categories.map(cat => {
        const isExpanded = expanded.includes(cat.id);
        const hasActive = cat.types.some(t => t === activeType);

        return (
          <div key={cat.id} className="folder-group">
            <button
              className={`folder-header ${hasActive ? 'active' : ''}`}
              onClick={() => toggleSection(cat.id)}
            >
              <svg className={`chevron-icon ${isExpanded ? 'expanded' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="folder-name">{cat.name}</span>
              <span className="folder-count">{cat.types.length}</span>
            </button>

            {isExpanded && (
              <div className="folder-children">
                {cat.types.map(type => {
                  const info = testTypes.find(t => t.type === type);
                  if (!info) return null;
                  const isActive = type === activeType;
                  return (
                    <button
                      key={type}
                      className={`nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => onNavigate(type)}
                    >
                      <span className="nav-icon">{info.icon}</span>
                      <span className="nav-title">{info.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
