import { useMemo } from 'react';
import { ArrowLeft, ChevronRight, Network } from 'lucide-react';
import { semanticClusters } from '@/data/semantic-clusters';
import { rootFrequencyMap } from '@/data/root-frequency';
import { rootToLemma } from '@/data/root-to-lemma';
import { lemmas } from '@/data/lemmas';
import { FrequencyBadge } from '@/components/shared/FrequencyBadge';

interface ClusterDetailProps {
  id: string;
  navigate: (path: string) => void;
}

export function ClusterDetail({ id, navigate }: ClusterDetailProps) {
  const cluster = semanticClusters.find(c => c.id === id);

  const rootCards = useMemo(() => {
    if (!cluster) return [];
    return cluster.roots.map(root => {
      const freq = rootFrequencyMap[root];
      const ids = rootToLemma[root] ?? [];
      const firstLemma = ids.length > 0 ? lemmas.find(l => l.id === ids[0]) : null;
      return {
        root,
        freq,
        derivedCount: ids.length,
        coreMeaning: firstLemma?.meaning ?? '',
      };
    }).sort((a, b) => (b.freq?.count ?? 0) - (a.freq?.count ?? 0));
  }, [cluster]);

  if (!cluster) {
    return (
      <div className="animate-fade-in max-w-4xl mx-auto py-8 px-4">
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <p className="text-muted-foreground">Cluster not found.</p>
          <button className="btn mt-4" onClick={() => navigate('#/clusters')}>
            Browse Clusters
          </button>
        </div>
      </div>
    );
  }

  const totalFreq = rootCards.reduce((sum, r) => sum + (r.freq?.count ?? 0), 0);

  return (
    <div className="animate-fade-in max-w-4xl mx-auto py-8 px-4">
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
        <button className="hover:text-primary transition-colors" onClick={() => navigate('#/clusters')}>
          Clusters
        </button>
        <ChevronRight size={14} />
        <span className="font-semibold text-primary">{cluster.nameEn}</span>
      </div>

      {/* Header Card */}
      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-1">
            <Network size={20} className="text-accent" />
            <span className="text-xs font-semibold uppercase text-muted-foreground">Semantic Cluster</span>
          </div>
          <h1 className="font-arabic text-4xl text-primary mb-2" dir="rtl" style={{ lineHeight: 1.6 }}>
            {cluster.nameAr}
          </h1>
          <h2 className="font-serif text-2xl text-primary mb-3">{cluster.nameEn}</h2>
          <p className="text-muted-foreground mb-4">{cluster.description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{rootCards.length} root{rootCards.length !== 1 ? 's' : ''}</span>
            <span>&middot;</span>
            <span>{totalFreq.toLocaleString()} total occurrences in the Quran</span>
          </div>
        </div>
      </div>

      {/* Root Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rootCards.map(({ root, freq, derivedCount, coreMeaning }) => (
          <button
            key={root}
            className="bg-card border border-border rounded-xl p-5 hover:border-accent/50 hover:shadow-sm transition-all text-left"
            onClick={() => navigate(`#/family/${encodeURIComponent(root)}`)}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-arabic text-3xl text-primary" dir="rtl" style={{ lineHeight: 1.6, letterSpacing: '0.1em' }}>
                  {root.split('').join(' - ')}
                </div>
                {coreMeaning && (
                  <div className="text-sm text-foreground mt-1 line-clamp-1">{coreMeaning}</div>
                )}
              </div>
              {freq && <FrequencyBadge tier={freq.tier} count={freq.count} />}
            </div>
            <div className="text-xs text-muted-foreground mt-3">
              {derivedCount} derived word{derivedCount !== 1 ? 's' : ''}
            </div>
          </button>
        ))}
      </div>

      {rootCards.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <p className="text-muted-foreground">No roots found for this cluster.</p>
        </div>
      )}
    </div>
  );
}
