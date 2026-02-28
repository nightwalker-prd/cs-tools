import { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import type { SearchResult } from '../types';
import { DifficultyBadge } from './DifficultyBadge';

interface SearchInputProps {
  query: string;
  results: SearchResult[];
  onQueryChange: (q: string) => void;
  onSelect: (id: string) => void;
  onClear: () => void;
}

export function SearchInput({ query, results, onQueryChange, onSelect, onClear }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="search-wrapper">
      <div className="search-input-container">
        <Search size={14} className="search-icon" />
        <input
          ref={inputRef}
          className="search-input"
          type="text"
          placeholder="Search challenges..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        {query ? (
          <button className="search-clear" onClick={onClear}>
            <X size={14} />
          </button>
        ) : (
          <span className="search-shortcut">/</span>
        )}
      </div>

      {query && (
        <div className="search-results">
          {results.length === 0 ? (
            <div className="search-empty">No challenges found</div>
          ) : (
            results.map(({ challenge }) => (
              <button
                key={challenge.id}
                className="search-result-item"
                onClick={() => onSelect(challenge.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="search-result-title">{challenge.title}</span>
                  <DifficultyBadge difficulty={challenge.difficulty} />
                </div>
                <span className="search-result-category">{challenge.topic}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
