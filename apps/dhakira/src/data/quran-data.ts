// Quran data utilities - async loaded from public/data/
// Ported from life-os/src/data/quranData.ts with fetch() instead of static import

export interface QuranAyah {
  s: number
  a: number
  t: string
  w: string[]
}

interface SimilarAyahEntry {
  src: { ayah: number | number[] }
  muts: { ayah: number | number[] }[]
  ctx?: number
}

interface SimilarAyahsData {
  [surah: string]: SimilarAyahEntry[]
}

export interface QuranWord {
  word: string
  surah: number
  ayah: number
  wordIndex: number
  baseLetters: string[]
}

// Cache
let ayahMap: Map<string, QuranAyah> | null = null
let allAyahs: QuranAyah[] | null = null
let similarAyahsData: SimilarAyahsData | null = null
let loadPromise: Promise<void> | null = null

export async function loadQuranData(): Promise<void> {
  if (ayahMap) return
  if (loadPromise) return loadPromise

  loadPromise = (async () => {
    const [textRes, similarRes] = await Promise.all([
      fetch(new URL('/data/quran-text.json', window.location.origin)),
      fetch(new URL('/data/similar-ayahs.json', window.location.origin)),
    ])

    if (!textRes.ok) throw new Error('Failed to load quran-text.json')
    if (!similarRes.ok) throw new Error('Failed to load similar-ayahs.json')

    const text: QuranAyah[] = await textRes.json()
    const similar: SimilarAyahsData = await similarRes.json()

    ayahMap = new Map()
    allAyahs = text
    text.forEach(ayah => {
      ayahMap!.set(`${ayah.s}:${ayah.a}`, ayah)
    })
    similarAyahsData = similar
  })()

  return loadPromise
}

export function isDataLoaded(): boolean {
  return ayahMap !== null
}

export function getAyah(surah: number, ayah: number): QuranAyah | null {
  return ayahMap?.get(`${surah}:${ayah}`) || null
}

export function getAyahsInRange(surah: number, startAyah: number, endAyah: number): QuranAyah[] {
  const result: QuranAyah[] = []
  for (let a = startAyah; a <= endAyah; a++) {
    const ayah = getAyah(surah, a)
    if (ayah) result.push(ayah)
  }
  return result
}

export function getRandomWord(excludeSurah?: number): string {
  if (!allAyahs) return ''
  const filtered = excludeSurah ? allAyahs.filter(a => a.s !== excludeSurah) : allAyahs
  const randomAyah = filtered[Math.floor(Math.random() * filtered.length)]
  const words = randomAyah.w
  return words[Math.floor(Math.random() * words.length)]
}

export function getSimilarAyahs(surah: number, ayah: number): number[] {
  if (!similarAyahsData) return []
  const surahData = similarAyahsData[surah.toString()]
  if (!surahData) return []

  for (const item of surahData) {
    const srcAyah = item.src.ayah
    const matches = Array.isArray(srcAyah) ? srcAyah.includes(ayah) : srcAyah === ayah
    if (matches) {
      return item.muts.map(m => Array.isArray(m.ayah) ? m.ayah[0] : m.ayah)
    }
  }
  return []
}

// Global ayah number conversion
const surahOffsets = [0, 7, 293, 493, 669, 789, 954, 1160, 1235, 1364, 1473, 1596, 1707, 1750, 1802, 1901, 2029, 2140, 2250, 2348, 2483, 2595, 2673, 2791, 2855, 2932, 3159, 3252, 3340, 3409, 3469, 3503, 3533, 3606, 3660, 3705, 3788, 3970, 4058, 4133, 4218, 4272, 4325, 4414, 4473, 4510, 4545, 4583, 4612, 4630, 4675, 4735, 4784, 4846, 4901, 4979, 5075, 5104, 5126, 5150, 5163, 5177, 5188, 5199, 5217, 5229, 5241, 5271, 5323, 5375, 5419, 5447, 5475, 5495, 5551, 5591, 5622, 5672, 5712, 5758, 5800, 5829, 5848, 5884, 5909, 5931, 5948, 5967, 5993, 6023, 6043, 6058, 6079, 6090, 6098, 6106, 6125, 6130, 6138, 6146, 6157, 6168, 6176, 6179, 6188, 6193, 6197, 6204, 6207, 6213, 6217, 6221, 6225, 6230]

