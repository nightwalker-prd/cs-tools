import { useSidebarState } from '@arabtools/core';
import { Sidebar, HamburgerButton } from './Sidebar';

interface LayoutProps {
  activeChallengeId: string | null;
  onNavigate: (id: string) => void;
  onGoHome: () => void;
  children: React.ReactNode;
}

export function Layout({ activeChallengeId, onNavigate, onGoHome, children }: LayoutProps) {
  const sidebar = useSidebarState('bina');

  return (
    <div className={`app-layout ${sidebar.layoutClass}`}>
      <HamburgerButton onClick={sidebar.openDrawer} />

      <Sidebar
        activeChallengeId={activeChallengeId}
        onNavigate={(id) => { onNavigate(id); sidebar.closeDrawer(); }}
        onGoHome={() => { onGoHome(); sidebar.closeDrawer(); }}
        sidebarOpen={sidebar.drawerOpen}
        onCloseSidebar={sidebar.closeDrawer}
        isCollapsed={sidebar.collapsed}
        onToggleCollapse={sidebar.toggleCollapse}
      />

      <main className="main-content">
        <div className="main-content-center">
          {children}
        </div>
      </main>
    </div>
  );
}
