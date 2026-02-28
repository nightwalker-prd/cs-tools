export type PenStyle = 'fine' | 'marker' | 'calligraphy';
export type LinePattern = 'lined' | 'grid' | 'blank';
export type InkColor = '#2A2522' | '#1a3150' | '#6B3A2A';

export const INK_COLORS: { label: string; value: InkColor }[] = [
  { label: 'Black', value: '#2A2522' },
  { label: 'Navy', value: '#1a3150' },
  { label: 'Brown', value: '#6B3A2A' },
];

export interface Stroke {
  id: string;
  points: number[];          // [x1,y1,p1, x2,y2,p2, ...] flat array
  color: string;
  size: number;
  penStyle: PenStyle;
}

export interface Page {
  id: string;
  strokes: Stroke[];
  thumbnail?: string;        // Small base64 PNG for page browser
  createdAt: number;
  updatedAt: number;
}

export interface Notebook {
  id: string;
  name: string;
  pages: string[];           // Page IDs
  createdAt: number;
  updatedAt: number;
  coverColor: string;
}

export interface KhattIndex {
  notebooks: Array<{
    id: string;
    name: string;
    pageCount: number;
    updatedAt: number;
    coverColor: string;
  }>;
  activeNotebookId: string | null;
  activePageId: string | null;
  settings: DrawingSettings;
}

export interface DrawingSettings {
  penStyle: PenStyle;
  inkColor: InkColor;
  linePattern: LinePattern;
  penSize: number;
}

export const DEFAULT_SETTINGS: DrawingSettings = {
  penStyle: 'calligraphy',
  inkColor: '#2A2522',
  linePattern: 'lined',
  penSize: 8,
};

export const COVER_COLORS = [
  '#1a3150',  // Navy
  '#6B3A2A',  // Brown
  '#276749',  // Green
  '#9B2C2C',  // Red
  '#c5a253',  // Gold
  '#4A5568',  // Gray
];
