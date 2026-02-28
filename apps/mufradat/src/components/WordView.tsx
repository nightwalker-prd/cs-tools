import { useMemo } from 'react';
import { useSpeechSynthesis } from '@arabtools/core';
import type { WordFamily } from '@arabtools/data';
import type { SrsItem } from '@arabtools/srs';
import { getBandForWord } from '../data/vocab-data';
import { Breadcrumb } from './Breadcrumb';

interface WordViewProps {
  word: WordFamily;
  vocabItems: SrsItem[];
  onNavigate: (slug: string) => void;
  onGoHome: () => void;
}

const POS_LABELS: Record<string, string> = {
  noun: 'Noun',
  verb: 'Verb',
  adjective: 'Adjective',
  particle: 'Particle',
  adverb: 'Adverb',
  preposition: 'Preposition',
  other: 'Other',
};

export function WordView({ word, vocabItems, onNavigate, onGoHome }: WordViewProps) {
  const { speak } = useSpeechSynthesis();
  const band = getBandForWord(word.id);

  // Find SRS item for this word
  const srsItem = useMemo(
    () => vocabItems.find(item => item.contentId === word.id),
    [vocabItems, word.id],
  );

  // familyMembers is string[] of Arabic words
  const familyMembers = word.familyMembers ?? [];

  const pos = word.partOfSpeech || 'other';
  const posLabel = POS_LABELS[pos] || 'Other';

  // Breadcrumb path
  const breadcrumbItems = band
    ? [
        { label: band.titleEn, slug: `band-${band.id}` },
        { label: word.headwordVocalized },
      ]
    : [{ label: word.headwordVocalized }];

  return (
    <div className="topic-view animate-fade-in-up">
      <Breadcrumb
        items={breadcrumbItems}
        onNavigate={onNavigate}
        onGoHome={onGoHome}
      />

      {/* Word header */}
      <div className="topic-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <h1 className="word-arabic-large font-arabic">{word.headwordVocalized}</h1>
          <button
            className="word-tts-btn"
            onClick={() => speak(word.headwordVocalized)}
            title="Listen"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          </button>
        </div>
        <span className="word-pos-badge">{posLabel}</span>
        {band && (
          <span className="tag" style={{ backgroundColor: band.color, color: '#fff', marginLeft: '0.5rem' }}>
            {band.titleEn}
          </span>
        )}
      </div>

      {/* Meanings */}
      <div className="summary-box">
        <h3 className="summary-box-title">Meanings</h3>
        <div className="word-meanings">
          {word.meanings.map((m, i) => (
            <div key={i} className="word-meaning-item">{m}</div>
          ))}
        </div>
      </div>

      {/* Root */}
      {word.root && (
        <div className="summary-box">
          <h3 className="summary-box-title">Root</h3>
          <div className="root-display font-arabic">{word.root}</div>
        </div>
      )}

      {/* Family members */}
      {familyMembers.length > 0 && (
        <div className="summary-box">
          <h3 className="summary-box-title">Word Family</h3>
          <div className="family-chips">
            {familyMembers.map((member, i) => (
              <span key={i} className="related-topic-chip font-arabic" dir="rtl">
                {member}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Example */}
      {word.example && (
        <div className="example-block">
          <div className="example-arabic font-arabic">{word.example.arabic}</div>
          <div className="example-translation">{word.example.translation}</div>
        </div>
      )}

      {/* SRS status */}
      {srsItem && (
        <div className="summary-box">
          <h3 className="summary-box-title">SRS Status</h3>
          <div className="srs-status">
            <div className="srs-stat">
              <span className="srs-stat-value" style={{ textTransform: 'capitalize' }}>
                {srsItem.phase}
              </span>
              <span className="srs-stat-label">Phase</span>
            </div>
            <div className="srs-stat">
              <span className="srs-stat-value">{srsItem.reps}</span>
              <span className="srs-stat-label">Reps</span>
            </div>
            <div className="srs-stat">
              <span className="srs-stat-value">{Math.round(srsItem.stability)}d</span>
              <span className="srs-stat-label">Stability</span>
            </div>
            {srsItem.due && (
              <div className="srs-stat">
                <span className="srs-stat-value">
                  {new Date(srsItem.due).toLocaleDateString()}
                </span>
                <span className="srs-stat-label">Next Review</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Practice button */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          className="btn btn-primary"
          onClick={() => onNavigate('study')}
        >
          Practice Vocabulary
        </button>
      </div>
    </div>
  );
}
