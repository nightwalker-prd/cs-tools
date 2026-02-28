import { useState, useMemo } from 'react';
import { ArrowLeft, ChevronRight, Search, Network } from 'lucide-react';
import { semanticClusters } from '@/data/semantic-clusters';
import { rootFrequencyMap } from '@/data/root-frequency';

interface ClusterBrowserProps {
  navigate: (path: string) => void;
}

export function ClusterBrowser({ navigate }: ClusterBrowserProps) {
  const [query, setQuery] = useState('');

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

  const filtered = useMemo(() => {
    if (!query.trim()) return clusterStats;
    const q = query.trim().toLowerCase();
    return clusterStats.filter(c =>
      c.nameEn.toLowerCase().includes(q) ||
      c.nameAr.includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  }, [query, clusterStats]);

  return (
    <div className="animate-fade-in max-w-5xl mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
        <button className="hover:text-primary transition-colors flex items-center gap-1" onClick={() => navigate('#/')}>
          <ArrowLeft size={14} /> Home
        </button>
        <ChevronRight size={14} />
        <button className="hover:text-primary transition-colors" onClick={() => navigate('#/families')}>
          Word Families
        </button>
        <ChevronRight size={14} />
        <span className="font-semibold text-primary">Semantic Clusters</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-primary mb-2 flex items-center gap-3">
          <Network size={24} className="text-accent" />
          Semantic Clusters
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Browse Quranic roots organized by meaning. Each cluster groups related roots that share
          a common semantic field.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
          <Search size={16} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            className="bg-transparent border-none outline-none w-full text-sm"
            placeholder="Filter clusters..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(cluster => (
          <button
            key={cluster.id}
            className="bg-card border border-border rounded-xl p-5 hover:border-accent/50 hover:shadow-sm transition-all text-left"
            onClick={() => navigate(`#/cluster/${cluster.id}`)}
          >
            <div className="font-arabic text-2xl text-primary mb-1" dir="rtl" style={{ lineHeight: 1.6 }}>
              {cluster.nameAr}
            </div>
            <div className="text-base font-semibold text-foreground mb-2">{cluster.nameEn}</div>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{cluster.description}</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{cluster.validRoots} root{cluster.validRoots !== 1 ? 's' : ''}</span>
              <span>&middot;</span>
              <span>{cluster.totalFreq.toLocaleString()} occurrences</span>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <p className="text-muted-foreground">No clusters match your search.</p>
        </div>
      )}
    </div>
  );
}
