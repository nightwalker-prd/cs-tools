import { useRef, useEffect } from 'react';
import { ArrowLeft, Volume2, ArrowRight, Eye } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { BackTranslationPassage, SelfRating } from '../data/types';
import type { BTPhase } from '../hooks/useBackTranslation';

interface BackTranslationExerciseProps {
  passage: BackTranslationPassage;
  phase: BTPhase;
  englishText: string;
  arabicReconstruction: string;
  onEnglishChange: (text: string) => void;
  onArabicChange: (text: string) => void;
  onSubmitEnglish: () => void;
  onSubmitReconstruction: () => void;
  onRate: (rating: SelfRating) => void;
  onBack: () => void;
}

const SELF_RATING_BUTTONS: { rating: SelfRating; label: string; desc: string; color: string }[] = [
  { rating: 'perfect', label: 'Perfect', desc: 'Matched the original', color: 'bg-green-500 hover:bg-green-600' },
  { rating: 'close', label: 'Close', desc: 'Minor differences', color: 'bg-blue-500 hover:bg-blue-600' },
  { rating: 'partial', label: 'Partial', desc: 'Got the gist', color: 'bg-yellow-500 hover:bg-yellow-600' },
  { rating: 'needs-work', label: 'Needs Work', desc: 'Significant gaps', color: 'bg-red-500 hover:bg-red-600' },
];

const PHASE_LABELS: Record<BTPhase, string> = {
  translate: 'Phase 1: Translate',
  reconstruct: 'Phase 2: Reconstruct',
  compare: 'Phase 3: Compare',
};

export function BackTranslationExercise({
  passage,
  phase,
  englishText,
  arabicReconstruction,
  onEnglishChange,
  onArabicChange,
  onSubmitEnglish,
  onSubmitReconstruction,
  onRate,
  onBack,
}: BackTranslationExerciseProps) {
  const { speak } = useSpeechSynthesis();
  const englishRef = useRef<HTMLTextAreaElement>(null);
  const arabicRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (phase === 'translate' && englishRef.current) {
      englishRef.current.focus();
    } else if (phase === 'reconstruct' && arabicRef.current) {
      arabicRef.current.focus();
    }
  }, [phase]);

  const phaseIndex = phase === 'translate' ? 0 : phase === 'reconstruct' ? 1 : 2;
  const progress = ((phaseIndex + 1) / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-5 animate-fade-in-up">
        {/* Header */}
        <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="text-center">
              <span className="text-xs font-medium text-accent uppercase tracking-wide">
                {PHASE_LABELS[phase]}
              </span>
              <div className="flex items-center gap-2 justify-center mt-0.5">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  passage.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                  passage.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {passage.difficulty}
                </span>
                <span className="text-xs text-muted-foreground">{passage.source}</span>
              </div>
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
          <div className="flex justify-between mt-1">
            {['Translate', 'Reconstruct', 'Compare'].map((label, i) => (
              <span
                key={label}
                className={`text-[10px] ${i <= phaseIndex ? 'text-accent font-medium' : 'text-muted-foreground'}`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="font-serif text-lg text-primary">{passage.title}</h2>
          <p className="font-arabic text-primary/70" dir="rtl">{passage.titleArabic}</p>
        </div>

        {/* Phase 1: Translate */}
        {phase === 'translate' && (
          <div className="space-y-4 animate-fade-in-up">
            {/* Arabic passage */}
            <div className="backdrop-blur-md bg-white/70 border border-accent/30 rounded-3xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-accent uppercase tracking-wide">Arabic Passage</p>
                <button
                  onClick={() => speak(passage.arabicClean)}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="text-xs">Listen</span>
                </button>
              </div>
              <p
                dir="rtl"
                className="font-arabic text-2xl leading-[2] text-primary text-center"
              >
                {passage.arabic}
              </p>
            </div>

            {/* English textarea */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Write your English translation:</p>
              <textarea
                ref={englishRef}
                value={englishText}
                onChange={e => onEnglishChange(e.target.value)}
                placeholder="Type your English translation here..."
                className="w-full min-h-[120px] backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-4 text-base leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 shadow-md"
              />
            </div>

            <button
              onClick={onSubmitEnglish}
              disabled={!englishText.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-accent to-[#d4b366] text-white rounded-xl font-medium text-lg hover:opacity-90 transition-all shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Reconstruction
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Phase 2: Reconstruct */}
        {phase === 'reconstruct' && (
          <div className="space-y-4 animate-fade-in-up">
            {/* Student's English (read-only) */}
            <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-6 shadow-md">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Your English Translation</p>
              <p className="text-base leading-relaxed text-primary italic">
                &ldquo;{englishText}&rdquo;
              </p>
            </div>

            {/* Arabic reconstruction textarea */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Now reconstruct the Arabic from your English:</p>
              <textarea
                ref={arabicRef}
                dir="rtl"
                value={arabicReconstruction}
                onChange={e => onArabicChange(e.target.value)}
                placeholder="اكتب النص العربي هنا..."
                className="font-arabic w-full min-h-[120px] backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-4 text-xl leading-[2] resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 shadow-md"
              />
            </div>

            <button
              onClick={onSubmitReconstruction}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-accent to-[#d4b366] text-white rounded-xl font-medium text-lg hover:opacity-90 transition-all shadow-lg shadow-accent/20"
            >
              Reveal Original
              <Eye className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Phase 3: Compare */}
        {phase === 'compare' && (
          <div className="space-y-4 animate-fade-in-up">
            {/* Side-by-side comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Original */}
              <div className="backdrop-blur-md bg-white/70 border border-accent/30 rounded-3xl p-5 shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-accent uppercase tracking-wide">Original</p>
                  <button
                    onClick={() => speak(passage.arabicClean)}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p
                  dir="rtl"
                  className="font-arabic text-xl leading-[2] text-primary"
                >
                  {passage.arabic}
                </p>
              </div>

              {/* Student's reconstruction */}
              <div className="backdrop-blur-md bg-white/70 border border-blue-200 rounded-3xl p-5 shadow-md">
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-3">Your Reconstruction</p>
                <p
                  dir="rtl"
                  className="font-arabic text-xl leading-[2] text-primary"
                >
                  {arabicReconstruction || <span className="text-muted-foreground italic text-base">(empty)</span>}
                </p>
              </div>
            </div>

            {/* Notes */}
            {passage.notes && (
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4">
                <p className="text-sm font-medium text-amber-800 mb-1">Grammar Notes</p>
                <p className="text-sm text-amber-700">{passage.notes}</p>
              </div>
            )}

            {/* Self-rating */}
            <div className="space-y-2">
              <p className="text-center text-sm text-muted-foreground">
                How close was your reconstruction?
              </p>
              <div className="grid grid-cols-4 gap-2">
                {SELF_RATING_BUTTONS.map(({ rating, label, desc, color }) => (
                  <button
                    key={rating}
                    onClick={() => onRate(rating)}
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
