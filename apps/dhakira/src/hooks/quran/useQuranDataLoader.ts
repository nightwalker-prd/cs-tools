import { useState, useEffect } from 'react'
import { loadQuranData, isDataLoaded } from '../../data/quran-data'

export function useQuranDataLoader() {
  const [loading, setLoading] = useState(!isDataLoaded())
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isDataLoaded()) {
      setLoading(false)
      return
    }

    loadQuranData()
      .then(() => setLoading(false))
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Failed to load Quran data')
        setLoading(false)
      })
  }, [])

  return { loading, error, isReady: !loading && !error }
}
