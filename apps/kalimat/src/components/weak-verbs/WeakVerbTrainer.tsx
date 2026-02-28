import { useState, useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';
import { shuffle } from '@arabtools/core';
import { useWeakVerbLoader } from '@/hooks/useWeakVerbLoader';
import type { WeakVerbEntry, WeakVerbType } from '@/types';

interface WeakVerbTrainerProps {
  navigate: (path: string) => void;
}

const TYPE_LABELS: Record<WeakVerbType, string> = {
  assimilated: 'Assimilated',
  hollow: 'Hollow',
  defective: 'Defective',
  'doubly-weak': 'Doubly Weak',
};

const TYPE_FILTERS: { key: WeakVerbType | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'assimilated', label: 'Assimilated' },
  { key: 'hollow', label: 'Hollow' },
  { key: 'defective', label: 'Defective' },
  { key: 'doubly-weak', label: 'Doubly Weak' },
];

const SESSION_SIZES = [10, 20, 30] as const;

type Phase = 'config' | 'drilling' | 'done';

export function WeakVerbTrainer({ navigate }: WeakVerbTrainerProps) {
  const { loadWeakVerbs, loading } = useWeakVerbLoader();
  const [allEntries, setAllEntries] = useState<WeakVerbEntry[]>([]);
  const [filter, setFilter] = useState<WeakVerbType | 'all'>('all');
  const [sessionSize, setSessionSize] = useState<10 | 20 | 30>(20);
  const [phase, setPhase] = useState<Phase>('config');
  const [revealed, setRevealed] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  const sessionRef = useRef<WeakVerbEntry[]>([]);

  useEffect(() => {
    loadWeakVerbs().then(setAllEntries);
  }, [loadWeakVerbs]);

  const filtered = allEntries.filter(
    e => filter === 'all' || e.type === filter
  );

  const typeCounts = allEntries.reduce<Record<string, number>>((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1;
    return acc;
  }, {});

  const handleStart = useCallback(() => {
    const pool = shuffle([...filtered]);
    sessionRef.current = pool.slice(0, sessionSize);
    setCurrentIdx(0);
    setRevealed(false);
    setPhase('drilling');
  }, [filtered, sessionSize]);

  const handleReveal = useCallback(() => setRevealed(true), []);

  const handleNext = useCallback(() => {
    if (currentIdx + 1 >= sessionRef.current.length) {
      setPhase('done');
    } else {
      setCurrentIdx(i => i + 1);
      setRevealed(false);
    }
  }, [currentIdx]);

  // Keyboard shortcuts
  useEffect(() => {
    if (phase !== 'drilling') return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (!revealed && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        handleReveal();
      } else if (revealed && (e.key === ' ' || e.key === 'ArrowRight' || e.key.toLowerCase() === 'n')) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [phase, revealed, handleReveal, handleNext]);

  const current = sessionRef.current[currentIdx];

  // ─── Config Phase ──────────────────────────────────────────────────────
  if (phase === 'config') {
    return (
      <div className="animate-fade-in" style={{ maxWidth: 560 }}>
        <div className="topic-header">
          <div className="breadcrumb">
            <button className="breadcrumb-link" onClick={() => navigate('#/')}>Home</button>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Weak Verbs</span>
          </div>
          <h2 className="topic-title">Weak Verb Trainer</h2>
          <p className="topic-subtitle">
            Practice predicting weak letter behavior in Quranic verb forms
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted-foreground)' }}>
            Loading weak verb data...
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'var(--font-serif)' }}>
                {allEntries.length}
              </span>
              <span style={{ marginLeft: '0.5rem', color: 'var(--color-muted-foreground)' }}>
                unique weak verb patterns
              </span>
            </div>

            <div className="category-tabs" style={{ marginBottom: '1.25rem' }}>
              {TYPE_FILTERS.map(({ key, label }) => (
                <button
                  key={key}
                  className={`category-tab ${filter === key ? 'active' : ''}`}
                  onClick={() => setFilter(key)}
                >
                  {label}
                  <span style={{ marginLeft: '0.35rem', opacity: 0.6, fontSize: '0.8em' }}>
                    {key === 'all' ? allEntries.length : typeCounts[key] || 0}
                  </span>
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
              {SESSION_SIZES.map(size => (
                <button
                  key={size}
                  className={`category-tab ${sessionSize === size ? 'active' : ''}`}
                  onClick={() => setSessionSize(size)}
                >
                  {size} cards
                </button>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                className="btn btn-accent"
                onClick={handleStart}
                disabled={filtered.length === 0}
                style={{ padding: '0.75rem 2.5rem', fontSize: '1rem' }}
              >
                Start Drill ({Math.min(sessionSize, filtered.length)} cards)
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // ─── Done Phase ────────────────────────────────────────────────────────
  if (phase === 'done') {
    return (
      <div className="animate-fade-in" style={{ maxWidth: 560 }}>
        <div className="study-card" style={{ textAlign: 'center' }}>
          <div className="study-card-content">
            <p style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'var(--font-serif)' }}>
              Session Complete
            </p>
            <p style={{ color: 'var(--color-muted-foreground)', marginBottom: '1.25rem' }}>
              You reviewed {sessionRef.current.length} weak verb patterns
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button className="btn btn-accent" onClick={handleStart}>
                Again
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
  if (!current) return null;

  const progress = ((currentIdx + 1) / sessionRef.current.length) * 100;
  const [surah, ayah] = current.ref.split(':');
  const spacedRoot = [...current.root].join(' ');

  return (
    <div className="animate-fade-in" style={{ maxWidth: 560 }}>
      <div className="topic-header">
        <div className="breadcrumb">
          <button className="breadcrumb-link" onClick={() => navigate('#/')}>Home</button>
          <span className="breadcrumb-sep">/</span>
          <button className="breadcrumb-link" onClick={() => setPhase('config')}>Weak Verbs</button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Drill</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-muted-foreground)', marginBottom: '0.3rem' }}>
            <span>{currentIdx + 1} / {sessionRef.current.length}</span>
          </div>
          <div style={{ height: 6, background: 'var(--color-muted)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-accent)', borderRadius: 3, transition: 'width 0.3s ease' }} />
          </div>
        </div>
        <button
          className="btn"
          style={{ padding: '0.35rem', lineHeight: 1, flexShrink: 0 }}
          onClick={() => setPhase('config')}
          title="Exit drill"
        >
          <X size={18} />
        </button>
      </div>

      <div className="study-card" onClick={() => !revealed && handleReveal()}>
        <div className="study-card-content">
          {/* Front: root, pattern, change, before word */}
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <div className="font-arabic" dir="rtl" style={{ fontSize: '2rem', color: 'var(--color-accent)', letterSpacing: '0.3em', marginBottom: '0.5rem' }}>
              {spacedRoot}
            </div>
            {current.form && (
              <div className="font-arabic" dir="rtl" style={{ fontSize: '1.1rem', color: 'var(--color-muted-foreground)' }}>
                {current.form}
              </div>
            )}
            {current.changeId && (
              <span style={{
                display: 'inline-block',
                marginTop: '0.5rem',
                padding: '0.2rem 0.6rem',
                background: 'rgba(26, 49, 80, 0.08)',
                borderRadius: 6,
                fontSize: '0.8rem',
                color: 'var(--color-primary)',
              }}>
                {current.changeId}
              </span>
            )}
          </div>

          <div className="study-card-arabic font-arabic" dir="rtl" style={{ fontSize: '2.5rem' }}>
            {current.before}
          </div>

          {!revealed ? (
            <div className="study-hint">
              Tap to predict what happens to the weak letter
            </div>
          ) : (
            <div className="study-card-reveal">
              <div className="study-card-arabic font-arabic" dir="rtl" style={{ fontSize: '3rem', color: 'var(--color-accent)' }}>
                {current.after}
              </div>

              <div className="study-card-meaning">{current.meaning}</div>

              <span className={`weak-type-badge weak-type-${current.type}`}>
                {TYPE_LABELS[current.type]}
              </span>

              {current.note && (
                <div className="weak-note">{current.note}</div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center', marginTop: '0.5rem' }}>
                <button
                  className="btn"
                  style={{ fontSize: '0.8rem', padding: '0.25rem 0.6rem' }}
                  onClick={(e) => { e.stopPropagation(); navigate(`#/ayah/${surah}/${ayah}`); }}
                >
                  Quran {current.ref}
                </button>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-muted-foreground)' }}>
                  {current.count} occurrence{current.count !== 1 ? 's' : ''}
                </span>
              </div>

              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <button className="btn btn-accent" onClick={(e) => { e.stopPropagation(); handleNext(); }} style={{ padding: '0.6rem 2rem' }}>
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
