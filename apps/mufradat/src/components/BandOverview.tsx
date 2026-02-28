import { useState, useMemo } from 'react';
import type { WordFamily } from '@arabtools/data';
import { bandById, getWordsForBand } from '../data/vocab-data';
import type { BandStatsMap } from '../types';
import { Breadcrumb } from './Breadcrumb';

interface BandOverviewProps {
  bandId: string;
  initialPos?: string;
  bandStats: BandStatsMap;
  onNavigate: (slug: string) => void;
  onGoHome: () => void;
}

export function BandOverview({ bandId, initialPos, bandStats, onNavigate, onGoHome }: BandOverviewProps) {
  const band = bandById.get(bandId);
  const [activePos, setActivePos] = useState(initialPos ?? 'all');

  const allBandWords = useMemo(() => getWordsForBand(bandId), [bandId]);

  const filteredWords = useMemo(() => {
    if (activePos === 'all') return allBandWords;
    return allBandWords.filter(w => {
      const pos = w.partOfSpeech || 'other';
      const normalized = ['noun', 'verb', 'adjective', 'particle', 'adverb', 'preposition'].includes(pos) ? pos : 'other';
      return normalized === activePos;
    });
  }, [allBandWords, activePos]);

  if (!band) {
    return (
      <div className="empty-state">
        <h2>Band Not Found</h2>
        <p>The frequency band &ldquo;{bandId}&rdquo; could not be found.</p>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={onGoHome}>
          Go Home
        </button>
      </div>
    );
  }

  const stats = bandStats[bandId as keyof BandStatsMap];
  const totalWords = allBandWords.length;
  const learned = stats ? stats.learning + stats.review + stats.mastered : 0;
  const pct = totalWords > 0 ? Math.round((learned / totalWords) * 100) : 0;

  // POS tabs
  const posGroups = band.posGroups;
  const posTabs = [
    { id: 'all', label: 'All', labelAr: 'الكل', count: totalWords },
    ...posGroups.map(g => ({
      id: g.pos,
      label: g.pos.charAt(0).toUpperCase() + g.pos.slice(1),
      labelAr: g.posAr,
      count: g.wordIds.length,
    })),
  ];

  return (
    <div className="topic-view animate-fade-in-up">
      <Breadcrumb
        items={[{ label: band.titleEn }]}
        onNavigate={onNavigate}
        onGoHome={onGoHome}
      />

      <div className="topic-header">
        <h1 className="topic-title">{band.titleEn}</h1>
        <div className="topic-title-ar font-arabic">{band.titleAr}</div>
        <p className="topic-description">{band.description}</p>
      </div>

      {/* Progress bar */}
      <div className="summary-box" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          <span>{learned} learned</span>
          <span>{pct}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${pct}%`, backgroundColor: band.color }}
          />
        </div>
        {stats && (
          <div className="srs-status" style={{ marginTop: '0.75rem' }}>
            <div className="srs-stat">
              <span className="srs-stat-value">{stats.newCount}</span>
              <span className="srs-stat-label">New</span>
            </div>
            <div className="srs-stat">
              <span className="srs-stat-value">{stats.learning}</span>
              <span className="srs-stat-label">Learning</span>
            </div>
            <div className="srs-stat">
              <span className="srs-stat-value">{stats.review}</span>
              <span className="srs-stat-label">Review</span>
            </div>
            <div className="srs-stat">
              <span className="srs-stat-value">{stats.mastered}</span>
              <span className="srs-stat-label">Mastered</span>
            </div>
          </div>
        )}
      </div>

      {/* POS tabs */}
      <div className="pos-tabs">
        {posTabs.map(tab => (
          <button
            key={tab.id}
            className={`pos-tab ${activePos === tab.id ? 'active' : ''}`}
            onClick={() => setActivePos(tab.id)}
          >
            <span>{tab.labelAr}</span>
            <span className="tab-count">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Word table */}
      <div className="word-table-wrapper">
        <table className="word-table">
          <thead>
            <tr>
              <th className="arabic-cell">Word</th>
              <th>Meaning</th>
              <th className="root-cell">Root</th>
              <th className="pos-cell">POS</th>
            </tr>
          </thead>
          <tbody>
            {filteredWords.map(word => (
              <WordRow
                key={word.id}
                word={word}
                onNavigate={onNavigate}
              />
            ))}
          </tbody>
        </table>
      </div>

      {filteredWords.length === 0 && (
        <div className="empty-state" style={{ padding: '2rem' }}>
          <p>No words found for this filter.</p>
        </div>
      )}
    </div>
  );
}

function WordRow({ word, onNavigate }: { word: WordFamily; onNavigate: (slug: string) => void }) {
  const POS_LABELS: Record<string, string> = {
    noun: 'اسم',
    verb: 'فعل',
    adjective: 'صفة',
    particle: 'حرف',
    adverb: 'ظرف',
    preposition: 'حرف جر',
    other: 'أخرى',
  };

  const pos = word.partOfSpeech || 'other';
  const posAr = POS_LABELS[pos] || POS_LABELS.other;

  return (
    <tr
      className="word-table-row"
      onClick={() => onNavigate(`word/${word.id}`)}
    >
      <td className="arabic-cell font-arabic">{word.headwordVocalized}</td>
      <td>{word.meanings[0]}</td>
      <td className="root-cell font-arabic">{word.root}</td>
      <td className="pos-cell">{posAr}</td>
    </tr>
  );
}
