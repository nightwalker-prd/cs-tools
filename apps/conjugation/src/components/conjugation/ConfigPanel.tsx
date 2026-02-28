import { useState } from 'react';
import { Settings, ChevronDown, Sparkles } from 'lucide-react';
import { validateFormForVerbType } from '../../data/conjugationValidation';
import { CONJUGATION_TYPES, PARTICIPLE_TYPES } from '../../data/conjugationTypes';
import { CONFIG_PRESETS, type ConfigPreset } from '../../data/configPresets';

interface ConfigPanelProps {
  selectedForms: number[];
  selectedVerbTypes: string[];
  selectedConjugationTypes: string[];
  onFormsChange: (forms: number[]) => void;
  onVerbTypesChange: (types: string[]) => void;
  onConjugationTypesChange: (types: string[]) => void;
  validVerbTypes: string[];
  validConjugationTypes: string[];
  strictMode?: boolean;
  onStrictModeChange?: (enabled: boolean) => void;
  cellCount: number;
  onCellCountChange: (count: number) => void;
  onPresetSelect?: (presetListName: string, options?: { cellCount?: number; disableFormsProgression?: boolean; fixedBaabs?: [string, string][] }) => void;
}

const allForms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const formRomanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const verbTypes = [
  { key: 'Regular', label: 'صحيح' },
  { key: 'Mithal', label: 'مثال' },
  { key: 'Ajwaf', label: 'أجوف' },
  { key: 'Naqis', label: 'ناقص' },
  { key: "Mudaa'af", label: 'مضاعف' },
  { key: "Mahmooz al-Fa'", label: 'مهموز الفاء' },
  { key: "Mahmooz al-'Ayn", label: 'مهموز العين' },
  { key: 'Mahmooz al-Lam', label: 'مهموز اللام' },
  { key: 'Lafif Maqroon', label: 'لفيف مقرون' },
  { key: 'Lafif Mafrooq', label: 'لفيف مفروق' },
];

