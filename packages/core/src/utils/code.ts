/**
 * Formats code by normalizing indentation.
 * Removes common leading whitespace from all lines.
 */
export function formatCode(code: string): string {
  const lines = code.split('\n');

  // Remove leading/trailing empty lines
  while (lines.length > 0 && lines[0].trim() === '') lines.shift();
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop();

  if (lines.length === 0) return '';

  // Find minimum indentation (ignoring empty lines)
  const minIndent = lines
    .filter(line => line.trim().length > 0)
    .reduce((min, line) => {
      const indent = line.match(/^\s*/)?.[0].length ?? 0;
      return Math.min(min, indent);
    }, Infinity);

  if (minIndent === Infinity) return '';

  return lines
    .map(line => line.slice(minIndent))
    .join('\n');
}

/**
 * Extracts language keywords for basic syntax highlighting.
 */
const KEYWORDS: Record<string, string[]> = {
  javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'new', 'this', 'import', 'export', 'from', 'async', 'await', 'try', 'catch', 'throw', 'switch', 'case', 'break', 'continue', 'default', 'typeof', 'instanceof', 'null', 'undefined', 'true', 'false'],
  python: ['def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'import', 'from', 'try', 'except', 'raise', 'with', 'as', 'in', 'not', 'and', 'or', 'True', 'False', 'None', 'pass', 'break', 'continue', 'lambda', 'yield', 'async', 'await'],
  pseudocode: ['function', 'procedure', 'return', 'if', 'then', 'else', 'end', 'for', 'while', 'do', 'repeat', 'until', 'to', 'each', 'in', 'and', 'or', 'not', 'true', 'false', 'nil', 'null', 'swap', 'print', 'input', 'output'],
};

/**
 * Returns the set of keywords for a given language.
 */
export function getKeywords(language: string): string[] {
  return KEYWORDS[language.toLowerCase()] ?? KEYWORDS.pseudocode;
}

/**
 * Checks if a token is a keyword for the given language.
 */
export function isKeyword(token: string, language: string): boolean {
  const keywords = getKeywords(language);
  return keywords.includes(token);
}

/**
 * Splits code into simple tokens (words, operators, whitespace).
 */
export function tokenize(code: string): string[] {
  return code.match(/\w+|[^\w\s]|\s+/g) ?? [];
}
