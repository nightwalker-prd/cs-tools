import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSidebarState } from '@arabtools/core';
import { useHashRouter } from '../hooks/useHashRouter';
import { useProgress } from '../hooks/useProgress';
import { useSearch } from '../hooks/useSearch';
import { UNITS } from '../data/units';
import { ALL_LESSONS } from '../data/lessons';
import { Sidebar, HamburgerButton } from './Sidebar';
import { HomePage } from './HomePage';
import { LessonView } from './LessonView';

export function InshaGuide() {
  const { slug, navigate, goHome } = useHashRouter();
  const sidebar = useSidebarState('insha-guide');
  const [query, setQuery] = useState('');
  const mainRef = useRef<HTMLDivElement>(null);
  const {
    data: progress, markLessonVisited, updateStreak,
    saveComposeDraft, markComposeCompleted, getComposeDraft, isComposeCompleted,
    saveFluencySession, getFluencyStats, getFluencySessions,
    ...progressActions
  } = useProgress();

  const searchResults = useSearch(ALL_LESSONS, query);

  const lessonMap = useMemo(() => {
    const map: Record<string, typeof ALL_LESSONS[number]> = {};
    for (const l of ALL_LESSONS) map[l.id] = l;
    return map;
  }, []);

  const currentLesson = slug ? lessonMap[slug] ?? null : null;
  const currentUnit = currentLesson
    ? UNITS.find(u => u.id === currentLesson.unitId) ?? null
    : null;

  // Track visited lessons and streak
  useEffect(() => {
    if (currentLesson) {
      markLessonVisited(currentLesson.id);
      updateStreak();
    }
  }, [currentLesson, markLessonVisited, updateStreak]);

  // Scroll to top on navigation
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [slug]);

  const handleNavigate = useCallback((newSlug: string) => {
    navigate(newSlug);
    sidebar.closeDrawer();
  }, [navigate, sidebar]);

  return (
    <div className={`app-layout ${sidebar.layoutClass}`}>
      <HamburgerButton onClick={sidebar.openDrawer} />

      <Sidebar
        units={UNITS}
        lessons={ALL_LESSONS}
        activeSlug={slug}
        progress={progress}
        query={query}
        searchResults={searchResults}
        onQueryChange={setQuery}
        onNavigate={handleNavigate}
        onGoHome={goHome}
        sidebarOpen={sidebar.drawerOpen}
        onCloseSidebar={sidebar.closeDrawer}
        isCollapsed={sidebar.collapsed}
        onToggleCollapse={sidebar.toggleCollapse}
      />

      <main className="main-content" ref={mainRef}>
        <div className="main-content-center">
          {!slug ? (
            <HomePage
              units={UNITS}
              lessons={ALL_LESSONS}
              progress={progress}
              onNavigate={handleNavigate}
            />
          ) : currentLesson && currentUnit ? (
            <LessonView
              lesson={currentLesson}
              unit={currentUnit}
              progress={progress}
              onGoHome={goHome}
              onMarkExerciseCompleted={progressActions.markExerciseCompleted}
              onMarkQuestionMastered={progressActions.markQuestionMastered}
              onSaveComposeDraft={saveComposeDraft}
              onMarkComposeCompleted={markComposeCompleted}
              getComposeDraft={getComposeDraft}
              isComposeCompleted={isComposeCompleted}
              onSaveFluencySession={saveFluencySession}
              getFluencyStats={getFluencyStats}
              getFluencySessions={getFluencySessions}
            />
          ) : (
            <div className="empty-state">
              <h2>Lesson Not Found</h2>
              <p>The lesson &ldquo;{slug}&rdquo; could not be found.</p>
              <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={goHome}>
                Go Home
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
