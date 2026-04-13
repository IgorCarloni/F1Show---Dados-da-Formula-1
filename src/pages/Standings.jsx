import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDriverStandings, useConstructorStandings } from '../hooks/useF1Data'
import { Loading, ErrorMsg } from '../components/States'
import './Standings.css'

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: CURRENT_YEAR - 1949 }, (_, i) => CURRENT_YEAR - i)
const MEDAL = { 1: '🥇', 2: '🥈', 3: '🥉' }

export default function Standings() {
  const [year, setYear] = useState('current')
  const [tab, setTab] = useState('drivers')
  const navigate = useNavigate()

  const { data: drivers, loading: loadingD, error: errorD } = useDriverStandings(year)
  const { data: constructors, loading: loadingC, error: errorC } = useConstructorStandings(year)

  const loading = tab === 'drivers' ? loadingD : loadingC
  const error = tab === 'drivers' ? errorD : errorC

  const displayYear = year === 'current' ? CURRENT_YEAR : year

  return (
    <div className="standings-page">
      <div className="standings-header">
        <div>
          <h1>Classificação</h1>
          <p className="standings-meta">
            Temporada {drivers?.season ?? displayYear}
            {drivers?.round ? ` — após rodada ${drivers.round}` : ''}
          </p>
        </div>
        <div className="year-selector">
          <label htmlFor="standings-year">Ano</label>
          <select
            id="standings-year"
            value={year}
            onChange={e => setYear(e.target.value)}
          >
            <option value="current">Atual ({CURRENT_YEAR})</option>
            {YEARS.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="standings-tabs">
        <button
          className={tab === 'drivers' ? 'tab active' : 'tab'}
          onClick={() => setTab('drivers')}
        >
          🧑‍✈️ Pilotos
        </button>
        <button
          className={tab === 'constructors' ? 'tab active' : 'tab'}
          onClick={() => setTab('constructors')}
        >
          🏭 Construtores
        </button>
      </div>

      {loading && <Loading />}
      {error && <ErrorMsg message={error} />}

      {!loading && !error && tab === 'drivers' && (
        drivers
          ? <DriversList data={drivers} navigate={navigate} />
          : <p className="empty-msg">Sem dados de pilotos para {displayYear}.</p>
      )}

      {!loading && !error && tab === 'constructors' && (
        constructors
          ? <ConstructorsList data={constructors} />
          : <p className="empty-msg">Sem dados de construtores para {displayYear}.</p>
      )}
    </div>
  )
}

function DriversList({ data, navigate }) {
  const leader = data.DriverStandings[0]
  const leaderPts = Number(leader.points)

  return (
    <>
      <div className="leader-banner">
        <span>🏆 Líder</span>
        <strong>{leader.Driver.givenName} {leader.Driver.familyName}</strong>
        <span>{leader.points} pts</span>
      </div>
      <div className="standings-list">
        {data.DriverStandings.map(s => {
          const pos = Number(s.position)
          const pts = Number(s.points)
          const gap = leaderPts - pts
          const barWidth = Math.max(4, (pts / leaderPts) * 100)
          return (
            <div
              key={s.Driver.driverId}
              className={`standing-row ${pos <= 3 ? 'podium' : ''}`}
              onClick={() => navigate(`/driver/${s.Driver.driverId}`)}
            >
              <div className="standing-pos">
                {MEDAL[pos] ?? <span className="pos-num">{pos}</span>}
              </div>
              <div className="standing-info">
                <div className="standing-name">
                  {s.Driver.givenName} {s.Driver.familyName}
                  <span className="standing-code">{s.Driver.code}</span>
                </div>
                <div className="standing-team">{s.Constructors[0]?.name}</div>
                <div className="standing-bar-wrap">
                  <div className="standing-bar" style={{ width: `${barWidth}%` }} />
                </div>
              </div>
              <div className="standing-right">
                <div className="standing-pts">{pts} <span>pts</span></div>
                {gap > 0 && <div className="standing-gap">−{gap} pts</div>}
                {s.wins > 0 && <span className="wins-badge">{s.wins}V</span>}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

function ConstructorsList({ data }) {
  const leader = data.ConstructorStandings[0]
  const leaderPts = Number(leader.points)

  return (
    <>
      <div className="leader-banner">
        <span>🏆 Líder</span>
        <strong>{leader.Constructor.name}</strong>
        <span>{leader.points} pts</span>
      </div>
      <div className="standings-list">
        {data.ConstructorStandings.map(s => {
          const pos = Number(s.position)
          const pts = Number(s.points)
          const gap = leaderPts - pts
          const barWidth = Math.max(4, (pts / leaderPts) * 100)
          return (
            <div
              key={s.Constructor.constructorId}
              className={`standing-row ${pos <= 3 ? 'podium' : ''}`}
            >
              <div className="standing-pos">
                {MEDAL[pos] ?? <span className="pos-num">{pos}</span>}
              </div>
              <div className="standing-info">
                <div className="standing-name">{s.Constructor.name}</div>
                <div className="standing-team">{s.Constructor.nationality}</div>
                <div className="standing-bar-wrap">
                  <div className="standing-bar" style={{ width: `${barWidth}%` }} />
                </div>
              </div>
              <div className="standing-right">
                <div className="standing-pts">{pts} <span>pts</span></div>
                {gap > 0 && <div className="standing-gap">−{gap} pts</div>}
                {s.wins > 0 && <span className="wins-badge">{s.wins}V</span>}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
