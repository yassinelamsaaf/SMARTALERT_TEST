import React from "react";

const InfoIcon = ({ dir }) => (
  <svg
    className="icon-info-label"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#2563eb"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginLeft: '0.75rem', marginRight: '0.75rem' } }
  >
    <circle cx="12" cy="12" r="10" fill="#e0e7ff" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <circle cx="12" cy="8.5" r="1.2" fill="#2563eb" />
  </svg>
);

const AlertInfoField = ({ label, value, dir = 'ltr' }) => (
  <div className="alert-info-row stunning-gradient-bg glassmorphism-card shadow-xl rounded-3xl p-5 flex items-center justify-between transition-transform hover:scale-105 mb-4 border-2 border-blue-200">
    <div className={`alert-info-label stunning-label text-2xl font-bold flex items-center gap-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
      <InfoIcon dir={dir} />
      <span className="label-text">{label}</span>
    </div>
    <div className="alert-info-value text-lg font-mono font-bold bg-white/80 px-4 py-2 rounded-xl shadow-inner transition-colors duration-300">
      {value}
    </div>
  </div>
);

export default AlertInfoField; 