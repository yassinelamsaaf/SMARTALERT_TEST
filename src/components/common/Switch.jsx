import React from 'react';
import './Switch.scss';

const Switch = ({ checked, onChange, label, className = '' }) => (
  <label className={`switch ${className}`}>
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="slider" />
    {label && <span className="switch-label ms-2">{label}</span>}
  </label>
);

export default Switch; 