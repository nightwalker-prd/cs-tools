import { useEffect, useRef, useCallback } from 'react';
import { usePersistedState, useSidebarState } from '@arabtools/core';
import { useHashRouter } from '../hooks/useHashRouter';
import { contentFiles } from '../data/content';
import { slugToFile } from '../data/navigation';
import { Sidebar, HamburgerButton } from './Sidebar';
import { ContentRenderer } from './ContentRenderer';
import { TableOfContents } from './TableOfContents';
import { HomePage } from './HomePage';

export function TarkibGuide() {
  const { slug, navigate, goHome } = useHashRouter();
  const sidebar = useSidebarState('tarkib-guide');
  const [visitedPages, setVisitedPages] = usePersistedState<string[]>('tarkib-guide-progress', []);
  const mainRef = useRef<HTMLDivElement>(null);

  // Resolve current content
  const fileKey = slug ? slugToFile[slug] : null;
  const markdown = fileKey ? contentFiles[fileKey] ?? null : null;

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
        onNavigate={handleNavigate}
        onGoHome={() => { goHome(); sidebar.closeDrawer(); }}
        sidebarOpen={sidebar.drawerOpen}
        onCloseSidebar={sidebar.closeDrawer}
        isCollapsed={sidebar.collapsed}
        onToggleCollapse={sidebar.toggleCollapse}
      />

      <main className="main-content" ref={mainRef}>
        <div className="main-content-center">
          {!slug ? (
            <HomePage onNavigate={handleNavigate} />
          ) : markdown ? (
            <div className="content-with-toc">
              <article className="prose-content animate-fade-in">
                <ContentRenderer markdown={markdown} />
              </article>
              <TableOfContents markdown={markdown} />
            </div>
          ) : (
            <div className="empty-state">
              <h2>Page Not Found</h2>
              <p>The page &ldquo;{slug}&rdquo; could not be found.</p>
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
