// hooks/quran/useStoryChain.ts
// Story Method: Link ayahs through narrative chains
// Based on: Remember It! (Nelson Dellis), Unlimited Memory (Kevin Horsley)
// Ported from life-os with storage key updates

import { useState, useCallback, useEffect } from 'react'

// =============================================================================
// TYPES
// =============================================================================

export interface StoryChain {
  id: string
  name: string
  surah: number
  startAyah: number
  endAyah: number
  ayahCount: number
  createdAt: string
}

export interface StoryLink {
  chainId: string
  fromAyah: number
  toAyah: number
  story: string
  imagery?: string
  createdAt: string
}

export interface RecallQuestion {
  type: 'forward' | 'backward'
  chainId: string
  prompt: string
  story: string
  answer: {
    surah: number
    ayah: number
  }
}

export interface ImageryQuestion {
  chainId: string
  imagery: string
  answer: {
    fromAyah: number
    toAyah: number
  }
}

export interface WalkStep {
  fromAyah: number
  toAyah: number
  story: string
  imagery?: string
}

export interface ChainGap {
  fromAyah: number
  toAyah: number
}

export interface SEESuggestion {
  link: StoryLink
  suggestion: string
  category: 'sensory' | 'exaggeration' | 'energy'
}

export interface StoryValidation {
  score: number
  hasSensory: boolean
  hasExaggeration: boolean
  hasEnergy: boolean
  feedback: string[]
}

// =============================================================================
// STORAGE
// =============================================================================

