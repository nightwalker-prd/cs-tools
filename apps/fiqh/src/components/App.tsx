import { useState, useEffect, useRef, useCallback } from 'react';
import { usePersistedState, useSidebarState } from '@arabtools/core';
import { useHashRouter } from '../hooks/useHashRouter';
import { useSearch } from '../hooks/useSearch';
import {
  loadKitabIndex, getKitabIndex,
  loadKitab, loadTerms, getTerms,
  loadTopics, getTopics,
} from '../data/kitab-loader';
import { CATEGORIES } from '../data/categories';
import type { Kitab, Masalah, ViewMode, Bookmark, Annotation } from '../types';
import { Sidebar, HamburgerButton } from './Sidebar';
import { HomePage } from './HomePage';
import { KitabReader } from './KitabReader';
import { TopicView } from './TopicView';
import { GlossaryPage } from './GlossaryPage';
import { QuizMode } from './QuizMode';

export default function App() {
  const {
    route, navigateToKitab, navigateToSection,
    navigateToTopic, navigateToGlossary, navigateToQuiz, goHome,
  } = useHashRouter();

  const sidebar = useSidebarState('fiqh');
  const [indexReady, setIndexReady] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Persisted state
  const [viewMode, setViewMode] = usePersistedState<ViewMode>('arabtools-fiqh-view', 'reader');
  const [visitedSections, setVisitedSections] = usePersistedState<string[]>('arabtools-fiqh-visited', []);
  const [bookmarks, setBookmarks] = usePersistedState<Bookmark[]>('arabtools-fiqh-bookmarks', []);
  const [annotations, setAnnotations] = usePersistedState<Annotation[]>('arabtools-fiqh-annotations', []);

  // Loaded data
  const [currentKitab, setCurrentKitab] = useState<Kitab | null>(null);
  const [kitabLoading, setKitabLoading] = useState(false);

  // Load index + terms + topics on mount
  useEffect(() => {
    Promise.all([loadKitabIndex(), loadTerms(), loadTopics()]).then(() => {
      setIndexReady(true);
    });
  }, []);

  // Load kitab when route changes to kitab/section
  useEffect(() => {
    if ((route.type === 'kitab' || route.type === 'section') && route.kitabId) {
      setKitabLoading(true);
      loadKitab(route.kitabId).then(k => {
        setCurrentKitab(k ?? null);
        setKitabLoading(false);
      });
    }
  }, [route.type, route.kitabId]);

  // Track visited sections
  useEffect(() => {
    if (route.type === 'section' && route.kitabId && route.babId) {
      const key = `${route.kitabId}/${route.babId}`;
      if (!visitedSections.includes(key)) {
        setVisitedSections([...visitedSections, key]);
      }
    }
  }, [route, visitedSections, setVisitedSections]);

  // Scroll to top on route change
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [route.type, route.kitabId, route.babId, route.topicId]);

  // Search
  const index = getKitabIndex();
  const terms = getTerms();
  const topics = getTopics();
  const { query, setQuery, results, clearSearch } = useSearch(index, terms, topics, viewMode);

  // Callbacks
  const handleNavigateKitab = useCallback((id: string) => {
    navigateToKitab(id);
    sidebar.closeDrawer();
  }, [navigateToKitab, sidebar]);

  const handleNavigateSection = useCallback((kitabId: string, babId: string) => {
    navigateToSection(kitabId, babId);
    sidebar.closeDrawer();
  }, [navigateToSection, sidebar]);

  const handleNavigateTopic = useCallback((id: string) => {
    navigateToTopic(id);
    sidebar.closeDrawer();
  }, [navigateToTopic, sidebar]);

  const handleNavigateCategory = useCallback((categoryId: string) => {
    const cat = CATEGORIES.find(c => c.id === categoryId);
    if (cat && cat.kitabIds.length > 0) {
      const firstKitab = index.find(k => cat.kitabIds.includes(k.id));
      if (firstKitab) {
        navigateToKitab(firstKitab.id);
      }
    }
  }, [index, navigateToKitab]);

  const handleSearchSelect = useCallback((result: { type: string; id: string }) => {
    if (result.type === 'kitab') navigateToKitab(result.id);
    else if (result.type === 'term') navigateToGlossary();
    else if (result.type === 'topic') navigateToTopic(result.id);
    sidebar.closeDrawer();
  }, [navigateToKitab, navigateToGlossary, navigateToTopic, sidebar]);

  const handleToggleBookmark = useCallback((targetId: string, targetType: 'section' | 'masalah') => {
    setBookmarks(prev => {
      const existing = prev.find(b => b.targetId === targetId);
      if (existing) return prev.filter(b => b.targetId !== targetId);
      return [...prev, {
        id: `bk-${Date.now()}`,
        targetId,
        targetType,
        createdAt: Date.now(),
      }];
    });
  }, [setBookmarks]);

  const handleSaveAnnotation = useCallback((sectionId: string, text: string) => {
    setAnnotations(prev => {
      const existing = prev.find(a => a.sectionId === sectionId);
      if (!text && existing) return prev.filter(a => a.sectionId !== sectionId);
      if (existing) {
        return prev.map(a => a.sectionId === sectionId
          ? { ...a, text, updatedAt: Date.now() }
          : a
        );
      }
      if (!text) return prev;
      return [...prev, {
        id: `an-${Date.now()}`,
        sectionId,
        text,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }];
    });
  }, [setAnnotations]);

  // Get topic data for TopicView
  const currentTopic = route.type === 'topic' && route.topicId
    ? topics.find(t => t.id === route.topicId)
    : undefined;

  // Load masail for active topic
  const [topicMasail, setTopicMasail] = useState<Masalah[]>([]);
  useEffect(() => {
    if (!currentTopic) {
      setTopicMasail([]);
      return;
    }
    if (currentTopic.masailIds.length === 0) {
      setTopicMasail([]);
      return;
    }
    // Derive the kitab ID from the topic's own ID (topic IDs are bab IDs like "taharah-bab-1")
    const kitabId = currentTopic.tags?.[0] || currentTopic.id.split('-bab-')[0].split('-intro')[0].split('-main')[0];
    loadKitab(kitabId).then(k => {
      if (!k) { setTopicMasail([]); return; }
      const masail: Masalah[] = [];
      const targetIds = new Set(currentTopic.masailIds);
      for (const bab of k.abwab) {
        for (const section of bab.sections) {
          for (const m of section.masail) {
            if (targetIds.has(m.id)) {
              masail.push(m);
            }
          }
        }
      }
      setTopicMasail(masail);
    });
  }, [currentTopic]);

  return (
    <div className={`app-layout ${sidebar.layoutClass}`}>
      <HamburgerButton onClick={sidebar.openDrawer} />

      <Sidebar
        index={index}
        terms={terms}
        topics={topics}
        viewMode={viewMode}
        onViewChange={setViewMode}
        activeKitabId={route.kitabId ?? null}
        activeTopicId={route.topicId ?? null}
        visitedSections={visitedSections}
        bookmarkCount={bookmarks.length}
        searchQuery={query}
        searchResults={results}
        onSearchChange={setQuery}
        onSearchSelect={handleSearchSelect}
        onSearchClear={clearSearch}
        onNavigateKitab={handleNavigateKitab}
        onNavigateTopic={handleNavigateTopic}
        onGoHome={goHome}
        onNavigateGlossary={navigateToGlossary}
        onNavigateQuiz={navigateToQuiz}
        sidebarOpen={sidebar.drawerOpen}
        onCloseSidebar={sidebar.closeDrawer}
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
            <HomePage
              index={index}
              onNavigateCategory={handleNavigateCategory}
            />
          )}

          {indexReady && (route.type === 'kitab' || route.type === 'section') && (
            kitabLoading ? (
              <div className="loading-state">
                <div className="loading-spinner" />
                <p>Loading kitab...</p>
              </div>
            ) : currentKitab ? (
              <KitabReader
                kitab={currentKitab}
                activeBabId={route.babId}
                terms={terms}
                bookmarks={bookmarks}
                annotations={annotations}
                onToggleBookmark={handleToggleBookmark}
                onSaveAnnotation={handleSaveAnnotation}
                onGoHome={goHome}
                onNavigateSection={handleNavigateSection}
              />
            ) : (
              <div className="empty-state">
                <h2>Kitab Not Found</h2>
                <p>The book could not be found.</p>
                <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={goHome}>Go Home</button>
              </div>
            )
          )}

          {indexReady && route.type === 'topic' && currentTopic && (
            <TopicView
              topic={currentTopic}
              masail={topicMasail}
              relatedTopics={topics.filter(t => currentTopic.relatedTopicIds?.includes(t.id))}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              onGoHome={goHome}
              onNavigateTopic={handleNavigateTopic}
              onViewSource={handleNavigateSection}
            />
          )}

          {indexReady && route.type === 'topic' && !currentTopic && route.topicId && (
            <div className="empty-state">
              <h2>Topic Not Found</h2>
              <p>The topic could not be found.</p>
              <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={goHome}>Go Home</button>
            </div>
          )}

          {indexReady && route.type === 'glossary' && (
            <GlossaryPage terms={terms} onGoHome={goHome} />
          )}

          {indexReady && route.type === 'quiz' && (
            <QuizMode
              index={index}
              loadKitab={loadKitab}
              onGoHome={goHome}
            />
          )}
        </div>
      </main>
    </div>
  );
}
