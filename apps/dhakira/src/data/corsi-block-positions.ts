// Classic Corsi board layout - 9 blocks in irregular positions

export interface BlockPosition {
  id: number;
  x: number; // percentage from left
  y: number; // percentage from top
}

// Positions based on the classic Corsi board layout
// Arranged to be spatially distinct and not form a regular grid
export const CORSI_BLOCK_POSITIONS: BlockPosition[] = [
  { id: 0, x: 15, y: 45 },
  { id: 1, x: 25, y: 15 },
  { id: 2, x: 70, y: 55 },
  { id: 3, x: 85, y: 40 },
  { id: 4, x: 40, y: 30 },
  { id: 5, x: 50, y: 75 },
  { id: 6, x: 55, y: 45 },
  { id: 7, x: 35, y: 60 },
  { id: 8, x: 65, y: 15 },
];

export const BLOCK_COUNT = CORSI_BLOCK_POSITIONS.length;
export const MIN_SPAN = 2;
export const MAX_SPAN = 9;
