const Header = (props) => <h1>{props.header}</h1>

const Content = (props) => (
  props.content.map(part => {
    return <Part name={part.name} exercises={part.exercises} key={part.id} />
  })
)

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
)

const Total = (props) => {
  return <strong>Total of {props.total} exercises</strong>
}

const Course = (props) => {
const total = props.course.parts.reduce((acc, cur) => {
    return acc + cur.exercises
  }, 0)

  return (
    <div>
      <Header header={props.course.name} />
      <Content content={props.course.parts} />
      <Total total={total}/>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map((course) => {
        return <Course course={course} key={course.id}/>
      })}
    </div>
  )
}

export default App
