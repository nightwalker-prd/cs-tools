import { useState } from 'react';
import { X, Save } from 'lucide-react';

export interface StudentSarfAnalysis {
  exerciseId: number;
  word: string;
  studentName?: string;

  // Root & Pattern
  root: string;
  pattern: string;

  // Morphology
  category: string;
  verbForm?: string;

  // Usage
  meaning: string;
  grammaticalRole: string;
  prepositions?: string;

  // Related Forms (optional)
  relatedForms?: string;

  // Notes
  notes?: string;

  timestamp: string;
}

interface StudentSarfAnalysisFormProps {
  exerciseId: number;
  word: string;
  onSave: (analysis: StudentSarfAnalysis) => void;
  onCancel: () => void;
  initialData?: StudentSarfAnalysis;
}

export function StudentSarfAnalysisForm({
  exerciseId,
  word,
  onSave,
  onCancel,
  initialData
}: StudentSarfAnalysisFormProps) {
  const [studentName, setStudentName] = useState(initialData?.studentName || '');
  const [root, setRoot] = useState(initialData?.root || '');
  const [pattern, setPattern] = useState(initialData?.pattern || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [verbForm, setVerbForm] = useState(initialData?.verbForm || '');
  const [meaning, setMeaning] = useState(initialData?.meaning || '');
  const [grammaticalRole, setGrammaticalRole] = useState(initialData?.grammaticalRole || '');
  const [prepositions, setPrepositions] = useState(initialData?.prepositions || '');
  const [relatedForms, setRelatedForms] = useState(initialData?.relatedForms || '');
  const [notes, setNotes] = useState(initialData?.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const analysis: StudentSarfAnalysis = {
      exerciseId,
      word,
      studentName: studentName || undefined,
      root,
      pattern,
      category,
      verbForm: verbForm || undefined,
      meaning,
      grammaticalRole,
      prepositions: prepositions || undefined,
      relatedForms: relatedForms || undefined,
      notes: notes || undefined,
      timestamp: new Date().toISOString()
    };

    onSave(analysis);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-[#1a3150] to-[#2a4a70] p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white text-2xl mb-2">Create Sarf Analysis</h2>
              <p className="text-white/80 text-sm">Morphological analysis for: <span className="font-bold font-arabic">{word}</span></p>
            </div>
            <button
              onClick={onCancel}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Student Name (Optional) */}
          <div>
            <label className="block text-sm text-[#1a3150] mb-2">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#c5a253] focus:ring-2 focus:ring-[#c5a253]/20 outline-none transition-all"
              placeholder="Enter your name"
            />
          </div>

          {/* Root Letters */}
          <div>
            <label className="block text-sm text-[#1a3150] mb-2">
              Root Letters (جذر) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={root}
              onChange={(e) => setRoot(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#c5a253] focus:ring-2 focus:ring-[#c5a253]/20 outline-none transition-all font-arabic text-xl"
              placeholder="e.g., ك ت ب"
              required
              dir="rtl"
            />
          </div>

          {/* Pattern */}
          <div>
            <label className="block text-sm text-[#1a3150] mb-2">
              Pattern (وزن) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#c5a253] focus:ring-2 focus:ring-[#c5a253]/20 outline-none transition-all font-arabic text-xl"
              placeholder="e.g., فَعَلَ or فَاعِل"
              required
              dir="rtl"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-[#1a3150] mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#c5a253] focus:ring-2 focus:ring-[#c5a253]/20 outline-none transition-all"
              required
            >
              <option value="">Select category...</option>
              <option value="verb">Verb (فعل)</option>
              <option value="noun">Noun (اسم)</option>
              <option value="active-participle">Active Participle (اسم الفاعل)</option>
              <option value="passive-participle">Passive Participle (اسم المفعول)</option>
              <option value="masdar">Verbal Noun (مصدر)</option>
              <option value="adjective">Adjective (صفة)</option>
            </select>
          </div>

          {/* Verb Form (if applicable) */}
          {(category === 'verb' || category === 'active-participle' || category === 'passive-participle' || category === 'masdar') && (
            <div>
              <label className="block text-sm text-[#1a3150] mb-2">
                Verb Form (Optional)
              </label>
              <select
                value={verbForm}
                onChange={(e) => setVerbForm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#c5a253] focus:ring-2 focus:ring-[#c5a253]/20 outline-none transition-all"
              >
                <option value="">Select form...</option>
                <option value="I">Form I - فَعَلَ</option>
                <option value="II">Form II - فَعَّلَ</option>
                <option value="III">Form III - فَاعَلَ</option>
                <option value="IV">Form IV - أَفْعَلَ</option>
                <option value="V">Form V - تَفَعَّلَ</option>
                <option value="VI">Form VI - تَفَاعَلَ</option>
                <option value="VII">Form VII - اِنْفَعَلَ</option>
                <option value="VIII">Form VIII - اِفْتَعَلَ</option>
                <option value="IX">Form IX - اِفْعَلَّ</option>
                <option value="X">Form X - اِسْتَفْعَلَ</option>
              </select>
            </div>
          )}

          {/* Meaning */}
          <div>
            <label className="block text-sm text-[#1a3150] mb-2">
              Meaning <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#c5a253] focus:ring-2 focus:ring-[#c5a253]/20 outline-none transition-all"
              placeholder="Enter the meaning in English"
              required
            />
          </div>

          {/* Grammatical Role */}
          <div>
            <label className="block text-sm text-[#1a3150] mb-2">
              Grammatical Role & Usage <span className="text-red-500">*</span>
            </label>
            <textarea
              value={grammaticalRole}
              onChange={(e) => setGrammaticalRole(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#c5a253] focus:ring-2 focus:ring-[#c5a253]/20 outline-none transition-all"
              placeholder="e.g., Transitive verb taking a direct object"
              required
            />
          </div>

          {/* Prepositions */}
          <div>
            <label className="block text-sm text-[#1a3150] mb-2">
              Prepositions Used With This Word (Optional)
            </label>
            <input
              type="text"
              value={prepositions}
              onChange={(e) => setPrepositions(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#c5a253] focus:ring-2 focus:ring-[#c5a253]/20 outline-none transition-all font-arabic"
              placeholder="e.g., إِلَى (to), فِي (in), عَلَى (upon)"
              dir="rtl"
            />
          </div>

          {/* Related Forms */}
          <div>
            <label className="block text-sm text-[#1a3150] mb-2">
              Related Forms (تصريف) - Optional
            </label>
            <textarea
              value={relatedForms}
              onChange={(e) => setRelatedForms(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#c5a253] focus:ring-2 focus:ring-[#c5a253]/20 outline-none transition-all font-arabic"
              placeholder="List related forms: past, present, active participle, passive participle, masdar, etc."
              dir="rtl"
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm text-[#1a3150] mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#c5a253] focus:ring-2 focus:ring-[#c5a253]/20 outline-none transition-all"
              placeholder="Any additional observations or notes about this word..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-[#1a3150] to-[#2a4a70] text-white hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Analysis
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