export function getGlobalAyahNumber(surah: number, ayah: number): number {
  return surahOffsets[surah - 1] + ayah
}

export function fromGlobalAyahNumber(globalAyah: number): { surah: number; ayah: number } | null {
  for (let s = surahOffsets.length - 1; s >= 0; s--) {
    if (globalAyah > surahOffsets[s]) {
      return { surah: s + 1, ayah: globalAyah - surahOffsets[s] }
    }
  }
  return null
}

export function getLastWords(surah: number, ayah: number, count: number): string[] {
  const ayahData = getAyah(surah, ayah)
  if (!ayahData) return []
  return ayahData.w.slice(-count)
}

export function getFirstWords(surah: number, ayah: number, count: number): string[] {
  const ayahData = getAyah(surah, ayah)
  if (!ayahData) return []
  return ayahData.w.slice(0, count)
}

// Surah name matching
const SURAH_NAME_MAP: Record<string, number> = {
  'fatiha': 1, 'fatihah': 1, 'alfatiha': 1, 'alfatihah': 1, 'al-fatiha': 1, 'al-fatihah': 1,
  'baqara': 2, 'baqarah': 2, 'albaqara': 2, 'albaqarah': 2, 'al-baqara': 2, 'al-baqarah': 2,
  'imran': 3, 'aalimran': 3, 'aal-imran': 3, 'aliimran': 3, 'ali-imran': 3,
  'nisa': 4, 'nisaa': 4, 'annisa': 4, 'an-nisa': 4,
  'maida': 5, 'maidah': 5, 'almaida': 5, 'almaidah': 5, 'al-maida': 5, 'al-maidah': 5,
}

export function matchSurahName(input: string): number | null {
  const normalized = input.toLowerCase().replace(/[^a-z0-9]/g, '')
  const num = parseInt(normalized, 10)
  if (!isNaN(num) && num >= 1 && num <= 114) return num
  if (SURAH_NAME_MAP[normalized]) return SURAH_NAME_MAP[normalized]
  for (const [name, surahNum] of Object.entries(SURAH_NAME_MAP)) {
    if (name.includes(normalized) || normalized.includes(name)) return surahNum
  }
  return null
}

export function parseReference(input: string): { surah: number; ayah: number } | null {
  const normalized = input.trim().toLowerCase()
  const match = normalized.match(/^([a-z\-]+|\d+)[\s:]+(\d+)$/)
  if (match) {
    const surahNum = matchSurahName(match[1])
    const ayahNum = parseInt(match[2], 10)
    if (surahNum && ayahNum > 0) return { surah: surahNum, ayah: ayahNum }
  }
  return null
}

// Arabic text processing
const DIACRITICS_REGEX = /[\u064B-\u065F\u0670\u06D6-\u06ED]/g
const SPECIAL_MARKS_REGEX = /[\u06D6-\u06ED\u0615-\u061A\u06E5-\u06E6]/g

const ALIF_VARIATIONS: Record<string, string> = {
  '\u0671': '\u0627', '\u0623': '\u0627', '\u0625': '\u0627',
  '\u0622': '\u0627', '\u0670': '\u0627',
}

const BASE_ARABIC_LETTERS = [
  '\u0627', '\u0628', '\u062A', '\u062B', '\u062C', '\u062D', '\u062E', '\u062F', '\u0630', '\u0631', '\u0632', '\u0633', '\u0634',
  '\u0635', '\u0636', '\u0637', '\u0638', '\u0639', '\u063A', '\u0641', '\u0642', '\u0643', '\u0644', '\u0645', '\u0646',
  '\u0647', '\u0648', '\u064A', '\u0621', '\u0629', '\u0649', '\u0626', '\u0624',
]
const BASE_LETTERS_SET = new Set(BASE_ARABIC_LETTERS)

