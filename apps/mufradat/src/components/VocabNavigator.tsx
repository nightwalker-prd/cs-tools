import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { usePersistedState, useSidebarState } from '@arabtools/core';
import { useHashRouter } from '../hooks/useHashRouter';
import { useSearch } from '../hooks/useSearch';
import { useVocabEngine } from '../hooks/useVocabEngine';
import { allWords, vocabBands, wordById } from '../data/vocab-data';
import { Sidebar, HamburgerButton } from './Sidebar';
import { HomePage } from './HomePage';
import { BandOverview } from './BandOverview';
import { WordView } from './WordView';
import { ActiveSession } from './ActiveSession';
import { SessionResults } from './SessionResults';
import { StudyConfig } from './StudyConfig';
import type { ViewMode, MufradatSessionConfig, SessionResultData } from '../types';

type Route =
  | { type: 'home' }
  | { type: 'band'; bandId: string; pos?: string }
  | { type: 'word'; wordId: string }
  | { type: 'study' }
  | { type: 'results' }
  | { type: 'notFound'; slug: string };

function resolveRoute(slug: string): Route {
  if (!slug) return { type: 'home' };
  if (slug.startsWith('band-')) {
    const rest = slug.replace('band-', '');
    const [bandId, query] = rest.split('?');
    const pos = query?.startsWith('pos=') ? query.replace('pos=', '') : undefined;
    return { type: 'band', bandId, pos };
  }
  if (slug.startsWith('word/')) {
    return { type: 'word', wordId: slug.replace('word/', '') };
  }
  if (slug === 'study') return { type: 'study' };
  if (slug === 'results') return { type: 'results' };
  return { type: 'notFound', slug };
}

export function VocabNavigator() {
  const { slug, navigate, goHome } = useHashRouter();
  const sidebar = useSidebarState('mufradat');
  const [viewMode, setViewMode] = usePersistedState<ViewMode>('arabtools-mufradat-view', 'browse');
  const mainRef = useRef<HTMLDivElement>(null);
  const engine = useVocabEngine();

  const { query, setQuery, results, clearSearch } = useSearch(allWords, vocabBands);

  // Study session state
  const [sessionResults, setSessionResults] = useState<SessionResultData | null>(null);
  const [studyActive, setStudyActive] = useState(false);

  const route = resolveRoute(slug);

  // Scroll to top on page change
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [slug]);

  const handleNavigate = useCallback((newSlug: string) => {
    navigate(newSlug);
    sidebar.closeDrawer();
  }, [navigate, sidebar]);

  const handleViewChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, [setViewMode]);

  // Compute aggregate stats for sidebar
  const { masteredCount, dueCount, totalCount } = useMemo(() => {
    let mastered = 0;
    let due = 0;
    let total = 0;
    const stats = engine.bandStats;
    for (const key of ['1k', '2k', '3k', '5k', '10k'] as const) {
      const s = stats[key];
      mastered += s.mastered;
      due += s.learning + s.review;
      total += s.total;
    }
    return { masteredCount: mastered, dueCount: due, totalCount: total };
  }, [engine.bandStats]);

  // Study session callbacks
  const handleStartSession = useCallback((config: MufradatSessionConfig) => {
    engine.startVocabSession(config);
    setStudyActive(true);
  }, [engine]);

  const handleGradeCard = useCallback((quality: 0 | 1 | 2 | 3) => {
    engine.gradeCard(quality);
  }, [engine]);

  const handleNextCard = useCallback(() => {
    engine.nextCard();
    if (engine.session.state.phase === 'complete') {
      const results = engine.getSessionResults();
      setSessionResults(results);
      setStudyActive(false);
      navigate('results');
    }
  }, [engine, navigate]);

  const handleQuitSession = useCallback(() => {
    engine.session.reset();
    setStudyActive(false);
    goHome();
  }, [engine, goHome]);

  const handleAnotherSession = useCallback(() => {
    engine.session.reset();
    setSessionResults(null);
    navigate('study');
  }, [engine, navigate]);

  const handleBackHome = useCallback(() => {
    engine.session.reset();
    setSessionResults(null);
    setStudyActive(false);
    goHome();
  }, [engine, goHome]);

  if (!engine.isLoaded) {
    return (
      <div className="app-layout">
        <main className="main-content">
          <div className="main-content-center">
            <div className="empty-state">
              <p>Loading vocabulary...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Render main content based on route
  function renderContent() {
    // Active study session takes priority
    if (studyActive && route.type === 'study') {
      const item = engine.session.currentItem;
      if (!item) {
        return (
          <div className="empty-state">
            <p>Preparing next card...</p>
          </div>
        );
      }
      const word = engine.getWordForItem(item.srsItem);
      if (!word) {
        engine.nextCard();
        return null;
      }
      return (
        <ActiveSession
          currentItem={item}
          progress={engine.session.progress}
          word={word}
          allWords={engine.allWords}
          onGrade={handleGradeCard}
          onNext={handleNextCard}
          onQuit={handleQuitSession}
        />
      );
    }

    switch (route.type) {
      case 'home':
        return (
          <HomePage
            bands={vocabBands}
            bandStats={engine.bandStats}
            dueCount={dueCount}
            masteredCount={masteredCount}
            totalCount={totalCount}
            onNavigate={handleNavigate}
          />
        );

      case 'band':
        return (
          <BandOverview
            bandId={route.bandId}
            initialPos={route.pos}
            bandStats={engine.bandStats}
            onNavigate={handleNavigate}
            onGoHome={goHome}
          />
        );

      case 'word': {
        const word = wordById.get(route.wordId);
        if (!word) {
          return (
            <div className="empty-state">
              <h2>Word Not Found</h2>
              <p>The word &ldquo;{route.wordId}&rdquo; could not be found.</p>
              <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={goHome}>
                Go Home
              </button>
            </div>
          );
        }
        return (
          <WordView
            word={word}
            vocabItems={engine.vocabItems}
            onNavigate={handleNavigate}
            onGoHome={goHome}
          />
        );
      }

      case 'study':
        return (
          <StudyConfig
            onStart={handleStartSession}
            onBack={goHome}
            dueCount={dueCount}
          />
        );

      case 'results':
        return sessionResults ? (
          <SessionResults
            results={sessionResults}
            onContinue={handleAnotherSession}
            onDone={handleBackHome}
          />
        ) : (
          <div className="empty-state">
            <h2>No Results</h2>
            <p>Complete a study session to see your results.</p>
            <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={goHome}>
              Go Home
            </button>
          </div>
        );

      case 'notFound':
        return (
          <div className="empty-state">
            <h2>Page Not Found</h2>
            <p>The page &ldquo;{route.slug}&rdquo; could not be found.</p>
            <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={goHome}>
              Go Home
            </button>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className={`app-layout ${sidebar.layoutClass}`}>
      <HamburgerButton onClick={sidebar.openDrawer} />

      <Sidebar
        activeSlug={slug}
        query={query}
        searchResults={results}
        onQueryChange={setQuery}
        onClearSearch={clearSearch}
        onNavigate={handleNavigate}
        onGoHome={goHome}
        sidebarOpen={sidebar.drawerOpen}
        onCloseSidebar={sidebar.closeDrawer}
        viewMode={viewMode}
        onViewChange={handleViewChange}
        bands={vocabBands}
        bandStats={engine.bandStats}
        masteredCount={masteredCount}
        dueCount={dueCount}
        totalCount={totalCount}
        isCollapsed={sidebar.collapsed}
        onToggleCollapse={sidebar.toggleCollapse}
      />

      <main className="main-content" ref={mainRef}>
        <div className="main-content-center">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
