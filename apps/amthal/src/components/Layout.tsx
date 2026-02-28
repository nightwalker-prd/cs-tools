import type { ReactNode } from 'react';
import { Navigation } from './Navigation';
import type { RouteType } from '../types';

interface LayoutProps {
  children: ReactNode;
  currentRoute: RouteType;
  navigate: (hash: string) => void;
  goHome: () => void;
  favoriteCount: number;
}

export function Layout({ children, currentRoute, navigate, goHome, favoriteCount }: LayoutProps) {
  return (
    <div className="app-shell">
      <Navigation
        currentRoute={currentRoute}
        navigate={navigate}
        goHome={goHome}
        favoriteCount={favoriteCount}
      />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
