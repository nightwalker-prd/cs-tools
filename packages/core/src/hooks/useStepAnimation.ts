import { useState, useCallback, useRef, useEffect } from 'react';

export function useStepAnimation(totalSteps: number) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
    clearTimer();
  }, [clearTimer]);

  const stepForward = useCallback(() => {
    setStep(s => Math.min(s + 1, totalSteps - 1));
  }, [totalSteps]);

  const stepBack = useCallback(() => {
    setStep(s => Math.max(s - 1, 0));
  }, []);

  const reset = useCallback(() => {
    pause();
    setStep(0);
  }, [pause]);

  useEffect(() => {
    if (isPlaying) {
      clearTimer();
      intervalRef.current = setInterval(() => {
        setStep(s => {
          if (s >= totalSteps - 1) {
            setIsPlaying(false);
            return s;
          }
          return s + 1;
        });
      }, 1000 / speed);
    }
    return clearTimer;
  }, [isPlaying, speed, totalSteps, clearTimer]);

  return { step, setStep, isPlaying, play, pause, stepForward, stepBack, reset, speed, setSpeed, totalSteps };
}
