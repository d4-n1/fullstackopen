import { useState } from 'react'

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
)

// const Display = ({ label, value }) => (
//   <div>{label} {value}</div>
// )

const Statistics = ({ good, neutral, bad, all, average, positive }) => (
    <div>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {average}</div>
      <div>positive {positive}%</div>
    </div>
  )

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good - bad) / all || 0
  const positive = good / all * 100 || 0

  return (
    <div>
      <h1>Give feedback</h1>
      <Button label={'good'} onClick={() => setGood(good + 1)}/>
      <Button label={'neutral'} onClick={() => setNeutral(neutral + 1)}/>
      <Button label={'bad'} onClick={() => setBad(bad + 1)}/>

      <Statistics 
        good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}
      />

    </div>
  )
}

export default App