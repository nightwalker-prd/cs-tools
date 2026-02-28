import { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, Button } from '@cstools/ui';
import { usePersistedState } from '@cstools/core/hooks';
import { shuffle, pickRandom } from '@cstools/core/utils';
import { algorithms, dataStructures } from '../data/complexities';
import type { ComplexityEntry, DSComplexity } from '../data/complexities';

interface QuizStats {
  correct: number;
  total: number;
}

type QuestionType = 'algo-worst' | 'algo-space' | 'ds-operation' | 'comparison';

interface Question {
  type: QuestionType;
  text: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

const ALL_COMPLEXITIES = [
  'O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(n³)',
  'O(2^n)', 'O(V+E)', 'O(VE)', 'O(V²)', 'O(V³)', 'O(E log E)',
  'O(V+E log V)', 'O(n+k)', 'O(nk)',
];

function getDistractors(correct: string, count: number): string[] {
  const available = ALL_COMPLEXITIES.filter(c => c !== correct);
  return shuffle(available).slice(0, count);
}

function generateAlgoWorstQuestion(): Question | null {
  const alg = pickRandom(algorithms);
  if (!alg) return null;

  const correct = alg.time.worst;
  const distractors = getDistractors(correct, 3);
  const choices = shuffle([correct, ...distractors]);

  return {
    type: 'algo-worst',
    text: `What is the worst-case time complexity of ${alg.name}?`,
    choices,
    correctIndex: choices.indexOf(correct),
    explanation: `${alg.name} has best: ${alg.time.best}, average: ${alg.time.average}, worst: ${alg.time.worst}, space: ${alg.space}.${alg.notes ? ` Note: ${alg.notes}.` : ''}`,
  };
}

function generateAlgoSpaceQuestion(): Question | null {
  const alg = pickRandom(algorithms);
  if (!alg) return null;

  const correct = alg.space;
  const distractors = getDistractors(correct, 3);
  const choices = shuffle([correct, ...distractors]);

  return {
    type: 'algo-space',
    text: `What is the space complexity of ${alg.name}?`,
    choices,
    correctIndex: choices.indexOf(correct),
    explanation: `${alg.name} uses ${alg.space} space.${alg.notes ? ` Note: ${alg.notes}.` : ''} Its time complexity is best: ${alg.time.best}, average: ${alg.time.average}, worst: ${alg.time.worst}.`,
  };
}

function generateDSOperationQuestion(): Question | null {
  const ds = pickRandom(dataStructures);
  if (!ds) return null;

  const ops: { key: keyof DSComplexity; label: string }[] = [
    { key: 'access', label: 'access' },
    { key: 'search', label: 'search' },
    { key: 'insert', label: 'insertion' },
    { key: 'delete', label: 'deletion' },
  ];

  // Filter to ops that have meaningful values
  const validOps = ops.filter(op => {
    const val = ds[op.key] as string;
    return val && val !== 'N/A';
  });

  const op = pickRandom(validOps);
  if (!op) return null;

  const correct = ds[op.key] as string;
  const distractors = getDistractors(correct, 3);
  const choices = shuffle([correct, ...distractors]);

  return {
    type: 'ds-operation',
    text: `What is the average-case time complexity of ${op.label} on a ${ds.name}?`,
    choices,
    correctIndex: choices.indexOf(correct),
    explanation: `${ds.name} operations: access ${ds.access}, search ${ds.search}, insert ${ds.insert}, delete ${ds.delete}.${ds.spaceNote ? ` Note: ${ds.spaceNote}.` : ''}`,
  };
}

function generateComparisonQuestion(): Question | null {
  // Pick two sorting algorithms with different worst-case times
  const sortingAlgs = algorithms.filter(a => a.category === 'sorting');
  if (sortingAlgs.length < 2) return null;

  const shuffled = shuffle(sortingAlgs);
  let a: ComplexityEntry | undefined;
  let b: ComplexityEntry | undefined;

  for (let i = 0; i < shuffled.length; i++) {
    for (let j = i + 1; j < shuffled.length; j++) {
      if (shuffled[i].time.worst !== shuffled[j].time.worst) {
        a = shuffled[i];
        b = shuffled[j];
        break;
      }
    }
    if (a && b) break;
  }

  if (!a || !b) return null;

  // Determine which is faster (lower complexity) in worst case
  const complexityOrder: Record<string, number> = {
    'O(1)': 1, 'O(log n)': 2, 'O(n)': 3, 'O(n+k)': 3.5, 'O(nk)': 4,
    'O(n log n)': 5, "O(n^(4/3))": 5.5, 'O(n²)': 6, 'O(n³)': 7, 'O(2^n)': 8,
  };

  const aRank = complexityOrder[a.time.worst] ?? 10;
  const bRank = complexityOrder[b.time.worst] ?? 10;

  const fasterName = aRank <= bRank ? a.name : b.name;
  const slowerName = aRank <= bRank ? b.name : a.name;

  const choices = shuffle([a.name, b.name, 'They are the same', 'It depends on input']);
  const correctIndex = aRank === bRank
    ? choices.indexOf('They are the same')
    : choices.indexOf(fasterName);

  return {
    type: 'comparison',
    text: `Which has better worst-case time complexity: ${a.name} or ${b.name}?`,
    choices,
    correctIndex,
    explanation: `${a.name} worst-case is ${a.time.worst}. ${b.name} worst-case is ${b.time.worst}. ${aRank === bRank ? 'They are the same.' : `${fasterName} is faster than ${slowerName} in the worst case.`}`,
  };
}

function generateQuestion(): Question {
  const generators = [
    generateAlgoWorstQuestion,
    generateAlgoSpaceQuestion,
    generateDSOperationQuestion,
    generateComparisonQuestion,
  ];

  // Try each generator in random order until one succeeds
  const shuffledGens = shuffle(generators);
  for (const gen of shuffledGens) {
    const q = gen();
    if (q) return q;
  }

  // Fallback - should never happen with valid data
  return generateAlgoWorstQuestion()!;
}

export function QuizTab() {
  const [stats, setStats] = usePersistedState<QuizStats>('complexity-quiz-stats', {
    correct: 0,
    total: 0,
  });

  const [question, setQuestion] = useState<Question>(() => generateQuestion());
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const isAnswered = selectedIndex !== null;
  const isCorrect = selectedIndex === question.correctIndex;

  const handleAnswer = useCallback((index: number) => {
    if (isAnswered) return;
    setSelectedIndex(index);
    setShowExplanation(true);
    setStats(prev => ({
      correct: prev.correct + (index === question.correctIndex ? 1 : 0),
      total: prev.total + 1,
    }));
  }, [isAnswered, question.correctIndex, setStats]);

  const handleNext = useCallback(() => {
    setQuestion(generateQuestion());
    setSelectedIndex(null);
    setShowExplanation(false);
  }, []);

  const handleReset = useCallback(() => {
    setStats({ correct: 0, total: 0 });
  }, [setStats]);

  const accuracy = useMemo(() => {
    if (stats.total === 0) return 0;
    return Math.round((stats.correct / stats.total) * 100);
  }, [stats]);

  const questionTypeLabel = useMemo(() => {
    switch (question.type) {
      case 'algo-worst': return 'Worst-Case Time';
      case 'algo-space': return 'Space Complexity';
      case 'ds-operation': return 'DS Operation';
      case 'comparison': return 'Comparison';
    }
  }, [question.type]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#E6EDF3]">Complexity Quiz</h3>
          <p className="text-sm text-[#8B949E]">Test your Big-O knowledge with random questions</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-[#8B949E]">
            Score: <span className="font-mono text-[#3FB950]">{stats.correct}</span>
            <span className="text-[#484F58]"> / </span>
            <span className="font-mono text-[#E6EDF3]">{stats.total}</span>
            {stats.total > 0 && (
              <span className="ml-2 text-[#8B949E]">({accuracy}%)</span>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="border-[#30363D] text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]"
          >
            Reset
          </Button>
        </div>
      </div>

      <Card className="bg-[#161B22] border-[#30363D]">
        <CardContent className="p-6 space-y-6">
          {/* Question type badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#21262D] text-[#58A6FF] border border-[#30363D]">
              {questionTypeLabel}
            </span>
          </div>

          {/* Question text */}
          <p className="text-lg text-[#E6EDF3] font-medium">{question.text}</p>

          {/* Answer choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.choices.map((choice, index) => {
              let borderColor = 'border-[#30363D]';
              let bgColor = 'bg-[#0D1117]';
              let textColor = 'text-[#E6EDF3]';

              if (isAnswered) {
                if (index === question.correctIndex) {
                  borderColor = 'border-[#3FB950]';
                  bgColor = 'bg-[#3FB950]/10';
                  textColor = 'text-[#3FB950]';
                } else if (index === selectedIndex) {
                  borderColor = 'border-[#F85149]';
                  bgColor = 'bg-[#F85149]/10';
                  textColor = 'text-[#F85149]';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  className={`p-4 rounded-md border ${borderColor} ${bgColor} ${textColor} font-mono text-sm text-left transition-colors ${
                    !isAnswered ? 'hover:border-[#58A6FF] hover:bg-[#58A6FF]/5 cursor-pointer' : 'cursor-default'
                  }`}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`rounded-md p-4 border ${isCorrect ? 'border-[#3FB950]/30 bg-[#3FB950]/5' : 'border-[#F85149]/30 bg-[#F85149]/5'}`}>
              <div className={`text-sm font-semibold mb-1 ${isCorrect ? 'text-[#3FB950]' : 'text-[#F85149]'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </div>
              <p className="text-sm text-[#8B949E]">{question.explanation}</p>
            </div>
          )}

          {/* Next button */}
          {isAnswered && (
            <div className="flex justify-end">
              <Button
                onClick={handleNext}
                className="bg-[#238636] hover:bg-[#2EA043] text-white"
              >
                Next Question
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
