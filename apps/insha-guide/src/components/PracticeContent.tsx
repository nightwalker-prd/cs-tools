import { useState, useCallback } from 'react';
import type { Exercise, ExerciseQuestion } from '../data/types';
import { FillBlank, WordOrder, MatchPairs, MultipleChoice, SentenceBuild } from './practice';

interface PracticeContentProps {
  exercises: Exercise[];
  onExerciseCompleted: (exerciseId: string, score: number) => void;
  onQuestionMastered: (questionId: string) => void;
}

function QuestionRenderer({
  question,
  onCorrect,
}: {
  question: ExerciseQuestion;
  onCorrect: () => void;
}) {
  switch (question.type) {
    case 'fill-blank':
      return <FillBlank question={question.data} onCorrect={onCorrect} />;
    case 'word-order':
      return <WordOrder question={question.data} onCorrect={onCorrect} />;
    case 'match-pairs':
      return <MatchPairs question={question.data} onCorrect={onCorrect} />;
    case 'multiple-choice':
      return <MultipleChoice question={question.data} onCorrect={onCorrect} />;
    case 'sentence-build':
      return <SentenceBuild question={question.data} onCorrect={onCorrect} />;
  }
}

export function PracticeContent({ exercises, onExerciseCompleted, onQuestionMastered }: PracticeContentProps) {
  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const exercise = exercises[currentExIdx];
  const question = exercise?.questions[currentQIdx];
  const totalQuestions = exercises.reduce((sum, ex) => sum + ex.questions.length, 0);
  const globalQIdx = exercises.slice(0, currentExIdx).reduce((sum, ex) => sum + ex.questions.length, 0) + currentQIdx;

  const handleCorrect = useCallback(() => {
    setCorrectCount(prev => prev + 1);
    if (question) {
      const qId = question.type === 'match-pairs' ? question.data.id : question.data.id;
      onQuestionMastered(qId);
    }
  }, [question, onQuestionMastered]);

  const handleNext = useCallback(() => {
    if (!exercise) return;

    if (currentQIdx < exercise.questions.length - 1) {
      setCurrentQIdx(prev => prev + 1);
    } else {
      // Exercise complete
      const total = exercise.questions.length;
      const score = Math.round((correctCount / Math.max(total, 1)) * 100);
      onExerciseCompleted(exercise.id, score);

      if (currentExIdx < exercises.length - 1) {
        setCurrentExIdx(prev => prev + 1);
        setCurrentQIdx(0);
        setCorrectCount(0);
      } else {
        setCompleted(true);
      }
    }
  }, [exercise, currentQIdx, currentExIdx, exercises.length, correctCount, onExerciseCompleted]);

  if (exercises.length === 0) {
    return (
      <div className="empty-state">
        <p>No exercises available for this lesson yet.</p>
      </div>
    );
  }

  if (completed) {
    const totalCorrect = exercises.reduce((sum, _) => sum + correctCount, 0);
    return (
      <div className="exercise-score animate-fade-in">
        <div className="score-value">{Math.round((totalCorrect / Math.max(totalQuestions, 1)) * 100)}%</div>
        <div className="score-label">Practice Complete</div>
        <button
          className="btn btn-primary"
          style={{ marginTop: '1rem' }}
          onClick={() => {
            setCurrentExIdx(0);
            setCurrentQIdx(0);
            setCorrectCount(0);
            setCompleted(false);
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="exercise-container animate-fade-in">
      <div className="exercise-header">
        <h3 className="exercise-title">
          {exercise.title}
          {exercise.titleAr && <span className="font-arabic" style={{ marginLeft: '0.5rem', color: 'var(--color-accent)' }}>{exercise.titleAr}</span>}
        </h3>
        <span className="exercise-progress">{globalQIdx + 1} / {totalQuestions}</span>
      </div>

      {exercise.instruction && (
        <p style={{ fontSize: '0.9rem', color: 'var(--color-muted-foreground)', marginBottom: '1rem' }}>
          {exercise.instruction}
        </p>
      )}

      <div className="progress-bar" style={{ marginBottom: '1.5rem' }}>
        <div className="progress-bar-fill" style={{ width: `${((globalQIdx + 1) / totalQuestions) * 100}%` }} />
      </div>

      {question && (
        <QuestionRenderer
          key={`${exercise.id}-${currentQIdx}`}
          question={question}
          onCorrect={handleCorrect}
        />
      )}

      <button
        className="btn"
        style={{ marginTop: '1rem' }}
        onClick={handleNext}
      >
        {currentQIdx < exercise.questions.length - 1 ? 'Next Question' :
         currentExIdx < exercises.length - 1 ? 'Next Exercise' : 'Finish'}
      </button>
    </div>
  );
}
