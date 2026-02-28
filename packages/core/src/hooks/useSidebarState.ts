import { useState, useCallback, useEffect } from 'react';
import { usePersistedState } from './usePersistedState';

export interface SidebarState {
  collapsed: boolean;
  drawerOpen: boolean;
  toggleCollapse: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  layoutClass: string;
  sidebarClass: string;
  overlayVisible: boolean;
}

export function useSidebarState(appKey: string): SidebarState {
  const [collapsed, setCollapsed] = usePersistedState(
    `${appKey}-sidebar-collapsed`,
    false
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleCollapse = useCallback(() => {
    setCollapsed((prev: boolean) => !prev);
    setDrawerOpen(false);
  }, [setCollapsed]);

  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  // Keyboard shortcut: Ctrl+B / Cmd+B
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable) {
          return;
        }
        e.preventDefault();
        if (collapsed) {
          if (drawerOpen) {
            setDrawerOpen(false);
          } else {
            setDrawerOpen(true);
          }
        } else {
          setCollapsed(true);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [collapsed, drawerOpen, setCollapsed]);

  return {
    collapsed,
    drawerOpen,
    toggleCollapse,
    openDrawer,
    closeDrawer,
    layoutClass: collapsed ? 'sidebar-collapsed' : '',
    sidebarClass: drawerOpen ? 'open' : '',
    overlayVisible: collapsed && drawerOpen,
  };
}
