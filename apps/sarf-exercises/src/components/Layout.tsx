import { useSidebarState } from '@arabtools/core';
import type { Route } from '../hooks/useHashRouter';
import type { SarfSrsState } from '../hooks/useSarfSrs';
import { Sidebar, HamburgerButton } from './Sidebar';

interface LayoutProps {
  route: Route;
  onNavigate: (route: Route) => void;
  onGoHome: () => void;
  srs: SarfSrsState;
  showPdf: boolean;
  onTogglePdf: () => void;
  children: React.ReactNode;
}

export function Layout({ route, onNavigate, onGoHome, srs, showPdf, onTogglePdf, children }: LayoutProps) {
  const sidebar = useSidebarState('sarf-ex');

  return (
    <div className={`app-layout ${sidebar.layoutClass}`}>
      <HamburgerButton onClick={sidebar.openDrawer} />

      <Sidebar
        route={route}
        onNavigate={(r) => { onNavigate(r); sidebar.closeDrawer(); }}
        onGoHome={() => { onGoHome(); sidebar.closeDrawer(); }}
        sidebarOpen={sidebar.drawerOpen}
        onCloseSidebar={sidebar.closeDrawer}
        srs={srs}
        showPdf={showPdf}
        onTogglePdf={onTogglePdf}
        isCollapsed={sidebar.collapsed}
        onToggleCollapse={sidebar.toggleCollapse}
      />

      <main className={`main-content${showPdf ? ' has-split-pane' : ''}`}>
        {children}
      </main>
    </div>
  );
}
