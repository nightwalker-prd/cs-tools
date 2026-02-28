import { Home, BookOpen, Trophy, Heart } from 'lucide-react';
import type { RouteType } from '../types';

interface NavigationProps {
  currentRoute: RouteType;
  navigate: (hash: string) => void;
  goHome: () => void;
  favoriteCount: number;
}

const tabs = [
  { id: 'home' as const, label: 'Home', icon: Home, hash: '' },
  { id: 'browse' as const, label: 'Browse', icon: BookOpen, hash: 'browse' },
  { id: 'quiz' as const, label: 'Quiz', icon: Trophy, hash: 'quiz' },
  { id: 'favorites' as const, label: 'Favorites', icon: Heart, hash: 'favorites' },
];

function isTabActive(tabId: string, route: RouteType): boolean {
  if (tabId === 'home') return route === 'home';
  if (tabId === 'browse') return route === 'browse' || route === 'browse-category' || route === 'proverb';
  if (tabId === 'quiz') return route === 'quiz' || route === 'quiz-session';
  if (tabId === 'favorites') return route === 'favorites';
  return false;
}

export function Navigation({ currentRoute, navigate, goHome, favoriteCount }: NavigationProps) {
  return (
    <nav className="top-nav">
      <div className="top-nav-inner">
        <button className="nav-brand" onClick={goHome}>
          <div className="nav-brand-icon">أ</div>
          <div className="nav-brand-text">
            <h1>Amthal</h1>
            <span className="subtitle">أمثال عربية</span>
          </div>
        </button>

        <div className="nav-tabs">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const active = isTabActive(tab.id, currentRoute);
            return (
              <button
                key={tab.id}
                className={`nav-tab ${active ? 'active' : ''}`}
                onClick={() => tab.hash ? navigate(tab.hash) : goHome()}
              >
                <Icon size={18} />
                <span className="nav-tab-label">
                  {tab.label}
                  {tab.id === 'favorites' && favoriteCount > 0 && ` (${favoriteCount})`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
