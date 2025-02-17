import { useEffect, useState } from 'react'
import { ergastAPI } from '../api/f1'
import Card from '../components/Card'
import Loading from '../components/Loading'
import '../Home.css'

export default function Home() {
  const [schedule, setSchedule] = useState(null)
  const [lastResult, setLastResult] = useState(null)
  const [standings, setStandings] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const fetchData = async (isManual = false) => {
    try {
      if(isManual) setIsUpdating(true)
      setIsLoading(true)

      const [
        scheduleRes, 
        resultRes, 
        driverStandingsRes,
        constructorStandingsRes
      ] = await Promise.all([
        ergastAPI.get('current.json'),
        ergastAPI.get('current/last/results.json'),
        ergastAPI.get('current/driverStandings.json'),
        ergastAPI.get('current/constructorStandings.json')
      ])

      setSchedule(scheduleRes.data.MRData.RaceTable.Races.slice(0, 3))
      setLastResult(resultRes.data.MRData.RaceTable.Races[0])
      setStandings({
        drivers: driverStandingsRes.data.MRData.StandingsTable.StandingsLists[0],
        constructors: constructorStandingsRes.data.MRData.StandingsTable.StandingsLists[0]
      })
      
      setError(null)
    } catch (err) {
      setError('Falha ao carregar dados. Verifique sua conexão.')
      console.error(err)
    } finally {
      setIsLoading(false)
      if(isManual) setTimeout(() => setIsUpdating(false), 1000)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 300000) // Atualiza a cada 5 minutos
    return () => clearInterval(interval)
  }, [])

  if (isLoading) return <Loading />
  if (error) return <ErrorComponent message={error} onRetry={fetchData} />

  return (
    <div className="home-container">
      <h1 className="page-title">
        F1 Live Dashboard
        <button 
          className={`update-button ${isUpdating ? 'updating' : ''}`}
          onClick={() => fetchData(true)}
        >
          {isUpdating ? '🔄 Atualizando...' : '🔄 Atualizar Dados'}
        </button>
      </h1>

      <div className="dashboard-grid">
        <div className="dashboard-column">
          <UpcomingRaces schedule={schedule} />
          <ConstructorsStandings standings={standings.constructors} />
        </div>

        <div className="dashboard-column">
          <LatestResult result={lastResult} />
          <DriversStandings standings={standings.drivers} />
        </div>
      </div>
    </div>
  )
}

// Componentes Internos
const UpcomingRaces = ({ schedule }) => (
  <Card title="Próximas Corridas 🏁" icon="calendar">
    <div className="schedule-list">
      {schedule.map((race) => (
        <div key={race.round} className="race-item">
          <div className="race-date">
            {new Date(race.date).toLocaleDateString('pt-BR')}
          </div>
          <div className="race-info">
            <h4>{race.raceName}</h4>
            <p>{race.Circuit.circuitName}</p>
            <div className="race-location">
              📍 {race.Circuit.Location.locality}, {race.Circuit.Location.country}
            </div>
          </div>
        </div>
      ))}
    </div>
  </Card>
)

const LatestResult = ({ result }) => (
  <Card title="Último Resultado 🏆" icon="trophy">
    <div className="winner-info">
      <h3>
        {result.Results[0].Driver.givenName} {result.Results[0].Driver.familyName}
      </h3>
      <div className="constructor-info">
        <span className="constructor-name">
          {result.Results[0].Constructor.name}
        </span>
        <span className="race-time">
          ⏱️ {result.Results[0].Time?.time || 'Finalizado'}
        </span>
      </div>
      <div className="race-details">
        <div className="detail-item">
          <span>Voltas</span>
          <strong>{result.Results[0].laps}</strong>
        </div>
        <div className="detail-item">
          <span>Pontos</span>
          <strong>{result.Results[0].points}</strong>
        </div>
      </div>
    </div>
  </Card>
)

const DriversStandings = ({ standings }) => (
  <Card title="Classificação de Pilotos 🏎️" icon="ranking">
    <div className="standings-list">
      {standings.DriverStandings.slice(0, 5).map((standing) => (
        <div key={standing.Driver.driverId} className="standing-item driver-standing">
          <span className="position">#{standing.position}</span>
          <div className="driver-info">
            <span className="driver-name">
              {standing.Driver.givenName} {standing.Driver.familyName}
            </span>
            <span className="constructor-name">
              {standing.Constructors[0].name}
            </span>
          </div>
          <div className="stats">
            <span className="points">{standing.points} pts</span>
            <span className="wins">{standing.wins} 🏆</span>
          </div>
        </div>
      ))}
    </div>
  </Card>
)

const ConstructorsStandings = ({ standings }) => (
  <Card title="Classificação de Equipes 🏗️" icon="constructor">
    <div className="standings-list">
      {standings.ConstructorStandings.slice(0, 5).map((constructor) => (
        <div key={constructor.Constructor.constructorId} className="standing-item constructor-standing">
          <span className="position">#{constructor.position}</span>
          <span className="constructor-name">
            {constructor.Constructor.name}
          </span>
          <div className="stats">
            <span className="points">{constructor.points} pts</span>
            <span className="wins">{constructor.wins} 🏆</span>
          </div>
        </div>
      ))}
    </div>
  </Card>
)

const ErrorComponent = ({ message, onRetry }) => (
  <div className="error-container">
    <div className="error-content">
      <div className="error-icon">⚠️</div>
      <h3 className="error-message">{message}</h3>
      <button 
        className="retry-button"
        onClick={() => {
          onRetry(true)
          window.location.reload()
        }}
      >
        Tentar Novamente
      </button>
    </div>
  </div>
)