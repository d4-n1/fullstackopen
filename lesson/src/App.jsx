import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    // Encuentra la nota con el id dado
    const note = notes.find(n => n.id === id)
    // Crea una copia del objeto con la propiedad important invertida
    const changedNote = { ...note, important: !note.important }
    
    // Hace put de la nueva nota
    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      // La respuesta cambia notes al mismo objeto con la nota cambiada
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      alert("Wow, there's an error here")
      setNotes(notes.filter((n) => n.id !== id))
    })
  }

  /*
  De esta forma, toggleImportanceOf(3)
    const url = `http://localhost:3001/notes/3`
    const note = {id: 3, note:'...', important: true}
    const changedNote = {id: 3, note: '...', important: false}
    
  La response de PUT es
    setNotes(notes.map(note => note.id !== 3 
    ? note 
    : response.data ({id: 3, note: '...', important: false}) ))
  */

  const notesToShow = showAll 
    ? notes 
    : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map((note, i) => 
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <button onClick={() => {setShowAll(!showAll)}}>
        show {showAll ? 'important' : 'all'}
      </button>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form> 
    </div>
  )
}

export default App