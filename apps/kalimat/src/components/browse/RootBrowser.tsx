import { useState, useMemo } from 'react';
import { rootFrequency } from '@/data/root-frequency';
import { FrequencyBadge } from '@/components/shared/FrequencyBadge';

const ARABIC_LETTERS = 'ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي'.split(' ');

interface RootBrowserProps {
  navigate: (path: string) => void;
}

export function RootBrowser({ navigate }: RootBrowserProps) {
  const [selectedLetter, setSelectedLetter] = useState('ا');

  const filteredRoots = useMemo(() => {
    return rootFrequency.filter(r => r.root.startsWith(selectedLetter));
  }, [selectedLetter, rootFrequency]);

  return (
     <div className="animate-fade-in max-w-5xl mx-auto py-6">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4 text-sm text-muted-foreground">
          <button className="hover:text-primary transition-colors" onClick={() => navigate('#/')}>Home</button>
          <span>/</span>
          <span className="font-semibold text-primary">Roots</span>
        </div>
        <h1 className="font-serif text-4xl text-primary mb-3">Browse by Root</h1>
         <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
          {rootFrequency.length.toLocaleString()} Arabic roots found in the Quran, sorted by frequency.
        </p>
      </div>

      {/* Letter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 p-4 bg-muted/20 rounded-2xl border border-border">
        {ARABIC_LETTERS.map(l => (
          <button
            key={l}
            className={`
              w-10 h-10 flex items-center justify-center rounded-lg font-arabic text-xl transition-all
              ${selectedLetter === l 
                ? 'bg-primary text-white shadow-md scale-110' 
                : 'bg-card text-foreground hover:bg-accent/10 hover:text-accent border border-border'}
            `}
            onClick={() => setSelectedLetter(l)}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Root list */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="text-right px-6 py-4 font-semibold text-primary">Root</th>
              <th className="text-left px-6 py-4 font-semibold text-primary">Occurrences</th>
              <th className="text-left px-6 py-4 font-semibold text-primary">Frequency Tier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredRoots.map(r => (
              <tr
                key={r.root}
                className="hover:bg-accent/5 transition-colors cursor-pointer group"
                onClick={() => navigate(`#/root/${encodeURIComponent(r.root)}`)}
              >
                <td className="text-right px-6 py-4 font-arabic text-2xl text-primary group-hover:text-accent transition-colors" dir="rtl">
                  {r.root}
                </td>
                <td className="px-6 py-4 text-muted-foreground group-hover:text-foreground font-serif">{r.count.toLocaleString()}</td>
                <td className="px-6 py-4"><FrequencyBadge tier={r.tier} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRoots.length === 0 && (
         <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border mt-4">
          No roots starting with <span className="font-arabic text-lg mx-1">{selectedLetter}</span> found.
        </div>
      )}
    </div>
  );
}
