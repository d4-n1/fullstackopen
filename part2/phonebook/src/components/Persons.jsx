const Person = (props) => {
  return (
    <div>
      {props.name} {props.number}
    </div>
  )
}

const Persons = (props) => {
  return props.persons.length > 0
    ? props.persons.map(person => {
      return <Person name={person.name} number={person.number} key={person.name}/>
    })
    : "There's no results" // Empty state
}

export default Persons