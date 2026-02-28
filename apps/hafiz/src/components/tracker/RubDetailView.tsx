import { getRubDescription, getJuzForRub, expandRubToAyahs } from '@arabtools/data';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { AudioPlayer } from '../audio/AudioPlayer';
import { MushafView } from '../quran/MushafView';
import { VocabPreview } from './VocabPreview';
import { RootConnections } from './RootConnections';
import type { HafizRub } from '../../types';

interface RubDetailViewProps {
  rubId: number;
  rubs: HafizRub[];
  reciterId: string;
  onStartLearning: (rubId: number) => void;
  onMarkMemorized: (rubId: number) => void;
  onResetRub: (rubId: number) => void;
  onNavigateRub: (rubId: number) => void;
  onReciterChange: (reciterId: string) => void;
}

export function RubDetailView({
  rubId,
  rubs,
  reciterId,
  onStartLearning,
  onMarkMemorized,
  onResetRub,
  onNavigateRub,
  onReciterChange,
}: RubDetailViewProps) {
  const rub = rubs.find(r => r.id === rubId);
  const juz = getJuzForRub(rubId);
  const description = getRubDescription(rubId);
  const ayahRefs = expandRubToAyahs(rubId);
  const audio = useAudioPlayer(reciterId);

  if (!rub) {
    return (
      <div className="empty-state fade-in-up">
        <h2>Rub&apos; Not Found</h2>
        <p>Rub&apos; {rubId} does not exist.</p>
      </div>
    );
  }

  const stageLabel = {
    not_started: 'Not Started',
    learning: 'Learning',
    memorized: 'Memorized',
    solid: 'Solid',
  }[rub.stage];

  return (
    <div className="rub-detail fade-in-up">
      <div className="rub-detail-header">
        <div className="rub-detail-nav">
          {rubId > 1 && (
            <button className="btn btn-ghost" onClick={() => onNavigateRub(rubId - 1)}>
              &larr; Rub&apos; {rubId - 1}
            </button>
          )}
          <div className="rub-detail-title-group">
            <h2>Rub&apos; {rubId}</h2>
            <span className="rub-detail-meta">Juz {juz} &middot; {description}</span>
          </div>
          {rubId < 240 && (
            <button className="btn btn-ghost" onClick={() => onNavigateRub(rubId + 1)}>
              Rub&apos; {rubId + 1} &rarr;
            </button>
          )}
        </div>

        <div className="rub-detail-stage">
          <span className={`stage-badge stage-${rub.stage}`}>{stageLabel}</span>
        </div>
      </div>

      <div className="rub-detail-actions">
        {rub.stage === 'not_started' && (
          <button className="btn btn-primary" onClick={() => onStartLearning(rubId)}>
            Start Learning
          </button>
        )}
        {rub.stage === 'learning' && (
          <button className="btn btn-primary" onClick={() => onMarkMemorized(rubId)}>
            Mark as Memorized
          </button>
        )}
        {(rub.stage === 'memorized' || rub.stage === 'solid') && (
          <button className="btn btn-ghost btn-sm" onClick={() => onResetRub(rubId)}>
            Reset Progress
          </button>
        )}
      </div>

      {rub.stage === 'not_started' && (
        <div className="rub-detail-comprehension">
          <VocabPreview rubId={rubId} />
          <RootConnections rubId={rubId} />
        </div>
      )}

      <AudioPlayer
        ayahs={ayahRefs}
        audio={audio}
        reciterId={reciterId}
        onReciterChange={onReciterChange}
      />

      <div className="rub-detail-ayahs">
        <div className="section-title-row">
          <h3 className="section-title">Ayahs ({ayahRefs.length})</h3>
        </div>
        <MushafView
          rubId={rubId}
          currentAyah={audio.currentAyah}
          onAyahClick={(s, a) => audio.play(s, a)}
        />
      </div>
    </div>
  );
}
