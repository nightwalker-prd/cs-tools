import { Check, Star, Target, BarChart3, ArrowLeft } from 'lucide-react';

interface LessonCompleteProps {
  results: {
    reviewed: number;
    correct: number;
    accuracy: number;
    points: number;
  };
  onBack: () => void;
}

export default function LessonComplete({ results, onBack }: LessonCompleteProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      {/* Checkmark circle */}
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <Check size={40} className="text-primary" strokeWidth={2.5} />
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-text mb-2">Lesson Complete!</h1>
      <p className="text-sm text-text-secondary mb-8">
        Great job reviewing your vocabulary
      </p>

      {/* Stats grid */}
      <div className="w-full max-w-[320px] grid grid-cols-3 gap-3 mb-10">
        {/* Cards reviewed */}
        <div className="flex flex-col items-center bg-card rounded-xl p-4">
          <BarChart3 size={20} className="text-primary mb-2" />
          <div className="text-xl font-bold text-text">{results.reviewed}</div>
          <div className="text-xs text-text-secondary mt-0.5">Cards</div>
        </div>

        {/* Accuracy */}
        <div className="flex flex-col items-center bg-card rounded-xl p-4">
          <Target size={20} className="text-primary mb-2" />
          <div className="text-xl font-bold text-text">{results.accuracy}%</div>
          <div className="text-xs text-text-secondary mt-0.5">Accuracy</div>
        </div>

        {/* Points earned */}
        <div className="flex flex-col items-center bg-card rounded-xl p-4">
          <Star size={20} className="text-accent mb-2" />
          <div className="text-xl font-bold text-text">{results.points}</div>
          <div className="text-xs text-text-secondary mt-0.5">Points</div>
        </div>
      </div>

      {/* Back to Study button */}
      <button
        onClick={onBack}
        className="flex items-center justify-center gap-2 bg-primary text-white font-medium
          py-3 px-8 rounded-xl hover:bg-primary-dark transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Study
      </button>
    </div>
  );
}
