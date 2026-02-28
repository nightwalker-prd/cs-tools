/**
 * useSpeechSynthesis Hook
 *
 * Wraps the Web Speech API for text-to-speech functionality.
 * Optimized for Arabic language learning with word-by-word playback.
 */

import { useState, useCallback, useEffect, useRef } from 'react';

export interface SpeechSynthesisState {
  isSpeaking: boolean;
  isSupported: boolean;
  hasArabicVoice: boolean;
  error: string | null;
}

export interface SpeechSynthesisActions {
  speak: (text: string) => void;
  stop: () => void;
  speakSequence: (texts: string[], onWordChange: (index: number) => void) => void;
  stopSequence: () => void;
}

interface UseSpeechSynthesisOptions {
  /** Language code (default: 'ar-SA') */
  lang?: string;
  /** Speech rate 0.1-10 (default: 0.8 for Arabic learning) */
  rate?: number;
  /** Speech pitch 0-2 (default: 1) */
  pitch?: number;
  /** Callback when speech starts */
  onStart?: () => void;
  /** Callback when speech ends */
  onEnd?: () => void;
  /** Callback on error */
  onError?: (error: string) => void;
}

export function useSpeechSynthesis(
  options: UseSpeechSynthesisOptions = {}
): SpeechSynthesisState & SpeechSynthesisActions {
  const {
    lang = 'ar-SA',
    rate = 0.8,
    pitch = 1,
    onStart,
    onEnd,
    onError,
  } = options;

  // State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [hasArabicVoice, setHasArabicVoice] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refs for sequence playback
  const sequenceRef = useRef<string[]>([]);
  const sequenceIndexRef = useRef<number>(0);
  const sequenceCallbackRef = useRef<((index: number) => void) | null>(null);
  const isPlayingSequenceRef = useRef(false);

  // Voice ref
  const arabicVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Find the best Arabic voice
  const findArabicVoice = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      return null;
    }

    const voices = window.speechSynthesis.getVoices();

    // Priority order for Arabic voices
    const priorities = [
      'ar-SA',  // Saudi Arabic
      'ar-EG',  // Egyptian Arabic
      'ar-AE',  // UAE Arabic
      'ar',     // Generic Arabic
    ];

    for (const priority of priorities) {
      const voice = voices.find(v => v.lang.startsWith(priority));
      if (voice) {
        return voice;
      }
    }

    // Fallback: any voice containing 'arab' in name
    const arabicByName = voices.find(v =>
      v.name.toLowerCase().includes('arab') ||
      v.lang.toLowerCase().includes('ar')
    );

    return arabicByName || null;
  }, []);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setIsSupported(false);
      setError('Speech synthesis not supported in this browser');
      return;
    }

    setIsSupported(true);

    // Voices may load asynchronously
    const loadVoices = () => {
      const voice = findArabicVoice();
      arabicVoiceRef.current = voice;
      setHasArabicVoice(voice !== null);

      if (!voice) {
        setError('No Arabic voice available. TTS may not sound natural.');
      } else {
        setError(null);
      }
    };

    // Load voices immediately if available
    loadVoices();

    // Also listen for voice changes (Chrome loads voices async)
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [findArabicVoice]);

  // Speak a single text
  const speak = useCallback((text: string) => {
    if (!isSupported || !window.speechSynthesis) {
      onError?.('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;

    // Use Arabic voice if available
    if (arabicVoiceRef.current) {
      utterance.voice = arabicVoiceRef.current;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setError(null);
      onStart?.();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      onEnd?.();
    };

    utterance.onerror = (event) => {
      // Ignore 'interrupted' errors (caused by cancel())
      if (event.error === 'interrupted') {
        return;
      }
      const errorMsg = `Speech error: ${event.error}`;
      setError(errorMsg);
      setIsSpeaking(false);
      onError?.(errorMsg);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSupported, lang, rate, pitch, onStart, onEnd, onError]);

  // Stop speaking
  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    isPlayingSequenceRef.current = false;
  }, []);

  // Play a sequence of words with callbacks for each
  const speakSequence = useCallback((
    texts: string[],
    onWordChange: (index: number) => void
  ) => {
    if (!isSupported || texts.length === 0) {
      return;
    }

    // Store sequence state in refs
    sequenceRef.current = texts;
    sequenceIndexRef.current = 0;
    sequenceCallbackRef.current = onWordChange;
    isPlayingSequenceRef.current = true;

    const speakNext = () => {
      if (!isPlayingSequenceRef.current) {
        return;
      }

      const index = sequenceIndexRef.current;
      if (index >= sequenceRef.current.length) {
        // Sequence complete
        isPlayingSequenceRef.current = false;
        sequenceCallbackRef.current?.(-1); // Signal completion
        onEnd?.();
        return;
      }

      const text = sequenceRef.current[index];

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = pitch;

      if (arabicVoiceRef.current) {
        utterance.voice = arabicVoiceRef.current;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        sequenceCallbackRef.current?.(index);
      };

      utterance.onend = () => {
        if (!isPlayingSequenceRef.current) {
          setIsSpeaking(false);
          return;
        }
        sequenceIndexRef.current++;
        // Small delay between words for natural pacing
        setTimeout(speakNext, 200);
      };

      utterance.onerror = (event) => {
        if (event.error === 'interrupted') {
          return;
        }
        setError(`Speech error: ${event.error}`);
        setIsSpeaking(false);
        isPlayingSequenceRef.current = false;
      };

      window.speechSynthesis.speak(utterance);
    };

    // Start sequence
    onStart?.();
    speakNext();
  }, [isSupported, lang, rate, pitch, onStart, onEnd]);

  // Stop sequence playback
  const stopSequence = useCallback(() => {
    isPlayingSequenceRef.current = false;
    sequenceRef.current = [];
    sequenceIndexRef.current = 0;
    sequenceCallbackRef.current = null;
    stop();
  }, [stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    // State
    isSpeaking,
    isSupported,
    hasArabicVoice,
    error,
    // Actions
    speak,
    stop,
    speakSequence,
    stopSequence,
  };
}
