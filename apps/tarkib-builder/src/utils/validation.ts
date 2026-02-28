import type { ConstructionSlot, WordComponent, ValidationRule, SlotResult } from '../data/types';

/** A placement maps slot IDs to word IDs (or null if empty) */
export type Placement = Record<string, string | null>;

/** Check if all slots are filled */
export function allSlotsFilled(slots: ConstructionSlot[], placement: Placement): boolean {
  return slots.every(slot => placement[slot.id] != null);
}

/** Look up the word placed in a slot */
function getPlacedWord(
  slotId: string,
  placement: Placement,
  wordBank: WordComponent[],
): WordComponent | undefined {
  const wordId = placement[slotId];
  if (!wordId) return undefined;
  return wordBank.find(w => w.id === wordId);
}

/** Run all validation rules and return per-slot results */
export function validatePlacement(
  slots: ConstructionSlot[],
  placement: Placement,
  wordBank: WordComponent[],
  rules: ValidationRule[],
): SlotResult[] {
  const results: SlotResult[] = slots.map(slot => ({
    slotId: slot.id,
    isCorrect: true,
  }));

  for (const rule of rules) {
    switch (rule.check) {
      case 'correct-word': {
        // Check that the word placed in the slot is the expected one
        for (const slotId of rule.slots) {
          const slot = slots.find(s => s.id === slotId);
          if (!slot) continue;
          const placedWord = getPlacedWord(slotId, placement, wordBank);
          if (!placedWord || placedWord.id !== slot.expectedWordId) {
            const result = results.find(r => r.slotId === slotId);
            if (result) {
              result.isCorrect = false;
              result.errorMessage = rule.errorMessage;
              result.errorMessageAr = rule.errorMessageAr;
            }
          }
        }
        break;
      }
      case 'case-majrur': {
        // Check the word in the slot has majrur case
        for (const slotId of rule.slots) {
          const placedWord = getPlacedWord(slotId, placement, wordBank);
          if (placedWord && placedWord.case !== 'majrur') {
            const result = results.find(r => r.slotId === slotId);
            if (result) {
              result.isCorrect = false;
              result.errorMessage = rule.errorMessage;
              result.errorMessageAr = rule.errorMessageAr;
            }
          }
        }
        break;
      }
      case 'no-al-tanwin': {
        // Check the word in the slot doesn't have ال (definite)
        for (const slotId of rule.slots) {
          const placedWord = getPlacedWord(slotId, placement, wordBank);
          if (placedWord && placedWord.definiteness === 'definite') {
            const result = results.find(r => r.slotId === slotId);
            if (result) {
              result.isCorrect = false;
              result.errorMessage = rule.errorMessage;
              result.errorMessageAr = rule.errorMessageAr;
            }
          }
        }
        break;
      }
      case 'agreement-ding': {
        // Check DING (Definiteness, I'rab, Number, Gender) agreement between slots
        if (rule.slots.length < 2) break;
        const word1 = getPlacedWord(rule.slots[0], placement, wordBank);
        const word2 = getPlacedWord(rule.slots[1], placement, wordBank);
        if (word1 && word2) {
          const mismatches: string[] = [];
          if (word1.definiteness !== word2.definiteness) mismatches.push('التعريف');
          if (word1.case !== word2.case) mismatches.push('الإعراب');
          if (word1.number !== word2.number) mismatches.push('العدد');
          if (word1.gender !== word2.gender) mismatches.push('الجنس');
          if (mismatches.length > 0) {
            const mismatchDetail = mismatches.join(' و');
            for (const slotId of rule.slots) {
              const result = results.find(r => r.slotId === slotId);
              if (result) {
                result.isCorrect = false;
                result.errorMessage = `${rule.errorMessage} (${mismatches.join(', ')})`;
                result.errorMessageAr = `عدم مطابقة في: ${mismatchDetail}`;
              }
            }
          }
        }
        break;
      }
      case 'agreement-irab': {
        // Check only I'rab case agreement between slots
        if (rule.slots.length < 2) break;
        const w1 = getPlacedWord(rule.slots[0], placement, wordBank);
        const w2 = getPlacedWord(rule.slots[1], placement, wordBank);
        if (w1 && w2 && w1.case !== w2.case) {
          for (const slotId of rule.slots) {
            const result = results.find(r => r.slotId === slotId);
            if (result) {
              result.isCorrect = false;
              result.errorMessage = rule.errorMessage;
              result.errorMessageAr = rule.errorMessageAr;
            }
          }
        }
        break;
      }
      case 'order': {
        // Check that words are in the correct slot order
        // For now, order is ensured by correct-word checks on each slot
        break;
      }
    }
  }

  return results;
}

/** Format time as Xm XXs */
export function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s.toString().padStart(2, '0')}s`;
}

/**
 * Calculate score for an exercise attempt.
 * mistakeCount = number of times check returned at least one incorrect slot.
 * Score: 100 base, -25 per mistake, -25 for hint, +10 bonus for <15s.
 * Minimum 25 when exercise is correct.
 */
export function calculateScore(
  slotResults: SlotResult[],
  mistakeCount: number,
  hintsUsed: boolean,
  timeSpent: number,
): number {
  const allCorrect = slotResults.every(r => r.isCorrect);
  if (!allCorrect) return 0;

  let score = 100;
  score -= mistakeCount * 25;
  if (hintsUsed) score -= 25;
  if (timeSpent < 15) score += 10;

  return Math.max(25, Math.min(110, score));
}
