// All the calculation lives here, away from the UI, so it is easy to read and test.

// Step 1: work out how much each person paid, their fair share, and the difference.
// expenses: [{ id, description, amount, paidBy, splitAmong: ['Asha', 'Ravi'] }]
// payments: [{ from, to, amount }]  (settlements already made)
export function calculateBalances(people, expenses, payments) {
  const rows = {}
  people.forEach((name) => {
    rows[name] = { name, paid: 0, share: 0, settled: 0, net: 0 }
  })

  expenses.forEach((exp) => {
    // the person who paid gets credit for the full amount
    rows[exp.paidBy].paid += exp.amount

    // everyone in the split owes an equal part
    const part = exp.amount / exp.splitAmong.length
    exp.splitAmong.forEach((name) => {
      rows[name].share += part
    })
  })

  // a settlement moves money from one person to another
  payments.forEach((p) => {
    rows[p.from].settled += p.amount
    rows[p.to].settled -= p.amount
  })

  // net > 0  -> this person should receive money
  // net < 0  -> this person should pay money
  people.forEach((name) => {
    const r = rows[name]
    r.net = r.paid - r.share + r.settled
  })

  return Object.values(rows)
}

// Step 2: turn the balances into a short list of "who pays whom".
// People who owe money are matched with people who are owed money.
export function simplifyDebts(balances) {
  const debtors = balances
    .filter((b) => b.net < -0.01)
    .map((b) => ({ name: b.name, amount: -b.net }))
  const creditors = balances
    .filter((b) => b.net > 0.01)
    .map((b) => ({ name: b.name, amount: b.net }))

  const result = []
  let i = 0
  let j = 0

  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amount, creditors[j].amount)
    result.push({ from: debtors[i].name, to: creditors[j].name, amount: pay })

    debtors[i].amount -= pay
    creditors[j].amount -= pay

    if (debtors[i].amount < 0.01) i++
    if (creditors[j].amount < 0.01) j++
  }

  return result
}

export function money(value) {
  return '₹' + value.toFixed(2)
}
