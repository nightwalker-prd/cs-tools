import { useCallback } from 'react';
import { useSpeechSynthesis, usePersistedState } from '@arabtools/core';
import type { AudioSettings } from '../types';

const DEFAULT_AUDIO: AudioSettings = {
  enabled: true,
  autoPlay: false,
  rate: 1.0,
};

export function useAudio() {
  const [settings, setSettings] = usePersistedState<AudioSettings>('fstu-audio', DEFAULT_AUDIO);
  const tts = useSpeechSynthesis({ rate: settings.rate });

  const speak = useCallback((text: string) => {
    if (settings.enabled) {
      tts.speak(text);
    }
  }, [settings.enabled, tts]);

  const speakIfAutoPlay = useCallback((text: string) => {
    if (settings.enabled && settings.autoPlay) {
      tts.speak(text);
    }
  }, [settings.enabled, settings.autoPlay, tts]);

  const updateSettings = useCallback((partial: Partial<AudioSettings>) => {
    setSettings(prev => ({ ...prev, ...partial }));
  }, [setSettings]);

  return {
    settings,
    updateSettings,
    speak,
    speakIfAutoPlay,
    isSpeaking: tts.isSpeaking,
    isSupported: tts.isSupported,
    hasArabicVoice: tts.hasArabicVoice,
  };
}