const ARABIC_LETTER_FREQUENCY: Record<string, number> = {
  '\u0627': 15, '\u0644': 12, '\u0645': 8, '\u0646': 7, '\u0648': 7, '\u064A': 6, '\u0647': 5, '\u0631': 4,
  '\u0628': 4, '\u062A': 4, '\u0639': 4, '\u0643': 3, '\u0641': 3, '\u0642': 3, '\u062F': 3, '\u0633': 3,
  '\u062D': 2, '\u062C': 2, '\u0630': 1, '\u0634': 1, '\u0635': 1, '\u0636': 1, '\u0637': 1, '\u0638': 1,
  '\u063A': 1, '\u062E': 1, '\u062B': 1, '\u0621': 1, '\u0629': 2, '\u0649': 1, '\u0626': 1, '\u0624': 1,
}

const WEIGHTED_LETTERS: string[] = []
for (const [letter, weight] of Object.entries(ARABIC_LETTER_FREQUENCY)) {
  for (let i = 0; i < weight; i++) WEIGHTED_LETTERS.push(letter)
}

export function getRandomArabicLetters(count: number): string[] {
  const letters: string[] = []
  for (let i = 0; i < count; i++) {
    letters.push(WEIGHTED_LETTERS[Math.floor(Math.random() * WEIGHTED_LETTERS.length)])
  }
  return letters
}

export function stripDiacritics(text: string): string {
  return text.replace(DIACRITICS_REGEX, '').replace(SPECIAL_MARKS_REGEX, '')
}

function normalizeAlif(char: string): string {
  return ALIF_VARIATIONS[char] || char
}

export function extractBaseLetters(word: string): string[] {
  const letters: string[] = []
  const cleaned = stripDiacritics(word)
  for (const char of cleaned) {
    const normalized = normalizeAlif(char)
    if (BASE_LETTERS_SET.has(normalized)) letters.push(normalized)
  }
  return letters
}

export function getBaseLettersString(word: string): string {
  return extractBaseLetters(word).join('')
}

export function getWordsFromRanges(ranges: { surah: number; startAyah: number; endAyah: number }[]): QuranWord[] {
  const words: QuranWord[] = []
  const seen = new Set<string>()
  for (const range of ranges) {
    for (let a = range.startAyah; a <= range.endAyah; a++) {
      const ayah = getAyah(range.surah, a)
      if (ayah) {
        ayah.w.forEach((word, idx) => {
          if (word.length <= 1) return
          const baseLetters = extractBaseLetters(word)
          const baseKey = baseLetters.join('')
          if (baseLetters.length >= 3 && !seen.has(baseKey)) {
            seen.add(baseKey)
            words.push({ word, surah: range.surah, ayah: a, wordIndex: idx, baseLetters })
          }
        })
      }
    }
  }
  return words
}

export function getWordsByLength(
  minLength: number, maxLength: number,
  ranges: { surah: number; startAyah: number; endAyah: number }[]
): QuranWord[] {
  return getWordsFromRanges(ranges).filter(w => {
    const len = w.baseLetters.length
    return len >= minLength && len <= maxLength
  })
}

export function isQuranWord(word: string, ranges?: { surah: number; startAyah: number; endAyah: number }[]): boolean {
  const inputBaseLetters = getBaseLettersString(word)
  if (ranges && ranges.length > 0) {
    return getWordsFromRanges(ranges).some(w => w.baseLetters.join('') === inputBaseLetters)
  }
  if (!allAyahs) return false
  return allAyahs.some(ayah => ayah.w.some(w => getBaseLettersString(w) === inputBaseLetters))
}

export function getRandomWordWithContext(
  ranges: { surah: number; startAyah: number; endAyah: number }[],
  minLength = 3, maxLength = 7
): { word: QuranWord; ayahText: string; words: string[] } | null {
  const words = getWordsByLength(minLength, maxLength, ranges)
  if (words.length === 0) return null
  const randomWord = words[Math.floor(Math.random() * words.length)]
  const ayah = getAyah(randomWord.surah, randomWord.ayah)
  if (!ayah) return null
  return { word: randomWord, ayahText: ayah.t, words: ayah.w }
}

