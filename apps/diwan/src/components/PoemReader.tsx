import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BookMarked,
  Eye,
  EyeOff,
  Star,
  Languages,
} from 'lucide-react';
import type { Poet, EraInfo, Poem, IrabWord, PoemIrab } from '../types';
import { buildVocabLookup } from '../utils/vocab-matcher';
import { loadDictionary } from '../data/dictionary';
import { loadIrabByPoet, getIrabForPoem } from '../data/irab';
import { AnnotatedVerse } from './AnnotatedVerse';
import { IrabDetail } from './IrabDetail';

const GENRE_NAMES: Record<string, { ar: string; en: string }> = {
  ghazal: { ar: 'غزل', en: 'Love Poetry' },
  madih: { ar: 'مديح', en: 'Panegyric' },
  hija: { ar: 'هجاء', en: 'Satire' },
  ritha: { ar: 'رثاء', en: 'Elegy' },
  zuhd: { ar: 'زهد', en: 'Ascetic' },
  khamriyyat: { ar: 'خمريات', en: 'Wine Poetry' },
  wasf: { ar: 'وصف', en: 'Descriptive' },
  fakhr: { ar: 'فخر', en: 'Boastful' },
  hikma: { ar: 'حكمة', en: 'Wisdom' },
  sufi: { ar: 'تصوّف', en: 'Sufi' },
  hanin: { ar: 'حنين', en: 'Nostalgia' },
  wataniyyat: { ar: 'وطنيات', en: 'Patriotic' },
};

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

interface PoemReaderProps {
  poem: Poem;
  poet: Poet;
  eras: EraInfo[];
  onGoHome: () => void;
  onNavigatePoet: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  currentIndex: number;
  totalCount: number;
}

