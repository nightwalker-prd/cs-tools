import { Trophy } from 'lucide-react';

interface DrillCompleteProps {
  cardsReviewed: number;
  onReturnDashboard: () => void;
  onStartNew: () => void;
}

export function DrillComplete({ cardsReviewed, onReturnDashboard, onStartNew }: DrillCompleteProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 p-4 md:p-8">
      <div className="max-w-lg mx-auto space-y-6 animate-fade-in-up flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
            <Trophy className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-2xl font-serif text-primary mb-1">Session Complete!</h2>
          <p className="text-muted-foreground">Great work on your translations</p>
        </div>

        <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-6 shadow-xl w-full">
          <div className="flex items-center justify-center">
            <div className="stats-pill px-8 py-4 text-center">
              <div className="text-3xl font-bold text-accent">{cardsReviewed}</div>
              <div className="text-xs text-muted-foreground">Cards Reviewed</div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <button
            onClick={onStartNew}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-accent to-[#d4b366] text-white rounded-xl font-medium hover:opacity-90 transition-all shadow-lg shadow-accent/20"
          >
            Start New Drill
          </button>
          <button
            onClick={onReturnDashboard}
            className="flex-1 px-6 py-3 bg-white border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary/5 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
