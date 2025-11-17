import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TimeInput from './TimeInput';

function SetTimerPage(props) {
  const history = useHistory();

  // Local state for form inputs (initialized from props)
  const [localHours, setLocalHours] = useState(props.inputHours);
  const [localMinutes, setLocalMinutes] = useState(props.inputMinutes);
  const [localSeconds, setLocalSeconds] = useState(props.inputSeconds);

  const handleStartTimer = () => {
    // Check if timer is currently running
    if (props.isRunning) {
      const confirmed = window.confirm(
        "Starting a new timer will stop the current one. Continue?"
      );
      if (!confirmed) return;
    }

    // Update all state
    props.setInputHours(localHours);
    props.setInputMinutes(localMinutes);
    props.setInputSeconds(localSeconds);
    props.setHours(localHours);
    props.setMinutes(localMinutes);
    props.setSeconds(localSeconds);
    props.setIsRunning(true);
    props.setTimerCompleted(false);
    props.setJustRestarted(false);

    // Navigate back to main page
    history.push('/');
  };

  const handleGoBack = () => {
    // Navigate back without changes
    history.push('/');
  };

  return (
    <div className="flex flex-col gap-[32px] w-full max-w-[800px]">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="font-arial text-[32px] leading-[40px] !text-white">
          Set Timer
        </h1>
      </div>

      {/* Input Controls */}
      <div className="bg-[rgba(24,24,27,0.5)] border border-solid border-[#27272a] box-border flex flex-col py-[33px] px-[33px] rounded-[16px] w-full">
        <div className="box-border flex gap-[24px] items-center justify-center w-full">
          <TimeInput
            label="Hours"
            value={localHours}
            onChange={setLocalHours}
            max={99}
            disabled={false}
          />
          <TimeInput
            label="Minutes"
            value={localMinutes}
            onChange={setLocalMinutes}
            max={59}
            disabled={false}
          />
          <TimeInput
            label="Seconds"
            value={localSeconds}
            onChange={setLocalSeconds}
            max={59}
            disabled={false}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-[16px] h-[64px] w-full">
        <button
          onClick={handleStartTimer}
          className="bg-[#f0b100] relative rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 cursor-pointer border-none"
        >
          <span className="font-arial leading-[20px] text-[14px]">Start Timer</span>
        </button>
        <button
          onClick={handleGoBack}
          className="bg-[#3f3f47] relative rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 cursor-pointer border-none"
        >
          <span className="font-arial leading-[20px] text-[14px] text-[#fdc700]">Go Back</span>
        </button>
      </div>
    </div>
  );
}

export default SetTimerPage;
