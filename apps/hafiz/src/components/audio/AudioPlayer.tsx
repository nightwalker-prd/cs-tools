import { Play, Pause, Square, Loader2 } from 'lucide-react';
import { getSurahName } from '@arabtools/data';
import { RECITERS } from '../../data/reciters';

interface AudioPlayerProps {
  ayahs: Array<{ surah: number; ayah: number }>;
  audio: {
    play: (surah: number, ayah: number) => void;
    playSequence: (ayahs: Array<{ surah: number; ayah: number }>) => void;
    pause: () => void;
    resume: () => void;
    stop: () => void;
    playing: boolean;
    paused: boolean;
    loading: boolean;
    currentAyah: { surah: number; ayah: number } | null;
    currentIndex: number;
    totalCount: number;
  };
  reciterId: string;
  onReciterChange: (reciterId: string) => void;
}

export function AudioPlayer({ ayahs, audio, reciterId, onReciterChange }: AudioPlayerProps) {
  const isActive = audio.playing || audio.paused;

  return (
    <div className={`audio-player-card ${isActive ? 'active' : ''}`}>
      <div className="audio-player-controls">
        {/* Play / Pause button */}
        <button
          className="audio-btn audio-btn-play"
          onClick={() => {
            if (audio.loading) return;
            if (audio.playing) {
              audio.pause();
            } else if (audio.paused) {
              audio.resume();
            } else {
              audio.playSequence(ayahs);
            }
          }}
          disabled={audio.loading}
          title={audio.playing ? 'Pause' : audio.paused ? 'Resume' : 'Play All'}
        >
          {audio.loading ? (
            <Loader2 size={20} className="spin" />
          ) : audio.playing ? (
            <Pause size={20} />
          ) : (
            <Play size={20} />
          )}
        </button>

        {/* Stop button */}
        {isActive && (
          <button
            className="audio-btn audio-btn-stop"
            onClick={() => audio.stop()}
            title="Stop"
          >
            <Square size={16} />
          </button>
        )}
      </div>

      <div className="audio-player-info">
        {audio.currentAyah ? (
          <>
            <div className="audio-now-playing">
              {audio.playing && <span className="audio-eq"><span /><span /><span /></span>}
              {audio.paused && <span className="audio-paused-label">Paused</span>}
              <span className="audio-ayah-ref">
                {getSurahName(audio.currentAyah.surah)} {audio.currentAyah.surah}:{audio.currentAyah.ayah}
              </span>
            </div>
            {audio.totalCount > 1 && (
              <div className="audio-progress-text">
                Ayah {audio.currentIndex + 1} of {audio.totalCount}
              </div>
            )}
          </>
        ) : (
          <div className="audio-idle-text">
            {ayahs.length} ayah{ayahs.length !== 1 ? 's' : ''} ready
          </div>
        )}
      </div>

      <div className="audio-player-reciter">
        <select
          className="audio-reciter-select"
          value={reciterId}
          onChange={e => onReciterChange(e.target.value)}
        >
          {RECITERS.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
