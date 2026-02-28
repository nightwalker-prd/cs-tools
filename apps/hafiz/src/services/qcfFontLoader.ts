/**
 * QCF (Quran Complex Font) Font Loader
 * Dynamically loads page-specific QCF fonts for Quranic text rendering.
 * Fonts are from King Fahd Glorious Quran Printing Complex.
 *
 * Ported from Alqalaminstituteplatform/src/services/qcfFontLoader.ts
 */

const loadedFonts = new Map<number, boolean>();

const FONT_BASE_URL =
  'https://raw.githubusercontent.com/mustafa0x/qpc-fonts/f93bf5f3/mushaf-woff2';

export function getQCFFontFamily(pageNumber: number): string {
  return `QCF_P${pageNumber.toString().padStart(3, '0')}`;
}

export async function loadQCFFont(pageNumber: number): Promise<void> {
  if (pageNumber < 1 || pageNumber > 604) {
    throw new Error(`Invalid page number: ${pageNumber}. Must be between 1 and 604.`);
  }

  if (loadedFonts.has(pageNumber)) return;

  const fontFamily = getQCFFontFamily(pageNumber);
  const fontUrl = `${FONT_BASE_URL}/QCF_P${pageNumber.toString().padStart(3, '0')}.woff2`;

  const fontFace = new FontFace(fontFamily, `url(${fontUrl})`);
  await fontFace.load();
  document.fonts.add(fontFace);
  loadedFonts.set(pageNumber, true);
}

export async function preloadQCFFonts(pageNumbers: number[]): Promise<void> {
  await Promise.all(
    pageNumbers.map((p) =>
      loadQCFFont(p).catch(() => {
        /* swallow preload errors */
      }),
    ),
  );
}

export function isQCFFontLoaded(pageNumber: number): boolean {
  return loadedFonts.has(pageNumber);
}
