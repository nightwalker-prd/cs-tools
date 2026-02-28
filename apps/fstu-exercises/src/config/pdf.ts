export const PDF_URL = import.meta.env.VITE_PDF_URL || '/textbook.pdf';

export const ZOOM_MIN = 0.5;
export const ZOOM_MAX = 3;
export const ZOOM_STEP = 0.25;
export const ZOOM_DEFAULT = 1;

export const NAV_IDLE_TIMEOUT = 3000;

export const PANEL_WIDTH_KEY = 'fstu-pdf-panel-width';
export const PANEL_WIDTH_DEFAULT = 45; // percentage
export const PANEL_WIDTH_MIN = 20;
export const PANEL_WIDTH_MAX = 80;
