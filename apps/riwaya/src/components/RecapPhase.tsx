import { VocabularyList } from './VocabularyList';
import { GrammarCard } from './GrammarCard';
import type { StoryEpisode } from '../types';

interface RecapPhaseProps {
  episode: StoryEpisode;
  onNext: () => void;
  onReplay: () => void;
}

export function RecapPhase({ episode, onNext, onReplay }: RecapPhaseProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-serif text-lapis text-center">
        Episode Recap
      </h3>

      <GrammarCard grammar={episode.grammarPoint} />
      <VocabularyList vocabulary={episode.vocabulary} />

      {episode.culturalNotes.length > 0 && (
        <div className="bg-white rounded-xl border border-parchment-dark/10 overflow-hidden">
          <div className="px-4 py-2.5 bg-parchment-warm/40 border-b border-parchment-dark/10">
            <h4 className="font-serif text-lapis text-sm font-medium">
              Cultural Notes
            </h4>
          </div>
          <div className="p-4 space-y-2">
            {episode.culturalNotes.map((note, i) => (
              <p key={i} className="text-sm text-parchment-dark leading-relaxed">
                {note}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center gap-3 pt-4">
        <button
          onClick={onReplay}
          className="px-5 py-2.5 border border-lapis text-lapis rounded-lg font-medium hover:bg-lapis/5 transition-colors"
        >
          Replay Episode
        </button>
        <button
          onClick={onNext}
          className="px-5 py-2.5 bg-gold text-white rounded-lg font-medium hover:bg-gold/90 transition-colors"
        >
          Next Episode
        </button>
      </div>
    </div>
  );
}
