import React from "react";

const AlertSearchBar = ({ value, onChange, placeholder = "Search alerts..." }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0 30px 0'}}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: 'var(--color-border)',
        borderRadius: '50px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        padding: '0 20px',
        minWidth: 350,
        maxWidth: 500,
        width: '100%',
        height: 54
      }}>
        <span style={{ color: 'var(--color-dark-1)', fontSize: 22, marginRight: 12 }}>
          <i className="icon-search" />
        </span>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--color-dark-1)',
            fontSize: 18,
            width: '100%',
            padding: '10px 0',
            fontWeight: 500
          }}
        />
      </div>
    </div>
  );
};

export default AlertSearchBar; 