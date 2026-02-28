// 12 consonants that don't rhyme - standard set used in Operation Span research

export const OPERATION_SPAN_LETTERS = [
  'F', 'H', 'J', 'K', 'L', 'N', 'P', 'Q', 'R', 'S', 'T', 'Y',
] as const;

export type OperationSpanLetter = (typeof OPERATION_SPAN_LETTERS)[number];
