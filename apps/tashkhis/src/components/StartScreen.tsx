import { Card } from '@arabtools/ui';

interface StartScreenProps {
  maxQuestions: number;
  onChangeMax: (n: number) => void;
  onStart: () => void;
  onViewHistory: () => void;
}

const QUESTION_OPTIONS = [50, 80, 100];

export function StartScreen({ maxQuestions, onChangeMax, onStart, onViewHistory }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center gap-8 py-12 animate-fade-in-up">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl text-primary mb-1">Placement Test</h1>
        <p className="font-arabic text-2xl text-accent" dir="rtl">تشخيص</p>
        <p className="mt-4 text-muted-foreground max-w-md leading-relaxed">
          An adaptive test that diagnoses your Arabic proficiency across grammar,
          morphology, and vocabulary. Questions adapt to your level as you answer.
        </p>
      </div>

      {/* Info card */}
      <Card className="w-full max-w-md p-6">
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Duration</span>
            <span className="font-medium">15-30 minutes</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Questions</span>
            <span className="font-medium">~{maxQuestions} (adaptive)</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Categories</span>
            <span className="font-medium">45 (6 units + sarf + vocab)</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Format</span>
            <span className="font-medium">Multiple choice</span>
          </div>
        </div>
      </Card>

      {/* Question cap */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Max questions:</span>
        <div className="flex gap-2">
          {QUESTION_OPTIONS.map(n => (
            <button
              key={n}
              onClick={() => onChangeMax(n)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                maxQuestions === n
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={onStart}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-xl text-lg font-medium hover:opacity-90 transition-opacity"
        >
          Begin Test
        </button>
        <button
          onClick={onViewHistory}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Past Results
        </button>
      </div>
    </div>
  );
}
