import { useEffect, useRef, useCallback } from 'react';
import { useSidebarState } from '@arabtools/core';
import { useHashRouter } from '../../hooks/useHashRouter';
import { useHafizTracker } from '../../hooks/useHafizTracker';
import { useSearch } from '../../hooks/useSearch';
import { Sidebar } from './Sidebar';
import { HamburgerButton } from './HamburgerButton';
import { HomePage } from '../tracker/HomePage';
import { RubDetailView } from '../tracker/RubDetailView';
import { RevisionSession } from '../revision/RevisionSession';
import { GamesPage } from '../games/GamesPage';
import { GameRouter } from '../games/GameRouter';
import { ChallengePage } from '../challenge/ChallengePage';
import { SettingsPage } from '../settings/SettingsPage';

export function HafizApp() {
  const { route, navigate, goHome } = useHashRouter();
  const tracker = useHafizTracker();
  const search = useSearch();
  const sidebar = useSidebarState('hafiz');
  const mainRef = useRef<HTMLDivElement>(null);

  // Scroll to top on route change
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [route]);

  const handleNavigateRub = useCallback((rubId: number) => {
    navigate(`rub-${rubId}`);
    sidebar.closeDrawer();
  }, [navigate, sidebar]);

  const renderContent = () => {
    switch (route.page) {
      case 'home':
        return (
          <HomePage
            rubs={tracker.rubs}
            stats={tracker.stats}
            dueCount={tracker.dueRubs.length}
            onSelectRub={handleNavigateRub}
            onStartRevision={() => navigate('revision')}
          />
        );
      case 'rub':
        return (
          <RubDetailView
            rubId={route.rubId}
            rubs={tracker.rubs}
            reciterId={tracker.settings.reciterId}
            onStartLearning={tracker.startLearning}
            onMarkMemorized={tracker.markMemorized}
            onResetRub={tracker.resetRub}
            onNavigateRub={handleNavigateRub}
            onReciterChange={(reciterId) => tracker.updateSettings({ reciterId })}
          />
        );
      case 'revision':
        return (
          <RevisionSession
            dueRubs={tracker.dueRubs}
            sessionSize={tracker.settings.revisionSessionSize}
            reciterId={tracker.settings.reciterId}
            onGrade={tracker.gradeRevision}
            onFinish={goHome}
          />
        );
      case 'games':
        return <GamesPage onSelectGame={(type) => navigate(`games/${type}`)} />;
      case 'game':
        return (
          <GameRouter
            gameType={route.gameType}
            rubs={tracker.rubs}
            onBack={() => navigate('games')}
          />
        );
      case 'challenge':
        return <ChallengePage />;
      case 'settings':
        return (
          <SettingsPage
            settings={tracker.settings}
            onUpdateSettings={tracker.updateSettings}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`app-layout ${sidebar.layoutClass}`}>
      <HamburgerButton onClick={sidebar.openDrawer} />

      <Sidebar
        stats={tracker.stats}
        rubs={tracker.rubs}
        activeRubId={route.page === 'rub' ? route.rubId : null}
        query={search.query}
        searchResults={search.results}
        onQueryChange={search.setQuery}
        onClearSearch={search.clearSearch}
        onSelectRub={handleNavigateRub}
        onGoHome={goHome}
        onNavigate={navigate}
        sidebarOpen={sidebar.drawerOpen}
        onCloseSidebar={sidebar.closeDrawer}
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
