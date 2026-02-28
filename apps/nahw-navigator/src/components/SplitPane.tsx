import { useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import { usePersistedState } from '@arabtools/core';
import { PANEL_WIDTH_KEY, PANEL_WIDTH_DEFAULT, PANEL_WIDTH_MIN, PANEL_WIDTH_MAX } from '../config/pdf';

interface SplitPaneProps {
  pdfPane: ReactNode;
  exercisePane: ReactNode;
}

export function SplitPane({ pdfPane, exercisePane }: SplitPaneProps) {
  const [panelWidth, setPanelWidth] = usePersistedState<number>(PANEL_WIDTH_KEY, PANEL_WIDTH_DEFAULT);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<'textbook' | 'content'>('content');
  const [isDragging, setIsDragging] = useState(false);
  const splitRef = useRef<HTMLDivElement>(null);

  // Detect mobile breakpoint
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 900px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    handler(mql);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Handle drag resize
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (clientX: number) => {
      const container = splitRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      const clamped = Math.max(PANEL_WIDTH_MIN, Math.min(PANEL_WIDTH_MAX, pct));
      setPanelWidth(Math.round(clamped));
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onEnd = () => setIsDragging(false);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchend', onEnd);

    // Prevent text selection while dragging
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchend', onEnd);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, setPanelWidth]);

  // Mobile: tab toggle
  if (isMobile) {
    return (
      <div className="split-pane-mobile">
        <div className="split-tab-bar">
          <button
            className={`split-tab ${activeTab === 'textbook' ? 'active' : ''}`}
            onClick={() => setActiveTab('textbook')}
          >
            Textbook
          </button>
          <button
            className={`split-tab ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            Content
          </button>
        </div>
        <div className="split-tab-content">
          {activeTab === 'textbook' ? pdfPane : exercisePane}
        </div>
      </div>
    );
  }

  // Desktop: resizable split
  return (
    <div
      className={`split-pane ${isDragging ? 'dragging' : ''}`}
      ref={splitRef}
      style={{ '--pdf-width': `${panelWidth}%` } as React.CSSProperties}
    >
      <div className="split-pane-left">
        {pdfPane}
      </div>
      <div
        className="split-pane-handle"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        role="separator"
        aria-label="Resize panels"
        tabIndex={0}
      >
        <div className="split-pane-handle-grip" />
      </div>
      <div className="split-pane-right">
        {exercisePane}
      </div>
    </div>
  );
}
