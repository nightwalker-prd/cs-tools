import { ArrowUp, ArrowDown } from 'lucide-react';
import type { InshaExercise } from '../../data/types';

interface AssemblyViewProps {
  exercise: InshaExercise;
  arrangedSentences: number[];
  placedConnectors: Record<number, string>;
  onArrange: (order: number[]) => void;
  onPlaceConnectors: (connectors: Record<number, string>) => void;
}

export function AssemblyView({
  exercise,
  arrangedSentences,
  placedConnectors,
  onArrange,
  onPlaceConnectors,
}: AssemblyViewProps) {
  if (!exercise.sentences) return null;

  const moveSentence = (fromIdx: number, direction: 'up' | 'down') => {
    const toIdx = direction === 'up' ? fromIdx - 1 : fromIdx + 1;
    if (toIdx < 0 || toIdx >= arrangedSentences.length) return;

    const newOrder = [...arrangedSentences];
    [newOrder[fromIdx], newOrder[toIdx]] = [newOrder[toIdx], newOrder[fromIdx]];
    onArrange(newOrder);
  };

  const toggleConnector = (position: number, connector: string) => {
    const updated = { ...placedConnectors };
    if (updated[position] === connector) {
      delete updated[position];
    } else {
      updated[position] = connector;
    }
    onPlaceConnectors(updated);
  };

  const availableConnectors = exercise.connectors || [];

  return (
    <>
      {/* Instructions */}
      <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-6 shadow-md">
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Arrange the sentences
          </p>
          <p className="text-sm text-muted-foreground">
            Put them in the correct order and insert connectors between them
          </p>
        </div>
      </div>

      {/* Sentence cards — reorderable */}
      <div className="space-y-2">
        {arrangedSentences.map((sentIdx, posIdx) => {
          const sentence = exercise.sentences![sentIdx];
          if (!sentence) return null;

          return (
            <div key={sentIdx}>
              {/* Connector slot before this sentence (except first) */}
              {posIdx > 0 && (
                <div className="flex items-center justify-center gap-2 py-1.5">
                  {availableConnectors.map((conn, ci) => (
                    <button
                      key={ci}
                      onClick={() => toggleConnector(posIdx, conn.arabic)}
                      className={`font-arabic px-3 py-1 rounded-full text-sm transition-all ${
                        placedConnectors[posIdx] === conn.arabic
                          ? 'bg-accent/20 border-2 border-accent text-primary'
                          : 'bg-white/60 border border-white/40 text-muted-foreground hover:bg-white/90'
                      }`}
                    >
                      {conn.arabic}
                    </button>
                  ))}
                  {placedConnectors[posIdx] && (
                    <button
                      onClick={() => {
                        const updated = { ...placedConnectors };
                        delete updated[posIdx];
                        onPlaceConnectors(updated);
                      }}
                      className="text-xs text-red-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              )}

              {/* Sentence card */}
              <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-4 flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveSentence(posIdx, 'up')}
                    disabled={posIdx === 0}
                    className="p-1 rounded hover:bg-gray-200 disabled:opacity-20 transition-colors"
                  >
                    <ArrowUp className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => moveSentence(posIdx, 'down')}
                    disabled={posIdx === arrangedSentences.length - 1}
                    className="p-1 rounded hover:bg-gray-200 disabled:opacity-20 transition-colors"
                  >
                    <ArrowDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="flex-1">
                  <p dir="rtl" className="font-arabic text-base leading-relaxed text-primary">
                    {sentence.arabic}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {sentence.translation}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">
                  {posIdx + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
