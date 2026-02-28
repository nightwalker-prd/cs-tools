import { useState, useMemo, useCallback } from 'react';
import { usePersistedState } from '@arabtools/core';
import { Map } from 'lucide-react';
import { domains, searchNodes } from '@/data/domains';
import { SearchBar } from './SearchBar';
import { DomainCard } from './DomainCard';
import { DiagramModal } from './DiagramModal';
import { Legend } from './Legend';
import { useProgress } from '@/hooks/useProgress';
import type { DomainDiagram } from '@/data/types';

export function NahwAtlas() {
  const [selectedDomain, setSelectedDomain] = useState<DomainDiagram | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [, setLastViewed] = usePersistedState<string | null>('arabtools-nahw-atlas-last-viewed', null);

  // Feature 2: Progress tracking
  const { toggleLearned, isLearned, getDomainProgress } = useProgress();

  const { matchedDomainIds } = useMemo(
    () => searchNodes(searchQuery),
    [searchQuery]
  );

  const hasSearch = searchQuery.trim().length > 0;

  const handleCardClick = useCallback((domain: DomainDiagram) => {
    setSelectedDomain(domain);
    setDialogOpen(true);
    setLastViewed(domain.id);
  }, [setLastViewed]);

  const totalTopics = useMemo(
    () => domains.reduce((sum, d) => sum + d.topicCount, 0),
    []
  );
  const totalRules = useMemo(
    () => domains.reduce((sum, d) => sum + d.ruleCount, 0),
    []
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/60 backdrop-blur-md sticky top-0 z-40 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Map className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-primary">Nahw Atlas</h1>
                <p className="text-xs text-muted-foreground">
                  {totalTopics} topics &middot; {totalRules} rules &middot; 8 domains
                </p>
              </div>
            </div>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </header>

      {/* Legend Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2 no-print">
        <Legend />
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {domains.map((domain, index) => (
            <DomainCard
              key={domain.id}
              domain={domain}
              index={index}
              isMatch={hasSearch && matchedDomainIds.has(domain.id)}
              isDimmed={hasSearch && !matchedDomainIds.has(domain.id)}
              onClick={() => handleCardClick(domain)}
              progress={getDomainProgress(domain.id, domain.nodes.length)}
            />
          ))}
        </div>
      </main>

      {/* Modal */}
      <DiagramModal
        domain={selectedDomain}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        isLearned={isLearned}
        toggleLearned={toggleLearned}
      />
    </div>
  );
}
