import { useSidebarState } from '@arabtools/core';
import type { TestType } from '../types';
import { Sidebar, HamburgerButton } from './Sidebar';

interface LayoutProps {
  activeType: TestType | null;
  onNavigate: (type: TestType) => void;
  onGoHome: () => void;
  children: React.ReactNode;
}

export function Layout({ activeType, onNavigate, onGoHome, children }: LayoutProps) {
  const sidebar = useSidebarState('nation-test');

  return (
    <div className={`app-layout ${sidebar.layoutClass}`}>
      <HamburgerButton onClick={sidebar.openDrawer} />

      <Sidebar
        activeType={activeType}
        onNavigate={(type) => { onNavigate(type); sidebar.closeDrawer(); }}
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
