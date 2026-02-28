import { useMemo, useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ChevronRight, ChevronDown, BookOpen, Network, GraduationCap } from 'lucide-react';
import { rootFrequencyMap } from '@/data/root-frequency';
import { rootToLemma } from '@/data/root-to-lemma';
import { lemmas } from '@/data/lemmas';
import { semanticClusters } from '@/data/semantic-clusters';
import { getPosCategory, posLabels, posOrder } from '@/data/pattern-pos-map';
import type { PosCategory } from '@/data/pattern-pos-map';
import { FrequencyBadge } from '@/components/shared/FrequencyBadge';
import { useRootFamilyTree } from '@/hooks/useRootFamilyTree';
import { usePersistedState } from '@arabtools/core';
import type { RootFamilyData } from '@/types';

interface FamilyTreeProps {
  root: string;
  navigate: (path: string) => void;
}

interface GroupedWord {
  word: string;
  meaning: string;
  pattern?: string;
  count: number;
  lemmaId?: number;
  ref?: string;
}

export function FamilyTree({ root, navigate }: FamilyTreeProps) {
  const freq = rootFrequencyMap[root];
  const lemmaIds = rootToLemma[root] ?? [];
  const { loadFamilyTree, loading } = useRootFamilyTree();
  const [familyData, setFamilyData] = useState<RootFamilyData | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<PosCategory>>(new Set(posOrder));
  const [, setRecentRoots] = usePersistedState<string[]>('arabtools-kalimat-recent-roots', []);

  useEffect(() => {
    loadFamilyTree(root).then(setFamilyData);
  }, [root, loadFamilyTree]);

  // Track recently viewed roots
  useEffect(() => {
    setRecentRoots(prev => {
      const filtered = prev.filter(r => r !== root);
      return [root, ...filtered].slice(0, 20);
    });
  }, [root, setRecentRoots]);

  const relatedLemmas = useMemo(() => {
    return lemmaIds
      .map(id => lemmas.find(l => l.id === id))
      .filter(Boolean) as typeof lemmas;
  }, [lemmaIds]);

  // Group words by POS category
  const posGroups = useMemo(() => {
    if (!familyData) return new Map<PosCategory, GroupedWord[]>();

    const groups = new Map<PosCategory, GroupedWord[]>();
    for (const cat of posOrder) {
      groups.set(cat, []);
    }

    // Process base forms
    for (const bf of familyData.baseForms) {
      const cat = getPosCategory(bf.p);
      const lemma = relatedLemmas.find(l => l.lemma === bf.w);
      groups.get(cat)!.push({
        word: bf.w,
        meaning: bf.m,
        pattern: bf.pn ?? bf.p,
        count: bf.c,
        lemmaId: lemma?.id,
      });
    }

    // Process derived forms
    for (const df of familyData.derivedForms) {
      const cat = getPosCategory(df.p);
      const lemma = relatedLemmas.find(l => l.lemma === df.w);
      groups.get(cat)!.push({
        word: df.w,
        meaning: df.m,
        pattern: df.p,
        count: df.c,
        lemmaId: lemma?.id,
        ref: df.ref,
      });
    }

    // Remove empty groups
    for (const [cat, words] of groups) {
      if (words.length === 0) groups.delete(cat);
    }

    return groups;
  }, [familyData, relatedLemmas]);

  // Related semantic clusters
  const relatedClusters = useMemo(() => {
    return semanticClusters.filter(c => c.roots.includes(root));
  }, [root]);

  const toggleSection = useCallback((cat: PosCategory) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);

  const totalForms = familyData
    ? familyData.baseForms.length + familyData.derivedForms.length
    : 0;

  const formattedRoot = root.split('').join(' - ');

  const coreMeaning = familyData?.baseForms[0]?.m ?? relatedLemmas[0]?.meaning ?? '';

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
        <span className="font-arabic font-bold text-primary" dir="rtl">{root}</span>
      </div>

      {/* Hero Card */}
      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm mb-8 relative">
        <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-full" />
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative z-10">
          <div className="text-left">
            <h1 className="font-arabic text-6xl text-primary mb-3 py-2" dir="rtl" style={{ lineHeight: 1.6, letterSpacing: '0.15em' }}>
              {formattedRoot}
            </h1>
            {coreMeaning && (
              <p className="font-serif text-lg text-muted-foreground">{coreMeaning}</p>
            )}
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
            {totalForms > 0 && (
              <div className="flex items-center justify-between gap-4 bg-muted/30 p-3 rounded-lg border border-border/50">
                <span className="text-xs font-semibold uppercase text-muted-foreground">Quran Forms</span>
                <span className="text-sm font-semibold text-primary">{totalForms}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mt-6 relative z-10">
          <button
            className="btn text-xs flex items-center gap-1.5"
            onClick={() => navigate(`#/root/${encodeURIComponent(root)}`)}
          >
            <BookOpen size={14} /> View Root Detail
          </button>
          <button
            className="btn btn-accent text-xs flex items-center gap-1.5"
            onClick={() => navigate('#/learn')}
          >
            <GraduationCap size={14} /> Study This Family
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm mb-8">
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-4 bg-muted rounded w-5/6" />
          </div>
        </div>
      )}

      {/* POS-grouped sections */}
      {posGroups.size > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-border flex-1" />
            <div className="w-2 h-2 rotate-45 bg-accent" />
            <div className="h-px bg-border flex-1" />
          </div>

          <h2 className="font-serif text-2xl text-primary mb-6 flex items-center gap-2">
            <Network size={20} className="text-accent" />
            Word Family Tree
          </h2>

          <div className="space-y-3">
            {posOrder.filter(cat => posGroups.has(cat)).map(cat => {
              const words = posGroups.get(cat)!;
              const isExpanded = expandedSections.has(cat);

              return (
                <div key={cat} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors"
                    onClick={() => toggleSection(cat)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-lg font-semibold text-primary">
                        {posLabels[cat]}
                      </span>
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                        {words.length}
                      </span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="border-t border-border">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
                        {words.map((w, i) => (
                          <button
                            key={`${w.word}-${i}`}
                            className="bg-card p-4 hover:bg-muted/30 transition-colors text-left"
                            onClick={() => {
                              if (w.lemmaId) navigate(`#/lemma/${w.lemmaId}`);
                            }}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="font-arabic text-xl text-primary" dir="rtl" style={{ lineHeight: 1.8 }}>
                                {w.word}
                              </div>
                              <span className="text-xs font-semibold text-accent whitespace-nowrap">
                                {w.count}x
                              </span>
                            </div>
                            <div className="text-sm text-foreground mt-1 line-clamp-2">{w.meaning}</div>
                            {w.pattern && (
                              <div className="text-xs text-muted-foreground mt-1 font-arabic" dir="rtl">
                                {w.pattern}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Lemma list (if no family data but has lemmas) */}
      {!familyData && !loading && relatedLemmas.length > 0 && (
        <section className="mb-8">
          <h2 className="font-serif text-2xl text-primary mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-accent" />
            Derived Words ({relatedLemmas.length})
          </h2>
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
        </section>
      )}

      {/* Related Semantic Clusters */}
      {relatedClusters.length > 0 && (
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-border flex-1" />
            <div className="w-2 h-2 rotate-45 bg-accent" />
            <div className="h-px bg-border flex-1" />
          </div>

          <h2 className="font-serif text-xl text-primary mb-4">Related Clusters</h2>
          <div className="flex flex-wrap gap-2">
            {relatedClusters.map(c => (
              <button
                key={c.id}
                className="bg-card border border-border rounded-lg px-4 py-2.5 hover:border-accent/50 transition-colors"
                onClick={() => navigate(`#/cluster/${c.id}`)}
              >
                <span className="font-arabic text-base text-primary mr-2" dir="rtl">{c.nameAr}</span>
                <span className="text-sm text-muted-foreground">{c.nameEn}</span>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
