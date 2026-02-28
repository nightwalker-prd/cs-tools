import { useState, useCallback, useRef } from 'react';
import type { FluencySession, FluencyRound, VocabularyItem } from '../../data/types';
import { FluencyTimer } from './FluencyTimer';
import { FluencyResults } from './FluencyResults';

interface SprintWriterProps {
  lessonId: string;
  prompt: { promptEn: string; promptAr: string };
  vocab: VocabularyItem[];
  previousBest?: { wpm: number; wordCount: number } | null;
  onComplete: (session: FluencySession) => void;
  onCancel: () => void;
}

type Duration = 5 | 10 | 15;
type Phase = 'config' | 'writing' | 'results';

function countWords(text: string): number {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

export function SprintWriter({ lessonId, prompt, vocab, previousBest, onComplete, onCancel }: SprintWriterProps) {
  const [phase, setPhase] = useState<Phase>('config');
  const [duration, setDuration] = useState<Duration>(10);
  const [text, setText] = useState('');
  const [session, setSession] = useState<FluencySession | null>(null);
  const startTimeRef = useRef<number>(0);

  const durationSec = duration * 60;

  const handleStart = useCallback(() => {
    setText('');
    startTimeRef.current = Date.now();
    setPhase('writing');
  }, []);

  const handleExpire = useCallback(() => {
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const wordCount = countWords(text);
    const wpm = elapsed > 0 ? (wordCount / (elapsed / 60)) : 0;

    const round: FluencyRound = {
      durationSec,
      text,
      wordCount,
      wpm,
      elapsedSec: elapsed,
    };

    const s: FluencySession = {
      id: `sprint-${Date.now()}`,
      type: 'sprint',
      lessonId,
      prompt: prompt.promptEn,
      startedAt: startTimeRef.current,
      completedAt: Date.now(),
      rounds: [round],
    };

    setSession(s);
    setPhase('results');
    onComplete(s);
  }, [text, durationSec, lessonId, prompt.promptEn, onComplete]);

  const handleFinishEarly = useCallback(() => {
    handleExpire();
  }, [handleExpire]);

  if (phase === 'config') {
    return (
      <div className="fluency-config animate-fade-in">
        <h3>Writing Sprint</h3>
        <p className="fluency-config-desc">
          Write freely on the prompt below. Focus on speed and fluency — don't worry about perfection.
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

        <div className="fluency-duration-picker">
          <span>Duration:</span>
          {([5, 10, 15] as Duration[]).map(d => (
            <button
              key={d}
              className={`fluency-duration-btn ${duration === d ? 'active' : ''}`}
              onClick={() => setDuration(d)}
            >
              {d} min
            </button>
          ))}
        </div>

        <div className="fluency-actions">
          <button className="btn btn-primary" onClick={handleStart}>
            Start Sprint
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
        <FluencyTimer
          durationSec={durationSec}
          running={true}
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
          <button className="btn btn-secondary btn-sm" onClick={handleFinishEarly}>
            Finish Early
          </button>
        </div>
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
