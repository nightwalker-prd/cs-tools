import { useRef, useEffect, useMemo } from 'react';
import type { GameType, GameCategory } from '../types';
import { cognitiveGames, allQuranGames } from '../data/categories';

interface SearchInputProps {
  query: string;
  onQueryChange: (q: string) => void;
  onSelect: (category: GameCategory, gameId: GameType) => void;
  onClear: () => void;
}

export function SearchInput({ query, onQueryChange, onSelect, onClear }: SearchInputProps) {
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

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    const matchFilter = (g: { title: string; description: string }) =>
      g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q);
    return [
      ...cognitiveGames.filter(matchFilter).map((g) => ({ ...g, category: 'cognitive' as GameCategory })),
      ...allQuranGames.filter(matchFilter).map((g) => ({ ...g, category: 'quran' as GameCategory })),
    ];
  }, [query]);

  return (
    <div className="search-wrapper">
      <div className="search-input-container">
        <svg
          className="search-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search games... (/)"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        {query && (
          <button className="search-clear" onClick={onClear} aria-label="Clear search">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      {query.length >= 2 && (
        <div className="search-results">
          {results.length === 0 ? (
            <div className="search-empty">No games found</div>
          ) : (
            results.map((g) => (
              <button
                key={g.id}
                className="search-result-item"
                onClick={() => {
                  onSelect(g.category, g.id);
                  onClear();
                }}
              >
                <span className="search-result-title">
                  {g.icon} {g.title}
                </span>
                <span className="search-result-desc">{g.description}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