// Memory science game utilities
export function getFirstLettersOfAyah(surah: number, ayah: number): string[] {
  const ayahData = getAyah(surah, ayah)
  if (!ayahData) return []
  return ayahData.w.map(word => {
    const baseLetters = extractBaseLetters(word)
    return baseLetters.length > 0 ? baseLetters[0] : ''
  }).filter(letter => letter !== '')
}

export function getFirstNLettersOfAyah(surah: number, ayah: number, n: number): string[] {
  const ayahData = getAyah(surah, ayah)
  if (!ayahData) return []
  return ayahData.w.map(word => {
    const baseLetters = extractBaseLetters(word)
    return baseLetters.slice(0, n).join('')
  }).filter(letters => letters !== '')
}

export function getAdjacentAyah(surah: number, ayah: number, direction: 'before' | 'after'): QuranAyah | null {
  if (direction === 'before') {
    if (ayah > 1) return getAyah(surah, ayah - 1)
    if (surah > 1) {
      let prevSurahAyah = 1
      while (getAyah(surah - 1, prevSurahAyah + 1)) prevSurahAyah++
      return getAyah(surah - 1, prevSurahAyah)
    }
    return null
  } else {
    const nextAyah = getAyah(surah, ayah + 1)
    if (nextAyah) return nextAyah
    if (surah < 114) return getAyah(surah + 1, 1)
    return null
  }
}

export function getAyahPhrases(surah: number, ayah: number): string[] {
  const ayahData = getAyah(surah, ayah)
  if (!ayahData) return []
  const words = ayahData.w
  const phrases: string[] = []
  let currentPhrase: string[] = []

  for (let i = 0; i < words.length; i++) {
    currentPhrase.push(words[i])
    const nextWord = words[i + 1]
    const startsWithWaw = nextWord &&
      (nextWord.startsWith('\u0648') || nextWord.startsWith('\u0648\u064E') || nextWord.startsWith('\u0648\u064E\u0625\u0650') || nextWord.startsWith('\u0648\u064E\u0623\u064E'))
    const shouldSplit = (startsWithWaw && currentPhrase.length >= 2) || (currentPhrase.length >= 4 && i < words.length - 1)
    if (shouldSplit) {
      phrases.push(currentPhrase.join(' '))
      currentPhrase = []
    }
  }
  if (currentPhrase.length > 0) phrases.push(currentPhrase.join(' '))
  if (phrases.length === 1 && words.length >= 4) {
    const mid = Math.floor(words.length / 2)
    return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
  }
  return phrases
}

