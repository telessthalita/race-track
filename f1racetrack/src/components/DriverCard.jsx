import ReactCountryFlag from 'react-country-flag'
import { Link } from 'react-router-dom'
import '../Drivers.css'

export default function DriverCard({ driver }) {
  return (
    <div className="driver-card">
      <div className="driver-header">
        <div className="driver-number">
          #{driver.permanentNumber || '--'}
        </div>
        <ReactCountryFlag
          countryCode={driver.nationality}
          svg
          className="nationality-flag"
          title={driver.nationality}
        />
      </div>

      <div className="driver-info">
        <h3 className="driver-name">
          {driver.givenName} <strong>{driver.familyName}</strong>
        </h3>
        
        {driver.Constructor && (
          <div className="team-info">
            <span className="team-name">{driver.Constructor.name}</span>
          </div>
        )}
      </div>
    </div>
  )
}