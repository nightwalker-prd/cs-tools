import { useEffect, useRef } from 'react';
import { DialogueBubble } from './DialogueBubble';
import type { DialogueLine, Character } from '../types';

interface DialoguePhaseProps {
  lines: DialogueLine[];
  characters: Character[];
  currentLine: number;
  onAdvance: () => void;
  onGoToLine: (index: number) => void;
  onFinish: () => void;
}

export function DialoguePhase({
  lines,
  characters,
  currentLine,
  onAdvance,
  onGoToLine,
  onFinish,
}: DialoguePhaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isLast = currentLine === lines.length - 1;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentLine]);

  const charMap = new Map(characters.map((c) => [c.id, c]));

  return (
    <div className="space-y-4">
      <div
        ref={scrollRef}
        className="space-y-3 max-h-[60vh] overflow-y-auto p-2"
      >
        {lines.slice(0, currentLine + 1).map((line, i) => (
          <DialogueBubble
            key={i}
            line={line}
            character={charMap.get(line.speaker)}
            isActive={i === currentLine}
            onTap={() => onGoToLine(i)}
          />
        ))}
      </div>

      <div className="flex justify-center pt-2">
        {isLast ? (
          <button
            onClick={onFinish}
            className="px-6 py-2.5 bg-gold text-white rounded-lg font-medium hover:bg-gold/90 transition-colors"
          >
            Continue to Questions
          </button>
        ) : (
          <button
            onClick={onAdvance}
            className="px-6 py-2.5 bg-lapis text-white rounded-lg font-medium hover:bg-lapis/90 transition-colors"
          >
            Next Line
          </button>
        )}
      </div>

      <div className="flex justify-center gap-1">
        {lines.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i <= currentLine ? 'bg-lapis' : 'bg-parchment-dark/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
