/**
 * Re-exports preset verb units from the conjugation app.
 * These are the 10 curated vocabulary lists (500+ verbs) from the Sarf PDFs.
 */

export {
  presetWordLists,
  getPresetById,
  getPresetsByDifficulty,
} from '@arabtools/conjugation/src/data/presets/index';

export type { PresetWordList } from '@arabtools/conjugation/src/data/presets/index';
