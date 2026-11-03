import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="page">
      <h1>About</h1>

      <section className="card">
        <h2>What is this project?</h2>
        <p>
          Expense Splitter is a small web app that helps groups share costs
          during trips, dinners, events or while living together. It removes
          the need for notes and manual calculations.
        </p>
      </section>

      <section className="card">
        <h2>What can you do with it?</h2>
        <ul>
          <li>Add and remove people in your group</li>
          <li>Record expenses and choose who shared each one</li>
          <li>See how much each person paid and what their fair share is</li>
          <li>Get a short list of payments to settle everything</li>
          <li>Mark payments as settled, even partially</li>
        </ul>
      </section>

      <section className="card">
        <h2>Built with</h2>
        <p>React, React Router, and plain CSS. The calculation code is kept in one small file so it is easy to follow.</p>
      </section>

      <Link to="/calculator" className="btn">Go to calculator</Link>
    </div>
  )
}

export default About
