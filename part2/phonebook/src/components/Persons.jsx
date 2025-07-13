const Person = (props) => {
  return (
    <div>
      {props.name} {props.number} <button onClick={() => props.onClick(props.id)}>Delete</button>
    </div>
  )
}

const Persons = (props) => {
  return props.persons?.length > 0
    ? props.persons.map(person => {
      return <Person name={person.name} id={person.id} number={person.number} onClick={props.onClick} key={person.name} />
    })
    : "There's no results" // Empty state
}

export default Persons