import { useState, useCallback } from 'react';
import { Share2, Check } from 'lucide-react';

interface UnderstandingChartProps {
  percentage: number;
  projectionMonths: number;
  learnedCount: number;
  totalLemmas: number;
  newPerDay: number;
}

export default function UnderstandingChart({
  percentage,
  projectionMonths,
  learnedCount,
  totalLemmas,
  newPerDay,
}: UnderstandingChartProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const text = `I understand ${percentage}% of the Quran! I've learned ${learnedCount} out of ${totalLemmas} unique words. Learning with Kalaam.`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: do nothing if clipboard not available
    }
  }, [percentage, learnedCount, totalLemmas]);

  // Estimate daily minutes (roughly 2 min per word)
  const estimatedMinutes = newPerDay * 2;

  return (
    <div className="bg-card rounded-2xl p-5">
      <h2 className="text-lg font-semibold text-text mb-4">Quran Understanding</h2>

      {/* Large percentage display */}
      <div className="text-center mb-4">
        <div className="text-5xl font-bold text-primary mb-1">
          {percentage}
          <span className="text-2xl">%</span>
        </div>
        <p className="text-sm text-text-secondary">
          I understand {percentage}% of the Quran
        </p>
      </div>

      {/* Progress bar */}
      <div className="relative h-3 bg-border/50 rounded-full overflow-hidden mb-3">
        <div
          className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-700 ease-out"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
        <span>{learnedCount} words learned</span>
        <span>{totalLemmas} total unique words</span>
      </div>

      {/* Projection */}
      {projectionMonths > 0 && percentage < 100 && (
        <p className="text-xs text-text-secondary text-center mb-4">
          With ~{estimatedMinutes} minutes/day, you'll understand 100% of the Quran in ~{projectionMonths} months
        </p>
      )}

      {percentage >= 100 && (
        <p className="text-sm text-success text-center font-medium mb-4">
          You've learned all the unique words in the Quran!
        </p>
      )}

      {/* Share button */}
      <button
        onClick={handleShare}
        className="w-full flex items-center justify-center gap-2 text-primary font-medium
          text-sm py-2.5 rounded-xl border border-primary/20 hover:bg-primary-light transition-colors"
      >
        {copied ? (
          <>
            <Check size={16} />
            Copied!
          </>
        ) : (
          <>
            <Share2 size={16} />
            Share progress
          </>
        )}
      </button>
    </div>
  );
}
