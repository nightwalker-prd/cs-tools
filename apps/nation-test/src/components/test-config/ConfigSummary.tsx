import { cn } from '@arabtools/ui';
import { Play } from 'lucide-react';
import type { TestConfig } from '../../types';
import type { ConfigState, ConfigActions } from './useTestConfig';
import { testTypes } from './constants';

interface ConfigSummaryProps {
  state: ConfigState;
  actions: ConfigActions;
  onStartTest: (config: TestConfig) => void;
}

export function ConfigSummary({ state, actions, onStartTest }: ConfigSummaryProps) {
  const typeInfo = testTypes.find((t) => t.type === state.selectedType);
  const canStart =
    state.selectedType === 'sentence_production'
      ? state.selectedDifficulties.length > 0
      : state.selectedLevels.length > 0;

  const handleStart = () => {
    const config = actions.buildConfig();
    if (config) {
      onStartTest(config);
    }
  };

  return (
    <div className={cn(
      'backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl shadow-xl',
      'p-6 space-y-4'
    )}>
      <h3 className="font-serif text-lg text-primary">Test Summary</h3>

      <div className="flex flex-wrap gap-2">
        {typeInfo && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {typeInfo.icon}
            {typeInfo.name}
          </span>
        )}
        <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">
          {actions.totalItems} items
        </span>
        <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">
          {state.selectedLevels.length > 0
            ? state.selectedLevels.sort().join(', ')
            : 'No levels'}
        </span>
        {state.showFeedback && (
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
            Feedback on
          </span>
        )}
      </div>

      <button
        onClick={handleStart}
        disabled={!canStart}
        className={cn(
          'w-full flex items-center justify-center gap-2',
          'px-8 py-4 rounded-2xl text-lg font-semibold transition-all',
          'bg-primary text-white shadow-lg',
          'hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg'
        )}
      >
        <Play className="w-5 h-5" />
        Start Test
      </button>
    </div>
  );
}
