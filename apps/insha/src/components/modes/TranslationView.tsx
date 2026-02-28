import { useRef, useEffect } from 'react';
import type { InshaExercise } from '../../data/types';

interface TranslationViewProps {
  exercise: InshaExercise;
  studentAnswer: string;
  onAnswerChange: (answer: string) => void;
}

export function TranslationView({ exercise, studentAnswer, onAnswerChange }: TranslationViewProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [exercise.id]);

  if (!exercise.prompt) return null;

  return (
    <>
      {/* English prompt */}
      <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-6 shadow-md">
        <div className="text-center space-y-3">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Translate to Arabic
          </p>
          <p className="text-xl font-serif leading-relaxed text-primary">
            &ldquo;{exercise.prompt}&rdquo;
          </p>
        </div>
      </div>

      {/* Student answer */}
      <textarea
        ref={textareaRef}
        dir="rtl"
        value={studentAnswer}
        onChange={e => onAnswerChange(e.target.value)}
        placeholder="اكتب ترجمتك هنا..."
        className="font-arabic w-full min-h-[100px] backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-4 text-xl leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 shadow-md"
      />
    </>
  );
}
