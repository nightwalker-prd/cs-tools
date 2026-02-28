import { useSidebarState } from '@arabtools/core';
import type { GameType, GameCategory } from '../types';
import { Sidebar, HamburgerButton } from './Sidebar';

interface LayoutProps {
  activeGame: GameType | null;
  onNavigate: (category: GameCategory, gameId: GameType) => void;
  onGoHome: () => void;
  children: React.ReactNode;
}

export function Layout({ activeGame, onNavigate, onGoHome, children }: LayoutProps) {
  const sidebar = useSidebarState('dhakira');

  return (
    <div className={`app-layout ${sidebar.layoutClass}`}>
      <HamburgerButton onClick={sidebar.openDrawer} />

      <Sidebar
        activeGame={activeGame}
        onNavigate={(cat, id) => { onNavigate(cat, id); sidebar.closeDrawer(); }}
        onGoHome={() => { onGoHome(); sidebar.closeDrawer(); }}
        sidebarOpen={sidebar.drawerOpen}
        onCloseSidebar={sidebar.closeDrawer}
        isCollapsed={sidebar.collapsed}
        onToggleCollapse={sidebar.toggleCollapse}
      />

      <main className="main-content">
        <div className="main-content-center">{children}</div>
      </main>
    </div>
  );
}