const STORAGE_KEYS = {
  chains: 'arabtools-dhakira-story-chains',
  links: 'arabtools-dhakira-story-links',
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
// SEE PRINCIPLE DETECTION (Senses, Exaggerate, Energize)
// =============================================================================

const SENSORY_WORDS = [
  'see', 'saw', 'look', 'glow', 'shine', 'bright', 'dark', 'color', 'golden', 'silver',
  'hear', 'sound', 'loud', 'whisper', 'crash', 'thunder', 'ring',
  'feel', 'touch', 'warm', 'cold', 'soft', 'hard', 'smooth', 'rough',
  'smell', 'scent', 'fragrant', 'sweet', 'bitter',
  'taste', 'delicious', 'sour',
]

const EXAGGERATION_WORDS = [
  'massive', 'huge', 'giant', 'tiny', 'enormous', 'explode', 'explosion',
  'million', 'billion', 'infinite', 'incredible', 'impossible',
  'brightest', 'loudest', 'biggest', 'smallest', 'fastest',
]

const ENERGY_WORDS = [
  'run', 'jump', 'fly', 'crash', 'explode', 'burst', 'race', 'chase',
  'dance', 'spin', 'zoom', 'rocket', 'launch', 'strike', 'slam',
]

function analyzeStory(story: string): StoryValidation {
  const lowerStory = story.toLowerCase()
  const words = lowerStory.split(/\s+/)

  const hasSensory = SENSORY_WORDS.some(w => lowerStory.includes(w))
  const hasExaggeration = EXAGGERATION_WORDS.some(w => lowerStory.includes(w))
  const hasEnergy = ENERGY_WORDS.some(w => lowerStory.includes(w))

  let score = 0
  const feedback: string[] = []

  if (hasSensory) {
    score += 33
  } else {
    feedback.push('Add sensory details (sight, sound, touch, smell, taste)')
  }

  if (hasExaggeration) {
    score += 33
  } else {
    feedback.push('Exaggerate size, quantity, or intensity')
  }

  if (hasEnergy) {
    score += 34
  } else {
    feedback.push('Add action and movement')
  }

  if (words.length >= 10) {
    score = Math.min(100, score + 10)
  }

  return {
    score,
    hasSensory,
    hasExaggeration,
    hasEnergy,
    feedback,
  }
}

// =============================================================================
// HOOK
// =============================================================================

export function useStoryChain() {
  const [chains, setChains] = useState<StoryChain[]>(() =>
    loadFromStorage(STORAGE_KEYS.chains, [])
  )
  const [links, setLinks] = useState<StoryLink[]>(() =>
    loadFromStorage(STORAGE_KEYS.links, [])
  )

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.chains, chains)
  }, [chains])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.links, links)
  }, [links])

  const createChain = useCallback((chain: Omit<StoryChain, 'ayahCount' | 'createdAt'>) => {
    const newChain: StoryChain = {
      ...chain,
      ayahCount: chain.endAyah - chain.startAyah + 1,
      createdAt: new Date().toISOString(),
    }
    setChains(prev => [...prev, newChain])
  }, [])

  const deleteChain = useCallback((chainId: string) => {
    setChains(prev => prev.filter(c => c.id !== chainId))
    setLinks(prev => prev.filter(l => l.chainId !== chainId))
  }, [])

  const addLink = useCallback((link: Omit<StoryLink, 'createdAt'>): boolean => {
    const exists = links.some(
      l =>
        l.chainId === link.chainId &&
        l.fromAyah === link.fromAyah &&
        l.toAyah === link.toAyah
    )

    if (exists) return false

    const newLink: StoryLink = {
      ...link,
      createdAt: new Date().toISOString(),
    }
    setLinks(prev => [...prev, newLink])
    return true
  }, [links])

  const updateLink = useCallback((
    chainId: string,
    fromAyah: number,
    toAyah: number,
    updates: Partial<Pick<StoryLink, 'story' | 'imagery'>>
  ) => {
    setLinks(prev =>
      prev.map(l =>
        l.chainId === chainId && l.fromAyah === fromAyah && l.toAyah === toAyah
          ? { ...l, ...updates }
          : l
      )
    )
  }, [])

  const getLinks = useCallback((chainId: string): StoryLink[] => {
    return links
      .filter(l => l.chainId === chainId)
      .sort((a, b) => a.fromAyah - b.fromAyah)
  }, [links])

  const getCompletion = useCallback((chainId: string): number => {
    const chain = chains.find(c => c.id === chainId)
    if (!chain) return 0

    const totalLinksNeeded = chain.ayahCount - 1
    if (totalLinksNeeded === 0) return 100

    const chainLinks = links.filter(l => l.chainId === chainId)
    return Math.round((chainLinks.length / totalLinksNeeded) * 100)
  }, [chains, links])

  const generateRecallQuestion = useCallback((
    chainId: string,
    options: { direction?: 'forward' | 'backward' } = {}
  ): RecallQuestion | null => {
    const chain = chains.find(c => c.id === chainId)
    if (!chain) return null

    const chainLinks = links.filter(l => l.chainId === chainId)
    if (chainLinks.length === 0) return null

    const randomIndex = Math.floor(Math.random() * chainLinks.length)
    const link = chainLinks[randomIndex]

    const direction = options.direction || 'forward'

    if (direction === 'forward') {
      return {
        type: 'forward',
        chainId,
        prompt: `Given the story: "${link.story}", what ayah comes next?`,
        story: link.story,
        answer: {
          surah: chain.surah,
          ayah: link.toAyah,
        },
      }
    } else {
      return {
        type: 'backward',
        chainId,
        prompt: `Given the story: "${link.story}", what ayah came before?`,
        story: link.story,
        answer: {
          surah: chain.surah,
          ayah: link.fromAyah,
        },
      }
    }
  }, [chains, links])

  const generateWalk = useCallback((chainId: string): WalkStep[] => {
    const chainLinks = links
      .filter(l => l.chainId === chainId)
      .sort((a, b) => a.fromAyah - b.fromAyah)

    return chainLinks.map(link => ({
      fromAyah: link.fromAyah,
      toAyah: link.toAyah,
      story: link.story,
      imagery: link.imagery,
    }))
  }, [links])

  const findGaps = useCallback((chainId: string): ChainGap[] => {
    const chain = chains.find(c => c.id === chainId)
    if (!chain) return []

    const chainLinks = links.filter(l => l.chainId === chainId)
    const gaps: ChainGap[] = []

    for (let ayah = chain.startAyah; ayah < chain.endAyah; ayah++) {
      const hasLink = chainLinks.some(l => l.fromAyah === ayah && l.toAyah === ayah + 1)
      if (!hasLink) {
        gaps.push({ fromAyah: ayah, toAyah: ayah + 1 })
      }
    }

    return gaps
  }, [chains, links])

  const getSEESuggestions = useCallback((chainId: string): SEESuggestion[] => {
    const chainLinks = links.filter(l => l.chainId === chainId)
    const suggestions: SEESuggestion[] = []

    for (const link of chainLinks) {
      const validation = analyzeStory(link.story)

      if (validation.score < 66) {
        let category: SEESuggestion['category'] = 'sensory'
        let suggestion = 'Make your story more vivid.'

        if (!validation.hasSensory) {
          category = 'sensory'
          suggestion = 'Add sensory details - what do you see, hear, feel?'
        } else if (!validation.hasExaggeration) {
          category = 'exaggeration'
          suggestion = 'Exaggerate! Make things massive, tiny, or impossible.'
        } else if (!validation.hasEnergy) {
          category = 'energy'
          suggestion = 'Add action - things should move, explode, or transform!'
        }

        suggestions.push({ link, suggestion, category })
      }
    }

    return suggestions
  }, [links])

  const validateStory = useCallback((story: string): StoryValidation => {
    return analyzeStory(story)
  }, [])

  return {
    chains,
    links,
    createChain,
    deleteChain,
    addLink,
    updateLink,
    getLinks,
    getCompletion,
    generateRecallQuestion,
    generateWalk,
    findGaps,
    getSEESuggestions,
    validateStory,
  }
}
