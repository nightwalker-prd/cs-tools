const DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export function toArabicIndic(num: number): string {
  return String(num)
    .split('')
    .map((d) => DIGITS[Number(d)])
    .join('');
}
