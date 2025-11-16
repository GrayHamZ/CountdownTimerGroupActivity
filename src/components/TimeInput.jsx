import React from 'react';

function TimeInput({ label, value, onChange, max }) {
  const handleChange = (e) => {
    const inputValue = parseInt(e.target.value) || 0;
    // Ensure value doesn't exceed max
    if (inputValue >= 0 && inputValue <= max) {
      onChange(inputValue);
    }
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="flex flex-col gap-[16px]">
        <div className="h-[24px] relative w-full">
          <p className="font-arial leading-[24px] text-[#9f9fa9] text-[16px] m-0">
            {label}
          </p>
        </div>
        <div className="bg-zinc-800 border border-solid border-[#3f3f46] h-[56px] relative rounded-[8px] w-full">
          <div className="box-border flex h-[56px] items-center overflow-hidden px-[12px] py-[4px] rounded-[inherit] w-full">
            <input
              type="number"
              min="0"
              max={max}
              value={value}
              onChange={handleChange}
              className="font-arial bg-transparent border-none outline-none text-[#717182] text-[14px] text-center w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeInput;
