import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { MushafView } from '../quran/MushafView';

interface ReadAlongModeProps {
  ayahs: Array<{ surah: number; ayah: number }>;
  reciterId: string;
  rubId: number;
}

export function ReadAlongMode({ ayahs: _ayahs, reciterId, rubId }: ReadAlongModeProps) {
  const audio = useAudioPlayer(reciterId);

  return (
    <div className="revision-mode read-along-mode">
      <p className="mode-instruction">
        Read along with the text as you listen to each ayah.
      </p>

      <MushafView
        rubId={rubId}
        currentAyah={audio.currentAyah}
        onAyahClick={(s, a) => audio.play(s, a)}
      />
    </div>
  );
}
