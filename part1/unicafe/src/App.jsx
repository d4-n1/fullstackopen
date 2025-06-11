import { useState } from 'react'

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
)

const Display = ({ label, value }) => (
  <div>{label} {value}</div>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [labelGood, labelNeutral, labelBad] = ['good', 'neutral', 'bad']

  return (
    <div>
      <h1>Give feedback</h1>
      <Button label={labelGood} onClick={() => setGood(good + 1)}/>
      <Button label={labelNeutral} onClick={() => setNeutral(neutral + 1)}/>
      <Button label={labelBad} onClick={() => setBad(bad + 1)}/>

      <h2>Statistics</h2>
      <Display label={labelGood} value={good} />
      <Display label={labelNeutral} value={neutral} />
      <Display label={labelBad} value={bad} />
    </div>
  )
}

export default App