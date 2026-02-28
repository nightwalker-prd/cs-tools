import { useState, useEffect, useCallback, useRef, useMemo, Component, type ReactNode } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { PDF_URL, ZOOM_MIN, ZOOM_MAX, ZOOM_STEP, ZOOM_DEFAULT, NAV_IDLE_TIMEOUT } from '../config/pdf';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

/** Error boundary that auto-recovers instead of killing the app */
class PdfErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(_: unknown, prevState: { hasError: boolean }) {
    if (this.state.hasError && !prevState.hasError) {
      setTimeout(() => this.setState({ hasError: false }), 100);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="pdf-loading">
          <Loader2 size={24} className="pdf-spinner" />
        </div>
      );
    }
    return this.props.children;
  }
}

interface PdfViewerProps {
  targetPage: number;
}

export function PdfViewer({ targetPage }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(ZOOM_DEFAULT);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Double-buffer state
  const [pendingPage, setPendingPage] = useState<number>(targetPage);
  const [displayPage, setDisplayPage] = useState<number>(targetPage);
  const [activeSlot, setActiveSlot] = useState<'A' | 'B'>('A');
  const pendingPageRef = useRef<number>(targetPage);
  const [pageInput, setPageInput] = useState<string>(String(targetPage));

  // Slot page assignments
  const [slotAPage, setSlotAPage] = useState<number>(targetPage);
  const [slotBPage, setSlotBPage] = useState<number>(targetPage);

  // Floating nav auto-hide state
  const [navVisible, setNavVisible] = useState<boolean>(true);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Keep pendingPageRef in sync
  useEffect(() => {
    pendingPageRef.current = pendingPage;
  }, [pendingPage]);

  // When pendingPage changes and differs from displayPage, assign it to the buffer slot
  useEffect(() => {
    if (pendingPage !== displayPage) {
      if (activeSlot === 'A') {
        setSlotBPage(pendingPage);
      } else {
        setSlotAPage(pendingPage);
      }
    }
  }, [pendingPage, displayPage, activeSlot]);

  // Container resize observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Auto-jump when targetPage changes (exercise switch)
  useEffect(() => {
    if (targetPage >= 1 && (targetPage <= numPages || numPages === 0)) {
      setPendingPage(targetPage);
      setPageInput(String(targetPage));
    }
  }, [targetPage, numPages]);

  // Auto-hide navigation arrows on idle
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const showNav = () => {
      setNavVisible(true);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => setNavVisible(false), NAV_IDLE_TIMEOUT);
    };

    // Show initially then start timer
    showNav();

    container.addEventListener('touchstart', showNav, { passive: true });
    container.addEventListener('mousemove', showNav, { passive: true });
    container.addEventListener('scroll', showNav, { passive: true });

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      container.removeEventListener('touchstart', showNav);
      container.removeEventListener('mousemove', showNav);
      container.removeEventListener('scroll', showNav);
    };
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages: total }: { numPages: number }) => {
    setNumPages(total);
    setLoading(false);
    setError(null);
    setPendingPage(prev => prev > total ? total : prev);
    setDisplayPage(prev => prev > total ? total : prev);
    setPageInput(prev => {
      const n = parseInt(prev, 10);
      return n > total ? String(total) : prev;
    });
  }, []);

  const onDocumentLoadError = useCallback(() => {
    setError('Failed to load PDF textbook. Check your internet connection.');
    setLoading(false);
  }, []);

  const goToPage = useCallback((page: number) => {
    const clamped = Math.max(1, Math.min(page, numPages));
    setPendingPage(clamped);
    setPageInput(String(clamped));
  }, [numPages]);

  const handlePageInputSubmit = useCallback(() => {
    const parsed = parseInt(pageInput, 10);
    if (!isNaN(parsed)) {
      goToPage(parsed);
    } else {
      setPageInput(String(pendingPage));
    }
  }, [pageInput, goToPage, pendingPage]);

  const handleZoom = useCallback((delta: number) => {
    setZoom(prev => Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, +(prev + delta).toFixed(2))));
  }, []);

  const handleFitWidth = useCallback(() => {
    setZoom(ZOOM_DEFAULT);
  }, []);

  // Double-buffer swap handlers
  const handleSlotARenderSuccess = useCallback(() => {
    if (activeSlot === 'B' && slotAPage === pendingPageRef.current) {
      setActiveSlot('A');
      setDisplayPage(slotAPage);
    }
  }, [activeSlot, slotAPage]);

  const handleSlotBRenderSuccess = useCallback(() => {
    if (activeSlot === 'A' && slotBPage === pendingPageRef.current) {
      setActiveSlot('B');
      setDisplayPage(slotBPage);
    }
  }, [activeSlot, slotBPage]);

  const documentOptions = useMemo(() => ({
    cMapUrl: '/cmaps/',
    cMapPacked: true,
    standardFontDataUrl: '/standard_fonts/',
  }), []);

  const pageWidth = containerWidth > 0 ? containerWidth * zoom : undefined;

  return (
    <div className="pdf-viewer">
      {/* Toolbar — page input + zoom only, no nav arrows */}
      <div className="pdf-toolbar">
        <div className="pdf-toolbar-group">
          <div className="pdf-page-input-group">
            <input
              type="text"
              inputMode="numeric"
              className="pdf-page-input"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onBlur={handlePageInputSubmit}
              onKeyDown={(e) => e.key === 'Enter' && handlePageInputSubmit()}
              aria-label="Page number"
            />
            <span className="pdf-page-total">/ {numPages || '\u2014'}</span>
          </div>
        </div>

        <div className="pdf-toolbar-divider" />

        <div className="pdf-toolbar-group">
          <button
            className="pdf-toolbar-btn"
            onClick={() => handleZoom(-ZOOM_STEP)}
            disabled={zoom <= ZOOM_MIN}
            aria-label="Zoom out"
          >
            <ZoomOut size={16} />
          </button>

          <span className="pdf-zoom-label">{Math.round(zoom * 100)}%</span>

          <button
            className="pdf-toolbar-btn"
            onClick={() => handleZoom(ZOOM_STEP)}
            disabled={zoom >= ZOOM_MAX}
            aria-label="Zoom in"
          >
            <ZoomIn size={16} />
          </button>

          <button
            className="pdf-toolbar-btn"
            onClick={handleFitWidth}
            aria-label="Fit width"
            title="Fit width"
          >
            <Maximize size={16} />
          </button>
        </div>
      </div>

      {/* PDF Page Container */}
      <div className="pdf-page-container" ref={containerRef}>
        {error ? (
          <div className="pdf-error">
            <AlertTriangle size={32} />
            <p>{error}</p>
            <button className="btn" onClick={() => { setError(null); setLoading(true); }}>
              Retry
            </button>
          </div>
        ) : (
          <Document
            file={PDF_URL}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="pdf-loading">
                <Loader2 size={32} className="pdf-spinner" />
                <p>Loading textbook...</p>
              </div>
            }
            options={documentOptions}
          >
            <PdfErrorBoundary>
              <div className="pdf-page-wrapper">
                {/* Slot A */}
                <div
                  className={activeSlot === 'A' ? 'pdf-page-slot-active' : 'pdf-page-slot-buffer'}
                >
                  <Page
                    key="slot-a"
                    pageNumber={slotAPage}
                    width={pageWidth}
                    loading={null}
                    onRenderSuccess={handleSlotARenderSuccess}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </div>
                {/* Slot B */}
                <div
                  className={activeSlot === 'B' ? 'pdf-page-slot-active' : 'pdf-page-slot-buffer'}
                >
                  <Page
                    key="slot-b"
                    pageNumber={slotBPage}
                    width={pageWidth}
                    loading={null}
                    onRenderSuccess={handleSlotBRenderSuccess}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </div>
              </div>
            </PdfErrorBoundary>
          </Document>
        )}

        {/* Floating navigation arrows */}
        {numPages > 1 && (
          <>
            <button
              className={`pdf-nav-overlay pdf-nav-prev${!navVisible ? ' pdf-nav-hidden' : ''}`}
              onClick={() => goToPage(pendingPage - 1)}
              disabled={pendingPage <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`pdf-nav-overlay pdf-nav-next${!navVisible ? ' pdf-nav-hidden' : ''}`}
              onClick={() => goToPage(pendingPage + 1)}
              disabled={pendingPage >= numPages}
              aria-label="Next page"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {loading && !error && (
          <div className="pdf-loading-overlay">
            <Loader2 size={32} className="pdf-spinner" />
            <p>Loading textbook...</p>
          </div>
        )}
      </div>
    </div>
  );
}
