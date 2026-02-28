import { useState } from 'react';
import { usePersistedState } from '@arabtools/core';
import { presetWordLists } from '../data/presets';
import type { SessionConfig, ExerciseType, AnswerMode, TranslationDirection } from '../types';

const CATEGORIES = [
  { id: 'الْمَاضِي الْمَعْلُوْمِ', label: 'الماضي المعلوم', en: 'Past Active' },
  { id: 'الْمَاضِي الْمَجْهُوْلِ', label: 'الماضي المجهول', en: 'Past Passive' },
  { id: 'الْمُضَارِعِ الْمَعْلُوْمِ', label: 'المضارع المعلوم', en: 'Present Active' },
  { id: 'الْمُضَارِعِ الْمَجْهُوْلِ', label: 'المضارع المجهول', en: 'Present Passive' },
  { id: 'الْأَمْرِ', label: 'الأمر', en: 'Imperative' },
  { id: 'النَّهْيِ', label: 'النهي', en: 'Prohibition' },
  { id: 'اسْمُ الْفَاعِلِ', label: 'اسم الفاعل', en: 'Active Participle' },
  { id: 'اسْمُ الْمَفْعُولِ', label: 'اسم المفعول', en: 'Passive Participle' },
];

const EXERCISE_TYPES: { id: ExerciseType; label: string; labelAr: string }[] = [
  { id: 'conjugation', label: 'Conjugation', labelAr: 'تصريف' },
  { id: 'translation', label: 'Translation', labelAr: 'ترجمة' },
  { id: 'labeling', label: 'Labeling', labelAr: 'تسمية' },
];

const DEFAULT_CONFIG: SessionConfig = {
  unitIds: ['sarf-unit-1'],
  exerciseTypes: ['conjugation'],
  categories: [],
  answerMode: 'mc',
  translationDirection: 'ar-to-en',
  sessionSize: 20,
  srsEnabled: true,
};

interface ConfigPanelProps {
  onStart: (config: SessionConfig) => void;
}

export function ConfigPanel({ onStart }: ConfigPanelProps) {
  const [savedConfig] = usePersistedState<SessionConfig>('sarf-ex-config', DEFAULT_CONFIG);
  const [config, setConfig] = useState<SessionConfig>(savedConfig);

  const toggleUnit = (unitId: string) => {
    setConfig(prev => ({
      ...prev,
      unitIds: prev.unitIds.includes(unitId)
        ? prev.unitIds.filter(id => id !== unitId)
        : [...prev.unitIds, unitId],
    }));
  };

  const toggleExerciseType = (type: ExerciseType) => {
    setConfig(prev => {
      const newTypes = prev.exerciseTypes.includes(type)
        ? prev.exerciseTypes.filter(t => t !== type)
        : [...prev.exerciseTypes, type];
      return { ...prev, exerciseTypes: newTypes.length > 0 ? newTypes : [type] };
    });
  };

  const toggleCategory = (categoryId: string) => {
    setConfig(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId],
    }));
  };

  const handleStart = () => {
    if (config.unitIds.length === 0) return;
    onStart(config);
  };

  return (
    <div className="config-panel animate-fade-in-up">
      <h1>Session Configuration</h1>
      <p className="subtitle">Choose your exercises, units, and settings</p>

      {/* Units */}
      <div className="config-section">
        <h3>Vocabulary Units</h3>
        <div className="config-chips">
          {presetWordLists.map(preset => (
            <button
              key={preset.id}
              className={`config-chip ${config.unitIds.includes(preset.id) ? 'selected' : ''}`}
              onClick={() => toggleUnit(preset.id)}
            >
              <span className="font-arabic">{preset.nameAr}</span>
              <span className="config-chip-count">
                ({preset.verbCount})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Types */}
      <div className="config-section">
        <h3>Exercise Types</h3>
        <div className="config-chips">
          {EXERCISE_TYPES.map(type => (
            <button
              key={type.id}
              className={`config-chip ${config.exerciseTypes.includes(type.id) ? 'selected' : ''}`}
              onClick={() => toggleExerciseType(type.id)}
            >
              <span className="font-arabic">{type.labelAr}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Siyagh Categories */}
      <div className="config-section">
        <h3>
          Siyagh Categories
          <span className="config-section-hint">
            (leave empty for all)
          </span>
        </h3>
        <div className="config-chips">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`config-chip ${config.categories.includes(cat.id) ? 'selected' : ''}`}
              onClick={() => toggleCategory(cat.id)}
            >
              <span className="font-arabic">{cat.label}</span>
              <span className="config-chip-en">{cat.en}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Settings Row */}
      <div className="config-section">
        <h3>Settings</h3>

        <div className="config-row">
          <label>Answer Mode</label>
          <select
            value={config.answerMode}
            onChange={e => setConfig(prev => ({ ...prev, answerMode: e.target.value as AnswerMode }))}
          >
            <option value="mc">Multiple Choice</option>
            <option value="text">Text Input</option>
          </select>
        </div>

        {config.exerciseTypes.includes('translation') && (
          <div className="config-row">
            <label>Translation</label>
            <select
              value={config.translationDirection}
              onChange={e => setConfig(prev => ({ ...prev, translationDirection: e.target.value as TranslationDirection }))}
            >
              <option value="ar-to-en">Arabic → English</option>
              <option value="en-to-ar">English → Arabic</option>
            </select>
          </div>
        )}

        <div className="config-row">
          <label>Session Size</label>
          <input
            type="number"
            min={5}
            max={100}
            value={config.sessionSize}
            onChange={e => setConfig(prev => ({ ...prev, sessionSize: parseInt(e.target.value) || 20 }))}
          />
        </div>

        <div className="config-row">
          <label>SRS Mode</label>
          <select
            value={config.srsEnabled ? 'on' : 'off'}
            onChange={e => setConfig(prev => ({ ...prev, srsEnabled: e.target.value === 'on' }))}
          >
            <option value="on">Enabled (track progress)</option>
            <option value="off">Disabled (practice only)</option>
          </select>
        </div>
      </div>

      <button
        className="config-start-btn"
        onClick={handleStart}
        disabled={config.unitIds.length === 0}
      >
        Start Session ({config.sessionSize} questions)
      </button>
    </div>
  );
}
