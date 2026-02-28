import { useState, useCallback, useEffect } from 'react'
import { SURAH_DATA } from '../../data/quran-surah'

export interface Peg { number: number; peg: string; imageHint: string }
export interface AyahPegAssociation { surah: number; ayah: number; pegNumber: number; imagery: string; createdAt: string }
export interface PegMastery { surah: number; ayah: number; level: 0 | 1 | 2 | 3 | 4 | 5; correctStreak: number; totalAttempts: number; correctAttempts: number; lastAttemptAt: string | null }
export interface PegToAyahQuestion { prompt: string; imagery: string; pegNumber: number; answer: { surah: number; ayah: number } }
export interface AyahToNumberQuestion { ayahRef: string; imagery: string; answer: number }
export interface RandomJumpQuestion { prompt: string; pegNumber: number; answer: { surah: number; ayah: number } }
export interface SurahProgress { total: number; pegged: number; percent: number }
export interface TimedChallenge { surah: number; timeLimit: number; questions: Array<PegToAyahQuestion | AyahToNumberQuestion> }
export interface ChallengeResult { correct: boolean; responseTime: number }
export interface ChallengeMetrics { accuracy: number; avgResponseTime: number; correctCount: number; totalCount: number }
export type PegSystemType = 'rhyme' | 'major'

const STORAGE_KEYS = {
  customPegs: 'arabtools-dhakira-pegs-custom',
  associations: 'arabtools-dhakira-pegs-associations',
  mastery: 'arabtools-dhakira-pegs-mastery',
}

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try { const stored = localStorage.getItem(key); return stored ? JSON.parse(stored) : defaultValue }
  catch { return defaultValue }
}

function saveToStorage<T>(key: string, value: T): void {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* noop */ }
}

const RHYME_PEGS: Peg[] = [
  { number: 1, peg: 'sun', imageHint: 'Bright golden sun' },
  { number: 2, peg: 'shoe', imageHint: 'Old worn shoe' },
  { number: 3, peg: 'tree', imageHint: 'Tall oak tree' },
  { number: 4, peg: 'door', imageHint: 'Heavy wooden door' },
  { number: 5, peg: 'hive', imageHint: 'Buzzing beehive' },
  { number: 6, peg: 'sticks', imageHint: 'Bundle of sticks' },
  { number: 7, peg: 'heaven', imageHint: 'Clouds and gates' },
  { number: 8, peg: 'gate', imageHint: 'Iron garden gate' },
  { number: 9, peg: 'vine', imageHint: 'Grape vine' },
  { number: 10, peg: 'hen', imageHint: 'Red hen' },
  { number: 11, peg: 'drums', imageHint: 'Two drumsticks' },
  { number: 12, peg: 'elf', imageHint: 'Small elf' },
  { number: 13, peg: 'queen', imageHint: 'Royal queen' },
  { number: 14, peg: 'fortune', imageHint: 'Pot of gold' },
  { number: 15, peg: 'lifting', imageHint: 'Weightlifter' },
  { number: 16, peg: 'sweet', imageHint: 'Sweet sixteen cake' },
  { number: 17, peg: 'magazine', imageHint: 'Glossy magazine' },
  { number: 18, peg: 'waiting', imageHint: 'Person waiting' },
  { number: 19, peg: 'antine', imageHint: 'Valentine heart' },
  { number: 20, peg: 'plenty', imageHint: 'Cornucopia' },
]

