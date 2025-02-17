// components/Header.jsx
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../index.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-content">
        <NavLink to="/" className="logo">
          Race Track
        </NavLink>

        <button 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/live" 
            className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
          >
            Ao Vivo
          </NavLink>
          <NavLink 
            to="/drivers" 
            className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
          >
            Pilotos
          </NavLink>
        </nav>
      </div>
    </header>
  )
}