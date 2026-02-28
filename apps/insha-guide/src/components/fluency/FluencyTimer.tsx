import { useState, useEffect, useRef, useCallback } from 'react';

interface FluencyTimerProps {
  durationSec: number;
  running: boolean;
  onExpire: () => void;
  onTick?: (remainingSec: number) => void;
}

export function FluencyTimer({ durationSec, running, onExpire, onTick }: FluencyTimerProps) {
  const [remaining, setRemaining] = useState(durationSec);
  const startTimeRef = useRef<number | null>(null);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    setRemaining(durationSec);
    startTimeRef.current = null;
  }, [durationSec]);

  const tick = useCallback(() => {
    if (!startTimeRef.current) return;
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const left = Math.max(0, durationSec - elapsed);
    setRemaining(left);
    onTick?.(left);
    if (left <= 0) {
      onExpireRef.current();
    }
  }, [durationSec, onTick]);

  useEffect(() => {
    if (!running) {
      startTimeRef.current = null;
      return;
    }

    startTimeRef.current = Date.now();
    const interval = setInterval(tick, 250);
    return () => clearInterval(interval);
  }, [running, tick]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const pct = durationSec > 0 ? (remaining / durationSec) * 100 : 0;
  const urgent = remaining <= 30;

  return (
    <div className={`fluency-timer ${urgent ? 'urgent' : ''}`}>
      <div className="fluency-timer-display">
        {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </div>
      <div className="fluency-timer-bar">
        <div
          className="fluency-timer-bar-fill"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function useElapsedTime(running: boolean): number {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) {
      startRef.current = null;
      return;
    }
    startRef.current = Date.now();
    const interval = setInterval(() => {
      if (startRef.current) {
        setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
      }
    }, 250);
    return () => clearInterval(interval);
  }, [running]);

  return elapsed;
}
