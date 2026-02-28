/**
 * Test Results Component
 *
 * Displays comprehensive results based on Nation's scoring methodology:
 * - Raw scores and percentages
 * - Breakdown by frequency level
 * - Estimated vocabulary size (for VST)
 * - Corrected scores (for Yes/No tests)
 */

import { cn } from '@arabtools/ui';
import { BarChart3, Clock, Target, TrendingUp, RotateCcw } from 'lucide-react';
import type { TestResults, TestType, FrequencyLevel } from '../types';

interface TestResultsProps {
  results: TestResults;
  onRetake: () => void;
  onNewTest: () => void;
}

const levelLabels: Record<FrequencyLevel, string> = {
  '1k': '1K (Most Frequent)',
  '2k': '2K (Second Frequent)',
  '3k': '3K (Third Frequent)',
  '5k': '5K (Intermediate)',
  '10k': '10K (Advanced)',
};

const testTypeNames: Record<TestType, string> = {
  vst: 'Vocabulary Size Test',
  vlt: 'Vocabulary Levels Test',
  yesno: 'Yes/No Vocabulary Test',
  productive: 'Productive Vocabulary Test',
  sentence: 'Sentence Comprehension Test',
  sentence_production: 'Sentence Production Test',
  collocation: 'Collocation Test',
  root_pattern: 'Root-Pattern Recognition Test',
  translation: 'Translation Test',
  reading_comprehension: 'Reading Comprehension Test',
  verb_conjugation: 'Verb Conjugation Test',
  cloze: 'Cloze Test',
  diacritics: 'Diacritics Test',
  irab: "I'rab (Case Endings) Test",
  word_derivation: 'Word Derivation Test',
  morphological_analysis: 'Morphological Analysis Test',
  verb_form_id: 'Verb Form Identification Test',
  idiomatic: 'Idiomatic Expressions Test',
  word_family: 'Word Family Test',
  quranic: 'Quranic Vocabulary Test',
  synonyms_antonyms: 'Synonyms & Antonyms Test',
  negation: 'Negation Patterns Test',
  preposition: 'Preposition Usage Test',
  question_words: 'Question Words Test',
  relative_clause: 'Relative Clauses Test',
  spelling: 'Spelling/Orthography Test',
  demonstrative: 'Demonstratives Test',
  possessive: 'Possessive Pronouns Test',
  quranic_vst: 'Quranic Frequency VST',
  ayah_context: 'Ayah Context Cloze',
  morph_chain: 'Morphological Chain',
  grammar_tag: 'Grammar Tag Identification',
};

