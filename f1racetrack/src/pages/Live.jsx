import { useEffect, useState } from 'react'
import { ergastAPI } from '../api/f1'
import Card from '../components/Card'
import Loading from '../components/Loading'
import '../index.css'

export default function Live() {
  const [raceData, setRaceData] = useState(null)
  const [standings, setStandings] = useState(null)
  const [lastUpdate, setLastUpdate] = useState('')
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      // Busca dados da corrida atual
      const raceResponse = await ergastAPI.get('current/last/results.json')
      const race = raceResponse.data.MRData.RaceTable.Races[0]
      
      // Busca standings
      const standingsResponse = await ergastAPI.get('current/driverStandings.json')
      const standings = standingsResponse.data.MRData.StandingsTable.StandingsLists[0]
      
      setRaceData(race)
      setStandings(standings)
      setLastUpdate(new Date().toLocaleTimeString())
      setError(null)
    } catch (err) {
      setError('Erro ao buscar dados da corrida. Tente recarregar a página.')
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (error) return <Error message={error} />
  if (!raceData || !standings) return <Loading />

  return (
    <div className="live-container">
      {/* Cabeçalho */}
      <div className="live-header">
        <h1>{raceData.raceName}</h1>
        <p className="update-time">Última atualização: {lastUpdate}</p>
      </div>

      {/* Informações da Corrida */}
      <Card title="Informações do Circuito">
        <div className="circuit-info">
          <p>🏁 {raceData.Circuit.circuitName}</p>
          <p>📍 {raceData.Circuit.Location.locality}, {raceData.Circuit.Location.country}</p>
          <p>📅 {new Date(raceData.date).toLocaleDateString()}</p>
        </div>
      </Card>

      {/* Resultados da Corrida */}
      <Card title="Classificação da Corrida">
        <div className="results-grid">
          {raceData.Results.map((result, index) => (
            <div key={result.Driver.driverId} className="result-item">
              <div className="position">{result.position}</div>
              <div className="driver">
                <span className="driver-name">{result.Driver.givenName} {result.Driver.familyName}</span>
                <span className="constructor">{result.Constructor.name}</span>
              </div>
              <div className="points">{result.points} pts</div>
              <div className={`status ${result.status === 'Finished' ? 'finished' : 'retired'}`}>
                {result.status === 'Finished' ? 'Finalizado' : 'Abandonou'}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Classificação Geral */}
      <Card title="Classificação Geral">
        <div className="standings-list">
          {standings.DriverStandings.map((standing) => (
            <div key={standing.Driver.driverId} className="standing-item">
              <span className="position">#{standing.position}</span>
              <span className="driver">
                {standing.Driver.givenName} {standing.Driver.familyName}
              </span>
              <span className="points">{standing.points} pts</span>
              <span className="wins">{standing.wins} 🏆</span>
              <span className="constructor">{standing.Constructors[0].name}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// Componente de Erro
const Error = ({ message }) => (
  <div className="error-container">
    <div className="error-message">⚠️ {message}</div>
    <button onClick={() => window.location.reload()}>Recarregar Página</button>
  </div>
)