import { useState, useCallback, useRef } from 'react';
import type { ResponseQuality } from '@arabtools/srs';
import type { AnswerResult } from '../types';
import type { ExerciseSession } from '../hooks/useExerciseSession';
import type { SarfSrsState } from '../hooks/useSarfSrs';
import { validateAnswer } from '../engine/answer-validator';
import { ConjugationExercise } from './ConjugationExercise';
import { TranslationExercise } from './TranslationExercise';
import { LabelingExercise } from './LabelingExercise';
import { FeedbackPanel } from './FeedbackPanel';

interface ExerciseViewProps {
  session: ExerciseSession;
  srs: SarfSrsState;
}

export function ExerciseView({ session, srs }: ExerciseViewProps) {
  const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const startTimeRef = useRef(Date.now());

  const exercise = session.currentExercise;
  const config = session.state?.config;

  const handleAnswer = useCallback((answer: string) => {
    if (showFeedback || !exercise) return;

    const timeMs = Date.now() - startTimeRef.current;
    const isEnglish = exercise.type === 'translation' && exercise.prompt.direction === 'ar-to-en';

    const result = validateAnswer(
      answer,
      exercise.correctAnswer,
      exercise.type,
      timeMs,
      isEnglish,
    );

    setAnswerResult(result);
    setShowFeedback(true);
  }, [exercise, showFeedback]);

  const handleQualitySelect = useCallback((quality: ResponseQuality) => {
    if (!answerResult || !exercise || !config) return;

    if (config.srsEnabled) {
      srs.reviewCard(exercise, quality, answerResult.timeMs);
    }
  }, [answerResult, exercise, config, srs]);

  const handleNext = useCallback(() => {
    if (!answerResult) return;
    session.submitAnswer(answerResult);
    setAnswerResult(null);
    setShowFeedback(false);
    startTimeRef.current = Date.now();
  }, [answerResult, session]);

  if (!exercise || !session.state || !config) return null;

  const exerciseProps = {
    exercise,
    answerMode: config.answerMode,
    onAnswer: handleAnswer,
    disabled: showFeedback,
    revealedAnswer: showFeedback ? exercise.correctAnswer : undefined,
    revealedResult: answerResult ? { isCorrect: answerResult.isCorrect } : undefined,
  };

  return (
    <div className="exercise-view">
      {/* Header */}
      <div className="exercise-header">
        <span className="exercise-progress-text">
          Question {session.progress.current} of {session.progress.total}
        </span>
        <button className="exercise-quit-btn" onClick={session.quit}>
          Quit
        </button>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${session.progress.percentage}%` }}
        />
      </div>

      {/* Exercise Card */}
      <div className="exercise-card" key={exercise.id}>
        {exercise.type === 'conjugation' && (
          <ConjugationExercise {...exerciseProps} />
        )}
        {exercise.type === 'translation' && (
          <TranslationExercise {...exerciseProps} />
        )}
        {exercise.type === 'labeling' && (
          <LabelingExercise {...exerciseProps} />
        )}
      </div>

      {/* Feedback */}
      {showFeedback && answerResult && (
        <FeedbackPanel
          result={answerResult}
          exercise={exercise}
          srsEnabled={config.srsEnabled}
          onQualitySelect={handleQualitySelect}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
