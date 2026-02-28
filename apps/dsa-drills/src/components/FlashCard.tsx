import { useState } from 'react';
import { Button, CodeBlock, DifficultyStars } from '@cstools/ui';
import { Eye, Check, X, RotateCcw } from 'lucide-react';

interface FlashCardProps {
  question: {
    id: string;
    type: string;
    question: string;
    codeSnippet?: string;
    language?: string;
    options?: string[];
    answer: string | string[];
    explanation: string;
    hints?: string[];
    difficulty: 'easy' | 'medium' | 'hard';
    tags: string[];
  };
  onAnswer: (correct: boolean) => void;
  onSkip: () => void;
}

export function FlashCard({ question, onAnswer, onSkip }: FlashCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleCheck = () => {
    if (question.type === 'multiple-choice' && selectedOption) {
      const isCorrect = selectedOption === question.answer;
      onAnswer(isCorrect);
    } else {
      setShowAnswer(true);
    }
  };

  const handleSelfGrade = (correct: boolean) => {
    onAnswer(correct);
    setShowAnswer(false);
    setSelectedOption(null);
    setShowHint(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#161B22] rounded-lg border border-[#30363D] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#30363D] bg-[#0D1117]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#8B949E] bg-[#21262D] px-2 py-0.5 rounded">{question.type}</span>
            <DifficultyStars difficulty={question.difficulty} />
          </div>
          <div className="flex gap-1">
            {question.tags.map(tag => (
              <span key={tag} className="text-xs text-[#8B949E] bg-[#21262D] px-2 py-0.5 rounded">{tag}</span>
            ))}
          </div>
        </div>

        {/* Question */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg text-[#E6EDF3] font-medium">{question.question}</h3>

          {question.codeSnippet && (
            <CodeBlock code={question.codeSnippet} language={question.language || 'javascript'} />
          )}

          {/* Options for multiple choice */}
          {question.type === 'multiple-choice' && question.options && !showAnswer && (
            <div className="space-y-2">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedOption(option)}
                  className={`w-full text-left p-3 rounded border transition-colors ${
                    selectedOption === option
                      ? 'border-[#58A6FF] bg-[#58A6FF]/10 text-[#E6EDF3]'
                      : 'border-[#30363D] text-[#8B949E] hover:border-[#484F58] hover:text-[#E6EDF3]'
                  }`}
                >
                  <span className="font-mono text-xs mr-2">{String.fromCharCode(65 + i)}.</span>
                  <span className="font-mono text-sm">{option}</span>
                </button>
              ))}
            </div>
          )}

          {/* Hint */}
          {!showAnswer && question.hints && question.hints.length > 0 && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-[#D29922] hover:text-[#E3B341]"
            >
              {showHint ? 'Hide hint' : 'Show hint'}
            </button>
          )}
          {showHint && question.hints && (
            <div className="text-sm text-[#D29922] bg-[#D29922]/10 p-3 rounded border border-[#D29922]/30">
              {question.hints[0]}
            </div>
          )}

          {/* Answer reveal */}
          {showAnswer && (
            <div className="space-y-3 border-t border-[#30363D] pt-4">
              <div className="text-sm">
                <span className="text-[#8B949E]">Answer: </span>
                <span className="text-[#3FB950] font-mono">{Array.isArray(question.answer) ? question.answer.join(', ') : question.answer}</span>
              </div>
              <div className="text-sm text-[#8B949E] bg-[#0D1117] p-3 rounded">
                {question.explanation}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#30363D] bg-[#0D1117]">
          {!showAnswer ? (
            <>
              <Button variant="ghost" size="sm" onClick={onSkip} className="text-[#8B949E]">
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Skip
              </Button>
              <Button size="sm" onClick={handleCheck} className="bg-[#58A6FF] text-[#0D1117] hover:bg-[#79C0FF]">
                <Eye className="w-3.5 h-3.5 mr-1" /> {question.type === 'multiple-choice' ? 'Check' : 'Show Answer'}
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" onClick={() => handleSelfGrade(false)} className="bg-[#F85149]/20 text-[#F85149] hover:bg-[#F85149]/30 border border-[#F85149]/30">
                <X className="w-3.5 h-3.5 mr-1" /> Incorrect
              </Button>
              <Button size="sm" onClick={() => handleSelfGrade(true)} className="bg-[#3FB950]/20 text-[#3FB950] hover:bg-[#3FB950]/30 border border-[#3FB950]/30">
                <Check className="w-3.5 h-3.5 mr-1" /> Correct
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
