import { useEffect, useRef, useCallback } from 'react';
import { usePersistedState, useSidebarState } from '@arabtools/core';
import { useHashRouter } from '../hooks/useHashRouter';
import { useSearch } from '../hooks/useSearch';
import type { ViewMode } from '../data/view-data';
import { getTopicsForView, getTopicMapForView, getCategoriesForView } from '../data/view-data';
import { Sidebar, HamburgerButton } from './Sidebar';
import { HomePage } from './HomePage';
import { TopicView } from './TopicView';

export function SarfNavigator() {
  const { slug, navigate, goHome } = useHashRouter();
  const sidebar = useSidebarState('sarf-nav');
  const [visitedPages, setVisitedPages] = usePersistedState<string[]>('arabtools-sarf-visited', []);
  const [viewMode, setViewMode] = usePersistedState<ViewMode>('arabtools-sarf-view', 'classic');
  const mainRef = useRef<HTMLDivElement>(null);

  // Derive active data from view mode
  const activeTopics = getTopicsForView(viewMode);
  const activeTopicMap = getTopicMapForView(viewMode);
  const activeCategories = getCategoriesForView(viewMode);

  const { query, setQuery, results, clearSearch } = useSearch(activeTopics, activeCategories);

  // Resolve current topic
  const topic = slug ? activeTopicMap[slug] ?? null : null;

  // Navigate home if current slug doesn't exist in new view
  useEffect(() => {
    if (slug && !activeTopicMap[slug]) {
      goHome();
    }
  }, [viewMode, slug, activeTopicMap, goHome]);

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
  }, [navigate, sidebar.closeDrawer]);

  const handleViewChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, [setViewMode]);

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
        viewMode={viewMode}
        onViewChange={handleViewChange}
        categories={activeCategories}
        allTopics={activeTopics}
        topicMap={activeTopicMap}
      />

      <main className="main-content" ref={mainRef}>
        <div className="main-content-center">
          {!slug ? (
            <HomePage categories={activeCategories} allTopics={activeTopics} onNavigate={handleNavigate} />
          ) : topic ? (
            <TopicView topic={topic} categories={activeCategories} onNavigate={handleNavigate} onGoHome={goHome} />
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
