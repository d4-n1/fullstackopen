const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  props.course.map(part => {
    return <Part name={part.name} exercises={part.exercises} key={part.id} />
  })
)

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
)

const Total = (props) => <strong>Total of {props.total} exercises</strong>

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content course={props.course.parts} />
      <Total total={props.total}/>
    </div>
  )
}

const App = () => {  
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  const total = course.parts.reduce((acc, cur) => {
    return acc + cur.exercises
  }, 0)

  return <Course course={course} total={total} />
}

export default App