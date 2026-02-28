import type { Discovery } from '../types';

interface LexiconProps {
  discoveries: Discovery[];
  totalPossible: number;
  onClose: () => void;
}

export function Lexicon({ discoveries, totalPossible, onClose }: LexiconProps) {
  return (
    <div
      className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-5"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card rounded-2xl p-6 max-w-[500px] w-full max-h-[70vh] overflow-auto border border-white/10">
        <h2 className="font-arabic text-[22px] text-primary mb-4">
          &#x1F4D6; Word Lexicon ({discoveries.length}/{totalPossible})
        </h2>

        {discoveries.length === 0 ? (
          <p className="text-muted-foreground italic">No words discovered yet. Start forging!</p>
        ) : (
          <div className="flex flex-col gap-2">
            {discoveries.map((d) => (
              <div
                key={d.key}
                className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] flex justify-between items-center gap-3"
              >
                <div>
                  <span className="font-arabic text-xl text-primary">{d.word}</span>
                  <span className="text-sm text-muted-foreground ml-2 font-sans"> &mdash; {d.meaning}</span>
                </div>
                <div className="text-[11px] text-[#666] whitespace-nowrap font-sans">
                  {d.root.letters} + {d.pattern.display}
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 px-5 py-2 border border-white/20 rounded-lg bg-transparent text-foreground cursor-pointer font-sans hover:bg-white/[0.05] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
