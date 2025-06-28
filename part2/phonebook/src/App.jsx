import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  const filteredPersons = searchName === ''
    ? persons
    : persons.filter(person => 
      person.name.toLowerCase()
      .includes(searchName
      .toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const duplicatedName = persons.some(person => person.name === newName)
    if(duplicatedName) {
      alert(`${newName} is already added to phonebook`)
    } else {
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        search person: <input value={searchName} onChange={handleSearchName}/>
      </div>

      <h2>Add new person</h2>
      <form onSubmit={(addPerson)}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {filteredPersons.length > 0
        ? filteredPersons.map(person => {
          return (
            <div key={person.name}>
              {person.name} {person.number}
            </div>
          )
        })
        : "There's no results" // Empty state
        }
    </div>
  )
}

export default App