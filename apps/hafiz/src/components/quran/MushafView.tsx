import { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Languages } from 'lucide-react';
import { expandRubToAyahs } from '@arabtools/data';
import { getPagesForRub, getPageForAyah } from '../../data/ayah-page-map';
import { preloadQCFFonts } from '../../services/qcfFontLoader';
import { preloadWordData } from '../../hooks/useWordData';
import { useTranslations } from '../../hooks/useTranslations';
import { MushafPage } from './MushafPage';

const TRANSLATION_KEY = 'arabtools-hafiz-show-translation';

interface MushafViewProps {
  rubId: number;
  currentAyah: { surah: number; ayah: number } | null;
  onAyahClick: (surah: number, ayah: number) => void;
}

export function MushafView({ rubId, currentAyah, onAyahClick }: MushafViewProps) {
  const pages = useMemo(() => getPagesForRub(rubId), [rubId]);
  const [pageIndex, setPageIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(
    () => localStorage.getItem(TRANSLATION_KEY) === 'true',
  );

  const { loaded: translationsLoaded, getTranslation } = useTranslations(showTranslation);

  // Build Set of rub ayah keys for dimming
  const rubAyahKeys = useMemo(() => {
    const ayahs = expandRubToAyahs(rubId);
    return new Set(ayahs.map((a) => `${a.surah}:${a.ayah}`));
  }, [rubId]);

  // Get unique surah numbers for this rub
  const surahNums = useMemo(() => {
    const ayahs = expandRubToAyahs(rubId);
    return [...new Set(ayahs.map((a) => a.surah))];
  }, [rubId]);

  // Preload word data for the rub's surahs
  useEffect(() => {
    preloadWordData(surahNums);
  }, [surahNums]);

  // Persist translation toggle
  useEffect(() => {
    localStorage.setItem(TRANSLATION_KEY, String(showTranslation));
  }, [showTranslation]);

  // Reset to first page when rubId changes
  useEffect(() => {
    setPageIndex(0);
  }, [rubId]);

  // Auto-navigate to page containing currentAyah when audio plays
  useEffect(() => {
    if (!currentAyah) return;
    const targetPage = getPageForAyah(currentAyah.surah, currentAyah.ayah);
    if (targetPage <= 0) return;
    const idx = pages.indexOf(targetPage);
    if (idx !== -1 && idx !== pageIndex) {
      setPageIndex(idx);
    }
  }, [currentAyah, pages]); // eslint-disable-line react-hooks/exhaustive-deps

  // Preload adjacent page fonts + adjacent rub fonts
  useEffect(() => {
    const toPreload: number[] = [];
    if (pageIndex > 0) toPreload.push(pages[pageIndex - 1]);
    if (pageIndex < pages.length - 1) toPreload.push(pages[pageIndex + 1]);
    if (rubId > 1) toPreload.push(...getPagesForRub(rubId - 1));
    if (rubId < 240) toPreload.push(...getPagesForRub(rubId + 1));
    if (toPreload.length > 0) preloadQCFFonts(toPreload);
  }, [rubId, pageIndex, pages]);

  // Keyboard navigation: ArrowLeft = next page, ArrowRight = prev page (RTL)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setPageIndex((i) => Math.min(i + 1, pages.length - 1));
      } else if (e.key === 'ArrowRight') {
        setPageIndex((i) => Math.max(i - 1, 0));
      }
    },
    [pages.length],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const currentPage = pages[pageIndex];
  if (!currentPage) return null;

  return (
    <div className="mushaf-view-wrapper">
      <div className="mushaf-view-toolbar">
        <button
          className={`translation-toggle${showTranslation ? ' active' : ''}`}
          onClick={() => setShowTranslation((v) => !v)}
          title={showTranslation ? 'Hide translation' : 'Show translation'}
        >
          <Languages size={16} />
          <span>Translation</span>
        </button>
      </div>
      <div className="mushaf-nav">
        <button
          className="mushaf-nav-btn"
          onClick={() => setPageIndex((i) => Math.max(i - 1, 0))}
          disabled={pageIndex === 0}
          aria-label="Previous page"
        >
          <ChevronRight size={20} />
        </button>

        <div className="mushaf-nav-page">
          <MushafPage
            pageNumber={currentPage}
            currentAyah={currentAyah}
            onAyahClick={onAyahClick}
            rubAyahKeys={rubAyahKeys}
            showTranslation={showTranslation && translationsLoaded}
            getTranslation={getTranslation}
          />
          <div className="mushaf-page-indicator">
            Page {pageIndex + 1} of {pages.length}
          </div>
        </div>

        <button
          className="mushaf-nav-btn"
          onClick={() => setPageIndex((i) => Math.min(i + 1, pages.length - 1))}
          disabled={pageIndex === pages.length - 1}
          aria-label="Next page"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
    </div>
  );
}
