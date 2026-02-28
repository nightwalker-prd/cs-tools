import { useSearch } from '@/hooks/useSearch';

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

interface SearchBarProps {
  onSelectLemma: (id: number) => void;
}

export function SearchBar({ onSelectLemma }: SearchBarProps) {
  const { query, search, results } = useSearch();

  return (
    <div className="sidebar-search">
      <div className="search-wrapper">
        <div className="search-input-container">
          <SearchIcon className="w-4 h-4 text-muted-foreground" />
          <input
            className="search-input"
            type="text"
            placeholder="Search words..."
            value={query}
            onChange={e => search(e.target.value)}
          />
          {query && (
            <button className="search-clear" onClick={() => search('')}>
              <XIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {query.length >= 2 && (
          <div className="search-results shadow-lg">
            {results.length === 0 ? (
              <div className="search-empty">No results found</div>
            ) : (
              results.slice(0, 10).map(r => (
                <button
                  key={r.lemmaId}
                  className="search-result-item group"
                  onClick={() => {
                    onSelectLemma(r.lemmaId);
                    search('');
                  }}
                >
                  <span className="search-result-ar group-hover:text-amber-700">{r.lemma}</span>
                  <span className="search-result-en">{r.meaning}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
