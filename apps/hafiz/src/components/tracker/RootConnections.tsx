import { useState, useMemo } from 'react';
import { GitBranch, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { expandRubToAyahs } from '@arabtools/data';
import { useWordData } from '../../hooks/useWordData';
import type { QuranWord } from '../../types';

interface RootConnectionsProps {
  rubId: number;
}

interface RootGroup {
  root: string;
  words: QuranWord[];
  uniqueForms: string[];
}

export function RootConnections({ rubId }: RootConnectionsProps) {
  const ayahRefs = useMemo(() => expandRubToAyahs(rubId), [rubId]);
  const surahNums = useMemo(
    () => [...new Set(ayahRefs.map((a) => a.surah))],
    [ayahRefs],
  );

  const { loaded, getSurahWords } = useWordData(surahNums);
  const [collapsed, setCollapsed] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [expandedRoot, setExpandedRoot] = useState<string | null>(null);

  const rootGroups = useMemo((): RootGroup[] => {
    if (!loaded) return [];

    const rubKeys = new Set(ayahRefs.map((a) => `${a.surah}:${a.ayah}`));
    const byRoot = new Map<string, QuranWord[]>();

    for (const num of surahNums) {
      const words = getSurahWords(num);
      for (const w of words) {
        if (!rubKeys.has(`${num}:${w.ayahNum}`)) continue;
        if (!w.root) continue;
        const existing = byRoot.get(w.root) || [];
        existing.push(w);
        byRoot.set(w.root, existing);
      }
    }

    // Only show roots that appear 2+ times
    const groups: RootGroup[] = [];
    for (const [root, words] of byRoot) {
      if (words.length < 2) continue;
      const uniqueForms = [...new Set(words.map((w) => w.word))];
      groups.push({ root, words, uniqueForms });
    }

    // Sort by number of occurrences (descending)
    groups.sort((a, b) => b.words.length - a.words.length);
    return groups;
  }, [loaded, ayahRefs, surahNums, getSurahWords]);

  const displayGroups = expanded ? rootGroups : rootGroups.slice(0, 5);

  return (
    <div className={collapsed ? 'root-connections collapsed' : 'root-connections'}>
      <button
        className="root-connections-header"
        onClick={() => {
          setCollapsed(!collapsed);
          if (!collapsed) setExpanded(false);
        }}
      >
        <GitBranch size={18} />
        <h4>Root Connections{rootGroups.length > 0 ? ` (${rootGroups.length} roots)` : ''}</h4>
        {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </button>
      {!collapsed && (
        <>
          {!loaded ? (
            <div className="vocab-preview-loading">
              <Loader2 size={18} className="spin" />
              <span>Loading roots...</span>
            </div>
          ) : rootGroups.length === 0 ? (
            <p className="vocab-preview-empty">No root connections found</p>
          ) : (
            <>
              <div className="root-connections-list">
                {displayGroups.map((group) => (
                  <div key={group.root} className="root-group">
                    <button
                      className="root-group-header"
                      onClick={() =>
                        setExpandedRoot(
                          expandedRoot === group.root ? null : group.root,
                        )
                      }
                    >
                      <span className="root-group-arabic">{group.root}</span>
                      <span className="root-group-count">
                        {group.words.length} occurrences, {group.uniqueForms.length} forms
                      </span>
                      {expandedRoot === group.root ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </button>
                    {expandedRoot === group.root && (
                      <div className="root-group-forms">
                        {group.uniqueForms.map((form, i) => {
                          const word = group.words.find((w) => w.word === form);
                          return (
                            <div key={i} className="root-form-item">
                              <span className="root-form-arabic">{form}</span>
                              <span className="root-form-meaning">
                                {word?.meaning}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {rootGroups.length > 5 && (
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? 'Show less' : `Show all ${rootGroups.length} roots`}
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
