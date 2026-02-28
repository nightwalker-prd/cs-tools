import { isPrimarilyArabic } from '@arabtools/core';
import { Volume2 } from 'lucide-react';

interface QuestionCardProps {
  index: number;
  question: string;
  answer: string;
  revealed: boolean;
  onToggleReveal: () => void;
  mastered: boolean;
  onSpeak?: (text: string) => void;
  isSpeaking?: boolean;
  gradeSlot?: React.ReactNode;
  gradeClass?: string;
}

export function QuestionCard({
  index,
  question,
  answer,
  revealed,
  onToggleReveal,
  mastered,
  onSpeak,
  isSpeaking,
  gradeSlot,
  gradeClass,
}: QuestionCardProps) {
  const qIsArabic = isPrimarilyArabic(question);
  const aIsArabic = isPrimarilyArabic(answer);

  return (
    <div
      className={`question-card ${revealed ? 'revealed' : ''} ${gradeClass || ''}`}
      style={{ animationDelay: `${Math.min(index * 30, 500)}ms` }}
    >
      <div className="question-header" onClick={onToggleReveal}>
        <span className="question-number">{index + 1}</span>
        <span className={`question-text ${qIsArabic ? '' : 'ltr'}`}>
          {question}
        </span>
        {mastered && <span className="mastered-badge">Mastered</span>}
        {qIsArabic && onSpeak && (
          <button
            className={`audio-btn ${isSpeaking ? 'speaking' : ''}`}
            onClick={e => { e.stopPropagation(); onSpeak(question); }}
          >
            <Volume2 size={14} />
          </button>
        )}
        <button className="reveal-btn" onClick={e => { e.stopPropagation(); onToggleReveal(); }}>
          {revealed ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className="answer-section">
        <div className="answer-content">
          <div className="answer-label">Answer</div>
          <div className="flex items-center gap-2">
            <div className={`answer-text ${aIsArabic ? 'arabic' : ''}`}>
              {answer}
            </div>
            {aIsArabic && onSpeak && (
              <button
                className={`audio-btn ${isSpeaking ? 'speaking' : ''}`}
                onClick={() => onSpeak(answer)}
              >
                <Volume2 size={14} />
              </button>
            )}
          </div>
        </div>
        {gradeSlot}
      </div>
    </div>
  );
}
