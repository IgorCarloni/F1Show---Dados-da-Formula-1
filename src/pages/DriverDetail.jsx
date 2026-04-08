import { useParams, useNavigate } from 'react-router-dom'
import { useRaceResults, useDriverHistory } from '../hooks/useF1Data'
import { Loading, ErrorMsg } from '../components/States'
import './DriverDetail.css'

export default function DriverDetail() {
  const { driverId } = useParams()
  const navigate = useNavigate()
  const { data: race } = useRaceResults()
  const { data: history, loading, error } = useDriverHistory(driverId)

  const driverResult = race?.Results?.find(r => r.Driver.driverId === driverId)
  const driver = driverResult?.Driver

  if (loading) return <Loading />
  if (error) return <ErrorMsg message={error} />

  const totalPoints = history?.reduce((acc, r) => acc + Number(r.Results[0]?.points ?? 0), 0) ?? 0
  const wins = history?.filter(r => r.Results[0]?.position === '1').length ?? 0
  const podiums = history?.filter(r => Number(r.Results[0]?.position) <= 3).length ?? 0

  return (
    <div className="driver-page">
      <button className="btn-back" onClick={() => navigate(-1)}>← Voltar</button>

      <div className="driver-hero">
        <div className="driver-number">#{driver?.permanentNumber ?? '—'}</div>
        <div>
          <h1>{driver?.givenName} {driver?.familyName}</h1>
          <p className="driver-meta">
            <span>🏎️ {driverResult?.Constructor?.name}</span>
            <span>🌍 {driver?.nationality}</span>
            <span>🎂 {driver?.dateOfBirth}</span>
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{totalPoints}</div>
          <div className="stat-label">Pontos na temporada</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{wins}</div>
          <div className="stat-label">Vitórias</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{podiums}</div>
          <div className="stat-label">Pódios</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{history?.length ?? 0}</div>
          <div className="stat-label">Corridas</div>
        </div>
      </div>

      <h2 className="section-title">Resultados na Temporada {new Date().getFullYear()}</h2>
      <div className="table-wrapper">
        <table className="results-table">
          <thead>
            <tr>
              <th>Rodada</th>
              <th>Corrida</th>
              <th>Pos</th>
              <th>Pts</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history?.map(r => (
              <tr key={r.round} className={r.Results[0]?.position === '1' ? 'win-row' : ''}>
                <td>{r.round}</td>
                <td>{r.raceName}</td>
                <td className="pos">{r.Results[0]?.position}</td>
                <td className="pts">{r.Results[0]?.points}</td>
                <td>{r.Results[0]?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
