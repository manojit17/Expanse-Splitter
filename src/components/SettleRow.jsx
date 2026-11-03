import { useState } from 'react'
import { money } from '../utils/splitLogic.js'

function SettleRow({ item, onSettle }) {
  const [amount, setAmount] = useState(item.amount.toFixed(2))
  const [method, setMethod] = useState('UPI') // new: UPI or Cash
  const [error, setError] = useState('')

  function handlePay() {
    const value = Number(amount)

    if (!(value > 0)) {
      setError('Enter an amount greater than 0.')
      return
    }
    if (value > item.amount + 0.01) {
      setError("Can't pay more than the due amount of " + money(item.amount) + '.')
      return
    }

    setError('')
    onSettle(item.from, item.to, value, method) // new: send the method too
  }

  return (
    <li className="settle-row">
      <span>
        <b>{item.from}</b> pays <b>{item.to}</b> <span className="big">{money(item.amount)}</span>
      </span>
      <span className="row">
        <input
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value)
            setError('')
          }}
        />

        {/* new: payment method */}
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="UPI">UPI</option>
          <option value="Cash">Cash</option>
        </select>

        <button className="btn-small" onClick={handlePay}>Mark as paid</button>
      </span>

      {error && <span className="row-error">{error}</span>}
    </li>
  )
}

export default SettleRow