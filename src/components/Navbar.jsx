import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <span className="brand-f1">F1</span>
        <span className="brand-show">Show</span>
      </NavLink>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
          Início
        </NavLink>
        <NavLink to="/results" className={({ isActive }) => isActive ? 'active' : ''}>
          Resultados
        </NavLink>
      </div>
    </nav>
  )
}
