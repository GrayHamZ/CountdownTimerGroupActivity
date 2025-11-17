import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import TimeDisplay from './TimeDisplay';
import pauseIcon from '../assets/pause-icon.svg';
import restartIcon from '../assets/restart-icon.svg';

function Timer(props) {
  const history = useHistory();
  const intervalRef = useRef(null);

  // Destructure props for easier access
  const {
    inputHours,
    inputMinutes,
    inputSeconds,
    hours,
    minutes,
    seconds,
    setHours,
    setMinutes,
    setSeconds,
    isRunning,
    setIsRunning,
    timerCompleted,
    setTimerCompleted,
    justRestarted,
    setJustRestarted,
  } = props;

  // Countdown logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        // Check if timer has reached 0
        if (hours === 0 && minutes === 0 && seconds === 0) {
          setIsRunning(false);
          setTimerCompleted(true);
          clearInterval(intervalRef.current);
          alert("Timer completed!");
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
  }, [isRunning, hours, minutes, seconds, setHours, setMinutes, setSeconds, setIsRunning, setTimerCompleted]);

  // Navigate to Set Timer page
  const handleSetTimer = () => {
    history.push('/set-timer');
  };

  // Handle Pause/Resume/Start button
  const handleToggle = () => {
    if (isRunning) {
      // Pause
      setIsRunning(false);
    } else {
      // Start or Resume
      if (hours === 0 && minutes === 0 && seconds === 0) {
        // Starting from input values
        setHours(inputHours);
        setMinutes(inputMinutes);
        setSeconds(inputSeconds);
      }
      setIsRunning(true);
      setJustRestarted(false);
      setTimerCompleted(false);
    }
  };

  // Handle Restart button
  const handleRestart = () => {
    setHours(inputHours);
    setMinutes(inputMinutes);
    setSeconds(inputSeconds);
    setIsRunning(false);
    setJustRestarted(true);
    setTimerCompleted(false);
  };

  // Determine pause button label
  const getPauseButtonLabel = () => {
    if (justRestarted) return "Start";
    if (isRunning) return "Pause";
    if (hours > 0 || minutes > 0 || seconds > 0) return "Resume";
    return "Start";
  };

  // Determine if pause button is disabled
  const isPauseButtonDisabled = () => {
    if (timerCompleted) return true;
    if (inputHours === 0 && inputMinutes === 0 && inputSeconds === 0) return true;
    return false;
  };

  // Determine if restart button is disabled
  const isRestartButtonDisabled = () => {
    return hours === inputHours && minutes === inputMinutes && seconds === inputSeconds;
  };

  return (
    <div className="flex flex-col gap-[32px] w-full max-w-[800px]">
      {/* Timer Display */}
      <TimeDisplay hours={hours} minutes={minutes} seconds={seconds} />

      {/* Control Buttons */}
      <div className="grid grid-cols-3 gap-[16px] h-[64px] w-full">
        <button
          onClick={handleSetTimer}
          className="bg-[#f0b100] relative rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 cursor-pointer border-none"
        >
          <span className="font-arial leading-[20px] text-[14px]">Set Timer</span>
        </button>
        <button
          onClick={handleToggle}
          disabled={isPauseButtonDisabled()}
          className={`${isPauseButtonDisabled() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} bg-[#3f3f47] relative rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 border-none`}
        >
          <img src={pauseIcon} alt="" className="w-[20px] h-[20px] mx-[3px]" />
          <span className="font-arial leading-[20px] text-[14px] text-[#fdc700] mx-[3px]">
            {getPauseButtonLabel()}
          </span>
        </button>
        <button
          onClick={handleRestart}
          disabled={isRestartButtonDisabled()}
          className={`${isRestartButtonDisabled() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} bg-[#3f3f47] relative rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 border-none`}
        >
          <img src={restartIcon} alt="" className="w-[20px] h-[20px] mx-[3px]" />
          <span className="font-arial leading-[20px] text-[14px] text-[#fdc700] mx-[3px]">Restart</span>
        </button>
      </div>
    </div>
  );
}

export default Timer;
