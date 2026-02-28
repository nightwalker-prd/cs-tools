/**
 * Preset Library Component
 *
 * Grid of preset word lists that users can import with one click.
 * Shows name, Arabic name, verb count, and difficulty badge.
 */

import { Download, BookOpen, Check } from 'lucide-react';
import { presetWordLists, type PresetWordList } from '../../data/presets';

interface PresetLibraryProps {
  existingListNames: string[];
  onImportPreset: (preset: PresetWordList) => void;
}

export function PresetLibrary({ existingListNames, onImportPreset }: PresetLibraryProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const isAlreadyImported = (presetName: string) => {
    return existingListNames.some(name =>
      name.toLowerCase() === presetName.toLowerCase()
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-4">
        Import curated word lists from the Sarf vocabulary curriculum. Each unit focuses on specific verb forms and patterns.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {presetWordLists.map((preset) => {
          const imported = isAlreadyImported(preset.name);

          return (
            <div
              key={preset.id}
              className={`relative p-4 rounded-lg border transition-all ${
                imported
                  ? 'bg-gray-50 border-gray-200'
                  : 'bg-white border-gray-200 hover:border-accent hover:shadow-md'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-primary">{preset.name}</h3>
                  <p
                    className="text-sm text-accent font-arabic"
                    dir="rtl"
                  >
                    {preset.nameAr}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(
                    preset.difficulty
                  )}`}
                >
                  {preset.difficulty}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-3">
                {preset.description}
              </p>

              {/* Focus areas */}
              <div className="flex flex-wrap gap-1 mb-3">
                {preset.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded"
                  >
                    {area}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                  <span>{preset.verbCount} verbs</span>
                </div>

                {imported ? (
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <Check className="w-4 h-4" />
                    <span>Imported</span>
                  </div>
                ) : (
                  <button
                    onClick={() => onImportPreset(preset)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-accent text-white rounded-lg hover:opacity-90 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Import
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