export function PoemReader({
  poem,
  poet,
  eras,
  onGoHome,
  onNavigatePoet,
  onPrevious,
  onNext,
  currentIndex,
  totalCount,
}: PoemReaderProps) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [showVocab, setShowVocab] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [showIrab, setShowIrab] = useState(false);
  const [irabData, setIrabData] = useState<PoemIrab[] | null>(null);
  const [irabLoading, setIrabLoading] = useState(false);
  const [selectedIrab, setSelectedIrab] = useState<IrabWord | null>(null);
  const [dictionary, setDictionary] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    loadDictionary().then(setDictionary);
  }, []);

  // Load i'rab data lazily on first toggle
  const handleToggleIrab = useCallback(() => {
    if (!showIrab && !irabData && !irabLoading) {
      setIrabLoading(true);
      loadIrabByPoet(poet.id).then((data) => {
        setIrabData(data);
        setIrabLoading(false);
      });
    }
    setShowIrab(prev => !prev);
    setSelectedIrab(null);
  }, [showIrab, irabData, irabLoading, poet.id]);

  const currentPoemIrab = useMemo(
    () => irabData ? getIrabForPoem(irabData, poem.id) : undefined,
    [irabData, poem.id],
  );

  const era = useMemo(() => eras.find(e => e.id === poet.era), [eras, poet.era]);

  const vocabLookup = useMemo(
    () => buildVocabLookup(poem.vocabularyHighlights, dictionary ?? undefined),
    [poem.vocabularyHighlights, dictionary],
  );

  const activeTooltipRef = useRef<HTMLElement | null>(null);

  const dismissTooltip = useCallback(() => {
    if (activeTooltipRef.current) {
      activeTooltipRef.current.classList.remove('active');
      activeTooltipRef.current = null;
    }
  }, []);

  const handleWordClick = useCallback(
    (el: HTMLElement) => {
      if (activeTooltipRef.current === el) {
        dismissTooltip();
      } else {
        dismissTooltip();
        el.classList.add('active');
        activeTooltipRef.current = el;
      }
    },
    [dismissTooltip],
  );

  const handleIrabClick = useCallback(
    (annotation: IrabWord) => {
      setSelectedIrab(prev => prev === annotation ? null : annotation);
    },
    [],
  );

  // Clear state when poem changes
  useEffect(() => {
    dismissTooltip();
    setSelectedIrab(null);
  }, [poem.id, dismissTooltip]);

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button className="breadcrumb-link" onClick={onGoHome}>Home</button>
        <ChevronRight size={12} className="breadcrumb-sep" />
        <button className="breadcrumb-link" onClick={onNavigatePoet}>{poet.nameEn}</button>
        <ChevronRight size={12} className="breadcrumb-sep" />
        <span className="breadcrumb-current">{poem.titleEn}</span>
      </div>

      {/* Poem Header */}
      <div className="poem-header">
        <h1 className="poem-title-ar font-arabic" dir="rtl">{poem.titleAr}</h1>
        <h2 className="poem-title-en">{poem.titleEn}</h2>
        <div className="poem-meta">
          <button className="poem-poet-link" onClick={onNavigatePoet}>
            <BookMarked size={13} />
            {poet.nameEn}
          </button>
          {era && <span className="era-badge">{era.nameEn}</span>}
          <span className="genre-badge">
            {GENRE_NAMES[poem.genre]?.en ?? poem.genre}
          </span>
          <span className={`level-badge ${poem.level}`}>
            {LEVEL_LABELS[poem.level]}
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="text-toolbar">
        <button
          className={`toolbar-btn${showTranslation ? ' active' : ''}`}
          onClick={() => setShowTranslation(!showTranslation)}
        >
          {showTranslation ? <EyeOff size={14} /> : <Eye size={14} />}
          Translation
        </button>
        <button
          className={`toolbar-btn${showVocab ? ' active' : ''}`}
          onClick={() => setShowVocab(!showVocab)}
        >
          <BookOpen size={14} />
          Vocabulary
        </button>
        <button
          className={`toolbar-btn${showContext ? ' active' : ''}`}
          onClick={() => setShowContext(!showContext)}
        >
          <Star size={14} />
          Context
        </button>
        <button
          className={`toolbar-btn${showIrab ? ' active' : ''}${irabLoading ? ' loading' : ''}`}
          onClick={handleToggleIrab}
        >
          <Languages size={14} />
          {irabLoading ? "Loading..." : "I'rab"}
        </button>
        <div className="toolbar-spacer" />
        <span className="toolbar-verse-count">
          {poem.verses.length} {poem.verses.length === 1 ? 'verse' : 'verses'}
        </span>
      </div>

      {/* I'rab Color Legend */}
      {showIrab && currentPoemIrab && (
        <div className="irab-legend">
          <span className="irab-legend-item"><span className="irab-dot irab-nominal" /> Nominal</span>
          <span className="irab-legend-item"><span className="irab-dot irab-verbal" /> Verbal</span>
          <span className="irab-legend-item"><span className="irab-dot irab-particle" /> Particle</span>
          <span className="irab-legend-item"><span className="irab-dot irab-modifier" /> Modifier</span>
        </div>
      )}

      {/* Verse Display */}
      <div className="verse-container" onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.vocab-word-highlight') && !target.closest('.vocab-word-dict') && !target.closest('.irab-badge')) {
          dismissTooltip();
          setSelectedIrab(null);
        }
      }}>
        {poem.verses.map((verse, i) => {
          const isFreeVerse = !verse.ajuz;
          const verseIrab = showIrab && currentPoemIrab?.verses[i];
          return (
            <div
              key={i}
              className={`verse-line${isFreeVerse ? ' free-verse' : ''}${showIrab && verseIrab ? ' irab-verse' : ''}`}
            >
              <span className="verse-number">{i + 1}</span>
              <AnnotatedVerse
                text={verse.sadr}
                className="verse-sadr font-arabic"
                vocabLookup={vocabLookup}
                onWordClick={handleWordClick}
                verseIndex={i}
                half="sadr"
                irabWords={verseIrab ? verseIrab.sadr : undefined}
                showIrab={showIrab && !!verseIrab}
                onIrabClick={handleIrabClick}
              />
              {!isFreeVerse && (
                <>
                  <span className="verse-separator">*</span>
                  <AnnotatedVerse
                    text={verse.ajuz}
                    className="verse-ajuz font-arabic"
                    vocabLookup={vocabLookup}
                    onWordClick={handleWordClick}
                    verseIndex={i}
                    half="ajuz"
                    irabWords={verseIrab ? verseIrab.ajuz : undefined}
                    showIrab={showIrab && !!verseIrab}
                    onIrabClick={handleIrabClick}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* I'rab Detail Panel */}
      {showIrab && selectedIrab && (
        <IrabDetail
          annotation={selectedIrab}
          onClose={() => setSelectedIrab(null)}
        />
      )}

      {/* Translation Block (collapsible) */}
      {showTranslation && poem.translationEn && (
        <div className="translation-block">
          <div className="translation-label">
            <Eye size={14} />
            English Translation
          </div>
          <p className="translation-text">{poem.translationEn}</p>
        </div>
      )}

      {/* Vocabulary Panel (collapsible) */}
      {showVocab && poem.vocabularyHighlights.length > 0 && (
        <div className="panel-collapsible">
          <div className="panel-body" style={{ borderTop: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <BookOpen size={14} className="panel-icon" />
              <span className="panel-title">
                Vocabulary Highlights
              </span>
              <span className="panel-count">
                {poem.vocabularyHighlights.length} words
              </span>
            </div>
            {poem.vocabularyHighlights.map((item, i) => (
              <div key={i} className="vocab-item">
                <span className="vocab-word font-arabic" dir="rtl">{item.word}</span>
                <span className="vocab-meaning">{item.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Context Block (collapsible) */}
      {showContext && poem.context && (
        <div className="context-block">
          <div className="context-label">
            <Star size={14} />
            Historical Context
          </div>
          <p className="context-text">{poem.context}</p>
        </div>
      )}

      {/* Prev/Next Navigation */}
      <div className="text-nav">
        <button
          className="text-nav-btn"
          disabled={!onPrevious}
          onClick={onPrevious}
        >
          <ArrowLeft size={14} />
          Previous
        </button>
        <span className="text-nav-position">
          {currentIndex + 1} of {totalCount}
        </span>
        <button
          className="text-nav-btn"
          disabled={!onNext}
          onClick={onNext}
        >
          Next
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
