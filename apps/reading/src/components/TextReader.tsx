import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, MessageSquare } from 'lucide-react';
import { useSpeechSynthesis, removeDiacritics } from '@arabtools/core';
import type { ReadingText, WordTranslation } from '../data/reading';
import type { Collection } from '../data/navigation';
import { Breadcrumb } from './Breadcrumb';
import { TextToolbar } from './TextToolbar';
import { WordTooltip } from './WordTooltip';
import { VocabularyPanel } from './VocabularyPanel';
import { GrammarPanel } from './GrammarPanel';
import { MoralLessonPanel } from './MoralLessonPanel';

interface TextReaderProps {
  text: ReadingText;
  collection: Collection;
  onGoHome: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  currentIndex: number;
  totalCount: number;
}

export function TextReader({
  text,
  collection,
  onGoHome,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  currentIndex,
  totalCount,
}: TextReaderProps) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [hideDiacritics, setHideDiacritics] = useState(false);
  const [showVocabulary, setShowVocabulary] = useState(false);
  const [showGrammar, setShowGrammar] = useState(false);
  const [showMoralLesson, setShowMoralLesson] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);

  // Lazy-loaded word-by-word data
  const [wordByWord, setWordByWord] = useState<WordTranslation[] | null>(null);
  const loadedTextIdRef = useRef<string | null>(null);

  // TTS state
  const [speakingWordIndex, setSpeakingWordIndex] = useState<number | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);

  const {
    speak,
    speakSequence,
    stopSequence,
    isSpeaking,
    isSupported,
    hasArabicVoice,
  } = useSpeechSynthesis({
    lang: 'ar-SA',
    rate: 0.8,
    onEnd: () => setSpeakingWordIndex(null),
  });

  // Lazy-load word-by-word translations
  useEffect(() => {
    if (loadedTextIdRef.current === text.id) return;
    loadedTextIdRef.current = text.id;

    if (text.wordByWordTranslation) {
      setWordByWord(text.wordByWordTranslation);
      return;
    }

    import('../data/reading/wordByWord').then((mod) => {
      const data = mod.getWordByWord(text.id);
      setWordByWord(data ?? null);
    }).catch(() => {
      setWordByWord(null);
    });
  }, [text.id, text.wordByWordTranslation]);

  // Handle speaking a single word
  const handleSpeakWord = (index: number, arabicText: string) => {
    stopSequence();
    setIsPlayingAll(false);
    setSpeakingWordIndex(index);
    speak(arabicText);
  };

  // Handle playing all words
  const handlePlayAll = () => {
    if (!wordByWord || wordByWord.length === 0) {
      setSpeakingWordIndex(null);
      speak(text.text);
      return;
    }

    setIsPlayingAll(true);
    const words = wordByWord.map(w => w.arabic);
    speakSequence(words, (index) => {
      if (index === -1) {
        setSpeakingWordIndex(null);
        setIsPlayingAll(false);
      } else {
        setSpeakingWordIndex(index);
      }
    });
  };

  const handleStop = () => {
    stopSequence();
    setSpeakingWordIndex(null);
    setIsPlayingAll(false);
  };

  // Reset TTS on text change
  useEffect(() => {
    stopSequence();
    setSpeakingWordIndex(null);
    setIsPlayingAll(false);
    setActiveWordIndex(null);
    setShowTranslation(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text.id]);

  return (
    <div className="text-reader">
      <Breadcrumb
        collection={collection}
        textTitle={text.title}
        onGoHome={onGoHome}
      />

      {/* Header */}
      <div className="text-header">
        <h1 className="text-title-ar font-arabic" dir="rtl">{text.titleAr}</h1>
        <h2 className="text-title-en">{text.title}</h2>
        <div className="text-meta">
          <span className={`level-badge ${text.level}`}>
            {text.level.charAt(0).toUpperCase() + text.level.slice(1)}
          </span>
          <span className="text-word-count">{text.wordCount} words</span>
          <span className="text-category-badge">{text.category}</span>
        </div>
      </div>

      {/* Toolbar */}
      <TextToolbar
        showTranslation={showTranslation}
        onToggleTranslation={() => setShowTranslation(!showTranslation)}
        hideDiacritics={hideDiacritics}
        onToggleDiacritics={() => setHideDiacritics(!hideDiacritics)}
        isPlaying={isPlayingAll || isSpeaking}
        onPlay={handlePlayAll}
        onStop={handleStop}
        isSupported={isSupported}
        hasArabicVoice={hasArabicVoice}
      />

      {/* Arabic Text */}
      <div className="arabic-text-card">
        <div className="arabic-text-body">
          {wordByWord ? (
            wordByWord.map((wordData, index) => {
              const displayWord = hideDiacritics ? removeDiacritics(wordData.arabic) : wordData.arabic;
              return (
                <WordTooltip
                  key={index}
                  word={displayWord + ' '}
                  translation={wordData.translation}
                  grammaticalInfo={wordData.grammaticalInfo}
                  isActive={activeWordIndex === index}
                  isSpeaking={speakingWordIndex === index}
                  onClick={() => setActiveWordIndex(activeWordIndex === index ? null : index)}
                  onSpeak={() => handleSpeakWord(index, wordData.arabic)}
                />
              );
            })
          ) : (
            <p>{hideDiacritics ? removeDiacritics(text.text) : text.text}</p>
          )}
        </div>
      </div>

      {/* Translation */}
      {showTranslation && (
        <div className="translation-block">
          <div className="translation-label">
            <MessageSquare size={14} />
            English Translation
          </div>
          <p className="translation-text">{text.translation}</p>
        </div>
      )}

      {/* Vocabulary + Grammar side by side */}
      <div className="panels-grid">
        <VocabularyPanel
          items={text.vocabularyHighlights}
          isOpen={showVocabulary}
          onToggle={() => setShowVocabulary(!showVocabulary)}
        />
        <GrammarPanel
          concepts={text.grammaticalConcepts}
          isOpen={showGrammar}
          onToggle={() => setShowGrammar(!showGrammar)}
        />
      </div>

      {/* Moral Lesson */}
      <MoralLessonPanel
        moralLessonAr={text.moralLessonAr}
        moralLesson={text.moralLesson}
        isOpen={showMoralLesson}
        onToggle={() => setShowMoralLesson(!showMoralLesson)}
      />

      {/* Prev/Next Navigation */}
      <div className="text-nav">
        <button
          className="text-nav-btn"
          onClick={onPrevious}
          disabled={!hasPrevious}
        >
          <ArrowLeft size={14} />
          Previous
        </button>
        <span className="text-nav-position">
          {currentIndex + 1} of {totalCount}
        </span>
        <button
          className="text-nav-btn"
          onClick={onNext}
          disabled={!hasNext}
        >
          Next
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
