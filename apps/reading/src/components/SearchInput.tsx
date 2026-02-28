import { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import type { SearchResult } from '../hooks/useSearch';

interface SearchInputProps {
  query: string;
  results: SearchResult[];
  onQueryChange: (q: string) => void;
  onClearSearch: () => void;
  onSelect: (textId: string) => void;
}

export function SearchInput({ query, results, onQueryChange, onClearSearch, onSelect }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="sidebar-search">
      <div className="search-wrapper">
        <div className="search-input-container">
          <Search size={14} className="search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search texts... ( / )"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          {query && (
            <button className="search-clear" onClick={onClearSearch}>
              <X size={14} />
            </button>
          )}
        </div>

        {query.length >= 2 && (
          <div className="search-results">
            {results.length > 0 ? (
              results.map((r) => (
                <button
                  key={r.text.id}
                  className="search-result-item"
                  onClick={() => {
                    onSelect(r.text.id);
                    onClearSearch();
                  }}
                >
                  <span className="search-result-title">{r.text.title}</span>
                  <span className="search-result-ar font-arabic">{r.text.titleAr}</span>
                  <span className="search-result-category">{r.text.category}</span>
                </button>
              ))
            ) : (
              <div className="search-empty">No texts found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
