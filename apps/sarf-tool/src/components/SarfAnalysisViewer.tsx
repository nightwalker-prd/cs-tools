import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Layers, GitBranch, Lightbulb, User } from 'lucide-react';
import type { SarfAnalysisExample } from '../data/sarfAnalysis';
import type { StudentSarfAnalysis } from './StudentSarfAnalysisForm';

interface SarfAnalysisViewerProps {
  analysis: SarfAnalysisExample | StudentSarfAnalysis;
}

export function SarfAnalysisViewer({ analysis }: SarfAnalysisViewerProps) {
  const [activeLevel, setActiveLevel] = useState<'root' | 'pattern' | 'morphology' | 'usage' | 'related' | null>('root');
  const [expandedSections, setExpandedSections] = useState<string[]>(['root']);

  const isExpertAnalysis = (a: SarfAnalysisExample | StudentSarfAnalysis): a is SarfAnalysisExample => {
    return 'rootAnalysis' in a;
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  // For student analysis
  if (!isExpertAnalysis(analysis)) {
    return (
      <div className="space-y-4">
        {/* Student Info */}
        {analysis.studentName && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>By: {analysis.studentName}</span>
          </div>
        )}

        {/* Root & Pattern */}
        <div className="space-y-3">
          <div>
            <h4 className="text-sm text-[#c5a253] mb-1">Root (جذر)</h4>
            <p className="text-2xl font-arabic" dir="rtl">{analysis.root}</p>
          </div>
          <div>
            <h4 className="text-sm text-[#c5a253] mb-1">Pattern (وزن)</h4>
            <p className="text-2xl font-arabic" dir="rtl">{analysis.pattern}</p>
          </div>
        </div>

        {/* Category & Form */}
        <div className="space-y-2">
          <div>
            <h4 className="text-sm text-[#c5a253] mb-1">Category</h4>
            <p className="text-primary">{analysis.category}</p>
          </div>
          {analysis.verbForm && (
            <div>
              <h4 className="text-sm text-[#c5a253] mb-1">Verb Form</h4>
              <p className="text-primary">Form {analysis.verbForm}</p>
            </div>
          )}
        </div>

        {/* Meaning */}
        <div>
          <h4 className="text-sm text-[#c5a253] mb-1">Meaning</h4>
          <p className="text-primary">{analysis.meaning}</p>
        </div>

        {/* Grammatical Role */}
        <div>
          <h4 className="text-sm text-[#c5a253] mb-1">Grammatical Role & Usage</h4>
          <p className="text-muted-foreground whitespace-pre-wrap">{analysis.grammaticalRole}</p>
        </div>

        {/* Prepositions */}
        {analysis.prepositions && (
          <div>
            <h4 className="text-sm text-[#c5a253] mb-1">Prepositions</h4>
            <p className="text-lg font-arabic" dir="rtl">{analysis.prepositions}</p>
          </div>
        )}

        {/* Related Forms */}
        {analysis.relatedForms && (
          <div>
            <h4 className="text-sm text-[#c5a253] mb-1">Related Forms (تصريف)</h4>
            <p className="text-lg whitespace-pre-wrap font-arabic" dir="rtl">{analysis.relatedForms}</p>
          </div>
        )}

        {/* Notes */}
        {analysis.notes && (
          <div>
            <h4 className="text-sm text-[#c5a253] mb-1">Notes</h4>
            <p className="text-muted-foreground whitespace-pre-wrap">{analysis.notes}</p>
          </div>
        )}
      </div>
    );
  }

  // For expert analysis
  const expertAnalysis = analysis as SarfAnalysisExample;

  return (
    <div className="space-y-3">
      {/* Root Analysis */}
      <div className="border border-accent/20 rounded-xl overflow-hidden">
        <button
          onClick={() => {
            setActiveLevel(activeLevel === 'root' ? null : 'root');
            toggleSection('root');
          }}
          className={`w-full p-4 flex items-center justify-between transition-colors ${
            activeLevel === 'root' ? 'bg-accent/10' : 'hover:bg-accent/5'
          }`}
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-accent" />
            <span className="text-primary">Root Analysis (جذر)</span>
          </div>
          {expandedSections.includes('root') ? (
            <ChevronUp className="w-4 h-4 text-accent" />
          ) : (
            <ChevronDown className="w-4 h-4 text-accent" />
          )}
        </button>
        {expandedSections.includes('root') && (
          <div className="p-4 bg-white/50 space-y-3">
            <div>
              <h4 className="text-sm text-accent mb-1">Root Letters</h4>
              <p className="text-2xl text-primary font-arabic" dir="rtl">
                {expertAnalysis.rootAnalysis.root}
              </p>
            </div>
            <div>
              <h4 className="text-sm text-accent mb-1">Root Meaning</h4>
              <p className="text-muted-foreground">{expertAnalysis.rootAnalysis.meaning}</p>
            </div>
            {expertAnalysis.rootAnalysis.familyWords && (
              <div>
                <h4 className="text-sm text-accent mb-1">Word Family</h4>
                <ul className="space-y-1">
                  {expertAnalysis.rootAnalysis.familyWords.map((word, idx) => (
                    <li key={idx} className="text-muted-foreground text-sm">
                      - {word}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pattern Analysis */}
      <div className="border border-accent/20 rounded-xl overflow-hidden">
        <button
          onClick={() => {
            setActiveLevel(activeLevel === 'pattern' ? null : 'pattern');
            toggleSection('pattern');
          }}
          className={`w-full p-4 flex items-center justify-between transition-colors ${
            activeLevel === 'pattern' ? 'bg-accent/10' : 'hover:bg-accent/5'
          }`}
        >
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent" />
            <span className="text-primary">Pattern Analysis (وزن)</span>
          </div>
          {expandedSections.includes('pattern') ? (
            <ChevronUp className="w-4 h-4 text-accent" />
          ) : (
            <ChevronDown className="w-4 h-4 text-accent" />
          )}
        </button>
        {expandedSections.includes('pattern') && (
          <div className="p-4 bg-white/50 space-y-3">
            <div>
              <h4 className="text-sm text-accent mb-1">Pattern (وزن)</h4>
              <p className="text-2xl text-primary font-arabic" dir="rtl">
                {expertAnalysis.patternAnalysis.pattern}
              </p>
              {expertAnalysis.patternAnalysis.patternTranslit && (
                <p className="text-sm text-muted-foreground mt-1">
                  ({expertAnalysis.patternAnalysis.patternTranslit})
                </p>
              )}
            </div>
            <div>
              <h4 className="text-sm text-accent mb-1">Pattern Meaning</h4>
              <p className="text-muted-foreground">{expertAnalysis.patternAnalysis.patternMeaning}</p>
            </div>
            <div>
              <h4 className="text-sm text-accent mb-1">Function</h4>
              <p className="text-muted-foreground">{expertAnalysis.patternAnalysis.function}</p>
            </div>
          </div>
        )}
      </div>

      {/* Morphological Breakdown */}
      <div className="border border-accent/20 rounded-xl overflow-hidden">
        <button
          onClick={() => {
            setActiveLevel(activeLevel === 'morphology' ? null : 'morphology');
            toggleSection('morphology');
          }}
          className={`w-full p-4 flex items-center justify-between transition-colors ${
            activeLevel === 'morphology' ? 'bg-accent/10' : 'hover:bg-accent/5'
          }`}
        >
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-accent" />
            <span className="text-primary">Morphological Breakdown</span>
          </div>
          {expandedSections.includes('morphology') ? (
            <ChevronUp className="w-4 h-4 text-accent" />
          ) : (
            <ChevronDown className="w-4 h-4 text-accent" />
          )}
        </button>
        {expandedSections.includes('morphology') && (
          <div className="p-4 bg-white/50 space-y-3">
            <div>
              <h4 className="text-sm text-accent mb-1">Category</h4>
              <p className="text-muted-foreground">{expertAnalysis.morphology.category}</p>
            </div>
            {expertAnalysis.morphology.form && (
              <div>
                <h4 className="text-sm text-accent mb-1">Verb Form</h4>
                <p className="text-muted-foreground">Form {expertAnalysis.morphology.form}</p>
              </div>
            )}
            <div>
              <h4 className="text-sm text-accent mb-1">Structure</h4>
              <p className="text-muted-foreground">{expertAnalysis.morphology.structure}</p>
            </div>
            {expertAnalysis.morphology.changes && (
              <div>
                <h4 className="text-sm text-accent mb-1">Morphological Changes</h4>
                <p className="text-muted-foreground">{expertAnalysis.morphology.changes}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Usage & Grammar */}
      <div className="border border-accent/20 rounded-xl overflow-hidden">
        <button
          onClick={() => {
            setActiveLevel(activeLevel === 'usage' ? null : 'usage');
            toggleSection('usage');
          }}
          className={`w-full p-4 flex items-center justify-between transition-colors ${
            activeLevel === 'usage' ? 'bg-accent/10' : 'hover:bg-accent/5'
          }`}
        >
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-accent" />
            <span className="text-primary">Usage & Grammar</span>
          </div>
          {expandedSections.includes('usage') ? (
            <ChevronUp className="w-4 h-4 text-accent" />
          ) : (
            <ChevronDown className="w-4 h-4 text-accent" />
          )}
        </button>
        {expandedSections.includes('usage') && (
          <div className="p-4 bg-white/50 space-y-3">
            <div>
              <h4 className="text-sm text-accent mb-1">Grammatical Role</h4>
              <p className="text-muted-foreground">{expertAnalysis.usage.grammaticalRole}</p>
            </div>
            {expertAnalysis.usage.prepositions && expertAnalysis.usage.prepositions.length > 0 && (
              <div>
                <h4 className="text-sm text-accent mb-1">Prepositions</h4>
                <ul className="space-y-1">
                  {expertAnalysis.usage.prepositions.map((prep, idx) => (
                    <li key={idx} className="text-muted-foreground text-sm">
                      - {prep}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h4 className="text-sm text-accent mb-1">Examples</h4>
              <ul className="space-y-2">
                {expertAnalysis.usage.examples.map((example, idx) => (
                  <li key={idx} className="text-muted-foreground text-sm">
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Related Forms */}
      {expertAnalysis.relatedForms && (
        <div className="border border-accent/20 rounded-xl overflow-hidden">
          <button
            onClick={() => {
              setActiveLevel(activeLevel === 'related' ? null : 'related');
              toggleSection('related');
            }}
            className={`w-full p-4 flex items-center justify-between transition-colors ${
              activeLevel === 'related' ? 'bg-accent/10' : 'hover:bg-accent/5'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" />
              <span className="text-primary">Related Forms (تصريف)</span>
            </div>
            {expandedSections.includes('related') ? (
              <ChevronUp className="w-4 h-4 text-accent" />
            ) : (
              <ChevronDown className="w-4 h-4 text-accent" />
            )}
          </button>
          {expandedSections.includes('related') && (
            <div className="p-4 bg-white/50 space-y-2">
              {expertAnalysis.relatedForms.pastTense && (
                <div className="flex justify-between">
                  <span className="text-sm text-accent">Past Tense:</span>
                  <span className="text-lg font-arabic" dir="rtl">
                    {expertAnalysis.relatedForms.pastTense}
                  </span>
                </div>
              )}
              {expertAnalysis.relatedForms.presentTense && (
                <div className="flex justify-between">
                  <span className="text-sm text-accent">Present Tense:</span>
                  <span className="text-lg font-arabic" dir="rtl">
                    {expertAnalysis.relatedForms.presentTense}
                  </span>
                </div>
              )}
              {expertAnalysis.relatedForms.imperative && (
                <div className="flex justify-between">
                  <span className="text-sm text-accent">Imperative:</span>
                  <span className="text-lg font-arabic" dir="rtl">
                    {expertAnalysis.relatedForms.imperative}
                  </span>
                </div>
              )}
              {expertAnalysis.relatedForms.activeParticiple && (
                <div className="flex justify-between">
                  <span className="text-sm text-accent">Active Participle:</span>
                  <span className="text-lg font-arabic" dir="rtl">
                    {expertAnalysis.relatedForms.activeParticiple}
                  </span>
                </div>
              )}
              {expertAnalysis.relatedForms.passiveParticiple && (
                <div className="flex justify-between">
                  <span className="text-sm text-accent">Passive Participle:</span>
                  <span className="text-lg font-arabic" dir="rtl">
                    {expertAnalysis.relatedForms.passiveParticiple}
                  </span>
                </div>
              )}
              {expertAnalysis.relatedForms.masdar && (
                <div className="flex justify-between">
                  <span className="text-sm text-accent">Masdar:</span>
                  <span className="text-lg font-arabic" dir="rtl">
                    {expertAnalysis.relatedForms.masdar}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Advanced Notes */}
      {expertAnalysis.notes && (
        <div className="p-4 bg-gradient-to-r from-accent/5 to-accent/10 rounded-xl border border-accent/20">
          <h4 className="text-sm text-accent mb-2 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Advanced Notes
          </h4>
          <p className="text-muted-foreground text-sm">{expertAnalysis.notes}</p>
        </div>
      )}
    </div>
  );
}
