// hooks/quran/useMemoryPalace.ts
// Memory Palace / Method of Loci implementation
// Based on: Moonwalking with Einstein (Foer), The Art of Memory (Yates)
// Ported from life-os with storage key updates

import { useState, useCallback, useEffect } from 'react'

// =============================================================================
// TYPES
// =============================================================================

export interface PalaceRoom {
  id: string
  name: string
  order: number
  lociCount: number
}

export interface MemoryPalace {
  id: string
  name: string
  rooms: PalaceRoom[]
  createdAt: string
}

export interface AyahPlacement {
  palaceId: string
  roomId: string
  locusIndex: number
  surah: number
  ayah: number
  mnemonic?: string
  placedAt: string
}

export interface WalkStep {
  roomId: string
  roomName: string
  locusIndex: number
  surah: number
  ayah: number
  mnemonic?: string
}

export interface RecallQuestion {
  prompt: string
  hint?: string
  answer: {
    surah: number
    ayah: number
  }
}

export interface LocationQuestion {
  ayahRef: string
  answer: {
    roomName: string
    locusIndex: number
  }
}

export interface PalaceTemplate {
  id: string
  name: string
  description: string
  rooms: Omit<PalaceRoom, 'order'>[]
}

// =============================================================================
// STORAGE
// =============================================================================

