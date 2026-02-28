import { useState } from 'react';
import { usePersistedState } from '@arabtools/core';
import type { BalagahTopic, BalagahUnit } from '../data/types';

interface TopicTreeProps {
  units: BalagahUnit[];
  topicMap: Record<string, BalagahTopic>;
  activeSlug: string;
  visitedPages: string[];
  onNavigate: (slug: string) => void;
}

export function TopicTree({ units, topicMap, activeSlug, visitedPages, onNavigate }: TopicTreeProps) {
  const [expanded, setExpanded] = usePersistedState<string[]>('arabtools-balagah-expanded', ['maani']);

  const toggleSection = (id: string) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <nav className="sidebar-nav">
      {units.map(unit => {
        const isExpanded = expanded.includes(unit.id);
        const hasActiveTopic = unit.parts.some(part =>
          part.topicIds.some(tid => tid === activeSlug)
        );

        return (
          <div key={unit.id} className="folder-group">
            <button
              className={`folder-header ${hasActiveTopic ? 'active' : ''}`}
              onClick={() => toggleSection(unit.id)}
            >
              <svg className={`chevron-icon ${isExpanded ? 'expanded' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="folder-name">{unit.titleEn}</span>
              <span className="folder-title-ar">{unit.titleAr}</span>
            </button>

            {isExpanded && (
              <div className="folder-children">
                {unit.parts.map(part => (
                  <PartGroup
                    key={part.id}
                    part={part}
                    topicMap={topicMap}
                    activeSlug={activeSlug}
                    visitedPages={visitedPages}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

interface PartGroupProps {
  part: { id: string; titleEn: string; titleAr: string; topicIds: string[] };
  topicMap: Record<string, BalagahTopic>;
  activeSlug: string;
  visitedPages: string[];
  onNavigate: (slug: string) => void;
}

function PartGroup({ part, topicMap, activeSlug, visitedPages, onNavigate }: PartGroupProps) {
  const [subExpanded, setSubExpanded] = useState(true);
  const topics = part.topicIds.map(id => topicMap[id]).filter(Boolean);

  if (topics.length === 0) return null;

  if (topics.length === 1) {
    const topic = topics[0];
    const isActive = topic.id === activeSlug;
    const isVisited = visitedPages.includes(topic.id);
    return (
      <button
        className={`nav-item ${isActive ? 'active' : ''}`}
        onClick={() => onNavigate(topic.id)}
      >
        <span className={`nav-dot ${isVisited ? 'visited' : ''}`} />
        <span className="nav-title">{topic.titleEn}</span>
      </button>
    );
  }

  return (
    <div className="subcategory-group">
      <button
        className="subcategory-header"
        onClick={() => setSubExpanded(!subExpanded)}
      >
        <span className="subcategory-name">{part.titleEn}</span>
      </button>
      {subExpanded && topics.map(topic => {
        const isActive = topic.id === activeSlug;
        const isVisited = visitedPages.includes(topic.id);
        return (
          <button
            key={topic.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onNavigate(topic.id)}
          >
            <span className={`nav-dot ${isVisited ? 'visited' : ''}`} />
            <span className="nav-title">{topic.titleEn}</span>
          </button>
        );
      })}
    </div>
  );
}
