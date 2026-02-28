import { useState } from 'react';
import type { FrequencyLevel } from '@arabtools/data';
import { Card, CardContent, CardHeader, CardTitle } from '@arabtools/ui';
import type { MufradatSessionConfig } from '../types';

interface SessionConfigProps {
  onStart: (config: MufradatSessionConfig) => void;
  onBack: () => void;
}

const LEVELS: { value: FrequencyLevel; label: string }[] = [
  { value: '1k', label: '1k — Most Frequent' },
  { value: '2k', label: '2k — High Frequency' },
  { value: '3k', label: '3k — Medium Frequency' },
  { value: '5k', label: '5k — Lower Frequency' },
  { value: '10k', label: '10k — Advanced' },
];

const SESSION_SIZES = [10, 20, 30];
const NEW_WORD_COUNTS = [3, 5, 10];

export function SessionConfig({ onStart, onBack }: SessionConfigProps) {
  const [selectedLevels, setSelectedLevels] = useState<FrequencyLevel[]>([
    '1k', '2k', '3k', '5k', '10k',
  ]);
  const [sessionSize, setSessionSize] = useState(20);
  const [newWords, setNewWords] = useState(5);

  const toggleLevel = (level: FrequencyLevel) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level],
    );
  };

  const handleStart = () => {
    if (selectedLevels.length === 0) return;
    onStart({
      levels: selectedLevels,
      sessionSize,
      newWordsPerSession: Math.min(newWords, sessionSize),
    });
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6 animate-fade-in-up">
      <header className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Back
        </button>
        <h2 className="text-2xl font-bold text-primary">Session Setup</h2>
      </header>

      {/* Frequency Bands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Frequency Bands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {LEVELS.map(({ value, label }) => (
            <label
              key={value}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedLevels.includes(value)}
                onChange={() => toggleLevel(value)}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Session Size */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Session Size</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {SESSION_SIZES.map(size => (
              <button
                key={size}
                onClick={() => setSessionSize(size)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  sessionSize === size
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {size} cards
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Words Per Session */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">New Words</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {NEW_WORD_COUNTS.map(count => (
              <button
                key={count}
                onClick={() => setNewWords(count)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  newWords === count
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {count} new
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <button
        onClick={handleStart}
        disabled={selectedLevels.length === 0}
        className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-40"
      >
        Start Session
      </button>
    </div>
  );
}
