import { useMemo } from 'react';
import { rootFrequency } from '@/data/root-frequency';
import { FrequencyBadge } from '@/components/shared/FrequencyBadge';

interface FrequencyBrowserProps {
  tier: number;
  navigate: (path: string) => void;
}

const tierInfo: Record<number, { label: string; desc: string; range: string }> = {
  1: { label: 'Tier 1 — Most Common', desc: 'Top 100 roots covering ~60% of Quran words', range: 'Top 100' },
  2: { label: 'Tier 2 — Common', desc: 'Top 101-300 roots covering ~23% more', range: '101-300' },
  3: { label: 'Tier 3 — Moderate', desc: 'Top 301-600 roots covering ~11% more', range: '301-600' },
  4: { label: 'Tier 4 — Less Common', desc: 'Remaining ~1,050 roots covering ~7%', range: '601+' },
};

export function FrequencyBrowser({ tier, navigate }: FrequencyBrowserProps) {
  const total = useMemo(() => rootFrequency.reduce((s, r) => s + r.count, 0), []);

  const tierRoots = useMemo(() => {
    return rootFrequency.filter(r => r.tier === tier);
  }, [tier]);

  const tierCoverage = useMemo(() => {
    const tierTotal = tierRoots.reduce((s, r) => s + r.count, 0);
    return ((tierTotal / total) * 100).toFixed(1);
  }, [tierRoots, total]);

  const info = tierInfo[tier] ?? tierInfo[1];

  return (
    <div className="animate-fade-in max-w-5xl mx-auto py-6">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4 text-sm text-muted-foreground">
          <button className="hover:text-primary transition-colors" onClick={() => navigate('#/')}>Home</button>
          <span>/</span>
          <span className="font-semibold text-primary">Frequency</span>
        </div>
        <h1 className="font-serif text-4xl text-primary mb-3">Browse by Frequency</h1>
         <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Master the most common roots first to maximize your comprehension quickly.
        </p>
      </div>

      {/* Tier selector cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {([1, 2, 3, 4] as const).map(t => {
          const ti = tierInfo[t];
          const tRoots = rootFrequency.filter(r => r.tier === t);
          const tCov = ((tRoots.reduce((s, r) => s + r.count, 0) / total) * 100).toFixed(1);
          const isActive = tier === t;
          
          return (
            <button
              key={t}
              className={`
                relative overflow-hidden p-5 rounded-xl border transition-all text-left flex flex-col justify-between h-32
                ${isActive 
                  ? `border-primary bg-primary/5 shadow-md ring-2 ring-primary/20` 
                  : `border-border bg-card hover:border-accent hover:shadow-md cursor-pointer`}
              `}
              onClick={() => navigate(`#/frequency/${t}`)}
            >
              <div className={`absolute top-0 left-0 w-1 h-full bg-tier-${t}`} />
              <div className="flex justify-between items-start w-full">
                <span className={`text-sm font-bold uppercase tracking-wider ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{ti.range}</span>
                <span className={`text-2xl font-serif font-bold ${isActive ? 'text-primary' : `text-tier-${t}`}`}>{tCov}%</span>
              </div>
              <div className="text-sm font-medium text-foreground">{tRoots.length} roots</div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="h-px bg-border flex-1" />
        <div className="w-2 h-2 rotate-45 bg-accent" />
        <div className="h-px bg-border flex-1" />
      </div>

      <div className="mb-6">
        <h2 className="font-serif text-2xl text-primary mb-2">
          {info.label}
        </h2>
        <p className="text-muted-foreground">
          {info.desc} — <span className="font-medium text-foreground">{tierRoots.length} roots</span>, {tierCoverage}% total coverage
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-muted-foreground w-16">#</th>
              <th className="px-6 py-4 text-right font-semibold text-primary">Root</th>
              <th className="px-6 py-4 text-left font-semibold text-primary">Occurrences</th>
              <th className="px-6 py-4 text-left font-semibold text-primary">Tier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tierRoots.map((r) => (
              <tr 
                key={r.root} 
                className="hover:bg-accent/5 transition-colors cursor-pointer group"
                onClick={() => navigate(`#/root/${encodeURIComponent(r.root)}`)}
              >
                <td className="px-6 py-4 text-muted-foreground font-mono text-sm">
                  {rootFrequency.indexOf(r) + 1}
                </td>
                <td className="px-6 py-4 text-right font-arabic text-2xl text-primary group-hover:text-accent transition-colors" dir="rtl">
                  {r.root}
                </td>
                <td className="px-6 py-4 text-muted-foreground group-hover:text-foreground font-serif">{r.count.toLocaleString()}</td>
                <td className="px-6 py-4"><FrequencyBadge tier={r.tier} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
