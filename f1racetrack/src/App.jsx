import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hyperspeed from './components/Hyperspeed'
import Home from './pages/Home'
import Live from './pages/Live'
import './App.css'

export default function App() {
  return (
    <Router>
      <Hyperspeed />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live" element={<Live />} />
      </Routes>
    </Router>
  )
}