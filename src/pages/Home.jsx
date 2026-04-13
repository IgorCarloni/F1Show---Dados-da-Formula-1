import { useNavigate } from 'react-router-dom'
import { useRaceResults } from '../hooks/useF1Data'
import { Loading, ErrorMsg } from '../components/States'
import './Home.css'

export default function Home() {
  const { data: race, loading, error } = useRaceResults()
  const navigate = useNavigate()

  if (loading) return <Loading />
  if (error) return <ErrorMsg message={error} />

  const winner = race?.Results?.[0]

  return (
    <div className="home">
      <div className="welcome-banner">
        🏎️ Bem vindo a F1 Show onde a velocidade não para!
      </div>
      <section className="hero">
        <div className="hero-badge">Última Corrida</div>
        <h1>{race.raceName}</h1>
        <p className="hero-meta">
          🏁 Rodada {race.round} &nbsp;|&nbsp; 📅 {race.date} &nbsp;|&nbsp; 📍 {race.Circuit.circuitName}
        </p>
        <p className="hero-location">
          {race.Circuit.Location.locality}, {race.Circuit.Location.country}
        </p>
      </section>

      {winner && (
        <section className="winner-card">
          <div className="winner-label">🏆 Vencedor</div>
          <div className="winner-name">
            {winner.Driver.givenName} {winner.Driver.familyName}
          </div>
          <div className="winner-info">
            <span className="tag">{winner.Constructor.name}</span>
            <span className="tag">Volta mais rápida: {winner.FastestLap?.Time?.time ?? 'N/A'}</span>
            <span className="tag">Tempo total: {winner.Time?.time ?? 'N/A'}</span>
          </div>
          <button className="btn-primary" onClick={() => navigate('/results')}>
            Ver todos os resultados →
          </button>
        </section>
      )}

      <section className="podium">
        <h2>Pódio</h2>
        <div className="podium-grid">
          {race.Results?.slice(0, 3).map((r, i) => (
            <div
              key={r.Driver.driverId}
              className={`podium-card pos-${i + 1}`}
              onClick={() => navigate(`/driver/${r.Driver.driverId}`)}
            >
              <div className="podium-pos">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
              <div className="podium-driver">
                {r.Driver.givenName} {r.Driver.familyName}
              </div>
              <div className="podium-team">{r.Constructor.name}</div>
              <div className="podium-pts">{r.points} pts</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
