import React from "react";

const AlertInfoField = ({ label, value, dir = 'ltr', keyName, icons = {} }) => {
  const iconClass = icons[keyName] || "bi-info-circle";
  return (
    <div className="alert-info-row stunning-gradient-bg glassmorphism-card shadow-xl rounded-3xl flex items-center justify-between transition-transform hover:scale-105 mb-4 border-2 border-blue-200">
      <div className={`alert-info-label stunning-label text-2xl font-bold flex items-center gap-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
        <i className={`bi bi-${iconClass} text-primary`} style={{ fontSize: 28, marginLeft: '0.75rem', marginRight: '0.75rem' }}></i>
        <span className="label-text">{label}</span>
      </div>
      <div className="alert-info-value text-lg font-mono font-bold bg-white/80 px-4 py-2 rounded-xl shadow-inner transition-colors duration-300">
        {value}
      </div>
    </div>
  );
};

export default AlertInfoField; 