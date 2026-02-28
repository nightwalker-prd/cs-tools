import { useState, useRef, useCallback } from 'react';
import { getAudioUrl } from '../data/reciters';

export function useAudioPlayer(reciterId: string) {
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentAyah, setCurrentAyah] = useState<{ surah: number; ayah: number } | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sequenceRef = useRef<{ cancelled: boolean }>({ cancelled: false });

  const play = useCallback(async (surah: number, ayah: number) => {
    sequenceRef.current.cancelled = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const url = getAudioUrl(reciterId, surah, ayah);
    const audio = new Audio(url);
    audioRef.current = audio;

    setLoading(true);
    setCurrentAyah({ surah, ayah });
    setPaused(false);
    setCurrentIndex(0);
    setTotalCount(1);

    audio.oncanplay = () => setLoading(false);
    audio.onplay = () => { setPlaying(true); setPaused(false); };
    audio.onended = () => {
      setPlaying(false);
      setPaused(false);
      setCurrentAyah(null);
      setCurrentIndex(0);
      setTotalCount(0);
    };
    audio.onerror = () => {
      setLoading(false);
      setPlaying(false);
      setPaused(false);
    };

    try {
      await audio.play();
    } catch {
      setLoading(false);
      setPlaying(false);
    }
  }, [reciterId]);

  const playSequence = useCallback(async (ayahs: Array<{ surah: number; ayah: number }>) => {
    sequenceRef.current.cancelled = true;
    const token = { cancelled: false };
    sequenceRef.current = token;

    setTotalCount(ayahs.length);

    for (let i = 0; i < ayahs.length; i++) {
      if (token.cancelled) return;
      const ayah = ayahs[i];

      await new Promise<void>((resolve) => {
        const url = getAudioUrl(reciterId, ayah.surah, ayah.ayah);
        const audio = new Audio(url);
        audioRef.current = audio;

        setCurrentAyah(ayah);
        setCurrentIndex(i);
        setPlaying(true);
        setPaused(false);

        audio.onended = () => resolve();
        audio.onerror = () => resolve();
        audio.play().catch(() => resolve());
      });
    }

    if (!token.cancelled) {
      setPlaying(false);
      setPaused(false);
      setCurrentAyah(null);
      setCurrentIndex(0);
      setTotalCount(0);
    }
  }, [reciterId]);

  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setPaused(true);
      setPlaying(false);
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current && audioRef.current.paused && paused) {
      audioRef.current.play().catch(() => {});
      setPaused(false);
      setPlaying(true);
    }
  }, [paused]);

  const stop = useCallback(() => {
    sequenceRef.current.cancelled = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlaying(false);
    setPaused(false);
    setCurrentAyah(null);
    setCurrentIndex(0);
    setTotalCount(0);
  }, []);

  return { play, playSequence, pause, resume, stop, playing, paused, loading, currentAyah, currentIndex, totalCount };
}
