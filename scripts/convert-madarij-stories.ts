/**
 * Converts Madarij al-Qira'a markdown files into a TypeScript data file
 * for the Reading Tool app.
 *
 * Usage: npx tsx scripts/convert-madarij-stories.ts
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, basename } from 'path';

const STORIES_DIR = join(__dirname, '../data/stories');
const OUTPUT = join(__dirname, '../apps/reading/src/data/reading/madarij.ts');

// ── Directory → ID mapping (page order) ──
const DIR_ORDER = [
  '108911-14-15',
  '108911-16-18',
  '108911-19',
  '108911-20-22',
  '108911-23',
  '108911-24-26',
  '108911-27-29',
  '108911-30-32',
  '108911-33-36',
  '108911-37-38',
  '108911-39-41',
  '108911-42-44',
  '108911-45-46',
  '108911-47-49',
  '108911-50-51',
  '108911-52-54',
  '108911-55-56',
  '108911-57',
  '108911-58-59',
  '108911-60-61',
  '108911-62',
  '108911-63-64',
  '108911-65-67',
  '108911-68-70',
  '108911-71',
  '108911-72-74',
  '108911-75-77',
  '108911-78-80',
  '108911-81-83',
  '108911-84-85',
  '108911-86-88',
];

interface ParsedStory {
  id: string;
  title: string;
  titleAr: string;
  text: string;
  translation: string;
  vocabularyHighlights: { word: string; meaning: string }[];
  grammaticalConcepts: string[];
  moralLesson: string;
  moralLessonAr: string;
  wordCount: number;
}

/** Find the .md file in a directory (not claude_log.txt) */
function findMdFile(dirPath: string): string {
  const files = readdirSync(dirPath);
  const md = files.find(f => f.endsWith('.md') && f !== 'claude_log.txt');
  if (!md) throw new Error(`No .md file found in ${dirPath}`);
  return join(dirPath, md);
}

/** Count Arabic words (rough: split on whitespace, filter Arabic chars) */
function countArabicWords(text: string): number {
  return text
    .split(/\s+/)
    .filter(w => /[\u0600-\u06FF]/.test(w))
    .length;
}

/** Extract title parts from H1 line */
function parseTitle(line: string): { titleAr: string; title: string } {
  // Remove markdown H1 prefix and any leading numbering like "Story 12:" or "Lesson 4:"
  let cleaned = line.replace(/^#\s+/, '').trim();

  // Remove "Story N:" / "Lesson N:" / "Poem #N:" / "Chapter N:" prefix
  cleaned = cleaned.replace(/^(?:Story|Lesson|Poem|Chapter)\s*#?\d+\s*:\s*/i, '').trim();

  // Remove Arabic numbering prefix like "(٢)" or "(16)"
  cleaned = cleaned.replace(/^\([٠-٩\d]+\)\s*/, '').trim();

  // Split on ' — ' (em dash with spaces) or ' - ' (hyphen with spaces)
  const parts = cleaned.split(/\s+[—–-]\s+/);

  if (parts.length >= 2) {
    const first = parts[0].trim();
    const second = parts.slice(1).join(' — ').trim();

    // Determine which is Arabic and which is English
    const firstIsArabic = /[\u0600-\u06FF]/.test(first);
    const cleanPart = (s: string) => s.replace(/^\([٠-٩\d]+\)\s*/, '').replace(/\(.*?\)\s*$/, '').trim();
    if (firstIsArabic) {
      return { titleAr: cleanPart(first), title: cleanPart(second) };
    } else {
      return { title: cleanPart(first), titleAr: cleanPart(second) };
    }
  }

  // Fallback: single title, guess language
  const isArabic = /[\u0600-\u06FF]/.test(cleaned);
  return {
    titleAr: isArabic ? cleaned : '',
    title: isArabic ? '' : cleaned,
  };
}

/** Detect if a file is a poem in table format */
function isPoemTable(content: string): boolean {
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    // Must have a table with # column and Arabic in header
    if (/\|\s*#\s*\|/i.test(trimmed) && /Arabic/i.test(trimmed)) {
      // Exclude vocabulary tables (they have Root/Pattern/Transliteration columns)
      if (/Transliteration|Root|Pattern|\bForm\b/i.test(trimmed)) continue;
      return true;
    }
  }
  return false;
}

/** Detect if a file is dialogue format (no blockquotes, dialogue lines) */
function isDialogueFormat(content: string): boolean {
  // Dialogue uses bold names or H3 names with colons and Arabic text
  const lines = content.split('\n');
  let inTextSection = false;
  let blockquoteCount = 0;
  let dialogueCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^##\s+/.test(trimmed) && /Text|Part|Dialogue/i.test(trimmed)) {
      inTextSection = true;
      continue;
    }
    if (inTextSection && /^##\s+(?:Vocabulary|Grammatical|Grammar|English Translation)/i.test(trimmed)) break;
    if (!inTextSection) continue;

    if (trimmed.startsWith('>')) blockquoteCount++;
    // Dialogue pattern: **ArabicName:** or ### ArabicName:
    if (/^\*\*[\u0600-\u06FF].*?:\*?\*?\s/.test(trimmed) || /^###\s+[\u0600-\u06FF].*?:/.test(trimmed)) {
      dialogueCount++;
    }
  }

  return dialogueCount > 2 && blockquoteCount < 3;
}

