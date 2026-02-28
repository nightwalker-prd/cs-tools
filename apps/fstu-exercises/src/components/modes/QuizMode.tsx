import { useState, useCallback, useRef } from 'react';
import { isPrimarilyArabic } from '@arabtools/core';
import { Volume2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@arabtools/ui';
import { useGamification } from '@arabtools/gamification/hooks';
import type { Exercise } from '../../types';
import type { useProgress } from '../../hooks/useProgress';
import type { useAudio } from '../../hooks/useAudio';

type Grade = 'correct' | 'incorrect' | 'skipped';

interface QuizState {
  currentIndex: number;
  revealed: boolean;
  grades: Map<number, Grade>;
  finished: boolean;
}

interface QuizModeProps {
  exercise: Exercise;
  progress: ReturnType<typeof useProgress>;
  audio: ReturnType<typeof useAudio>;
}

export function QuizMode({ exercise, progress, audio }: QuizModeProps) {
  const [state, setState] = useState<QuizState>({
    currentIndex: 0,
    revealed: false,
    grades: new Map(),
    finished: false,
  });
  const [showResults, setShowResults] = useState(false);
  const [retryMode, setRetryMode] = useState(false);
  const [retryIndices, setRetryIndices] = useState<number[]>([]);
  const { recordPractice } = useGamification();
  const recordedRef = useRef(false);

  const questions = exercise.questions;
  const activeIndices = retryMode ? retryIndices : questions.map((_, i) => i);
  const currentQIdx = activeIndices[state.currentIndex];
  const currentQ = currentQIdx !== undefined ? questions[currentQIdx] : null;

  const correctCount = Array.from(state.grades.values()).filter(g => g === 'correct').length;
  const incorrectCount = Array.from(state.grades.values()).filter(g => g === 'incorrect').length;
  const skippedCount = Array.from(state.grades.values()).filter(g => g === 'skipped').length;

  const revealAnswer = useCallback(() => {
    setState(prev => ({ ...prev, revealed: true }));
  }, []);

  const gradeAnswer = useCallback((grade: Grade) => {
    if (currentQIdx === undefined) return;

    const newGrades = new Map(state.grades);
    newGrades.set(currentQIdx, grade);

    if (grade === 'correct' && currentQ) {
      progress.markQuestionMastered(currentQ.id);
    }

    const nextIndex = state.currentIndex + 1;
    const isFinished = nextIndex >= activeIndices.length;

    setState({
      currentIndex: isFinished ? state.currentIndex : nextIndex,
      revealed: false,
      grades: newGrades,
      finished: isFinished,
    });

    if (isFinished) {
      const totalAnswered = newGrades.size;
      const correct = Array.from(newGrades.values()).filter(g => g === 'correct').length;
      const score = totalAnswered > 0 ? Math.round((correct / totalAnswered) * 100) : 0;
      progress.markExerciseCompleted(exercise.id, score);
      progress.updateStreak();
      setShowResults(true);

      // Record gamification practice
      if (!recordedRef.current) {
        recordedRef.current = true;
        recordPractice({
          exercisesCompleted: totalAnswered,
          exercisesCorrect: correct,
          isPerfectSession: correct === totalAnswered,
          sourceApp: 'fstu-exercises',
        });
      }
    }
  }, [currentQIdx, currentQ, state, activeIndices, exercise.id, progress]);

  const retryIncorrect = useCallback(() => {
    const incorrect = Array.from(state.grades.entries())
      .filter(([, g]) => g === 'incorrect' || g === 'skipped')
      .map(([idx]) => idx);

    if (incorrect.length === 0) return;

    setRetryMode(true);
    setRetryIndices(incorrect);
    setState({
      currentIndex: 0,
      revealed: false,
      grades: new Map(),
      finished: false,
    });
    setShowResults(false);
  }, [state.grades]);

  const resetQuiz = useCallback(() => {
    setState({ currentIndex: 0, revealed: false, grades: new Map(), finished: false });
    setShowResults(false);
    setRetryMode(false);
    setRetryIndices([]);
  }, []);

  if (!currentQ && !state.finished) return null;

  const qIsArabic = currentQ ? isPrimarilyArabic(currentQ.question) : false;
  const aIsArabic = currentQ ? isPrimarilyArabic(currentQ.answer) : false;
  const totalInSet = activeIndices.length;

  return (
    <div>
      {/* Score tracker */}
      <div className="quiz-controls glass-card animate-fade-in-up">
        <div className="quiz-score">
          <div className="score-item stats-pill">
            <div className="score-value correct">{correctCount}</div>
            <div className="score-label">Correct</div>
          </div>
          <div className="score-item stats-pill">
            <div className="score-value incorrect">{incorrectCount}</div>
            <div className="score-label">Incorrect</div>
          </div>
          <div className="score-item stats-pill">
            <div className="score-value skipped">{skippedCount}</div>
            <div className="score-label">Skipped</div>
          </div>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="btn" onClick={resetQuiz}>Reset</button>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-bar">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${Math.round(((state.currentIndex + (state.finished ? 1 : 0)) / totalInSet) * 100)}%` }} />
        </div>
        <span className="progress-text">
          {state.currentIndex + 1}/{totalInSet}
        </span>
      </div>

      {/* Current question */}
      {currentQ && !state.finished && (
        <div className="question-card animate-fade-in-up" key={currentQIdx}>
          <div className="question-header">
            <span className="question-number">{state.currentIndex + 1}</span>
            <span className={`question-text ${qIsArabic ? '' : 'ltr'}`}>
              {currentQ.question}
            </span>
            {qIsArabic && audio.isSupported && (
              <button
                className={`audio-btn ${audio.isSpeaking ? 'speaking' : ''}`}
                onClick={() => audio.speak(currentQ.question)}
              >
                <Volume2 size={14} />
              </button>
            )}
          </div>

          {!state.revealed ? (
            <div className="grade-buttons">
              <button className="btn-gold" onClick={revealAnswer}>
                Reveal Answer
              </button>
            </div>
          ) : (
            <>
              <div className="answer-section" style={{ maxHeight: '300px', borderTopColor: 'var(--color-border)' }}>
                <div className="answer-content">
                  <div className="answer-label">Answer</div>
                  <div className="flex items-center gap-2">
                    <div className={`answer-text ${aIsArabic ? 'arabic' : ''}`}>
                      {currentQ.answer}
                    </div>
                    {aIsArabic && audio.isSupported && (
                      <button
                        className={`audio-btn ${audio.isSpeaking ? 'speaking' : ''}`}
                        onClick={() => audio.speak(currentQ.answer)}
                      >
                        <Volume2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="grade-buttons">
                <button className="grade-btn correct-btn" onClick={() => gradeAnswer('correct')}>
                  Correct
                </button>
                <button className="grade-btn incorrect-btn" onClick={() => gradeAnswer('incorrect')}>
                  Incorrect
                </button>
                <button className="grade-btn skip-btn" onClick={() => gradeAnswer('skipped')}>
                  Skip
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Results modal */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="glass-card bg-secondary border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-primary text-center text-2xl">Quiz Results</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <div className="text-5xl font-bold text-primary mb-4">
              {totalInSet > 0 ? Math.round((correctCount / totalInSet) * 100) : 0}%
            </div>
            <div className="flex justify-center gap-8 mb-6 p-4 bg-card rounded">
              <div className="score-item">
                <div className="score-value correct">{correctCount}</div>
                <div className="score-label">Correct</div>
              </div>
              <div className="score-item">
                <div className="score-value incorrect">{incorrectCount}</div>
                <div className="score-label">Incorrect</div>
              </div>
              <div className="score-item">
                <div className="score-value skipped">{skippedCount}</div>
                <div className="score-label">Skipped</div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {(incorrectCount > 0 || skippedCount > 0) && (
                <button className="btn-gold w-full" onClick={retryIncorrect}>
                  Retry Missed ({incorrectCount + skippedCount})
                </button>
              )}
              <button className="btn w-full" onClick={resetQuiz}>
                Start Over
              </button>
              <button className="btn w-full" onClick={() => setShowResults(false)}>
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
