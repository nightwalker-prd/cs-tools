import { Play, Pause, Loader2 } from 'lucide-react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

interface ListenRepeatModeProps {
  ayahs: Array<{ surah: number; ayah: number }>;
  reciterId: string;
}

export function ListenRepeatMode({ ayahs, reciterId }: ListenRepeatModeProps) {
  const audio = useAudioPlayer(reciterId);

  return (
    <div className="revision-mode listen-repeat-mode">
      <p className="mode-instruction">
        Listen to the ayahs and repeat after the reciter.
      </p>

      <button
        className="btn btn-accent play-sequence-btn"
        onClick={() => {
          if (audio.playing) {
            audio.stop();
          } else {
            audio.playSequence(ayahs);
          }
        }}
        disabled={audio.loading}
      >
        {audio.loading ? (
          <Loader2 size={16} className="spin" />
        ) : audio.playing ? (
          <Pause size={16} />
        ) : (
          <Play size={16} />
        )}
        {audio.playing ? 'Stop' : 'Play Sequence'}
      </button>

      {audio.currentAyah && (
        <span className="audio-status">
          Playing {audio.currentAyah.surah}:{audio.currentAyah.ayah}
        </span>
      )}
    </div>
  );
}
