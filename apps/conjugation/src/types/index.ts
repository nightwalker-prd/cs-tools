/**
 * Type definitions for Conjugation Practice Tool
 */

import type { ArabicWord } from '../data/arabicRoots';

/**
 * Word list for custom word practice
 */
export interface WordList {
  id: string;
  name: string;
  nameAr?: string;
  words: ArabicWord[];
  createdAt: string;
  updatedAt: string;
}
