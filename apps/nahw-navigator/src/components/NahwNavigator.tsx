import { useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { usePersistedState, useSidebarState } from '@arabtools/core';
import { Loader2 } from 'lucide-react';
import { useHashRouter } from '../hooks/useHashRouter';
import { useSearch } from '../hooks/useSearch';
import type { ViewMode } from '../data/view-data';
import type { Difficulty } from '../data/types';
import type { ResourceInfo } from '../data/video-mapping';
import { getTopicsForView, getTopicMapForView, getCategoriesForView } from '../data/view-data';
import { getResourcesForDifficulty } from '../data/video-mapping';
import { PDF_PAGE_KEY_PREFIX } from '../config/pdf';
import { Sidebar, HamburgerButton } from './Sidebar';
import { HomePage } from './HomePage';
import { TopicView } from './TopicView';
import { SplitPane } from './SplitPane';

const PdfViewer = lazy(() => import('./PdfViewer').then(m => ({ default: m.PdfViewer })));

export function NahwNavigator() {
  const { slug, navigate, goHome } = useHashRouter();
  const sidebar = useSidebarState('nahw-nav');
  const [visitedPages, setVisitedPages] = usePersistedState<string[]>('arabtools-nahw-visited', []);
  const [viewMode, setViewMode] = usePersistedState<ViewMode>('arabtools-nahw-view', 'classic');
  const [activeLevel, setActiveLevel] = usePersistedState<Difficulty>('arabtools-nahw-level', 'beginner');
  const [activePdfUrl, setActivePdfUrl] = usePersistedState<string | null>('arabtools-nahw-active-pdf', null);
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
  }, [navigate, sidebar]);

  const handleViewChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, [setViewMode]);

  // For classic mode: auto-update PDF when difficulty changes
  const effectiveLevel = topic
    ? (topic.levels.some(l => l.difficulty === activeLevel) ? activeLevel : topic.levels[0].difficulty)
    : activeLevel;
  const classicRes = getResourcesForDifficulty(effectiveLevel);

  // If PDF is open in classic mode, keep it synced to the current difficulty's textbook
  useEffect(() => {
    if (viewMode === 'classic' && activePdfUrl && activePdfUrl.startsWith('/textbooks/')) {
      // Only auto-update if it's a classic textbook (not an FSTU one)
      const classicUrls = ['/textbooks/as-sugra.pdf', '/textbooks/al-wusta.pdf', '/textbooks/al-kubra.pdf'];
      if (classicUrls.includes(activePdfUrl)) {
        setActivePdfUrl(classicRes.pdfUrl);
      }
    }
  }, [viewMode, classicRes.pdfUrl, activePdfUrl, setActivePdfUrl]);

  const handleSelectPdf = useCallback((resource: ResourceInfo) => {
    setActivePdfUrl(prev => prev === resource.pdfUrl ? null : resource.pdfUrl);
  }, [setActivePdfUrl]);

  // Derive pageKey from active PDF URL
  const pdfUrl = activePdfUrl ?? classicRes.pdfUrl;
  const textbookSlug = pdfUrl.replace('/textbooks/', '').replace('.pdf', '');
  const pageKey = PDF_PAGE_KEY_PREFIX + textbookSlug;

  // Should we show the split pane?
  const splitActive = !!activePdfUrl && !!topic;

  const topicContent = (
    <div className="main-content-center">
      {!slug ? (
        <HomePage categories={activeCategories} allTopics={activeTopics} onNavigate={handleNavigate} />
      ) : topic ? (
        <TopicView
          topic={topic}
          categories={activeCategories}
          onNavigate={handleNavigate}
          onGoHome={goHome}
          showResources
          activeLevel={activeLevel}
          onChangeLevel={setActiveLevel}
          viewMode={viewMode}
          activePdfUrl={activePdfUrl}
          onSelectPdf={handleSelectPdf}
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
  );

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

      <main className={`main-content${splitActive ? ' has-split-pane' : ''}`} ref={mainRef}>
        {splitActive ? (
          <SplitPane
            pdfPane={
              <Suspense
                fallback={
                  <div className="pdf-loading">
                    <Loader2 size={32} className="pdf-spinner" />
                    <p>Loading viewer...</p>
                  </div>
                }
              >
                <PdfViewer pdfUrl={pdfUrl} pageKey={pageKey} />
              </Suspense>
            }
            exercisePane={topicContent}
          />
        ) : (
          topicContent
        )}
      </main>
    </div>
  );
}
