import { ergastAPI } from './f1'

export const fetchDriversWithTeams = async () => {
    try {
      const [driversRes, standingsRes] = await Promise.all([
        ergastAPI.get('current/drivers.json'),
        ergastAPI.get('current/driverStandings.json')
      ])
  
      const drivers = driversRes.data.MRData.DriverTable.Drivers
      const standings = standingsRes.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
  
      return drivers.map(driver => {
        const standing = standings.find(s => s.Driver.driverId === driver.driverId)
        return {
          ...driver,
          Constructor: standing?.Constructors[0] || null
        }
      })
    } catch (error) {
      console.error('Erro ao buscar pilotos:', error)
      return []
    }
  
  
  return {
    info: driverRes.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0],
    results: resultsRes.data.MRData.RaceTable.Races
  }
}