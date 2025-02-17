import '../index.css'

export default function DriverCard({ driver }) {
  return (
    <div className="driver-card">
      <div className="driver-header">
        <h3>{driver.givenName} {driver.familyName}</h3>
        <span className="driver-number">#{driver.permanentNumber}</span>
      </div>
      
      <div className="driver-info">
        <p>Nacionalidade: {driver.nationality}</p>
        <p>Equipe: {driver.Constructors?.[0]?.name || 'N/A'}</p>
      </div>
    </div>
  )
}