import { usePersistedState } from '@arabtools/core/hooks';
import type { AppView, InshaSettings, ExerciseFilters } from '../data/types';
import { DEFAULT_SETTINGS } from '../data/types';
import { useInshaDrill } from '../hooks/useInshaDrill';
import { Dashboard } from './Dashboard';
import { ExerciseView } from './ExerciseView';
import { ExerciseComplete } from './ExerciseComplete';
import { ExerciseBrowser } from './ExerciseBrowser';

export function InshaApp() {
  const [view, setView] = usePersistedState<AppView>('arabtools-insha-view', 'dashboard');
  const [settings, setSettings] = usePersistedState<InshaSettings>(
    'arabtools-insha-settings',
    DEFAULT_SETTINGS,
  );

  const {
    drillState,
    stats,
    startDrill,
    setStudentAnswer,
    setSelectedOption,
    setArrangedSentences,
    setPlacedConnectors,
    submitAnswer,
    rateExercise,
  } = useInshaDrill(settings.filters);

  const handleFiltersChange = (filters: ExerciseFilters) => {
    setSettings(prev => ({ ...prev, filters }));
  };

  const handleStartDrill = () => {
    startDrill(15);
    setView('exercise');
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
  };

  if (view === 'browse') {
    return (
      <ExerciseBrowser
        filters={settings.filters}
        onBack={handleBackToDashboard}
      />
    );
  }

  if (view === 'exercise') {
    if (drillState.phase === 'complete') {
      return (
        <ExerciseComplete
          exercisesReviewed={drillState.exercisesReviewed}
          onReturnDashboard={handleBackToDashboard}
          onStartNew={handleStartDrill}
        />
      );
    }

    return (
      <ExerciseView
        drillState={drillState}
        showGrammarNotes={settings.showGrammarNotes}
        onStudentAnswerChange={setStudentAnswer}
        onSelectedOptionChange={setSelectedOption}
        onArrangedSentencesChange={setArrangedSentences}
        onPlacedConnectorsChange={setPlacedConnectors}
        onSubmit={submitAnswer}
        onRate={rateExercise}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <Dashboard
      stats={stats}
      filters={settings.filters}
      onFiltersChange={handleFiltersChange}
      onStartDrill={handleStartDrill}
      onBrowse={() => setView('browse')}
    />
  );
}
