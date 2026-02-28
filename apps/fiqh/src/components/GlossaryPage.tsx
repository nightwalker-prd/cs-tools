import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { removeDiacritics, normalizeArabic } from '@arabtools/core';
import type { FiqhTerm } from '../types';
import { Breadcrumb } from './Breadcrumb';

interface GlossaryPageProps {
  terms: FiqhTerm[];
  onGoHome: () => void;
}

export function GlossaryPage({ terms, onGoHome }: GlossaryPageProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(terms.map(t => t.category));
    return Array.from(cats).sort();
  }, [terms]);

  const filtered = useMemo(() => {
    let result = terms;

    if (activeCategory) {
      result = result.filter(t => t.category === activeCategory);
    }

    if (query.trim().length >= 2) {
      const q = removeDiacritics(normalizeArabic(query.trim())).toLowerCase();
      result = result.filter(t => {
        const searchable = removeDiacritics(normalizeArabic(
          [t.termAr, t.termEn, t.transliteration, t.definitionEn].join(' ')
        )).toLowerCase();
        return searchable.includes(q);
      });
    }

    return result;
  }, [terms, query, activeCategory]);

  return (
    <div className="animate-fade-in">
      <Breadcrumb items={[
        { label: 'Home', onClick: onGoHome },
        { label: 'Glossary' },
      ]} />

      <div className="glossary-header">
        <h1>Fiqh Glossary</h1>
        <p>{terms.length} terms</p>
      </div>

      <div className="glossary-controls">
        <div className="glossary-search">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search terms..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <div className="glossary-filters">
          <button
            className={`filter-tag ${activeCategory === null ? 'active' : ''}`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-tag ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="glossary-grid">
        {filtered.map(term => (
          <div key={term.id} className="glossary-card">
            <div className="glossary-card-term-ar" dir="rtl">{term.termAr}</div>
            <div className="glossary-card-translit">{term.transliteration}</div>
            <div className="glossary-card-term-en">{term.termEn}</div>
            <div className="glossary-card-definition">{term.definitionEn}</div>
            <span className="glossary-card-category">{term.category}</span>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <p>No terms match your search.</p>
        </div>
      )}
    </div>
  );
}
