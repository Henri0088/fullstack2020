import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({set, text}) => (
  <button onClick={set}>
    {text}
  </button>
)

const Statistics = ({good, bad, neutral}) => {
  const total = good+bad+neutral

  if (total > 0) {
    return (
      <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good-bad)/(total)}</p>
      <p>positive {good/(total)*100}</p>
    </div>
    )
  }
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button set={() => setGood(good + 1)} text='good' />
        <Button set={() => setNeutral(neutral + 1)} text='neutral' />
        <Button set={() => setBad(bad + 1)} text='bad' />
      </div>
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

