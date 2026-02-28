/**
 * Minimal Grammatical Concepts Types
 * Used for cross-referencing in sarf exercises
 */

/**
 * Reference to a grammatical concept within content
 * Used to tag exercises with concepts
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
