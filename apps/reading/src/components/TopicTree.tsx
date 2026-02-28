import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import type { Collection } from '../data/navigation';
import type { ReadingText } from '../data/reading';

interface TopicTreeProps {
  collections: Collection[];
  activeTextId: string;
  visitedPages: string[];
  onNavigate: (textId: string) => void;
}

export function TopicTree({ collections, activeTextId, visitedPages, onNavigate }: TopicTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    // Auto-expand collection containing active text
    const initial: Record<string, boolean> = {};
    if (activeTextId) {
      for (const col of collections) {
        if (col.texts.some(t => t.id === activeTextId)) {
          initial[col.id] = true;
          break;
        }
      }
    }
    return initial;
  });

  const [expandedSubs, setExpandedSubs] = useState<Record<string, boolean>>({});

  const toggleCollection = (colId: string) => {
    setExpanded(prev => ({ ...prev, [colId]: !prev[colId] }));
  };

  const toggleSubcategory = (key: string) => {
    setExpandedSubs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <nav className="sidebar-nav">
      {collections.map((col) => {
        const isExpanded = expanded[col.id] ?? false;
        const hasActive = col.texts.some(t => t.id === activeTextId);

        // Group texts by subcategory if collection has subcategories
        const subcategories = col.hasSubcategories
          ? groupByCategory(col.texts)
          : null;

        return (
          <div key={col.id} className="folder-group">
            <button
              className={`folder-header${hasActive ? ' active' : ''}`}
              onClick={() => toggleCollection(col.id)}
            >
              <ChevronRight
                size={14}
                className={`chevron-icon${isExpanded ? ' expanded' : ''}`}
              />
              <span className="folder-icon">{col.icon}</span>
              <span className="folder-name">{col.titleEn}</span>
              <span className="folder-count">{col.texts.length}</span>
            </button>

            {isExpanded && (
              <div className="folder-children">
                {subcategories ? (
                  // Render grouped by subcategory
                  Object.entries(subcategories).map(([cat, texts]) => {
                    const subKey = `${col.id}-${cat}`;
                    const isSubExpanded = expandedSubs[subKey] ?? true;
                    return (
                      <div key={subKey} className="subcategory-group">
                        <button
                          className="subcategory-header"
                          onClick={() => toggleSubcategory(subKey)}
                        >
                          <ChevronRight
                            size={12}
                            className={`chevron-icon${isSubExpanded ? ' expanded' : ''}`}
                          />
                          <span className="subcategory-name">{cat}</span>
                        </button>
                        {isSubExpanded && texts.map((t) => (
                          <TextNavItem
                            key={t.id}
                            id={t.id}
                            title={t.title}
                            level={t.level}
                            isActive={t.id === activeTextId}
                            isVisited={visitedPages.includes(t.id)}
                            onClick={() => onNavigate(t.id)}
                          />
                        ))}
                      </div>
                    );
                  })
                ) : (
                  // Render flat list
                  col.texts.map((t) => (
                    <TextNavItem
                      key={t.id}
                      id={t.id}
                      title={t.title}
                      level={t.level}
                      isActive={t.id === activeTextId}
                      isVisited={visitedPages.includes(t.id)}
                      onClick={() => onNavigate(t.id)}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

function TextNavItem({ id: _id, title, level, isActive, isVisited, onClick }: {
  id: string;
  title: string;
  level: string;
  isActive: boolean;
  isVisited: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`nav-item${isActive ? ' active' : ''}`}
      onClick={onClick}
    >
      <span className={`nav-dot${isVisited ? ' visited' : ''}`} />
      <span className="nav-title">{title}</span>
      <span className="level-dots">
        <span className={`level-dot ${level}`} />
      </span>
    </button>
  );
}

function groupByCategory(texts: ReadingText[]): Record<string, ReadingText[]> {
  const groups: Record<string, ReadingText[]> = {};
  for (const t of texts) {
    const cat = t.category;
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(t);
  }
  return groups;
}
