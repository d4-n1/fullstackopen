import { useState } from 'react'

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
)

const StatisticLine = ({ label, value }) => (
  <div>{label} {value}</div>
)

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if(all === 0) return <div>No feedback given</div>

  return (
    <div>
      <StatisticLine label='good' value={good}/>
      <StatisticLine label='neutral' value={neutral}/>
      <StatisticLine label='bad' value={bad}/>
      <StatisticLine label='all' value={all}/>
      <StatisticLine label='average' value={average}/>
      <StatisticLine label='positive' value={`${positive}%`}/>
    </div>
  )
}

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

      <h2>Statistics</h2>
      <Statistics 
        good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}
      />

    </div>
  )
}

export default App