const MAJOR_SYSTEM_WORDS = [
  'sea', 'tie', 'knee', 'ma', 'ray', 'law', 'jaw', 'key', 'fee', 'bee',
  'toes', 'tot', 'tin', 'tomb', 'tire', 'tail', 'dish', 'tack', 'dove', 'tub',
  'nose', 'net', 'nun', 'name', 'nero', 'nail', 'notch', 'neck', 'knife', 'knob',
  'mouse', 'mat', 'moon', 'mummy', 'mare', 'mail', 'match', 'mug', 'movie', 'mop',
  'rose', 'rat', 'rain', 'ram', 'rower', 'rail', 'roach', 'rock', 'roof', 'rope',
  'lace', 'lot', 'lion', 'lime', 'lure', 'lily', 'leech', 'lock', 'leaf', 'lip',
  'cheese', 'jet', 'chin', 'jam', 'jar', 'jail', 'judge', 'jug', 'chef', 'ship',
  'case', 'cat', 'coin', 'comb', 'car', 'coal', 'coach', 'cake', 'cave', 'cup',
  'fez', 'fat', 'fan', 'foam', 'fire', 'file', 'fish', 'fog', 'fife', 'fib',
  'bus', 'bat', 'bone', 'bomb', 'bear', 'bell', 'beach', 'book', 'beef', 'baby',
]

function getMajorPegs(): Peg[] {
  return MAJOR_SYSTEM_WORDS.map((word, index) => ({ number: index, peg: word, imageHint: `A ${word}` }))
}

