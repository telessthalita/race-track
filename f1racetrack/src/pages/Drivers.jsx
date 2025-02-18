import { useEffect, useState } from 'react'
import { fetchDriversWithTeams } from '../api/drivers'
import DriverCard from '../components/DriverCard'
import Loading from '../components/Loading'
import '../Drivers.css'

export default function Drivers() {
  const [drivers, setDrivers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDriversWithTeams()
        setDrivers(data)
      } catch (error) {
        console.error('Erro ao buscar pilotos:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredDrivers = drivers.filter(driver =>
    `${driver.givenName} ${driver.familyName}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) return <Loading />

  return (
    <div className="drivers-page">
      <h1 className="page-title">Pilotos da Temporada</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar piloto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="drivers-grid">
        {filteredDrivers.map(driver => (
          <DriverCard key={driver.driverId} driver={driver} />
        ))}
      </div>
    </div>
  )
}