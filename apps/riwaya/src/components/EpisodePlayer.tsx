import { useEpisodePlayer } from '../hooks/useEpisodePlayer';
import { DialoguePhase } from './DialoguePhase';
import { QuestionsPhase } from './QuestionsPhase';
import { RecapPhase } from './RecapPhase';
import type { StoryEpisode, StoryArc } from '../types';

interface EpisodePlayerProps {
  episode: StoryEpisode;
  arc: StoryArc;
  isCompleted: boolean;
  onComplete: () => void;
  onNext: () => void;
  onBack: () => void;
}

export function EpisodePlayer({
  episode,
  arc,
  isCompleted,
  onComplete,
  onNext,
  onBack,
}: EpisodePlayerProps) {
  const player = useEpisodePlayer(episode.dialogueLines.length);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm text-lapis hover:underline"
        >
          &larr; {arc.titleEn}
        </button>
        <div className="text-sm text-parchment-dark">
          Episode {episode.number} of {arc.totalEpisodes}
        </div>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-xl font-serif text-lapis">
          <span className="font-arabic text-2xl">{episode.titleAr}</span>
          <span className="mx-2 text-parchment-dark/40">|</span>
          <span>{episode.titleEn}</span>
        </h2>
        <p className="text-sm text-parchment-dark mt-1">{episode.setting}</p>
      </div>

      {player.phase === 'dialogue' && (
        <DialoguePhase
          lines={episode.dialogueLines}
          characters={episode.characters}
          currentLine={player.currentLine}
          onAdvance={player.advanceLine}
          onGoToLine={player.goToLine}
          onFinish={player.goToQuestions}
        />
      )}

      {player.phase === 'questions' && (
        <QuestionsPhase
          questions={episode.comprehensionQuestions}
          answers={player.answers}
          onAnswer={player.answerQuestion}
          onFinish={() => {
            if (!isCompleted) {
              onComplete();
            }
            player.goToRecap();
          }}
        />
      )}

      {player.phase === 'recap' && (
        <RecapPhase
          episode={episode}
          onNext={onNext}
          onReplay={player.reset}
        />
      )}
    </div>
  );
}
