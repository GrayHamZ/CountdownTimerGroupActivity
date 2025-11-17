import React, { useRef, useState } from 'react';

function TimeInput({ label, value, onChange, max, disabled = false }) {
  const inputRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e) => {
    const inputString = e.target.value;
    
    // Allow empty string (user is clearing the field)
    if (inputString === '') {
      onChange(0);
      setIsTyping(false);
      return;
    }
    
    const inputValue = parseInt(inputString);
    
    // Ensure value is valid and doesn't exceed max
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= max) {
      onChange(inputValue);
      setIsTyping(true);
    }
  };

  const handleClick = (e) => {
    // Select all text when clicking the input so typing replaces the value
    e.target.select();
    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    // If user presses a number key and hasn't started typing yet, select all first
    if (e.key >= '0' && e.key <= '9' && !isTyping) {
      e.target.select();
    }
  };

  const handleBlur = () => {
    // Reset typing state when leaving the input
    setIsTyping(false);
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="flex flex-col gap-[16px]">
        <div className="h-[24px] relative w-full">
          <p className="font-arial leading-[24px] text-[#9f9fa9] text-[16px] m-0 mt-[0px]">
            {label}
          </p>
        </div>
        <div className="bg-zinc-800 border border-solid border-[#3f3f46] h-[56px] relative rounded-[8px] w-full">
          <div className="box-border flex h-[56px] items-center overflow-hidden px-[12px] py-[4px] rounded-[inherit] w-full">
            <input
              ref={inputRef}
              type="number"
              min="0"
              max={max}
              value={value}
              onChange={handleChange}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              disabled={disabled}
              className="font-arial bg-transparent border-none outline-none text-[#717182] text-[14px] text-left w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeInput;
