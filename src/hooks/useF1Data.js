import { useState, useEffect } from 'react'

const BASE_URL = 'https://ergast.com/api/f1'

export function useRaceResults() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${BASE_URL}/current/last/results.json`)
      .then(res => {
        if (!res.ok) throw new Error('Falha ao buscar dados')
        return res.json()
      })
      .then(json => {
        setData(json.MRData.RaceTable.Races[0])
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}

export function useDriverHistory(driverId) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!driverId) return
    fetch(`${BASE_URL}/current/drivers/${driverId}/results.json`)
      .then(res => {
        if (!res.ok) throw new Error('Falha ao buscar dados do piloto')
        return res.json()
      })
      .then(json => {
        setData(json.MRData.RaceTable.Races)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [driverId])

  return { data, loading, error }
}