/** Detect if a file has plain Arabic text (not in blockquotes) */
function isPlainTextFormat(content: string): boolean {
  const lines = content.split('\n');
  let inTextSection = false;
  let blockquoteCount = 0;
  let plainArabicCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^##\s+.*(?:Arabic\s+Text|Text\b)/i.test(trimmed)) {
      inTextSection = true;
      continue;
    }
    if (inTextSection && /^##\s+(?:Vocabulary|Grammatical|Grammar|English|Cultural|Thematic)/i.test(trimmed)) break;
    if (!inTextSection) continue;

    if (trimmed.startsWith('>')) blockquoteCount++;
    // Plain Arabic paragraph (not heading, not table, not separator)
    if (
      trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('>') &&
      !trimmed.startsWith('|') && !trimmed.startsWith('---') && !trimmed.startsWith('*') &&
      /[\u0600-\u06FF]/.test(trimmed) && trimmed.length > 30
    ) {
      plainArabicCount++;
    }
  }

  return plainArabicCount > 0 && blockquoteCount < 2;
}

/** Extract Arabic text — handles blockquotes, dialogue, plain text, and poem tables */
function extractArabicText(content: string): string {
  const lines = content.split('\n');

  // Format 1: Poem table — only extract from text/translation section
  if (isPoemTable(content)) {
    const arabicParts: string[] = [];
    let inTextSection = false;

    for (const line of lines) {
      const trimmed = line.trim();

      // Track sections - only extract from text/translation, not vocab
      if (/^##\s+/.test(trimmed)) {
        if (/Text|Translation/i.test(trimmed) && !/Vocabulary|Grammar/i.test(trimmed)) {
          inTextSection = true;
        } else {
          inTextSection = false;
        }
        continue;
      }

      if (!inTextSection) continue;

      if (trimmed.startsWith('|') && !trimmed.includes('---') && !/^\|\s*#/i.test(trimmed) && !/Arabic/i.test(trimmed)) {
        const cols = trimmed.split('|').map(c => c.trim()).filter(Boolean);
        if (cols.length >= 3) {
          // Columns: #, Arabic1, Arabic2, Translation
          const ar1 = cols[1]?.trim() || '';
          const ar2 = cols[2]?.trim() || '';
          if (/[\u0600-\u06FF]/.test(ar1)) {
            arabicParts.push(`${ar1} ${ar2}`.trim());
          }
        }
      }
    }
    return arabicParts.join('\n');
  }

  // Format 2: Dialogue format
  if (isDialogueFormat(content)) {
    const arabicLines: string[] = [];
    let inTextSection = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (/^##\s+/.test(trimmed) && /Text|Part|Dialogue|Line/i.test(trimmed)) {
        inTextSection = true;
        continue;
      }
      if (inTextSection && /^##\s+(?:Vocabulary|Grammatical|Grammar|Cultural|Thematic)/i.test(trimmed)) break;
      if (!inTextSection) continue;

      // Bold dialogue: **عمرُ: Arabic text**
      const boldMatch = trimmed.match(/^\*\*([\u0600-\u06FF][^*]*)\*\*$/);
      if (boldMatch) {
        const text = boldMatch[1].trim();
        if (/[\u0600-\u06FF]/.test(text)) {
          arabicLines.push(text);
        }
        continue;
      }

      // H3 dialogue: ### حَارِثٌ: Arabic text
      const h3Match = trimmed.match(/^###\s+([\u0600-\u06FF].+)/);
      if (h3Match) {
        arabicLines.push(h3Match[1].trim());
        continue;
      }

      // Plain bold Arabic line within dialogue: **طارقٌ:** أنا أَكْتُبُ...
      const mixedMatch = trimmed.match(/^\*\*([\u0600-\u06FF][^*]*?):\*\*\s*([\u0600-\u06FF].*)/);
      if (mixedMatch) {
        arabicLines.push(`${mixedMatch[1]}: ${mixedMatch[2]}`);
        continue;
      }

      // Bare Arabic line in dialogue context
      if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('|') &&
          !trimmed.startsWith('---') && !trimmed.startsWith('**') &&
          /[\u0600-\u06FF]/.test(trimmed) && trimmed.length > 10 &&
          !/^[a-zA-Z]/.test(trimmed)) {
        arabicLines.push(trimmed);
      }
    }
    return arabicLines.join('\n');
  }

  // Format 3: Plain text format (Arabic paragraphs without blockquotes)
  if (isPlainTextFormat(content)) {
    const arabicLines: string[] = [];
    let inTextSection = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (/^##\s+.*(?:Arabic\s+Text|Text\b)/i.test(trimmed)) {
        inTextSection = true;
        continue;
      }
      if (inTextSection && /^##\s+(?:Vocabulary|Grammatical|Grammar|English|Cultural|Thematic)/i.test(trimmed)) break;
      if (!inTextSection) continue;

      // Skip headings, tables, separators
      if (trimmed.startsWith('#') || trimmed.startsWith('|') || trimmed.startsWith('---')) continue;
      // Skip page references
      if (/^Pages?\s+\d/i.test(trimmed) || /^\*.*Page/i.test(trimmed)) continue;

      if (trimmed && /[\u0600-\u06FF]/.test(trimmed) && trimmed.length > 5) {
        arabicLines.push(trimmed.replace(/\*\*/g, ''));
      }
    }
    return arabicLines.join('\n');
  }

  // Format 4: Default blockquote format
  const arabicLines: string[] = [];
  let inTextSection = false;
  let pastVocab = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Track sections
    if (/^##\s+/.test(trimmed)) {
      if (/Text|Translation/i.test(trimmed) && !/Vocabulary|Grammar/i.test(trimmed)) {
        inTextSection = true;
      } else if (/Vocabulary|Grammatical|Grammar|Cultural|Thematic/i.test(trimmed)) {
        inTextSection = false;
        pastVocab = true;
      }
      continue;
    }

    // Only extract from the text section (skip grammar quotes)
    if (!inTextSection && pastVocab) continue;

    if (trimmed.startsWith('>')) {
      const text = trimmed.replace(/^>\s*/, '').trim();
      if (!text) continue;
      if (/[\u0600-\u06FF]/.test(text)) {
        arabicLines.push(text.replace(/\*\*/g, ''));
      }
    }
  }

  return arabicLines.join('\n');
}

