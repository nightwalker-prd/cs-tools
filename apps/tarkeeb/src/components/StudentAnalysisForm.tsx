import { useState } from 'react';
import { X, Plus, Trash2, Save, BookOpen, Layers, GitBranch, Lightbulb } from 'lucide-react';
import { TarkeebExercise } from '../data/tarkeebExercises';

interface WordAnalysis {
  word: string;
  transliteration: string;
  grammaticalRole: string;
  grammaticalRoleAr: string;
  caseMarking: string;
  caseMarkingAr: string;
  wordType: string;
  wordTypeAr: string;
  notes?: string;
  notesAr?: string;
}

interface PhraseAnalysis {
  phrase: string;
  phraseType: string;
  phraseTypeAr: string;
  function: string;
  functionAr: string;
  notes?: string;
  notesAr?: string;
}

interface SentenceAnalysis {
  sentenceType: string;
  sentenceTypeAr: string;
  mainComponents: {
    predicate?: string;
    predicateAr?: string;
    subject?: string;
    subjectAr?: string;
    object?: string;
    objectAr?: string;
  };
  structure: string;
  structureAr: string;
}

interface KeyConcept {
  concept: string;
  conceptAr: string;
  explanation: string;
  explanationAr: string;
}

export interface StudentAnalysis {
  exerciseId: number;
  arabic: string;
  translation: string;
  wordAnalysis: WordAnalysis[];
  phraseAnalysis: PhraseAnalysis[];
  sentenceAnalysis: SentenceAnalysis;
  keyGrammaticalConcepts: KeyConcept[];
  teachingNotes?: string;
  teachingNotesAr?: string;
  createdAt: string;
}

interface StudentAnalysisFormProps {
  exercise: TarkeebExercise;
  existingAnalysis?: StudentAnalysis;
  onClose: () => void;
  onSave: (analysis: StudentAnalysis) => void;
}

