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
    <div style={{ margin: '10px' }}>
      <label>
        {label}:
        <input
          type="number"
          min="0"
          max={max}
          value={value}
          onChange={handleChange}
          style={{
            marginLeft: '10px',
            width: '60px',
            padding: '5px',
            fontSize: '16px'
          }}
        />
      </label>
    </div>
  );
}

export default TimeInput;
