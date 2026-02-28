import { useEffect, useRef, useCallback } from 'react';
import { useSidebarState } from '@arabtools/core';
import { useHashRouter } from '../hooks/useHashRouter';
import { useProgress } from '../hooks/useProgress';
import { COURSE_MAP } from '../data/catalog';
import { Sidebar, HamburgerButton } from './Sidebar';
import { HomePage } from './HomePage';
import { CourseView } from './CourseView';

export function Durus() {
  const { slug, navigate, goHome } = useHashRouter();
  const sidebar = useSidebarState('durus');
  const mainRef = useRef<HTMLDivElement>(null);

  const {
    toggleVideo,
    getWatchedSet,
    getWatchedCount,
    markAllWatched,
    clearProgress,
    totalWatched,
  } = useProgress();

  const course = slug ? COURSE_MAP[slug] ?? null : null;

  // Navigate home if slug doesn't match a valid course
  useEffect(() => {
    if (slug && !COURSE_MAP[slug]) {
      goHome();
    }
  }, [slug, goHome]);

  // Scroll to top on course change
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [slug]);

  const handleNavigate = useCallback(
    (courseId: string) => {
      navigate(courseId);
      sidebar.closeDrawer();
    },
    [navigate, sidebar]
  );

  const handleToggleVideo = useCallback(
    (videoId: string) => {
      if (course) toggleVideo(course.id, videoId);
    },
    [course, toggleVideo]
  );

  const handleMarkAllWatched = useCallback(() => {
    if (course) {
      markAllWatched(
        course.id,
        course.videos.map((v) => v.videoId)
      );
    }
  }, [course, markAllWatched]);

  const handleClearProgress = useCallback(() => {
    if (course) clearProgress(course.id);
  }, [course, clearProgress]);

  return (
    <div className={`app-layout ${sidebar.layoutClass}`}>
      <HamburgerButton onClick={sidebar.openDrawer} />

      <Sidebar
        activeCourseId={slug}
        getWatchedCount={getWatchedCount}
        onNavigate={handleNavigate}
        onGoHome={() => { goHome(); sidebar.closeDrawer(); }}
        sidebarOpen={sidebar.drawerOpen}
        onCloseSidebar={sidebar.closeDrawer}
        isCollapsed={sidebar.collapsed}
        onToggleCollapse={sidebar.toggleCollapse}
      />

      <main className="main-content" ref={mainRef}>
        {!slug ? (
          <HomePage
            getWatchedCount={getWatchedCount}
            totalWatched={totalWatched}
            onNavigate={handleNavigate}
          />
        ) : course ? (
          <CourseView
            course={course}
            watchedSet={getWatchedSet(course.id)}
            onToggleVideo={handleToggleVideo}
            onMarkAllWatched={handleMarkAllWatched}
            onClearProgress={handleClearProgress}
            onGoHome={goHome}
          />
        ) : (
          <div className="empty-state">
            <h2>Course Not Found</h2>
            <p>The course &ldquo;{slug}&rdquo; could not be found.</p>
            <button
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
              onClick={goHome}
            >
              Go Home
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
