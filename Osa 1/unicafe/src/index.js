import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({set, text}) => (
  <button onClick={set}>
    {text}
  </button>
)

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
      good {good} <br/>
      neutral {neutral} <br/>
      bad {bad} <br/>
      all {good + neutral + bad} <br />
      average {(good-bad)/(good+neutral+bad)} <br />
      positive {good/(good+neutral+bad)*100}
    </div>
  )

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

