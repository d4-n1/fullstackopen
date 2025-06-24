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

export default Course