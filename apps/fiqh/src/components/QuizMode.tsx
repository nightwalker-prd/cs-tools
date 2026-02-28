import { useState, useCallback } from 'react';
import { RotateCcw, ChevronRight, Check, X } from 'lucide-react';
import type { KitabMeta, Kitab, Masalah, QuizQuestion, QuizState } from '../types';
import { Breadcrumb } from './Breadcrumb';

interface QuizModeProps {
  index: KitabMeta[];
  loadKitab: (id: string) => Promise<Kitab | undefined>;
  onGoHome: () => void;
}

function generateQuestions(masail: Masalah[], count: number): QuizQuestion[] {
  const shuffled = [...masail].sort(() => Math.random() - 0.5);
  const questions: QuizQuestion[] = [];

  for (const m of shuffled) {
    if (questions.length >= count) break;

    // "What is the ruling on X?" — pick from masail rulings
    const wrongOptions = masail
      .filter(other => other.id !== m.id && other.rulingAr !== m.rulingAr)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    if (wrongOptions.length < 3) continue;

    const correctIndex = Math.floor(Math.random() * 4);
    const options = [...wrongOptions.map(o => ({
      text: o.titleEn || o.rulingEn || o.titleAr,
      textAr: o.rulingAr,
    }))];
    options.splice(correctIndex, 0, {
      text: m.titleEn || m.rulingEn || m.titleAr,
      textAr: m.rulingAr,
    });

    questions.push({
      id: m.id,
      type: 'ruling',
      questionAr: m.titleAr,
      questionEn: `What is the ruling regarding: ${m.titleEn}?`,
      options,
      correctIndex,
      masalahId: m.id,
    });
  }

  return questions;
}

