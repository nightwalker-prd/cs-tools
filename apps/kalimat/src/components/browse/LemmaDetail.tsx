import { useState, useEffect } from 'react';
import { lemmas } from '@/data/lemmas';
import { rootFrequencyMap } from '@/data/root-frequency';
import { rootToLemma } from '@/data/root-to-lemma';
import { useLemmaInfo } from '@/hooks/useLemmaInfo';
import { useLearningEngine } from '@/hooks/useLearningEngine';
import { FrequencyBadge } from '@/components/shared/FrequencyBadge';
import { ChevronRight, ArrowLeft, BookOpen } from 'lucide-react';

interface LemmaDetailProps {
  lemmaId: number;
  navigate: (path: string) => void;
}

export function LemmaDetail({ lemmaId, navigate }: LemmaDetailProps) {
  const lemma = lemmas.find(l => l.id === lemmaId);
  const { getEtymology, getContext, loading: etymLoading } = useLemmaInfo();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { getProgress } = useLearningEngine();
  const [etymology, setEtymology] = useState<string | null>(null);
  const [contextExamples, setContextExamples] = useState<import('@/hooks/useLemmaInfo').ContextEntry[] | null>(null);

  useEffect(() => {
    getEtymology(lemmaId).then(setEtymology);
    getContext(lemmaId).then(setContextExamples);
  }, [lemmaId, getEtymology, getContext]);

  if (!lemma) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-muted-foreground p-6">
        <p className="text-xl mb-4">Lemma not found (ID: {lemmaId})</p>
        <button 
          onClick={() => navigate('#/browse')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Return to Browse
        </button>
      </div>
    );
  }

  // Find root for this lemma
  const root = Object.entries(rootToLemma).find(([, ids]) => ids.includes(lemmaId))?.[0];
  const rootFreq = root ? rootFrequencyMap[root] : null;
  const progress = getProgress(lemmaId);

  const phaseColors = {
    new: 'bg-muted text-muted-foreground border-border',
    learning: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    review: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
    mastered: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
  };
  const badgeClass = phaseColors[progress.phase as keyof typeof phaseColors] || phaseColors.new;

  return (
    <div className="animate-fade-in max-w-4xl mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
        <button className="hover:text-primary transition-colors flex items-center gap-1" onClick={() => navigate('#/')}>
          <ArrowLeft size={14} /> Home
        </button>
        <ChevronRight size={14} />
        <button className="hover:text-primary transition-colors" onClick={() => navigate('#/browse')}>Browse</button>
        <ChevronRight size={14} />
        <span className="font-arabic font-bold text-primary" dir="rtl">{lemma.lemma}</span>
      </div>

      {/* Hero Section */}
      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm mb-8 relative">
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full" />
        
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative z-10">
          <div className="text-left">
             <h1 className="font-arabic text-6xl text-primary mb-2 leading-tight py-2" dir="rtl">
              {lemma.lemma}
            </h1>
            <p className="font-sans text-xl font-medium text-foreground mb-1">{lemma.meaning}</p>
            <p className="font-mono text-sm text-accent italic">{lemma.transliteration}</p>
          </div>

          <div className="flex flex-col gap-3 min-w-[200px] w-full md:w-auto">
             <div className="flex items-center justify-between gap-4 bg-muted/30 p-3 rounded-lg border border-border/50">
                <span className="text-xs font-semibold uppercase text-muted-foreground">Phase</span>
                <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${badgeClass} uppercase tracking-wide`}>
                  {progress.phase}
                </span>
             </div>
             
             {root && (
               <div className="flex items-center justify-between gap-4 bg-muted/30 p-3 rounded-lg border border-border/50">
                  <span className="text-xs font-semibold uppercase text-muted-foreground">Root</span>
                  <button 
                    onClick={() => navigate(`#/root/${encodeURIComponent(root)}`)}
                    className="font-arabic text-lg text-primary hover:text-accent transition-colors"
                    dir="rtl"
                  >
                    {root}
                  </button>
               </div>
             )}

             {rootFreq && (
               <div className="flex items-center justify-between gap-4 bg-muted/30 p-3 rounded-lg border border-border/50">
                <span className="text-xs font-semibold uppercase text-muted-foreground">Frequency</span>
                <FrequencyBadge tier={rootFreq.tier} count={rootFreq.count} />
               </div>
             )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="h-px bg-border flex-1" />
        <div className="w-2 h-2 rotate-45 bg-accent" />
        <div className="h-px bg-border flex-1" />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Etymology / Details Column */}
        <div className="md:col-span-2 space-y-6">
          <section>
            <h2 className="font-serif text-2xl text-primary mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-accent" />
              Etymology & Usage
            </h2>
            
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm min-h-[150px]">
              {etymLoading ? (
                 <div className="space-y-3 animate-pulse">
                   <div className="h-4 bg-muted rounded w-3/4"></div>
                   <div className="h-4 bg-muted rounded w-1/2"></div>
                   <div className="h-4 bg-muted rounded w-5/6"></div>
                 </div>
              ) : etymology ? (
                <div className="prose prose-stone leading-relaxed text-muted-foreground max-w-none">
                  {etymology}
                </div>
              ) : (
                <p className="text-muted-foreground italic flex flex-col items-center justify-center h-full py-8 text-center text-sm">
                  <span>No detailed etymology notes available.</span>
                </p>
              )}
            </div>
          </section>

          {/* Context Section */}
          <section>
            <h2 className="font-serif text-2xl text-primary mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-accent" />
              See in Context
            </h2>
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              {contextExamples && contextExamples.length > 0 ? (
                <ul className="space-y-4">
                  {contextExamples.slice(0, 3).map((ctx, i) => (
                    <li key={i} className="text-sm leading-relaxed">
                      {ctx.ar && (
                        <p className="font-arabic text-base text-primary mb-1 whitespace-nowrap text-ellipsis" dir="rtl" style={{ overflowX: 'clip', overflowY: 'visible', lineHeight: 2 }}>{ctx.ar}</p>
                      )}
                      <span className="text-muted-foreground">{ctx.before}</span>
                      <span className="font-semibold text-accent">{ctx.match}</span>
                      <span className="text-muted-foreground">{ctx.after}</span>
                      <span className="ml-2 text-xs text-primary/60 font-mono">[{ctx.ref}]</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground italic text-sm text-center py-4">
                  No contextual examples available.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
           <div className="bg-muted/20 border border-border/60 rounded-xl p-5">
              <h3 className="font-semibold text-primary mb-3 text-xs uppercase tracking-wider">Metatags</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between pb-2 border-b border-border/50 last:border-0 last:pb-0">
                  <span className="text-muted-foreground">ID</span>
                  <span className="font-mono text-foreground">#{lemma.id}</span>
                </li>
                 <li className="flex justify-between pb-2 border-b border-border/50 last:border-0 last:pb-0">
                  <span className="text-muted-foreground">Part of Speech</span>
                  <span className="font-mono text-foreground">-</span>
                </li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
