import React from 'react';

function TimeDisplay({ hours, minutes, seconds }) {
  // Format numbers to always show 2 digits (e.g., 05 instead of 5)
  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <div style={{
      fontSize: '48px',
      fontFamily: 'monospace',
      margin: '20px',
      padding: '20px',
      border: '2px solid #646cff',
      borderRadius: '8px',
      minWidth: '200px',
      textAlign: 'center'
    }}>
      {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
    </div>
  );
}

export default TimeDisplay;
