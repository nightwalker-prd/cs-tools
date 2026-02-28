import { useState, useCallback } from 'react';
import type { WordFamily } from '@arabtools/data';
import type { ResponseQuality, SessionItem } from '@arabtools/srs';
import { CardFront } from './CardFront';
import { CardBack } from './CardBack';
import { MultipleChoice } from './MultipleChoice';
import { TypeAnswer } from './TypeAnswer';
import { getQuestionType } from '../utils/vocab-helpers';

interface ActiveSessionProps {
  currentItem: SessionItem;
  progress: number;
  word: WordFamily;
  allWords: WordFamily[];
  onGrade: (quality: ResponseQuality) => void;
  onNext: () => void;
  onQuit: () => void;
}

export function ActiveSession({
  currentItem,
  progress,
  word,
  allWords,
  onGrade,
  onNext,
  onQuit,
}: ActiveSessionProps) {
  const [revealed, setRevealed] = useState(false);

  const questionType = getQuestionType(currentItem.srsItem.reps);

  const handleGrade = useCallback((quality: ResponseQuality) => {
    onGrade(quality);
    setRevealed(false);
    setTimeout(() => onNext(), 50);
  }, [onGrade, onNext]);

  const pct = Math.round(progress * 100);

  return (
    <div className="study-container animate-fade-in-up">
      {/* Header: quit + progress */}
      <div className="study-header">
        <button className="breadcrumb-link" onClick={onQuit}>
          Quit
        </button>
        <div className="study-progress">
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <span className="study-progress-label">{pct}%</span>
      </div>

      {/* Card */}
      <div className="study-card">
        {questionType === 'flashcard' && !revealed && (
          <CardFront word={word} onReveal={() => setRevealed(true)} />
        )}
        {questionType === 'flashcard' && revealed && (
          <CardBack word={word} onGrade={handleGrade} showGradeButtons={true} />
        )}
        {questionType === 'multiple-choice' && (
          <MultipleChoice
            key={currentItem.srsItem.id}
            word={word}
            allWords={allWords}
            onGrade={handleGrade}
          />
        )}
        {questionType === 'type-answer' && (
          <TypeAnswer
            key={currentItem.srsItem.id}
            word={word}
            onGrade={handleGrade}
          />
        )}
      </div>
    </div>
  );
}