/** Extract English translation paragraphs — handles all formats */
function extractTranslation(content: string): string {
  const lines = content.split('\n');
  const translations: string[] = [];

  // Format 1: Poem table — extract from Translation column (text section only)
  if (isPoemTable(content)) {
    let inTextSection = false;
    for (const line of lines) {
      const trimmed = line.trim();
      if (/^##\s+/.test(trimmed)) {
        if (/Text|Translation/i.test(trimmed) && !/Vocabulary|Grammar/i.test(trimmed)) {
          inTextSection = true;
        } else {
          inTextSection = false;
        }
        continue;
      }
      if (!inTextSection) continue;

      if (trimmed.startsWith('|') && !trimmed.includes('---') && !/^\|\s*#/i.test(trimmed) && !/Arabic/i.test(trimmed)) {
        const cols = trimmed.split('|').map(c => c.trim()).filter(Boolean);
        // Last column is usually the translation
        const lastCol = cols[cols.length - 1]?.trim() || '';
        if (lastCol && /[a-zA-Z]/.test(lastCol) && lastCol.length > 3) {
          translations.push(lastCol);
        }
      }
    }
    return translations.join('\n');
  }

  // Format 2: Separate English Translation section
  let hasEnglishSection = false;
  let inEnglishSection = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^##\s+English\s+Translation/i.test(trimmed)) {
      hasEnglishSection = true;
      inEnglishSection = true;
      continue;
    }
    if (inEnglishSection && /^##\s+/.test(trimmed)) break;
    if (!inEnglishSection) continue;

    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('---') &&
        !trimmed.startsWith('|') && /[a-zA-Z]/.test(trimmed) && trimmed.length > 10) {
      translations.push(trimmed.replace(/\*\*/g, '').replace(/^\*/, '').replace(/\*$/, '').trim());
    }
  }
  if (hasEnglishSection && translations.length > 0) {
    return translations.join('\n\n');
  }

  // Format 3: Dialogue — extract English lines (bold English names or plain English after Arabic)
  if (isDialogueFormat(content)) {
    let inTextSection = false;
    for (const line of lines) {
      const trimmed = line.trim();
      if (/^##\s+/.test(trimmed) && /Text|Part|Dialogue|Line/i.test(trimmed)) {
        inTextSection = true;
        continue;
      }
      if (inTextSection && /^##\s+(?:Vocabulary|Grammatical|Grammar|Cultural|Thematic)/i.test(trimmed)) break;
      if (!inTextSection) continue;

      // **Omar:** English text
      const engDialogue = trimmed.match(/^\*\*([A-Z][a-z]+(?:\s[A-Za-z]+)*):\*\*\s*(.*)/);
      if (engDialogue) {
        translations.push(`${engDialogue[1]}: ${engDialogue[2]}`);
        continue;
      }

      // **Harith:** English text (H3 dialogue companion)
      const h3Eng = trimmed.match(/^\*\*([A-Z][a-z]+):\*\*\s*(.*)/);
      if (h3Eng) {
        translations.push(`${h3Eng[1]}: ${h3Eng[2]}`);
      }
    }
    return translations.join('\n');
  }

  // Format 4: Default — bold translations or plain text after blockquotes
  let inTextSection = false;
  let pastFirstSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (/^##\s+/.test(line) && /Text|Translation/i.test(line) && !/Vocabulary|Grammar/i.test(line)) {
      inTextSection = true;
      pastFirstSection = true;
      continue;
    }

    if (pastFirstSection && /^##\s+(Vocabulary|Grammatical|Grammar|Cultural|Thematic)/i.test(line)) {
      inTextSection = false;
      continue;
    }

    if (!inTextSection) continue;

    // Bold paragraphs are translations: **text**
    if (line.startsWith('**') && line.endsWith('**')) {
      const cleaned = line.replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
      // Skip source/page metadata
      if (!/^(?:Source|Page|Poet)/i.test(cleaned)) {
        translations.push(cleaned);
      }
      continue;
    }

    // Plain text after blockquotes
    if (
      line && !line.startsWith('#') && !line.startsWith('>') &&
      !line.startsWith('|') && !line.startsWith('---') &&
      !line.startsWith('*') && /[a-zA-Z]/.test(line) && line.length > 10
    ) {
      let j = i - 1;
      while (j >= 0 && !lines[j].trim()) j--;
      if (j >= 0 && lines[j].trim().startsWith('>')) {
        translations.push(line.trim());
      }
    }
  }

  return translations.join('\n\n');
}