export function QuizMode({ index, loadKitab, onGoHome }: QuizModeProps) {
  const [phase, setPhase] = useState<'config' | 'running' | 'results'>('config');
  const [selectedKitabIds, setSelectedKitabIds] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [quiz, setQuiz] = useState<QuizState | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleKitab = useCallback((id: string) => {
    setSelectedKitabIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, []);

  const startQuiz = useCallback(async () => {
    setLoading(true);
    const kitabIds = selectedKitabIds.length > 0 ? selectedKitabIds : index.map(k => k.id);
    const allMasail: Masalah[] = [];

    for (const id of kitabIds) {
      const k = await loadKitab(id);
      if (k) {
        for (const bab of k.abwab) {
          for (const section of bab.sections) {
            allMasail.push(...section.masail);
          }
        }
      }
    }

    const questions = generateQuestions(allMasail, questionCount);
    setQuiz({
      questions,
      currentIndex: 0,
      answers: new Array(questions.length).fill(null),
      completed: false,
    });
    setPhase('running');
    setLoading(false);
  }, [selectedKitabIds, questionCount, index, loadKitab]);

  const answerQuestion = useCallback((optionIndex: number) => {
    if (!quiz || quiz.answers[quiz.currentIndex] !== null) return;
    setQuiz(prev => {
      if (!prev) return prev;
      const answers = [...prev.answers];
      answers[prev.currentIndex] = optionIndex;
      return { ...prev, answers };
    });
  }, [quiz]);

  const nextQuestion = useCallback(() => {
    setQuiz(prev => {
      if (!prev) return prev;
      if (prev.currentIndex >= prev.questions.length - 1) {
        return { ...prev, completed: true };
      }
      return { ...prev, currentIndex: prev.currentIndex + 1 };
    });
  }, []);

  const finishQuiz = useCallback(() => {
    setQuiz(prev => prev ? { ...prev, completed: true } : prev);
    setPhase('results');
  }, []);

  const resetQuiz = useCallback(() => {
    setQuiz(null);
    setPhase('config');
    setSelectedKitabIds([]);
  }, []);

  if (phase === 'config') {
    return (
      <div className="animate-fade-in">
        <Breadcrumb items={[
          { label: 'Home', onClick: onGoHome },
          { label: 'Quiz' },
        ]} />

        <div className="quiz-config">
          <h1>Quiz Mode</h1>
          <p>Test your knowledge of Hanafi fiqh rulings from Mukhtasar al-Quduri.</p>

          <div className="quiz-config-section">
            <h3>Select scope (optional)</h3>
            <p className="quiz-config-hint">Leave empty to quiz from all kutub</p>
            <div className="quiz-kitab-grid">
              {index.map(k => (
                <button
                  key={k.id}
                  className={`quiz-kitab-btn ${selectedKitabIds.includes(k.id) ? 'selected' : ''}`}
                  onClick={() => toggleKitab(k.id)}
                >
                  <span className="quiz-kitab-ar">{k.titleAr}</span>
                  <span className="quiz-kitab-en">{k.titleEn}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="quiz-config-section">
            <h3>Questions</h3>
            <div className="quiz-count-options">
              {[5, 10, 20, 30].map(n => (
                <button
                  key={n}
                  className={`quiz-count-btn ${questionCount === n ? 'selected' : ''}`}
                  onClick={() => setQuestionCount(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn-primary quiz-start-btn" onClick={startQuiz} disabled={loading}>
            {loading ? 'Loading...' : 'Start Quiz'}
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'running' && quiz) {
    const q = quiz.questions[quiz.currentIndex];
    const answered = quiz.answers[quiz.currentIndex] !== null;
    const selectedAnswer = quiz.answers[quiz.currentIndex];

    if (quiz.completed || !q) {
      setPhase('results');
      return null;
    }

    return (
      <div className="animate-fade-in">
        <div className="quiz-progress">
          <div className="quiz-progress-bar">
            <div
              className="quiz-progress-fill"
              style={{ width: `${((quiz.currentIndex + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
          <span className="quiz-progress-text">
            {quiz.currentIndex + 1} / {quiz.questions.length}
          </span>
        </div>

        <div className="quiz-question">
          <div className="quiz-question-ar" dir="rtl">{q.questionAr}</div>
          <div className="quiz-question-en">{q.questionEn}</div>

          <div className="quiz-options">
            {q.options.map((opt, i) => {
              let className = 'quiz-option';
              if (answered) {
                if (i === q.correctIndex) className += ' correct';
                else if (i === selectedAnswer) className += ' incorrect';
              } else if (i === selectedAnswer) {
                className += ' selected';
              }

              return (
                <button
                  key={i}
                  className={className}
                  onClick={() => answerQuestion(i)}
                  disabled={answered}
                >
                  <span className="quiz-option-text">{opt.text}</span>
                  {answered && i === q.correctIndex && <Check size={16} />}
                  {answered && i === selectedAnswer && i !== q.correctIndex && <X size={16} />}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="quiz-actions">
              {quiz.currentIndex < quiz.questions.length - 1 ? (
                <button className="btn btn-primary" onClick={nextQuestion}>
                  Next <ChevronRight size={14} />
                </button>
              ) : (
                <button className="btn btn-primary" onClick={finishQuiz}>
                  See Results
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Results phase
  if (quiz) {
    const correct = quiz.answers.filter((a, i) => a === quiz.questions[i].correctIndex).length;
    const total = quiz.questions.length;
    const pct = Math.round((correct / total) * 100);

    return (
      <div className="animate-fade-in">
        <Breadcrumb items={[
          { label: 'Home', onClick: onGoHome },
          { label: 'Quiz Results' },
        ]} />

        <div className="quiz-results">
          <h1>Quiz Results</h1>
          <div className="quiz-score">
            <div className="quiz-score-value">{pct}%</div>
            <div className="quiz-score-detail">{correct} / {total} correct</div>
          </div>

          <div className="quiz-review">
            {quiz.questions.map((q, i) => {
              const userAnswer = quiz.answers[i];
              const isCorrect = userAnswer === q.correctIndex;

              return (
                <div key={q.id} className={`quiz-review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="quiz-review-header">
                    {isCorrect ? <Check size={16} /> : <X size={16} />}
                    <span className="quiz-review-q">{q.questionEn}</span>
                  </div>
                  {!isCorrect && (
                    <div className="quiz-review-answer">
                      Correct: {q.options[q.correctIndex].text}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button className="btn btn-primary" onClick={resetQuiz}>
            <RotateCcw size={14} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}
