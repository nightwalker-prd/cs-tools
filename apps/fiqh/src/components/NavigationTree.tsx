import { ChevronRight } from 'lucide-react';
import type { KitabMeta, FiqhTopic, ViewMode } from '../types';
import { CATEGORIES } from '../data/categories';
import { usePersistedState } from '@arabtools/core';

interface NavigationTreeProps {
  index: KitabMeta[];
  topics: FiqhTopic[];
  viewMode: ViewMode;
  activeKitabId: string | null;
  activeTopicId: string | null;
  visitedSections: string[];
  onNavigateKitab: (id: string) => void;
  onNavigateTopic: (id: string) => void;
}

export function NavigationTree({
  index,
  topics,
  viewMode,
  activeKitabId,
  activeTopicId,
  visitedSections,
  onNavigateKitab,
  onNavigateTopic,
}: NavigationTreeProps) {
  const [expanded, setExpanded] = usePersistedState<string[]>('arabtools-fiqh-expanded', []);

  const toggleExpand = (id: string) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  if (viewMode === 'reader') {
    return (
      <nav className="sidebar-nav">
        {CATEGORIES.map(cat => {
          const kutub = index.filter(k => cat.kitabIds.includes(k.id));
          if (kutub.length === 0) return null;
          const isExpanded = expanded.includes(cat.id);

          return (
            <div className="nav-group" key={cat.id}>
              <button
                className={`nav-group-header ${isExpanded ? 'active' : ''}`}
                onClick={() => toggleExpand(cat.id)}
              >
                <ChevronRight size={14} className={`chevron-icon ${isExpanded ? 'expanded' : ''}`} />
                <span className="nav-group-name">{cat.titleEn}</span>
                <span className="nav-group-name-ar">{cat.titleAr}</span>
                <span className="nav-group-count">{kutub.length}</span>
              </button>

              {isExpanded && (
                <div className="nav-group-children">
                  {kutub.map(k => {
                    const isActive = k.id === activeKitabId;
                    const hasVisited = visitedSections.some(s => s.startsWith(k.id));

                    return (
                      <button
                        key={k.id}
                        className={`nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => onNavigateKitab(k.id)}
                      >
                        <span className={`nav-dot ${hasVisited ? 'visited' : ''}`} />
                        <span className="nav-item-name">{k.titleEn}</span>
                        <span className="nav-item-name-ar">{k.titleAr}</span>
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

  // Topic mode
  return (
    <nav className="sidebar-nav">
      {CATEGORIES.map(cat => {
        const catTopics = topics.filter(t => t.categoryId === cat.id);
        if (catTopics.length === 0) return null;
        const isExpanded = expanded.includes(cat.id);

        return (
          <div className="nav-group" key={cat.id}>
            <button
              className={`nav-group-header ${isExpanded ? 'active' : ''}`}
              onClick={() => toggleExpand(cat.id)}
            >
              <ChevronRight size={14} className={`chevron-icon ${isExpanded ? 'expanded' : ''}`} />
              <span className="nav-group-name">{cat.titleEn}</span>
              <span className="nav-group-name-ar">{cat.titleAr}</span>
              <span className="nav-group-count">{catTopics.length}</span>
            </button>

            {isExpanded && (
              <div className="nav-group-children">
                {catTopics.map(t => (
                  <button
                    key={t.id}
                    className={`nav-item ${t.id === activeTopicId ? 'active' : ''}`}
                    onClick={() => onNavigateTopic(t.id)}
                  >
                    <span className="nav-dot" />
                    <span className="nav-item-name">{t.titleEn}</span>
                    <span className="nav-item-name-ar">{t.titleAr}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
