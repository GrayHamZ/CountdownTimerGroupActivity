import React, { useState, useEffect, useRef } from 'react';
import TimeInput from './TimeInput';
import TimeDisplay from './TimeDisplay';

function Timer() {
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
  const intervalRef = useRef(null);

  // Countdown logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        // Check if timer has reached 0
        if (hours === 0 && minutes === 0 && seconds === 0) {
          setIsRunning(false);
          clearInterval(intervalRef.current);
          return;
        }

        // Countdown logic
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, hours, minutes, seconds]);

  const handleStart = () => {
    if (!isRunning) {
      // If timer is at 0:00:00, set from input values
      if (hours === 0 && minutes === 0 && seconds === 0) {
        setHours(inputHours);
        setMinutes(inputMinutes);
        setSeconds(inputSeconds);
      }
      // Resume from current time (whether it's paused or starting fresh)
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleRestart = () => {
    // Reset to input values and start immediately
    setHours(inputHours);
    setMinutes(inputMinutes);
    setSeconds(inputSeconds);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setInputHours(0);
    setInputMinutes(0);
    setInputSeconds(0);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px'
    }}>
      <h1>Countdown Timer</h1>

      {/* Timer Display */}
      <TimeDisplay hours={hours} minutes={minutes} seconds={seconds} />

      {/* Input Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px'
      }}>
        <TimeInput
          label="Hours"
          value={inputHours}
          onChange={setInputHours}
          max={23}
        />
        <TimeInput
          label="Minutes"
          value={inputMinutes}
          onChange={setInputMinutes}
          max={59}
        />
        <TimeInput
          label="Seconds"
          value={inputSeconds}
          onChange={setInputSeconds}
          max={59}
        />
      </div>

      {/* Control Buttons */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginTop: '20px'
      }}>
        <button
          onClick={handleStart}
          disabled={isRunning}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            opacity: isRunning ? 0.5 : 1
          }}
        >
          Start
        </button>
        <button
          onClick={handlePause}
          disabled={!isRunning}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: !isRunning ? 'not-allowed' : 'pointer',
            opacity: !isRunning ? 0.5 : 1
          }}
        >
          Pause
        </button>
        <button
          onClick={handleRestart}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Restart
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
