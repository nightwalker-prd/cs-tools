import { useMemo, useState, useEffect } from 'react';
import { rootFrequencyMap } from '@/data/root-frequency';
import { rootToLemma } from '@/data/root-to-lemma';
import { lemmas } from '@/data/lemmas';
import { FrequencyBadge } from '@/components/shared/FrequencyBadge';
import { useRootFamilyTree } from '@/hooks/useRootFamilyTree';
import { ArrowLeft, ChevronRight, BookOpen, Layers, Map } from 'lucide-react';
import { RootJourneyMap } from '@/components/browse/RootJourneyMap';
import type { RootFamilyData } from '@/types';

interface RootDetailProps {
  root: string;
  navigate: (path: string) => void;
}

export function RootDetail({ root, navigate }: RootDetailProps) {
  const freq = rootFrequencyMap[root];
  const lemmaIds = rootToLemma[root] ?? [];
  const { loadFamilyTree, loading: familyLoading } = useRootFamilyTree();
  const [familyData, setFamilyData] = useState<RootFamilyData | null>(null);

  useEffect(() => {
    loadFamilyTree(root).then(setFamilyData);
  }, [root, loadFamilyTree]);

  const relatedLemmas = useMemo(() => {
    return lemmaIds
      .map(id => lemmas.find(l => l.id === id))
      .filter(Boolean) as typeof lemmas;
  }, [lemmaIds]);

  // Format root with separators: "علم" → "ع-ل-م"
  const formattedRoot = root.split('').join(' - ');

  return (
    <div className="animate-fade-in max-w-4xl mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
        <button className="hover:text-primary transition-colors flex items-center gap-1" onClick={() => navigate('#/')}>
          <ArrowLeft size={14} /> Home
        </button>
        <ChevronRight size={14} />
        <button className="hover:text-primary transition-colors" onClick={() => navigate('#/roots')}>Roots</button>
        <ChevronRight size={14} />
        <span className="font-arabic font-bold text-primary" dir="rtl">{root}</span>
      </div>

      {/* Hero Section */}
      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm mb-8 relative">
        <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-full" />

        <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative z-10">
          <div className="text-left">
            <h1 className="font-arabic text-6xl text-primary mb-3 py-2" dir="rtl" style={{ lineHeight: 1.6, letterSpacing: '0.15em' }}>
              {formattedRoot}
            </h1>
            <p className="font-serif text-lg text-muted-foreground">
              Arabic Root
            </p>
          </div>

          <div className="flex flex-col gap-3 min-w-[200px] w-full md:w-auto">
            {freq && (
              <div className="flex items-center justify-between gap-4 bg-muted/30 p-3 rounded-lg border border-border/50">
                <span className="text-xs font-semibold uppercase text-muted-foreground">Frequency</span>
                <FrequencyBadge tier={freq.tier} count={freq.count} />
              </div>
            )}

            <div className="flex items-center justify-between gap-4 bg-muted/30 p-3 rounded-lg border border-border/50">
              <span className="text-xs font-semibold uppercase text-muted-foreground">Derived Words</span>
              <span className="text-sm font-semibold text-primary">{relatedLemmas.length}</span>
            </div>

            {familyData && (
              <div className="flex items-center justify-between gap-4 bg-muted/30 p-3 rounded-lg border border-border/50">
                <span className="text-xs font-semibold uppercase text-muted-foreground">Quran Forms</span>
                <span className="text-sm font-semibold text-primary">{familyData.derivedForms.length}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Root Journey Map */}
      <section className="mb-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px bg-border flex-1" />
          <div className="w-2 h-2 rotate-45 bg-accent" />
          <div className="h-px bg-border flex-1" />
        </div>
        <h2 className="font-serif text-2xl text-primary mb-4 flex items-center gap-2">
          <Map size={20} className="text-accent" />
          Root Journey Across the Quran
        </h2>
        <RootJourneyMap root={root} navigate={navigate} />
      </section>

      {/* Separator */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px bg-border flex-1" />
        <div className="w-2 h-2 rotate-45 bg-accent" />
        <div className="h-px bg-border flex-1" />
      </div>

      {/* Derived Words Section */}
      <section className="mb-8">
        <h2 className="font-serif text-2xl text-primary mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-accent" />
          Derived Words ({relatedLemmas.length})
        </h2>

        {relatedLemmas.length > 0 ? (
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <table className="word-table">
              <thead>
                <tr>
                  <th className="arabic-col">Arabic</th>
                  <th>Meaning</th>
                  <th>Transliteration</th>
                </tr>
              </thead>
              <tbody>
                {relatedLemmas.map(l => (
                  <tr key={l.id} onClick={() => navigate(`#/lemma/${l.id}`)}>
                    <td className="arabic-cell">{l.lemma}</td>
                    <td style={{ fontSize: '0.85rem' }}>{l.meaning}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--color-accent)', fontStyle: 'italic' }}>
                      {l.transliteration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <p className="text-muted-foreground italic text-sm text-center py-4">
              No lemma entries found for this root.
            </p>
          </div>
        )}
      </section>

      {/* Word Forms Section */}
      {familyLoading && (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      )}

      {familyData && (familyData.baseForms.length > 0 || familyData.derivedForms.length > 0) && (
        <section>
          {/* Separator */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-border flex-1" />
            <div className="w-2 h-2 rotate-45 bg-accent" />
            <div className="h-px bg-border flex-1" />
          </div>

          <h2 className="font-serif text-2xl text-primary mb-4 flex items-center gap-2">
            <Layers size={20} className="text-accent" />
            Word Forms in the Quran ({familyData.derivedForms.length})
          </h2>

          {/* Base forms */}
          {familyData.baseForms.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6">
              {familyData.baseForms.map((bf, i) => (
                <div key={i} className="bg-card border border-border rounded-xl px-5 py-3 flex items-center gap-3 shadow-sm">
                  <span className="font-arabic text-2xl text-primary" dir="rtl" style={{ lineHeight: 1.8 }}>{bf.w}</span>
                  <div className="flex flex-col">
                    {bf.pn && <span className="text-xs text-muted-foreground">{bf.pn}</span>}
                    <span className="text-xs font-semibold text-accent">{bf.c}x</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Derived forms table */}
          {familyData.derivedForms.length > 0 && (
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <table className="word-table">
                <thead>
                  <tr>
                    <th className="arabic-col">Word</th>
                    <th>Meaning</th>
                    <th>Steps</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {familyData.derivedForms.map((df, i) => {
                    const ref = df.ref?.split(':');
                    return (
                      <tr
                        key={i}
                        onClick={ref ? () => navigate(`#/word/${ref[0]}/${ref[1]}/${ref[2]}`) : undefined}
                        style={ref ? { cursor: 'pointer' } : undefined}
                      >
                        <td className="arabic-cell">{df.w}</td>
                        <td style={{ fontSize: '0.85rem' }}>{df.m}</td>
                        <td style={{ fontSize: '0.82rem', color: 'var(--color-muted-foreground)' }}>
                          {df.s}
                        </td>
                        <td style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                          {df.c}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