/** Extract vocabulary from tables */
function extractVocabulary(content: string): { word: string; meaning: string }[] {
  const vocab: { word: string; meaning: string }[] = [];
  const lines = content.split('\n');
  let inVocabSection = false;
  const seen = new Set<string>();
  let headerCols: string[] = [];
  let meaningColIdx = -1;
  let arabicColIdx = 0; // default: first column is Arabic

  for (const line of lines) {
    const trimmed = line.trim();

    if (/^##\s+Vocabulary/i.test(trimmed)) {
      inVocabSection = true;
      headerCols = [];
      meaningColIdx = -1;
      arabicColIdx = 0;
      continue;
    }

    // Sub-sections within vocabulary (### Nouns, ### Verbs) are OK
    if (inVocabSection && /^##\s+(?!#)/.test(trimmed) && !/Vocabulary/i.test(trimmed)) {
      inVocabSection = false;
      continue;
    }

    if (!inVocabSection) continue;

    // Detect header row to find meaning and arabic column indices
    if (trimmed.startsWith('|') && /Arabic/i.test(trimmed)) {
      headerCols = trimmed.split('|').map(c => c.trim().toLowerCase()).filter(Boolean);
      // Find Arabic column (might not be first if there's a # column)
      const arIdx = headerCols.findIndex(c => /arabic/i.test(c));
      if (arIdx >= 0) arabicColIdx = arIdx;
      // Find meaning column: "meaning", "english", or "translation"
      meaningColIdx = headerCols.findIndex(c => /^(meaning|english|translation)$/i.test(c));
      if (meaningColIdx === -1) {
        // Fallback: find column that says "english" or "meaning" as substring
        meaningColIdx = headerCols.findIndex(c => /meaning|english|translation/i.test(c));
      }
      continue;
    }

    // Skip separator and header rows
    if (trimmed.startsWith('|') && trimmed.includes('---')) continue;

    // Parse table data rows
    if (trimmed.startsWith('|')) {
      const cols = trimmed.split('|').map(c => c.trim()).filter(Boolean);
      if (cols.length < 3) continue;

      const word = cols[arabicColIdx]?.trim();
      if (!word || !/[\u0600-\u06FF]/.test(word)) continue;

      let meaning = '';

      // Use detected column index
      if (meaningColIdx >= 0 && meaningColIdx < cols.length) {
        meaning = cols[meaningColIdx].trim();
      }

      // Fallback heuristic: find first English-heavy column (not transliteration, not root)
      if (!meaning || /[\u0600-\u06FF]/.test(meaning)) {
        for (let c = 1; c < cols.length; c++) {
          const col = cols[c].trim();
          // Skip Arabic columns
          if (/[\u0600-\u06FF]/.test(col)) continue;
          // Skip separator-like columns (root: "ن و م" patterns or "ب-ك-ر")
          if (/^[\u0600-\u06FF\s-]+$/.test(col)) continue;
          // Skip very short cols likely to be form numbers
          if (col.length <= 2) continue;
          // English meaning: has spaces or common English words, length > 3
          if (/[a-zA-Z]/.test(col) && col.length > 3) {
            // Is this transliteration? (lots of diacritical marks like ā, ū, ī, ṣ, etc.)
            const diacriticalChars = (col.match(/[āūīṣḍṭẓḥʿʾ]/gi) || []).length;
            const totalChars = col.replace(/\s/g, '').length;
            if (diacriticalChars / totalChars > 0.15) continue; // likely transliteration

            meaning = col;
            break;
          }
        }
      }

      if (word && meaning && !seen.has(word)) {
        seen.add(word);
        vocab.push({ word, meaning });
      }
    }
  }

  // Return first 15 most relevant entries
  return vocab.slice(0, 15);
}

