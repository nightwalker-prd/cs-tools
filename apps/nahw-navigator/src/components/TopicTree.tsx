import { useState } from 'react';
import { usePersistedState } from '@arabtools/core';
import type { NahwTopic, NahwCategory } from '../data/types';
import { LevelDots } from './LevelTabs';

interface TopicTreeProps {
  categories: NahwCategory[];
  topicMap: Record<string, NahwTopic>;
  activeSlug: string;
  visitedPages: string[];
  onNavigate: (slug: string) => void;
}

export function TopicTree({ categories, topicMap, activeSlug, visitedPages, onNavigate }: TopicTreeProps) {
  const [expanded, setExpanded] = usePersistedState<string[]>('arabtools-nahw-expanded', ['introduction']);

  const toggleSection = (id: string) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <nav className="sidebar-nav">
      {categories.map(cat => {
        const isExpanded = expanded.includes(cat.id);
        const hasActiveTopic = cat.subcategories.some(sub =>
          sub.topicIds.some(tid => tid === activeSlug)
        );

        return (
          <div key={cat.id} className="folder-group">
            <button
              className={`folder-header ${hasActiveTopic ? 'active' : ''}`}
              onClick={() => toggleSection(cat.id)}
            >
              <svg className={`chevron-icon ${isExpanded ? 'expanded' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="folder-name">{cat.titleEn}</span>
              <span className="folder-title-ar">{cat.titleAr}</span>
            </button>

            {isExpanded && (
              <div className="folder-children">
                {cat.subcategories.map(sub => (
                  <SubcategoryGroup
                    key={sub.id}
                    subcategory={sub}
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

interface SubcategoryGroupProps {
  subcategory: { id: string; titleEn: string; titleAr: string; topicIds: string[] };
  topicMap: Record<string, NahwTopic>;
  activeSlug: string;
  visitedPages: string[];
  onNavigate: (slug: string) => void;
}

function SubcategoryGroup({ subcategory, topicMap, activeSlug, visitedPages, onNavigate }: SubcategoryGroupProps) {
  const [subExpanded, setSubExpanded] = useState(true);
  const topics = subcategory.topicIds.map(id => topicMap[id]).filter(Boolean);

  if (topics.length === 0) return null;

  // If only one topic, skip the subcategory header
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
        <LevelDots levels={topic.levels} />
      </button>
    );
  }

  return (
    <div className="subcategory-group">
      <button
        className="subcategory-header"
        onClick={() => setSubExpanded(!subExpanded)}
      >
        <span className="subcategory-name">{subcategory.titleEn}</span>
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
            <LevelDots levels={topic.levels} />
          </button>
        );
      })}
    </div>
  );
}
