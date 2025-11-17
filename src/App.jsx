import { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Timer from './components/Timer'
import SetTimerPage from './components/SetTimerPage'
import './App.css'

function App() {
  // State for input values
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);

  // State for countdown timer
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // State for timer control
  const [isRunning, setIsRunning] = useState(false);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [justRestarted, setJustRestarted] = useState(false);

  return (
    <div className="bg-[#09090c] min-h-screen w-full flex items-center justify-center p-8">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Timer
              inputHours={inputHours}
              inputMinutes={inputMinutes}
              inputSeconds={inputSeconds}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
              setHours={setHours}
              setMinutes={setMinutes}
              setSeconds={setSeconds}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              timerCompleted={timerCompleted}
              setTimerCompleted={setTimerCompleted}
              justRestarted={justRestarted}
              setJustRestarted={setJustRestarted}
            />
          )}
        />
        <Route
          path="/set-timer"
          render={() => (
            <SetTimerPage
              inputHours={inputHours}
              inputMinutes={inputMinutes}
              inputSeconds={inputSeconds}
              setInputHours={setInputHours}
              setInputMinutes={setInputMinutes}
              setInputSeconds={setInputSeconds}
              setHours={setHours}
              setMinutes={setMinutes}
              setSeconds={setSeconds}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              setTimerCompleted={setTimerCompleted}
              setJustRestarted={setJustRestarted}
            />
          )}
        />
      </Switch>
    </div>
  )
}

export default App
