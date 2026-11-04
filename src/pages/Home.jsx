import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
        <h1>Split group expenses without the awkward maths</h1>
        <p>
          Going on a trip or sharing a flat? Add what everyone paid and see
          exactly who owes whom.
        </p>
        <Link to="/calculator" className="btn btn-big">Try the calculator</Link>
      </section>

      {/* How the calculation works */}
      <section>
        <h2>How the calculation works</h2>
        <div className="grid three">
          <div className="card">
            <div className="step-number">1</div>
            <h3>Add people</h3>
            <p>Enter the names of everyone in the group.</p>
          </div>
          <div className="card">
            <div className="step-number">2</div>
            <h3>Add expenses</h3>
            <p>Write what was paid, how much, who paid it and who shared it.</p>
          </div>
          <div className="card">
            <div className="step-number">3</div>
            <h3>See who pays whom</h3>
            <p>The app shows the fewest payments needed to settle up.</p>
          </div>
        </div>
      </section>

      {/* Worked example */}
      <section className="card example">
        <h2>A quick example</h2>
        <p>Sani, Raj and Meena go on a trip.</p>
        <ul>
          <li>Sani pays <b>₹3000</b> for the hotel (shared by all 3)</li>
          <li>Raj pays <b>₹600</b> for dinner (shared by all 3)</li>
        </ul>
        <p>Total spent = ₹3600, so each person's fair share = 3600 ÷ 3 = <b>₹1200</b>.</p>
        <table>
          <thead>
            <tr><th>Person</th><th>Paid</th><th>Fair share</th><th>Result</th></tr>
          </thead>
          <tbody>
            <tr><td>Sani</td><td>₹3000</td><td>₹1200</td><td className="good">gets back ₹1800</td></tr>
            <tr><td>Raj</td><td>₹600</td><td>₹1200</td><td className="bad">owes ₹600</td></tr>
            <tr><td>Meena</td><td>₹0</td><td>₹1200</td><td className="bad">owes ₹1200</td></tr>
          </tbody>
        </table>
        <p className="note">
          Formula: <b>Paid − Fair share</b>. A positive number means you get money back,
          a negative number means you owe money.
        </p>
      </section>

      {/* Last section: call to action */}
      <section className="cta">
        <h2>Ready to split your expenses?</h2>
        <p>It is free and there is nothing to sign up for.</p>
        <Link to="/calculator" className="btn btn-big">Get Started Free</Link>
      </section>
    </div>
  )
}

export default Home