export function useAyahPegs() {
  const [customPegs, setCustomPegs] = useState<Record<string, Peg>>(() => loadFromStorage(STORAGE_KEYS.customPegs, {}))
  const [associations, setAssociations] = useState<AyahPegAssociation[]>(() => loadFromStorage(STORAGE_KEYS.associations, []))
  const [mastery, setMastery] = useState<PegMastery[]>(() => loadFromStorage(STORAGE_KEYS.mastery, []))

  useEffect(() => { saveToStorage(STORAGE_KEYS.customPegs, customPegs) }, [customPegs])
  useEffect(() => { saveToStorage(STORAGE_KEYS.associations, associations) }, [associations])
  useEffect(() => { saveToStorage(STORAGE_KEYS.mastery, mastery) }, [mastery])

  const getSystemPegs = useCallback((system: PegSystemType): Peg[] => {
    return system === 'rhyme' ? RHYME_PEGS : getMajorPegs()
  }, [])

  const getCustomPeg = useCallback((number: number): Peg | undefined => customPegs[String(number)], [customPegs])

  const setCustomPeg = useCallback((number: number, peg: string, imageHint: string) => {
    setCustomPegs(prev => ({ ...prev, [String(number)]: { number, peg, imageHint } }))
  }, [])

  const createAssociation = useCallback((assoc: Omit<AyahPegAssociation, 'createdAt'>) => {
    const newAssoc: AyahPegAssociation = { ...assoc, createdAt: new Date().toISOString() }
    setAssociations(prev => {
      const filtered = prev.filter(a => !(a.surah === assoc.surah && a.ayah === assoc.ayah))
      return [...filtered, newAssoc]
    })
  }, [])

  const getAssociations = useCallback((surah: number): AyahPegAssociation[] => {
    return associations.filter(a => a.surah === surah).sort((a, b) => a.ayah - b.ayah)
  }, [associations])

  const getSurahProgress = useCallback((surah: number): SurahProgress => {
    const surahData = SURAH_DATA.find(s => s.number === surah)
    const total = surahData?.ayahCount || 0
    const pegged = associations.filter(a => a.surah === surah).length
    return { total, pegged, percent: total > 0 ? (pegged / total) * 100 : 0 }
  }, [associations])

  const generatePegToAyahQuestion = useCallback((surah: number): PegToAyahQuestion | null => {
    const surahAssocs = associations.filter(a => a.surah === surah)
    if (surahAssocs.length === 0) return null
    const assoc = surahAssocs[Math.floor(Math.random() * surahAssocs.length)]
    return { prompt: `Peg ${assoc.pegNumber}: What ayah is at this position?`, imagery: assoc.imagery, pegNumber: assoc.pegNumber, answer: { surah: assoc.surah, ayah: assoc.ayah } }
  }, [associations])

  const generateAyahToNumberQuestion = useCallback((surah: number): AyahToNumberQuestion | null => {
    const surahAssocs = associations.filter(a => a.surah === surah)
    if (surahAssocs.length === 0) return null
    const assoc = surahAssocs[Math.floor(Math.random() * surahAssocs.length)]
    return { ayahRef: `${assoc.surah}:${assoc.ayah}`, imagery: assoc.imagery, answer: assoc.ayah }
  }, [associations])

  const generateRandomJumpQuestion = useCallback((surah: number): RandomJumpQuestion | null => {
    const surahAssocs = associations.filter(a => a.surah === surah)
    if (surahAssocs.length === 0) return null
    const assoc = surahAssocs[Math.floor(Math.random() * surahAssocs.length)]
    return { prompt: `Quick! jump to ayah ${assoc.ayah} - what's the peg imagery?`, pegNumber: assoc.pegNumber, answer: { surah: assoc.surah, ayah: assoc.ayah } }
  }, [associations])

  const getPegMastery = useCallback((surah: number, ayah: number): PegMastery => {
    const existing = mastery.find(m => m.surah === surah && m.ayah === ayah)
    return existing || { surah, ayah, level: 0, correctStreak: 0, totalAttempts: 0, correctAttempts: 0, lastAttemptAt: null }
  }, [mastery])

  const recordPegAttempt = useCallback((surah: number, ayah: number, correct: boolean) => {
    setMastery(prev => {
      const existing = prev.find(m => m.surah === surah && m.ayah === ayah)
      const now = new Date().toISOString()
      if (existing) {
        const newStreak = correct ? existing.correctStreak + 1 : 0
        let newLevel = existing.level
        if (correct && newStreak >= 3 && existing.level < 5) newLevel = (existing.level + 1) as 0 | 1 | 2 | 3 | 4 | 5
        if (!correct && newStreak === 0 && existing.level > 0) newLevel = (existing.level - 1) as 0 | 1 | 2 | 3 | 4 | 5
        return prev.map(m => m.surah === surah && m.ayah === ayah
          ? { ...m, level: newLevel, correctStreak: newStreak, totalAttempts: m.totalAttempts + 1, correctAttempts: m.correctAttempts + (correct ? 1 : 0), lastAttemptAt: now }
          : m)
      }
      return [...prev, { surah, ayah, level: correct ? 1 : 0, correctStreak: correct ? 1 : 0, totalAttempts: 1, correctAttempts: correct ? 1 : 0, lastAttemptAt: now } as PegMastery]
    })
  }, [])

  const getWeakPegs = useCallback((surah: number): PegMastery[] => {
    return mastery.filter(m => m.surah === surah && m.level < 3).sort((a, b) => a.level - b.level)
  }, [mastery])

  const startTimedChallenge = useCallback((surah: number, timeLimit: number): TimedChallenge => {
    const surahAssocs = associations.filter(a => a.surah === surah)
    const shuffled = [...surahAssocs]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    const questions: Array<PegToAyahQuestion | AyahToNumberQuestion> = shuffled.map((assoc, index) => {
      if (index % 2 === 0) {
        return { prompt: `Peg ${assoc.pegNumber}: What ayah?`, imagery: assoc.imagery, pegNumber: assoc.pegNumber, answer: { surah: assoc.surah, ayah: assoc.ayah } } as PegToAyahQuestion
      }
      return { ayahRef: `${assoc.surah}:${assoc.ayah}`, imagery: assoc.imagery, answer: assoc.ayah } as AyahToNumberQuestion
    })
    return { surah, timeLimit, questions }
  }, [associations])

  const calculateMetrics = useCallback((results: ChallengeResult[]): ChallengeMetrics => {
    const totalCount = results.length
    const correctCount = results.filter(r => r.correct).length
    return {
      accuracy: totalCount > 0 ? (correctCount / totalCount) * 100 : 0,
      avgResponseTime: totalCount > 0 ? results.reduce((sum, r) => sum + r.responseTime, 0) / totalCount : 0,
      correctCount, totalCount,
    }
  }, [])

  return {
    getSystemPegs, getCustomPeg, setCustomPeg,
    createAssociation, getAssociations, getSurahProgress,
    generatePegToAyahQuestion, generateAyahToNumberQuestion, generateRandomJumpQuestion,
    getPegMastery, recordPegAttempt, getWeakPegs,
    startTimedChallenge, calculateMetrics,
  }
}
