import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Live from './pages/Live'
import Drivers from './pages/Drivers'
import './index.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Cabeçalho Fixo */}
        <Header className="header" />
        
        <main className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/live" element={<Live />} />
              <Route path="/drivers" element={<Drivers />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App