/** Extract grammar concept headings */
function extractGrammarConcepts(content: string): string[] {
  const concepts: string[] = [];
  const lines = content.split('\n');
  let inGrammarSection = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (/^##\s+Grammatical/i.test(trimmed) || /^##\s+Grammar/i.test(trimmed)) {
      inGrammarSection = true;
      continue;
    }

    if (inGrammarSection && /^##\s+(?!#)/.test(trimmed) && !/Grammar/i.test(trimmed)) {
      inGrammarSection = false;
      continue;
    }

    if (!inGrammarSection) continue;

    // Match H3 headings like "### 1. Verb Forms (أوزان الأفعال)"
    if (/^###\s+/.test(trimmed)) {
      let concept = trimmed
        .replace(/^###\s+/, '')
        .replace(/^\d+\.\s*/, '')  // Remove numbering
        .trim();

      // Clean up parenthetical Arabic if it's a duplicate of the English
      // Keep it brief
      if (concept.length > 60) {
        // Just take the English part (before Arabic parenthetical)
        const parenIdx = concept.indexOf('(');
        if (parenIdx > 0) {
          concept = concept.substring(0, parenIdx).trim();
        }
      }

      if (concept) {
        concepts.push(concept);
      }
    }
  }

  return concepts;
}

/** Extract moral/thematic lesson */
function extractMoralLesson(content: string): string {
  const lines = content.split('\n');
  let inThematicSection = false;
  const lessonLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (/^##\s+(Thematic|Cultural|Moral)/i.test(trimmed)) {
      inThematicSection = true;
      continue;
    }

    if (inThematicSection && /^##\s+/.test(trimmed)) {
      inThematicSection = false;
      continue;
    }

    if (!inThematicSection) continue;

    // Collect numbered lessons: "1. **Concept:** explanation"
    if (/^\d+\.\s+\*\*/.test(trimmed)) {
      const cleaned = trimmed
        .replace(/^\d+\.\s+/, '')
        .replace(/\*\*/g, '')
        .trim();
      lessonLines.push(cleaned);
    }
  }

  // Return first 1-2 lessons as a brief summary
  if (lessonLines.length > 0) {
    return lessonLines.slice(0, 2).join(' ');
  }

  return '';
}

