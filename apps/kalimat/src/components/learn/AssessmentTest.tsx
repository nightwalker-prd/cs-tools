import { useState, useMemo, useCallback } from 'react';
import { lemmas } from '@/data/lemmas';
import { rootFrequency } from '@/data/root-frequency';
import { rootToLemma } from '@/data/root-to-lemma';
import { useLearningEngine } from '@/hooks/useLearningEngine';
import { ProgressRing } from '@/components/shared/ProgressRing';
import { shuffle } from '@arabtools/core';
import type { AssessmentResult } from '@/types';

interface AssessmentTestProps {
  navigate: (path: string) => void;
}

// Tier coverage weights (from plan)
const TIER_WEIGHTS = [0.604, 0.229, 0.106, 0.061];
const TIER_SAMPLE_SIZES = [10, 8, 7, 5]; // 30 total

function sampleByTier(): { lemmaId: number; lemma: string; meaning: string; tier: number }[] {
  // Build tier → lemmaIds mapping via rootFrequency + rootToLemma
  const tierLemmas: Map<number, Set<number>> = new Map([[1, new Set()], [2, new Set()], [3, new Set()], [4, new Set()]]);

  for (const rf of rootFrequency) {
    const linkedIds = rootToLemma[rf.root] || [];
    for (const id of linkedIds) {
      tierLemmas.get(rf.tier)!.add(id);
    }
  }

  const result: { lemmaId: number; lemma: string; meaning: string; tier: number }[] = [];

  for (let tier = 1; tier <= 4; tier++) {
    const ids = [...tierLemmas.get(tier)!];
    const available = ids
      .map(id => lemmas.find(l => l.id === id))
      .filter((l): l is NonNullable<typeof l> => l != null && l.meaning.length > 0);

    const shuffled = shuffle([...available]);
    const count = Math.min(TIER_SAMPLE_SIZES[tier - 1], shuffled.length);

    for (let i = 0; i < count; i++) {
      result.push({
        lemmaId: shuffled[i].id,
        lemma: shuffled[i].lemma,
        meaning: shuffled[i].meaning,
        tier,
      });
    }
  }

  return shuffle(result);
}

function generateDistractors(correctMeaning: string, count: number): string[] {
  const allMeanings = lemmas
    .map(l => l.meaning)
    .filter(m => m.length > 0 && m !== correctMeaning);
  const shuffled = shuffle([...allMeanings]);
  return shuffled.slice(0, count);
}

function calculateResults(
  questions: { lemmaId: number; tier: number }[],
  newAnswers: (boolean | null)[],
): AssessmentResult {
  const tierScores: AssessmentResult['tierScores'] = [];
  for (let tier = 1; tier <= 4; tier++) {
    const indices = questions
      .map((q, i) => (q.tier === tier ? i : -1))
      .filter(i => i >= 0);
    tierScores.push({
      tier,
      correct: indices.filter(i => newAnswers[i] === true).length,
      total: indices.length,
    });
  }

  const comprehension = tierScores.reduce((sum, ts) => {
    const accuracy = ts.total > 0 ? ts.correct / ts.total : 0;
    return sum + accuracy * TIER_WEIGHTS[ts.tier - 1];
  }, 0) * 100;

  const knownLemmaIds = questions
    .filter((_, i) => newAnswers[i] === true)
    .map(q => q.lemmaId);

  return {
    comprehension: Math.round(comprehension),
    tierScores,
    knownLemmaIds,
  };
}

