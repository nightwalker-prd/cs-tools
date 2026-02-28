import { grammarTags } from '@/data/grammar-tags';
import type { CorpusMorpheme } from '@/types';

interface GrammarBadgesProps {
  morphemes: CorpusMorpheme[];
  compact?: boolean;
}

/** Parse grammar string like "ROOT:حمد|LEM:حَمْد|M|NOM" into display tags */
function parseGrammarTags(gr: string): string[] {
  return gr.split('|').filter(t => !t.startsWith('ROOT:') && !t.startsWith('LEM:') && !t.startsWith('PREF') && !t.startsWith('SUFF'));
}

export function GrammarBadges({ morphemes, compact }: GrammarBadgesProps) {
  if (!morphemes.length) return null;

  // Collect all grammar tags from all morphemes
  const allTags: { tag: string; color: string; label: string }[] = [];
  for (const m of morphemes) {
    const tags = parseGrammarTags(m.gr);
    for (const tag of tags) {
      const info = grammarTags[tag];
      if (info) {
        allTags.push({ tag, color: info.color, label: compact ? tag : info.friendly || tag });
      }
    }
  }

  // Show the verbose description of the first morpheme with a recognized part of speech
  const mainMorpheme = morphemes.find(m => m.pos === 'N' || m.pos === 'V' || m.pos === 'ADJ');
  const mainGr = mainMorpheme ? mainMorpheme.gr : morphemes[0]?.gr || '';
  const fullKey = parseGrammarTags(mainGr).join('|');
  const fullInfo = grammarTags[fullKey];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      {fullInfo && (
        <div style={{ fontSize: '0.75rem', color: fullInfo.color, fontWeight: 500 }}>
          {fullInfo.verbose}
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
        {allTags.slice(0, 6).map((t, i) => (
          <span
            key={i}
            style={{
              fontSize: '0.65rem',
              padding: '0.1rem 0.4rem',
              borderRadius: '0.25rem',
              background: `${t.color}18`,
              color: t.color,
              border: `1px solid ${t.color}30`,
              fontWeight: 500,
            }}
          >
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}
