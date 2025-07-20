import React from "react";

const MainIcon = ({ label }) => {
  if (/année|year/i.test(label)) {
    return (
      <span className="range-icon">
        <i className="bi bi-calendar" style={{ fontSize: 32, color: '#4f8cff' }}></i>
      </span>
    );
  }
  if (/prix|price/i.test(label)) {
    return (
      <span className="range-icon">
        <i className="bi bi-currency-euro" style={{ fontSize: 32, color: '#00e0c6' }}></i>
      </span>
    );
  }
  if (/kilom/i.test(label)) {
    return (
      <span className="range-icon">
        <i className="bi bi-speedometer2" style={{ fontSize: 32, color: '#db2777' }}></i>
      </span>
    );
  }
  // Default
  return (
    <span className="range-icon">
      <i className="bi bi-award" style={{ fontSize: 32, color: '#4f8cff' }}></i>
    </span>
  );
};

const AlertInfoRangeField = ({ label, minLabel, maxLabel, minValue, maxValue }) => (
  <div className="alert-info-range-field">
    <div className="range-label">{label}</div>
    <MainIcon label={label} />
    <div className="range-values" style={{ position: 'relative', width: '100%', alignItems: 'center', marginTop: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
        <div className="range-step-value" style={{ background: '#e0e7ff', color: '#2563eb', borderRadius: 12, padding: '8px 18px', fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px #4f8cff22', marginBottom: 2 }}>{minValue}</div>
      </div>
      <div style={{ flex: 1, height: 4, background: 'linear-gradient(90deg,#4f8cff 0%,#00e0c6 100%)', margin: '0 10px', borderRadius: 2, zIndex: 1 }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
        <div className="range-step-value" style={{ background: '#fce7f3', color: '#db2777', borderRadius: 12, padding: '8px 18px', fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px #db277722', marginBottom: 2 }}>{maxValue}</div>
      </div>
    </div>
  </div>
);

export default AlertInfoRangeField; 