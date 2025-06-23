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

const Total = (props) => {
  const total = props.total.reduce((acc, cur) => {
    return acc + cur.exercises
  }, 0)

  console.log(total)

  return <strong>Total of {total} exercises</strong>
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content course={props.course.parts} />
      <Total total={props.course.parts}/>
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

  return <Course course={course} />
}

export default App