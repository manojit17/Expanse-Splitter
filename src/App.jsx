import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Calculator from './pages/Calculator.jsx'
import Login from './pages/Login.jsx'

function App() {
  // remember the logged-in user even after a page refresh
  const [user, setUser] = useState(localStorage.getItem('user') || '')

  function login(email) {
    localStorage.setItem('user', email)
    setUser(email)
  }

  function logout() {
    localStorage.removeItem('user')
    setUser('')
  }

  return (
    <>
      <Navbar user={user} onLogout={logout} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={login} />} />

          {/* calculator is only for logged-in users */}
          <Route
            path="/calculator"
            element={
              user ? <Calculator /> : <Navigate to="/login" state={{ from: '/calculator' }} />
            }
          />
        </Routes>
      </main>
      <footer className="footer">Expense Splitter - a simple project to split group expenses</footer>
    </>
  )
}

export default App