export function ConfigPanel({
  selectedForms,
  selectedVerbTypes,
  selectedConjugationTypes,
  onFormsChange,
  onVerbTypesChange,
  onConjugationTypesChange,
  validVerbTypes,
  validConjugationTypes,
  strictMode = false,
  cellCount,
  onCellCountChange,
  onPresetSelect,
}: ConfigPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const handleApplyPreset = (preset: ConfigPreset) => {
    onFormsChange(preset.forms);
    onVerbTypesChange(preset.verbTypes);
    onConjugationTypesChange(preset.conjugationTypes);
    setActivePreset(preset.id);
    onPresetSelect?.(preset.presetListName, {
      cellCount: preset.cellCount,
      disableFormsProgression: preset.disableFormsProgression,
      fixedBaabs: preset.fixedBaabs,
    });
  };

  // Clear active preset when user manually changes settings
  const clearActivePreset = () => {
    setActivePreset(null);
  };

  const handleFormToggle = (form: number) => {
    clearActivePreset();
    if (selectedForms.includes(form)) {
      const newForms = selectedForms.filter(f => f !== form);
      if (newForms.length > 0) {
        onFormsChange(newForms);
      }
    } else {
      onFormsChange([...selectedForms, form]);
    }
  };

  const handleVerbTypeToggle = (type: string) => {
    clearActivePreset();
    if (selectedVerbTypes.includes(type)) {
      onVerbTypesChange(selectedVerbTypes.filter(t => t !== type));
    } else {
      onVerbTypesChange([...selectedVerbTypes, type]);
    }
  };

  const handleSelectAllForms = () => {
    clearActivePreset();
    onFormsChange([...allForms]);
  };

  const handleDeselectAllForms = () => {
    clearActivePreset();
    onFormsChange([1]);
  };

  const handleSelectAllTypes = () => {
    clearActivePreset();
    onVerbTypesChange(verbTypes.map(t => t.key));
  };

  const handleDeselectAllTypes = () => {
    clearActivePreset();
    onVerbTypesChange([]);
  };

  const handleConjugationTypeToggle = (type: string) => {
    clearActivePreset();
    if (selectedConjugationTypes.includes(type)) {
      const newTypes = selectedConjugationTypes.filter(t => t !== type);
      if (newTypes.length > 0) {
        onConjugationTypesChange(newTypes);
      }
    } else {
      onConjugationTypesChange([...selectedConjugationTypes, type]);
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl shadow-lg mb-8 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-white/40 transition-all duration-300 rounded-3xl group"
      >
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg transition-all duration-300 group-hover:scale-105"
            style={{ backgroundColor: 'rgba(197, 162, 83, 0.1)' }}
          >
            <Settings
              className="w-5 h-5 transition-transform duration-500 group-hover:rotate-90"
              style={{ color: '#c5a253' }}
            />
          </div>
          <h2 className="text-primary text-xl font-medium transition-colors duration-300 group-hover:text-accent">
            Practice Configuration
          </h2>
        </div>
        <div className="flex items-center gap-4">
          {/* Cell Count Selector */}
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <span className="text-sm text-muted-foreground">Cells:</span>
            <select
              value={cellCount}
              onChange={(e) => onCellCountChange(Number(e.target.value))}
              className="px-3 py-1 text-sm rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              {[2, 4, 6, 8, 10, 12].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-primary transition-all duration-700 ${
              isExpanded ? 'rotate-180 text-accent' : 'rotate-0'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
            }}
          />
        </div>
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: isExpanded ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
          opacity: isExpanded ? 1 : 0,
          transitionProperty: 'grid-template-rows, opacity',
          transitionDuration: '0.6s, 0.4s',
          transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1), ease-out'
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="px-6 pb-8 pt-2">
            {/* Quick Presets */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-accent" />
                <h3 className="text-primary text-base font-medium">Quick Presets</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {CONFIG_PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => handleApplyPreset(preset)}
                    title={preset.description}
                    aria-label={`Apply ${preset.name} preset: ${preset.description}`}
                    className={`px-4 py-2 md:px-5 md:py-2.5 text-sm rounded-lg border transition-all ${
                      activePreset === preset.id
                        ? 'bg-accent text-white border-accent shadow-md'
                        : 'bg-white text-primary border-gray-300 hover:border-accent hover:bg-accent/5'
                    }`}
                  >
                    <span className="font-medium">{preset.name}</span>
                    <span
                      className="mr-2 opacity-70 font-arabic"
                      lang="ar"
                    >
                      {' '}({preset.nameAr})
                    </span>
                  </button>
                ))}
                {activePreset && (
                  <button
                    onClick={clearActivePreset}
                    className="px-3 py-2 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
                    aria-label="Clear preset and use custom configuration"
                  >
                    Custom
                  </button>
                )}
              </div>
              {activePreset && (
                <p className="text-xs text-muted-foreground mt-2">
                  Using <strong>{CONFIG_PRESETS.find(p => p.id === activePreset)?.name}</strong> preset.
                  Modify any setting below to customize.
                </p>
              )}
            </div>

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showAdvanced ? 'rotate-180' : ''}`} />
              {showAdvanced ? 'Hide' : 'Show'} advanced settings
            </button>

            {showAdvanced && <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Forms Selection */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-primary text-base font-medium">Verb Forms</h3>
            <div className="flex gap-2">
              <button
                onClick={handleSelectAllForms}
                className="text-xs px-2 py-1 rounded-md transition-all duration-200 hover:bg-accent/10"
                style={{ color: '#c5a253' }}
              >
                All
              </button>
              <button
                onClick={handleDeselectAllForms}
                className="text-xs px-2 py-1 rounded-md transition-all duration-200 hover:bg-gray-100"
                style={{ color: '#64748b' }}
              >
                Clear
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {allForms.map((form, index) => (
              <button
                key={form}
                onClick={() => handleFormToggle(form)}
                className={`px-4 py-1.5 text-sm rounded-lg border transition-all ${
                  selectedForms.includes(form)
                    ? 'bg-accent text-white border-accent'
                    : 'bg-white text-primary border-gray-300 hover:border-accent'
                }`}
              >
                {formRomanNumerals[index]}
              </button>
            ))}
          </div>
        </div>

        {/* Verb Types Selection */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-primary text-base font-medium">Verb Types</h3>
            <div className="flex gap-2">
              <button
                onClick={handleSelectAllTypes}
                className="text-xs px-2 py-1 rounded-md transition-all duration-200 hover:bg-accent/10"
                style={{ color: '#c5a253' }}
              >
                All
              </button>
              <button
                onClick={handleDeselectAllTypes}
                className="text-xs px-2 py-1 rounded-md transition-all duration-200 hover:bg-gray-100"
                style={{ color: '#64748b' }}
              >
                Clear
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {verbTypes.map(type => {
              const isValid = validVerbTypes.includes(type.key);
              const isSelected = selectedVerbTypes.includes(type.key);

              // Get reason if blocked
              let tooltipText = '';
              if (!isValid) {
                const blockedForms = selectedForms.filter(formNumber => {
                  const result = validateFormForVerbType(formNumber, type.key, strictMode);
                  return !result.valid;
                });
                tooltipText = `Incompatible with selected forms: ${blockedForms.join(', ')}`;
              }

              return (
                <button
                  key={type.key}
                  onClick={() => isValid && handleVerbTypeToggle(type.key)}
                  title={tooltipText}
                  disabled={!isValid}
                  className={`px-4 py-1.5 text-sm rounded-lg border transition-all font-arabic ${
                    !isValid
                      ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed'
                      : isSelected
                        ? 'bg-accent text-white border-accent hover:opacity-90'
                        : 'bg-white text-primary border-gray-300 hover:border-accent hover:bg-accent/5'
                  }`}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
          {selectedVerbTypes.length === 0 && (
            <p className="text-xs text-amber-600 mb-2">
              Select at least one verb type to generate practice cards
            </p>
          )}
          {selectedVerbTypes.length > 0 && validVerbTypes.length < verbTypes.length && (
            <p className="text-xs text-muted-foreground mb-2">
              Some verb types are disabled (incompatible with selected forms)
            </p>
          )}
        </div>

        {/* Verb Conjugation Types Selection */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-primary text-base font-medium">Verb Conjugations</h3>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  // Select all verb conjugations (not participles)
                  const verbConjKeys = CONJUGATION_TYPES.map(t => t.key);
                  onConjugationTypesChange([
                    ...selectedConjugationTypes.filter(t => !verbConjKeys.includes(t) && !PARTICIPLE_TYPES.map(p => p.key).includes(t)),
                    ...verbConjKeys
                  ]);
                }}
                className="text-xs px-2 py-1 rounded-md transition-all duration-200 hover:bg-accent/10"
                style={{ color: '#c5a253' }}
              >
                All
              </button>
              <button
                onClick={() => {
                  // Deselect all verb conjugations
                  const verbConjKeys = CONJUGATION_TYPES.map(t => t.key);
                  const remaining = selectedConjugationTypes.filter(t => !verbConjKeys.includes(t));
                  if (remaining.length > 0) {
                    onConjugationTypesChange(remaining);
                  } else {
                    onConjugationTypesChange(['الماضي المبني للمعلوم']);
                  }
                }}
                className="text-xs px-2 py-1 rounded-md transition-all duration-200 hover:bg-gray-100"
                style={{ color: '#64748b' }}
              >
                Clear
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {CONJUGATION_TYPES.map(type => {
              const isValid = validConjugationTypes.includes(type.key);
              const isSelected = selectedConjugationTypes.includes(type.key);

              return (
                <button
                  key={type.key}
                  onClick={() => isValid && handleConjugationTypeToggle(type.key)}
                  title={!isValid ? `Incompatible with selected forms` : ''}
                  disabled={!isValid}
                  className={`px-4 py-1.5 text-sm rounded-lg border transition-all font-arabic ${
                    !isValid
                      ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed'
                      : isSelected
                        ? 'bg-accent text-white border-accent hover:opacity-90'
                        : 'bg-white text-primary border-gray-300 hover:border-accent hover:bg-accent/5'
                  }`}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
          {validConjugationTypes.length < CONJUGATION_TYPES.length && (
            <p className="text-xs text-muted-foreground mb-2">
              Some conjugations are disabled (incompatible with selected forms)
            </p>
          )}
        </div>

        {/* Participles Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-primary text-base font-medium">Participles</h3>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  // Select both participles
                  const particleKeys = PARTICIPLE_TYPES.map(t => t.key);
                  onConjugationTypesChange([
                    ...selectedConjugationTypes.filter(t => !particleKeys.includes(t)),
                    ...particleKeys
                  ]);
                }}
                className="text-xs px-2 py-1 rounded-md transition-all duration-200 hover:bg-accent/10"
                style={{ color: '#c5a253' }}
              >
                All
              </button>
              <button
                onClick={() => {
                  // Deselect participles
                  const particleKeys = PARTICIPLE_TYPES.map(t => t.key);
                  onConjugationTypesChange(
                    selectedConjugationTypes.filter(t => !particleKeys.includes(t))
                  );
                }}
                className="text-xs px-2 py-1 rounded-md transition-all duration-200 hover:bg-gray-100"
                style={{ color: '#64748b' }}
              >
                Clear
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {PARTICIPLE_TYPES.map(type => {
              const isValid = validConjugationTypes.includes(type.key);
              const isSelected = selectedConjugationTypes.includes(type.key);

              return (
                <button
                  key={type.key}
                  onClick={() => isValid && handleConjugationTypeToggle(type.key)}
                  title={!isValid ? `Incompatible with selected forms` : ''}
                  disabled={!isValid}
                  className={`px-4 py-1.5 text-sm rounded-lg border transition-all font-arabic ${
                    !isValid
                      ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed'
                      : isSelected
                        ? 'bg-accent text-white border-accent hover:opacity-90'
                        : 'bg-white text-primary border-gray-300 hover:border-accent hover:bg-accent/5'
                  }`}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
          {validConjugationTypes.filter(t => PARTICIPLE_TYPES.map(p => p.key).includes(t)).length < PARTICIPLE_TYPES.length && (
            <p className="text-xs text-amber-600 mb-2">
              Some participles are disabled (incompatible with selected forms)
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            Participles are not conjugated by pronoun
          </p>
          <p className="text-xs text-muted-foreground" dir="rtl">
            الأسماء المشتقة لا تُصرَّف بالضمائر
          </p>
        </div>
      </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
