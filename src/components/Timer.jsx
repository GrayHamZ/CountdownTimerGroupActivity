import React, { useState, useEffect, useRef } from 'react';
import TimeInput from './TimeInput';
import TimeDisplay from './TimeDisplay';
import playIcon from '../assets/play-icon.svg';
import pauseIcon from '../assets/pause-icon.svg';
import restartIcon from '../assets/restart-icon.svg';
import resetIcon from '../assets/reset-icon.svg';

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
    <div className="flex flex-col gap-[32px] w-full max-w-[800px]">
      {/* Timer Display */}
      <TimeDisplay hours={hours} minutes={minutes} seconds={seconds} />

      {/* Input Controls */}
      <div className="bg-[rgba(24,24,27,0.5)] border border-solid border-[#27272a] box-border flex flex-col py-[33px] px-[33px] rounded-[16px] w-full">
        <div className="box-border flex gap-[24px] items-center justify-center w-full">
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
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-4 gap-[16px] h-[64px] w-full">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className={`${isRunning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} bg-[#f0b100] relative rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 border-none`}
        >
          <img src={playIcon} alt="" className="w-[20px] h-[20px]" />
          <span className="font-arial leading-[20px] text-[14px] text-black">Start</span>
        </button>
        <button
          onClick={handlePause}
          disabled={!isRunning}
          className={`${!isRunning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} bg-[#3f3f47] relative rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 border-none`}
        >
          <img src={pauseIcon} alt="" className="w-[20px] h-[20px]" />
          <span className="font-arial leading-[20px] text-[14px] text-[#fdc700]">Pause</span>
        </button>
        <button
          onClick={handleRestart}
          className="bg-[#3f3f47] opacity-50 relative rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 cursor-pointer border-none"
        >
          <img src={restartIcon} alt="" className="w-[20px] h-[20px]" />
          <span className="font-arial leading-[20px] text-[14px] text-[#fdc700]">Restart</span>
        </button>
        <button
          onClick={handleReset}
          className="bg-[#3f3f47] relative rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 cursor-pointer border-none"
        >
          <img src={resetIcon} alt="" className="w-[20px] h-[20px]" />
          <span className="font-arial leading-[20px] text-[14px] text-[#fdc700]">Reset</span>
        </button>
      </div>
    </div>
  );
}

export default Timer;
