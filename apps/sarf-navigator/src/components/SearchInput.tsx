import { useRef, useEffect } from 'react';
import type { SearchResult } from '../hooks/useSearch';

interface SearchInputProps {
  query: string;
  results: SearchResult[];
  onQueryChange: (q: string) => void;
  onSelect: (topicId: string) => void;
  onClear: () => void;
}

export function SearchInput({ query, results, onQueryChange, onSelect, onClear }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        onClear();
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClear]);

  return (
    <div className="search-wrapper">
      <div className="search-input-container">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search topics... (/)"
          value={query}
          onChange={e => onQueryChange(e.target.value)}
        />
        {query && (
          <button className="search-clear" onClick={onClear} aria-label="Clear search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      {query.length >= 2 && (
        <div className="search-results">
          {results.length === 0 ? (
            <div className="search-empty">No topics found</div>
          ) : (
            results.map(r => (
              <button
                key={r.topic.id}
                className="search-result-item"
                onClick={() => {
                  onSelect(r.topic.id);
                  onClear();
                }}
              >
                <span className="search-result-title">{r.topic.titleEn}</span>
                <span className="search-result-ar font-arabic">{r.topic.titleAr}</span>
                <span className="search-result-category">{r.categoryName}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
