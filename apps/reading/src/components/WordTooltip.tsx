import { Volume2 } from 'lucide-react';

interface WordTooltipProps {
  word: string;
  translation: string;
  grammaticalInfo?: string;
  isActive: boolean;
  isSpeaking: boolean;
  onClick: () => void;
  onSpeak: () => void;
}

export function WordTooltip({ word, translation, grammaticalInfo, isActive, isSpeaking, onClick, onSpeak }: WordTooltipProps) {
  return (
    <span className="word-tooltip-wrapper">
      <span
        onClick={onClick}
        className={`word-tooltip-word${isActive ? ' active' : ''}${isSpeaking ? ' speaking' : ''}`}
      >
        {word}
      </span>

      {(isActive || undefined) && (
        <span className="word-tooltip-popup">
          <div className="word-tooltip-translation">{translation}</div>
          {grammaticalInfo && (
            <div className="word-tooltip-grammar">{grammaticalInfo}</div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSpeak();
            }}
            className="word-tooltip-speak"
            title="Listen to pronunciation"
          >
            <Volume2 size={14} />
          </button>
        </span>
      )}
    </span>
  );
}
