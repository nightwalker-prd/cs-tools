import { useState, useEffect } from 'react';
import { removeDiacritics } from '@arabtools/core';
import { surahNames } from '@/data/surah-names';
import { grammarTags } from '@/data/grammar-tags';
import { useTransformationLoader } from '@/hooks/useTransformationLoader';
import { useMorphemeLoader } from '@/hooks/useMorphemeLoader';
import { useCorpusLoader } from '@/hooks/useCorpusLoader';
import { MorphemeBar } from '@/components/shared/MorphemeBar';
import { GrammarBadges } from '@/components/shared/GrammarBadges';
import type { WordTransformations, TransformationStep, MorphemeData, WordCorpus, CorpusMorpheme } from '@/types';

const posLabels: Record<string, { label: string; color: string }> = {
  N: { label: 'Noun', color: '#548dd4' },
  V: { label: 'Verb', color: '#1b571a' },
  P: { label: 'Preposition', color: '#ad2323' },
  ADJ: { label: 'Adjective', color: '#8126c0' },
  DET: { label: 'Determiner', color: '#e37010' },
  CONJ: { label: 'Conjunction', color: '#1301b8' },
  PRON: { label: 'Pronoun', color: '#5c7085' },
  PN: { label: 'Proper Noun', color: '#257e9c' },
  REL: { label: 'Relative', color: '#817418' },
  NEG: { label: 'Negative', color: '#f4400b' },
  RES: { label: 'Particle', color: '#a8017b' },
  INTG: { label: 'Interrogative', color: '#fd5162' },
  COND: { label: 'Conditional', color: '#e37010' },
  LOC: { label: 'Location', color: '#e37010' },
};

/** Parse grammar tags and return the verbose description if available */
function getGrammarLabel(gr: string): string | null {
  const tags = gr.split('|').filter(t => !t.startsWith('ROOT:') && !t.startsWith('LEM:') && !t.startsWith('PREF') && !t.startsWith('SUFF'));
  const key = tags.join('|');
  return grammarTags[key]?.verbose || null;
}

/** Extract root and lemma from grammar string */
function extractRootLemma(gr: string): { root?: string; lemma?: string } {
  const parts = gr.split('|');
  let root: string | undefined;
  let lemma: string | undefined;
  for (const p of parts) {
    if (p.startsWith('ROOT:')) root = p.slice(5);
    if (p.startsWith('LEM:')) lemma = p.slice(4);
  }
  return { root, lemma };
}

/** Match a transformation step's affixes to corpus morphemes */
function matchStepToCorpus(step: TransformationStep, corpus: CorpusMorpheme[]): { affix: string; morpheme: CorpusMorpheme } | null {
  if (!step.x) return null;
  for (const val of Object.values(step.x)) {
    const info = val as Record<string, string> | undefined;
    if (!info?.add) continue;
    const addedText = info.add;
    for (const m of corpus) {
      if (m.ar === addedText || removeDiacritics(m.ar) === removeDiacritics(addedText)) {
        return { affix: addedText, morpheme: m };
      }
    }
  }
  return null;
}

interface WordAnatomyProps {
  surah: number;
  ayah: number;
  word: number;
  navigate: (path: string) => void;
}

function AffixBadges({ affixes }: { affixes: Record<string, unknown> }) {
  const entries = Object.entries(affixes);
  if (entries.length === 0) return null;

  return (
    <div className="anatomy-affix-badges">
      {entries.map(([key, val]) => {
        const info = val as Record<string, string> | undefined;
        if (!info) return null;
        const label = key.replace(/_/g, ' ');
        const added = info.add || '';
        return (
          <span key={key} className="anatomy-affix-badge">
            <span className="anatomy-affix-label">{label}</span>
            {added && <span className="anatomy-affix-value font-arabic" dir="rtl">{added}</span>}
          </span>
        );
      })}
    </div>
  );
}

