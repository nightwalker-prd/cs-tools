import { useState, useMemo } from 'react';
import { grammarPatterns, PATTERN_CATEGORIES } from '@/data/grammar-patterns';
import type { PatternCategory } from '@/types';

interface PatternBrowserProps {
  navigate: (path: string) => void;
}

export function PatternBrowser({ navigate }: PatternBrowserProps) {
  const [activeCategory, setActiveCategory] = useState<PatternCategory | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = grammarPatterns;
    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(p =>
        p.form.includes(q) ||
        p.formD.includes(q) ||
        p.friendlyName.toLowerCase().includes(q) ||
        p.changeId.toLowerCase().includes(q) ||
        p.explanation.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, search]);

  return (
    <div className="animate-fade-in" style={{ maxWidth: 900 }}>
      <div className="topic-header">
        <div className="breadcrumb">
          <button className="breadcrumb-link" onClick={() => navigate('#/')}>Home</button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Grammar Patterns</span>
        </div>
        <h1 className="topic-title-en">Grammar Patterns</h1>
        <p className="topic-description">
          {grammarPatterns.length} patterns covering every word transformation in the Quran
        </p>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          className="pattern-search-input"
          placeholder="Search patterns..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Category tabs */}
      <div className="category-tabs">
        <button
          className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All ({grammarPatterns.length})
        </button>
        {PATTERN_CATEGORIES.map(cat => {
          const count = grammarPatterns.filter(p => p.category === cat.key).length;
          return (
            <button
              key={cat.key}
              className={`category-tab ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Pattern cards */}
      <div className="pattern-cards">
        {filtered.map(p => (
          <button
            key={p.id}
            className="pattern-card"
            onClick={() => navigate(`#/pattern/${p.id}`)}
          >
            <div className="pattern-card-arabic font-arabic" dir="rtl">
              {p.form}
            </div>
            <div className="pattern-card-name">{p.friendlyName}</div>
            <div className="pattern-card-desc">{p.formDesc}</div>
            <div className="pattern-card-freq">
              {p.count.toLocaleString()} occurrences
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ color: 'var(--color-muted-foreground)', textAlign: 'center', padding: '2rem 0' }}>
          No patterns match your search.
        </p>
      )}
    </div>
  );
}
