import { useState } from 'react'

// Step 1: add / remove people
function PeopleSection({ people, onAdd, onRemove }) {
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (onAdd(name.trim())) setName('') 
  }

  return (
    <section className="card">
      <h2>Step 1: Who is in the group?</h2>
      <form className="row" onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name, e.g. Asha"
        />
        <button className="btn">Add person</button>
      </form>

      <div className="chips">
        {people.length === 0 && <p className="hint">No one added yet.</p>}
        {people.map((p) => (
          <span className="chip" key={p}>
            {p}
            <button type="button" onClick={() => onRemove(p)} title="Remove">×</button>
          </span>
        ))}
      </div>
    </section>
  )
}

export default PeopleSection
