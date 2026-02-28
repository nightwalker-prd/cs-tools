import { useState, useCallback, useRef } from 'react';
import type { FluencySession, FluencyRound } from '../../data/types';
import { calculateOverlap } from '../../utils/text-overlap';
import { FluencyTimer, useElapsedTime } from './FluencyTimer';
import { FluencyResults } from './FluencyResults';

interface RewriteWriterProps {
  lessonId: string;
  drafts: { id: string; text: string; updatedAt: number }[];
  previousBest?: { wpm: number; wordCount: number } | null;
  onComplete: (session: FluencySession) => void;
  onCancel: () => void;
}

type Phase = 'select' | 'reading' | 'writing' | 'results';

const READING_DURATION = 30; // 30 seconds

function countWords(text: string): number {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

export function RewriteWriter({ lessonId, drafts, previousBest, onComplete, onCancel }: RewriteWriterProps) {
  const [phase, setPhase] = useState<Phase>('select');
  const [selectedDraft, setSelectedDraft] = useState<string>('');
  const [originalText, setOriginalText] = useState('');
  const [text, setText] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const [session, setSession] = useState<FluencySession | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsed = useElapsedTime(isWriting);

  const handleSelectDraft = useCallback((draftId: string, draftText: string) => {
    setSelectedDraft(draftId);
    setOriginalText(draftText);
    setPhase('reading');
  }, []);

  // After reading timer expires, start writing phase
  const handleReadingExpire = useCallback(() => {
    setText('');
    startTimeRef.current = Date.now();
    setIsWriting(true);
    setPhase('writing');
  }, []);

  const handleFinish = useCallback(() => {
    setIsWriting(false);
    const elapsedSec = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const wordCount = countWords(text);
    const wpm = elapsedSec > 0 ? (wordCount / (elapsedSec / 60)) : 0;
    const overlapPercent = calculateOverlap(originalText, text);

    const round: FluencyRound = {
      durationSec: elapsedSec,
      text,
      wordCount,
      wpm,
      elapsedSec,
    };

    const s: FluencySession = {
      id: `rewrite-${Date.now()}`,
      type: 'rewrite',
      lessonId,
      prompt: `Rewrite: ${selectedDraft}`,
      startedAt: startTimeRef.current,
      completedAt: Date.now(),
      rounds: [round],
      originalText,
      overlapPercent,
    };

    setSession(s);
    setPhase('results');
    onComplete(s);
  }, [text, originalText, lessonId, selectedDraft, onComplete]);

  if (phase === 'select') {
    if (drafts.length === 0) {
      return (
        <div className="fluency-config animate-fade-in">
          <h3>Rewrite from Memory</h3>
          <p className="fluency-config-desc">
            No compose drafts available for this lesson yet. Complete a compose activity first, then come back to practice rewriting from memory.
          </p>
          <div className="fluency-actions">
            <button className="btn btn-secondary" onClick={onCancel}>
              Back
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="fluency-config animate-fade-in">
        <h3>Rewrite from Memory</h3>
        <p className="fluency-config-desc">
          Select a previous compose draft. You'll read it for 30 seconds, then rewrite it from memory.
        </p>

        <div className="fluency-draft-list">
          {drafts.map(draft => (
            <button
              key={draft.id}
              className="fluency-draft-item"
              onClick={() => handleSelectDraft(draft.id, draft.text)}
            >
              <div className="fluency-draft-preview font-arabic" dir="rtl">
                {draft.text.slice(0, 100)}{draft.text.length > 100 ? '...' : ''}
              </div>
              <div className="fluency-draft-meta">
                {countWords(draft.text)} words · {new Date(draft.updatedAt).toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>

        <div className="fluency-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Back
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'reading') {
    return (
      <div className="fluency-writing animate-fade-in">
        <div className="fluency-round-indicator">
          Reading Phase — Memorize the text below
        </div>

        <FluencyTimer
          durationSec={READING_DURATION}
          running={true}
          onExpire={handleReadingExpire}
        />

        <div className="fluency-original-text font-arabic" dir="rtl">
          {originalText}
        </div>
      </div>
    );
  }

  if (phase === 'writing') {
    const wordCount = countWords(text);
    const elapsedMin = Math.floor(elapsed / 60);
    const elapsedSec = elapsed % 60;

    return (
      <div className="fluency-writing animate-fade-in">
        <div className="fluency-round-indicator">
          Writing Phase — Rewrite from memory
        </div>

        <div className="fluency-elapsed-timer">
          {String(elapsedMin).padStart(2, '0')}:{String(elapsedSec).padStart(2, '0')}
        </div>

        <textarea
          className="writing-textarea font-arabic fluency-textarea"
          dir="rtl"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="أعد كتابة النص من ذاكرتك..."
          autoFocus
        />

        <div className="fluency-writing-footer">
          <span className="fluency-word-count">{wordCount} words</span>
          <button className="btn btn-primary btn-sm" onClick={handleFinish}>
            Done Writing
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