// Theme detection
const THEME_KEYWORDS: Record<string, string[]> = {
  'Praise and Gratitude': ['\u0627\u0644\u062D\u0645\u062F', '\u062D\u0645\u062F', '\u0634\u0643\u0631', '\u0633\u0628\u062D\u0627\u0646', '\u062A\u0628\u0627\u0631\u0643', '\u0646\u0639\u0645'],
  'Day of Judgment': ['\u064A\u0648\u0645', '\u0627\u0644\u062F\u064A\u0646', '\u0627\u0644\u0642\u064A\u0627\u0645\u0629', '\u0627\u0644\u0633\u0627\u0639\u0629', '\u0627\u0644\u0628\u0639\u062B', '\u0627\u0644\u062D\u0633\u0627\u0628', '\u062C\u0647\u0646\u0645', '\u0627\u0644\u0646\u0627\u0631'],
  'Guidance and Path': ['\u0647\u062F\u0649', '\u0635\u0631\u0627\u0637', '\u0633\u0628\u064A\u0644', '\u0647\u062F\u0627\u064A\u0629', '\u0636\u0644\u0627\u0644', '\u0646\u0648\u0631'],
  'Mercy and Forgiveness': ['\u0631\u062D\u0645', '\u063A\u0641\u0631', '\u062A\u0648\u0627\u0628', '\u0639\u0641\u0648', '\u0645\u063A\u0641\u0631\u0629', '\u0631\u062D\u064A\u0645', '\u0627\u0644\u0631\u062D\u0645\u0646'],
  'Prayer and Worship': ['\u0635\u0644\u0627\u0629', '\u0639\u0628\u062F', '\u0633\u062C\u062F', '\u0631\u0643\u0639', '\u0642\u0646\u062A', '\u0646\u0639\u0628\u062F', '\u0646\u0633\u062A\u0639\u064A\u0646'],
  'Faith and Belief': ['\u0622\u0645\u0646', '\u0625\u064A\u0645\u0627\u0646', '\u0645\u0624\u0645\u0646', '\u064A\u0642\u064A\u0646', '\u0635\u062F\u0642', '\u0643\u0641\u0631'],
  'Creation and Nature': ['\u062E\u0644\u0642', '\u0633\u0645\u0627\u0648\u0627\u062A', '\u0623\u0631\u0636', '\u062C\u0628\u0627\u0644', '\u0628\u062D\u0631', '\u0634\u0645\u0633', '\u0642\u0645\u0631'],
  'Stories of Prophets': ['\u0645\u0648\u0633\u0649', '\u0639\u064A\u0633\u0649', '\u0625\u0628\u0631\u0627\u0647\u064A\u0645', '\u0646\u0648\u062D', '\u064A\u0648\u0633\u0641', '\u062F\u0627\u0648\u062F', '\u0633\u0644\u064A\u0645\u0627\u0646'],
  'Commands and Prohibitions': ['\u0623\u0645\u0631', '\u0646\u0647\u0649', '\u062D\u0644\u0627\u0644', '\u062D\u0631\u0627\u0645', '\u0641\u0631\u0636', '\u0648\u0627\u062C\u0628'],
  'Paradise and Reward': ['\u062C\u0646\u0629', '\u062C\u0646\u0627\u062A', '\u0646\u0639\u064A\u0645', '\u0641\u0648\u0632', '\u062B\u0648\u0627\u0628', '\u0623\u062C\u0631'],
}

export function getAyahTheme(surah: number, ayah: number): string | null {
  const ayahData = getAyah(surah, ayah)
  if (!ayahData) return null
  const text = ayahData.t
  for (const [theme, keywords] of Object.entries(THEME_KEYWORDS)) {
    for (const keyword of keywords) {
      if (text.includes(keyword)) return theme
    }
  }
  return null
}

export function getAllThemes(): string[] {
  return Object.keys(THEME_KEYWORDS)
}

export function getDistractorThemes(correctTheme: string, count: number): string[] {
  const allThemes = getAllThemes().filter(t => t !== correctTheme)
  for (let i = allThemes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[allThemes[i], allThemes[j]] = [allThemes[j], allThemes[i]]
  }
  return allThemes.slice(0, count)
}

export function getDistractorSurahs(correctSurah: number, count: number, similarityLevel: 'easy' | 'medium' | 'hard' = 'medium'): number[] {
  let candidates: number[] = []
  if (similarityLevel === 'easy') {
    candidates = [1, 2, 18, 36, 55, 67, 78, 112, 114].filter(s => s !== correctSurah)
  } else if (similarityLevel === 'medium') {
    for (let i = Math.max(1, correctSurah - 10); i <= Math.min(114, correctSurah + 10); i++) {
      if (i !== correctSurah) candidates.push(i)
    }
  } else {
    const shortSurahs = Array.from({ length: 30 }, (_, i) => 85 + i).filter(s => s <= 114 && s !== correctSurah)
    const mediumSurahs = Array.from({ length: 30 }, (_, i) => 50 + i).filter(s => s <= 84 && s !== correctSurah)
    candidates = correctSurah >= 85 ? shortSurahs : (correctSurah >= 50 ? mediumSurahs : candidates)
    if (candidates.length < count) {
      for (let i = Math.max(1, correctSurah - 5); i <= Math.min(114, correctSurah + 5); i++) {
        if (i !== correctSurah && !candidates.includes(i)) candidates.push(i)
      }
    }
  }
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[candidates[i], candidates[j]] = [candidates[j], candidates[i]]
  }
  return candidates.slice(0, count)
}