/** Escape backticks and backslashes in template literal strings */
function escapeForTemplate(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

/** Escape single quotes for regular string literals */
function escapeForSingleQuote(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

// ── Main ──

const stories: ParsedStory[] = [];

for (let i = 0; i < DIR_ORDER.length; i++) {
  const dir = DIR_ORDER[i];
  const dirPath = join(STORIES_DIR, dir);
  const mdPath = findMdFile(dirPath);
  const content = readFileSync(mdPath, 'utf-8');
  const id = `mq${i + 1}`;

  console.log(`Processing ${dir} → ${id} (${basename(mdPath)})`);

  // Find H1 title
  const h1Match = content.match(/^#\s+.+$/m);
  if (!h1Match) {
    console.warn(`  ⚠ No H1 title found in ${dir}, skipping`);
    continue;
  }

  const { title, titleAr } = parseTitle(h1Match[0]);
  const arabicText = extractArabicText(content);
  const translation = extractTranslation(content);
  const vocabularyHighlights = extractVocabulary(content);
  const grammaticalConcepts = extractGrammarConcepts(content);
  const moralLesson = extractMoralLesson(content);
  const wordCount = countArabicWords(arabicText);

  if (!arabicText) {
    console.warn(`  ⚠ No Arabic text extracted from ${dir}`);
  }

  stories.push({
    id,
    title: title || `Story ${i + 1}`,
    titleAr: titleAr || '',
    text: arabicText,
    translation,
    vocabularyHighlights,
    grammaticalConcepts,
    moralLesson,
    moralLessonAr: '',
    wordCount,
  });

  console.log(`  ✓ "${title}" / "${titleAr}" — ${wordCount} words, ${vocabularyHighlights.length} vocab, ${grammaticalConcepts.length} grammar concepts`);
}

// ── Generate TypeScript ──

let output = `// Generated by scripts/convert-madarij-stories.ts — do not edit manually
import type { ReadingText } from './types';

export const madarijTexts: ReadingText[] = [\n`;

for (const s of stories) {
  const vocabStr = s.vocabularyHighlights
    .map(v => `      { word: '${escapeForSingleQuote(v.word)}', meaning: '${escapeForSingleQuote(v.meaning)}' }`)
    .join(',\n');

  const conceptsStr = s.grammaticalConcepts
    .map(c => `'${escapeForSingleQuote(c)}'`)
    .join(', ');

  output += `  {
    id: '${s.id}',
    title: '${escapeForSingleQuote(s.title)}',
    titleAr: '${escapeForSingleQuote(s.titleAr)}',
    level: 'beginner',
    category: 'madarij-stories',
    categoryAr: 'مدارج القراءة',
    text: \`${escapeForTemplate(s.text)}\`,
    translation: \`${escapeForTemplate(s.translation)}\`,
    grammaticalConcepts: [${conceptsStr}],
    vocabularyHighlights: [
${vocabStr}
    ],
    moralLesson: '${escapeForSingleQuote(s.moralLesson)}',
    moralLessonAr: '',
    wordCount: ${s.wordCount},
  },\n`;
}

output += `];\n`;

writeFileSync(OUTPUT, output, 'utf-8');
console.log(`\n✅ Generated ${OUTPUT} with ${stories.length} entries`);