export function TestResultsComponent({
  results,
  onRetake,
  onNewTest,
}: TestResultsProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const getScoreColor = (percentage: number): string => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBarColor = (percentage: number): string => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-serif text-primary mb-2">Test Complete</h1>
        <p className="text-muted-foreground">
          {testTypeNames[results.testType]}
        </p>
      </div>

      {/* Main Score Card */}
      <div className="glass-card p-8 text-center">
        <div className="mb-4">
          <Target className="w-12 h-12 mx-auto text-primary mb-2" />
          <p className="text-muted-foreground text-sm uppercase tracking-wide">
            Overall Score
          </p>
        </div>

        <div
          className={cn(
            'text-6xl font-bold mb-2',
            getScoreColor(results.rawScore.percentage)
          )}
        >
          {Math.round(results.rawScore.percentage)}%
        </div>

        <p className="text-lg text-muted-foreground">
          {results.rawScore.correct} correct out of {results.rawScore.total}{' '}
          questions
        </p>

        {/* Estimated Vocabulary Size (for VST) */}
        {results.estimatedVocabularySize !== undefined && (
          <div className="mt-6 p-4 bg-primary/5 rounded-2xl">
            <p className="text-sm text-muted-foreground mb-1">
              Estimated Vocabulary Size
            </p>
            <p className="text-3xl font-bold text-primary">
              ~{results.estimatedVocabularySize.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">word families</p>
          </div>
        )}

        {/* Corrected Score (for Yes/No tests) */}
        {results.correctedScore && (
          <div className="mt-6 p-4 bg-primary/5 rounded-2xl">
            <p className="text-sm text-muted-foreground mb-2">
              Yes/No Corrected Score
            </p>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-muted-foreground">
                  {results.correctedScore.rawPercentage}%
                </p>
                <p className="text-xs text-muted-foreground">Raw (hits only)</p>
              </div>
              <div className="text-2xl text-muted-foreground">&rarr;</div>
              <div className="text-center">
                <p className={cn('text-2xl font-bold', getScoreColor(results.correctedScore.correctedPercentage))}>
                  {results.correctedScore.correctedPercentage}%
                </p>
                <p className="text-xs text-muted-foreground">Corrected</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Adjusted for false alarms on pseudowords (Nation's formula)
            </p>
          </div>
        )}
      </div>

      {/* Stats Row — glass pills */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="stats-pill p-4 text-center">
          <Clock className="w-6 h-6 mx-auto text-primary mb-2" />
          <p className="text-2xl font-semibold">
            {formatTime(Math.round(results.duration))}
          </p>
          <p className="text-sm text-muted-foreground">Total Time</p>
        </div>

        <div className="stats-pill p-4 text-center">
          <TrendingUp className="w-6 h-6 mx-auto text-primary mb-2" />
          <p className="text-2xl font-semibold">
            {(results.averageResponseTime / 1000).toFixed(1)}s
          </p>
          <p className="text-sm text-muted-foreground">Avg. Response</p>
        </div>

        <div className="stats-pill p-4 text-center col-span-2 md:col-span-1">
          <BarChart3 className="w-6 h-6 mx-auto text-primary mb-2" />
          <p className="text-2xl font-semibold">
            {Object.keys(results.levelScores).length}
          </p>
          <p className="text-sm text-muted-foreground">Levels Tested</p>
        </div>
      </div>

      {/* Score by Level */}
      <div className="space-y-4">
        <h2 className="text-xl font-serif text-primary flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Score by Frequency Level
        </h2>

        <div className="space-y-3">
          {(Object.entries(results.levelScores) as [FrequencyLevel, { correct: number; total: number; percentage: number }][])
            .sort(([a], [b]) => {
              const order: FrequencyLevel[] = ['1k', '2k', '3k', '5k', '10k'];
              return order.indexOf(a) - order.indexOf(b);
            })
            .map(([level, score]) => (
              <div key={level} className="stats-pill p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{levelLabels[level]}</span>
                  <span className={cn('font-bold', getScoreColor(score.percentage))}>
                    {score.correct}/{score.total} ({Math.round(score.percentage)}%)
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className={cn('progress-bar-fill', getScoreBarColor(score.percentage))}
                    style={{ width: `${score.percentage}%` }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Interpretation */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-primary mb-2">Interpretation</h3>
        <div className="text-sm text-muted-foreground space-y-2">
          {results.rawScore.percentage >= 80 ? (
            <p>
              Excellent! You have strong vocabulary knowledge at the tested
              levels. Consider testing higher frequency bands to find your
              ceiling.
            </p>
          ) : results.rawScore.percentage >= 60 ? (
            <p>
              Good progress! You have solid foundational vocabulary. Focus on
              strengthening the levels where you scored below 80%.
            </p>
          ) : (
            <p>
              Keep practicing! Focus on the most frequent words (1K, 2K) as
              they provide the highest return on investment for comprehension.
            </p>
          )}

          <p className="mt-3">
            <strong>Nation's Research Insight:</strong> Knowing the most
            frequent 2,000 word families typically provides 80-90% coverage of
            everyday texts. The first 1,000 word families alone account for
            approximately 70% of running words.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRetake}
          className={cn(
            'flex items-center justify-center gap-2 px-8 py-3 rounded-2xl',
            'border-2 border-primary text-primary font-semibold',
            'hover:bg-primary/5 transition-all hover:-translate-y-0.5'
          )}
        >
          <RotateCcw className="w-5 h-5" />
          Retake Same Test
        </button>

        <button
          onClick={onNewTest}
          className={cn(
            'flex items-center justify-center gap-2 px-8 py-3 rounded-2xl',
            'bg-primary text-white font-semibold shadow-lg',
            'hover:bg-primary/90 hover:shadow-xl transition-all hover:-translate-y-0.5'
          )}
        >
          New Test Configuration
        </button>
      </div>
    </div>
  );
}
