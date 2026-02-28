import { useState } from 'react';
import { Zap, Check, X } from 'lucide-react';
import { useDailyChallenge } from '@arabtools/gamification/hooks';

export function DailyChallengeCard() {
  const { state, isCompleted, score, submitAnswer } = useDailyChallenge();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [started, setStarted] = useState(false);

  if (isCompleted) {
    return (
      <div className="daily-challenge daily-challenge--complete">
        <div className="daily-challenge-header">
          <Zap size={20} />
          <h3 className="daily-challenge-title">Daily Challenge Complete!</h3>
        </div>
        <p className="daily-challenge-score">
          {score.correct}/{score.total} correct — {state.xpEarned} XP earned
        </p>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="daily-challenge">
        <div className="daily-challenge-header">
          <Zap size={20} />
          <h3 className="daily-challenge-title">Daily Challenge</h3>
        </div>
        <p className="daily-challenge-desc">
          Answer {state.questions.length} questions to earn bonus XP!
        </p>
        <button className="daily-challenge-btn" onClick={() => setStarted(true)} type="button">
          Start Challenge
        </button>
      </div>
    );
  }

  const question = state.questions[currentIndex];
  if (!question) return null;

  const isAnswered = state.answeredIndices.includes(currentIndex);
  const isCorrect = selectedAnswer === question.correctIndex;

  const handleSelect = (answerIndex: number) => {
    if (showFeedback || isAnswered) return;
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    submitAnswer(currentIndex, answerIndex);

    setTimeout(() => {
      if (currentIndex < state.questions.length - 1) {
        setCurrentIndex((i) => i + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      }
    }, 1200);
  };

  return (
    <div className="daily-challenge daily-challenge--active">
      <div className="daily-challenge-header">
        <Zap size={20} />
        <h3 className="daily-challenge-title">
          Question {currentIndex + 1}/{state.questions.length}
        </h3>
      </div>

      <p className="daily-challenge-question font-arabic" dir="rtl">
        {question.questionAr}
      </p>
      <p className="daily-challenge-question-en">{question.questionEn}</p>

      <div className="daily-challenge-options">
        {question.options.map((opt, i) => {
          let optClass = 'daily-option';
          if (showFeedback && i === question.correctIndex) {
            optClass += ' daily-option--correct';
          } else if (showFeedback && i === selectedAnswer && !isCorrect) {
            optClass += ' daily-option--wrong';
          }
          return (
            <button
              key={i}
              className={optClass}
              onClick={() => handleSelect(i)}
              disabled={showFeedback}
              type="button"
            >
              <span dir="rtl" className="font-arabic">{opt}</span>
              {showFeedback && i === question.correctIndex && <Check size={16} />}
              {showFeedback && i === selectedAnswer && !isCorrect && i !== question.correctIndex && <X size={16} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
