import { useState } from 'react'
import { money } from '../utils/splitLogic.js'

function ExpenseSection({ people, expenses, onAdd, onDelete }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [paidBy, setPaidBy] = useState('')
  const [excluded, setExcluded] = useState([]) 

  
  const payer = paidBy || people[0] || ''
  const sharedBy = people.filter((p) => !excluded.includes(p))

  function toggleShare(name) {
    if (excluded.includes(name)) {
      setExcluded(excluded.filter((p) => p !== name))
    } else {
      setExcluded([...excluded, name])
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const added = onAdd({
      description: description.trim(),
      amount: Number(amount),
      paidBy: payer,
      splitAmong: sharedBy,
    })
    if (added) {
      setDescription('')
      setAmount('')
      setExcluded([])
    }
  }

  if (people.length < 2) {
    return (
      <section className="card">
        <h2>Step 2: Add expenses</h2>
        <p className="hint">Add at least 2 people in Step 1 to start adding expenses.</p>
      </section>
    )
  }

  return (
    <section className="card">
      <h2>Step 2: What was spent?</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What was it for? e.g. Hotel"
          />
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount (₹)"
          />
        </div>

        <label className="label">Who paid?</label>
        <select value={payer} onChange={(e) => setPaidBy(e.target.value)}>
          {people.map((p) => <option key={p}>{p}</option>)}
        </select>

        <label className="label">Who shared this expense? (untick anyone who did not)</label>
        <div className="chips">
          {people.map((p) => (
            <label key={p} className="check">
              <input
                type="checkbox"
                checked={!excluded.includes(p)}
                onChange={() => toggleShare(p)}
              />
              {p}
            </label>
          ))}
        </div>

        {/* live preview so the user understands what will happen */}
        {Number(amount) > 0 && sharedBy.length > 0 && (
          <p className="note">
            Each of the {sharedBy.length} people will pay{' '}
            <b>{money(Number(amount) / sharedBy.length)}</b>.
          </p>
        )}

        <button className="btn">Add expense</button>
      </form>

      {expenses.length > 0 && (
        <table>
          <thead>
            <tr><th>Expense</th><th>Paid by</th><th>Shared by</th><th>Amount</th><th></th></tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id}>
                <td>{e.description}</td>
                <td>{e.paidBy}</td>
                <td>{e.splitAmong.length === people.length ? 'Everyone' : e.splitAmong.join(', ')}</td>
                <td>{money(e.amount)}</td>
                <td><button className="btn-small danger" onClick={() => onDelete(e.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default ExpenseSection
