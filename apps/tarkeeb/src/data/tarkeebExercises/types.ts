/**
 * Tarkeeb Exercise Types
 */

/**
 * Reference to a grammatical concept in an exercise
 */
export interface ConceptReference {
  /** ID of the grammatical concept being referenced */
  conceptId: string;
  /**
   * How central this concept is to the content
   * - primary: Main focus, explicitly taught/demonstrated
   * - secondary: Present but not the main focus
   */
  prominence: 'primary' | 'secondary';
  /**
   * Optional specific examples from the content
   * e.g., ['الطالبُ'] for mubtada in "الطالبُ مجتهدٌ"
   */
  examples?: string[];
  /** Optional notes about how this concept appears in the content */
  notes?: string;
}

export interface TarkeebExercise {
  id: number;
  unit: string;
  section: string;
  arabic: string;
  translation: string;
  vocabulary?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';

  /**
   * NEW: Grammatical concepts taught/demonstrated in this exercise
   * Optional for backward compatibility during migration
   */
  conceptReferences?: ConceptReference[];
}
