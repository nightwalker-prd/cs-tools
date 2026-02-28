import { useState, useCallback } from 'react';
import { shuffle } from '@arabtools/core';
import type { Exercise } from '../../types';
import type { useProgress } from '../../hooks/useProgress';
import type { useAudio } from '../../hooks/useAudio';
import { QuestionCard } from '../QuestionCard';

interface PracticeModeProps {
  exercise: Exercise;
  progress: ReturnType<typeof useProgress>;
  audio: ReturnType<typeof useAudio>;
  onNextExercise: (() => void) | null;
}

export function PracticeMode({ exercise, progress, audio, onNextExercise }: PracticeModeProps) {
  const [revealedSet, setRevealedSet] = useState<Set<number>>(new Set());
  const [questionOrder, setQuestionOrder] = useState<number[]>(
    () => exercise.questions.map((_, i) => i)
  );

  const toggleReveal = useCallback((idx: number) => {
    setRevealedSet(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  const revealAll = useCallback(() => {
    setRevealedSet(new Set(questionOrder));
    // Mark exercise completed when all revealed
    progress.markExerciseCompleted(exercise.id, 100);
    progress.updateStreak();
  }, [questionOrder, exercise.id, progress]);

  const hideAll = useCallback(() => {
    setRevealedSet(new Set());
  }, []);

  const shuffleQuestions = useCallback(() => {
    setQuestionOrder(prev => shuffle(prev));
  }, []);

  const revealedCount = revealedSet.size;
  const totalCount = exercise.questions.length;
  const pct = totalCount > 0 ? Math.round((revealedCount / totalCount) * 100) : 0;

  return (
    <div>
      {/* Controls */}
      <div className="controls animate-fade-in-up">
        <button className="btn" onClick={revealAll}>Reveal All</button>
        <button className="btn" onClick={hideAll}>Hide All</button>
        <button className="btn" onClick={shuffleQuestions}>Shuffle</button>
        {onNextExercise && (
          <button className="btn-gold" onClick={onNextExercise}>Next Exercise</button>
        )}
      </div>

      {/* Progress */}
      <div className="progress-bar animate-fade-in-up">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="progress-text">{revealedCount}/{totalCount} revealed</span>
      </div>

      {/* Questions */}
      <div className="questions-container">
        {questionOrder.map(origIdx => {
          const q = exercise.questions[origIdx];
          return (
            <QuestionCard
              key={q.id}
              index={origIdx}
              question={q.question}
              answer={q.answer}
              revealed={revealedSet.has(origIdx)}
              onToggleReveal={() => toggleReveal(origIdx)}
              mastered={progress.isQuestionMastered(q.id)}
              onSpeak={audio.isSupported ? audio.speak : undefined}
              isSpeaking={audio.isSpeaking}
            />
          );
        })}
      </div>
    </div>
  );
}
