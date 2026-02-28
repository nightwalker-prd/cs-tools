import { Star, Volume2, ArrowRight } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core';
import type { Proverb } from '../types';

interface DailyProverbCardProps {
  proverb: Proverb;
  onViewDetail: (id: string) => void;
}

export function DailyProverbCard({ proverb, onViewDetail }: DailyProverbCardProps) {
  const { speak, isSpeaking } = useSpeechSynthesis();

  return (
    <div className="daily-hero">
      <div className="daily-hero-corner daily-hero-corner--tl" />
      <div className="daily-hero-corner daily-hero-corner--br" />

      <div className="daily-hero-label">
        <Star size={14} />
        Proverb of the Day
      </div>

      <div className="daily-hero-arabic">{proverb.arabic}</div>
      <div className="daily-hero-translation">{proverb.translation}</div>
      <div className="daily-hero-meaning">{proverb.meaning}</div>

      <div className="daily-hero-actions">
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => speak(proverb.arabic)}
          disabled={isSpeaking}
        >
          <Volume2 size={16} />
          Listen
        </button>
        <button
          className="btn btn-accent btn-sm"
          onClick={() => onViewDetail(proverb.id)}
        >
          Read More
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
