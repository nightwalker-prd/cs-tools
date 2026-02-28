import { useState, useEffect, useRef, useCallback } from 'react';
import { usePersistedState, useSidebarState } from '@arabtools/core';
import { useHashRouter } from './hooks/useHashRouter';
import { POETS } from './data/poets';
import { ERAS } from './data/eras';
import { loadPoemIndex, getPoemIndex, loadPoemsByPoet, loadPoemById, getPoemCountByPoet } from './data/poems';
import { Sidebar, HamburgerButton } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { PoetView } from './components/PoetView';
import { PoemReader } from './components/PoemReader';
import type { Poem } from './types';

export default function App() {
  const { route, navigateToPoet, navigateToPoem, goHome } = useHashRouter();
  const sidebar = useSidebarState('diwan');
  const [readPoems, setReadPoems] = usePersistedState<string[]>('arabtools-diwan-read', []);
  const mainRef = useRef<HTMLDivElement>(null);

  // Index loading
  const [indexReady, setIndexReady] = useState(false);

  // Poet poems (loaded on demand)
  const [poetPoems, setPoetPoems] = useState<Poem[]>([]);
  const [poetPoemsLoading, setPoetPoemsLoading] = useState(false);

  // Single poem (loaded on demand)
  const [currentPoem, setCurrentPoem] = useState<Poem | null>(null);
  const [poemLoading, setPoemLoading] = useState(false);

  // Load poem index on mount
  useEffect(() => {
    loadPoemIndex().then(() => setIndexReady(true));
  }, []);

  // Load poet poems when navigating to a poet
  useEffect(() => {
    if (route.type === 'poet' && route.id) {
      setPoetPoemsLoading(true);
      loadPoemsByPoet(route.id).then(poems => {
        setPoetPoems(poems);
        setPoetPoemsLoading(false);
      });
    }
  }, [route.type, route.id]);

  // Load poem when navigating to a poem
  useEffect(() => {
    if (route.type === 'poem' && route.id) {
      setPoemLoading(true);
      loadPoemById(route.id).then(poem => {
        setCurrentPoem(poem ?? null);
        setPoemLoading(false);
        // Also load that poet's poems for prev/next nav
        if (poem) {
          loadPoemsByPoet(poem.poetId).then(setPoetPoems);
        }
      });
    }
  }, [route.type, route.id]);

  // Track read poems
  useEffect(() => {
    if (route.type === 'poem' && route.id && !readPoems.includes(route.id)) {
      setReadPoems([...readPoems, route.id]);
    }
  }, [route, readPoems, setReadPoems]);

  // Scroll to top on route change
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [route.type, route.id]);

  const handleNavigatePoet = useCallback((poetId: string) => {
    navigateToPoet(poetId);
    sidebar.closeDrawer();
  }, [navigateToPoet, sidebar]);

  const handleNavigatePoem = useCallback((poemId: string) => {
    navigateToPoem(poemId);
    sidebar.closeDrawer();
  }, [navigateToPoem, sidebar]);

  // Get current poet
  const currentPoet = route.type === 'poet' && route.id ? POETS.find(p => p.id === route.id) : null;
  const poemPoet = currentPoem ? POETS.find(p => p.id === currentPoem.poetId) : null;

  // Prev/next within poet's poems
  const currentPoemIndex = currentPoem ? poetPoems.findIndex(p => p.id === currentPoem.id) : -1;

  const poemIndex = getPoemIndex();
  const totalPoems = poemIndex.length;

  return (
    <div className={`app-layout ${sidebar.layoutClass}`}>
      <HamburgerButton onClick={sidebar.openDrawer} />

      <Sidebar
        poets={POETS}
        eras={ERAS}
        poemCountByPoet={getPoemCountByPoet}
        readPoems={readPoems}
        activePoetId={currentPoet?.id ?? poemPoet?.id ?? null}
        onNavigatePoet={handleNavigatePoet}
        onGoHome={goHome}
        sidebarOpen={sidebar.drawerOpen}
        onCloseSidebar={sidebar.closeDrawer}
        totalPoems={totalPoems}
        isCollapsed={sidebar.collapsed}
        onToggleCollapse={sidebar.toggleCollapse}
      />

      <main className="main-content" ref={mainRef}>
        <div className="main-content-center">
          {!indexReady && (
            <div className="loading-state">
              <div className="loading-spinner" />
              <p>Loading library...</p>
            </div>
          )}
          {indexReady && route.type === 'home' && (
            <HomeView
              poets={POETS}
              eras={ERAS}
              totalPoems={totalPoems}
              poemCountByPoet={getPoemCountByPoet}
              onNavigatePoet={handleNavigatePoet}
            />
          )}
          {indexReady && route.type === 'poet' && currentPoet && (
            poetPoemsLoading ? (
              <div className="loading-state">
                <div className="loading-spinner" />
                <p>Loading poems...</p>
              </div>
            ) : (
              <PoetView
                poet={currentPoet}
                eras={ERAS}
                poems={poetPoems}
                onNavigatePoem={handleNavigatePoem}
                onGoHome={goHome}
              />
            )
          )}
          {indexReady && route.type === 'poem' && (
            poemLoading ? (
              <div className="loading-state">
                <div className="loading-spinner" />
                <p>Loading poem...</p>
              </div>
            ) : currentPoem && poemPoet ? (
              <PoemReader
                poem={currentPoem}
                poet={poemPoet}
                eras={ERAS}
                onGoHome={goHome}
                onNavigatePoet={() => handleNavigatePoet(poemPoet.id)}
                onPrevious={currentPoemIndex > 0 ? () => handleNavigatePoem(poetPoems[currentPoemIndex - 1].id) : undefined}
                onNext={currentPoemIndex < poetPoems.length - 1 ? () => handleNavigatePoem(poetPoems[currentPoemIndex + 1].id) : undefined}
                currentIndex={currentPoemIndex}
                totalCount={poetPoems.length}
              />
            ) : (
              <div className="empty-state">
                <h2>Poem Not Found</h2>
                <p>The poem could not be found.</p>
                <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={goHome}>Go Home</button>
              </div>
            )
          )}
          {indexReady && route.type === 'poet' && !currentPoet && (
            <div className="empty-state">
              <h2>Poet Not Found</h2>
              <p>The poet could not be found.</p>
              <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={goHome}>Go Home</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
