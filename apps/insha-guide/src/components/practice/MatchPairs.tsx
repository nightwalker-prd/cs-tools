import { useState, useMemo } from 'react';
import { shuffle } from '@arabtools/core';
import type { MatchPairQuestion } from '../../data/types';

interface MatchPairsProps {
  question: MatchPairQuestion;
  onCorrect: () => void;
}

export function MatchPairs({ question, onCorrect }: MatchPairsProps) {
  const shuffledRight = useMemo(
    () => shuffle(question.pairs.map(p => p.right)),
    [question.pairs]
  );

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<Record<number, boolean>>({});
  const [wrongPair, setWrongPair] = useState<{ left: number; right: number } | null>(null);

  const allMatched = Object.keys(matched).length === question.pairs.length;

  const handleLeftClick = (index: number) => {
    if (matched[index]) return;
    setSelectedLeft(index);
    setWrongPair(null);
  };

  const handleRightClick = (rightValue: string) => {
    if (selectedLeft === null) return;
    const pair = question.pairs[selectedLeft];
    if (pair.right === rightValue) {
      const newMatched = { ...matched, [selectedLeft]: true };
      setMatched(newMatched);
      setSelectedLeft(null);
      if (Object.keys(newMatched).length === question.pairs.length) {
        onCorrect();
      }
    } else {
      setWrongPair({ left: selectedLeft, right: shuffledRight.indexOf(rightValue) });
      setTimeout(() => setWrongPair(null), 800);
    }
  };

  return (
    <div className="exercise-question">
      <div className="match-pairs">
        <div className="match-column">
          {question.pairs.map((pair, i) => (
            <button
              key={i}
              className={`match-item ${
                matched[i] ? 'matched' :
                selectedLeft === i ? 'selected' :
                wrongPair?.left === i ? 'incorrect' : ''
              }`}
              onClick={() => handleLeftClick(i)}
            >
              <span className="font-arabic" style={{ fontSize: '1.1rem' }}>{pair.left}</span>
            </button>
          ))}
        </div>
        <div className="match-column">
          {shuffledRight.map((right, i) => {
            const isMatched = question.pairs.some((p, pi) => matched[pi] && p.right === right);
            return (
              <button
                key={i}
                className={`match-item ${
                  isMatched ? 'matched' :
                  wrongPair?.right === i ? 'incorrect' : ''
                }`}
                onClick={() => handleRightClick(right)}
                disabled={isMatched}
              >
                {right}
              </button>
            );
          })}
        </div>
      </div>

      {allMatched && (
        <div className="exercise-feedback correct" style={{ marginTop: '1rem' }}>
          All pairs matched!
        </div>
      )}
    </div>
  );
}
