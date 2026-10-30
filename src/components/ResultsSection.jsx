import { calculateBalances, simplifyDebts, money } from '../utils/splitLogic.js'
import SettleRow from './SettleRow.jsx'

// Step 3: show the results
function ResultsSection({ people, expenses, payments, onSettle }) {
  if (expenses.length === 0) {
    return (
      <section className="card">
        <h2>Step 3: Results</h2>
        <p className="hint">Add an expense to see the results here.</p>
      </section>
    )
  }

  const balances = calculateBalances(people, expenses, payments)
  const transfers = simplifyDebts(balances)
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <section className="card">
      <h2>Step 3: Results</h2>

      {/* summary numbers */}
      <div className="grid three">
        <div className="stat"><span>Total spent</span><b>{money(total)}</b></div>
        <div className="stat"><span>People</span><b>{people.length}</b></div>
        <div className="stat"><span>Average per person</span><b>{money(total / people.length)}</b></div>
      </div>

      {/* who is owed and who owes */}
      <h3>Everyone's balance</h3>
      <table>
        <thead>
          <tr><th>Person</th><th>Paid</th><th>Fair share</th><th>Settled</th><th>Balance</th></tr>
        </thead>
        <tbody>
          {balances.map((b) => (
            <tr key={b.name}>
              <td>{b.name}</td>
              <td>{money(b.paid)}</td>
              <td>{money(b.share)}</td>
              <td>{money(b.settled)}</td>
              <td className={b.net > 0.01 ? 'good' : b.net < -0.01 ? 'bad' : ''}>
                {b.net > 0.01 && 'Gets back ' + money(b.net)}
                {b.net < -0.01 && 'Owes ' + money(-b.net)}
                {Math.abs(b.net) <= 0.01 && 'All settled ✓'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="note">Balance = Paid − Fair share (adjusted by payments already marked as settled).</p>

      {/* the payments to make */}
      <h3>Who pays whom</h3>
      {transfers.length === 0 ? (
        <p className="good-box">🎉 Everyone is settled up!</p>
      ) : (
        <ul className="settle-list">
          {/* key includes the amount so the input resets after a payment */}
          {transfers.map((t) => (
            <SettleRow key={t.from + t.to + t.amount} item={t} onSettle={onSettle} />
          ))}
        </ul>
      )}

      {/* history */}
      {payments.length > 0 && (
        <>
          <h3>Payments already made</h3>
          <ul>
            {payments.map((p, i) => (
              <li key={i}>{p.from} paid {p.to} {money(p.amount)} via {p.method}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

export default ResultsSection
