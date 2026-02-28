import { Check, X } from 'lucide-react';
import type { ResponseQuality } from '@arabtools/srs';
import type { AnswerResult, ExerciseItem } from '../types';

interface FeedbackPanelProps {
  result: AnswerResult;
  exercise: ExerciseItem;
  srsEnabled: boolean;
  onQualitySelect: (quality: ResponseQuality) => void;
  onNext: () => void;
}

export function FeedbackPanel({
  result,
  exercise,
  srsEnabled,
  onQualitySelect,
  onNext,
}: FeedbackPanelProps) {
  const isCorrect = result.isCorrect;

  const handleQuality = (quality: ResponseQuality) => {
    onQualitySelect(quality);
    onNext();
  };

  const handleNextOnly = () => {
    // Default quality based on correctness
    const defaultQuality: ResponseQuality = isCorrect ? 2 : 0;
    onQualitySelect(defaultQuality);
    onNext();
  };

  return (
    <div className={`feedback-panel ${isCorrect ? 'correct' : 'incorrect'} animate-fade-in-up`}>
      <div className="feedback-header">
        <span className="icon">
          {isCorrect ? <Check size={22} color="var(--color-success)" /> : <X size={22} color="var(--color-destructive)" />}
        </span>
        <h3 className={isCorrect ? 'correct' : 'incorrect'}>
          {isCorrect ? 'Correct!' : 'Incorrect'}
        </h3>
      </div>

      {!isCorrect && (
        <div className="feedback-correct-answer">
          {exercise.correctAnswer}
        </div>
      )}

      {result.matchLevel === 'normalized' && (
        <div className="feedback-detail">
          Accepted (matched without diacritics)
        </div>
      )}

      {exercise.type === 'conjugation' && (
        <div className="feedback-detail">
          {exercise.prompt.root} ({exercise.prompt.meaning}) — {exercise.seegah.labelEn}
        </div>
      )}

      {srsEnabled ? (
        <div className="srs-quality-buttons">
          <button className="srs-quality-btn again" onClick={() => handleQuality(0)}>
            <span className="quality-label">Again</span>
            <span className="quality-interval">&lt;1min</span>
          </button>
          <button className="srs-quality-btn hard" onClick={() => handleQuality(1)}>
            <span className="quality-label">Hard</span>
            <span className="quality-interval">~10min</span>
          </button>
          <button className="srs-quality-btn good" onClick={() => handleQuality(2)}>
            <span className="quality-label">Good</span>
            <span className="quality-interval">1 day</span>
          </button>
          <button className="srs-quality-btn easy" onClick={() => handleQuality(3)}>
            <span className="quality-label">Easy</span>
            <span className="quality-interval">4 days</span>
          </button>
        </div>
      ) : (
        <button className="text-submit-btn feedback-next-btn" onClick={handleNextOnly}>
          Next Question
        </button>
      )}
    </div>
  );
}
