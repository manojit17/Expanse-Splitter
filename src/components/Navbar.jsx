import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <span className="logo">💸 Expense Splitter</span>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/calculator">Calculator</NavLink>
      </nav>
    </header>
  )
}

export default Navbar
