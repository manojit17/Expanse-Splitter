import { NavLink } from 'react-router-dom'

function Navbar({ user, onLogout }) {
  return (
    <header className="navbar">
      <span className="logo">💸 Expense Splitter</span>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/calculator">Calculator</NavLink>

        {user ? (
          <>
            <span className="user-name">{user}</span>
            <button className="btn-small logout" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  )
}

export default Navbar