import { useState, useMemo } from 'react';
import { Search, Network, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { rootFrequency, rootFrequencyMap } from '@/data/root-frequency';
import { rootToLemma } from '@/data/root-to-lemma';
import { semanticClusters } from '@/data/semantic-clusters';
import { FrequencyBadge } from '@/components/shared/FrequencyBadge';
import { usePersistedState } from '@arabtools/core';

interface FamilyHubProps {
  navigate: (path: string) => void;
}

const TOP_ROOT_COUNT = 12;

export function FamilyHub({ navigate }: FamilyHubProps) {
  const [query, setQuery] = useState('');
  const [recentRoots] = usePersistedState<string[]>('arabtools-kalimat-recent-roots', []);

  const topRoots = useMemo(() => rootFrequency.slice(0, TOP_ROOT_COUNT), []);

  const searchResults = useMemo(() => {
    if (query.length < 1) return [];
    const q = query.trim();
    return rootFrequency
      .filter(r => r.root.includes(q))
      .slice(0, 8);
  }, [query]);

  const clusterStats = useMemo(() => {
    return semanticClusters.map(cluster => {
      let totalFreq = 0;
      let validRoots = 0;
      for (const root of cluster.roots) {
        const freq = rootFrequencyMap[root];
        if (freq) {
          totalFreq += freq.count;
          validRoots++;
        }
      }
      return { ...cluster, totalFreq, validRoots };
    });
  }, []);

  return (
    <div className="animate-fade-in max-w-5xl mx-auto py-8 px-4">
      {/* Hero */}
      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <Network size={24} className="text-accent" />
            <h1 className="font-serif text-3xl text-primary">Word Families</h1>
          </div>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Explore how Arabic roots branch into families of related words. Browse by root, discover
            semantic clusters, or search for any root in the Quran.
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-3 py-2">
              <Search size={16} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                className="bg-transparent border-none outline-none w-full text-sm font-arabic"
                placeholder="Search for a root... (e.g. كتب)"
                value={query}
                onChange={e => setQuery(e.target.value)}
                dir="rtl"
              />
            </div>
            {searchResults.length > 0 && (
              <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                {searchResults.map(r => (
                  <button
                    key={r.root}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-muted/50 transition-colors"
                    onClick={() => {
                      navigate(`#/family/${encodeURIComponent(r.root)}`);
                      setQuery('');
                    }}
                  >
                    <span className="font-arabic text-lg text-primary" dir="rtl">{r.root}</span>
                    <FrequencyBadge tier={r.tier} count={r.count} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      {recentRoots.length > 0 && (
        <section className="mb-8">
          <h2 className="font-serif text-xl text-primary mb-4 flex items-center gap-2">
            <Clock size={18} className="text-accent" />
            Recently Viewed
          </h2>
          <div className="flex flex-wrap gap-2">
            {recentRoots.slice(0, 8).map(root => {
              const freq = rootFrequencyMap[root];
              return (
                <button
                  key={root}
                  className="bg-card border border-border rounded-lg px-4 py-2 hover:border-accent/50 transition-colors flex items-center gap-3"
                  onClick={() => navigate(`#/family/${encodeURIComponent(root)}`)}
                >
                  <span className="font-arabic text-lg text-primary" dir="rtl">{root}</span>
                  {freq && <FrequencyBadge tier={freq.tier} />}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Top Roots */}
      <section className="mb-8">
        <h2 className="font-serif text-xl text-primary mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-accent" />
          Top Roots by Frequency
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {topRoots.map((r, i) => {
            const derivedCount = rootToLemma[r.root]?.length ?? 0;
            return (
              <button
                key={r.root}
                className="bg-card border border-border rounded-xl p-4 hover:border-accent/50 hover:shadow-sm transition-all text-left"
                onClick={() => navigate(`#/family/${encodeURIComponent(r.root)}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-semibold">#{i + 1}</span>
                  <FrequencyBadge tier={r.tier} count={r.count} />
                </div>
                <div className="font-arabic text-2xl text-primary mb-1" dir="rtl" style={{ lineHeight: 1.6 }}>
                  {r.root.split('').join(' - ')}
                </div>
                <div className="text-xs text-muted-foreground">
                  {derivedCount} derived word{derivedCount !== 1 ? 's' : ''}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Semantic Clusters */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl text-primary flex items-center gap-2">
            <Network size={18} className="text-accent" />
            Semantic Clusters
          </h2>
          <button
            className="text-sm text-accent hover:underline flex items-center gap-1"
            onClick={() => navigate('#/clusters')}
          >
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {clusterStats.slice(0, 9).map(cluster => (
            <button
              key={cluster.id}
              className="bg-card border border-border rounded-xl p-4 hover:border-accent/50 hover:shadow-sm transition-all text-left"
              onClick={() => navigate(`#/cluster/${cluster.id}`)}
            >
              <div className="font-arabic text-xl text-primary mb-1" dir="rtl">{cluster.nameAr}</div>
              <div className="text-sm font-semibold text-foreground mb-1">{cluster.nameEn}</div>
              <div className="text-xs text-muted-foreground">
                {cluster.validRoots} root{cluster.validRoots !== 1 ? 's' : ''} &middot; {cluster.totalFreq.toLocaleString()} occurrences
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