export function StudentAnalysisForm({
  exercise,
  existingAnalysis,
  onClose,
  onSave,
}: StudentAnalysisFormProps) {
  const [activeTab, setActiveTab] = useState<'word' | 'phrase' | 'sentence' | 'concepts'>('word');

  // Initialize with existing analysis or defaults
  const [wordAnalysis, setWordAnalysis] = useState<WordAnalysis[]>(
    existingAnalysis?.wordAnalysis || []
  );
  const [phraseAnalysis, setPhraseAnalysis] = useState<PhraseAnalysis[]>(
    existingAnalysis?.phraseAnalysis || []
  );
  const [sentenceAnalysis, setSentenceAnalysis] = useState<SentenceAnalysis>(
    existingAnalysis?.sentenceAnalysis || {
      sentenceType: '',
      sentenceTypeAr: '',
      mainComponents: {},
      structure: '',
      structureAr: '',
    }
  );
  const [concepts, setConcepts] = useState<KeyConcept[]>(
    existingAnalysis?.keyGrammaticalConcepts || []
  );
  const [teachingNotes, setTeachingNotes] = useState(existingAnalysis?.teachingNotes || '');
  const [teachingNotesAr, setTeachingNotesAr] = useState(existingAnalysis?.teachingNotesAr || '');

  const handleSave = () => {
    const analysis: StudentAnalysis = {
      exerciseId: exercise.id,
      arabic: exercise.arabic,
      translation: exercise.translation,
      wordAnalysis,
      phraseAnalysis,
      sentenceAnalysis,
      keyGrammaticalConcepts: concepts,
      teachingNotes,
      teachingNotesAr,
      createdAt: existingAnalysis?.createdAt || new Date().toISOString(),
    };
    onSave(analysis);
  };

  // Word Analysis Functions
  const addWord = () => {
    setWordAnalysis([
      ...wordAnalysis,
      {
        word: '',
        transliteration: '',
        grammaticalRole: '',
        grammaticalRoleAr: '',
        caseMarking: '',
        caseMarkingAr: '',
        wordType: '',
        wordTypeAr: '',
      },
    ]);
  };

  const updateWord = (index: number, field: keyof WordAnalysis, value: string) => {
    const updated = [...wordAnalysis];
    updated[index] = { ...updated[index], [field]: value };
    setWordAnalysis(updated);
  };

  const removeWord = (index: number) => {
    setWordAnalysis(wordAnalysis.filter((_, i) => i !== index));
  };

  // Phrase Analysis Functions
  const addPhrase = () => {
    setPhraseAnalysis([
      ...phraseAnalysis,
      {
        phrase: '',
        phraseType: '',
        phraseTypeAr: '',
        function: '',
        functionAr: '',
      },
    ]);
  };

  const updatePhrase = (index: number, field: keyof PhraseAnalysis, value: string) => {
    const updated = [...phraseAnalysis];
    updated[index] = { ...updated[index], [field]: value };
    setPhraseAnalysis(updated);
  };

  const removePhrase = (index: number) => {
    setPhraseAnalysis(phraseAnalysis.filter((_, i) => i !== index));
  };

  // Concept Functions
  const addConcept = () => {
    setConcepts([
      ...concepts,
      {
        concept: '',
        conceptAr: '',
        explanation: '',
        explanationAr: '',
      },
    ]);
  };

  const updateConcept = (index: number, field: keyof KeyConcept, value: string) => {
    const updated = [...concepts];
    updated[index] = { ...updated[index], [field]: value };
    setConcepts(updated);
  };

  const removeConcept = (index: number) => {
    setConcepts(concepts.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a3150] to-[#2a4a6f] px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-white">Create Your Analysis</h2>
            <p className="text-white/80 text-sm">
              Exercise {exercise.id}: {exercise.translation}
            </p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Arabic Text */}
        <div className="px-6 py-4 bg-gradient-to-br from-slate-50 to-blue-50 border-b">
          <p
            className="text-2xl text-center text-[#1a3150] font-arabic leading-relaxed"
            dir="rtl"
          >
            {exercise.arabic}
          </p>
        </div>

        {/* Tabs */}
        <div className="px-6 py-3 border-b bg-gray-50 flex gap-2">
          <button
            onClick={() => setActiveTab('word')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === 'word'
                ? 'bg-[#1a3150] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Word Analysis</span>
          </button>
          <button
            onClick={() => setActiveTab('phrase')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === 'phrase'
                ? 'bg-[#1a3150] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Phrase Analysis</span>
          </button>
          <button
            onClick={() => setActiveTab('sentence')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === 'sentence'
                ? 'bg-[#1a3150] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>Sentence Structure</span>
          </button>
          <button
            onClick={() => setActiveTab('concepts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === 'concepts'
                ? 'bg-[#1a3150] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Key Concepts</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Word Analysis Tab */}
          {activeTab === 'word' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Analyze each word in the sentence</p>
                <button
                  onClick={addWord}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#c5a253] text-white rounded-lg text-sm hover:bg-[#b39143] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Word
                </button>
              </div>

              {wordAnalysis.map((word, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Word {index + 1}</span>
                    <button
                      onClick={() => removeWord(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Arabic Word *</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={word.word}
                        onChange={(e) => updateWord(index, 'word', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-lg font-arabic"
                        placeholder="الكلمة"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Transliteration</label>
                      <input
                        type="text"
                        value={word.transliteration}
                        onChange={(e) => updateWord(index, 'transliteration', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="al-kalimah"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Grammatical Role *</label>
                      <input
                        type="text"
                        value={word.grammaticalRole}
                        onChange={(e) => updateWord(index, 'grammaticalRole', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="Subject, Object, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Grammatical Role (Arabic)
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        value={word.grammaticalRoleAr}
                        onChange={(e) => updateWord(index, 'grammaticalRoleAr', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm font-arabic"
                        placeholder="فاعل، مفعول به، إلخ"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Case Marking *</label>
                      <input
                        type="text"
                        value={word.caseMarking}
                        onChange={(e) => updateWord(index, 'caseMarking', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="Nominative, Accusative, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Case Marking (Arabic)
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        value={word.caseMarkingAr}
                        onChange={(e) => updateWord(index, 'caseMarkingAr', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm font-arabic"
                        placeholder="مرفوع، منصوب، إلخ"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Word Type *</label>
                      <input
                        type="text"
                        value={word.wordType}
                        onChange={(e) => updateWord(index, 'wordType', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="Noun, Verb, Particle"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Word Type (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={word.wordTypeAr}
                        onChange={(e) => updateWord(index, 'wordTypeAr', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm font-arabic"
                        placeholder="اسم، فعل، حرف"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Notes (Optional)</label>
                    <textarea
                      value={word.notes || ''}
                      onChange={(e) => updateWord(index, 'notes', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      rows={2}
                      placeholder="Additional notes..."
                    />
                  </div>
                </div>
              ))}

              {wordAnalysis.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No words added yet. Click "Add Word" to begin.</p>
                </div>
              )}
            </div>
          )}

          {/* Phrase Analysis Tab */}
          {activeTab === 'phrase' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Identify phrases and their functions</p>
                <button
                  onClick={addPhrase}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#c5a253] text-white rounded-lg text-sm hover:bg-[#b39143] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Phrase
                </button>
              </div>

              {phraseAnalysis.map((phrase, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Phrase {index + 1}</span>
                    <button
                      onClick={() => removePhrase(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Phrase (Arabic) *</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={phrase.phrase}
                      onChange={(e) => updatePhrase(index, 'phrase', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-lg font-arabic"
                      placeholder="العبارة"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Phrase Type *</label>
                      <input
                        type="text"
                        value={phrase.phraseType}
                        onChange={(e) => updatePhrase(index, 'phraseType', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="Idafa, Descriptive, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Phrase Type (Arabic)
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        value={phrase.phraseTypeAr}
                        onChange={(e) => updatePhrase(index, 'phraseTypeAr', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm font-arabic"
                        placeholder="إضافة، صفة، إلخ"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Function *</label>
                      <input
                        type="text"
                        value={phrase.function}
                        onChange={(e) => updatePhrase(index, 'function', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="Modifier, Complement, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Function (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={phrase.functionAr}
                        onChange={(e) => updatePhrase(index, 'functionAr', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm font-arabic"
                        placeholder="نعت، خبر، إلخ"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Notes (Optional)</label>
                    <textarea
                      value={phrase.notes || ''}
                      onChange={(e) => updatePhrase(index, 'notes', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      rows={2}
                      placeholder="Additional notes..."
                    />
                  </div>
                </div>
              ))}

              {phraseAnalysis.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Layers className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No phrases added yet. Click "Add Phrase" to begin.</p>
                </div>
              )}
            </div>
          )}

          {/* Sentence Structure Tab */}
          {activeTab === 'sentence' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Analyze the overall sentence structure</p>

              <div className="border-2 border-gray-200 rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Sentence Type *</label>
                    <input
                      type="text"
                      value={sentenceAnalysis.sentenceType}
                      onChange={(e) =>
                        setSentenceAnalysis({ ...sentenceAnalysis, sentenceType: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="Verbal, Nominal, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Sentence Type (Arabic)
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={sentenceAnalysis.sentenceTypeAr}
                      onChange={(e) =>
                        setSentenceAnalysis({ ...sentenceAnalysis, sentenceTypeAr: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm font-arabic"
                      placeholder="جملة فعلية، اسمية، إلخ"
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm text-gray-700 mb-3">Main Components</h4>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Predicate/Verb</label>
                        <input
                          type="text"
                          value={sentenceAnalysis.mainComponents.predicate || ''}
                          onChange={(e) =>
                            setSentenceAnalysis({
                              ...sentenceAnalysis,
                              mainComponents: {
                                ...sentenceAnalysis.mainComponents,
                                predicate: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                          placeholder="Main verb"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Predicate (Arabic)
                        </label>
                        <input
                          type="text"
                          dir="rtl"
                          value={sentenceAnalysis.mainComponents.predicateAr || ''}
                          onChange={(e) =>
                            setSentenceAnalysis({
                              ...sentenceAnalysis,
                              mainComponents: {
                                ...sentenceAnalysis.mainComponents,
                                predicateAr: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg text-sm font-arabic"
                          placeholder="الفعل"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Subject</label>
                        <input
                          type="text"
                          value={sentenceAnalysis.mainComponents.subject || ''}
                          onChange={(e) =>
                            setSentenceAnalysis({
                              ...sentenceAnalysis,
                              mainComponents: {
                                ...sentenceAnalysis.mainComponents,
                                subject: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                          placeholder="Subject"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Subject (Arabic)</label>
                        <input
                          type="text"
                          dir="rtl"
                          value={sentenceAnalysis.mainComponents.subjectAr || ''}
                          onChange={(e) =>
                            setSentenceAnalysis({
                              ...sentenceAnalysis,
                              mainComponents: {
                                ...sentenceAnalysis.mainComponents,
                                subjectAr: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg text-sm font-arabic"
                          placeholder="الفاعل"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Object</label>
                        <input
                          type="text"
                          value={sentenceAnalysis.mainComponents.object || ''}
                          onChange={(e) =>
                            setSentenceAnalysis({
                              ...sentenceAnalysis,
                              mainComponents: {
                                ...sentenceAnalysis.mainComponents,
                                object: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                          placeholder="Object (if applicable)"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Object (Arabic)</label>
                        <input
                          type="text"
                          dir="rtl"
                          value={sentenceAnalysis.mainComponents.objectAr || ''}
                          onChange={(e) =>
                            setSentenceAnalysis({
                              ...sentenceAnalysis,
                              mainComponents: {
                                ...sentenceAnalysis.mainComponents,
                                objectAr: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg text-sm font-arabic"
                          placeholder="المفعول به"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Overall Structure *</label>
                      <textarea
                        value={sentenceAnalysis.structure}
                        onChange={(e) =>
                          setSentenceAnalysis({ ...sentenceAnalysis, structure: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        rows={3}
                        placeholder="Describe the overall structure..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Overall Structure (Arabic)
                      </label>
                      <textarea
                        dir="rtl"
                        value={sentenceAnalysis.structureAr}
                        onChange={(e) =>
                          setSentenceAnalysis({ ...sentenceAnalysis, structureAr: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg text-sm font-arabic"
                        rows={3}
                        placeholder="وصف البنية العامة..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Concepts Tab */}
          {activeTab === 'concepts' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Identify key grammatical concepts demonstrated
                </p>
                <button
                  onClick={addConcept}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#c5a253] text-white rounded-lg text-sm hover:bg-[#b39143] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Concept
                </button>
              </div>

              {concepts.map((concept, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Concept {index + 1}</span>
                    <button
                      onClick={() => removeConcept(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Concept *</label>
                      <input
                        type="text"
                        value={concept.concept}
                        onChange={(e) => updateConcept(index, 'concept', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="e.g., Definite Article"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Concept (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={concept.conceptAr}
                        onChange={(e) => updateConcept(index, 'conceptAr', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm font-arabic"
                        placeholder="مثلاً: أل التعريف"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Explanation *</label>
                      <textarea
                        value={concept.explanation}
                        onChange={(e) => updateConcept(index, 'explanation', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        rows={3}
                        placeholder="Explain the concept..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Explanation (Arabic)
                      </label>
                      <textarea
                        dir="rtl"
                        value={concept.explanationAr}
                        onChange={(e) => updateConcept(index, 'explanationAr', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm font-arabic"
                        rows={3}
                        placeholder="شرح المفهوم..."
                      />
                    </div>
                  </div>
                </div>
              ))}

              {concepts.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Lightbulb className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No concepts added yet. Click "Add Concept" to begin.</p>
                </div>
              )}

              {/* Teaching Notes */}
              <div className="border-t pt-4 mt-6">
                <h4 className="text-sm text-gray-700 mb-3">Personal Notes (Optional)</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Notes</label>
                    <textarea
                      value={teachingNotes}
                      onChange={(e) => setTeachingNotes(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      rows={3}
                      placeholder="Personal observations..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Notes (Arabic)</label>
                    <textarea
                      dir="rtl"
                      value={teachingNotesAr}
                      onChange={(e) => setTeachingNotesAr(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm font-arabic"
                      rows={3}
                      placeholder="ملاحظات شخصية..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#c5a253] to-[#d4b366] text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Save className="w-4 h-4" />
            Save Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
