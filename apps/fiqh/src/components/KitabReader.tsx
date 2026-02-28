import { useState } from 'react';
import { Eye, BookOpen, FileText, Languages } from 'lucide-react';
import type { Kitab, FiqhTerm, Annotation, Bookmark as BookmarkType } from '../types';
import { getCategoryForKitab } from '../data/categories';
import { findSection, getAdjacentBab } from '../data/navigation';
import { Breadcrumb } from './Breadcrumb';
import { ArabicTextBlock } from './ArabicTextBlock';
import { MasalahCard } from './MasalahCard';
import { AnnotationPanel } from './AnnotationPanel';
import { PrevNextNav } from './PrevNextNav';
import { BookmarkButton } from './BookmarkButton';

interface KitabReaderProps {
  kitab: Kitab;
  activeBabId?: string;
  terms: FiqhTerm[];
  bookmarks: BookmarkType[];
  annotations: Annotation[];
  onToggleBookmark: (targetId: string, targetType: 'section' | 'masalah') => void;
  onSaveAnnotation: (sectionId: string, text: string) => void;
  onGoHome: () => void;
  onNavigateSection: (kitabId: string, babId: string) => void;
}

export function KitabReader({
  kitab,
  activeBabId,
  terms,
  bookmarks,
  annotations,
  onToggleBookmark,
  onSaveAnnotation,
  onGoHome,
  onNavigateSection,
}: KitabReaderProps) {
  const [showTerms, setShowTerms] = useState(true);
  const [showMasail, setShowMasail] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const category = getCategoryForKitab(kitab.id);

  // Find the active bab + section, or default to the first bab
  const currentBabId = activeBabId || kitab.abwab[0]?.id;
  const found = currentBabId ? findSection(kitab, currentBabId) : undefined;
  const currentBab = found?.bab ?? kitab.abwab[0];

  const prevBab = currentBab ? getAdjacentBab(kitab, currentBab.id, 'prev') : undefined;
  const nextBab = currentBab ? getAdjacentBab(kitab, currentBab.id, 'next') : undefined;

  const currentBabIndex = kitab.abwab.findIndex(b => b.id === currentBab?.id);

  const breadcrumbs = [
    { label: 'Home', onClick: onGoHome },
    ...(category ? [{ label: category.titleEn, onClick: onGoHome }] : []),
    { label: kitab.titleEn, onClick: () => onNavigateSection(kitab.id, kitab.abwab[0]?.id) },
    ...(currentBab ? [{ label: currentBab.titleEn || `Chapter ${currentBabIndex + 1}` }] : []),
  ];

  const isBookmarked = (id: string) => bookmarks.some(b => b.targetId === id);

  return (
    <div className="animate-fade-in">
      <Breadcrumb items={breadcrumbs} />

      <div className="kitab-header">
        <div className="kitab-header-titles">
          <h1 className="kitab-title-ar" dir="rtl">{kitab.titleAr}</h1>
          <h2 className="kitab-title-en">{kitab.titleEn}</h2>
        </div>
        <div className="kitab-meta">
          <span>Pages {kitab.pageRange[0]}–{kitab.pageRange[1]}</span>
          <span>{kitab.abwab.length} chapters</span>
          {category && <span>{category.titleEn}</span>}
        </div>
      </div>

      {currentBab && (
        <>
          <div className="bab-header">
            <h3 className="bab-title-ar" dir="rtl">{currentBab.titleAr}</h3>
            {currentBab.titleEn && <h4 className="bab-title-en">{currentBab.titleEn}</h4>}
          </div>

          <div className="text-toolbar">
            <button
              className={`toolbar-btn ${showTerms ? 'active' : ''}`}
              onClick={() => setShowTerms(!showTerms)}
              title="Toggle term highlights"
            >
              <Eye size={14} /> Terms
            </button>
            <button
              className={`toolbar-btn ${showMasail ? 'active' : ''}`}
              onClick={() => setShowMasail(!showMasail)}
              title="Toggle rulings"
            >
              <BookOpen size={14} /> Masail
            </button>
            <button
              className={`toolbar-btn ${showTranslation ? 'active' : ''}`}
              onClick={() => setShowTranslation(!showTranslation)}
              title="Toggle English translation"
            >
              <Languages size={14} /> Translation
            </button>
            <button
              className={`toolbar-btn ${showNotes ? 'active' : ''}`}
              onClick={() => setShowNotes(!showNotes)}
              title="Toggle notes"
            >
              <FileText size={14} /> Notes
            </button>
          </div>

          {currentBab.sections.map(section => (
            <div key={section.id} className="section-block">
              <div className="section-header">
                <div>
                  {section.titleAr && (
                    <div className="section-title-ar" dir="rtl">{section.titleAr}</div>
                  )}
                  {section.titleEn && (
                    <div className="section-title-en">{section.titleEn}</div>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="section-page">p. {section.sourcePage}</span>
                  <BookmarkButton
                    isBookmarked={isBookmarked(section.id)}
                    onToggle={() => onToggleBookmark(section.id, 'section')}
                  />
                </div>
              </div>

              <ArabicTextBlock
                textAr={section.textAr}
                terms={terms}
                showTermHighlights={showTerms}
              />

              {showTranslation && section.textEn && (
                <div className="translation-block">
                  {section.textEn.split(/\n\n+/).map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}

              {showMasail && section.masail.length > 0 && (
                <div className="masail-panel">
                  <h4 className="masail-panel-title">Extracted Rulings</h4>
                  {section.masail.map(m => (
                    <MasalahCard
                      key={m.id}
                      masalah={m}
                      isBookmarked={isBookmarked(m.id)}
                      onToggleBookmark={() => onToggleBookmark(m.id, 'masalah')}
                    />
                  ))}
                </div>
              )}

              {showNotes && (
                <AnnotationPanel
                  sectionId={section.id}
                  annotations={annotations}
                  onSave={onSaveAnnotation}
                />
              )}
            </div>
          ))}

          <PrevNextNav
            onPrevious={prevBab ? () => onNavigateSection(kitab.id, prevBab.id) : undefined}
            onNext={nextBab ? () => onNavigateSection(kitab.id, nextBab.id) : undefined}
            previousLabel={prevBab?.titleEn || 'Previous'}
            nextLabel={nextBab?.titleEn || 'Next'}
            currentIndex={currentBabIndex}
            totalCount={kitab.abwab.length}
          />
        </>
      )}
    </div>
  );
}
