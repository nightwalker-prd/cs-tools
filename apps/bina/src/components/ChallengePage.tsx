import { useState, useCallback, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Trophy } from 'lucide-react';
import { getChallengeById, getNextChallenge, getPrevChallenge } from '../data/challenges';
import { useTestEngine } from '../hooks/useTestEngine';
import { useProgress } from '../hooks/useProgress';
import { useGamification } from '@arabtools/gamification/hooks';
import { ChallengeHeader } from './ChallengeHeader';
import { ArabicEditor } from './ArabicEditor';
import { TestResultsPanel } from './TestResultsPanel';
import { HintsPanel } from './HintsPanel';
import { SolutionPanel } from './SolutionPanel';
import { RefactorChallenge } from './RefactorChallenge';
import { TheorySlideOver } from './TheorySlideOver';
import type { ChallengePhase } from '../types';

interface ChallengePageProps {
  challengeId: string;
  onGoHome: () => void;
  onNavigate: (id: string) => void;
}

export function ChallengePage({ challengeId, onGoHome, onNavigate }: ChallengePageProps) {
  const challenge = getChallengeById(challengeId);
  const next = challenge ? getNextChallenge(challengeId) : undefined;
  const prev = challenge ? getPrevChallenge(challengeId) : undefined;

  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<ChallengePhase>('editing');
  const [showTheory, setShowTheory] = useState(false);

  const { progress, markAttempt, markCompleted, recordHintUsed } = useProgress();
  const { result, run, reset } = useTestEngine(challenge?.tests || []);
  const { recordPractice } = useGamification();
  const recordedRef = useRef<string | null>(null);

  const challengeProgress = challenge ? progress.challenges[challenge.id] : undefined;

  const handleRun = useCallback(() => {
    if (!challenge || !input.trim()) return;
    setPhase('running');
    markAttempt(challenge.id, input);
    run(input);
  }, [challenge, input, markAttempt, run]);

  useEffect(() => {
    if (result.status === 'passed' && phase === 'running') {
      setPhase('passed');
      if (challenge) {
        markCompleted(challenge.id);
        // Record gamification only once per challenge pass
        if (recordedRef.current !== challenge.id) {
          recordedRef.current = challenge.id;
          recordPractice({
            exercisesCompleted: result.totalCount,
            exercisesCorrect: result.passCount,
            isPerfectSession: result.failCount === 0,
            sourceApp: 'bina',
          });
        }
      }
    } else if (result.status === 'failed' && phase === 'running') {
      setPhase('editing');
    }
  }, [result.status, phase, challenge, markCompleted, recordPractice, result.totalCount, result.passCount, result.failCount]);

  const handleReset = useCallback(() => {
    setInput('');
    setPhase('editing');
    reset();
  }, [reset]);

  if (!challenge) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Challenge not found</h2>
        <p style={{ color: 'var(--color-muted-foreground)' }}>
          The challenge "{challengeId}" doesn't exist.
        </p>
        <button
          onClick={onGoHome}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1.25rem',
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
          }}
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {prev && (
            <button
              onClick={() => onNavigate(prev.id)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                padding: '0.3rem 0.7rem', background: 'none', border: '1px solid var(--color-border)',
                borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem',
                color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-sans)',
              }}
            >
              <ArrowLeft size={13} /> Prev
            </button>
          )}
          {next && (
            <button
              onClick={() => onNavigate(next.id)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                padding: '0.3rem 0.7rem', background: 'none', border: '1px solid var(--color-border)',
                borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem',
                color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-sans)',
              }}
            >
              Next <ArrowRight size={13} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowTheory(true)}
          style={{
            padding: '0.3rem 0.7rem', background: 'rgba(197,162,83,0.1)',
            border: '1px solid rgba(197,162,83,0.2)', borderRadius: '6px',
            cursor: 'pointer', fontSize: '0.78rem', color: 'var(--color-accent)',
            fontWeight: 500, fontFamily: 'var(--font-sans)',
          }}
        >
          Theory
        </button>
      </div>

      <ChallengeHeader challenge={challenge} />

      {/* Success banner */}
      {phase === 'passed' && (
        <div className="all-pass-banner">
          <Trophy size={24} style={{ color: 'var(--color-ink-green)', marginBottom: '0.25rem' }} />
          <h3 className="all-pass-title">All tests passed!</h3>
          <p className="all-pass-subtitle">
            {challenge.refactorChallenge
              ? 'Try the refactor challenge below, or move to the next challenge.'
              : 'Great work! Move on to the next challenge.'}
          </p>
          {next && (
            <button
              onClick={() => onNavigate(next.id)}
              style={{
                marginTop: '0.75rem',
                padding: '0.45rem 1.25rem',
                background: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
              }}
            >
              Next Challenge
            </button>
          )}
        </div>
      )}

      <ArabicEditor
        value={input}
        onChange={(v) => { setInput(v); if (phase !== 'editing') setPhase('editing'); }}
        onRun={handleRun}
        onReset={handleReset}
        isRunning={result.status === 'running'}
      />

      <TestResultsPanel result={result.results.length > 0 ? result : {
        status: 'idle',
        results: challenge.tests.map(t => ({ testId: t.id, name: t.name, passed: false, message: '' })),
        passCount: 0,
        failCount: 0,
        totalCount: challenge.tests.length,
      }} />

      {/* Refactor challenge */}
      {phase === 'passed' && challenge.refactorChallenge && (
        <RefactorChallenge
          refactor={challenge.refactorChallenge}
          challengeId={challenge.id}
        />
      )}

      <HintsPanel
        hints={challenge.hints}
        challengeId={challenge.id}
        onHintUsed={() => recordHintUsed(challenge.id)}
      />

      <SolutionPanel
        solutions={challenge.solutions}
        attempts={challengeProgress?.attempts || 0}
        completed={challengeProgress?.completed || false}
      />

      {showTheory && (
        <TheorySlideOver
          challenge={challenge}
          onClose={() => setShowTheory(false)}
        />
      )}
    </div>
  );
}
