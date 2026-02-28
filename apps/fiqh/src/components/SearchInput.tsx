import { Search, X } from 'lucide-react';
import type { SearchResult } from '../hooks/useSearch';

interface SearchInputProps {
  query: string;
  results: SearchResult[];
  onQueryChange: (q: string) => void;
  onSelect: (result: SearchResult) => void;
  onClear: () => void;
}

export function SearchInput({ query, results, onQueryChange, onSelect, onClear }: SearchInputProps) {
  return (
    <div className="sidebar-search">
      <div className="search-input-container">
        <Search size={14} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search kutub, terms..."
          value={query}
          onChange={e => onQueryChange(e.target.value)}
        />
        {query && (
          <button className="search-clear" onClick={onClear}>
            <X size={14} />
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div className="search-results">
          {results.map(r => (
            <button
              key={`${r.type}-${r.id}`}
              className="search-result-item"
              onClick={() => {
                onSelect(r);
                onClear();
              }}
            >
              <div>
                <div className="search-result-ar">{r.titleAr}</div>
                <div className="search-result-en">
                  {r.titleEn}
                  {r.subtitle && <span style={{ opacity: 0.6 }}> · {r.subtitle}</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
