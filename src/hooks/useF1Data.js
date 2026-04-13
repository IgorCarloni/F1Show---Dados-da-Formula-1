import { useState, useEffect } from 'react'

const BASE_URL = '/ergast/f1'

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

export function useSeasonRaces(year) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!year) return
    setLoading(true)
    setData(null)
    fetch(`${BASE_URL}/${year}/races.json?limit=30`)
      .then(res => {
        if (!res.ok) throw new Error('Falha ao buscar temporada')
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
  }, [year])

  return { data, loading, error }
}

export function useRaceResult(year, round) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!year || !round) return
    setLoading(true)
    setData(null)
    fetch(`${BASE_URL}/${year}/${round}/results.json`)
      .then(res => {
        if (!res.ok) throw new Error('Falha ao buscar resultado')
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
  }, [year, round])

  return { data, loading, error }
}

export function useDriverStandings(year) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!year) return
    setLoading(true)
    setData(null)
    const segment = year === 'current' ? 'current' : year
    fetch(`${BASE_URL}/${segment}/driverStandings.json`)
      .then(res => {
        if (!res.ok) throw new Error('Falha ao buscar classificação')
        return res.json()
      })
      .then(json => {
        setData(json.MRData.StandingsTable.StandingsLists[0] ?? null)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [year])

  return { data, loading, error }
}

export function useConstructorStandings(year) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!year) return
    setLoading(true)
    setData(null)
    const segment = year === 'current' ? 'current' : year
    fetch(`${BASE_URL}/${segment}/constructorStandings.json`)
      .then(res => {
        if (!res.ok) throw new Error('Falha ao buscar classificação de construtores')
        return res.json()
      })
      .then(json => {
        setData(json.MRData.StandingsTable.StandingsLists[0] ?? null)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [year])

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
