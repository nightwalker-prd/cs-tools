/**
 * FSTU Practice Component
 *
 * Integrates FSTU curriculum exercises into the Tarkeeb tool,
 * focusing on grammar-relevant exercise tags.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Volume2,
  Filter,
  Loader2,
} from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core';
import {
  loadExercisesByTag,
  TAG_LABELS,
  UNIT_INDEX,
  type Exercise,
  type ExerciseTag,
} from '@arabtools/exercises';

/** Tags relevant to grammar analysis in tarkeeb */
const GRAMMAR_TAGS: ExerciseTag[] = [
  'grammar-analysis',
  'irab',
  'descriptive-phrase',
  'possessive-phrase',
  'demonstrative-phrase',
  'conjunctive-phrase',
  'relative-clause',
  'conditional',
  'fill-blank',
  'verb-conjugation',
  'pronouns',
  'emphasis',
];

interface FstuExerciseWithContext {
  unitNumber: number;
  unitTitle: string;
  sectionId: string;
  sectionTitle: string;
  exercise: Exercise;
}

export function FstuPractice() {
  const [exercises, setExercises] = useState<FstuExerciseWithContext[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<ExerciseTag | 'all'>('all');
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());

  const { speak, isSpeaking, isSupported } = useSpeechSynthesis({
    lang: 'ar-SA',
    rate: 0.8,
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    loadExercisesByTag(GRAMMAR_TAGS.map(String)).then((results) => {
      if (!cancelled) {
        setExercises(results);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredExercises = exercises.filter((item) => {
    const unitMatch = selectedUnit === 'all' || item.unitNumber === selectedUnit;
    const tagMatch =
      selectedTag === 'all' || item.exercise.tags.includes(selectedTag);
    return unitMatch && tagMatch;
  });

  const toggleExercise = useCallback((exerciseId: string) => {
    setExpandedExercise((prev) => (prev === exerciseId ? null : exerciseId));
  }, []);

  const toggleAnswer = useCallback((questionId: string) => {
    setRevealedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  }, []);

  const revealAll = useCallback((exercise: Exercise) => {
    setRevealedAnswers((prev) => {
      const next = new Set(prev);
      for (const q of exercise.questions) {
        next.add(q.id);
      }
      return next;
    });
  }, []);

  const hideAll = useCallback((exercise: Exercise) => {
    setRevealedAnswers((prev) => {
      const next = new Set(prev);
      for (const q of exercise.questions) {
        next.delete(q.id);
      }
      return next;
    });
  }, []);

  // Collect unique tags from loaded exercises
  const availableTags = Array.from(
    new Set(exercises.flatMap((item) => item.exercise.tags))
  ).filter((tag) => GRAMMAR_TAGS.includes(tag));

  // Collect unique units
  const availableUnits = Array.from(
    new Set(exercises.map((item) => item.unitNumber))
  ).sort((a, b) => a - b);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
        <span className="ml-3 text-muted-foreground">Loading FSTU exercises...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-primary">Filter Exercises</span>
        </div>

        <div className="flex flex-wrap gap-4">
          <div>
            <label className="text-xs text-gray-600 mr-2">Unit:</label>
            <select
              value={selectedUnit}
              onChange={(e) =>
                setSelectedUnit(
                  e.target.value === 'all' ? 'all' : Number(e.target.value)
                )
              }
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="all">All Units</option>
              {availableUnits.map((u) => {
                const meta = UNIT_INDEX.find((m) => m.unit === u);
                return (
                  <option key={u} value={u}>
                    Unit {u}{meta ? ` - ${meta.title}` : ''}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-600 mr-2">Topic:</label>
            <select
              value={selectedTag}
              onChange={(e) =>
                setSelectedTag(e.target.value as ExerciseTag | 'all')
              }
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="all">All Topics</option>
              {availableTags.map((tag) => (
                <option key={tag} value={tag}>
                  {TAG_LABELS[tag]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Exercise List */}
      <div className="space-y-3">
        {filteredExercises.slice(0, 50).map((item) => {
          const isExpanded = expandedExercise === item.exercise.id;
          const allRevealed = item.exercise.questions.every((q) =>
            revealedAnswers.has(q.id)
          );

          return (
            <div
              key={item.exercise.id}
              className="backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Exercise Header */}
              <button
                onClick={() => toggleExercise(item.exercise.id)}
                className="w-full text-left p-4 hover:bg-white/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-accent">
                        Unit {item.unitNumber}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.sectionTitle}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-primary truncate">
                      {item.exercise.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {item.exercise.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.exercise.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent"
                        >
                          {TAG_LABELS[tag]}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground">
                      {item.exercise.questions.length} Q
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded Questions */}
              {isExpanded && (
                <div className="border-t border-accent/10 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs text-muted-foreground">
                      {item.exercise.description}
                    </p>
                    <button
                      onClick={() =>
                        allRevealed
                          ? hideAll(item.exercise)
                          : revealAll(item.exercise)
                      }
                      className="text-xs px-3 py-1 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors flex items-center gap-1"
                    >
                      {allRevealed ? (
                        <>
                          <EyeOff className="w-3 h-3" /> Hide All
                        </>
                      ) : (
                        <>
                          <Eye className="w-3 h-3" /> Reveal All
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-2">
                    {item.exercise.questions.map((q) => {
                      const isRevealed = revealedAnswers.has(q.id);

                      return (
                        <div
                          key={q.id}
                          className="flex items-start gap-3 p-3 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p
                                className="text-lg text-primary"
                                style={{ fontFamily: 'Amiri, serif' }}
                                dir="rtl"
                              >
                                {q.question}
                              </p>
                              {isSupported && (
                                <button
                                  onClick={() => speak(q.question)}
                                  disabled={isSpeaking}
                                  className="shrink-0 p-1 rounded text-green-600 hover:bg-green-50 transition-colors"
                                  title="Listen"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                            {isRevealed && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {q.answer}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => toggleAnswer(q.id)}
                            className="shrink-0 text-xs px-2 py-1 rounded-lg bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                          >
                            {isRevealed ? 'Hide' : 'Show'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredExercises.length > 50 && (
          <p className="text-center text-sm text-muted-foreground py-4">
            Showing 50 of {filteredExercises.length} exercises. Refine your filters to see more.
          </p>
        )}

        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">
              No exercises found matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
