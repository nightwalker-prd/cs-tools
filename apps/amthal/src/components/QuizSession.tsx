import { useState, useMemo, useCallback, useRef } from 'react';
import type { QuizMode, QuizResult } from '../types';
import { ALL_PROVERBS } from '../data/proverbs';
import { generateQuiz } from '../engine/quiz-generator';
import { QuizResults } from './QuizResults';
import { containsArabic } from '@arabtools/core';

interface QuizSessionProps {
  mode: QuizMode;
  navigate: (hash: string) => void;
  onComplete: (result: QuizResult) => void;
}

export function QuizSession({ mode, navigate, onComplete }: QuizSessionProps) {
  const questions = useMemo(() => generateQuiz(mode, ALL_PROVERBS, 10), [mode]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: string; correct: boolean; selectedIndex: number }[]>([]);
  const [completed, setCompleted] = useState(false);
  const startTimeRef = useRef(Date.now());

  const question = questions[currentIndex];
  const score = answers.filter(a => a.correct).length;

  const handleSelect = useCallback((optIndex: number) => {
    if (showFeedback) return;

    setSelectedIndex(optIndex);
    setShowFeedback(true);

    const isCorrect = optIndex === question.correctIndex;
    const newAnswer = { questionId: question.id, correct: isCorrect, selectedIndex: optIndex };
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedIndex(null);
        setShowFeedback(false);
      } else {
        const result: QuizResult = {
          mode,
          score: newAnswers.filter(a => a.correct).length,
          total: questions.length,
          timeMs: Date.now() - startTimeRef.current,
          date: new Date().toISOString(),
          answers: newAnswers,
        };
        onComplete(result);
        setCompleted(true);
      }
    }, 1200);
  }, [showFeedback, question, currentIndex, questions.length, answers, mode, onComplete]);

  if (completed) {
    const result: QuizResult = {
      mode,
      score,
      total: questions.length,
      timeMs: Date.now() - startTimeRef.current,
      date: new Date().toISOString(),
      answers,
    };
    return (
      <QuizResults
        result={result}
        questions={questions}
        navigate={navigate}
        mode={mode}
      />
    );
  }

  const progressPct = ((currentIndex) / questions.length) * 100;

  return (
    <div className="quiz-session">
      <div className="quiz-progress-label">
        <span>Question {currentIndex + 1} of {questions.length}</span>
        <span>{score} correct</span>
      </div>
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="quiz-question-card">
        <div className="quiz-prompt">{question.prompt}</div>
        {question.promptArabic && (
          <div className="quiz-prompt-arabic">{question.promptArabic}</div>
        )}
      </div>

      <div className="quiz-options">
        {question.options.map((option, i) => {
          let className = 'quiz-option';
          if (containsArabic(option)) className += ' arabic-option';

          if (showFeedback) {
            if (i === question.correctIndex) className += ' correct';
            else if (i === selectedIndex && i !== question.correctIndex) className += ' incorrect';
            else if (i === question.correctIndex) className += ' reveal';
          }

          return (
            <button
              key={i}
              className={className}
              onClick={() => handleSelect(i)}
              disabled={showFeedback}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
