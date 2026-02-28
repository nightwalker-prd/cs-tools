import { useEffect, useRef, useCallback } from 'react';
import { usePersistedState, useSidebarState } from '@arabtools/core';
import { useHashRouter } from '../hooks/useHashRouter';
import { useSearch } from '../hooks/useSearch';
import { units } from '../data/units';
import { allTopics, topicMap } from '../data/topics';
import { Sidebar, HamburgerButton } from './Sidebar';
import { HomePage } from './HomePage';
import { TopicView } from './TopicView';

export function BalagahNavigator() {
  const { slug, navigate, goHome } = useHashRouter();
  const sidebar = useSidebarState('balagah-nav');
  const [visitedPages, setVisitedPages] = usePersistedState<string[]>('arabtools-balagah-visited', []);
  const mainRef = useRef<HTMLDivElement>(null);

  const { query, setQuery, results, clearSearch } = useSearch(allTopics, units);

  const topic = slug ? topicMap[slug] ?? null : null;

  // Track visited pages
  useEffect(() => {
    if (slug && !visitedPages.includes(slug)) {
      setVisitedPages([...visitedPages, slug]);
    }
  }, [slug, visitedPages, setVisitedPages]);

  // Scroll to top on page change
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
        activeSlug={slug}
        visitedPages={visitedPages}
        query={query}
        searchResults={results}
        onQueryChange={setQuery}
        onClearSearch={clearSearch}
        onNavigate={handleNavigate}
        onGoHome={goHome}
        sidebarOpen={sidebar.drawerOpen}
        onCloseSidebar={sidebar.closeDrawer}
        isCollapsed={sidebar.collapsed}
        onToggleCollapse={sidebar.toggleCollapse}
        units={units}
        allTopics={allTopics}
        topicMap={topicMap}
      />

      <main className="main-content" ref={mainRef}>
        <div className="main-content-center">
          {!slug ? (
            <HomePage units={units} allTopics={allTopics} onNavigate={handleNavigate} />
          ) : topic ? (
            <TopicView
              topic={topic}
              units={units}
              onNavigate={handleNavigate}
              onGoHome={goHome}
            />
          ) : (
            <div className="empty-state">
              <h2>Topic Not Found</h2>
              <p>The topic &ldquo;{slug}&rdquo; could not be found.</p>
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
