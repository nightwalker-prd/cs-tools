import { useSpeechSynthesis } from '@arabtools/core';
import { Volume2 } from 'lucide-react';
import type { DialogueLine, Character } from '../types';

interface DialogueBubbleProps {
  line: DialogueLine;
  character: Character | undefined;
  isActive: boolean;
  onTap: () => void;
}

export function DialogueBubble({
  line,
  character,
  isActive,
  onTap,
}: DialogueBubbleProps) {
  const { speak, isSpeaking } = useSpeechSynthesis();
  const isProtagonist = character?.role === 'protagonist';

  return (
    <div
      onClick={onTap}
      className={`flex gap-3 transition-opacity duration-300 cursor-pointer ${
        isActive ? 'opacity-100' : 'opacity-50'
      } ${isProtagonist ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
          isProtagonist
            ? 'bg-lapis text-white'
            : 'bg-gold/20 text-gold'
        }`}
      >
        {character?.nameEn.charAt(0) ?? '?'}
      </div>
      <div
        className={`flex-1 max-w-[80%] rounded-xl p-3 ${
          isProtagonist
            ? 'bg-lapis/10 rounded-tr-none'
            : 'bg-white border border-parchment-dark/10 rounded-tl-none'
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-parchment-dark">
            {character?.nameEn ?? line.speaker}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              speak(line.textAr);
            }}
            disabled={isSpeaking}
            className="text-lapis/60 hover:text-lapis transition-colors"
            aria-label="Listen to Arabic"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
        <p className="font-arabic text-lg leading-relaxed text-right" dir="rtl">
          {line.textAr}
        </p>
        <p className="text-sm text-parchment-dark mt-1">{line.textEn}</p>
      </div>
    </div>
  );
}
