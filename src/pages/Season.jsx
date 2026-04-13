import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSeasonRaces, useRaceResult } from '../hooks/useF1Data'
import { Loading, ErrorMsg } from '../components/States'
import './Season.css'

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: CURRENT_YEAR - 1949 }, (_, i) => CURRENT_YEAR - i)

export default function Season() {
  const [year, setYear] = useState(CURRENT_YEAR)
  const [selectedRound, setSelectedRound] = useState(null)
  const navigate = useNavigate()

  const { data: races, loading: loadingRaces, error: errorRaces } = useSeasonRaces(year)
  const { data: raceResult, loading: loadingResult, error: errorResult } = useRaceResult(
    selectedRound ? year : null,
    selectedRound
  )

  function handleYearChange(e) {
    setYear(Number(e.target.value))
    setSelectedRound(null)
  }

  return (
    <div className="season-page">
      <div className="season-header">
        <h1>Temporadas</h1>
        <div className="year-selector">
          <label htmlFor="year-select">Selecionar ano</label>
          <select id="year-select" value={year} onChange={handleYearChange}>
            {YEARS.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="season-layout">
        <aside className="races-list">
          <h2>Corridas — {year}</h2>
          {loadingRaces && <Loading />}
          {errorRaces && <ErrorMsg message={errorRaces} />}
          {races?.length === 0 && (
            <p className="empty-msg">Nenhuma corrida encontrada para {year}.</p>
          )}
          {races?.map(race => (
            <button
              key={race.round}
              className={`race-item ${selectedRound === race.round ? 'active' : ''}`}
              onClick={() => setSelectedRound(race.round)}
            >
              <span className="race-round">R{race.round}</span>
              <span className="race-name">{race.raceName}</span>
              <span className="race-date">{race.date}</span>
            </button>
          ))}
        </aside>

        <section className="race-detail">
          {!selectedRound && (
            <div className="empty-state">
              <div>🏁</div>
              <p>Selecione uma corrida para ver os resultados</p>
            </div>
          )}

          {selectedRound && loadingResult && <Loading />}
          {selectedRound && errorResult && <ErrorMsg message={errorResult} />}

          {raceResult && (
            <>
              <div className="detail-header">
                <h2>{raceResult.raceName}</h2>
                <p>{raceResult.Circuit.circuitName} — {raceResult.Circuit.Location.locality}, {raceResult.Circuit.Location.country}</p>
                <p className="detail-date">📅 {raceResult.date} &nbsp;|&nbsp; Rodada {raceResult.round}</p>
              </div>

              <div className="table-wrapper">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Pos</th>
                      <th>Piloto</th>
                      <th>Equipe</th>
                      <th>Nº</th>
                      <th>Voltas</th>
                      <th>Tempo / Status</th>
                      <th>Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {raceResult.Results?.map(r => (
                      <tr
                        key={r.Driver.driverId}
                        className="result-row"
                        onClick={() => navigate(`/driver/${r.Driver.driverId}`)}
                      >
                        <td className="pos">{r.position}</td>
                        <td className="driver-name">
                          {r.Driver.givenName} {r.Driver.familyName}
                          <span className="driver-code">{r.Driver.code}</span>
                        </td>
                        <td>{r.Constructor.name}</td>
                        <td className="center">{r.number}</td>
                        <td className="center">{r.laps}</td>
                        <td>{r.Time?.time ?? r.status}</td>
                        <td className="pts">{r.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
