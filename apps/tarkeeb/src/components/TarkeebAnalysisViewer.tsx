import { useState } from 'react';
import { TarkeebAnalysisExample } from '../data/tarkeebAnalysis';
import { StudentAnalysis } from './StudentAnalysisForm';
import { ChevronDown, ChevronUp, BookOpen, Layers, GitBranch, Lightbulb } from 'lucide-react';

interface TarkeebAnalysisViewerProps {
  analysis: TarkeebAnalysisExample | StudentAnalysis;
}

export function TarkeebAnalysisViewer({ analysis }: TarkeebAnalysisViewerProps) {
  const [activeLevel, setActiveLevel] = useState<'word' | 'phrase' | 'sentence' | 'concepts' | null>(
    'word'
  );
  const [expandedWords, setExpandedWords] = useState<number[]>([]);

  const toggleWord = (index: number) => {
    setExpandedWords((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleAllWords = () => {
    if (expandedWords.length === analysis.wordAnalysis.length) {
      setExpandedWords([]);
    } else {
      setExpandedWords(analysis.wordAnalysis.map((_, i) => i));
    }
  };

  return (
    <div className="space-y-4">
      {/* Analysis Level Tabs */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setActiveLevel('word')}
          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-all ${
            activeLevel === 'word'
              ? 'bg-[#1a3150] text-white'
              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#c5a253]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Word</span>
        </button>
        <button
          onClick={() => setActiveLevel('phrase')}
          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-all ${
            activeLevel === 'phrase'
              ? 'bg-[#1a3150] text-white'
              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#c5a253]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Phrase</span>
        </button>
        <button
          onClick={() => setActiveLevel('sentence')}
          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-all ${
            activeLevel === 'sentence'
              ? 'bg-[#1a3150] text-white'
              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#c5a253]'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5" />
          <span>Sentence</span>
        </button>
        <button
          onClick={() => setActiveLevel('concepts')}
          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-all ${
            activeLevel === 'concepts'
              ? 'bg-[#1a3150] text-white'
              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#c5a253]'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Concepts</span>
        </button>
      </div>

      {/* Level 1: Word Analysis */}
      {activeLevel === 'word' && (
        <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#1a3150] to-[#2a4a6f] px-4 py-3 flex items-center justify-between">
            <h4 className="text-white text-sm">Word Analysis</h4>
            <button
              onClick={toggleAllWords}
              className="text-[#c5a253] hover:text-white text-xs transition-colors"
            >
              {expandedWords.length === analysis.wordAnalysis.length ? 'Collapse' : 'Expand All'}
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {analysis.wordAnalysis.map((word, index) => (
              <div key={index} className="p-3 hover:bg-gray-50 transition-colors">
                <button
                  onClick={() => toggleWord(index)}
                  className="w-full flex items-start justify-between text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xl text-[#1a3150] font-arabic" dir="rtl">
                        {word.word}
                      </span>
                      <span className="text-xs text-gray-500">{word.transliteration}</span>
                    </div>
                    <div className="text-xs text-[#c5a253]">{word.grammaticalRole}</div>
                  </div>
                  {expandedWords.includes(index) ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {expandedWords.includes(index) && (
                  <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">Role</div>
                      <div className="text-xs text-gray-900">{word.grammaticalRole}</div>
                      <div className="text-xs text-gray-600 font-arabic" dir="rtl">
                        {word.grammaticalRoleAr}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">Case</div>
                      <div className="text-xs text-gray-900">{word.caseMarking}</div>
                      <div className="text-xs text-gray-600 font-arabic" dir="rtl">
                        {word.caseMarkingAr}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">Type</div>
                      <div className="text-xs text-gray-900">{word.wordType}</div>
                      <div className="text-xs text-gray-600 font-arabic" dir="rtl">
                        {word.wordTypeAr}
                      </div>
                    </div>
                    {word.notes && (
                      <div>
                        <div className="text-xs text-gray-500 mb-0.5">Notes</div>
                        <div className="text-xs text-gray-900">{word.notes}</div>
                        {word.notesAr && (
                          <div className="text-xs text-gray-600 font-arabic" dir="rtl">
                            {word.notesAr}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Level 2: Phrase Analysis */}
      {activeLevel === 'phrase' && (
        <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#1a3150] to-[#2a4a6f] px-4 py-3">
            <h4 className="text-white text-sm">Phrase Analysis</h4>
          </div>
          <div className="divide-y divide-gray-200">
            {analysis.phraseAnalysis.map((phrase, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div
                  className="text-lg text-[#1a3150] mb-2 font-arabic leading-relaxed"
                  dir="rtl"
                >
                  {phrase.phrase}
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Type</div>
                    <div className="text-xs text-gray-900">{phrase.phraseType}</div>
                    <div className="text-xs text-gray-600 font-arabic" dir="rtl">
                      {phrase.phraseTypeAr}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Function</div>
                    <div className="text-xs text-gray-900">{phrase.function}</div>
                    <div className="text-xs text-gray-600 font-arabic" dir="rtl">
                      {phrase.functionAr}
                    </div>
                  </div>
                </div>
                {phrase.notes && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="text-xs text-gray-500 mb-0.5">Notes</div>
                    <div className="text-xs text-gray-900">{phrase.notes}</div>
                    {phrase.notesAr && (
                      <div className="text-xs text-gray-600 font-arabic mt-1" dir="rtl">
                        {phrase.notesAr}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Level 3: Sentence Structure */}
      {activeLevel === 'sentence' && (
        <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#1a3150] to-[#2a4a6f] px-4 py-3">
            <h4 className="text-white text-sm">Sentence Structure</h4>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Sentence Type</div>
              <div className="text-xs text-gray-900">{analysis.sentenceAnalysis.sentenceType}</div>
              <div className="text-xs text-gray-600 font-arabic" dir="rtl">
                {analysis.sentenceAnalysis.sentenceTypeAr}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3">
              <h5 className="text-xs text-gray-700 mb-3">Main Components</h5>
              <div className="space-y-2">
                {analysis.sentenceAnalysis.mainComponents.predicate && (
                  <div className="flex items-start gap-2">
                    <div className="px-2 py-0.5 bg-[#c5a253] text-white text-[10px] rounded flex-shrink-0">
                      Verb
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-900">
                        {analysis.sentenceAnalysis.mainComponents.predicate}
                      </div>
                      <div className="text-xs text-gray-600 font-arabic" dir="rtl">
                        {analysis.sentenceAnalysis.mainComponents.predicateAr}
                      </div>
                    </div>
                  </div>
                )}
                {analysis.sentenceAnalysis.mainComponents.subject && (
                  <div className="flex items-start gap-2">
                    <div className="px-2 py-0.5 bg-[#1a3150] text-white text-[10px] rounded flex-shrink-0">
                      Subj
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-900">
                        {analysis.sentenceAnalysis.mainComponents.subject}
                      </div>
                      <div className="text-xs text-gray-600 font-arabic" dir="rtl">
                        {analysis.sentenceAnalysis.mainComponents.subjectAr}
                      </div>
                    </div>
                  </div>
                )}
                {analysis.sentenceAnalysis.mainComponents.object && (
                  <div className="flex items-start gap-2">
                    <div className="px-2 py-0.5 bg-[#2a4a6f] text-white text-[10px] rounded flex-shrink-0">
                      Obj
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-900">
                        {analysis.sentenceAnalysis.mainComponents.object}
                      </div>
                      <div className="text-xs text-gray-600 font-arabic" dir="rtl">
                        {analysis.sentenceAnalysis.mainComponents.objectAr}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Overall Structure</div>
              <div className="text-xs text-gray-900">{analysis.sentenceAnalysis.structure}</div>
              <div className="text-xs text-gray-600 font-arabic" dir="rtl">
                {analysis.sentenceAnalysis.structureAr}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Level 4: Key Concepts */}
      {activeLevel === 'concepts' && (
        <div className="space-y-3">
          {analysis.keyGrammaticalConcepts.map((concept, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:border-[#c5a253] transition-all"
            >
              <div className="bg-gradient-to-r from-[#c5a253] to-[#d4b366] px-3 py-2">
                <h5 className="text-white text-xs">{concept.concept}</h5>
                <div className="text-white/90 text-xs font-arabic" dir="rtl">
                  {concept.conceptAr}
                </div>
              </div>
              <div className="p-3">
                <div className="text-xs text-gray-900 mb-1">{concept.explanation}</div>
                <div className="text-xs text-gray-600 font-arabic" dir="rtl">
                  {concept.explanationAr}
                </div>
              </div>
            </div>
          ))}

          {analysis.teachingNotes && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 p-3">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h5 className="text-blue-900 mb-1 text-xs">Teaching Notes</h5>
                  <div className="text-xs text-blue-800 mb-1">{analysis.teachingNotes}</div>
                  {analysis.teachingNotesAr && (
                    <div className="text-xs text-blue-700 font-arabic" dir="rtl">
                      {analysis.teachingNotesAr}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
