import React from 'react';

function TimeDisplay({ hours, minutes, seconds }) {
  // Format numbers to always show 2 digits (e.g., 05 instead of 5)
  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <div 
      className="border border-solid border-[#27272a] box-border flex items-center justify-center py-[0px] px-[49px] rounded-[24px] w-full relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 25%, rgba(255, 255, 255, 0.02) 50%, transparent 70%)',
        boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1), inset -2px -2px 8px 0 rgba(0, 0, 0, 0.3), 8px 8px 16px rgba(0, 0, 0, 0.5), 12px 12px 24px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div className="flex items-center justify-center gap-4">
        {/* Hours */}
        <div className="flex flex-col items-center gap-[4px]">
          <p
            className="font-consolas text-[#fdc700] text-[128px] text-center leading-[128px] tracking-[-3.2px] mt-[16px] mb-[0px] mx-0"
            style={{
              textShadow: '0px 0px 60px rgba(253, 199, 0, 0.6), 0px 0px 30px rgba(253, 199, 0, 0.4)'
            }}
          >
            {formatTime(hours)}
          </p>
          <p className="font-arial text-[#71717b] text-[16px] text-center m-0">
            hours
          </p>
        </div>

        {/* First Colon */}
        <div className="relative" style={{ marginTop: '-32px' }}>
          <p
            className="font-arial text-[#fdc700] text-[96px] leading-[96px] m-0"
            style={{
              textShadow: '0px 0px 60px rgba(253, 199, 0, 0.6), 0px 0px 30px rgba(253, 199, 0, 0.4)'
            }}
          >
            :
          </p>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center gap-[4px]">
          <p
            className="font-consolas text-[#fdc700] text-[128px] text-center leading-[128px] tracking-[-3.2px] mt-[16px] mb-[0px] mx-0"
            style={{
              textShadow: '0px 0px 60px rgba(253, 199, 0, 0.6), 0px 0px 30px rgba(253, 199, 0, 0.4)'
            }}
          >
            {formatTime(minutes)}
          </p>
          <p className="font-arial text-[#71717b] text-[16px] text-center m-0">
            minutes
          </p>
        </div>

        {/* Second Colon */}
        <div className="relative" style={{ marginTop: '-32px' }}>
          <p
            className="font-arial text-[#fdc700] text-[96px] leading-[96px] m-0"
            style={{
              textShadow: '0px 0px 60px rgba(253, 199, 0, 0.6), 0px 0px 30px rgba(253, 199, 0, 0.4)'
            }}
          >
            :
          </p>
        </div>

        {/* Seconds */}
        <div className="flex flex-col items-center gap-[4px]">
          <p
            className="font-consolas text-[#fdc700] text-[128px] text-center leading-[128px] tracking-[-3.2px] mt-[16px] mb-[0px] mx-0"
            style={{
              textShadow: '0px 0px 60px rgba(253, 199, 0, 0.6), 0px 0px 30px rgba(253, 199, 0, 0.4)'
            }}
          >
            {formatTime(seconds)}
          </p>
          <p className="font-arial text-[#71717b] text-[16px] text-center m-0">
            seconds
          </p>
        </div>
      </div>
    </div>
  );
}

export default TimeDisplay;
