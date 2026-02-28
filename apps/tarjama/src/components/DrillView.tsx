import { useRef, useEffect } from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { ResponseQuality } from '@arabtools/srs/types';
import type { DrillState } from '../hooks/useTarjamaDrill';

interface DrillViewProps {
  drillState: DrillState;
  showHints: boolean;
  onStudentAnswerChange: (answer: string) => void;
  onShowAnswer: () => void;
  onRate: (quality: ResponseQuality) => void;
  onBack: () => void;
}

const RATING_BUTTONS: { quality: ResponseQuality; label: string; labelAr: string; color: string; desc: string }[] = [
  { quality: 0, label: 'Again', labelAr: 'مرة أخرى', color: 'bg-red-500 hover:bg-red-600', desc: 'Complete blank' },
  { quality: 1, label: 'Hard', labelAr: 'صعب', color: 'bg-orange-500 hover:bg-orange-600', desc: 'Major errors' },
  { quality: 2, label: 'Good', labelAr: 'جيد', color: 'bg-blue-500 hover:bg-blue-600', desc: 'Minor errors' },
  { quality: 3, label: 'Easy', labelAr: 'سهل', color: 'bg-green-500 hover:bg-green-600', desc: 'Perfect recall' },
];

export function DrillView({
  drillState,
  showHints,
  onStudentAnswerChange,
  onShowAnswer,
  onRate,
  onBack,
}: DrillViewProps) {
  const { speak } = useSpeechSynthesis();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (drillState.phase === 'prompt' && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [drillState.phase, drillState.currentCard?.id]);

  if (!drillState.currentCard) return null;

  const card = drillState.currentCard;
  const progress = drillState.totalCards > 0
    ? ((drillState.cardsReviewed) / drillState.totalCards) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-5 animate-fade-in-up">
        {/* Header with progress */}
        <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="text-center flex items-center gap-3">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                card.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                card.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {card.difficulty}
              </span>
              <span className="text-xs text-muted-foreground">{card.source}</span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">
                {drillState.cardsReviewed + 1}/{drillState.totalCards}
              </span>
            </div>
            <div className="w-16" />
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mt-3">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Nahw topic tags */}
        {card.nahwTopics.length > 0 && (
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {card.nahwTopics.slice(0, 3).map(topic => (
              <span key={topic} className="px-2 py-0.5 rounded-full text-xs bg-accent/10 text-accent-foreground">
                {topic.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        )}

        {/* English prompt */}
        <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-6 shadow-md">
          <div className="text-center space-y-3">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Translate to Arabic
            </p>
            <p className="text-xl font-serif leading-relaxed text-primary">
              &ldquo;{card.english}&rdquo;
            </p>
            {showHints && card.hint && (
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 animate-fade-in-up">
                <p className="text-sm text-amber-800 italic">
                  Hint: {card.hint}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Student answer area */}
        <textarea
          ref={textareaRef}
          dir="rtl"
          value={drillState.studentAnswer}
          onChange={e => onStudentAnswerChange(e.target.value)}
          placeholder="اكتب ترجمتك هنا..."
          className="font-arabic w-full min-h-[100px] backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-4 text-xl leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 shadow-md"
          disabled={drillState.phase !== 'prompt'}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey && drillState.phase === 'prompt') {
              e.preventDefault();
              onShowAnswer();
            }
          }}
        />

        {/* Show Answer button */}
        {drillState.phase === 'prompt' && (
          <button
            onClick={onShowAnswer}
            className="w-full px-6 py-4 bg-gradient-to-r from-accent to-[#d4b366] text-white rounded-xl font-medium text-lg hover:opacity-90 transition-all shadow-lg shadow-accent/20"
          >
            Show Answer
          </button>
        )}

        {/* Model answer + comparison */}
        {drillState.phase === 'answer' && (
          <div className="space-y-4 animate-fade-in-up">
            {/* Model answer card */}
            <div className="backdrop-blur-md bg-white/70 border border-accent/30 rounded-3xl p-6 shadow-md">
              <div className="text-center space-y-3">
                <p className="text-sm font-medium text-accent uppercase tracking-wide">Model Answer</p>
                <button
                  onClick={() => speak(card.modelArabicClean)}
                  className="inline-flex items-center gap-2 group"
                >
                  <p
                    dir="rtl"
                    className="font-arabic text-2xl leading-relaxed text-primary group-hover:text-accent transition-colors"
                  >
                    {card.modelArabic}
                  </p>
                  <Volume2 className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </button>
                <p className="text-sm text-muted-foreground" dir="rtl">
                  {card.modelArabicClean}
                </p>
                {card.alternates && card.alternates.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    Also accepted: {card.alternates.join(' / ')}
                  </div>
                )}
              </div>
            </div>

            {/* Your answer comparison */}
            {drillState.studentAnswer.trim() && (
              <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-4 shadow-sm">
                <p className="text-sm text-muted-foreground mb-1">Your answer:</p>
                <p dir="rtl" className="font-arabic text-lg leading-relaxed text-primary">
                  {drillState.studentAnswer}
                </p>
              </div>
            )}

            {/* Rating buttons */}
            <div className="space-y-2">
              <p className="text-center text-sm text-muted-foreground">
                How well did you recall it?
              </p>
              <div className="grid grid-cols-4 gap-2">
                {RATING_BUTTONS.map(({ quality, label, color, desc }) => (
                  <button
                    key={quality}
                    onClick={() => onRate(quality)}
                    className={`${color} text-white rounded-xl py-3 px-2 text-center transition-all active:scale-95 shadow-md`}
                  >
                    <div className="font-semibold text-sm">{label}</div>
                    <div className="text-[10px] opacity-80">{desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
