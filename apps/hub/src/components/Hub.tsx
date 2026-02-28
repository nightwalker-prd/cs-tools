import { useState } from 'react';
import { usePersistedState, useSidebarState } from '@arabtools/core';
import { useHubPreferences } from '@/hooks/useHubPreferences';
import { Sidebar, HamburgerButton } from './Sidebar';
import { PinnedSection } from './PinnedSection';
import { CategorySection } from './CategorySection';
import { HiddenToolsDrawer } from './HiddenToolsDrawer';
import { RoadmapView } from './RoadmapView';
import { ProgressView } from './ProgressView';
import { JourneyView } from './journey/JourneyView';

type HubView = 'tools' | 'roadmap' | 'progress' | 'journey';

export function Hub() {
  const {
    pin,
    unpin,
    hide,
    unhide,
    pinnedTools,
    hiddenTools,
    visibleToolsByCategory,
    isPinned,
    hiddenCount,
  } = useHubPreferences();

  const sidebar = useSidebarState('hub');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeView, setActiveView] = usePersistedState<HubView>('arabtools-hub-view', 'tools');

  return (
    <div className={`app-layout ${sidebar.layoutClass}`}>
      <HamburgerButton onClick={sidebar.openDrawer} />

      <Sidebar
        sidebarOpen={sidebar.drawerOpen}
        onCloseSidebar={sidebar.closeDrawer}
        isPinned={isPinned}
        hiddenCount={hiddenCount}
        onShowHidden={() => setDrawerOpen(true)}
        isCollapsed={sidebar.collapsed}
        onToggleCollapse={sidebar.toggleCollapse}
      />

      <main className="main-content">
        <div className="main-content-center">
          <div className="animate-fade-in-up">
            <div className="hero">
              <h1 className="hero-title">Arab Tools</h1>
              <p className="hero-subtitle font-arabic" dir="rtl">أدوات العربية</p>
              <p className="hero-description">
                Your Arabic learning toolkit — grammar, morphology, vocabulary, reading, and more.
              </p>
            </div>
          </div>

          <div className="view-tabs">
            <button
              className={`view-tab ${activeView === 'tools' ? 'view-tab--active' : ''}`}
              onClick={() => setActiveView('tools')}
              type="button"
            >
              Tools
            </button>
            <button
              className={`view-tab ${activeView === 'roadmap' ? 'view-tab--active' : ''}`}
              onClick={() => setActiveView('roadmap')}
              type="button"
            >
              Roadmap
            </button>
            <button
              className={`view-tab ${activeView === 'progress' ? 'view-tab--active' : ''}`}
              onClick={() => setActiveView('progress')}
              type="button"
            >
              Progress
            </button>
            <button
              className={`view-tab ${activeView === 'journey' ? 'view-tab--active' : ''}`}
              onClick={() => setActiveView('journey')}
              type="button"
            >
              Journey
            </button>
          </div>

          {activeView === 'tools' ? (
            <>
              <PinnedSection tools={pinnedTools} onUnpin={unpin} onHide={hide} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {Array.from(visibleToolsByCategory.entries()).map(([category, tools]) => (
                  <CategorySection
                    key={category}
                    category={category}
                    tools={tools}
                    isPinned={isPinned}
                    onPin={pin}
                    onUnpin={unpin}
                    onHide={hide}
                  />
                ))}
              </div>
            </>
          ) : activeView === 'roadmap' ? (
            <RoadmapView />
          ) : activeView === 'progress' ? (
            <ProgressView />
          ) : (
            <JourneyView />
          )}
        </div>
      </main>

      <HiddenToolsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        tools={hiddenTools}
        onUnhide={unhide}
      />
    </div>
  );
}
