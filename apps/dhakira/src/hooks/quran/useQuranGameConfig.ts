import { usePersistedState } from '@arabtools/core'
import type { QuranGameSettings } from '../../types/quran'

const defaultConfig: QuranGameSettings = {
  mode: 'practice-any',
  timedMode: false,
  audioHints: true,
  audioFeedback: true,
  selectedSurah: null,
}

export function useQuranGameConfig() {
  const [config, setConfig] = usePersistedState<QuranGameSettings>(
    'arabtools-dhakira-quran-config',
    defaultConfig
  )
  return { config, setConfig }
}
