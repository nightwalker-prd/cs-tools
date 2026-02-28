import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { X } from 'lucide-react';
import { shuffle } from '@arabtools/core';
import { lemmas } from '@/data/lemmas';
import type { Lemma } from '@/data/lemmas';
import { useSimilarWords } from '@/hooks/useSimilarWords';

interface SimilarWordsTrainerProps {
  navigate: (path: string) => void;
}

const SESSION_SIZES = [10, 20, 30] as const;
type Phase = 'config' | 'drilling' | 'done';

// Build a lookup map from lemmaId → Lemma
const lemmaByLemmaId = new Map<number, Lemma>();
for (const l of lemmas) {
  lemmaByLemmaId.set(l.lemmaId, l);
}

export function SimilarWordsTrainer({ navigate }: SimilarWordsTrainerProps) {
  const { loadData, getDistractors, loading, data } = useSimilarWords();
  const [sessionSize, setSessionSize] = useState<10 | 20 | 30>(20);
  const [phase, setPhase] = useState<Phase>('config');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const sessionRef = useRef<{ correct: Lemma; options: Lemma[] }[]>([]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Get all lemmas that have distractors available
  const availableLemmas = useMemo(() => {
    if (!data) return [];
    return lemmas.filter(l => {
      const dists = data[l.lemmaId];
      if (!dists || dists.length < 3) return false;
      // Ensure at least 3 distractors resolve to known lemmas
      const resolved = dists.filter(d => lemmaByLemmaId.has(d));
      return resolved.length >= 3;
    });
  }, [data]);

  const buildSession = useCallback(() => {
    const pool = shuffle([...availableLemmas]).slice(0, sessionSize);
    const items = pool.map(correct => {
      const distIds = getDistractors(correct.lemmaId);
      const distLemmas = distIds
        .map(id => lemmaByLemmaId.get(id))
        .filter((l): l is Lemma => l !== undefined && l.lemmaId !== correct.lemmaId);
      const chosen = shuffle([...distLemmas]).slice(0, 3);
      return {
        correct,
        options: shuffle([correct, ...chosen]),
      };
    });
    return items;
  }, [availableLemmas, sessionSize, getDistractors]);

  const handleStart = useCallback(() => {
    sessionRef.current = buildSession();
    setCurrentIdx(0);
    setSelected(null);
    setScore(0);
    setPhase('drilling');
  }, [buildSession]);

  const handleSelect = useCallback((idx: number) => {
    if (selected !== null) return;
    setSelected(idx);

    const item = sessionRef.current[currentIdx];
    const isCorrect = item.options[idx].lemmaId === item.correct.lemmaId;
    if (isCorrect) setScore(s => s + 1);

    setTimeout(() => {
      if (currentIdx + 1 >= sessionRef.current.length) {
        setPhase('done');
      } else {
        setCurrentIdx(i => i + 1);
        setSelected(null);
      }
    }, 1200);
  }, [selected, currentIdx]);

  // Keyboard shortcuts: 1-4 keys
  useEffect(() => {
    if (phase !== 'drilling') return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const num = parseInt(e.key);
      if (num >= 1 && num <= 4) {
        handleSelect(num - 1);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [phase, handleSelect]);

  // ─── Config Phase ──────────────────────────────────────────────────────
  if (phase === 'config') {
    return (
      <div className="animate-fade-in" style={{ maxWidth: 560 }}>
        <div className="topic-header">
          <div className="breadcrumb">
            <button className="breadcrumb-link" onClick={() => navigate('#/')}>Home</button>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Similar Words</span>
          </div>
          <h2 className="topic-title">Similar Words Trainer</h2>
          <p className="topic-subtitle">
            See an English meaning and pick the correct Arabic word from visually similar options
          </p>
        </div>

        {loading || !data ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted-foreground)' }}>
            Loading word data...
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'var(--font-serif)' }}>
                {availableLemmas.length}
              </span>
              <span style={{ marginLeft: '0.5rem', color: 'var(--color-muted-foreground)' }}>
                words with smart distractors
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
              {SESSION_SIZES.map(size => (
                <button
                  key={size}
                  className={`category-tab ${sessionSize === size ? 'active' : ''}`}
                  onClick={() => setSessionSize(size)}
                >
                  {size} questions
                </button>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                className="btn btn-accent"
                onClick={handleStart}
                disabled={availableLemmas.length === 0}
                style={{ padding: '0.75rem 2.5rem', fontSize: '1rem' }}
              >
                Start ({Math.min(sessionSize, availableLemmas.length)} questions)
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // ─── Done Phase ────────────────────────────────────────────────────────
  if (phase === 'done') {
    const total = sessionRef.current.length;
    const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

    return (
      <div className="animate-fade-in" style={{ maxWidth: 560 }}>
        <div className="study-card" style={{ textAlign: 'center' }}>
          <div className="study-card-content">
            <p style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--color-accent)', fontFamily: 'var(--font-serif)' }}>
              {accuracy}%
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-primary)', fontFamily: 'var(--font-serif)', marginBottom: '0.25rem' }}>
              {score} / {total} correct
            </p>
            <p style={{ color: 'var(--color-muted-foreground)', marginBottom: '1.25rem' }}>
              {accuracy >= 90 ? 'Excellent discrimination!' :
               accuracy >= 70 ? 'Good work! Keep practicing.' :
               'These words are tricky — try again!'}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button className="btn btn-accent" onClick={handleStart}>
                Try Again
              </button>
              <button className="btn" onClick={() => setPhase('config')}>
                Configure
              </button>
              <button className="btn" onClick={() => navigate('#/')}>
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Drilling Phase ────────────────────────────────────────────────────
  const item = sessionRef.current[currentIdx];
  if (!item) return null;

  const progress = ((currentIdx + 1) / sessionRef.current.length) * 100;

  return (
    <div className="animate-fade-in" style={{ maxWidth: 560 }}>
      <div className="topic-header">
        <div className="breadcrumb">
          <button className="breadcrumb-link" onClick={() => navigate('#/')}>Home</button>
          <span className="breadcrumb-sep">/</span>
          <button className="breadcrumb-link" onClick={() => setPhase('config')}>Similar Words</button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Quiz</span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-muted-foreground)', marginBottom: '0.3rem' }}>
            <span>{currentIdx + 1} / {sessionRef.current.length}</span>
            <span>{score} correct</span>
          </div>
          <div style={{ height: 6, background: 'var(--color-muted)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-accent)', borderRadius: 3, transition: 'width 0.3s ease' }} />
          </div>
        </div>
        <button
          className="btn"
          style={{ padding: '0.35rem', lineHeight: 1, flexShrink: 0 }}
          onClick={() => setPhase('config')}
          title="Exit quiz"
        >
          <X size={18} />
        </button>
      </div>

      {/* Question card */}
      <div className="study-card">
        <div className="sw-prompt">
          {item.correct.meaning}
        </div>

        <div className="sw-options">
          {item.options.map((opt, i) => {
            let className = 'sw-option';
            if (selected !== null) {
              if (opt.lemmaId === item.correct.lemmaId) className += ' correct';
              else if (i === selected) className += ' incorrect';
            }
            return (
              <button
                key={opt.lemmaId}
                className={className}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
              >
                {opt.lemma}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-muted-foreground)', fontStyle: 'italic' }}>
            {item.correct.transliteration}
          </div>
        )}
      </div>
    </div>
  );
}
