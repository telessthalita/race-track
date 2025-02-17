import '../index.css'

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Carregando dados da corrida...</p>
    </div>
  )
}