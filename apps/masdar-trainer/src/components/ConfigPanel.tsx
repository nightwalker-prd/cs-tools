import { useState } from 'react';
import { ChevronDown, Settings } from 'lucide-react';
import type { DrillConfig, DerivativeType, VerbForm, RootType } from '../types';
import { verbs } from '../data';

const ALL_FORMS: VerbForm[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
const ALL_ROOT_TYPES: RootType[] = ['Regular', 'Mithal', 'Ajwaf', 'Naqis', "Mudaa'af", 'Mahmooz', 'Lafif'];
const ROOT_TYPE_AR: Record<RootType, string> = {
  Regular: 'صحيح',
  Mithal: 'مثال',
  Ajwaf: 'أجوف',
  Naqis: 'ناقص',
  "Mudaa'af": 'مضاعف',
  Mahmooz: 'مهموز',
  Lafif: 'لفيف',
};
const DERIVATIVE_OPTIONS: { type: DerivativeType; ar: string; en: string }[] = [
  { type: 'masdar', ar: 'المصدر', en: 'Masdar' },
  { type: 'ism-fail', ar: 'اسم الفاعل', en: "Ism Fa'il" },
  { type: 'ism-maful', ar: 'اسم المفعول', en: "Ism Maf'ul" },
];
const DRILL_SIZES = [5, 10, 15, 20];

interface ConfigPanelProps {
  config: DrillConfig;
  onConfigChange: (config: DrillConfig) => void;
  onStartDrill: () => void;
}

export function ConfigPanel({ config, onConfigChange, onStartDrill }: ConfigPanelProps) {
  const [expanded, setExpanded] = useState(true);

  const toggleDerivativeType = (type: DerivativeType) => {
    const current = config.derivativeTypes;
    const newTypes = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    // Ensure at least one type remains selected
    if (newTypes.length === 0) return;
    onConfigChange({ ...config, derivativeTypes: newTypes });
  };

  const toggleForm = (form: VerbForm) => {
    const current = config.selectedForms;
    const newForms = current.includes(form)
      ? current.filter(f => f !== form)
      : [...current, form];
    if (newForms.length === 0) return;
    onConfigChange({ ...config, selectedForms: newForms });
  };

  const toggleRootType = (rootType: RootType) => {
    const current = config.selectedRootTypes;
    const newTypes = current.includes(rootType)
      ? current.filter(r => r !== rootType)
      : [...current, rootType];
    if (newTypes.length === 0) return;
    onConfigChange({ ...config, selectedRootTypes: newTypes });
  };

  // Count available verbs for current config
  const availableCount = verbs.filter(v => {
    if (!config.selectedForms.includes(v.verbForm)) return false;
    if (!config.selectedRootTypes.includes(v.rootType)) return false;
    if (config.difficulty === 'beginner' && v.difficulty === 'advanced') return false;
    return true;
  }).length;

  const allDerivatives = config.derivativeTypes.length === 3;

  return (
    <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl shadow-lg mb-8 overflow-hidden">
      {/* Collapsible header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-white/40 transition-all duration-300 rounded-3xl group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(197, 162, 83, 0.1)' }}>
            <Settings className="w-5 h-5" style={{ color: '#c5a253' }} />
          </div>
          <h2 className="text-primary text-xl font-medium">Drill Configuration</h2>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-primary transition-all duration-700 ${expanded ? 'rotate-180 text-accent' : ''}`}
        />
      </button>

      {/* Collapsible content */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: expanded ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="px-6 pb-8 pt-2 space-y-6">
            {/* Derivative Type Selector */}
            <div>
              <h3 className="text-primary text-base font-medium mb-3">Derivative Type</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    onConfigChange({
                      ...config,
                      derivativeTypes: allDerivatives
                        ? ['masdar']
                        : ['masdar', 'ism-fail', 'ism-maful'],
                    })
                  }
                  className={`px-4 py-2 text-sm rounded-xl border transition-all ${
                    allDerivatives
                      ? 'bg-accent text-white border-accent shadow-md'
                      : 'bg-white text-primary border-gray-300 hover:border-accent'
                  }`}
                >
                  All
                </button>
                {DERIVATIVE_OPTIONS.map(opt => (
                  <button
                    key={opt.type}
                    onClick={() => toggleDerivativeType(opt.type)}
                    className={`px-4 py-2 text-sm rounded-xl border transition-all ${
                      config.derivativeTypes.includes(opt.type)
                        ? 'bg-accent text-white border-accent shadow-md'
                        : 'bg-white text-primary border-gray-300 hover:border-accent'
                    }`}
                  >
                    <span className="font-arabic" dir="rtl">{opt.ar}</span>
                    <span className="ml-2 text-xs opacity-70">{opt.en}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-primary text-base font-medium">Verb Forms</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => onConfigChange({ ...config, selectedForms: [...ALL_FORMS] })}
                    className="text-xs px-2 py-1 rounded-md hover:bg-accent/10"
                    style={{ color: '#c5a253' }}
                  >
                    All
                  </button>
                  <button
                    onClick={() => onConfigChange({ ...config, selectedForms: ['II'] })}
                    className="text-xs px-2 py-1 rounded-md hover:bg-gray-100"
                    style={{ color: '#64748b' }}
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {ALL_FORMS.map(form => (
                  <button
                    key={form}
                    onClick={() => toggleForm(form)}
                    className={`px-4 py-1.5 text-sm rounded-lg border transition-all ${
                      config.selectedForms.includes(form)
                        ? 'bg-accent text-white border-accent'
                        : 'bg-white text-primary border-gray-300 hover:border-accent'
                    }`}
                  >
                    {form}
                  </button>
                ))}
              </div>
            </div>

            {/* Root Type Filter */}
            <div>
              <h3 className="text-primary text-base font-medium mb-3">Root Type</h3>
              <div className="flex flex-wrap gap-2">
                {ALL_ROOT_TYPES.map(rt => (
                  <button
                    key={rt}
                    onClick={() => toggleRootType(rt)}
                    className={`px-4 py-1.5 text-sm rounded-lg border transition-all font-arabic ${
                      config.selectedRootTypes.includes(rt)
                        ? 'bg-accent text-white border-accent'
                        : 'bg-white text-primary border-gray-300 hover:border-accent'
                    }`}
                  >
                    {ROOT_TYPE_AR[rt]}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <h3 className="text-primary text-base font-medium mb-3">Difficulty</h3>
              <div className="flex flex-wrap gap-2">
                {(['beginner', 'intermediate', 'advanced'] as const).map(d => (
                  <button
                    key={d}
                    onClick={() => onConfigChange({ ...config, difficulty: d })}
                    className={`px-4 py-1.5 text-sm rounded-lg border transition-all capitalize ${
                      config.difficulty === d
                        ? 'bg-accent text-white border-accent'
                        : 'bg-white text-primary border-gray-300 hover:border-accent'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Drill Size */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Questions:</span>
              <div className="flex gap-2">
                {DRILL_SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => onConfigChange({ ...config, drillSize: size })}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                      config.drillSize === size
                        ? 'bg-accent text-white border-accent'
                        : 'bg-white text-primary border-gray-300 hover:border-accent'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary and Start */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-muted-foreground mb-4">
                {config.drillSize} questions | Produce Derivative (
                {config.derivativeTypes.length === 3
                  ? 'All'
                  : config.derivativeTypes
                      .map(t => (t === 'masdar' ? 'Masdar' : t === 'ism-fail' ? "Ism Fa'il" : "Ism Maf'ul"))
                      .join(', ')}
                ) | Forms {config.selectedForms.join(', ')} | {availableCount} verbs available
              </p>
              <button
                onClick={onStartDrill}
                disabled={availableCount === 0}
                className="w-full sm:w-auto px-8 py-3 bg-accent text-white rounded-xl font-semibold shadow-lg hover:bg-accent/90 hover:shadow-xl transition-all hover:-translate-y-0.5 animate-gold-pulse disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-none"
              >
                Start Drill
              </button>
              {availableCount === 0 && (
                <p className="text-sm text-red-500 mt-2">
                  No verbs match this combination. Try widening your filters.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
