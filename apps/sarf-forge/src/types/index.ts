/** Root type classification matching the conjugation app */
export type VerbType =
  | 'Regular'
  | 'Mithal'
  | 'Ajwaf'
  | 'Naqis'
  | "Mudaa'af"
  | "Mahmooz al-Fa'"
  | "Mahmooz al-'Ayn"
  | 'Mahmooz al-Lam'
  | 'Lafif Maqroon'
  | 'Lafif Mafrooq';

/** Verb form (Roman numeral I-X) */
export type VerbForm = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'X';

/** Difficulty tier for progressive unlocking */
export type Tier = 1 | 2 | 3 | 4;

/** A root available for forging */
export interface ForgeRoot {
  id: string;
  letters: string;       // "ك-ت-ب"
  arabic: string;        // "كتب"
  root: string;          // "ك ت ب" (space-separated, matches conjugation format)
  meaning: string;       // "to write"
  field: string;         // "Writing"
  type: VerbType;
  verbForm: VerbForm;
  pastTense: string;
  presentTense: string;
  tier: Tier;
}

/** A morphological pattern to apply to roots */
export interface ForgePattern {
  id: string;
  display: string;       // "فَاعِلٌ"
  name: string;          // "Active Participle"
  nameAr: string;        // "اسم فاعل"
  desc: string;          // "The one who does"
  tier: Tier;
  color: string;         // hex color for UI
  /** Which key in صرف صغير to extract (if applicable) */
  sarfKey?: string;
  /** Which derivative this maps to */
  derivativeType: 'activeParticiple' | 'passiveParticiple' | 'masdar' | 'pastVerb' | 'presentVerb' | 'placeNoun' | 'instrumentNoun' | 'intensive' | 'formVerb';
}

/** Result of a forge attempt */
export interface ForgeResult {
  word: string;
  meaning: string;
  success: boolean;
  note: string;
  rootId: string;
  patternId: string;
}

/** A discovered word in the collection */
export interface Discovery {
  key: string;           // "rootId+patternId"
  word: string;
  meaning: string;
  root: ForgeRoot;
  pattern: ForgePattern;
  timestamp: number;
}

/** Persisted game state */
export interface GameState {
  discoveries: Discovery[];
  stats: {
    attempts: number;
    found: number;
    failed: number;
  };
  unlockedTiers: Tier[];
}

/** Tier unlock thresholds */
export const TIER_THRESHOLDS: Record<Tier, number> = {
  1: 0,
  2: 8,
  3: 20,
  4: 40,
};
