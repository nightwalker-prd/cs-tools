import { pickRandom } from '@arabtools/core';
import { useMemo } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { rootFrequency } from '@/data/root-frequency';
import { grammarPatterns } from '@/data/grammar-patterns';
import { lemmas } from '@/data/lemmas';

interface ExploreHubProps {
  navigate: (path: string) => void;
}

export function ExploreHub({ navigate }: ExploreHubProps) {
  const { query, search, results } = useSearch();

  const randomDestination = useMemo(() => {
    const choices = [
      () => {
        const root = pickRandom(rootFrequency)?.root;
        return root ? `#/root/${encodeURIComponent(root)}` : '#/roots';
      },
      () => {
        const pattern = pickRandom(grammarPatterns)?.id;
        return pattern ? `#/pattern/${pattern}` : '#/patterns';
      },
      () => {
        const lemma = pickRandom(lemmas)?.id;
        return lemma ? `#/lemma/${lemma}` : '#/explore';
      },
    ];

    const selected = pickRandom(choices);
    return selected ? selected() : '#/explore';
  }, [query]);

  return (
    <div className="animate-fade-in max-w-4xl mx-auto py-6">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4 text-sm text-muted-foreground">
          <button className="hover:text-primary transition-colors" onClick={() => navigate('#/')}>Home</button>
          <span>/</span>
          <span className="font-semibold text-primary">Explore</span>
        </div>
        <h1 className="font-serif text-4xl text-primary mb-3">Explore Hub</h1>
        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Discover Quranic vocabulary through roots, frequency lists, and grammar patterns.
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto mb-12">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <input
          type="text"
          className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl shadow-sm focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all outline-none"
          placeholder="Search by Arabic, meaning, or transliteration..."
          value={query}
          onChange={(event) => search(event.target.value)}
        />
      </div>

      {query.length >= 2 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {results.length === 0 ? (
            <div className="col-span-full text-center py-10 text-muted-foreground bg-muted/30 rounded-xl border border-dashed border-border">
              No words match your search.
            </div>
          ) : (
            results.slice(0, 8).map((result) => (
              <button
                key={result.lemmaId}
                className="flex flex-col gap-1 text-left p-4 bg-card border border-border rounded-xl hover:border-accent hover:shadow-md transition-all group"
                onClick={() => navigate(`#/lemma/${result.lemmaId}`)}
              >
                <span className="font-arabic text-2xl text-primary group-hover:text-accent transition-colors" dir="rtl">{result.lemma}</span>
                <span className="text-sm font-medium text-foreground">{result.meaning}</span>
                <span className="text-xs italic text-muted-foreground">{result.transliteration}</span>
              </button>
            ))
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button 
          className="flex flex-col p-6 bg-card border border-border rounded-xl hover:border-accent hover:shadow-lg transition-all text-left group"
          onClick={() => navigate('#/roots')}
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10a6 6 0 0 0-6-6c-2 0-3 .9-3 2.08 0 1.25.98 2.37 2.08 3 1.15.6 2.37.9 3.92 1.92C11 12.5 13 15 13 18"/><path d="M12 10a6 6 0 0 1 6-6c2 0 3 .9 3 2.08 0 1.25-.98 2.37-2.08 3-1.15.6-2.37.9-3.92 1.92C13 12.5 11 15 11 18"/></svg>
          </div>
          <h3 className="font-serif text-xl font-semibold text-primary mb-2">Roots Browser</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Explore word families derived from the same triliteral root across the entire Quran.</p>
        </button>

        <button 
          className="flex flex-col p-6 bg-card border border-border rounded-xl hover:border-accent hover:shadow-lg transition-all text-left group"
          onClick={() => navigate('#/frequency/1')}
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-4 group-hover:scale-110 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
          </div>
          <h3 className="font-serif text-xl font-semibold text-primary mb-2">Frequency Lists</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Prioritize learning by starting with the most frequently occurring words and roots.</p>
        </button>

        <button 
          className="flex flex-col p-6 bg-card border border-border rounded-xl hover:border-accent hover:shadow-lg transition-all text-left group"
          onClick={() => navigate('#/patterns')}
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-purple-50 text-purple-600 mb-4 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
          </div>
          <h3 className="font-serif text-xl font-semibold text-primary mb-2">Grammar Patterns</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Understand morphology by studying recurring word patterns and their meanings.</p>
        </button>

        <button 
          className="flex flex-col p-6 bg-card border border-border rounded-xl hover:border-accent hover:shadow-lg transition-all text-left group"
          onClick={() => navigate(randomDestination)}
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-amber-50 text-amber-600 mb-4 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="8.5" cy="15.5" r="1.5"/></svg>
          </div>
          <h3 className="font-serif text-xl font-semibold text-primary mb-2">Random Discovery</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Let serendipity guide you to a random root, word, or pattern to study.</p>
        </button>
      </div>
    </div>
  );
}
