import { useEffect, useRef, useCallback } from 'react';
import { usePersistedState, useSidebarState } from '@arabtools/core';
import { useHashRouter } from '../hooks/useHashRouter';
import { useSearch } from '../hooks/useSearch';
import { textMap, collectionForText, getAllTexts } from '../data/navigation';
import { Sidebar, HamburgerButton } from './Sidebar';
import { HomePage } from './HomePage';
import { TextReader } from './TextReader';

export function ReadingApp() {
  const { slug, navigate, goHome } = useHashRouter();
  const sidebar = useSidebarState('reading');
  const [visitedPages, setVisitedPages] = usePersistedState<string[]>('arabtools-reading-visited', []);
  const mainRef = useRef<HTMLDivElement>(null);

  const allTexts = getAllTexts();
  const { query, setQuery, results, clearSearch } = useSearch(allTexts);

  // Resolve current text
  const text = slug ? textMap[slug] ?? null : null;
  const collection = slug ? collectionForText[slug] ?? null : null;

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

  const handleNavigate = useCallback((textId: string) => {
    navigate(textId);
    sidebar.closeDrawer();
  }, [navigate, sidebar]);

  // Get prev/next within collection
  const collectionTexts = collection?.texts ?? [];
  const currentIndex = text ? collectionTexts.findIndex(t => t.id === text.id) : -1;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < collectionTexts.length - 1;

  const handlePrevious = useCallback(() => {
    if (hasPrevious) navigate(collectionTexts[currentIndex - 1].id);
  }, [hasPrevious, collectionTexts, currentIndex, navigate]);

  const handleNext = useCallback(() => {
    if (hasNext) navigate(collectionTexts[currentIndex + 1].id);
  }, [hasNext, collectionTexts, currentIndex, navigate]);

  return (
    <div className={`app-layout ${sidebar.layoutClass}`}>
      <HamburgerButton onClick={sidebar.openDrawer} />

      <Sidebar
        activeTextId={slug}
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
      />

      <main className="main-content" ref={mainRef}>
        <div className="main-content-center">
          {!slug ? (
            <HomePage onNavigate={handleNavigate} />
          ) : text ? (
            <TextReader
              text={text}
              collection={collection!}
              onGoHome={goHome}
              onPrevious={handlePrevious}
              onNext={handleNext}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
              currentIndex={currentIndex}
              totalCount={collectionTexts.length}
            />
          ) : (
            <div className="empty-state">
              <h2>Text Not Found</h2>
              <p>The text &ldquo;{slug}&rdquo; could not be found.</p>
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
