import { useNavigate } from 'react-router-dom'
import { useRaceResults } from '../hooks/useF1Data'
import { Loading, ErrorMsg } from '../components/States'
import './Results.css'

const STATUS_ICON = {
  Finished: '✅',
  '+1 Lap': '🔵',
  '+2 Laps': '🔵',
  Accident: '💥',
  Retired: '🔧',
  Disqualified: '🚫',
}

function statusIcon(status) {
  return STATUS_ICON[status] ?? '⚪'
}

export default function Results() {
  const { data: race, loading, error } = useRaceResults()
  const navigate = useNavigate()

  if (loading) return <Loading />
  if (error) return <ErrorMsg message={error} />

  return (
    <div className="results-page">
      <div className="results-header">
        <h1>{race.raceName}</h1>
        <p>{race.Circuit.circuitName} — {race.Circuit.Location.locality}, {race.Circuit.Location.country}</p>
        <p className="results-date">📅 {race.date} &nbsp;|&nbsp; Rodada {race.round} de {new Date().getFullYear()}</p>
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
            {race.Results.map(r => (
              <tr
                key={r.Driver.driverId}
                onClick={() => navigate(`/driver/${r.Driver.driverId}`)}
                className="result-row"
              >
                <td className="pos">{r.position}</td>
                <td className="driver-name">
                  {r.Driver.givenName} {r.Driver.familyName}
                  <span className="driver-code">{r.Driver.code}</span>
                </td>
                <td>{r.Constructor.name}</td>
                <td className="center">{r.number}</td>
                <td className="center">{r.laps}</td>
                <td>
                  {statusIcon(r.status)} {r.Time?.time ?? r.status}
                </td>
                <td className="pts">{r.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
