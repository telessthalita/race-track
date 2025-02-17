import { useEffect, useState } from 'react'
import { ergastAPI } from '../api/f1'
import DriverCard from '../components/DriverCard'
import '../index.css'

export default function Drivers() {
  const [drivers, setDrivers] = useState(null)

  useEffect(() => {
    ergastAPI.get('current/drivers.json')
      .then(res => setDrivers(res.data.MRData.DriverTable.Drivers))
  }, [])

  return (
    <div className="drivers-container">
      <h1>Pilotos da Temporada</h1>
      
      <div className="drivers-grid">
        {drivers?.map(driver => (
          <DriverCard 
            key={driver.driverId}
            driver={driver}
          />
        ))}
      </div>
    </div>
  )
}