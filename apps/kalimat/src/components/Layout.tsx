import { useSidebarState } from '@arabtools/core';
import { Sidebar } from './Sidebar';
import type { Route } from '@/types';

interface LayoutProps {
  route: Route;
  navigate: (path: string) => void;
  children: React.ReactNode;
}

export function Layout({ route, navigate, children }: LayoutProps) {
  const sidebar = useSidebarState('kalimat');

  return (
    <div className={`app-layout ${sidebar.layoutClass}`}>
      <button
        className="hamburger-btn"
        onClick={sidebar.openDrawer}
        aria-label="Open menu"
      >
        &#9776;
      </button>

      <Sidebar
        route={route}
        navigate={(path) => { navigate(path); sidebar.closeDrawer(); }}
        isOpen={sidebar.drawerOpen}
        onClose={sidebar.closeDrawer}
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
