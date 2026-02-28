/**
 * Grammatical Label Selector Components
 *
 * Provides UI components for selecting Arabic grammatical labels.
 */

import { useMemo } from 'react';
import {
  grammaticalLabels,
  type GrammaticalLabel,
  type GrammaticalLabels,
} from '@arabtools/core';

// ============================================================================
// Types
// ============================================================================

interface LabelButtonProps {
  label: GrammaticalLabel;
  isSelected: boolean;
  onClick: () => void;
}

interface LabelSectionProps {
  title: string;
  titleAr: string;
  labels: GrammaticalLabel[];
  selectedLabels: string[];
  onToggleLabel: (labelId: string) => void;
}

interface LabelSelectorProps {
  selectedLabels: string[];
  onToggleLabel: (labelId: string) => void;
  /** Categories to display (defaults to all) */
  categories?: (keyof GrammaticalLabels)[];
}

// ============================================================================
// Category Display Configuration
// ============================================================================

interface CategoryConfig {
  key: keyof GrammaticalLabels;
  title: string;
  titleAr: string;
}

const DEFAULT_CATEGORIES: CategoryConfig[] = [
  { key: 'partsOfSpeech', title: 'Parts of Speech', titleAr: 'أقسام الكلام' },
  { key: 'sentenceTypes', title: 'Sentence Types', titleAr: 'أنواع الجمل' },
  { key: 'cases', title: 'Grammatical Cases', titleAr: 'الإعراب' },
  { key: 'roles', title: 'Roles in Sentence', titleAr: 'وظائف الإعراب' },
  { key: 'verbs', title: 'Verb Types', titleAr: 'أنواع الأفعال' },
  { key: 'pronouns', title: 'Pronouns', titleAr: 'الضمائر' },
  { key: 'nounTypes', title: 'Noun Properties', titleAr: 'خصائص الاسم' },
  { key: 'syntax', title: 'Syntax Analysis', titleAr: 'التحليل النحوي' },
  { key: 'kanaAndSisters', title: 'Kana & Sisters', titleAr: 'كان وأخواتها' },
  { key: 'innaAndSisters', title: 'Inna & Sisters', titleAr: 'إن وأخواتها' },
  { key: 'prepositions', title: 'Prepositions', titleAr: 'حروف الجر' },
  { key: 'demonstratives', title: 'Demonstratives', titleAr: 'أسماء الإشارة' },
  { key: 'relatives', title: 'Relative Pronouns', titleAr: 'الأسماء الموصولة' },
  { key: 'derivedNouns', title: 'Derived Nouns', titleAr: 'الأسماء المشتقة' },
  { key: 'phrasalConstructs', title: 'Phrasal Constructs', titleAr: 'التراكيب النحوية' },
  { key: 'numbers', title: 'Numbers', titleAr: 'الأعداد' },
  { key: 'exceptionConstructs', title: 'Exception', titleAr: 'الاستثناء' },
  { key: 'conditionalParticles', title: 'Conditionals', titleAr: 'أدوات الشرط' },
  { key: 'verbForms', title: 'Verb Forms (I-X)', titleAr: 'الأبواب' },
  { key: 'verbTypes', title: 'Verb Weakness Types', titleAr: 'أنواع الفعل' },
  { key: 'pluralTypes', title: 'Plural Types', titleAr: 'أنواع الجمع' },
  { key: 'nasbParticles', title: 'Nasb Particles', titleAr: 'أدوات النصب' },
  { key: 'jazmParticles', title: 'Jazm Particles', titleAr: 'أدوات الجزم' },
  { key: 'conjunctions', title: 'Conjunctions', titleAr: 'حروف العطف' },
  { key: 'negation', title: 'Negation', titleAr: 'النفي' },
  { key: 'interrogatives', title: 'Interrogatives', titleAr: 'الاستفهام' },
  { key: 'vocative', title: 'Vocative', titleAr: 'النداء' },
  { key: 'emphasis', title: 'Emphasis', titleAr: 'التوكيد' },
  { key: 'morphologyTerms', title: 'Morphology Terms', titleAr: 'مصطلحات الصرف' },
  { key: 'rhetoric', title: 'Rhetoric', titleAr: 'البلاغة' },
];

// ============================================================================
// Components
// ============================================================================

/**
 * Individual label button
 */
export function LabelButton({ label, isSelected, onClick }: LabelButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
        isSelected
          ? 'bg-accent text-primary shadow-md'
          : 'bg-white/60 text-muted-foreground hover:bg-white'
      }`}
    >
      <span className="text-xs block" dir="rtl">
        {label.ar}
      </span>
      <span className="text-xs opacity-75">{label.en}</span>
    </button>
  );
}

/**
 * Section of labels with title
 */
export function LabelSection({
  title,
  titleAr,
  labels,
  selectedLabels,
  onToggleLabel,
}: LabelSectionProps) {
  return (
    <div>
      <h4 className="text-sm text-accent mb-2">
        {title} ({titleAr})
      </h4>
      <div className="flex flex-wrap gap-2">
        {labels.map((label) => (
          <LabelButton
            key={label.id}
            label={label}
            isSelected={selectedLabels.includes(label.id)}
            onClick={() => onToggleLabel(label.id)}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Full label selector with all categories
 */
export function GrammaticalLabelSelector({
  selectedLabels,
  onToggleLabel,
  categories,
}: LabelSelectorProps) {
  const categoriesToShow = useMemo(() => {
    if (categories) {
      return DEFAULT_CATEGORIES.filter((c) => categories.includes(c.key));
    }
    return DEFAULT_CATEGORIES;
  }, [categories]);

  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
      {categoriesToShow.map((config) => (
        <LabelSection
          key={config.key}
          title={config.title}
          titleAr={config.titleAr}
          labels={grammaticalLabels[config.key]}
          selectedLabels={selectedLabels}
          onToggleLabel={onToggleLabel}
        />
      ))}
    </div>
  );
}

/**
 * Display selected labels
 */
export function SelectedLabelsDisplay({ selectedLabels }: { selectedLabels: string[] }) {
  const labels = useMemo(() => {
    const allLabels = Object.values(grammaticalLabels).flat();
    return selectedLabels
      .map((id) => allLabels.find((l) => l.id === id))
      .filter((l): l is GrammaticalLabel => l !== undefined);
  }, [selectedLabels]);

  if (labels.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Select grammatical labels from the left to build your analysis
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2" dir="rtl">
      {labels.map((label) => (
        <div key={label.id} className="px-3 py-1.5 rounded-lg bg-accent/20 text-primary text-sm">
          <span className="block text-xs" dir="rtl">
            {label.ar}
          </span>
          <span className="text-xs opacity-75">{label.en}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Hooks
// ============================================================================

/**
 * Hook to manage selected labels state
 */
export function useGrammaticalLabels(_initialLabels: string[] = []) {
  const toggleLabel = (
    labelId: string,
    setLabels: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setLabels((prev) =>
      prev.includes(labelId) ? prev.filter((l) => l !== labelId) : [...prev, labelId]
    );
  };

  return { toggleLabel };
}
