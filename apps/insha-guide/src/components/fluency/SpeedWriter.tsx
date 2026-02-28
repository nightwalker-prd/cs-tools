import { useState, useCallback, useRef, useEffect } from 'react';
import type { FluencySession, FluencyRound, VocabularyItem } from '../../data/types';
import { FluencyTimer } from './FluencyTimer';
import { FluencyResults } from './FluencyResults';

interface SpeedWriterProps {
  lessonId: string;
  prompt: { promptEn: string; promptAr: string };
  vocab: VocabularyItem[];
  previousBest?: { wpm: number; wordCount: number } | null;
  onComplete: (session: FluencySession) => void;
  onCancel: () => void;
}

const ROUND_DURATIONS = [240, 180, 120]; // 4 min, 3 min, 2 min
const REVIEW_DURATION = 5000; // 5 seconds

type Phase = 'intro' | 'writing' | 'review' | 'results';

function countWords(text: string): number {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

export function SpeedWriter({ lessonId, prompt, vocab, previousBest, onComplete, onCancel }: SpeedWriterProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentRound, setCurrentRound] = useState(0);
  const [text, setText] = useState('');
  const [rounds, setRounds] = useState<FluencyRound[]>([]);
  const [session, setSession] = useState<FluencySession | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const startTimeRef = useRef<number>(0);
  const sessionStartRef = useRef<number>(0);

  const handleStart = useCallback(() => {
    setText('');
    setRounds([]);
    setCurrentRound(0);
    sessionStartRef.current = Date.now();
    startTimeRef.current = Date.now();
    setTimerRunning(true);
    setPhase('writing');
  }, []);

  const finishRound = useCallback(() => {
    setTimerRunning(false);
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const wordCount = countWords(text);
    const wpm = elapsed > 0 ? (wordCount / (elapsed / 60)) : 0;

    const round: FluencyRound = {
      durationSec: ROUND_DURATIONS[currentRound],
      text,
      wordCount,
      wpm,
      elapsedSec: elapsed,
    };

    const newRounds = [...rounds, round];
    setRounds(newRounds);

    if (currentRound < 2) {
      // Show review briefly then start next round
      setPhase('review');
    } else {
      // All 3 rounds done
      const s: FluencySession = {
        id: `speed-${Date.now()}`,
        type: 'speed-writing',
        lessonId,
        prompt: prompt.promptEn,
        startedAt: sessionStartRef.current,
        completedAt: Date.now(),
        rounds: newRounds,
      };
      setSession(s);
      setPhase('results');
      onComplete(s);
    }
  }, [text, currentRound, rounds, lessonId, prompt.promptEn, onComplete]);

  const handleExpire = useCallback(() => {
    finishRound();
  }, [finishRound]);

  // Auto-advance from review to next round after 5 seconds
  useEffect(() => {
    if (phase !== 'review') return;
    const timer = setTimeout(() => {
      const nextRound = currentRound + 1;
      setCurrentRound(nextRound);
      setText('');
      startTimeRef.current = Date.now();
      setTimerRunning(true);
      setPhase('writing');
    }, REVIEW_DURATION);
    return () => clearTimeout(timer);
  }, [phase, currentRound]);

  if (phase === 'intro') {
    return (
      <div className="fluency-config animate-fade-in">
        <h3>Speed Writing (4/3/2)</h3>
        <p className="fluency-config-desc">
          Write on the same prompt 3 times with decreasing time: 4 minutes → 3 minutes → 2 minutes.
          The goal is to produce similar content faster each round.
        </p>

        <div className="fluency-prompt-display">
          <p className="fluency-prompt-en">{prompt.promptEn}</p>
          <p className="fluency-prompt-ar font-arabic" dir="rtl">{prompt.promptAr}</p>
        </div>

        {vocab.length > 0 && (
          <div className="fluency-word-bank">
            <div className="fluency-word-bank-title">Word Bank</div>
            <div className="fluency-word-bank-words">
              {vocab.slice(0, 12).map((w, i) => (
                <span key={i} className="fluency-word-chip font-arabic" dir="rtl" title={w.english}>
                  {w.arabic}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="fluency-round-preview">
          {ROUND_DURATIONS.map((d, i) => (
            <div key={i} className="fluency-round-preview-item">
              <span className="fluency-round-num">Round {i + 1}</span>
              <span className="fluency-round-time">{d / 60} min</span>
            </div>
          ))}
        </div>

        <div className="fluency-actions">
          <button className="btn btn-primary" onClick={handleStart}>
            Start Round 1
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Back
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'writing') {
    const wordCount = countWords(text);
    return (
      <div className="fluency-writing animate-fade-in">
        <div className="fluency-round-indicator">
          Round {currentRound + 1} of 3 — {ROUND_DURATIONS[currentRound] / 60} minutes
        </div>

        <FluencyTimer
          key={currentRound}
          durationSec={ROUND_DURATIONS[currentRound]}
          running={timerRunning}
          onExpire={handleExpire}
        />

        <div className="fluency-prompt-mini">
          <span className="font-arabic" dir="rtl">{prompt.promptAr}</span>
        </div>

        <textarea
          className="writing-textarea font-arabic fluency-textarea"
          dir="rtl"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="اكتب هنا..."
          autoFocus
        />

        <div className="fluency-writing-footer">
          <span className="fluency-word-count">{wordCount} words</span>
          <button className="btn btn-secondary btn-sm" onClick={finishRound}>
            Finish Early
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'review') {
    const lastRound = rounds[rounds.length - 1];
    return (
      <div className="fluency-review animate-fade-in">
        <div className="fluency-round-indicator">
          Review — Round {currentRound + 1} complete!
        </div>
        <p className="fluency-review-stats">
          {lastRound.wordCount} words at {lastRound.wpm.toFixed(1)} WPM
        </p>
        <div className="fluency-review-text font-arabic" dir="rtl">
          {lastRound.text}
        </div>
        <p className="fluency-review-next">
          Next round starts in 5 seconds...
        </p>
      </div>
    );
  }

  if (phase === 'results' && session) {
    return (
      <FluencyResults
        session={session}
        previousBest={previousBest}
        onDone={onCancel}
      />
    );
  }

  return null;
}
