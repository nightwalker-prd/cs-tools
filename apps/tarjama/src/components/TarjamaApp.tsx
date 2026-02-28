import { usePersistedState } from '@arabtools/core/hooks';
import type { AppView, TarjamaSettings, DeckFilters } from '../data/types';
import { DEFAULT_SETTINGS } from '../data/types';
import { useTarjamaDrill } from '../hooks/useTarjamaDrill';
import { useBackTranslation } from '../hooks/useBackTranslation';
import { Dashboard } from './Dashboard';
import { DrillView } from './DrillView';
import { DrillComplete } from './DrillComplete';
import { DeckBrowser } from './DeckBrowser';
import { BackTranslationHome } from './BackTranslationHome';
import { BackTranslationExercise } from './BackTranslationExercise';

export function TarjamaApp() {
  const [view, setView] = usePersistedState<AppView>('arabtools-tarjama-view', 'dashboard');
  const [settings, setSettings] = usePersistedState<TarjamaSettings>(
    'arabtools-tarjama-settings',
    DEFAULT_SETTINGS,
  );

  const { drillState, stats, startDrill, setStudentAnswer, showAnswer, rateCard } =
    useTarjamaDrill(settings.deckFilters);

  const bt = useBackTranslation();

  const handleFiltersChange = (filters: DeckFilters) => {
    setSettings(prev => ({ ...prev, deckFilters: filters }));
  };

  const handleStartDrill = () => {
    startDrill(20);
    setView('drill');
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
  };

  if (view === 'browse') {
    return (
      <DeckBrowser
        filters={settings.deckFilters}
        onBack={handleBackToDashboard}
      />
    );
  }

  if (view === 'drill') {
    if (drillState.phase === 'complete') {
      return (
        <DrillComplete
          cardsReviewed={drillState.cardsReviewed}
          onReturnDashboard={handleBackToDashboard}
          onStartNew={handleStartDrill}
        />
      );
    }

    return (
      <DrillView
        drillState={drillState}
        showHints={settings.showHints}
        onStudentAnswerChange={setStudentAnswer}
        onShowAnswer={showAnswer}
        onRate={rateCard}
        onBack={handleBackToDashboard}
      />
    );
  }

  if (view === 'backTranslation') {
    return (
      <BackTranslationHome
        onSelectPassage={(passage) => {
          bt.startExercise(passage);
          setView('btExercise');
        }}
        onBack={handleBackToDashboard}
        getLastAttempt={bt.getLastAttempt}
      />
    );
  }

  if (view === 'btExercise' && bt.passage) {
    return (
      <BackTranslationExercise
        passage={bt.passage}
        phase={bt.phase}
        englishText={bt.englishText}
        arabicReconstruction={bt.arabicReconstruction}
        onEnglishChange={bt.updateEnglish}
        onArabicChange={bt.updateArabic}
        onSubmitEnglish={bt.submitEnglish}
        onSubmitReconstruction={bt.submitReconstruction}
        onRate={(rating) => {
          bt.rate(rating);
          setView('backTranslation');
        }}
        onBack={() => {
          bt.reset();
          setView('backTranslation');
        }}
      />
    );
  }

  return (
    <Dashboard
      stats={stats}
      filters={settings.deckFilters}
      onFiltersChange={handleFiltersChange}
      onStartDrill={handleStartDrill}
      onBrowse={() => setView('browse')}
      onBackTranslation={() => setView('backTranslation')}
    />
  );
}
