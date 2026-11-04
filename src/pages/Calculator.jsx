import { useState } from 'react'
import PeopleSection from '../components/PeopleSection.jsx'
import ExpenseSection from '../components/ExpenseSection.jsx'
import ResultsSection from '../components/ResultsSection.jsx'


function Calculator() {
  const [people, setPeople] = useState([])
  const [expenses, setExpenses] = useState([])
  const [payments, setPayments] = useState([])
  const [message, setMessage] = useState('')

 
  function addPerson(name) {
    if (!name) {
      setMessage('Please type a name.')
      return false
    }
    if (people.includes(name)) {
      setMessage(name + ' is already in the group.')
      return false
    }
    setPeople([...people, name])
    setMessage('')
    return true
  }

  function removePerson(name) {
    const inUse = expenses.some((e) => e.paidBy === name || e.splitAmong.includes(name))
    if (inUse) {
      setMessage('Delete the expenses involving ' + name + ' before removing them.')
      return
    }
    setPeople(people.filter((p) => p !== name))
    setMessage('')
  }

  
  function addExpense(expense) {
    if (!expense.description || expense.amount <= 0) {
      setMessage('Please enter a description and an amount greater than 0.')
      return false
    }
    if (expense.splitAmong.length === 0) {
      setMessage('Select at least one person to share the expense.')
      return false
    }
    setExpenses([...expenses, { ...expense, id: Date.now() }])
    setMessage('')
    return true
  }

  function deleteExpense(id) {
  
    if (payments.length > 0) {
      const ok = window.confirm(
        'Deleting this expense changes the balances, so payments already marked as paid will be cleared too. Continue?'
      )
      if (!ok) return
      setPayments([])
    }
    setExpenses(expenses.filter((e) => e.id !== id))
    setMessage('')
  }

  
    function settle(from, to, amount, method) {
    setPayments([...payments, { from, to, amount, method }])
    setMessage('')
  }
  function loadExample() {
    setPeople(['Sani', 'Raj', 'Meena'])
    setExpenses([
      { id: 1, description: 'Hotel', amount: 6000, paidBy: 'Sani', splitAmong: ['Sani', 'Raj', 'Meena'] },
      { id: 2, description: 'Dinner', amount: 1800, paidBy: 'Raj', splitAmong: ['Sani', 'Raj', 'Meena'] },
      { id: 3, description: 'Cab to airport', amount: 900, paidBy: 'Meena', splitAmong: ['Sani', 'Meena'] },
    ])
    setPayments([])
    setMessage('')
  }

  function clearAll() {
    setPeople([])
    setExpenses([])
    setPayments([])
    setMessage('')
  }

  return (
    <div className="page">
      <div className="title-row">
        <h1>Expense Calculator</h1>
        <div className="row">
          <button className="btn-small" onClick={loadExample}>Load example</button>
          <button className="btn-small danger" onClick={clearAll}>Clear all</button>
        </div>
      </div>
      <p className="hint">Follow the 3 steps below. Your results update automatically.</p>

      {message && <p className="error">{message}</p>}

      <PeopleSection people={people} onAdd={addPerson} onRemove={removePerson} />
      <ExpenseSection people={people} expenses={expenses} onAdd={addExpense} onDelete={deleteExpense} />
      <ResultsSection people={people} expenses={expenses} payments={payments} onSettle={settle} />
    </div>
  )
}

export default Calculator