const STORAGE_KEYS = {
  palaces: 'arabtools-dhakira-memory-palaces',
  placements: 'arabtools-dhakira-memory-palace-placements',
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
// TEMPLATES
// =============================================================================

const PALACE_TEMPLATES: PalaceTemplate[] = [
  {
    id: 'home',
    name: 'My Home',
    description: 'A familiar home layout with common rooms',
    rooms: [
      { id: 'entrance', name: 'Entrance', lociCount: 5 },
      { id: 'living-room', name: 'Living Room', lociCount: 10 },
      { id: 'kitchen', name: 'Kitchen', lociCount: 8 },
      { id: 'bedroom', name: 'Bedroom', lociCount: 7 },
      { id: 'bathroom', name: 'Bathroom', lociCount: 5 },
    ],
  },
  {
    id: 'masjid',
    name: 'Masjid',
    description: 'A mosque layout for spiritual connection',
    rooms: [
      { id: 'entrance', name: 'Entrance', lociCount: 5 },
      { id: 'wudu-area', name: 'Wudu Area', lociCount: 6 },
      { id: 'main-hall', name: 'Main Prayer Hall', lociCount: 20 },
      { id: 'mihrab', name: 'Mihrab Area', lociCount: 5 },
      { id: 'library', name: 'Library', lociCount: 10 },
    ],
  },
  {
    id: 'school',
    name: 'School',
    description: 'A school building with classrooms',
    rooms: [
      { id: 'gate', name: 'School Gate', lociCount: 3 },
      { id: 'hallway', name: 'Main Hallway', lociCount: 10 },
      { id: 'classroom-1', name: 'Classroom 1', lociCount: 12 },
      { id: 'classroom-2', name: 'Classroom 2', lociCount: 12 },
      { id: 'library', name: 'Library', lociCount: 15 },
      { id: 'playground', name: 'Playground', lociCount: 8 },
    ],
  },
]

// =============================================================================
// HOOK
// =============================================================================

export function useMemoryPalace() {
  const [palaces, setPalaces] = useState<MemoryPalace[]>(() => {
    const stored = loadFromStorage<MemoryPalace[]>(STORAGE_KEYS.palaces, [])
    return stored.map(palace => ({
      ...palace,
      rooms: Array.isArray(palace.rooms) ? palace.rooms : [],
    }))
  })
  const [placements, setPlacements] = useState<AyahPlacement[]>(() =>
    loadFromStorage(STORAGE_KEYS.placements, [])
  )

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.palaces, palaces)
  }, [palaces])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.placements, placements)
  }, [placements])

  const createPalace = useCallback((palace: Omit<MemoryPalace, 'createdAt'>) => {
    const newPalace: MemoryPalace = {
      ...palace,
      createdAt: new Date().toISOString(),
    }
    setPalaces(prev => [...prev, newPalace])
  }, [])

  const deletePalace = useCallback((palaceId: string) => {
    setPalaces(prev => prev.filter(p => p.id !== palaceId))
    setPlacements(prev => prev.filter(p => p.palaceId !== palaceId))
  }, [])

  const getPalaceCapacity = useCallback((palaceId: string): number => {
    const palace = palaces.find(p => p.id === palaceId)
    if (!palace) return 0
    return palace.rooms.reduce((sum, room) => sum + room.lociCount, 0)
  }, [palaces])

  const placeAyah = useCallback((placement: Omit<AyahPlacement, 'placedAt'>): boolean => {
    const isOccupied = placements.some(
      p =>
        p.palaceId === placement.palaceId &&
        p.roomId === placement.roomId &&
        p.locusIndex === placement.locusIndex
    )

    if (isOccupied) return false

    const newPlacement: AyahPlacement = {
      ...placement,
      placedAt: new Date().toISOString(),
    }
    setPlacements(prev => [...prev, newPlacement])
    return true
  }, [placements])

  const removePlacement = useCallback((
    palaceId: string,
    roomId: string,
    locusIndex: number
  ) => {
    setPlacements(prev =>
      prev.filter(
        p => !(p.palaceId === palaceId && p.roomId === roomId && p.locusIndex === locusIndex)
      )
    )
  }, [])

  const getPlacements = useCallback((palaceId: string): AyahPlacement[] => {
    return placements.filter(p => p.palaceId === palaceId)
  }, [placements])

  const generateWalk = useCallback((
    palaceId: string,
    options: { reverse?: boolean } = {}
  ): WalkStep[] => {
    const palace = palaces.find(p => p.id === palaceId)
    if (!palace) return []

    const palacePlacements = placements.filter(p => p.palaceId === palaceId)
    const sortedRooms = [...palace.rooms].sort((a, b) => a.order - b.order)

    const walk: WalkStep[] = []

    for (const room of sortedRooms) {
      const roomPlacements = palacePlacements
        .filter(p => p.roomId === room.id)
        .sort((a, b) => a.locusIndex - b.locusIndex)

      for (const placement of roomPlacements) {
        walk.push({
          roomId: room.id,
          roomName: room.name,
          locusIndex: placement.locusIndex,
          surah: placement.surah,
          ayah: placement.ayah,
          mnemonic: placement.mnemonic,
        })
      }
    }

    return options.reverse ? walk.reverse() : walk
  }, [palaces, placements])

  const generateRecallQuestion = useCallback((palaceId: string): RecallQuestion | null => {
    const palace = palaces.find(p => p.id === palaceId)
    if (!palace) return null

    const palacePlacements = placements.filter(p => p.palaceId === palaceId)
    if (palacePlacements.length === 0) return null

    const randomIndex = Math.floor(Math.random() * palacePlacements.length)
    const placement = palacePlacements[randomIndex]

    const room = palace.rooms.find(r => r.id === placement.roomId)
    if (!room) return null

    return {
      prompt: `In ${room.name}, at locus ${placement.locusIndex + 1}, what ayah is placed?`,
      hint: placement.mnemonic,
      answer: {
        surah: placement.surah,
        ayah: placement.ayah,
      },
    }
  }, [palaces, placements])

  const generateLocationQuestion = useCallback((palaceId: string): LocationQuestion | null => {
    const palace = palaces.find(p => p.id === palaceId)
    if (!palace) return null

    const palacePlacements = placements.filter(p => p.palaceId === palaceId)
    if (palacePlacements.length === 0) return null

    const randomIndex = Math.floor(Math.random() * palacePlacements.length)
    const placement = palacePlacements[randomIndex]

    const room = palace.rooms.find(r => r.id === placement.roomId)
    if (!room) return null

    return {
      ayahRef: `${placement.surah}:${placement.ayah}`,
      answer: {
        roomName: room.name,
        locusIndex: placement.locusIndex,
      },
    }
  }, [palaces, placements])

  const getTemplates = useCallback((): PalaceTemplate[] => {
    return PALACE_TEMPLATES
  }, [])

  const createFromTemplate = useCallback((templateId: string) => {
    const template = PALACE_TEMPLATES.find(t => t.id === templateId)
    if (!template) return

    const palace: MemoryPalace = {
      id: `${template.id}-${Date.now()}`,
      name: template.name,
      rooms: template.rooms.map((room, index) => ({
        ...room,
        order: index,
      })),
      createdAt: new Date().toISOString(),
    }

    setPalaces(prev => [...prev, palace])
  }, [])

  return {
    palaces,
    placements,
    createPalace,
    deletePalace,
    getPalaceCapacity,
    placeAyah,
    removePlacement,
    getPlacements,
    generateWalk,
    generateRecallQuestion,
    generateLocationQuestion,
    getTemplates,
    createFromTemplate,
  }
}
