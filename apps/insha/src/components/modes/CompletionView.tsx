import type { InshaExercise } from '../../data/types';

interface CompletionViewProps {
  exercise: InshaExercise;
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
}

export function CompletionView({ exercise, selectedOption, onSelectOption }: CompletionViewProps) {
  if (!exercise.sentenceTemplate || !exercise.options) return null;

  // Split template around the blank
  const parts = exercise.sentenceTemplate.split('___');

  return (
    <>
      {/* Sentence template */}
      <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-6 shadow-md">
        <div className="text-center space-y-3">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Fill in the blank
          </p>
          <p dir="rtl" className="font-arabic text-2xl leading-relaxed text-primary">
            {parts[0]}
            <span className="inline-block mx-1 px-3 py-0.5 rounded-lg bg-accent/10 border-2 border-dashed border-accent/40 min-w-[80px] text-center">
              {selectedOption || '___'}
            </span>
            {parts[1]}
          </p>
        </div>
      </div>

      {/* Answer options */}
      <div className="grid grid-cols-2 gap-3">
        {exercise.options.map((option, i) => (
          <button
            key={i}
            onClick={() => onSelectOption(option)}
            dir="rtl"
            className={`font-arabic text-lg p-4 rounded-2xl text-center transition-all active:scale-95 ${
              selectedOption === option
                ? 'bg-accent/20 border-2 border-accent text-primary shadow-md'
                : 'backdrop-blur-md bg-white/70 border border-white/40 text-primary hover:bg-white/90'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
}
