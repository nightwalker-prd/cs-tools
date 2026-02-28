import { surahNames } from '@/data/surah-names';

interface SurahBrowserProps {
  navigate: (path: string) => void;
}

export function SurahBrowser({ navigate }: SurahBrowserProps) {
  return (
    <div className="animate-fade-in max-w-5xl mx-auto py-6">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4 text-sm text-muted-foreground">
          <button className="hover:text-primary transition-colors" onClick={() => navigate('#/')}>Home</button>
          <span>/</span>
          <span className="font-semibold text-primary">Surahs</span>
        </div>
        <h1 className="font-serif text-4xl text-primary mb-3">Browse by Surah</h1>
        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
           Select a surah to see all its vocabulary with word-by-word breakdowns.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {surahNames.map(s => (
          <button
            key={s.num}
            className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-accent hover:shadow-md transition-all text-left group"
            onClick={() => navigate(`#/surah/${s.num}`)}
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/5 text-primary font-serif font-bold group-hover:bg-accent group-hover:text-white transition-colors">
              {s.num}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-foreground truncate group-hover:text-primary transition-colors">{s.english}</div>
              <div className="font-arabic text-accent text-lg" dir="rtl">{s.arabic}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