function StepCard({ step, isRoot, isFinal, morpheme, corpus }: { step: TransformationStep; isRoot: boolean; isFinal: boolean; morpheme: MorphemeData | null; corpus: WordCorpus | null }) {
  const [expanded, setExpanded] = useState(false);
  const corpusMatch = corpus ? matchStepToCorpus(step, corpus) : null;

  return (
    <div className="anatomy-step">
      <div className={`anatomy-step-marker ${isRoot ? 'root' : ''}`}>
        {step.s}
      </div>
      <div className="anatomy-step-content">
        {isFinal && morpheme ? (
          <div style={{ marginBottom: '0.25rem' }}>
            <MorphemeBar pieces={morpheme.p} compact />
          </div>
        ) : (
          <div
            className="anatomy-step-arabic font-arabic"
            dir="rtl"
            style={isRoot ? { color: 'var(--color-primary)', fontWeight: 600 } : undefined}
          >
            {step.a}
          </div>
        )}
        <div className="anatomy-step-meaning">{step.m}</div>
        {step.c && (
          <span className="anatomy-change-badge">{step.c}</span>
        )}
        {step.f && (
          <span className="anatomy-form-badge font-arabic" dir="rtl">{step.f}</span>
        )}
        {step.x && <AffixBadges affixes={step.x} />}
        {corpusMatch && (
          <div className="anatomy-step-grammar-note" style={{ color: posLabels[corpusMatch.morpheme.pos]?.color }}>
            → {posLabels[corpusMatch.morpheme.pos]?.label || corpusMatch.morpheme.pos} {corpusMatch.morpheme.gr.includes('PREF') ? 'prefix' : corpusMatch.morpheme.gr.includes('SUFF') ? 'suffix' : ''}
          </div>
        )}
        {isFinal && corpus && (
          <div style={{ marginTop: '0.4rem' }}>
            <GrammarBadges morphemes={corpus} />
          </div>
        )}
        {(step.wk || step.sc) && (
          <div className="anatomy-flags">
            {step.wk && <span className="anatomy-flag">Weak letter change</span>}
            {step.sc && <span className="anatomy-flag">Semantic shift</span>}
          </div>
        )}
        {step.n && (
          <>
            <button
              className="anatomy-note-toggle"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Hide note' : 'Show note'}
            </button>
            {expanded && (
              <div className="anatomy-note animate-fade-in">{step.n}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function WordAnatomy({ surah, ayah, word, navigate }: WordAnatomyProps) {
  const { getWordTransformations, loading } = useTransformationLoader();
  const { loadMorphemes } = useMorphemeLoader();
  const { loadCorpus } = useCorpusLoader();
  const [data, setData] = useState<WordTransformations | null>(null);
  const [morpheme, setMorpheme] = useState<MorphemeData | null>(null);
  const [corpus, setCorpus] = useState<WordCorpus | null>(null);

  const surahInfo = surahNames.find(s => s.num === surah);
  const wordId = `${surah}:${ayah}:${word}`;

  useEffect(() => {
    getWordTransformations(surah, ayah, word).then(setData);
    loadMorphemes(surah).then(m => setMorpheme(m[wordId] ?? null));
    loadCorpus(surah).then(c => setCorpus(c[wordId] ?? null));
  }, [surah, ayah, word, wordId, getWordTransformations, loadMorphemes, loadCorpus]);

  const finalStep = data?.steps[data.steps.length - 1];

  return (
    <div className="animate-fade-in" style={{ maxWidth: 700 }}>
      <div className="topic-header">
        <div className="breadcrumb">
          <button className="breadcrumb-link" onClick={() => navigate('#/')}>Home</button>
          <span className="breadcrumb-sep">/</span>
          <button className="breadcrumb-link" onClick={() => navigate(`#/surah/${surah}`)}>
            {surahInfo?.english}
          </button>
          <span className="breadcrumb-sep">/</span>
          <button className="breadcrumb-link" onClick={() => navigate(`#/ayah/${surah}/${ayah}`)}>
            Ayah {ayah}
          </button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Word {word}</span>
        </div>
      </div>

      {loading && <p style={{ color: 'var(--color-muted-foreground)' }}>Loading...</p>}

      {!loading && !data && (
        <p style={{ color: 'var(--color-muted-foreground)' }}>
          No morphological data available for this word.
        </p>
      )}

      {data && finalStep && (
        <>
          {/* Final word card */}
          <div className="anatomy-final-card">
            <div className="anatomy-final-arabic font-arabic" dir="rtl">
              {finalStep.a}
            </div>
            <div className="anatomy-final-meaning">{finalStep.m}</div>
            <div className="anatomy-final-location">
              {surahInfo?.transliteration} {surah}:{ayah} &middot; Word {word}
            </div>
            {morpheme && (
              <div style={{ marginTop: '0.75rem' }}>
                <MorphemeBar pieces={morpheme.p} />
              </div>
            )}
            {corpus && (
              <div style={{ marginTop: '0.5rem' }}>
                <GrammarBadges morphemes={corpus} />
              </div>
            )}
            {data.r && (
              <button
                className="btn"
                style={{ marginTop: '0.75rem', fontSize: '0.78rem', padding: '0.3rem 0.75rem' }}
                onClick={() => navigate(`#/root/${encodeURIComponent(data.r)}`)}
              >
                Root: <span className="font-arabic">{data.r}</span>
              </button>
            )}
          </div>

          {/* Gold separator */}
          <div className="gold-separator">
            <div className="gold-separator-diamond" />
          </div>

          {/* Grammatical Analysis */}
          {corpus && corpus.length > 0 && (
            <div className="anatomy-corpus-section">
              <h2 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
                Grammatical Analysis
              </h2>
              <div className="anatomy-corpus-row">
                {corpus.map((m, i) => {
                  const pos = posLabels[m.pos];
                  const { root, lemma } = extractRootLemma(m.gr);
                  const grammarLabel = getGrammarLabel(m.gr);
                  return (
                    <div key={i} className="anatomy-corpus-card" style={{ borderColor: `${pos?.color || '#888'}30` }}>
                      <div className="anatomy-corpus-arabic font-arabic" dir="rtl">{m.ar}</div>
                      {pos && (
                        <span className="anatomy-corpus-pos" style={{ background: `${pos.color}15`, color: pos.color, borderColor: `${pos.color}30` }}>
                          {pos.label}
                        </span>
                      )}
                      {grammarLabel && (
                        <div className="anatomy-corpus-verbose" style={{ color: pos?.color || '#888' }}>
                          {grammarLabel.split(' – ')[1] || grammarLabel}
                        </div>
                      )}
                      {(root || lemma) && (
                        <div className="anatomy-corpus-meta">
                          {root && <span className="font-arabic" dir="rtl">Root: {root}</span>}
                          {lemma && <span className="font-arabic" dir="rtl">Lemma: {lemma}</span>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Timeline */}
          <h2 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
            Morphological Steps ({data.steps.length})
          </h2>

          <div className="anatomy-timeline">
            {data.steps.map((step, i) => (
              <StepCard key={i} step={step} isRoot={i === 0} isFinal={i === data.steps.length - 1} morpheme={morpheme} corpus={corpus} />
            ))}
          </div>

          {/* Back to ayah */}
          <div style={{ marginTop: '2rem' }}>
            <button className="btn" onClick={() => navigate(`#/ayah/${surah}/${ayah}`)}>
              Back to Ayah
            </button>
          </div>
        </>
      )}
    </div>
  );
}
