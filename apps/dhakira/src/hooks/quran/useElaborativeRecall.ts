// hooks/quran/useElaborativeRecall.ts
// Elaborative Interrogation: Deep processing through questioning
// Based on: Make It Stick (Brown, Roediger, McDaniel)
// Ported from life-os with storage key updates

import { useState, useCallback, useEffect } from 'react'
import { getAyah } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'

// =============================================================================
// TYPES
// =============================================================================

export type QuestionType = 'why' | 'how' | 'what-if'
export type ElaborationQuality = 'excellent' | 'good' | 'fair' | 'poor'

export interface ElaborativeQuestion {
  type: QuestionType
  surah: number
  ayah: number
  prompt: string
  hints?: string[]
}

export interface Elaboration {
  surah: number
  ayah: number
  questionType: QuestionType
  question: string
  response: string
  quality: ElaborationQuality
  createdAt: string
}

export interface ExplanationEvaluation {
  depth: number
  concepts: number
  connections: number
  quality: ElaborationQuality
}

export interface ElaborationStats {
  excellentCount: number
  goodCount: number
  fairCount: number
  poorCount: number
  totalCount: number
}

// =============================================================================
// STORAGE
// =============================================================================

const STORAGE_KEYS = {
  elaborations: 'arabtools-dhakira-elaborations',
}

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch {
    return defaultValue
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage full or unavailable
  }
}

// =============================================================================
// QUESTION TEMPLATES
// =============================================================================

const WHY_TEMPLATES = [
  'Why does this ayah mention {concept}?',
  'Why is {concept} significant in this context?',
  'Why do you think Allah revealed this message at this point?',
  'Why is {concept} paired with {concept2} here?',
]

const HOW_TEMPLATES = [
  'How does this ayah connect to the previous one?',
  'How does this message apply to daily life?',
  'How does {concept} relate to the surah\'s overall theme?',
  'How would you explain this ayah to someone new to Islam?',
]

const WHAT_IF_TEMPLATES = [
  'What if this ayah wasn\'t revealed - what would be missing?',
  'What if you had to summarize this in one sentence?',
  'What if someone asked you to prove this concept from other ayahs?',
]

const CONCEPT_KEYWORDS = [
  'Allah', 'Lord', 'belief', 'guidance', 'prayer', 'righteous',
  'heaven', 'earth', 'mercy', 'forgiveness', 'judgment', 'day',
  'truth', 'falsehood', 'soul', 'heart', 'knowledge', 'wisdom',
]

function extractConcepts(text: string): string[] {
  const words = text.toLowerCase().split(/\s+/)
  return CONCEPT_KEYWORDS.filter(keyword =>
    words.some(w => w.includes(keyword.toLowerCase()))
  )
}

// =============================================================================
// HOOK
// =============================================================================

export function useElaborativeRecall() {
  const [elaborations, setElaborations] = useState<Elaboration[]>(() =>
    loadFromStorage(STORAGE_KEYS.elaborations, [])
  )

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.elaborations, elaborations)
  }, [elaborations])

  const generateWhyQuestion = useCallback((surah: number, ayah: number): ElaborativeQuestion | null => {
    const ayahData = getAyah(surah, ayah)
    if (!ayahData) return null

    const surahName = SURAH_DATA[surah - 1]?.name || `Surah ${surah}`
    const concepts = extractConcepts(ayahData.t)

    let prompt: string
    if (concepts.length > 0) {
      const template = WHY_TEMPLATES[Math.floor(Math.random() * 2)]
      prompt = template
        .replace('{concept}', concepts[0])
        .replace('{concept2}', concepts[1] || concepts[0])
    } else {
      prompt = `Why is this message (${surahName}:${ayah}) important for believers?`
    }

    return {
      type: 'why',
      surah,
      ayah,
      prompt,
      hints: concepts.length > 0 ? [`Consider the role of: ${concepts.join(', ')}`] : undefined,
    }
  }, [])

  const generateHowQuestion = useCallback((surah: number, ayah: number): ElaborativeQuestion | null => {
    const ayahData = getAyah(surah, ayah)
    if (!ayahData) return null

    const template = HOW_TEMPLATES[Math.floor(Math.random() * HOW_TEMPLATES.length)]
    const concepts = extractConcepts(ayahData.t)

    const prompt = template.replace('{concept}', concepts[0] || 'this message')

    return {
      type: 'how',
      surah,
      ayah,
      prompt,
    }
  }, [])

  const generateWhatIfQuestion = useCallback((surah: number, ayah: number): ElaborativeQuestion | null => {
    const ayahData = getAyah(surah, ayah)
    if (!ayahData) return null

    const template = WHAT_IF_TEMPLATES[Math.floor(Math.random() * WHAT_IF_TEMPLATES.length)]

    return {
      type: 'what-if',
      surah,
      ayah,
      prompt: template,
    }
  }, [])

  const saveElaboration = useCallback((elaboration: Omit<Elaboration, 'createdAt'> & { createdAt?: string }) => {
    const newElaboration: Elaboration = {
      ...elaboration,
      createdAt: elaboration.createdAt || new Date().toISOString(),
    }
    setElaborations(prev => [...prev, newElaboration])
  }, [])

  const getElaborationStats = useCallback((surah: number): ElaborationStats => {
    const surahElaborations = elaborations.filter(e => e.surah === surah)

    return {
      excellentCount: surahElaborations.filter(e => e.quality === 'excellent').length,
      goodCount: surahElaborations.filter(e => e.quality === 'good').length,
      fairCount: surahElaborations.filter(e => e.quality === 'fair').length,
      poorCount: surahElaborations.filter(e => e.quality === 'poor').length,
      totalCount: surahElaborations.length,
    }
  }, [elaborations])

  const generateSelfExplanationPrompt = useCallback((surah: number, ayah: number) => {
    const ayahData = getAyah(surah, ayah)
    if (!ayahData) return null

    return {
      surah,
      ayah,
      instruction: 'Explain this ayah in your own words. Focus on what it means and why it matters.',
      guideQuestions: [
        'What is the main message?',
        'Who is being addressed?',
        'What action or belief is encouraged?',
        'How does this connect to your life?',
      ],
    }
  }, [])

  const evaluateExplanation = useCallback((explanation: string): ExplanationEvaluation => {
    const words = explanation.split(/\s+/)
    const wordCount = words.length

    const lengthScore = Math.min(wordCount / 50, 1) * 40
    const conceptsFound = extractConcepts(explanation)
    const conceptScore = Math.min(conceptsFound.length / 5, 1) * 30

    const connectionWords = ['because', 'therefore', 'connects', 'relates', 'means', 'shows', 'demonstrates', 'implies']
    const connectionCount = connectionWords.filter(w => explanation.toLowerCase().includes(w)).length
    const connectionScore = Math.min(connectionCount / 3, 1) * 30

    const depth = Math.round(lengthScore + conceptScore + connectionScore)

    let quality: ElaborationQuality
    if (depth >= 80) quality = 'excellent'
    else if (depth >= 60) quality = 'good'
    else if (depth >= 40) quality = 'fair'
    else quality = 'poor'

    return {
      depth,
      concepts: conceptsFound.length,
      connections: connectionCount,
      quality,
    }
  }, [])

  return {
    generateWhyQuestion,
    generateHowQuestion,
    generateWhatIfQuestion,
    saveElaboration,
    getElaborationStats,
    generateSelfExplanationPrompt,
    evaluateExplanation,
  }
}
