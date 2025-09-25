import React from 'react';
import './Select.css';

const Select = ({ 
  label, 
  value, 
  onChange, 
  options = [], 
  placeholder = "请选择...",
  required = false,
  className = "",
  disabled = false 
}) => {
  return (
    <div className={`select-container ${className}`}>
      {label && (
        <label className={`select-label ${required ? 'required' : ''}`}>
          {label}
        </label>
      )}
      <select 
        className="select-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;