export function AssessmentTest({ navigate }: AssessmentTestProps) {
  const { recordReview } = useLearningEngine();

  const [phase, setPhase] = useState<'intro' | 'test' | 'results'>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const questions = useMemo(() => {
    const sampled = sampleByTier();
    return sampled.map(q => {
      const distractors = generateDistractors(q.meaning, 3);
      const options = shuffle([q.meaning, ...distractors]);
      return { ...q, options, correctIdx: options.indexOf(q.meaning) };
    });
  }, []);

  const finishTest = useCallback((newAnswers: (boolean | null)[]) => {
    const res = calculateResults(questions, newAnswers);
    setResult(res);
    for (const id of res.knownLemmaIds) {
      recordReview(id, 'good');
    }
    setPhase('results');
  }, [questions, recordReview]);

  const handleAnswer = useCallback((selectedIdx: number) => {
    const q = questions[currentIdx];
    const isCorrect = selectedIdx === q.correctIdx;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);

    if (currentIdx + 1 >= questions.length) {
      finishTest(newAnswers);
    } else {
      setCurrentIdx(currentIdx + 1);
    }
  }, [currentIdx, questions, answers, finishTest]);

  const handleSkip = useCallback(() => {
    const newAnswers = [...answers, null];
    setAnswers(newAnswers);

    if (currentIdx + 1 >= questions.length) {
      finishTest(newAnswers);
    } else {
      setCurrentIdx(currentIdx + 1);
    }
  }, [currentIdx, questions, answers, finishTest]);

  if (phase === 'intro') {
    return (
      <div className="animate-fade-in" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="hero" style={{ marginBottom: '2rem' }}>
          <div className="hero-gold-line" />
          <h1 className="hero-title-ar">اختبار المفردات</h1>
          <p className="hero-title-en">Vocabulary Assessment</p>
          <p className="hero-description">
            Take a quick 30-question test to measure how much Quranic vocabulary you already know.
            Your results will be used to personalize your learning experience.
          </p>
        </div>

        <div className="assessment-info">
          <div className="assessment-info-item">
            <div className="assessment-info-value">30</div>
            <div className="assessment-info-label">Questions</div>
          </div>
          <div className="assessment-info-item">
            <div className="assessment-info-value">~5</div>
            <div className="assessment-info-label">Minutes</div>
          </div>
          <div className="assessment-info-item">
            <div className="assessment-info-value">4</div>
            <div className="assessment-info-label">Tiers</div>
          </div>
        </div>

        <button
          className="btn btn-accent"
          style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', marginTop: '1.5rem' }}
          onClick={() => setPhase('test')}
        >
          Start Assessment
        </button>
      </div>
    );
  }

  if (phase === 'test' && questions[currentIdx]) {
    const q = questions[currentIdx];
    const progressPct = Math.round(((currentIdx) / questions.length) * 100);

    return (
      <div className="animate-fade-in" style={{ maxWidth: 500, margin: '0 auto' }}>
        {/* Progress bar */}
        <div className="assessment-progress">
          <div className="assessment-progress-bar" style={{ width: `${progressPct}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--color-muted-foreground)' }}>
          <span>Question {currentIdx + 1} of {questions.length}</span>
          <span className="assessment-tier-badge" data-tier={q.tier}>Tier {q.tier}</span>
        </div>

        {/* Question card */}
        <div className="study-card" style={{ minHeight: 'auto', marginBottom: '1rem' }}>
          <div className="study-card-content" style={{ padding: '2rem 1.5rem' }}>
            <div className="study-card-arabic font-arabic" dir="rtl" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {q.lemma}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-muted-foreground)' }}>
              What does this word mean?
            </div>
          </div>
        </div>

        {/* Answer options */}
        <div className="assessment-options">
          {q.options.map((opt: string, i: number) => (
            <button
              key={i}
              className="assessment-option"
              onClick={() => handleAnswer(i)}
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          className="btn"
          style={{ width: '100%', marginTop: '0.75rem', opacity: 0.7 }}
          onClick={handleSkip}
        >
          I don't know
        </button>
      </div>
    );
  }

  if (phase === 'results' && result) {
    return (
      <div className="animate-fade-in" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="hero" style={{ marginBottom: '2rem' }}>
          <div className="hero-gold-line" />
          <h1 className="hero-title-ar">نتيجتك</h1>
          <p className="hero-title-en">Your Results</p>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <ProgressRing value={result.comprehension} size={160} />
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)', marginTop: '0.5rem' }}>
            {result.comprehension}%
          </div>
          <div style={{ color: 'var(--color-muted-foreground)' }}>
            Estimated Quran Comprehension
          </div>
        </div>

        {/* Tier breakdown */}
        <div className="assessment-tier-results">
          {result.tierScores.map(ts => (
            <div key={ts.tier} className="assessment-tier-row">
              <span className="assessment-tier-badge" data-tier={ts.tier}>Tier {ts.tier}</span>
              <div className="assessment-tier-bar-bg">
                <div
                  className="assessment-tier-bar-fill"
                  data-tier={ts.tier}
                  style={{ width: `${ts.total > 0 ? (ts.correct / ts.total) * 100 : 0}%` }}
                />
              </div>
              <span className="assessment-tier-score">{ts.correct}/{ts.total}</span>
            </div>
          ))}
        </div>

        <div style={{ fontSize: '0.9rem', color: 'var(--color-muted-foreground)', textAlign: 'center', margin: '1.5rem 0' }}>
          {result.knownLemmaIds.length} words added to your progress
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="btn btn-accent"
            style={{ flex: 1, padding: '0.85rem' }}
            onClick={() => navigate('#/learn')}
          >
            Start Learning
          </button>
          <button
            className="btn"
            style={{ flex: 1, padding: '0.85rem' }}
            onClick={() => navigate('#/progress')}
          >
            View Progress
          </button>
        </div>
      </div>
    );
  }

  return null;
}
