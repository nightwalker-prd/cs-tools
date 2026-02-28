import { useRef, useEffect } from 'react';
import type { InshaExercise } from '../../data/types';

interface ParagraphTranslationViewProps {
  exercise: InshaExercise;
  studentAnswer: string;
  onAnswerChange: (answer: string) => void;
}

export function ParagraphTranslationView({ exercise, studentAnswer, onAnswerChange }: ParagraphTranslationViewProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [exercise.id]);

  if (!exercise.prompt) return null;

  return (
    <>
      {/* English paragraph prompt */}
      <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-6 shadow-md">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide text-center">
            Translate the paragraph to Arabic
          </p>
          <p className="text-base font-serif leading-relaxed text-primary whitespace-pre-line">
            {exercise.prompt}
          </p>
        </div>
      </div>

      {/* Rubric hint */}
      {exercise.rubric && exercise.rubric.length > 0 && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3">
          <p className="text-xs font-medium text-amber-800 mb-1.5">Focus areas:</p>
          <div className="flex flex-wrap gap-1.5">
            {exercise.rubric.map(r => (
              <span key={r.id} className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-700">
                {r.nameEn}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Student answer */}
      <textarea
        ref={textareaRef}
        dir="rtl"
        value={studentAnswer}
        onChange={e => onAnswerChange(e.target.value)}
        placeholder="اكتب ترجمتك هنا..."
        className="font-arabic w-full min-h-[150px] backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-4 text-lg leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 shadow-md"
      />
    </>
  );
}
