import { useState, useMemo, useEffect, useRef } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@cstools/ui';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { getQuestionsForChapter } from '../data/quiz';

interface QuizModeProps {
  chapterId: number;
  chapterTitle: string;
  onQuizComplete?: (chapterId: number, score: number, total: number) => void;
  bestScore?: number;
}

export function QuizMode({ chapterId, chapterTitle, onQuizComplete, bestScore }: QuizModeProps) {
  const questions = useMemo(() => getQuestionsForChapter(chapterId), [chapterId]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <p className="text-[#8B949E]">No quiz questions available for this topic yet.</p>
      </div>
    );
  }

  const question = questions[currentIndex];
  const isFinished = answered === questions.length && currentIndex >= questions.length;
  const completedRef = useRef(false);

  useEffect(() => {
    if (isFinished && !completedRef.current) {
      completedRef.current = true;
      onQuizComplete?.(chapterId, score, questions.length);
    }
  }, [isFinished, chapterId, score, questions.length, onQuizComplete]);

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-6">
        <div className="text-6xl font-bold font-mono text-[#E6EDF3]">{percentage}%</div>
        <p className="text-lg text-[#8B949E]">
          You got <span className="text-[#3FB950] font-semibold">{score}</span> out of{' '}
          <span className="text-[#E6EDF3] font-semibold">{questions.length}</span> correct
        </p>
        <p className="text-sm text-[#8B949E]">Topic {chapterId}: {chapterTitle}</p>
        {bestScore !== undefined && bestScore > percentage && (
          <p className="text-xs text-[#D29922]">Best: {bestScore}%</p>
        )}
        {bestScore !== undefined && percentage >= bestScore && percentage > 0 && (
          <p className="text-xs text-[#3FB950]">New best score!</p>
        )}
        <Button
          onClick={() => {
            completedRef.current = false;
            setCurrentIndex(0);
            setSelectedAnswer(null);
            setShowExplanation(false);
            setScore(0);
            setAnswered(0);
          }}
          className="bg-[#CE93D8] text-[#0D1117] hover:bg-[#CE93D8]/90"
        >
          <RotateCcw className="w-4 h-4 mr-2" /> Retry Quiz
        </Button>
      </div>
    );
  }

  const handleSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    setAnswered(prev => prev + 1);
    if (index === question.answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCurrentIndex(questions.length);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-[#8B949E] bg-[#21262D] px-2 py-0.5 rounded">
            Topic {chapterId}
          </span>
          <span className="text-xs text-[#484F58] ml-2">Quiz</span>
        </div>
        <span className="text-sm font-mono text-[#8B949E]">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div className="h-1 bg-[#21262D] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#9C27B0] rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <Card className="bg-[#161B22] border-[#30363D]">
        <CardHeader>
          <CardTitle className="text-lg text-[#E6EDF3] leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {question.options.map((option, i) => {
            let borderClass = 'border-[#30363D] hover:border-[#484F58]';
            let bgClass = 'bg-[#0D1117]';
            let textClass = 'text-[#E6EDF3]';

            if (selectedAnswer !== null) {
              if (i === question.answer) {
                borderClass = 'border-[#3FB950]';
                bgClass = 'bg-[#3FB950]/10';
                textClass = 'text-[#3FB950]';
              } else if (i === selectedAnswer) {
                borderClass = 'border-[#F85149]';
                bgClass = 'bg-[#F85149]/10';
                textClass = 'text-[#F85149]';
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-3 rounded-md border ${borderClass} ${bgClass} transition-colors flex items-start gap-3`}
              >
                <span className="text-xs font-mono text-[#484F58] mt-0.5 shrink-0 w-5">
                  {String.fromCharCode(65 + i)}.
                </span>
                <span className={`text-sm ${textClass}`}>{option}</span>
                {selectedAnswer !== null && i === question.answer && (
                  <CheckCircle2 className="w-4 h-4 text-[#3FB950] shrink-0 ml-auto mt-0.5" />
                )}
                {selectedAnswer !== null && i === selectedAnswer && i !== question.answer && (
                  <XCircle className="w-4 h-4 text-[#F85149] shrink-0 ml-auto mt-0.5" />
                )}
              </button>
            );
          })}
        </CardContent>
      </Card>

      {showExplanation && (
        <div className="bg-[#161B22] border border-[#30363D] rounded-md p-4">
          <h4 className="text-xs font-semibold text-[#CE93D8] uppercase tracking-wider mb-2">Explanation</h4>
          <p className="text-sm text-[#8B949E] leading-relaxed">{question.explanation}</p>
        </div>
      )}

      {selectedAnswer !== null && (
        <div className="flex justify-end">
          <Button onClick={handleNext} className="bg-[#9C27B0] text-white hover:bg-[#9C27B0]/90">
            {currentIndex < questions.length - 1 ? (
              <><ArrowRight className="w-4 h-4 mr-2" /> Next Question</>
            ) : (
              'See Results'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
