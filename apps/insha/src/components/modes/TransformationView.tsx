import { useRef, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { InshaExercise } from '../../data/types';

interface TransformationViewProps {
  exercise: InshaExercise;
  studentAnswer: string;
  onAnswerChange: (answer: string) => void;
}

const TRANSFORM_LABELS: Record<string, string> = {
  kana: 'Add كان',
  inna: 'Add إنّ',
  passive: 'Convert to passive',
  negative: 'Negate the sentence',
  question: 'Convert to a question',
  join: 'Join the sentences',
};

export function TransformationView({ exercise, studentAnswer, onAnswerChange }: TransformationViewProps) {
  const { speak } = useSpeechSynthesis();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [exercise.id]);

  if (!exercise.sourceArabic || !exercise.transformType) return null;

  return (
    <>
      {/* Source sentence */}
      <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-6 shadow-md">
        <div className="text-center space-y-3">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Transform this sentence
          </p>
          <button
            onClick={() => speak(exercise.sourceArabic!)}
            className="inline-flex items-center gap-2 group"
          >
            <p dir="rtl" className="font-arabic text-2xl leading-relaxed text-primary group-hover:text-accent transition-colors">
              {exercise.sourceArabic}
            </p>
            <Volume2 className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
          </button>
        </div>
      </div>

      {/* Instruction */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-center">
        <p className="text-sm font-medium text-amber-800">
          {exercise.prompt || TRANSFORM_LABELS[exercise.transformType]}
        </p>
      </div>

      {/* Student answer */}
      <textarea
        ref={textareaRef}
        dir="rtl"
        value={studentAnswer}
        onChange={e => onAnswerChange(e.target.value)}
        placeholder="اكتب إجابتك هنا..."
        className="font-arabic w-full min-h-[100px] backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-4 text-xl leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 shadow-md"
      />
    </>
  );
}
